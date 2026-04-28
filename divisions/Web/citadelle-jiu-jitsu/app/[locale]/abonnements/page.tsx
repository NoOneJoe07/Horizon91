import { getTranslations, setRequestLocale } from "next-intl/server";
import { prisma } from "@/lib/db";
import type { Locale } from "@/lib/locales";

function formatPrice(cents: number): string {
  return (cents / 100).toLocaleString("fr-CA", {
    style: "currency",
    currency: "CAD",
    maximumFractionDigits: 0,
  });
}

export default async function SubscriptionsPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "Subscriptions" });

  // Charge depuis la BD ; si la BD n'est pas encore migrée, retourne []
  let plans: Awaited<ReturnType<typeof prisma.subscriptionPlan.findMany>> = [];
  try {
    plans = await prisma.subscriptionPlan.findMany({
      where: { active: true },
      orderBy: { sortOrder: "asc" },
    });
  } catch {
    // BD non disponible (ex: prisma migrate pas encore lancé)
    plans = [];
  }

  return (
    <section className="section">
      <div className="container-citadelle">
        <header style={{ textAlign: "center", marginBottom: "3rem" }}>
          <h1 style={{ fontSize: "2.5rem", marginBottom: "0.5rem" }}>{t("title")}</h1>
          <p style={{ color: "var(--color-citadelle-text-muted)" }}>{t("subtitle")}</p>
        </header>

        {plans.length === 0 ? (
          <div className="card" style={{ textAlign: "center", padding: "3rem" }}>
            <p style={{ color: "var(--color-citadelle-text-muted)" }}>
              {locale === "fr"
                ? "Les abonnements seront affichés une fois la base de données initialisée (npm run prisma:migrate puis npm run prisma:seed)."
                : "Plans will appear once the database is initialized (npm run prisma:migrate then npm run prisma:seed)."}
            </p>
          </div>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: "1.5rem",
              alignItems: "stretch",
            }}
          >
            {plans.map((plan) => {
              const features = locale === "fr" ? plan.featuresFr : plan.featuresEn;
              return (
                <article
                  key={plan.id}
                  className="card"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    position: "relative",
                    borderColor: plan.popular
                      ? "var(--color-citadelle-gold)"
                      : "var(--color-citadelle-border)",
                  }}
                >
                  {plan.popular && (
                    <div
                      style={{
                        position: "absolute",
                        top: "-0.75rem",
                        right: "1rem",
                        background: "var(--color-citadelle-gold)",
                        color: "var(--color-citadelle-bg)",
                        padding: "0.25rem 0.75rem",
                        borderRadius: "var(--radius-sm)",
                        fontSize: "0.75rem",
                        fontWeight: 700,
                        textTransform: "uppercase",
                      }}
                    >
                      {t("popular")}
                    </div>
                  )}
                  <h2 style={{ fontSize: "1.25rem", marginBottom: "0.5rem" }}>
                    {locale === "fr" ? plan.nameFr : plan.nameEn}
                  </h2>
                  <p
                    style={{
                      color: "var(--color-citadelle-text-muted)",
                      marginBottom: "1.25rem",
                      fontSize: "0.95rem",
                    }}
                  >
                    {locale === "fr" ? plan.descriptionFr : plan.descriptionEn}
                  </p>
                  <div style={{ marginBottom: "1.5rem" }}>
                    <span
                      style={{
                        fontSize: "2.25rem",
                        fontWeight: 700,
                        color: "var(--color-citadelle-gold)",
                      }}
                    >
                      {formatPrice(plan.priceCents)}
                    </span>
                    <span
                      style={{
                        color: "var(--color-citadelle-text-muted)",
                        marginLeft: "0.25rem",
                      }}
                    >
                      {plan.interval === "MONTH" ? t("perMonth") : t("perYear")}
                    </span>
                  </div>

                  <div style={{ marginBottom: "1.5rem", flex: 1 }}>
                    <p
                      style={{
                        fontSize: "0.825rem",
                        color: "var(--color-citadelle-text-muted)",
                        marginBottom: "0.5rem",
                        textTransform: "uppercase",
                        letterSpacing: "0.05em",
                      }}
                    >
                      {t("features")}
                    </p>
                    <ul style={{ listStyle: "none", padding: 0, display: "grid", gap: "0.4rem" }}>
                      {features.map((feature, i) => (
                        <li key={i} style={{ display: "flex", gap: "0.5rem", fontSize: "0.9rem" }}>
                          <span style={{ color: "var(--color-citadelle-gold)" }}>✓</span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <form action="/api/checkout" method="POST">
                    <input type="hidden" name="planId" value={plan.id} />
                    <input type="hidden" name="locale" value={locale} />
                    <button type="submit" className="btn-primary" style={{ width: "100%" }}>
                      {t("selectPlan")}
                    </button>
                  </form>
                </article>
              );
            })}
          </div>
        )}

        <p
          style={{
            textAlign: "center",
            marginTop: "2rem",
            fontSize: "0.875rem",
            color: "var(--color-citadelle-text-muted)",
            fontStyle: "italic",
          }}
        >
          {t("guarantee")}
        </p>
      </div>
    </section>
  );
}
