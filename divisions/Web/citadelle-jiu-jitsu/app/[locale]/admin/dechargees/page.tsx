// =============================================================================
// Admin — Décharges de responsabilité signées
// =============================================================================

import { prisma } from "@/lib/db";
import { setRequestLocale } from "next-intl/server";
import type { Locale } from "@/lib/locales";

export default async function AdminWaiversPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  let waivers: Array<{
    id: string;
    participantName: string;
    birthDate: string;
    address: string;
    isMinor: boolean;
    guardianName: string | null;
    photoConsent: boolean;
    signatureName: string;
    ipAddress: string | null;
    signedAt: Date;
    user: { email: string; firstName: string; lastName: string };
  }> = [];

  try {
    waivers = await prisma.waiver.findMany({
      orderBy: { signedAt: "desc" },
      include: {
        user: { select: { email: true, firstName: true, lastName: true } },
      },
    });
  } catch {
    waivers = [];
  }

  const isFr = locale === "fr";

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
        <h1 style={{ fontSize: "1.5rem" }}>
          {isFr ? "Décharges de responsabilité" : "Liability Waivers"}
        </h1>
        <span style={{
          background: "var(--color-citadelle-gold)",
          color: "#000",
          padding: "0.25rem 0.75rem",
          borderRadius: "999px",
          fontSize: "0.875rem",
          fontWeight: 700,
        }}>
          {waivers.length} {isFr ? "signée(s)" : "signed"}
        </span>
      </div>

      {waivers.length === 0 ? (
        <div className="card" style={{ textAlign: "center", padding: "3rem", color: "var(--color-citadelle-text-muted)" }}>
          {isFr ? "Aucune décharge signée pour l'instant." : "No waivers signed yet."}
        </div>
      ) : (
        <div style={{ display: "grid", gap: "1rem" }}>
          {waivers.map((w) => (
            <div
              key={w.id}
              className="card"
              style={{ padding: "1.25rem", display: "grid", gap: "0.5rem" }}
            >
              {/* En-tête */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "0.5rem" }}>
                <div>
                  <p style={{ fontWeight: 700, fontSize: "1rem" }}>{w.participantName}</p>
                  <p style={{ fontSize: "0.8rem", color: "var(--color-citadelle-text-muted)" }}>
                    {w.user.firstName} {w.user.lastName} — {w.user.email}
                  </p>
                </div>
                <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                  {w.isMinor && (
                    <span style={{ background: "rgba(59,130,246,0.15)", color: "#3b82f6", padding: "0.2rem 0.6rem", borderRadius: "999px", fontSize: "0.75rem", fontWeight: 600 }}>
                      {isFr ? "Mineur" : "Minor"}
                    </span>
                  )}
                  <span style={{
                    background: w.photoConsent ? "rgba(34,197,94,0.12)" : "rgba(239,68,68,0.08)",
                    color: w.photoConsent ? "#22c55e" : "#ef4444",
                    padding: "0.2rem 0.6rem",
                    borderRadius: "999px",
                    fontSize: "0.75rem",
                    fontWeight: 600,
                  }}>
                    📷 {w.photoConsent
                      ? (isFr ? "Photos autorisées" : "Photos allowed")
                      : (isFr ? "Photos refusées" : "Photos declined")}
                  </span>
                </div>
              </div>

              {/* Détails */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "0.4rem", fontSize: "0.8rem", color: "var(--color-citadelle-text-muted)" }}>
                <span>📅 {isFr ? "Né(e) le" : "Born"} : {w.birthDate}</span>
                <span>🏠 {w.address}</span>
                {w.isMinor && w.guardianName && (
                  <span>👤 {isFr ? "Tuteur" : "Guardian"} : {w.guardianName}</span>
                )}
                <span>✍️ {isFr ? "Signature" : "Signed as"} : <em>{w.signatureName}</em></span>
                <span>📅 {isFr ? "Signée le" : "Signed on"} : {w.signedAt.toLocaleDateString(isFr ? "fr-CA" : "en-CA", {
                  year: "numeric", month: "long", day: "numeric", hour: "2-digit", minute: "2-digit",
                })}</span>
                {w.ipAddress && (
                  <span>🌐 IP : {w.ipAddress}</span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
