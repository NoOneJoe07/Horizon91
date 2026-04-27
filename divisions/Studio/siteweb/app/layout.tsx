import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Image from "next/image";
import "./globals.css";
import Logo from "./LogoNordikLegion.svg";
import Header from "./Header";

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

        {/* HEADER (nouveau composant mobile + desktop) */}
        <Header />

        {/* CONTENU DES PAGES */}
        <div className="pt-32">
          {children}
        </div>

        {/* FOOTER */}
        <footer className="bg-nordik-night/60 backdrop-blur-md text-nordik-snow/80 py-12 mt-20 border-t border-nordik-snow/10">
          <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12">

            {/* Bloc Identité */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <Image src={Logo} alt="Logo Nordik Legion" width={50} height={50} />
                <span className="text-xl font-bold text-nordik-glacier">Nordik Legion</span>
              </div>
              <p className="text-sm">
                Studio indépendant basé au Québec.  
                Nous forgeons des expériences inspirées du Nord.
              </p>
            </div>

            {/* Bloc Navigation */}
            <div>
              <h3 className="text-lg font-bold text-nordik-glacier mb-3">Navigation</h3>
              <ul className="space-y-2">
                <li><a href="/accueil" className="hover:text-white transition">Accueil</a></li>
                <li><a href="/projets" className="hover:text-white transition">Projets</a></li>
                <li><a href="/studio" className="hover:text-white transition">Studio</a></li>
                <li><a href="/contact" className="hover:text-white transition">Contact</a></li>
                <li><a href="/rejoindre" className="hover:text-white transition">Nous rejoindre</a></li>
              </ul>
            </div>

            {/* Bloc Contact */}
            <div>
              <h3 className="text-lg font-bold text-nordik-glacier mb-3">Contact</h3>
              <ul className="space-y-2 text-sm">
                <li>Développement : dev@nordiklegion.com</li>
                <li>Artistique : art@nordiklegion.com</li>
                <li>Recrutement : jobs@nordiklegion.com</li>
                <li>Support : support@nordiklegion.com</li>
              </ul>
            </div>

          </div>

          {/* Copyright */}
          <div className="border-t border-nordik-snow/20 mt-12 pt-6 text-center text-sm">
            © 2026 Nordik Legion Studio — Tous droits réservés.
          </div>
        </footer>

      </body>
    </html>
  );
}


