// =============================================================================
// app/[locale]/conditions/page.tsx — Conditions d'utilisation
// -----------------------------------------------------------------------------
// Page légale complémentaire à la politique de confidentialité.
// Couvre : utilisation du site, comptes membres, paiements, responsabilités.
// ROUTE : /fr/conditions  et  /en/conditions
// =============================================================================

import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import type { Locale } from "@/lib/locales";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return {
    title:       locale === "fr" ? "Conditions d'utilisation" : "Terms of Use",
    description: locale === "fr"
      ? "Conditions d'utilisation du site web et des services de Citadelle Jiu-Jitsu."
      : "Terms of use for the Citadelle Jiu-Jitsu website and services.",
    robots: "noindex, follow",
  };
}

const styles = {
  section: { marginBottom: "2rem" } as React.CSSProperties,
  h2: {
    fontSize: "1.25rem",
    fontWeight: 700 as const,
    marginBottom: "0.75rem",
    color: "var(--color-citadelle-gold)",
    borderBottom: "1px solid var(--color-citadelle-border)",
    paddingBottom: "0.4rem",
  } as React.CSSProperties,
  p: {
    color: "var(--color-citadelle-text-muted)",
    lineHeight: 1.75,
    marginBottom: "0.75rem",
    fontSize: "0.95rem",
  } as React.CSSProperties,
  ul: {
    listStyle: "disc",
    paddingLeft: "1.5rem",
    color: "var(--color-citadelle-text-muted)",
    lineHeight: 1.75,
    fontSize: "0.95rem",
    marginBottom: "0.75rem",
  } as React.CSSProperties,
  highlight: {
    color: "var(--color-citadelle-text)",
    fontWeight: 600 as const,
  } as React.CSSProperties,
};

function TermsFR() {
  return (
    <>
      <p style={{ ...styles.p, fontStyle: "italic" }}>Dernière mise à jour : 10 mai 2026</p>

      <div style={styles.section}>
        <h2 style={styles.h2}>1. Acceptation des conditions</h2>
        <p style={styles.p}>
          En accédant au site web de Citadelle Jiu-Jitsu ou en utilisant ses services (inscription, abonnements, boutique, réservation de séance d'essai), vous acceptez les présentes conditions d'utilisation dans leur intégralité. Si vous n'acceptez pas ces conditions, veuillez ne pas utiliser ce site.
        </p>
      </div>

      <div style={styles.section}>
        <h2 style={styles.h2}>2. Services offerts</h2>
        <p style={styles.p}>Citadelle Jiu-Jitsu offre les services suivants via ce site :</p>
        <ul style={styles.ul}>
          <li>Inscription et gestion de compte membre</li>
          <li>Abonnements aux cours de jiu-jitsu brésilien (adulte, enfant, famille)</li>
          <li>Réservation de séances d'essai gratuites</li>
          <li>Achat de marchandise et équipement (boutique en ligne)</li>
          <li>Consultation des horaires de cours</li>
          <li>Information sur les instructeurs et les programmes</li>
        </ul>
      </div>

      <div style={styles.section}>
        <h2 style={styles.h2}>3. Comptes membres</h2>
        <p style={styles.p}>
          Pour accéder à certaines fonctionnalités (historique d'achats, gestion d'abonnement), vous devez créer un compte. Vous êtes responsable de la confidentialité de vos identifiants. Tout accès non autorisé à votre compte doit être signalé immédiatement à{" "}
          <a href="mailto:citadellejj@gmail.com" style={{ color: "var(--color-citadelle-gold)" }}>
            citadellejj@gmail.com
          </a>.
        </p>
      </div>

      <div style={styles.section}>
        <h2 style={styles.h2}>4. Paiements et abonnements</h2>
        <ul style={styles.ul}>
          <li>Les paiements en ligne sont traités de façon sécurisée par <span style={styles.highlight}>Stripe Inc.</span> (certifié PCI DSS niveau 1)</li>
          <li>Les abonnements sont sans engagement après le premier mois, sauf indication contraire</li>
          <li>Les annulations doivent être effectuées avant la date de renouvellement</li>
          <li>Les achats de la boutique sont finaux — échanges acceptés dans les 14 jours si l'article est non utilisé et dans son emballage d'origine</li>
          <li>Citadelle Jiu-Jitsu se réserve le droit de modifier ses tarifs avec un préavis de 30 jours</li>
        </ul>
      </div>

      <div style={styles.section}>
        <h2 style={styles.h2}>5. Séances d'essai gratuites</h2>
        <p style={styles.p}>
          La séance d'essai gratuite est offerte une seule fois par personne. Elle est soumise à la disponibilité et doit être réservée à l'avance via le formulaire en ligne. Citadelle Jiu-Jitsu se réserve le droit de refuser une réservation.
        </p>
      </div>

      <div style={styles.section}>
        <h2 style={styles.h2}>6. Responsabilité et santé</h2>
        <p style={styles.p}>
          La pratique des arts martiaux comporte des risques physiques inhérents. En vous inscrivant, vous reconnaissez être en bonne condition physique pour pratiquer et vous dégagez Citadelle Jiu-Jitsu de toute responsabilité pour les blessures survenant lors de la pratique normale des cours, sous réserve des dispositions légales applicables au Québec.
        </p>
      </div>

      <div style={styles.section}>
        <h2 style={styles.h2}>7. Propriété intellectuelle</h2>
        <p style={styles.p}>
          Le contenu de ce site (textes, images, logo, design) est la propriété de Citadelle Jiu-Jitsu ou de ses partenaires. Toute reproduction sans autorisation écrite préalable est interdite.
        </p>
      </div>

      <div style={styles.section}>
        <h2 style={styles.h2}>8. Modification des conditions</h2>
        <p style={styles.p}>
          Citadelle Jiu-Jitsu se réserve le droit de modifier ces conditions à tout moment. La date de dernière modification est indiquée en haut de cette page. L'utilisation continue du site après une modification vaut acceptation des nouvelles conditions.
        </p>
      </div>

      <div style={styles.section}>
        <h2 style={styles.h2}>9. Droit applicable</h2>
        <p style={styles.p}>
          Les présentes conditions sont régies par les lois de la province de Québec et du Canada. Tout litige sera soumis aux tribunaux compétents du district de Québec.
        </p>
      </div>

      <div style={styles.section}>
        <h2 style={styles.h2}>10. Contact</h2>
        <p style={styles.p}>
          Pour toute question relative aux présentes conditions :{" "}
          <a href="tel:+14185641047" style={{ color: "var(--color-citadelle-gold)" }}>418-564-1047</a>
          {" "}·{" "}
          964 Rue Mainguy, Québec, QC G1V 3S4
        </p>
      </div>
    </>
  );
}

function TermsEN() {
  return (
    <>
      <p style={{ ...styles.p, fontStyle: "italic" }}>Last updated: May 10, 2026</p>

      <div style={styles.section}>
        <h2 style={styles.h2}>1. Acceptance of Terms</h2>
        <p style={styles.p}>
          By accessing the Citadelle Jiu-Jitsu website or using its services (registration, memberships, shop, trial class booking), you agree to these terms of use in their entirety. If you do not agree, please do not use this site.
        </p>
      </div>

      <div style={styles.section}>
        <h2 style={styles.h2}>2. Services Offered</h2>
        <ul style={styles.ul}>
          <li>Member account registration and management</li>
          <li>Memberships for Brazilian jiu-jitsu classes (adult, child, family)</li>
          <li>Free trial class bookings</li>
          <li>Merchandise and equipment purchases (online shop)</li>
          <li>Class schedule consultation</li>
          <li>Instructor and program information</li>
        </ul>
      </div>

      <div style={styles.section}>
        <h2 style={styles.h2}>3. Member Accounts</h2>
        <p style={styles.p}>
          To access certain features, you must create an account. You are responsible for keeping your credentials confidential. Any unauthorized access must be reported immediately to{" "}
          <a href="mailto:citadellejj@gmail.com" style={{ color: "var(--color-citadelle-gold)" }}>
            citadellejj@gmail.com
          </a>.
        </p>
      </div>

      <div style={styles.section}>
        <h2 style={styles.h2}>4. Payments and Memberships</h2>
        <ul style={styles.ul}>
          <li>Online payments are securely processed by <span style={styles.highlight}>Stripe Inc.</span> (PCI DSS Level 1 certified)</li>
          <li>Memberships are commitment-free after the first month unless otherwise stated</li>
          <li>Cancellations must be made before the renewal date</li>
          <li>Shop purchases are final — exchanges accepted within 14 days for unused, unopened items</li>
          <li>Citadelle Jiu-Jitsu reserves the right to modify pricing with 30 days notice</li>
        </ul>
      </div>

      <div style={styles.section}>
        <h2 style={styles.h2}>5. Free Trial Classes</h2>
        <p style={styles.p}>
          The free trial class is offered once per person, subject to availability, and must be booked in advance via the online form. Citadelle Jiu-Jitsu reserves the right to decline a booking.
        </p>
      </div>

      <div style={styles.section}>
        <h2 style={styles.h2}>6. Liability and Health</h2>
        <p style={styles.p}>
          Martial arts practice carries inherent physical risks. By registering, you acknowledge being in adequate physical condition to train and release Citadelle Jiu-Jitsu from liability for injuries arising from normal class participation, subject to applicable Quebec law.
        </p>
      </div>

      <div style={styles.section}>
        <h2 style={styles.h2}>7. Intellectual Property</h2>
        <p style={styles.p}>
          All site content (text, images, logo, design) is the property of Citadelle Jiu-Jitsu or its partners. Reproduction without prior written authorization is prohibited.
        </p>
      </div>

      <div style={styles.section}>
        <h2 style={styles.h2}>8. Changes to Terms</h2>
        <p style={styles.p}>
          Citadelle Jiu-Jitsu reserves the right to modify these terms at any time. Continued use of the site after any modification constitutes acceptance of the updated terms.
        </p>
      </div>

      <div style={styles.section}>
        <h2 style={styles.h2}>9. Governing Law</h2>
        <p style={styles.p}>
          These terms are governed by the laws of the Province of Quebec and Canada. Any dispute shall be submitted to the competent courts of the district of Quebec.
        </p>
      </div>

      <div style={styles.section}>
        <h2 style={styles.h2}>10. Contact</h2>
        <p style={styles.p}>
          For any questions regarding these terms:{" "}
          <a href="tel:+14185641047" style={{ color: "var(--color-citadelle-gold)" }}>418-564-1047</a>
          {" "}·{" "}
          964 Rue Mainguy, Québec, QC G1V 3S4
        </p>
      </div>
    </>
  );
}

export default async function ConditionsPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <section className="section">
      <div className="container-citadelle" style={{ maxWidth: "800px" }}>
        <header style={{ marginBottom: "3rem" }}>
          <h1 style={{ fontSize: "2.5rem", marginBottom: "0.5rem" }}>
            {locale === "fr" ? "Conditions d'utilisation" : "Terms of Use"}
          </h1>
          <p style={{ color: "var(--color-citadelle-text-muted)" }}>
            {locale === "fr"
              ? "Régissant l'utilisation du site web et des services de Citadelle Jiu-Jitsu."
              : "Governing the use of the Citadelle Jiu-Jitsu website and services."}
          </p>
        </header>

        {locale === "fr" ? <TermsFR /> : <TermsEN />}
      </div>
    </section>
  );
}
