import { prisma } from "@/lib/db";
import { setRequestLocale } from "next-intl/server";
import type { Locale } from "@/lib/locales";

export default async function AdminSubscriptionsPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  let plans: Awaited<ReturnType<typeof prisma.subscriptionPlan.findMany>> = [];
  try {
    plans = await prisma.subscriptionPlan.findMany({ orderBy: { sortOrder: "asc" } });
  } catch {
    plans = [];
  }

  return (
    <div>
      <h1 style={{ fontSize: "1.75rem", marginBottom: "1.5rem" }}>
        {locale === "fr" ? "Plans d'abonnement" : "Subscription plans"}
      </h1>

      {plans.length === 0 ? (
        <div className="card" style={{ textAlign: "center", padding: "2rem" }}>
          <p style={{ color: "var(--color-citadelle-text-muted)" }}>
            {locale === "fr" ? "Aucun plan configuré." : "No plans configured."}
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
              }}
            >
              <div>
                <h3 style={{ fontSize: "1rem" }}>
                  {locale === "fr" ? plan.nameFr : plan.nameEn}
                </h3>
                <p
                  style={{
                    fontSize: "0.825rem",
                    color: "var(--color-citadelle-text-muted)",
                  }}
                >
                  {(plan.priceCents / 100).toFixed(0)} $ / {plan.interval.toLowerCase()}
                </p>
              </div>
              <span
                style={{
                  padding: "0.25rem 0.65rem",
                  background: plan.active
                    ? "var(--color-citadelle-success)"
                    : "var(--color-citadelle-surface-2)",
                  color: plan.active
                    ? "var(--color-citadelle-bg)"
                    : "var(--color-citadelle-text-muted)",
                  borderRadius: "var(--radius-sm)",
                  fontSize: "0.75rem",
                  fontWeight: 600,
                }}
              >
                {plan.active ? "ACTIVE" : "INACTIVE"}
              </span>
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
        TODO: ajouter Create/Edit + sync Stripe Products/Prices.
      </p>
    </div>
  );
}
