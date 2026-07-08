// =============================================================================
// POST /api/trial
// -----------------------------------------------------------------------------
// Enregistre une demande de séance d'essai.
// Flow :
//   1. Rate limiting (3/h par IP)
//   2. Validation Zod + honeypot
//   3. Création en BD avec tokens confirm/cancel uniques
//   4. Notification courriel au propriétaire (JS)
//   5. Si séance dans ≤36h → rappel immédiat au client avec boutons Confirmer/Annuler
//      Sinon → le cron /api/cron/trial-reminders l'enverra ~48h avant
// =============================================================================

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { trialSessionSchema } from "@/lib/validation";
import { getSession } from "@/lib/auth";
import { sendEmail, sendTrialReminderEmail } from "@/lib/email";
import { checkTrialRateLimit } from "@/lib/ratelimit";

export async function POST(req: NextRequest) {
  // Rate limiting — 3 demandes de séance d'essai / heure par IP
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim()
    ?? req.headers.get("x-real-ip")
    ?? "unknown";
  const rl = await checkTrialRateLimit(ip);
  if (!rl.success) {
    return NextResponse.json(
      { error: `Trop de demandes. Réessaie dans ${Math.ceil(rl.retryAfter / 60)} min.` },
      { status: 429, headers: { "Retry-After": String(rl.retryAfter) } },
    );
  }

  const body = await req.json().catch(() => null);
  const parsed = trialSessionSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Données invalides", details: parsed.error.flatten() },
      { status: 400 },
    );
  }

  // Honeypot : si "website" est rempli, on ignore silencieusement
  if (parsed.data.website && parsed.data.website.length > 0) {
    return NextResponse.json({ ok: true }, { status: 200 });
  }

  // Si l'utilisateur est connecté, on lie la demande à son compte
  const session = await getSession();

  try {
    // Génération des tokens uniques pour les liens Confirmer / Annuler du rappel
    const confirmToken = crypto.randomUUID();
    const cancelToken  = crypto.randomUUID();

    const trial = await prisma.trialSession.create({
      data: {
        userId: session?.userId ?? null,
        firstName: parsed.data.firstName,
        lastName: parsed.data.lastName,
        email: parsed.data.email.toLowerCase(),
        phone: parsed.data.phone,
        age: parsed.data.age,
        experience: parsed.data.experience,
        preferredDate: parsed.data.preferredDate,
        message: parsed.data.message ?? null,
        confirmToken,
        cancelToken,
      },
    });

    // Notification courriel au propriétaire (JS)
    const dateStr = parsed.data.preferredDate
      .toLocaleDateString("fr-CA", {
        weekday: "long", year: "numeric", month: "long", day: "numeric",
      });

    await sendEmail({
      to:      process.env.OWNER_EMAIL ?? "citadellejj@gmail.com",
      subject: `[Citadelle] Nouvelle séance d'essai — ${parsed.data.firstName} ${parsed.data.lastName}`,
      html: `
        <div style="font-family:Arial,sans-serif;max-width:600px;background:#1a1a1a;color:#e0e0e0;border-radius:8px;overflow:hidden;">
          <div style="background:#111;padding:20px;text-align:center;border-bottom:3px solid #c9a227;">
            <h1 style="color:#c9a227;margin:0;font-size:20px;">CITADELLE JIU-JITSU</h1>
          </div>
          <div style="padding:24px;">
            <h2 style="color:#c9a227;margin-top:0;">🥋 Nouvelle demande de séance d'essai</h2>
            <p><strong>Nom :</strong> ${parsed.data.firstName} ${parsed.data.lastName}</p>
            <p><strong>Courriel :</strong> <a href="mailto:${parsed.data.email}" style="color:#c9a227;">${parsed.data.email}</a></p>
            <p><strong>Téléphone :</strong> <a href="tel:${parsed.data.phone}" style="color:#c9a227;">${parsed.data.phone}</a></p>
            <p><strong>Âge :</strong> ${parsed.data.age}</p>
            <p><strong>Expérience :</strong> ${parsed.data.experience}</p>
            <p><strong>Date souhaitée :</strong> ${dateStr}</p>
            ${parsed.data.message ? `<p><strong>Message :</strong> ${parsed.data.message}</p>` : ""}
            <hr style="border-color:#333;"/>
            <p style="font-size:0.85em;color:#888;">
              <a href="https://citadellebjj.com/fr/admin/inscriptions" style="color:#c9a227;">Panel admin — Inscriptions</a>
            </p>
          </div>
        </div>
      `,
    });

    // Rappel 48h : si la séance est dans moins de 36h (demain ou aujourd'hui),
    // envoyer le rappel immédiatement plutôt qu'attendre le cron.
    const now = new Date();
    const hoursUntilTrial = (parsed.data.preferredDate.getTime() - now.getTime()) / (1000 * 60 * 60);

    if (hoursUntilTrial <= 36) {
      await sendTrialReminderEmail({
        firstName:    trial.firstName,
        email:        trial.email,
        preferredDate: trial.preferredDate,
        confirmToken,
        cancelToken,
      });
      await prisma.trialSession.update({
        where: { id: trial.id },
        data:  { reminderSentAt: new Date() },
      });
    }

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("[/api/trial]", e);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
