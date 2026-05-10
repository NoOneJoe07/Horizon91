import type { MetadataRoute } from "next";

// =============================================================================
// robots.ts — Directives crawlers Citadelle Jiu-Jitsu
// -----------------------------------------------------------------------------
// Accessible à : /robots.txt
// Exclut les routes admin, auth et API des moteurs de recherche.
// =============================================================================

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/api/",
          "/_next/",
          "/fr/admin",
          "/en/admin",
          "/fr/connexion",
          "/en/connexion",
          "/fr/inscription",
          "/en/inscription",
        ],
      },
    ],
    sitemap: "https://citadellejiujitsu.ca/sitemap.xml",
    host: "https://citadellejiujitsu.ca",
  };
}
