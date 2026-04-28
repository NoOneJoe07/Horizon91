// =============================================================================
// Configuration centrale des locales supportées par le site.
// -----------------------------------------------------------------------------
// Ajouter une nouvelle langue = ajouter ici + créer messages/<code>.json
// =============================================================================

export const locales = ["fr", "en"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "fr";

export const localeNames: Record<Locale, string> = {
  fr: "Français",
  en: "English",
};

export const localeFlags: Record<Locale, string> = {
  fr: "🇨🇦", // Québec (drapeau du Canada par convention web)
  en: "🇨🇦",
};
