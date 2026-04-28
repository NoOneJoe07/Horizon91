// =============================================================================
// POST /api/auth/register
// -----------------------------------------------------------------------------
// Crée un compte USER (jamais ADMIN — promotion manuelle en BD).
// Connecte automatiquement après création.
// =============================================================================

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import {
  createSessionToken,
  hashPassword,
  setSessionCookie,
} from "@/lib/auth";
import { registerSchema } from "@/lib/validation";

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  const parsed = registerSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Données invalides", details: parsed.error.flatten() },
      { status: 400 },
    );
  }

  const { firstName, lastName, email, password } = parsed.data;
  const normalizedEmail = email.toLowerCase();

  // Anti-énumération : on tente la création, on attrape l'erreur unique
  try {
    const passwordHash = await hashPassword(password);
    const user = await prisma.user.create({
      data: {
        firstName,
        lastName,
        email: normalizedEmail,
        passwordHash,
        role: "USER",
      },
    });

    const token = await createSessionToken({
      userId: user.id,
      email: user.email,
      role: user.role,
    });
    await setSessionCookie(token);

    return NextResponse.json({
      ok: true,
      role: user.role,
      user: { id: user.id, email: user.email, firstName: user.firstName },
    });
  } catch (e: unknown) {
    // P2002 = violation d'unicité Prisma
    if (
      typeof e === "object" &&
      e !== null &&
      "code" in e &&
      (e as { code: string }).code === "P2002"
    ) {
      return NextResponse.json(
        { error: "Un compte existe déjà avec ce courriel." },
        { status: 409 },
      );
    }
    console.error("[/api/auth/register]", e);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
