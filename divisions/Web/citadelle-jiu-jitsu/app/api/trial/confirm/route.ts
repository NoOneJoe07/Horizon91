// =============================================================================
// GET /api/trial/confirm?token=<confirmToken>
// -----------------------------------------------------------------------------
// Lien "Confirmer ma présence" inclus dans le courriel de rappel 48h.
// Marque la séance d'essai comme CONFIRMED en BD et notifie JS.
// Retourne une page HTML autonome (pas de redirection vers le frontend)
// car ces liens sont ouverts depuis la boîte courriel du client.
// =============================================================================

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { sendOwnerTrialStatusEmail } from "@/lib/email";

// ---------------------------------------------------------------------------
// Pages HTML retournées selon l'état de la session
// ---------------------------------------------------------------------------

function pageHtml(emoji: string, titre: string, message: string, sousTitre?: string) {
  return `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Citadelle Jiu-Jitsu</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: Arial, sans-serif;
      background: #111;
      color: #e0e0e0;
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 20px;
    }
    .card {
      background: #1a1a1a;
      border-radius: 10px;
      padding: 48px 36px;
      max-width: 500px;
      width: 100%;
      text-align: center;
      box-shadow: 0 4px 24px rgba(0,0,0,0.5);
    }
    .logo { color: #c9a227; font-size: 1.1em; letter-spacing: 2px; margin-bottom: 32px; font-weight: bold; }
    .emoji { font-size: 3.5rem; margin-bottom: 20px; }
    h1 { color: #e0e0e0; font-size: 1.5rem; margin-bottom: 16px; }
    p { color: #aaa; line-height: 1.6; margin-bottom: 12px; }
    .highlight { color: #c9a227; font-weight: bold; }
    .btn {
      display: inline-block;
      background: #c9a227;
      color: #000;
      padding: 12px 28px;
      text-decoration: none;
      border-radius: 4px;
      font-weight: bold;
      margin-top: 24px;
    }
    .sep { border: none; border-top: 1px solid #333; margin: 24px 0; }
  </style>
</head>
<body>
  <div class="card">
    <div class="logo">CITADELLE JIU-JITSU</div>
    <div class="emoji">${emoji}</div>
    <h1>${titre}</h1>
    <p>${message}</p>
    ${sousTitre ? `<p>${sousTitre}</p>` : ""}
    <hr class="sep" />
    <a href="https://citadellebjj.com" class="btn">Visiter notre site</a>
  </div>
</body>
</html>`;
}

// ---------------------------------------------------------------------------
// Handler GET
// ---------------------------------------------------------------------------
export async function GET(req: NextRequest) {
  const token = req.nextUrl.searchParams.get("token");

  if (!token) {
    return new NextResponse(
      pageHtml("⚠️", "Lien invalide", "Ce lien de confirmation est invalide. Vérifiez votre courriel de rappel."),
      { status: 400, headers: { "Content-Type": "text/html; charset=utf-8" } },
    );
  }

  const trial = await prisma.trialSession.findUnique({
    where: { confirmToken: token },
  }).catch(() => null);

  if (!trial) {
    return new NextResponse(
      pageHtml("⚠️", "Lien introuvable", "Ce lien est invalide ou a expiré. Si vous avez des questions, contactez-nous au 418-564-1047."),
      { status: 404, headers: { "Content-Type": "text/html; charset=utf-8" } },
    );
  }

  // Déjà annulé
  if (trial.status === "CANCELED") {
    return new NextResponse(
      pageHtml("❌", "Séance déjà annulée", "Votre séance d'essai avait déjà été annulée.",
        "Vous pouvez simplement vous présenter au gym et mentionner que vous souhaitez faire un essai gratuit. On sera heureux de vous accueillir !"),
      { status: 200, headers: { "Content-Type": "text/html; charset=utf-8" } },
    );
  }

  // Déjà confirmé ou passé
  if (trial.status === "CONFIRMED" || trial.status === "ATTENDED") {
    const dateStr = trial.preferredDate.toLocaleDateString("fr-CA", {
      weekday: "long", year: "numeric", month: "long", day: "numeric",
    });
    return new NextResponse(
      pageHtml("✅", "Déjà confirmé !", `Votre présence pour le <strong>${dateStr}</strong> est déjà confirmée. On vous attend sur le tatami !`),
      { status: 200, headers: { "Content-Type": "text/html; charset=utf-8" } },
    );
  }

  // Confirmer la présence
  await prisma.trialSession.update({
    where: { id: trial.id },
    data:  { status: "CONFIRMED" },
  });

  // Notifier JS
  await sendOwnerTrialStatusEmail({
    firstName:    trial.firstName,
    lastName:     trial.lastName,
    email:        trial.email,
    phone:        trial.phone,
    preferredDate: trial.preferredDate,
    action:       "confirmed",
  });

  const dateStr = trial.preferredDate.toLocaleDateString("fr-CA", {
    weekday: "long", year: "numeric", month: "long", day: "numeric",
  });

  return new NextResponse(
    pageHtml(
      "✅",
      "Présence confirmée !",
      `Merci <strong>${trial.firstName}</strong> ! Votre présence pour le <strong>${dateStr}</strong> est bien confirmée.`,
      "On a hâte de vous accueillir sur le tatami. À bientôt ! 🥋",
    ),
    { status: 200, headers: { "Content-Type": "text/html; charset=utf-8" } },
  );
}
