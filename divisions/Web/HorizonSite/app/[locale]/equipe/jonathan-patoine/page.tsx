import type { Metadata } from "next";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { Link } from "@/i18n/navigation";

// ─────────────────────────────────────────────────────────
// Metadata SEO — Jonathan Patoine
// ─────────────────────────────────────────────────────────
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  const titles: Record<string, string> = {
    fr: "Jonathan Patoine — Fondateur & PDG | Groupe Étoile Boréale",
    en: "Jonathan Patoine — Founder & CEO | Boreal Star Group",
    es: "Jonathan Patoine — Fundador & CEO | Grupo Estrella Boreal",
  };
  const descriptions: Record<string, string> = {
    fr: "Reboiseur, policier, entrepreneur, éditeur — Jonathan Patoine a fondé Groupe Étoile Boréale en 2026 pour traduire la complexité technologique en solutions concrètes pour les PME de la région.",
    en: "Tree planter, police officer, entrepreneur, editor — Jonathan Patoine founded Boreal Star Group in 2026 to translate technological complexity into concrete solutions for regional businesses.",
    es: "Reforestador, policía, emprendedor, editor — Jonathan Patoine fundó Grupo Estrella Boreal en 2026 para traducir la complejidad tecnológica en soluciones concretas para las pymes de la región.",
  };

  const baseUrl = locale === "en" ? "https://borealstar.ca" : "https://etoileboreale.ca";
  const canonical = `${baseUrl}${locale === "fr" ? "" : `/${locale}`}/equipe/jonathan-patoine`;

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
// Page — Jonathan Patoine
// ─────────────────────────────────────────────────────────
export default function JonathanPatoinePage() {
  const t = useTranslations("home");

  const roles = [
    {
      titre: { fr: "Fondateur & PDG", en: "Founder & CEO", es: "Fundador & CEO" },
      desc: {
        fr: "Vision stratégique, partenariats, direction de l'écosystème Étoile Boréale.",
        en: "Strategic vision, partnerships, and leadership of the Boreal Star ecosystem.",
        es: "Visión estratégica, alianzas y dirección del ecosistema Estrella Boreal.",
      },
      couleur: "#0099D1",
    },
    {
      titre: { fr: "Expert Cybersécurité", en: "Cybersecurity Expert", es: "Experto en Ciberseguridad" },
      desc: {
        fr: "Formation AEC (Collège Cumberland). Architecte de la Division Carillon et du SaaS Fort Saurel.",
        en: "AEC graduate (Cumberland College). Architect of Carillon Division and the Fort Saurel SaaS.",
        es: "Graduado AEC (Colegio Cumberland). Arquitecto de la División Carillon y el SaaS Fort Saurel.",
      },
      couleur: "#203478",
    },
    {
      titre: { fr: "Créateur — Nordik Legion Studio", en: "Creator — Nordik Legion Studio", es: "Creador — Nordik Legion Studio" },
      desc: {
        fr: "Développement de jeux vidéo indépendants. Projet phare : Cyber-Mythos Labyrinthe.",
        en: "Independent video game development. Flagship project: Cyber-Mythos Labyrinth.",
        es: "Desarrollo de videojuegos independientes. Proyecto insignia: Cyber-Mythos Laberinto.",
      },
      couleur: "#5762A2",
    },
  ];

  return (
    <main>

      {/* ── HERO ── */}
      <section
        className="px-6 pb-16 text-center"
        style={{ backgroundColor: "#1D1D1B", paddingTop: "120px" }}
      >
        {/* Retour */}
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
          {/* Photo de profil */}
          <div
            className="w-40 h-40 rounded-full border-4 overflow-hidden shrink-0"
            style={{ borderColor: "#0099D1" }}
          >
            <Image
              src="/photos_images/jonathan-patoine.jpg"
              alt="Jonathan Patoine — Fondateur & PDG, Groupe Étoile Boréale"
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
                fontFamily: "var(--font-display, 'Gotham', 'Montserrat', system-ui)",
              }}
            >
              Jonathan Patoine
            </h1>
            <p className="text-base font-bold mb-1" style={{ color: "#0099D1" }}>
              {t("team.members.jonathan.titre")}
            </p>
            <p className="text-sm" style={{ color: "rgba(244,244,240,0.40)" }}>
              Groupe Étoile Boréale · Sainte-Marie-de-Beauce, Québec
            </p>
          </div>
        </div>
      </section>

      {/* ── PARCOURS ── */}
      <section className="py-20 px-6" style={{ backgroundColor: "#FFFFFF" }}>
        <div className="max-w-3xl mx-auto">
          <p
            className="text-xs font-bold uppercase tracking-widest mb-4"
            style={{ color: "#0099D1" }}
          >
            {t("histoire.title")}
          </p>

          <div className="space-y-6 text-lg leading-relaxed" style={{ color: "rgba(29,29,27,0.75)" }}>
            <p>{t("histoire.p1")}</p>
            <p>{t("histoire.p2")}</p>
            <p>{t("histoire.p3")}</p>
          </div>

          <blockquote
            className="border-l-4 pl-6 mt-10 italic text-base"
            style={{ borderColor: "#0099D1", color: "rgba(29,29,27,0.50)" }}
          >
            {t("histoire.quote")}
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
                key={r.couleur}
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
            style={{ backgroundColor: "#0099D1", color: "#F4F4F0" }}
          >
            {t("cta_contact")}
          </Link>
        </div>
      </section>

    </main>
  );
}
