"use client";

import { useState, useEffect } from "react";
import { useTranslations, useLocale } from "next-intl";
import { useRouter, usePathname, Link } from "@/i18n/navigation";
import Image from "next/image";

const locales = [
  { code: "fr", label: "FR" },
  { code: "en", label: "EN" },
  { code: "es", label: "ES" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const t = useTranslations("nav");
  const tBrand = useTranslations("brand");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
  }, []);

  const switchLocale = (newLocale: string) => {
    router.replace(pathname, { locale: newLocale });
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-transparent backdrop-blur-md border-b border-h91-ion/30">
      <div className="max-w-7xl mx-auto flex items-center px-8 py-4">

        {/* ZONE GAUCHE — MARK + NOM */}
        <div className="flex items-center" style={{ flex: "0 0 300px" }}>
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/mark-etoile.svg"
              alt="Mark Groupe Étoile Boréale"
              width={38}
              height={38}
              style={{ width: "38px", height: "38px" }}
              className="drop-shadow-lg"
            />
            <span className="text-lg font-bold text-h91-ion whitespace-nowrap">
              {tBrand("name")}
            </span>
          </Link>
        </div>

        {/* ZONE CENTRALE — MENU */}
        <nav className="hidden md:flex flex-1 justify-center items-center gap-6 text-h91-stellar">
          <Link href="/">{t("home")}</Link>
          <Link href="/divisions">{t("divisions")}</Link>
          <Link href="/portfolio">{t("portfolio")}</Link>
          <Link href="/tarification">{t("pricing")}</Link>
          <Link href="/actualites">{t("news")}</Link>
          <Link href="/contacts">{t("contacts")}</Link>
        </nav>

        {/* ZONE DROITE — SÉLECTEUR LANGUE + BOUTON */}
        <div className="hidden md:flex justify-end items-center gap-4" style={{ flex: "0 0 300px" }}>
          {/* Sélecteur de langue */}
          <div className="flex items-center gap-1">
            {locales.map((loc, i) => (
              <span key={loc.code} className="flex items-center">
                <button
                  onClick={() => mounted && switchLocale(loc.code)}
                  disabled={!mounted}
                  className={`text-xs font-bold px-1 transition ${
                    locale === loc.code
                      ? "text-h91-ion"
                      : "text-h91-stellar/40 hover:text-h91-stellar/70"
                  }`}
                >
                  {loc.label}
                </button>
                {i < locales.length - 1 && (
                  <span className="text-h91-stellar/20 text-xs">|</span>
                )}
              </span>
            ))}
          </div>

          <Link
            href="/rejoindre"
            className="px-4 py-2 rounded-lg bg-h91-ion text-h91-gravity font-semibold hover:bg-h91-fusion transition whitespace-nowrap"
          >
            {t("join")}
          </Link>
        </div>

        {/* HAMBURGER MOBILE */}
        <button
          className="md:hidden flex flex-col gap-1 ml-auto"
          onClick={() => setOpen(!open)}
          aria-label="Menu"
        >
          <span className="w-6 h-0.5 bg-h91-stellar"></span>
          <span className="w-6 h-0.5 bg-h91-stellar"></span>
          <span className="w-6 h-0.5 bg-h91-stellar"></span>
        </button>
      </div>

      {/* MENU MOBILE */}
      {open && (
        <div className="md:hidden bg-h91-gravity border-t border-h91-ion/30 px-6 py-4 flex flex-col gap-4 text-h91-stellar">
          <Link href="/" onClick={() => setOpen(false)}>{t("home")}</Link>
          <Link href="/divisions" onClick={() => setOpen(false)}>{t("divisions")}</Link>
          <Link href="/portfolio" onClick={() => setOpen(false)}>{t("portfolio")}</Link>
          <Link href="/tarification" onClick={() => setOpen(false)}>{t("pricing")}</Link>
          <Link href="/actualites" onClick={() => setOpen(false)}>{t("news")}</Link>
          <Link href="/contacts" onClick={() => setOpen(false)}>{t("contacts")}</Link>

          {/* Sélecteur langue mobile */}
          <div className="flex items-center gap-3 pt-2 border-t border-h91-ion/20">
            {locales.map((loc) => (
              <button
                key={loc.code}
                onClick={() => { if (mounted) { switchLocale(loc.code); setOpen(false); } }}
                disabled={!mounted}
                className={`text-sm font-bold transition ${
                  locale === loc.code
                    ? "text-h91-ion"
                    : "text-h91-stellar/40 hover:text-h91-stellar/70"
                }`}
              >
                {loc.label}
              </button>
            ))}
          </div>

          <Link
            href="/rejoindre"
            className="px-4 py-2 rounded-lg bg-h91-ion text-h91-gravity font-semibold hover:bg-h91-fusion transition text-center"
            onClick={() => setOpen(false)}
          >
            {t("join")}
          </Link>
        </div>
      )}
    </header>
  );
}
