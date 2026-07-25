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
    fr: "Division Carillon — Cybersécurité & Surveillance Dark Web",
    en: "Carillon Division — Cybersecurity & Dark Web Monitoring",
    es: "División Carillon — Ciberseguridad & Monitoreo Dark Web",
  };
  const descriptions: Record<string, string> = {
    fr: "En 1758, Montcalm défendit Carillon contre l'impossible. La Division Carillon défend votre entreprise avec la même ténacité. Saurel (surveillance Dark Web), audit sécurité, conformité Loi 25 — PME québécoises.",
    en: "In 1758, Montcalm held Fort Carillon against impossible odds. Carillon Division defends your business with the same tenacity. Saurel dark web monitoring, security audits, Law 25 compliance.",
    es: "En 1758, Montcalm defendió Carillon contra lo imposible. La División Carillon defiende su empresa con la misma tenacidad. Saurel (monitoreo Dark Web), auditoría de seguridad.",
  };

  const baseUrl = locale === "en" ? "https://borealstar.ca" : "https://etoileboreale.ca";
  const canonical = `${baseUrl}${locale === "fr" ? "" : `/${locale}`}/divisions/cyber`;

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
// JSON-LD — Service Cybersécurité + SoftwareApplication Saurel
// ─────────────────────────────────────────────────────────
async function CyberServiceJsonLd() {
  const locale = await getLocale();
  const baseUrl = locale === "en" ? "https://borealstar.ca" : "https://etoileboreale.ca";
  const org = locale === "en" ? "Boreal Star Group" : locale === "es" ? "Grupo Estrella Boreal" : "Groupe Étoile Boréale";
  const pageUrl = `${baseUrl}${locale === "fr" ? "" : `/${locale}`}/divisions/cyber`;

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name:
        locale === "en" ? "Carillon Division — Cybersecurity"
        : locale === "es" ? "División Carillon — Ciberseguridad"
        : "Division Carillon — Cybersécurité",
      serviceType: "Cybersecurity",
      description:
        locale === "en"
          ? "Cybersecurity consulting and dark web monitoring for Quebec SMBs. Named after the Battle of Carillon (1758), where Montcalm's 3,600 men repelled 15,000 British troops — defending the outnumbered with intelligence and strategy."
          : locale === "es"
          ? "Consultoría en ciberseguridad y monitoreo del dark web para pymes de Quebec. Nombrada en honor a la Batalla de Carillon (1758), donde Montcalm repelió a 15,000 soldados con solo 3,600 hombres."
          : "Conseil en cybersécurité et surveillance du Dark Web pour les PME québécoises. Nommée en hommage à la Bataille de Carillon (1758), où Montcalm repoussa 15 000 soldats britanniques avec seulement 3 600 hommes.",
      provider: { "@type": "Organization", name: org, url: baseUrl },
      areaServed: [
        { "@type": "Place", name: "Beauce" },
        { "@type": "Place", name: "Chaudière-Appalaches" },
        { "@type": "Place", name: "Québec" },
      ],
      url: pageUrl,
    },
    {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: "Saurel",
      applicationCategory: "SecurityApplication",
      operatingSystem: "Web",
      description:
        locale === "en"
          ? "Saurel is a dark web monitoring SaaS. Like the historic Fort Saurel that guarded the Richelieu River, it acts as the strategic lock of your business — scanning clandestine markets, forums and data leaks to alert you before damage is done."
          : locale === "es"
          ? "Saurel es un SaaS de monitoreo del dark web. Como el histórico Fuerte Saurel que vigilaba el río Richelieu, actúa como el candado estratégico de su empresa — escaneando mercados clandestinos y filtraciones de datos antes de que ocurra el daño."
          : "Saurel est un SaaS de surveillance du Dark Web. Comme le fort historique qui verrouillait la rivière Richelieu, il agit comme le verrou stratégique de votre entreprise — scannant marchés clandestins, forums et fuites de données avant que les dommages soient faits.",
      offers: [
        { "@type": "Offer", name: "Sentinelle", price: "75", priceCurrency: "CAD" },
        { "@type": "Offer", name: "Gardien", price: "150", priceCurrency: "CAD" },
        { "@type": "Offer", name: "Bouclier", price: "200", priceCurrency: "CAD" },
        { "@type": "Offer", name: "Forteresse", price: "350", priceCurrency: "CAD" },
      ],
      provider: { "@type": "Organization", name: org, url: baseUrl },
      url: pageUrl,
    },
  ];

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

type Service = { titre: string; desc: string };

/* ─────────────────────────────────────────────────────────────
   SAUREL / CHAMBLY — méta tarifaire statique (nom, prix, mise en avant)
   Les champs traduisibles (cible, features) viennent de messages/*.json
   Saurel = Dark Web Monitoring SaaS (ex-Argos)
───────────────────────────────────────────────────────────────── */
const SAUREL_META = [
  { nom: "Sentinelle", prix: "75 $", featured: false, forteresse: false },
  { nom: "Gardien", prix: "150 $", featured: true, forteresse: false },
  { nom: "Bouclier", prix: "200 $", featured: false, forteresse: false },
  { nom: "Forteresse", prix: "350 $", featured: false, forteresse: true },
];

/* Paliers unifiés Suite Carignan : Sentinelle/Gardien/Bouclier/Forteresse */
const CHAMBLY_META = [
  { nom: "Sentinelle", prix: "55 $", featured: false, forteresse: false },
  { nom: "Gardien", prix: "200 $", featured: true, forteresse: false },
  { nom: "Bouclier", prix: "400 $", featured: false, forteresse: false },
  { nom: "Forteresse", prix: "1 250 $", featured: false, forteresse: true },
];

/* ─────────────────────────────────────────────────────────────
   SUITE CARIGNAN — produits à venir (blurred / zone de travaux)
   nom = identité produit (non traduit), categorie vient des messages
───────────────────────────────────────────────────────────────── */
const SUITE_CARIGNAN_NOMS = ["Contrecoeur", "Berthier", "Salières"];

/* ─────────────────────────────────────────────────────────────
   LA CHAÎNE DES 5 FORTS — lore Carignan-Salières
   fort/produit = identité (non traduits), mission vient des messages
───────────────────────────────────────────────────────────────── */
const CHAINE_FORTS_META = [
  { fort: "Fort Saurel", produit: "Saurel", statut: "production" as const, accentColor: "#203478" },
  { fort: "Fort Contrecoeur", produit: "Contrecoeur", statut: "dev" as const, accentColor: "#203478" },
  { fort: "Berthier", produit: "Berthier", statut: "dev" as const, accentColor: "#203478" },
  { fort: "Fort Chambly", produit: "Chambly", statut: "beta" as const, accentColor: "#203478" },
  { fort: "Fort Salières", produit: "Salières", statut: "dev" as const, accentColor: "#203478" },
];

type Stat = { chiffre: string; titre: string; texte: string };
type DevTier = { nom: string; prix: string; cible: string; features: string[] };
type GalleryItem = { alt: string; caption: string };

export default function DivisionCyberPage() {
  const t = useTranslations("divisions.divisionCyber");
  const tBrand = useTranslations("brand");
  const services = t.raw("services") as Service[];

  const heritageTexte = t.raw("heritage_texte") as string[];
  const stats = t.raw("stats") as Stat[];
  const gallery = t.raw("heritage_gallery") as GalleryItem[];

  const tuiRecommande = t("tiers_ui.recommande");
  const tuiDemarrer = t("tiers_ui.demarrer");
  const tuiAccesAnticipe = t("tiers_ui.acces_anticipe");
  const tuiNousContacter = t("tiers_ui.nous_contacter");
  const tuiRejoindreListe = t("tiers_ui.rejoindre_liste");
  const tuiUniteMois = t("tiers_ui.unite_mois");
  const tuiTarifsIndicatifs = t("tiers_ui.tarifs_indicatifs");
  const tuiContexteBadge = t("tiers_ui.contexte_badge");
  const avantageTitre = t("heritage_avantage_titre");

  const saurelCibles = t.raw("saurel.tiers_cible") as string[];
  const saurelFeatures = t.raw("saurel.tiers_features") as string[][];
  const SAUREL_TIERS = SAUREL_META.map((m, i) => ({ ...m, unite: tuiUniteMois, cible: saurelCibles[i], features: saurelFeatures[i] }));

  const chamblyCibles = t.raw("chambly.tiers_cible") as string[];
  const chamblyFeatures = t.raw("chambly.tiers_features") as string[][];
  const CHAMBLY_TIERS = CHAMBLY_META.map((m, i) => ({ ...m, unite: tuiUniteMois, cible: chamblyCibles[i], features: chamblyFeatures[i] }));

  const contrecoeurTiers = t.raw("contrecoeur.tiers") as DevTier[];
  const berthierTiers = t.raw("berthier.tiers") as DevTier[];
  const salieresTiers = t.raw("salieres.tiers") as DevTier[];

  const chaineMissions = t.raw("chaine_forts.missions") as string[];
  const CHAINE_FORTS = CHAINE_FORTS_META.map((m, i) => ({ ...m, mission: chaineMissions[i] }));

  const suiteCarignanCategories = t.raw("suite_carignan.categories") as string[];
  const SUITE_CARIGNAN = SUITE_CARIGNAN_NOMS.map((nom, i) => ({ nom, categorie: suiteCarignanCategories[i] }));

  return (
    <>
      <CyberServiceJsonLd />

      {/* ═══════════════════════════════════════════════════
          HERO — Bleu Nuit #203478
      ═══════════════════════════════════════════════════ */}
      <section
        className="relative px-6"
        style={{ backgroundColor: "#203478", color: "#F4F4F0", marginTop: "-80px", paddingTop: "176px", paddingBottom: "96px" }}
      >
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row items-start gap-10">

            {/* Mark — gauche */}
            <div className="flex-shrink-0">
              <Image
                src="/mark-cyber.svg"
                alt="Singularité — Division Carillon"
                width={110}
                height={110}
                style={{ width: "110px", height: "110px", filter: "brightness(0) invert(1)" }}
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
              <p className="text-lg leading-relaxed max-w-2xl mb-10" style={{ color: "rgba(244,244,240,0.80)" }}>
                {t("hero_description")}
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/rejoindre"
                  className="px-8 py-4 rounded-lg font-bold text-lg transition"
                  style={{ backgroundColor: "#F4F4F0", color: "#203478" }}
                >
                  {t("cta_bouton")}
                </Link>
                <Link
                  href="/divisions"
                  className="px-8 py-4 rounded-lg font-bold text-lg transition"
                  style={{ border: "1px solid rgba(244,244,240,0.45)", color: "#F4F4F0" }}
                >
                  {t("cta_portfolio")}
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          SERVICES CONSEILS — Blanc
      ═══════════════════════════════════════════════════ */}
      <section className="py-20 px-6" style={{ backgroundColor: "#FFFFFF" }}>
        <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-14" style={{ color: "#203478" }}>
          {t("services_titre")}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <div
              key={i}
              className="p-6 rounded-xl border-l-4 card-lift"
              style={{ borderLeftColor: "#203478", backgroundColor: "#F4F4F0" }}
            >
              <h3 className="font-bold text-lg mb-2" style={{ color: "#203478" }}>{service.titre}</h3>
              <p className="text-sm leading-relaxed" style={{ color: "rgba(29,29,27,0.65)" }}>{service.desc}</p>
            </div>
          ))}
        </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          APPROCHE — Gris Nuit
      ═══════════════════════════════════════════════════ */}
      <section className="py-16 px-6" style={{ backgroundColor: "#E3E6EF" }}>
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-6" style={{ color: "#203478" }}>{t("approche_titre")}</h2>
          <p className="text-lg leading-relaxed" style={{ color: "rgba(29,29,27,0.75)" }}>{t("approche_texte")}</p>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          HÉRITAGE DE CARILLON + SAVIEZ-VOUS QUE ? — Blanc
      ═══════════════════════════════════════════════════ */}
      <section className="py-20 px-6" style={{ backgroundColor: "#FFFFFF" }}>
        <div className="max-w-4xl mx-auto">

          {/* Narratif historique */}
          <div className="mb-14">
            <span className="inline-block text-xs font-bold px-3 py-1.5 rounded-full bg-h91-accretion/10 text-h91-accretion border border-h91-accretion/30 mb-6 uppercase tracking-widest">
              {t("heritage_badge")}
            </span>
            <h2 className="text-2xl md:text-3xl font-bold mb-6 whitespace-nowrap text-center" style={{ color: "#1D1D1B" }}>
              {t("heritage_titre")}
            </h2>

            {/* Photos d'archives — Bataille de Carillon — cliquez pour agrandir */}
            <DivisionPhotoGallery
              accentColor="#203478"
              photos={[
                { src: "/photos_images/British at Carillon.webp", alt: gallery[0].alt, caption: gallery[0].caption, objectPosition: "center center" },
                { src: "/photos_images/The_Victory_of_Montcalms_Troops_at_Carillon_by_Henry_Alexander_OgdenAAA.jpg", alt: gallery[1].alt, caption: gallery[1].caption, objectPosition: "center 70%" },
                { src: "/photos_images/Carillon_map.jpg", alt: gallery[2].alt, caption: gallery[2].caption, objectPosition: "center center" },
                { src: "/photos_images/Fort_Carillon_1.jpg", alt: gallery[3].alt, caption: gallery[3].caption, objectPosition: "center center" },
              ]}
            />
            <p className="text-xs text-center mb-8 italic" style={{ color: "rgba(29,29,27,0.30)" }}>
              {t("heritage_photo_caption")}
            </p>

            <div className="space-y-5 text-lg leading-relaxed" style={{ color: "rgba(29,29,27,0.70)" }}>
              {heritageTexte.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
              <div className="mt-2 p-6 rounded-xl" style={{ border: "1px solid rgba(32,52,120,0.25)", backgroundColor: "rgba(32,52,120,0.06)" }}>
                <p className="font-bold text-sm uppercase tracking-widest mb-3" style={{ color: "#203478" }}>
                  {avantageTitre}
                </p>
                <p>
                  {t("heritage_avantage_texte")}
                </p>
              </div>
            </div>
          </div>

          {/* Saviez-vous que ? */}
          <div className="rounded-2xl p-8" style={{ border: "1px solid rgba(32,52,120,0.20)", backgroundColor: "#E3E6EF" }}>
            <h3 className="font-bold text-sm uppercase tracking-widest mb-8 flex items-center gap-3" style={{ color: "#203478" }}>
              <span className="text-xl">💡</span> {t("stats_badge")}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {stats.map((stat, i) => (
                <div key={i} className="p-5 rounded-xl" style={{ backgroundColor: "#FFFFFF", border: "1px solid rgba(32,52,120,0.20)" }}>
                  <p className="font-bold text-4xl mb-2" style={{ color: "#203478" }}>{stat.chiffre}</p>
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
          SAUREL — PRODUIT PHARE — Gris Nuit
      ═══════════════════════════════════════════════════ */}
      <section className="py-24 px-6" style={{ backgroundColor: "#E3E6EF" }}>
        <div className="max-w-6xl mx-auto">

          {/* En-tête */}
          <div className="text-center mb-16">
            <span className="inline-block text-xs font-bold px-3 py-1.5 rounded-full bg-h91-accretion/10 text-h91-accretion border border-h91-accretion/30 mb-6 uppercase tracking-widest">
              {t("saurel.badge")}
            </span>
            <h2 className="text-6xl md:text-7xl font-bold mb-5 tracking-tight" style={{ color: "#1D1D1B" }}>
              SAUREL
            </h2>
            <p className="font-semibold text-lg md:text-xl italic max-w-2xl mx-auto mb-5" style={{ color: "#203478" }}>
              {t("saurel.tagline")}
            </p>
            <p className="text-base max-w-2xl mx-auto leading-relaxed" style={{ color: "rgba(29,29,27,0.65)" }}>
              {t("saurel.intro")}
            </p>
          </div>

          {/* Tiers */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {SAUREL_TIERS.map((tier, i) => (
              <div
                key={i}
                className="relative p-6 rounded-xl flex flex-col gap-4 transition card-lift"
                style={
                  tier.featured
                    ? { backgroundColor: "#FFFFFF", border: "2px solid #203478" }
                    : tier.forteresse
                    ? { backgroundColor: "#FFFFFF", border: "1px solid rgba(201,168,76,0.40)" }
                    : { backgroundColor: "#FFFFFF", border: "1px solid rgba(32,52,120,0.25)" }
                }
              >
                {tier.featured && (
                  <span className="absolute -top-4 left-1/2 -translate-x-1/2 text-h91-gravity text-xs font-bold px-4 py-1 rounded-full uppercase tracking-widest whitespace-nowrap" style={{ backgroundColor: "#203478", color: "#F4F4F0" }}>
                    {tuiRecommande}
                  </span>
                )}

                <div>
                  <h3
                    className="text-xl font-bold"
                    style={{ color: tier.featured ? "#203478" : tier.forteresse ? "#C9A84C" : "#1D1D1B" }}
                  >
                    {tier.nom}
                  </h3>
                  <p className="text-xs mt-1" style={{ color: "rgba(29,29,27,0.50)" }}>{tier.cible}</p>
                </div>

                <div className="flex items-baseline gap-1">
                  <span
                    className="text-3xl font-extrabold"
                    style={{ color: tier.featured ? "#203478" : tier.forteresse ? "#C9A84C" : "#1D1D1B" }}
                  >
                    {tier.prix}
                  </span>
                  <span className="text-sm" style={{ color: "rgba(29,29,27,0.50)" }}>{tier.unite}</span>
                </div>

                <ul className="flex flex-col gap-2 flex-1">
                  {tier.features.map((f, fi) => (
                    <li
                      key={fi}
                      className="flex items-start gap-2 text-sm"
                      style={{ color: "rgba(29,29,27,0.70)" }}
                    >
                      <span className="mt-0.5 shrink-0" style={{ color: "#203478" }}>✓</span>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  href="/rejoindre"
                  className="mt-2 block text-center py-3 rounded-lg font-bold text-sm transition"
                  style={
                    tier.featured
                      ? { backgroundColor: "#203478", color: "#F4F4F0" }
                      : tier.forteresse
                      ? { border: "1px solid rgba(201,168,76,0.50)", color: "#C9A84C" }
                      : { border: "1px solid rgba(32,52,120,0.40)", color: "#203478" }
                  }
                >
                  {tuiDemarrer}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          FORT SAUREL — CONTEXTE HISTORIQUE & SENTINELLES — Blanc
      ═══════════════════════════════════════════════════ */}
      <section className="py-20 px-6" style={{ backgroundColor: "#FFFFFF" }}>
        <div className="max-w-4xl mx-auto">

          {/* Contexte historique */}
          <div className="mb-10">
            <span className="inline-block text-xs font-bold px-3 py-1.5 rounded-full bg-h91-accretion/10 text-h91-accretion border border-h91-accretion/30 mb-6 uppercase tracking-widest">
              {tuiContexteBadge}
            </span>
            <h3 className="text-2xl md:text-3xl font-bold mb-6" style={{ color: "#1D1D1B" }}>
              {t("saurel.contexte_titre")}
            </h3>
            <div className="space-y-5 text-lg leading-relaxed" style={{ color: "rgba(29,29,27,0.70)" }}>
              {(t.raw("saurel.contexte_paragraphs") as string[]).map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </div>

          {/* Les Sentinelles */}
          <div className="mb-10 p-7 rounded-2xl" style={{ border: "1px solid rgba(32,52,120,0.20)", backgroundColor: "#E3E6EF" }}>
            <h3 className="text-xl font-bold mb-4" style={{ color: "#1D1D1B" }}>
              {t("saurel.sentinelles_titre")}
            </h3>
            <div className="space-y-4 text-base leading-relaxed" style={{ color: "rgba(29,29,27,0.70)" }}>
              {(t.raw("saurel.sentinelles_paragraphs") as string[]).map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </div>

          {/* Avantage Boréale */}
          <div className="p-6 rounded-xl" style={{ border: "1px solid rgba(32,52,120,0.25)", backgroundColor: "rgba(32,52,120,0.06)" }}>
            <p className="font-bold text-sm uppercase tracking-widest mb-3" style={{ color: "#203478" }}>
              {avantageTitre}
            </p>
            <p className="text-lg leading-relaxed" style={{ color: "rgba(29,29,27,0.70)" }}>
              {t("saurel.avantage_texte")}
            </p>
          </div>

        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          CHAMBLY — PRODUIT IAM — Bleu Nuit
      ═══════════════════════════════════════════════════ */}
      <section className="py-24 px-6" style={{ backgroundColor: "#E3E6EF" }}>
        <div className="max-w-6xl mx-auto">

          {/* En-tête */}
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-3 mb-6">
              <span className="inline-block text-xs font-bold px-3 py-1.5 rounded-full bg-h91-accretion/10 text-h91-accretion border border-h91-accretion/30 uppercase tracking-widest">
                {t("chambly.produit_badge")}
              </span>
              <span className="inline-block text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-widest" style={{ backgroundColor: "rgba(201,168,76,0.15)", color: "#C9A84C", border: "1px solid rgba(201,168,76,0.40)" }}>
                {t("chambly.acces_anticipe_badge")}
              </span>
            </div>
            <h2 className="text-6xl md:text-7xl font-bold mb-5 tracking-tight" style={{ color: "#1D1D1B" }}>
              CHAMBLY
            </h2>
            <p className="font-semibold text-lg md:text-xl italic max-w-2xl mx-auto mb-5" style={{ color: "#203478" }}>
              {t("chambly.tagline")}
            </p>
            <p className="text-base max-w-2xl mx-auto leading-relaxed" style={{ color: "rgba(29,29,27,0.65)" }}>
              {t("chambly.intro")}
            </p>
          </div>

          {/* Tiers */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {CHAMBLY_TIERS.map((tier, i) => (
              <div
                key={i}
                className="relative p-6 rounded-xl flex flex-col gap-4 transition card-lift"
                style={
                  tier.featured
                    ? { backgroundColor: "#FFFFFF", border: "2px solid #203478" }
                    : tier.forteresse
                    ? { backgroundColor: "#FFFFFF", border: "1px solid rgba(201,168,76,0.40)" }
                    : { backgroundColor: "#FFFFFF", border: "1px solid rgba(32,52,120,0.25)" }
                }
              >
                {tier.featured && (
                  <span className="absolute -top-4 left-1/2 -translate-x-1/2 text-xs font-bold px-4 py-1 rounded-full uppercase tracking-widest whitespace-nowrap" style={{ backgroundColor: "#203478", color: "#F4F4F0" }}>
                    {tuiRecommande}
                  </span>
                )}

                <div>
                  <h3
                    className="text-xl font-bold"
                    style={{ color: tier.featured ? "#203478" : tier.forteresse ? "#C9A84C" : "#1D1D1B" }}
                  >
                    {tier.nom}
                  </h3>
                  <p className="text-xs mt-1" style={{ color: "rgba(29,29,27,0.50)" }}>{tier.cible}</p>
                </div>

                <div className="flex items-baseline gap-1">
                  <span
                    className="text-3xl font-extrabold"
                    style={{ color: tier.featured ? "#203478" : tier.forteresse ? "#C9A84C" : "#1D1D1B" }}
                  >
                    {tier.prix}
                  </span>
                  {tier.unite && (
                    <span className="text-sm" style={{ color: "rgba(29,29,27,0.50)" }}>{tier.unite}</span>
                  )}
                </div>

                <ul className="flex flex-col gap-2 flex-1">
                  {tier.features.map((f, fi) => (
                    <li
                      key={fi}
                      className="flex items-start gap-2 text-sm"
                      style={{ color: "rgba(29,29,27,0.70)" }}
                    >
                      <span className="mt-0.5 shrink-0" style={{ color: "#203478" }}>✓</span>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  href="/rejoindre"
                  className="mt-2 block text-center py-3 rounded-lg font-bold text-sm transition"
                  style={
                    tier.featured
                      ? { backgroundColor: "#203478", color: "#F4F4F0" }
                      : tier.forteresse
                      ? { border: "1px solid rgba(201,168,76,0.50)", color: "#C9A84C" }
                      : { border: "1px solid rgba(32,52,120,0.40)", color: "#203478" }
                  }
                >
                  {tier.forteresse ? tuiNousContacter : tuiAccesAnticipe}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          FORT CHAMBLY — CONTEXTE HISTORIQUE — Blanc
      ═══════════════════════════════════════════════════ */}
      <section className="py-20 px-6" style={{ backgroundColor: "#FFFFFF" }}>
        <div className="max-w-4xl mx-auto">

          {/* Contexte historique */}
          <div className="mb-10">
            <span className="inline-block text-xs font-bold px-3 py-1.5 rounded-full bg-h91-accretion/10 text-h91-accretion border border-h91-accretion/30 mb-6 uppercase tracking-widest">
              {tuiContexteBadge}
            </span>
            <h3 className="text-2xl md:text-3xl font-bold mb-6" style={{ color: "#1D1D1B" }}>
              {t("chambly.contexte_titre")}
            </h3>
            <div className="space-y-5 text-lg leading-relaxed" style={{ color: "rgba(29,29,27,0.70)" }}>
              {(t.raw("chambly.contexte_paragraphs") as string[]).map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </div>

          {/* Que font les guérites */}
          <div className="mb-10 p-7 rounded-2xl" style={{ border: "1px solid rgba(32,52,120,0.20)", backgroundColor: "#E3E6EF" }}>
            <h3 className="text-xl font-bold mb-4" style={{ color: "#1D1D1B" }}>
              {t("chambly.guerites_titre")}
            </h3>
            <div className="space-y-4 text-base leading-relaxed" style={{ color: "rgba(29,29,27,0.70)" }}>
              {(t.raw("chambly.guerites_paragraphs") as string[]).map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </div>

          {/* Avantage Boréale */}
          <div className="p-6 rounded-xl" style={{ border: "1px solid rgba(32,52,120,0.25)", backgroundColor: "rgba(32,52,120,0.06)" }}>
            <p className="font-bold text-sm uppercase tracking-widest mb-3" style={{ color: "#203478" }}>
              {avantageTitre}
            </p>
            <p className="text-lg leading-relaxed" style={{ color: "rgba(29,29,27,0.70)" }}>
              {t("chambly.avantage_texte")}
            </p>
          </div>

        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          CONTRECOEUR — EN DÉVELOPPEMENT
      ═══════════════════════════════════════════════════ */}

      {/* Header + Cartes */}
      <section className="py-24 px-6" style={{ backgroundColor: "#E3E6EF" }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-3 mb-6">
              <span className="inline-block text-xs font-bold px-3 py-1.5 rounded-full bg-h91-accretion/10 text-h91-accretion border border-h91-accretion/30 uppercase tracking-widest">
                {t("contrecoeur.categorie_badge")}
              </span>
              <span className="inline-block text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-widest" style={{ backgroundColor: "rgba(32,52,120,0.10)", color: "#203478", border: "1px solid rgba(32,52,120,0.25)" }}>
                {t("contrecoeur.disponibilite_badge")}
              </span>
            </div>
            <h2 className="text-6xl md:text-7xl font-bold mb-5 tracking-tight" style={{ color: "#1D1D1B" }}>CONTRECOEUR</h2>
            <p className="font-semibold text-lg md:text-xl italic max-w-2xl mx-auto mb-5" style={{ color: "#203478" }}>
              {t("contrecoeur.tagline")}
            </p>
            <p className="text-base max-w-2xl mx-auto leading-relaxed" style={{ color: "rgba(29,29,27,0.65)" }}>
              {t("contrecoeur.intro")}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {contrecoeurTiers.map((tier, i) => {
              const featured = i === 1;
              const forteresse = i === 3;
              return (
              <div key={i} className="relative p-6 rounded-xl flex flex-col gap-4 transition card-lift"
                style={featured ? { backgroundColor: "#FFFFFF", border: "2px solid #203478" } : forteresse ? { backgroundColor: "#FFFFFF", border: "1px solid rgba(201,168,76,0.40)" } : { backgroundColor: "#FFFFFF", border: "1px solid rgba(32,52,120,0.20)" }}>
                {featured && <span className="absolute -top-4 left-1/2 -translate-x-1/2 text-xs font-bold px-4 py-1 rounded-full uppercase tracking-widest whitespace-nowrap" style={{ backgroundColor: "#203478", color: "#F4F4F0" }}>{tuiRecommande}</span>}
                <div>
                  <h3 className="text-xl font-bold" style={{ color: featured ? "#203478" : forteresse ? "#C9A84C" : "#1D1D1B" }}>{tier.nom}</h3>
                  <p className="text-xs mt-1" style={{ color: "rgba(29,29,27,0.50)" }}>{tier.cible}</p>
                </div>
                <p className="text-3xl font-extrabold" style={{ color: featured ? "#203478" : forteresse ? "#C9A84C" : "#1D1D1B" }}>{tier.prix} <span className="text-sm font-normal" style={{ color: "rgba(29,29,27,0.50)" }}>{tuiUniteMois}</span></p>
                <ul className="flex flex-col gap-2 flex-1">
                  {tier.features.map((f, fi) => <li key={fi} className="flex items-start gap-2 text-sm" style={{ color: "rgba(29,29,27,0.70)" }}><span className="mt-0.5 shrink-0" style={{ color: "#203478" }}>✓</span><span>{f}</span></li>)}
                </ul>
                <Link href="/rejoindre" className="mt-2 block text-center py-3 rounded-lg font-bold text-sm transition"
                  style={featured ? { backgroundColor: "#203478", color: "#F4F4F0" } : forteresse ? { border: "1px solid rgba(201,168,76,0.50)", color: "#C9A84C" } : { border: "1px solid rgba(32,52,120,0.40)", color: "#203478" }}>
                  {forteresse ? tuiNousContacter : tuiRejoindreListe}
                </Link>
              </div>
              );
            })}
          </div>
          <p className="text-center mt-5 text-xs italic" style={{ color: "rgba(29,29,27,0.40)" }}>{tuiTarifsIndicatifs}</p>
        </div>
      </section>

      {/* Lore Contrecoeur */}
      <section className="py-20 px-6" style={{ backgroundColor: "#FFFFFF" }}>
        <div className="max-w-4xl mx-auto">
          <span className="inline-block text-xs font-bold px-3 py-1.5 rounded-full bg-h91-accretion/10 text-h91-accretion border border-h91-accretion/30 mb-6 uppercase tracking-widest">
            {tuiContexteBadge}
          </span>
          <h3 className="text-2xl md:text-3xl font-bold mb-6" style={{ color: "#1D1D1B" }}>{t("contrecoeur.contexte_titre")}</h3>
          <div className="space-y-5 text-lg leading-relaxed mb-8" style={{ color: "rgba(29,29,27,0.70)" }}>
            {(t.raw("contrecoeur.contexte_paragraphs") as string[]).map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
          <div className="p-6 rounded-xl" style={{ border: "1px solid rgba(32,52,120,0.25)", backgroundColor: "rgba(32,52,120,0.06)" }}>
            <p className="font-bold text-sm uppercase tracking-widest mb-3" style={{ color: "#203478" }}>{avantageTitre}</p>
            <p className="text-lg leading-relaxed" style={{ color: "rgba(29,29,27,0.70)" }}>
              {t("contrecoeur.avantage_texte")}
            </p>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          BERTHIER — EN DÉVELOPPEMENT
      ═══════════════════════════════════════════════════ */}

      {/* Header + Cartes */}
      <section className="py-24 px-6" style={{ backgroundColor: "#E3E6EF" }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-3 mb-6">
              <span className="inline-block text-xs font-bold px-3 py-1.5 rounded-full bg-h91-accretion/10 text-h91-accretion border border-h91-accretion/30 uppercase tracking-widest">
                {t("berthier.categorie_badge")}
              </span>
              <span className="inline-block text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-widest" style={{ backgroundColor: "rgba(32,52,120,0.10)", color: "#203478", border: "1px solid rgba(32,52,120,0.25)" }}>
                {t("berthier.disponibilite_badge")}
              </span>
            </div>
            <h2 className="text-6xl md:text-7xl font-bold mb-5 tracking-tight" style={{ color: "#1D1D1B" }}>BERTHIER</h2>
            <p className="font-semibold text-lg md:text-xl italic max-w-2xl mx-auto mb-5" style={{ color: "#203478" }}>
              {t("berthier.tagline")}
            </p>
            <p className="text-base max-w-2xl mx-auto leading-relaxed" style={{ color: "rgba(29,29,27,0.65)" }}>
              {t("berthier.intro")}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {berthierTiers.map((tier, i) => {
              const featured = i === 1;
              const forteresse = i === 3;
              return (
              <div key={i} className="relative p-6 rounded-xl flex flex-col gap-4 transition card-lift"
                style={featured ? { backgroundColor: "#FFFFFF", border: "2px solid #203478" } : forteresse ? { backgroundColor: "#FFFFFF", border: "1px solid rgba(201,168,76,0.40)" } : { backgroundColor: "#FFFFFF", border: "1px solid rgba(32,52,120,0.20)" }}>
                {featured && <span className="absolute -top-4 left-1/2 -translate-x-1/2 text-xs font-bold px-4 py-1 rounded-full uppercase tracking-widest whitespace-nowrap" style={{ backgroundColor: "#203478", color: "#F4F4F0" }}>{tuiRecommande}</span>}
                <div>
                  <h3 className="text-xl font-bold" style={{ color: featured ? "#203478" : forteresse ? "#C9A84C" : "#1D1D1B" }}>{tier.nom}</h3>
                  <p className="text-xs mt-1" style={{ color: "rgba(29,29,27,0.50)" }}>{tier.cible}</p>
                </div>
                <p className="text-3xl font-extrabold" style={{ color: featured ? "#203478" : forteresse ? "#C9A84C" : "#1D1D1B" }}>{tier.prix} <span className="text-sm font-normal" style={{ color: "rgba(29,29,27,0.50)" }}>{tuiUniteMois}</span></p>
                <ul className="flex flex-col gap-2 flex-1">
                  {tier.features.map((f, fi) => <li key={fi} className="flex items-start gap-2 text-sm" style={{ color: "rgba(29,29,27,0.70)" }}><span className="mt-0.5 shrink-0" style={{ color: "#203478" }}>✓</span><span>{f}</span></li>)}
                </ul>
                <Link href="/rejoindre" className="mt-2 block text-center py-3 rounded-lg font-bold text-sm transition"
                  style={featured ? { backgroundColor: "#203478", color: "#F4F4F0" } : forteresse ? { border: "1px solid rgba(201,168,76,0.50)", color: "#C9A84C" } : { border: "1px solid rgba(32,52,120,0.40)", color: "#203478" }}>
                  {forteresse ? tuiNousContacter : tuiRejoindreListe}
                </Link>
              </div>
              );
            })}
          </div>
          <p className="text-center mt-5 text-xs italic" style={{ color: "rgba(29,29,27,0.40)" }}>{tuiTarifsIndicatifs}</p>
        </div>
      </section>

      {/* Lore Berthier */}
      <section className="py-20 px-6" style={{ backgroundColor: "#FFFFFF" }}>
        <div className="max-w-4xl mx-auto">
          <span className="inline-block text-xs font-bold px-3 py-1.5 rounded-full bg-h91-accretion/10 text-h91-accretion border border-h91-accretion/30 mb-6 uppercase tracking-widest">
            {tuiContexteBadge}
          </span>
          <h3 className="text-2xl md:text-3xl font-bold mb-6" style={{ color: "#1D1D1B" }}>{t("berthier.contexte_titre")}</h3>
          <div className="space-y-5 text-lg leading-relaxed mb-8" style={{ color: "rgba(29,29,27,0.70)" }}>
            {(t.raw("berthier.contexte_paragraphs") as string[]).map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
          <div className="p-6 rounded-xl" style={{ border: "1px solid rgba(32,52,120,0.25)", backgroundColor: "rgba(32,52,120,0.06)" }}>
            <p className="font-bold text-sm uppercase tracking-widest mb-3" style={{ color: "#203478" }}>{avantageTitre}</p>
            <p className="text-lg leading-relaxed" style={{ color: "rgba(29,29,27,0.70)" }}>
              {t("berthier.avantage_texte")}
            </p>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          SALIÈRES — EN DÉVELOPPEMENT
      ═══════════════════════════════════════════════════ */}

      {/* Header + Cartes */}
      <section className="py-24 px-6" style={{ backgroundColor: "#E3E6EF" }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-3 mb-6">
              <span className="inline-block text-xs font-bold px-3 py-1.5 rounded-full bg-h91-accretion/10 text-h91-accretion border border-h91-accretion/30 uppercase tracking-widest">
                {t("salieres.categorie_badge")}
              </span>
              <span className="inline-block text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-widest" style={{ backgroundColor: "rgba(32,52,120,0.10)", color: "#203478", border: "1px solid rgba(32,52,120,0.25)" }}>
                {t("salieres.disponibilite_badge")}
              </span>
            </div>
            <h2 className="text-6xl md:text-7xl font-bold mb-5 tracking-tight" style={{ color: "#1D1D1B" }}>SALIÈRES</h2>
            <p className="font-semibold text-lg md:text-xl italic max-w-2xl mx-auto mb-5" style={{ color: "#203478" }}>
              {t("salieres.tagline")}
            </p>
            <p className="text-base max-w-2xl mx-auto leading-relaxed" style={{ color: "rgba(29,29,27,0.65)" }}>
              {t("salieres.intro")}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {salieresTiers.map((tier, i) => {
              const featured = i === 1;
              const forteresse = i === 3;
              return (
              <div key={i} className="relative p-6 rounded-xl flex flex-col gap-4 transition card-lift"
                style={featured ? { backgroundColor: "#FFFFFF", border: "2px solid #203478" } : forteresse ? { backgroundColor: "#FFFFFF", border: "1px solid rgba(201,168,76,0.40)" } : { backgroundColor: "#FFFFFF", border: "1px solid rgba(32,52,120,0.20)" }}>
                {featured && <span className="absolute -top-4 left-1/2 -translate-x-1/2 text-xs font-bold px-4 py-1 rounded-full uppercase tracking-widest whitespace-nowrap" style={{ backgroundColor: "#203478", color: "#F4F4F0" }}>{tuiRecommande}</span>}
                <div>
                  <h3 className="text-xl font-bold" style={{ color: featured ? "#203478" : forteresse ? "#C9A84C" : "#1D1D1B" }}>{tier.nom}</h3>
                  <p className="text-xs mt-1" style={{ color: "rgba(29,29,27,0.50)" }}>{tier.cible}</p>
                </div>
                <p className="text-3xl font-extrabold" style={{ color: featured ? "#203478" : forteresse ? "#C9A84C" : "#1D1D1B" }}>{tier.prix} <span className="text-sm font-normal" style={{ color: "rgba(29,29,27,0.50)" }}>{tuiUniteMois}</span></p>
                <ul className="flex flex-col gap-2 flex-1">
                  {tier.features.map((f, fi) => <li key={fi} className="flex items-start gap-2 text-sm" style={{ color: "rgba(29,29,27,0.70)" }}><span className="mt-0.5 shrink-0" style={{ color: "#203478" }}>✓</span><span>{f}</span></li>)}
                </ul>
                <Link href="/rejoindre" className="mt-2 block text-center py-3 rounded-lg font-bold text-sm transition"
                  style={featured ? { backgroundColor: "#203478", color: "#F4F4F0" } : forteresse ? { border: "1px solid rgba(201,168,76,0.50)", color: "#C9A84C" } : { border: "1px solid rgba(32,52,120,0.40)", color: "#203478" }}>
                  {forteresse ? tuiNousContacter : tuiRejoindreListe}
                </Link>
              </div>
              );
            })}
          </div>
          <p className="text-center mt-5 text-xs italic" style={{ color: "rgba(29,29,27,0.40)" }}>{tuiTarifsIndicatifs}</p>
        </div>
      </section>

      {/* Lore Salières */}
      <section className="py-20 px-6" style={{ backgroundColor: "#FFFFFF" }}>
        <div className="max-w-4xl mx-auto">
          <span className="inline-block text-xs font-bold px-3 py-1.5 rounded-full bg-h91-accretion/10 text-h91-accretion border border-h91-accretion/30 mb-6 uppercase tracking-widest">
            {tuiContexteBadge}
          </span>
          <h3 className="text-2xl md:text-3xl font-bold mb-6" style={{ color: "#1D1D1B" }}>{t("salieres.contexte_titre")}</h3>
          <div className="space-y-5 text-lg leading-relaxed mb-8" style={{ color: "rgba(29,29,27,0.70)" }}>
            {(t.raw("salieres.contexte_paragraphs") as string[]).map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
          <div className="p-6 rounded-xl" style={{ border: "1px solid rgba(32,52,120,0.25)", backgroundColor: "rgba(32,52,120,0.06)" }}>
            <p className="font-bold text-sm uppercase tracking-widest mb-3" style={{ color: "#203478" }}>{avantageTitre}</p>
            <p className="text-lg leading-relaxed" style={{ color: "rgba(29,29,27,0.70)" }}>
              {t("salieres.avantage_texte")}
            </p>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          DOCTRINE DE LA CHAÎNE — Lore Carignan-Salières
      ═══════════════════════════════════════════════════ */}
      <section className="py-24 px-6" style={{ backgroundColor: "#1D1D1B" }}>
        <div className="max-w-4xl mx-auto">

          {/* En-tête lore */}
          <div className="text-center mb-14">
            <span className="inline-block text-xs font-bold px-3 py-1.5 rounded-full mb-6 uppercase tracking-widest"
              style={{ backgroundColor: "rgba(32,52,120,0.25)", color: "rgba(244,244,240,0.50)", border: "1px solid rgba(32,52,120,0.40)" }}>
              {t("chaine_forts.badge")}
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-6" style={{ color: "#F4F4F0" }}>
              {t("chaine_forts.titre")}
            </h2>
            <p className="text-lg leading-relaxed max-w-2xl mx-auto" style={{ color: "rgba(244,244,240,0.55)" }}>
              {t("chaine_forts.sous_titre")}
            </p>
          </div>

          {/* Narrative historique */}
          <div className="space-y-5 text-base leading-relaxed mb-14" style={{ color: "rgba(244,244,240,0.60)" }}>
            {(t.raw("chaine_forts.narrative") as string[]).map((p, i) => (
              <p key={i} style={i === 2 ? { color: "rgba(244,244,240,0.40)", fontStyle: "italic" } : undefined}>
                {p}
              </p>
            ))}
          </div>

          {/* La chaîne des 5 forts */}
          <div className="relative">
            {/* Ligne de connexion horizontale (desktop) */}
            <div
              className="hidden lg:block absolute top-[42px] left-[10%] right-[10%] h-px"
              style={{ backgroundColor: "rgba(32,52,120,0.45)" }}
              aria-hidden="true"
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {CHAINE_FORTS.map((item, i) => (
                <div key={i} className="relative flex flex-col items-center text-center">

                  {/* Nœud de la chaîne */}
                  <div
                    className="relative z-10 w-[84px] h-[84px] rounded-full flex items-center justify-center mb-4 shrink-0"
                    style={
                      item.statut === "production"
                        ? { backgroundColor: "#203478", border: "2px solid rgba(244,244,240,0.30)" }
                        : item.statut === "beta"
                        ? { backgroundColor: "rgba(201,168,76,0.20)", border: "2px solid rgba(201,168,76,0.50)" }
                        : { backgroundColor: "rgba(32,52,120,0.15)", border: "1px solid rgba(32,52,120,0.35)" }
                    }
                  >
                    {item.statut === "production" ? (
                      <span className="text-xs font-bold uppercase tracking-widest text-center px-2 leading-tight" style={{ color: "#F4F4F0" }}>
                        {t("chaine_forts.statut_prod")}
                      </span>
                    ) : item.statut === "beta" ? (
                      <span className="text-[10px] font-bold uppercase tracking-widest text-center px-2 leading-tight" style={{ color: "#C9A84C" }}>
                        {t("chaine_forts.statut_beta")}
                      </span>
                    ) : (
                      <span className="text-lg">🚧</span>
                    )}
                  </div>

                  {/* Nom du produit */}
                  <p
                    className="font-bold text-base mb-1"
                    style={{ color: (item.statut === "production" || item.statut === "beta") ? "#F4F4F0" : "rgba(244,244,240,0.40)" }}
                  >
                    {item.produit}
                  </p>

                  {/* Nom du fort */}
                  <p className="text-xs mb-2" style={{ color: "rgba(244,244,240,0.30)" }}>
                    {item.fort}
                  </p>

                  {/* Mission — une ligne */}
                  <p className="text-xs leading-relaxed" style={{ color: "rgba(244,244,240,0.35)" }}>
                    {item.mission}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          SUITE CARIGNAN — ZONE DE TRAVAUX — Noir
      ═══════════════════════════════════════════════════ */}
      <section className="py-24 px-6" style={{ backgroundColor: "#111111" }}>
        <div className="max-w-6xl mx-auto">

          {/* En-tête */}
          <div className="text-center mb-14">
            <span className="inline-block text-xs font-bold px-3 py-1.5 rounded-full bg-h91-stellar/5 text-h91-stellar/30 border border-h91-stellar/15 mb-6 uppercase tracking-widest">
              {t("suite_carignan.badge")}
            </span>
            <h2 className="text-4xl font-bold text-h91-stellar/25 mb-3">
              {t("suite_carignan.titre")}
            </h2>
            <p className="text-h91-stellar/25 text-base max-w-xl mx-auto leading-relaxed">
              {t("suite_carignan.texte")}
            </p>
          </div>

          {/* Cartes blurrées */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {SUITE_CARIGNAN.map((outil, i) => (
              <div
                key={i}
                className="relative rounded-xl overflow-hidden border border-h91-stellar/10 bg-h91-gravity/30"
                style={{ minHeight: "220px" }}
              >
                {/* Contenu fantôme flouté */}
                <div className="p-6 blur-sm pointer-events-none select-none" aria-hidden="true">
                  <div className="w-8 h-0.5 bg-h91-accretion mb-4 opacity-30" />
                  <h3 className="text-h91-stellar/50 font-bold text-lg mb-1">{outil.nom}</h3>
                  <p className="text-h91-stellar/30 text-sm mb-4">{outil.categorie}</p>
                  <div className="h-3 rounded bg-h91-stellar/10 w-full mb-2" />
                  <div className="h-3 rounded bg-h91-stellar/10 w-4/5 mb-2" />
                  <div className="h-3 rounded bg-h91-stellar/10 w-3/5 mb-4" />
                  <div className="h-8 rounded bg-h91-accretion/10 w-full" />
                </div>

                {/* Overlay zone de travaux */}
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-h91-gravity/65 backdrop-blur-[3px]">
                  <span className="text-3xl mb-3">🚧</span>
                  <span className="text-h91-stellar/50 text-xs font-bold uppercase tracking-[0.2em] text-center px-6 mb-1">
                    {t("suite_carignan.acces_restreint")}
                  </span>
                  <span className="text-h91-accretion/60 text-sm font-semibold text-center px-6">
                    {outil.nom}
                  </span>
                  <span className="text-h91-stellar/25 text-xs text-center px-6 mt-1">
                    {t("suite_carignan.zone_travaux")}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          CTA FINAL — Noir
      ═══════════════════════════════════════════════════ */}
      <section className="py-20 px-6 text-center" style={{ backgroundColor: "#1D1D1B" }}>
        <h2 className="text-3xl md:text-4xl font-bold mb-8" style={{ color: "#F4F4F0" }}>
          {t("cta_titre")}
        </h2>
        <Link
          href="/rejoindre"
          className="inline-block px-10 py-5 rounded-lg font-bold text-xl transition"
          style={{ backgroundColor: "#203478", color: "#F4F4F0" }}
        >
          {t("cta_bouton")}
        </Link>
      </section>
    </>
  );
}
