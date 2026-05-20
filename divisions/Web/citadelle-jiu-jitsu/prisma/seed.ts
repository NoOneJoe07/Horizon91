// =============================================================================
// Seed initial — Citadelle Jiu-Jitsu
// -----------------------------------------------------------------------------
// Crée :
//   - 1 compte ADMIN (depuis SEED_ADMIN_EMAIL / SEED_ADMIN_PASSWORD)
//   - 4 plans réels : Mensuel + Carte 10 séances + Cours privé + Drop-in
//   - 4 produits boutique réels : Rash Guard, Cuissard, Hoodie, Crew Neck
//
// Lancer : npm run prisma:seed
// IMPORTANT : lancer `npx prisma migrate dev` d'abord si schéma modifié.
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
  // 2. Plans — tarifs réels confirmés par JS (mai 2026)
  // Tous les prix sont AVANT taxes (TPS/TVQ appliquées par Stripe Tax plus tard)
  // ---------------------------------------------------------------------------
  const plans = [
    {
      slug: "mensuel",
      nameFr: "Abonnement Mensuel",
      nameEn: "Monthly Membership",
      descriptionFr:
        "Accès illimité à tous les cours. Sans engagement après le premier mois.",
      descriptionEn:
        "Unlimited access to all classes. No commitment after the first month.",
      priceCents: 13500, // 135 $ + taxes
      interval: BillingInterval.MONTH,
      popular: true,
      featuresFr: [
        "Cours illimités — accès complet",
        "Tatami libre inclus",
        "Résiliation libre après le 1er mois",
      ],
      featuresEn: [
        "Unlimited classes — full access",
        "Open mat included",
        "Cancel anytime after month 1",
      ],
      sortOrder: 1,
    },
    {
      slug: "carte-10-seances",
      nameFr: "Carte 10 séances",
      nameEn: "10-Class Pack",
      descriptionFr:
        "Un bloc de 10 cours au choix — valide 3 mois. Idéal si ton horaire varie.",
      descriptionEn:
        "A block of 10 classes — valid 3 months. Ideal if your schedule varies.",
      priceCents: 15500, // 155 $ + taxes
      interval: BillingInterval.ONETIME,
      featuresFr: [
        "10 cours au choix",
        "Valide 3 mois à partir de l'achat",
        "Revient à 15,50 $ par séance",
      ],
      featuresEn: [
        "10 classes of your choice",
        "Valid 3 months from purchase",
        "Only $15.50 per class",
      ],
      sortOrder: 2,
    },
    {
      slug: "cours-prive",
      nameFr: "Cours privé",
      nameEn: "Private lesson",
      descriptionFr:
        "Séance individuelle 60 min avec Jean-Sébastien Dionne — travail ciblé sur tes objectifs.",
      descriptionEn:
        "60-min one-on-one session with Jean-Sébastien Dionne — focused on your goals.",
      priceCents: 7000, // 70 $ + taxes
      interval: BillingInterval.ONETIME,
      featuresFr: [
        "Séance 1-1 avec le fondateur",
        "60 minutes, technique sur mesure",
        "Compétition, défense ou progression générale",
      ],
      featuresEn: [
        "1-on-1 session with the founder",
        "60 minutes, personalized technique",
        "Competition, self-defense, or general progress",
      ],
      sortOrder: 3,
    },
    {
      slug: "drop-in",
      nameFr: "Drop-in (cours à l'unité)",
      nameEn: "Drop-in (single class)",
      descriptionFr:
        "Une seule visite, aucun abonnement requis. Parfait pour voyageurs ou première fois.",
      descriptionEn:
        "One visit, no membership needed. Perfect for travelers or a first try.",
      priceCents: 2500, // 25 $ + taxes
      interval: BillingInterval.ONETIME,
      featuresFr: [
        "Un cours au choix",
        "Sans engagement",
        "Bienvenue aux visiteurs & compétiteurs de passage",
      ],
      featuresEn: [
        "One class of your choice",
        "No commitment",
        "Visitors & traveling competitors welcome",
      ],
      sortOrder: 4,
    },
  ];

  // Désactiver les vieux plans fictifs qui ne correspondent plus
  const oldSlugs = ["adulte-mensuel", "adulte-annuel", "enfant-mensuel", "famille-mensuel"];
  await prisma.subscriptionPlan.updateMany({
    where: { slug: { in: oldSlugs } },
    data: { active: false },
  });

  for (const plan of plans) {
    await prisma.subscriptionPlan.upsert({
      where: { slug: plan.slug },
      update: plan,  // met à jour si déjà présent
      create: plan,
    });
  }
  console.log(`[seed] ${plans.length} plans créés`);

  // ---------------------------------------------------------------------------
  // 3. Produits boutique — liste réelle confirmée par JS (mai 2026)
  // Photo URLs à ajouter quand Kristina envoie les images (Resend email attendu)
  // Couleur Bleu en attente de confirmation — seulement Noir pour l'instant
  // ---------------------------------------------------------------------------
  const products = [
    {
      slug: "rash-guard-long-noir",
      nameFr: "Rash Guard manches longues — Noir",
      nameEn: "Long-sleeve Rash Guard — Black",
      descriptionFr: "Protection confort pour le no-gi. Logo Citadelle brodé.",
      descriptionEn: "Comfort protection for no-gi. Embroidered Citadelle logo.",
      priceCents: 6000, // 60 $ + taxes
      category: ProductCategory.APPAREL,
      stockQuantity: 20,
    },
    {
      slug: "training-short-noir",
      nameFr: "Training Short (cuissard) — Noir",
      nameEn: "Training Short — Black",
      descriptionFr: "Cuissard d'entraînement no-gi. Logo Citadelle brodé.",
      descriptionEn: "No-gi training short. Embroidered Citadelle logo.",
      priceCents: 6000, // 60 $ + taxes
      category: ProductCategory.APPAREL,
      stockQuantity: 20,
    },
    {
      slug: "hoodie-citadelle-noir",
      nameFr: "Hoodie Citadelle — Noir",
      nameEn: "Citadelle Hoodie — Black",
      descriptionFr: "Coton lourd, logo Citadelle brodé. Édition dojo.",
      descriptionEn: "Heavyweight cotton, embroidered Citadelle logo. Dojo edition.",
      priceCents: 6500, // 65 $ + taxes
      category: ProductCategory.APPAREL,
      stockQuantity: 20,
    },
    {
      slug: "crew-neck-citadelle-noir",
      nameFr: "Crew Neck Citadelle — Noir",
      nameEn: "Citadelle Crew Neck — Black",
      descriptionFr: "Sweater col rond, logo Citadelle brodé. Édition dojo.",
      descriptionEn: "Crewneck sweater, embroidered Citadelle logo. Dojo edition.",
      priceCents: 6500, // 65 $ + taxes
      category: ProductCategory.APPAREL,
      stockQuantity: 20,
    },
  ];

  // Désactiver les vieux produits fictifs
  const oldProductSlugs = [
    "tshirt-citadelle-blanc",
    "gi-citadelle-blanc-a2",
    "gi-citadelle-noir-a2",
    "ceinture-blanche",
    "sac-tatami",
  ];
  await prisma.product.updateMany({
    where: { slug: { in: oldProductSlugs } },
    data: { active: false },
  });

  for (const product of products) {
    await prisma.product.upsert({
      where: { slug: product.slug },
      update: product,
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
