// =============================================================================
// Page Galerie — Citadelle Jiu-Jitsu
// Photos officielles Pao (shooting mai 2026) + à enrichir au fil du temps
// =============================================================================

import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import type { Locale } from "@/lib/locales";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return {
    title:       locale === "fr" ? "Galerie"           : "Gallery",
    description: locale === "fr"
      ? "Photos et vidéos du dojo Citadelle Jiu-Jitsu : entraînements, compétitions et moments forts à Québec."
      : "Photos and videos from Citadelle Jiu-Jitsu dojo: training, competitions and highlights in Québec City.",
  };
}

// ---------------------------------------------------------------------------
// Données photos — shooting officiel Pao, mai 2026
// Ajouter les nouvelles photos ici au fil des livraisons
// ---------------------------------------------------------------------------
const photos = [
  {
    src: "/images/JS_Dionne_and_co/_MG_3577 copia.jpg",
    altFr: "Jean-Sébastien Dionne-Roy et l'équipe Citadelle Jiu-Jitsu",
    altEn: "Jean-Sébastien Dionne-Roy and the Citadelle Jiu-Jitsu team",
    wide: true, // tuile large (2 colonnes)
  },
  {
    src: "/images/JS_Dionne_and_co/_MG_3524-Enhanced-NR.jpg",
    altFr: "Jean-Sébastien Dionne-Roy — Fondateur & Instructeur en chef",
    altEn: "Jean-Sébastien Dionne-Roy — Founder & Head Instructor",
    wide: false,
  },
  {
    src: "/images/JS_Dionne_and_co/_MG_3545-Enhanced-NR.jpg",
    altFr: "JS Dionne-Roy en gi — ceinture noire BJJ",
    altEn: "JS Dionne-Roy in gi — BJJ black belt",
    wide: false,
  },
  {
    src: "/images/JS_Dionne_and_co/_MG_3534-Enhanced-NR.jpg",
    altFr: "JS Dionne-Roy — portrait officiel gi",
    altEn: "JS Dionne-Roy — official gi portrait",
    wide: false,
  },
  {
    src: "/images/JS_Dionne_and_co/_MG_3531-Enhanced-NR.jpg",
    altFr: "Jean-Sébastien Dionne-Roy au dojo Citadelle",
    altEn: "Jean-Sébastien Dionne-Roy at Citadelle dojo",
    wide: false,
  },
  {
    src: "/images/JS_Dionne_and_co/_MG_3522.jpg",
    altFr: "JS Dionne-Roy — fondateur Citadelle Jiu-Jitsu Québec",
    altEn: "JS Dionne-Roy — founder Citadelle Jiu-Jitsu Québec City",
    wide: false,
  },
  {
    src: "/images/JS_Dionne_and_co/_MG_3530-Enhanced-NR.jpg",
    altFr: "JS sur le tatami — Citadelle Jiu-Jitsu",
    altEn: "JS on the mat — Citadelle Jiu-Jitsu",
    wide: true,
  },
  {
    src: "/images/dojo-time/ADCC Open Toronto.jpg",
    altFr: "Podium ADCC Submission Fighting Canada — Toronto",
    altEn: "ADCC Submission Fighting Canada podium — Toronto",
    wide: false,
  },
  {
    src: "/images/dojo-time/CoachMAx ibjjf open MTL.jpg",
    altFr: "Coach Max — Double médaille d'or, IBJJF Montreal International Open 2026",
    altEn: "Coach Max — Double gold, IBJJF Montreal International Open 2026",
    wide: false,
  },
];

export default async function GalleryPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "Gallery" });

  return (
    <section className="section">
      <div className="container-citadelle">
        <header style={{ textAlign: "center", marginBottom: "3rem" }}>
          <h1 style={{ fontSize: "2.5rem", marginBottom: "0.5rem" }}>{t("title")}</h1>
          <p style={{ color: "var(--color-citadelle-text-muted)" }}>{t("subtitle")}</p>
        </header>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "1rem",
          }}
        >
          {photos.map((photo) => (
            <div
              key={photo.src}
              style={{
                gridColumn: photo.wide ? "span 2" : "span 1",
                aspectRatio: photo.wide ? "16 / 7" : "3 / 4",
                borderRadius: "var(--radius-md)",
                overflow: "hidden",
                border: "1px solid var(--color-citadelle-border)",
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={photo.src}
                alt={locale === "fr" ? photo.altFr : photo.altEn}
                loading="lazy"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  objectPosition: "top center",
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
