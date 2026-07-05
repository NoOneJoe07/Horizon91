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
  url?: string;
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

export default function PortfolioClient() {
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
                ? "bg-h91-glacier text-h91-gravity border-h91-glacier"
                : "bg-transparent text-h91-stellar/70 border-h91-glacier/30 hover:border-h91-glacier/70"
            }`}
          >
            {categories[cat]}
          </button>
        ))}
      </div>

      {/* Grille projets */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filtres.map((projet) => {
          const isRedacted = projet.statut === "À venir";
          const isLinked = !isRedacted && !!projet.url;
          const card = (
          <article
            className={`relative p-6 border-2 ${projet.couleur} rounded-xl bg-h91-gravity/50 flex flex-col gap-3 transition overflow-hidden ${
              isRedacted ? "cursor-default" : isLinked ? "hover:bg-h91-gravity/80 hover:border-opacity-100 group" : "hover:bg-h91-gravity/80"
            }`}
          >
            {/* Badge catégorie + statut — toujours visible */}
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

            {/* Contenu flou pour les projets non confirmés */}
            <div className={isRedacted ? "blur-sm select-none pointer-events-none" : ""}>
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
            </div>

            {/* Lien vers le site livré */}
            {isLinked && (
              <span className="text-h91-ion text-xs font-semibold mt-auto pt-2 group-hover:underline">
                Voir le site →
              </span>
            )}

            {/* Overlay zone en formation */}
            {isRedacted && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-h91-gravity/60 rounded-xl gap-3">
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="opacity-80">
                  <circle cx="24" cy="24" r="22" stroke="#FF7A1A" strokeWidth="1.5" strokeDasharray="4 3"/>
                  <circle cx="24" cy="24" r="4" fill="#FF7A1A"/>
                  <ellipse cx="24" cy="24" rx="22" ry="8" stroke="#FF7A1A" strokeWidth="1" strokeDasharray="3 3" transform="rotate(-30 24 24)"/>
                  <ellipse cx="24" cy="24" rx="22" ry="8" stroke="#FFD65C" strokeWidth="1" strokeDasharray="3 3" transform="rotate(30 24 24)" opacity="0.6"/>
                </svg>
                <p className="text-h91-accretion text-xs font-bold uppercase tracking-widest text-center px-4">
                  Secteur en formation
                </p>
                <p className="text-h91-stellar/40 text-xs text-center px-6">
                  Négociation en cours
                </p>
              </div>
            )}
          </article>
          );
          return isLinked ? (
            <a key={projet.nom} href={projet.url} target="_blank" rel="noopener noreferrer" className="block">
              {card}
            </a>
          ) : (
            <div key={projet.nom}>{card}</div>
          );
        })}

        {filtres.length === 0 && (
          <p className="col-span-full text-center text-h91-stellar/40 py-16">
            {t("empty")}
          </p>
        )}
      </div>
    </main>
  );
}
