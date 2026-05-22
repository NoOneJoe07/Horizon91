// =============================================================================
// Page Galerie — Citadelle Jiu-Jitsu
// Photos officielles Pao (shooting mai 2026) + compétitions
// Lightbox : clic sur une photo pour l'afficher en plein écran
// =============================================================================

import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import type { Locale } from "@/lib/locales";
import GalleryLightbox from "@/components/gallery/GalleryLightbox";

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
// Données photos — shooting officiel Pao + compétitions
// Ajouter les nouvelles photos ici au fil des livraisons
// ---------------------------------------------------------------------------
const photos = [
  // ── Shooting groupe / équipe ─────────────────────────────────────────────
  {
    src: "/images/JS_Dionne_and_co/_MG_3577 copia.jpg",
    altFr: "Jean-Sébastien Dionne-Roy et l'équipe Citadelle Jiu-Jitsu",
    altEn: "Jean-Sébastien Dionne-Roy and the Citadelle Jiu-Jitsu team",
    wide: true,
  },
  {
    src: "/images/JS_Dionne_and_co/_MG_3580-Enhanced-NR copia.jpg",
    altFr: "L'équipe Citadelle Jiu-Jitsu au dojo",
    altEn: "The Citadelle Jiu-Jitsu team at the dojo",
    wide: true,
  },
  {
    src: "/images/JS_Dionne_and_co/_MG_3593 copia.jpg",
    altFr: "Séance d'entraînement — Citadelle Jiu-Jitsu",
    altEn: "Training session — Citadelle Jiu-Jitsu",
    wide: true,
  },

  // ── Portraits JS ─────────────────────────────────────────────────────────
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

  // ── Nouvelle batch mai 2026 ───────────────────────────────────────────────
  {
    src: "/images/JS_Dionne_and_co/_MG_3585-Enhanced-NR.jpg",
    altFr: "Entraînement au dojo Citadelle Jiu-Jitsu",
    altEn: "Training at Citadelle Jiu-Jitsu dojo",
    wide: false,
  },
  {
    src: "/images/JS_Dionne_and_co/_MG_3590-Enhanced-NR.jpg",
    altFr: "Technique de grappling — Citadelle Jiu-Jitsu",
    altEn: "Grappling technique — Citadelle Jiu-Jitsu",
    wide: false,
  },
  {
    src: "/images/JS_Dionne_and_co/_MG_3608-Enhanced-NR.jpg",
    altFr: "Sur le tatami — Citadelle Jiu-Jitsu Québec",
    altEn: "On the mat — Citadelle Jiu-Jitsu Québec",
    wide: false,
  },
  {
    src: "/images/JS_Dionne_and_co/_MG_3618-Enhanced-NR.jpg",
    altFr: "JS Dionne-Roy — instructeur BJJ Québec",
    altEn: "JS Dionne-Roy — BJJ instructor Québec City",
    wide: false,
  },
  {
    src: "/images/JS_Dionne_and_co/_MG_3627-Enhanced-NR.jpg",
    altFr: "Jiu-Jitsu brésilien — Citadelle, Québec",
    altEn: "Brazilian Jiu-Jitsu — Citadelle, Québec City",
    wide: false,
  },
  {
    src: "/images/JS_Dionne_and_co/_MG_3635-Enhanced-NR.jpg",
    altFr: "Moment fort au dojo — Citadelle Jiu-Jitsu",
    altEn: "Highlight at the dojo — Citadelle Jiu-Jitsu",
    wide: false,
  },
  {
    src: "/images/JS_Dionne_and_co/IMG_3647-Enhanced-NR.jpg",
    altFr: "Citadelle Jiu-Jitsu — action sur le tatami",
    altEn: "Citadelle Jiu-Jitsu — action on the mat",
    wide: false,
  },
  {
    src: "/images/JS_Dionne_and_co/IMG_3664-Enhanced-NR.jpg",
    altFr: "Entraînement BJJ — Citadelle Jiu-Jitsu Québec",
    altEn: "BJJ training — Citadelle Jiu-Jitsu Québec",
    wide: false,
  },
  {
    src: "/images/JS_Dionne_and_co/IMG_3690-Enhanced-NR.jpg",
    altFr: "Sparring au dojo Citadelle",
    altEn: "Sparring at Citadelle dojo",
    wide: false,
  },
  {
    src: "/images/JS_Dionne_and_co/IMG_3694-Enhanced-NR.jpg",
    altFr: "Technique au sol — Citadelle Jiu-Jitsu",
    altEn: "Ground technique — Citadelle Jiu-Jitsu",
    wide: false,
  },
  {
    src: "/images/JS_Dionne_and_co/IMG_3700-Enhanced-NR.jpg",
    altFr: "Jiu-Jitsu en action — Citadelle Québec",
    altEn: "Jiu-Jitsu in action — Citadelle Québec",
    wide: false,
  },
  {
    src: "/images/JS_Dionne_and_co/IMG_3705.jpg",
    altFr: "L'équipe Citadelle Jiu-Jitsu à l'entraînement",
    altEn: "The Citadelle Jiu-Jitsu team in training",
    wide: true,
  },

  // ── Compétitions ─────────────────────────────────────────────────────────
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

        {/* GalleryLightbox gère la grille ET le modal plein écran */}
        <GalleryLightbox photos={photos} locale={locale} />
      </div>
    </section>
  );
}
