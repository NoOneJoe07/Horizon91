// =============================================================================
// Layout racine du site (par locale)
// -----------------------------------------------------------------------------
// Ce layout est le ROOT layout pour next-intl avec App Router :
// - Il rend <html> et <body>
// - Il fournit le NextIntlClientProvider à tous les composants
// - Il monte Header et Footer
// =============================================================================

import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { locales, type Locale } from "@/lib/locales";
import "../globals.css";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Meta" });

  return {
    // ── Title template ──────────────────────────────────────────────────────
    // "template" : modèle appliqué aux pages enfants qui exportent generateMetadata.
    //   %s = le titre fourni par la page enfant
    //   Ex: page abonnements retourne title: "Abonnements & Tarifs"
    //       → Next.js produit : "Abonnements & Tarifs — Citadelle Jiu-Jitsu"
    //
    // "default" : titre utilisé si une page n'exporte PAS generateMetadata.
    //   → La page d'accueil et les pages sans métadonnées spécifiques
    //     utilisent ce titre complet comme fallback.
    //
    // Avantage : le nom de la marque est défini UNE SEULE FOIS ici.
    // Pour renommer → modifier uniquement ce fichier.
    title: {
      template: `%s — ${t("siteName")}`,
      default: t("title"),
    },
    description: t("description"),

    // ── Icônes (favicon) ────────────────────────────────────────────────────
    // Même SVG utilisé pour tous les contextes (onglet, raccourci, Apple).
    // Quand le client fournira un PNG haute résolution → ajouter ici.
    icons: {
      icon:     "/favicon.svg",
      shortcut: "/favicon.svg",
      apple:    "/favicon.svg",
    },

    // ── Open Graph (partage sur réseaux sociaux) ────────────────────────────
    // Contrôle l'aperçu quand quelqu'un partage un lien sur Facebook,
    // WhatsApp, iMessage, etc. Sans ça → l'aperçu est générique ou vide.
    // TODO : remplacer /og-image.jpg par une vraie image 1200×630px (avec Paulina)
    openGraph: {
      siteName:    t("siteName"),
      title:       t("title"),
      description: t("description"),
      locale:      locale === "fr" ? "fr_CA" : "en_CA",
      type:        "website",
      url:         `https://citadellejiujitsu.ca/${locale}`,
      images: [
        {
          url:    "https://citadellejiujitsu.ca/og-image.jpg",
          width:  1200,
          height: 630,
          alt:    "Citadelle Jiu-Jitsu — École de BJJ à Québec",
        },
      ],
    },

    // ── Twitter / X Card ───────────────────────────────────────────────────
    twitter: {
      card:        "summary_large_image",
      title:       t("title"),
      description: t("description"),
      images:      ["https://citadellejiujitsu.ca/og-image.jpg"],
    },

    // ── URL canonique ──────────────────────────────────────────────────────
    alternates: {
      canonical: `https://citadellejiujitsu.ca/${locale}`,
      languages: {
        "fr-CA": "https://citadellejiujitsu.ca/fr",
        "en-CA": "https://citadellejiujitsu.ca/en",
      },
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!locales.includes(locale as Locale)) {
    notFound();
  }

  // Active le rendu statique pour les routes localisées (Next 15+)
  setRequestLocale(locale);

  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <NextIntlClientProvider messages={messages} locale={locale}>
          <Header locale={locale as Locale} />
          <main style={{ flex: 1 }}>{children}</main>
          <Footer locale={locale as Locale} />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
