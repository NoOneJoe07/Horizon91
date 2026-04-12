import Image from "next/image";
import Logo from "./LogoNordikLegion.svg";

export default function Home() {
  return (
    <>
      {/* HERO SECTION */}
      <main
        id="hero"
        className="flex flex-col items-center justify-center min-h-screen text-center px-6 pt-0"
      >
        {/* Titre */}
        <h1 className="text-6xl md:text-8xl font-bold text-nordik-glacier mb-6">
          Nordik Legion Studio
        </h1>

        {/* Logo */}
        <Image
          src={Logo}
          alt="Logo Nordik Legion"
          width={500}
          height={500}
          priority
          className="block mb-2"
          style={{ lineHeight: 0 }}
        />

        {/* Tagline courte */}
        <p className="mt-0 text-lg md:text-xl text-nordik-snow/80 max-w-2xl">
          Studio indépendant avec des racines nordiques.  
          Nous forgeons des expériences uniques entre mythologie, technologie et créativité.
        </p>
      </main>

      {/* SECTION PRÉSENTATION */}
      <section
        id="accueil"
        className="py-6 px-6 max-w-4xl mx-auto text-center"
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

        <a
          href="/projets"
          className="inline-block mt-10 bg-nordik-glacier text-nordik-night font-bold px-8 py-4 rounded-lg text-xl hover:bg-white transition"
        >
          Explorer nos projets
        </a>
      </section>
    </>
  );
}






