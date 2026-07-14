import type { Metadata } from "next";
import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  const titles: Record<string, string> = {
    fr: "Tarification — Forfaits Web, Marque & Cybersécurité Transparents",
    en: "Pricing — Transparent Web, Brand & Cybersecurity Packages",
    es: "Precios — Paquetes Web, Marca y Ciberseguridad Transparentes",
  };
  const descriptions: Record<string, string> = {
    fr: "Prix transparents pour les PME de Beauce : site web dès 1 800 $, maintenance dès 150 $/mois, IAM Chambly dès 55 $/mois, surveillance Dark Web Saurel dès 75 $/mois. L'honnêteté des bâtisseurs d'ici.",
    en: "Clear pricing for Beauce SMBs: website from $1,800, maintenance from $150/month, Chambly IAM from $55/month, Saurel dark web monitoring from $75/month.",
    es: "Precios transparentes para pymes de Beauce: sitio web desde 1 800 $, mantenimiento desde 150 $/mes, IAM Chambly desde 55 $/mes, monitoreo Dark Web Saurel desde 75 $/mes.",
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

/* ─── Types (Draveur — données venant de messages/*.json) ─── */
interface WebPackage { nom: string; cible: string; prix_min: string; prix_max: string; features: string[]; featured: boolean; }
interface Livrable   { titre: string; desc: string; }
interface MaintenanceOption { nom: string; prix: string; desc: string; }
interface HeureLine  { label: string; prix: string; note?: string; }
interface SocialPackage { nom: string; cible: string; prix_min: string; prix_max: string; features: string[]; featured: boolean; }

/* ─── Grilles tarifaires Suite Carignan ─── */
const SAUREL_TIERS = [
  { nom: "Sentinelle", prix: "75 $", cible: "~1-5 personnes", features: ["Surveillance 1 domaine", "Alertes fuites (email)", "Rapport mensuel PDF", "Dashboard en ligne"], featured: false, forteresse: false },
  { nom: "Gardien",    prix: "150 $", cible: "PME 5-20 employés", features: ["Surveillance 3 domaines", "Alertes temps réel (email + SMS)", "Rapport hebdomadaire", "Scan Dark Web continu", "Support prioritaire"], featured: true, forteresse: false },
  { nom: "Bouclier",   prix: "200 $", cible: "PME 20-50 employés", features: ["Surveillance 10 domaines", "Alertes multi-canaux", "Rapport bi-mensuel détaillé", "Analyse de risque contextuelle", "Consultant dédié"], featured: false, forteresse: false },
  { nom: "Forteresse", prix: "350 $", cible: "Municipalités & MRC", features: ["Domaines illimités", "Tableau de bord multi-entités", "Rapport exécutif mensuel", "Réponse aux incidents incluse", "Données hébergées au Québec (Loi 25)"], featured: false, forteresse: true },
];

const CHAMBLY_TIERS = [
  { nom: "Sentinelle", prix: "55 $",    cible: "~1-5 personnes",     features: ["Jusqu'à 5 comptes", "Gestion des rôles de base (RBAC)", "Tableau de bord des accès", "Rapport mensuel d'activité"], featured: false, forteresse: false },
  { nom: "Gardien",    prix: "200 $",   cible: "PME 5-20 employés",  features: ["Jusqu'à 20 comptes", "RBAC complet & politiques granulaires", "Journaux d'audit en temps réel", "Alertes de connexions suspectes", "Support prioritaire"], featured: true, forteresse: false },
  { nom: "Bouclier",   prix: "400 $",   cible: "PME 20-50 employés", features: ["Jusqu'à 50 comptes", "IAM avancé & intégrations AD/LDAP", "Rapports de conformité Loi 25", "Révision des accès automatisée", "Consultant dédié"], featured: false, forteresse: false },
  { nom: "Forteresse", prix: "1 250 $", cible: "Municipalités & MRC", features: ["Comptes illimités", "Gouvernance des identités complète", "Hébergement Québec (Loi 25)", "Réponse aux incidents incluse", "Rapport exécutif mensuel"], featured: false, forteresse: true },
];

const DEV_PRODUCTS = [
  { nom: "Contrecoeur", desc: { fr: "Simulation phishing & formation employés", en: "Phishing simulation & employee training", es: "Simulación de phishing & formación de empleados" }, paliers: ["25 $", "40 $", "120 $", "250 $"] },
  { nom: "Berthier",    desc: { fr: "Analyseur de légitimité des courriels",    en: "Email legitimacy analyzer",               es: "Analizador de legitimidad de correos"           }, paliers: ["30 $", "40 $", "115 $", "240 $"] },
  { nom: "Salières",    desc: { fr: "Remédiation & réponse aux incidents",       en: "Remediation & incident response",         es: "Remediación & respuesta a incidentes"          }, paliers: ["100 $", "135 $", "400 $", "800 $"] },
];

export default function TarificationPage() {
  const t      = useTranslations("tarification");
  const locale = useLocale();
  const isFR   = locale === "fr";
  const isEN   = locale === "en";

  const livrables      = t.raw("livrables")       as Livrable[];
  const webPackages    = t.raw("web_packages")     as WebPackage[];
  const maintenance    = t.raw("maintenance")      as MaintenanceOption[];
  const heures         = t.raw("heures")           as HeureLine[];
  const socialPackages = t.raw("social_packages")  as SocialPackage[];

  /* ── Labels multilingues ── */
  const anchorLabels = {
    draveur:  isFR ? "Division Draveur — Web"       : isEN ? "Draveur Division — Web"       : "División Draveur — Web",
    arpenteur:isFR ? "Division Arpenteur — Marque"  : isEN ? "Arpenteur Division — Brand"   : "División Arpenteur — Marca",
    carillon: isFR ? "Division Carillon — Cyber"    : isEN ? "Carillon Division — Cyber"    : "División Carillon — Cyber",
    bundles:  isFR ? "Bundles & Forfaits groupés"   : isEN ? "Bundles & Group Packages"     : "Bundles & Paquetes combinados",
  };

  const summaryLabel = {
    creer:    isFR ? "Créer"    : isEN ? "Create"  : "Crear",
    batir:    isFR ? "Bâtir"   : isEN ? "Build"   : "Construir",
    proteger: isFR ? "Protéger": isEN ? "Protect" : "Proteger",
    from:     isFR ? "dès"     : isEN ? "from"    : "desde",
    month:    isFR ? "/mois"   : isEN ? "/mo"     : "/mes",
  };

  const commOfficiellesLabel = {
    titre: isFR ? "Communications officielles" : isEN ? "Official Communications" : "Comunicaciones Oficiales",
    desc:  isFR
      ? "Communiqués de presse, discours, gestion de crise, positionnement public. Livré par Alexandra Espin Espinoza — étudiante au doctorat en communication, 7+ ans d'expérience (Présidence de l'Équateur, INSPQ, Salon de l'auto de Quito)."
      : isEN
      ? "Press releases, speeches, crisis management, public positioning. Delivered by Alexandra Espin Espinoza — doctoral candidate in communication, 7+ years of experience (Ecuador Presidential Communications, INSPQ, Quito Auto Show)."
      : "Comunicados, discursos, gestión de crisis, posicionamiento público. A cargo de Alexandra Espin Espinoza — doctoranda en comunicación, 7+ años de experiencia (Presidencia de Ecuador, INSPQ, Salón del Auto de Quito).",
    prix:  isFR ? "70 – 95 $ / h · ou forfait 400 – 700 $ / mois" : isEN ? "70 – 95 $ / hr · or 400 – 700 $ / month retainer" : "70 – 95 $ / h · o retención 400 – 700 $ / mes",
  };

  const recommended = isFR ? "Recommandé" : isEN ? "Recommended" : "Recomendado";
  const start        = isFR ? "Démarrer"  : isEN ? "Get started" : "Comenzar";
  const contact      = isFR ? "Nous contacter" : isEN ? "Contact us" : "Contáctenos";
  const earlyAccess  = isFR ? "Accès anticipé" : isEN ? "Early access" : "Acceso anticipado";
  const comingSoon   = isFR ? "Disponible fin 2026" : isEN ? "Available late 2026" : "Disponible a finales de 2026";
  const perOrg       = isFR ? "Forfait par organisation — pas par utilisateur" : isEN ? "Flat rate per organization — not per user" : "Tarifa plana por organización — no por usuario";

  return (
    <main>

      {/* ══════════════════════════════════════════════════
          HERO — titre + résumé + menu ancrage
      ══════════════════════════════════════════════════ */}
      <section className="px-6 py-20 text-center" style={{ backgroundColor: "#1D1D1B", paddingTop: "120px" }}>
        <h1 className="text-5xl md:text-6xl font-bold mb-4" style={{ color: "#F4F4F0" }}>
          {t("title")}
        </h1>
        <p className="text-lg max-w-2xl mx-auto mb-12" style={{ color: "rgba(244,244,240,0.55)" }}>
          {t("subtitle")}
        </p>

        {/* Résumé 3 piliers */}
        <div className="flex flex-wrap justify-center gap-6 mb-12">
          {[
            { label: summaryLabel.creer,    prix: "1 800 $",     color: "#5762A2", suffix: "" },
            { label: summaryLabel.batir,    prix: "150 $",       color: "#0099D1", suffix: summaryLabel.month },
            { label: summaryLabel.proteger, prix: "25 $",        color: "#C9A84C", suffix: summaryLabel.month },
          ].map((item, i) => (
            <div key={i} className="flex flex-col items-center gap-1 px-8 py-5 rounded-2xl" style={{ backgroundColor: "rgba(244,244,240,0.05)", border: "1px solid rgba(244,244,240,0.08)" }}>
              <p className="text-xs font-bold uppercase tracking-widest" style={{ color: item.color }}>{item.label}</p>
              <p className="text-3xl font-extrabold" style={{ color: "#F4F4F0" }}>
                {summaryLabel.from} {item.prix}<span className="text-lg font-normal" style={{ color: "rgba(244,244,240,0.40)" }}>{item.suffix}</span>
              </p>
            </div>
          ))}
        </div>

        {/* Menu ancrage */}
        <nav className="flex flex-wrap justify-center gap-3">
          {[
            { href: "#draveur",   label: anchorLabels.draveur,   color: "#0099D1" },
            { href: "#arpenteur", label: anchorLabels.arpenteur, color: "#5762A2" },
            { href: "#carillon",  label: anchorLabels.carillon,  color: "#203478" },
            { href: "#bundles",   label: anchorLabels.bundles,   color: "#C9A84C" },
          ].map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="px-5 py-2.5 rounded-lg font-semibold text-sm transition"
              style={{ border: `1px solid ${item.color}40`, color: item.color, backgroundColor: `${item.color}10` }}
            >
              {item.label} ↓
            </a>
          ))}
        </nav>
      </section>

      {/* ══════════════════════════════════════════════════
          DIVISION DRAVEUR — DÉVELOPPEMENT WEB
      ══════════════════════════════════════════════════ */}
      <section id="draveur" className="py-20 px-6" style={{ backgroundColor: "#F4F4F0" }}>
        <div className="max-w-6xl mx-auto">

          <div className="mb-12">
            <span className="inline-block text-xs font-bold px-3 py-1.5 rounded-full mb-4 uppercase tracking-widest" style={{ backgroundColor: "rgba(0,153,209,0.12)", color: "#0099D1", border: "1px solid rgba(0,153,209,0.30)" }}>
              Division Draveur — Développement Web
            </span>
            <h2 className="text-3xl font-bold mb-2" style={{ color: "#1D1D1B" }}>{t("web_title")}</h2>
          </div>

          {/* Livrables inclus */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-14">
            {livrables.map((l, i) => (
              <div key={i} className="p-5 rounded-xl bg-white border" style={{ borderColor: "rgba(0,153,209,0.15)" }}>
                <span className="text-2xl font-bold block mb-2" style={{ color: "rgba(0,153,209,0.40)" }}>0{i + 1}</span>
                <h3 className="font-bold text-sm mb-1" style={{ color: "#1D1D1B" }}>{l.titre}</h3>
                <p className="text-xs leading-relaxed" style={{ color: "rgba(29,29,27,0.55)" }}>{l.desc}</p>
              </div>
            ))}
          </div>

          {/* Forfaits web */}
          <p className="text-xs font-bold uppercase tracking-widest mb-6" style={{ color: "rgba(0,153,209,0.70)" }}>
            {isFR ? "Forfaits de livraison" : isEN ? "Delivery packages" : "Paquetes de entrega"}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-14">
            {webPackages.map((pkg, i) => (
              <div
                key={i}
                className="relative p-7 rounded-xl flex flex-col gap-4 bg-white transition card-lift"
                style={pkg.featured
                  ? { border: "2px solid #0099D1" }
                  : { border: "1px solid rgba(0,153,209,0.20)" }}
              >
                {pkg.featured && (
                  <span className="absolute -top-4 left-1/2 -translate-x-1/2 text-xs font-bold px-4 py-1 rounded-full uppercase tracking-widest whitespace-nowrap" style={{ backgroundColor: "#0099D1", color: "#F4F4F0" }}>
                    {t("popular_badge")}
                  </span>
                )}
                <div>
                  <h3 className="text-xl font-bold" style={{ color: "#1D1D1B" }}>{pkg.nom}</h3>
                  <p className="text-xs mt-1" style={{ color: "rgba(29,29,27,0.45)" }}>{pkg.cible}</p>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-extrabold" style={{ color: pkg.featured ? "#0099D1" : "#1D1D1B" }}>{pkg.prix_min}</span>
                  <span className="text-sm" style={{ color: "rgba(29,29,27,0.40)" }}>→ {pkg.prix_max}</span>
                </div>
                <ul className="flex flex-col gap-2 flex-1">
                  {pkg.features.map((f, fi) => (
                    <li key={fi} className="flex items-start gap-2 text-sm" style={{ color: "rgba(29,29,27,0.70)" }}>
                      <span className="mt-0.5 shrink-0" style={{ color: "#0099D1" }}>✓</span>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <Link href="/rejoindre" className="mt-2 block text-center py-3 rounded-lg font-bold text-sm transition"
                  style={pkg.featured
                    ? { backgroundColor: "#0099D1", color: "#F4F4F0" }
                    : { border: "1px solid rgba(0,153,209,0.40)", color: "#0099D1" }}>
                  {t("cta_bouton")}
                </Link>
              </div>
            ))}
          </div>

          {/* Maintenance + Heures */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest mb-5" style={{ color: "rgba(0,153,209,0.70)" }}>{t("maintenance_title")}</p>
              <div className="flex flex-col gap-4">
                {maintenance.map((m, i) => (
                  <div key={i} className="p-5 rounded-xl bg-white border" style={{ borderColor: "rgba(0,153,209,0.15)" }}>
                    <div className="flex items-start justify-between gap-4 mb-2">
                      <h3 className="font-bold text-sm" style={{ color: "#1D1D1B" }}>{m.nom}</h3>
                      <span className="font-extrabold text-lg whitespace-nowrap" style={{ color: "#0099D1" }}>{m.prix}</span>
                    </div>
                    <p className="text-xs leading-relaxed" style={{ color: "rgba(29,29,27,0.55)" }}>{m.desc}</p>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-widest mb-5" style={{ color: "rgba(0,153,209,0.70)" }}>{t("heures_title")}</p>
              <div className="rounded-xl overflow-hidden border" style={{ borderColor: "rgba(0,153,209,0.15)" }}>
                {heures.map((h, i) => (
                  <div key={i} className="flex items-center justify-between px-5 py-4 bg-white border-b last:border-0" style={{ borderColor: "rgba(0,153,209,0.10)" }}>
                    <div>
                      <span className="text-sm font-medium" style={{ color: "#1D1D1B" }}>{h.label}</span>
                      {h.note && <span className="block text-xs mt-0.5" style={{ color: "#0099D1" }}>{h.note}</span>}
                    </div>
                    <span className="font-extrabold text-xl ml-4 whitespace-nowrap" style={{ color: "#1D1D1B" }}>{h.prix}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-10 text-center">
            <Link href="/divisions/web" className="inline-block px-8 py-3 rounded-lg border font-bold text-sm transition" style={{ borderColor: "#0099D1", color: "#0099D1" }}>
              {isFR ? "Découvrir la Division Draveur →" : isEN ? "Discover Draveur Division →" : "Descubrir la División Draveur →"}
            </Link>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          DIVISION ARPENTEUR — MARQUE, PHOTO & COMMS
      ══════════════════════════════════════════════════ */}
      <section id="arpenteur" className="py-20 px-6" style={{ backgroundColor: "#FFFFFF" }}>
        <div className="max-w-6xl mx-auto">

          <div className="mb-12">
            <span className="inline-block text-xs font-bold px-3 py-1.5 rounded-full mb-4 uppercase tracking-widest" style={{ backgroundColor: "rgba(87,98,162,0.12)", color: "#5762A2", border: "1px solid rgba(87,98,162,0.30)" }}>
              Division Arpenteur — Graphisme & Marque
            </span>
            <h2 className="text-3xl font-bold mb-2" style={{ color: "#1D1D1B" }}>
              {isFR ? "Votre marque, votre voix, votre image" : isEN ? "Your brand, your voice, your image" : "Su marca, su voz, su imagen"}
            </h2>
          </div>

          {/* Médias sociaux */}
          <p className="text-xs font-bold uppercase tracking-widest mb-6" style={{ color: "rgba(87,98,162,0.70)" }}>
            {isFR ? "Gestion des médias sociaux — forfait mensuel" : isEN ? "Social media management — monthly retainer" : "Gestión de redes sociales — retención mensual"}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-14">
            {socialPackages.map((pkg, i) => (
              <div
                key={i}
                className="relative p-7 rounded-xl flex flex-col gap-4 transition card-lift"
                style={pkg.featured
                  ? { backgroundColor: "#F4F4F0", border: "2px solid #5762A2" }
                  : { backgroundColor: "#F4F4F0", border: "1px solid rgba(87,98,162,0.20)" }}
              >
                {pkg.featured && (
                  <span className="absolute -top-4 left-1/2 -translate-x-1/2 text-xs font-bold px-4 py-1 rounded-full uppercase tracking-widest whitespace-nowrap" style={{ backgroundColor: "#5762A2", color: "#F4F4F0" }}>
                    {isFR ? "Recommandé" : isEN ? "Recommended" : "Recomendado"}
                  </span>
                )}
                <div>
                  <h3 className="text-xl font-bold" style={{ color: "#1D1D1B" }}>{pkg.nom}</h3>
                  <p className="text-xs mt-1" style={{ color: "rgba(29,29,27,0.45)" }}>{pkg.cible}</p>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-extrabold" style={{ color: pkg.featured ? "#5762A2" : "#1D1D1B" }}>{pkg.prix_min}</span>
                </div>
                <ul className="flex flex-col gap-2 flex-1">
                  {pkg.features.map((f, fi) => (
                    <li key={fi} className="flex items-start gap-2 text-sm" style={{ color: "rgba(29,29,27,0.70)" }}>
                      <span className="mt-0.5 shrink-0" style={{ color: "#5762A2" }}>✓</span>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <Link href="/rejoindre" className="mt-2 block text-center py-3 rounded-lg font-bold text-sm transition"
                  style={pkg.featured
                    ? { backgroundColor: "#5762A2", color: "#F4F4F0" }
                    : { border: "1px solid rgba(87,98,162,0.40)", color: "#5762A2" }}>
                  {t("cta_bouton")}
                </Link>
              </div>
            ))}
          </div>

          {/* Identité de marque + Photo + Communications officielles */}
          <p className="text-xs font-bold uppercase tracking-widest mb-6" style={{ color: "rgba(87,98,162,0.70)" }}>
            {isFR ? "Identité de marque, photo & communications" : isEN ? "Brand identity, photography & communications" : "Identidad de marca, fotografía & comunicaciones"}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">

            {/* Branding */}
            <div className="p-6 rounded-xl border flex flex-col gap-3" style={{ borderColor: "rgba(87,98,162,0.25)", backgroundColor: "#F4F4F0" }}>
              <div>
                <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: "#5762A2" }}>{isFR ? "Branding — livraison unique" : isEN ? "Branding — one-time" : "Branding — entrega única"}</p>
                <h3 className="font-bold text-lg" style={{ color: "#1D1D1B" }}>{isFR ? "Identité de marque" : isEN ? "Brand identity" : "Identidad de marca"}</h3>
              </div>
              <ul className="flex flex-col gap-2 flex-1 text-sm" style={{ color: "rgba(29,29,27,0.70)" }}>
                <li className="flex items-start gap-2"><span style={{ color: "#5762A2" }}>✓</span><span><strong style={{ color: "#1D1D1B" }}>Signature Locale</strong> — logo + palette + guide : dès 450 $</span></li>
                <li className="flex items-start gap-2"><span style={{ color: "#5762A2" }}>✓</span><span><strong style={{ color: "#1D1D1B" }}>Identité Complète</strong> — + gabarits + carte : dès 900 $</span></li>
                <li className="flex items-start gap-2"><span style={{ color: "#5762A2" }}>✓</span><span><strong style={{ color: "#1D1D1B" }}>Livre de marque complet</strong> : 1 500 $ – 4 000 $</span></li>
                <li className="flex items-start gap-2"><span style={{ color: "#5762A2" }}>✓</span><span><strong style={{ color: "#1D1D1B" }}>Graphisme à la pièce</strong> : 45 – 65 $/h</span></li>
              </ul>
            </div>

            {/* Photo & Imprimé */}
            <div className="p-6 rounded-xl border flex flex-col gap-3" style={{ borderColor: "rgba(87,98,162,0.20)", backgroundColor: "#F4F4F0" }}>
              <div>
                <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: "#5762A2" }}>{isFR ? "Photo & Imprimé" : isEN ? "Photography & Print" : "Fotografía & Impreso"}</p>
                <h3 className="font-bold text-lg" style={{ color: "#1D1D1B" }}>{isFR ? "Photographie & Communication imprimée" : isEN ? "Photography & Printed communications" : "Fotografía & Comunicación impresa"}</h3>
              </div>
              <ul className="flex flex-col gap-2 flex-1 text-sm" style={{ color: "rgba(29,29,27,0.70)" }}>
                <li className="flex items-start gap-2"><span style={{ color: "#5762A2" }}>✓</span><span><strong style={{ color: "#1D1D1B" }}>{isFR ? "Séance produits" : isEN ? "Product shoot" : "Sesión productos"}</strong> — 20 {isFR ? "photos livrées" : isEN ? "delivered photos" : "fotos entregadas"} : dès 275 $</span></li>
                <li className="flex items-start gap-2"><span style={{ color: "#5762A2" }}>✓</span><span><strong style={{ color: "#1D1D1B" }}>{isFR ? "Séance entreprise" : isEN ? "Business shoot" : "Sesión empresa"}</strong> — {isFR ? "équipe + espace" : isEN ? "team + space" : "equipo + espacio"} : dès 450 $</span></li>
                <li className="flex items-start gap-2"><span style={{ color: "#5762A2" }}>✓</span><span><strong style={{ color: "#1D1D1B" }}>{isFR ? "Carte d'affaires, pamphlet, dépliant" : isEN ? "Business cards, pamphlets, flyers" : "Tarjetas, folletos, dípticos"}</strong> : dès 125 $</span></li>
                <li className="flex items-start gap-2"><span style={{ color: "#5762A2" }}>✓</span><span>{isFR ? "Photo à la pièce" : isEN ? "Per-photo rate" : "Tarifa por foto"} : 30 – 45 $/photo</span></li>
              </ul>
            </div>

            {/* Communications officielles — NOUVEAU */}
            <div className="p-6 rounded-xl border flex flex-col gap-3" style={{ borderColor: "rgba(87,98,162,0.35)", backgroundColor: "rgba(87,98,162,0.05)" }}>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <p className="text-xs font-bold uppercase tracking-widest" style={{ color: "#5762A2" }}>{isFR ? "Communications — Alexandra Espin" : isEN ? "Communications — Alexandra Espin" : "Comunicaciones — Alexandra Espin"}</p>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full uppercase" style={{ backgroundColor: "rgba(87,98,162,0.15)", color: "#5762A2" }}>Nouveau</span>
                </div>
                <h3 className="font-bold text-lg" style={{ color: "#1D1D1B" }}>{commOfficiellesLabel.titre}</h3>
              </div>
              <p className="text-sm leading-relaxed flex-1" style={{ color: "rgba(29,29,27,0.65)" }}>
                {commOfficiellesLabel.desc}
              </p>
              <div className="pt-3 border-t" style={{ borderColor: "rgba(87,98,162,0.15)" }}>
                <p className="font-bold text-base" style={{ color: "#5762A2" }}>{commOfficiellesLabel.prix}</p>
              </div>
            </div>
          </div>

          <div className="text-center">
            <Link href="/divisions/arpenteur" className="inline-block px-8 py-3 rounded-lg border font-bold text-sm transition" style={{ borderColor: "#5762A2", color: "#5762A2" }}>
              {isFR ? "Découvrir la Division Arpenteur →" : isEN ? "Discover Arpenteur Division →" : "Descubrir la División Arpenteur →"}
            </Link>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          DIVISION CARILLON — SUITE CARIGNAN
      ══════════════════════════════════════════════════ */}
      <section id="carillon" className="py-20 px-6" style={{ backgroundColor: "#E3E6EF" }}>
        <div className="max-w-6xl mx-auto">

          <div className="mb-12">
            <span className="inline-block text-xs font-bold px-3 py-1.5 rounded-full mb-4 uppercase tracking-widest" style={{ backgroundColor: "rgba(32,52,120,0.15)", color: "#203478", border: "1px solid rgba(32,52,120,0.30)" }}>
              Division Carillon — Cybersécurité
            </span>
            <h2 className="text-3xl font-bold mb-2" style={{ color: "#1D1D1B" }}>
              {isFR ? "Suite Carignan — La chaîne défensive complète" : isEN ? "Suite Carignan — The complete defensive chain" : "Suite Carignan — La cadena defensiva completa"}
            </h2>
            <p className="text-sm max-w-2xl leading-relaxed" style={{ color: "rgba(29,29,27,0.55)" }}>
              {isFR
                ? "Cinq outils spécialisés, chacun maître de son périmètre cybersécurité. Paliers unifiés (Sentinelle/Gardien/Bouclier/Forteresse) — forfait par organisation, pas par utilisateur."
                : isEN
                ? "Five specialized tools, each master of its cybersecurity perimeter. Unified tiers (Sentinelle/Gardien/Bouclier/Forteresse) — flat rate per organization, not per user."
                : "Cinco herramientas especializadas, cada una maestra de su perímetro de ciberseguridad. Niveles unificados — tarifa por organización, no por usuario."}
            </p>
          </div>

          {/* ─── SAUREL ─── */}
          <div className="mb-14">
            <div className="flex items-center gap-3 mb-6">
              <h3 className="text-2xl font-bold" style={{ color: "#1D1D1B" }}>SAUREL</h3>
              <span className="text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest" style={{ backgroundColor: "rgba(32,52,120,0.12)", color: "#203478", border: "1px solid rgba(32,52,120,0.25)" }}>
                {isFR ? "En production" : isEN ? "Live" : "En producción"}
              </span>
            </div>
            <p className="text-sm mb-6" style={{ color: "rgba(29,29,27,0.60)" }}>
              {isFR ? "Surveillance du Dark Web en temps réel — Saurel scanne en continu les marchés clandestins et vous alerte avant que les dommages soient faits." : isEN ? "Real-time Dark Web monitoring — Saurel continuously scans clandestine markets and alerts you before damage is done." : "Monitoreo del Dark Web en tiempo real — Saurel escanea mercados clandestinos y le alerta antes de que ocurra el daño."}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
              {SAUREL_TIERS.map((tier, i) => (
                <div key={i} className="relative p-6 rounded-xl flex flex-col gap-4 bg-white transition card-lift"
                  style={tier.featured ? { border: "2px solid #203478" } : tier.forteresse ? { border: "1px solid rgba(201,168,76,0.40)" } : { border: "1px solid rgba(32,52,120,0.20)" }}>
                  {tier.featured && <span className="absolute -top-4 left-1/2 -translate-x-1/2 text-xs font-bold px-4 py-1 rounded-full uppercase tracking-widest whitespace-nowrap" style={{ backgroundColor: "#203478", color: "#F4F4F0" }}>{recommended}</span>}
                  <div>
                    <h4 className="text-lg font-bold" style={{ color: tier.featured ? "#203478" : tier.forteresse ? "#C9A84C" : "#1D1D1B" }}>{tier.nom}</h4>
                    <p className="text-xs mt-0.5" style={{ color: "rgba(29,29,27,0.45)" }}>{tier.cible}</p>
                  </div>
                  <p className="text-2xl font-extrabold" style={{ color: tier.featured ? "#203478" : tier.forteresse ? "#C9A84C" : "#1D1D1B" }}>{tier.prix} <span className="text-sm font-normal" style={{ color: "rgba(29,29,27,0.40)" }}>/mois</span></p>
                  <ul className="flex flex-col gap-1.5 flex-1 text-sm" style={{ color: "rgba(29,29,27,0.70)" }}>
                    {tier.features.map((f, fi) => <li key={fi} className="flex items-start gap-2"><span className="shrink-0 mt-0.5" style={{ color: "#203478" }}>✓</span><span>{f}</span></li>)}
                  </ul>
                  <Link href="/rejoindre" className="mt-2 block text-center py-2.5 rounded-lg font-bold text-sm transition"
                    style={tier.featured ? { backgroundColor: "#203478", color: "#F4F4F0" } : tier.forteresse ? { border: "1px solid rgba(201,168,76,0.50)", color: "#C9A84C" } : { border: "1px solid rgba(32,52,120,0.35)", color: "#203478" }}>
                    {tier.forteresse ? contact : start}
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {/* ─── CHAMBLY ─── */}
          <div className="mb-14">
            <div className="flex items-center gap-3 mb-6">
              <h3 className="text-2xl font-bold" style={{ color: "#1D1D1B" }}>CHAMBLY</h3>
              <span className="text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest" style={{ backgroundColor: "rgba(201,168,76,0.15)", color: "#C9A84C", border: "1px solid rgba(201,168,76,0.40)" }}>
                {earlyAccess}
              </span>
            </div>
            <p className="text-sm mb-6" style={{ color: "rgba(29,29,27,0.60)" }}>
              {isFR ? "IAM — contrôle d'accès basé sur les rôles (RBAC), gestion des identités, journaux d'audit. Chambly verrouille chaque point d'entrée de votre organisation." : isEN ? "IAM — role-based access control (RBAC), identity management, audit logs. Chambly locks every access point in your organization." : "IAM — control de acceso basado en roles (RBAC), gestión de identidades, registros de auditoría."}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
              {CHAMBLY_TIERS.map((tier, i) => (
                <div key={i} className="relative p-6 rounded-xl flex flex-col gap-4 bg-white transition card-lift"
                  style={tier.featured ? { border: "2px solid #203478" } : tier.forteresse ? { border: "1px solid rgba(201,168,76,0.40)" } : { border: "1px solid rgba(32,52,120,0.20)" }}>
                  {tier.featured && <span className="absolute -top-4 left-1/2 -translate-x-1/2 text-xs font-bold px-4 py-1 rounded-full uppercase tracking-widest whitespace-nowrap" style={{ backgroundColor: "#203478", color: "#F4F4F0" }}>{recommended}</span>}
                  <div>
                    <h4 className="text-lg font-bold" style={{ color: tier.featured ? "#203478" : tier.forteresse ? "#C9A84C" : "#1D1D1B" }}>{tier.nom}</h4>
                    <p className="text-xs mt-0.5" style={{ color: "rgba(29,29,27,0.45)" }}>{tier.cible}</p>
                  </div>
                  <p className="text-2xl font-extrabold" style={{ color: tier.featured ? "#203478" : tier.forteresse ? "#C9A84C" : "#1D1D1B" }}>{tier.prix} <span className="text-sm font-normal" style={{ color: "rgba(29,29,27,0.40)" }}>{tier.forteresse ? "" : "/mois"}</span></p>
                  <ul className="flex flex-col gap-1.5 flex-1 text-sm" style={{ color: "rgba(29,29,27,0.70)" }}>
                    {tier.features.map((f, fi) => <li key={fi} className="flex items-start gap-2"><span className="shrink-0 mt-0.5" style={{ color: "#203478" }}>✓</span><span>{f}</span></li>)}
                  </ul>
                  <Link href="/rejoindre" className="mt-2 block text-center py-2.5 rounded-lg font-bold text-sm transition"
                    style={tier.featured ? { backgroundColor: "#203478", color: "#F4F4F0" } : tier.forteresse ? { border: "1px solid rgba(201,168,76,0.50)", color: "#C9A84C" } : { border: "1px solid rgba(32,52,120,0.35)", color: "#203478" }}>
                    {tier.forteresse ? contact : earlyAccess + " →"}
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {/* ─── 3 produits en développement ─── */}
          <div className="rounded-2xl p-8" style={{ backgroundColor: "rgba(32,52,120,0.06)", border: "1px solid rgba(32,52,120,0.15)" }}>
            <div className="flex items-center gap-3 mb-6">
              <h3 className="text-xl font-bold" style={{ color: "#1D1D1B" }}>
                {isFR ? "En développement — disponible fin 2026" : isEN ? "In development — available late 2026" : "En desarrollo — disponible a finales de 2026"}
              </h3>
              <span className="text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest" style={{ backgroundColor: "rgba(32,52,120,0.12)", color: "#203478", border: "1px solid rgba(32,52,120,0.25)" }}>
                {comingSoon}
              </span>
            </div>

            {/* Tableau des paliers */}
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b" style={{ borderColor: "rgba(32,52,120,0.15)" }}>
                    <th className="text-left pb-3 font-bold" style={{ color: "rgba(29,29,27,0.50)" }}>{isFR ? "Produit" : isEN ? "Product" : "Producto"}</th>
                    <th className="text-left pb-3 font-bold" style={{ color: "rgba(29,29,27,0.50)" }}>{isFR ? "Description" : isEN ? "Description" : "Descripción"}</th>
                    <th className="text-center pb-3 font-bold" style={{ color: "#203478" }}>Sentinelle</th>
                    <th className="text-center pb-3 font-bold" style={{ color: "#203478" }}>Gardien</th>
                    <th className="text-center pb-3 font-bold" style={{ color: "#203478" }}>Bouclier</th>
                    <th className="text-center pb-3 font-bold" style={{ color: "#C9A84C" }}>Forteresse</th>
                  </tr>
                </thead>
                <tbody>
                  {DEV_PRODUCTS.map((prod, i) => (
                    <tr key={i} className="border-b last:border-0" style={{ borderColor: "rgba(32,52,120,0.08)" }}>
                      <td className="py-4 font-bold pr-4" style={{ color: "#1D1D1B" }}>{prod.nom}</td>
                      <td className="py-4 pr-6" style={{ color: "rgba(29,29,27,0.55)" }}>{prod.desc[locale as "fr" | "en" | "es"] ?? prod.desc.fr}</td>
                      {prod.paliers.map((p, pi) => (
                        <td key={pi} className="py-4 text-center font-bold" style={{ color: pi === 3 ? "#C9A84C" : "#203478" }}>{p}<span className="text-xs font-normal" style={{ color: "rgba(29,29,27,0.40)" }}>/mois</span></td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs mt-4 italic" style={{ color: "rgba(29,29,27,0.40)" }}>{perOrg}</p>
          </div>

          <div className="mt-10 text-center">
            <Link href="/divisions/cyber" className="inline-block px-8 py-3 rounded-lg border font-bold text-sm transition" style={{ borderColor: "#203478", color: "#203478" }}>
              {isFR ? "Découvrir la Division Carillon →" : isEN ? "Discover Carillon Division →" : "Descubrir la División Carillon →"}
            </Link>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          BUNDLES
      ══════════════════════════════════════════════════ */}
      <section id="bundles" className="py-20 px-6" style={{ backgroundColor: "#1D1D1B" }}>
        <div className="max-w-5xl mx-auto">

          <div className="mb-12 text-center">
            <span className="inline-block text-xs font-bold px-3 py-1.5 rounded-full mb-4 uppercase tracking-widest" style={{ backgroundColor: "rgba(201,168,76,0.15)", color: "#C9A84C", border: "1px solid rgba(201,168,76,0.30)" }}>
              {isFR ? "Bundles & Forfaits groupés" : isEN ? "Bundles & Group packages" : "Bundles & Paquetes combinados"}
            </span>
            <h2 className="text-3xl font-bold mb-3" style={{ color: "#F4F4F0" }}>
              {isFR ? "Combinez, économisez, protégez" : isEN ? "Combine, save, protect" : "Combine, ahorre, proteja"}
            </h2>
            <p className="text-base max-w-xl mx-auto" style={{ color: "rgba(244,244,240,0.50)" }}>
              {isFR ? "Plus vous combinez de produits de la Suite Carignan, plus le rabais est avantageux. La chaîne est plus forte que chacun de ses maillons." : isEN ? "The more Suite Carignan products you combine, the better the discount. The chain is stronger than any single link." : "Cuantos más productos de la Suite Carignan combine, mayor será el descuento."}
            </p>
          </div>

          {/* Bundle Suite Carignan */}
          <div className="rounded-2xl p-8 mb-8" style={{ backgroundColor: "rgba(32,52,120,0.25)", border: "1px solid rgba(32,52,120,0.50)" }}>
            <h3 className="text-xl font-bold mb-2" style={{ color: "#F4F4F0" }}>Suite Carignan</h3>
            <p className="text-sm mb-6" style={{ color: "rgba(244,244,240,0.50)" }}>
              {isFR ? "Rabais automatique selon le nombre de produits combinés au même palier." : isEN ? "Automatic discount based on the number of products combined at the same tier." : "Descuento automático según el número de productos combinados en el mismo nivel."}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="p-6 rounded-xl" style={{ backgroundColor: "rgba(244,244,240,0.05)", border: "1px solid rgba(244,244,240,0.10)" }}>
                <p className="text-2xl font-extrabold mb-1" style={{ color: "#C9A84C" }}>−25 %</p>
                <p className="font-bold mb-1" style={{ color: "#F4F4F0" }}>{isFR ? "2 ou 3 produits groupés" : isEN ? "2 or 3 combined products" : "2 o 3 productos combinados"}</p>
                <p className="text-sm" style={{ color: "rgba(244,244,240,0.45)" }}>
                  {isFR ? "Ex. Saurel + Berthier au palier Gardien : 150 $ + 40 $ = 190 $ → 143 $/mois" : isEN ? "Ex. Saurel + Berthier at Gardien tier: $150 + $40 = $190 → $143/mo" : "Ej. Saurel + Berthier nivel Gardien: 150 $ + 40 $ = 190 $ → 143 $/mes"}
                </p>
              </div>
              <div className="p-6 rounded-xl" style={{ backgroundColor: "rgba(244,244,240,0.05)", border: "1px solid rgba(244,244,240,0.10)" }}>
                <p className="text-2xl font-extrabold mb-1" style={{ color: "#C9A84C" }}>−30 %</p>
                <p className="font-bold mb-1" style={{ color: "#F4F4F0" }}>{isFR ? "Suite complète (4-5 produits)" : isEN ? "Full suite (4-5 products)" : "Suite completa (4-5 productos)"}</p>
                <p className="text-sm" style={{ color: "rgba(244,244,240,0.45)" }}>
                  {isFR ? "Ex. 5 produits au palier Gardien : 565 $ brut → 395 $/mois tout inclus" : isEN ? "Ex. 5 products at Gardien tier: $565 gross → $395/mo all-in" : "Ej. 5 productos nivel Gardien: 565 $ bruto → 395 $/mes todo incluido"}
                </p>
              </div>
            </div>
          </div>

          {/* Bundle Total */}
          <div className="rounded-2xl p-8" style={{ backgroundColor: "rgba(201,168,76,0.10)", border: "1px solid rgba(201,168,76,0.30)" }}>
            <div className="flex items-center gap-3 mb-4">
              <h3 className="text-xl font-bold" style={{ color: "#F4F4F0" }}>
                {isFR ? "Bundle Total — Arpenteur + Draveur + Carillon" : isEN ? "Total Bundle — Arpenteur + Draveur + Carillon" : "Bundle Total — Arpenteur + Draveur + Carillon"}
              </h3>
              <span className="text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest" style={{ backgroundColor: "rgba(201,168,76,0.20)", color: "#C9A84C", border: "1px solid rgba(201,168,76,0.40)" }}>−20 %</span>
            </div>
            <p className="text-sm mb-6" style={{ color: "rgba(244,244,240,0.50)" }}>
              {isFR ? "Combinez image de marque, site web et cybersécurité pour une réduction de 20 % sur l'ensemble. Deux volets : mise de fond (one-time) + récurrent mensuel." : isEN ? "Combine brand identity, website and cybersecurity for a 20% reduction overall. Two components: one-time setup + monthly recurring." : "Combine imagen de marca, sitio web y ciberseguridad con un 20% de reducción. Dos componentes: inversión inicial + mensual recurrente."}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="p-5 rounded-xl" style={{ backgroundColor: "rgba(244,244,240,0.05)", border: "1px solid rgba(244,244,240,0.08)" }}>
                <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "rgba(244,244,240,0.40)" }}>{isFR ? "Mise de fond — livraison unique" : isEN ? "Setup — one-time" : "Inversión inicial — única"}</p>
                <p className="text-sm" style={{ color: "rgba(244,244,240,0.65)" }}>
                  {isFR ? "Site web (dès 1 800 $) + Livre de marque (dès 1 500 $)" : isEN ? "Website (from $1,800) + Brand book (from $1,500)" : "Sitio web (desde 1 800 $) + Libro de marca (desde 1 500 $)"}
                </p>
                <p className="text-sm mt-2 italic" style={{ color: "rgba(244,244,240,0.40)" }}>
                  {isFR ? "Ex. PME type : 4 500 $ + 2 500 $ = 7 000 $ → 5 600 $ avec bundle" : isEN ? "Ex. typical SMB: $4,500 + $2,500 = $7,000 → $5,600 with bundle" : "Ej. pyme tipo: 4 500 $ + 2 500 $ = 7 000 $ → 5 600 $ con bundle"}
                </p>
              </div>
              <div className="p-5 rounded-xl" style={{ backgroundColor: "rgba(244,244,240,0.05)", border: "1px solid rgba(244,244,240,0.08)" }}>
                <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "rgba(244,244,240,0.40)" }}>{isFR ? "Récurrent mensuel" : isEN ? "Monthly recurring" : "Mensual recurrente"}</p>
                <p className="text-sm" style={{ color: "rgba(244,244,240,0.65)" }}>
                  {isFR ? "Maintenance web + Réseaux sociaux + Palier Carillon choisi" : isEN ? "Web maintenance + Social media + Chosen Carillon tier" : "Mantenimiento web + Redes sociales + Nivel Carillon elegido"}
                </p>
                <p className="text-sm mt-2 italic" style={{ color: "rgba(244,244,240,0.40)" }}>
                  {isFR ? "Ex. mi-gamme : 250 $ + 550 $ + 200 $/mois = 1 000 $ → 800 $/mois" : isEN ? "Ex. mid-range: $250 + $550 + $200/mo = $1,000 → $800/mo" : "Ej. gama media: 250 $ + 550 $ + 200 $/mes = 1 000 $ → 800 $/mes"}
                </p>
              </div>
            </div>
          </div>

          <p className="text-center mt-8 text-sm" style={{ color: "rgba(244,244,240,0.35)" }}>
            {isFR ? "Les bundles s'appliquent sur présentation d'un devis — contactez-nous pour un calcul personnalisé." : isEN ? "Bundles apply upon quote submission — contact us for a personalized estimate." : "Los bundles se aplican con presentación de presupuesto — contáctenos para un cálculo personalizado."}
          </p>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          CTA FINAL
      ══════════════════════════════════════════════════ */}
      <section className="py-20 px-6 text-center" style={{ backgroundColor: "#F4F4F0" }}>
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold mb-4" style={{ color: "#1D1D1B" }}>{t("cta_title")}</h2>
          <p className="mb-8" style={{ color: "rgba(29,29,27,0.55)" }}>{t("cta_desc")}</p>
          <Link href="/rejoindre" className="inline-block px-10 py-4 rounded-lg font-bold text-lg transition" style={{ backgroundColor: "#1D1D1B", color: "#F4F4F0" }}>
            {t("cta_bouton")}
          </Link>
        </div>
      </section>

    </main>
  );
}
