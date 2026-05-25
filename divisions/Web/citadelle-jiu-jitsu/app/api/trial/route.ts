// =============================================================================
// POST /api/trial
// -----------------------------------------------------------------------------
// Enregistre une demande de séance d'essai.
// TODO (prochaine session) : envoyer un email au propriétaire via Resend.
// =============================================================================

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { trialSessionSchema } from "@/lib/validation";
import { getSession } from "@/lib/auth";
import { sendEmail } from "@/lib/email";
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
    await prisma.trialSession.create({
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
      },
    });

    // Notification courriel via Nodemailer + Gmail SMTP
    const dateStr = parsed.data.preferredDate
      ? new Date(parsed.data.preferredDate).toLocaleDateString("fr-CA", {
          weekday: "long", year: "numeric", month: "long", day: "numeric",
        })
      : "Non précisée";

    await sendEmail({
      to:      process.env.OWNER_EMAIL ?? "citadellejiujitsu@gmail.com",
      subject: `[Citadelle] Nouvelle séance d'essai — ${parsed.data.firstName} ${parsed.data.lastName}`,
      html: `
        <h2 style="color:#c9a227">Nouvelle demande de séance d'essai</h2>
        <p><strong>Nom :</strong> ${parsed.data.firstName} ${parsed.data.lastName}</p>
        <p><strong>Courriel :</strong> <a href="mailto:${parsed.data.email}">${parsed.data.email}</a></p>
        <p><strong>Téléphone :</strong> ${parsed.data.phone ?? "Non fourni"}</p>
        <p><strong>Âge :</strong> ${parsed.data.age ?? "Non précisé"}</p>
        <p><strong>Expérience :</strong> ${parsed.data.experience ?? "Aucune précision"}</p>
        <p><strong>Date souhaitée :</strong> ${dateStr}</p>
        ${parsed.data.message ? `<p><strong>Message :</strong> ${parsed.data.message}</p>` : ""}
        <hr style="border-color:#333"/>
        <p style="font-size:0.85em;color:#888">Voir dans l'admin : <a href="https://citadellejiujitsu.ca/fr/admin/inscriptions">Panel admin — Inscriptions</a></p>
      `,
    });

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("[/api/trial]", e);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
