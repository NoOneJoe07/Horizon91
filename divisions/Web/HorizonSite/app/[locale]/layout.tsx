import type { Metadata } from "next";
import { Inter, Urbanist } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import Script from "next/script";
import { routing } from "@/i18n/routing";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import "../globals.css";

const GA_ID = "G-0BNVZP1NXM";

// ─────────────────────────────────────────────────────────
// Typographie
// Urbanist (Google Fonts) — titres, alternative libre à Gotham
// Inter (Google Fonts) — corps de texte
// ─────────────────────────────────────────────────────────
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const urbanist = Urbanist({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

// ─────────────────────────────────────────────────────────
// Metadata de base (surchargée par generateMetadata() dans chaque page)
// ─────────────────────────────────────────────────────────
const metaByLocale: Record<string, { title: string; description: string; siteName: string }> = {
  fr: {
    title: "Groupe Étoile Boréale — Créer · Bâtir · Protéger | Beauce, Québec",
    description:
      "Agence créative et technologique à Sainte-Marie-de-Beauce. Graphisme & identité de marque (Arpenteur), développement web (Draveur), cybersécurité (Carillon) — PME et entrepreneurs de Chaudière-Appalaches.",
    siteName: "Groupe Étoile Boréale",
  },
  en: {
    title: "Boreal Star Group — Create · Build · Protect | Beauce, Quebec",
    description:
      "Creative and technology agency in Sainte-Marie-de-Beauce. Brand design (Arpenteur), web development (Draveur), cybersecurity (Carillon) — SMBs and entrepreneurs in Chaudière-Appalaches.",
    siteName: "Boreal Star Group",
  },
  es: {
    title: "Grupo Estrella Boreal — Crear · Construir · Proteger | Beauce, Quebec",
    description:
      "Agencia creativa y tecnológica en Sainte-Marie-de-Beauce. Diseño de marca (Arpenteur), desarrollo web (Draveur), ciberseguridad (Carillon) — pymes y emprendedores de Chaudière-Appalaches.",
    siteName: "Grupo Estrella Boreal",
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
      ? "https://borealstar.ca"
      : locale === "es"
      ? "https://etoileboreale.ca/es"
      : "https://etoileboreale.ca";

  return {
    title: {
      default: meta.title,
      template: `%s | ${meta.siteName}`,
    },
    description: meta.description,
    metadataBase: new URL("https://etoileboreale.ca"),
    alternates: {
      canonical: url,
      languages: {
        fr: "https://etoileboreale.ca",
        en: "https://borealstar.ca",
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
      className={`${inter.variable} ${urbanist.variable} h-full antialiased`}
    >
      <head>
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
          strategy="afterInteractive"
        />
        <Script id="ga4-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_ID}');
          `}
        </Script>
      </head>
      <body className="min-h-screen flex flex-col">
        <NextIntlClientProvider messages={messages}>
          <Header />
          <div className="flex-1 pt-20">{children}</div>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
