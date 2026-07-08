import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

/* ─────────────────────────────────────────────────────────
   Variables d'environnement requises dans Vercel :
   ZOHO_USER    = contact@etoileboreale.ca (auth SMTP — app password Zoho)
   ZOHO_PASS    = mot de passe d'application Zoho (généré dans accounts.zohocloud.ca)
   CONTACT_TO   = jonathan.patoine@etoileboreale.ca (destinataire)
───────────────────────────────────────────────────────────── */

// ── Rate limiting — 5 requêtes max par IP par fenêtre de 10 minutes ──────────
const rateMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT = 5;
const RATE_WINDOW_MS = 10 * 60 * 1000; // 10 minutes

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateMap.get(ip);
  if (!entry || now > entry.resetAt) {
    rateMap.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS });
    return false;
  }
  if (entry.count >= RATE_LIMIT) return true;
  entry.count++;
  return false;
}

// ── Limites de longueur ───────────────────────────────────────────────────────
const MAX_NOM = 100;
const MAX_COURRIEL = 254; // RFC 5321
const MAX_MESSAGE = 5000;

// ── Transporter SMTP ─────────────────────────────────────────────────────────
const transporter = nodemailer.createTransport({
  host: "smtp.zohocloud.ca",
  port: 465,
  secure: true,
  auth: {
    user: process.env.ZOHO_USER,
    pass: process.env.ZOHO_PASS,
  },
});

export async function POST(req: NextRequest) {
  // ── Rate limiting ───────────────────────────────────────────────────────────
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    req.headers.get("x-real-ip") ??
    "unknown";

  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: "Trop de requêtes. Réessayez dans quelques minutes." },
      { status: 429 }
    );
  }

  try {
    const body = await req.json();
    const { nom, courriel, message, locale } = body as {
      nom: string;
      courriel: string;
      message: string;
      locale: string;
    };

    // ── Validation — présence, longueur min/max, format courriel ─────────────
    if (
      !nom?.trim() ||
      !courriel?.trim() ||
      !message?.trim() ||
      nom.trim().length < 2 ||
      nom.trim().length > MAX_NOM ||
      courriel.trim().length > MAX_COURRIEL ||
      message.trim().length < 10 ||
      message.trim().length > MAX_MESSAGE ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(courriel)
    ) {
      return NextResponse.json({ error: "Données invalides." }, { status: 400 });
    }

    const labelMap: Record<string, { subject: string; from: string }> = {
      fr: {
        subject: `Nouveau message — ${nom}`,
        from: `"Groupe Étoile Boréale" <${process.env.ZOHO_USER}>`,
      },
      en: {
        subject: `New message — ${nom}`,
        from: `"Boreal Star Group" <${process.env.ZOHO_USER}>`,
      },
      es: {
        subject: `Nuevo mensaje — ${nom}`,
        from: `"Grupo Estrella Boreal" <${process.env.ZOHO_USER}>`,
      },
    };

    const labels = labelMap[locale] ?? labelMap.fr;

    await transporter.sendMail({
      from: labels.from,
      to: process.env.CONTACT_TO ?? "contact@etoileboreale.ca",
      replyTo: courriel,
      subject: labels.subject,
      html: `
        <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;background:#0a0a0a;color:#F2F7FF;padding:32px;border-radius:12px;border:1px solid #FF7A1A33;">
          <div style="text-align:center;margin-bottom:24px;">
            <span style="font-size:12px;font-weight:bold;letter-spacing:0.15em;text-transform:uppercase;color:#FF7A1A;">
              etoileboreale.ca — Formulaire de contact
            </span>
          </div>
          <h2 style="color:#F2F7FF;font-size:22px;margin:0 0 20px;">Nouveau message</h2>
          <table style="width:100%;border-collapse:collapse;">
            <tr>
              <td style="padding:8px 12px;font-size:12px;color:#F2F7FF88;text-transform:uppercase;letter-spacing:0.1em;width:120px;">Nom</td>
              <td style="padding:8px 12px;color:#F2F7FF;font-weight:bold;">${escapeHtml(nom)}</td>
            </tr>
            <tr style="background:#FF7A1A0D;">
              <td style="padding:8px 12px;font-size:12px;color:#F2F7FF88;text-transform:uppercase;letter-spacing:0.1em;">Courriel</td>
              <td style="padding:8px 12px;"><a href="mailto:${escapeHtml(courriel)}" style="color:#FF7A1A;">${escapeHtml(courriel)}</a></td>
            </tr>
            <tr>
              <td style="padding:8px 12px;font-size:12px;color:#F2F7FF88;text-transform:uppercase;letter-spacing:0.1em;">Langue</td>
              <td style="padding:8px 12px;color:#F2F7FF;">${locale.toUpperCase()}</td>
            </tr>
          </table>
          <div style="margin-top:24px;padding:20px;background:#111;border-radius:8px;border-left:3px solid #FF7A1A;">
            <p style="font-size:12px;color:#F2F7FF44;text-transform:uppercase;letter-spacing:0.1em;margin:0 0 10px;">Message</p>
            <p style="color:#F2F7FF;line-height:1.7;margin:0;white-space:pre-wrap;">${escapeHtml(message)}</p>
          </div>
          <p style="margin-top:24px;font-size:11px;color:#F2F7FF33;text-align:center;">
            Répondre directement à cet email pour contacter l'expéditeur.
          </p>
        </div>
      `,
    });

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (err) {
    console.error("[API /contact]", err);
    return NextResponse.json({ error: "Erreur serveur. Réessayez plus tard." }, { status: 500 });
  }
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
