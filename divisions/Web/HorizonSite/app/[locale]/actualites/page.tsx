import type { Metadata } from "next";
import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import { articles, formatDate } from "./articlesData";

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

// Labels UI par locale
const ui: Record<string, { readTime: string; readMore: string; tags: string }> = {
  fr: { readTime: "min de lecture", readMore: "Lire l'article →", tags: "" },
  en: { readTime: "min read", readMore: "Read article →", tags: "" },
  es: { readTime: "min de lectura", readMore: "Leer el artículo →", tags: "" },
};

export default function ActualitesPage() {
  const t = useTranslations("actualites");
  const locale = useLocale();
  const labels = ui[locale] ?? ui.fr;

  return (
    <main className="max-w-4xl mx-auto px-6 py-20">
      {/* En-tête */}
      <h1 className="text-5xl font-bold text-h91-stellar text-center mb-4">
        {t("title")}
      </h1>
      <p className="text-center text-h91-stellar/60 mb-16 text-lg">
        {t("subtitle")}
      </p>

      {/* Liste d'articles */}
      <div className="flex flex-col gap-8">
        {articles.map((article) => {
          const content = article[locale as "fr" | "en" | "es"] ?? article.fr;
          return (
            <Link
              key={article.slug}
              href={`/actualites/${article.slug}`}
              className="group block rounded-2xl border border-h91-stellar/10 bg-h91-gravity/40 hover:border-h91-stellar/30 hover:bg-h91-gravity/60 transition-all duration-300 overflow-hidden"
            >
              {/* Barre de couleur division */}
              <div
                className="h-1 w-full"
                style={{ backgroundColor: article.accentColor }}
              />

              <div className="p-8">
                {/* Tags + date */}
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  {article.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs font-semibold px-3 py-1 rounded-full"
                      style={{
                        backgroundColor: `${article.accentColor}22`,
                        color: article.accentColor,
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                  <span className="text-h91-stellar/40 text-sm ml-auto">
                    {formatDate(article.date, locale)} · {article.readTime} {labels.readTime}
                  </span>
                </div>

                {/* Titre */}
                <h2 className="text-2xl font-bold text-h91-stellar mb-3 group-hover:text-h91-gold transition-colors leading-tight">
                  {content.title}
                </h2>

                {/* Extrait */}
                <p className="text-h91-stellar/60 leading-relaxed mb-6">
                  {content.excerpt}
                </p>

                {/* CTA inline */}
                <span
                  className="text-sm font-semibold transition-colors"
                  style={{ color: article.accentColor }}
                >
                  {labels.readMore}
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </main>
  );
}
