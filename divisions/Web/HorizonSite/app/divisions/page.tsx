export default function DivisionsPage() {
  const divisions = [
    {
      nom: "Développement Web",
      couleur: "text-h91-ion",
      description:
        "Sites web modernes, boutiques en ligne, systèmes de réservation et solutions numériques sur mesure pour entrepreneurs locaux et PME. Inclut la conception graphique, l'identité visuelle et la création de contenu artisanal (Atelier91) ainsi que les projets d'édition numérique (Librairie).",
      services: ["Sites vitrines & e-commerce", "SEO & référencement local", "Identité visuelle & infographie", "Maintenance & rétention mensuelle"],
    },
    {
      nom: "Cybersécurité",
      couleur: "text-h91-relativistic",
      description:
        "Analyse de vulnérabilités, sécurisation d'infrastructures, formation et sensibilisation aux bonnes pratiques de sécurité informatique pour les entreprises.",
      services: ["Audit de sécurité", "Protection des données", "Formation équipes", "Conformité & bonnes pratiques"],
    },
    {
      nom: "Studio Jeux — Nordik Legion",
      couleur: "text-h91-fusion",
      description:
        "Développement de jeux vidéo indépendants, expériences interactives et univers narratifs immersifs. Projet phare : Cyber-Mythos Labyrinthe.",
      services: ["Jeux indépendants", "Expériences interactives", "Design narratif", "Univers & lore"],
    },
  ];

  return (
    <main className="max-w-5xl mx-auto px-6 py-20">
      <h1 className="text-5xl font-bold text-h91-relativistic text-center mb-4">
        Nos Divisions
      </h1>
      <p className="text-center text-h91-stellar/60 mb-14 text-lg">
        Trois pôles d'expertise. Une seule vision.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {divisions.map((div) => (
          <div
            key={div.nom}
            className="p-6 border border-h91-relativistic/20 rounded-xl bg-h91-gravity/50 flex flex-col gap-4 hover:border-h91-relativistic/50 transition"
          >
            <h2 className={`text-2xl font-bold ${div.couleur}`}>{div.nom}</h2>
            <p className="text-h91-stellar/80 text-sm leading-relaxed flex-1">{div.description}</p>
            <ul className="mt-2 flex flex-col gap-1">
              {div.services.map((s) => (
                <li key={s} className="text-h91-stellar/60 text-xs flex items-center gap-2">
                  <span className="text-h91-ion">▸</span> {s}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mt-16 text-center">
        <a
          href="/portfolio"
          className="inline-block px-8 py-4 bg-h91-relativistic text-h91-gravity font-bold rounded-lg text-lg hover:bg-h91-ion transition"
        >
          Voir nos réalisations →
        </a>
      </div>
    </main>
  );
}
