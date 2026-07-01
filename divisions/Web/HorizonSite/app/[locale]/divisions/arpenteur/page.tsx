import type { Metadata } from "next";
import { useTranslations, useLocale } from "next-intl";
import { getLocale } from "next-intl/server";
import Image from "next/image";
import { Link } from "@/i18n/navigation";

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
  const org = locale === "en" ? "Boreal Star Group" : locale === "es" ? "Grupo Estrella Boreal" : "Groupe Étoile Boréale";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name:
      locale === "en" ? "Arpenteur Division — Brand Design & Photography"
      : locale === "es" ? "División Arpenteur — Diseño de Marca & Fotografía"
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
    fr: { titre: "Livre de marque", desc: "Charte complète : couleurs, typographie, ton éditorial, règles d'utilisation du logo et exemples d'application. Votre identité, cohérente partout." },
    en: { titre: "Brand Book", desc: "Complete brand guide: colors, typography, editorial tone, logo usage rules and application examples. Your identity, consistent everywhere." },
    es: { titre: "Libro de marca", desc: "Guía de marca completa: colores, tipografía, tono editorial, reglas de uso del logotipo y ejemplos de aplicación." },
  },
  {
    fr: { titre: "Identité visuelle & logo", desc: "Conception de logos originaux, sélection de palette et système de marks. Une marque qui se démarque et qui dure." },
    en: { titre: "Visual identity & logo", desc: "Original logo design, color palette selection and mark system. A brand that stands out and lasts." },
    es: { titre: "Identidad visual & logotipo", desc: "Diseño de logotipos originales, selección de paleta y sistema de marcas." },
  },
  {
    fr: { titre: "Infographie & gabarits", desc: "Publications pour réseaux sociaux, présentations, dépliants, affiches — aux couleurs de votre marque, prêts à l'emploi." },
    en: { titre: "Graphic design & templates", desc: "Social media posts, presentations, flyers, posters — in your brand colors, ready to use." },
    es: { titre: "Diseño gráfico & plantillas", desc: "Publicaciones para redes sociales, presentaciones, folletos, carteles — en los colores de su marca." },
  },
  {
    fr: { titre: "Photographie professionnelle", desc: "Photos d'équipe, d'ambiance et de produits. Paulina Jaramillo (DG Photographie) se déplace chez vous pour capturer l'essence de votre entreprise." },
    en: { titre: "Professional photography", desc: "Team, lifestyle and product photos. Paulina Jaramillo (Photography Director) visits your location to capture the essence of your business." },
    es: { titre: "Fotografía profesional", desc: "Fotos de equipo, ambiente y productos. Paulina Jaramillo (Directora de Fotografía) visita su local para capturar la esencia de su empresa." },
  },
  {
    fr: { titre: "Stratégie médias sociaux", desc: "Calendrier éditorial, création de contenu visuel, gestion de communauté. Votre présence en ligne, ancrée dans votre marque." },
    en: { titre: "Social media strategy", desc: "Editorial calendar, visual content creation, community management. Your online presence, rooted in your brand." },
    es: { titre: "Estrategia de redes sociales", desc: "Calendario editorial, creación de contenido visual, gestión de comunidad." },
  },
  {
    fr: { titre: "Imprimés & papeterie de marque", desc: "Cartes d'affaires, en-têtes de lettres, enveloppes, agendas — en partenariat avec des imprimeurs locaux de la région." },
    en: { titre: "Print & brand stationery", desc: "Business cards, letterheads, envelopes, agendas — in partnership with local printers in the region." },
    es: { titre: "Impresos & papelería de marca", desc: "Tarjetas de presentación, membrete, sobres, agendas — en asociación con impresores locales." },
  },
];

// ─────────────────────────────────────────────────────────
// Page principale — Division Arpenteur
// ─────────────────────────────────────────────────────────
export default function ArpenteurPage() {
  const locale = useLocale();

  // Contenu selon la langue
  const isFR = locale === "fr";
  const isEN = locale === "en";

  const heroTitre = isFR ? "Division Arpenteur"
    : isEN ? "Arpenteur Division"
    : "División Arpenteur";

  const heroTagline = isFR ? "Graphisme · Livre de Marque · Photographie"
    : isEN ? "Brand Design · Visual Identity · Photography"
    : "Diseño Gráfico · Identidad de Marca · Fotografía";

  const heroDesc = isFR
    ? "Comme l'arpenteur trace les frontières d'un territoire avant que quiconque ne le bâtisse, la Division Arpenteur trace votre identité avant que votre entreprise ne prenne son envol. Nous définissons votre marque avec la précision d'un levé topographique et la vision d'un explorateur."
    : isEN
    ? "As the surveyor traces the boundaries of a territory before anyone builds on it, Arpenteur Division traces your brand identity before your business takes flight. We define your brand with the precision of a topographic survey and the vision of an explorer."
    : "Como el topógrafo traza los límites de un territorio antes de que alguien construya en él, la División Arpenteur traza su identidad de marca. Definimos su marca con la precisión de un levantamiento topográfico y la visión de un explorador.";

  const avantage = isFR
    ? "L'avantage Étoile Boréale"
    : isEN ? "The Boreal Star Advantage"
    : "La ventaja Estrella Boreal";

  const avantageDesc = isFR
    ? "Une directrice marketing certifiée qui travaille directement sur votre dossier — pas une agence intermédiaire. Expertise photographique sur le terrain, ancrage régional, tarifs proportionnels à la réalité des entrepreneurs d'ici. Nous livrons des marques cohérentes, pas des logos isolés."
    : isEN
    ? "A certified marketing director who works directly on your file — no intermediary agency. On-site photography expertise, regional roots, rates proportionate to local entrepreneurs' reality. We deliver coherent brands, not isolated logos."
    : "Una directora de marketing certificada que trabaja directamente en su proyecto. Experiencia fotográfica sobre el terreno, arraigo regional, tarifas proporcionales a la realidad emprendedora local.";

  const loreTitle = isFR
    ? "L'héritage des arpenteurs"
    : isEN ? "The Surveyors' Heritage"
    : "El legado de los agrimensores";

  const loreFigure = isFR ? "Jean Bourdon (1601–1668)" : "Samuel Holland (1728–1801)";

  const loreText = isFR
    ? [
        "En 1634, Jean Bourdon débarque en Nouvelle-France avec une mission précise : mesurer, cartographier, comprendre le territoire avant tout autre geste. Il deviendra le premier Procureur général de la Nouvelle-France et tracera les premières rues de la ville de Québec — des lignes qui existent encore aujourd'hui.",
        "Bourdon n'avait pas de GPS. Pas de satellite. Seulement une chaîne d'arpenteur, un théodolite rudimentaire et une capacité extraordinaire à lire le terrain. Il savait qu'avant de bâtir, il faut d'abord comprendre. Avant de construire une route, il faut en voir le tracé.",
        "C'est cet esprit que la Division Arpenteur porte : la conviction que définir avec précision — une identité, une couleur, un ton, une typographie — c'est poser les fondations de tout ce qui vient après.",
      ]
    : isEN
    ? [
        "Born in The Hague in 1728, Samuel Holland came to North America as a military engineer. After the Battle of the Plains of Abraham (1759), he became the first Surveyor General of the Northern District of North America — tasked with mapping a continent.",
        "Holland brought astronomical precision to his surveys. He worked alongside James Cook, helped lay out Prince Edward Island's lot system, and produced maps that shaped how British North America understood itself. He once said that the surveyor's job was to give the land a language.",
        "Arpenteur Division carries that same mission: giving your brand a language — colors, marks, typography — so precise and intentional that every touchpoint tells the same story.",
      ]
    : [
        "Nacido en La Haya en 1728, Samuel Holland llegó a América del Norte como ingeniero militar. Tras la Batalla de las Llanuras de Abraham (1759), se convirtió en el primer Agrimensor General del Distrito Norte de América del Norte.",
        "Holland aportó precisión astronómica a sus levantamientos. Colaboró con James Cook, contribuyó a diseñar el sistema de lotes de la Isla del Príncipe Eduardo y produjo mapas que definieron cómo la América del Norte británica se comprendía a sí misma.",
        "La División Arpenteur lleva esa misma misión: dar a su marca un lenguaje — colores, marcas, tipografía — tan preciso e intencional que cada punto de contacto cuente la misma historia.",
      ];

  const ctaTitre = isFR
    ? "Prêt à tracer votre identité ?"
    : isEN ? "Ready to chart your identity?"
    : "¿Listo para trazar su identidad?";

  const ctaBouton = isFR
    ? "Parler à notre équipe"
    : isEN ? "Talk to our team"
    : "Hablar con nuestro equipo";

  const ctaRetour = isFR
    ? "← Toutes les divisions"
    : isEN ? "← All divisions"
    : "← Todas las divisiones";

  const servicesTitle = isFR ? "Ce que nous faisons"
    : isEN ? "What we do"
    : "Lo que hacemos";

  const avantageItems = isFR
    ? ["Livre de marque complet livré en PDF + sources éditables", "Photos professionnelles sur le terrain (déplacement inclus)", "Gabarits réseaux sociaux prêts à l'emploi (FR/EN)", "Cohérence garantie entre print et numérique", "Révisions incluses — nous peaufinons jusqu'à ce que ce soit juste"]
    : isEN
    ? ["Complete brand book delivered in PDF + editable sources", "Professional on-site photography (travel included)", "Ready-to-use social media templates (FR/EN)", "Guaranteed consistency between print and digital", "Revisions included — we refine until it's right"]
    : ["Libro de marca completo entregado en PDF + fuentes editables", "Fotografía profesional in situ (desplazamiento incluido)", "Plantillas de redes sociales listas para usar", "Coherencia garantizada entre impreso y digital", "Revisiones incluidas"];

  return (
    <>
      <ArpenteurJsonLd />

      {/* ── HERO ── */}
      {/* marginTop -80px couvre le pt-20 du wrapper main (body Space Black) */}
      <section
        className="relative px-6"
        style={{ backgroundColor: "#5762A2", marginTop: "-80px", paddingTop: "176px", paddingBottom: "96px" }}
      >
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row items-start gap-10">
            <div className="flex-shrink-0">
              <Image
                src="/mark-nordik.svg"
                alt="Mark Division Arpenteur"
                width={110}
                height={110}
                style={{ width: "110px", height: "110px", filter: "brightness(0) invert(1)" }}
              />
            </div>
            <div>
              <p className="text-xs font-bold tracking-widest uppercase mb-3" style={{ color: "rgba(244,244,240,0.60)" }}>
                {heroTagline}
              </p>
              <h1
                className="text-4xl md:text-5xl font-bold mb-6"
                style={{ color: "#F4F4F0", fontFamily: "var(--font-display, 'Gotham', 'Montserrat', system-ui)" }}
              >
                {heroTitre}
              </h1>
              <p className="text-lg leading-relaxed max-w-2xl" style={{ color: "rgba(244,244,240,0.82)" }}>
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
            style={{ color: "#5762A2", fontFamily: "var(--font-display, 'Gotham', 'Montserrat', system-ui)" }}
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
                  style={{ borderLeftColor: "#5762A2", backgroundColor: "#F4F4F0" }}
                >
                  <h3
                    className="font-bold text-base mb-2"
                    style={{ color: "#5762A2" }}
                  >
                    {sLocale.titre}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: "rgba(29,29,27,0.65)" }}>
                    {sLocale.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── LORE — Jean Bourdon (FR) / Samuel Holland (EN/ES) ── */}
      <section className="py-20 px-6" style={{ backgroundColor: "#E8EAF6" }}>
        <div className="max-w-4xl mx-auto">
          <p
            className="text-xs font-bold tracking-widest uppercase mb-3"
            style={{ color: "#5762A2" }}
          >
            {loreTitle}
          </p>
          <h2
            className="text-3xl font-bold mb-10"
            style={{ color: "#1D1D1B", fontFamily: "var(--font-display, 'Gotham', 'Montserrat', system-ui)" }}
          >
            {loreFigure}
          </h2>
          <div className="space-y-5">
            {loreText.map((p, i) => (
              <p key={i} className="text-base leading-relaxed scroll-fade" style={{ color: "rgba(29,29,27,0.75)" }}>
                {p}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* ── AVANTAGE ── */}
      <section className="py-20 px-6" style={{ backgroundColor: "#FFFFFF" }}>
        <div className="max-w-4xl mx-auto">
          <div
            className="p-8 rounded-xl border-l-4"
            style={{ borderLeftColor: "#5762A2", backgroundColor: "#F4F4F0" }}
          >
            <h2
              className="text-2xl font-bold mb-4"
              style={{ color: "#5762A2", fontFamily: "var(--font-display, 'Gotham', 'Montserrat', system-ui)" }}
            >
              {avantage}
            </h2>
            <p className="text-base leading-relaxed mb-6" style={{ color: "rgba(29,29,27,0.70)" }}>
              {avantageDesc}
            </p>
            <ul className="space-y-2">
              {avantageItems.map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-sm" style={{ color: "rgba(29,29,27,0.65)" }}>
                  <span style={{ color: "#5762A2" }}>✓</span> {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── CTA FINAL ── */}
      <section className="py-20 px-6 text-center" style={{ backgroundColor: "#1D1D1B" }}>
        <div className="max-w-2xl mx-auto">
          <h2
            className="text-3xl font-bold mb-4"
            style={{ color: "#F4F4F0", fontFamily: "var(--font-display, 'Gotham', 'Montserrat', system-ui)" }}
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
              style={{ borderColor: "rgba(244,244,240,0.40)", color: "#F4F4F0" }}
            >
              {ctaRetour}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
