"use client";

import { useState } from "react";
import Image from "next/image";
import Logo from "./LogoNordikLegion.svg";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="w-full py-6 px-10 flex flex-col fixed top-0 left-0 z-50 bg-nordik-night/40 backdrop-blur-md">

      {/* Ligne du haut : logo + hamburger */}
      <div className="flex items-center justify-between">

        {/* Logo */}
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

        {/* Menu desktop */}
        <nav className="hidden md:flex gap-10 text-nordik-snow/80 text-lg">
          <a href="/accueil" className="hover:text-nordik-glacier transition">Accueil</a>
          <a href="/projets" className="hover:text-nordik-glacier transition">Projets</a>
          <a href="/studio" className="hover:text-nordik-glacier transition">Studio</a>
          <a href="/contact" className="hover:text-nordik-glacier transition">Contacts</a>
        </nav>

        {/* CTA desktop */}
        <a
          href="/rejoindre"
          className="hidden md:block bg-nordik-glacier text-nordik-night font-bold px-6 py-3 rounded-lg hover:bg-white transition"
        >
          Nous rejoindre
        </a>

        {/* Hamburger mobile */}
        <button
          className="md:hidden text-nordik-snow text-4xl"
          onClick={() => setOpen(!open)}
        >
          ☰
        </button>
      </div>

      {/* MENU MOBILE */}
      {open && (
        <nav className="md:hidden mt-6 bg-nordik-night/80 backdrop-blur-md rounded-lg p-6 flex flex-col gap-4 text-lg text-nordik-snow/90">
          <a href="/accueil" className="hover:text-white transition">Accueil</a>
          <a href="/projets" className="hover:text-white transition">Projets</a>
          <a href="/studio" className="hover:text-white transition">Studio</a>
          <a href="/contact" className="hover:text-white transition">Contacts</a>
          <a
            href="/rejoindre"
            className="bg-nordik-glacier text-nordik-night font-bold px-4 py-2 rounded-lg hover:bg-white transition text-center"
          >
            Nous rejoindre
          </a>
        </nav>
      )}
    </header>
  );
}
