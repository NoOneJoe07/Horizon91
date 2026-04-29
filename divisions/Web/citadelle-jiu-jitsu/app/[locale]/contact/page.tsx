import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "@/lib/locales";

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "Contact" });

  return (
    <section className="section">
      <div className="container-citadelle" style={{ maxWidth: "780px" }}>
        <header style={{ textAlign: "center", marginBottom: "3rem" }}>
          <h1 style={{ fontSize: "2.5rem", marginBottom: "0.5rem" }}>{t("title")}</h1>
          <p style={{ color: "var(--color-citadelle-text-muted)" }}>{t("subtitle")}</p>
        </header>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "1.25rem",
            marginBottom: "2.5rem",
          }}
        >
          <div className="card">
            <h3
              style={{
                fontSize: "0.875rem",
                color: "var(--color-citadelle-text-muted)",
                textTransform: "uppercase",
                letterSpacing: "0.05em",
              }}
            >
              {t("address")}
            </h3>
            <p style={{ marginTop: "0.5rem" }}>
              964 Rue Mainguy
              <br />
              Québec, QC G1V 3S4
            </p>
            <a
              href="https://maps.google.com/?q=964+Rue+Mainguy,+Quebec,+QC+G1V+3S4"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-block",
                marginTop: "0.5rem",
                fontSize: "0.875rem",
                color: "var(--color-citadelle-gold)",
              }}
            >
              {locale === "fr" ? "Voir sur Google Maps →" : "View on Google Maps →"}
            </a>
          </div>
          <div className="card">
            <h3
              style={{
                fontSize: "0.875rem",
                color: "var(--color-citadelle-text-muted)",
                textTransform: "uppercase",
                letterSpacing: "0.05em",
              }}
            >
              {t("phone")}
            </h3>
            <p style={{ marginTop: "0.5rem" }}>
              <a href="tel:+14185641047" style={{ color: "inherit" }}>
                418-564-1047
              </a>
            </p>
          </div>
          <div className="card">
            <h3
              style={{
                fontSize: "0.875rem",
                color: "var(--color-citadelle-text-muted)",
                textTransform: "uppercase",
                letterSpacing: "0.05em",
              }}
            >
              {locale === "fr" ? "Réseaux sociaux" : "Social media"}
            </h3>
            <div style={{ marginTop: "0.5rem", display: "grid", gap: "0.4rem" }}>
              <a
                href="https://www.instagram.com/citadellebjj/"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "var(--color-citadelle-gold)" }}
              >
                Instagram — @citadellebjj
              </a>
              <a
                href="https://www.facebook.com/p/Citadelle-Jiu-Jitsu-61578755165328/"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "var(--color-citadelle-gold)" }}
              >
                Facebook — Citadelle Jiu-Jitsu
              </a>
            </div>
          </div>
        </div>

        {/* TODO: ajouter formulaire contact (analogue à TrialForm) → /api/contact */}
        <div className="card" style={{ textAlign: "center", padding: "2rem" }}>
          <p style={{ color: "var(--color-citadelle-text-muted)" }}>
            {locale === "fr"
              ? "Formulaire de contact à finaliser dans une prochaine session (skeleton dispo, branche /api/contact)."
              : "Contact form to be wired up in a next session (skeleton ready, plug into /api/contact)."}
          </p>
        </div>
      </div>
    </section>
  );
}
