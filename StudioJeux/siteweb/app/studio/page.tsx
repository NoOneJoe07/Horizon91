export default function StudioPage() {
  return (
    <main className="py-40 px-6 max-w-5xl mx-auto text-center">

      {/* TITRE PRINCIPAL */}
      <h1 className="text-5xl md:text-6xl font-bold text-nordik-glacier mb-10">
        Le studio
      </h1>

      {/* INTRO */}
      <p className="text-lg md:text-xl text-nordik-snow/80 leading-relaxed mb-20 max-w-3xl mx-auto">
        Nordik Legion Studio est un collectif créatif indépendant basé au Québec.
        Nous unissons développeurs, artistes, designers et créateurs autour d’une
        vision commune : bâtir des univers inspirés du Nord, où se rencontrent
        narration, esthétique et innovation technologique.
      </p>

      {/* SECTION : HISTORIQUE */}
      <section className="mb-32">
        <h2 className="text-4xl font-bold text-nordik-glacier mb-6">
          Notre histoire
        </h2>

        <p className="text-lg text-nordik-snow/80 leading-relaxed max-w-3xl mx-auto">
          Fondé avec la volonté de créer des expériences numériques uniques,
          Nordik Legion Studio s’inspire des paysages nordiques, de la mythologie
          et de la culture québécoise.  
          <br /><br />
          Le studio a grandi autour d’une idée simple : offrir des univers
          immersifs, authentiques et visuellement marquants, tout en respectant
          une discipline de travail rigoureuse et une identité artistique forte.
        </p>
      </section>

      {/* SECTION : ÉQUIPE */}
      <section className="mb-32">
        <h2 className="text-4xl font-bold text-nordik-glacier mb-10">
          Notre équipe
        </h2>

        <div className="grid md:grid-cols-3 gap-10">

          {/* Carte membre */}
          <div className="bg-nordik-night/40 backdrop-blur-md p-6 rounded-xl border border-nordik-glacier/20 hover:border-nordik-glacier transition">
            <h3 className="text-2xl font-bold text-nordik-glacier mb-2">
              Membre 1
            </h3>
            <p className="text-nordik-snow/70 text-sm mb-2">Rôle</p>
            <p className="text-nordik-snow/60 text-sm leading-relaxed">
              Brève description du membre, son expertise, son rôle dans le studio.
            </p>
          </div>

          <div className="bg-nordik-night/40 backdrop-blur-md p-6 rounded-xl border border-nordik-glacier/20 hover:border-nordik-glacier transition">
            <h3 className="text-2xl font-bold text-nordik-glacier mb-2">
              Membre 2
            </h3>
            <p className="text-nordik-snow/70 text-sm mb-2">Rôle</p>
            <p className="text-nordik-snow/60 text-sm leading-relaxed">
              Brève description du membre, son expertise, son rôle dans le studio.
            </p>
          </div>

          <div className="bg-nordik-night/40 backdrop-blur-md p-6 rounded-xl border border-nordik-glacier/20 hover:border-nordik-glacier transition">
            <h3 className="text-2xl font-bold text-nordik-glacier mb-2">
              Membre 3
            </h3>
            <p className="text-nordik-snow/70 text-sm mb-2">Rôle</p>
            <p className="text-nordik-snow/60 text-sm leading-relaxed">
              Brève description du membre, son expertise, son rôle dans le studio.
            </p>
          </div>

        </div>
      </section>

      {/* CTA */}
      <a
        href="/rejoindre"
        className="inline-block mt-10 bg-nordik-glacier text-nordik-night font-bold px-8 py-4 rounded-lg text-xl hover:bg-white transition"
      >
        Nous rejoindre
      </a>

    </main>
  );
}
