// =============================================================================
// app/api/contact/route.ts — Route API : formulaire de contact
// -----------------------------------------------------------------------------
// RÔLE :
//   Reçoit les soumissions du formulaire de contact (ContactForm.tsx),
//   valide les données, applique le filtre anti-spam honeypot,
//   et sauvegarde le message en BD (table ContactMessage).
//
// MÉTHODE : POST uniquement
//   GET, PUT, DELETE → 405 Method Not Allowed (non géré = Next.js retourne 405)
//
// FLUX COMPLET :
//   1. ContactForm.tsx → POST /api/contact avec { name, email, subject, message }
//   2. Cette route lit le body JSON
//   3. Validation Zod (contactSchema dans lib/validation.ts)
//   4. Vérification honeypot : si "website" rempli → retourne 200 silencieux
//   5. Insertion en BD via Prisma → table ContactMessage
//   6. Retourne { ok: true } → ContactForm affiche le message de succès
//
// TABLE BD : ContactMessage (définie dans prisma/schema.prisma)
//   Champs : id, name, email, subject, message, read (false par défaut), createdAt
//   Le champ "read" permet au proprio de marquer les messages lus dans l'admin.
//
// SÉCURITÉ :
//   - Validation Zod sur tous les champs (longueur, format email, etc.)
//   - Honeypot anti-spam (champ "website" caché)
//   - Pas d'authentification requise : le contact est public par conception
//   - Pas de rate limiting pour l'instant (à ajouter avant mise en prod)
//     → TODO: implémenter rate limiting (ex: 5 requêtes/heure par IP)
//
// TODO FUTUR (Resend) :
//   Quand Resend sera configuré, décommenter le bloc d'envoi de courriel :
//   → Notifier le proprio (Jean-Sébastien) qu'un nouveau message est arrivé
//   → Envoyer un accusé de réception à l'expéditeur
//   Voir /api/trial/route.ts pour le pattern identique déjà documenté.
//
// AUTEUR    : Horizon 91 — Jonathan Patoine + Claude (Anthropic)
// CRÉÉ      : 2026-05-04
// DÉPENDANCES : prisma, zod (contactSchema)
// =============================================================================

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { contactSchema } from "@/lib/validation";
import { sendEmail } from "@/lib/email";
import { checkContactRateLimit } from "@/lib/ratelimit";

// ---------------------------------------------------------------------------
// Handler POST
// ---------------------------------------------------------------------------
export async function POST(req: NextRequest) {

  // ── 0. Rate limiting — 5 messages / heure par IP ──────────────────────────
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim()
    ?? req.headers.get("x-real-ip")
    ?? "unknown";
  const rl = await checkContactRateLimit(ip);
  if (!rl.success) {
    return NextResponse.json(
      { error: `Trop de messages envoyés. Réessaie dans ${Math.ceil(rl.retryAfter / 60)} min.` },
      { status: 429, headers: { "Retry-After": String(rl.retryAfter) } },
    );
  }

  // ── 1. Lecture du body JSON ────────────────────────────────────────────────
  // req.json() parse le body de la requête HTTP comme du JSON.
  // .catch(() => null) : si le body n'est pas du JSON valide (requête malformée),
  // on retourne null au lieu de lever une exception non gérée.
  const body = await req.json().catch(() => null);

  // ── 2. Validation Zod ──────────────────────────────────────────────────────
  // contactSchema est défini dans lib/validation.ts.
  // safeParse() : ne lance pas d'exception, retourne { success, data } ou { success, error }.
  // C'est préférable à parse() qui lancerait une exception à gérer avec try/catch.
  const parsed = contactSchema.safeParse(body);

  if (!parsed.success) {
    // Zod fournit un rapport d'erreurs détaillé via .flatten()
    // Ex: { fieldErrors: { email: ["Courriel invalide"] } }
    // On le retourne en 400 Bad Request pour que le client puisse diagnostiquer.
    return NextResponse.json(
      { error: "Données invalides", details: parsed.error.flatten() },
      { status: 400 },
    );
  }

  // ── 3. Honeypot anti-spam ──────────────────────────────────────────────────
  // Le champ "website" est caché visuellement dans le formulaire.
  // Un humain ne le verra jamais → il restera vide.
  // Un robot remplit tous les champs → "website" contiendra quelque chose.
  // Stratégie silencieuse : on retourne 200 OK sans rien faire.
  // Le bot croit avoir réussi et ne réessaie pas → moins de bruit dans les logs.
  if (parsed.data.website && parsed.data.website.length > 0) {
    return NextResponse.json({ ok: true }, { status: 200 });
  }

  // ── 4. Insertion en BD ────────────────────────────────────────────────────
  try {
    await prisma.contactMessage.create({
      data: {
        name:    parsed.data.name,
        email:   parsed.data.email.toLowerCase(), // normalisation : tout en minuscules
        subject: parsed.data.subject,
        message: parsed.data.message,
        // "read" n'est pas passé → Prisma utilise la valeur par défaut : false
        // Le proprio verra les nouveaux messages comme "non lus" dans l'admin.
      },
    });

    // ── Notification courriel via Nodemailer + Gmail SMTP ──────────────────
    // sendEmail() est gracieux : loggue un warning si SMTP non configuré,
    // ne crashe pas l'API. Message déjà sauvegardé en BD à ce point.
    await sendEmail({
      to:      process.env.OWNER_EMAIL ?? "citadellejj@gmail.com",
      subject: `[Citadelle] Nouveau message : ${parsed.data.subject}`,
      html: `
        <h2 style="color:#c9a227">Nouveau message de contact</h2>
        <p><strong>De :</strong> ${parsed.data.name} &lt;${parsed.data.email}&gt;</p>
        <p><strong>Sujet :</strong> ${parsed.data.subject}</p>
        <hr style="border-color:#333"/>
        <p style="white-space:pre-wrap">${parsed.data.message}</p>
        <hr style="border-color:#333"/>
        <p style="font-size:0.85em;color:#888">Voir dans l'admin : <a href="https://citadellebjj.com/fr/admin/messages">Panel admin — Messages</a></p>
      `,
    });

    return NextResponse.json({ ok: true });

  } catch (e) {
    // Erreur BD : log détaillé côté serveur, message générique côté client.
    // On ne renvoie JAMAIS le détail de l'erreur BD au client (sécurité).
    console.error("[/api/contact] Erreur BD:", e);
    return NextResponse.json(
      { error: "Erreur serveur. Réessaie ou contacte-nous par téléphone." },
      { status: 500 },
    );
  }
}
