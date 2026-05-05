import { useTranslations } from "next-intl";

export default function ContactsPage() {
  const t = useTranslations("contacts");
  const membres = t.raw("membres") as {
    titre: string;
    couleur: string;
    courriel: string;
    note: string;
  }[];

  return (
    <main className="max-w-4xl mx-auto px-6 py-20">
      <h1 className="text-5xl font-bold text-h91-stellar text-center mb-4">
        {t("title")}
      </h1>
      <p className="text-center text-h91-stellar/60 mb-14 text-lg">
        {t("subtitle")}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {membres.map((c) => (
          <div
            key={c.titre}
            className="p-6 border border-h91-accretion/20 rounded-xl bg-h91-gravity/50 flex flex-col gap-2 hover:border-h91-accretion/50 transition"
          >
            <h2 className={`text-xl font-bold ${c.couleur}`}>{c.titre}</h2>
            <p className="text-h91-stellar/50 text-sm">{c.note}</p>
            <a
              href={`mailto:${c.courriel}`}
              className="mt-2 text-h91-stellar/80 hover:text-h91-ion transition text-sm font-mono"
            >
              {c.courriel}
            </a>
          </div>
        ))}
      </div>

      <div className="mt-14 text-center">
        <a
          href="rejoindre"
          className="inline-block px-8 py-4 bg-h91-accretion text-h91-gravity font-bold rounded-lg text-lg hover:bg-h91-fusion transition"
        >
          {t("cta")}
        </a>
      </div>
    </main>
  );
}
