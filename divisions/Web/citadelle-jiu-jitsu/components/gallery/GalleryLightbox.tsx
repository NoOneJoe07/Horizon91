// =============================================================================
// components/gallery/GalleryLightbox.tsx
// Grille de photos cliquables + lightbox plein écran
// Fermeture : clic extérieur, touche Échap, bouton ×
// Navigation : flèches gauche/droite ou touches clavier
// =============================================================================

"use client";

import { useEffect, useState, useCallback } from "react";

interface Photo {
  src: string;
  altFr: string;
  altEn: string;
  wide?: boolean;
}

interface GalleryLightboxProps {
  photos: Photo[];
  locale: string;
}

export default function GalleryLightbox({ photos, locale }: GalleryLightboxProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const open  = (i: number) => setActiveIndex(i);
  const close = useCallback(() => setActiveIndex(null), []);
  const prev  = useCallback(() =>
    setActiveIndex(i => (i === null ? null : (i - 1 + photos.length) % photos.length)), [photos.length]);
  const next  = useCallback(() =>
    setActiveIndex(i => (i === null ? null : (i + 1) % photos.length)), [photos.length]);

  // Clavier : Échap, ←, →
  useEffect(() => {
    if (activeIndex === null) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape")     close();
      if (e.key === "ArrowLeft")  prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [activeIndex, close, prev, next]);

  // Bloquer le scroll quand le lightbox est ouvert
  useEffect(() => {
    document.body.style.overflow = activeIndex !== null ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [activeIndex]);

  const activePhoto = activeIndex !== null ? photos[activeIndex] : null;

  return (
    <>
      {/* ── Grille ── */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
          gap: "1rem",
        }}
      >
        {photos.map((photo, i) => (
          <div
            key={photo.src}
            onClick={() => open(i)}
            role="button"
            tabIndex={0}
            onKeyDown={e => e.key === "Enter" && open(i)}
            aria-label={locale === "fr" ? photo.altFr : photo.altEn}
            style={{
              gridColumn: photo.wide ? "span 2" : "span 1",
              aspectRatio: photo.wide ? "16 / 7" : "3 / 4",
              borderRadius: "var(--radius-md)",
              overflow: "hidden",
              border: "1px solid var(--color-citadelle-border)",
              cursor: "zoom-in",
              position: "relative",
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
                transition: "transform 0.3s ease",
                display: "block",
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLImageElement).style.transform = "scale(1.04)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLImageElement).style.transform = "scale(1)"; }}
            />
          </div>
        ))}
      </div>

      {/* ── Lightbox ── */}
      {activePhoto && (
        <div
          onClick={close}
          role="dialog"
          aria-modal="true"
          aria-label={locale === "fr" ? activePhoto.altFr : activePhoto.altEn}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 1000,
            background: "rgba(0, 0, 0, 0.92)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "1rem",
            animation: "fadeIn 0.2s ease",
          }}
        >
          {/* Bouton fermer */}
          <button
            onClick={close}
            aria-label="Fermer"
            style={{
              position: "absolute",
              top: "1.25rem",
              right: "1.25rem",
              background: "none",
              border: "none",
              color: "#fff",
              fontSize: "2rem",
              lineHeight: 1,
              cursor: "pointer",
              opacity: 0.8,
              zIndex: 1001,
            }}
          >
            ×
          </button>

          {/* Flèche gauche */}
          <button
            onClick={e => { e.stopPropagation(); prev(); }}
            aria-label="Photo précédente"
            style={{
              position: "absolute",
              left: "1rem",
              top: "50%",
              transform: "translateY(-50%)",
              background: "rgba(255,255,255,0.12)",
              border: "none",
              color: "#fff",
              fontSize: "1.75rem",
              width: "2.75rem",
              height: "2.75rem",
              borderRadius: "50%",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 1001,
            }}
          >
            ‹
          </button>

          {/* Image principale — clic sur l'image ne ferme PAS */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={activePhoto.src}
            alt={locale === "fr" ? activePhoto.altFr : activePhoto.altEn}
            onClick={e => e.stopPropagation()}
            style={{
              maxWidth: "min(90vw, 1200px)",
              maxHeight: "88vh",
              objectFit: "contain",
              borderRadius: "var(--radius-sm)",
              boxShadow: "0 8px 48px rgba(0,0,0,0.6)",
              userSelect: "none",
            }}
          />

          {/* Flèche droite */}
          <button
            onClick={e => { e.stopPropagation(); next(); }}
            aria-label="Photo suivante"
            style={{
              position: "absolute",
              right: "1rem",
              top: "50%",
              transform: "translateY(-50%)",
              background: "rgba(255,255,255,0.12)",
              border: "none",
              color: "#fff",
              fontSize: "1.75rem",
              width: "2.75rem",
              height: "2.75rem",
              borderRadius: "50%",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 1001,
            }}
          >
            ›
          </button>

          {/* Compteur */}
          <div
            style={{
              position: "absolute",
              bottom: "1.25rem",
              left: "50%",
              transform: "translateX(-50%)",
              color: "rgba(255,255,255,0.6)",
              fontSize: "0.85rem",
            }}
          >
            {(activeIndex ?? 0) + 1} / {photos.length}
          </div>
        </div>
      )}

      <style>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
      `}</style>
    </>
  );
}
