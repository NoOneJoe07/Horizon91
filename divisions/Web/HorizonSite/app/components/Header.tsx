"use client";

import { useState } from "react";
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
  const t = useTranslations("nav");
  const tBrand = useTranslations("brand");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const switchLocale = (newLocale: string) => {
    router.replace(pathname, { locale: newLocale });
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-transparent backdrop-blur-md border-b border-h91-accretion/30">
      <div className="max-w-6xl mx-auto flex items-center px-6 py-4">

        {/* ZONE GAUCHE — MARK + NOM */}
        <div className="flex-1 flex items-center">
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/mark-supernova.svg"
              alt="Mark Groupe Supernova"
              width={42}
              height={42}
              style={{ width: "42px", height: "42px" }}
              className="drop-shadow-lg"
            />
            <span className="text-xl font-bold text-h91-accretion">
              {tBrand("name")}
            </span>
          </Link>
        </div>

        {/* ZONE CENTRALE — MENU */}
        <nav className="hidden md:flex flex-1 justify-center items-center gap-8 text-h91-stellar">
          <Link href="/">{t("home")}</Link>
          <Link href="/divisions">{t("divisions")}</Link>
          <Link href="/portfolio">{t("portfolio")}</Link>
          <Link href="/actualites">{t("news")}</Link>
          <Link href="/contacts">{t("contacts")}</Link>
        </nav>

        {/* ZONE DROITE — SÉLECTEUR LANGUE + BOUTON */}
        <div className="hidden md:flex flex-1 justify-end items-center gap-4">
          {/* Sélecteur de langue */}
          <div className="flex items-center gap-1">
            {locales.map((loc, i) => (
              <span key={loc.code} className="flex items-center">
                <button
                  onClick={() => switchLocale(loc.code)}
                  className={`text-xs font-bold px-1 transition ${
                    locale === loc.code
                      ? "text-h91-accretion"
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
            className="px-4 py-2 rounded-lg bg-h91-accretion text-h91-gravity font-semibold hover:bg-h91-fusion transition"
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
        <div className="md:hidden bg-h91-gravity border-t border-h91-accretion/30 px-6 py-4 flex flex-col gap-4 text-h91-stellar">
          <Link href="/" onClick={() => setOpen(false)}>{t("home")}</Link>
          <Link href="/divisions" onClick={() => setOpen(false)}>{t("divisions")}</Link>
          <Link href="/portfolio" onClick={() => setOpen(false)}>{t("portfolio")}</Link>
          <Link href="/actualites" onClick={() => setOpen(false)}>{t("news")}</Link>
          <Link href="/contacts" onClick={() => setOpen(false)}>{t("contacts")}</Link>

          {/* Sélecteur langue mobile */}
          <div className="flex items-center gap-3 pt-2 border-t border-h91-accretion/20">
            {locales.map((loc) => (
              <button
                key={loc.code}
                onClick={() => { switchLocale(loc.code); setOpen(false); }}
                className={`text-sm font-bold transition ${
                  locale === loc.code
                    ? "text-h91-accretion"
                    : "text-h91-stellar/40 hover:text-h91-stellar/70"
                }`}
              >
                {loc.label}
              </button>
            ))}
          </div>

          <Link
            href="/rejoindre"
            className="px-4 py-2 rounded-lg bg-h91-accretion text-h91-gravity font-semibold hover:bg-h91-fusion transition text-center"
            onClick={() => setOpen(false)}
          >
            {t("join")}
          </Link>
        </div>
      )}
    </header>
  );
}
