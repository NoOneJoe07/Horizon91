export default function ProjetsPage() {
  return (
    <main className="py-40 px-6 max-w-6xl mx-auto text-center">

      {/* TITRE PRINCIPAL */}
      <h1 className="text-5xl md:text-6xl font-bold text-nordik-glacier mb-10">
        Nos projets
      </h1>

      {/* INTRO */}
      <p className="text-lg md:text-xl text-nordik-snow/80 leading-relaxed mb-20 max-w-3xl mx-auto">
        Découvrez nos jeux en développement, nos titres déjà publiés et les contenus additionnels à venir.
        Chaque projet est conçu avec passion, discipline et une identité visuelle inspirée du Nord.
      </p>

      {/* SECTION : EN DÉVELOPPEMENT */}
      <section className="mb-32">
        <h2 className="text-4xl font-bold text-nordik-glacier mb-10">
          En développement
        </h2>

        <div className="grid md:grid-cols-3 gap-10">
          {/* Carte projet */}
          <div className="bg-nordik-night/40 backdrop-blur-md p-6 rounded-xl border border-nordik-glacier/20 hover:border-nordik-glacier transition">
            <h3 className="text-2xl font-bold text-nordik-glacier mb-3">
              Projet 1
            </h3>
            <p className="text-nordik-snow/70 text-sm leading-relaxed">
              Description du jeu en développement. Univers, gameplay, ambiance, inspirations…
            </p>
          </div>

          <div className="bg-nordik-night/40 backdrop-blur-md p-6 rounded-xl border border-nordik-glacier/20 hover:border-nordik-glacier transition">
            <h3 className="text-2xl font-bold text-nordik-glacier mb-3">
              Projet 2
            </h3>
            <p className="text-nordik-snow/70 text-sm leading-relaxed">
              Description du jeu en développement. Univers, gameplay, ambiance, inspirations…
            </p>
          </div>

          <div className="bg-nordik-night/40 backdrop-blur-md p-6 rounded-xl border border-nordik-glacier/20 hover:border-nordik-glacier transition">
            <h3 className="text-2xl font-bold text-nordik-glacier mb-3">
              Projet 3
            </h3>
            <p className="text-nordik-snow/70 text-sm leading-relaxed">
              Description du jeu en développement. Univers, gameplay, ambiance, inspirations…
            </p>
          </div>
        </div>
      </section>

      {/* SECTION : JEUX PUBLIÉS */}
      <section className="mb-32">
        <h2 className="text-4xl font-bold text-nordik-glacier mb-10">
          Jeux publiés
        </h2>

        <p className="text-nordik-snow/60 mb-10">
          Aucun jeu publié pour le moment — mais ça s’en vient.
        </p>
      </section>

      {/* SECTION : DLC / À VENIR */}
      <section className="mb-32">
        <h2 className="text-4xl font-bold text-nordik-glacier mb-10">
          DLC & contenus à venir
        </h2>

        <p className="text-nordik-snow/60 mb-10">
          Les contenus additionnels seront annoncés prochainement.
        </p>
      </section>

      {/* CTA */}
      <a
        href="/contact"
        className="inline-block mt-10 bg-nordik-glacier text-nordik-night font-bold px-8 py-4 rounded-lg text-xl hover:bg-white transition"
      >
        Nous contacter
      </a>

    </main>
  );
}
