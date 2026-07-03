"use client";

import { useState, useEffect } from "react";

// ─────────────────────────────────────────────────────────
// DivisionPhotoGallery — galerie 4 photos staggerée avec lightbox
// Utilisé sur /divisions/web (Draveur) et /divisions/cyber (Carillon)
//
// Layout desktop (identique aux deux pages) :
//   [ Photo 0 tall ] [ Photo 1 large landscape        ]
//   [ Photo 0 tall ] [ Photo 2 sq ] [ Photo 3 sq ]
//
// Les miniatures sont en noir & blanc — la lightbox est en couleur.
// ─────────────────────────────────────────────────────────

export interface GalleryPhoto {
  src: string;
  alt: string;
  caption?: string;
  /** CSS object-position pour le recadrage du thumbnail (ex: "center 70%"). Défaut: "center center" */
  objectPosition?: string;
}

interface DivisionPhotoGalleryProps {
  photos: GalleryPhoto[]; // doit contenir exactement 4 photos
  /** Couleur hexadécimale pour l'overlay de teinte (ex: "#0099D1" ou "#203478") */
  accentColor?: string;
}

export default function DivisionPhotoGallery({
  photos,
  accentColor = "#203478",
}: DivisionPhotoGalleryProps) {
  const [selected, setSelected] = useState<number | null>(null);

  // Clavier
  useEffect(() => {
    if (selected === null) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelected(null);
      if (e.key === "ArrowRight")
        setSelected((i) => (i !== null && i < photos.length - 1 ? i + 1 : i));
      if (e.key === "ArrowLeft")
        setSelected((i) => (i !== null && i > 0 ? i - 1 : i));
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [selected, photos.length]);

  // Bloquer le scroll
  useEffect(() => {
    if (selected !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [selected]);

  const accentRgba = (alpha: number) => {
    // Convertit hex → rgba (simplifié pour les couleurs du projet)
    const hex = accentColor.replace("#", "");
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    return `rgba(${r},${g},${b},${alpha})`;
  };

  // Positions dans la grille staggerée — correspondance index → CSS grid
  const gridStyles: React.CSSProperties[] = [
    { gridColumn: "1",          gridRow: "1 / span 2" }, // photo 0 — portrait tall
    { gridColumn: "2 / span 2", gridRow: "1"          }, // photo 1 — paysage large
    { gridColumn: "2",          gridRow: "2"           }, // photo 2 — carré bas milieu
    { gridColumn: "3",          gridRow: "2"           }, // photo 3 — carré bas droite
  ];

  const borderRadius = (i: number) =>
    i === 0 ? "border-radius: 12px" : i === 1 ? "12px" : "8px";

  return (
    <>
      {/* ── Grille staggerée — Desktop ── */}
      <div
        className="hidden md:grid mb-3"
        style={{
          gridTemplateColumns: "1fr 1.3fr 1fr",
          gridTemplateRows: "290px 210px",
          gap: "10px",
        }}
      >
        {photos.slice(0, 4).map((photo, i) => (
          <button
            key={photo.src}
            type="button"
            className="group relative overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-white cursor-zoom-in"
            style={{
              ...gridStyles[i],
              borderRadius: i <= 1 ? "12px" : "8px",
            }}
            onClick={() => setSelected(i)}
            aria-label={`Agrandir : ${photo.alt}`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={photo.src}
              alt={photo.alt}
              className="absolute inset-0 w-full h-full transition duration-500 group-hover:opacity-90 group-hover:scale-105"
              style={{
                objectFit: "cover",
                objectPosition: photo.objectPosition ?? "center center",
                filter: "grayscale(100%)",
                opacity: 0.70,
              }}
            />
            {/* Overlay teinte */}
            <div
              className="absolute inset-0 transition duration-300"
              style={{ backgroundColor: accentRgba(0.20) }}
            />
            {/* Indicateur hover */}
            <div
              className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200"
              style={{ backgroundColor: accentRgba(0.35) }}
            >
              <span className="text-3xl select-none" style={{ color: "rgba(244,244,240,0.90)" }}>⊕</span>
            </div>
          </button>
        ))}
      </div>

      {/* ── Grille 2×2 — Mobile ── */}
      <div className="grid grid-cols-2 gap-3 mb-3 md:hidden">
        {photos.slice(0, 4).map((photo, i) => (
          <button
            key={photo.src}
            type="button"
            className="group relative aspect-square overflow-hidden rounded-lg focus:outline-none cursor-zoom-in"
            onClick={() => setSelected(i)}
            aria-label={`Agrandir : ${photo.alt}`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={photo.src}
              alt={photo.alt}
              className="absolute inset-0 w-full h-full"
              style={{
                objectFit: "cover",
                objectPosition: photo.objectPosition ?? "center center",
                filter: "grayscale(100%)",
                opacity: 0.70,
              }}
            />
            <div
              className="absolute inset-0"
              style={{ backgroundColor: accentRgba(0.20) }}
            />
            {/* Indicateur hover mobile */}
            <div
              className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200"
              style={{ backgroundColor: accentRgba(0.40) }}
            >
              <span className="text-2xl select-none" style={{ color: "rgba(244,244,240,0.90)" }}>⊕</span>
            </div>
          </button>
        ))}
      </div>

      {/* ── Lightbox ── */}
      {selected !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Visionneuse de photo"
          className="fixed inset-0 z-50 flex items-center justify-center"
          style={{ backgroundColor: "rgba(29,29,27,0.94)" }}
          onClick={() => setSelected(null)}
        >
          <div
            className="relative mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Fermer */}
            <button
              className="absolute font-light leading-none"
              style={{
                top: "-40px",
                right: "0",
                fontSize: "36px",
                color: "rgba(244,244,240,0.80)",
              }}
              onClick={() => setSelected(null)}
              aria-label="Fermer"
            >
              ×
            </button>

            {/* Prev */}
            {selected > 0 && (
              <button
                className="absolute flex items-center justify-center rounded-full text-3xl"
                style={{
                  left: "-52px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  width: "40px",
                  height: "40px",
                  backgroundColor: accentRgba(0.70),
                  color: "#F4F4F0",
                }}
                onClick={() => setSelected((i) => (i !== null ? i - 1 : i))}
                aria-label="Image précédente"
              >
                ‹
              </button>
            )}

            {/* Next */}
            {selected < photos.length - 1 && (
              <button
                className="absolute flex items-center justify-center rounded-full text-3xl"
                style={{
                  right: "-52px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  width: "40px",
                  height: "40px",
                  backgroundColor: accentRgba(0.70),
                  color: "#F4F4F0",
                }}
                onClick={() => setSelected((i) => (i !== null ? i + 1 : i))}
                aria-label="Image suivante"
              >
                ›
              </button>
            )}

            {/* Image en couleur pleine */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={photos[selected].src}
              alt={photos[selected].alt}
              style={{
                maxWidth: "90vw",
                maxHeight: "80vh",
                objectFit: "contain",
                display: "block",
                borderRadius: "8px",
              }}
            />

            {/* Caption */}
            {photos[selected].caption && (
              <p
                className="mt-3 text-center text-sm"
                style={{ color: "rgba(244,244,240,0.65)" }}
              >
                {photos[selected].caption}
              </p>
            )}

            {/* Compteur */}
            <p
              className="mt-1 text-center text-xs"
              style={{ color: "rgba(244,244,240,0.35)" }}
            >
              {selected + 1} / {photos.length}
            </p>
          </div>
        </div>
      )}
    </>
  );
}
