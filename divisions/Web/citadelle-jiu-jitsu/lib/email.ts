// =============================================================================
// lib/email.ts — Helper d'envoi de courriels via Nodemailer + Gmail SMTP
// -----------------------------------------------------------------------------
// RÔLE :
//   Fournit une fonction utilitaire sendEmail() utilisée par les routes API
//   pour notifier le propriétaire (citadellejj@gmail.com) lors des
//   événements suivants :
//     - Nouveau message de contact (/api/contact)
//     - Nouvelle demande de séance d'essai (/api/trial)
//
// CONFIGURATION GMAIL (prérequis) :
//   1. Se connecter au compte citadellejj@gmail.com
//   2. Activer l'authentification à 2 facteurs (obligatoire pour App Password)
//   3. Aller dans Gérer le compte Google → Sécurité → Mots de passe d'application
//   4. Créer un mot de passe pour "Autre application" → nommer "Citadelle Site"
//   5. Copier le mot de passe 16 caractères généré dans SMTP_PASS dans .env
//
// VARIABLES D'ENVIRONNEMENT REQUISES (dans .env) :
//   SMTP_HOST=smtp.gmail.com
//   SMTP_PORT=587
//   SMTP_USER=citadellejj@gmail.com
//   SMTP_PASS=xxxx xxxx xxxx xxxx  (App Password Google — sans espaces)
//   OWNER_EMAIL=citadellejj@gmail.com
//
// COMPORTEMENT GRACIEUX :
//   Si les variables SMTP ne sont pas configurées (env de développement),
//   la fonction loggue un avertissement mais ne crashe pas l'API.
//   Les messages sont quand même sauvegardés en BD.
//
// AUTEUR    : Horizon 91 — Jonathan Patoine + Claude (Anthropic)
// CRÉÉ      : 2026-05-20
// DÉPENDANCES : nodemailer
// =============================================================================

import nodemailer from "nodemailer";

// ---------------------------------------------------------------------------
// Constantes de contact — propriétaire du dojo
// ---------------------------------------------------------------------------
const OWNER_PHONE    = "418-564-1047";
const OWNER_EMAIL_DISPLAY = "citadellejiujitsu@gmail.com";
const SITE_URL       = process.env.NEXT_PUBLIC_SITE_URL ?? "https://citadellebjj.com";

// ---------------------------------------------------------------------------
// Interface — paramètres d'un courriel
// ---------------------------------------------------------------------------
interface SendEmailOptions {
  to:      string;
  subject: string;
  html:    string;
}

// ---------------------------------------------------------------------------
// Transporter Nodemailer — initialisé une seule fois (module-level singleton)
// ---------------------------------------------------------------------------
// Lazy init : on ne crée le transporter que si les variables sont présentes.
// Évite une erreur au démarrage en dev si SMTP n'est pas configuré.
function createTransporter() {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = process.env;

  if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS) {
    return null;
  }

  return nodemailer.createTransport({
    host: SMTP_HOST,
    port: parseInt(SMTP_PORT, 10),
    secure: false,         // false = STARTTLS sur port 587 (recommandé Gmail)
    auth: {
      user: SMTP_USER,
      pass: SMTP_PASS,
    },
  });
}

// ---------------------------------------------------------------------------
// sendEmail() — fonction principale exportée
// ---------------------------------------------------------------------------
export async function sendEmail({ to, subject, html }: SendEmailOptions): Promise<void> {
  const transporter = createTransporter();

  if (!transporter) {
    // En dev sans SMTP configuré : on loggue seulement, pas d'erreur fatale
    console.warn("[email] SMTP non configuré — courriel non envoyé:", subject);
    return;
  }

  const from = `"Citadelle Jiu-Jitsu" <${process.env.SMTP_USER}>`;

  try {
    await transporter.sendMail({ from, to, subject, html });
    console.log(`[email] Envoyé → ${to} | ${subject}`);
  } catch (e) {
    // Erreur SMTP : on loggue mais on ne propage pas l'erreur vers l'API.
    // L'utilisateur ne doit pas voir un 500 si seulement l'email échoue.
    // Le message est déjà sauvegardé en BD à ce stade.
    console.error("[email] Erreur envoi:", e);
  }
}

// ---------------------------------------------------------------------------
// sendTrialReminderEmail() — rappel 48h envoyé au CLIENT
// ---------------------------------------------------------------------------
// Envoyé automatiquement ~48h avant la séance (cron Vercel) ou immédiatement
// si la séance est pour le lendemain (logique dans /api/trial/route.ts).
// Contient deux boutons-liens : Confirmer / Annuler.
// ---------------------------------------------------------------------------

interface TrialReminderData {
  firstName:    string;
  email:        string;
  preferredDate: Date;
  confirmToken: string;
  cancelToken:  string;
}

export async function sendTrialReminderEmail(data: TrialReminderData): Promise<void> {
  const { firstName, email, preferredDate, confirmToken, cancelToken } = data;

  const dateStr = preferredDate.toLocaleDateString("fr-CA", {
    weekday: "long", year: "numeric", month: "long", day: "numeric",
  });

  const confirmUrl = `${SITE_URL}/api/trial/confirm?token=${confirmToken}`;
  const cancelUrl  = `${SITE_URL}/api/trial/cancel?token=${cancelToken}`;

  const html = `
    <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;background:#1a1a1a;color:#e0e0e0;border-radius:8px;overflow:hidden;">

      <!-- En-tête -->
      <div style="background:#111;padding:30px;text-align:center;border-bottom:3px solid #c9a227;">
        <h1 style="color:#c9a227;margin:0;font-size:22px;letter-spacing:2px;">CITADELLE JIU-JITSU</h1>
        <p style="color:#888;margin:6px 0 0;font-size:0.85em;">964 rue Mainguy, Québec QC G1V 3S4</p>
      </div>

      <!-- Corps -->
      <div style="padding:32px 30px;">
        <h2 style="color:#c9a227;margin-top:0;">⏰ Rappel — Votre séance d'essai</h2>
        <p>Bonjour <strong>${firstName}</strong>,</p>
        <p>Votre séance d'essai à Citadelle Jiu-Jitsu est prévue pour le :</p>
        <p style="background:#111;border-left:4px solid #c9a227;padding:12px 16px;border-radius:4px;font-size:1.05em;">
          📅 <strong>${dateStr}</strong>
        </p>
        <p>Merci de confirmer votre présence ou de nous aviser si vous ne pouvez pas vous déplacer :</p>

        <!-- Boutons -->
        <div style="text-align:center;margin:30px 0;">
          <a href="${confirmUrl}"
             style="display:inline-block;background:#c9a227;color:#000;padding:14px 32px;text-decoration:none;border-radius:4px;font-weight:bold;font-size:1em;margin:6px;">
            ✅&nbsp; Confirmer ma présence
          </a>
          <br/>
          <a href="${cancelUrl}"
             style="display:inline-block;background:#3a3a3a;color:#e0e0e0;padding:14px 32px;text-decoration:none;border-radius:4px;font-weight:bold;font-size:1em;margin:6px;">
            ❌&nbsp; Annuler ma réservation
          </a>
        </div>

        <!-- Note annulation dernière minute -->
        <div style="border-top:1px solid #333;padding-top:20px;margin-top:10px;font-size:0.85em;color:#aaa;">
          <p><strong>Annulation de dernière minute ?</strong><br/>
          Contactez Jean-Sébastien directement :<br/>
          📞 <a href="tel:${OWNER_PHONE.replace(/-/g,"")}" style="color:#c9a227;">${OWNER_PHONE}</a>
          &nbsp;|&nbsp;
          ✉️ <a href="mailto:${OWNER_EMAIL_DISPLAY}" style="color:#c9a227;">${OWNER_EMAIL_DISPLAY}</a></p>

          <p>💡 <strong>Bonne nouvelle :</strong> vous pouvez aussi simplement vous présenter au gym
          lors de nos heures d'ouverture et mentionner que vous souhaitez faire un essai gratuit —
          aucune réservation requise !</p>
        </div>
      </div>

      <!-- Pied de page -->
      <div style="background:#111;padding:16px;text-align:center;font-size:0.8em;color:#555;">
        <p style="margin:0;">
          <a href="${SITE_URL}" style="color:#c9a227;text-decoration:none;">citadellebjj.com</a>
          &nbsp;|&nbsp; 964 rue Mainguy, Québec QC G1V 3S4
        </p>
      </div>
    </div>
  `;

  await sendEmail({
    to:      email,
    subject: `[Citadelle] Rappel — Votre séance d'essai du ${dateStr}`,
    html,
  });
}

// ---------------------------------------------------------------------------
// sendOwnerTrialStatusEmail() — notif au PROPRIÉTAIRE quand client confirme/annule
// ---------------------------------------------------------------------------

interface TrialStatusNotifData {
  firstName:    string;
  lastName:     string;
  email:        string;
  phone:        string;
  preferredDate: Date;
  action:       "confirmed" | "canceled";
}

export async function sendOwnerTrialStatusEmail(data: TrialStatusNotifData): Promise<void> {
  const { firstName, lastName, email, phone, preferredDate, action } = data;

  const dateStr = preferredDate.toLocaleDateString("fr-CA", {
    weekday: "long", year: "numeric", month: "long", day: "numeric",
  });

  const isConfirmed = action === "confirmed";
  const emoji    = isConfirmed ? "✅" : "❌";
  const label    = isConfirmed ? "a CONFIRMÉ" : "a ANNULÉ";
  const couleur  = isConfirmed ? "#2e7d32" : "#c62828";

  const html = `
    <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;">
      <div style="background:#111;padding:20px;text-align:center;border-bottom:3px solid #c9a227;">
        <h1 style="color:#c9a227;margin:0;font-size:20px;">CITADELLE JIU-JITSU</h1>
      </div>
      <div style="padding:24px;background:#1a1a1a;color:#e0e0e0;">
        <h2 style="color:${couleur};margin-top:0;">${emoji} ${firstName} ${lastName} ${label} sa séance d'essai</h2>
        <p><strong>Date :</strong> ${dateStr}</p>
        <p><strong>Nom :</strong> ${firstName} ${lastName}</p>
        <p><strong>Courriel :</strong> <a href="mailto:${email}" style="color:#c9a227;">${email}</a></p>
        <p><strong>Téléphone :</strong> <a href="tel:${phone}" style="color:#c9a227;">${phone}</a></p>
        <hr style="border-color:#333;margin:20px 0;"/>
        <p style="font-size:0.85em;color:#888;">
          <a href="${SITE_URL}/fr/admin/inscriptions" style="color:#c9a227;">Voir dans le panel admin</a>
        </p>
      </div>
    </div>
  `;

  await sendEmail({
    to:      process.env.OWNER_EMAIL ?? "citadellejj@gmail.com",
    subject: `[Citadelle] ${emoji} ${firstName} ${lastName} ${label} sa séance (${dateStr})`,
    html,
  });
}
