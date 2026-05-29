// =============================================================================
// app/api/waiver/route.ts — Signature de décharge de responsabilité
// -----------------------------------------------------------------------------
// RÔLE :
//   Reçoit la soumission du formulaire de décharge (page /decharge),
//   valide les données, vérifie l'authentification JWT, sauvegarde en BD,
//   et notifie l'admin par courriel.
//
// MÉTHODE : POST uniquement — authentification requise
//
// FLUX :
//   1. Vérification JWT (membre connecté obligatoire)
//   2. Validation Zod des champs
//   3. Vérification unicité — un membre ne peut signer qu'une seule décharge
//   4. Sauvegarde en BD (table Waiver)
//   5. Notification courriel à l'admin
//   6. Retourne { ok: true }
//
// AUTEUR : Horizon 91 — Jonathan Patoine + Claude (Anthropic)
// CRÉÉ   : 2026-05-29
// =============================================================================

import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { sendEmail } from "@/lib/email";

// ---------------------------------------------------------------------------
// Schéma de validation
// ---------------------------------------------------------------------------
const waiverSchema = z.object({
  participantName: z.string().min(2, "Nom requis").max(200),
  birthDate:       z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Format de date invalide (YYYY-MM-DD)"),
  address:         z.string().min(5, "Adresse requise").max(500),
  isMinor:         z.boolean(),
  guardianName:    z.string().max(200).optional(),
  photoConsent:    z.boolean(),
  signatureName:   z.string().min(2, "Signature requise").max(200),
});

// ---------------------------------------------------------------------------
// Handler POST
// ---------------------------------------------------------------------------
export async function POST(req: NextRequest) {

  // ── 1. Authentification JWT ───────────────────────────────────────────────
  const session = await getSession();
  if (!session?.userId) {
    return NextResponse.json(
      { error: "Connexion requise pour signer la décharge." },
      { status: 401 },
    );
  }

  // ── 2. Lecture + validation du body ──────────────────────────────────────
  const body = await req.json().catch(() => null);
  const parsed = waiverSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Données invalides", details: parsed.error.flatten() },
      { status: 400 },
    );
  }

  // ── 3. Mineur → nom du tuteur obligatoire ────────────────────────────────
  if (parsed.data.isMinor && !parsed.data.guardianName?.trim()) {
    return NextResponse.json(
      { error: "Le nom du parent/tuteur est requis pour un participant mineur." },
      { status: 400 },
    );
  }

  // ── 4. Vérification unicité (une décharge par membre) ───────────────────
  const existing = await prisma.waiver.findFirst({
    where: { userId: session.userId },
  });
  if (existing) {
    return NextResponse.json(
      { error: "Vous avez déjà signé la décharge de responsabilité.", alreadySigned: true },
      { status: 409 },
    );
  }

  // ── 5. Sauvegarde en BD ──────────────────────────────────────────────────
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    req.headers.get("x-real-ip") ??
    "unknown";

  try {
    const waiver = await prisma.waiver.create({
      data: {
        userId:          session.userId,
        participantName: parsed.data.participantName,
        birthDate:       parsed.data.birthDate,
        address:         parsed.data.address,
        isMinor:         parsed.data.isMinor,
        guardianName:    parsed.data.guardianName ?? null,
        photoConsent:    parsed.data.photoConsent,
        signatureName:   parsed.data.signatureName,
        ipAddress:       ip,
      },
    });

    // ── 6. Notification admin ──────────────────────────────────────────────
    await sendEmail({
      to:      process.env.OWNER_EMAIL ?? "citadellejj@gmail.com",
      subject: `[Citadelle] Décharge signée — ${parsed.data.participantName}`,
      html: `
        <h2 style="color:#c9a227">Nouvelle décharge signée</h2>
        <p><strong>Participant :</strong> ${parsed.data.participantName}</p>
        <p><strong>Date de naissance :</strong> ${parsed.data.birthDate}</p>
        <p><strong>Adresse :</strong> ${parsed.data.address}</p>
        <p><strong>Mineur :</strong> ${parsed.data.isMinor ? `Oui — tuteur : ${parsed.data.guardianName}` : "Non"}</p>
        <p><strong>Consentement photos :</strong> ${parsed.data.photoConsent ? "✅ Autorisé" : "❌ Refusé"}</p>
        <p><strong>Signature :</strong> ${parsed.data.signatureName}</p>
        <p><strong>IP :</strong> ${ip}</p>
        <p><strong>Date :</strong> ${waiver.signedAt.toLocaleString("fr-CA")}</p>
        <hr style="border-color:#333"/>
        <p style="font-size:0.85em;color:#888">
          Voir dans l'admin : <a href="https://citadellebjj.com/fr/admin/dechargees">Panel admin — Décharges</a>
        </p>
      `,
    });

    return NextResponse.json({ ok: true });

  } catch (e) {
    console.error("[/api/waiver] Erreur BD:", e);
    return NextResponse.json(
      { error: "Erreur serveur. Réessaie ou contacte-nous par téléphone." },
      { status: 500 },
    );
  }
}
