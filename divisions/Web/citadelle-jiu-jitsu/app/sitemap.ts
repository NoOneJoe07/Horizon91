import type { MetadataRoute } from "next";

// =============================================================================
// sitemap.ts — Sitemap dynamique Citadelle Jiu-Jitsu
// -----------------------------------------------------------------------------
// Généré automatiquement à chaque build Next.js.
// Accessible à : /sitemap.xml
// Soumis à Google Search Console après déploiement.
//
// Priorités :
//   1.0 — Accueil (page la plus importante)
//   0.9 — Séance d'essai (conversion principale)
//   0.8 — Abonnements, Horaires, Instructeurs
//   0.7 — Boutique, Contact, Galerie
//   0.5 — Pages légales (indexées mais déprioritisées)
//
// Pages EXCLUES volontairement (confidentielles ou fonctionnelles) :
//   /admin, /connexion, /inscription
// =============================================================================

const BASE_URL = "https://citadellejiujitsu.ca";

const locales = ["fr", "en"];

const routes = [
  { path: "",               priority: 1.0, changeFrequency: "weekly"  as const },
  { path: "/seance-essai",  priority: 0.9, changeFrequency: "monthly" as const },
  { path: "/abonnements",   priority: 0.8, changeFrequency: "weekly"  as const },
  { path: "/horaires",      priority: 0.8, changeFrequency: "weekly"  as const },
  { path: "/instructeurs",  priority: 0.8, changeFrequency: "monthly" as const },
  { path: "/boutique",      priority: 0.7, changeFrequency: "weekly"  as const },
  { path: "/contact",       priority: 0.7, changeFrequency: "monthly" as const },
  { path: "/galerie",       priority: 0.6, changeFrequency: "monthly" as const },
  { path: "/confidentialite", priority: 0.5, changeFrequency: "yearly" as const },
  { path: "/conditions",    priority: 0.5, changeFrequency: "yearly"  as const },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    for (const route of routes) {
      entries.push({
        url: `${BASE_URL}/${locale}${route.path}`,
        lastModified: new Date(),
        changeFrequency: route.changeFrequency,
        // Légère priorité inférieure pour EN vs FR (marché principal = FR)
        priority: locale === "fr" ? route.priority : route.priority * 0.9,
      });
    }
  }

  return entries;
}
