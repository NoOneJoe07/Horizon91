import type { Metadata } from "next";
import { useTranslations } from "next-intl";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  const titles: Record<string, string> = {
    fr: "Nous Contacter",
    en: "Contact Us",
    es: "Contáctenos",
  };
  const descriptions: Record<string, string> = {
    fr: "Contactez la Division Draveur (web), la Division Carillon (cybersécurité) ou la direction générale de Groupe Étoile Boréale. L'équipe de Sainte-Marie-de-Beauce répond rapidement.",
    en: "Contact Draveur Division (web), Carillon Division (cybersecurity) or executive leadership at Boreal Star Group. The Sainte-Marie-de-Beauce team responds quickly to all inquiries.",
    es: "Contacte la División Draveur (web), la División Carillon (ciberseguridad) o la dirección general de Grupo Estrella Boreal. El equipo de Sainte-Marie-de-Beauce responde rápidamente.",
  };

  const baseUrl = locale === "en" ? "https://borealstar.ca" : "https://etoileboreale.ca";
  const canonical = `${baseUrl}${locale === "fr" ? "" : `/${locale}`}/contacts`;

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

export default function ContactsPage() {
  const t = useTranslations("contacts");
  const membres = t.raw("membres") as {
    titre: string;
    couleur: string;
    courriel: string;
    note: string;
  }[];

  return (
    <main className="max-w-4xl mx-auto px-6 py-20">
      <h1 className="text-5xl font-bold text-h91-stellar text-center mb-4">
        {t("title")}
      </h1>
      <p className="text-center text-h91-stellar/60 mb-14 text-lg">
        {t("subtitle")}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {membres.map((c) => (
          <div
            key={c.titre}
            className="p-6 border border-h91-accretion/20 rounded-xl bg-h91-gravity/50 flex flex-col gap-2 hover:border-h91-accretion/50 transition"
          >
            <h2 className={`text-xl font-bold ${c.couleur}`}>{c.titre}</h2>
            <p className="text-h91-stellar/50 text-sm">{c.note}</p>
            <a
              href={`mailto:${c.courriel}`}
              className="mt-2 text-h91-stellar/80 hover:text-h91-ion transition text-sm font-mono"
            >
              {c.courriel}
            </a>
          </div>
        ))}
      </div>

      <div className="mt-14 text-center">
        <a
          href="rejoindre"
          className="inline-block px-8 py-4 bg-h91-ion text-h91-gravity font-bold rounded-lg text-lg hover:bg-h91-ion/80 transition"
        >
          {t("cta")}
        </a>
      </div>
    </main>
  );
}
