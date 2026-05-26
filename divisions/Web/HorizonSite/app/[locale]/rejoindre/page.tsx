import type { Metadata } from "next";
import RejoindreCl from "./RejoindreCl";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  const titles: Record<string, string> = {
    fr: "Nous Joindre — Démarrez Votre Projet",
    en: "Get in Touch — Start Your Project",
    es: "Contáctenos — Inicie Su Proyecto",
  };
  const descriptions: Record<string, string> = {
    fr: "Votre projet mérite l'étoile qui guide. Envoyez votre message à l'équipe de Groupe Étoile Boréale — site web, cybersécurité ou médias sociaux. Réponse rapide garantie.",
    en: "Your project deserves the guiding star. Send a message to the Boreal Star Group team — website, cybersecurity or social media. Quick response guaranteed.",
    es: "Su proyecto merece la estrella que guía. Envíe su mensaje al equipo de Grupo Estrella Boreal — sitio web, ciberseguridad o redes sociales. Respuesta rápida garantizada.",
  };

  const baseUrl = locale === "en" ? "https://borealstar.ca" : "https://etoileboreale.ca";
  const canonical = `${baseUrl}${locale === "fr" ? "" : `/${locale}`}/rejoindre`;

  return {
    title: titles[locale] ?? titles.fr,
    description: descriptions[locale] ?? descriptions.fr,
    alternates: { canonical },
    openGraph: {
      title: titles[locale] ?? titles.fr,
      description: descriptions[locale] ?? descriptions.fr,
      url: canonical,
    },
  };
}

export default function RejoindrePage() {
  return <RejoindreCl />;
}
