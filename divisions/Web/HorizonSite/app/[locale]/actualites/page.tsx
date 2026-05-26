import type { Metadata } from "next";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  const titles: Record<string, string> = {
    fr: "Actualités — Blogue Numérique de la Beauce",
    en: "News — Digital Blog for Beauce Entrepreneurs",
    es: "Actualidades — Blog Digital de Beauce",
  };
  const descriptions: Record<string, string> = {
    fr: "Conseils web, alertes cybersécurité et actualités numériques rédigés par l'équipe de Groupe Étoile Boréale pour les entrepreneurs de Beauce et Chaudière-Appalaches.",
    en: "Web tips, cybersecurity alerts and digital news from the Boreal Star Group team, written for Beauce and Chaudière-Appalaches entrepreneurs.",
    es: "Consejos web, alertas de ciberseguridad y noticias digitales del equipo de Grupo Estrella Boreal para emprendedores de Beauce y Chaudière-Appalaches.",
  };

  const baseUrl = locale === "en" ? "https://borealstar.ca" : "https://etoileboreale.ca";
  const canonical = `${baseUrl}${locale === "fr" ? "" : `/${locale}`}/actualites`;

  return {
    title: titles[locale] ?? titles.fr,
    description: descriptions[locale] ?? descriptions.fr,
    alternates: { canonical },
    openGraph: {
      title: titles[locale] ?? titles.fr,
      description: descriptions[locale] ?? descriptions.fr,
      url: canonical,
    },
  };
}

export default function ActualitesPage() {
  const t = useTranslations("actualites");

  return (
    <main className="max-w-4xl mx-auto px-6 py-20">
      <h1 className="text-5xl font-bold text-h91-stellar text-center mb-4">
        {t("title")}
      </h1>
      <p className="text-center text-h91-stellar/60 mb-16 text-lg">
        {t("subtitle")}
      </p>

      {/* Placeholder — contenu à venir */}
      <div className="flex flex-col items-center justify-center py-24 border border-h91-accretion/20 rounded-xl bg-h91-gravity/30 text-center">
        <div className="text-5xl mb-6">🌌</div>
        <p className="text-h91-stellar/50 text-lg mb-2">{t("coming_soon")}</p>
        <p className="text-h91-stellar/30 text-sm max-w-md">{t("coming_desc")}</p>
        <Link
          href="/"
          className="mt-8 px-6 py-3 rounded-lg bg-h91-accretion text-h91-gravity font-semibold hover:bg-h91-fusion transition"
        >
          {t("back_home")}
        </Link>
      </div>
    </main>
  );
}
