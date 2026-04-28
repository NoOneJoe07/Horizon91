import { getTranslations, setRequestLocale } from "next-intl/server";
import { instructors } from "@/lib/data/instructors";
import type { Locale } from "@/lib/locales";

export default async function InstructorsPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "Instructors" });

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
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "1.5rem",
          }}
        >
          {instructors.map((instructor) => (
            <article key={instructor.slug} className="card">
              <div
                aria-hidden
                style={{
                  width: "100%",
                  aspectRatio: "1",
                  background:
                    "linear-gradient(135deg, var(--color-citadelle-surface-2), var(--color-citadelle-bg))",
                  borderRadius: "var(--radius-md)",
                  marginBottom: "1rem",
                  display: "grid",
                  placeItems: "center",
                  fontSize: "3rem",
                  color: "var(--color-citadelle-gold)",
                }}
              >
                ◆
              </div>
              <h2 style={{ fontSize: "1.25rem", marginBottom: "0.25rem" }}>
                {locale === "fr" ? instructor.nameFr : instructor.nameEn}
              </h2>
              <p
                style={{
                  fontSize: "0.875rem",
                  color: "var(--color-citadelle-gold)",
                  marginBottom: "0.75rem",
                }}
              >
                {locale === "fr" ? instructor.beltFr : instructor.beltEn} ·{" "}
                {instructor.yearsExperience} ans
              </p>
              <p
                style={{
                  fontSize: "0.95rem",
                  color: "var(--color-citadelle-text-muted)",
                  lineHeight: 1.6,
                }}
              >
                {locale === "fr" ? instructor.bioFr : instructor.bioEn}
              </p>
              <p
                style={{
                  marginTop: "0.75rem",
                  fontSize: "0.825rem",
                  color: "var(--color-citadelle-text)",
                  fontStyle: "italic",
                }}
              >
                {locale === "fr" ? instructor.specialtyFr : instructor.specialtyEn}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
