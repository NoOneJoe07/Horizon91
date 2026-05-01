// =============================================================================
// Client Stripe (côté serveur uniquement)
// -----------------------------------------------------------------------------
// JAMAIS importer ce fichier dans un composant client — il expose la clé
// secrète. Utiliser uniquement dans les API routes et Server Components.
// =============================================================================

import Stripe from "stripe";

function getStripeKey(): string {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) {
    throw new Error("STRIPE_SECRET_KEY manquante. Voir .env.example.");
  }
  return key;
}

// Instance unique réutilisée
let _stripe: Stripe | null = null;

export function getStripe(): Stripe {
  if (!_stripe) {
    _stripe = new Stripe(getStripeKey(), {
      // Toujours pinner la version d'API pour éviter les surprises
      // lors d'updates Stripe automatiques.
      apiVersion: "2025-03-31.basil" as Stripe.LatestApiVersion,
      typescript: true,
    });
  }
  return _stripe;
}
