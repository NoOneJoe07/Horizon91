// =============================================================================
// Admin — Forfaits (toggle actif/inactif)
// =============================================================================

import { prisma } from "@/lib/db";
import { setRequestLocale } from "next-intl/server";
import type { Locale } from "@/lib/locales";
import { PlanToggle } from "@/components/admin/PlanToggle";

export default async function AdminSubscriptionsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  let plans: Awaited<ReturnType<typeof prisma.subscriptionPlan.findMany>> = [];
  try {
    plans = await prisma.subscriptionPlan.findMany({ orderBy: { sortOrder: "asc" } });
  } catch {
    plans = [];
  }

  const INTERVAL_LABEL: Record<string, string> = {
    MONTH:   locale === "fr" ? "/mois"          : "/month",
    YEAR:    locale === "fr" ? "/an"            : "/year",
    ONETIME: locale === "fr" ? "paiement unique": "one-time",
  };

  return (
    <div>
      <header style={{ marginBottom: "1.5rem" }}>
        <h1 style={{ fontSize: "1.75rem" }}>
          {locale === "fr" ? "Forfaits" : "Plans"}
        </h1>
        <p style={{ fontSize: "0.875rem", color: "var(--color-citadelle-text-muted)", marginTop: "0.35rem" }}>
          {locale === "fr"
            ? "Pour modifier les prix ou créer de nouveaux forfaits, une mise à jour Stripe est nécessaire — contacter Groupe Supernova."
            : "To change prices or create new plans, a Stripe update is required — contact Groupe Supernova."}
        </p>
      </header>

      {plans.length === 0 ? (
        <div className="card" style={{ textAlign: "center", padding: "2rem" }}>
          <p style={{ color: "var(--color-citadelle-text-muted)" }}>
            {locale === "fr" ? "Aucun forfait configuré." : "No plans configured."}
          </p>
        </div>
      ) : (
        <div style={{ display: "grid", gap: "0.75rem" }}>
          {plans.map((plan) => (
            <div
              key={plan.id}
              className="card"
              style={{
                padding: "1rem",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: "1rem",
                opacity: plan.active ? 1 : 0.55,
              }}
            >
              <div>
                <h3 style={{ fontSize: "1rem", marginBottom: "0.2rem" }}>
                  {locale === "fr" ? plan.nameFr : plan.nameEn}
                  {plan.popular && (
                    <span style={{
                      marginLeft: "0.5rem", fontSize: "0.7rem",
                      background: "var(--color-citadelle-gold)",
                      color: "var(--color-citadelle-bg)",
                      padding: "0.1rem 0.4rem",
                      borderRadius: "var(--radius-sm)", fontWeight: 700,
                    }}>
                      ★
                    </span>
                  )}
                </h3>
                <p style={{ fontSize: "0.875rem", color: "var(--color-citadelle-text-muted)" }}>
                  {(plan.priceCents / 100).toFixed(0)} $ {INTERVAL_LABEL[plan.interval]}
                </p>
              </div>

              <PlanToggle id={plan.id} active={plan.active} locale={locale} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
