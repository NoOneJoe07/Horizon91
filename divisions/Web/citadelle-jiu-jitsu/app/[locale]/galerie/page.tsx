import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "@/lib/locales";

export default async function GalleryPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "Gallery" });

  // Placeholder : 6 tuiles vides en attendant les vraies photos client
  const placeholders = Array.from({ length: 6 });

  return (
    <section className="section">
      <div className="container-citadelle">
        <header style={{ textAlign: "center", marginBottom: "3rem" }}>
          <h1 style={{ fontSize: "2.5rem", marginBottom: "0.5rem" }}>{t("title")}</h1>
          <p style={{ color: "var(--color-citadelle-text-muted)" }}>{t("subtitle")}</p>
        </header>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "1rem",
          }}
        >
          {placeholders.map((_, i) => (
            <div
              key={i}
              aria-hidden
              style={{
                aspectRatio: "1",
                background:
                  "linear-gradient(135deg, var(--color-citadelle-surface), var(--color-citadelle-surface-2))",
                borderRadius: "var(--radius-md)",
                border: "1px solid var(--color-citadelle-border)",
                display: "grid",
                placeItems: "center",
                color: "var(--color-citadelle-gold)",
                fontSize: "1.5rem",
                opacity: 0.6,
              }}
            >
              ◇
            </div>
          ))}
        </div>

        <p
          style={{
            textAlign: "center",
            marginTop: "2rem",
            fontSize: "0.875rem",
            color: "var(--color-citadelle-text-muted)",
            fontStyle: "italic",
          }}
        >
          {locale === "fr"
            ? "Photos officielles à intégrer dès leur réception du client."
            : "Official photos to be added once provided by the client."}
        </p>
      </div>
    </section>
  );
}
