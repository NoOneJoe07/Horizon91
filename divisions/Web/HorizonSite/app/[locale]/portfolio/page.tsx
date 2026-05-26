import type { Metadata } from "next";
import PortfolioClient from "./PortfolioClient";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  const titles: Record<string, string> = {
    fr: "Portfolio — Réalisations Web & Cybersécurité",
    en: "Portfolio — Web & Cybersecurity Projects",
    es: "Portfolio — Proyectos Web y Ciberseguridad",
  };
  const descriptions: Record<string, string> = {
    fr: "Sites web, boutiques en ligne et solutions cybersécurité conçus pour les entrepreneurs de Beauce et Chaudière-Appalaches. Découvrez les projets accomplis par l'équipe Étoile Boréale.",
    en: "Websites, e-commerce stores and cybersecurity solutions built for Beauce and Chaudière-Appalaches entrepreneurs. See what the Boreal Star team has built.",
    es: "Sitios web, tiendas en línea y soluciones de ciberseguridad para emprendedores de Beauce y Chaudière-Appalaches. Descubra los proyectos del equipo Estrella Boreal.",
  };

  const baseUrl = locale === "en" ? "https://borealstar.ca" : "https://etoileboreale.ca";
  const canonical = `${baseUrl}${locale === "fr" ? "" : `/${locale}`}/portfolio`;

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

export default function PortfolioPage() {
  return <PortfolioClient />;
}
