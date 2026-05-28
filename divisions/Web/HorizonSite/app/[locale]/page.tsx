import type { Metadata } from "next";
import { useTranslations } from "next-intl";
import { getLocale } from "next-intl/server";
import Image from "next/image";

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
    fr: "Groupe Étoile Boréale — Agence Web & Cybersécurité | Sainte-Marie-de-Beauce",
    en: "Boreal Star Group — Web Agency & Cybersecurity | Sainte-Marie-de-Beauce",
    es: "Grupo Estrella Boreal — Agencia Web & Ciberseguridad | Beauce, Quebec",
  };
  const descriptions: Record<string, string> = {
    fr: "Comme l'Étoile Polaire guidait les coureurs des bois à travers l'immensité du pays, Groupe Étoile Boréale guide les PME de Beauce dans l'univers numérique. Développement web, cybersécurité, médias sociaux — Chaudière-Appalaches.",
    en: "Like Polaris guided the coureurs des bois through Canada's wilderness, Boreal Star Group guides Beauce entrepreneurs through the digital landscape. Web development, cybersecurity, social media — Chaudière-Appalaches, Quebec.",
    es: "Como la Estrella Polar guiaba a los viajeros por el vasto territorio canadiense, Grupo Estrella Boreal guía a las pymes de Beauce en el universo digital. Desarrollo web, ciberseguridad, redes sociales — Chaudière-Appalaches.",
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
    locale === "en" ? "Boreal Star Group" : locale === "es" ? "Grupo Estrella Boreal" : "Groupe Étoile Boréale";
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
      locale === "en"
        ? "Like Polaris, we guide entrepreneurs through the digital frontier."
        : locale === "es"
        ? "Como la Estrella Polar, guiamos a los emprendedores en el universo digital."
        : "Comme l'Étoile Polaire, nous guidons les entrepreneurs dans l'univers numérique.",
    description:
      locale === "en"
        ? "Web agency, cybersecurity and game studio based in Sainte-Marie-de-Beauce, Quebec. Named after the North Star that guided Canada's coureurs des bois."
        : locale === "es"
        ? "Agencia web, ciberseguridad y estudio de videojuegos en Sainte-Marie-de-Beauce, Quebec. Nombrada tras la Estrella Polar que guiaba a los exploradores canadienses."
        : "Agence web, cybersécurité et studio de jeux vidéo à Sainte-Marie-de-Beauce, Québec. Nommée en hommage à l'étoile qui guidait les coureurs des bois du pays.",
    foundingDate: "2024",
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
      name: locale === "en" ? "Digital Services" : "Services numériques",
      itemListElement: [
        { "@type": "Offer", itemOffered: { "@type": "Service", name: locale === "en" ? "Web Development" : "Développement web" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: locale === "en" ? "Cybersecurity" : "Cybersécurité" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: locale === "en" ? "Social Media Management" : "Gestion médias sociaux" } },
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

const membresMeta = [
  {
    key: "jonathan",
    initiales: "JP",
    couleurBordure: "border-h91-glacier",  /* Bleu-gris glacé — Direction générale */
    couleurInitiales: "text-h91-glacier",
    badge: false,
  },
  {
    key: "alexandra",
    initiales: "AE",
    couleurBordure: "border-h91-ion",      /* Cyan/turquoise — couleur préférée d'Alexandra */
    couleurInitiales: "text-h91-ion",
    badge: false,
  },
  {
    key: "paulina",
    initiales: "PJ",
    couleurBordure: "border-h91-warp",     /* Violet — Division Draveur */
    couleurInitiales: "text-h91-warp",
    badge: false,
  },
  {
    key: "gabriel",
    initiales: "GP",
    couleurBordure: "border-h91-accretion", /* Orange — Division Carillon / cybersécurité */
    couleurInitiales: "text-h91-accretion",
    badge: true,
  },
] as const;

export default function HomePage() {
  const t = useTranslations("home");
  const tBrand = useTranslations("brand");

  return (
    <>
      <LocalBusinessJsonLd />
      {/* ================================================================
          HERO
      ================================================================ */}
      <main
        id="hero"
        className="relative flex flex-col items-center min-h-screen text-center px-6 pt-28 overflow-hidden"
      >
        <h1 className="text-6xl md:text-8xl font-bold h91-title-gradient-animated mb-14">
          {tBrand("name")}
        </h1>

        {/* LOGO + ORBITAL EFFECT */}
        <div className="relative flex items-center justify-center mb-10">
          <div className="blue-halo"></div>
          <div className="orbital-core"></div>
          <Image
            src="/mark-etoile.svg"
            alt="Logo Groupe Étoile Boréale"
            width={310}
            height={310}
            priority
            style={{ width: "310px", height: "310px" }}
            className="relative z-10"
          />
        </div>

        <p className="text-lg md:text-xl text-h91-stellar/80 max-w-2xl mb-10">
          {t("tagline")}
        </p>

        {/* SCROLL INDICATOR */}
        <a
          href="#equipe"
          className="flex flex-col items-center gap-2 text-h91-stellar/40 hover:text-h91-accretion transition group"
          aria-label="Défiler vers le bas"
        >
          <span className="text-xs font-semibold tracking-widest uppercase">Défiler</span>
          <svg
            width="24" height="24" viewBox="0 0 24 24" fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="animate-bounce"
          >
            <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </a>

      </main>

      {/* ================================================================
          L'ÉQUIPE
      ================================================================ */}
      <section id="equipe" className="py-12 px-6 max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-h91-stellar text-center mb-4">
          {t("team.title")}
        </h2>
        <p className="text-center text-h91-stellar/60 mb-14 text-lg max-w-3xl mx-auto">
          {t("team.subtitle")}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {membresMeta.map((meta, idx) => (
            <div
              key={meta.key}
              className={`relative p-6 border-2 ${meta.couleurBordure} rounded-xl bg-h91-gravity/50 flex flex-col items-center gap-4 text-center card-lift animate-fade-in-up stagger-${idx + 1}`}
            >
              {meta.badge && (
                <span className="absolute top-4 right-4 text-xs font-bold px-2 py-1 rounded-full bg-h91-ion/20 text-h91-ion">
                  {t("team.badge_soon")}
                </span>
              )}

              {/* Photo placeholder */}
              <div
                className={`w-24 h-24 rounded-full border-2 ${meta.couleurBordure} bg-h91-gravity flex items-center justify-center`}
              >
                <span className={`text-2xl font-bold ${meta.couleurInitiales}`}>
                  {meta.initiales}
                </span>
              </div>

              <div>
                <h3 className="text-lg font-bold text-h91-stellar leading-tight">
                  {t(`team.members.${meta.key}.nom`)}
                </h3>
                <p className={`text-xs font-semibold mt-1 ${meta.couleurInitiales}`}>
                  {t(`team.members.${meta.key}.titre`)}
                </p>
              </div>

              <p className="text-h91-stellar/70 text-sm leading-relaxed">
                {t(`team.members.${meta.key}.bio`)}
              </p>

              {/* Bouton "En savoir plus" sur la carte JP uniquement */}
              {meta.key === "jonathan" && (
                <a
                  href="#histoire"
                  className="mt-2 text-xs font-semibold text-h91-glacier hover:text-h91-ion transition underline underline-offset-4"
                >
                  {t("team.cta_histoire")}
                </a>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ================================================================
          NOTRE HISTOIRE
      ================================================================ */}
      <section id="histoire" className="py-20 px-6 max-w-4xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-h91-stellar text-center mb-14">
          {t("histoire.title")}
        </h2>

        <div className="space-y-6 text-h91-stellar/80 text-lg leading-relaxed">
          <p className="scroll-fade">{t("histoire.p1")}</p>
          <p className="scroll-fade">{t("histoire.p2")}</p>
          <p className="scroll-fade">{t("histoire.p3")}</p>
          <p className="scroll-fade">{t("histoire.p4")}</p>
          <p className="scroll-fade">{t("histoire.p5")}</p>
          <p className="scroll-fade">{t("histoire.p6")}</p>

          <blockquote className="scroll-fade border-l-4 border-h91-ion pl-6 mt-8 text-h91-stellar/60 italic text-base">
            {t("histoire.quote")}
          </blockquote>
        </div>

        <div className="mt-14 text-center">
          <a
            href={`divisions`}
            className="inline-block bg-h91-ion text-h91-gravity font-bold px-8 py-4 rounded-lg text-xl hover:bg-h91-ion/80 transition"
          >
            {t("histoire.cta")}
          </a>
        </div>
      </section>
    </>
  );
}
