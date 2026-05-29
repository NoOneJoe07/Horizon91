// =============================================================================
// app/[locale]/dojo-time/[slug]/page.tsx — Article Dojo Time individuel
// =============================================================================

import React from "react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import type { Metadata } from "next";
import type { Locale } from "@/lib/locales";
import type { PostCategory } from "@prisma/client";

const CATEGORY_COLORS: Record<PostCategory, string> = {
  COMPETITION:  "var(--color-citadelle-gold)",
  BELTS:        "#22c55e",
  ANNOUNCEMENT: "#3b82f6",
  COMMUNITY:    "#a855f7",
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  try {
    const post = await prisma.post.findUnique({ where: { slug } });
    if (!post) return {};
    return {
      title: locale === "fr" ? post.titleFr : post.titleEn,
      description: locale === "fr" ? post.excerptFr : post.excerptEn,
      openGraph: post.imageUrl ? { images: [post.imageUrl] } : undefined,
    };
  } catch {
    return {};
  }
}

export default async function DojoTimeArticlePage({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "DojoTime" });

  let post: Awaited<ReturnType<typeof prisma.post.findUnique>> = null;
  try {
    post = await prisma.post.findUnique({
      where: { slug, status: "PUBLISHED" },
    });
  } catch {
    post = null;
  }

  if (!post) notFound();

  const title   = locale === "fr" ? post.titleFr   : post.titleEn;
  const content = locale === "fr" ? post.contentFr : post.contentEn;
  const catLabel = t(`categories.${post.category}` as Parameters<typeof t>[0]);
  const color   = CATEGORY_COLORS[post.category];
  const date    = (post.publishedAt ?? post.createdAt).toLocaleDateString(
    locale === "fr" ? "fr-CA" : "en-CA",
    { weekday: "long", year: "numeric", month: "long", day: "numeric" }
  );

  // ── Mini renderer Markdown ────────────────────────────────────────────────
  // Supporte : ## H2, ### H3, **bold**, *italic*, --- (hr), paragraphes
  function renderInline(text: string): React.ReactNode {
    // Remplace **bold** et *italic* par des balises React
    const parts = text.split(/(\*\*[^*]+\*\*|\*[^*]+\*)/g);
    return parts.map((part, i) => {
      if (part.startsWith("**") && part.endsWith("**"))
        return <strong key={i}>{part.slice(2, -2)}</strong>;
      if (part.startsWith("*") && part.endsWith("*"))
        return <em key={i}>{part.slice(1, -1)}</em>;
      return part;
    });
  }

  function renderBlock(block: string, i: number): React.ReactNode {
    const trimmed = block.trim();
    if (trimmed === "---")
      return <hr key={i} style={{ border: "none", borderTop: "1px solid var(--color-citadelle-border)", margin: "2rem 0" }} />;
    if (trimmed.startsWith("### "))
      return <h3 key={i} style={{ fontSize: "1.15rem", fontWeight: 700, marginTop: "1.75rem", marginBottom: "0.5rem" }}>{renderInline(trimmed.slice(4))}</h3>;
    if (trimmed.startsWith("## "))
      return <h2 key={i} style={{ fontSize: "1.35rem", fontWeight: 700, marginTop: "2rem", marginBottom: "0.75rem", color: "var(--color-citadelle-text)" }}>{renderInline(trimmed.slice(3))}</h2>;
    return (
      <p key={i} style={{ marginBottom: "1.25rem", lineHeight: 1.8 }}>
        {renderInline(trimmed)}
      </p>
    );
  }

  const blocks = content.split(/\n\n+/).filter(Boolean);

  return (
    <article className="section">
      <div className="container-citadelle" style={{ maxWidth: "760px", margin: "0 auto" }}>

        {/* Retour au feed */}
        <Link
          href={`/${locale}/dojo-time`}
          style={{
            fontSize: "0.875rem",
            color: "var(--color-citadelle-text-muted)",
            display: "inline-block",
            marginBottom: "2rem",
          }}
        >
          {t("backToFeed")}
        </Link>

        {/* Image principale */}
        {post.imageUrl && (
          <div style={{
            width: "100%", aspectRatio: "16/9",
            overflow: "hidden", borderRadius: "var(--radius-sm)",
            marginBottom: "2rem",
            background: "var(--color-citadelle-surface-2)",
          }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={post.imageUrl}
              alt={title}
              style={{
                width: "100%", height: "100%", objectFit: "cover",
                // Ajustement par article : "center" pour Calgary (JS + Max coupés au chest avec "top")
                objectPosition:
                  slug === "ibjjf-open-montreal-mai-2026" ? "center 70%" :
                  slug === "adcc-open-toronto-fevrier-2026" ? "top center" :
                  "center",
              }}
            />
          </div>
        )}

        {/* Méta */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1rem", flexWrap: "wrap" }}>
          <span style={{
            fontSize: "0.7rem", fontWeight: 700,
            textTransform: "uppercase", letterSpacing: "0.08em",
            color, border: `1px solid ${color}`,
            padding: "0.15rem 0.5rem",
            borderRadius: "var(--radius-sm)",
          }}>
            {catLabel}
          </span>
          <span style={{ fontSize: "0.85rem", color: "var(--color-citadelle-text-muted)" }}>
            {date}
          </span>
        </div>

        {/* Titre */}
        <h1 style={{ fontSize: "2rem", lineHeight: 1.25, marginBottom: "2rem" }}>
          {title}
        </h1>

        {/* Contenu */}
        <div style={{ fontSize: "1rem" }}>
          {blocks.map((block, i) => renderBlock(block, i))}
        </div>

        {/* Lien externe Supernova (optionnel) */}
        {post.externalUrl && (
          <div style={{
            marginTop: "2.5rem",
            padding: "1.25rem",
            borderLeft: `3px solid var(--color-citadelle-gold)`,
            background: "var(--color-citadelle-surface-2)",
            borderRadius: "0 var(--radius-sm) var(--radius-sm) 0",
          }}>
            <a
              href={post.externalUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: "var(--color-citadelle-gold)",
                fontWeight: 600,
                fontSize: "0.95rem",
              }}
            >
              {t("externalLink")} ↗
            </a>
          </div>
        )}

        {/* Retour au feed */}
        <div style={{ marginTop: "3rem", borderTop: "1px solid var(--color-citadelle-border)", paddingTop: "2rem" }}>
          <Link
            href={`/${locale}/dojo-time`}
            className="btn-secondary"
            style={{ display: "inline-block" }}
          >
            {t("backToFeed")}
          </Link>
        </div>

      </div>
    </article>
  );
}
