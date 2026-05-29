// =============================================================================
// app/[locale]/confidentialite/page.tsx — Politique de confidentialité
// -----------------------------------------------------------------------------
// RÔLE :
//   Page légale obligatoire en vertu de la Loi 25 du Québec
//   (Loi modernisant des dispositions législatives en matière de protection
//   des renseignements personnels — en vigueur depuis septembre 2023).
//
// POURQUOI C'EST OBLIGATOIRE :
//   Citadelle Jiu-Jitsu collecte des renseignements personnels :
//   - Formulaire d'inscription (nom, courriel, mot de passe)
//   - Formulaire de séance d'essai (nom, courriel, téléphone, âge)
//   - Formulaire de contact (nom, courriel, message)
//   - Données de paiement via Stripe (traitées par Stripe, pas stockées ici)
//   Tout site québécois qui collecte ces données DOIT informer les utilisateurs.
//
// LOI DE RÉFÉRENCE :
//   Loi 25 Québec — https://www.cai.gouv.qc.ca/loi-25/
//   Amende max : 25 000 000 $ ou 4% du chiffre d'affaires mondial.
//
// MISE À JOUR REQUISE :
//   - Remplacer [PRÉNOM NOM DU FONDATEUR] par le vrai nom quand disponible
//   - Remplacer [courriel@citadellejiujitsu.ca] par le vrai courriel
//   - Mettre à jour si de nouveaux services tiers sont intégrés (ex: Resend)
//   - Revoir annuellement (bonne pratique légale)
//
// TYPE : Server Component statique (pas de BD, pas d'auth requise)
// ROUTE : /fr/confidentialite  et  /en/confidentialite
//
// AUTEUR    : Horizon 91 — Jonathan Patoine + Claude (Anthropic)
// CRÉÉ      : 2026-05-04
// =============================================================================

import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import type { Locale } from "@/lib/locales";

// ---------------------------------------------------------------------------
// SEO — Métadonnées
// ---------------------------------------------------------------------------
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return {
    title:       locale === "fr" ? "Politique de confidentialité" : "Privacy Policy",
    description: locale === "fr"
      ? "Politique de confidentialité de Citadelle Jiu-Jitsu — conformité Loi 25 Québec."
      : "Privacy policy of Citadelle Jiu-Jitsu — Québec Law 25 compliant.",
    // Les pages légales ne doivent pas être indexées par les moteurs de recherche
    // robots: "noindex" évite qu'elles apparaissent dans les résultats Google
    // et polluent le profil SEO du site.
    robots: "noindex, follow",
  };
}

// ---------------------------------------------------------------------------
// Styles partagés — centralisés pour cohérence et maintenabilité
// ---------------------------------------------------------------------------
// Regrouper les styles répétitifs dans un objet évite la duplication inline
// et facilite les modifications futures (changer une couleur = 1 endroit).
const styles = {
  section: {
    marginBottom: "2rem",
  } as React.CSSProperties,

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

// ---------------------------------------------------------------------------
// Contenu — version française
// ---------------------------------------------------------------------------
function PrivacyFR() {
  return (
    <>
      <p style={{ ...styles.p, fontStyle: "italic" }}>
        Dernière mise à jour : 10 mai 2026
      </p>

      <p style={styles.p}>
        La présente politique est conforme à la{" "}
        <strong style={{ color: "var(--color-citadelle-text)" }}>
          Loi modernisant des dispositions législatives en matière de protection des renseignements personnels (Loi 25)
        </strong>{" "}
        du Québec ainsi qu'à la{" "}
        <strong style={{ color: "var(--color-citadelle-text)" }}>
          Loi sur la protection des renseignements personnels et les documents électroniques (LPRPDE)
        </strong>{" "}
        du gouvernement fédéral canadien.
      </p>

      {/* ── 1. Responsable ──────────────────────────────────────────────── */}
      <div style={styles.section}>
        <h2 style={styles.h2}>1. Responsable de la protection des renseignements personnels</h2>
        <p style={styles.p}>
          Conformément à la Loi 25 du Québec, le responsable de la protection des
          renseignements personnels pour Citadelle Jiu-Jitsu est :
        </p>
        <p style={styles.p}>
          <span style={styles.highlight}>[Prénom Nom du fondateur]</span><br />
          Citadelle Jiu-Jitsu<br />
          964 Rue Mainguy, Québec, QC G1V 3S4<br />
          Téléphone : 418-564-1047<br />
          Courriel : <a href="mailto:citadellejj@gmail.com" style={{ color: "var(--color-citadelle-gold)" }}>
            citadellejj@gmail.com
          </a>
        </p>
      </div>

      {/* ── 2. Données collectées ───────────────────────────────────────── */}
      <div style={styles.section}>
        <h2 style={styles.h2}>2. Renseignements personnels collectés</h2>
        <p style={styles.p}>
          Nous collectons uniquement les renseignements nécessaires aux services offerts :
        </p>
        <ul style={styles.ul}>
          <li><span style={styles.highlight}>Création de compte :</span> prénom, nom, adresse courriel, mot de passe (chiffré), numéro de téléphone (optionnel)</li>
          <li><span style={styles.highlight}>Séance d'essai :</span> prénom, nom, courriel, téléphone, âge, niveau d'expérience en arts martiaux, date souhaitée, message optionnel</li>
          <li><span style={styles.highlight}>Formulaire de contact :</span> nom, courriel, sujet, message</li>
          <li><span style={styles.highlight}>Abonnements :</span> données de paiement traitées directement par Stripe Inc. — Citadelle Jiu-Jitsu ne stocke jamais vos informations de carte de crédit</li>
          <li><span style={styles.highlight}>Boutique :</span> données de commande et historique d'achat</li>
        </ul>
      </div>

      {/* ── 3. Finalités ─────────────────────────────────────────────────── */}
      <div style={styles.section}>
        <h2 style={styles.h2}>3. Finalités de la collecte</h2>
        <p style={styles.p}>Vos renseignements sont utilisés exclusivement pour :</p>
        <ul style={styles.ul}>
          <li>Gérer votre compte membre et votre abonnement</li>
          <li>Confirmer et coordonner votre séance d'essai</li>
          <li>Traiter vos commandes de la boutique</li>
          <li>Répondre à vos messages de contact</li>
          <li>Vous envoyer des confirmations de paiement et de commande</li>
          <li>Améliorer nos services et la sécurité du site</li>
        </ul>
        <p style={styles.p}>
          Nous n'utilisons pas vos renseignements à des fins de marketing sans votre consentement explicite.
        </p>
      </div>

      {/* ── 4. Tiers ─────────────────────────────────────────────────────── */}
      <div style={styles.section}>
        <h2 style={styles.h2}>4. Partage avec des tiers</h2>
        <p style={styles.p}>
          Vos renseignements ne sont jamais vendus. Ils peuvent être transmis aux tiers suivants
          dans le cadre strict des services offerts :
        </p>
        <ul style={styles.ul}>
          <li>
            <span style={styles.highlight}>Stripe Inc.</span> — traitement des paiements en ligne.
            Stripe est certifié PCI DSS niveau 1 (norme de sécurité maximale pour les paiements).
            Politique de confidentialité : <a href="https://stripe.com/fr-ca/privacy" target="_blank" rel="noopener noreferrer" style={{ color: "var(--color-citadelle-gold)" }}>stripe.com/fr-ca/privacy</a>
          </li>
          <li>
            <span style={styles.highlight}>Horizon 91</span> — développeur et hébergeur du site web.
            Accès limité à des fins de maintenance technique uniquement.
          </li>
        </ul>
      </div>

      {/* ── 5. Conservation ──────────────────────────────────────────────── */}
      <div style={styles.section}>
        <h2 style={styles.h2}>5. Conservation des renseignements</h2>
        <ul style={styles.ul}>
          <li><span style={styles.highlight}>Comptes membres actifs :</span> conservés tant que le compte est actif</li>
          <li><span style={styles.highlight}>Comptes inactifs :</span> supprimés après 3 ans d'inactivité</li>
          <li><span style={styles.highlight}>Demandes de séance d'essai :</span> conservées 2 ans pour suivi</li>
          <li><span style={styles.highlight}>Messages de contact :</span> conservés 1 an</li>
          <li><span style={styles.highlight}>Données de commande :</span> conservées 7 ans (obligation fiscale canadienne)</li>
        </ul>
      </div>

      {/* ── 6. Droits ────────────────────────────────────────────────────── */}
      <div style={styles.section}>
        <h2 style={styles.h2}>6. Vos droits (Loi 25 Québec)</h2>
        <p style={styles.p}>Vous avez le droit de :</p>
        <ul style={styles.ul}>
          <li><span style={styles.highlight}>Accès :</span> consulter les renseignements que nous détenons sur vous</li>
          <li><span style={styles.highlight}>Rectification :</span> corriger des renseignements inexacts</li>
          <li><span style={styles.highlight}>Effacement :</span> demander la suppression de vos données (sous réserve des obligations légales de conservation)</li>
          <li><span style={styles.highlight}>Portabilité :</span> recevoir vos données dans un format structuré et lisible</li>
          <li><span style={styles.highlight}>Retrait du consentement :</span> retirer votre consentement à tout moment</li>
        </ul>
        <p style={styles.p}>
          Pour exercer ces droits, contactez-nous à{" "}
          <a href="mailto:citadellejj@gmail.com" style={{ color: "var(--color-citadelle-gold)" }}>
            citadellejj@gmail.com
          </a>.
          Nous répondrons dans un délai de 30 jours conformément à la loi.
        </p>
      </div>

      {/* ── 7. Sécurité ──────────────────────────────────────────────────── */}
      <div style={styles.section}>
        <h2 style={styles.h2}>7. Sécurité</h2>
        <p style={styles.p}>
          Nous appliquons des mesures techniques et organisationnelles pour protéger vos données :
        </p>
        <ul style={styles.ul}>
          <li>Chiffrement HTTPS sur l'ensemble du site (TLS)</li>
          <li>Mots de passe hachés (bcrypt) — jamais stockés en clair</li>
          <li>Authentification par jetons sécurisés (cookies HttpOnly, SameSite)</li>
          <li>Accès administrateur protégé par vérification de rôle en base de données</li>
          <li>Paiements traités par Stripe (certifié PCI DSS niveau 1)</li>
        </ul>
      </div>

      {/* ── 8. Cookies ───────────────────────────────────────────────────── */}
      <div style={styles.section}>
        <h2 style={styles.h2}>8. Témoins de connexion (cookies)</h2>
        <p style={styles.p}>
          Ce site utilise uniquement des cookies fonctionnels essentiels :
        </p>
        <ul style={styles.ul}>
          <li><span style={styles.highlight}>Session d'authentification :</span> cookie HttpOnly pour maintenir votre connexion (supprimé à la déconnexion)</li>
          <li><span style={styles.highlight}>Préférence de langue :</span> mémoriser votre choix FR/EN</li>
        </ul>
        <p style={styles.p}>
          Aucun cookie publicitaire ou de traçage tiers n'est utilisé sur ce site.
        </p>
      </div>

      {/* ── 9. Modifications ─────────────────────────────────────────────── */}
      <div style={styles.section}>
        <h2 style={styles.h2}>9. Modifications de cette politique</h2>
        <p style={styles.p}>
          Nous pouvons mettre à jour cette politique à tout moment. La date de
          dernière modification est indiquée en haut de cette page. En cas de
          changement important, nous vous en informerons par courriel si vous
          possédez un compte.
        </p>
      </div>

      {/* ── 10. Plainte ──────────────────────────────────────────────────── */}
      <div style={styles.section}>
        <h2 style={styles.h2}>10. Droit de porter plainte</h2>
        <p style={styles.p}>
          Si vous estimez que vos droits ne sont pas respectés, vous pouvez porter plainte auprès des autorités compétentes selon votre juridiction :
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1rem", marginTop: "0.75rem" }}>
          <div style={{ padding: "1rem", border: "1px solid var(--color-citadelle-border)", borderRadius: "0.5rem", backgroundColor: "var(--color-citadelle-surface-2)" }}>
            <p style={{ color: "var(--color-citadelle-text)", fontWeight: 600, fontSize: "0.875rem", marginBottom: "0.4rem" }}>
              Niveau provincial — Québec
            </p>
            <p style={{ color: "var(--color-citadelle-text-muted)", fontSize: "0.875rem", marginBottom: "0.25rem" }}>
              Commission d'accès à l'information (CAI)
            </p>
            <a href="https://www.cai.gouv.qc.ca/" target="_blank" rel="noopener noreferrer" style={{ color: "var(--color-citadelle-gold)", fontSize: "0.875rem" }}>
              www.cai.gouv.qc.ca
            </a>
            <p style={{ color: "var(--color-citadelle-text-muted)", fontSize: "0.8rem", marginTop: "0.25rem" }}>1 888 528-7741</p>
          </div>
          <div style={{ padding: "1rem", border: "1px solid var(--color-citadelle-border)", borderRadius: "0.5rem", backgroundColor: "var(--color-citadelle-surface-2)" }}>
            <p style={{ color: "var(--color-citadelle-text)", fontWeight: 600, fontSize: "0.875rem", marginBottom: "0.4rem" }}>
              Niveau fédéral — Canada
            </p>
            <p style={{ color: "var(--color-citadelle-text-muted)", fontSize: "0.875rem", marginBottom: "0.25rem" }}>
              Commissariat à la protection de la vie privée du Canada (CPVP)
            </p>
            <a href="https://www.priv.gc.ca" target="_blank" rel="noopener noreferrer" style={{ color: "var(--color-citadelle-gold)", fontSize: "0.875rem" }}>
              www.priv.gc.ca
            </a>
            <p style={{ color: "var(--color-citadelle-text-muted)", fontSize: "0.8rem", marginTop: "0.25rem" }}>1 800 282-1376</p>
          </div>
        </div>
      </div>
    </>
  );
}

// ---------------------------------------------------------------------------
// Contenu — version anglaise
// ---------------------------------------------------------------------------
function PrivacyEN() {
  return (
    <>
      <p style={{ ...styles.p, fontStyle: "italic" }}>
        Last updated: May 10, 2026
      </p>

      <p style={styles.p}>
        This policy complies with{" "}
        <strong style={{ color: "var(--color-citadelle-text)" }}>
          Quebec Law 25
        </strong>{" "}
        (Act to modernize legislative provisions respecting the protection of personal information) and the{" "}
        <strong style={{ color: "var(--color-citadelle-text)" }}>
          Personal Information Protection and Electronic Documents Act (PIPEDA)
        </strong>{" "}
        of the Government of Canada.
      </p>

      <div style={styles.section}>
        <h2 style={styles.h2}>1. Privacy Officer</h2>
        <p style={styles.p}>
          In accordance with Quebec Law 25, the privacy officer for Citadelle Jiu-Jitsu is:
        </p>
        <p style={styles.p}>
          <span style={styles.highlight}>[Founder's Full Name]</span><br />
          Citadelle Jiu-Jitsu<br />
          964 Rue Mainguy, Québec, QC G1V 3S4<br />
          Phone: 418-564-1047<br />
          Email: <a href="mailto:citadellejj@gmail.com" style={{ color: "var(--color-citadelle-gold)" }}>
            citadellejj@gmail.com
          </a>
        </p>
      </div>

      <div style={styles.section}>
        <h2 style={styles.h2}>2. Personal Information We Collect</h2>
        <p style={styles.p}>We collect only the information necessary to provide our services:</p>
        <ul style={styles.ul}>
          <li><span style={styles.highlight}>Account creation:</span> first name, last name, email address, encrypted password, phone number (optional)</li>
          <li><span style={styles.highlight}>Trial session:</span> name, email, phone, age, martial arts experience, preferred date, optional message</li>
          <li><span style={styles.highlight}>Contact form:</span> name, email, subject, message</li>
          <li><span style={styles.highlight}>Memberships:</span> payment data processed directly by Stripe Inc. — we never store your credit card information</li>
          <li><span style={styles.highlight}>Shop:</span> order data and purchase history</li>
        </ul>
      </div>

      <div style={styles.section}>
        <h2 style={styles.h2}>3. Purposes of Collection</h2>
        <p style={styles.p}>Your information is used exclusively to:</p>
        <ul style={styles.ul}>
          <li>Manage your member account and subscription</li>
          <li>Confirm and coordinate your trial session</li>
          <li>Process your shop orders</li>
          <li>Respond to your contact messages</li>
          <li>Send payment and order confirmations</li>
          <li>Improve our services and site security</li>
        </ul>
        <p style={styles.p}>We do not use your information for marketing without your explicit consent.</p>
      </div>

      <div style={styles.section}>
        <h2 style={styles.h2}>4. Third-Party Sharing</h2>
        <p style={styles.p}>Your information is never sold. It may be shared with:</p>
        <ul style={styles.ul}>
          <li>
            <span style={styles.highlight}>Stripe Inc.</span> — online payment processing (PCI DSS Level 1 certified).
            Privacy policy: <a href="https://stripe.com/privacy" target="_blank" rel="noopener noreferrer" style={{ color: "var(--color-citadelle-gold)" }}>stripe.com/privacy</a>
          </li>
          <li>
            <span style={styles.highlight}>Horizon 91</span> — website developer and host. Access limited to technical maintenance only.
          </li>
        </ul>
      </div>

      <div style={styles.section}>
        <h2 style={styles.h2}>5. Data Retention</h2>
        <ul style={styles.ul}>
          <li><span style={styles.highlight}>Active member accounts:</span> retained while the account is active</li>
          <li><span style={styles.highlight}>Inactive accounts:</span> deleted after 3 years of inactivity</li>
          <li><span style={styles.highlight}>Trial session requests:</span> retained 2 years for follow-up</li>
          <li><span style={styles.highlight}>Contact messages:</span> retained 1 year</li>
          <li><span style={styles.highlight}>Order data:</span> retained 7 years (Canadian tax obligation)</li>
        </ul>
      </div>

      <div style={styles.section}>
        <h2 style={styles.h2}>6. Your Rights (Quebec Law 25)</h2>
        <p style={styles.p}>You have the right to:</p>
        <ul style={styles.ul}>
          <li><span style={styles.highlight}>Access:</span> review the information we hold about you</li>
          <li><span style={styles.highlight}>Rectification:</span> correct inaccurate information</li>
          <li><span style={styles.highlight}>Erasure:</span> request deletion of your data (subject to legal retention obligations)</li>
          <li><span style={styles.highlight}>Portability:</span> receive your data in a structured, readable format</li>
          <li><span style={styles.highlight}>Withdrawal of consent:</span> withdraw your consent at any time</li>
        </ul>
        <p style={styles.p}>
          To exercise these rights, contact us at{" "}
          <a href="mailto:citadellejj@gmail.com" style={{ color: "var(--color-citadelle-gold)" }}>
            citadellejj@gmail.com
          </a>.
          We will respond within 30 days as required by law.
        </p>
      </div>

      <div style={styles.section}>
        <h2 style={styles.h2}>7. Security</h2>
        <ul style={styles.ul}>
          <li>HTTPS encryption across the entire site (TLS)</li>
          <li>Passwords hashed with bcrypt — never stored in plain text</li>
          <li>Secure token authentication (HttpOnly, SameSite cookies)</li>
          <li>Admin access protected by database role verification</li>
          <li>Payments processed by Stripe (PCI DSS Level 1 certified)</li>
        </ul>
      </div>

      <div style={styles.section}>
        <h2 style={styles.h2}>8. Cookies</h2>
        <p style={styles.p}>This site uses only essential functional cookies:</p>
        <ul style={styles.ul}>
          <li><span style={styles.highlight}>Authentication session:</span> HttpOnly cookie to maintain your login (deleted on logout)</li>
          <li><span style={styles.highlight}>Language preference:</span> remember your FR/EN choice</li>
        </ul>
        <p style={styles.p}>No advertising or third-party tracking cookies are used on this site.</p>
      </div>

      <div style={styles.section}>
        <h2 style={styles.h2}>9. Policy Updates</h2>
        <p style={styles.p}>
          We may update this policy at any time. The last modified date appears at the top of this page.
          For significant changes, we will notify you by email if you have an account.
        </p>
      </div>

      <div style={styles.section}>
        <h2 style={styles.h2}>10. Right to File a Complaint</h2>
        <p style={styles.p}>
          If you believe your rights have not been respected, you may file a complaint with the competent authority for your jurisdiction:
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1rem", marginTop: "0.75rem" }}>
          <div style={{ padding: "1rem", border: "1px solid var(--color-citadelle-border)", borderRadius: "0.5rem", backgroundColor: "var(--color-citadelle-surface-2)" }}>
            <p style={{ color: "var(--color-citadelle-text)", fontWeight: 600, fontSize: "0.875rem", marginBottom: "0.4rem" }}>
              Provincial — Québec
            </p>
            <p style={{ color: "var(--color-citadelle-text-muted)", fontSize: "0.875rem", marginBottom: "0.25rem" }}>
              Commission d'accès à l'information (CAI)
            </p>
            <a href="https://www.cai.gouv.qc.ca/en/" target="_blank" rel="noopener noreferrer" style={{ color: "var(--color-citadelle-gold)", fontSize: "0.875rem" }}>
              www.cai.gouv.qc.ca
            </a>
            <p style={{ color: "var(--color-citadelle-text-muted)", fontSize: "0.8rem", marginTop: "0.25rem" }}>1 888 528-7741</p>
          </div>
          <div style={{ padding: "1rem", border: "1px solid var(--color-citadelle-border)", borderRadius: "0.5rem", backgroundColor: "var(--color-citadelle-surface-2)" }}>
            <p style={{ color: "var(--color-citadelle-text)", fontWeight: 600, fontSize: "0.875rem", marginBottom: "0.4rem" }}>
              Federal — Canada
            </p>
            <p style={{ color: "var(--color-citadelle-text-muted)", fontSize: "0.875rem", marginBottom: "0.25rem" }}>
              Office of the Privacy Commissioner of Canada (OPC)
            </p>
            <a href="https://www.priv.gc.ca" target="_blank" rel="noopener noreferrer" style={{ color: "var(--color-citadelle-gold)", fontSize: "0.875rem" }}>
              www.priv.gc.ca
            </a>
            <p style={{ color: "var(--color-citadelle-text-muted)", fontSize: "0.8rem", marginTop: "0.25rem" }}>1 800 282-1376</p>
          </div>
        </div>
      </div>
    </>
  );
}

// ---------------------------------------------------------------------------
// Composant de page principal
// ---------------------------------------------------------------------------
export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <section className="section">
      <div className="container-citadelle" style={{ maxWidth: "800px" }}>

        {/* En-tête */}
        <header style={{ marginBottom: "3rem" }}>
          <h1 style={{ fontSize: "2.5rem", marginBottom: "0.5rem" }}>
            {locale === "fr" ? "Politique de confidentialité" : "Privacy Policy"}
          </h1>
          <p style={{ color: "var(--color-citadelle-text-muted)" }}>
            {locale === "fr"
              ? "Conformément à la Loi 25 du Québec sur la protection des renseignements personnels."
              : "In compliance with Quebec Law 25 on the protection of personal information."}
          </p>
        </header>

        {/* Contenu selon la locale */}
        {locale === "fr" ? <PrivacyFR /> : <PrivacyEN />}

      </div>
    </section>
  );
}
