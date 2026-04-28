// =============================================================================
// Authentification — JWT + bcrypt
// -----------------------------------------------------------------------------
// Utilise `jose` (compatible Edge Runtime de Next.js) au lieu de jsonwebtoken
// qui ne fonctionne pas dans le middleware.
// =============================================================================

import bcrypt from "bcryptjs";
import { SignJWT, jwtVerify, type JWTPayload } from "jose";
import { cookies } from "next/headers";
import { prisma } from "@/lib/db";

const COOKIE_NAME = "citadelle_session";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 7; // 7 jours

function getSecret(): Uint8Array {
  const secret = process.env.JWT_SECRET;
  if (!secret || secret.length < 32) {
    throw new Error(
      "JWT_SECRET manquant ou trop court (min 32 caractères). Voir .env.example.",
    );
  }
  return new TextEncoder().encode(secret);
}

// -----------------------------------------------------------------------------
// Mots de passe
// -----------------------------------------------------------------------------

export async function hashPassword(plain: string): Promise<string> {
  return bcrypt.hash(plain, 12);
}

export async function verifyPassword(
  plain: string,
  hash: string,
): Promise<boolean> {
  return bcrypt.compare(plain, hash);
}

// -----------------------------------------------------------------------------
// JWT
// -----------------------------------------------------------------------------

export interface SessionPayload extends JWTPayload {
  userId: string;
  email: string;
  role: "USER" | "ADMIN";
}

export async function createSessionToken(
  payload: Omit<SessionPayload, "iat" | "exp">,
): Promise<string> {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${COOKIE_MAX_AGE}s`)
    .sign(getSecret());
}

export async function verifySessionToken(
  token: string,
): Promise<SessionPayload | null> {
  try {
    const { payload } = await jwtVerify(token, getSecret());
    return payload as SessionPayload;
  } catch {
    return null;
  }
}

// -----------------------------------------------------------------------------
// Cookies de session (Next.js Server Components / Route Handlers)
// -----------------------------------------------------------------------------

export async function setSessionCookie(token: string): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: COOKIE_MAX_AGE,
  });
}

export async function clearSessionCookie(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
}

export async function getSession(): Promise<SessionPayload | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  if (!token) return null;
  return verifySessionToken(token);
}

// -----------------------------------------------------------------------------
// Helpers de protection (à utiliser dans les Server Components / layouts)
// -----------------------------------------------------------------------------

export async function requireUser(): Promise<SessionPayload> {
  const session = await getSession();
  if (!session) {
    throw new Error("UNAUTHORIZED");
  }
  return session;
}

export async function requireAdmin(): Promise<SessionPayload> {
  const session = await requireUser();
  if (session.role !== "ADMIN") {
    throw new Error("FORBIDDEN");
  }
  // Vérification additionnelle en BD : si le rôle a changé entre temps,
  // on doit refuser l'accès même si le JWT est valide.
  const dbUser = await prisma.user.findUnique({
    where: { id: session.userId },
    select: { role: true },
  });
  if (dbUser?.role !== "ADMIN") {
    throw new Error("FORBIDDEN");
  }
  return session;
}
