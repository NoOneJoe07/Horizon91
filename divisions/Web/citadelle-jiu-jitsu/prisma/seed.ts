// =============================================================================
// Seed initial — Citadelle Jiu-Jitsu
// -----------------------------------------------------------------------------
// Crée :
//   - 1 compte ADMIN (depuis SEED_ADMIN_EMAIL / SEED_ADMIN_PASSWORD)
//   - 4 plans d'abonnement fictifs réalistes
//   - 6 produits boutique fictifs
// Lancer : npm run prisma:seed
// =============================================================================

import { PrismaClient, Role, BillingInterval, ProductCategory } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("[seed] début…");

  // ---------------------------------------------------------------------------
  // 1. Compte admin
  // ---------------------------------------------------------------------------
  const adminEmail = process.env.SEED_ADMIN_EMAIL;
  const adminPassword = process.env.SEED_ADMIN_PASSWORD;

  if (!adminEmail || !adminPassword) {
    throw new Error(
      "[seed] SEED_ADMIN_EMAIL et SEED_ADMIN_PASSWORD requis dans .env",
    );
  }

  const passwordHash = await bcrypt.hash(adminPassword, 12);

  await prisma.user.upsert({
    where: { email: adminEmail },
    update: {},
    create: {
      email: adminEmail,
      firstName: "Admin",
      lastName: "Citadelle",
      passwordHash,
      role: Role.ADMIN,
    },
  });

  console.log(`[seed] admin créé: ${adminEmail}`);

  // ---------------------------------------------------------------------------
  // 2. Plans d'abonnement
  // ---------------------------------------------------------------------------
  const plans = [
    {
      slug: "adulte-mensuel",
      nameFr: "Adulte — Mensuel",
      nameEn: "Adult — Monthly",
      descriptionFr: "Accès illimité à tous les cours adultes.",
      descriptionEn: "Unlimited access to all adult classes.",
      priceCents: 12000,
      interval: BillingInterval.MONTH,
      featuresFr: [
        "Accès illimité aux cours adultes",
        "Accès au tatami libre",
        "Premier kimono à prix réduit",
      ],
      featuresEn: [
        "Unlimited adult classes",
        "Open mat access",
        "Discount on first gi",
      ],
      sortOrder: 1,
    },
    {
      slug: "adulte-annuel",
      nameFr: "Adulte — Annuel",
      nameEn: "Adult — Annual",
      descriptionFr: "Tout l'accès adulte avec 2 mois offerts.",
      descriptionEn: "Full adult access — 2 months free.",
      priceCents: 120000,
      interval: BillingInterval.YEAR,
      featuresFr: [
        "Tous les avantages du forfait mensuel",
        "Économie de 240$ par année",
        "Kimono Citadelle inclus",
      ],
      featuresEn: [
        "All monthly plan benefits",
        "Save $240 per year",
        "Citadelle gi included",
      ],
      popular: true,
      sortOrder: 2,
    },
    {
      slug: "enfant-mensuel",
      nameFr: "Enfant (6-12 ans)",
      nameEn: "Kids (6-12)",
      descriptionFr: "Cours dédiés aux jeunes guerriers.",
      descriptionEn: "Classes dedicated to young warriors.",
      priceCents: 8000,
      interval: BillingInterval.MONTH,
      featuresFr: [
        "Accès aux cours enfants",
        "Suivi pédagogique personnalisé",
        "Système de ceintures jeunesse",
      ],
      featuresEn: [
        "Access to kids classes",
        "Personalized progression tracking",
        "Youth belt system",
      ],
      sortOrder: 3,
    },
    {
      slug: "famille-mensuel",
      nameFr: "Famille (2 adultes + 2 enfants)",
      nameEn: "Family (2 adults + 2 kids)",
      descriptionFr: "Le forfait pour s'entraîner en famille.",
      descriptionEn: "Train as a family.",
      priceCents: 30000,
      interval: BillingInterval.MONTH,
      featuresFr: [
        "Accès illimité pour 4 personnes",
        "Économie vs forfaits individuels",
        "Sortie familiale annuelle",
      ],
      featuresEn: [
        "Unlimited access for 4 people",
        "Save vs individual plans",
        "Annual family outing",
      ],
      sortOrder: 4,
    },
  ];

  for (const plan of plans) {
    await prisma.subscriptionPlan.upsert({
      where: { slug: plan.slug },
      update: {},
      create: plan,
    });
  }
  console.log(`[seed] ${plans.length} plans créés`);

  // ---------------------------------------------------------------------------
  // 3. Produits boutique
  // ---------------------------------------------------------------------------
  const products = [
    {
      slug: "hoodie-citadelle-noir",
      nameFr: "Hoodie Citadelle — Noir",
      nameEn: "Citadelle Hoodie — Black",
      descriptionFr: "Coton lourd, broderie or sur la poitrine.",
      descriptionEn: "Heavyweight cotton, gold chest embroidery.",
      priceCents: 6500,
      category: ProductCategory.APPAREL,
      stockQuantity: 25,
    },
    {
      slug: "tshirt-citadelle-blanc",
      nameFr: "T-shirt Citadelle — Blanc",
      nameEn: "Citadelle T-shirt — White",
      descriptionFr: "Coton premium, logo discret.",
      descriptionEn: "Premium cotton, subtle logo.",
      priceCents: 3000,
      category: ProductCategory.APPAREL,
      stockQuantity: 40,
    },
    {
      slug: "gi-citadelle-blanc-a2",
      nameFr: "Gi Citadelle — Blanc A2",
      nameEn: "Citadelle Gi — White A2",
      descriptionFr: "Kimono officiel, coupe compétition, IBJJF approved.",
      descriptionEn: "Official kimono, competition cut, IBJJF approved.",
      priceCents: 18000,
      category: ProductCategory.GEAR,
      stockQuantity: 12,
    },
    {
      slug: "gi-citadelle-noir-a2",
      nameFr: "Gi Citadelle — Noir A2",
      nameEn: "Citadelle Gi — Black A2",
      descriptionFr: "Édition limitée, broderies dorées.",
      descriptionEn: "Limited edition, gold embroidery.",
      priceCents: 22000,
      category: ProductCategory.GEAR,
      stockQuantity: 6,
    },
    {
      slug: "ceinture-blanche",
      nameFr: "Ceinture blanche — Officielle",
      nameEn: "White belt — Official",
      descriptionFr: "Ceinture standard, coton 100%.",
      descriptionEn: "Standard belt, 100% cotton.",
      priceCents: 2000,
      category: ProductCategory.GEAR,
      stockQuantity: 30,
    },
    {
      slug: "sac-tatami",
      nameFr: "Sac Tatami Citadelle",
      nameEn: "Citadelle Tatami Bag",
      descriptionFr: "Sac de transport pour kimono et équipement.",
      descriptionEn: "Transport bag for gi and gear.",
      priceCents: 5500,
      category: ProductCategory.ACCESSORY,
      stockQuantity: 18,
    },
  ];

  for (const product of products) {
    await prisma.product.upsert({
      where: { slug: product.slug },
      update: {},
      create: product,
    });
  }
  console.log(`[seed] ${products.length} produits créés`);

  console.log("[seed] terminé ✓");
}

main()
  .catch((e) => {
    console.error("[seed] erreur:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
