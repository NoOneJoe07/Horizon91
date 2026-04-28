// =============================================================================
// Admin — Séances d'essai en attente
// =============================================================================

import { prisma } from "@/lib/db";
import { setRequestLocale } from "next-intl/server";
import type { Locale } from "@/lib/locales";

export default async function AdminTrialsPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  let trials: Awaited<ReturnType<typeof prisma.trialSession.findMany>> = [];
  try {
    trials = await prisma.trialSession.findMany({
      orderBy: { createdAt: "desc" },
      take: 50,
    });
  } catch {
    trials = [];
  }

  return (
    <div>
      <h1 style={{ fontSize: "1.75rem", marginBottom: "1.5rem" }}>
        {locale === "fr" ? "Séances d'essai" : "Trial classes"}
      </h1>

      {trials.length === 0 ? (
        <div className="card" style={{ textAlign: "center", padding: "2rem" }}>
          <p style={{ color: "var(--color-citadelle-text-muted)" }}>
            {locale === "fr" ? "Aucune demande pour l'instant." : "No requests yet."}
          </p>
        </div>
      ) : (
        <div style={{ display: "grid", gap: "0.75rem" }}>
          {trials.map((t) => (
            <div key={t.id} className="card" style={{ padding: "1rem" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "start",
                  gap: "1rem",
                  flexWrap: "wrap",
                }}
              >
                <div>
                  <h3 style={{ fontSize: "1rem", marginBottom: "0.25rem" }}>
                    {t.firstName} {t.lastName}{" "}
                    <span
                      style={{
                        fontSize: "0.75rem",
                        color: "var(--color-citadelle-text-muted)",
                        fontWeight: 400,
                      }}
                    >
                      · {t.age} ans · {t.experience}
                    </span>
                  </h3>
                  <p
                    style={{
                      fontSize: "0.875rem",
                      color: "var(--color-citadelle-text-muted)",
                    }}
                  >
                    {t.email} · {t.phone}
                  </p>
                  <p style={{ fontSize: "0.875rem", marginTop: "0.5rem" }}>
                    {locale === "fr" ? "Date souhaitée" : "Preferred date"}:{" "}
                    <strong>{new Date(t.preferredDate).toLocaleDateString(locale)}</strong>
                  </p>
                  {t.message && (
                    <p
                      style={{
                        fontSize: "0.875rem",
                        marginTop: "0.5rem",
                        fontStyle: "italic",
                        color: "var(--color-citadelle-text-muted)",
                      }}
                    >
                      « {t.message} »
                    </p>
                  )}
                </div>
                <span
                  style={{
                    padding: "0.25rem 0.65rem",
                    background: "var(--color-citadelle-surface-2)",
                    borderRadius: "var(--radius-sm)",
                    fontSize: "0.75rem",
                    color:
                      t.status === "PENDING"
                        ? "var(--color-citadelle-gold)"
                        : "var(--color-citadelle-text-muted)",
                  }}
                >
                  {t.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      <p
        style={{
          marginTop: "1.5rem",
          fontSize: "0.825rem",
          color: "var(--color-citadelle-text-muted)",
          fontStyle: "italic",
        }}
      >
        TODO: ajouter actions "Confirmer", "Marquer présent", "No-show".
      </p>
    </div>
  );
}
