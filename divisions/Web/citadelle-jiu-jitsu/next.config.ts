import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

// Plugin next-intl : pointe vers le fichier de configuration i18n.
// Voir ./i18n/request.ts pour le chargement des messages selon la locale.
const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

// =============================================================================
// En-têtes HTTP de sécurité (Horizon 91 — non-négociable)
// -----------------------------------------------------------------------------
// Conformes aux recommandations OWASP + Loi 25 du Québec.
// Le CSP autorise Stripe.js (paiement) — à durcir avant la mise en prod
// en remplaçant 'unsafe-inline' par des nonces générés par le middleware.
// =============================================================================
const securityHeaders = [
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
  },
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' https://js.stripe.com",
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: https:",
      "font-src 'self' data:",
      "connect-src 'self' https://api.stripe.com",
      "frame-src https://js.stripe.com https://hooks.stripe.com",
      "object-src 'none'",
      "base-uri 'self'",
      "form-action 'self'",
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
