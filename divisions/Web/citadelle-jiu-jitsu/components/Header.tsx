// =============================================================================
// Header global — navigation principale + switcher de langue
// Desktop : nav horizontale | Mobile : hamburger → MobileNav (Client Component)
// =============================================================================

import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { getSession } from "@/lib/auth";
import { LocaleSwitcher } from "./LocaleSwitcher";
import { MobileNav } from "./MobileNav";
import type { Locale } from "@/lib/locales";

interface HeaderProps {
  locale: Locale;
}

export async function Header({ locale }: HeaderProps) {
  const t = await getTranslations({ locale, namespace: "Nav" });
  const session = await getSession();

  const navLinks = [
    { href: `/${locale}`,              label: t("home") },
    { href: `/${locale}/instructeurs`, label: t("instructors") },
    { href: `/${locale}/horaires`,     label: t("schedule") },
    { href: `/${locale}/abonnements`,  label: t("subscriptions") },
    { href: `/${locale}/boutique`,     label: t("shop") },
    { href: `/${locale}/contact`,      label: t("contact") },
  ];

  // Données passées au Client Component MobileNav
  const mobileSession = session ? { role: session.role } : null;
  const mobileLabels = {
    trial:     t("trial"),
    login:     t("login"),
    logout:    t("logout"),
    admin:     t("admin"),
    openMenu:  locale === "fr" ? "Ouvrir le menu" : "Open menu",
    closeMenu: locale === "fr" ? "Fermer le menu" : "Close menu",
  };

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
          paddingBlock: "0.75rem",
          gap: "1.5rem",
        }}
      >
        {/* Logo officiel */}
        <Link href={`/${locale}`} style={{ display: "flex", alignItems: "center", flexShrink: 0 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logo-citadelle.svg"
            alt="Citadelle Jiu-Jitsu"
            style={{ height: "52px", width: "auto" }}
          />
        </Link>

        {/* ---- Navigation desktop (cachée sur mobile) ---- */}
        <nav className="desktop-only" style={{ display: "flex", gap: "1.25rem", flexWrap: "wrap" }}>
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              style={{
                color: "var(--color-citadelle-text)",
                fontSize: "0.9rem",
                fontWeight: 500,
              }}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* ---- Actions desktop (cachées sur mobile) ---- */}
        <div className="desktop-only" style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <Link href={`/${locale}/seance-essai`} className="btn-primary" style={{ fontSize: "0.85rem" }}>
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
              <form action={`/api/auth/logout`} method="POST">
                <button type="submit" className="btn-secondary" style={{ fontSize: "0.85rem" }}>
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

        {/* ---- Côté droit mobile : switcher langue + hamburger ---- */}
        <div className="mobile-only" style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <LocaleSwitcher currentLocale={locale} />
          <MobileNav
            locale={locale}
            navLinks={navLinks}
            labels={mobileLabels}
            session={mobileSession}
          />
        </div>
      </div>
    </header>
  );
}
