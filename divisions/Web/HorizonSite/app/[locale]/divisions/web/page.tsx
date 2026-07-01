import type { Metadata } from "next";
import { useTranslations } from "next-intl";
import { getLocale } from "next-intl/server";
import Image from "next/image";
import { Link } from "@/i18n/navigation";

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

export default function DivisionWebPage() {
  const t = useTranslations("divisions.divisionWeb");
  const tBrand = useTranslations("brand");
  const services = t.raw("services") as Service[];

  return (
    <>
      <WebServiceJsonLd />

      {/* ═══════════════════════════════════════════════════
          HERO — Bleu Polaire #0099D1
      ═══════════════════════════════════════════════════ */}
      <section
        className="relative flex flex-col items-center justify-center min-h-[70vh] text-center px-6"
        style={{ backgroundColor: "#0099D1", color: "#F4F4F0", marginTop: "-80px", paddingTop: "176px", paddingBottom: "96px" }}
      >
        {/* Mark */}
        <div className="mb-6 flex items-center justify-center">
          <Image
            src="/mark-web.svg"
            alt="La Flamme — Division Draveur — Développement Web"
            width={90}
            height={90}
            className="drop-shadow-lg"
          />
        </div>

        {/* Tagline */}
        <p className="font-bold tracking-widest uppercase text-sm mb-3" style={{ color: "rgba(244,244,240,0.75)" }}>
          {t("hero_tagline")} — {tBrand("name")}
        </p>

        {/* Titre */}
        <h1 className="text-5xl md:text-7xl font-bold mb-6" style={{ color: "#F4F4F0" }}>
          {t("hero_titre")}
        </h1>

        {/* Description */}
        <p className="text-lg md:text-xl max-w-2xl leading-relaxed" style={{ color: "rgba(244,244,240,0.85)" }}>
          {t("hero_description")}
        </p>

        {/* CTAs */}
        <div className="mt-10 flex flex-wrap gap-4 justify-center">
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
      </section>

      {/* ═══════════════════════════════════════════════════
          SERVICES — Space Black
      ═══════════════════════════════════════════════════ */}
      <section style={{ backgroundColor: "#1D1D1B", color: "#F4F4F0" }} className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-14" style={{ color: "#F4F4F0" }}>
            {t("services_titre")}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, i) => (
              <div
                key={i}
                className={`p-6 border border-h91-ion/30 rounded-xl bg-h91-gravity/50 hover:border-h91-ion/70 hover:bg-h91-gravity/80 card-lift animate-fade-in-up stagger-${Math.min(i + 1, 6)}`}
              >
                <div className="w-8 h-0.5 bg-h91-ion mb-4" />
                <h3 className="text-h91-stellar font-bold text-lg mb-2">{service.titre}</h3>
                <p className="text-h91-stellar/60 text-sm leading-relaxed">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          APPROCHE — Bleu Polaire
      ═══════════════════════════════════════════════════ */}
      <section style={{ backgroundColor: "#0099D1", color: "#F4F4F0" }} className="py-16 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-6" style={{ color: "#F4F4F0" }}>{t("approche_titre")}</h2>
          <p className="text-lg leading-relaxed" style={{ color: "rgba(244,244,240,0.88)" }}>{t("approche_texte")}</p>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          HÉRITAGE DES DRAVEURS + SAVIEZ-VOUS QUE ? — Space Black
      ═══════════════════════════════════════════════════ */}
      <section style={{ backgroundColor: "#1D1D1B", color: "#F4F4F0" }} className="py-20 px-6">
        <div className="max-w-4xl mx-auto">

          {/* Narratif historique */}
          <div className="mb-14">
            <span className="inline-block text-xs font-bold px-3 py-1.5 rounded-full bg-h91-ion/10 text-h91-ion border border-h91-ion/30 mb-6 uppercase tracking-widest">
              L&apos;héritage
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-h91-stellar mb-6">
              Maîtriser le flux, propulser votre achalandage
            </h2>

            {/* Photos d'archives — layout staggeré asymétrique */}
            {/* Desktop: grille 3 colonnes avec portrait gauche + 3 droite */}
            <div
              className="hidden md:grid mb-3"
              style={{
                gridTemplateColumns: "1fr 1.3fr 1fr",
                gridTemplateRows: "290px 210px",
                gap: "10px",
              }}
            >
              {/* Portrait tall — Bottes draveur, col 1, 2 rangées */}
              <div style={{ gridColumn: "1", gridRow: "1 / span 2" }} className="relative overflow-hidden rounded-xl">
                <Image
                  src="/photos_images/Botte_draveur.jpg"
                  alt="Bottes à crampons des draveurs — outil emblématique de la drave"
                  fill
                  className="object-cover object-center grayscale opacity-70 hover:opacity-90 hover:scale-105 transition duration-500"
                />
                <div className="absolute inset-0 bg-h91-ion/20" />
              </div>
              {/* Paysage large — draveur en action, cols 2-3 rangée 1 */}
              <div style={{ gridColumn: "2 / span 2", gridRow: "1" }} className="relative overflow-hidden rounded-xl">
                <Image
                  src="/photos_images/draveur_1.avif"
                  alt="Draveur en action sur les billots — rivière du Québec"
                  fill
                  className="object-cover object-top grayscale opacity-70 hover:opacity-90 hover:scale-105 transition duration-500"
                />
                <div className="absolute inset-0 bg-h91-ion/20" />
              </div>
              {/* Carré bas milieu */}
              <div style={{ gridColumn: "2", gridRow: "2" }} className="relative overflow-hidden rounded-lg">
                <Image
                  src="/photos_images/Draveur_2.jpg"
                  alt="Draveurs guidant les billots — maîtrise du flux"
                  fill
                  className="object-cover object-center grayscale opacity-70 hover:opacity-90 hover:scale-105 transition duration-500"
                />
                <div className="absolute inset-0 bg-h91-ion/20" />
              </div>
              {/* Carré bas droite */}
              <div style={{ gridColumn: "3", gridRow: "2" }} className="relative overflow-hidden rounded-lg">
                <Image
                  src="/photos_images/Draveur_3.avif"
                  alt="La drave — héritage québécois du contrôle du flux"
                  fill
                  className="object-cover object-center grayscale opacity-70 hover:opacity-90 hover:scale-105 transition duration-500"
                />
                <div className="absolute inset-0 bg-h91-ion/20" />
              </div>
            </div>
            {/* Mobile: grille 2x2 */}
            <div className="grid grid-cols-2 gap-3 mb-3 md:hidden">
              {[
                { src: "/photos_images/Botte_draveur.jpg", alt: "Bottes draveurs" },
                { src: "/photos_images/draveur_1.avif",   alt: "Draveur en action" },
                { src: "/photos_images/Draveur_2.jpg",    alt: "Draveurs guidant les billots" },
                { src: "/photos_images/Draveur_3.avif",   alt: "La drave québécoise" },
              ].map((p) => (
                <div key={p.src} className="relative aspect-square overflow-hidden rounded-lg">
                  <Image src={p.src} alt={p.alt} fill className="object-cover grayscale opacity-70" />
                  <div className="absolute inset-0 bg-h91-ion/20" />
                </div>
              ))}
            </div>
            <p className="text-h91-stellar/30 text-xs text-center mb-8 italic">
              Archives historiques — draveurs du Québec, fin XIXe – début XXe siècle
            </p>

            <div className="space-y-5 text-h91-stellar/70 text-lg leading-relaxed">
              <p>
                Au XIXe siècle, les draveurs du Québec sautaient courageusement sur les rivières
                tumultueuses pour guider des milliers de billots de bois vers les moulins. C&apos;était
                un travail d&apos;agilité pure, de synchronisation et de contrôle du flux. Un seul billot
                mal positionné, et c&apos;était l&apos;embâcle — le blocage qui paralysait toute l&apos;économie
                de la région.
              </p>
              <p>
                Aujourd&apos;hui, la rivière, c&apos;est le Web. Les flux de données, de trafic et
                d&apos;utilisateurs déferlent chaque seconde. La Division Draveur conçoit des portails
                web robustes pour s&apos;assurer que vos clients naviguent de manière fluide jusqu&apos;à vous,
                sans aucun embâcle technique. Nous éliminons les bugs, optimisons votre SEO et guidons
                l&apos;achalandage directement vers vos objectifs de conversion.
              </p>
              <div className="mt-2 p-6 rounded-xl border border-h91-ion/30 bg-h91-ion/5">
                <p className="text-h91-ion font-bold text-sm uppercase tracking-widest mb-3">
                  L&apos;avantage Étoile Boréale
                </p>
                <p>
                  La Division Draveur ne recule devant aucun courant, aussi complexe soit votre
                  chantier web. En éliminant la structure lourde et le flafla des grandes firmes,
                  nous vous livrons des plateformes d&apos;élite à un prix 20 % à 40 % plus bas — avec un
                  cœur à l&apos;ouvrage et une fierté locale que l&apos;argent ne peut pas acheter.
                </p>
              </div>
            </div>
          </div>

          {/* Saviez-vous que ? */}
          <div className="border border-h91-ion/20 rounded-2xl bg-h91-gravity/50 p-8">
            <h3 className="text-h91-ion font-bold text-sm uppercase tracking-widest mb-8 flex items-center gap-3">
              <span className="text-xl">💡</span> Saviez-vous que ?
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-5 rounded-xl bg-h91-ion/5 border border-h91-ion/20">
                <p className="text-h91-ion font-bold text-4xl mb-2">+22 %</p>
                <p className="text-h91-stellar font-semibold text-sm mb-3">Croissance des revenus</p>
                <p className="text-h91-stellar/60 text-sm leading-relaxed">
                  Selon la Banque de développement du Canada (BDC), les PME qui investissent
                  activement dans leur présence numérique affichent une croissance de leurs revenus
                  jusqu&apos;à 22 % supérieure à celles qui négligent le web. C&apos;est le levier de
                  visibilité le plus puissant de l&apos;ère moderne.
                </p>
              </div>
              <div className="p-5 rounded-xl bg-h91-ion/5 border border-h91-ion/20">
                <p className="text-h91-ion font-bold text-4xl mb-2">3 k$ — 10 k$</p>
                <p className="text-h91-stellar font-semibold text-sm mb-3">Le prix du marché canadien</p>
                <p className="text-h91-stellar/60 text-sm leading-relaxed">
                  En moyenne, la conception d&apos;un site web professionnel sur mesure par une agence
                  canadienne varie entre 3 000 $ et 10 000 $ — et grimpe bien plus haut pour les
                  plateformes complexes. L&apos;avantage Étoile Boréale : service régional humain,
                  ultra-réactif, sans les frais gonflés des grandes agences métropolitaines.
                </p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          TARIFICATION — RÉSUMÉ — Bleu Polaire
      ═══════════════════════════════════════════════════ */}
      <section style={{ backgroundColor: "#0099D1", color: "#F4F4F0" }} className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <span className="inline-block text-xs font-bold px-3 py-1.5 rounded-full mb-6 uppercase tracking-widest" style={{ backgroundColor: "rgba(255,255,255,0.20)", color: "#F4F4F0", border: "1px solid rgba(255,255,255,0.30)" }}>
            Investissement
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: "#F4F4F0" }}>
            Des forfaits clairs pour chaque ambition
          </h2>
          <p className="text-lg mb-12 max-w-2xl" style={{ color: "rgba(244,244,240,0.70)" }}>
            Livraison unique, sans surprise. La maintenance mensuelle assure la santé
            de votre site sur le long terme.
          </p>

          {/* Forfaits */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">

            {/* Vitrine Essentiel */}
            <div className="p-6 rounded-xl flex flex-col gap-3 card-lift" style={{ backgroundColor: "rgba(29,29,27,0.70)", border: "1px solid rgba(255,255,255,0.15)" }}>
              <h3 className="font-bold text-lg" style={{ color: "#F4F4F0" }}>Vitrine Essentiel</h3>
              <p className="font-bold text-3xl" style={{ color: "#F4F4F0" }}>1 500 – 2 200 $</p>
              <p className="text-xs uppercase tracking-widest" style={{ color: "rgba(244,244,240,0.50)" }}>Livraison unique</p>
              <ul className="text-sm space-y-1.5 mt-2 flex-1" style={{ color: "rgba(244,244,240,0.75)" }}>
                <li>✓ Site vitrine sur mesure</li>
                <li>✓ Mobile-first & ultra-rapide</li>
                <li>✓ SEO de base inclus</li>
                <li>✓ Jusqu&apos;à 5 pages</li>
              </ul>
            </div>

            {/* Pro Interactif — Featured */}
            <div className="p-6 rounded-xl flex flex-col gap-3 card-lift relative" style={{ backgroundColor: "rgba(29,29,27,0.75)", border: "2px solid rgba(255,255,255,0.60)" }}>
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-xs font-bold px-3 py-1 rounded-full whitespace-nowrap" style={{ backgroundColor: "#F4F4F0", color: "#0099D1" }}>
                Le plus populaire
              </span>
              <h3 className="font-bold text-lg" style={{ color: "#F4F4F0" }}>Pro Interactif</h3>
              <p className="font-bold text-3xl" style={{ color: "#F4F4F0" }}>3 000 – 4 500 $</p>
              <p className="text-xs uppercase tracking-widest" style={{ color: "rgba(244,244,240,0.50)" }}>Livraison unique</p>
              <ul className="text-sm space-y-1.5 mt-2 flex-1" style={{ color: "rgba(244,244,240,0.75)" }}>
                <li>✓ Réservation / blog / galerie</li>
                <li>✓ Formulaires avancés</li>
                <li>✓ SEO local renforcé</li>
                <li>✓ Intégrations tierces</li>
              </ul>
            </div>

            {/* Commerce Complet */}
            <div className="p-6 rounded-xl flex flex-col gap-3 card-lift" style={{ backgroundColor: "rgba(29,29,27,0.70)", border: "1px solid rgba(255,255,255,0.15)" }}>
              <h3 className="font-bold text-lg" style={{ color: "#F4F4F0" }}>Commerce Complet</h3>
              <p className="font-bold text-3xl" style={{ color: "#F4F4F0" }}>5 500 – 8 000 $+</p>
              <p className="text-xs uppercase tracking-widest" style={{ color: "rgba(244,244,240,0.50)" }}>Livraison unique</p>
              <ul className="text-sm space-y-1.5 mt-2 flex-1" style={{ color: "rgba(244,244,240,0.75)" }}>
                <li>✓ E-commerce & paiement Stripe</li>
                <li>✓ Panel admin sur mesure</li>
                <li>✓ Gestion de stock</li>
                <li>✓ Architecture évolutive</li>
              </ul>
            </div>
          </div>

          {/* Maintenance */}
          <div className="p-5 rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8" style={{ backgroundColor: "rgba(0,0,0,0.25)", border: "1px solid rgba(255,255,255,0.20)" }}>
            <div>
              <p className="font-bold text-sm mb-1" style={{ color: "#F4F4F0" }}>+ Maintenance mensuelle</p>
              <p className="text-sm" style={{ color: "rgba(244,244,240,0.70)" }}>
                Incluse dans tout contrat — à partir de <span className="font-bold" style={{ color: "#F4F4F0" }}>150 $/mois</span>.
                Mises à jour, sécurité, monitoring et support continu.
              </p>
            </div>
            <p className="font-bold text-2xl whitespace-nowrap" style={{ color: "#F4F4F0" }}>150 – 350 $/mois</p>
          </div>

          {/* CTA vers tarification */}
          <div className="text-center">
            <Link
              href="/tarification"
              className="inline-block px-8 py-3 rounded-lg font-bold transition"
              style={{ border: "1px solid rgba(255,255,255,0.70)", color: "#F4F4F0" }}
            >
              Voir tous les détails & options →
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
