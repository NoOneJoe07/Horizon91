import { useTranslations } from "next-intl";
import { getLocale } from "next-intl/server";
import Image from "next/image";

// ─────────────────────────────────────────────────────────
// JSON-LD — LocalBusiness (SEO structuré)
// ─────────────────────────────────────────────────────────
async function LocalBusinessJsonLd() {
  const locale = await getLocale();
  const name =
    locale === "en" ? "Supernova Group" : locale === "es" ? "Grupo Supernova" : "Groupe Supernova";
  const url =
    locale === "en" ? "https://supernovagroup.ca" : "https://groupesupernova.ca";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name,
    url,
    logo: `${url}/LogoGroupeSupernova.svg`,
    image: `${url}/og-image.jpg`,
    description:
      locale === "en"
        ? "Web agency, cybersecurity and game studio based in Sainte-Marie-de-Beauce, Quebec."
        : locale === "es"
        ? "Agencia web, ciberseguridad y estudio de videojuegos en Sainte-Marie-de-Beauce, Quebec."
        : "Agence web, cybersécurité et studio de jeux vidéo à Sainte-Marie-de-Beauce, Québec.",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Sainte-Marie",
      addressRegion: "QC",
      addressCountry: "CA",
    },
    areaServed: [
      { "@type": "Place", name: "Beauce" },
      { "@type": "Place", name: "Chaudière-Appalaches" },
      { "@type": "Place", name: "Québec" },
    ],
    contactPoint: {
      "@type": "ContactPoint",
      email: "contact@groupesupernova.ca",
      contactType: "customer service",
    },
    sameAs: [
      "https://www.facebook.com/groupesupernova",
      "https://www.instagram.com/groupesupernova",
      "https://www.linkedin.com/company/groupesupernova",
      "https://www.youtube.com/@groupesupernova",
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
    couleurBordure: "border-h91-accretion",
    couleurInitiales: "text-h91-accretion",
    badge: false,
  },
  {
    key: "alexandra",
    initiales: "AE",
    couleurBordure: "border-h91-fusion",
    couleurInitiales: "text-h91-fusion",
    badge: false,
  },
  {
    key: "paulina",
    initiales: "PJ",
    couleurBordure: "border-h91-warp",
    couleurInitiales: "text-h91-warp",
    badge: false,
  },
  {
    key: "gabriel",
    initiales: "GP",
    couleurBordure: "border-h91-ion",
    couleurInitiales: "text-h91-ion",
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
        className="flex flex-col items-center justify-center min-h-screen text-center px-6 pt-0"
      >
        <h1 className="text-6xl md:text-8xl font-bold h91-title-gradient-animated mb-6">
          {tBrand("name")}
        </h1>

        {/* LOGO + ORBITAL EFFECT */}
        <div className="relative flex items-center justify-center mb-6">
          <div className="blue-halo"></div>
          <div className="orbital-core"></div>
          <Image
            src="/LogoGroupeSupernova.svg"
            alt="Logo Groupe Supernova"
            width={800}
            height={800}
            priority
            style={{ width: "100%", height: "auto", maxWidth: "800px" }}
            className="relative z-10 drop-shadow-2xl"
          />
        </div>

        <p className="mt-0 text-lg md:text-xl text-h91-stellar/80 max-w-2xl">
          {t("tagline")}
        </p>
      </main>

      {/* ================================================================
          L'ÉQUIPE
      ================================================================ */}
      <section id="equipe" className="py-24 px-6 max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-h91-stellar text-center mb-4">
          {t("team.title")}
        </h2>
        <p className="text-center text-h91-stellar/60 mb-14 text-lg">
          {t("team.subtitle")}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {membresMeta.map((meta) => (
            <div
              key={meta.key}
              className={`relative p-6 border-2 ${meta.couleurBordure} rounded-xl bg-h91-gravity/50 flex flex-col items-center gap-4 text-center hover:bg-h91-gravity/80 transition`}
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
          <p>{t("histoire.p1")}</p>
          <p>{t("histoire.p2")}</p>
          <p>{t("histoire.p3")}</p>
          <p>{t("histoire.p4")}</p>
          <p>{t("histoire.p5")}</p>
          <p>{t("histoire.p6")}</p>

          <blockquote className="border-l-4 border-h91-accretion pl-6 mt-8 text-h91-stellar/60 italic text-base">
            {t("histoire.quote")}
          </blockquote>
        </div>

        <div className="mt-14 text-center">
          <a
            href={`divisions`}
            className="inline-block bg-h91-accretion text-h91-gravity font-bold px-8 py-4 rounded-lg text-xl hover:bg-h91-fusion transition"
          >
            {t("histoire.cta")}
          </a>
        </div>
      </section>
    </>
  );
}
