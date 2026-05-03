// =============================================================================
// /portfolio — Réalisations Horizon 91
// Filtre par catégorie côté client (Client Component)
// =============================================================================
"use client";

import { useState } from "react";

type Categorie = "Tous" | "Services" | "Artisanat" | "Construction" | "Alimentation" | "Immobilier";

interface Projet {
  nom: string;
  client: string;
  categorie: Exclude<Categorie, "Tous">;
  description: string;
  resultats: string[];
  statut: "Livré" | "En cours" | "À venir";
  couleur: string;
}

const projets: Projet[] = [
  {
    nom: "Citadelle Jiu-Jitsu",
    client: "Dojo Citadelle, Québec",
    categorie: "Services",
    description:
      "Site complet pour un dojo de jiu-jitsu brésilien : abonnements en ligne, paiement Stripe, espace admin, bilingue FR/EN, séance d'essai gratuite.",
    resultats: ["Paiement en ligne intégré", "Admin complet", "Bilingue FR/EN", "SEO local"],
    statut: "En cours",
    couleur: "border-h91-ion",
  },
  {
    nom: "Atelier91",
    client: "Artisan local, Scott, Beauce",
    categorie: "Artisanat",
    description:
      "Boutique en ligne pour savons artisanaux, chandelles, céramique et surfaces en béton. Galerie produits, panier d'achat, commandes locales.",
    resultats: ["Boutique e-commerce", "Galerie visuelle", "Commandes locales"],
    statut: "À venir",
    couleur: "border-h91-fusion",
  },
  {
    nom: "Salon Mélanie Roy",
    client: "Salon de coiffure & barbier, Beauce",
    categorie: "Services",
    description:
      "Site premium pour salon de coiffure et barbier. Réservation en ligne, boutique de produits naturels, SEO local pour sortir du lot face aux concurrents.",
    resultats: ["Réservation en ligne", "Boutique produits", "SEO local"],
    statut: "À venir",
    couleur: "border-h91-relativistic",
  },
  {
    nom: "Construction Bois Rond",
    client: "Entrepreneur, St-Patrice-de-Beaurivage",
    categorie: "Construction",
    description:
      "Portfolio de réalisations et génération de leads pour un constructeur de maisons en bois rond. Galerie projets, formulaire de soumission, SEO régional.",
    resultats: ["Portfolio réalisations", "Génération de leads", "SEO Chaudière-Appalaches"],
    statut: "À venir",
    couleur: "border-h91-accretion",
  },
  {
    nom: "Eliza Doyon — Courtière REMAX",
    client: "Courtière immobilière, Beauce",
    categorie: "Immobilier",
    description:
      "Site personnel pour courtière immobilière indépendante. Listings, témoignages clients, identité de marque forte au-delà de la bannière REMAX.",
    resultats: ["Site personnel", "Listings intégrés", "Marque personnelle"],
    statut: "À venir",
    couleur: "border-h91-warp",
  },
];

const categories: Categorie[] = ["Tous", "Services", "Artisanat", "Construction", "Alimentation", "Immobilier"];

export default function PortfolioPage() {
  const [actif, setActif] = useState<Categorie>("Tous");

  const filtres = actif === "Tous"
    ? projets
    : projets.filter((p) => p.categorie === actif);

  return (
    <main className="max-w-6xl mx-auto px-6 py-20">
      <h1 className="text-5xl font-bold text-h91-relativistic text-center mb-4">
        Portfolio
      </h1>
      <p className="text-center text-h91-stellar/60 mb-10 text-lg">
        Des solutions concrètes pour des gens passionnés.
      </p>

      {/* Filtres catégories */}
      <div className="flex flex-wrap justify-center gap-3 mb-12">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActif(cat)}
            className={`px-5 py-2 rounded-full text-sm font-semibold transition border ${
              actif === cat
                ? "bg-h91-relativistic text-h91-gravity border-h91-relativistic"
                : "bg-transparent text-h91-stellar/70 border-h91-relativistic/30 hover:border-h91-relativistic/70"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grille projets */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filtres.map((projet) => (
          <article
            key={projet.nom}
            className={`p-6 border-2 ${projet.couleur} rounded-xl bg-h91-gravity/50 flex flex-col gap-3 hover:bg-h91-gravity/80 transition`}
          >
            {/* Badge statut */}
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-h91-stellar/50 uppercase tracking-widest">
                {projet.categorie}
              </span>
              <span
                className={`text-xs font-bold px-2 py-1 rounded-full ${
                  projet.statut === "Livré"
                    ? "bg-h91-ion/20 text-h91-ion"
                    : projet.statut === "En cours"
                    ? "bg-h91-fusion/20 text-h91-fusion"
                    : "bg-h91-warp/20 text-h91-stellar/50"
                }`}
              >
                {projet.statut}
              </span>
            </div>

            <h2 className="text-xl font-bold text-h91-stellar">{projet.nom}</h2>
            <p className="text-h91-stellar/50 text-xs">{projet.client}</p>
            <p className="text-h91-stellar/80 text-sm leading-relaxed flex-1">
              {projet.description}
            </p>

            {/* Résultats clés */}
            <ul className="flex flex-col gap-1 mt-2">
              {projet.resultats.map((r) => (
                <li key={r} className="text-h91-stellar/60 text-xs flex items-center gap-2">
                  <span className="text-h91-ion">✓</span> {r}
                </li>
              ))}
            </ul>
          </article>
        ))}

        {filtres.length === 0 && (
          <p className="col-span-full text-center text-h91-stellar/40 py-16">
            Aucun projet dans cette catégorie pour l'instant.
          </p>
        )}
      </div>
    </main>
  );
}
