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
    <footer className="mt-0 border-t" style={{ backgroundColor: "#1D1D1B", borderColor: "rgba(244,244,240,0.10)" }}>
      <div className="max-w-6xl mx-auto px-6 py-14">
        {/* Ligne du haut : logo + nav */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-10">

          {/* Colonne 1 — Marque */}
          <div className="flex flex-col gap-4">
            <Link href="/" className="flex items-center gap-3">
              <Image
                src="/mark-etoile.svg"
                alt="Compas Groupe Étoile Boréale"
                width={32}
                height={32}
                style={{ width: "32px", height: "32px" }}
              />
              <span
                className="font-bold text-sm"
                style={{ color: "#F4F4F0", fontFamily: "var(--font-display, 'Gotham', 'Montserrat', system-ui)" }}
              >
                {t("name")}
              </span>
            </Link>
            <p className="text-xs leading-relaxed" style={{ color: "rgba(244,244,240,0.55)" }}>
              {tf("tagline")}
            </p>
          </div>

          {/* Colonne 2 — Divisions */}
          <div className="flex flex-col gap-3">
            <p className="text-xs font-bold tracking-widest uppercase mb-1" style={{ color: "rgba(244,244,240,0.40)" }}>
              {tf("divisions_label")}
            </p>
            <Link href="/divisions/arpenteur" className="text-sm transition" style={{ color: "rgba(244,244,240,0.70)" }}>
              {divisionsShort.arp}
            </Link>
            <Link href="/divisions/web" className="text-sm transition" style={{ color: "rgba(244,244,240,0.70)" }}>
              {divisionsShort.web}
            </Link>
            <Link href="/divisions/cyber" className="text-sm transition" style={{ color: "rgba(244,244,240,0.70)" }}>
              {divisionsShort.cyb}
            </Link>
          </div>

          {/* Colonne 3 — Ressources */}
          <div className="flex flex-col gap-3">
            <p className="text-xs font-bold tracking-widest uppercase mb-1" style={{ color: "rgba(244,244,240,0.40)" }}>
              {tf("ressources_label")}
            </p>
            <Link href="/portfolio" className="text-sm transition" style={{ color: "rgba(244,244,240,0.70)" }}>
              {tNav("portfolio")}
            </Link>
            <Link href="/tarification" className="text-sm transition" style={{ color: "rgba(244,244,240,0.70)" }}>
              {tNav("pricing")}
            </Link>
            <Link href="/actualites" className="text-sm transition" style={{ color: "rgba(244,244,240,0.70)" }}>
              {tNav("news")}
            </Link>
            <Link href="/divisions/arpenteur" className="text-sm transition" style={{ color: "rgba(244,244,240,0.70)" }}>
              {tf("guide_marque")}
            </Link>
          </div>

          {/* Colonne 4 — Contact */}
          <div className="flex flex-col gap-3">
            <p className="text-xs font-bold tracking-widest uppercase mb-1" style={{ color: "rgba(244,244,240,0.40)" }}>
              {tf("contact_label")}
            </p>
            <p className="text-sm" style={{ color: "rgba(244,244,240,0.70)" }}>
              {tf("localisation")}
            </p>
            <a href="mailto:contact@etoileboreale.ca" className="text-sm transition" style={{ color: "rgba(244,244,240,0.70)" }}>
              contact@etoileboreale.ca
            </a>
            <div className="mt-3 pt-3 border-t flex flex-col gap-2" style={{ borderColor: "rgba(244,244,240,0.10)" }}>
              <Link href="/contacts" className="text-sm transition" style={{ color: "rgba(244,244,240,0.70)" }}>
                {tNav("contacts")}
              </Link>
            </div>
          </div>
        </div>

        {/* Bas de page */}
        <div className="pt-8 border-t flex flex-col items-center gap-3 text-center" style={{ borderColor: "rgba(244,244,240,0.08)" }}>
          <p className="text-xs" style={{ color: "rgba(244,244,240,0.35)" }}>
            © {new Date().getFullYear()} {t("name")}. {rightsLabel}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1">
            <Link href="/confidentialite" className="text-xs transition" style={{ color: "rgba(244,244,240,0.40)" }}>
              {privacyLabel}
            </Link>
            <Link href="/termes" className="text-xs transition" style={{ color: "rgba(244,244,240,0.40)" }}>
              {tf("terms")}
            </Link>
          </div>
          <p className="text-xs" style={{ color: "rgba(244,244,240,0.25)" }}>
            {tf("aussi")}: {" "}
            <a
              href="https://nordiklegion.ca"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2 transition"
              style={{ color: "rgba(244,244,240,0.30)" }}
            >
              Nordik Legion Studio
            </a>
            {" · "}
            <Link
              href="/le-crieur"
              className="underline underline-offset-2 transition"
              style={{ color: "rgba(244,244,240,0.30)" }}
            >
              {locale === "en" ? "The Town Crier" : "Le Crieur"}
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
