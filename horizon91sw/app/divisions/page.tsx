export default function DivisionsPage() {
  return (
    <main className="max-w-5xl mx-auto px-6 py-20">
      <h1 className="text-5xl font-bold text-h91-relativistic text-center mb-12">
        Nos Divisions
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 text-h91-stellar/90">

        <div className="p-6 border border-h91-relativistic/20 rounded-lg bg-h91-gravity/40">
          <h2 className="text-2xl font-bold text-h91-ion mb-2">Studio Jeux</h2>
          <p>Développement de jeux vidéo indépendants, expériences interactives et univers narratifs.</p>
        </div>

        <div className="p-6 border border-h91-relativistic/20 rounded-lg bg-h91-gravity/40">
          <h2 className="text-2xl font-bold text-h91-ion mb-2">Développement Web</h2>
          <p>Sites web modernes, applications web, solutions numériques sur mesure.</p>
        </div>

        <div className="p-6 border border-h91-relativistic/20 rounded-lg bg-h91-gravity/40">
          <h2 className="text-2xl font-bold text-h91-ion mb-2">Librairie</h2>
          <p>Édition, création littéraire, univers narratifs et projets d’écriture.</p>
        </div>

        <div className="p-6 border border-h91-relativistic/20 rounded-lg bg-h91-gravity/40">
          <h2 className="text-2xl font-bold text-h91-ion mb-2">Atelier91</h2>
          <p>Artisanat, design, créations physiques et projets artistiques.</p>
        </div>

        <div className="p-6 border border-h91-relativistic/20 rounded-lg bg-h91-gravity/40">
          <h2 className="text-2xl font-bold text-h91-ion mb-2">Cybersécurité</h2>
          <p>Analyse, sécurité informatique, protection des infrastructures et formation.</p>
        </div>

      </div>
    </main>
  );
}
