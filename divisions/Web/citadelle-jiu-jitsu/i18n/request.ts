import { getRequestConfig } from "next-intl/server";
import { notFound } from "next/navigation";
import { locales, defaultLocale, type Locale } from "@/lib/locales";

// =============================================================================
// Configuration next-intl côté serveur
// -----------------------------------------------------------------------------
// Charge les messages JSON correspondant à la locale demandée.
// Si la locale n'est pas supportée → 404.
// =============================================================================

export default getRequestConfig(async ({ requestLocale }) => {
  // Next.js 15+ : requestLocale est une Promise<string | undefined>
  let locale = (await requestLocale) ?? defaultLocale;

  // Validation stricte : refuse toute locale non supportée
  if (!locales.includes(locale as Locale)) {
    notFound();
  }

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
    timeZone: "America/Toronto",
    now: new Date(),
  };
});
