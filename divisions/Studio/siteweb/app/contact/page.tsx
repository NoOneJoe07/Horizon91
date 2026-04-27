export default function ContactPage() {
  return (
    <main className="py-40 px-6 max-w-5xl mx-auto text-center">

      {/* TITRE PRINCIPAL */}
      <h1 className="text-5xl md:text-6xl font-bold text-nordik-glacier mb-10">
        Contacts
      </h1>

      {/* INTRO */}
      <p className="text-lg md:text-xl text-nordik-snow/80 leading-relaxed mb-20 max-w-3xl mx-auto">
        Voici les coordonnées de nos différents départements.  
        Que ce soit pour une question, une collaboration ou une demande professionnelle,
        notre équipe est là pour vous répondre.
      </p>

      {/* SECTION : DÉPARTEMENTS */}
      <section className="mb-32">
        <h2 className="text-4xl font-bold text-nordik-glacier mb-10">
          Départements
        </h2>

        <div className="grid md:grid-cols-2 gap-10 text-left">

          <div className="bg-nordik-night/40 backdrop-blur-md p-6 rounded-xl border border-nordik-glacier/20">
            <h3 className="text-2xl font-bold text-nordik-glacier mb-2">Développement</h3>
            <p className="text-nordik-snow/70">dev@nordiklegion.com</p>
          </div>

          <div className="bg-nordik-night/40 backdrop-blur-md p-6 rounded-xl border border-nordik-glacier/20">
            <h3 className="text-2xl font-bold text-nordik-glacier mb-2">Direction artistique</h3>
            <p className="text-nordik-snow/70">art@nordiklegion.com</p>
          </div>

          <div className="bg-nordik-night/40 backdrop-blur-md p-6 rounded-xl border border-nordik-glacier/20">
            <h3 className="text-2xl font-bold text-nordik-glacier mb-2">Ressources humaines</h3>
            <p className="text-nordik-snow/70">rh@nordiklegion.com</p>
          </div>

          <div className="bg-nordik-night/40 backdrop-blur-md p-6 rounded-xl border border-nordik-glacier/20">
            <h3 className="text-2xl font-bold text-nordik-glacier mb-2">Support général</h3>
            <p className="text-nordik-snow/70">contact@nordiklegion.com</p>
          </div>

        </div>
      </section>

      {/* SECTION : ADRESSE & HORAIRES */}
      <section className="mb-32">
        <h2 className="text-4xl font-bold text-nordik-glacier mb-10">
          Adresse & horaires
        </h2>

        <div className="space-y-6 text-lg text-nordik-snow/80 leading-relaxed">
          <p><strong className="text-nordik-glacier">Adresse :</strong><br />
            Sainte-Marie, Chaudière-Appalaches, Québec
          </p>

          <p><strong className="text-nordik-glacier">Téléphone :</strong><br />
            418‑555‑1234
          </p>

          <p><strong className="text-nordik-glacier">Horaires :</strong><br />
            Lundi à vendredi — 9h à 17h  
          </p>
        </div>
      </section>

      {/* SECTION : PRESSE */}
      <section className="mb-32">
        <h2 className="text-4xl font-bold text-nordik-glacier mb-10">
          Médias & presse
        </h2>

        <p className="text-lg text-nordik-snow/80 leading-relaxed">
          Pour les demandes médiatiques, entrevues ou partenariats presse :  
          <br />
          <span className="text-nordik-glacier font-bold">presse@nordiklegion.com</span>
        </p>
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
