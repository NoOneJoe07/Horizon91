// =============================================================================
// app/[locale]/boutique/page.tsx — Page de la boutique
// -----------------------------------------------------------------------------
// RÔLE :
//   Affiche les produits physiques disponibles à l'achat (gi, équipement,
//   accessoires) et permet de les acheter via Stripe.
//
// TYPE : Server Component (async) — s'exécute côté serveur.
//   → Prisma interroge directement la BD sans passer par une API REST.
//   → Les produits sont rendus côté serveur (bon SEO, pas de spinner).
//
// ROUTE : /fr/boutique  ou  /en/boutique
//
// MODÈLE BD : table `Product` (Prisma schema)
//   Champs clés : nameFr, nameEn, descriptionFr, descriptionEn,
//                 priceCents, category (APPAREL | GEAR | ACCESSORIES),
//                 stockQuantity, active, imageUrl
//
// CHECKOUT :
//   Utilise <CheckoutButton productId={...} /> — même pattern que /abonnements.
//   ⚠️  NE PAS revenir au pattern <form method="POST"> : il était cassé car
//   l'API retourne du JSON { url } et non une redirection HTTP 303.
//   (Bug corrigé le 2026-05-01, pattern JSON+window.location.href validé.)
//
// EN ATTENTE DU CLIENT (Jean-Sébastien) :
//   - Photos réelles des produits (imageUrl dans la BD)
//   - Liste définitive des produits + prix
//   Actuellement : placeholder emoji par catégorie, remplacer par <img> quand
//   les photos arrivent (voir TODO dans le JSX ci-dessous).
//
// AUTEUR    : Horizon 91 — Jonathan Patoine + Claude (Anthropic)
// CRÉÉ      : 2026-04-xx  |  MODIFIÉ : 2026-05-04 (checkout corrigé + annotations)
// DÉPENDANCES : prisma, CheckoutButton, next-intl
// =============================================================================

import { getTranslations, setRequestLocale } from "next-intl/server";
import { prisma } from "@/lib/db";
import { CheckoutButton } from "@/components/CheckoutButton";
import { Suspense } from "react";
import { PaymentBanner } from "@/components/PaymentBanner";
import type { Metadata } from "next";
import type { Locale } from "@/lib/locales";

// ---------------------------------------------------------------------------
// SEO — Métadonnées de la page boutique
// ---------------------------------------------------------------------------
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return {
    title:       locale === "fr" ? "Boutique"          : "Shop",
    description: locale === "fr"
      ? "Équipement et marchandise officielle Citadelle Jiu-Jitsu : gi, rashguard, vêtements et accessoires."
      : "Official Citadelle Jiu-Jitsu gear and merchandise: gi, rashguard, apparel and accessories.",
  };
}

// ---------------------------------------------------------------------------
// Utilitaire : formate un montant en centimes → chaîne CAD lisible
// Ex : 5500 → "55,00 $"  (boutique : on garde les décimales pour les cents)
// Même logique que /abonnements, mais sans maximumFractionDigits: 0
// pour afficher les prix à la cent près (ex: 49,99 $).
// ---------------------------------------------------------------------------
function formatPrice(cents: number): string {
  return (cents / 100).toLocaleString("fr-CA", {
    style: "currency",
    currency: "CAD",
  });
}

// ---------------------------------------------------------------------------
// Icône placeholder par catégorie de produit
// ---------------------------------------------------------------------------
// Remplacé par de vraies photos quand le client fournit les images.
// La fonction retourne un emoji selon l'enum `category` de Prisma.
function categoryIcon(category: string): string {
  switch (category) {
    case "APPAREL":     return "👕"; // vêtements (t-shirt, rashguard...)
    case "GEAR":        return "🥋"; // équipement (gi, ceinture...)
    case "ACCESSORIES": return "🎒"; // accessoires (sac, protège-dents...)
    default:            return "📦"; // fallback générique
  }
}

// ---------------------------------------------------------------------------
// Composant de page (Server Component async)
// ---------------------------------------------------------------------------
export default async function ShopPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  // getTranslations : charge les clés du namespace "Shop" depuis messages/fr.json
  // ou messages/en.json selon la locale active.
  const t = await getTranslations({ locale, namespace: "Shop" });

  // ── Chargement des produits depuis la BD ──────────────────────────────────
  // On filtre : active: true (pas les produits archivés/retirés).
  // Tri : par catégorie alphabétique d'abord, puis par nom dans chaque catégorie.
  // try/catch : si Postgres n'est pas démarré (docker down), on affiche le
  // message de fallback au lieu de crasher toute la page.
  let products: Awaited<ReturnType<typeof prisma.product.findMany>> = [];
  try {
    products = await prisma.product.findMany({
      where: { active: true },
      orderBy: [{ category: "asc" }, { nameFr: "asc" }],
    });
  } catch {
    // BD non disponible → tableau vide → message de fallback affiché plus bas.
    products = [];
  }

  // ── Rendu JSX ─────────────────────────────────────────────────────────────
  return (
    <section className="section">
      <div className="container-citadelle">

        {/*
          Banner de confirmation/annulation Stripe — même pattern que /abonnements.
          Stripe redirige vers /fr/boutique?success=1 ou ?canceled=1 après paiement.
          <Suspense> requis car PaymentBanner utilise useSearchParams() (Client hook).
          Voir composant PaymentBanner.tsx pour la documentation complète du flux.
        */}
        <Suspense fallback={null}>
          <PaymentBanner locale={locale} />
        </Suspense>

        {/* En-tête de section */}
        <header style={{ textAlign: "center", marginBottom: "3rem" }}>
          <h1 style={{ fontSize: "2.5rem", marginBottom: "0.5rem" }}>{t("title")}</h1>
          <p style={{ color: "var(--color-citadelle-text-muted)" }}>{t("subtitle")}</p>
          {/* Note "ramassage en dojo" — la boutique ne fait pas encore de livraison */}
          <p style={{ marginTop: "0.75rem", fontSize: "0.875rem", color: "var(--color-citadelle-gold)" }}>
            {t("pickup")}
          </p>
        </header>

        {/* ── État vide : BD non initialisée ou aucun produit actif ─────── */}
        {products.length === 0 ? (
          <div className="card" style={{ textAlign: "center", padding: "3rem" }}>
            <p style={{ color: "var(--color-citadelle-text-muted)" }}>
              {locale === "fr"
                ? "Aucun produit disponible pour le moment."
                : "No products available at the moment."}
            </p>
          </div>
        ) : (
          /* ── Grille de produits ─────────────────────────────────────────
             auto-fit + minmax(240px, 1fr) : la grille s'adapte automatiquement
             au nombre de colonnes selon la largeur de l'écran.
             → large écran : 3-4 colonnes
             → tablette    : 2 colonnes
             → mobile      : 1 colonne
             C'est du CSS Grid responsive sans breakpoints manuels. */
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
              gap: "1.5rem",
            }}
          >
            {products.map((product) => {
              // inStock : true si au moins 1 unité en inventaire.
              // Contrôle l'état disabled du bouton de commande.
              const inStock = product.stockQuantity > 0;

              return (
                <article
                  key={product.id}
                  className="card"
                  style={{ display: "flex", flexDirection: "column" }}
                >
                  {/* ── Image du produit ──────────────────────────────────
                      TODO (quand le client fournit les photos) :
                      Remplacer ce bloc <div> placeholder par :
                        <img
                          src={product.imageUrl ?? "/images/product-placeholder.webp"}
                          alt={locale === "fr" ? product.nameFr : product.nameEn}
                          style={{ width: "100%", aspectRatio: "1", objectFit: "cover",
                                   borderRadius: "var(--radius-md)", marginBottom: "1rem" }}
                        />
                      Ne pas oublier d'ajouter imageUrl dans prisma seed quand les
                      photos sont disponibles. */}
                  <div
                    aria-hidden // décoratif → ignoré par les lecteurs d'écran
                    style={{
                      width: "100%",
                      aspectRatio: "1",
                      background: "linear-gradient(135deg, var(--color-citadelle-surface-2), var(--color-citadelle-bg))",
                      borderRadius: "var(--radius-md)",
                      marginBottom: "1rem",
                      display: "grid",
                      placeItems: "center",
                      fontSize: "2rem",
                      color: "var(--color-citadelle-gold)",
                    }}
                  >
                    {categoryIcon(product.category)}
                  </div>

                  {/* Nom du produit — bilingue via champs séparés en BD */}
                  <h2 style={{ fontSize: "1.05rem", marginBottom: "0.25rem" }}>
                    {locale === "fr" ? product.nameFr : product.nameEn}
                  </h2>

                  {/* Description — flex: 1 pour pousser le prix+bouton vers le bas,
                      garantissant que toutes les cards ont la même hauteur. */}
                  <p style={{
                    fontSize: "0.875rem",
                    color: "var(--color-citadelle-text-muted)",
                    marginBottom: "1rem",
                    flex: 1,
                  }}>
                    {locale === "fr" ? product.descriptionFr : product.descriptionEn}
                  </p>

                  {/* Prix + badge "rupture de stock" */}
                  <div style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "0.75rem",
                  }}>
                    <span style={{
                      fontSize: "1.25rem",
                      fontWeight: 700,
                      color: "var(--color-citadelle-gold)",
                    }}>
                      {formatPrice(product.priceCents)}
                    </span>

                    {/* Badge visible uniquement si rupture de stock */}
                    {!inStock && (
                      <span style={{
                        fontSize: "0.75rem",
                        color: "var(--color-citadelle-danger)",
                        textTransform: "uppercase",
                      }}>
                        {t("outOfStock")}
                      </span>
                    )}
                  </div>

                  {/* ── Bouton de commande ────────────────────────────────
                      CheckoutButton gère :
                        1. POST /api/checkout avec productId
                        2. Récupère { url } de la session Stripe
                        3. window.location.href = url → page paiement Stripe
                      disabled si hors stock (le prop n'existe pas sur
                      CheckoutButton, on utilise un wrapper conditionnel). */}
                  {inStock ? (
                    <CheckoutButton
                      productId={product.id}
                      locale={locale}
                      label={t("addToCart")}
                    />
                  ) : (
                    /* Bouton désactivé visuellement quand hors stock.
                       On n'instancie pas CheckoutButton pour éviter d'envoyer
                       une requête Stripe pour un produit indisponible. */
                    <button
                      type="button"
                      disabled
                      className="btn-primary"
                      style={{ width: "100%", opacity: 0.4, cursor: "not-allowed" }}
                    >
                      {t("outOfStock")}
                    </button>
                  )}
                </article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
