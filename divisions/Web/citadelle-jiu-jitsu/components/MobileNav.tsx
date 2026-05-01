"use client";

// =============================================================================
// MobileNav — Menu hamburger responsive (Client Component)
// -----------------------------------------------------------------------------
// Reçoit toutes les données du Server Component Header via props.
// Gère l'état ouvert/fermé + animation du drawer.
// =============================================================================

import { useState, useEffect } from "react";
import Link from "next/link";

interface NavLink {
  href: string;
  label: string;
}

interface MobileNavProps {
  locale: string;
  navLinks: NavLink[];
  labels: {
    trial: string;
    login: string;
    logout: string;
    admin: string;
    openMenu: string;
    closeMenu: string;
  };
  session: { role: string } | null;
}

export function MobileNav({ locale, navLinks, labels, session }: MobileNavProps) {
  const [open, setOpen] = useState(false);

  // Bloquer le scroll du body quand le menu est ouvert
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  // Fermer sur Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      {/* ---- Bouton hamburger ---- */}
      <button
        onClick={() => setOpen(true)}
        aria-label={labels.openMenu}
        aria-expanded={open}
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: "5px",
          padding: "8px",
          background: "none",
          border: "none",
          cursor: "pointer",
          color: "var(--color-citadelle-text)",
        }}
      >
        <span style={{ display: "block", width: "22px", height: "2px", background: "currentColor", borderRadius: "2px" }} />
        <span style={{ display: "block", width: "22px", height: "2px", background: "currentColor", borderRadius: "2px" }} />
        <span style={{ display: "block", width: "16px", height: "2px", background: "currentColor", borderRadius: "2px" }} />
      </button>

      {/* ---- Backdrop ---- */}
      <div
        onClick={() => setOpen(false)}
        aria-hidden="true"
        style={{
          position: "fixed",
          inset: 0,
          background: "rgba(0,0,0,0.65)",
          zIndex: 98,
          opacity: open ? 1 : 0,
          pointerEvents: open ? "auto" : "none",
          transition: "opacity 280ms ease",
        }}
      />

      {/* ---- Drawer ---- */}
      <nav
        aria-label="Menu principal"
        style={{
          position: "fixed",
          top: 0,
          right: 0,
          bottom: 0,
          width: "min(300px, 85vw)",
          backgroundColor: "var(--color-citadelle-surface)",
          borderLeft: "1px solid var(--color-citadelle-border)",
          zIndex: 99,
          transform: open ? "translateX(0)" : "translateX(100%)",
          transition: "transform 300ms cubic-bezier(0.4, 0, 0.2, 1)",
          display: "flex",
          flexDirection: "column",
          overflowY: "auto",
        }}
      >
        {/* Header du drawer : logo + fermeture */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "1.25rem 1.5rem",
            borderBottom: "1px solid var(--color-citadelle-border)",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logo-citadelle.svg"
            alt="Citadelle Jiu-Jitsu"
            style={{ height: "44px", width: "auto" }}
          />
          <button
            onClick={() => setOpen(false)}
            aria-label={labels.closeMenu}
            style={{
              background: "none",
              border: "1px solid var(--color-citadelle-border)",
              borderRadius: "var(--radius-md)",
              color: "var(--color-citadelle-text-muted)",
              cursor: "pointer",
              padding: "6px 10px",
              fontSize: "1rem",
              lineHeight: 1,
            }}
          >
            ✕
          </button>
        </div>

        {/* Liens de navigation */}
        <div style={{ padding: "1.5rem", display: "flex", flexDirection: "column", gap: "0.25rem", flex: 1 }}>
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              style={{
                display: "block",
                padding: "0.85rem 1rem",
                color: "var(--color-citadelle-text)",
                fontSize: "1rem",
                fontWeight: 500,
                borderRadius: "var(--radius-md)",
                borderBottom: "1px solid var(--color-citadelle-border)",
              }}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Actions en bas du drawer */}
        <div
          style={{
            padding: "1.5rem",
            display: "flex",
            flexDirection: "column",
            gap: "0.75rem",
            borderTop: "1px solid var(--color-citadelle-border)",
          }}
        >
          {/* CTA séance d'essai */}
          <Link
            href={`/${locale}/seance-essai`}
            className="btn-primary"
            onClick={() => setOpen(false)}
            style={{ textAlign: "center" }}
          >
            {labels.trial}
          </Link>

          {session ? (
            <>
              {session.role === "ADMIN" && (
                <Link
                  href={`/${locale}/admin`}
                  onClick={() => setOpen(false)}
                  style={{
                    textAlign: "center",
                    padding: "0.65rem",
                    color: "var(--color-citadelle-gold)",
                    fontSize: "0.875rem",
                    border: "1px solid var(--color-citadelle-border)",
                    borderRadius: "var(--radius-md)",
                  }}
                >
                  {labels.admin}
                </Link>
              )}
              <form action={`/api/auth/logout`} method="POST">
                <button
                  type="submit"
                  className="btn-secondary"
                  style={{ width: "100%", textAlign: "center" }}
                >
                  {labels.logout}
                </button>
              </form>
            </>
          ) : (
            <Link
              href={`/${locale}/connexion`}
              className="btn-secondary"
              onClick={() => setOpen(false)}
              style={{ textAlign: "center" }}
            >
              {labels.login}
            </Link>
          )}
        </div>
      </nav>
    </>
  );
}
