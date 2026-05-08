"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

type CategorieKey =
  | "Tous"
  | "Services"
  | "Artisanat"
  | "Construction"
  | "Alimentation"
  | "Immobilier"
  | "Cybersécurité";

interface Projet {
  nom: string;
  client: string;
  categorie: Exclude<CategorieKey, "Tous">;
  description: string;
  resultats: string[];
  statut: "Livré" | "En cours" | "À venir";
  couleur: string;
}

const categorieKeys: CategorieKey[] = [
  "Tous",
  "Services",
  "Artisanat",
  "Construction",
  "Alimentation",
  "Immobilier",
  "Cybersécurité",
];

export default function PortfolioPage() {
  const t = useTranslations("portfolio");
  const [actif, setActif] = useState<CategorieKey>("Tous");

  const projets = t.raw("projets") as Projet[];
  const categories = t.raw("categories") as Record<CategorieKey, string>;
  const statuts = t.raw("statuts") as Record<string, string>;

  const filtres =
    actif === "Tous"
      ? projets
      : projets.filter((p) => p.categorie === actif);

  return (
    <main className="max-w-6xl mx-auto px-6 py-20">
      <h1 className="text-5xl font-bold text-h91-stellar text-center mb-4">
        {t("title")}
      </h1>
      <p className="text-center text-h91-stellar/60 mb-10 text-lg">
        {t("subtitle")}
      </p>

      {/* Filtres catégories */}
      <div className="flex flex-wrap justify-center gap-3 mb-12">
        {categorieKeys.map((cat) => (
          <button
            key={cat}
            onClick={() => setActif(cat)}
            className={`px-5 py-2 rounded-full text-sm font-semibold transition border ${
              actif === cat
                ? "bg-h91-accretion text-h91-gravity border-h91-accretion"
                : "bg-transparent text-h91-stellar/70 border-h91-accretion/30 hover:border-h91-accretion/70"
            }`}
          >
            {categories[cat]}
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
                {statuts[projet.statut]}
              </span>
            </div>

            <h2 className="text-xl font-bold text-h91-stellar">{projet.nom}</h2>
            <p className="text-h91-stellar/50 text-xs">{projet.client}</p>
            <p className="text-h91-stellar/80 text-sm leading-relaxed flex-1">
              {projet.description}
            </p>

            <ul className="flex flex-col gap-1 mt-2">
              {projet.resultats.map((r) => (
                <li
                  key={r}
                  className="text-h91-stellar/60 text-xs flex items-center gap-2"
                >
                  <span className="text-h91-ion">✓</span> {r}
                </li>
              ))}
            </ul>
          </article>
        ))}

        {filtres.length === 0 && (
          <p className="col-span-full text-center text-h91-stellar/40 py-16">
            {t("empty")}
          </p>
        )}
      </div>
    </main>
  );
}
