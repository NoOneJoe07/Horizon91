import Image from "next/image";
import Logo from "../LogoNordikLegion.svg";

export default function AccueilPage() {
  return (
    <>
      {/* HERO SECTION */}
      <main
        id="hero"
        className="flex flex-col items-center justify-center min-h-screen text-center px-6 pt-32"
      >
        <h1 className="text-6xl md:text-8xl font-bold text-nordik-glacier mb-4">
          Nordik Legion Studio
        </h1>

        <Image
          src={Logo}
          alt="Logo Nordik Legion"
          width={500}
          height={500}
          priority
          className="block mb-2"
          style={{ lineHeight: 0 }}
        />

        <p className="mt-2 text-lg md:text-xl text-nordik-snow/80 max-w-2xl">
          Studio indépendant inspiré du Nord.  
          Nous forgeons des expériences uniques entre mythologie, technologie et créativité.
        </p>
      </main>

      {/* SECTION PRÉSENTATION */}
      <section
        id="presentation"
        className="py-12 px-6 max-w-4xl mx-auto text-center"
      >
        <h2 className="text-4xl md:text-5xl font-bold text-nordik-glacier mb-6">
          Qui sommes-nous ?
        </h2>

        <p className="text-lg md:text-xl text-nordik-snow/80 leading-relaxed">
          Nordik Legion Studio est un collectif créatif indépendant basé au Québec,
          spécialisé dans la conception d’expériences numériques inspirées par
          l’esthétique nordique, la mythologie et l’innovation technologique.
          <br /><br />
          Notre objectif est de créer des univers immersifs, authentiques et
          visuellement marquants, en fusionnant l’art, la narration et la technologie.
          Chaque projet est développé avec rigueur, passion et une identité forte.
        </p>
      </section>

      {/* SECTION VISION */}
      <section className="py-12 px-6 max-w-4xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-nordik-glacier mb-10">
          Notre vision
        </h2>

        <p className="text-lg md:text-xl text-nordik-snow/80 leading-relaxed mb-20">
          Nous nous inspirons des terres nordiques, de la mythologie et de la
          technologie moderne pour créer des expériences numériques uniques,
          immersives et profondément artistiques.
        </p>

        {/* MISSION */}
        <h3 className="text-4xl md:text-4xl font-bold text-nordik-glacier mb-6">
          Notre mission
        </h3>
        <p className="text-lg text-nordik-snow/80 leading-relaxed mb-20">
          Forger des univers authentiques où se rencontrent narration,
          esthétique nordique et innovation technologique.
          <br /><br />
          Chaque projet est conçu avec rigueur, passion et une identité visuelle
          forte, afin d’offrir des expériences mémorables et intemporelles.
        </p>

        {/* VALEURS */}
        <h3 className="text-4xl md:text-4xl font-bold text-nordik-glacier mb-6">
          Nos valeurs
        </h3>

        <div className="space-y-10 text-lg text-nordik-snow/80 leading-relaxed">
          <p>
            <strong className="text-nordik-glacier">Authenticité: </strong>  
            Nous créons des mondes qui respectent l’essence du Nord et ses
            inspirations culturelles.
          </p>

          <p>
            <strong className="text-nordik-glacier">Innovation: </strong>  
            Nous explorons constamment de nouvelles technologies pour repousser
            les limites de l’expérience interactive.
          </p>

          <p>
            <strong className="text-nordik-glacier">Discipline: </strong>  
            Chaque projet est développé avec une méthodologie claire, une
            structure solide et une vision long terme.
          </p>

          <p>
            <strong className="text-nordik-glacier">Créativité: </strong>  
            L’art, la narration et l’imaginaire nordique sont au cœur de notre
            identité.
          </p>
        </div>
      </section>

      {/* CTA */}
      <div className="text-center pb-32">
        <a
          href="/projets"
          className="inline-block mt-10 bg-nordik-glacier text-nordik-night font-bold px-8 py-4 rounded-lg text-xl hover:bg-white transition"
        >
          Explorer nos projets
        </a>
      </div>
    </>
  );
}

