// =============================================================================
// Header global — navigation principale + switcher de langue
// =============================================================================

import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { getSession } from "@/lib/auth";
import { LocaleSwitcher } from "./LocaleSwitcher";
import type { Locale } from "@/lib/locales";

interface HeaderProps {
  locale: Locale;
}

export async function Header({ locale }: HeaderProps) {
  const t = await getTranslations({ locale, namespace: "Nav" });
  const session = await getSession();

  const navLinks = [
    { href: `/${locale}`, label: t("home") },
    { href: `/${locale}/instructeurs`, label: t("instructors") },
    { href: `/${locale}/horaires`, label: t("schedule") },
    { href: `/${locale}/abonnements`, label: t("subscriptions") },
    { href: `/${locale}/boutique`, label: t("shop") },
    { href: `/${locale}/contact`, label: t("contact") },
  ];

  return (
    <header
      style={{
        backgroundColor: "var(--color-citadelle-surface)",
        borderBottom: "1px solid var(--color-citadelle-border)",
        position: "sticky",
        top: 0,
        zIndex: 50,
      }}
    >
      <div
        className="container-citadelle"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          paddingBlock: "1rem",
          gap: "2rem",
        }}
      >
        {/* Logo (placeholder texte — à remplacer par <Image> du logo officiel) */}
        <Link
          href={`/${locale}`}
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "1.5rem",
            fontWeight: 700,
            color: "var(--color-citadelle-gold)",
            letterSpacing: "0.05em",
          }}
        >
          CITADELLE
        </Link>

        {/* Navigation principale */}
        <nav style={{ display: "flex", gap: "1.5rem", flexWrap: "wrap" }}>
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              style={{
                color: "var(--color-citadelle-text)",
                fontSize: "0.95rem",
                fontWeight: 500,
              }}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Actions: trial CTA + auth + langue */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <Link href={`/${locale}/seance-essai`} className="btn-primary" style={{ fontSize: "0.875rem" }}>
            {t("trial")}
          </Link>

          {session ? (
            <>
              {session.role === "ADMIN" && (
                <Link
                  href={`/${locale}/admin`}
                  style={{ fontSize: "0.875rem", color: "var(--color-citadelle-gold)" }}
                >
                  {t("admin")}
                </Link>
              )}
              <form action={`/${locale}/api/auth/logout`} method="POST">
                <button
                  type="submit"
                  className="btn-secondary"
                  style={{ fontSize: "0.875rem" }}
                >
                  {t("logout")}
                </button>
              </form>
            </>
          ) : (
            <Link
              href={`/${locale}/connexion`}
              style={{ fontSize: "0.875rem", color: "var(--color-citadelle-text)" }}
            >
              {t("login")}
            </Link>
          )}

          <LocaleSwitcher currentLocale={locale} />
        </div>
      </div>
    </header>
  );
}
