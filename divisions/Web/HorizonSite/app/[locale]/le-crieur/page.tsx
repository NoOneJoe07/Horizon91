import type { Metadata } from "next";
import { useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";

// ─────────────────────────────────────────────────────────
// Metadata SEO
// ─────────────────────────────────────────────────────────
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  const titles: Record<string, string> = {
    fr: "Le Crieur — Portail Éditorial Régional | À venir",
    en: "The Town Crier — Regional Editorial Portal | Coming Soon",
    es: "El Pregonero — Portal Editorial Regional | Próximamente",
  };
  const descriptions: Record<string, string> = {
    fr: "Le Crieur sera le portail éditorial du Groupe Étoile Boréale — voix des entrepreneurs, artisans et bâtisseurs de la région. Techno & cybersécurité, habitation & finances, sport & performance, artisanat & culture.",
    en: "The Town Crier will be Boreal Star Group's editorial portal — the voice of entrepreneurs, craftspeople and builders of the region. Tech & cybersecurity, housing & finance, sport & performance, craft & culture.",
    es: "El Pregonero será el portal editorial del Grupo Estrella Boreal — voz de los emprendedores, artesanos y constructores de la región.",
  };

  const baseUrl = locale === "en" ? "https://borealstar.ca" : "https://etoileboreale.ca";
  const canonical = `${baseUrl}${locale === "fr" ? "" : `/${locale}`}/le-crieur`;

  return {
    title: titles[locale] ?? titles.fr,
    description: descriptions[locale] ?? descriptions.fr,
    alternates: { canonical },
    openGraph: {
      title: titles[locale] ?? titles.fr,
      description: descriptions[locale] ?? descriptions.fr,
      url: canonical,
    },
    robots: { index: false, follow: false }, // Pas encore en production
  };
}

// ─────────────────────────────────────────────────────────
// Contenu par langue
// ─────────────────────────────────────────────────────────
const content: Record<string, {
  tag: string;
  nom: string;
  nomAlt: string;
  tagline: string;
  desc: string;
  categories: { icon: string; titre: string; desc: string }[];
  lore: string;
  loreAttribution: string;
  domaine: string;
  cta: string;
  ctaRetour: string;
  coming: string;
}> = {
  fr: {
    tag: "À venir — Portail éditorial indépendant",
    nom: "Le Crieur",
    nomAlt: "Le Crieur Public",
    tagline: "La voix de la région. Pour ceux qui bâtissent, créent et entreprennent.",
    desc: "Au temps de la Nouvelle-France et des premiers villages québécois, le crieur public parcourait les rues pour annoncer les nouvelles importantes — avis d'assemblée, arrêtés municipaux, nouvelles des marchands. Sa voix portait l'information à ceux qui en avaient besoin.",
    categories: [
      { icon: "🖥️", titre: "Techno & Cybersécurité", desc: "Conseils pratiques pour PME, analyses de menaces, nouvelles du secteur numérique régional." },
      { icon: "🏠", titre: "Habitation & Finances", desc: "Immobilier, rénovation, fiscalité, planification financière pour propriétaires et entrepreneurs." },
      { icon: "🏋️", titre: "Sport & Performance", desc: "Entraînement, nutrition, médecine sportive, clubs et événements locaux." },
      { icon: "🧵", titre: "Artisanat & Culture", desc: "Artisans locaux, savoirs-faire, patrimoine, vie culturelle de Chaudière-Appalaches." },
    ],
    lore: "Oyez, oyez ! — L'appel du crieur public annonçait que l'information importante allait suivre. Trois mots hérités de l'ancien français qui signifient simplement : « Écoutez. »",
    loreAttribution: "— Tradition des crieurs publics, France & Nouvelle-France, XVIe–XIXe siècle",
    domaine: "lecrieur.ca",
    cta: "Être informé au lancement",
    ctaRetour: "← Retour à l'accueil",
    coming: "En préparation — le domaine lecrieur.ca sera réservé prochainement.",
  },
  en: {
    tag: "Coming Soon — Independent editorial portal",
    nom: "The Town Crier",
    nomAlt: "The Town Crier",
    tagline: "The voice of the region. For those who build, create and venture.",
    desc: "In medieval England and early colonial towns, the town crier was the official voice of public information — walking the streets with a hand bell, announcing news from the authorities, merchants and community. Beginning with \"Oyez, oyez, oyez!\" — the call to pay attention.",
    categories: [
      { icon: "🖥️", titre: "Tech & Cybersecurity", desc: "Practical advice for SMBs, threat analyses, regional digital sector news." },
      { icon: "🏠", titre: "Housing & Finance", desc: "Real estate, renovation, taxation, financial planning for homeowners and entrepreneurs." },
      { icon: "🏋️", titre: "Sport & Performance", desc: "Training, nutrition, sports medicine, local clubs and events." },
      { icon: "🧵", titre: "Craft & Culture", desc: "Local craftspeople, know-how, heritage, cultural life of Chaudière-Appalaches." },
    ],
    lore: "Oyez, oyez! — From Old French, meaning \"hear ye\" or simply \"listen.\" The town crier's call to attention — used in England since the 13th century and carried to the colonies. The word 'oyez' is itself French — a bridge between two founding cultures.",
    loreAttribution: "— Town Crier tradition, England & Colonial North America, 13th–19th century",
    domaine: "thetowncrier.ca",
    cta: "Be notified at launch",
    ctaRetour: "← Back to home",
    coming: "In preparation — the domain thetowncrier.ca will be reserved soon.",
  },
  es: {
    tag: "Próximamente — Portal editorial independiente",
    nom: "El Pregonero",
    nomAlt: "Le Crieur / The Town Crier",
    tagline: "La voz de la región. Para quienes construyen, crean y emprenden.",
    desc: "En la Nueva Francia y los primeros pueblos canadienses, el pregonero público recorría las calles para anunciar noticias importantes — avisos de asamblea, ordenanzas municipales, novedades de los comerciantes.",
    categories: [
      { icon: "🖥️", titre: "Tecnología & Ciberseguridad", desc: "Consejos prácticos para pymes, análisis de amenazas, noticias del sector digital regional." },
      { icon: "🏠", titre: "Vivienda & Finanzas", desc: "Inmobiliario, renovación, fiscalidad, planificación financiera para propietarios y emprendedores." },
      { icon: "🏋️", titre: "Deporte & Rendimiento", desc: "Entrenamiento, nutrición, medicina deportiva, clubes y eventos locales." },
      { icon: "🧵", titre: "Artesanía & Cultura", desc: "Artesanos locales, saberes tradicionales, patrimonio, vida cultural de Chaudière-Appalaches." },
    ],
    lore: "¡Oyez, oyez! — Del francés antiguo: «escuchad». El llamado del pregonero público a prestar atención — una tradición que viajó de Francia a la Nueva Francia.",
    loreAttribution: "— Tradición de los pregoneros, Francia & Nueva Francia, siglos XVI–XIX",
    domaine: "lecrieur.ca",
    cta: "Ser notificado al lanzamiento",
    ctaRetour: "← Volver al inicio",
    coming: "En preparación — el dominio lecrieur.ca se reservará pronto.",
  },
};

// ─────────────────────────────────────────────────────────
// Page principale
// ─────────────────────────────────────────────────────────
export default function LeCreurPage() {
  const locale = useLocale();
  const c = content[locale] ?? content.fr;

  return (
    <main>
      {/* ── HERO ── */}
      <section
        className="py-24 px-6 text-center"
        style={{ backgroundColor: "#1D1D1B", color: "#F4F4F0" }}
      >
        <div className="max-w-3xl mx-auto">
          <div className="inline-block text-xs font-bold tracking-widest uppercase px-3 py-1.5 rounded-full mb-6"
               style={{ backgroundColor: "rgba(244,244,240,0.10)", color: "rgba(244,244,240,0.55)" }}>
            {c.tag}
          </div>

          {/* Bell icon — hommage au crieur */}
          <div className="text-5xl mb-6">🔔</div>

          <h1
            className="text-5xl md:text-6xl font-bold mb-4"
            style={{ color: "#F4F4F0", fontFamily: "var(--font-display, 'Gotham', 'Montserrat', system-ui)" }}
          >
            {c.nom}
          </h1>
          <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto" style={{ color: "rgba(244,244,240,0.65)" }}>
            {c.tagline}
          </p>

          {/* Badge domaine */}
          <div
            className="inline-flex items-center gap-2 text-sm font-mono px-4 py-2 rounded-lg"
            style={{ backgroundColor: "rgba(244,244,240,0.08)", color: "rgba(244,244,240,0.45)", border: "1px solid rgba(244,244,240,0.12)" }}
          >
            <span style={{ color: "#0099D1" }}>○</span>
            <span>{c.domaine}</span>
            <span className="text-xs" style={{ color: "rgba(244,244,240,0.30)" }}>— {c.coming.split("—")[1]?.trim()}</span>
          </div>
        </div>
      </section>

      {/* ── CONTEXTE HISTORIQUE ── */}
      <section className="py-16 px-6" style={{ backgroundColor: "#F4F4F0" }}>
        <div className="max-w-3xl mx-auto">
          <p className="text-base leading-relaxed mb-8" style={{ color: "rgba(29,29,27,0.70)" }}>
            {c.desc}
          </p>

          {/* Citation lore */}
          <blockquote
            className="border-l-4 pl-6 py-2 italic mb-4"
            style={{ borderColor: "#203478", color: "rgba(29,29,27,0.60)" }}
          >
            {c.lore}
          </blockquote>
          <p className="text-xs ml-7" style={{ color: "rgba(29,29,27,0.40)" }}>{c.loreAttribution}</p>
        </div>
      </section>

      {/* ── CATÉGORIES ── */}
      <section className="py-16 px-6" style={{ backgroundColor: "#FFFFFF" }}>
        <div className="max-w-4xl mx-auto">
          <h2
            className="text-2xl font-bold mb-10 text-center"
            style={{ color: "#1D1D1B", fontFamily: "var(--font-display, 'Gotham', 'Montserrat', system-ui)" }}
          >
            {locale === "en" ? "Four Verticals" : locale === "es" ? "Cuatro Verticales" : "Quatre Verticales"}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {c.categories.map((cat, i) => (
              <div
                key={i}
                className={`p-6 rounded-xl border-l-4 animate-fade-in-up stagger-${i + 1}`}
                style={{ borderLeftColor: "#203478", backgroundColor: "#F4F4F0" }}
              >
                <div className="text-2xl mb-3">{cat.icon}</div>
                <h3 className="font-bold text-base mb-2" style={{ color: "#203478" }}>{cat.titre}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "rgba(29,29,27,0.60)" }}>{cat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA LANCEMENT ── */}
      <section className="py-16 px-6 text-center" style={{ backgroundColor: "#F4F4F0" }}>
        <div className="max-w-xl mx-auto">
          <h2
            className="text-2xl font-bold mb-3"
            style={{ color: "#1D1D1B", fontFamily: "var(--font-display, 'Gotham', 'Montserrat', system-ui)" }}
          >
            {locale === "en" ? "Stay tuned"
             : locale === "es" ? "Estén atentos"
             : "Restez à l'écoute"}
          </h2>
          <p className="text-sm mb-8" style={{ color: "rgba(29,29,27,0.55)" }}>
            {locale === "en" ? "Sign up via our contact form and we'll notify you when The Town Crier goes live."
             : locale === "es" ? "Contáctenos y le notificaremos cuando El Pregonero esté en línea."
             : "Inscrivez-vous via notre formulaire de contact et nous vous avertirons au lancement du Crieur."}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contacts"
              className="px-8 py-3 rounded-lg font-bold text-sm transition"
              style={{ backgroundColor: "#203478", color: "#F4F4F0" }}
            >
              {c.cta}
            </Link>
            <Link
              href="/"
              className="px-8 py-3 rounded-lg font-bold text-sm border transition"
              style={{ borderColor: "rgba(29,29,27,0.20)", color: "rgba(29,29,27,0.60)" }}
            >
              {c.ctaRetour}
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
