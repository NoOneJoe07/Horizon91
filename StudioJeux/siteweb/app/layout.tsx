import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

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
      
      {/* Aurore boréale animée */}
      <div className="aurora"></div>

      {children}
    </body>
  </html>
);

}
