import type { Metadata } from "next";
import { useTranslations, useLocale } from "next-intl";
import Image from "next/image";
import { Link } from "@/i18n/navigation";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const titles: Record<string, string> = {
    fr: "Alexandra Espin — Directrice Communications | Groupe Étoile Boréale",
    en: "Alexandra Espin — Communications Director | Boreal Star Group",
    es: "Alexandra Espin — Directora de Comunicaciones | Grupo Estrella Boreal",
  };
  const descriptions: Record<string, string> = {
    fr: "Depuis plus de quinze ans, Alexandra Espin-Espinoza accompagne des organisations dans leurs communications et leur développement stratégique. Directrice Communications de Groupe Étoile Boréale.",
    en: "For over fifteen years, Alexandra Espin-Espinoza has supported organizations in their communications and strategic development. Communications Director at Boreal Star Group.",
    es: "Durante más de quince años, Alexandra Espin-Espinoza ha acompañado a organizaciones en sus comunicaciones y desarrollo estratégico. Directora de Comunicaciones de Grupo Estrella Boreal.",
  };
  const baseUrl = locale === "en" ? "https://borealstar.ca" : "https://etoileboreale.ca";
  const canonical = `${baseUrl}${locale === "fr" ? "" : `/${locale}`}/equipe/alexandra-espin`;
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
// Contenu biographique — FR / EN / ES
// ─────────────────────────────────────────────────────────
const bio = {
  fr: {
    p1: "Alexandra Espin-Espinoza est fascinée par la transformation. Celle des idées en projets, des organisations en communautés et des équipes en véritables moteurs d'innovation. Depuis plus de quinze ans, elle accompagne des organisations dans leurs communications et leur développement stratégique, convaincue que les changements durables reposent d'abord sur la confiance, la collaboration et une vision partagée.",
    p2: "Elle aime réunir des expertises complémentaires, créer des ponts entre les personnes et faire émerger une synergie qui permet à chacun de contribuer au meilleur de lui-même. Pour elle, une stratégie réussie n'est jamais celle d'une seule personne : c'est une œuvre collective, portée par des talents qui avancent dans la même direction.",
    p3: "Chez Étoile Boréale, elle accompagne le développement de la marque, des communications et de l'expérience client afin que la vision de l'entreprise se reflète dans chaque détail. Son ambition est de bâtir un espace où la technologie, la créativité et les relations humaines avancent de concert.",
    quote: "Une stratégie réussie n'est jamais celle d'une seule personne : c'est une œuvre collective, portée par des talents qui avancent dans la même direction.",
  },
  en: {
    p1: "Alexandra Espin-Espinoza is fascinated by transformation. The transformation of ideas into projects, organizations into communities, and teams into true engines of innovation. For more than fifteen years, she has supported organizations in their communications and strategic development, convinced that lasting change rests first on trust, collaboration, and a shared vision.",
    p2: "She loves bringing together complementary expertise, creating bridges between people, and fostering a synergy that allows each person to contribute their best. For her, a successful strategy is never the work of a single person: it is a collective achievement, carried by talents moving in the same direction.",
    p3: "At Étoile Boréale, she supports the development of the brand, communications, and customer experience so that the company's vision is reflected in every detail. Her ambition is to build a space where technology, creativity, and human relationships advance together.",
    quote: "A successful strategy is never the work of a single person: it is a collective achievement, carried by talents moving in the same direction.",
  },
  es: {
    p1: "Alexandra Espin-Espinoza está fascinada por la transformación. La de las ideas en proyectos, la de las organizaciones en comunidades y la de los equipos en verdaderos motores de innovación. Durante más de quince años, ha acompañado a organizaciones en sus comunicaciones y desarrollo estratégico, convencida de que los cambios duraderos se apoyan primero en la confianza, la colaboración y una visión compartida.",
    p2: "Le encanta reunir expertises complementarias, crear puentes entre las personas y hacer emerger una sinergia que permita a cada uno contribuir con lo mejor de sí mismo. Para ella, una estrategia exitosa nunca es obra de una sola persona: es una obra colectiva, impulsada por talentos que avanzan en la misma dirección.",
    p3: "En Étoile Boréale, acompaña el desarrollo de la marca, las comunicaciones y la experiencia del cliente para que la visión de la empresa se refleje en cada detalle. Su ambición es construir un espacio donde la tecnología, la creatividad y las relaciones humanas avancen juntas.",
    quote: "Una estrategia exitosa nunca es obra de una sola persona: es una obra colectiva, impulsada por talentos que avanzan en la misma dirección.",
  },
};

const roles = [
  {
    titre: { fr: "Directrice Communications", en: "Communications Director", es: "Directora de Comunicaciones" },
    desc: {
      fr: "Stratégie de marque, communications externes, développement de l'expérience client Étoile Boréale.",
      en: "Brand strategy, external communications, and customer experience development for Étoile Boréale.",
      es: "Estrategia de marca, comunicaciones externas y desarrollo de la experiencia del cliente de Étoile Boréale.",
    },
    couleur: "#5762A2",
  },
  {
    titre: { fr: "Révision EN & ES", en: "EN & ES Content Review", es: "Revisión de contenidos EN & ES" },
    desc: {
      fr: "Révision et validation de tous les contenus anglais et espagnols — site, communications, publications.",
      en: "Review and validation of all English and Spanish content — website, communications, publications.",
      es: "Revisión y validación de todos los contenidos en inglés y español — sitio web, comunicaciones, publicaciones.",
    },
    couleur: "#5762A2",
  },
  {
    titre: { fr: "Développement stratégique", en: "Strategic Development", es: "Desarrollo Estratégico" },
    desc: {
      fr: "Partenariats, relations d'affaires et développement organisationnel au sein de l'écosystème Étoile Boréale.",
      en: "Partnerships, business relations, and organizational development within the Étoile Boréale ecosystem.",
      es: "Alianzas, relaciones de negocios y desarrollo organizacional dentro del ecosistema Étoile Boréale.",
    },
    couleur: "#5762A2",
  },
];

// ─────────────────────────────────────────────────────────
// Page — Alexandra Espin
// ─────────────────────────────────────────────────────────
export default function AlexandraEspinPage() {
  const t = useTranslations("home");
  const locale = useLocale();
  const content = bio[locale as keyof typeof bio] ?? bio.fr;

  return (
    <main>

      {/* ── HERO ── */}
      <section
        className="px-6 pb-16 text-center"
        style={{ backgroundColor: "#1D1D1B", paddingTop: "120px" }}
      >
        <div className="max-w-4xl mx-auto mb-10 text-left">
          <Link
            href="/#equipe"
            className="text-xs font-bold uppercase tracking-widest transition"
            style={{ color: "rgba(244,244,240,0.40)" }}
          >
            ← {t("team.title")}
          </Link>
        </div>

        <div className="max-w-4xl mx-auto flex flex-col items-center gap-6">
          <div
            className="w-40 h-40 rounded-full border-4 overflow-hidden shrink-0"
            style={{ borderColor: "#5762A2" }}
          >
            <Image
              src="/photos_images/alexandra-espin.jpg"
              alt="Alexandra Espin — Directrice Communications, Groupe Étoile Boréale"
              width={160}
              height={160}
              className="w-full h-full object-cover object-top"
              priority
            />
          </div>

          <div>
            <h1
              className="text-4xl md:text-5xl font-bold mb-3"
              style={{
                color: "#F4F4F0",
                fontFamily: "var(--font-display, 'Urbanist', 'Montserrat', system-ui)",
              }}
            >
              Alexandra Marcela Espin Espinoza
            </h1>
            <p className="text-base font-bold mb-1" style={{ color: "#5762A2" }}>
              {t("team.members.alexandra.titre")}
            </p>
            <p className="text-sm" style={{ color: "rgba(244,244,240,0.40)" }}>
              Groupe Étoile Boréale · Division Arpenteur
            </p>
          </div>
        </div>
      </section>

      {/* ── PARCOURS ── */}
      <section className="py-20 px-6" style={{ backgroundColor: "#FFFFFF" }}>
        <div className="max-w-3xl mx-auto">
          <p
            className="text-xs font-bold uppercase tracking-widest mb-4"
            style={{ color: "#5762A2" }}
          >
            Parcours
          </p>

          <div className="space-y-6 text-lg leading-relaxed" style={{ color: "rgba(29,29,27,0.75)" }}>
            <p>{content.p1}</p>
            <p>{content.p2}</p>
            <p>{content.p3}</p>
          </div>

          <blockquote
            className="border-l-4 pl-6 mt-10 italic text-base"
            style={{ borderColor: "#5762A2", color: "rgba(29,29,27,0.50)" }}
          >
            {content.quote}
          </blockquote>
        </div>
      </section>

      {/* ── RÔLES ── */}
      <section className="py-16 px-6" style={{ backgroundColor: "#F4F4F0" }}>
        <div className="max-w-3xl mx-auto">
          <p
            className="text-xs font-bold uppercase tracking-widest mb-8 text-center"
            style={{ color: "rgba(29,29,27,0.40)" }}
          >
            Rôles & expertises
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {roles.map((r) => (
              <div
                key={r.titre.fr}
                className="p-5 rounded-xl border-l-4"
                style={{ borderLeftColor: r.couleur, backgroundColor: "#FFFFFF" }}
              >
                <h3 className="text-sm font-bold mb-2" style={{ color: r.couleur }}>
                  {r.titre.fr}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: "rgba(29,29,27,0.60)" }}>
                  {r.desc.fr}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTAs ── */}
      <section className="py-16 px-6 text-center" style={{ backgroundColor: "#1D1D1B" }}>
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/#equipe"
            className="px-7 py-3 rounded-lg font-semibold text-sm border transition"
            style={{ borderColor: "rgba(244,244,240,0.25)", color: "rgba(244,244,240,0.80)" }}
          >
            ← {t("team.title")}
          </Link>
          <Link
            href="/contacts"
            className="px-7 py-3 rounded-lg font-semibold text-sm transition"
            style={{ backgroundColor: "#5762A2", color: "#F4F4F0" }}
          >
            {t("cta_contact")}
          </Link>
        </div>
      </section>

    </main>
  );
}
