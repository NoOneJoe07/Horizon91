// =============================================================================
// lib/email.ts — Helper d'envoi de courriels via Nodemailer + Gmail SMTP
// -----------------------------------------------------------------------------
// RÔLE :
//   Fournit une fonction utilitaire sendEmail() utilisée par les routes API
//   pour notifier le propriétaire (citadellejiujitsu@gmail.com) lors des
//   événements suivants :
//     - Nouveau message de contact (/api/contact)
//     - Nouvelle demande de séance d'essai (/api/trial)
//
// CONFIGURATION GMAIL (prérequis) :
//   1. Se connecter au compte citadellejiujitsu@gmail.com
//   2. Activer l'authentification à 2 facteurs (obligatoire pour App Password)
//   3. Aller dans Gérer le compte Google → Sécurité → Mots de passe d'application
//   4. Créer un mot de passe pour "Autre application" → nommer "Citadelle Site"
//   5. Copier le mot de passe 16 caractères généré dans SMTP_PASS dans .env
//
// VARIABLES D'ENVIRONNEMENT REQUISES (dans .env) :
//   SMTP_HOST=smtp.gmail.com
//   SMTP_PORT=587
//   SMTP_USER=citadellejiujitsu@gmail.com
//   SMTP_PASS=xxxx xxxx xxxx xxxx  (App Password Google — sans espaces)
//   OWNER_EMAIL=citadellejiujitsu@gmail.com
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
