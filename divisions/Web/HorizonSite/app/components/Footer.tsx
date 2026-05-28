"use client";

import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";

export default function Footer() {
  const t = useTranslations("brand");
  const locale = useLocale();

  const privacyLabel =
    locale === "en" ? "Privacy Policy" : locale === "es" ? "Política de privacidad" : "Politique de confidentialité";
  const rightsLabel =
    locale === "en"
      ? "All rights reserved."
      : locale === "es"
      ? "Todos los derechos reservados."
      : "Tous droits réservés.";

  return (
    <footer className="mt-20 border-t border-h91-ion/20 py-10 bg-h91-gravity">
      <div className="max-w-6xl mx-auto px-6 text-center text-h91-stellar/70">
        <p className="font-semibold text-h91-stellar">
          {t("name")} — {t("tagline_footer")}
        </p>
        <p className="text-sm mt-2">
          © {new Date().getFullYear()} {t("name")}. {rightsLabel}
        </p>
        <div className="mt-4 flex justify-center gap-6 text-xs text-h91-stellar/40">
          <Link href="/confidentialite" className="hover:text-h91-ion transition">
            {privacyLabel}
          </Link>
        </div>
      </div>
    </footer>
  );
}
