import { useTranslations } from "next-intl";

export default function RejoindrePage() {
  const t = useTranslations("rejoindre");

  return (
    <main className="max-w-4xl mx-auto px-6 py-20 text-center">
      <h1 className="text-5xl font-bold text-h91-stellar mb-6">
        {t("title")}
      </h1>

      <p className="text-lg text-h91-stellar/80 leading-relaxed mb-10">
        {t("description")}
      </p>

      <div className="space-y-6 text-h91-stellar/90 text-lg">
        <p>
          <strong>{t("phone_label")} :</strong> {t("phone")}
        </p>
        <p>
          <strong>{t("email_label")} :</strong> {t("email")}
        </p>
        <p>
          <strong>{t("address_label")} :</strong> {t("address")}
        </p>
      </div>

      <a
        href={`mailto:${t("email")}`}
        className="inline-block mt-12 px-8 py-4 bg-h91-accretion text-h91-gravity font-bold rounded-lg text-xl hover:bg-h91-fusion transition"
      >
        {t("cta")}
      </a>
    </main>
  );
}
