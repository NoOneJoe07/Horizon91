import type { MetadataRoute } from "next";
import { articles } from "./[locale]/actualites/articlesData";

const BASE_URL = "https://etoileboreale.ca";

const routes = [
  { path: "", priority: 1.0, changeFrequency: "weekly" as const },
  { path: "/divisions", priority: 0.9, changeFrequency: "monthly" as const },
  { path: "/divisions/arpenteur", priority: 0.85, changeFrequency: "monthly" as const },
  { path: "/divisions/web", priority: 0.85, changeFrequency: "monthly" as const },
  { path: "/divisions/cyber", priority: 0.85, changeFrequency: "monthly" as const },
  { path: "/actualites", priority: 0.85, changeFrequency: "weekly" as const },
  { path: "/portfolio", priority: 0.8, changeFrequency: "weekly" as const },
  { path: "/tarification", priority: 0.75, changeFrequency: "monthly" as const },
  { path: "/manifeste", priority: 0.6, changeFrequency: "monthly" as const },
  { path: "/termes", priority: 0.4, changeFrequency: "yearly" as const },
  { path: "/contacts", priority: 0.7, changeFrequency: "monthly" as const },
  { path: "/rejoindre", priority: 0.6, changeFrequency: "monthly" as const },
  { path: "/equipe/jonathan-patoine", priority: 0.65, changeFrequency: "monthly" as const },
  { path: "/equipe/alexandra-espin", priority: 0.65, changeFrequency: "monthly" as const },
  { path: "/equipe/paulina-jaramillo", priority: 0.65, changeFrequency: "monthly" as const },
  { path: "/le-crieur", priority: 0.4, changeFrequency: "monthly" as const },
  // Articles individuels
  ...articles.map((a) => ({
    path: `/actualites/${a.slug}`,
    priority: 0.75,
    changeFrequency: "yearly" as const,
    lastModified: new Date(a.date),
  })),
];

const locales = ["fr", "en", "es"];

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    for (const route of routes) {
      const localePath = locale === "fr" ? route.path : `/${locale}${route.path}`;
      entries.push({
        url: `${BASE_URL}${localePath || "/"}`,
        lastModified: "lastModified" in route && route.lastModified
          ? route.lastModified
          : new Date(),
        changeFrequency: route.changeFrequency,
        priority: locale === "fr" ? route.priority : route.priority * 0.9,
      });
    }
  }

  return entries;
}
