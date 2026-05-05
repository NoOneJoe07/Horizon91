import { useTranslations } from "next-intl";
import Image from "next/image";

const divisionsMeta = [
  {
    key: "web",
    mark: "/mark-web.svg",
    couleur: "text-h91-warp",
    href: "/portfolio",
    externe: false,
  },
  {
    key: "cyber",
    mark: "/mark-cyber.svg",
    couleur: "text-h91-accretion",
    href: "/contacts",
    externe: false,
  },
  {
    key: "studio",
    mark: "/mark-nordik.svg",
    couleur: "text-h91-ion",
    href: "https://nordiklegion.ca",
    externe: true,
  },
] as const;

export default function DivisionsPage() {
  const t = useTranslations("divisions");

  return (
    <main className="max-w-5xl mx-auto px-6 py-20">
      <h1 className="text-5xl font-bold text-h91-stellar text-center mb-4">
        {t("title")}
      </h1>
      <p className="text-center text-h91-stellar/60 mb-14 text-lg">
        {t("subtitle")}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {divisionsMeta.map((div) => {
          const services = t.raw(`${div.key}.services`) as string[];
          return (
            <div
              key={div.key}
              className="p-6 border border-h91-accretion/20 rounded-xl bg-h91-gravity/50 flex flex-col gap-4 hover:border-h91-accretion/50 transition"
            >
              <Image
                src={div.mark}
                alt={`Mark ${t(`${div.key}.nom`)}`}
                width={48}
                height={48}
                style={{ width: "48px", height: "48px" }}
              />

              <h2 className={`text-2xl font-bold ${div.couleur}`}>
                {t(`${div.key}.nom`)}
              </h2>
              <p className="text-h91-stellar/80 text-sm leading-relaxed flex-1">
                {t(`${div.key}.description`)}
              </p>

              <ul className="mt-2 flex flex-col gap-1">
                {services.map((s) => (
                  <li
                    key={s}
                    className="text-h91-stellar/60 text-xs flex items-center gap-2"
                  >
                    <span className="text-h91-ion">▸</span> {s}
                  </li>
                ))}
              </ul>

              <a
                href={div.href}
                target={div.externe ? "_blank" : undefined}
                rel={div.externe ? "noopener noreferrer" : undefined}
                className="mt-2 inline-block px-5 py-2 bg-h91-accretion text-h91-gravity font-semibold rounded-lg text-sm hover:bg-h91-fusion transition text-center"
              >
                {t(`${div.key}.cta`)}
              </a>
            </div>
          );
        })}
      </div>
    </main>
  );
}
