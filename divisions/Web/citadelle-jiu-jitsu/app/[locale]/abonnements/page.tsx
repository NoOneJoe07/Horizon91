// =============================================================================
// app/[locale]/abonnements/page.tsx — Page des abonnements
// -----------------------------------------------------------------------------
// RÔLE :
//   Affiche les plans d'abonnement disponibles (lus depuis la BD Postgres via
//   Prisma) et permet à l'utilisateur de souscrire via Stripe.
//
// TYPE : Server Component (async) — s'exécute côté serveur Node.js.
//   → Avantage : accès direct à Prisma/BD sans passer par une API REST.
//   → Les données sont prêtes au moment où le HTML est envoyé au navigateur
//     (meilleur SEO, pas de "flash" de chargement).
//
// ROUTE : /fr/abonnements  ou  /en/abonnements  (routing i18n via [locale])
//
// COMPOSANTS ENFANTS :
//   - PaymentBanner  : Client Component — lit ?success=1/?canceled=1 dans l'URL
//   - CheckoutButton : Client Component — déclenche le paiement Stripe
//
// DONNÉES :
//   - Plans d'abonnement lus depuis la table `SubscriptionPlan` en BD
//   - Si la BD n'est pas disponible, affiche un message de fallback (try/catch)
//
// AUTEUR    : Horizon 91 — Jonathan Patoine + Claude (Anthropic)
// CRÉÉ      : 2026-04-xx  |  MODIFIÉ : 2026-05-04 (ajout PaymentBanner)
// =============================================================================

import { getTranslations, setRequestLocale } from "next-intl/server";
import { prisma } from "@/lib/db";
import { CheckoutButton } from "@/components/CheckoutButton";
import { PaymentBanner } from "@/components/PaymentBanner";
import { Suspense } from "react";
import type { Metadata } from "next";
import type { Locale } from "@/lib/locales";

// ---------------------------------------------------------------------------
// SEO — Métadonnées de la page
// ---------------------------------------------------------------------------
// Next.js fusionne ce retour avec le template du layout parent :
//   title "Abonnements & Tarifs" + template "— Citadelle Jiu-Jitsu"
//   → <title>Abonnements & Tarifs — Citadelle Jiu-Jitsu</title>
// La description cible les recherches locales spécifiques aux abonnements BJJ.
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return {
    title:       locale === "fr" ? "Abonnements & Tarifs"          : "Memberships & Pricing",
    description: locale === "fr"
      ? "Abonnements jiu-jitsu à Québec : adulte, enfant, famille. Sans engagement après le premier mois."
      : "Jiu-jitsu memberships in Québec City: adult, child, family plans. No commitment after first month.",
  };
}

// ---------------------------------------------------------------------------
// Utilitaire : formate un montant en centimes → chaîne CAD lisible
// Ex : 12000 → "120 $"
// On stocke les prix en centimes (entiers) pour éviter les erreurs
// d'arrondi des nombres flottants (ex: 0.1 + 0.2 ≠ 0.3 en JavaScript).
// ---------------------------------------------------------------------------
function formatPrice(cents: number): string {
  return (cents / 100).toLocaleString("fr-CA", {
    style: "currency",
    currency: "CAD",
    maximumFractionDigits: 0,
  });
}

// ---------------------------------------------------------------------------
// Composant de page (Server Component async)
// ---------------------------------------------------------------------------
// params est une Promise en Next.js 15+ App Router — on doit l'awaiter.
// { locale } vient du segment [locale] dans le chemin de fichier.
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

        {/*
          ── SUSPENSE + CLIENT COMPONENT ──────────────────────────────────────
          PaymentBanner utilise useSearchParams() pour lire ?success=1 dans
          l'URL. Ce hook est réservé aux Client Components (navigateur).

          Règle Next.js App Router : tout composant utilisant useSearchParams()
          DOIT être enveloppé dans <Suspense> dans son parent Server Component.

          Pourquoi ? Pendant le rendu serveur (SSR), Next.js ne connaît pas
          encore les paramètres d'URL du navigateur. <Suspense> lui dit :
          "rends le reste de la page normalement côté serveur, et hydrate
          PaymentBanner séparément côté client une fois que le navigateur
          a chargé le JavaScript."

          fallback={null} = rien d'affiché pendant ce court délai d'hydratation
          (le banner est un bonus UX, pas du contenu critique → invisible OK).

          Sans <Suspense> ici → erreur de build :
          "useSearchParams() should be wrapped in a suspense boundary"
          ─────────────────────────────────────────────────────────────────── */}
        <Suspense fallback={null}>
          <PaymentBanner locale={locale} />
        </Suspense>

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

                  <CheckoutButton
                    planId={plan.id}
                    locale={locale}
                    label={t("selectPlan")}
                  />
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
