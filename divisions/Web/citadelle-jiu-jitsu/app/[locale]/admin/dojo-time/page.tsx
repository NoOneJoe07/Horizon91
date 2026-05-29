// =============================================================================
// Admin — Dojo Time (CRUD articles)
// =============================================================================

import { prisma } from "@/lib/db";
import { setRequestLocale } from "next-intl/server";
import type { Locale } from "@/lib/locales";
import { PostAdminActions } from "@/components/admin/PostAdminActions";

export default async function AdminDojoTimePage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const locale = ((await params).locale) as Locale;
  setRequestLocale(locale);

  let posts: Awaited<ReturnType<typeof prisma.post.findMany>> = [];
  try {
    posts = await prisma.post.findMany({ orderBy: { createdAt: "desc" } });
  } catch {
    posts = [];
  }

  const CATEGORY_LABELS: Record<string, string> = {
    COMPETITION:  locale === "fr" ? "Compétition" : "Competition",
    BELTS:        locale === "fr" ? "Ceintures"   : "Belts",
    ANNOUNCEMENT: locale === "fr" ? "Annonce"     : "Announcement",
    COMMUNITY:    locale === "fr" ? "Communauté"  : "Community",
  };

  return (
    <div>
      <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
        <h1 style={{ fontSize: "1.75rem" }}>Dojo Time</h1>
        <PostAdminActions locale={locale} mode="create" />
      </header>

      {posts.length === 0 ? (
        <div className="card" style={{ textAlign: "center", padding: "2rem" }}>
          <p style={{ color: "var(--color-citadelle-text-muted)" }}>
            {locale === "fr" ? "Aucun article pour l'instant. Crée le premier !" : "No posts yet. Create the first one!"}
          </p>
        </div>
      ) : (
        <div style={{ display: "grid", gap: "0.75rem" }}>
          {posts.map((post) => {
            const title = locale === "fr" ? post.titleFr : post.titleEn;
            const date  = (post.publishedAt ?? post.createdAt).toLocaleDateString(
              locale === "fr" ? "fr-CA" : "en-CA"
            );

            return (
              <div key={post.id} className="card" style={{
                padding: "1rem",
                display: "flex", justifyContent: "space-between",
                alignItems: "center", gap: "1rem", flexWrap: "wrap",
                opacity: post.status === "DRAFT" ? 0.65 : 1,
              }}>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.25rem", flexWrap: "wrap" }}>
                    {/* Badge statut */}
                    <span style={{
                      fontSize: "0.65rem", fontWeight: 700,
                      padding: "0.1rem 0.4rem",
                      borderRadius: "var(--radius-sm)",
                      background: post.status === "PUBLISHED" ? "#22c55e" : "var(--color-citadelle-surface-2)",
                      color: post.status === "PUBLISHED" ? "#fff" : "var(--color-citadelle-text-muted)",
                      textTransform: "uppercase",
                    }}>
                      {post.status === "PUBLISHED"
                        ? (locale === "fr" ? "Publié" : "Published")
                        : (locale === "fr" ? "Brouillon" : "Draft")}
                    </span>
                    {/* Badge catégorie */}
                    <span style={{
                      fontSize: "0.65rem", fontWeight: 600,
                      color: "var(--color-citadelle-text-muted)",
                    }}>
                      {CATEGORY_LABELS[post.category]}
                    </span>
                    <span style={{ fontSize: "0.75rem", color: "var(--color-citadelle-text-muted)" }}>
                      · {date}
                    </span>
                  </div>
                  <h3 style={{ fontSize: "1rem" }}>{title}</h3>
                </div>

                <PostAdminActions locale={locale} mode="edit" post={post} />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
