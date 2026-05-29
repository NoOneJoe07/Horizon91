// =============================================================================
// Page Décharge de responsabilité — Citadelle Jiu-Jitsu
// -----------------------------------------------------------------------------
// Accessible aux membres connectés uniquement.
// Affiche le texte légal complet, les champs à remplir, et le PDF téléchargeable.
// Un membre ne peut signer qu'une seule fois.
// =============================================================================

import { redirect } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/db";
import type { Locale } from "@/lib/locales";
import WaiverForm from "@/components/WaiverForm";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: locale === "fr" ? "Décharge de responsabilité" : "Liability Waiver",
    robots: { index: false }, // page privée — ne pas indexer
  };
}

export default async function WaiverPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  // ── Auth — membres connectés seulement ──────────────────────────────────
  const session = await getSession();
  if (!session?.userId) {
    redirect(`/${locale}/connexion?redirect=/${locale}/decharge`);
  }

  const t = await getTranslations({ locale, namespace: "Waiver" });

  // ── Vérifier si la décharge est déjà signée ─────────────────────────────
  const existing = await prisma.waiver.findFirst({
    where: { userId: session.userId },
    select: { signedAt: true, participantName: true },
  });

  return (
    <section className="section">
      <div className="container-citadelle" style={{ maxWidth: "760px" }}>

        {/* En-tête */}
        <header style={{ textAlign: "center", marginBottom: "2.5rem" }}>
          <h1 style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>{t("title")}</h1>
          <p style={{ color: "var(--color-citadelle-text-muted)" }}>{t("subtitle")}</p>
          <a
            href="/docs/decharge-responsabilite.pdf"
            download
            style={{
              display:        "inline-flex",
              alignItems:     "center",
              gap:            "0.4rem",
              marginTop:      "1rem",
              color:          "var(--color-citadelle-gold)",
              fontSize:       "0.875rem",
              textDecoration: "underline",
            }}
          >
            📄 {t("downloadPdf")}
          </a>
        </header>

        {/* Décharge déjà signée */}
        {existing ? (
          <div
            className="card"
            style={{
              textAlign:    "center",
              padding:      "2.5rem",
              borderColor:  "var(--color-citadelle-success, #22c55e)",
              border:       "1px solid #22c55e",
              borderRadius: "var(--radius-md)",
            }}
          >
            <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>✅</div>
            <p style={{ color: "#22c55e", fontSize: "1.1rem", fontWeight: 600, marginBottom: "0.5rem" }}>
              {t("alreadySigned")}
            </p>
            <p style={{ color: "var(--color-citadelle-text-muted)", fontSize: "0.875rem" }}>
              {t("signedOn")} {existing.signedAt.toLocaleDateString(locale === "fr" ? "fr-CA" : "en-CA", {
                year: "numeric", month: "long", day: "numeric",
              })} — {existing.participantName}
            </p>
          </div>
        ) : (
          <>
            {/* Texte légal complet */}
            <LegalText locale={locale} t={t} />

            {/* Formulaire */}
            <WaiverForm locale={locale} />
          </>
        )}
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Composant texte légal (server, pas besoin de client)
// ---------------------------------------------------------------------------
function LegalText({
  locale,
  t,
}: {
  locale: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  t: any;
}) {
  const sectionStyle: React.CSSProperties = {
    marginBottom: "1.5rem",
  };
  const h2Style: React.CSSProperties = {
    fontSize:      "1rem",
    fontWeight:    700,
    color:         "var(--color-citadelle-gold)",
    marginBottom:  "0.5rem",
    textTransform: "uppercase",
    letterSpacing: "0.05em",
  };
  const pStyle: React.CSSProperties = {
    fontSize:   "0.9rem",
    lineHeight: 1.6,
    color:      "var(--color-citadelle-text-muted)",
  };

  return (
    <div
      className="card"
      style={{ padding: "2rem", marginBottom: "2rem", fontSize: "0.9rem" }}
    >
      {/* Logo + titre */}
      <div style={{ textAlign: "center", marginBottom: "1.5rem" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/logo-citadelle.svg" alt="Citadelle Jiu-Jitsu" style={{ height: "60px", marginBottom: "0.5rem" }} />
        <p style={{ fontWeight: 700, fontSize: "1rem", textTransform: "uppercase", letterSpacing: "0.1em" }}>
          Citadelle Jiu-Jitsu
        </p>
      </div>

      <div style={sectionStyle}>
        <h2 style={h2Style}>{t("sections.risks")}</h2>
        <p style={pStyle}>{t("sections.risksText")}</p>
      </div>

      <div style={sectionStyle}>
        <h2 style={h2Style}>{t("sections.health")}</h2>
        <p style={pStyle}>{t("sections.healthText")}</p>
      </div>

      <div style={sectionStyle}>
        <h2 style={h2Style}>{t("sections.liability")}</h2>
        <p style={pStyle}>{t("sections.liabilityText")}</p>
        <p style={{ ...pStyle, fontWeight: 700, color: "var(--color-citadelle-text)", marginTop: "0.5rem" }}>
          {t("sections.liabilityNote")}
        </p>
      </div>

      <div style={sectionStyle}>
        <h2 style={h2Style}>{t("sections.commitment")}</h2>
        <p style={pStyle}>{t("sections.commitmentText")}</p>
      </div>

      <div style={{ ...sectionStyle, marginBottom: 0 }}>
        <h2 style={h2Style}>{t("sections.minor")}</h2>
        <p style={pStyle}>{t("sections.minorText")}</p>
      </div>
    </div>
  );
}
