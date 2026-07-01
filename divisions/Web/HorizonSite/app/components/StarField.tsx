"use client";
import { useEffect, useRef } from "react";

interface Star {
  x: number;
  y: number;
  size: number;
  baseOpacity: number;
  phase: number;
  speed: number;
}

export default function StarField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();

    // Générer 180 étoiles réparties sur l'écran
    const stars: Star[] = Array.from({ length: 180 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 1.2 + 0.4,        // 0.4px à 1.6px
      baseOpacity: Math.random() * 0.5 + 0.4, // 0.4 à 0.9
      phase: Math.random() * Math.PI * 2,     // phase aléatoire
      speed: Math.random() * 0.8 + 0.3,       // vitesse de scintillement
    }));

    let raf: number;
    let t = 0;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      t += 0.016;

      for (const s of stars) {
        const twinkle = Math.sin(t * s.speed + s.phase);
        const opacity = s.baseOpacity + twinkle * 0.35;
        const clamped = Math.max(0.05, Math.min(1, opacity));

        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(230, 245, 255, ${clamped})`;
        ctx.fill();

        // Halo léger sur les étoiles les plus grosses
        if (s.size > 1.0) {
          ctx.beginPath();
          ctx.arc(s.x, s.y, s.size * 2.5, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(200, 240, 255, ${clamped * 0.12})`;
          ctx.fill();
        }
      }

      raf = requestAnimationFrame(draw);
    };

    draw();

    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
        width: "100%",
        height: "100%",
      }}
    />
  );
}
