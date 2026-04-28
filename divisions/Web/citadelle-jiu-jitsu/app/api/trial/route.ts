// =============================================================================
// POST /api/trial
// -----------------------------------------------------------------------------
// Enregistre une demande de séance d'essai.
// TODO (prochaine session) : envoyer un email au propriétaire via Resend.
// =============================================================================

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { trialSessionSchema } from "@/lib/validation";
import { getSession } from "@/lib/auth";

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  const parsed = trialSessionSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Données invalides", details: parsed.error.flatten() },
      { status: 400 },
    );
  }

  // Honeypot : si "website" est rempli, on ignore silencieusement
  if (parsed.data.website && parsed.data.website.length > 0) {
    return NextResponse.json({ ok: true }, { status: 200 });
  }

  // Si l'utilisateur est connecté, on lie la demande à son compte
  const session = await getSession();

  try {
    await prisma.trialSession.create({
      data: {
        userId: session?.userId ?? null,
        firstName: parsed.data.firstName,
        lastName: parsed.data.lastName,
        email: parsed.data.email.toLowerCase(),
        phone: parsed.data.phone,
        age: parsed.data.age,
        experience: parsed.data.experience,
        preferredDate: parsed.data.preferredDate,
        message: parsed.data.message ?? null,
      },
    });

    // TODO: envoyer un email au propriétaire via Resend
    //   await sendOwnerNotification({ trialSession: ... });

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("[/api/trial]", e);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
