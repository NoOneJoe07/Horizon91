export default function RejoindrePage() {
  return (
    <main className="py-40 px-6 max-w-4xl mx-auto text-center">

      {/* TITRE PRINCIPAL */}
      <h1 className="text-5xl md:text-6xl font-bold text-nordik-glacier mb-10">
        Nous rejoindre
      </h1>

      {/* INTRO */}
      <p className="text-lg md:text-xl text-nordik-snow/80 leading-relaxed mb-16">
        Vous souhaitez rejoindre l’aventure Nordik Legion Studio ?  
        Que vous soyez développeur, artiste, designer ou passionné de création,
        nous serons heureux d’échanger avec vous.
      </p>

      {/* POURQUOI NOUS REJOINDRE */}
      <section className="mb-24">
        <h2 className="text-3xl md:text-4xl font-bold text-nordik-glacier mb-6">
          Pourquoi nous rejoindre ?
        </h2>
        <p className="text-lg text-nordik-snow/80 leading-relaxed">
          Nordik Legion Studio se construit autour de la passion, de la discipline
          et d’une identité forte inspirée du Nord.  
          Nous cherchons des personnes curieuses, engagées et prêtes à bâtir des
          univers uniques avec nous.
        </p>
      </section>

      {/* COORDONNÉES RECRUTEMENT (FACTICES POUR L’INSTANT) */}
      <section className="mb-24">
        <h2 className="text-3xl md:text-4xl font-bold text-nordik-glacier mb-6">
          Coordonnées recrutement
        </h2>

        <div className="space-y-6 text-lg text-nordik-snow/80 leading-relaxed">
          <p>
            <strong className="text-nordik-glacier">Courriel :</strong><br />
            nordiklegion.recrutement@gmail.com
          </p>

          <p>
            <strong className="text-nordik-glacier">Téléphone :</strong><br />
            555-666-7777
          </p>

          <p>
            <strong className="text-nordik-glacier">X (anciennement Twitter) :</strong><br />
            @NordikLegionStudio
          </p>
        </div>
      </section>

      {/* MESSAGE FINAL */}
      <section>
        <p className="text-lg text-nordik-snow/80 leading-relaxed">
          Envoyez-nous une courte présentation, votre profil et, si possible,
          quelques exemples de vos réalisations.  
          Nous prendrons le temps d’étudier chaque candidature avec attention.
        </p>
      </section>

    </main>
  );
}
