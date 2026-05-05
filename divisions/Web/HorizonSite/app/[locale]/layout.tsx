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

export const metadata: Metadata = {
  title: "Groupe Supernova — Agence créative & technologique",
  description:
    "Agence tech québécoise spécialisée en sites web, cybersécurité et jeux vidéo pour entrepreneurs locaux et PME.",
};

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
