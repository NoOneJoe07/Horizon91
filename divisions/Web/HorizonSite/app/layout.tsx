import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Horizon 91 — Groupe Créatif & Technologique",
  description: "Compagnie mère regroupant les divisions créatives et technologiques.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-screen flex flex-col text-h91-stellar bg-transparent">

        {/* Fond cosmique */}
        <div className="night-sky"></div>
        <div className="aurora-band"></div>
        <div className="accretion-ring"></div>
        {/* HEADER */}
        <Header />

        {/* CONTENU DES PAGES */}
        <main className="flex-1 pt-32">
          {children}
        </main>

        {/* FOOTER */}
        <Footer />

      </body>
    </html>
  );
}



