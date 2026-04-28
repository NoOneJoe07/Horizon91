import Link from "next/link";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { AuthForm } from "@/components/AuthForm";
import type { Locale } from "@/lib/locales";

export default async function RegisterPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "Auth.register" });

  return (
    <section className="section">
      <div className="container-citadelle" style={{ maxWidth: "480px" }}>
        <h1 style={{ fontSize: "2rem", marginBottom: "1.5rem", textAlign: "center" }}>
          {t("title")}
        </h1>
        <AuthForm mode="register" locale={locale} />
        <p
          style={{
            textAlign: "center",
            marginTop: "1.5rem",
            color: "var(--color-citadelle-text-muted)",
            fontSize: "0.875rem",
          }}
        >
          {t("hasAccount")} <Link href={`/${locale}/connexion`}>{t("login")}</Link>
        </p>
      </div>
    </section>
  );
}
