"use client";

import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import Image from "next/image";

export default function Footer() {
  const t = useTranslations("brand");
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

  const ecosystemeLabel =
    locale === "en" ? "Ecosystem"
    : locale === "es" ? "Ecosistema"
    : "Écosystème";

  const divisionsLabel =
    locale === "en" ? "Our Divisions"
    : locale === "es" ? "Nuestras Divisiones"
    : "Nos Divisions";

  return (
    <footer className="mt-0 border-t" style={{ backgroundColor: "#1D1D1B", borderColor: "rgba(244,244,240,0.10)" }}>
      <div className="max-w-6xl mx-auto px-6 py-14">
        {/* Ligne du haut : logo + nav */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">

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
              {t("tagline_footer")}
            </p>
            <p className="text-xs font-bold tracking-widest uppercase" style={{ color: "#0099D1" }}>
              {locale === "en" ? "Create · Build · Protect"
               : locale === "es" ? "Crear · Construir · Proteger"
               : "Créer · Bâtir · Protéger"}
            </p>
          </div>

          {/* Colonne 2 — Divisions */}
          <div className="flex flex-col gap-3">
            <p className="text-xs font-bold tracking-widest uppercase mb-1" style={{ color: "rgba(244,244,240,0.40)" }}>
              {divisionsLabel}
            </p>
            <Link
              href="/divisions/arpenteur"
              className="text-sm transition flex items-center gap-2"
              style={{ color: "rgba(244,244,240,0.70)" }}
            >
              <span className="inline-block w-2 h-2 rounded-full" style={{ backgroundColor: "#5762A2" }}></span>
              {locale === "en" ? "Arpenteur Division — Branding & Design"
               : locale === "es" ? "División Arpenteur — Marca & Diseño"
               : "Division Arpenteur — Graphisme & Marque"}
            </Link>
            <Link
              href="/divisions/web"
              className="text-sm transition flex items-center gap-2"
              style={{ color: "rgba(244,244,240,0.70)" }}
            >
              <span className="inline-block w-2 h-2 rounded-full" style={{ backgroundColor: "#0099D1" }}></span>
              {locale === "en" ? "Draveur Division — Web Development"
               : locale === "es" ? "División Draveur — Desarrollo Web"
               : "Division Draveur — Développement Web"}
            </Link>
            <Link
              href="/divisions/cyber"
              className="text-sm transition flex items-center gap-2"
              style={{ color: "rgba(244,244,240,0.70)" }}
            >
              <span className="inline-block w-2 h-2 rounded-full" style={{ backgroundColor: "#203478" }}></span>
              {locale === "en" ? "Carillon Division — Cybersecurity"
               : locale === "es" ? "División Carillon — Ciberseguridad"
               : "Division Carillon — Cybersécurité"}
            </Link>
          </div>

          {/* Colonne 3 — Navigation + Écosystème */}
          <div className="flex flex-col gap-3">
            <p className="text-xs font-bold tracking-widest uppercase mb-1" style={{ color: "rgba(244,244,240,0.40)" }}>
              {ecosystemeLabel}
            </p>
            <a
              href="https://nordiklegion.ca"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm transition flex items-center gap-2"
              style={{ color: "rgba(244,244,240,0.50)" }}
            >
              <span className="text-xs">↗</span>
              Nordik Legion Studio
            </a>
            <Link
              href="/le-crieur"
              className="text-sm transition flex items-center gap-2"
              style={{ color: "rgba(244,244,240,0.50)" }}
            >
              <span className="text-xs">↗</span>
              {locale === "en" ? "The Town Crier" : "Le Crieur"}
            </Link>
            <div className="mt-3 pt-3 border-t flex flex-col gap-2" style={{ borderColor: "rgba(244,244,240,0.10)" }}>
              <Link href="/contacts" className="text-sm transition" style={{ color: "rgba(244,244,240,0.70)" }}>
                {tNav("contacts")}
              </Link>
              <Link href="/confidentialite" className="text-xs transition" style={{ color: "rgba(244,244,240,0.40)" }}>
                {privacyLabel}
              </Link>
            </div>
          </div>
        </div>

        {/* Bas de page */}
        <div className="pt-8 border-t text-center" style={{ borderColor: "rgba(244,244,240,0.08)" }}>
          <p className="text-xs" style={{ color: "rgba(244,244,240,0.35)" }}>
            © {new Date().getFullYear()} {t("name")}. {rightsLabel}
          </p>
        </div>
      </div>
    </footer>
  );
}
