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
  const [langOpen, setLangOpen] = useState(false);
  const t = useTranslations("nav");
  const tBrand = useTranslations("brand");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Ferme le dropdown langue si on clique ailleurs
  useEffect(() => {
    if (!langOpen) return;
    const close = () => setLangOpen(false);
    document.addEventListener("click", close);
    return () => document.removeEventListener("click", close);
  }, [langOpen]);

  const switchLocale = (newLocale: string) => {
    router.replace(pathname, { locale: newLocale });
  };

  return (
    /* Bleu Nuit Boréal (#203478) — couleur header du brand book de Paulina */
    <header className="fixed top-0 left-0 w-full z-50" style={{ backgroundColor: "#203478" }}>
      <div className="max-w-7xl mx-auto flex items-center px-6 py-4">

        {/* ZONE GAUCHE — LOGO "simple blanco" (compas intégré au O, fourni par Paulina) */}
        <div className="flex items-center" style={{ flex: "0 0 280px" }}>
          <Link href="/" className="flex items-center">
            <Image
              src="/logo-etoile-header.png"
              alt={tBrand("name")}
              width={114}
              height={42}
              priority
              style={{ width: "114px", height: "42px" }}
            />
          </Link>
        </div>

        {/* ZONE CENTRALE — MENU DESKTOP */}
        <nav className="hidden md:flex flex-1 justify-center items-center gap-5 text-sm font-medium" style={{ color: "rgba(244,244,240,0.85)" }}>
          <Link href="/" className="hover:text-white transition">{t("home")}</Link>
          <Link href="/divisions" className="hover:text-white transition">{t("divisions")}</Link>
          <Link href="/portfolio" className="hover:text-white transition">{t("portfolio")}</Link>
          <Link href="/tarification" className="hover:text-white transition">{t("pricing")}</Link>
          <Link href="/actualites" className="hover:text-white transition">{t("news")}</Link>
          <Link href="/contacts" className="hover:text-white transition">{t("contacts")}</Link>
        </nav>

        {/* ZONE DROITE — LANGUE + CTA */}
        <div className="hidden md:flex justify-end items-center gap-4" style={{ flex: "0 0 280px" }}>
          {/* Sélecteur de langue — dropdown */}
          <div className="relative" onClick={e => e.stopPropagation()}>
            <button
              onClick={() => mounted && setLangOpen(v => !v)}
              disabled={!mounted}
              className="flex items-center gap-1 text-xs font-bold px-2 py-1 rounded transition"
              style={{
                color: "#F4F4F0",
                border: "1px solid rgba(244,244,240,0.25)",
                backgroundColor: langOpen ? "rgba(244,244,240,0.10)" : "transparent",
              }}
            >
              {locale.toUpperCase()}
              <svg width="8" height="5" viewBox="0 0 8 5" fill="none" style={{ transition: "transform 0.15s", transform: langOpen ? "rotate(180deg)" : "rotate(0deg)" }}>
                <path d="M1 1l3 3 3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            {langOpen && (
              <div
                className="absolute right-0 top-full mt-1 rounded-lg overflow-hidden shadow-xl z-50"
                style={{ backgroundColor: "#162260", border: "1px solid rgba(244,244,240,0.15)", minWidth: "68px" }}
              >
                {locales.map(loc => (
                  <button
                    key={loc.code}
                    onClick={() => { switchLocale(loc.code); setLangOpen(false); }}
                    className="block w-full text-left px-3 py-2 text-xs font-bold transition"
                    style={{
                      color: locale === loc.code ? "#0099D1" : "rgba(244,244,240,0.75)",
                      backgroundColor: "transparent",
                    }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.backgroundColor = "rgba(255,255,255,0.08)"; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.backgroundColor = "transparent"; }}
                  >
                    {loc.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Bouton CTA — Bleu Polaire, pilule (cohérent avec hero/piliers/cta-final) */}
          <Link
            href="/rejoindre"
            className="px-5 py-2 rounded-full font-bold text-sm whitespace-nowrap transition"
            style={{ backgroundColor: "#0099D1", color: "#F4F4F0" }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.backgroundColor = "#007eb0"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.backgroundColor = "#0099D1"; }}
          >
            {t("join")}
          </Link>
        </div>

        {/* HAMBURGER MOBILE */}
        <button
          className="md:hidden flex flex-col gap-1.5 ml-auto"
          onClick={() => setOpen(!open)}
          aria-label="Menu"
        >
          <span className="w-6 h-0.5" style={{ backgroundColor: "#F4F4F0" }}></span>
          <span className="w-6 h-0.5" style={{ backgroundColor: "#F4F4F0" }}></span>
          <span className="w-6 h-0.5" style={{ backgroundColor: "#F4F4F0" }}></span>
        </button>
      </div>

      {/* MENU MOBILE */}
      {open && (
        <div className="md:hidden px-6 py-4 flex flex-col gap-4 text-sm font-medium border-t"
             style={{ backgroundColor: "#1a2a60", borderColor: "rgba(244,244,240,0.15)", color: "rgba(244,244,240,0.85)" }}>
          <Link href="/" onClick={() => setOpen(false)} className="hover:text-white transition">{t("home")}</Link>
          <Link href="/divisions" onClick={() => setOpen(false)} className="hover:text-white transition">{t("divisions")}</Link>
          <Link href="/portfolio" onClick={() => setOpen(false)} className="hover:text-white transition">{t("portfolio")}</Link>
          <Link href="/tarification" onClick={() => setOpen(false)} className="hover:text-white transition">{t("pricing")}</Link>
          <Link href="/actualites" onClick={() => setOpen(false)} className="hover:text-white transition">{t("news")}</Link>
          <Link href="/contacts" onClick={() => setOpen(false)} className="hover:text-white transition">{t("contacts")}</Link>

          {/* Sélecteur langue mobile */}
          <div className="flex items-center gap-3 pt-2 border-t" style={{ borderColor: "rgba(244,244,240,0.15)" }}>
            {locales.map((loc) => (
              <button
                key={loc.code}
                onClick={() => { if (mounted) { switchLocale(loc.code); setOpen(false); } }}
                disabled={!mounted}
                className="text-sm font-bold transition"
                style={{ color: locale === loc.code ? "#0099D1" : "rgba(244,244,240,0.45)" }}
              >
                {loc.label}
              </button>
            ))}
          </div>

          <Link
            href="/rejoindre"
            className="px-4 py-2 rounded-lg font-semibold text-center transition"
            style={{ backgroundColor: "#0099D1", color: "#F4F4F0" }}
            onClick={() => setOpen(false)}
          >
            {t("join")}
          </Link>
        </div>
      )}
    </header>
  );
}
