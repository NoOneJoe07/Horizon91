import type { Metadata } from "next";
import Link from "next/link";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  const titles: Record<string, string> = {
    fr: "Politique de Confidentialité — Loi 25 & PIPEDA",
    en: "Privacy Policy — Law 25 & PIPEDA",
    es: "Política de Privacidad — Ley 25 & PIPEDA",
  };
  const descriptions: Record<string, string> = {
    fr: "Politique de confidentialité conforme à la Loi 25 du Québec et au PIPEDA fédéral. Groupe Étoile Boréale Inc., Sainte-Marie-de-Beauce, Québec.",
    en: "Privacy policy compliant with Quebec Law 25 and federal PIPEDA. Boreal Star Group Inc., Sainte-Marie-de-Beauce, Quebec.",
    es: "Política de privacidad conforme a la Ley 25 de Quebec y al PIPEDA federal. Grupo Estrella Boreal Inc., Sainte-Marie-de-Beauce, Quebec.",
  };

  const baseUrl = locale === "en" ? "https://borealstar.ca" : "https://etoileboreale.ca";
  const canonical = `${baseUrl}${locale === "fr" ? "" : `/${locale}`}/confidentialite`;

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

// ─── Contenu FR ───────────────────────────────────────────────────────────────

const FR = () => (
  <>
    <p className="text-h91-stellar/50 text-sm mb-12">
      Dernière mise à jour : 8 mai 2026
    </p>

    <section className="space-y-4">
      <p className="text-h91-stellar/80 leading-relaxed">
        La présente Politique de confidentialité explique comment <strong className="text-h91-stellar">Groupe Étoile Boréale</strong> (ci-après «&nbsp;nous&nbsp;», «&nbsp;notre&nbsp;», «&nbsp;l'entreprise&nbsp;»), dont le siège est à Sainte-Marie, Chaudière-Appalaches, Québec, Canada, collecte, utilise, conserve et protège vos renseignements personnels.
      </p>
      <p className="text-h91-stellar/80 leading-relaxed">
        Elle est conforme à la <strong className="text-h91-accretion">Loi modernisant des dispositions législatives en matière de protection des renseignements personnels (Loi 25)</strong> du Québec ainsi qu'à la <strong className="text-h91-accretion">Loi sur la protection des renseignements personnels et les documents électroniques (LPRPDE)</strong> du gouvernement fédéral canadien.
      </p>
    </section>

    <hr className="border-h91-stellar/10 my-10" />

    {/* 1 */}
    <section className="mb-10">
      <h2 className="text-xl font-bold text-h91-accretion mb-4">1. Responsable de la protection des renseignements personnels</h2>
      <p className="text-h91-stellar/80 leading-relaxed">
        La personne responsable de la protection des renseignements personnels au sein de Groupe Étoile Boréale est :
      </p>
      <div className="mt-4 p-5 border border-h91-accretion/30 rounded-xl bg-h91-gravity/50 text-h91-stellar/80 space-y-1">
        <p><strong className="text-h91-stellar">Jonathan Patoine</strong></p>
        <p>Fondateur &amp; Directeur général</p>
        <p>Groupe Étoile Boréale</p>
        <p>Sainte-Marie, Chaudière-Appalaches, Québec, Canada</p>
        <p>
          Courriel :{" "}
          <a href="mailto:direction@etoileboreale.ca" className="text-h91-accretion hover:underline">
            direction@etoileboreale.ca
          </a>
        </p>
      </div>
    </section>

    {/* 2 */}
    <section className="mb-10">
      <h2 className="text-xl font-bold text-h91-accretion mb-4">2. Renseignements collectés</h2>
      <p className="text-h91-stellar/80 leading-relaxed mb-3">
        Nous collectons uniquement les renseignements que vous nous fournissez volontairement, à savoir :
      </p>
      <ul className="space-y-2 text-h91-stellar/80">
        <li className="flex items-start gap-2"><span className="text-h91-ion mt-1">✓</span><span><strong>Nom complet</strong> — pour personnaliser la communication</span></li>
        <li className="flex items-start gap-2"><span className="text-h91-ion mt-1">✓</span><span><strong>Adresse courriel</strong> — pour répondre à votre demande</span></li>
        <li className="flex items-start gap-2"><span className="text-h91-ion mt-1">✓</span><span><strong>Message</strong> — le contenu de votre demande ou question</span></li>
      </ul>
      <p className="text-h91-stellar/60 text-sm mt-4">
        Nous ne collectons pas de renseignements sensibles (numéro d'assurance sociale, données de santé, informations bancaires, données biométriques) via ce site.
      </p>
    </section>

    {/* 3 */}
    <section className="mb-10">
      <h2 className="text-xl font-bold text-h91-accretion mb-4">3. Finalités de la collecte</h2>
      <p className="text-h91-stellar/80 leading-relaxed mb-3">
        Vos renseignements sont collectés aux seules fins suivantes :
      </p>
      <ul className="space-y-2 text-h91-stellar/80">
        <li className="flex items-start gap-2"><span className="text-h91-ion mt-1">→</span><span>Répondre à votre demande d'information ou de service</span></li>
        <li className="flex items-start gap-2"><span className="text-h91-ion mt-1">→</span><span>Évaluer les besoins liés à un projet potentiel</span></li>
        <li className="flex items-start gap-2"><span className="text-h91-ion mt-1">→</span><span>Assurer le suivi d'un échange professionnel</span></li>
      </ul>
      <p className="text-h91-stellar/60 text-sm mt-4">
        Nous ne vendons, n'échangeons ni ne louons vos renseignements personnels à des tiers. Vos données ne sont pas utilisées à des fins publicitaires, de profilage ou d'analyse comportementale.
      </p>
    </section>

    {/* 4 */}
    <section className="mb-10">
      <h2 className="text-xl font-bold text-h91-accretion mb-4">4. Consentement</h2>
      <p className="text-h91-stellar/80 leading-relaxed">
        En soumettant le formulaire de contact, vous consentez explicitement à la collecte et à l'utilisation de vos renseignements aux fins décrites ci-dessus. Ce consentement est libre, éclairé et donné à un moment précis. Vous pouvez le retirer en tout temps en nous contactant à l'adresse indiquée à la section 1 — la cessation du traitement sera effective dans les meilleurs délais, au maximum 30 jours.
      </p>
    </section>

    {/* 5 */}
    <section className="mb-10">
      <h2 className="text-xl font-bold text-h91-accretion mb-4">5. Conservation des renseignements</h2>
      <p className="text-h91-stellar/80 leading-relaxed">
        Vos renseignements sont conservés uniquement le temps nécessaire à l'accomplissement des fins pour lesquelles ils ont été collectés, soit typiquement la durée d'un projet ou d'une relation commerciale, plus une période de rétention administrative maximale de <strong className="text-h91-stellar">24 mois</strong> après la fin de la relation. À l'expiration de ce délai, ils sont détruits de façon sécuritaire.
      </p>
    </section>

    {/* 6 */}
    <section className="mb-10">
      <h2 className="text-xl font-bold text-h91-accretion mb-4">6. Mesures de sécurité</h2>
      <p className="text-h91-stellar/80 leading-relaxed">
        Nous mettons en œuvre des mesures de sécurité administratives, techniques et physiques adaptées à la nature des renseignements collectés, notamment :
      </p>
      <ul className="space-y-2 text-h91-stellar/80 mt-3">
        <li className="flex items-start gap-2"><span className="text-h91-ion mt-1">✓</span><span>Transmission chiffrée (TLS/SSL) des données formulaire</span></li>
        <li className="flex items-start gap-2"><span className="text-h91-ion mt-1">✓</span><span>Messagerie professionnelle sécurisée (Zoho Mail, protocoles SPF, DKIM, DMARC)</span></li>
        <li className="flex items-start gap-2"><span className="text-h91-ion mt-1">✓</span><span>Accès limité aux renseignements selon le principe du besoin de savoir</span></li>
        <li className="flex items-start gap-2"><span className="text-h91-ion mt-1">✓</span><span>Infrastructure hébergée sur Vercel (serveurs en Amérique du Nord, conformité SOC 2)</span></li>
      </ul>
    </section>

    {/* 7 */}
    <section className="mb-10">
      <h2 className="text-xl font-bold text-h91-accretion mb-4">7. Communication à des tiers</h2>
      <p className="text-h91-stellar/80 leading-relaxed">
        Vos renseignements ne sont pas vendus ni communiqués à des tiers à des fins commerciales. Ils peuvent être partagés uniquement dans les cas suivants :
      </p>
      <ul className="space-y-2 text-h91-stellar/80 mt-3">
        <li className="flex items-start gap-2"><span className="text-h91-ion mt-1">→</span><span><strong>Prestataires techniques</strong> (Vercel, Zoho) — dans la stricte mesure nécessaire au service, liés par leurs propres politiques de confidentialité</span></li>
        <li className="flex items-start gap-2"><span className="text-h91-ion mt-1">→</span><span><strong>Obligation légale</strong> — si requis par la loi ou une autorité compétente</span></li>
      </ul>
    </section>

    {/* 8 */}
    <section className="mb-10">
      <h2 className="text-xl font-bold text-h91-accretion mb-4">8. Témoins (cookies) et technologies de suivi</h2>
      <p className="text-h91-stellar/80 leading-relaxed">
        Ce site n'utilise actuellement <strong className="text-h91-stellar">aucun cookie de suivi, de ciblage publicitaire ou d'analyse comportementale</strong>. Aucun service d'analyse tiers (Google Analytics, Meta Pixel, etc.) n'est actif. Si cela venait à changer, la présente politique sera mise à jour et un mécanisme de consentement sera mis en place avant l'activation de tout outil de suivi.
      </p>
    </section>

    {/* 9 */}
    <section className="mb-10">
      <h2 className="text-xl font-bold text-h91-accretion mb-4">9. Vos droits</h2>
      <p className="text-h91-stellar/80 leading-relaxed mb-3">
        Conformément à la Loi 25 et à la LPRPDE, vous disposez des droits suivants à l'égard de vos renseignements personnels :
      </p>
      <ul className="space-y-3 text-h91-stellar/80">
        <li className="flex items-start gap-2"><span className="text-h91-fusion font-bold mt-0.5 shrink-0">Accès</span><span className="ml-2">— Obtenir confirmation que nous détenons des renseignements vous concernant et en recevoir une copie.</span></li>
        <li className="flex items-start gap-2"><span className="text-h91-fusion font-bold mt-0.5 shrink-0">Rectification</span><span className="ml-2">— Demander la correction de renseignements inexacts ou incomplets.</span></li>
        <li className="flex items-start gap-2"><span className="text-h91-fusion font-bold mt-0.5 shrink-0">Suppression</span><span className="ml-2">— Demander l'effacement de vos renseignements, sous réserve des obligations légales de conservation.</span></li>
        <li className="flex items-start gap-2"><span className="text-h91-fusion font-bold mt-0.5 shrink-0">Portabilité</span><span className="ml-2">— Recevoir vos renseignements dans un format technologique structuré et couramment utilisé.</span></li>
        <li className="flex items-start gap-2"><span className="text-h91-fusion font-bold mt-0.5 shrink-0">Retrait</span><span className="ml-2">— Retirer votre consentement au traitement en tout temps.</span></li>
        <li className="flex items-start gap-2"><span className="text-h91-fusion font-bold mt-0.5 shrink-0">Plainte</span><span className="ml-2">— Déposer une plainte auprès d'une autorité compétente.</span></li>
      </ul>
      <p className="text-h91-stellar/60 text-sm mt-4">
        Pour exercer l'un de ces droits, contactez notre responsable à <a href="mailto:direction@etoileboreale.ca" className="text-h91-accretion hover:underline">direction@etoileboreale.ca</a>. Nous accuserons réception dans les 5 jours ouvrables et traiterons votre demande dans un délai de 30 jours.
      </p>
    </section>

    {/* 10 */}
    <section className="mb-10">
      <h2 className="text-xl font-bold text-h91-accretion mb-4">10. Autorités compétentes — Recours</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-5 border border-h91-stellar/20 rounded-xl bg-h91-gravity/50 space-y-1">
          <p className="font-bold text-h91-stellar text-sm">Niveau provincial — Québec</p>
          <p className="text-h91-stellar/70 text-sm">Commission d'accès à l'information (CAI)</p>
          <a href="https://www.cai.gouv.qc.ca" target="_blank" rel="noopener noreferrer" className="text-h91-accretion text-sm hover:underline">www.cai.gouv.qc.ca</a>
          <p className="text-h91-stellar/50 text-xs">1 888 528-7741</p>
        </div>
        <div className="p-5 border border-h91-stellar/20 rounded-xl bg-h91-gravity/50 space-y-1">
          <p className="font-bold text-h91-stellar text-sm">Niveau fédéral — Canada</p>
          <p className="text-h91-stellar/70 text-sm">Commissariat à la protection de la vie privée du Canada (CPVP)</p>
          <a href="https://www.priv.gc.ca" target="_blank" rel="noopener noreferrer" className="text-h91-accretion text-sm hover:underline">www.priv.gc.ca</a>
          <p className="text-h91-stellar/50 text-xs">1 800 282-1376</p>
        </div>
      </div>
    </section>

    {/* 11 */}
    <section className="mb-10">
      <h2 className="text-xl font-bold text-h91-accretion mb-4">11. Incidents de confidentialité</h2>
      <p className="text-h91-stellar/80 leading-relaxed">
        En cas d'incident de confidentialité présentant un risque de préjudice sérieux, nous nous engageons à en aviser la Commission d'accès à l'information du Québec et le Commissariat à la protection de la vie privée du Canada dans les délais prévus par la loi, ainsi qu'à notifier les personnes concernées sans délai injustifié.
      </p>
    </section>

    {/* 12 */}
    <section className="mb-10">
      <h2 className="text-xl font-bold text-h91-accretion mb-4">12. Modifications à cette politique</h2>
      <p className="text-h91-stellar/80 leading-relaxed">
        Nous nous réservons le droit de modifier cette politique en tout temps. La version en vigueur est toujours accessible à l'adresse <strong className="text-h91-stellar">etoileboreale.ca/fr/confidentialite</strong>. En cas de modification substantielle, un avis sera affiché sur le site et, si possible, envoyé aux personnes concernées.
      </p>
    </section>
  </>
);

// ─── Contenu EN ───────────────────────────────────────────────────────────────

const EN = () => (
  <>
    <p className="text-h91-stellar/50 text-sm mb-12">
      Last updated: May 8, 2026
    </p>

    <section className="space-y-4">
      <p className="text-h91-stellar/80 leading-relaxed">
        This Privacy Policy explains how <strong className="text-h91-stellar">Boreal Star Group</strong> ("we", "our", "the Company"), headquartered in Sainte-Marie, Chaudière-Appalaches, Québec, Canada, collects, uses, retains, and protects your personal information.
      </p>
      <p className="text-h91-stellar/80 leading-relaxed">
        It complies with <strong className="text-h91-accretion">Québec Law 25</strong> (Act to modernize legislative provisions respecting the protection of personal information) and the <strong className="text-h91-accretion">Personal Information Protection and Electronic Documents Act (PIPEDA)</strong> of the federal Government of Canada.
      </p>
    </section>

    <hr className="border-h91-stellar/10 my-10" />

    <section className="mb-10">
      <h2 className="text-xl font-bold text-h91-accretion mb-4">1. Privacy Officer</h2>
      <p className="text-h91-stellar/80 leading-relaxed">
        The person responsible for the protection of personal information at Boreal Star Group is:
      </p>
      <div className="mt-4 p-5 border border-h91-accretion/30 rounded-xl bg-h91-gravity/50 text-h91-stellar/80 space-y-1">
        <p><strong className="text-h91-stellar">Jonathan Patoine</strong></p>
        <p>Founder &amp; Chief Executive Officer</p>
        <p>Boreal Star Group</p>
        <p>Sainte-Marie, Chaudière-Appalaches, Québec, Canada</p>
        <p>Email: <a href="mailto:direction@etoileboreale.ca" className="text-h91-accretion hover:underline">direction@etoileboreale.ca</a></p>
      </div>
    </section>

    <section className="mb-10">
      <h2 className="text-xl font-bold text-h91-accretion mb-4">2. Information We Collect</h2>
      <p className="text-h91-stellar/80 leading-relaxed mb-3">
        We collect only the information you voluntarily provide to us:
      </p>
      <ul className="space-y-2 text-h91-stellar/80">
        <li className="flex items-start gap-2"><span className="text-h91-ion mt-1">✓</span><span><strong>Full name</strong> — to personalize communication</span></li>
        <li className="flex items-start gap-2"><span className="text-h91-ion mt-1">✓</span><span><strong>Email address</strong> — to respond to your inquiry</span></li>
        <li className="flex items-start gap-2"><span className="text-h91-ion mt-1">✓</span><span><strong>Message</strong> — the content of your request or question</span></li>
      </ul>
      <p className="text-h91-stellar/60 text-sm mt-4">
        We do not collect sensitive information (SIN, health data, banking information, biometric data) through this website.
      </p>
    </section>

    <section className="mb-10">
      <h2 className="text-xl font-bold text-h91-accretion mb-4">3. Purpose of Collection</h2>
      <p className="text-h91-stellar/80 leading-relaxed mb-3">
        Your information is collected solely for the following purposes:
      </p>
      <ul className="space-y-2 text-h91-stellar/80">
        <li className="flex items-start gap-2"><span className="text-h91-ion mt-1">→</span><span>Responding to your information or service inquiry</span></li>
        <li className="flex items-start gap-2"><span className="text-h91-ion mt-1">→</span><span>Assessing the needs of a potential project</span></li>
        <li className="flex items-start gap-2"><span className="text-h91-ion mt-1">→</span><span>Following up on a professional exchange</span></li>
      </ul>
      <p className="text-h91-stellar/60 text-sm mt-4">
        We do not sell, trade, or rent your personal information to third parties. Your data is not used for advertising, profiling, or behavioral analysis purposes.
      </p>
    </section>

    <section className="mb-10">
      <h2 className="text-xl font-bold text-h91-accretion mb-4">4. Consent</h2>
      <p className="text-h91-stellar/80 leading-relaxed">
        By submitting the contact form, you explicitly consent to the collection and use of your information for the purposes described above. This consent is freely given, informed, and provided at a specific point in time. You may withdraw it at any time by contacting us at the address in section 1 — processing will cease within 30 days.
      </p>
    </section>

    <section className="mb-10">
      <h2 className="text-xl font-bold text-h91-accretion mb-4">5. Retention</h2>
      <p className="text-h91-stellar/80 leading-relaxed">
        Your information is retained only as long as necessary for the purposes for which it was collected — typically the duration of a project or business relationship — plus a maximum administrative retention period of <strong className="text-h91-stellar">24 months</strong> after the end of the relationship. At the end of this period, it is securely destroyed.
      </p>
    </section>

    <section className="mb-10">
      <h2 className="text-xl font-bold text-h91-accretion mb-4">6. Security Measures</h2>
      <ul className="space-y-2 text-h91-stellar/80">
        <li className="flex items-start gap-2"><span className="text-h91-ion mt-1">✓</span><span>Encrypted transmission (TLS/SSL) of form data</span></li>
        <li className="flex items-start gap-2"><span className="text-h91-ion mt-1">✓</span><span>Secure professional email (Zoho Mail, SPF/DKIM/DMARC protocols)</span></li>
        <li className="flex items-start gap-2"><span className="text-h91-ion mt-1">✓</span><span>Access limited on a need-to-know basis</span></li>
        <li className="flex items-start gap-2"><span className="text-h91-ion mt-1">✓</span><span>Infrastructure hosted on Vercel (North American servers, SOC 2 compliant)</span></li>
      </ul>
    </section>

    <section className="mb-10">
      <h2 className="text-xl font-bold text-h91-accretion mb-4">7. Third-Party Disclosure</h2>
      <p className="text-h91-stellar/80 leading-relaxed mb-3">
        Your information is not sold or shared with third parties for commercial purposes. It may be shared only in the following cases:
      </p>
      <ul className="space-y-2 text-h91-stellar/80">
        <li className="flex items-start gap-2"><span className="text-h91-ion mt-1">→</span><span><strong>Technical service providers</strong> (Vercel, Zoho) — strictly as required for the service, bound by their own privacy policies</span></li>
        <li className="flex items-start gap-2"><span className="text-h91-ion mt-1">→</span><span><strong>Legal obligation</strong> — if required by law or a competent authority</span></li>
      </ul>
    </section>

    <section className="mb-10">
      <h2 className="text-xl font-bold text-h91-accretion mb-4">8. Cookies &amp; Tracking Technologies</h2>
      <p className="text-h91-stellar/80 leading-relaxed">
        This website currently uses <strong className="text-h91-stellar">no tracking, advertising, or behavioral analytics cookies</strong>. No third-party analytics services (Google Analytics, Meta Pixel, etc.) are active. If this changes, this policy will be updated and a consent mechanism will be implemented before any tracking tool is activated.
      </p>
    </section>

    <section className="mb-10">
      <h2 className="text-xl font-bold text-h91-accretion mb-4">9. Your Rights</h2>
      <p className="text-h91-stellar/80 leading-relaxed mb-3">
        Under Law 25 and PIPEDA, you have the following rights regarding your personal information:
      </p>
      <ul className="space-y-3 text-h91-stellar/80">
        <li className="flex items-start gap-2"><span className="text-h91-fusion font-bold mt-0.5 shrink-0">Access</span><span className="ml-2">— Obtain confirmation that we hold information about you and receive a copy.</span></li>
        <li className="flex items-start gap-2"><span className="text-h91-fusion font-bold mt-0.5 shrink-0">Rectification</span><span className="ml-2">— Request correction of inaccurate or incomplete information.</span></li>
        <li className="flex items-start gap-2"><span className="text-h91-fusion font-bold mt-0.5 shrink-0">Deletion</span><span className="ml-2">— Request erasure of your information, subject to legal retention obligations.</span></li>
        <li className="flex items-start gap-2"><span className="text-h91-fusion font-bold mt-0.5 shrink-0">Portability</span><span className="ml-2">— Receive your information in a structured, commonly used technological format.</span></li>
        <li className="flex items-start gap-2"><span className="text-h91-fusion font-bold mt-0.5 shrink-0">Withdrawal</span><span className="ml-2">— Withdraw your consent to processing at any time.</span></li>
        <li className="flex items-start gap-2"><span className="text-h91-fusion font-bold mt-0.5 shrink-0">Complaint</span><span className="ml-2">— File a complaint with a competent authority.</span></li>
      </ul>
      <p className="text-h91-stellar/60 text-sm mt-4">
        To exercise any of these rights, contact our privacy officer at <a href="mailto:direction@etoileboreale.ca" className="text-h91-accretion hover:underline">direction@etoileboreale.ca</a>. We will acknowledge receipt within 5 business days and process your request within 30 days.
      </p>
    </section>

    <section className="mb-10">
      <h2 className="text-xl font-bold text-h91-accretion mb-4">10. Regulatory Authorities</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-5 border border-h91-stellar/20 rounded-xl bg-h91-gravity/50 space-y-1">
          <p className="font-bold text-h91-stellar text-sm">Provincial — Québec</p>
          <p className="text-h91-stellar/70 text-sm">Commission d'accès à l'information (CAI)</p>
          <a href="https://www.cai.gouv.qc.ca" target="_blank" rel="noopener noreferrer" className="text-h91-accretion text-sm hover:underline">www.cai.gouv.qc.ca</a>
          <p className="text-h91-stellar/50 text-xs">1 888 528-7741</p>
        </div>
        <div className="p-5 border border-h91-stellar/20 rounded-xl bg-h91-gravity/50 space-y-1">
          <p className="font-bold text-h91-stellar text-sm">Federal — Canada</p>
          <p className="text-h91-stellar/70 text-sm">Office of the Privacy Commissioner of Canada (OPC)</p>
          <a href="https://www.priv.gc.ca" target="_blank" rel="noopener noreferrer" className="text-h91-accretion text-sm hover:underline">www.priv.gc.ca</a>
          <p className="text-h91-stellar/50 text-xs">1 800 282-1376</p>
        </div>
      </div>
    </section>

    <section className="mb-10">
      <h2 className="text-xl font-bold text-h91-accretion mb-4">11. Privacy Incidents</h2>
      <p className="text-h91-stellar/80 leading-relaxed">
        In the event of a privacy incident posing a risk of serious harm, we are committed to notifying the Commission d'accès à l'information du Québec and the Office of the Privacy Commissioner of Canada within the legally prescribed timeframes, as well as notifying affected individuals without undue delay.
      </p>
    </section>

    <section className="mb-10">
      <h2 className="text-xl font-bold text-h91-accretion mb-4">12. Changes to This Policy</h2>
      <p className="text-h91-stellar/80 leading-relaxed">
        We reserve the right to modify this policy at any time. The current version is always available at <strong className="text-h91-stellar">borealstar.ca/en/confidentialite</strong>. In the event of a material change, notice will be posted on the website and, where possible, sent to affected individuals.
      </p>
    </section>
  </>
);

// ─── Contenu ES ───────────────────────────────────────────────────────────────

const ES = () => (
  <>
    <p className="text-h91-stellar/50 text-sm mb-12">
      Última actualización: 8 de mayo de 2026
    </p>

    <section className="space-y-4">
      <p className="text-h91-stellar/80 leading-relaxed">
        Esta Política de privacidad explica cómo <strong className="text-h91-stellar">Grupo Estrella Boreal</strong> («nosotros», «nuestro», «la Empresa»), con sede en Sainte-Marie, Chaudière-Appalaches, Quebec, Canadá, recopila, utiliza, conserva y protege su información personal.
      </p>
      <p className="text-h91-stellar/80 leading-relaxed">
        Cumple con la <strong className="text-h91-accretion">Ley 25 de Quebec</strong> (Ley de modernización de disposiciones legislativas en materia de protección de información personal) y con la <strong className="text-h91-accretion">Ley de Protección de Información Personal y Documentos Electrónicos (PIPEDA)</strong> del Gobierno Federal de Canadá.
      </p>
    </section>

    <hr className="border-h91-stellar/10 my-10" />

    <section className="mb-10">
      <h2 className="text-xl font-bold text-h91-accretion mb-4">1. Responsable de protección de datos</h2>
      <div className="mt-4 p-5 border border-h91-accretion/30 rounded-xl bg-h91-gravity/50 text-h91-stellar/80 space-y-1">
        <p><strong className="text-h91-stellar">Jonathan Patoine</strong></p>
        <p>Fundador y Director General</p>
        <p>Grupo Estrella Boreal</p>
        <p>Sainte-Marie, Chaudière-Appalaches, Quebec, Canadá</p>
        <p>Correo: <a href="mailto:direction@etoileboreale.ca" className="text-h91-accretion hover:underline">direction@etoileboreale.ca</a></p>
      </div>
    </section>

    <section className="mb-10">
      <h2 className="text-xl font-bold text-h91-accretion mb-4">2. Información que recopilamos</h2>
      <ul className="space-y-2 text-h91-stellar/80">
        <li className="flex items-start gap-2"><span className="text-h91-ion mt-1">✓</span><span><strong>Nombre completo</strong> — para personalizar la comunicación</span></li>
        <li className="flex items-start gap-2"><span className="text-h91-ion mt-1">✓</span><span><strong>Correo electrónico</strong> — para responder a su solicitud</span></li>
        <li className="flex items-start gap-2"><span className="text-h91-ion mt-1">✓</span><span><strong>Mensaje</strong> — el contenido de su consulta o pregunta</span></li>
      </ul>
    </section>

    <section className="mb-10">
      <h2 className="text-xl font-bold text-h91-accretion mb-4">3. Finalidad de la recopilación</h2>
      <ul className="space-y-2 text-h91-stellar/80">
        <li className="flex items-start gap-2"><span className="text-h91-ion mt-1">→</span><span>Responder a su solicitud de información o servicio</span></li>
        <li className="flex items-start gap-2"><span className="text-h91-ion mt-1">→</span><span>Evaluar las necesidades de un proyecto potencial</span></li>
        <li className="flex items-start gap-2"><span className="text-h91-ion mt-1">→</span><span>Dar seguimiento a un intercambio profesional</span></li>
      </ul>
      <p className="text-h91-stellar/60 text-sm mt-4">
        No vendemos, intercambiamos ni alquilamos su información personal a terceros.
      </p>
    </section>

    <section className="mb-10">
      <h2 className="text-xl font-bold text-h91-accretion mb-4">4. Consentimiento</h2>
      <p className="text-h91-stellar/80 leading-relaxed">
        Al enviar el formulario de contacto, usted consiente explícitamente la recopilación y el uso de su información para los fines descritos anteriormente. Puede retirar este consentimiento en cualquier momento contactándonos en la dirección indicada en la sección 1 — el cese del tratamiento se efectuará en un plazo máximo de 30 días.
      </p>
    </section>

    <section className="mb-10">
      <h2 className="text-xl font-bold text-h91-accretion mb-4">5. Conservación</h2>
      <p className="text-h91-stellar/80 leading-relaxed">
        Su información se conserva únicamente el tiempo necesario para los fines para los que fue recopilada, más un período de retención administrativa máximo de <strong className="text-h91-stellar">24 meses</strong> tras el fin de la relación.
      </p>
    </section>

    <section className="mb-10">
      <h2 className="text-xl font-bold text-h91-accretion mb-4">6. Sus derechos</h2>
      <ul className="space-y-3 text-h91-stellar/80">
        <li className="flex items-start gap-2"><span className="text-h91-fusion font-bold mt-0.5 shrink-0">Acceso</span><span className="ml-2">— Obtener confirmación de que conservamos información sobre usted y recibir una copia.</span></li>
        <li className="flex items-start gap-2"><span className="text-h91-fusion font-bold mt-0.5 shrink-0">Rectificación</span><span className="ml-2">— Solicitar la corrección de información inexacta o incompleta.</span></li>
        <li className="flex items-start gap-2"><span className="text-h91-fusion font-bold mt-0.5 shrink-0">Supresión</span><span className="ml-2">— Solicitar la eliminación de su información.</span></li>
        <li className="flex items-start gap-2"><span className="text-h91-fusion font-bold mt-0.5 shrink-0">Portabilidad</span><span className="ml-2">— Recibir su información en un formato tecnológico estructurado.</span></li>
        <li className="flex items-start gap-2"><span className="text-h91-fusion font-bold mt-0.5 shrink-0">Retirada</span><span className="ml-2">— Retirar su consentimiento en cualquier momento.</span></li>
        <li className="flex items-start gap-2"><span className="text-h91-fusion font-bold mt-0.5 shrink-0">Queja</span><span className="ml-2">— Presentar una queja ante una autoridad competente.</span></li>
      </ul>
      <p className="text-h91-stellar/60 text-sm mt-4">
        Para ejercer cualquiera de estos derechos, contáctenos en <a href="mailto:direction@etoileboreale.ca" className="text-h91-accretion hover:underline">direction@etoileboreale.ca</a>.
      </p>
    </section>

    <section className="mb-10">
      <h2 className="text-xl font-bold text-h91-accretion mb-4">7. Autoridades competentes</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-5 border border-h91-stellar/20 rounded-xl bg-h91-gravity/50 space-y-1">
          <p className="font-bold text-h91-stellar text-sm">Provincial — Quebec</p>
          <p className="text-h91-stellar/70 text-sm">Commission d'accès à l'information (CAI)</p>
          <a href="https://www.cai.gouv.qc.ca" target="_blank" rel="noopener noreferrer" className="text-h91-accretion text-sm hover:underline">www.cai.gouv.qc.ca</a>
        </div>
        <div className="p-5 border border-h91-stellar/20 rounded-xl bg-h91-gravity/50 space-y-1">
          <p className="font-bold text-h91-stellar text-sm">Federal — Canadá</p>
          <p className="text-h91-stellar/70 text-sm">Comisario de Privacidad de Canadá (OPC)</p>
          <a href="https://www.priv.gc.ca" target="_blank" rel="noopener noreferrer" className="text-h91-accretion text-sm hover:underline">www.priv.gc.ca</a>
        </div>
      </div>
    </section>
  </>
);

// ─── Page principale ───────────────────────────────────────────────────────────

export default async function ConfidentialitePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  const titles: Record<string, string> = {
    fr: "Politique de confidentialité",
    en: "Privacy Policy",
    es: "Política de privacidad",
  };

  return (
    <main className="max-w-4xl mx-auto px-6 py-20">
      {/* En-tête */}
      <h1 className="text-4xl md:text-5xl font-bold text-h91-stellar text-center mb-4">
        {titles[locale] ?? titles.fr}
      </h1>
      <p className="text-center text-h91-stellar/40 text-sm mb-16">
        Groupe Étoile Boréale — Sainte-Marie, Québec, Canada
      </p>

      {/* Contenu selon locale */}
      {locale === "en" ? <EN /> : locale === "es" ? <ES /> : <FR />}

      {/* Retour */}
      <div className="mt-16 text-center">
        <Link
          href="/"
          className="text-h91-accretion hover:text-h91-fusion transition text-sm"
        >
          ← {locale === "en" ? "Back to home" : locale === "es" ? "Volver al inicio" : "Retour à l'accueil"}
        </Link>
      </div>
    </main>
  );
}
