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
          ? "Saurel is a dark web monitoring SaaS that continuously scans clandestine markets, forums and data leaks to alert businesses before damage is done."
          : locale === "es"
          ? "Saurel es un SaaS de monitoreo del dark web que escanea mercados clandestinos y filtraciones de datos para alertar a las empresas antes de que ocurra el daño."
          : "Saurel est un SaaS de surveillance du Dark Web qui scanne en continu les marchés clandestins, forums et fuites de données pour alerter les entreprises avant que les dommages soient faits.",
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

export default function DivisionCyberPage() {
  const t = useTranslations("divisions.divisionCyber");
  const tBrand = useTranslations("brand");
  const services = t.raw("services") as Service[];

  return (
    <>
      <CyberServiceJsonLd />
      {/* ═══════════════════════════════════════════════════
          HERO
      ═══════════════════════════════════════════════════ */}
      <section className="relative flex flex-col items-center justify-center min-h-[60vh] text-center px-6 py-24">
        <span className="mb-6 inline-block text-xs font-bold px-3 py-1.5 rounded-full bg-h91-accretion/20 text-h91-accretion border border-h91-accretion/40">
          {t("badge")}
        </span>

        <div className="mb-6 flex items-center justify-center">
          <Image
            src="/mark-cyber.svg"
            alt="Singularité — Division Carillon — Cybersécurité"
            width={80}
            height={80}
            className="drop-shadow-lg"
          />
        </div>

        <p className="text-h91-accretion font-bold tracking-widest uppercase text-sm mb-3">
          {t("hero_tagline")} — {tBrand("name")}
        </p>

        <h1 className="text-5xl md:text-7xl font-bold text-h91-stellar mb-6">
          {t("hero_titre")}
        </h1>

        <p className="text-lg md:text-xl text-h91-stellar/70 max-w-2xl leading-relaxed">
          {t("hero_description")}
        </p>

        <div className="mt-10 flex flex-wrap gap-4 justify-center">
          <Link
            href="/rejoindre"
            className="px-8 py-4 rounded-lg bg-h91-accretion text-h91-gravity font-bold text-lg hover:bg-h91-fusion transition"
          >
            {t("cta_bouton")}
          </Link>
          <Link
            href="/divisions"
            className="px-8 py-4 rounded-lg border border-h91-accretion/50 text-h91-accretion font-bold text-lg hover:bg-h91-accretion/10 transition"
          >
            {t("cta_portfolio")}
          </Link>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          SERVICES CONSEILS
      ═══════════════════════════════════════════════════ */}
      <section className="py-20 px-6 max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-h91-stellar text-center mb-14">
          {t("services_titre")}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <div
              key={i}
              className="p-6 border border-h91-accretion/30 rounded-xl bg-h91-gravity/50 hover:border-h91-accretion/70 hover:bg-h91-gravity/80 transition"
            >
              <div className="w-8 h-0.5 bg-h91-accretion mb-4" />
              <h3 className="text-h91-stellar font-bold text-lg mb-2">{service.titre}</h3>
              <p className="text-h91-stellar/60 text-sm leading-relaxed">{service.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          APPROCHE
      ═══════════════════════════════════════════════════ */}
      <section className="py-16 px-6 max-w-3xl mx-auto text-center">
        <h2 className="text-2xl font-bold text-h91-accretion mb-6">{t("approche_titre")}</h2>
        <p className="text-h91-stellar/70 text-lg leading-relaxed">{t("approche_texte")}</p>
      </section>

      {/* ═══════════════════════════════════════════════════
          ARGOS — PRODUIT PHARE
      ═══════════════════════════════════════════════════ */}
      <section className="py-24 px-6 border-t border-h91-accretion/20">
        <div className="max-w-6xl mx-auto">

          {/* En-tête */}
          <div className="text-center mb-16">
            <span className="inline-block text-xs font-bold px-3 py-1.5 rounded-full bg-h91-accretion/10 text-h91-accretion border border-h91-accretion/30 mb-6 uppercase tracking-widest">
              Produit phare — SaaS
            </span>
            <h2 className="text-6xl md:text-7xl font-bold text-h91-stellar mb-5 tracking-tight">
              SAUREL
            </h2>
            <p className="text-h91-accretion font-semibold text-lg md:text-xl italic max-w-2xl mx-auto mb-5">
              &quot;Cent yeux qui ne dorment jamais, pendant que vous dormez tranquille.&quot;
            </p>
            <p className="text-h91-stellar/55 text-base max-w-2xl mx-auto leading-relaxed">
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
                className={`relative p-6 rounded-xl flex flex-col gap-4 transition ${
                  tier.featured
                    ? "border-2 border-h91-accretion bg-h91-accretion/10"
                    : tier.forteresse
                    ? "border border-h91-fusion/40 bg-h91-gravity/50"
                    : "border border-h91-accretion/30 bg-h91-gravity/50"
                }`}
              >
                {tier.featured && (
                  <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-h91-accretion text-h91-gravity text-xs font-bold px-4 py-1 rounded-full uppercase tracking-widest whitespace-nowrap">
                    Recommandé
                  </span>
                )}

                <div>
                  <h3
                    className={`text-xl font-bold ${
                      tier.featured
                        ? "text-h91-accretion"
                        : tier.forteresse
                        ? "text-h91-fusion"
                        : "text-h91-stellar"
                    }`}
                  >
                    {tier.nom}
                  </h3>
                  <p className="text-h91-stellar/40 text-xs mt-1">{tier.cible}</p>
                </div>

                <div className="flex items-baseline gap-1">
                  <span
                    className={`text-3xl font-extrabold ${
                      tier.featured
                        ? "text-h91-accretion"
                        : tier.forteresse
                        ? "text-h91-fusion"
                        : "text-h91-stellar"
                    }`}
                  >
                    {tier.prix}
                  </span>
                  <span className="text-h91-stellar/40 text-sm">{tier.unite}</span>
                </div>

                <ul className="flex flex-col gap-2 flex-1">
                  {tier.features.map((f, fi) => (
                    <li
                      key={fi}
                      className="flex items-start gap-2 text-sm text-h91-stellar/80"
                    >
                      <span className="text-h91-accretion mt-0.5 shrink-0">✓</span>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  href="/rejoindre"
                  className={`mt-2 block text-center py-3 rounded-lg font-bold text-sm transition ${
                    tier.featured
                      ? "bg-h91-accretion text-h91-gravity hover:bg-h91-fusion"
                      : tier.forteresse
                      ? "border border-h91-fusion/50 text-h91-fusion hover:border-h91-fusion hover:bg-h91-fusion/10"
                      : "border border-h91-accretion/50 text-h91-accretion hover:border-h91-accretion hover:bg-h91-accretion/10"
                  }`}
                >
                  Démarrer
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          SUITE OLYMPUS — ZONE DE TRAVAUX
      ═══════════════════════════════════════════════════ */}
      <section className="py-24 px-6 border-t border-h91-stellar/10">
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
          CTA FINAL
      ═══════════════════════════════════════════════════ */}
      <section className="py-20 px-6 text-center border-t border-h91-accretion/20">
        <h2 className="text-3xl md:text-4xl font-bold text-h91-stellar mb-8">
          {t("cta_titre")}
        </h2>
        <Link
          href="/rejoindre"
          className="inline-block px-10 py-5 rounded-lg bg-h91-accretion text-h91-gravity font-bold text-xl hover:bg-h91-fusion transition"
        >
          {t("cta_bouton")}
        </Link>
      </section>
    </>
  );
}
