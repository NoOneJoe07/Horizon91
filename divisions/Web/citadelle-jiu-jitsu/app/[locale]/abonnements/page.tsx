// =============================================================================
// app/[locale]/abonnements/page.tsx — Page des forfaits
// -----------------------------------------------------------------------------
// RÔLE :
//   Affiche les 4 forfaits réels de Citadelle Jiu-Jitsu (lus depuis la BD via
//   Prisma). Le paiement en ligne Stripe est temporairement désactivé —
//   les boutons redirigent vers /contact pour s'inscrire manuellement.
//   Stripe sera réactivé en septembre 2026 (voir CheckoutButton.tsx).
//
//   Forfaits :
//     1. Mensuel (MONTH)            — 135 $/mois récurrent
//     2. Carte 10 séances (ONETIME) — 155 $ paiement unique
//     3. Cours privé (ONETIME)      — 70 $ paiement unique
//     4. Drop-in (ONETIME)          — 25 $ paiement unique
//
// TYPE : Server Component (async)
//
// AUTEUR    : Horizon 91 — Jonathan Patoine + Claude (Anthropic)
// CRÉÉ      : 2026-04-xx  |  MODIFIÉ : 2026-05-20 (désactivation Stripe temporaire)
// =============================================================================

import { getTranslations, setRequestLocale } from "next-intl/server";
import { prisma } from "@/lib/db";
import { Suspense } from "react";
import Link from "next/link";
import type { Metadata } from "next";
import type { Locale } from "@/lib/locales";

// ---------------------------------------------------------------------------
// SEO
// ---------------------------------------------------------------------------
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: locale === "fr" ? "Forfaits & Tarifs" : "Plans & Pricing",
    description:
      locale === "fr"
        ? "Abonnement mensuel, carte de 10 séances, cours privés et drop-in — jiu-jitsu à Québec. Première séance d'essai gratuite."
        : "Monthly membership, 10-class pack, private lessons, and drop-in — jiu-jitsu in Québec City. First trial class free.",
  };
}

// ---------------------------------------------------------------------------
// Utilitaire : centimes → affichage CAD lisible
// Ex : 13500 → "135 $"
// ---------------------------------------------------------------------------
function formatPrice(cents: number): string {
  return (cents / 100).toLocaleString("fr-CA", {
    style: "currency",
    currency: "CAD",
    maximumFractionDigits: 0,
  });
}


// ---------------------------------------------------------------------------
// Page (Server Component async)
// ---------------------------------------------------------------------------
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
    plans = [];
  }

  return (
    <section className="section">
      <div className="container-citadelle">

        {/*
          ── SUSPENSE + CLIENT COMPONENT ──────────────────────────────────────
          PaymentBanner utilise useSearchParams() pour lire ?success=1 dans
          l'URL. Ce hook est réservé aux Client Components (navigateur).
          Sans <Suspense> ici → erreur de build Next.js App Router.
          ─────────────────────────────────────────────────────────────────── */}
        {/* Bannière info paiement temporairement désactivé */}
        <div
          style={{
            background: "var(--color-citadelle-surface)",
            border: "1px solid var(--color-citadelle-border)",
            borderRadius: "var(--radius-md)",
            padding: "1rem 1.5rem",
            marginBottom: "2rem",
            textAlign: "center",
            fontSize: "0.9rem",
            color: "var(--color-citadelle-text-muted)",
          }}
        >
          {locale === "fr"
            ? "Le paiement en ligne sera disponible prochainement. Pour vous inscrire, contactez-nous directement."
            : "Online payment coming soon. To register, contact us directly."}
        </div>

        <header style={{ textAlign: "center", marginBottom: "3rem" }}>
          <h1 style={{ fontSize: "2.5rem", marginBottom: "0.5rem" }}>{t("title")}</h1>
          <p
            style={{
              color: "var(--color-citadelle-text-muted)",
              maxWidth: "560px",
              margin: "0 auto",
            }}
          >
            {t("subtitle")}
          </p>
        </header>

        {plans.length === 0 ? (
          <div className="card" style={{ textAlign: "center", padding: "3rem" }}>
            <p style={{ color: "var(--color-citadelle-text-muted)" }}>
              {locale === "fr"
                ? "Les forfaits seront affichés une fois la base de données initialisée (npm run prisma:migrate puis npm run prisma:seed)."
                : "Plans will appear once the database is initialized (npm run prisma:migrate then npm run prisma:seed)."}
            </p>
          </div>
        ) : (
          <>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
                gap: "1.5rem",
                alignItems: "stretch",
              }}
            >
              {plans.map((plan) => {
                const features  = locale === "fr" ? plan.featuresFr : plan.featuresEn;
                const name      = locale === "fr" ? plan.nameFr     : plan.nameEn;
                const desc      = locale === "fr" ? plan.descriptionFr : plan.descriptionEn;
                const isOnetime = plan.interval === "ONETIME";

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
                    {/* Badge "Le plus populaire" */}
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

                    {/* Titre */}
                    <h2 style={{ fontSize: "1.2rem", marginBottom: "0.5rem" }}>{name}</h2>

                    {/* Description */}
                    <p
                      style={{
                        color: "var(--color-citadelle-text-muted)",
                        marginBottom: "1.25rem",
                        fontSize: "0.9rem",
                        lineHeight: 1.55,
                      }}
                    >
                      {desc}
                    </p>

                    {/* Prix */}
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
                          fontSize: "0.9rem",
                        }}
                      >
                        {plan.interval === "MONTH"
                          ? t("perMonth")
                          : plan.interval === "YEAR"
                          ? t("perYear")
                          : t("oneTime")}
                      </span>
                      {/* Mention taxes pour les paiements uniques */}
                      {isOnetime && (
                        <span
                          style={{
                            display: "block",
                            fontSize: "0.75rem",
                            color: "var(--color-citadelle-text-muted)",
                            marginTop: "0.15rem",
                          }}
                        >
                          {t("plusTaxes")}
                        </span>
                      )}
                    </div>

                    {/* Liste de features */}
                    <div style={{ marginBottom: "1.5rem", flex: 1 }}>
                      <p
                        style={{
                          fontSize: "0.8rem",
                          color: "var(--color-citadelle-text-muted)",
                          marginBottom: "0.5rem",
                          textTransform: "uppercase",
                          letterSpacing: "0.05em",
                        }}
                      >
                        {t("features")}
                      </p>
                      <ul
                        style={{
                          listStyle: "none",
                          padding: 0,
                          display: "grid",
                          gap: "0.4rem",
                        }}
                      >
                        {features.map((feature, i) => (
                          <li
                            key={i}
                            style={{
                              display: "flex",
                              gap: "0.5rem",
                              fontSize: "0.875rem",
                            }}
                          >
                            <span
                              style={{
                                color: "var(--color-citadelle-gold)",
                                flexShrink: 0,
                              }}
                            >
                              ✓
                            </span>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Stripe désactivé temporairement — réactiver en septembre 2026
                        Remplacer ce bloc par <CheckoutButton planId={plan.id} locale={locale} label={t("selectPlan")} />
                        et réimporter CheckoutButton + PaymentBanner en haut du fichier. */}
                    <Link
                      href={`/${locale}/contact`}
                      className="btn-primary"
                      style={{ display: "block", textAlign: "center", width: "100%" }}
                    >
                      {locale === "fr" ? "Nous contacter" : "Contact us"}
                    </Link>
                  </article>
                );
              })}
            </div>

            {/* Notes légales — taxes + garantie mensuel */}
            <div style={{ textAlign: "center", marginTop: "2rem" }}>
              <p
                style={{
                  fontSize: "0.825rem",
                  color: "var(--color-citadelle-text-muted)",
                  fontStyle: "italic",
                  marginBottom: "0.35rem",
                }}
              >
                {t("taxNote")}
              </p>
              <p
                style={{
                  fontSize: "0.825rem",
                  color: "var(--color-citadelle-text-muted)",
                  fontStyle: "italic",
                }}
              >
                {t("guarantee")}
              </p>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
