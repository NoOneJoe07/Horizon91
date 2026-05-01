// =============================================================================
// scripts/stripe-seed.ts
// Crée les produits/prix dans Stripe (mode test) et met à jour la BD
// Usage : npx tsx scripts/stripe-seed.ts
// =============================================================================

import Stripe from "stripe";
import { PrismaClient } from "@prisma/client";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-03-31.basil",
});

const prisma = new PrismaClient();

const plans = [
  {
    slug: "adulte-mensuel",
    nameFr: "Adulte — Mensuel",
    nameEn: "Adult — Monthly",
    priceCents: 12000,
    interval: "month" as const,
  },
  {
    slug: "adulte-annuel",
    nameFr: "Adulte — Annuel",
    nameEn: "Adult — Annual",
    priceCents: 120000,
    interval: "year" as const,
  },
  {
    slug: "enfant-mensuel",
    nameFr: "Enfant (6-12 ans)",
    nameEn: "Kids (6-12)",
    priceCents: 8000,
    interval: "month" as const,
  },
  {
    slug: "famille-mensuel",
    nameFr: "Famille (2 adultes + 2 enfants)",
    nameEn: "Family (2 adults + 2 kids)",
    priceCents: 30000,
    interval: "month" as const,
  },
];

async function main() {
  console.log("🚀 Création des produits Stripe et mise à jour BD...\n");

  for (const plan of plans) {
    // 1. Créer le produit dans Stripe
    const product = await stripe.products.create({
      name: plan.nameFr,
      metadata: { slug: plan.slug },
    });

    // 2. Créer le prix dans Stripe
    const price = await stripe.prices.create({
      product: product.id,
      unit_amount: plan.priceCents,
      currency: "cad",
      recurring: { interval: plan.interval },
    });

    // 3. Mettre à jour la BD
    await prisma.subscriptionPlan.update({
      where: { slug: plan.slug },
      data: {
        stripeProductId: product.id,
        stripePriceId: price.id,
      },
    });

    console.log(`✅ ${plan.nameFr}`);
    console.log(`   Product : ${product.id}`);
    console.log(`   Price   : ${price.id}\n`);
  }

  console.log("✅ Tous les plans sont configurés dans Stripe et la BD !");
}

main()
  .catch((e) => {
    console.error("❌ Erreur :", e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
