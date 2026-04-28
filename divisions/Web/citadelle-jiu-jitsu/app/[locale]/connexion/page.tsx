import Link from "next/link";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { AuthForm } from "@/components/AuthForm";
import type { Locale } from "@/lib/locales";

export default async function LoginPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "Auth.login" });

  return (
    <section className="section">
      <div className="container-citadelle" style={{ maxWidth: "420px" }}>
        <h1 style={{ fontSize: "2rem", marginBottom: "1.5rem", textAlign: "center" }}>
          {t("title")}
        </h1>
        <AuthForm mode="login" locale={locale} />
        <p
          style={{
            textAlign: "center",
            marginTop: "1.5rem",
            color: "var(--color-citadelle-text-muted)",
            fontSize: "0.875rem",
          }}
        >
          {t("noAccount")}{" "}
          <Link href={`/${locale}/inscription`}>{t("register")}</Link>
        </p>
      </div>
    </section>
  );
}
