// =============================================================================
// app/[locale]/dojo-time/page.tsx — Feed Dojo Time
// -----------------------------------------------------------------------------
// Actualités du dojo : compétitions, remises de ceintures, annonces,
// moments de communauté. Lus depuis la BD, filtrés PUBLISHED seulement.
// =============================================================================

import { getTranslations, setRequestLocale } from "next-intl/server";
import Link from "next/link";
import { prisma } from "@/lib/db";
import type { Metadata } from "next";
import type { Locale } from "@/lib/locales";
import type { PostCategory } from "@prisma/client";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: "Dojo Time",
    description:
      locale === "fr"
        ? "Actualités de Citadelle Jiu-Jitsu — compétitions, remises de ceintures, annonces et moments de vie du dojo."
        : "Citadelle Jiu-Jitsu news — competitions, belt promotions, announcements and dojo life.",
  };
}

// Couleurs par catégorie — palette Citadelle
const CATEGORY_COLORS: Record<PostCategory, string> = {
  COMPETITION:  "var(--color-citadelle-gold)",
  BELTS:        "#22c55e",
  ANNOUNCEMENT: "#3b82f6",
  COMMUNITY:    "#a855f7",
};

export default async function DojoTimePage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "DojoTime" });

  let posts: Awaited<ReturnType<typeof prisma.post.findMany>> = [];
  try {
    posts = await prisma.post.findMany({
      where: { status: "PUBLISHED" },
      orderBy: { publishedAt: "desc" },
    });
  } catch {
    posts = [];
  }

  return (
    <section className="section">
      <div className="container-citadelle">

        <header style={{ textAlign: "center", marginBottom: "3rem" }}>
          <h1 style={{ fontSize: "2.5rem", marginBottom: "0.5rem" }}>{t("title")}</h1>
          <p style={{ color: "var(--color-citadelle-text-muted)", maxWidth: "560px", margin: "0 auto" }}>
            {t("subtitle")}
          </p>
        </header>

        {posts.length === 0 ? (
          <div className="card" style={{ textAlign: "center", padding: "3rem" }}>
            <p style={{ color: "var(--color-citadelle-text-muted)" }}>{t("empty")}</p>
          </div>
        ) : (
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
            gap: "1.5rem",
          }}>
            {posts.map((post) => {
              const title   = locale === "fr" ? post.titleFr   : post.titleEn;
              const excerpt = locale === "fr" ? post.excerptFr : post.excerptEn;
              const catLabel = t(`categories.${post.category}` as Parameters<typeof t>[0]);
              const color   = CATEGORY_COLORS[post.category];
              const date    = (post.publishedAt ?? post.createdAt).toLocaleDateString(
                locale === "fr" ? "fr-CA" : "en-CA",
                { year: "numeric", month: "long", day: "numeric" }
              );

              return (
                <Link
                  key={post.id}
                  href={`/${locale}/dojo-time/${post.slug}`}
                  style={{ textDecoration: "none" }}
                >
                  <article
                    className="card"
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      height: "100%",
                      transition: "border-color 0.2s",
                      cursor: "pointer",
                    }}
                  >
                    {/* Image */}
                    {post.imageUrl && (
                      <div style={{
                        width: "100%", aspectRatio: "16/9",
                        overflow: "hidden", borderRadius: "var(--radius-sm)",
                        marginBottom: "1rem",
                        background: "var(--color-citadelle-surface-2)",
                      }}>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={post.imageUrl}
                          alt={title}
                          style={{ width: "100%", height: "100%", objectFit: "cover",
                            objectPosition:
                              post.slug === "ibjjf-open-montreal-mai-2026" ? "top center" :
                              post.slug === "adcc-open-toronto-fevrier-2026" ? "top center" :
                              "center"
                          }}
                        />
                      </div>
                    )}

                    {/* Badge catégorie */}
                    <div style={{ marginBottom: "0.5rem" }}>
                      <span style={{
                        fontSize: "0.7rem", fontWeight: 700,
                        textTransform: "uppercase", letterSpacing: "0.08em",
                        color, border: `1px solid ${color}`,
                        padding: "0.15rem 0.5rem",
                        borderRadius: "var(--radius-sm)",
                      }}>
                        {catLabel}
                      </span>
                    </div>

                    {/* Titre */}
                    <h2 style={{ fontSize: "1.15rem", marginBottom: "0.5rem", lineHeight: 1.35 }}>
                      {title}
                    </h2>

                    {/* Extrait */}
                    <p style={{
                      fontSize: "0.9rem",
                      color: "var(--color-citadelle-text-muted)",
                      lineHeight: 1.6,
                      flex: 1,
                      marginBottom: "1rem",
                    }}>
                      {excerpt}
                    </p>

                    {/* Footer card */}
                    <div style={{
                      display: "flex", justifyContent: "space-between",
                      alignItems: "center", fontSize: "0.8rem",
                      color: "var(--color-citadelle-text-muted)",
                      borderTop: "1px solid var(--color-citadelle-border)",
                      paddingTop: "0.75rem", marginTop: "auto",
                    }}>
                      <span>{date}</span>
                      <span style={{ color: "var(--color-citadelle-gold)", fontWeight: 600 }}>
                        {t("readMore")} →
                      </span>
                    </div>
                  </article>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
