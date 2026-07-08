import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

// =============================================================================
// En-têtes HTTP de sécurité (Groupe Supernova)
// -----------------------------------------------------------------------------
// Conformes OWASP Secure Headers Project + Mozilla Observatory (cible A+)
// Mis à jour : 2026-05-08
//
// Couverture :
//   HSTS            — force HTTPS, éligible preload list
//   X-Frame-Options — anti-clickjacking (legacy + moderne via CSP)
//   X-Content-Type  — interdit le MIME sniffing
//   Referrer-Policy — fuite d'URL minimale
//   Permissions     — révoque toutes les API sensibles du navigateur
//   COOP            — isolation cross-origin (protection Spectre/XS-Leaks)
//   CORP            — empêche le chargement de nos ressources par des tiers
//   CSP             — liste blanche stricte des sources autorisées
// =============================================================================
const securityHeaders = [
  // ── Transport ──────────────────────────────────────────────────────────────
  {
    // 2 ans, sous-domaines inclus, éligible au preload HSTS
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },

  // ── Anti-framing ───────────────────────────────────────────────────────────
  {
    // Support legacy (IE, vieux navigateurs) — doublé par frame-ancestors dans CSP
    key: "X-Frame-Options",
    value: "DENY",
  },

  // ── MIME sniffing ──────────────────────────────────────────────────────────
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },

  // ── Referrer ───────────────────────────────────────────────────────────────
  {
    // Envoie l'origine uniquement en cross-origin ; URL complète en same-origin
    key: "Referrer-Policy",
    value: "strict-origin-when-cross-origin",
  },

  // ── Permissions navigateur ─────────────────────────────────────────────────
  {
    // Révoque toutes les API sensibles + désactive Topics API (successeur FLoC)
    key: "Permissions-Policy",
    value: [
      "camera=()",
      "microphone=()",
      "geolocation=()",
      "payment=()",
      "usb=()",
      "bluetooth=()",
      "display-capture=()",
      "fullscreen=(self)",
      "browsing-topics=()",   // désactive Topics API (ciblage pub Google)
      "private-state-token-redemption=()",
      "private-state-token-issuance=()",
    ].join(", "),
  },

  // ── Cross-Origin Opener Policy (COOP) ──────────────────────────────────────
  {
    // Isole notre contexte de navigation — protection contre Spectre & XS-Leaks
    key: "Cross-Origin-Opener-Policy",
    value: "same-origin",
  },

  // ── Cross-Origin Resource Policy (CORP) ────────────────────────────────────
  {
    // Nos ressources (images, scripts) ne peuvent pas être chargées par des tiers
    key: "Cross-Origin-Resource-Policy",
    value: "same-site",
  },

  // ── Content Security Policy ────────────────────────────────────────────────
  {
    // Note : 'unsafe-inline' sur script-src est requis par Next.js App Router
    // pour les scripts d'hydratation inline (__NEXT_DATA__, etc.).
    // Un nonce-based CSP serait plus strict mais nécessite une config serveur avancée.
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      // unsafe-eval requis en dev Turbopack uniquement
      // Google Analytics GA4 (gtag.js chargé depuis googletagmanager.com)
      `script-src 'self' 'unsafe-inline' https://www.googletagmanager.com${
        process.env.NODE_ENV === "development" ? " 'unsafe-eval'" : ""
      }`,
      // Google Fonts (Urbanist) requiert googleapis.com pour la feuille de style
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      // data: pour SVG inline ; https: pour images externes (og-image, CDN futur)
      "img-src 'self' data: blob: https:",
      // Google Fonts (Urbanist) — fichiers woff2 hébergés sur gstatic.com
      "font-src 'self' data: https://fonts.gstatic.com",
      // connect-src : API interne + Google Analytics GA4
      "connect-src 'self' https://*.google-analytics.com https://*.analytics.google.com https://www.googletagmanager.com",
      // Bloque Flash, Java, PDF inline, etc.
      "object-src 'none'",
      "base-uri 'self'",
      // Le formulaire ne peut soumettre qu'à notre propre domaine
      "form-action 'self'",
      // Remplace X-Frame-Options pour les navigateurs modernes
      "frame-ancestors 'none'",
      "upgrade-insecure-requests",
    ].join("; "),
  },
];

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
};

export default withNextIntl(nextConfig);
