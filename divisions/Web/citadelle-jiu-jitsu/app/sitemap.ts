import type { MetadataRoute } from "next";
import { prisma } from "@/lib/db";

// =============================================================================
// sitemap.ts — Sitemap dynamique Citadelle Jiu-Jitsu
// -----------------------------------------------------------------------------
// Généré automatiquement à chaque build Next.js.
// Accessible à : /sitemap.xml
//
// Priorités :
//   1.0 — Accueil
//   0.9 — Séance d'essai (conversion principale)
//   0.8 — Abonnements, Horaires, Instructeurs
//   0.7 — Boutique, Contact, Dojo Time feed
//   0.6 — Articles Dojo Time individuels, Galerie
//   0.5 — Pages légales
//
// Pages EXCLUES (confidentielles ou fonctionnelles) :
//   /admin, /connexion, /inscription, /mon-compte
// =============================================================================

const BASE_URL = "https://citadellebjj.com";
const locales = ["fr", "en"];

const staticRoutes = [
  { path: "",                 priority: 1.0, changeFrequency: "weekly"  as const },
  { path: "/seance-essai",   priority: 0.9, changeFrequency: "monthly" as const },
  { path: "/abonnements",    priority: 0.8, changeFrequency: "weekly"  as const },
  { path: "/horaires",       priority: 0.8, changeFrequency: "weekly"  as const },
  { path: "/instructeurs",   priority: 0.8, changeFrequency: "monthly" as const },
  { path: "/boutique",       priority: 0.7, changeFrequency: "weekly"  as const },
  { path: "/contact",        priority: 0.7, changeFrequency: "monthly" as const },
  { path: "/dojo-time",      priority: 0.7, changeFrequency: "daily"   as const },
  { path: "/galerie",        priority: 0.6, changeFrequency: "monthly" as const },
  { path: "/confidentialite",priority: 0.5, changeFrequency: "yearly"  as const },
  { path: "/conditions",     priority: 0.5, changeFrequency: "yearly"  as const },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const entries: MetadataRoute.Sitemap = [];

  // Routes statiques
  for (const locale of locales) {
    for (const route of staticRoutes) {
      entries.push({
        url: `${BASE_URL}/${locale}${route.path}`,
        lastModified: new Date(),
        changeFrequency: route.changeFrequency,
        priority: locale === "fr" ? route.priority : route.priority * 0.9,
      });
    }
  }

  // Articles Dojo Time — slugs dynamiques depuis la BD
  let posts: { slug: string; updatedAt: Date }[] = [];
  try {
    posts = await prisma.post.findMany({
      where: { status: "PUBLISHED" },
      select: { slug: true, updatedAt: true },
      orderBy: { publishedAt: "desc" },
    });
  } catch {
    // BD indisponible au build → on génère sans les articles
    posts = [];
  }

  for (const post of posts) {
    for (const locale of locales) {
      entries.push({
        url: `${BASE_URL}/${locale}/dojo-time/${post.slug}`,
        lastModified: post.updatedAt,
        changeFrequency: "monthly",
        priority: locale === "fr" ? 0.6 : 0.54,
      });
    }
  }

  return entries;
}
