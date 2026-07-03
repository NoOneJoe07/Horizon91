import type { Metadata } from "next";
import { useTranslations } from "next-intl";
import { getLocale } from "next-intl/server";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import StarField from "@/app/components/StarField";

// ─────────────────────────────────────────────────────────
// Metadata SEO — HomePage
// ─────────────────────────────────────────────────────────
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  const titles: Record<string, string> = {
    fr: "Groupe Étoile Boréale — Agence Web, Graphisme & Cybersécurité | Beauce, Québec",
    en: "Boreal Star Group — Web, Branding & Cybersecurity Agency | Beauce, Quebec",
    es: "Grupo Estrella Boreal — Agencia Web, Diseño & Ciberseguridad | Beauce, Quebec",
  };
  const descriptions: Record<string, string> = {
    fr: "Comme l'Étoile Polaire guidait les explorateurs à travers le pays, Groupe Étoile Boréale guide les PME de Beauce dans l'univers numérique. Graphisme & marque, développement web, cybersécurité — Chaudière-Appalaches.",
    en: "Like Polaris guided explorers across the land, Boreal Star Group guides Beauce entrepreneurs through the digital landscape. Branding, web development, cybersecurity — Chaudière-Appalaches, Quebec.",
    es: "Como la Estrella Polar guiaba a los exploradores, Grupo Estrella Boreal guía a las pymes de Beauce. Diseño de marca, desarrollo web, ciberseguridad — Chaudière-Appalaches.",
  };

  const t = titles[locale] ?? titles.fr;
  const d = descriptions[locale] ?? descriptions.fr;
  const baseUrl = locale === "en" ? "https://borealstar.ca" : "https://etoileboreale.ca";

  return {
    title: { absolute: t },
    description: d,
    alternates: { canonical: baseUrl },
    openGraph: { title: t, description: d, url: baseUrl },
  };
}

// ─────────────────────────────────────────────────────────
// JSON-LD — LocalBusiness (SEO structuré)
// ─────────────────────────────────────────────────────────
async function LocalBusinessJsonLd() {
  const locale = await getLocale();
  const name =
    locale === "en" ? "Boreal Star Group"
    : locale === "es" ? "Grupo Estrella Boreal"
    : "Groupe Étoile Boréale";
  const url =
    locale === "en" ? "https://borealstar.ca" : "https://etoileboreale.ca";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name,
    url,
    logo: `${url}/mark-etoile.svg`,
    image: `${url}/og-image.jpg`,
    slogan:
      locale === "en" ? "Guide · Build · Protect"
      : locale === "es" ? "Guiar · Construir · Proteger"
      : "Guider · Bâtir · Protéger",
    description:
      locale === "en"
        ? "Creative and technology agency based in Sainte-Marie-de-Beauce, Quebec. Three pillars: Arpenteur (brand & design), Draveur (web development), Carillon (cybersecurity)."
        : locale === "es"
        ? "Agencia creativa y tecnológica en Sainte-Marie-de-Beauce. Tres pilares: Arpenteur (marca y diseño), Draveur (desarrollo web), Carillon (ciberseguridad)."
        : "Agence créative et technologique à Sainte-Marie-de-Beauce, Québec. Trois piliers : Arpenteur (graphisme & marque), Draveur (développement web), Carillon (cybersécurité).",
    foundingDate: "2026",
    numberOfEmployees: { "@type": "QuantitativeValue", value: 4 },
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Sainte-Marie",
      addressRegion: "QC",
      postalCode: "G6E",
      addressCountry: "CA",
    },
    areaServed: [
      { "@type": "Place", name: "Beauce" },
      { "@type": "Place", name: "Chaudière-Appalaches" },
      { "@type": "Place", name: "Québec" },
      { "@type": "Place", name: "Bellechasse" },
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: locale === "en" ? "Digital & Creative Services" : "Services créatifs & numériques",
      itemListElement: [
        { "@type": "Offer", itemOffered: { "@type": "Service", name: locale === "en" ? "Brand Design & Photography" : "Graphisme, livre de marque & photographie" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: locale === "en" ? "Web Development" : "Développement web" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: locale === "en" ? "Cybersecurity" : "Cybersécurité" } },
      ],
    },
    contactPoint: {
      "@type": "ContactPoint",
      email: "contact@etoileboreale.ca",
      contactType: "customer service",
      availableLanguage: ["French", "English", "Spanish"],
    },
    sameAs: [
      "https://www.facebook.com/etoileboreale",
      "https://www.instagram.com/etoileboreale",
      "https://www.linkedin.com/company/etoileboreale",
      "https://www.youtube.com/@etoileboreale",
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

// ─────────────────────────────────────────────────────────
// Données membres
// ─────────────────────────────────────────────────────────
const membresMeta = [
  {
    key: "jonathan",
    slug: "jonathan-patoine",
    initiales: "JP",
    couleurBordure: "#0099D1",
    couleurInitiales: "#0099D1",
  },
  {
    key: "alexandra",
    slug: "alexandra-espin",
    initiales: "AE",
    couleurBordure: "#5762A2",
    couleurInitiales: "#5762A2",
  },
  {
    key: "paulina",
    slug: "paulina-jaramillo",
    initiales: "PJ",
    couleurBordure: "#5762A2",
    couleurInitiales: "#5762A2",
  },
] as const;

// ─────────────────────────────────────────────────────────
// Les 3 piliers — données
// ─────────────────────────────────────────────────────────
const piliers = [
  {
    key: "arpenteur",
    couleur: "#5762A2",
    couleurLight: "#E8EAF6",
    mark: "/mark-nordik.svg",
    markFilter: "hue-rotate(45deg) saturate(60%) brightness(55%)" as string | undefined,
    href: "/divisions/arpenteur",
  },
  {
    key: "web",           // clé i18n = divisions.web
    couleur: "#0099D1",
    couleurLight: "#E0F4FB",
    mark: "/mark-web.svg",
    markFilter: undefined as string | undefined,
    href: "/divisions/web",
  },
  {
    key: "cyber",         // clé i18n = divisions.cyber
    couleur: "#203478",
    couleurLight: "#E3E6EF",
    mark: "/mark-cyber.svg",
    markFilter: undefined as string | undefined,
    href: "/divisions/cyber",
  },
];

// ─────────────────────────────────────────────────────────
// Page principale
// ─────────────────────────────────────────────────────────
export default function HomePage() {
  const t = useTranslations("home");
  const tBrand = useTranslations("brand");
  const tDivisions = useTranslations("divisions");

  return (
    <>
      <LocalBusinessJsonLd />

      {/* ================================================================
          HERO — fond Space Black, compas centré, triptyque
      ================================================================ */}
      <section
        id="hero"
        className="hero-dark relative flex flex-col items-center min-h-[100vh] text-center px-6 pb-20"
        style={{ marginTop: "-80px", paddingTop: "176px" }}
      >
        {/* Champ d'étoiles animé — canvas 180 étoiles scintillantes */}
        <StarField />

        {/* Aurore numérique Claude — 5 blobs organiques inclinés */}
        <div className="aurora-orb aurora-orb-1" aria-hidden="true" />
        <div className="aurora-orb aurora-orb-2" aria-hidden="true" />
        <div className="aurora-orb aurora-orb-3" aria-hidden="true" />
        <div className="aurora-orb aurora-orb-4" aria-hidden="true" />
        <div className="aurora-orb aurora-orb-5" aria-hidden="true" />

        <div className="relative z-10 flex flex-col items-center">

          {/* Compas / Logo */}
          <div className="mb-8">
            <Image
              src="/mark-etoile-color.svg"
              alt="Compas Groupe Étoile Boréale"
              width={220}
              height={220}
              priority
              style={{ width: "220px", height: "220px" }}
            />
          </div>

          {/* Nom de marque */}
          <h1
            className="text-5xl md:text-7xl font-bold mb-5 h91-title-gradient-animated"
            style={{ fontFamily: "var(--font-display, 'Gotham', 'Montserrat', system-ui)" }}
          >
            {tBrand("name")}
          </h1>

          {/* Triptyque */}
          <p
            className="text-lg md:text-xl font-bold tracking-widest uppercase mb-8"
            style={{ color: "#0099D1", letterSpacing: "0.15em" }}
          >
            {t("triptyque")}
          </p>

          {/* Tagline */}
          <p className="text-base md:text-lg max-w-2xl leading-relaxed mb-10" style={{ color: "rgba(244,244,240,0.75)" }}>
            {t("tagline")}
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/divisions"
              className="px-8 py-3 rounded-lg font-semibold text-sm transition"
              style={{ backgroundColor: "#0099D1", color: "#F4F4F0" }}
            >
              {t("cta_divisions")}
            </Link>
            <Link
              href="/contacts"
              className="px-8 py-3 rounded-lg font-semibold text-sm border transition"
              style={{ borderColor: "rgba(244,244,240,0.30)", color: "rgba(244,244,240,0.85)" }}
            >
              {t("cta_contact")}
            </Link>
          </div>
        </div>

        {/* Indicateur défilement */}
        <a
          href="#piliers"
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 transition z-10"
          style={{ color: "rgba(244,244,240,0.35)" }}
          aria-label="Défiler vers le bas"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="animate-bounce">
            <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </a>
      </section>

      {/* ================================================================
          LES 3 PILIERS — fond blanc, rectangles colorés
      ================================================================ */}
      <section id="piliers" className="py-20 px-6" style={{ backgroundColor: "#FFFFFF" }}>
        <div className="max-w-6xl mx-auto">
          <p
            className="text-center text-xs font-bold tracking-widest uppercase mb-3"
            style={{ color: "#0099D1" }}
          >
            {tBrand("name")}
          </p>
          <h2
            className="text-4xl md:text-5xl font-bold text-center mb-4"
            style={{ color: "#1D1D1B", fontFamily: "var(--font-display, 'Gotham', 'Montserrat', system-ui)" }}
          >
            {t("piliers.title")}
          </h2>
          <p className="text-center mb-14 max-w-2xl mx-auto" style={{ color: "rgba(29,29,27,0.60)" }}>
            {t("piliers.subtitle")}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {piliers.map((p, idx) => (
              <Link
                key={p.key}
                href={p.href}
                className={`block p-8 rounded-xl border-l-4 card-lift animate-fade-in-up stagger-${idx + 1}`}
                style={{
                  borderLeftColor: p.couleur,
                  backgroundColor: p.couleurLight,
                }}
              >
                <Image
                  src={p.mark}
                  alt={`Mark Division ${p.key}`}
                  width={44}
                  height={44}
                  style={{ width: "44px", height: "44px", marginBottom: "16px", filter: p.markFilter ?? undefined }}
                />
                <h3
                  className="text-xl font-bold mb-2"
                  style={{ color: p.couleur, fontFamily: "var(--font-display, 'Gotham', 'Montserrat', system-ui)" }}
                >
                  {tDivisions(`${p.key}.nom`)}
                </h3>
                <p className="text-sm leading-relaxed mb-4" style={{ color: "rgba(29,29,27,0.65)" }}>
                  {tDivisions(`${p.key}.description`)}
                </p>
                <span
                  className="text-xs font-bold uppercase tracking-widest"
                  style={{ color: p.couleur }}
                >
                  {tDivisions(`${p.key}.cta`)}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================
          L'ÉQUIPE
      ================================================================ */}
      <section id="equipe" className="py-20 px-6" style={{ backgroundColor: "#F4F4F0" }}>
        <div className="max-w-6xl mx-auto">
          <h2
            className="text-4xl md:text-5xl font-bold text-center mb-4"
            style={{ color: "#1D1D1B", fontFamily: "var(--font-display, 'Gotham', 'Montserrat', system-ui)" }}
          >
            {t("team.title")}
          </h2>
          <p className="text-center mb-14 text-lg max-w-3xl mx-auto" style={{ color: "rgba(29,29,27,0.60)" }}>
            {t("team.subtitle")}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {membresMeta.map((meta, idx) => (
              <Link
                key={meta.key}
                href={`/equipe/${meta.slug}`}
                className={`relative p-6 border-2 rounded-xl flex flex-col items-center gap-4 text-center card-lift animate-fade-in-up stagger-${idx + 1}`}
                style={{ borderColor: meta.couleurBordure, backgroundColor: "#FFFFFF" }}
              >
                {/* Photo placeholder */}
                <div
                  className="w-24 h-24 rounded-full border-2 flex items-center justify-center"
                  style={{ borderColor: meta.couleurBordure, backgroundColor: "#F4F4F0" }}
                >
                  <span className="text-2xl font-bold" style={{ color: meta.couleurInitiales }}>
                    {meta.initiales}
                  </span>
                </div>

                <div>
                  <h3 className="text-lg font-bold leading-tight" style={{ color: "#1D1D1B" }}>
                    {t(`team.members.${meta.key}.nom`)}
                  </h3>
                  <p className="text-xs font-semibold mt-1" style={{ color: meta.couleurInitiales }}>
                    {t(`team.members.${meta.key}.titre`)}
                  </p>
                </div>

                <p className="text-sm leading-relaxed" style={{ color: "rgba(29,29,27,0.65)" }}>
                  {t(`team.members.${meta.key}.bio`)}
                </p>

                <span
                  className="mt-auto text-xs font-semibold underline underline-offset-4"
                  style={{ color: meta.couleurInitiales }}
                >
                  {t("team.cta_profile")}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================
          NOTRE HISTOIRE
      ================================================================ */}
      <section id="histoire" className="py-20 px-6" style={{ backgroundColor: "#FFFFFF" }}>
        <div className="max-w-4xl mx-auto">
          <h2
            className="text-4xl md:text-5xl font-bold text-center mb-14"
            style={{ color: "#1D1D1B", fontFamily: "var(--font-display, 'Gotham', 'Montserrat', system-ui)" }}
          >
            {t("histoire.title")}
          </h2>

          <div className="space-y-6 text-lg leading-relaxed" style={{ color: "rgba(29,29,27,0.75)" }}>
            <p className="scroll-fade">{t("histoire.p1")}</p>
            <p className="scroll-fade">{t("histoire.p2")}</p>
            <p className="scroll-fade">{t("histoire.p3")}</p>
            <p className="scroll-fade">{t("histoire.p4")}</p>
            <p className="scroll-fade">{t("histoire.p5")}</p>
            <p className="scroll-fade">{t("histoire.p6")}</p>

            <blockquote
              className="scroll-fade border-l-4 pl-6 mt-8 italic text-base"
              style={{ borderColor: "#0099D1", color: "rgba(29,29,27,0.55)" }}
            >
              {t("histoire.quote")}
            </blockquote>
          </div>

          <div className="mt-14 text-center">
            <Link
              href="/divisions"
              className="inline-block font-bold px-8 py-4 rounded-lg text-lg transition"
              style={{ backgroundColor: "#203478", color: "#F4F4F0" }}
            >
              {t("histoire.cta")}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
