import type { Metadata } from "next";
import { useLocale } from "next-intl";
import { getLocale } from "next-intl/server";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import ArpenteurGallery from "@/app/components/ArpenteurGallery";

// ─────────────────────────────────────────────────────────
// Metadata SEO — Division Arpenteur
// ─────────────────────────────────────────────────────────
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  const titles: Record<string, string> = {
    fr: "Division Arpenteur — Graphisme, Livre de Marque & Photographie | Beauce",
    en: "Arpenteur Division — Brand Design, Identity & Photography | Beauce",
    es: "División Arpenteur — Diseño de Marca, Identidad & Fotografía | Beauce",
  };
  const descriptions: Record<string, string> = {
    fr: "Comme Jean Bourdon a tracé les premières rues de la Nouvelle-France avec précision et vision, la Division Arpenteur trace votre identité de marque. Graphisme, livre de marque, photographie — Groupe Étoile Boréale, Beauce.",
    en: "Like Samuel Holland charted British North America with astronomical precision, Arpenteur Division charts your brand identity. Brand design, visual identity, photography — Boreal Star Group, Beauce.",
    es: "Como Samuel Holland cartografió América del Norte con precisión astronómica, la División Arpenteur traza su identidad de marca. Diseño gráfico, libro de marca, fotografía — Grupo Estrella Boreal, Beauce.",
  };

  const baseUrl = locale === "en" ? "https://borealstar.ca" : "https://etoileboreale.ca";
  const canonical = `${baseUrl}${locale === "fr" ? "" : `/${locale}`}/divisions/arpenteur`;

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

// ─────────────────────────────────────────────────────────
// JSON-LD — Service Arpenteur
// ─────────────────────────────────────────────────────────
async function ArpenteurJsonLd() {
  const locale = await getLocale();
  const baseUrl = locale === "en" ? "https://borealstar.ca" : "https://etoileboreale.ca";
  const org =
    locale === "en"
      ? "Boreal Star Group"
      : locale === "es"
      ? "Grupo Estrella Boreal"
      : "Groupe Étoile Boréale";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name:
      locale === "en"
        ? "Arpenteur Division — Brand Design & Photography"
        : locale === "es"
        ? "División Arpenteur — Diseño de Marca & Fotografía"
        : "Division Arpenteur — Graphisme, Livre de Marque & Photographie",
    serviceType: "Brand Design",
    url: `${baseUrl}${locale === "fr" ? "" : `/${locale}`}/divisions/arpenteur`,
    provider: { "@type": "Organization", name: org, url: baseUrl },
    areaServed: "Chaudière-Appalaches, Beauce, Québec",
    description:
      locale === "en"
        ? "Professional brand identity, graphic design and photography services for SMBs in Beauce and Chaudière-Appalaches. Named after the precision of Canada's first surveyors."
        : locale === "es"
        ? "Diseño de identidad de marca, diseño gráfico y fotografía profesional para pymes de Beauce y Chaudière-Appalaches."
        : "Graphisme, identité de marque et photographie professionnels pour PME de Beauce et Chaudière-Appalaches. Nommée en hommage aux arpenteurs fondateurs de la Nouvelle-France.",
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

// ─────────────────────────────────────────────────────────
// Services — Arpenteur
// ─────────────────────────────────────────────────────────
const services = [
  {
    fr: {
      titre: "Livre de marque",
      desc: "Charte complète : couleurs, typographie, ton éditorial, règles d'utilisation du logo et exemples d'application. Votre identité, cohérente partout.",
    },
    en: {
      titre: "Brand Book",
      desc: "Complete brand guide: colors, typography, editorial tone, logo usage rules and application examples. Your identity, consistent everywhere.",
    },
    es: {
      titre: "Libro de marca",
      desc: "Guía de marca completa: colores, tipografía, tono editorial, reglas de uso del logotipo y ejemplos de aplicación.",
    },
  },
  {
    fr: {
      titre: "Identité visuelle & logo",
      desc: "Conception de logos originaux, sélection de palette et système de marks. Une marque qui se démarque et qui dure.",
    },
    en: {
      titre: "Visual identity & logo",
      desc: "Original logo design, color palette selection and mark system. A brand that stands out and lasts.",
    },
    es: {
      titre: "Identidad visual & logotipo",
      desc: "Diseño de logotipos originales, selección de paleta y sistema de marcas.",
    },
  },
  {
    fr: {
      titre: "Infographie & gabarits",
      desc: "Publications pour réseaux sociaux, présentations, dépliants, affiches — aux couleurs de votre marque, prêts à l'emploi.",
    },
    en: {
      titre: "Graphic design & templates",
      desc: "Social media posts, presentations, flyers, posters — in your brand colors, ready to use.",
    },
    es: {
      titre: "Diseño gráfico & plantillas",
      desc: "Publicaciones para redes sociales, presentaciones, folletos, carteles — en los colores de su marca.",
    },
  },
  {
    fr: {
      titre: "Photographie professionnelle",
      desc: "Photos d'équipe, d'ambiance et de produits. Paulina Jaramillo (DG Photographie) se déplace chez vous pour capturer l'essence de votre entreprise.",
    },
    en: {
      titre: "Professional photography",
      desc: "Team, lifestyle and product photos. Paulina Jaramillo (Photography Director) visits your location to capture the essence of your business.",
    },
    es: {
      titre: "Fotografía profesional",
      desc: "Fotos de equipo, ambiente y productos. Paulina Jaramillo (Directora de Fotografía) visita su local para capturar la esencia de su empresa.",
    },
  },
  {
    fr: {
      titre: "Stratégie médias sociaux",
      desc: "Calendrier éditorial, création de contenu visuel, gestion de communauté. Votre présence en ligne, ancrée dans votre marque.",
    },
    en: {
      titre: "Social media strategy",
      desc: "Editorial calendar, visual content creation, community management. Your online presence, rooted in your brand.",
    },
    es: {
      titre: "Estrategia de redes sociales",
      desc: "Calendario editorial, creación de contenido visual, gestión de comunidad.",
    },
  },
  {
    fr: {
      titre: "Imprimés & papeterie de marque",
      desc: "Cartes d'affaires, en-têtes de lettres, enveloppes, agendas — en partenariat avec des imprimeurs locaux de la région.",
    },
    en: {
      titre: "Print & brand stationery",
      desc: "Business cards, letterheads, envelopes, agendas — in partnership with local printers in the region.",
    },
    es: {
      titre: "Impresos & papelería de marca",
      desc: "Tarjetas de presentación, membrete, sobres, agendas — en asociación con impresores locales.",
    },
  },
];

// ─────────────────────────────────────────────────────────
// Page principale — Division Arpenteur
// ─────────────────────────────────────────────────────────
export default function ArpenteurPage() {
  const locale = useLocale();
  const isFR = locale === "fr";
  const isEN = locale === "en";

  // ── Hero ──
  const heroTitre = isFR
    ? "Division Arpenteur"
    : isEN
    ? "Arpenteur Division"
    : "División Arpenteur";

  const heroTagline = isFR
    ? "Graphisme · Livre de Marque · Photographie"
    : isEN
    ? "Brand Design · Visual Identity · Photography"
    : "Diseño Gráfico · Identidad de Marca · Fotografía";

  const heroDesc = isFR
    ? "Comme l'arpenteur trace les frontières d'un territoire avant que quiconque ne le bâtisse, la Division Arpenteur trace votre identité avant que votre entreprise ne prenne son envol. Nous définissons votre marque avec la précision d'un levé topographique et la vision d'un explorateur."
    : isEN
    ? "As the surveyor traces the boundaries of a territory before anyone builds on it, Arpenteur Division traces your brand identity before your business takes flight. We define your brand with the precision of a topographic survey and the vision of an explorer."
    : "Como el topógrafo traza los límites de un territorio antes de que alguien construya en él, la División Arpenteur traza su identidad de marca. Definimos su marca con la precisión de un levantamiento topográfico y la visión de un explorador.";

  // ── Services ──
  const servicesTitle = isFR
    ? "Ce que nous faisons"
    : isEN
    ? "What we do"
    : "Lo que hacemos";

  // ── Lore A — Jean Bourdon ──
  const bourdonSurtitle = isFR
    ? "L'héritage des arpenteurs"
    : isEN
    ? "The Surveyors' Heritage"
    : "El legado de los agrimensores";

  const bourdonText = isFR
    ? [
        "En 1634, Jean Bourdon débarque en Nouvelle-France avec une mission précise : mesurer, cartographier, comprendre le territoire avant tout autre geste. Il deviendra le premier Procureur général de la Nouvelle-France et tracera les premières rues de la ville de Québec — des lignes qui existent encore aujourd'hui.",
        "Bourdon n'avait pas de GPS. Pas de satellite. Seulement une chaîne d'arpenteur, un théodolite rudimentaire et une capacité extraordinaire à lire le terrain. Il savait qu'avant de bâtir, il faut d'abord comprendre. Avant de construire une route, il faut en voir le tracé.",
        "C'est cet esprit que la Division Arpenteur porte : la conviction que définir avec précision — une identité, une couleur, un ton, une typographie — c'est poser les fondations de tout ce qui vient après.",
      ]
    : isEN
    ? [
        "In 1634, Jean Bourdon arrived in New France with a singular mission: to measure, map, and understand the territory before anything else could be built upon it. He would become the first Attorney General of New France and lay out the first streets of Quebec City — lines that still exist today.",
        "Bourdon had no GPS. No satellite imagery. Only a surveyor's chain, a rudimentary theodolite, and an extraordinary ability to read the land. He knew that before you build, you must first understand. Before you lay a road, you must see its line.",
        "That spirit — deliberate, precise, foundational — is what Division Arpenteur carries into every brand identity we create: define carefully first, then build everything else on top.",
      ]
    : [
        "En 1634, Jean Bourdon llegó a la Nueva Francia con una misión precisa: medir, cartografiar y comprender el territorio antes de que nadie lo construyera. Se convertiría en el primer Procurador General de la Nueva Francia y trazaría las primeras calles de la ciudad de Quebec — líneas que existen todavía hoy.",
        "Bourdon no tenía GPS ni satélite. Solo una cadena de agrimensor, un teodolito rudimentario y una capacidad extraordinaria para leer el terreno. Sabía que antes de construir, hay que entender. Antes de trazar una carretera, hay que ver su línea.",
        "Ese espíritu — deliberado, preciso, fundacional — es el que la División Arpenteur aplica a cada identidad de marca que creamos: definir con precisión primero, luego construir todo lo demás sobre esa base.",
      ];

  const bourdonPhotos = [
    {
      src: "/photos_images/JeanBourdon.jpg",
      alt: isFR
        ? "Portrait de Jean Bourdon, arpenteur de la Nouvelle-France"
        : isEN
        ? "Portrait of Jean Bourdon, surveyor of New France"
        : "Retrato de Jean Bourdon, agrimensor de la Nueva Francia",
      caption: isFR
        ? "Jean Bourdon (1601–1668) — Premier Procureur général de la Nouvelle-France"
        : isEN
        ? "Jean Bourdon (1601–1668) — First Attorney General of New France"
        : "Jean Bourdon (1601–1668) — Primer Procurador General de la Nueva Francia",
    },
    {
      src: "/photos_images/Jean_Bourdon_1.jpg",
      alt: isFR
        ? "Représentation historique de Jean Bourdon"
        : isEN
        ? "Historical depiction of Jean Bourdon"
        : "Representación histórica de Jean Bourdon",
      caption: isFR
        ? "Représentation de Jean Bourdon, fondateur de l'arpentage en Nouvelle-France"
        : isEN
        ? "Depiction of Jean Bourdon, pioneer of surveying in New France"
        : "Representación de Jean Bourdon, pionero de la agrimensura en la Nueva Francia",
    },
    {
      src: "/photos_images/Signature_de_Jean_Bourdon.jpg",
      alt: isFR
        ? "Signature manuscrite de Jean Bourdon"
        : isEN
        ? "Jean Bourdon's handwritten signature"
        : "Firma manuscrita de Jean Bourdon",
      caption: isFR
        ? "Signature manuscrite de Jean Bourdon — ca. 1650s"
        : isEN
        ? "Jean Bourdon's handwritten signature — ca. 1650s"
        : "Firma manuscrita de Jean Bourdon — ca. 1650s",
    },
  ];

  // ── Lore B — Samuel Holland ──
  const hollandSurtitle = isFR
    ? "L'arpenteur d'un continent"
    : isEN
    ? "The Surveyor of a Continent"
    : "El agrimensor de un continente";

  const hollandText = isFR
    ? [
        "Samuel Holland (1728–1801) est né à La Haye, aux Pays-Bas. Il traverse l'Atlantique comme ingénieur militaire dans les rangs britanniques et, en 1757, reçoit une mission d'une précision redoutable : reconnaître les défenses du Fort Carillon — ce bastion franco-canadien au confluent du lac Champlain et du lac George, dont s'inspire aujourd'hui notre Division Carillon.",
        "Mais Holland n'est pas qu'un militaire. C'est lui qui enseigne à James Cook les bases de la navigation astronomique et du levé topographique. On peut donc tracer une ligne directe : Bourdon mesure la Nouvelle-France → Holland forme Cook → Cook cartographie la planète entière.",
        "Nommé Arpenteur général de l'Amérique du Nord en 1764, Holland quadrille un continent avec la précision d'une horloge suisse. Il épouse Marie-Joseph Rollet, une Canadienne française, et termine ses jours à Québec en 1801 — enterré dans la même ville que Bourdon avait, un siècle plus tôt, contribué à tracer. Deux arpenteurs. Un seul héritage : mesurer avant de bâtir.",
      ]
    : isEN
    ? [
        "Samuel Holland (1728–1801), born in The Hague, crossed the Atlantic as a military engineer with British forces. In 1757, he was assigned a mission of critical precision: to reconnoitre the defences of Fort Carillon — the Franco-Canadian bastion at the confluence of Lake Champlain and Lake George — the very same fort that gave our Division Carillon its name.",
        "Holland's assignment was military, but his legacy was cartographic. A close mentor to James Cook — the great circumnavigator — Holland personally taught Cook the fundamentals of astronomical navigation and topographic surveying. The chain of mastery runs directly: Bourdon charts New France → Holland trains Cook → Cook maps the globe.",
        "Appointed Surveyor General of North America in 1764, Holland charted a continent with clockwork precision. He married Marie-Joseph Rollet, a French-Canadian woman from Quebec, and spent his final years in Quebec City — buried in the city that Bourdon had helped lay out a century before. Two surveyors. One legacy: measure before you build.",
      ]
    : [
        "Samuel Holland (1728–1801), nacido en La Haya, cruzó el Atlántico como ingeniero militar con las fuerzas británicas. En 1757, recibió una misión de precisión crítica: reconocer las defensas del Fuerte Carillon — el bastión franco-canadiense en la confluencia del lago Champlain y el lago George — el mismo fuerte que da nombre a nuestra División Carillon.",
        "La misión de Holland era militar, pero su legado fue cartográfico. Mentor cercano de James Cook — el gran circunnavegante —, Holland enseñó personalmente a Cook los fundamentos de la navegación astronómica y la topografía. La cadena del conocimiento es directa: Bourdon cartografía la Nueva Francia → Holland forma a Cook → Cook mapea el globo.",
        "Nombrado Agrimensor General de América del Norte en 1764, Holland cuadriculó un continente con precisión de relojero. Se casó con Marie-Joseph Rollet, una canadiense francesa, y pasó sus últimos años en la ciudad de Quebec — enterrado en la ciudad que Bourdon había contribuido a trazar un siglo antes. Dos agrimensores. Un solo legado: medir antes de construir.",
      ];

  const hollandCarillonCallout = isFR
    ? "En 1757, Samuel Holland reçoit l'ordre de reconnaître le Fort Carillon — la même forteresse dont s'inspire notre Division Carillon. Deux divisions d'Étoile Boréale, un seul héritage de précision et de vision stratégique."
    : isEN
    ? "In 1757, Samuel Holland was ordered to reconnoitre Fort Carillon — the very fortress that inspired our Division Carillon. Two Boreal Star divisions, one shared legacy of precision and strategic vision."
    : "En 1757, Samuel Holland recibió la orden de reconocer el Fuerte Carillon — la misma fortaleza que inspiró nuestra División Carillon. Dos divisiones de Estrella Boreal, un mismo legado de precisión y visión estratégica.";

  const hollandCarillonLabel = isFR
    ? "⚑ Connexion Division Carillon"
    : isEN
    ? "⚑ Division Carillon Connection"
    : "⚑ Conexión División Carillon";

  const hollandPhoto = [
    {
      src: "/photos_images/Samuel_Holland.jpg",
      alt: isFR
        ? "Portrait de Samuel Holland, Arpenteur général de l'Amérique du Nord"
        : isEN
        ? "Portrait of Samuel Holland, Surveyor General of North America"
        : "Retrato de Samuel Holland, Agrimensor General de América del Norte",
      caption: isFR
        ? "Samuel Holland (1728–1801) — Arpenteur général de l'Amérique du Nord"
        : isEN
        ? "Samuel Holland (1728–1801) — Surveyor General of North America"
        : "Samuel Holland (1728–1801) — Agrimensor General de América del Norte",
    },
  ];

  // ── Avantage ──
  const avantage = isFR
    ? "L'avantage Étoile Boréale"
    : isEN
    ? "The Boreal Star Advantage"
    : "La ventaja Estrella Boreal";

  const avantageDesc = isFR
    ? "Une directrice marketing certifiée qui travaille directement sur votre dossier — pas une agence intermédiaire. Expertise photographique sur le terrain, ancrage régional, tarifs proportionnels à la réalité des entrepreneurs d'ici. Nous livrons des marques cohérentes, pas des logos isolés."
    : isEN
    ? "A certified marketing director who works directly on your file — no intermediary agency. On-site photography expertise, regional roots, rates proportionate to local entrepreneurs' reality. We deliver coherent brands, not isolated logos."
    : "Una directora de marketing certificada que trabaja directamente en su proyecto. Experiencia fotográfica sobre el terreno, arraigo regional, tarifas proporcionales a la realidad emprendedora local.";

  const avantageItems = isFR
    ? [
        "Livre de marque complet livré en PDF + sources éditables",
        "Photos professionnelles sur le terrain (déplacement inclus)",
        "Gabarits réseaux sociaux prêts à l'emploi (FR/EN)",
        "Cohérence garantie entre print et numérique",
        "Révisions incluses — nous peaufinons jusqu'à ce que ce soit juste",
      ]
    : isEN
    ? [
        "Complete brand book delivered in PDF + editable sources",
        "Professional on-site photography (travel included)",
        "Ready-to-use social media templates (FR/EN)",
        "Guaranteed consistency between print and digital",
        "Revisions included — we refine until it's right",
      ]
    : [
        "Libro de marca completo entregado en PDF + fuentes editables",
        "Fotografía profesional in situ (desplazamiento incluido)",
        "Plantillas de redes sociales listas para usar",
        "Coherencia garantizada entre impreso y digital",
        "Revisiones incluidas",
      ];

  // ── CTA ──
  const ctaTitre = isFR
    ? "Prêt à tracer votre identité ?"
    : isEN
    ? "Ready to chart your identity?"
    : "¿Listo para trazar su identidad?";

  const ctaBouton = isFR
    ? "Parler à notre équipe"
    : isEN
    ? "Talk to our team"
    : "Hablar con nuestro equipo";

  const ctaRetour = isFR
    ? "← Toutes les divisions"
    : isEN
    ? "← All divisions"
    : "← Todas las divisiones";

  return (
    <>
      <ArpenteurJsonLd />

      {/* ── HERO ── */}
      <section
        className="relative px-6"
        style={{
          backgroundColor: "#5762A2",
          marginTop: "-80px",
          paddingTop: "176px",
          paddingBottom: "96px",
        }}
      >
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row items-start gap-10">
            <div className="flex-shrink-0">
              <Image
                src="/mark-nordik.svg"
                alt="Mark Division Arpenteur"
                width={110}
                height={110}
                style={{
                  width: "110px",
                  height: "110px",
                  filter: "brightness(0) invert(1)",
                }}
              />
            </div>
            <div>
              <p
                className="text-xs font-bold tracking-widest uppercase mb-3"
                style={{ color: "rgba(244,244,240,0.60)" }}
              >
                {heroTagline}
              </p>
              <h1
                className="text-4xl md:text-5xl font-bold mb-6"
                style={{
                  color: "#F4F4F0",
                  fontFamily: "var(--font-display, 'Gotham', 'Montserrat', system-ui)",
                }}
              >
                {heroTitre}
              </h1>
              <p
                className="text-lg leading-relaxed max-w-2xl"
                style={{ color: "rgba(244,244,240,0.82)" }}
              >
                {heroDesc}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section className="py-20 px-6" style={{ backgroundColor: "#FFFFFF" }}>
        <div className="max-w-5xl mx-auto">
          <h2
            className="text-3xl font-bold mb-12"
            style={{
              color: "#5762A2",
              fontFamily: "var(--font-display, 'Gotham', 'Montserrat', system-ui)",
            }}
          >
            {servicesTitle}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s, i) => {
              const sLocale = isFR ? s.fr : isEN ? s.en : s.es;
              return (
                <div
                  key={i}
                  className={`p-6 rounded-xl border-l-4 card-lift animate-fade-in-up stagger-${Math.min(i + 1, 6)}`}
                  style={{
                    borderLeftColor: "#5762A2",
                    backgroundColor: "#F4F4F0",
                  }}
                >
                  <h3 className="font-bold text-base mb-2" style={{ color: "#5762A2" }}>
                    {sLocale.titre}
                  </h3>
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: "rgba(29,29,27,0.65)" }}
                  >
                    {sLocale.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── LORE A — JEAN BOURDON ── */}
      <section className="py-20 px-6" style={{ backgroundColor: "#E8EAF6" }}>
        <div className="max-w-5xl mx-auto">
          <p
            className="text-xs font-bold tracking-widest uppercase mb-3"
            style={{ color: "#5762A2" }}
          >
            {bourdonSurtitle}
          </p>
          <h2
            className="text-3xl font-bold mb-8"
            style={{
              color: "#1D1D1B",
              fontFamily: "var(--font-display, 'Gotham', 'Montserrat', system-ui)",
            }}
          >
            Jean Bourdon (1601–1668)
          </h2>
          <div className="space-y-5 mb-12">
            {bourdonText.map((p, i) => (
              <p
                key={i}
                className="text-base leading-relaxed scroll-fade"
                style={{ color: "rgba(29,29,27,0.75)" }}
              >
                {p}
              </p>
            ))}
          </div>

          {/* Galerie Bourdon — 3 photos cliquables */}
          <ArpenteurGallery photos={bourdonPhotos} cols={3} />
        </div>
      </section>

      {/* ── LORE B — SAMUEL HOLLAND ── */}
      <section className="py-20 px-6" style={{ backgroundColor: "#FFFFFF" }}>
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row gap-10 items-start">

            {/* Photo Holland — à gauche sur desktop */}
            <div className="w-full md:w-72 flex-shrink-0">
              <ArpenteurGallery photos={hollandPhoto} cols={1} />
            </div>

            {/* Texte Holland — à droite sur desktop */}
            <div className="flex-1">
              <p
                className="text-xs font-bold tracking-widest uppercase mb-3"
                style={{ color: "#5762A2" }}
              >
                {hollandSurtitle}
              </p>
              <h2
                className="text-3xl font-bold mb-6"
                style={{
                  color: "#1D1D1B",
                  fontFamily: "var(--font-display, 'Gotham', 'Montserrat', system-ui)",
                }}
              >
                Samuel Holland (1728–1801)
              </h2>
              <div className="space-y-4 mb-8">
                {hollandText.map((p, i) => (
                  <p
                    key={i}
                    className="text-base leading-relaxed scroll-fade"
                    style={{ color: "rgba(29,29,27,0.75)" }}
                  >
                    {p}
                  </p>
                ))}
              </div>

              {/* Callout — lien narratif Division Carillon */}
              <div
                className="p-4 rounded-lg border-l-4"
                style={{
                  borderLeftColor: "#203478",
                  backgroundColor: "#E3E6EF",
                }}
              >
                <p
                  className="text-xs font-bold tracking-widest uppercase mb-2"
                  style={{ color: "#203478" }}
                >
                  {hollandCarillonLabel}
                </p>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "rgba(32,52,120,0.85)" }}
                >
                  {hollandCarillonCallout}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── AVANTAGE ── */}
      <section className="py-20 px-6" style={{ backgroundColor: "#F4F4F0" }}>
        <div className="max-w-4xl mx-auto">
          <div
            className="p-8 rounded-xl border-l-4"
            style={{ borderLeftColor: "#5762A2", backgroundColor: "#FFFFFF" }}
          >
            <h2
              className="text-2xl font-bold mb-4"
              style={{
                color: "#5762A2",
                fontFamily: "var(--font-display, 'Gotham', 'Montserrat', system-ui)",
              }}
            >
              {avantage}
            </h2>
            <p
              className="text-base leading-relaxed mb-6"
              style={{ color: "rgba(29,29,27,0.70)" }}
            >
              {avantageDesc}
            </p>
            <ul className="space-y-2">
              {avantageItems.map((item, i) => (
                <li
                  key={i}
                  className="flex items-start gap-2 text-sm"
                  style={{ color: "rgba(29,29,27,0.65)" }}
                >
                  <span style={{ color: "#5762A2" }}>✓</span> {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── SAVIEZ-VOUS QUE ? ── */}
      <section className="py-20 px-6" style={{ backgroundColor: "#FFFFFF" }}>
        <div className="max-w-5xl mx-auto">
          <div className="rounded-2xl p-8" style={{ border: "1px solid rgba(87,98,162,0.20)", backgroundColor: "rgba(87,98,162,0.07)" }}>
            <h3 className="font-bold text-sm uppercase tracking-widest mb-8 flex items-center gap-3" style={{ color: "#5762A2" }}>
              <span className="text-xl">💡</span>
              {isFR ? "Saviez-vous que ?" : isEN ? "Did you know?" : "¿Sabías que?"}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              {/* Stat 1 — Identité de marque cohérente */}
              <div className="p-5 rounded-xl" style={{ backgroundColor: "#FFFFFF", border: "1px solid rgba(87,98,162,0.20)" }}>
                <p className="font-bold text-4xl mb-2" style={{ color: "#5762A2" }}>+33 %</p>
                <p className="font-semibold text-sm mb-3" style={{ color: "#1D1D1B" }}>
                  {isFR ? "De revenus supplémentaires" : isEN ? "In additional revenue" : "De ingresos adicionales"}
                </p>
                <p className="text-sm leading-relaxed" style={{ color: "rgba(29,29,27,0.60)" }}>
                  {isFR
                    ? "Selon Lucidpress (2019), les entreprises qui maintiennent une identité de marque cohérente — logo, couleurs, typographie, ton — génèrent en moyenne 33 % de revenus supplémentaires. Un livre de marque solide, c'est l'investissement le plus rentable que vous puissiez faire."
                    : isEN
                    ? "According to Lucidpress (2019), businesses that maintain a consistent brand identity — logo, colors, typography, tone — generate an average of 33% more revenue. A solid brand book is the highest-ROI investment you can make."
                    : "Según Lucidpress (2019), las empresas que mantienen una identidad de marca coherente generan en promedio un 33% más de ingresos. Un libro de marca sólido es la inversión con mayor retorno que puede hacer."}
                </p>
              </div>

              {/* Stat 2 — Visuels professionnels & réseaux sociaux */}
              <div className="p-5 rounded-xl" style={{ backgroundColor: "#FFFFFF", border: "1px solid rgba(87,98,162,0.20)" }}>
                <p className="font-bold text-4xl mb-2" style={{ color: "#5762A2" }}>40×</p>
                <p className="font-semibold text-sm mb-3" style={{ color: "#1D1D1B" }}>
                  {isFR ? "Plus de partages sur les réseaux" : isEN ? "More shares on social media" : "Más compartidos en redes sociales"}
                </p>
                <p className="text-sm leading-relaxed" style={{ color: "rgba(29,29,27,0.60)" }}>
                  {isFR
                    ? "HubSpot rapporte que les publications accompagnées de visuels professionnels sont partagées 40 fois plus sur les réseaux sociaux que les textes seuls. Une photo bien cadrée ou un graphisme de marque cohérent, c'est ce qui transforme un scroll en arrêt."
                    : isEN
                    ? "HubSpot reports that posts with professional visuals are shared 40 times more on social media than text-only content. A well-framed photo or consistent brand graphic is what turns a scroll into a stop."
                    : "HubSpot reporta que las publicaciones con visuales profesionales se comparten 40 veces más en redes sociales que el texto solo. Una foto bien encuadrada o un gráfico de marca coherente es lo que convierte un scroll en una pausa."}
                </p>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* ── TARIFICATION ── */}
      <section className="py-20 px-6" style={{ backgroundColor: "#FFFFFF" }}>
        <div className="max-w-5xl mx-auto">
          <p
            className="text-xs font-bold tracking-widest uppercase mb-3"
            style={{ color: "#5762A2" }}
          >
            {isFR ? "Aperçu des tarifs" : isEN ? "Pricing overview" : "Vista de precios"}
          </p>
          <h2
            className="text-3xl font-bold mb-4"
            style={{
              color: "#1D1D1B",
              fontFamily: "var(--font-display, 'Gotham', 'Montserrat', system-ui)",
            }}
          >
            {isFR
              ? "Des tarifs taillés pour la région"
              : isEN
              ? "Pricing built for the region"
              : "Precios hechos para la región"}
          </h2>
          <p
            className="text-base leading-relaxed mb-12 max-w-2xl"
            style={{ color: "rgba(29,29,27,0.65)" }}
          >
            {isFR
              ? "Une marque professionnelle n'est pas réservée aux grandes entreprises. Nos forfaits s'adressent aux artisans, commerçants et entrepreneurs d'ici — avec la transparence d'une poignée de main."
              : isEN
              ? "A professional brand isn't reserved for big companies. Our packages are designed for local artisans, merchants and entrepreneurs — with the transparency of a handshake."
              : "Una marca profesional no está reservada para grandes empresas. Nuestros paquetes están diseñados para artesanos, comerciantes y emprendedores locales — con la transparencia de un apretón de manos."}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">

            {/* Identité de marque */}
            <div
              className="p-6 rounded-xl border-l-4 flex flex-col gap-4"
              style={{ borderLeftColor: "#5762A2", backgroundColor: "#F4F4F0" }}
            >
              <h3 className="font-bold text-base" style={{ color: "#5762A2" }}>
                {isFR ? "Identité de marque" : isEN ? "Brand identity" : "Identidad de marca"}
              </h3>
              <ul className="flex flex-col gap-2 flex-1">
                {(isFR
                  ? [
                      ["Signature Locale", "logo + palette + guide", "dès 450 $"],
                      ["Identité Complète", "+ gabarits + carte d'affaires", "dès 900 $"],
                      ["Refonte de marque", "", "dès 600 $"],
                    ]
                  : isEN
                  ? [
                      ["Local Signature", "logo + palette + guide", "from $450"],
                      ["Full Identity", "+ templates + business card", "from $900"],
                      ["Brand refresh", "", "from $600"],
                    ]
                  : [
                      ["Firma Local", "logo + paleta + guía", "desde $450"],
                      ["Identidad Completa", "+ plantillas + tarjeta", "desde $900"],
                      ["Renovación de marca", "", "desde $600"],
                    ]
                ).map(([titre, detail, prix], i) => (
                  <li key={i} className="text-sm" style={{ color: "rgba(29,29,27,0.70)" }}>
                    <span className="font-semibold" style={{ color: "#1D1D1B" }}>{titre}</span>
                    {detail && <span className="text-xs"> — {detail}</span>}
                    <span className="block font-bold mt-0.5" style={{ color: "#5762A2" }}>{prix}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Photographie & Communication */}
            <div
              className="p-6 rounded-xl border-l-4 flex flex-col gap-4"
              style={{ borderLeftColor: "#5762A2", backgroundColor: "#F4F4F0" }}
            >
              <h3 className="font-bold text-base" style={{ color: "#5762A2" }}>
                {isFR ? "Photographie & Communication" : isEN ? "Photography & Print" : "Fotografía & Comunicación"}
              </h3>
              <ul className="flex flex-col gap-2 flex-1">
                {(isFR
                  ? [
                      ["Séance produits", "20 photos livrées", "dès 275 $"],
                      ["Séance entreprise", "équipe + espace", "dès 450 $"],
                      ["Carte d'affaires, pamphlet, dépliant", "", "dès 125 $"],
                    ]
                  : isEN
                  ? [
                      ["Product session", "20 photos delivered", "from $275"],
                      ["Business session", "team + space", "from $450"],
                      ["Business card, flyer, brochure", "", "from $125"],
                    ]
                  : [
                      ["Sesión de productos", "20 fotos entregadas", "desde $275"],
                      ["Sesión empresarial", "equipo + espacio", "desde $450"],
                      ["Tarjeta, folleto, díptico", "", "desde $125"],
                    ]
                ).map(([titre, detail, prix], i) => (
                  <li key={i} className="text-sm" style={{ color: "rgba(29,29,27,0.70)" }}>
                    <span className="font-semibold" style={{ color: "#1D1D1B" }}>{titre}</span>
                    {detail && <span className="text-xs"> — {detail}</span>}
                    <span className="block font-bold mt-0.5" style={{ color: "#5762A2" }}>{prix}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Médias sociaux */}
            <div
              className="p-6 rounded-xl border-l-4 flex flex-col gap-4"
              style={{ borderLeftColor: "#5762A2", backgroundColor: "#F4F4F0" }}
            >
              <h3 className="font-bold text-base" style={{ color: "#5762A2" }}>
                {isFR ? "Médias sociaux" : isEN ? "Social media" : "Redes sociales"}
              </h3>
              <ul className="flex flex-col gap-2 flex-1">
                {(isFR
                  ? [
                      ["Présence Essentielle", "FB + Instagram", "399 $ / mois"],
                      ["Présence Active", "multi-plateformes + vidéo", "699 $ / mois"],
                      ["Présence Complète", "écosystème + book postal", "1 099 $ / mois"],
                    ]
                  : isEN
                  ? [
                      ["Essential Presence", "FB + Instagram", "$399 / month"],
                      ["Active Presence", "multi-platform + video", "$699 / month"],
                      ["Full Presence", "ecosystem + postal book", "$1,099 / month"],
                    ]
                  : [
                      ["Presencia Esencial", "FB + Instagram", "$399 / mes"],
                      ["Presencia Activa", "multiplataforma + video", "$699 / mes"],
                      ["Presencia Completa", "ecosistema + book postal", "$1.099 / mes"],
                    ]
                ).map(([titre, detail, prix], i) => (
                  <li key={i} className="text-sm" style={{ color: "rgba(29,29,27,0.70)" }}>
                    <span className="font-semibold" style={{ color: "#1D1D1B" }}>{titre}</span>
                    {detail && <span className="text-xs"> — {detail}</span>}
                    <span className="block font-bold mt-0.5" style={{ color: "#5762A2" }}>{prix}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/contacts"
              className="px-8 py-3 rounded-lg font-bold text-sm transition text-center"
              style={{ backgroundColor: "#5762A2", color: "#F4F4F0" }}
            >
              {isFR ? "Parlons de votre projet" : isEN ? "Let's talk about your project" : "Hablemos de su proyecto"}
            </Link>
            <Link
              href="/tarification"
              className="px-8 py-3 rounded-lg font-bold text-sm border transition text-center"
              style={{ borderColor: "rgba(87,98,162,0.40)", color: "#5762A2" }}
            >
              {isFR ? "Voir la tarification complète →" : isEN ? "View full pricing →" : "Ver precios completos →"}
            </Link>
          </div>
        </div>
      </section>

      {/* ── CTA FINAL ── */}
      <section
        className="py-20 px-6 text-center"
        style={{ backgroundColor: "#1D1D1B" }}
      >
        <div className="max-w-2xl mx-auto">
          <h2
            className="text-3xl font-bold mb-4"
            style={{
              color: "#F4F4F0",
              fontFamily: "var(--font-display, 'Gotham', 'Montserrat', system-ui)",
            }}
          >
            {ctaTitre}
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <Link
              href="/contacts"
              className="px-10 py-4 rounded-lg font-bold text-lg transition"
              style={{ backgroundColor: "#5762A2", color: "#F4F4F0" }}
            >
              {ctaBouton}
            </Link>
            <Link
              href="/divisions"
              className="px-8 py-4 rounded-lg font-bold text-sm border transition"
              style={{
                borderColor: "rgba(244,244,240,0.40)",
                color: "#F4F4F0",
              }}
            >
              {ctaRetour}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
