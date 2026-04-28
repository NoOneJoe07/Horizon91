import { getTranslations, setRequestLocale } from "next-intl/server";
import { weeklySchedule, type DayKey } from "@/lib/data/schedule";
import type { Locale } from "@/lib/locales";

const DAYS: DayKey[] = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
];

export default async function SchedulePage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "Schedule" });

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
          {DAYS.map((day) => {
            const slots = weeklySchedule[day];
            return (
              <div key={day} className="card" style={{ padding: "1.25rem" }}>
                <h2
                  style={{
                    fontSize: "1.1rem",
                    color: "var(--color-citadelle-gold)",
                    marginBottom: "0.75rem",
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                  }}
                >
                  {t(`days.${day}`)}
                </h2>
                {slots.length === 0 ? (
                  <p
                    style={{
                      color: "var(--color-citadelle-text-muted)",
                      fontStyle: "italic",
                    }}
                  >
                    {t("noClass")}
                  </p>
                ) : (
                  <ul style={{ listStyle: "none", padding: 0, display: "grid", gap: "0.75rem" }}>
                    {slots.map((slot, i) => (
                      <li
                        key={i}
                        style={{
                          paddingTop: "0.75rem",
                          borderTop:
                            i === 0 ? "none" : "1px solid var(--color-citadelle-border)",
                        }}
                      >
                        <div
                          style={{
                            fontSize: "0.875rem",
                            color: "var(--color-citadelle-text)",
                            fontWeight: 600,
                          }}
                        >
                          {slot.startTime} – {slot.endTime}
                        </div>
                        <div
                          style={{
                            fontSize: "0.875rem",
                            color: "var(--color-citadelle-text-muted)",
                          }}
                        >
                          {locale === "fr" ? slot.titleFr : slot.titleEn}
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
