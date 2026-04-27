import Image from "next/image";

export default function Home() {
  return (
    <>
      {/* HERO SECTION */}
      <main
        id="hero"
        className="flex flex-col items-center justify-center min-h-screen text-center px-6 pt-0"
      >
        {/* Titre principal au-dessus du logo */}
        <h1 className="text-6xl md:text-8xl font-bold h91-title-gradient-animated mb-6">
          Horizon 91
        </h1>
 

        {/* LOGO + ORBITAL EFFECT */}
        <div className="relative flex items-center justify-center mb-6">

          {/* Halo froid */}
          <div className="blue-halo"></div>

          {/* Noyau orbital chaud */}
          <div className="orbital-core"></div>

          {/* Logo Horizon 91 */}
          <Image
            src="/LogoHorizon91.svg"
            alt="Logo Horizon 91"
            width={800}
            height={800}
            className="relative z-10 drop-shadow-2xl"
          />
        </div>

        {/* Tagline courte */}
        <p className="mt-0 text-lg md:text-xl text-h91-stellar/80 max-w-2xl">
          Groupe créatif & technologique basé au Québec.  
          Nous développons des solutions modernes, futuristes et ancrées dans l’innovation.
        </p>
      </main>

      {/* SECTION PRÉSENTATION */}
      <section
        id="accueil"
        className="py-6 px-6 max-w-4xl mx-auto text-center"
      >
        <h2 className="text-4xl md:text-5xl font-bold text-h91-relativistic mb-6">
          Qui sommes-nous ?
        </h2>

        <p className="text-lg md:text-xl text-h91-stellar/80 leading-relaxed">
          Horizon 91 est un groupe créatif-technologique indépendant basé au Québec,
          regroupant plusieurs divisions spécialisées dans le développement numérique,
          la cybersécurité, l’artisanat, la création littéraire et les solutions web.
          <br /><br />
          Notre mission est de bâtir des expériences modernes, futuristes et
          visuellement marquantes, en fusionnant technologie, créativité et innovation.
          Chaque projet est développé avec rigueur, passion et une identité forte.
        </p>

        <a
          href="/divisions"
          className="inline-block mt-10 bg-h91-relativistic text-h91-gravity font-bold px-8 py-4 rounded-lg text-xl hover:bg-h91-ion transition"
        >
          Explorer nos divisions
        </a>
      </section>
    </>
  );
}




