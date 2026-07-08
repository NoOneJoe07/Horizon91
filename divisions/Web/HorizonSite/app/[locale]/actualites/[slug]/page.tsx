import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Link } from "@/i18n/navigation";
import { articles, getArticleBySlug, formatDate } from "../articlesData";

// ── Génère les routes statiques pour tous les articles ────────────────────────
export async function generateStaticParams() {
  const locales = ["fr", "en", "es"];
  return articles.flatMap((article) =>
    locales.map((locale) => ({ locale, slug: article.slug }))
  );
}

// ── Métadonnées SEO par article et locale ─────────────────────────────────────
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return {};

  const content = article[locale as "fr" | "en" | "es"] ?? article.fr;
  const baseUrl = locale === "en" ? "https://borealstar.ca" : "https://etoileboreale.ca";
  const canonical = `${baseUrl}${locale === "fr" ? "" : `/${locale}`}/actualites/${slug}`;

  return {
    title: content.title,
    description: content.excerpt,
    alternates: { canonical },
    openGraph: {
      title: content.title,
      description: content.excerpt,
      url: canonical,
      type: "article",
      publishedTime: article.date,
    },
  };
}

// ── Labels UI par locale ──────────────────────────────────────────────────────
const ui: Record<
  string,
  { back: string; readTime: string; publishedOn: string }
> = {
  fr: {
    back: "← Retour aux actualités",
    readTime: "min de lecture",
    publishedOn: "Publié le",
  },
  en: {
    back: "← Back to news",
    readTime: "min read",
    publishedOn: "Published on",
  },
  es: {
    back: "← Volver a las noticias",
    readTime: "min de lectura",
    publishedOn: "Publicado el",
  },
};

// ── Page article ──────────────────────────────────────────────────────────────
export default async function ArticlePage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) notFound();

  const content = article[locale as "fr" | "en" | "es"] ?? article.fr;
  const labels = ui[locale] ?? ui.fr;

  return (
    <main className="max-w-3xl mx-auto px-6 py-20">
      {/* Navigation retour */}
      <Link
        href="/actualites"
        className="inline-flex items-center text-h91-stellar/50 hover:text-h91-stellar text-sm mb-12 transition-colors"
      >
        {labels.back}
      </Link>

      {/* Barre de couleur + tags */}
      <div className="flex flex-wrap items-center gap-3 mb-6">
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
      </div>

      {/* Titre */}
      <h1 className="text-4xl md:text-5xl font-bold text-h91-stellar leading-tight mb-6">
        {content.title}
      </h1>

      {/* Meta — date + temps de lecture */}
      <div className="flex items-center gap-4 text-h91-stellar/40 text-sm mb-10">
        <span>
          {labels.publishedOn} {formatDate(article.date, locale)}
        </span>
        <span>·</span>
        <span>
          {article.readTime} {labels.readTime}
        </span>
      </div>

      {/* Séparateur couleur division */}
      <div
        className="h-0.5 w-16 rounded-full mb-10"
        style={{ backgroundColor: article.accentColor }}
      />

      {/* Corps de l'article */}
      <article className="prose-custom">
        {content.paragraphs.map((para, i) => (
          <p
            key={i}
            className="text-h91-stellar/80 leading-relaxed text-lg mb-6 last:mb-0"
          >
            {para}
          </p>
        ))}
      </article>

      {/* CTA */}
      <div className="mt-12 pt-10 border-t border-h91-stellar/10">
        {content.cta.external ? (
          <a
            href={content.cta.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-6 py-3 rounded-lg font-semibold text-h91-gravity transition-opacity hover:opacity-80"
            style={{ backgroundColor: article.accentColor }}
          >
            {content.cta.text}
          </a>
        ) : (
          <Link
            href={content.cta.url as `/${string}`}
            className="inline-flex items-center px-6 py-3 rounded-lg font-semibold text-h91-gravity transition-opacity hover:opacity-80"
            style={{ backgroundColor: article.accentColor }}
          >
            {content.cta.text}
          </Link>
        )}
      </div>
    </main>
  );
}
