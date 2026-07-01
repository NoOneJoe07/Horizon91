import type { Metadata } from "next";
import { useTranslations } from "next-intl";
import Link from "next/link";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  const titles: Record<string, string> = {
    fr: "Tarification — Forfaits Web & Cybersécurité Transparents",
    en: "Pricing — Transparent Web & Cybersecurity Packages",
    es: "Precios — Paquetes Web y Ciberseguridad Transparentes",
  };
  const descriptions: Record<string, string> = {
    fr: "Prix transparents pour les PME de Beauce : site web dès 1 500 $, maintenance dès 150 $/mois, surveillance Dark Web dès 75 $/mois. L'honnêteté des bâtisseurs d'ici.",
    en: "Clear pricing for Beauce SMBs: website from $1,500, maintenance from $150/month, dark web monitoring from $75/month. Honest pricing from your local team.",
    es: "Precios transparentes para pymes de Beauce: sitio web desde 1 500 $, mantenimiento desde 150 $/mes, monitoreo Dark Web desde 75 $/mes.",
  };

  const baseUrl = locale === "en" ? "https://borealstar.ca" : "https://etoileboreale.ca";
  const canonical = `${baseUrl}${locale === "fr" ? "" : `/${locale}`}/tarification`;

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

interface WebPackage {
  nom: string;
  cible: string;
  prix_min: string;
  prix_max: string;
  features: string[];
  featured: boolean;
}

interface Livrable {
  titre: string;
  desc: string;
}

interface MaintenanceOption {
  nom: string;
  prix: string;
  desc: string;
}

interface HeureLine {
  label: string;
  prix: string;
  note?: string;
}

interface SocialPackage {
  nom: string;
  cible: string;
  prix_min: string;
  prix_max: string;
  features: string[];
  featured: boolean;
}

export default function TarificationPage() {
  const t = useTranslations("tarification");
  const tNav = useTranslations("rejoindre");

  const livrables = t.raw("livrables") as Livrable[];
  const webPackages = t.raw("web_packages") as WebPackage[];
  const maintenance = t.raw("maintenance") as MaintenanceOption[];
  const heures = t.raw("heures") as HeureLine[];
  const socialPackages = t.raw("social_packages") as SocialPackage[];

  return (
    <main className="max-w-6xl mx-auto px-6 py-20">
      {/* ── TITRE ── */}
      <h1 className="text-5xl font-bold text-h91-stellar text-center mb-4">
        {t("title")}
      </h1>
      <p className="text-center text-h91-stellar/60 mb-16 text-lg max-w-2xl mx-auto">
        {t("subtitle")}
      </p>

      {/* ══════════════════════════════════════════════════
          LIVRABLES INCLUS
      ══════════════════════════════════════════════════ */}
      <section className="mb-20">
        <h2 className="text-2xl font-bold text-h91-stellar text-center mb-8 uppercase tracking-wider">
          {t("livrables_title")}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {livrables.map((l, i) => (
            <div
              key={i}
              className="p-6 border border-h91-glacier/30 rounded-xl bg-h91-gravity/50 flex flex-col gap-3"
            >
              <div className="flex items-center gap-3">
                <span className="text-h91-stellar text-2xl font-bold">0{i + 1}</span>
                <h3 className="text-h91-stellar font-bold text-base leading-tight">
                  {l.titre}
                </h3>
              </div>
              <p className="text-h91-stellar/60 text-sm leading-relaxed">{l.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          FORFAITS WEB
      ══════════════════════════════════════════════════ */}
      <section className="mb-20">
        <h2 className="text-2xl font-bold text-h91-stellar text-center mb-10 uppercase tracking-wider">
          {t("web_title")}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {webPackages.map((pkg, i) => (
            <div
              key={i}
              className={`relative p-7 rounded-xl flex flex-col gap-4 transition ${
                pkg.featured
                  ? "border-2 border-h91-ion bg-h91-ion/8 card-featured-glow"
                  : "border border-h91-glacier/25 bg-h91-gravity/50"
              }`}
            >
              {pkg.featured && (
                <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-h91-ion text-h91-gravity text-xs font-bold px-4 py-1 rounded-full uppercase tracking-widest whitespace-nowrap">
                  {t("popular_badge")}
                </span>
              )}

              {/* Nom + cible */}
              <div>
                <h3 className="text-xl font-bold text-h91-stellar">
                  {pkg.nom}
                </h3>
                <p className="text-h91-stellar/40 text-xs mt-1">{pkg.cible}</p>
              </div>

              {/* Prix */}
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-extrabold text-h91-stellar">
                  {pkg.prix_min}
                </span>
                <span className="text-h91-stellar/40 text-sm">→ {pkg.prix_max}</span>
              </div>

              {/* Features */}
              <ul className="flex flex-col gap-2 flex-1">
                {pkg.features.map((f, fi) => (
                  <li key={fi} className="flex items-start gap-2 text-sm text-h91-stellar/80">
                    <span className="text-h91-ion mt-0.5 shrink-0">✓</span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <Link
                href="/rejoindre"
                className={`mt-2 block text-center py-3 rounded-lg font-bold text-sm transition ${
                  pkg.featured
                    ? "bg-h91-ion text-h91-gravity hover:bg-h91-ion/80"
                    : "border border-h91-glacier/50 text-h91-glacier hover:border-h91-glacier hover:bg-h91-glacier/10"
                }`}
              >
                {t("cta_bouton")}
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          MAINTENANCE
      ══════════════════════════════════════════════════ */}
      <section className="mb-20">
        <h2 className="text-2xl font-bold text-h91-stellar text-center mb-8 uppercase tracking-wider">
          {t("maintenance_title")}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {maintenance.map((m, i) => (
            <div
              key={i}
              className="p-6 border border-h91-warp/40 rounded-xl bg-h91-gravity/50 flex flex-col gap-3"
            >
              <div className="flex items-start justify-between gap-4">
                <h3 className="text-h91-stellar font-bold text-base leading-tight">{m.nom}</h3>
                <span className="text-h91-stellar font-extrabold text-2xl whitespace-nowrap">{m.prix}</span>
              </div>
              <p className="text-h91-stellar/60 text-sm leading-relaxed">{m.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          HEURES SUPPLÉMENTAIRES
      ══════════════════════════════════════════════════ */}
      <section className="mb-20">
        <h2 className="text-2xl font-bold text-h91-stellar text-center mb-8 uppercase tracking-wider">
          {t("heures_title")}
        </h2>
        <div className="max-w-2xl mx-auto flex flex-col divide-y divide-h91-stellar/10 border border-h91-stellar/10 rounded-xl overflow-hidden">
          {heures.map((h, i) => (
            <div
              key={i}
              className="flex items-center justify-between px-6 py-4 bg-h91-gravity/50 hover:bg-h91-gravity/80 transition"
            >
              <div className="flex flex-col">
                <span className="text-h91-stellar text-sm font-medium">{h.label}</span>
                {h.note && (
                  <span className="text-h91-ion text-xs mt-0.5">{h.note}</span>
                )}
              </div>
              <span className="text-h91-stellar font-extrabold text-xl whitespace-nowrap ml-4">
                {h.prix}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          MÉDIAS SOCIAUX
      ══════════════════════════════════════════════════ */}
      <section className="mb-20">
        <h2 className="text-2xl font-bold text-h91-stellar text-center mb-10 uppercase tracking-wider">
          {t("social_title")}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {socialPackages.map((pkg, i) => (
            <div
              key={i}
              className={`relative p-7 rounded-xl flex flex-col gap-4 transition ${
                pkg.featured
                  ? "border-2 border-h91-ion bg-h91-ion/8 card-featured-glow"
                  : "border border-h91-glacier/25 bg-h91-gravity/50"
              }`}
            >
              {pkg.featured && (
                <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-h91-ion text-h91-gravity text-xs font-bold px-4 py-1 rounded-full uppercase tracking-widest whitespace-nowrap">
                  {t("recommended_badge")}
                </span>
              )}

              <div>
                <h3 className="text-xl font-bold text-h91-stellar">
                  {pkg.nom}
                </h3>
                <p className="text-h91-stellar/40 text-xs mt-1">{pkg.cible}</p>
              </div>

              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-extrabold text-h91-stellar">
                  {pkg.prix_min}
                </span>
                {pkg.prix_max && (
                  <span className="text-h91-stellar/40 text-sm">→ {pkg.prix_max}</span>
                )}
              </div>

              <ul className="flex flex-col gap-2 flex-1">
                {pkg.features.map((f, fi) => (
                  <li key={fi} className="flex items-start gap-2 text-sm text-h91-stellar/80">
                    <span className="text-h91-ion mt-0.5 shrink-0">✓</span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>

              <Link
                href="/rejoindre"
                className={`mt-2 block text-center py-3 rounded-lg font-bold text-sm transition ${
                  pkg.featured
                    ? "bg-h91-ion text-h91-gravity hover:bg-h91-ion/80"
                    : "border border-h91-glacier/50 text-h91-glacier hover:border-h91-glacier hover:bg-h91-glacier/10"
                }`}
              >
                {t("cta_bouton")}
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          CYBERSÉCURITÉ — DIVISION CARILLON
      ══════════════════════════════════════════════════ */}
      <section className="mb-20">
        <div className="border border-h91-ion/30 rounded-2xl bg-h91-ion/5 p-10">

          {/* En-tête */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
            <div>
              <span className="inline-block text-xs font-bold px-3 py-1.5 rounded-full bg-h91-ion/15 text-h91-ion border border-h91-ion/30 mb-4 uppercase tracking-widest">
                Division Carillon — Cybersécurité
              </span>
              <h2 className="text-2xl font-bold text-h91-stellar mb-2">
                Des solutions de cybersécurité adaptées à votre réalité
              </h2>
              <p className="text-h91-stellar/60 text-sm max-w-xl leading-relaxed">
                De la surveillance automatisée des fuites de données à la gouvernance
                complète de votre infrastructure, nous calibrons la protection
                à la taille et au budget de votre entreprise.
              </p>
            </div>
          </div>

          {/* Deux lignes produits */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">

            {/* Fort Saurel */}
            <div className="p-6 rounded-xl border border-h91-ion/30 bg-h91-gravity/60 flex flex-col gap-3">
              <div>
                <p className="text-h91-ion font-bold text-xs uppercase tracking-widest mb-1">Fort Saurel — SaaS</p>
                <h3 className="text-h91-stellar font-bold text-lg">Surveillance & Vigie numérique</h3>
              </div>
              <p className="text-h91-stellar/60 text-sm leading-relaxed flex-1">
                Monitoring Dark Web continu, alertes en temps réel, rapports de conformité.
                La vigie numérique automatisée des PME — 4 niveaux de protection disponibles.
              </p>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-h91-ion font-extrabold text-3xl">dès 75 $</span>
                <span className="text-h91-stellar/40 text-sm">/mois</span>
              </div>
            </div>

            {/* Suite Carignan */}
            <div className="p-6 rounded-xl border border-h91-ion/20 bg-h91-gravity/60 flex flex-col gap-3">
              <div>
                <p className="text-h91-ion font-bold text-xs uppercase tracking-widest mb-1">Suite Carignan — Gouvernance</p>
                <h3 className="text-h91-stellar font-bold text-lg">Architecture défensive sur mesure</h3>
              </div>
              <p className="text-h91-stellar/60 text-sm leading-relaxed flex-1">
                Remédiation, simulation de phishing, analyse de courriels, gestion des
                accès et des identités. Une suite complète calibrée à votre posture de
                sécurité et à votre conformité Loi 25.
              </p>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-h91-ion font-extrabold text-xl">Sur devis</span>
                <span className="text-h91-stellar/40 text-sm">— évaluation gratuite</span>
              </div>
            </div>
          </div>

          {/* CTA vers Division Carillon */}
          <div className="text-center">
            <Link
              href="/divisions/cyber"
              className="inline-block px-8 py-3 rounded-lg border border-h91-ion text-h91-ion font-bold hover:bg-h91-ion/10 transition"
            >
              Voir les forfaits Fort Saurel en détail →
            </Link>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          CTA FINAL
      ══════════════════════════════════════════════════ */}
      <section className="text-center border border-h91-glacier/30 rounded-2xl p-12 bg-h91-glacier/5">
        <h2 className="text-3xl font-bold text-h91-stellar mb-4">{t("cta_title")}</h2>
        <p className="text-h91-stellar/60 mb-8 max-w-xl mx-auto">{t("cta_desc")}</p>
        <Link
          href="/rejoindre"
          className="inline-block bg-h91-ion text-h91-gravity font-bold px-8 py-4 rounded-lg text-lg hover:bg-h91-ion/80 transition"
        >
          {t("cta_bouton")}
        </Link>
      </section>
    </main>
  );
}
