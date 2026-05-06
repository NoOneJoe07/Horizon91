import { useTranslations } from "next-intl";
import Image from "next/image";
import { Link } from "@/i18n/navigation";

type Service = { titre: string; desc: string };

export default function DivisionCyberPage() {
  const t = useTranslations("divisions.divisionCyber");
  const tBrand = useTranslations("brand");
  const services = t.raw("services") as Service[];

  return (
    <>
      {/* ═══════════════════════════════════════════════════
          HERO
      ═══════════════════════════════════════════════════ */}
      <section className="relative flex flex-col items-center justify-center min-h-[60vh] text-center px-6 py-24">
        {/* Badge développement actif */}
        <span className="mb-6 inline-block text-xs font-bold px-3 py-1.5 rounded-full bg-h91-accretion/20 text-h91-accretion border border-h91-accretion/40">
          {t("badge")}
        </span>

        {/* Mark */}
        <div className="mb-6 flex items-center justify-center">
          <Image
            src="/mark-cyber.svg"
            alt="Singularité — Division Cybersécurité"
            width={80}
            height={80}
            className="drop-shadow-lg"
          />
        </div>

        {/* Tagline */}
        <p className="text-h91-accretion font-bold tracking-widest uppercase text-sm mb-3">
          {t("hero_tagline")} — {tBrand("name")}
        </p>

        {/* Titre */}
        <h1 className="text-5xl md:text-7xl font-bold text-h91-stellar mb-6">
          {t("hero_titre")}
        </h1>

        {/* Description */}
        <p className="text-lg md:text-xl text-h91-stellar/70 max-w-2xl leading-relaxed">
          {t("hero_description")}
        </p>

        {/* CTAs */}
        <div className="mt-10 flex flex-wrap gap-4 justify-center">
          <Link
            href="/rejoindre"
            className="px-8 py-4 rounded-lg bg-h91-accretion text-h91-gravity font-bold text-lg hover:bg-h91-fusion transition"
          >
            {t("cta_bouton")}
          </Link>
          <Link
            href="/divisions"
            className="px-8 py-4 rounded-lg border border-h91-accretion/50 text-h91-accretion font-bold text-lg hover:bg-h91-accretion/10 transition"
          >
            {t("cta_portfolio")}
          </Link>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          SERVICES
      ═══════════════════════════════════════════════════ */}
      <section className="py-20 px-6 max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-h91-stellar text-center mb-14">
          {t("services_titre")}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <div
              key={i}
              className="p-6 border border-h91-accretion/30 rounded-xl bg-h91-gravity/50 hover:border-h91-accretion/70 hover:bg-h91-gravity/80 transition"
            >
              <div className="w-8 h-0.5 bg-h91-accretion mb-4" />
              <h3 className="text-h91-stellar font-bold text-lg mb-2">{service.titre}</h3>
              <p className="text-h91-stellar/60 text-sm leading-relaxed">{service.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          APPROCHE
      ═══════════════════════════════════════════════════ */}
      <section className="py-16 px-6 max-w-3xl mx-auto text-center">
        <h2 className="text-2xl font-bold text-h91-accretion mb-6">{t("approche_titre")}</h2>
        <p className="text-h91-stellar/70 text-lg leading-relaxed">{t("approche_texte")}</p>
      </section>

      {/* ═══════════════════════════════════════════════════
          CTA FINAL
      ═══════════════════════════════════════════════════ */}
      <section className="py-20 px-6 text-center border-t border-h91-accretion/20">
        <h2 className="text-3xl md:text-4xl font-bold text-h91-stellar mb-8">
          {t("cta_titre")}
        </h2>
        <Link
          href="/rejoindre"
          className="inline-block px-10 py-5 rounded-lg bg-h91-accretion text-h91-gravity font-bold text-xl hover:bg-h91-fusion transition"
        >
          {t("cta_bouton")}
        </Link>
      </section>
    </>
  );
}
