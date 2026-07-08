// =============================================================================
// GET /api/cron/trial-reminders
// -----------------------------------------------------------------------------
// Cron job Vercel — déclenché automatiquement chaque jour à midi (UTC) via
// vercel.json : { "crons": [{ "path": "/api/cron/trial-reminders", "schedule": "0 12 * * *" }] }
//
// Logique :
//   Cherche toutes les TrialSession dont :
//     - preferredDate est dans la fenêtre [24h, 60h] à partir de maintenant
//     - reminderSentAt est null (rappel pas encore envoyé)
//     - status n'est pas CANCELED, ATTENDED ou NO_SHOW
//   Pour chacune, envoie le courriel de rappel 48h au client (avec boutons
//   Confirmer / Annuler) et marque reminderSentAt.
//
// Sécurité :
//   Vercel envoie automatiquement un header "Authorization: Bearer <CRON_SECRET>"
//   lors de l'exécution planifiée. La route rejette toute autre requête.
//   → Ajouter CRON_SECRET dans les variables d'environnement Vercel.
//
// Note :
//   Les réservations pour "demain" (≤36h) sont traitées directement dans
//   /api/trial/route.ts au moment de la création — elles ne passent donc
//   jamais par ce cron (reminderSentAt déjà rempli).
// =============================================================================

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { sendTrialReminderEmail } from "@/lib/email";

export async function GET(req: NextRequest) {
  // Vérification du secret Vercel Cron
  const authHeader = req.headers.get("authorization");
  const cronSecret = process.env.CRON_SECRET;

  if (!cronSecret || authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const now    = new Date();
  const in24h  = new Date(now.getTime() + 24 * 60 * 60 * 1000);
  const in60h  = new Date(now.getTime() + 60 * 60 * 60 * 1000);

  // Sessions dans la fenêtre 24h→60h sans rappel envoyé
  const sessions = await prisma.trialSession.findMany({
    where: {
      preferredDate:  { gte: in24h, lte: in60h },
      reminderSentAt: null,
      status:         { notIn: ["CANCELED", "ATTENDED", "NO_SHOW"] },
      // S'assurer que les tokens existent (toutes les nouvelles entrées les ont)
      confirmToken:   { not: null },
      cancelToken:    { not: null },
    },
  });

  let sent = 0;
  const errors: string[] = [];

  for (const session of sessions) {
    // Les tokens sont garantis non-null par le filtre Prisma ci-dessus
    if (!session.confirmToken || !session.cancelToken) continue;

    try {
      await sendTrialReminderEmail({
        firstName:    session.firstName,
        email:        session.email,
        preferredDate: session.preferredDate,
        confirmToken: session.confirmToken,
        cancelToken:  session.cancelToken,
      });

      await prisma.trialSession.update({
        where: { id: session.id },
        data:  { reminderSentAt: new Date() },
      });

      sent++;
      console.log(`[cron/trial-reminders] Rappel envoyé → ${session.email} (${session.id})`);
    } catch (e) {
      console.error(`[cron/trial-reminders] Erreur pour ${session.id}:`, e);
      errors.push(session.id);
    }
  }

  return NextResponse.json({
    ok:     true,
    sent,
    errors: errors.length > 0 ? errors : undefined,
    total:  sessions.length,
    ranAt:  now.toISOString(),
  });
}
