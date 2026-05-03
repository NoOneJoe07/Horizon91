export default function ContactsPage() {
  const contacts = [
    {
      titre: "Direction générale",
      couleur: "text-h91-ion",
      courriel: "direction@horizon91.com",
      note: "Partenariats, vision stratégique, collaborations.",
    },
    {
      titre: "Développement Web",
      couleur: "text-h91-ion",
      courriel: "web@horizon91.com",
      note: "Sites web, e-commerce, SEO, identité visuelle.",
    },
    {
      titre: "Cybersécurité",
      couleur: "text-h91-relativistic",
      courriel: "cyber@horizon91.com",
      note: "Audits, sécurisation, formation.",
    },
    {
      titre: "Studio Nordik Legion",
      couleur: "text-h91-fusion",
      courriel: "studio@horizon91.com",
      note: "Jeux vidéo, expériences interactives.",
    },
  ];

  return (
    <main className="max-w-4xl mx-auto px-6 py-20">
      <h1 className="text-5xl font-bold text-h91-relativistic text-center mb-4">
        Contacts
      </h1>
      <p className="text-center text-h91-stellar/60 mb-14 text-lg">
        Une équipe, plusieurs expertises. Parlez à la bonne personne.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {contacts.map((c) => (
          <div
            key={c.titre}
            className="p-6 border border-h91-relativistic/20 rounded-xl bg-h91-gravity/50 flex flex-col gap-2 hover:border-h91-relativistic/50 transition"
          >
            <h2 className={`text-xl font-bold ${c.couleur}`}>{c.titre}</h2>
            <p className="text-h91-stellar/50 text-sm">{c.note}</p>
            <a
              href={`mailto:${c.courriel}`}
              className="mt-2 text-h91-stellar/80 hover:text-h91-ion transition text-sm font-mono"
            >
              {c.courriel}
            </a>
          </div>
        ))}
      </div>

      <div className="mt-14 text-center">
        <a
          href="/rejoindre"
          className="inline-block px-8 py-4 bg-h91-relativistic text-h91-gravity font-bold rounded-lg text-lg hover:bg-h91-ion transition"
        >
          Nous joindre →
        </a>
      </div>
    </main>
  );
}
