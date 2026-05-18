// =============================================================================
// POST /api/auth/logout
// -----------------------------------------------------------------------------
// Supprime le cookie de session côté serveur.
// Redirige vers /[locale]/connexion?bye=1 pour afficher le feedback.
// =============================================================================

import { NextRequest, NextResponse } from "next/server";
import { clearSessionCookie } from "@/lib/auth";

export async function POST(req: NextRequest) {
  await clearSessionCookie();

  // Extraire la locale depuis le Referer (ex: /fr/admin → fr)
  const referer = req.headers.get("referer") ?? "";
  const localeMatch = referer.match(/\/(fr|en)\//);
  const locale = localeMatch ? localeMatch[1] : "fr";

  const baseUrl = req.nextUrl.origin;
  return NextResponse.redirect(
    new URL(`/${locale}/connexion?bye=1`, baseUrl),
    303,
  );
}
