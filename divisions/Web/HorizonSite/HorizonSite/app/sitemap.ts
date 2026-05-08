import type { MetadataRoute } from "next";

const BASE_URL = "https://groupesupernova.ca";

const routes = [
  { path: "", priority: 1.0, changeFrequency: "weekly" as const },
  { path: "/divisions", priority: 0.9, changeFrequency: "monthly" as const },
  { path: "/divisions/web", priority: 0.8, changeFrequency: "monthly" as const },
  { path: "/divisions/cyber", priority: 0.8, changeFrequency: "monthly" as const },
  { path: "/portfolio", priority: 0.8, changeFrequency: "weekly" as const },
  { path: "/contacts", priority: 0.7, changeFrequency: "monthly" as const },
  { path: "/rejoindre", priority: 0.6, changeFrequency: "monthly" as const },
];

const locales = ["fr", "en", "es"];

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    for (const route of routes) {
      const localePath = locale === "fr" ? route.path : `/${locale}${route.path}`;
      entries.push({
        url: `${BASE_URL}${localePath || "/"}`,
        lastModified: new Date(),
        changeFrequency: route.changeFrequency,
        priority: locale === "fr" ? route.priority : route.priority * 0.9,
      });
    }
  }

  return entries;
}
