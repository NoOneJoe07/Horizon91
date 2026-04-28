"use client";

// =============================================================================
// Switcher de langue FR ↔ EN
// -----------------------------------------------------------------------------
// Remplace simplement le préfixe de locale dans l'URL courante.
// =============================================================================

import { usePathname, useRouter } from "next/navigation";
import { locales, localeNames, type Locale } from "@/lib/locales";

interface LocaleSwitcherProps {
  currentLocale: Locale;
}

export function LocaleSwitcher({ currentLocale }: LocaleSwitcherProps) {
  const pathname = usePathname();
  const router = useRouter();

  function switchTo(newLocale: Locale) {
    if (newLocale === currentLocale) return;
    // Remplace /fr ou /en au début du pathname par la nouvelle locale
    const newPath = pathname.replace(/^\/(fr|en)/, `/${newLocale}`);
    router.push(newPath);
  }

  return (
    <div style={{ display: "flex", gap: "0.25rem", alignItems: "center" }}>
      {locales.map((loc) => (
        <button
          key={loc}
          type="button"
          onClick={() => switchTo(loc)}
          aria-label={`Changer la langue vers ${localeNames[loc]}`}
          aria-current={loc === currentLocale ? "page" : undefined}
          style={{
            padding: "0.3rem 0.6rem",
            background: loc === currentLocale ? "var(--color-citadelle-gold)" : "transparent",
            color: loc === currentLocale ? "var(--color-citadelle-bg)" : "var(--color-citadelle-text-muted)",
            border: "1px solid var(--color-citadelle-border)",
            borderRadius: "var(--radius-sm)",
            fontSize: "0.75rem",
            fontWeight: 600,
            cursor: "pointer",
            textTransform: "uppercase",
          }}
        >
          {loc}
        </button>
      ))}
    </div>
  );
}
