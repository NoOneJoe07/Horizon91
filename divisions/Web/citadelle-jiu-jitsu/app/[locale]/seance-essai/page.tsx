import { getTranslations, setRequestLocale } from "next-intl/server";
import { TrialForm } from "@/components/TrialForm";
import type { Metadata } from "next";
import type { Locale } from "@/lib/locales";

// ---------------------------------------------------------------------------
// SEO — Métadonnées de la page séance d'essai
// ---------------------------------------------------------------------------
// Page clé pour la conversion : quelqu'un qui cherche "essai jiu-jitsu Québec"
// doit atterrir ici. La description mentionne "gratuit" — mot fort en SEO.
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return {
    title:       locale === "fr" ? "Séance d'essai gratuite"    : "Free Trial Class",
    description: locale === "fr"
      ? "Réserve ta séance d'essai gratuite au dojo Citadelle Jiu-Jitsu à Québec. Aucun engagement. Pour adultes et enfants."
      : "Book your free trial class at Citadelle Jiu-Jitsu dojo in Québec City. No commitment. For adults and kids.",
  };
}

export default async function TrialPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "Trial" });

  return (
    <section className="section">
      <div className="container-citadelle" style={{ maxWidth: "720px" }}>
        <header style={{ textAlign: "center", marginBottom: "2.5rem" }}>
          <h1 style={{ fontSize: "2.5rem", marginBottom: "0.5rem" }}>{t("title")}</h1>
          <p style={{ color: "var(--color-citadelle-text-muted)" }}>{t("subtitle")}</p>
        </header>
        <TrialForm locale={locale} />
      </div>
    </section>
  );
}
