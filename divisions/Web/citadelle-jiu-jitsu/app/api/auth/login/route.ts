// =============================================================================
// POST /api/auth/login
// -----------------------------------------------------------------------------
// Vérifie email + mot de passe, crée un JWT et le pose dans un cookie HttpOnly.
// =============================================================================

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import {
  createSessionToken,
  setSessionCookie,
  verifyPassword,
  COOKIE_MAX_AGE_LONG,
  COOKIE_MAX_AGE_SHORT,
} from "@/lib/auth";
import { loginSchema } from "@/lib/validation";
import { checkLoginRateLimit } from "@/lib/ratelimit";

export async function POST(req: NextRequest) {
  // Rate limiting — 5 tentatives / 15 min par IP
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim()
    ?? req.headers.get("x-real-ip")
    ?? "unknown";
  const rl = await checkLoginRateLimit(ip);
  if (!rl.success) {
    return NextResponse.json(
      { error: `Trop de tentatives. Réessaie dans ${Math.ceil(rl.retryAfter / 60)} min.` },
      { status: 429, headers: { "Retry-After": String(rl.retryAfter) } },
    );
  }

  // Validation
  const body = await req.json().catch(() => null);
  const parsed = loginSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Données invalides", details: parsed.error.flatten() },
      { status: 400 },
    );
  }

  const { email, password } = parsed.data;

  // Rate limiting basique : on ne révèle JAMAIS si l'email existe ou pas.
  // Les deux cas (email inconnu, mot de passe faux) renvoient le même message.
  const user = await prisma.user.findUnique({
    where: { email: email.toLowerCase() },
  });

  if (!user) {
    return NextResponse.json({ error: "Identifiants invalides" }, { status: 401 });
  }

  const valid = await verifyPassword(password, user.passwordHash);
  if (!valid) {
    return NextResponse.json({ error: "Identifiants invalides" }, { status: 401 });
  }

  // Durée de session :
  // ADMIN          → toujours 7 jours (usage régulier, machine de confiance)
  // USER + remember → 7 jours (cookie persistant)
  // USER sans remember → session cookie (expire à la fermeture du navigateur, JWT 2h)
  const rememberMe = !!(body as Record<string, unknown>).rememberMe;
  const isAdmin = user.role === "ADMIN";
  const maxAge = (isAdmin || rememberMe) ? COOKIE_MAX_AGE_LONG : undefined;
  const jwtMaxAge = (isAdmin || rememberMe) ? COOKIE_MAX_AGE_LONG : COOKIE_MAX_AGE_SHORT;

  const token = await createSessionToken({
    userId: user.id,
    email: user.email,
    role: user.role,
  }, jwtMaxAge);
  await setSessionCookie(token, maxAge);

  return NextResponse.json({
    ok: true,
    role: user.role,
    user: { id: user.id, email: user.email, firstName: user.firstName },
  });
}
