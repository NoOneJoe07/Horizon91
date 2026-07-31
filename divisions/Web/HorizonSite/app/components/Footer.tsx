"use client";

import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import Image from "next/image";

export default function Footer() {
  const t = useTranslations("brand");
  const tf = useTranslations("footer");
  const tNav = useTranslations("nav");
  const locale = useLocale();

  const privacyLabel =
    locale === "en" ? "Privacy Policy"
    : locale === "es" ? "Política de privacidad"
    : "Politique de confidentialité";

  const rightsLabel =
    locale === "en" ? "All rights reserved."
    : locale === "es" ? "Todos los derechos reservados."
    : "Tous droits réservés.";

  const divisionsShort =
    locale === "en" ? { arp: "Arpenteur (Branding)", web: "Draveur (Web)", cyb: "Carillon (Cyber)" }
    : locale === "es" ? { arp: "Arpenteur (Marca)", web: "Draveur (Web)", cyb: "Carillon (Ciber)" }
    : { arp: "Arpenteur (Branding)", web: "Draveur (Web)", cyb: "Carillon (Cyber)" };

  return (
    <footer className="mt-0" style={{ backgroundColor: "#203478" }}>
      <div className="max-w-6xl mx-auto px-6 pt-16 pb-10">
        {/* Ligne du haut : logo + nav */}
        <div className="flex flex-col md:flex-row md:justify-between gap-10 mb-16">

          {/* Colonne 1 — Marque */}
          <div className="flex flex-col gap-4 md:max-w-[300px]">
            <Link href="/" className="flex items-center gap-3">
              <Image
                src="/mark-etoile.svg"
                alt="Compas Groupe Étoile Boréale"
                width={22}
                height={22}
                style={{ width: "22px", height: "22px" }}
              />
              <span
                className="font-semibold text-lg"
                style={{ color: "#FFFFFF", fontFamily: "var(--font-display, 'Gotham', 'Montserrat', system-ui)" }}
              >
                {t("name")}
              </span>
            </Link>
            <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.60)" }}>
              {tf("tagline")}
            </p>
          </div>

          {/* Colonne 2 — Divisions */}
          <div className="flex flex-col gap-4">
            <p className="text-xs font-bold uppercase" style={{ color: "#FFFFFF" }}>
              {tf("divisions_label")}
            </p>
            <Link href="/divisions/arpenteur" className="text-sm transition" style={{ color: "rgba(255,255,255,0.70)" }}>
              {divisionsShort.arp}
            </Link>
            <Link href="/divisions/web" className="text-sm transition" style={{ color: "rgba(255,255,255,0.70)" }}>
              {divisionsShort.web}
            </Link>
            <Link href="/divisions/cyber" className="text-sm transition" style={{ color: "rgba(255,255,255,0.70)" }}>
              {divisionsShort.cyb}
            </Link>
          </div>

          {/* Colonne 3 — Ressources */}
          <div className="flex flex-col gap-4">
            <p className="text-xs font-bold uppercase" style={{ color: "#FFFFFF" }}>
              {tf("ressources_label")}
            </p>
            <Link href="/portfolio" className="text-sm transition" style={{ color: "rgba(255,255,255,0.70)" }}>
              {tNav("portfolio")}
            </Link>
            <Link href="/tarification" className="text-sm transition" style={{ color: "rgba(255,255,255,0.70)" }}>
              {tNav("pricing")}
            </Link>
            <Link href="/actualites" className="text-sm transition" style={{ color: "rgba(255,255,255,0.70)" }}>
              {tNav("news")}
            </Link>
            <Link href="/divisions/arpenteur" className="text-sm transition" style={{ color: "rgba(255,255,255,0.70)" }}>
              {tf("guide_marque")}
            </Link>
          </div>

          {/* Colonne 4 — Contact */}
          <div className="flex flex-col gap-4">
            <p className="text-xs font-bold uppercase" style={{ color: "#FFFFFF" }}>
              {tf("contact_label")}
            </p>
            <p className="text-sm" style={{ color: "rgba(255,255,255,0.70)" }}>
              {tf("localisation")}
            </p>
            <a href="mailto:contact@etoileboreale.ca" className="text-sm transition" style={{ color: "#0099D1" }}>
              contact@etoileboreale.ca
            </a>
            <Link href="/contacts" className="text-sm transition" style={{ color: "rgba(255,255,255,0.70)" }}>
              {tNav("contacts")}
            </Link>
          </div>
        </div>

        {/* Ligne séparatrice */}
        <div className="w-full mb-6" style={{ borderTop: "1px solid rgba(255,255,255,0.15)" }} />

        {/* Bas de page */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-center sm:text-left">
          <p className="text-xs" style={{ color: "rgba(255,255,255,0.50)" }}>
            © {new Date().getFullYear()} {t("name")}. {rightsLabel}
          </p>
          <div className="flex flex-wrap items-center justify-center sm:justify-end gap-x-6 gap-y-1">
            <Link href="/confidentialite" className="text-xs transition" style={{ color: "rgba(255,255,255,0.50)" }}>
              {privacyLabel}
            </Link>
            <Link href="/termes" className="text-xs transition" style={{ color: "rgba(255,255,255,0.50)" }}>
              {tf("terms")}
            </Link>
          </div>
        </div>

        {/* Écosystème — discret, conservé à la demande de Jonathan */}
        <p className="text-xs text-center sm:text-left mt-4" style={{ color: "rgba(255,255,255,0.30)" }}>
          {tf("aussi")}: {" "}
          <a
            href="https://nordiklegion.ca"
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-2 transition"
            style={{ color: "rgba(255,255,255,0.35)" }}
          >
            Nordik Legion Studio
          </a>
          {" · "}
          <Link
            href="/le-crieur"
            className="underline underline-offset-2 transition"
            style={{ color: "rgba(255,255,255,0.35)" }}
          >
            {locale === "en" ? "The Town Crier" : "Le Crieur"}
          </Link>
        </p>
      </div>
    </footer>
  );
}
