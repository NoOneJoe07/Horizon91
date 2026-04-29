// =============================================================================
// Page Instructeurs — Citadelle Jiu-Jitsu
// Mise en page "personal brand" centrée sur le fondateur.
// Quand le client envoie son vrai nom/bio/photo → mettre à jour instructors.ts
// =============================================================================

import Link from "next/link";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { instructors } from "@/lib/data/instructors";
import type { Locale } from "@/lib/locales";

export default async function InstructorsPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "Instructors" });

  const founder = instructors.find((i) => i.isFounder) ?? instructors[0];
  const others = instructors.filter((i) => !i.isFounder);

  return (
    <>
      {/* ================================================================
          HERO BANNER
      ================================================================ */}
      <section
        style={{
          background:
            "linear-gradient(180deg, var(--color-citadelle-surface) 0%, var(--color-citadelle-bg) 100%)",
          paddingBlock: "4rem 3rem",
          borderBottom: "1px solid var(--color-citadelle-border)",
        }}
      >
        <div className="container-citadelle" style={{ textAlign: "center" }}>
          <p
            style={{
              color: "var(--color-citadelle-gold)",
              textTransform: "uppercase",
              letterSpacing: "0.2em",
              fontSize: "0.8rem",
              marginBottom: "1rem",
            }}
          >
            {t("title")}
          </p>
          <h1
            style={{
              fontSize: "clamp(2rem, 5vw, 3.5rem)",
              fontWeight: 800,
              lineHeight: 1.1,
              marginBottom: "1rem",
            }}
          >
            {locale === "fr" ? founder.titleFr : founder.titleEn}
          </h1>
          <div
            className="gold-divider"
            style={{ margin: "0 auto 1.25rem" }}
          />
          <p
            style={{
              color: "var(--color-citadelle-text-muted)",
              maxWidth: "560px",
              margin: "0 auto",
            }}
          >
            {t("subtitle")}
          </p>
        </div>
      </section>

      {/* ================================================================
          PROFIL FONDATEUR
      ================================================================ */}
      <section className="section">
        <div className="container-citadelle">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: "3rem",
              alignItems: "start",
            }}
          >
            {/* ---- Colonne gauche : photo + identité ---- */}
            <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
              {/* Photo placeholder */}
              <div
                style={{
                  aspectRatio: "3 / 4",
                  background:
                    "linear-gradient(135deg, var(--color-citadelle-surface-2) 0%, var(--color-citadelle-surface) 100%)",
                  borderRadius: "var(--radius-lg)",
                  border: "1px solid var(--color-citadelle-border)",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "1rem",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                {/* Décoration dorée */}
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background:
                      "radial-gradient(ellipse at bottom, rgba(201,160,74,0.06) 0%, transparent 65%)",
                  }}
                />
                {founder.imageUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={founder.imageUrl}
                    alt={locale === "fr" ? founder.nameFr : founder.nameEn}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                ) : (
                  <>
                    <div
                      style={{
                        fontSize: "4rem",
                        color: "var(--color-citadelle-gold)",
                        opacity: 0.4,
                        lineHeight: 1,
                      }}
                    >
                      ◆
                    </div>
                    <p
                      style={{
                        color: "var(--color-citadelle-text-muted)",
                        fontSize: "0.8rem",
                        textTransform: "uppercase",
                        letterSpacing: "0.1em",
                        textAlign: "center",
                      }}
                    >
                      {locale === "fr" ? "Photo à venir" : "Photo coming soon"}
                    </p>
                  </>
                )}
              </div>

              {/* Nom + grade + expérience */}
              <div
                className="card"
                style={{ textAlign: "center", padding: "1.25rem" }}
              >
                <h2
                  style={{
                    fontSize: "1.35rem",
                    marginBottom: "0.25rem",
                  }}
                >
                  {locale === "fr" ? founder.nameFr : founder.nameEn}
                </h2>
                <p
                  style={{
                    color: "var(--color-citadelle-gold)",
                    fontSize: "0.875rem",
                    marginBottom: "0.5rem",
                  }}
                >
                  {locale === "fr" ? founder.beltFr : founder.beltEn}
                </p>
                <p
                  style={{
                    color: "var(--color-citadelle-text-muted)",
                    fontSize: "0.8rem",
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                  }}
                >
                  {locale === "fr" ? founder.titleFr : founder.titleEn}
                </p>
              </div>

              {/* Spécialité */}
              <div
                style={{
                  borderLeft: "2px solid var(--color-citadelle-gold)",
                  paddingLeft: "1rem",
                }}
              >
                <p
                  style={{
                    fontSize: "0.8rem",
                    color: "var(--color-citadelle-text-muted)",
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                    marginBottom: "0.25rem",
                  }}
                >
                  {locale === "fr" ? "Spécialité" : "Specialty"}
                </p>
                <p style={{ fontSize: "0.95rem" }}>
                  {locale === "fr" ? founder.specialtyFr : founder.specialtyEn}
                </p>
              </div>
            </div>

            {/* ---- Colonne droite : stats + bio + accomplissements + philo ---- */}
            <div style={{ display: "flex", flexDirection: "column", gap: "2.5rem" }}>

              {/* Stats */}
              {founder.stats && (
                <div>
                  <h3
                    style={{
                      fontSize: "0.8rem",
                      color: "var(--color-citadelle-text-muted)",
                      textTransform: "uppercase",
                      letterSpacing: "0.12em",
                      marginBottom: "1.25rem",
                    }}
                  >
                    {t("stats")}
                  </h3>
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(2, 1fr)",
                      gap: "1rem",
                    }}
                  >
                    {founder.stats.map((stat, i) => (
                      <div key={i} className="stat-card-border">
                        <div
                          style={{
                            fontSize: "1.5rem",
                            fontWeight: 700,
                            color: "var(--color-citadelle-gold)",
                            fontFamily: "var(--font-display)",
                            lineHeight: 1.1,
                          }}
                        >
                          {stat.value}
                        </div>
                        <div
                          style={{
                            fontSize: "0.8rem",
                            color: "var(--color-citadelle-text-muted)",
                            marginTop: "0.15rem",
                          }}
                        >
                          {locale === "fr" ? stat.labelFr : stat.labelEn}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Bio */}
              <div>
                <h3
                  style={{
                    fontSize: "0.8rem",
                    color: "var(--color-citadelle-text-muted)",
                    textTransform: "uppercase",
                    letterSpacing: "0.12em",
                    marginBottom: "1rem",
                  }}
                >
                  {locale === "fr" ? "Parcours" : "Background"}
                </h3>
                <p
                  style={{
                    lineHeight: 1.8,
                    color: "var(--color-citadelle-text)",
                    fontSize: "1.025rem",
                  }}
                >
                  {locale === "fr" ? founder.bioFr : founder.bioEn}
                </p>
              </div>

              {/* Accomplissements */}
              {founder.achievements && founder.achievements.length > 0 && (
                <div>
                  <h3
                    style={{
                      fontSize: "0.8rem",
                      color: "var(--color-citadelle-text-muted)",
                      textTransform: "uppercase",
                      letterSpacing: "0.12em",
                      marginBottom: "1rem",
                    }}
                  >
                    {t("achievements")}
                  </h3>
                  <div>
                    {founder.achievements.map((a, i) => (
                      <div key={i} className="achievement-item">
                        <span
                          style={{
                            color: "var(--color-citadelle-gold)",
                            fontSize: "0.75rem",
                            marginTop: "0.2rem",
                            flexShrink: 0,
                          }}
                        >
                          ◆
                        </span>
                        <span style={{ lineHeight: 1.5 }}>
                          {locale === "fr" ? a.titleFr : a.titleEn}
                          {a.year && (
                            <span
                              style={{
                                marginLeft: "0.5rem",
                                fontSize: "0.8rem",
                                color: "var(--color-citadelle-text-muted)",
                              }}
                            >
                              ({a.year})
                            </span>
                          )}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Philosophie */}
              {(founder.philosophyFr || founder.philosophyEn) && (
                <blockquote
                  style={{
                    borderLeft: "3px solid var(--color-citadelle-gold)",
                    paddingLeft: "1.5rem",
                    margin: 0,
                  }}
                >
                  <h3
                    style={{
                      fontSize: "0.8rem",
                      color: "var(--color-citadelle-text-muted)",
                      textTransform: "uppercase",
                      letterSpacing: "0.12em",
                      marginBottom: "0.75rem",
                    }}
                  >
                    {t("philosophy")}
                  </h3>
                  <p
                    style={{
                      fontSize: "1.1rem",
                      fontFamily: "var(--font-display)",
                      fontStyle: "italic",
                      lineHeight: 1.7,
                      color: "var(--color-citadelle-text)",
                    }}
                  >
                    {locale === "fr" ? founder.philosophyFr : founder.philosophyEn}
                  </p>
                  <footer
                    style={{
                      marginTop: "0.75rem",
                      fontSize: "0.875rem",
                      color: "var(--color-citadelle-gold)",
                    }}
                  >
                    — {locale === "fr" ? founder.nameFr : founder.nameEn}
                  </footer>
                </blockquote>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================
          AUTRES INSTRUCTEURS (affiché seulement si >0)
      ================================================================ */}
      {others.length > 0 && (
        <section
          className="section"
          style={{ backgroundColor: "var(--color-citadelle-surface)" }}
        >
          <div className="container-citadelle">
            <h2
              style={{
                textAlign: "center",
                fontSize: "1.75rem",
                marginBottom: "2.5rem",
              }}
            >
              {locale === "fr" ? "L'équipe" : "The team"}
            </h2>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
                gap: "1.5rem",
              }}
            >
              {others.map((instructor) => (
                <article key={instructor.slug} className="card">
                  <div
                    style={{
                      width: "100%",
                      aspectRatio: "1",
                      background:
                        "linear-gradient(135deg, var(--color-citadelle-surface-2), var(--color-citadelle-bg))",
                      borderRadius: "var(--radius-md)",
                      marginBottom: "1rem",
                      display: "grid",
                      placeItems: "center",
                      fontSize: "2.5rem",
                      color: "var(--color-citadelle-gold)",
                    }}
                  >
                    ◆
                  </div>
                  <h2 style={{ fontSize: "1.1rem", marginBottom: "0.25rem" }}>
                    {locale === "fr" ? instructor.nameFr : instructor.nameEn}
                  </h2>
                  <p
                    style={{
                      fontSize: "0.875rem",
                      color: "var(--color-citadelle-gold)",
                      marginBottom: "0.75rem",
                    }}
                  >
                    {locale === "fr" ? instructor.beltFr : instructor.beltEn}
                  </p>
                  <p
                    style={{
                      fontSize: "0.9rem",
                      color: "var(--color-citadelle-text-muted)",
                      lineHeight: 1.6,
                    }}
                  >
                    {locale === "fr" ? instructor.bioFr : instructor.bioEn}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Annonce équipe à venir si seul instructeur */}
      {others.length === 0 && (
        <section
          className="section"
          style={{ backgroundColor: "var(--color-citadelle-surface)" }}
        >
          <div
            className="container-citadelle"
            style={{ textAlign: "center", maxWidth: "560px" }}
          >
            <p
              style={{
                color: "var(--color-citadelle-text-muted)",
                fontStyle: "italic",
              }}
            >
              {t("teamSoon")}
            </p>
          </div>
        </section>
      )}

      {/* ================================================================
          CTA SÉANCE D'ESSAI
      ================================================================ */}
      <section
        style={{
          paddingBlock: "4rem",
          background:
            "linear-gradient(135deg, var(--color-citadelle-bg) 0%, var(--color-citadelle-surface) 100%)",
          borderTop: "1px solid var(--color-citadelle-border)",
          textAlign: "center",
        }}
      >
        <div className="container-citadelle" style={{ maxWidth: "640px" }}>
          <p
            style={{
              color: "var(--color-citadelle-gold)",
              textTransform: "uppercase",
              letterSpacing: "0.15em",
              fontSize: "0.8rem",
              marginBottom: "1rem",
            }}
          >
            {t("trialCta")}
          </p>
          <h2
            style={{
              fontSize: "clamp(1.5rem, 3.5vw, 2.25rem)",
              marginBottom: "1rem",
            }}
          >
            {t("trialCtaSubtitle")}
          </h2>
          <div className="gold-divider" style={{ margin: "0 auto 2rem" }} />
          <Link href={`/${locale}/seance-essai`} className="btn-primary">
            {t("trialCtaLink")}
          </Link>
        </div>
      </section>
    </>
  );
}
