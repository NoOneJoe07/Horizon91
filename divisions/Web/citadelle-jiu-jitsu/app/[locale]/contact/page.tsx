// =============================================================================
// app/[locale]/contact/page.tsx — Page de contact
// -----------------------------------------------------------------------------
// RÔLE :
//   Affiche les coordonnées du dojo (adresse, téléphone, réseaux sociaux)
//   et le formulaire de contact général (ContactForm).
//
// TYPE : Server Component (async)
//   Les coordonnées sont du contenu statique → pas de BD nécessaire ici.
//   ContactForm est un Client Component importé et rendu dans cette page.
//
// ROUTE : /fr/contact  ou  /en/contact
//
// LAYOUT :
//   - Haut : 3 cards d'info (adresse, téléphone, réseaux sociaux)
//   - Bas  : formulaire de contact (ContactForm.tsx)
//
// AUTEUR    : Horizon 91 — Jonathan Patoine + Claude (Anthropic)
// CRÉÉ      : 2026-04-xx  |  MODIFIÉ : 2026-05-04 (formulaire branché)
// DÉPENDANCES : ContactForm, next-intl
// =============================================================================

import { getTranslations, setRequestLocale } from "next-intl/server";
import { ContactForm } from "@/components/ContactForm";
import type { Metadata } from "next";
import type { Locale } from "@/lib/locales";

// ---------------------------------------------------------------------------
// SEO — Métadonnées de la page contact
// ---------------------------------------------------------------------------
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return {
    title:       locale === "fr" ? "Nous contacter"    : "Contact us",
    description: locale === "fr"
      ? "Contactez Citadelle Jiu-Jitsu à Québec : 418-564-1047, 964 Rue Mainguy. Questions, cours de groupe, partenariats."
      : "Contact Citadelle Jiu-Jitsu in Québec City: 418-564-1047, 964 Rue Mainguy. Questions, group classes, partnerships.",
  };
}

// ---------------------------------------------------------------------------
// Composant de page
// ---------------------------------------------------------------------------
export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  // Charge les traductions du namespace "Contact"
  // Clés utilisées : title, subtitle, address, phone + les clés enfants form.*
  const t = await getTranslations({ locale, namespace: "Contact" });

  return (
    <section className="section">
      <div className="container-citadelle" style={{ maxWidth: "780px" }}>

        {/* En-tête de page */}
        <header style={{ textAlign: "center", marginBottom: "3rem" }}>
          <h1 style={{ fontSize: "2.5rem", marginBottom: "0.5rem" }}>{t("title")}</h1>
          <p style={{ color: "var(--color-citadelle-text-muted)" }}>{t("subtitle")}</p>
        </header>

        {/* ── Cards d'information de contact ──────────────────────────────
            Layout : auto-fit minmax(220px, 1fr)
            → 3 colonnes sur desktop, 1 colonne sur mobile (responsive auto)
            Les données (adresse, tél, réseaux) sont hardcodées ici car elles
            ne changent pas souvent. Pas nécessaire de les mettre en BD.
            Si elles changent → modifier directement ce fichier. */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "1.25rem",
            marginBottom: "2.5rem",
          }}
        >
          {/* Card : Adresse */}
          <div className="card">
            <h3 style={{
              fontSize: "0.875rem",
              color: "var(--color-citadelle-text-muted)",
              textTransform: "uppercase",
              letterSpacing: "0.05em",
            }}>
              {t("address")}
            </h3>
            <p style={{ marginTop: "0.5rem" }}>
              964 Rue Mainguy
              <br />
              Québec, QC G1V 3S4
            </p>
            {/* Lien Google Maps — s'ouvre dans un nouvel onglet.
                rel="noopener noreferrer" : sécurité (empêche la page cible
                d'accéder à window.opener de notre site). */}
            <a
              href="https://maps.google.com/?q=964+Rue+Mainguy,+Quebec,+QC+G1V+3S4"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-block",
                marginTop: "0.5rem",
                fontSize: "0.875rem",
                color: "var(--color-citadelle-gold)",
              }}
            >
              {locale === "fr" ? "Voir sur Google Maps →" : "View on Google Maps →"}
            </a>
          </div>

          {/* Card : Téléphone */}
          <div className="card">
            <h3 style={{
              fontSize: "0.875rem",
              color: "var(--color-citadelle-text-muted)",
              textTransform: "uppercase",
              letterSpacing: "0.05em",
            }}>
              {t("phone")}
            </h3>
            {/* href="tel:" : sur mobile, ouvre directement l'application téléphone */}
            <p style={{ marginTop: "0.5rem" }}>
              <a href="tel:+14185641047" style={{ color: "inherit" }}>
                418-564-1047
              </a>
            </p>
          </div>

          {/* Card : Réseaux sociaux */}
          <div className="card">
            <h3 style={{
              fontSize: "0.875rem",
              color: "var(--color-citadelle-text-muted)",
              textTransform: "uppercase",
              letterSpacing: "0.05em",
            }}>
              {locale === "fr" ? "Réseaux sociaux" : "Social media"}
            </h3>
            <div style={{ marginTop: "0.5rem", display: "grid", gap: "0.4rem" }}>
              <a
                href="https://www.instagram.com/citadellebjj/"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "var(--color-citadelle-gold)" }}
              >
                Instagram — @citadellebjj
              </a>
              <a
                href="https://www.facebook.com/p/Citadelle-Jiu-Jitsu-61578755165328/"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "var(--color-citadelle-gold)" }}
              >
                Facebook — Citadelle Jiu-Jitsu
              </a>
            </div>
          </div>
        </div>

        {/* ── Formulaire de contact ─────────────────────────────────────────
            ContactForm est un Client Component ("use client").
            Il gère son propre état (idle/submitting/success/error) et
            envoie les données à POST /api/contact.
            Voir components/ContactForm.tsx pour la documentation complète. */}
        <ContactForm locale={locale} />

      </div>
    </section>
  );
}
