import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Image from "next/image";
import "./globals.css";
import Logo from "./LogoNordikLegion.svg";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Nordik Legion Studio",
  description: "Studio indépendant inspiré du Nord, forgeant des expériences uniques.",
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
      <body className="min-h-full flex flex-col bg-transparent text-nordik-snow">

        {/* Ciel de nuit + étoiles */}
        <div className="night-sky"></div>

        {/* Aurore boréale animée */}
        <div className="aurora-band"></div>

        {/* HEADER FIXE */}
        <header className="w-full py-6 px-10 flex items-center justify-between fixed top-0 left-0 z-50 bg-nordik-night/40 backdrop-blur-md">

          {/* Logo miniature */}
          <a href="/" className="flex items-center gap-3 cursor-pointer">
            <Image
              src={Logo}
              alt="Logo Nordik Legion"
              width={60}
              height={60}
              className="block"
            />
          <span className="text-xl font-bold text-nordik-glacier">
            Nordik Legion
          </span>
        </a>


          {/* Menu */}
          <nav className="hidden md:flex gap-10 text-nordik-snow/80 text-lg">
            <a href="/accueil" className="hover:text-nordik-glacier transition">Accueil</a>
            <a href="/projets" className="hover:text-nordik-glacier transition">Projets</a>
            <a href="/studio" className="hover:text-nordik-glacier transition">Studio</a>
            <a href="/contact" className="hover:text-nordik-glacier transition">Contacts</a>
          </nav>

          {/* CTA */}
          <a
            href="/rejoindre"
            className="hidden md:block bg-nordik-glacier text-nordik-night font-bold px-6 py-3 rounded-lg hover:bg-white transition"
          >
            Nous rejoindre
          </a>

        </header>

        {/* CONTENU DES PAGES */}
        {children}

      </body>
    </html>
  );
}


