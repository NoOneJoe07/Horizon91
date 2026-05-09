import { useTranslations } from "next-intl";
import Image from "next/image";
import { Link } from "@/i18n/navigation";

const divisionsMeta = [
  {
    key: "web",
    mark: "/mark-web.svg",
    couleur: "text-h91-warp",
    borderColor: "border-h91-warp/30 hover:border-h91-warp/70",
    href: "/divisions/web",
    externe: false,
  },
  {
    key: "cyber",
    mark: "/mark-cyber.svg",
    couleur: "text-h91-accretion",
    borderColor: "border-h91-accretion/30 hover:border-h91-accretion/70",
    href: "/divisions/cyber",
    externe: false,
  },
  {
    key: "studio",
    mark: "/mark-nordik.svg",
    couleur: "text-h91-ion",
    borderColor: "border-h91-ion/30 hover:border-h91-ion/70",
    href: "/divisions",
    externe: false,
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
          const card = (
            <div
              className={`p-6 border ${div.borderColor} rounded-xl bg-h91-gravity/50 flex flex-col gap-4 transition h-full`}
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
                    <span className={div.couleur}>▸</span> {s}
                  </li>
                ))}
              </ul>

              <span className={`mt-2 inline-block px-5 py-2 bg-h91-accretion text-h91-gravity font-semibold rounded-lg text-sm hover:bg-h91-fusion transition text-center`}>
                {t(`${div.key}.cta`)}
              </span>
            </div>
          );

          return div.externe ? (
            <a
              key={div.key}
              href={div.href}
              target="_blank"
              rel="noopener noreferrer"
              className="block"
            >
              {card}
            </a>
          ) : (
            <Link key={div.key} href={div.href} className="block">
              {card}
            </Link>
          );
        })}
      </div>
    </main>
  );
}
