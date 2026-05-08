"use client";

import { useTranslations } from "next-intl";

export default function Footer() {
  const t = useTranslations("brand");

  return (
    <footer className="mt-20 border-t border-h91-accretion/20 py-10 bg-h91-gravity">
      <div className="max-w-6xl mx-auto px-6 text-center text-h91-stellar/70">
        <p className="font-semibold text-h91-stellar">
          {t("name")} — {t("tagline_footer")}
        </p>
        <p className="text-sm mt-2">
          © {new Date().getFullYear()} {t("name")}. Tous droits réservés.
        </p>
      </div>
    </footer>
  );
}
