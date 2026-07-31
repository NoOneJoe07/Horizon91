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
    fr: "Tracer, draver, sonner l'alarme. Le manifeste de Groupe Étoile Boréale — trois divisions, une seule étoile, au service des entrepreneurs du Québec.",
    en: "Chart, drive, sound the alarm. The Boreal Star Group manifesto — three divisions, one star, in service of Quebec entrepreneurs.",
    es: "Trazar, guiar, dar la alarma. El manifiesto de Grupo Estrella Boreal — tres divisiones, una sola estrella, al servicio de los emprendedores de Quebec.",
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
  <>
    <p className="text-h91-stellar/50 text-sm text-center mb-16 uppercase tracking-widest">
      Tracer, draver, sonner l&apos;alarme.
    </p>

    <section className="space-y-6 mb-14">
      <p className="text-h91-stellar/90 text-xl leading-relaxed">
        L&apos;Étoile Polaire n&apos;a jamais bougé. Pendant que tout changeait autour d&apos;elle — les routes, les frontières, les outils — elle est restée le seul point fixe sur lequel des générations de coureurs des bois et de navigateurs ont pu compter.
      </p>
      <p className="text-h91-stellar/70 leading-relaxed">
        Nous croyons que les entrepreneurs d&apos;aujourd&apos;hui ont besoin du même genre de repère. Pas d&apos;une agence de plus qui vend des mots-clés et des heures facturables — d&apos;un point fixe. Une équipe qui reste, qui comprend la réalité régionale, et qui bâtit des choses conçues pour durer.
      </p>
    </section>

    <hr className="border-h91-stellar/10 my-14" />

    <section className="mb-14">
      <h2 className="text-2xl font-bold text-h91-accretion mb-4">Trois gestes, une même discipline</h2>
      <p className="text-h91-stellar/70 leading-relaxed mb-8">
        Notre nom rassemble trois métiers historiques québécois — chacun une métaphore précise de ce que nous faisons vraiment.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-xl border border-h91-warp/25 bg-h91-gravity/40">
          <p className="text-xs font-bold uppercase tracking-widest text-h91-warp mb-2">Arpenteur</p>
          <p className="text-h91-stellar/80 text-sm leading-relaxed">
            Comme Jean Bourdon traçait les premières rues de la Nouvelle-France, nous traçons votre identité de marque — avant de bâtir quoi que ce soit d&apos;autre.
          </p>
        </div>
        <div className="p-6 rounded-xl border border-h91-ion/25 bg-h91-gravity/40">
          <p className="text-xs font-bold uppercase tracking-widest text-h91-ion mb-2">Draveur</p>
          <p className="text-h91-stellar/80 text-sm leading-relaxed">
            Comme les draveurs maîtrisaient le flux des rivières sauvages, nous maîtrisons le flux numérique — sans embâcle, sans friction, jusqu&apos;à vos clients.
          </p>
        </div>
        <div className="p-6 rounded-xl border border-h91-accretion/25 bg-h91-gravity/40">
          <p className="text-xs font-bold uppercase tracking-widest text-h91-accretion mb-2">Carillon</p>
          <p className="text-h91-stellar/80 text-sm leading-relaxed">
            Comme le carillon sonnait l&apos;alarme à l&apos;approche du danger, nous veillons sur vos systèmes et vos données, jour et nuit.
          </p>
        </div>
      </div>
    </section>

    <hr className="border-h91-stellar/10 my-14" />

    <section className="mb-14 space-y-5">
      <h2 className="text-2xl font-bold text-h91-accretion mb-2">Ce que nous refusons</h2>
      <ul className="space-y-3 text-h91-stellar/80">
        <li className="flex items-start gap-3"><span className="text-h91-fusion mt-1">—</span><span>Les prix gonflés des grandes firmes métropolitaines pour un service qu&apos;une équipe locale rend tout aussi bien.</span></li>
        <li className="flex items-start gap-3"><span className="text-h91-fusion mt-1">—</span><span>Les livrables génériques qui ignorent la réalité de la Beauce, de Bellechasse et de Chaudière-Appalaches.</span></li>
        <li className="flex items-start gap-3"><span className="text-h91-fusion mt-1">—</span><span>La croissance à tout prix — nous préférons cinq clients bien servis à cinquante mal suivis.</span></li>
      </ul>
    </section>

    <section className="mb-14 space-y-5">
      <h2 className="text-2xl font-bold text-h91-accretion mb-2">Ce que nous tenons</h2>
      <ul className="space-y-3 text-h91-stellar/80">
        <li className="flex items-start gap-3"><span className="text-h91-ion mt-1">→</span><span>Une équipe qui répond, qui comprend votre entreprise avant de proposer une solution.</span></li>
        <li className="flex items-start gap-3"><span className="text-h91-ion mt-1">→</span><span>Un travail ancré dans l&apos;histoire et le folklore d&apos;ici — pas un vernis marketing importé.</span></li>
        <li className="flex items-start gap-3"><span className="text-h91-ion mt-1">→</span><span>Trois divisions, un seul engagement : des services à la hauteur de vos ambitions.</span></li>
      </ul>
    </section>

    <blockquote className="border-l-4 pl-6 my-16 italic text-lg text-h91-stellar/70" style={{ borderColor: "#0099D1" }}>
      Trois parcours, une étoile. Créer · Bâtir · Protéger.
    </blockquote>
  </>
);

// ─── Contenu EN ─────────────────────────────────────────────────────────────

const EN = () => (
  <>
    <p className="text-h91-stellar/50 text-sm text-center mb-16 uppercase tracking-widest">
      Chart, drive, sound the alarm.
    </p>

    <section className="space-y-6 mb-14">
      <p className="text-h91-stellar/90 text-xl leading-relaxed">
        The North Star never moved. While everything around it changed — roads, borders, tools — it stayed the one fixed point generations of voyageurs and navigators could count on.
      </p>
      <p className="text-h91-stellar/70 leading-relaxed">
        We believe today&apos;s entrepreneurs need that same kind of landmark. Not another agency selling keywords and billable hours — a fixed point. A team that stays, that understands the regional reality, and that builds things meant to last.
      </p>
    </section>

    <hr className="border-h91-stellar/10 my-14" />

    <section className="mb-14">
      <h2 className="text-2xl font-bold text-h91-accretion mb-4">Three gestures, one discipline</h2>
      <p className="text-h91-stellar/70 leading-relaxed mb-8">
        Our name brings together three historic Quebec trades — each a precise metaphor for what we actually do.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-xl border border-h91-warp/25 bg-h91-gravity/40">
          <p className="text-xs font-bold uppercase tracking-widest text-h91-warp mb-2">Arpenteur</p>
          <p className="text-h91-stellar/80 text-sm leading-relaxed">
            Like Jean Bourdon surveyed New France&apos;s first streets, we chart your brand identity — before building anything else.
          </p>
        </div>
        <div className="p-6 rounded-xl border border-h91-ion/25 bg-h91-gravity/40">
          <p className="text-xs font-bold uppercase tracking-widest text-h91-ion mb-2">Draveur</p>
          <p className="text-h91-stellar/80 text-sm leading-relaxed">
            Like log drivers mastered wild river currents, we master digital flow — no jam, no friction, straight through to your customers.
          </p>
        </div>
        <div className="p-6 rounded-xl border border-h91-accretion/25 bg-h91-gravity/40">
          <p className="text-xs font-bold uppercase tracking-widest text-h91-accretion mb-2">Carillon</p>
          <p className="text-h91-stellar/80 text-sm leading-relaxed">
            Like the carillon rang out at the first sign of danger, we watch over your systems and data, day and night.
          </p>
        </div>
      </div>
    </section>

    <hr className="border-h91-stellar/10 my-14" />

    <section className="mb-14 space-y-5">
      <h2 className="text-2xl font-bold text-h91-accretion mb-2">What we refuse</h2>
      <ul className="space-y-3 text-h91-stellar/80">
        <li className="flex items-start gap-3"><span className="text-h91-fusion mt-1">—</span><span>The inflated rates of big-city firms for work a local team delivers just as well.</span></li>
        <li className="flex items-start gap-3"><span className="text-h91-fusion mt-1">—</span><span>Generic deliverables that ignore the reality of Beauce, Bellechasse, and Chaudière-Appalaches.</span></li>
        <li className="flex items-start gap-3"><span className="text-h91-fusion mt-1">—</span><span>Growth at any cost — we&apos;d rather serve five clients well than fifty poorly.</span></li>
      </ul>
    </section>

    <section className="mb-14 space-y-5">
      <h2 className="text-2xl font-bold text-h91-accretion mb-2">What we hold on to</h2>
      <ul className="space-y-3 text-h91-stellar/80">
        <li className="flex items-start gap-3"><span className="text-h91-ion mt-1">→</span><span>A team that answers, that understands your business before proposing a solution.</span></li>
        <li className="flex items-start gap-3"><span className="text-h91-ion mt-1">→</span><span>Work rooted in local history and folklore — not imported marketing polish.</span></li>
        <li className="flex items-start gap-3"><span className="text-h91-ion mt-1">→</span><span>Three divisions, one commitment: services equal to your ambitions.</span></li>
      </ul>
    </section>

    <blockquote className="border-l-4 pl-6 my-16 italic text-lg text-h91-stellar/70" style={{ borderColor: "#0099D1" }}>
      Three journeys, one star. Create · Build · Protect.
    </blockquote>
  </>
);

// ─── Contenu ES ─────────────────────────────────────────────────────────────

const ES = () => (
  <>
    <p className="text-h91-stellar/50 text-sm text-center mb-16 uppercase tracking-widest">
      Trazar, guiar, dar la alarma.
    </p>

    <section className="space-y-6 mb-14">
      <p className="text-h91-stellar/90 text-xl leading-relaxed">
        La Estrella Polar nunca se movió. Mientras todo a su alrededor cambiaba — caminos, fronteras, herramientas —, siguió siendo el único punto fijo con el que generaciones de viajeros y navegantes pudieron contar.
      </p>
      <p className="text-h91-stellar/70 leading-relaxed">
        Creemos que los emprendedores de hoy necesitan ese mismo tipo de referencia. No otra agencia que vende palabras clave y horas facturables — un punto fijo. Un equipo que se queda, que entiende la realidad regional y que construye cosas hechas para durar.
      </p>
    </section>

    <hr className="border-h91-stellar/10 my-14" />

    <section className="mb-14">
      <h2 className="text-2xl font-bold text-h91-accretion mb-4">Tres gestos, una sola disciplina</h2>
      <p className="text-h91-stellar/70 leading-relaxed mb-8">
        Nuestro nombre reúne tres oficios históricos de Quebec — cada uno una metáfora precisa de lo que realmente hacemos.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-xl border border-h91-warp/25 bg-h91-gravity/40">
          <p className="text-xs font-bold uppercase tracking-widest text-h91-warp mb-2">Arpenteur</p>
          <p className="text-h91-stellar/80 text-sm leading-relaxed">
            Como Jean Bourdon trazó las primeras calles de Nueva Francia, trazamos tu identidad de marca — antes de construir cualquier otra cosa.
          </p>
        </div>
        <div className="p-6 rounded-xl border border-h91-ion/25 bg-h91-gravity/40">
          <p className="text-xs font-bold uppercase tracking-widest text-h91-ion mb-2">Draveur</p>
          <p className="text-h91-stellar/80 text-sm leading-relaxed">
            Como los draveurs dominaban el flujo de los ríos salvajes, dominamos el flujo digital — sin atascos, sin fricción, directo hasta tus clientes.
          </p>
        </div>
        <div className="p-6 rounded-xl border border-h91-accretion/25 bg-h91-gravity/40">
          <p className="text-xs font-bold uppercase tracking-widest text-h91-accretion mb-2">Carillon</p>
          <p className="text-h91-stellar/80 text-sm leading-relaxed">
            Como el carillón sonaba la alarma ante el peligro, vigilamos tus sistemas y tus datos, día y noche.
          </p>
        </div>
      </div>
    </section>

    <hr className="border-h91-stellar/10 my-14" />

    <section className="mb-14 space-y-5">
      <h2 className="text-2xl font-bold text-h91-accretion mb-2">Lo que rechazamos</h2>
      <ul className="space-y-3 text-h91-stellar/80">
        <li className="flex items-start gap-3"><span className="text-h91-fusion mt-1">—</span><span>Los precios inflados de las grandes firmas metropolitanas por un trabajo que un equipo local entrega igual de bien.</span></li>
        <li className="flex items-start gap-3"><span className="text-h91-fusion mt-1">—</span><span>Entregables genéricos que ignoran la realidad de Beauce, Bellechasse y Chaudière-Appalaches.</span></li>
        <li className="flex items-start gap-3"><span className="text-h91-fusion mt-1">—</span><span>El crecimiento a cualquier precio — preferimos cinco clientes bien atendidos a cincuenta mal seguidos.</span></li>
      </ul>
    </section>

    <section className="mb-14 space-y-5">
      <h2 className="text-2xl font-bold text-h91-accretion mb-2">Lo que mantenemos</h2>
      <ul className="space-y-3 text-h91-stellar/80">
        <li className="flex items-start gap-3"><span className="text-h91-ion mt-1">→</span><span>Un equipo que responde, que entiende tu empresa antes de proponer una solución.</span></li>
        <li className="flex items-start gap-3"><span className="text-h91-ion mt-1">→</span><span>Un trabajo arraigado en la historia y el folclore de aquí — no un barniz de marketing importado.</span></li>
        <li className="flex items-start gap-3"><span className="text-h91-ion mt-1">→</span><span>Tres divisiones, un solo compromiso: servicios a la altura de tus ambiciones.</span></li>
      </ul>
    </section>

    <blockquote className="border-l-4 pl-6 my-16 italic text-lg text-h91-stellar/70" style={{ borderColor: "#0099D1" }}>
      Tres trayectorias, una estrella. Crear · Construir · Proteger.
    </blockquote>
  </>
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
