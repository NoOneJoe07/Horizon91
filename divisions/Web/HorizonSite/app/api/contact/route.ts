import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

// Rate limiting simple en mémoire
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT = 3; // max 3 soumissions
const RATE_WINDOW = 60 * 60 * 1000; // par heure

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now > entry.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_WINDOW });
    return true;
  }

  if (entry.count >= RATE_LIMIT) return false;

  entry.count++;
  return true;
}

export async function POST(req: NextRequest) {
  // IP du visiteur
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";

  // Rate limiting
  if (!checkRateLimit(ip)) {
    return NextResponse.json(
      { error: "Trop de tentatives. Réessayez dans une heure." },
      { status: 429 }
    );
  }

  // Lecture et validation des données
  let body: { nom?: string; courriel?: string; message?: string; locale?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Données invalides." }, { status: 400 });
  }

  const { nom, courriel, message, locale } = body;

  // Validation basique
  if (!nom || typeof nom !== "string" || nom.trim().length < 2) {
    return NextResponse.json({ error: "Nom invalide." }, { status: 400 });
  }
  if (!courriel || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(courriel)) {
    return NextResponse.json({ error: "Courriel invalide." }, { status: 400 });
  }
  if (!message || typeof message !== "string" || message.trim().length < 10) {
    return NextResponse.json({ error: "Message trop court." }, { status: 400 });
  }

  // Sanitisation légère (éviter injections dans les headers)
  const safeName = nom.trim().replace(/[\r\n]/g, "");
  const safeEmail = courriel.trim().toLowerCase();
  const safeMessage = message.trim().slice(0, 5000);

  // Transporter SMTP Zoho
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: true, // SSL port 465
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  const subject =
    locale === "en"
      ? `New contact message from ${safeName}`
      : locale === "es"
      ? `Nuevo mensaje de contacto de ${safeName}`
      : `Nouveau message de contact — ${safeName}`;

  try {
    await transporter.sendMail({
      from: `"${safeName}" <${process.env.SMTP_USER}>`,
      replyTo: safeEmail,
      to: process.env.CONTACT_TO,
      subject,
      text: `Nom / Name: ${safeName}\nCourriel / Email: ${safeEmail}\n\n${safeMessage}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px;">
          <h2 style="color: #FF7A1A;">Nouveau message — Groupe Supernova</h2>
          <p><strong>Nom :</strong> ${safeName}</p>
          <p><strong>Courriel :</strong> <a href="mailto:${safeEmail}">${safeEmail}</a></p>
          <hr style="border-color: #FF7A1A;" />
          <p style="white-space: pre-wrap;">${safeMessage}</p>
          <hr style="border-color: #333;" />
          <p style="color: #888; font-size: 12px;">Envoyé depuis groupesupernova.ca</p>
        </div>
      `,
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("SMTP error:", error);
    return NextResponse.json(
      { error: "Erreur d'envoi. Réessayez plus tard." },
      { status: 500 }
    );
  }
}
