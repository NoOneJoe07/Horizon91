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
    fr: "Nos Divisions — Arpenteur, Draveur & Carillon | Groupe Étoile Boréale",
    en: "Our Divisions — Arpenteur, Draveur & Carillon | Boreal Star Group",
    es: "Nuestras Divisiones — Arpenteur, Draveur & Carillon | Grupo Estrella Boreal",
  };
  const descriptions: Record<string, string> = {
    fr: "Trois piliers taillés dans l'héritage québécois : Division Arpenteur (graphisme & marque), Division Draveur (développement web), Division Carillon (cybersécurité). Beauce, Chaudière-Appalaches.",
    en: "Three pillars forged from Quebec heritage: Arpenteur Division (brand & design), Draveur Division (web development), Carillon Division (cybersecurity). Beauce, Chaudière-Appalaches.",
    es: "Tres pilares forjados en el patrimonio quebequense: División Arpenteur (marca y diseño), División Draveur (desarrollo web), División Carillon (ciberseguridad). Beauce, Quebec.",
  };

  const baseUrl = locale === "en" ? "https://borealstar.ca" : "https://etoileboreale.ca";
  const canonical = `${baseUrl}${locale === "fr" ? "" : `/${locale}`}/divisions`;

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

const divisionsMeta = [
  {
    key: "arpenteur",
    mark: "/mark-nordik.svg",
    couleur: "#5762A2",
    bg: "#E8EAF6",
    href: "/divisions/arpenteur",
  },
  {
    key: "web",
    mark: "/mark-web.svg",
    couleur: "#0099D1",
    bg: "#E0F4FB",
    href: "/divisions/web",
  },
  {
    key: "cyber",
    mark: "/mark-cyber.svg",
    couleur: "#203478",
    bg: "#E3E6EF",
    href: "/divisions/cyber",
  },
] as const;

export default function DivisionsPage() {
  const t = useTranslations("divisions");
  const locale = useLocale();

  const ecosystemeLabel =
    locale === "en" ? "Ecosystem"
    : locale === "es" ? "Ecosistema"
    : "Écosystème";

  const nordikDesc =
    locale === "en" ? "Independent game studio — Nordic mythology & Canadian heritage."
    : locale === "es" ? "Estudio de videojuegos independiente — mitología nórdica & patrimonio canadiense."
    : "Studio de jeux vidéo indépendants — mythologie nordique & patrimoine canadien.";

  const crierNom = locale === "en" ? "The Town Crier" : "Le Crieur";
  const crierDesc =
    locale === "en" ? "Multi-vertical editorial portal — coming soon."
    : locale === "es" ? "Portal editorial multi-vertical — próximamente."
    : "Portail éditorial multi-verticales — à venir.";

  return (
    <main className="max-w-6xl mx-auto px-6 py-20" style={{ backgroundColor: "#F4F4F0", color: "#1D1D1B" }}>

      {/* En-tête */}
      <p className="text-center text-xs font-bold tracking-widest uppercase mb-3" style={{ color: "#0099D1" }}>
        Groupe Étoile Boréale
      </p>
      <h1
        className="text-5xl font-bold text-center mb-4"
        style={{ color: "#1D1D1B", fontFamily: "var(--font-display, 'Gotham', 'Montserrat', system-ui)" }}
      >
        {t("title")}
      </h1>
      <p className="text-center mb-6 text-lg" style={{ color: "rgba(29,29,27,0.60)" }}>
        {t("subtitle")}
      </p>

      {/* Triptyque */}
      <p
        className="text-center text-sm font-bold tracking-widest uppercase mb-16"
        style={{ color: "#203478", letterSpacing: "0.18em" }}
      >
        {t("triptyque")}
      </p>

      {/* 3 Cartes divisions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
        {divisionsMeta.map((div, idx) => {
          const services = t.raw(`${div.key}.services`) as string[];
          const stagger = `stagger-${idx + 1}`;

          return (
            <Link key={div.key} href={div.href} className="block">
              <div
                className={`p-8 rounded-xl border-l-4 flex flex-col gap-4 h-full card-lift animate-fade-in-up ${stagger}`}
                style={{ borderLeftColor: div.couleur, backgroundColor: div.bg }}
              >
                <Image
                  src={div.mark}
                  alt={`Mark ${t(`${div.key}.nom`)}`}
                  width={48}
                  height={48}
                  style={{ width: "48px", height: "48px" }}
                />

                <h2
                  className="text-2xl font-bold"
                  style={{ color: div.couleur, fontFamily: "var(--font-display, 'Gotham', 'Montserrat', system-ui)" }}
                >
                  {t(`${div.key}.nom`)}
                </h2>
                <p className="text-sm leading-relaxed flex-1" style={{ color: "rgba(29,29,27,0.65)" }}>
                  {t(`${div.key}.description`)}
                </p>

                <ul className="mt-2 flex flex-col gap-1.5">
                  {services.map((s) => (
                    <li key={s} className="text-xs flex items-center gap-2" style={{ color: "rgba(29,29,27,0.60)" }}>
                      <span style={{ color: div.couleur }}>▸</span> {s}
                    </li>
                  ))}
                </ul>

                <span
                  className="mt-2 inline-block text-xs font-bold uppercase tracking-widest"
                  style={{ color: div.couleur }}
                >
                  {t(`${div.key}.cta`)}
                </span>
              </div>
            </Link>
          );
        })}
      </div>

      {/* ── Écosystème — section discrète ── */}
      <div className="border-t pt-14" style={{ borderColor: "rgba(29,29,27,0.12)" }}>
        <p
          className="text-xs font-bold tracking-widest uppercase mb-8 text-center"
          style={{ color: "rgba(29,29,27,0.35)" }}
        >
          {ecosystemeLabel}
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl mx-auto">

          {/* Nordik Legion Studio */}
          <a
            href="https://nordiklegion.ca"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-start gap-3 p-5 rounded-lg border transition"
            style={{ borderColor: "rgba(29,29,27,0.10)", backgroundColor: "#F4F4F0" }}
          >
            <span className="text-sm mt-0.5" style={{ color: "rgba(29,29,27,0.30)" }}>↗</span>
            <div>
              <p className="text-sm font-semibold mb-1" style={{ color: "#1D1D1B" }}>Nordik Legion Studio</p>
              <p className="text-xs" style={{ color: "rgba(29,29,27,0.50)" }}>{nordikDesc}</p>
            </div>
          </a>

          {/* Le Crieur / The Town Crier */}
          <Link
            href="/le-crieur"
            className="flex items-start gap-3 p-5 rounded-lg border transition"
            style={{ borderColor: "rgba(29,29,27,0.10)", backgroundColor: "#F4F4F0" }}
          >
            <span className="text-sm mt-0.5" style={{ color: "rgba(29,29,27,0.30)" }}>↗</span>
            <div>
              <p className="text-sm font-semibold mb-1" style={{ color: "#1D1D1B" }}>{crierNom}</p>
              <p className="text-xs" style={{ color: "rgba(29,29,27,0.50)" }}>{crierDesc}</p>
            </div>
          </Link>
        </div>
      </div>
    </main>
  );
}
