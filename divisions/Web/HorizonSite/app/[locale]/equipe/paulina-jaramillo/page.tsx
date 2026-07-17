import type { Metadata } from "next";
import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import Image from "next/image";

// ─────────────────────────────────────────────────────────
// Bio trilingue — Paulina Jaramillo
// ─────────────────────────────────────────────────────────
const bio = {
  fr: {
    p1: "Pour Paulina, le design est bien plus qu'une profession : c'est l'art de transformer une idée en une identité forte et mémorable.",
    p2: "Graphiste de formation, elle cumule plus de 14 ans d'expérience en image de marque, design éditorial, photographie professionnelle et campagnes publicitaires. Aujourd'hui, son expertise s'étend également au design UX/UI, lui permettant de concevoir des expériences numériques intuitives qui allient créativité, stratégie et fonctionnalité.",
    p3: "À son arrivée au Québec, elle est rapidement tombée sous le charme de la langue française, de l'histoire et de la culture québécoise. Cette admiration est devenue un véritable engagement : contribuer au développement des entrepreneurs de sa région d'adoption en mettant son savoir-faire au service de leurs ambitions.",
    quote: "Derrière chaque entreprise se cache une vision. Mon rôle est de lui donner une identité qui inspire confiance, attire les bonnes personnes et accompagne sa croissance.",
    parcoursLabel: "Parcours",
    roles: [
      {
        titre: "Directrice — Division Arpenteur",
        desc: "Direction de l'identité de marque, de la photographie professionnelle, de la stratégie visuelle et de l'expérience numérique — 14 ans+ d'expertise.",
        couleur: "#5762A2",
      },
      {
        titre: "Graphiste & Photographe",
        desc: "Image de marque, design éditorial, photographie de terrain et campagnes publicitaires pour les PME régionales.",
        couleur: "#0099D1",
      },
      {
        titre: "Design UX/UI",
        desc: "Conception d'expériences numériques intuitives qui allient créativité, stratégie et fonctionnalité.",
        couleur: "#C9A84C",
      },
    ],
  },
  en: {
    p1: "For Paulina, design is far more than a profession: it is the art of transforming an idea into a strong, memorable identity.",
    p2: "A trained graphic designer, she brings over 14 years of experience in brand identity, editorial design, professional photography and advertising campaigns. Today, her expertise extends to UX/UI design, allowing her to create intuitive digital experiences that blend creativity, strategy and functionality.",
    p3: "When she arrived in Quebec, she quickly fell under the spell of the French language, history and culture of Quebec. This admiration became a true commitment: to contribute to the development of entrepreneurs in her adopted region by putting her expertise at the service of their ambitions.",
    quote: "Behind every business lies a vision. My role is to give it an identity that inspires confidence, attracts the right people and supports its growth.",
    parcoursLabel: "Background",
    roles: [
      {
        titre: "Director — Division Arpenteur",
        desc: "Leading brand identity, professional photography, visual strategy and digital experience — 14+ years of expertise.",
        couleur: "#5762A2",
      },
      {
        titre: "Graphic Designer & Photographer",
        desc: "Brand identity, editorial design, field photography and advertising campaigns for regional businesses.",
        couleur: "#0099D1",
      },
      {
        titre: "UX/UI Design",
        desc: "Creating intuitive digital experiences that blend creativity, strategy and functionality.",
        couleur: "#C9A84C",
      },
    ],
  },
  es: {
    p1: "Para Paulina, el diseño es mucho más que una profesión: es el arte de transformar una idea en una identidad fuerte y memorable.",
    p2: "Diseñadora gráfica de formación, acumula más de 14 años de experiencia en imagen de marca, diseño editorial, fotografía profesional y campañas publicitarias. Hoy, su experiencia se extiende también al diseño UX/UI, lo que le permite crear experiencias digitales intuitivas que combinan creatividad, estrategia y funcionalidad.",
    p3: "A su llegada a Quebec, quedó rápidamente encantada con el idioma francés, la historia y la cultura quebequense. Esta admiración se convirtió en un verdadero compromiso: contribuir al desarrollo de los emprendedores de su región adoptiva poniendo su saber hacer al servicio de sus ambiciones.",
    quote: "Detrás de cada empresa se esconde una visión. Mi rol es darle una identidad que inspire confianza, atraiga a las personas correctas y acompañe su crecimiento.",
    parcoursLabel: "Trayectoria",
    roles: [
      {
        titre: "Directora — División Arpenteur",
        desc: "Dirección de identidad de marca, fotografía profesional, estrategia visual y experiencia digital — 14 años+ de experiencia.",
        couleur: "#5762A2",
      },
      {
        titre: "Diseñadora Gráfica & Fotógrafa",
        desc: "Imagen de marca, diseño editorial, fotografía de campo y campañas publicitarias para pymes regionales.",
        couleur: "#0099D1",
      },
      {
        titre: "Diseño UX/UI",
        desc: "Creación de experiencias digitales intuitivas que combinan creatividad, estrategia y funcionalidad.",
        couleur: "#C9A84C",
      },
    ],
  },
};

// ─────────────────────────────────────────────────────────
// Metadata SEO — Paulina Jaramillo
// ─────────────────────────────────────────────────────────
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const titles: Record<string, string> = {
    fr: "Paulina Jaramillo — Directrice Division Arpenteur | Groupe Étoile Boréale",
    en: "Paulina Jaramillo — Director, Division Arpenteur | Boreal Star Group",
    es: "Paulina Jaramillo — Directora División Arpenteur | Grupo Estrella Boreal",
  };
  const descriptions: Record<string, string> = {
    fr: "Directrice de la Division Arpenteur, Paulina Jaramillo cumule 14 ans d'expérience en image de marque, photographie professionnelle, design éditorial et UX/UI — au service des entrepreneurs du Québec.",
    en: "Director of Division Arpenteur, Paulina Jaramillo brings 14 years of experience in brand identity, professional photography, editorial design and UX/UI — serving Quebec's entrepreneurs.",
    es: "Directora de la División Arpenteur, Paulina Jaramillo aporta 14 años de experiencia en imagen de marca, fotografía profesional, diseño editorial y UX/UI — al servicio de los emprendedores de Quebec.",
  };
  const baseUrl = locale === "en" ? "https://borealstar.ca" : "https://etoileboreale.ca";
  const canonical = `${baseUrl}${locale === "fr" ? "" : `/${locale}`}/equipe/paulina-jaramillo`;
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
// Page — Paulina Jaramillo
// ─────────────────────────────────────────────────────────
export default function PaulinaJaramilloPage() {
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
              src="/photos_images/paulina-jaramillo.jpg"
              alt="Paulina Jaramillo"
              width={160}
              height={160}
              className="w-full h-full object-cover object-top"
            />
          </div>

          <div>
            <h1
              className="text-4xl md:text-5xl font-bold mb-3"
              style={{
                color: "#F4F4F0",
                fontFamily: "var(--font-display, 'Gotham', 'Montserrat', system-ui)",
              }}
            >
              Paulina Jaramillo
            </h1>
            <p className="text-base font-bold mb-1" style={{ color: "#5762A2" }}>
              {t("team.members.paulina.titre")}
            </p>
            <p className="text-sm" style={{ color: "rgba(244,244,240,0.40)" }}>
              Groupe Étoile Boréale · Division Arpenteur · Équateur → Québec
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
            {content.parcoursLabel}
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
          <div className="grid md:grid-cols-3 gap-6">
            {content.roles.map((role, i) => (
              <div
                key={i}
                className="rounded-xl p-6 border"
                style={{ backgroundColor: "#FFFFFF", borderColor: "rgba(29,29,27,0.08)" }}
              >
                <div
                  className="w-2 h-8 rounded-full mb-4"
                  style={{ backgroundColor: role.couleur }}
                />
                <h3
                  className="font-bold text-base mb-2"
                  style={{ color: "#1D1D1B" }}
                >
                  {role.titre}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: "rgba(29,29,27,0.60)" }}>
                  {role.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTAs ── */}
      <section className="py-16 px-6 text-center" style={{ backgroundColor: "#1D1D1B" }}>
        <div className="max-w-xl mx-auto flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/#equipe"
            className="px-7 py-3 rounded-lg font-semibold text-sm border transition"
            style={{ borderColor: "rgba(244,244,240,0.20)", color: "rgba(244,244,240,0.65)" }}
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
