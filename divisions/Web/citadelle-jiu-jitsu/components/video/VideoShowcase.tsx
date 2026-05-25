// =============================================================================
// components/video/VideoShowcase.tsx
// Lecteur vidéo cinématique — autoplay muet en boucle + bouton mute/unmute
// -----------------------------------------------------------------------------
// Utilisé sur l'accueil (section ambiance) et dans la galerie.
// autoPlay + muted + loop + playsInline sont obligatoires pour que les
// navigateurs mobiles lancent la vidéo sans interaction utilisateur.
// Le bouton son en bas à droite permet de couper/rétablir le son au clic.
// =============================================================================

"use client";

import { useRef, useEffect, useState, useCallback } from "react";

interface VideoShowcaseProps {
  /** Chemin relatif depuis /public, ex. "/videos/citadelle-highlight.mp4" */
  src: string;
  /** Titre accessible (aria-label) */
  label: string;
  /** Hauteur max du conteneur. Défaut : "70vh" */
  maxHeight?: string;
}

export default function VideoShowcase({
  src,
  label,
  maxHeight = "70vh",
}: VideoShowcaseProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true);

  // Certains navigateurs mobiles ignorent autoPlay sur mount — forcer play()
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.play().catch(() => {
      // Autoplay bloqué par le navigateur — le poster s'affichera à la place
    });
  }, []);

  const toggleMute = useCallback(() => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setIsMuted(v.muted);
  }, []);

  return (
    <div
      aria-label={label}
      style={{
        position: "relative",
        width: "100%",
        maxHeight,
        overflow: "hidden",
        borderRadius: "var(--radius-md)",
        background: "#000",
        // Légère lueur rouge Citadelle sur les bords
        boxShadow: "0 0 60px rgba(180, 20, 20, 0.18)",
      }}
    >
      <video
        ref={videoRef}
        src={src}
        autoPlay
        muted
        loop
        playsInline
        aria-hidden="true"
        style={{
          width: "100%",
          height: "100%",
          maxHeight,
          objectFit: "cover",
          display: "block",
        }}
      />

      {/* Dégradé discret en bas pour fondre avec la section suivante */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "6rem",
          background:
            "linear-gradient(to bottom, transparent, var(--color-citadelle-bg, #0a0a0a))",
          pointerEvents: "none",
        }}
      />

      {/* Bouton mute / unmute — coin bas droit, au-dessus du dégradé */}
      <button
        onClick={toggleMute}
        aria-label={isMuted ? "Activer le son" : "Couper le son"}
        title={isMuted ? "Activer le son" : "Couper le son"}
        style={{
          position: "absolute",
          bottom: "1.5rem",
          right: "1.25rem",
          zIndex: 10,
          background: "rgba(0, 0, 0, 0.55)",
          border: "1px solid rgba(255, 255, 255, 0.18)",
          borderRadius: "50%",
          width: "2.75rem",
          height: "2.75rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          color: "#fff",
          fontSize: "1.1rem",
          backdropFilter: "blur(6px)",
          transition: "background 0.2s ease, transform 0.15s ease",
        }}
        onMouseEnter={e => {
          (e.currentTarget as HTMLButtonElement).style.background = "rgba(201,160,74,0.35)";
          (e.currentTarget as HTMLButtonElement).style.transform = "scale(1.08)";
        }}
        onMouseLeave={e => {
          (e.currentTarget as HTMLButtonElement).style.background = "rgba(0,0,0,0.55)";
          (e.currentTarget as HTMLButtonElement).style.transform = "scale(1)";
        }}
      >
        {isMuted ? "🔇" : "🔊"}
      </button>
    </div>
  );
}
