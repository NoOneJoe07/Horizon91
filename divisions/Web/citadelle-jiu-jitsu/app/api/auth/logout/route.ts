// =============================================================================
// POST /api/auth/logout
// -----------------------------------------------------------------------------
// Supprime le cookie de session côté serveur.
// =============================================================================

import { NextResponse } from "next/server";
import { clearSessionCookie } from "@/lib/auth";

export async function POST() {
  await clearSessionCookie();
  // Redirige vers l'accueil français par défaut
  return NextResponse.redirect(new URL("/fr", "http://localhost"), 303);
}
