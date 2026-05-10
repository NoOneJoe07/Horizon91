import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

// Plugin next-intl : pointe vers le fichier de configuration i18n.
// Voir ./i18n/request.ts pour le chargement des messages selon la locale.
const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

// =============================================================================
// En-têtes HTTP de sécurité (Horizon 91 — template v2)
// -----------------------------------------------------------------------------
// Conformes OWASP Secure Headers Project + Mozilla Observatory (cible A+)
// Alignés avec HorizonSite (Groupe Supernova) — base commune Horizon 91.
// Mis à jour : 2026-05-10
//
// Couverture :
//   HSTS            — force HTTPS, éligible preload list
//   X-Frame-Options — anti-clickjacking (legacy + moderne via CSP)
//   X-Content-Type  — interdit le MIME sniffing
//   Referrer-Policy — fuite d'URL minimale
//   Permissions     — révoque toutes les API sensibles du navigateur
//   COOP            — isolation cross-origin (protection Spectre/XS-Leaks)
//   CORP            — empêche le chargement de nos ressources par des tiers
//   CSP             — liste blanche stricte + Stripe.js (paiement en ligne)
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
  { key: "X-Content-Type-Options", value: "nosniff" },

  // ── Referrer ───────────────────────────────────────────────────────────────
  {
    // Envoie l'origine uniquement en cross-origin ; URL complète en same-origin
    key: "Referrer-Policy",
    value: "strict-origin-when-cross-origin",
  },

  // ── Permissions navigateur ─────────────────────────────────────────────────
  {
    // Révoque toutes les API sensibles + désactive Topics API (successeur FLoC)
    // Note : payment=() révoque l'API Payment Request — Stripe utilise son propre iframe
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
      "browsing-topics=()",             // désactive Topics API (ciblage pub Google)
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
    // Stripe.js autorisé en script-src, connect-src et frame-src
    // 'unsafe-inline' requis par Next.js App Router (hydratation __NEXT_DATA__)
    // 'unsafe-eval' uniquement en dev (Turbopack)
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      `script-src 'self' 'unsafe-inline'${
        process.env.NODE_ENV === "development" ? " 'unsafe-eval'" : ""
      } https://js.stripe.com`,
      "style-src 'self' 'unsafe-inline'",
      // data: pour SVG inline, blob: pour aperçus, https: pour images externes
      "img-src 'self' data: blob: https:",
      "font-src 'self' data:",
      // Stripe API pour les appels de paiement
      "connect-src 'self' https://api.stripe.com",
      // Stripe Elements s'affiche dans des iframes depuis js.stripe.com / hooks.stripe.com
      "frame-src https://js.stripe.com https://hooks.stripe.com",
      "object-src 'none'",
      "base-uri 'self'",
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
