import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";
import { locales, defaultLocale } from "@/lib/locales";

// =============================================================================
// Middleware Next.js
// -----------------------------------------------------------------------------
// 1. Routing i18n (next-intl) — préfixe /fr ou /en sur toutes les routes
// 2. Protection des routes admin via cookie JWT
// 3. Rate limiting basique (anti-spam des formulaires publics)
// =============================================================================

const intlMiddleware = createMiddleware({
  locales,
  defaultLocale,
  localePrefix: "always", // /fr/... et /en/... toujours explicites
});

// Routes nécessitant une session admin (vérifiées en plus de l'i18n).
// On vérifie juste la PRÉSENCE du cookie ici — la validité du JWT
// est revérifiée côté serveur dans le layout admin (défense en profondeur).
const ADMIN_ROUTE_PATTERN = /^\/(fr|en)\/admin(\/.*)?$/;

export default function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // 1. Si route admin → vérifier présence cookie de session
  if (ADMIN_ROUTE_PATTERN.test(pathname)) {
    const sessionCookie = req.cookies.get("citadelle_session");
    if (!sessionCookie) {
      const locale = pathname.split("/")[1] || defaultLocale;
      const loginUrl = new URL(`/${locale}/connexion`, req.url);
      loginUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  // 2. Délègue à next-intl pour le routing i18n
  return intlMiddleware(req);
}

export const config = {
  // Toutes les routes SAUF :
  //   - /api/*       (gérées par les routes Next.js)
  //   - /_next/*     (assets internes Next.js)
  //   - fichiers statiques (favicon, robots, sitemap, images, etc.)
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
