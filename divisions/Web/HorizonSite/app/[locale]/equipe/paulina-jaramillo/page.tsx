import type { Metadata } from "next";
import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";

// ─────────────────────────────────────────────────────────
// Bio trilingue — Paulina Jaramillo
// ─────────────────────────────────────────────────────────
const bio = {
  fr: {
    p1: "Paulina Jaramillo a grandi avec un appareil photo entre les mains et le souci du détail dans les yeux. Photographe de terrain, graphiste et spécialiste du marketing numérique, elle a forgé son regard dans les rues et les paysages de l'Équateur avant de poser ses valises au Québec — une décision qui allait changer sa trajectoire.",
    p2: "À son arrivée, c'est la culture québécoise qui l'a conquise : sa langue, son histoire, sa fierté tranquille. Ce coup de cœur s'est transformé en engagement. Paulina ne veut pas seulement s'intégrer — elle veut contribuer, construire, laisser sa marque dans le tissu économique de sa région d'adoption.",
    p3: "Chez Groupe Étoile Boréale, elle pilote la Division Arpenteur : identité de marque, photographie professionnelle, présence sur les réseaux sociaux et stratégie visuelle pour nos clients. Son œil de photographe et sa sensibilité aux cultures font d'elle une communicatrice rare — capable de raconter une entreprise avec autant de justesse qu'une image.",
    quote: "Une image bien choisie vaut mieux qu'un long discours. Je construis les deux.",
    parcoursLabel: "Parcours",
    roles: [
      {
        titre: "Directrice — Division Arpenteur",
        desc: "Pilotage de l'identité de marque, de la photographie professionnelle et de la stratégie médias sociaux.",
        couleur: "#5762A2",
      },
      {
        titre: "Photographe & Graphiste",
        desc: "Photographie de terrain, conception graphique et création de contenu visuel pour les PME régionales.",
        couleur: "#0099D1",
      },
      {
        titre: "Spécialiste Marketing Numérique",
        desc: "Stratégie de présence en ligne, gestion des réseaux sociaux et développement de l'achalandage web.",
        couleur: "#C9A84C",
      },
    ],
  },
  en: {
    p1: "Paulina Jaramillo grew up with a camera in hand and an eye for detail. A field photographer, graphic designer, and digital marketing specialist, she honed her craft across the landscapes and streets of Ecuador before settling in Quebec — a decision that would reshape her path.",
    p2: "What captured her heart on arrival was Quebec's culture: its language, its history, its quiet pride. That connection turned into commitment. Paulina doesn't just want to integrate — she wants to contribute, build, and leave her mark on the economic fabric of her adopted region.",
    p3: "At Groupe Étoile Boréale, she leads Division Arpenteur: brand identity, professional photography, social media presence, and visual strategy for our clients. Her photographer's eye and cross-cultural sensitivity make her a rare communicator — one who can tell a business's story as powerfully as a single image.",
    quote: "A well-chosen image speaks louder than a long speech. I build both.",
    parcoursLabel: "Background",
    roles: [
      {
        titre: "Director — Division Arpenteur",
        desc: "Leading brand identity, professional photography, and social media strategy.",
        couleur: "#5762A2",
      },
      {
        titre: "Photographer & Graphic Designer",
        desc: "Field photography, graphic design, and visual content creation for regional businesses.",
        couleur: "#0099D1",
      },
      {
        titre: "Digital Marketing Specialist",
        desc: "Online presence strategy, social media management, and web traffic development.",
        couleur: "#C9A84C",
      },
    ],
  },
  es: {
    p1: "Paulina Jaramillo creció con una cámara en la mano y un ojo para el detalle. Fotógrafa de campo, diseñadora gráfica y especialista en marketing digital, desarrolló su mirada en las calles y paisajes de Ecuador antes de instalarse en Quebec — una decisión que cambiaría su camino.",
    p2: "Lo que conquistó su corazón al llegar fue la cultura quebequense: su lengua, su historia, su orgullo tranquilo. Ese flechazo se convirtió en compromiso. Paulina no solo quiere integrarse — quiere contribuir, construir y dejar su huella en el tejido económico de su región de adopción.",
    p3: "En Groupe Étoile Boréale, dirige la División Arpenteur: identidad de marca, fotografía profesional, presencia en redes sociales y estrategia visual para nuestros clientes. Su ojo de fotógrafa y su sensibilidad intercultural la convierten en una comunicadora excepcional — capaz de contar la historia de una empresa con la misma precisión que una imagen.",
    quote: "Una imagen bien elegida vale más que un largo discurso. Yo construyo ambos.",
    parcoursLabel: "Trayectoria",
    roles: [
      {
        titre: "Directora — División Arpenteur",
        desc: "Dirección de identidad de marca, fotografía profesional y estrategia en redes sociales.",
        couleur: "#5762A2",
      },
      {
        titre: "Fotógrafa & Diseñadora Gráfica",
        desc: "Fotografía de campo, diseño gráfico y creación de contenido visual para pymes regionales.",
        couleur: "#0099D1",
      },
      {
        titre: "Especialista en Marketing Digital",
        desc: "Estrategia de presencia en línea, gestión de redes sociales y desarrollo del tráfico web.",
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
    fr: "Paulina Jaramillo — Directrice Marketing & Photo | Groupe Étoile Boréale",
    en: "Paulina Jaramillo — Marketing & Photography Director | Boreal Star Group",
    es: "Paulina Jaramillo — Directora de Marketing & Fotografía | Grupo Estrella Boreal",
  };
  const descriptions: Record<string, string> = {
    fr: "Photographe, graphiste et spécialiste du marketing numérique, Paulina Jaramillo pilote la Division Arpenteur de Groupe Étoile Boréale — identité de marque, photographie professionnelle et stratégie médias sociaux.",
    en: "Photographer, graphic designer, and digital marketing specialist, Paulina Jaramillo leads Division Arpenteur at Boreal Star Group — brand identity, professional photography, and social media strategy.",
    es: "Fotógrafa, diseñadora gráfica y especialista en marketing digital, Paulina Jaramillo dirige la División Arpenteur de Grupo Estrella Boreal — identidad de marca, fotografía profesional y estrategia en redes sociales.",
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
          {/* Photo — placeholder jusqu'à mercredi */}
          <div
            className="w-40 h-40 rounded-full border-4 flex items-center justify-center overflow-hidden shrink-0"
            style={{ borderColor: "#5762A2", backgroundColor: "#F4F4F0" }}
          >
            <span className="text-5xl font-bold" style={{ color: "#5762A2" }}>PJ</span>
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
