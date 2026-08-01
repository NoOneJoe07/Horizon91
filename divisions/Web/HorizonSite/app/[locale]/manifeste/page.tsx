import type { Metadata } from "next";
import { Link } from "@/i18n/navigation";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  const titles: Record<string, string> = {
    fr: "Notre Manifeste — Groupe Étoile Boréale",
    en: "Our Manifesto — Boreal Star Group",
    es: "Nuestro Manifiesto — Grupo Estrella Boreal",
  };
  const descriptions: Record<string, string> = {
    fr: "L'univers numérique est un océan sans rivage. Étoile Boréale est votre repère fixe pour la traversée — le manifeste de Groupe Étoile Boréale.",
    en: "The digital world is a shoreless ocean. Boreal Star is your fixed point for the crossing — the Boreal Star Group manifesto.",
    es: "El universo digital es un océano sin orillas. Estrella Boreal es tu punto fijo para la travesía — el manifiesto de Grupo Estrella Boreal.",
  };

  const baseUrl = locale === "en" ? "https://borealstar.ca" : "https://etoileboreale.ca";
  const canonical = `${baseUrl}${locale === "fr" ? "" : `/${locale}`}/manifeste`;

  return {
    title: titles[locale] ?? titles.fr,
    description: descriptions[locale] ?? descriptions.fr,
    alternates: { canonical },
    openGraph: {
      title: titles[locale] ?? titles.fr,
      description: descriptions[locale] ?? descriptions.fr,
      url: canonical,
    },
  };
}

// ─── Contenu FR ─────────────────────────────────────────────────────────────

const FR = () => (
  <section className="space-y-8">
    <p className="text-h91-stellar/90 text-xl leading-relaxed">
      Vous vous apprêtez à lancer votre bateau sur un océan sans rivage : l&apos;univers numérique. Vaste, changeant, plein d&apos;inconnus — et vous craignez de vous y perdre, ou de ne jamais atteindre le port. Nous comprenons cette peur ; nous l&apos;entendons chaque semaine. Les navigateurs d&apos;autrefois avaient un repère fixe, peu importe la tempête : l&apos;Étoile Polaire. Étoile Boréale est ce repère pour votre traversée numérique.
    </p>
    <p className="text-h91-stellar/80 text-xl leading-relaxed">
      Nous nous assoyons avec vous avant de parler de solutions. Nous écoutons votre idée, puis nous traçons la route ensemble — votre marque, votre site, votre boutique en ligne — un cap à la fois. Et une fois au port, nous le protégeons. Vous n&apos;avez pas à naviguer seul : vous avez besoin d&apos;une étoile qui reste allumée et d&apos;un équipage qui connaît la mer. C&apos;est Étoile Boréale.
    </p>
  </section>
);

// ─── Contenu EN ─────────────────────────────────────────────────────────────

const EN = () => (
  <section className="space-y-8">
    <p className="text-h91-stellar/90 text-xl leading-relaxed">
      You&apos;re about to launch your boat onto a shoreless ocean: the digital world. Vast, ever-changing, full of unknowns — and you&apos;re afraid of getting lost in it, or of never reaching port. We understand that fear; we hear it every week. Sailors of old had one fixed point, no matter the storm: the North Star. Boreal Star is that fixed point for your digital crossing.
    </p>
    <p className="text-h91-stellar/80 text-xl leading-relaxed">
      We sit down with you before talking about solutions. We listen to your idea, then we chart the course together — your brand, your website, your online store — one heading at a time. And once you reach port, we protect it. You don&apos;t have to navigate alone: you need a star that stays lit and a crew that knows the sea. That&apos;s Boreal Star.
    </p>
  </section>
);

// ─── Contenu ES ─────────────────────────────────────────────────────────────

const ES = () => (
  <section className="space-y-8">
    <p className="text-h91-stellar/90 text-xl leading-relaxed">
      Estás a punto de lanzar tu barco a un océano sin orillas: el universo digital. Vasto, cambiante, lleno de incógnitas — y temes perderte en él, o no llegar nunca a puerto. Entendemos ese miedo; lo escuchamos cada semana. Los navegantes de antaño tenían un punto fijo, sin importar la tormenta: la Estrella Polar. Estrella Boreal es ese punto fijo para tu travesía digital.
    </p>
    <p className="text-h91-stellar/80 text-xl leading-relaxed">
      Nos sentamos contigo antes de hablar de soluciones. Escuchamos tu idea, y luego trazamos el rumbo juntos — tu marca, tu sitio web, tu tienda en línea — un rumbo a la vez. Y una vez en puerto, lo protegemos. No tienes que navegar solo: necesitas una estrella que se mantenga encendida y una tripulación que conozca el mar. Eso es Estrella Boreal.
    </p>
  </section>
);

// ─── Page principale ─────────────────────────────────────────────────────────

export default async function ManifestePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  const titles: Record<string, string> = {
    fr: "Notre Manifeste",
    en: "Our Manifesto",
    es: "Nuestro Manifiesto",
  };

  return (
    <main className="max-w-4xl mx-auto px-6 py-20">
      <h1 className="text-4xl md:text-5xl font-bold text-h91-stellar text-center mb-4">
        {titles[locale] ?? titles.fr}
      </h1>
      <p className="text-center text-h91-stellar/40 text-sm mb-16">
        Groupe Étoile Boréale — Sainte-Marie, Québec, Canada
      </p>

      {locale === "en" ? <EN /> : locale === "es" ? <ES /> : <FR />}

      <div className="mt-16 text-center">
        <Link href="/" className="text-h91-accretion hover:text-h91-fusion transition text-sm">
          ← {locale === "en" ? "Back to home" : locale === "es" ? "Volver al inicio" : "Retour à l'accueil"}
        </Link>
      </div>
    </main>
  );
}
