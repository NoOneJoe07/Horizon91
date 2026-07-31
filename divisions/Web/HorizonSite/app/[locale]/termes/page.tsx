import type { Metadata } from "next";
import { Link } from "@/i18n/navigation";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  const titles: Record<string, string> = {
    fr: "Termes de service — Groupe Étoile Boréale",
    en: "Terms of Service — Boreal Star Group",
    es: "Términos de servicio — Grupo Estrella Boreal",
  };
  const descriptions: Record<string, string> = {
    fr: "Conditions générales de service de Groupe Étoile Boréale Inc. — mandats, tarification, propriété intellectuelle, garanties et droit applicable.",
    en: "Terms of service for Boreal Star Group Inc. — engagements, pricing, intellectual property, warranties and governing law.",
    es: "Términos de servicio de Grupo Estrella Boreal Inc. — mandatos, tarifas, propiedad intelectual, garantías y ley aplicable.",
  };

  const baseUrl = locale === "en" ? "https://borealstar.ca" : "https://etoileboreale.ca";
  const canonical = `${baseUrl}${locale === "fr" ? "" : `/${locale}`}/termes`;

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

// ─── Contenu FR ─────────────────────────────────────────────────────────────

const FR = () => (
  <>
    <p className="text-h91-stellar/50 text-sm mb-12">Dernière mise à jour : 31 juillet 2026</p>

    <section className="space-y-4 mb-10">
      <p className="text-h91-stellar/80 leading-relaxed">
        Les présentes conditions générales (les «&nbsp;Conditions&nbsp;») encadrent tout mandat conclu entre <strong className="text-h91-stellar">Groupe Étoile Boréale Inc.</strong> (ci-après «&nbsp;nous&nbsp;», l&apos;«&nbsp;Agence&nbsp;»), Sainte-Marie, Chaudière-Appalaches, Québec, et le client qui retient nos services (le «&nbsp;Client&nbsp;»). En confirmant une soumission ou un mandat, le Client accepte les présentes Conditions.
      </p>
    </section>

    <hr className="border-h91-stellar/10 my-10" />

    <section className="mb-10">
      <h2 className="text-xl font-bold text-h91-accretion mb-4">1. Portée des services</h2>
      <p className="text-h91-stellar/80 leading-relaxed">
        Nos services sont livrés par l&apos;entremise de trois divisions — Arpenteur (graphisme &amp; identité de marque), Draveur (développement web) et Carillon (cybersécurité). L&apos;étendue exacte d&apos;un mandat, les livrables, l&apos;échéancier et le prix sont précisés dans une soumission ou une entente écrite préalable à tout travail. Tout ajout hors de cette portée est facturé séparément, au taux horaire applicable ou par avenant.
      </p>
    </section>

    <section className="mb-10">
      <h2 className="text-xl font-bold text-h91-accretion mb-4">2. Soumissions et acceptation</h2>
      <p className="text-h91-stellar/80 leading-relaxed">
        Toute soumission est valide 30 jours à compter de sa date d&apos;émission, sauf indication contraire. Le mandat débute à la réception d&apos;une confirmation écrite (courriel ou signature) et, le cas échéant, du dépôt initial requis.
      </p>
    </section>

    <section className="mb-10">
      <h2 className="text-xl font-bold text-h91-accretion mb-4">3. Tarification et paiement</h2>
      <ul className="space-y-2 text-h91-stellar/80">
        <li className="flex items-start gap-2"><span className="text-h91-ion mt-1">→</span><span>Les forfaits de livraison (sites vitrines, e-commerce, etc.) sont facturés selon l&apos;entente : un dépôt à la confirmation, le solde à la livraison, ou un échéancier convenu par écrit.</span></li>
        <li className="flex items-start gap-2"><span className="text-h91-ion mt-1">→</span><span>Le travail hors forfait (support, nouvelles fonctionnalités) est facturé au taux horaire en vigueur ou puisé à même une banque d&apos;heures prépayée.</span></li>
        <li className="flex items-start gap-2"><span className="text-h91-ion mt-1">→</span><span>La maintenance mensuelle, lorsqu&apos;incluse au mandat, est facturée d&apos;avance et reconduite automatiquement jusqu&apos;à annulation écrite avec un préavis de 30 jours.</span></li>
        <li className="flex items-start gap-2"><span className="text-h91-ion mt-1">→</span><span>Tout retard de paiement de plus de 15 jours peut entraîner la suspension des travaux ou des services (hébergement, maintenance) sans préavis additionnel.</span></li>
      </ul>
    </section>

    <section className="mb-10">
      <h2 className="text-xl font-bold text-h91-accretion mb-4">4. Révisions et approbations</h2>
      <p className="text-h91-stellar/80 leading-relaxed">
        Chaque mandat inclut un nombre de rondes de révision précisé à la soumission. Les révisions additionnelles, ou les changements de direction créative après approbation d&apos;une étape, sont facturés au taux horaire applicable. Le silence du Client pendant plus de 30 jours suivant une livraison vaut approbation tacite.
      </p>
    </section>

    <section className="mb-10">
      <h2 className="text-xl font-bold text-h91-accretion mb-4">5. Propriété intellectuelle</h2>
      <p className="text-h91-stellar/80 leading-relaxed mb-3">
        Les livrables finaux (code source du site, fichiers graphiques finaux, logo) deviennent la propriété du Client une fois le paiement intégral reçu. Jusque-là, l&apos;Agence conserve tous les droits sur les travaux en cours.
      </p>
      <p className="text-h91-stellar/80 leading-relaxed">
        L&apos;Agence conserve le droit d&apos;afficher les réalisations livrées dans son portfolio, ses réseaux sociaux et ses supports promotionnels, sauf entente de confidentialité contraire signée par les deux parties. Les outils, gabarits, bibliothèques de code et méthodologies internes développés par l&apos;Agence demeurent sa propriété, même lorsqu&apos;utilisés dans un mandat.
      </p>
    </section>

    <section className="mb-10">
      <h2 className="text-xl font-bold text-h91-accretion mb-4">6. Services tiers</h2>
      <p className="text-h91-stellar/80 leading-relaxed">
        L&apos;hébergement, l&apos;enregistrement de domaine, les licences de polices ou de logiciels tiers et les frais de plateforme (ex. Stripe) ne sont pas inclus dans nos tarifs, sauf mention explicite, et demeurent la responsabilité du Client ou sont refacturés au coût réel.
      </p>
    </section>

    <section className="mb-10">
      <h2 className="text-xl font-bold text-h91-accretion mb-4">7. Garanties et limitation de responsabilité</h2>
      <p className="text-h91-stellar/80 leading-relaxed">
        Nous mettons en œuvre les meilleures pratiques de l&apos;industrie pour chaque mandat, incluant en cybersécurité, mais aucun système ou site web ne peut être garanti à l&apos;abri de toute faille ou interruption. La responsabilité de l&apos;Agence, dans tous les cas, est limitée au montant total payé par le Client pour le mandat concerné au cours des 12 derniers mois. L&apos;Agence n&apos;est pas responsable des dommages indirects, pertes de revenus ou de données découlant de l&apos;utilisation des livrables.
      </p>
    </section>

    <section className="mb-10">
      <h2 className="text-xl font-bold text-h91-accretion mb-4">8. Confidentialité</h2>
      <p className="text-h91-stellar/80 leading-relaxed">
        Chaque partie s&apos;engage à protéger les renseignements confidentiels de l&apos;autre partie obtenus dans le cadre du mandat et à ne pas les divulguer à des tiers, sauf obligation légale.
      </p>
    </section>

    <section className="mb-10">
      <h2 className="text-xl font-bold text-h91-accretion mb-4">9. Résiliation</h2>
      <p className="text-h91-stellar/80 leading-relaxed">
        L&apos;une ou l&apos;autre des parties peut résilier un mandat en cours moyennant un préavis écrit de 15 jours. Le Client demeure redevable des honoraires pour le travail déjà effectué jusqu&apos;à la date de résiliation.
      </p>
    </section>

    <section className="mb-10">
      <h2 className="text-xl font-bold text-h91-accretion mb-4">10. Droit applicable</h2>
      <p className="text-h91-stellar/80 leading-relaxed">
        Les présentes Conditions sont régies par les lois de la province de Québec et les lois fédérales du Canada applicables. Tout litige relève des tribunaux compétents du district judiciaire de Beauce, Québec.
      </p>
    </section>

    <section className="mb-10">
      <h2 className="text-xl font-bold text-h91-accretion mb-4">11. Modifications</h2>
      <p className="text-h91-stellar/80 leading-relaxed">
        Nous pouvons modifier les présentes Conditions en tout temps ; la version en vigueur est toujours disponible à <strong className="text-h91-stellar">etoileboreale.ca/fr/termes</strong>. Les modifications ne s&apos;appliquent pas rétroactivement aux mandats déjà confirmés.
      </p>
    </section>

    <section className="mb-10">
      <h2 className="text-xl font-bold text-h91-accretion mb-4">12. Contact</h2>
      <p className="text-h91-stellar/80 leading-relaxed">
        Questions relatives aux présentes Conditions :{" "}
        <a href="mailto:contact@etoileboreale.ca" className="text-h91-accretion hover:underline">contact@etoileboreale.ca</a>
      </p>
    </section>
  </>
);

// ─── Contenu EN ─────────────────────────────────────────────────────────────

const EN = () => (
  <>
    <p className="text-h91-stellar/50 text-sm mb-12">Last updated: July 31, 2026</p>

    <section className="space-y-4 mb-10">
      <p className="text-h91-stellar/80 leading-relaxed">
        These terms of service (the &quot;Terms&quot;) govern any engagement between <strong className="text-h91-stellar">Boreal Star Group Inc.</strong> (&quot;we&quot;, the &quot;Agency&quot;), Sainte-Marie, Chaudière-Appalaches, Québec, and the client retaining our services (the &quot;Client&quot;). By confirming a quote or engagement, the Client accepts these Terms.
      </p>
    </section>

    <hr className="border-h91-stellar/10 my-10" />

    <section className="mb-10">
      <h2 className="text-xl font-bold text-h91-accretion mb-4">1. Scope of Services</h2>
      <p className="text-h91-stellar/80 leading-relaxed">
        Our services are delivered through three divisions — Arpenteur (branding &amp; design), Draveur (web development), and Carillon (cybersecurity). The exact scope, deliverables, timeline, and price of an engagement are set out in a quote or written agreement prior to any work. Anything outside this scope is billed separately, at the applicable hourly rate or via an addendum.
      </p>
    </section>

    <section className="mb-10">
      <h2 className="text-xl font-bold text-h91-accretion mb-4">2. Quotes and Acceptance</h2>
      <p className="text-h91-stellar/80 leading-relaxed">
        Quotes are valid for 30 days from their issue date unless stated otherwise. An engagement begins upon written confirmation (email or signature) and, where applicable, receipt of the required initial deposit.
      </p>
    </section>

    <section className="mb-10">
      <h2 className="text-xl font-bold text-h91-accretion mb-4">3. Pricing and Payment</h2>
      <ul className="space-y-2 text-h91-stellar/80">
        <li className="flex items-start gap-2"><span className="text-h91-ion mt-1">→</span><span>Delivery packages (showcase sites, e-commerce, etc.) are billed per agreement: a deposit at confirmation, the balance on delivery, or a schedule agreed in writing.</span></li>
        <li className="flex items-start gap-2"><span className="text-h91-ion mt-1">→</span><span>Work outside a package (support, new features) is billed at the current hourly rate or drawn from a prepaid hour bank.</span></li>
        <li className="flex items-start gap-2"><span className="text-h91-ion mt-1">→</span><span>Monthly maintenance, when included, is billed in advance and renews automatically until cancelled in writing with 30 days&apos; notice.</span></li>
        <li className="flex items-start gap-2"><span className="text-h91-ion mt-1">→</span><span>Payment delayed more than 15 days may result in suspension of work or services (hosting, maintenance) without further notice.</span></li>
      </ul>
    </section>

    <section className="mb-10">
      <h2 className="text-xl font-bold text-h91-accretion mb-4">4. Revisions and Approvals</h2>
      <p className="text-h91-stellar/80 leading-relaxed">
        Each engagement includes a number of revision rounds set out in the quote. Additional revisions, or creative direction changes after a stage has been approved, are billed at the applicable hourly rate. Client silence for more than 30 days following a delivery is deemed tacit approval.
      </p>
    </section>

    <section className="mb-10">
      <h2 className="text-xl font-bold text-h91-accretion mb-4">5. Intellectual Property</h2>
      <p className="text-h91-stellar/80 leading-relaxed mb-3">
        Final deliverables (site source code, final graphic files, logo) become the Client&apos;s property once payment is received in full. Until then, the Agency retains all rights over work in progress.
      </p>
      <p className="text-h91-stellar/80 leading-relaxed">
        The Agency retains the right to display delivered work in its portfolio, social media, and promotional materials, unless a signed confidentiality agreement states otherwise. Tools, templates, code libraries, and internal methodologies developed by the Agency remain its property, even when used within an engagement.
      </p>
    </section>

    <section className="mb-10">
      <h2 className="text-xl font-bold text-h91-accretion mb-4">6. Third-Party Services</h2>
      <p className="text-h91-stellar/80 leading-relaxed">
        Hosting, domain registration, third-party font or software licenses, and platform fees (e.g., Stripe) are not included in our rates unless explicitly stated, and remain the Client&apos;s responsibility or are billed back at actual cost.
      </p>
    </section>

    <section className="mb-10">
      <h2 className="text-xl font-bold text-h91-accretion mb-4">7. Warranties and Limitation of Liability</h2>
      <p className="text-h91-stellar/80 leading-relaxed">
        We follow industry best practices for every engagement, including in cybersecurity, but no system or website can be guaranteed free of flaws or downtime. The Agency&apos;s liability, in all cases, is limited to the total amount paid by the Client for the relevant engagement over the preceding 12 months. The Agency is not liable for indirect damages, lost revenue, or data loss arising from the use of deliverables.
      </p>
    </section>

    <section className="mb-10">
      <h2 className="text-xl font-bold text-h91-accretion mb-4">8. Confidentiality</h2>
      <p className="text-h91-stellar/80 leading-relaxed">
        Each party agrees to protect the confidential information of the other party obtained in the course of the engagement and not to disclose it to third parties, except as legally required.
      </p>
    </section>

    <section className="mb-10">
      <h2 className="text-xl font-bold text-h91-accretion mb-4">9. Termination</h2>
      <p className="text-h91-stellar/80 leading-relaxed">
        Either party may terminate an ongoing engagement with 15 days&apos; written notice. The Client remains liable for fees for work already performed up to the termination date.
      </p>
    </section>

    <section className="mb-10">
      <h2 className="text-xl font-bold text-h91-accretion mb-4">10. Governing Law</h2>
      <p className="text-h91-stellar/80 leading-relaxed">
        These Terms are governed by the laws of the Province of Québec and applicable federal laws of Canada. Any dispute falls under the competent courts of the judicial district of Beauce, Québec.
      </p>
    </section>

    <section className="mb-10">
      <h2 className="text-xl font-bold text-h91-accretion mb-4">11. Changes</h2>
      <p className="text-h91-stellar/80 leading-relaxed">
        We may amend these Terms at any time; the current version is always available at <strong className="text-h91-stellar">borealstar.ca/en/termes</strong>. Changes do not apply retroactively to engagements already confirmed.
      </p>
    </section>

    <section className="mb-10">
      <h2 className="text-xl font-bold text-h91-accretion mb-4">12. Contact</h2>
      <p className="text-h91-stellar/80 leading-relaxed">
        Questions about these Terms:{" "}
        <a href="mailto:contact@etoileboreale.ca" className="text-h91-accretion hover:underline">contact@etoileboreale.ca</a>
      </p>
    </section>
  </>
);

// ─── Contenu ES ─────────────────────────────────────────────────────────────

const ES = () => (
  <>
    <p className="text-h91-stellar/50 text-sm mb-12">Última actualización: 31 de julio de 2026</p>

    <section className="space-y-4 mb-10">
      <p className="text-h91-stellar/80 leading-relaxed">
        Estos términos de servicio (los &quot;Términos&quot;) rigen cualquier mandato entre <strong className="text-h91-stellar">Grupo Estrella Boreal Inc.</strong> (&quot;nosotros&quot;, la &quot;Agencia&quot;), Sainte-Marie, Chaudière-Appalaches, Quebec, y el cliente que contrata nuestros servicios (el &quot;Cliente&quot;). Al confirmar una cotización o mandato, el Cliente acepta estos Términos.
      </p>
    </section>

    <hr className="border-h91-stellar/10 my-10" />

    <section className="mb-10">
      <h2 className="text-xl font-bold text-h91-accretion mb-4">1. Alcance de los servicios</h2>
      <p className="text-h91-stellar/80 leading-relaxed">
        Nuestros servicios se entregan a través de tres divisiones — Arpenteur (marca y diseño), Draveur (desarrollo web) y Carillon (ciberseguridad). El alcance exacto de un mandato, los entregables, el cronograma y el precio se detallan en una cotización o acuerdo escrito previo a cualquier trabajo. Todo lo fuera de este alcance se factura por separado, a la tarifa horaria aplicable o mediante un anexo.
      </p>
    </section>

    <section className="mb-10">
      <h2 className="text-xl font-bold text-h91-accretion mb-4">2. Cotizaciones y aceptación</h2>
      <p className="text-h91-stellar/80 leading-relaxed">
        Las cotizaciones son válidas por 30 días desde su emisión, salvo indicación contraria. Un mandato comienza con la confirmación por escrito (correo electrónico o firma) y, cuando corresponda, la recepción del depósito inicial requerido.
      </p>
    </section>

    <section className="mb-10">
      <h2 className="text-xl font-bold text-h91-accretion mb-4">3. Tarifas y pago</h2>
      <ul className="space-y-2 text-h91-stellar/80">
        <li className="flex items-start gap-2"><span className="text-h91-ion mt-1">→</span><span>Los paquetes de entrega (sitios vitrina, e-commerce, etc.) se facturan según lo acordado: un depósito a la confirmación, el saldo a la entrega, o un calendario acordado por escrito.</span></li>
        <li className="flex items-start gap-2"><span className="text-h91-ion mt-1">→</span><span>El trabajo fuera de paquete (soporte, nuevas funcionalidades) se factura a la tarifa horaria vigente o se descuenta de una bolsa de horas prepagada.</span></li>
        <li className="flex items-start gap-2"><span className="text-h91-ion mt-1">→</span><span>El mantenimiento mensual, cuando está incluido, se factura por adelantado y se renueva automáticamente hasta su cancelación por escrito con 30 días de aviso.</span></li>
        <li className="flex items-start gap-2"><span className="text-h91-ion mt-1">→</span><span>Un atraso de pago superior a 15 días puede resultar en la suspensión del trabajo o de los servicios (hospedaje, mantenimiento) sin aviso adicional.</span></li>
      </ul>
    </section>

    <section className="mb-10">
      <h2 className="text-xl font-bold text-h91-accretion mb-4">4. Revisiones y aprobaciones</h2>
      <p className="text-h91-stellar/80 leading-relaxed">
        Cada mandato incluye un número de rondas de revisión especificado en la cotización. Las revisiones adicionales, o los cambios de dirección creativa tras la aprobación de una etapa, se facturan a la tarifa horaria aplicable. El silencio del Cliente por más de 30 días tras una entrega se considera aprobación tácita.
      </p>
    </section>

    <section className="mb-10">
      <h2 className="text-xl font-bold text-h91-accretion mb-4">5. Propiedad intelectual</h2>
      <p className="text-h91-stellar/80 leading-relaxed mb-3">
        Los entregables finales (código fuente del sitio, archivos gráficos finales, logo) pasan a ser propiedad del Cliente una vez recibido el pago íntegro. Hasta entonces, la Agencia conserva todos los derechos sobre el trabajo en curso.
      </p>
      <p className="text-h91-stellar/80 leading-relaxed">
        La Agencia conserva el derecho de mostrar los trabajos entregados en su portafolio, redes sociales y materiales promocionales, salvo un acuerdo de confidencialidad firmado que indique lo contrario. Las herramientas, plantillas, bibliotecas de código y metodologías internas desarrolladas por la Agencia siguen siendo de su propiedad, incluso cuando se usan dentro de un mandato.
      </p>
    </section>

    <section className="mb-10">
      <h2 className="text-xl font-bold text-h91-accretion mb-4">6. Servicios de terceros</h2>
      <p className="text-h91-stellar/80 leading-relaxed">
        El hospedaje, el registro de dominio, las licencias de fuentes o software de terceros y las tarifas de plataforma (ej. Stripe) no están incluidos en nuestras tarifas salvo mención explícita, y siguen siendo responsabilidad del Cliente o se facturan al costo real.
      </p>
    </section>

    <section className="mb-10">
      <h2 className="text-xl font-bold text-h91-accretion mb-4">7. Garantías y limitación de responsabilidad</h2>
      <p className="text-h91-stellar/80 leading-relaxed">
        Aplicamos las mejores prácticas de la industria en cada mandato, incluso en ciberseguridad, pero ningún sistema o sitio web puede garantizarse libre de fallas o interrupciones. La responsabilidad de la Agencia, en todos los casos, se limita al monto total pagado por el Cliente por el mandato correspondiente durante los últimos 12 meses. La Agencia no es responsable de daños indirectos, pérdida de ingresos o de datos derivados del uso de los entregables.
      </p>
    </section>

    <section className="mb-10">
      <h2 className="text-xl font-bold text-h91-accretion mb-4">8. Confidencialidad</h2>
      <p className="text-h91-stellar/80 leading-relaxed">
        Cada parte se compromete a proteger la información confidencial de la otra parte obtenida durante el mandato y a no divulgarla a terceros, salvo obligación legal.
      </p>
    </section>

    <section className="mb-10">
      <h2 className="text-xl font-bold text-h91-accretion mb-4">9. Terminación</h2>
      <p className="text-h91-stellar/80 leading-relaxed">
        Cualquiera de las partes puede terminar un mandato en curso con un aviso escrito de 15 días. El Cliente sigue siendo responsable de los honorarios por el trabajo ya realizado hasta la fecha de terminación.
      </p>
    </section>

    <section className="mb-10">
      <h2 className="text-xl font-bold text-h91-accretion mb-4">10. Ley aplicable</h2>
      <p className="text-h91-stellar/80 leading-relaxed">
        Estos Términos se rigen por las leyes de la provincia de Quebec y las leyes federales aplicables de Canadá. Cualquier disputa corresponde a los tribunales competentes del distrito judicial de Beauce, Quebec.
      </p>
    </section>

    <section className="mb-10">
      <h2 className="text-xl font-bold text-h91-accretion mb-4">11. Modificaciones</h2>
      <p className="text-h91-stellar/80 leading-relaxed">
        Podemos modificar estos Términos en cualquier momento; la versión vigente siempre está disponible en <strong className="text-h91-stellar">etoileboreale.ca/es/termes</strong>. Las modificaciones no se aplican retroactivamente a los mandatos ya confirmados.
      </p>
    </section>

    <section className="mb-10">
      <h2 className="text-xl font-bold text-h91-accretion mb-4">12. Contacto</h2>
      <p className="text-h91-stellar/80 leading-relaxed">
        Preguntas sobre estos Términos:{" "}
        <a href="mailto:contact@etoileboreale.ca" className="text-h91-accretion hover:underline">contact@etoileboreale.ca</a>
      </p>
    </section>
  </>
);

// ─── Page principale ─────────────────────────────────────────────────────────

export default async function TermesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  const titles: Record<string, string> = {
    fr: "Termes de service",
    en: "Terms of Service",
    es: "Términos de servicio",
  };

  return (
    <main className="max-w-4xl mx-auto px-6 py-20">
      <h1 className="text-4xl md:text-5xl font-bold text-h91-stellar text-center mb-4">
        {titles[locale] ?? titles.fr}
      </h1>
      <p className="text-center text-h91-stellar/40 text-sm mb-16">
        Groupe Étoile Boréale — Sainte-Marie, Québec, Canada
      </p>

      {locale === "en" ? <EN /> : locale === "es" ? <ES /> : <FR />}

      <div className="mt-16 text-center">
        <Link href="/" className="text-h91-accretion hover:text-h91-fusion transition text-sm">
          ← {locale === "en" ? "Back to home" : locale === "es" ? "Volver al inicio" : "Retour à l'accueil"}
        </Link>
      </div>
    </main>
  );
}
