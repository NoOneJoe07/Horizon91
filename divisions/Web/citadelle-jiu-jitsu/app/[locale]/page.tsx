// =============================================================================
// Page d'accueil
// =============================================================================

import Link from "next/link";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "@/lib/locales";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "Home" });

  return (
    <>
      {/* HERO ----------------------------------------------------------- */}
      <section
        style={{
          paddingBlock: "6rem",
          background:
            "radial-gradient(ellipse at top, var(--color-citadelle-surface) 0%, var(--color-citadelle-bg) 70%)",
          textAlign: "center",
        }}
      >
        <div className="container-citadelle">
          <p
            style={{
              color: "var(--color-citadelle-gold)",
              textTransform: "uppercase",
              letterSpacing: "0.2em",
              fontSize: "0.875rem",
              marginBottom: "1rem",
            }}
          >
            {t("hero.tagline")}
          </p>
          <h1
            style={{
              fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
              fontWeight: 800,
              marginBottom: "1.5rem",
              lineHeight: 1.1,
            }}
          >
            {t("hero.title")}
          </h1>
          <p
            style={{
              fontSize: "1.25rem",
              color: "var(--color-citadelle-text-muted)",
              maxWidth: "640px",
              margin: "0 auto 2.5rem",
            }}
          >
            {t("hero.subtitle")}
          </p>
          <div
            style={{
              display: "flex",
              gap: "1rem",
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <Link href={`/${locale}/seance-essai`} className="btn-primary">
              {t("hero.ctaTrial")}
            </Link>
            <Link href={`/${locale}/abonnements`} className="btn-secondary">
              {t("hero.ctaPlans")}
            </Link>
          </div>
        </div>
      </section>

      {/* VALEURS -------------------------------------------------------- */}
      <section className="section">
        <div className="container-citadelle">
          <h2 style={{ textAlign: "center", fontSize: "2rem", marginBottom: "3rem" }}>
            {t("values.title")}
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "1.5rem",
            }}
          >
            {(["discipline", "respect", "progress"] as const).map((key) => (
              <div key={key} className="card">
                <h3
                  style={{
                    fontSize: "1.25rem",
                    color: "var(--color-citadelle-gold)",
                    marginBottom: "0.5rem",
                  }}
                >
                  {t(`values.${key}.title`)}
                </h3>
                <p style={{ color: "var(--color-citadelle-text-muted)" }}>
                  {t(`values.${key}.desc`)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* À PROPOS ------------------------------------------------------- */}
      <section
        className="section"
        style={{ backgroundColor: "var(--color-citadelle-surface)" }}
      >
        <div
          className="container-citadelle"
          style={{ maxWidth: "780px", textAlign: "center" }}
        >
          <h2 style={{ fontSize: "2rem", marginBottom: "1.5rem" }}>
            {t("about.title")}
          </h2>
          <p
            style={{
              fontSize: "1.05rem",
              lineHeight: 1.7,
              color: "var(--color-citadelle-text-muted)",
            }}
          >
            {t("about.body")}
          </p>
        </div>
      </section>
    </>
  );
}
