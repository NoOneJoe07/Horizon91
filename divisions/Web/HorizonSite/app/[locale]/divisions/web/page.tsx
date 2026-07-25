import type { Metadata } from "next";
import { useTranslations } from "next-intl";
import { getLocale } from "next-intl/server";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import DivisionPhotoGallery from "@/app/components/DivisionPhotoGallery";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  const titles: Record<string, string> = {
    fr: "Division Draveur — Développement Web Beauce",
    en: "Draveur Division — Web Development Beauce",
    es: "División Draveur — Desarrollo Web Beauce",
  };
  const descriptions: Record<string, string> = {
    fr: "Les draveurs québécois maîtrisaient les rivières les plus tumultueuses. La Division Draveur maîtrise le web. Sites vitrines, e-commerce, SEO local pour PME de Beauce à partir de 1 500 $.",
    en: "Quebec's draveurs mastered the most turbulent rivers. Draveur Division masters the web. Business websites, e-commerce, local SEO for Beauce SMBs starting at $1,500.",
    es: "Los draveurs québécois dominaban los ríos más turbulentos. La División Draveur domina la web. Sitios vitrina, e-commerce y SEO local para pymes de Beauce desde 1 500 $.",
  };

  const baseUrl = locale === "en" ? "https://borealstar.ca" : "https://etoileboreale.ca";
  const canonical = `${baseUrl}${locale === "fr" ? "" : `/${locale}`}/divisions/web`;

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
// JSON-LD — Service WebDevelopment
// ─────────────────────────────────────────────────────────
async function WebServiceJsonLd() {
  const locale = await getLocale();
  const baseUrl = locale === "en" ? "https://borealstar.ca" : "https://etoileboreale.ca";
  const org = locale === "en" ? "Boreal Star Group" : locale === "es" ? "Grupo Estrella Boreal" : "Groupe Étoile Boréale";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name:
      locale === "en" ? "Draveur Division — Web Development"
      : locale === "es" ? "División Draveur — Desarrollo Web"
      : "Division Draveur — Développement Web",
    serviceType: "Web Development",
    description:
      locale === "en"
        ? "Professional web development for SMBs in Beauce and Chaudière-Appalaches. Business websites, e-commerce, local SEO. Named after the legendary draveurs — Quebec's fearless river drivers."
        : locale === "es"
        ? "Desarrollo web profesional para pymes de Beauce. Sitios vitrina, e-commerce, SEO local. Nombrada en homenaje a los legendarios draveurs del Quebec."
        : "Développement web professionnel pour PME de Beauce et Chaudière-Appalaches. Sites vitrines, e-commerce, SEO local. Nommée en hommage aux légendaires draveurs qui domptaient les rivières du Québec.",
    provider: { "@type": "Organization", name: org, url: baseUrl },
    areaServed: [
      { "@type": "Place", name: "Beauce" },
      { "@type": "Place", name: "Chaudière-Appalaches" },
      { "@type": "Place", name: "Sainte-Marie-de-Beauce" },
    ],
    offers: [
      { "@type": "Offer", name: locale === "en" ? "Essential Showcase" : "Vitrine Essentiel", priceCurrency: "CAD", priceSpecification: { "@type": "PriceSpecification", minPrice: "1500", maxPrice: "2200", priceCurrency: "CAD" } },
      { "@type": "Offer", name: locale === "en" ? "Interactive Pro" : "Pro Interactif", priceCurrency: "CAD", priceSpecification: { "@type": "PriceSpecification", minPrice: "3000", maxPrice: "4500", priceCurrency: "CAD" } },
      { "@type": "Offer", name: locale === "en" ? "Full Commerce" : "Commerce Complet", priceCurrency: "CAD", priceSpecification: { "@type": "PriceSpecification", minPrice: "5500", maxPrice: "8000", priceCurrency: "CAD" } },
    ],
    url: `${baseUrl}${locale === "fr" ? "" : `/${locale}`}/divisions/web`,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

type Service = { titre: string; desc: string };
type Stat = { chiffre: string; titre: string; texte: string };
type Forfait = { nom: string; prix: string; features: string[] };
type GalleryItem = { alt: string; caption: string };

export default function DivisionWebPage() {
  const t = useTranslations("divisions.divisionWeb");
  const tBrand = useTranslations("brand");
  const services = t.raw("services") as Service[];
  const heritageTexte = t.raw("heritage_texte") as string[];
  const stats = t.raw("stats") as Stat[];
  const forfaits = t.raw("forfaits") as Forfait[];
  const gallery = t.raw("heritage_gallery") as GalleryItem[];

  return (
    <>
      <WebServiceJsonLd />

      {/* ═══════════════════════════════════════════════════
          HERO — Bleu Polaire #0099D1
      ═══════════════════════════════════════════════════ */}
      <section
        className="relative px-6"
        style={{ backgroundColor: "#0099D1", color: "#F4F4F0", marginTop: "-80px", paddingTop: "176px", paddingBottom: "96px" }}
      >
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row items-start gap-10">

            {/* Mark — gauche */}
            <div className="flex-shrink-0">
              <Image
                src="/mark-web.svg"
                alt="La Flamme — Division Draveur"
                width={110}
                height={110}
                style={{ width: "110px", height: "110px" }}
                className="drop-shadow-lg"
              />
            </div>

            {/* Contenu — droite */}
            <div>
              <p className="text-xs font-bold tracking-widest uppercase mb-3" style={{ color: "rgba(244,244,240,0.60)" }}>
                {t("hero_tagline")}
              </p>
              <h1
                className="text-4xl md:text-5xl font-bold mb-6"
                style={{ color: "#F4F4F0", fontFamily: "var(--font-display, 'Gotham', 'Montserrat', system-ui)" }}
              >
                {t("hero_titre")}
              </h1>
              <p className="text-lg leading-relaxed max-w-2xl mb-10" style={{ color: "rgba(244,244,240,0.85)" }}>
                {t("hero_description")}
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/rejoindre"
                  className="px-8 py-4 rounded-lg font-bold text-lg transition"
                  style={{ backgroundColor: "#1D1D1B", color: "#F4F4F0" }}
                >
                  {t("cta_bouton")}
                </Link>
                <Link
                  href="/portfolio"
                  className="px-8 py-4 rounded-lg font-bold text-lg border transition"
                  style={{ borderColor: "rgba(244,244,240,0.50)", color: "#F4F4F0" }}
                >
                  {t("cta_portfolio")}
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          SERVICES — Blanc
      ═══════════════════════════════════════════════════ */}
      <section style={{ backgroundColor: "#FFFFFF", color: "#1D1D1B" }} className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-14" style={{ color: "#0099D1" }}>
            {t("services_titre")}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, i) => (
              <div
                key={i}
                className={`p-6 rounded-xl border-l-4 card-lift animate-fade-in-up stagger-${Math.min(i + 1, 6)}`}
                style={{ borderLeftColor: "#0099D1", backgroundColor: "#F4F4F0" }}
              >
                <h3 className="font-bold text-lg mb-2" style={{ color: "#0099D1" }}>{service.titre}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "rgba(29,29,27,0.65)" }}>{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          APPROCHE — Bleu Clair
      ═══════════════════════════════════════════════════ */}
      <section style={{ backgroundColor: "#E0F4FB", color: "#1D1D1B" }} className="py-16 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-6" style={{ color: "#0099D1" }}>{t("approche_titre")}</h2>
          <p className="text-lg leading-relaxed" style={{ color: "rgba(29,29,27,0.75)" }}>{t("approche_texte")}</p>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          HÉRITAGE DES DRAVEURS + SAVIEZ-VOUS QUE ? — Blanc
      ═══════════════════════════════════════════════════ */}
      <section style={{ backgroundColor: "#FFFFFF", color: "#1D1D1B" }} className="py-20 px-6">
        <div className="max-w-4xl mx-auto">

          {/* Narratif historique */}
          <div className="mb-14">
            <span className="inline-block text-xs font-bold px-3 py-1.5 rounded-full bg-h91-ion/10 text-h91-ion border border-h91-ion/30 mb-6 uppercase tracking-widest">
              {t("heritage_badge")}
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-6" style={{ color: "#1D1D1B" }}>
              {t("heritage_titre")}
            </h2>

            {/* Photos d'archives — Draveurs du Québec — cliquez pour agrandir */}
            <DivisionPhotoGallery
              accentColor="#0099D1"
              photos={[
                { src: "/photos_images/Botte_draveur.jpg", alt: gallery[0].alt, caption: gallery[0].caption, objectPosition: "center center" },
                { src: "/photos_images/draveur_1.avif", alt: gallery[1].alt, caption: gallery[1].caption, objectPosition: "center top" },
                { src: "/photos_images/Draveur_2.jpg", alt: gallery[2].alt, caption: gallery[2].caption, objectPosition: "center center" },
                { src: "/photos_images/Draveur_3.avif", alt: gallery[3].alt, caption: gallery[3].caption, objectPosition: "center center" },
              ]}
            />
            <p className="text-xs text-center mb-8 italic" style={{ color: "rgba(29,29,27,0.35)" }}>
              {t("heritage_photo_caption")}
            </p>

            <div className="space-y-5 text-lg leading-relaxed" style={{ color: "rgba(29,29,27,0.70)" }}>
              {heritageTexte.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
              <div className="mt-2 p-6 rounded-xl" style={{ border: "1px solid rgba(0,153,209,0.30)", backgroundColor: "rgba(0,153,209,0.06)" }}>
                <p className="font-bold text-sm uppercase tracking-widest mb-3" style={{ color: "#0099D1" }}>
                  {t("heritage_avantage_titre")}
                </p>
                <p>
                  {t("heritage_avantage_texte")}
                </p>
              </div>
            </div>
          </div>

          {/* Saviez-vous que ? */}
          <div className="rounded-2xl p-8" style={{ border: "1px solid rgba(0,153,209,0.20)", backgroundColor: "#E0F4FB" }}>
            <h3 className="font-bold text-sm uppercase tracking-widest mb-8 flex items-center gap-3" style={{ color: "#0099D1" }}>
              <span className="text-xl">💡</span> {t("stats_badge")}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {stats.map((stat, i) => (
                <div key={i} className="p-5 rounded-xl" style={{ backgroundColor: "#FFFFFF", border: "1px solid rgba(0,153,209,0.20)" }}>
                  <p className="font-bold text-4xl mb-2" style={{ color: "#0099D1" }}>{stat.chiffre}</p>
                  <p className="font-semibold text-sm mb-3" style={{ color: "#1D1D1B" }}>{stat.titre}</p>
                  <p className="text-sm leading-relaxed" style={{ color: "rgba(29,29,27,0.60)" }}>
                    {stat.texte}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          TARIFICATION — RÉSUMÉ — Bleu Clair
      ═══════════════════════════════════════════════════ */}
      <section style={{ backgroundColor: "#E0F4FB", color: "#1D1D1B" }} className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <span className="inline-block text-xs font-bold px-3 py-1.5 rounded-full mb-6 uppercase tracking-widest" style={{ backgroundColor: "rgba(0,153,209,0.12)", color: "#0099D1", border: "1px solid rgba(0,153,209,0.30)" }}>
            {t("pricing_badge")}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: "#1D1D1B" }}>
            {t("pricing_titre")}
          </h2>
          <p className="text-lg mb-12 max-w-2xl" style={{ color: "rgba(29,29,27,0.65)" }}>
            {t("pricing_sous_titre")}
          </p>

          {/* Forfaits */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {forfaits.map((forfait, i) => (
              <div
                key={i}
                className="p-6 rounded-xl flex flex-col gap-3 card-lift relative"
                style={i === 1 ? { backgroundColor: "#FFFFFF", border: "2px solid #0099D1" } : { backgroundColor: "#FFFFFF", border: "1px solid rgba(0,153,209,0.20)" }}
              >
                {i === 1 && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-xs font-bold px-3 py-1 rounded-full whitespace-nowrap" style={{ backgroundColor: "#0099D1", color: "#F4F4F0" }}>
                    {t("pricing_populaire")}
                  </span>
                )}
                <h3 className="font-bold text-lg" style={{ color: "#1D1D1B" }}>{forfait.nom}</h3>
                <p className="font-bold text-3xl" style={{ color: "#0099D1" }}>{forfait.prix}</p>
                <p className="text-xs uppercase tracking-widest" style={{ color: "rgba(29,29,27,0.50)" }}>{t("pricing_livraison_unique")}</p>
                <ul className="text-sm space-y-1.5 mt-2 flex-1" style={{ color: "rgba(29,29,27,0.70)" }}>
                  {forfait.features.map((f, fi) => (
                    <li key={fi}>✓ {f}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Maintenance */}
          <div className="p-5 rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8" style={{ backgroundColor: "rgba(0,153,209,0.08)", border: "1px solid rgba(0,153,209,0.20)" }}>
            <div>
              <p className="font-bold text-sm mb-1" style={{ color: "#1D1D1B" }}>{t("maintenance_titre")}</p>
              <p className="text-sm" style={{ color: "rgba(29,29,27,0.70)" }}>
                {t("maintenance_texte")}
              </p>
            </div>
            <p className="font-bold text-2xl whitespace-nowrap" style={{ color: "#0099D1" }}>{t("maintenance_prix_range")}</p>
          </div>

          {/* CTA vers tarification */}
          <div className="text-center">
            <Link
              href="/tarification"
              className="inline-block px-8 py-3 rounded-lg font-bold transition"
              style={{ border: "1px solid rgba(0,153,209,0.60)", color: "#0099D1" }}
            >
              {t("pricing_cta")}
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          CTA FINAL
      ═══════════════════════════════════════════════════ */}
      <section style={{ backgroundColor: "#1D1D1B", color: "#F4F4F0" }} className="py-20 px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-8" style={{ color: "#F4F4F0" }}>
          {t("cta_titre")}
        </h2>
        <Link
          href="/rejoindre"
          className="inline-block px-10 py-5 rounded-lg font-bold text-xl transition"
          style={{ backgroundColor: "#0099D1", color: "#F4F4F0" }}
        >
          {t("cta_bouton")}
        </Link>
      </section>
    </>
  );
}
