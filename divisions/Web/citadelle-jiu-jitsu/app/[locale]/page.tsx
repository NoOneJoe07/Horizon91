// =============================================================================
// Page d'accueil — Citadelle Jiu-Jitsu
// Design cinématique : hero full-viewport animé, spotlight coach, teaser médias
// =============================================================================

import Link from "next/link";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { instructors } from "@/lib/data/instructors";
import type { Locale } from "@/lib/locales";
import type { Metadata } from "next";
import GalleryLightbox from "@/components/gallery/GalleryLightbox";
import VideoShowcase from "@/components/video/VideoShowcase";

// ---------------------------------------------------------------------------
// SEO — Métadonnées spécifiques à la page d'accueil
// Le layout racine fournit un fallback global, mais la homepage mérite ses
// propres balises title + description optimisées pour la conversion locale.
// ---------------------------------------------------------------------------
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return {
    title:
      locale === "fr"
        ? "Citadelle Jiu-Jitsu — École de BJJ à Québec"
        : "Citadelle Jiu-Jitsu — BJJ School in Québec City",
    description:
      locale === "fr"
        ? "École de jiu-jitsu brésilien à Québec. Cours adultes, enfants, no-gi et compétition. Première séance d'essai gratuite. 964 rue Mainguy, Québec."
        : "Brazilian jiu-jitsu school in Québec City. Adult, kids, no-gi and competition classes. First trial class free. 964 rue Mainguy, Québec.",
  };
}

// ---------------------------------------------------------------------------
// JSON-LD — SportsClub / LocalBusiness
// ---------------------------------------------------------------------------
// Données structurées pour Google : aide à afficher une fiche enrichie dans
// les résultats de recherche (adresse, téléphone, heures, type d'activité).
// Norme : schema.org/SportsClub
// Outil de test : https://search.google.com/test/rich-results
// ---------------------------------------------------------------------------
function JsonLd({ locale }: { locale: Locale }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "SportsClub",
    name: "Citadelle Jiu-Jitsu",
    description:
      locale === "fr"
        ? "École de jiu-jitsu brésilien à Québec. Cours adultes, enfants, no-gi et compétition. Première séance d'essai gratuite."
        : "Brazilian jiu-jitsu school in Québec City. Adult, kids, no-gi and competition classes. First trial class free.",
    url: `https://citadellebjj.com/${locale}`,
    telephone: "+14185641047",
    address: {
      "@type": "PostalAddress",
      streetAddress: "964 Rue Mainguy",
      addressLocality: "Québec",
      addressRegion: "QC",
      postalCode: "G1V 3S4",
      addressCountry: "CA",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 46.7748,
      longitude: -71.2756,
    },
    sameAs: [
      "https://www.instagram.com/citadellebjj/",
      "https://www.facebook.com/p/Citadelle-Jiu-Jitsu-61578755165328/",
    ],
    sport: "Brazilian Jiu-Jitsu",
    priceRange: "$$",
    image: "https://citadellebjj.com/logo-citadelle.svg",
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "Home" });

  const founder = instructors.find((i) => i.isFounder) ?? instructors[0];

  return (
    <>
      <JsonLd locale={locale} />

      {/* ================================================================
          HERO — Full viewport, background animé
      ================================================================ */}
      <section
        className="hero-animated-bg"
        style={{
          position: "relative",
          minHeight: "100svh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
          paddingBlock: "6rem",
        }}
      >
        {/* Emblème watermark — centré, très subtil */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/favicon.svg"
          alt=""
          aria-hidden="true"
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "88vmin",
            height: "88vmin",
            opacity: 0.09,
            pointerEvents: "none",
            userSelect: "none",
          }}
        />

        {/* Orbes décoratifs */}
        <div
          className="orb-breathe"
          style={{
            position: "absolute",
            top: "-15%",
            left: "-10%",
            width: "55vmin",
            height: "55vmin",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(201,160,74,0.09) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />
        <div
          className="orb-breathe-offset"
          style={{
            position: "absolute",
            bottom: "-20%",
            right: "-8%",
            width: "60vmin",
            height: "60vmin",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(201,160,74,0.06) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />
        {/* Ligne horizontale décorative */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "1px",
            background:
              "linear-gradient(90deg, transparent, rgba(201,160,74,0.3), transparent)",
          }}
        />

        {/* Contenu hero */}
        <div
          className="container-citadelle"
          style={{ textAlign: "center", position: "relative", zIndex: 1 }}
        >
          <p
            className="fade-in-up"
            style={{
              color: "var(--color-citadelle-gold)",
              textTransform: "uppercase",
              letterSpacing: "0.25em",
              fontSize: "0.8rem",
              marginBottom: "1.25rem",
            }}
          >
            {t("hero.tagline")}
          </p>

          <div className="gold-divider fade-in-up" style={{ margin: "0 auto 1.5rem" }} />

          <h1
            className="fade-in-up-1"
            style={{
              fontSize: "clamp(2.75rem, 7vw, 5.5rem)",
              fontWeight: 800,
              lineHeight: 1.05,
              marginBottom: "1.75rem",
              letterSpacing: "-0.02em",
            }}
          >
            {t("hero.title")}
          </h1>

          <p
            className="fade-in-up-2"
            style={{
              fontSize: "clamp(1rem, 2vw, 1.25rem)",
              color: "var(--color-citadelle-text-muted)",
              maxWidth: "600px",
              margin: "0 auto 2.75rem",
              lineHeight: 1.7,
            }}
          >
            {t("hero.subtitle")}
          </p>

          <div
            className="fade-in-up-3"
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

        {/* Indicateur scroll */}
        <div
          className="scroll-indicator fade-in-up-4"
          style={{
            position: "absolute",
            bottom: "2rem",
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "0.4rem",
          }}
        >
          <span
            style={{
              fontSize: "0.7rem",
              color: "var(--color-citadelle-text-muted)",
              textTransform: "uppercase",
              letterSpacing: "0.12em",
            }}
          >
            {t("hero.scrollLabel")}
          </span>
          <div
            style={{
              width: "1px",
              height: "40px",
              background:
                "linear-gradient(to bottom, var(--color-citadelle-gold), transparent)",
            }}
          />
        </div>
      </section>

      {/* ================================================================
          COACH SPOTLIGHT — L'instructeur en vedette
      ================================================================ */}
      <section
        className="section"
        style={{ backgroundColor: "var(--color-citadelle-surface)" }}
      >
        <div className="container-citadelle">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: "3.5rem",
              alignItems: "center",
            }}
          >
            {/* Texte + stats */}
            <div>
              <p
                style={{
                  color: "var(--color-citadelle-gold)",
                  textTransform: "uppercase",
                  letterSpacing: "0.2em",
                  fontSize: "0.78rem",
                  marginBottom: "1rem",
                }}
              >
                {t("coach.sectionLabel")}
              </p>
              <h2
                style={{
                  fontSize: "clamp(1.75rem, 4vw, 2.75rem)",
                  fontWeight: 800,
                  lineHeight: 1.15,
                  marginBottom: "1rem",
                }}
              >
                {t("coach.title")}
              </h2>
              <div
                className="gold-divider"
                style={{ marginBottom: "1.25rem" }}
              />
              <p
                style={{
                  color: "var(--color-citadelle-text-muted)",
                  lineHeight: 1.75,
                  marginBottom: "2rem",
                  maxWidth: "480px",
                }}
              >
                {t("coach.subtitle")}
              </p>

              {/* Stats */}
              {founder.stats && (
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(2, 1fr)",
                    gap: "1.25rem",
                    marginBottom: "2rem",
                  }}
                >
                  {founder.stats.map((stat, i) => (
                    <div key={i} className="stat-card-border">
                      <div
                        style={{
                          fontSize: "1.4rem",
                          fontWeight: 700,
                          color: "var(--color-citadelle-gold)",
                          fontFamily: "var(--font-display)",
                          lineHeight: 1,
                        }}
                      >
                        {stat.value}
                      </div>
                      <div
                        style={{
                          fontSize: "0.78rem",
                          color: "var(--color-citadelle-text-muted)",
                          marginTop: "0.2rem",
                        }}
                      >
                        {locale === "fr" ? stat.labelFr : stat.labelEn}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <Link
                href={`/${locale}/instructeurs`}
                className="btn-secondary"
                style={{ alignSelf: "flex-start" }}
              >
                {t("coach.cta")} →
              </Link>

            </div>

            {/* Photo placeholder */}
            <div
              style={{
                position: "relative",
                maxWidth: "440px",
                margin: "0 auto",
                width: "100%",
              }}
            >
              {/* Cadre décoratif décalé */}
              <div
                style={{
                  position: "absolute",
                  inset: "-12px",
                  border: "1px solid rgba(201,160,74,0.2)",
                  borderRadius: "var(--radius-lg)",
                  pointerEvents: "none",
                }}
              />
              <div
                style={{
                  aspectRatio: "3 / 4",
                  background:
                    "linear-gradient(145deg, var(--color-citadelle-surface-2), var(--color-citadelle-bg))",
                  borderRadius: "var(--radius-lg)",
                  border: "1px solid var(--color-citadelle-border)",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "0.75rem",
                  overflow: "hidden",
                  position: "relative",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background:
                      "radial-gradient(ellipse at bottom, rgba(201,160,74,0.07) 0%, transparent 60%)",
                  }}
                />
                {founder.imageUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={founder.imageUrl}
                    alt={t("coach.photoAlt")}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                ) : (
                  <>
                    <div
                      style={{
                        fontSize: "5rem",
                        color: "var(--color-citadelle-gold)",
                        opacity: 0.25,
                        lineHeight: 1,
                        position: "relative",
                      }}
                    >
                      ◆
                    </div>
                    <div style={{ textAlign: "center", position: "relative" }}>
                      <p
                        style={{
                          color: "var(--color-citadelle-text-muted)",
                          fontSize: "0.78rem",
                          textTransform: "uppercase",
                          letterSpacing: "0.1em",
                        }}
                      >
                        {t("coach.photoAlt")}
                      </p>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================
          VALEURS
      ================================================================ */}
      <section className="section">
        <div className="container-citadelle">
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <h2 style={{ fontSize: "clamp(1.5rem, 3.5vw, 2.25rem)" }}>
              {t("values.title")}
            </h2>
            <div className="gold-divider" style={{ margin: "1rem auto 0" }} />
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
              gap: "1.25rem",
            }}
          >
            {(["discipline", "respect", "strategie", "perseverance", "honneur"] as const).map((key) => (
              <div
                key={key}
                className="card"
                style={{ position: "relative", overflow: "hidden" }}
              >
                {/* Accent gold top */}
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: "1.5rem",
                    right: "1.5rem",
                    height: "2px",
                    background: "var(--color-citadelle-gold)",
                    opacity: 0.4,
                  }}
                />
                <h3
                  style={{
                    fontSize: "1.2rem",
                    color: "var(--color-citadelle-gold)",
                    marginBottom: "0.5rem",
                    marginTop: "0.5rem",
                  }}
                >
                  {t(`values.${key}.title`)}
                </h3>
                <p style={{ color: "var(--color-citadelle-text-muted)", lineHeight: 1.7 }}>
                  {t(`values.${key}.desc`)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================
          VIDÉO — Highlight cinématique Paulina (shooting mai 2026)
      ================================================================ */}
      <section className="section">
        <div className="container-citadelle">
          <div style={{ textAlign: "center", marginBottom: "2rem" }}>
            <p
              style={{
                color: "var(--color-citadelle-gold)",
                textTransform: "uppercase",
                letterSpacing: "0.2em",
                fontSize: "0.78rem",
                marginBottom: "0.5rem",
              }}
            >
              {locale === "fr" ? "Citadelle en action" : "Citadelle in action"}
            </p>
            <h2 style={{ fontSize: "clamp(1.5rem, 3.5vw, 2.25rem)", marginBottom: "0.5rem" }}>
              {locale === "fr" ? "L'art du jiu-jitsu brésilien" : "The art of Brazilian jiu-jitsu"}
            </h2>
            <div className="gold-divider" style={{ margin: "1rem auto 0" }} />
          </div>

          <VideoShowcase
            src="/videos/citadelle-highlight-web.mp4"
            label={
              locale === "fr"
                ? "Vidéo de présentation — Citadelle Jiu-Jitsu Québec"
                : "Showcase video — Citadelle Jiu-Jitsu Québec City"
            }
            maxHeight="75vh"
          />
        </div>
      </section>

      {/* ================================================================
          SHOWCASE — Teaser médias (photos/vidéos à venir)
      ================================================================ */}
      <section
        className="section"
        style={{ backgroundColor: "var(--color-citadelle-surface)" }}
      >
        <div className="container-citadelle">
          <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
            <p
              style={{
                color: "var(--color-citadelle-gold)",
                textTransform: "uppercase",
                letterSpacing: "0.2em",
                fontSize: "0.78rem",
                marginBottom: "0.75rem",
              }}
            >
              {t("showcase.title")}
            </p>
            <p
              style={{
                color: "var(--color-citadelle-text-muted)",
                maxWidth: "480px",
                margin: "0 auto",
              }}
            >
              {t("showcase.subtitle")}
            </p>
          </div>

          {/* Grille photos dojo — cliquables (lightbox) */}
          <div style={{ marginBottom: "2rem" }}>
            <GalleryLightbox
              locale={locale}
              photos={[
                {
                  src: "/images/JS_Dionne_and_co/_MG_3577 copia.jpg",
                  altFr: "Citadelle Jiu-Jitsu — équipe au dojo",
                  altEn: "Citadelle Jiu-Jitsu — team at the dojo",
                  wide: true,
                },
                {
                  src: "/images/JS_Dionne_and_co/_MG_3522.jpg",
                  altFr: "Jean-Sébastien Dionne-Roy — fondateur",
                  altEn: "Jean-Sébastien Dionne-Roy — founder",
                  wide: false,
                },
                {
                  src: "/images/JS_Dionne_and_co/_MG_3530-Enhanced-NR.jpg",
                  altFr: "JS sur le tatami",
                  altEn: "JS on the mat",
                  wide: false,
                },
                {
                  src: "/images/JS_Dionne_and_co/_MG_3531-Enhanced-NR.jpg",
                  altFr: "JS — portrait dojo",
                  altEn: "JS — dojo portrait",
                  wide: false,
                },
                {
                  src: "/images/JS_Dionne_and_co/_MG_3534-Enhanced-NR.jpg",
                  altFr: "JS — gi ceinture noire",
                  altEn: "JS — gi black belt",
                  wide: false,
                },
              ]}
            />
          </div>

          <div style={{ textAlign: "center" }}>
            <Link href={`/${locale}/galerie`} className="btn-secondary">
              {t("showcase.ctaGallery")}
            </Link>
          </div>
        </div>
      </section>

      {/* ================================================================
          TRIAL BANNER — CTA final
      ================================================================ */}
      <section
        style={{
          paddingBlock: "5rem",
          position: "relative",
          overflow: "hidden",
          background:
            "linear-gradient(135deg, var(--color-citadelle-bg) 0%, var(--color-citadelle-surface) 100%)",
          borderTop: "1px solid var(--color-citadelle-border)",
          textAlign: "center",
        }}
      >
        {/* Orbe décoratif centré */}
        <div
          className="orb-breathe"
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "70vmin",
            height: "70vmin",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(201,160,74,0.05) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />
        <div
          className="container-citadelle"
          style={{ maxWidth: "640px", position: "relative", zIndex: 1 }}
        >
          <p
            style={{
              color: "var(--color-citadelle-gold)",
              textTransform: "uppercase",
              letterSpacing: "0.2em",
              fontSize: "0.78rem",
              marginBottom: "1rem",
            }}
          >
            Citadelle Jiu-Jitsu — Québec
          </p>
          <h2
            style={{
              fontSize: "clamp(1.75rem, 4vw, 2.75rem)",
              fontWeight: 800,
              marginBottom: "1rem",
              lineHeight: 1.2,
            }}
          >
            {t("trialBanner.title")}
          </h2>
          <div className="gold-divider" style={{ margin: "0 auto 1.25rem" }} />
          <p
            style={{
              color: "var(--color-citadelle-text-muted)",
              marginBottom: "2.5rem",
              lineHeight: 1.7,
              fontSize: "1.05rem",
            }}
          >
            {t("trialBanner.subtitle")}
          </p>
          <Link href={`/${locale}/seance-essai`} className="btn-primary">
            {t("trialBanner.cta")}
          </Link>
        </div>
      </section>
    </>
  );
}
