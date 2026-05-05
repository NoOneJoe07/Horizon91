import Image from "next/image";

const equipe = [
  {
    nom: "Jonathan Patoine",
    titre: "Fondateur & Directeur général",
    bio: "Policier. Entrepreneur. Étudiant. Gamer. Père. Jonathan combine une carrière atypique en protection publique et en entrepreneuriat avec une passion intacte pour les jeux vidéo et la création numérique. Étudiant en cybersécurité au Collège Cumberland, il dirige la vision stratégique du groupe et pilote le développement du Studio Nordik Legion.",
    initiales: "JP",
    couleurBordure: "border-h91-accretion",
    couleurInitiales: "text-h91-accretion",
    badge: null,
  },
  {
    nom: "Alexandra Marcela Espin Espinoza",
    titre: "Directrice générale — Communications",
    bio: "Portrait et biographie à venir.",
    initiales: "AE",
    couleurBordure: "border-h91-fusion",
    couleurInitiales: "text-h91-fusion",
    badge: null,
  },
  {
    nom: "Paulina Jaramillo",
    titre: "Directrice — Marketing & Photographie",
    bio: "Portrait et biographie à venir.",
    initiales: "PJ",
    couleurBordure: "border-h91-warp",
    couleurInitiales: "text-h91-warp",
    badge: null,
  },
  {
    nom: "Gabriel Patoine",
    titre: "CISO — Division Cybersécurité",
    bio: "Gabriel rejoindra officiellement Groupe Supernova à titre de responsable de la sécurité des systèmes d'information. Sa formation spécialisée et son réseau dans le domaine de la cybersécurité seront des atouts majeurs pour la protection des infrastructures de nos clients.",
    initiales: "GP",
    couleurBordure: "border-h91-ion",
    couleurInitiales: "text-h91-ion",
    badge: "Bientôt",
  },
];

export default function Home() {
  return (
    <>
      {/* ================================================================
          HERO
      ================================================================ */}
      <main
        id="hero"
        className="flex flex-col items-center justify-center min-h-screen text-center px-6 pt-0"
      >
        <h1 className="text-6xl md:text-8xl font-bold h91-title-gradient-animated mb-6">
          Groupe Supernova
        </h1>

        {/* LOGO + ORBITAL EFFECT */}
        <div className="relative flex items-center justify-center mb-6">
          <div className="blue-halo"></div>
          <div className="orbital-core"></div>
          <Image
            src="/LogoGroupeSupernova.svg"
            alt="Logo Groupe Supernova"
            width={800}
            height={800}
            priority
            style={{ width: "100%", height: "auto", maxWidth: "800px" }}
            className="relative z-10 drop-shadow-2xl"
          />
        </div>

        <p className="mt-0 text-lg md:text-xl text-h91-stellar/80 max-w-2xl">
          Agence créative & technologique basée à Sainte-Marie-de-Beauce, Québec.
          On prend ta passion, on la numérise, on la fait briller.
        </p>
      </main>

      {/* ================================================================
          L'ÉQUIPE
      ================================================================ */}
      <section id="equipe" className="py-24 px-6 max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-h91-stellar text-center mb-4">
          L'équipe
        </h2>
        <p className="text-center text-h91-stellar/60 mb-14 text-lg">
          Des gens passionnés derrière chaque projet.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {equipe.map((membre) => (
            <div
              key={membre.nom}
              className={`relative p-6 border-2 ${membre.couleurBordure} rounded-xl bg-h91-gravity/50 flex flex-col items-center gap-4 text-center hover:bg-h91-gravity/80 transition`}
            >
              {/* Badge Bientôt */}
              {membre.badge && (
                <span className="absolute top-4 right-4 text-xs font-bold px-2 py-1 rounded-full bg-h91-ion/20 text-h91-ion">
                  {membre.badge}
                </span>
              )}

              {/* Photo placeholder — cercle avec initiales */}
              <div
                className={`w-24 h-24 rounded-full border-2 ${membre.couleurBordure} bg-h91-gravity flex items-center justify-center`}
              >
                <span className={`text-2xl font-bold ${membre.couleurInitiales}`}>
                  {membre.initiales}
                </span>
              </div>

              <div>
                <h3 className="text-lg font-bold text-h91-stellar leading-tight">
                  {membre.nom}
                </h3>
                <p className={`text-xs font-semibold mt-1 ${membre.couleurInitiales}`}>
                  {membre.titre}
                </p>
              </div>

              <p className="text-h91-stellar/70 text-sm leading-relaxed">
                {membre.bio}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ================================================================
          NOTRE HISTOIRE
      ================================================================ */}
      <section id="histoire" className="py-20 px-6 max-w-4xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-h91-stellar text-center mb-14">
          Notre histoire
        </h2>

        <div className="space-y-6 text-h91-stellar/80 text-lg leading-relaxed">
          <p>
            Jonathan Patoine n'a pas suivi un seul chemin. Il en a arpenté plusieurs —
            reboiseur, agent de sécurité, policier, entrepreneur en restauration,
            éditeur pour les médias montréalais — et dans chacun il a cherché la même
            chose sans toujours pouvoir la nommer : un endroit où ses compétences
            rencontrent quelque chose qui en vaut vraiment la peine.
          </p>
          <p>
            Ce quelque chose, il l'a trouvé pour la première fois sur un écran d'Atari.
            Pas dans le jeu lui-même, mais dans ce qu'il représentait : la preuve vivante
            qu'un peu de code pouvait créer un monde entier. Cette fascination ne l'a
            jamais quitté.
          </p>
          <p>
            En décembre 2022, son entreprise ferme sur décision gouvernementale. Il repart
            à zéro avec son frère, ouvre une franchise, se bat. Ça ne suffit pas. Puis
            un CISO — responsable de la cybersécurité d'un CISSS régional — leur ouvre
            une porte inattendue. Jonathan s'inscrit en AEC au Collège Cumberland. Il
            apprend les protocoles, les réseaux, les vulnérabilités. En apprenant comment
            les systèmes tombent, il comprend enfin comment ils fonctionnent.
          </p>
          <p>
            C'est dans cette période qu'il commence à travailler avec l'intelligence
            artificielle — pas comme un outil, mais comme un partenaire. Il réalise
            quelque chose de fondamental : il n'est plus bloqué derrière le mur des
            connaissances à acquérir avant de pouvoir créer. L'imagination peut précéder
            la maîtrise. Il commence à bâtir son studio de jeux. Il commence à rêver
            plus grand.
          </p>
          <p>
            Début 2026, son contrat éditorial à Montréal prend fin. C'est la supernova.
            L'explosion qui précède la renaissance.
          </p>
          <p>
            En mars 2026, Groupe Supernova naît officiellement — avec une mission précise :
            commencer local. Aider les entrepreneurs et artisans de la région à construire
            leur présence numérique et à vivre de ce qu'ils aiment vraiment faire. Le
            premier projet pilote : un dojo de jiu-jitsu brésilien en Beauce. Un prof
            passionné qui peine à rejoindre sa clientèle. Exactement le genre de personne
            pour qui tout ça a été bâti.
          </p>

          <blockquote className="border-l-4 border-h91-accretion pl-6 mt-8 text-h91-stellar/60 italic text-base">
            Une supernova n'est pas une fin. C'est l'explosion qui disperse dans l'univers
            les éléments nécessaires à la création de nouvelles étoiles.
          </blockquote>
        </div>

        <div className="mt-14 text-center">
          <a
            href="/divisions"
            className="inline-block bg-h91-accretion text-h91-gravity font-bold px-8 py-4 rounded-lg text-xl hover:bg-h91-fusion transition"
          >
            Explorer nos divisions
          </a>
        </div>
      </section>
    </>
  );
}
