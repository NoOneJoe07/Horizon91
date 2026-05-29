// =============================================================================
// app/[locale]/boutique/page.tsx — Boutique temporairement désactivée
// -----------------------------------------------------------------------------
// STATUT : Temporairement désactivée. Redirige vers /abonnements.
// À réactiver en septembre 2026 avec Stripe production + photos produits.
//
// Pour réactiver :
//   1. Voir git history pour le code complet original
//   2. Remettre les imports CheckoutButton + PaymentBanner + Prisma
//   3. Retirer redirect() et restaurer le JSX complet
//   4. Remettre /boutique dans navLinks (Header.tsx) et Footer.tsx
//
// AUTEUR    : Horizon 91 — Jonathan Patoine + Claude (Anthropic)
// MODIFIÉ   : 2026-05-20 (désactivation temporaire)
// =============================================================================

import { redirect } from "next/navigation";
import type { Locale } from "@/lib/locales";

export default async function ShopPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const locale = ((await params).locale) as Locale;
  // Redirection temporaire vers /abonnements tant que la boutique n'est pas active
  redirect(`/${locale}/abonnements`);
}
