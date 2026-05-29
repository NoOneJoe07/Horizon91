// =============================================================================
// Admin — Séances d'essai (avec actions de statut)
// =============================================================================

import { prisma } from "@/lib/db";
import { setRequestLocale } from "next-intl/server";
import type { Locale } from "@/lib/locales";
import { TrialActions } from "@/components/admin/TrialActions";

export default async function AdminTrialsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  let trials: Awaited<ReturnType<typeof prisma.trialSession.findMany>> = [];
  try {
    trials = await prisma.trialSession.findMany({
      orderBy: { createdAt: "desc" },
      take: 100,
    });
  } catch {
    trials = [];
  }

  // Regroupe : actifs d'abord (PENDING, CONFIRMED), archivés ensuite
  const active   = trials.filter((t) => t.status === "PENDING" || t.status === "CONFIRMED");
  const archived = trials.filter((t) => !["PENDING", "CONFIRMED"].includes(t.status));

  return (
    <div>
      <h1 style={{ fontSize: "1.75rem", marginBottom: "1.5rem" }}>
        {locale === "fr" ? "Séances d'essai" : "Trial classes"}
        {active.length > 0 && (
          <span style={{
            marginLeft: "0.75rem",
            fontSize: "0.875rem",
            background: "var(--color-citadelle-gold)",
            color: "var(--color-citadelle-bg)",
            padding: "0.2rem 0.6rem",
            borderRadius: "var(--radius-sm)",
            fontWeight: 700,
          }}>
            {active.length}
          </span>
        )}
      </h1>

      {trials.length === 0 ? (
        <div className="card" style={{ textAlign: "center", padding: "2rem" }}>
          <p style={{ color: "var(--color-citadelle-text-muted)" }}>
            {locale === "fr" ? "Aucune demande pour l'instant." : "No requests yet."}
          </p>
        </div>
      ) : (
        <>
          {/* ── Actives ──────────────────────────────────── */}
          {active.length > 0 && (
            <div style={{ display: "grid", gap: "0.75rem", marginBottom: "2rem" }}>
              {active.map((t) => (
                <TrialCard key={t.id} trial={t} locale={locale} />
              ))}
            </div>
          )}

          {/* ── Archivées ─────────────────────────────────── */}
          {archived.length > 0 && (
            <>
              <h2 style={{
                fontSize: "0.8rem", textTransform: "uppercase",
                letterSpacing: "0.08em", color: "var(--color-citadelle-text-muted)",
                marginBottom: "0.75rem",
              }}>
                {locale === "fr" ? "Archivées" : "Archived"}
              </h2>
              <div style={{ display: "grid", gap: "0.5rem", opacity: 0.65 }}>
                {archived.map((t) => (
                  <TrialCard key={t.id} trial={t} locale={locale} />
                ))}
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
}

function TrialCard({
  trial,
  locale,
}: {
  trial: Awaited<ReturnType<typeof prisma.trialSession.findMany>>[number];
  locale: string;
}) {
  return (
    <div className="card" style={{ padding: "1rem" }}>
      <div style={{
        display: "flex", justifyContent: "space-between",
        alignItems: "flex-start", gap: "1rem", flexWrap: "wrap",
      }}>
        {/* Infos */}
        <div style={{ flex: 1 }}>
          <h3 style={{ fontSize: "1rem", marginBottom: "0.25rem" }}>
            {trial.firstName} {trial.lastName}
            <span style={{ fontSize: "0.8rem", color: "var(--color-citadelle-text-muted)", fontWeight: 400, marginLeft: "0.5rem" }}>
              · {trial.age} {locale === "fr" ? "ans" : "y/o"} · {trial.experience}
            </span>
          </h3>
          <p style={{ fontSize: "0.875rem", color: "var(--color-citadelle-text-muted)", marginBottom: "0.35rem" }}>
            {trial.email} · {trial.phone}
          </p>
          <p style={{ fontSize: "0.875rem" }}>
            {locale === "fr" ? "Date souhaitée" : "Preferred date"} :{" "}
            <strong>{new Date(trial.preferredDate).toLocaleDateString(locale === "fr" ? "fr-CA" : "en-CA", {
              weekday: "long", year: "numeric", month: "long", day: "numeric",
            })}</strong>
          </p>
          {trial.message && (
            <p style={{ fontSize: "0.875rem", marginTop: "0.4rem", fontStyle: "italic", color: "var(--color-citadelle-text-muted)" }}>
              « {trial.message} »
            </p>
          )}
          <p style={{ fontSize: "0.75rem", color: "var(--color-citadelle-text-muted)", marginTop: "0.5rem" }}>
            {locale === "fr" ? "Reçu le" : "Received"} {new Date(trial.createdAt).toLocaleDateString(locale === "fr" ? "fr-CA" : "en-CA")}
          </p>
        </div>

        {/* Actions */}
        <TrialActions id={trial.id} status={trial.status} locale={locale} />
      </div>
    </div>
  );
}
