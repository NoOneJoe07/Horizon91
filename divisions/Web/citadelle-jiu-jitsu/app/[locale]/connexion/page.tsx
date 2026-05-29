import Link from "next/link";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { AuthForm } from "@/components/AuthForm";
import type { Locale } from "@/lib/locales";

export default async function LoginPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: Locale }>;
  searchParams: Promise<{ bye?: string; redirect?: string }>;
}) {
  const locale = ((await params).locale) as Locale;
  const { bye } = await searchParams;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "Auth.login" });

  const loggedOut = bye === "1";

  return (
    <section className="section">
      <div className="container-citadelle" style={{ maxWidth: "420px" }}>

        {/* Bannière de déconnexion */}
        {loggedOut && (
          <div style={{
            marginBottom: "1.5rem",
            padding: "0.85rem 1.1rem",
            borderRadius: "var(--radius-sm)",
            background: "rgba(34,197,94,0.12)",
            border: "1px solid #22c55e",
            color: "#22c55e",
            fontSize: "0.9rem",
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
          }}>
            <span>✓</span>
            <span>
              {locale === "fr"
                ? "Session fermée avec succès."
                : "You have been signed out successfully."}
            </span>
          </div>
        )}

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
