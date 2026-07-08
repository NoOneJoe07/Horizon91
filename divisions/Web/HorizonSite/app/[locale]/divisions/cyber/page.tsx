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
   SAUREL — tiers tarifaires (données statiques, même en FR/EN/ES)
   Saurel = Dark Web Monitoring SaaS (ex-Argos)
───────────────────────────────────────────────────────────────── */
const SAUREL_TIERS = [
  {
    nom: "Sentinelle",
    prix: "75 $",
    unite: "/ mois",
    cible: "Indépendants & petits commerces",
    features: [
      "Surveillance 1 domaine",
      "Alertes fuites de données (email)",
      "Rapport mensuel PDF",
      "Dashboard en ligne",
    ],
    featured: false,
    forteresse: false,
  },
  {
    nom: "Gardien",
    prix: "150 $",
    unite: "/ mois",
    cible: "PME & professionnels",
    features: [
      "Surveillance 3 domaines",
      "Alertes temps réel (email + SMS)",
      "Rapport hebdomadaire",
      "Scan Dark Web en continu",
      "Support prioritaire",
    ],
    featured: true,
    forteresse: false,
  },
  {
    nom: "Bouclier",
    prix: "200 $",
    unite: "/ mois",
    cible: "Entreprises multi-sites",
    features: [
      "Surveillance 10 domaines",
      "Alertes multi-canaux",
      "Rapport bi-mensuel détaillé",
      "Analyse de risque contextuelle",
      "Consultant dédié",
    ],
    featured: false,
    forteresse: false,
  },
  {
    nom: "Forteresse",
    prix: "350 $",
    unite: "/ mois",
    cible: "Municipalités & MRC",
    features: [
      "Domaines illimités",
      "Tableau de bord multi-entités",
      "Rapport exécutif mensuel",
      "Réponse aux incidents incluse",
      "Données hébergées au Québec (Loi 25)",
    ],
    featured: false,
    forteresse: true,
  },
];

/* ─────────────────────────────────────────────────────────────
   SUITE CARIGNAN — produits à venir (blurred / zone de travaux)
───────────────────────────────────────────────────────────────── */
const SUITE_CARIGNAN = [
  { nom: "Sorel",        categorie: "Remédiation & réponse aux incidents" },
  { nom: "Contrecoeur", categorie: "Simulation phishing & ingénierie sociale" },
  { nom: "Berthier",    categorie: "Analyseur de légitimité des courriels" },
  { nom: "Chambly",     categorie: "IAM — Contrôle d'accès & identités" },
];

/* ─────────────────────────────────────────────────────────────
   LA CHAÎNE DES 5 FORTS — lore Carignan-Salières
───────────────────────────────────────────────────────────────── */
const CHAINE_FORTS = [
  {
    fort: "Fort Saurel",
    produit: "Saurel",
    mission: "Vigie Dark Web — surveille les flux clandestins avant que la menace ne remonte le courant.",
    statut: "production" as const,
    accentColor: "#203478",
  },
  {
    fort: "Fort Sorel",
    produit: "Sorel",
    mission: "Remédiation & réponse aux incidents — intervient dès que la brèche est détectée.",
    statut: "dev" as const,
    accentColor: "#203478",
  },
  {
    fort: "Fort Contrecoeur",
    produit: "Contrecoeur",
    mission: "Simulation phishing & ingénierie sociale — teste vos défenses avant que l'ennemi ne le fasse.",
    statut: "dev" as const,
    accentColor: "#203478",
  },
  {
    fort: "Berthier",
    produit: "Berthier",
    mission: "Analyseur de légitimité des courriels — distingue l'allié de l'imposteur à la porte.",
    statut: "dev" as const,
    accentColor: "#203478",
  },
  {
    fort: "Fort Chambly",
    produit: "Chambly",
    mission: "IAM — contrôle d'accès & identités — verrouille qui entre dans la forteresse et qui en sort.",
    statut: "dev" as const,
    accentColor: "#203478",
  },
];

export default function DivisionCyberPage() {
  const t = useTranslations("divisions.divisionCyber");
  const tBrand = useTranslations("brand");
  const services = t.raw("services") as Service[];

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
              L&apos;héritage
            </span>
            <h2 className="text-2xl md:text-3xl font-bold mb-6 whitespace-nowrap text-center" style={{ color: "#1D1D1B" }}>
              L&apos;architecture défensive de votre empire numérique
            </h2>

            {/* Photos d'archives — Bataille de Carillon — cliquez pour agrandir */}
            <DivisionPhotoGallery
              accentColor="#203478"
              photos={[
                {
                  src: "/photos_images/British at Carillon.webp",
                  alt: "Troupes britanniques à Carillon — Bataille de 1758",
                  caption: "Troupes britanniques marchant sur Fort Carillon — 1758",
                  objectPosition: "center center",
                },
                {
                  src: "/photos_images/The_Victory_of_Montcalms_Troops_at_Carillon_by_Henry_Alexander_OgdenAAA.jpg",
                  alt: "La victoire des troupes de Montcalm à Carillon — Henry Alexander Ogden",
                  caption: "La victoire de Montcalm à Carillon (1758) — Henry Alexander Ogden",
                  objectPosition: "center 70%",
                },
                {
                  src: "/photos_images/Carillon_map.jpg",
                  alt: "Carte stratégique du Fort Carillon — 1758",
                  caption: "Carte stratégique du Fort Carillon, 1758",
                  objectPosition: "center center",
                },
                {
                  src: "/photos_images/Fort_Carillon_1.jpg",
                  alt: "Fort Carillon — vue aérienne, lac Champlain",
                  caption: "Fort Carillon — vue aérienne (aujourd'hui Fort Ticonderoga)",
                  objectPosition: "center center",
                },
              ]}
            />
            <p className="text-xs text-center mb-8 italic" style={{ color: "rgba(29,29,27,0.30)" }}>
              Archives historiques — Fort Carillon (Fort Ticonderoga), Bataille de 1758
            </p>

            <div className="space-y-5 text-lg leading-relaxed" style={{ color: "rgba(29,29,27,0.70)" }}>
              <p>
                En 1758, lors de la célèbre bataille du Fort Carillon, une armée de 3 600 soldats
                et miliciens d&apos;ici a repoussé avec succès une force d&apos;invasion de 15 000 hommes.
                Comment ? Grâce à une architecture défensive géniale — des abatis de bois
                stratégiquement positionnés — et une discipline de fer. Carillon est le symbole
                historique de la résistance intelligente face à un adversaire disproportionné.
              </p>
              <p>
                Dans le monde numérique, votre entreprise est attaquée chaque jour par des menaces
                automatisées invisibles. La Division Carillon érige les murailles fortifiées autour
                de vos données, de vos serveurs et de vos applications. Nous concevons une
                architecture cyber sur mesure pour que votre entreprise reste un fort imprenable
                — peu importe la taille de la menace.
              </p>
              <div className="mt-2 p-6 rounded-xl" style={{ border: "1px solid rgba(32,52,120,0.25)", backgroundColor: "rgba(32,52,120,0.06)" }}>
                <p className="font-bold text-sm uppercase tracking-widest mb-3" style={{ color: "#203478" }}>
                  L&apos;avantage Étoile Boréale
                </p>
                <p>
                  La Division Carillon ne fait pas que surveiller vos serveurs — elle documente
                  et structure votre gouvernance de données. Conformité Loi 25, politiques de
                  confidentialité, registres d&apos;accès : en cas de contrôle, vous avez la preuve
                  écrite que votre fort était défendu selon les règles de l&apos;art.
                </p>
              </div>
            </div>
          </div>

          {/* Saviez-vous que ? */}
          <div className="rounded-2xl p-8" style={{ border: "1px solid rgba(32,52,120,0.20)", backgroundColor: "#E3E6EF" }}>
            <h3 className="font-bold text-sm uppercase tracking-widest mb-8 flex items-center gap-3" style={{ color: "#203478" }}>
              <span className="text-xl">💡</span> Saviez-vous que ?
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-5 rounded-xl" style={{ backgroundColor: "#FFFFFF", border: "1px solid rgba(32,52,120,0.20)" }}>
                <p className="font-bold text-4xl mb-2" style={{ color: "#203478" }}>40 %</p>
                <p className="font-semibold text-sm mb-3" style={{ color: "#1D1D1B" }}>Des cyberattaques visent les PME</p>
                <p className="text-sm leading-relaxed" style={{ color: "rgba(29,29,27,0.60)" }}>
                  Contrairement aux idées reçues, Statistique Canada rapporte que près de 40 % des
                  cyberattaques visent directement les petites et moyennes entreprises. Vous n&apos;êtes
                  pas trop petit pour être piraté — vous êtes simplement moins protégé.
                </p>
              </div>
              <div className="p-5 rounded-xl" style={{ backgroundColor: "#FFFFFF", border: "1px solid rgba(32,52,120,0.20)" }}>
                <p className="font-bold text-4xl mb-2" style={{ color: "#203478" }}>25 000 $+</p>
                <p className="font-semibold text-sm mb-3" style={{ color: "#1D1D1B" }}>Le coût moyen d&apos;un incident</p>
                <p className="text-sm leading-relaxed" style={{ color: "rgba(29,29,27,0.60)" }}>
                  L&apos;impact financier moyen d&apos;un incident de cybersécurité pour une PME canadienne
                  dépasse les 25 000 $ en frais de récupération — sans compter la perte de confiance
                  irréparable de vos clients. Nous ne vendons pas de la peur, nous coulons votre
                  sécurité dans le béton.
                </p>
              </div>
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
              Produit phare — SaaS
            </span>
            <h2 className="text-6xl md:text-7xl font-bold mb-5 tracking-tight" style={{ color: "#1D1D1B" }}>
              SAUREL
            </h2>
            <p className="font-semibold text-lg md:text-xl italic max-w-2xl mx-auto mb-5" style={{ color: "#203478" }}>
              La vigie numérique des PME.
            </p>
            <p className="text-base max-w-2xl mx-auto leading-relaxed" style={{ color: "rgba(29,29,27,0.65)" }}>
              Surveillance du Dark Web en temps réel. Saurel scanne en continu les marchés
              clandestins, forums et fuites de données pour vous alerter dès que vos
              informations apparaissent — avant que les dommages soient faits.
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
                    Recommandé
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
                  Démarrer
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
              Le contexte historique
            </span>
            <h3 className="text-2xl md:text-3xl font-bold mb-6" style={{ color: "#1D1D1B" }}>
              Le Verrou du Richelieu
            </h3>
            <div className="space-y-5 text-lg leading-relaxed" style={{ color: "rgba(29,29,27,0.70)" }}>
              <p>
                En 1665, Pierre de Saurel, capitaine au régiment de Carignan-Salières, érige le
                Fort Saurel à l&apos;embouchure de la rivière Richelieu. À cette époque, cette rivière
                est l&apos;autoroute des invasions. Le mandat du fort est crucial : agir comme une
                sentinelle avancée, bloquer les incursions surprises et verrouiller l&apos;accès au
                fleuve Saint-Laurent pour protéger les colonies naissantes. Les soldats qui y
                montaient la garde devaient déceler la moindre anomalie sur l&apos;eau ou dans les bois
                avant qu&apos;elle ne devienne une menace fatale.
              </p>
              <p>
                Tout comme le fort historique surveillait l&apos;autoroute fluviale pour protéger la
                Nouvelle-France, le SaaS Saurel agit comme le verrou stratégique de votre
                entreprise. C&apos;est une plateforme de monitoring intelligente qui surveille les flux
                de données, les performances et les angles morts opérationnels des PME. Il élimine
                l&apos;effet de surprise : avant qu&apos;une faille, un bug ou une baisse de performance ne
                vienne couler votre modèle d&apos;affaires, Saurel a déjà sonné l&apos;alarme.
              </p>
            </div>
          </div>

          {/* Les Sentinelles */}
          <div className="mb-10 p-7 rounded-2xl" style={{ border: "1px solid rgba(32,52,120,0.20)", backgroundColor: "#E3E6EF" }}>
            <h3 className="text-xl font-bold mb-4" style={{ color: "#1D1D1B" }}>
              Que font les Sentinelles de Saurel ?
            </h3>
            <div className="space-y-4 text-base leading-relaxed" style={{ color: "rgba(29,29,27,0.70)" }}>
              <p>
                Dans le logiciel, les Sentinelles sont vos agents automatisés — vos scripts de
                surveillance, vos alertes de serveurs, vos traqueurs de bases de données. Les
                Sentinelles ne dorment jamais. Elles veillent au grain 24h/24 sur la santé
                numérique de votre PME.
              </p>
              <p>
                Elles scannent l&apos;horizon, détectent les anomalies de performance, valident
                l&apos;intégrité des données et s&apos;assurent que la forteresse business roule à pleine
                capacité. Si une Sentinelle repère un comportement anormal, elle isole la menace
                et vous transmet un rapport clair pour que vous puissiez agir avant l&apos;impact.
              </p>
            </div>
          </div>

          {/* Avantage Boréale */}
          <div className="p-6 rounded-xl" style={{ border: "1px solid rgba(32,52,120,0.25)", backgroundColor: "rgba(32,52,120,0.06)" }}>
            <p className="font-bold text-sm uppercase tracking-widest mb-3" style={{ color: "#203478" }}>
              L&apos;avantage Étoile Boréale
            </p>
            <p className="text-lg leading-relaxed" style={{ color: "rgba(29,29,27,0.70)" }}>
              Avec Saurel, vous n&apos;attendez pas que la crise frappe pour colmater les
              brèches. Nos Sentinelles numériques surveillent vos arrières en continu,
              transformant le chaos imprévisible du web en une trajectoire stable, sécurisée
              et entièrement sous contrôle.
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
              Suite Carignan — La doctrine
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-6" style={{ color: "#F4F4F0" }}>
              La force de la chaîne
            </h2>
            <p className="text-lg leading-relaxed max-w-2xl mx-auto" style={{ color: "rgba(244,244,240,0.55)" }}>
              Un régiment ne gagne pas par sa taille. Il gagne par la précision de son dispositif.
            </p>
          </div>

          {/* Narrative historique */}
          <div className="space-y-5 text-base leading-relaxed mb-14" style={{ color: "rgba(244,244,240,0.60)" }}>
            <p>
              En 1665, le Régiment Carignan-Salières débarque en Nouvelle-France avec 1 200 soldats.
              Face à eux : des milliers de guerriers iroquois qui terrorisent les colonies depuis des années.
              Le déséquilibre de force est évident. Pourtant, en moins d&apos;un an, le régiment rétablit la paix.
            </p>
            <p>
              Leur secret n&apos;est pas la bravoure aveugle — c&apos;est l&apos;architecture. Plutôt que de disperser
              ses hommes ou de chercher la confrontation directe, le régiment érige une chaîne de forts
              stratégiquement positionnés le long de la rivière Richelieu. Chaque fort couvre un secteur
              précis, surveille un angle mort et s&apos;appuie sur ses voisins. Chaque maillon renforce le
              suivant. Ensemble, ils forment un périmètre sans faille qui coupe l&apos;accès à toute la
              vallée du Saint-Laurent.
            </p>
            <p style={{ color: "rgba(244,244,240,0.40)", fontStyle: "italic" }}>
              La force n&apos;est pas dans chaque fort pris isolément. Elle est dans l&apos;espacement,
              dans la coordination — dans le fait que chaque maillon surveille le suivant.
            </p>
            <p>
              Suite Carignan s&apos;inspire de cette doctrine. Pas une plateforme monolithique qui prétend
              tout faire. Cinq outils spécialisés, chacun maître de son périmètre cybersécurité, qui
              ensemble couvrent l&apos;intégralité de votre surface d&apos;attaque — de la vigie Dark Web jusqu&apos;au
              contrôle des identités internes.
            </p>
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
                        : { backgroundColor: "rgba(32,52,120,0.15)", border: "1px solid rgba(32,52,120,0.35)" }
                    }
                  >
                    {item.statut === "production" ? (
                      <span className="text-xs font-bold uppercase tracking-widest text-center px-2 leading-tight" style={{ color: "#F4F4F0" }}>
                        En<br />prod.
                      </span>
                    ) : (
                      <span className="text-lg">🚧</span>
                    )}
                  </div>

                  {/* Nom du produit */}
                  <p
                    className="font-bold text-base mb-1"
                    style={{ color: item.statut === "production" ? "#F4F4F0" : "rgba(244,244,240,0.40)" }}
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
              Suite Carignan
            </span>
            <h2 className="text-4xl font-bold text-h91-stellar/25 mb-3">
              L&apos;arsenal complet arrive.
            </h2>
            <p className="text-h91-stellar/25 text-base max-w-xl mx-auto leading-relaxed">
              D&apos;autres outils de la Suite Carignan sont en développement actif.
              Accès restreint — zone de travaux.
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
                    Accès restreint
                  </span>
                  <span className="text-h91-accretion/60 text-sm font-semibold text-center px-6">
                    {outil.nom}
                  </span>
                  <span className="text-h91-stellar/25 text-xs text-center px-6 mt-1">
                    Zone de travaux
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
