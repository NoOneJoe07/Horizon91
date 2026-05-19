import { useTranslations } from "next-intl";
import Image from "next/image";
import { Link } from "@/i18n/navigation";

type Service = { titre: string; desc: string };

/* ─────────────────────────────────────────────────────────────
   ARGOS — tiers tarifaires (données statiques, même en FR/EN/ES)
───────────────────────────────────────────────────────────────── */
const ARGOS_TIERS = [
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
   SUITE OLYMPUS — produits à venir (blurred / zone de travaux)
───────────────────────────────────────────────────────────────── */
const SUITE_OLYMPUS = [
  { nom: "Bellérophon", categorie: "Détection & neutralisation de menaces avancées" },
  { nom: "Dolos", categorie: "Anti-phishing & ingénierie sociale" },
  { nom: "Aegis", categorie: "Protection d'infrastructure & pare-feu adaptatif" },
  { nom: "Cerbère", categorie: "Contrôle d'accès & gestion des identités" },
];

export default function DivisionCyberPage() {
  const t = useTranslations("divisions.divisionCyber");
  const tBrand = useTranslations("brand");
  const services = t.raw("services") as Service[];

  return (
    <>
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
            alt="Singularité — Division Cybersécurité"
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
              ARGOS
            </h2>
            <p className="text-h91-accretion font-semibold text-lg md:text-xl italic max-w-2xl mx-auto mb-5">
              &quot;Cent yeux qui ne dorment jamais, pendant que vous dormez tranquille.&quot;
            </p>
            <p className="text-h91-stellar/55 text-base max-w-2xl mx-auto leading-relaxed">
              Surveillance du Dark Web en temps réel. Argos scanne en continu les marchés
              clandestins, forums et fuites de données pour vous alerter dès que vos
              informations apparaissent — avant que les dommages soient faits.
            </p>
          </div>

          {/* Tiers */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {ARGOS_TIERS.map((tier, i) => (
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
              Suite Olympus
            </span>
            <h2 className="text-4xl font-bold text-h91-stellar/25 mb-3">
              L&apos;arsenal complet arrive.
            </h2>
            <p className="text-h91-stellar/25 text-base max-w-xl mx-auto leading-relaxed">
              D&apos;autres outils de la Suite Olympus sont en développement actif.
              Accès restreint — zone de travaux.
            </p>
          </div>

          {/* Cartes blurrées */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {SUITE_OLYMPUS.map((outil, i) => (
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
