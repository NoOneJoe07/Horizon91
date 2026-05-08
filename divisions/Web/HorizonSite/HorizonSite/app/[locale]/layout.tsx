import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import "../globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// ─────────────────────────────────────────────────────────
// Metadata de base (surchargée par generateMetadata() dans chaque page)
// ─────────────────────────────────────────────────────────
const metaByLocale: Record<string, { title: string; description: string; siteName: string }> = {
  fr: {
    title: "Groupe Supernova — Agence créative & technologique | Beauce, Québec",
    description:
      "Agence web, cybersécurité et studio de jeux vidéo à Sainte-Marie-de-Beauce. Sites web professionnels, SEO local, identité visuelle pour PME et entrepreneurs de la Chaudière-Appalaches.",
    siteName: "Groupe Supernova",
  },
  en: {
    title: "Supernova Group — Creative & Technology Agency | Beauce, Quebec",
    description:
      "Web agency, cybersecurity and game studio based in Sainte-Marie-de-Beauce. Professional websites, local SEO, visual identity for SMBs and entrepreneurs in Chaudière-Appalaches.",
    siteName: "Supernova Group",
  },
  es: {
    title: "Grupo Supernova — Agencia Creativa & Tecnológica | Beauce, Quebec",
    description:
      "Agencia web, ciberseguridad y estudio de videojuegos en Sainte-Marie-de-Beauce. Sitios web profesionales, SEO local e identidad visual para pymes y emprendedores.",
    siteName: "Grupo Supernova",
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const meta = metaByLocale[locale] ?? metaByLocale.fr;
  const url =
    locale === "en"
      ? "https://supernovagroup.ca"
      : locale === "es"
      ? "https://groupesupernova.ca/es"
      : "https://groupesupernova.ca";

  return {
    title: {
      default: meta.title,
      template: `%s | ${meta.siteName}`,
    },
    description: meta.description,
    metadataBase: new URL("https://groupesupernova.ca"),
    alternates: {
      canonical: url,
      languages: {
        fr: "https://groupesupernova.ca",
        en: "https://supernovagroup.ca",
      },
    },
    openGraph: {
      type: "website",
      url,
      siteName: meta.siteName,
      title: meta.title,
      description: meta.description,
      images: [
        {
          url: "/og-image.jpg",
          width: 1200,
          height: 630,
          alt: meta.siteName,
        },
      ],
      locale: locale === "fr" ? "fr_CA" : locale === "en" ? "en_CA" : "es_419",
    },
    twitter: {
      card: "summary_large_image",
      title: meta.title,
      description: meta.description,
      images: ["/og-image.jpg"],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true },
    },
    icons: {
      icon: "/favicon.ico",
    },
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as "fr" | "en" | "es")) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html
      lang={locale}
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-screen flex flex-col text-h91-stellar bg-transparent">
        <NextIntlClientProvider messages={messages}>
          {/* Fond cosmique */}
          <div className="night-sky"></div>
          <div className="aurora-band"></div>
          <div className="accretion-ring"></div>

          {/* Header */}
          <Header />

          {/* Contenu des pages */}
          <div className="flex-1 pt-32">{children}</div>

          {/* Footer */}
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
