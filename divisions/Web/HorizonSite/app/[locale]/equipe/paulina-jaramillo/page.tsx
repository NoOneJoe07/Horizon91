import type { Metadata } from "next";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const titles: Record<string, string> = {
    fr: "Paulina Jaramillo — Directrice Marketing & Photo | Groupe Étoile Boréale",
    en: "Paulina Jaramillo — Marketing & Photography Director | Boreal Star Group",
    es: "Paulina Jaramillo — Directora de Marketing & Fotografía | Grupo Estrella Boreal",
  };
  const baseUrl = locale === "en" ? "https://borealstar.ca" : "https://etoileboreale.ca";
  const canonical = `${baseUrl}${locale === "fr" ? "" : `/${locale}`}/equipe/paulina-jaramillo`;
  return {
    title: titles[locale] ?? titles.fr,
    alternates: { canonical },
    openGraph: { title: titles[locale] ?? titles.fr, url: canonical },
  };
}

export default function PaulinaJaramilloPage() {
  const t = useTranslations("home");

  return (
    <main>

      {/* ── HERO ── */}
      <section
        className="px-6 pb-20 text-center"
        style={{ backgroundColor: "#1D1D1B", paddingTop: "120px" }}
      >
        <div className="max-w-4xl mx-auto mb-10 text-left">
          <Link
            href="/#equipe"
            className="text-xs font-bold uppercase tracking-widest"
            style={{ color: "rgba(244,244,240,0.40)" }}
          >
            ← {t("team.title")}
          </Link>
        </div>

        <div className="max-w-4xl mx-auto flex flex-col items-center gap-6">
          <div
            className="w-36 h-36 rounded-full border-4 flex items-center justify-center"
            style={{ borderColor: "#5762A2", backgroundColor: "#F4F4F0" }}
          >
            <span className="text-5xl font-bold" style={{ color: "#5762A2" }}>PJ</span>
          </div>
          <div>
            <h1
              className="text-4xl md:text-5xl font-bold mb-3"
              style={{
                color: "#F4F4F0",
                fontFamily: "var(--font-display, 'Gotham', 'Montserrat', system-ui)",
              }}
            >
              Paulina Jaramillo
            </h1>
            <p className="text-base font-bold mb-1" style={{ color: "#5762A2" }}>
              {t("team.members.paulina.titre")}
            </p>
            <p className="text-sm" style={{ color: "rgba(244,244,240,0.40)" }}>
              Groupe Étoile Boréale · Division Arpenteur
            </p>
          </div>
        </div>
      </section>

      {/* ── À VENIR ── */}
      <section className="py-24 px-6" style={{ backgroundColor: "#FFFFFF" }}>
        <div className="max-w-2xl mx-auto text-center">
          <div
            className="w-16 h-16 rounded-full mx-auto mb-8 flex items-center justify-center"
            style={{ backgroundColor: "#E8EAF6" }}
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
              <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
                stroke="#5762A2" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <h2
            className="text-2xl font-bold mb-4"
            style={{ color: "#1D1D1B", fontFamily: "var(--font-display, 'Gotham', 'Montserrat', system-ui)" }}
          >
            Portrait & biographie à venir
          </h2>
          <p className="text-lg leading-relaxed mb-8" style={{ color: "rgba(29,29,27,0.60)" }}>
            Paulina est l'architecte visuelle de Groupe Étoile Boréale. Elle pilote le livre
            de marque, la photographie professionnelle, la stratégie médias sociaux et la
            présence visuelle de chacun de nos clients. Son profil complet sera publié
            prochainement.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/#equipe"
              className="px-7 py-3 rounded-lg font-semibold text-sm border transition"
              style={{ borderColor: "rgba(29,29,27,0.20)", color: "rgba(29,29,27,0.65)" }}
            >
              ← {t("team.title")}
            </Link>
            <Link
              href="/contacts"
              className="px-7 py-3 rounded-lg font-semibold text-sm transition"
              style={{ backgroundColor: "#5762A2", color: "#F4F4F0" }}
            >
              {t("cta_contact")}
            </Link>
          </div>
        </div>
      </section>

    </main>
  );
}
