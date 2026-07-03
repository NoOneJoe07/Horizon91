"use client";

import { useState, useEffect } from "react";

// ─────────────────────────────────────────────────────────
// ArpenteurGallery — grille de photos avec lightbox
// Utilisé sur /divisions/arpenteur (Bourdon + Holland)
// ─────────────────────────────────────────────────────────

export interface Photo {
  src: string;
  alt: string;
  caption?: string;
}

interface ArpenteurGalleryProps {
  photos: Photo[];
  cols?: 1 | 2 | 3;
}

export default function ArpenteurGallery({
  photos,
  cols = 3,
}: ArpenteurGalleryProps) {
  const [selected, setSelected] = useState<number | null>(null);

  // Clavier : Escape ferme, flèches naviguent
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

  // Bloquer le scroll du body quand la lightbox est ouverte
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

  const gridClass =
    cols === 1
      ? "grid-cols-1"
      : cols === 2
      ? "grid-cols-1 sm:grid-cols-2"
      : "grid-cols-1 sm:grid-cols-3";

  return (
    <>
      {/* ── Grille de miniatures ── */}
      <div className={`grid ${gridClass} gap-4`}>
        {photos.map((photo, i) => (
          <button
            key={i}
            type="button"
            className="group relative overflow-hidden rounded-xl text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-violet-500"
            style={{ backgroundColor: "#1D1D1B" }}
            onClick={() => setSelected(i)}
            aria-label={`Agrandir : ${photo.alt}`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={photo.src}
              alt={photo.alt}
              className="w-full transition-transform duration-300 group-hover:scale-105"
              style={{ height: "220px", objectFit: "cover", display: "block" }}
            />

            {/* Overlay hover */}
            <div
              className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200"
              style={{ backgroundColor: "rgba(87,98,162,0.45)" }}
            >
              <span
                className="text-3xl select-none"
                style={{ color: "#F4F4F0" }}
              >
                ⊕
              </span>
            </div>

            {/* Caption */}
            {photo.caption && (
              <div
                className="px-3 py-2"
                style={{ backgroundColor: "rgba(29,29,27,0.88)" }}
              >
                <p
                  className="text-xs text-center"
                  style={{ color: "rgba(244,244,240,0.65)" }}
                >
                  {photo.caption}
                </p>
              </div>
            )}
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
            {/* Bouton fermer */}
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
                  backgroundColor: "rgba(87,98,162,0.70)",
                  color: "#F4F4F0",
                }}
                onClick={() =>
                  setSelected((i) => (i !== null ? i - 1 : i))
                }
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
                  backgroundColor: "rgba(87,98,162,0.70)",
                  color: "#F4F4F0",
                }}
                onClick={() =>
                  setSelected((i) => (i !== null ? i + 1 : i))
                }
                aria-label="Image suivante"
              >
                ›
              </button>
            )}

            {/* Image agrandie */}
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

            {/* Caption lightbox */}
            {photos[selected].caption && (
              <p
                className="mt-3 text-center text-sm"
                style={{ color: "rgba(244,244,240,0.65)" }}
              >
                {photos[selected].caption}
              </p>
            )}

            {/* Compteur */}
            {photos.length > 1 && (
              <p
                className="mt-1 text-center text-xs"
                style={{ color: "rgba(244,244,240,0.40)" }}
              >
                {selected + 1} / {photos.length}
              </p>
            )}
          </div>
        </div>
      )}
    </>
  );
}
