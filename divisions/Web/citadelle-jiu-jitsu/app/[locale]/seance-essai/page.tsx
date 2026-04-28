import { getTranslations, setRequestLocale } from "next-intl/server";
import { TrialForm } from "@/components/TrialForm";
import type { Locale } from "@/lib/locales";

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
