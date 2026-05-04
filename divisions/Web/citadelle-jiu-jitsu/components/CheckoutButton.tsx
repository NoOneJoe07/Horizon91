"use client";

// =============================================================================
// CheckoutButton.tsx — Composant Client
// -----------------------------------------------------------------------------
// RÔLE :
//   Bouton de paiement Stripe. Envoie une requête à /api/checkout, récupère
//   l'URL de la session Stripe en JSON, puis redirige le navigateur.
//
// POURQUOI CE PATTERN (JSON + window.location.href) ET PAS UN SIMPLE <form> ?
//   La première version utilisait <form action="/api/checkout" method="POST">.
//   Problème : Next.js renvoyait un NextResponse.redirect(303) dont l'URL
//   arrivait à null côté client de manière silencieuse → redirection vers
//   la page d'accueil sans message d'erreur. Très difficile à déboguer.
//
//   Solution retenue (validée le 1er mai 2026) :
//     1. fetch() POST vers /api/checkout
//     2. L'API retourne { url: "https://checkout.stripe.com/..." } en JSON
//     3. window.location.href = url → le navigateur suit l'URL Stripe
//   Ce pattern est plus fiable car on contrôle explicitement la redirection
//   côté client et on peut intercepter les erreurs proprement.
//
// UTILISÉ PAR :
//   - app/[locale]/abonnements/page.tsx  (prop planId)
//   - app/[locale]/boutique/page.tsx     (prop productId)
//
// AUTEUR    : Horizon 91 — Jonathan Patoine + Claude (Anthropic)
// CRÉÉ      : 2026-05-01  |  MODIFIÉ : 2026-05-04 (annotations)
// DÉPENDANCES : react (useState), /api/checkout
// =============================================================================

import { useState } from "react";

// ---------------------------------------------------------------------------
// Props du composant
// ---------------------------------------------------------------------------
interface CheckoutButtonProps {
  /** ID du plan d'abonnement (table SubscriptionPlan en BD).
   *  Utilisé quand l'achat est un abonnement récurrent. */
  planId?: string;

  /** ID du produit physique (table Product en BD).
   *  Utilisé quand l'achat est un article de la boutique. */
  productId?: string;

  /** Code de langue actif ("fr" | "en") — transmis à l'API pour que
   *  Stripe redirige vers la bonne URL de retour localisée. */
  locale: string;

  /** Texte affiché sur le bouton (ex: "Choisir ce plan", "Ajouter au panier"). */
  label: string;

  /** Classe CSS Tailwind/custom du bouton. Défaut : "btn-primary". */
  className?: string;
}

// ---------------------------------------------------------------------------
// Composant principal
// ---------------------------------------------------------------------------
export function CheckoutButton({
  planId,
  productId,
  locale,
  label,
  className = "btn-primary",
}: CheckoutButtonProps) {
  // État de chargement : true pendant la requête API, pour désactiver le bouton
  // et éviter les doubles soumissions ("double-click problem").
  const [loading, setLoading] = useState(false);

  // Message d'erreur à afficher sous le bouton si l'API échoue.
  // null = pas d'erreur en cours.
  const [error, setError] = useState<string | null>(null);

  // ---------------------------------------------------------------------------
  // Handler du clic — async car on attend la réponse de l'API
  // ---------------------------------------------------------------------------
  async function handleClick() {
    setLoading(true);
    setError(null);

    // FormData (et non JSON) car l'API /api/checkout lit via request.formData().
    // Note : les deux props sont optionnelles, on ajoute seulement celles
    // qui sont définies. L'API côté serveur décide quoi faire selon lequel
    // des deux champs est présent (planId → abonnement, productId → produit).
    const body = new FormData();
    if (planId)    body.append("planId",    planId);
    if (productId) body.append("productId", productId);
    body.append("locale", locale);

    try {
      const res  = await fetch("/api/checkout", { method: "POST", body });
      const data = await res.json();

      // Si la réponse HTTP n'est pas 2xx OU si l'URL est absente → erreur.
      // data.url absente = la session Stripe n'a pas pu être créée.
      if (!res.ok || !data.url) {
        setError(data.error ?? "Erreur lors de la création du paiement.");
        setLoading(false);
        return;
      }

      // Redirection vers la page de paiement Stripe hébergée chez eux.
      // window.location.href = navigation complète (quitte l'app Next.js).
      // On ne remet pas setLoading(false) ici car la page va changer de toute
      // façon — le bouton reste en état "chargement" jusqu'à la navigation.
      window.location.href = data.url;

    } catch {
      // Erreur réseau (pas de connexion, timeout, etc.)
      setError("Erreur réseau. Veuillez réessayer.");
      setLoading(false);
    }
  }

  // ---------------------------------------------------------------------------
  // Rendu JSX
  // ---------------------------------------------------------------------------
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
      <button
        type="button"
        onClick={handleClick}
        disabled={loading} // désactivé pendant la requête → empêche double-clic
        className={className}
        style={{
          width: "100%",
          opacity: loading ? 0.7 : 1,       // visuellement atténué en chargement
          cursor: loading ? "wait" : "pointer",
        }}
      >
        {/* Texte dynamique : "Redirection…" pendant le chargement */}
        {loading ? "Redirection…" : label}
      </button>

      {/* Message d'erreur — visible seulement si error !== null */}
      {error && (
        <p style={{
          fontSize: "0.8rem",
          color: "var(--color-citadelle-danger)",
          textAlign: "center",
        }}>
          {error}
        </p>
      )}
    </div>
  );
}
