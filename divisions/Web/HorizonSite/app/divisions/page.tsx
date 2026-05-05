import Image from "next/image";

export default function DivisionsPage() {
  const divisions = [
    {
      nom: "Développement Web",
      mark: "/mark-web.svg",
      couleur: "text-h91-warp",
      description:
        "Sites web modernes, boutiques en ligne, systèmes de réservation et solutions numériques sur mesure pour entrepreneurs locaux et PME. Conception graphique, identité visuelle et stratégie de contenu incluses.",
      services: ["Sites vitrines & e-commerce", "SEO & référencement local", "Identité visuelle & infographie", "Maintenance & rétention mensuelle"],
      cta: { label: "Voir nos réalisations →", href: "/portfolio", externe: false },
    },
    {
      nom: "Cybersécurité",
      mark: "/mark-cyber.svg",
      couleur: "text-h91-accretion",
      description:
        "Analyse de vulnérabilités, sécurisation d'infrastructures, formation et sensibilisation aux bonnes pratiques de sécurité informatique pour les entreprises.",
      services: ["Audit de sécurité", "Protection des données", "Formation équipes", "Conformité & bonnes pratiques"],
      cta: { label: "Accéder au département →", href: "/contacts", externe: false },
    },
    {
      nom: "Studio Jeux — Nordik Legion",
      mark: "/mark-nordik.svg",
      couleur: "text-h91-ion",
      description:
        "Développement de jeux vidéo indépendants, expériences interactives et univers narratifs immersifs. Projet phare : Cyber-Mythos Labyrinthe.",
      services: ["Jeux indépendants", "Expériences interactives", "Design narratif", "Univers & lore"],
      cta: { label: "Visiter le studio →", href: "https://nordiklegion.ca", externe: true },
    },
  ];

  return (
    <main className="max-w-5xl mx-auto px-6 py-20">
      <h1 className="text-5xl font-bold text-h91-stellar text-center mb-4">
        Nos Divisions
      </h1>
      <p className="text-center text-h91-stellar/60 mb-14 text-lg">
        Trois pôles d'expertise. Une seule vision.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {divisions.map((div) => (
          <div
            key={div.nom}
            className="p-6 border border-h91-accretion/20 rounded-xl bg-h91-gravity/50 flex flex-col gap-4 hover:border-h91-accretion/50 transition"
          >
            {/* Division mark */}
            <Image
              src={div.mark}
              alt={`Mark ${div.nom}`}
              width={48}
              height={48}
              style={{ width: "48px", height: "48px" }}
            />

            <h2 className={`text-2xl font-bold ${div.couleur}`}>{div.nom}</h2>
            <p className="text-h91-stellar/80 text-sm leading-relaxed flex-1">{div.description}</p>

            <ul className="mt-2 flex flex-col gap-1">
              {div.services.map((s) => (
                <li key={s} className="text-h91-stellar/60 text-xs flex items-center gap-2">
                  <span className="text-h91-ion">▸</span> {s}
                </li>
              ))}
            </ul>

            {/* CTA propre à la division */}
            <a
              href={div.cta.href}
              target={div.cta.externe ? "_blank" : undefined}
              rel={div.cta.externe ? "noopener noreferrer" : undefined}
              className="mt-2 inline-block px-5 py-2 bg-h91-accretion text-h91-gravity font-semibold rounded-lg text-sm hover:bg-h91-fusion transition text-center"
            >
              {div.cta.label}
            </a>
          </div>
        ))}
      </div>
    </main>
  );
}
