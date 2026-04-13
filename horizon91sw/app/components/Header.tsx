"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-transparent backdrop-blur-md border-b border-h91-relativistic/30">
      <div className="max-w-6xl mx-auto flex items-center px-6 py-4">

        {/* ZONE GAUCHE — LOGO + TEXTE */}
        <div className="flex-1 flex items-center">
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/LogoHorizon91.svg"
              alt="Logo Horizon 91"
              width={42}
              height={42}
              className="drop-shadow-lg"
            />
            <span className="text-xl font-bold text-h91-relativistic">
              Horizon 91
            </span>
          </Link>
        </div>

        {/* ZONE CENTRALE — MENU CENTRÉ */}
        <nav className="hidden md:flex flex-1 justify-center items-center gap-12 text-h91-stellar">
          <Link href="/accueil">Accueil</Link>
          <Link href="/divisions">Divisions</Link>
          <Link href="/contacts">Contacts</Link>
        </nav>

        {/* ZONE DROITE — BOUTON NOUS JOINDRE */}
        <div className="hidden md:flex flex-1 justify-end">
          <Link
            href="/rejoindre"
            className="px-4 py-2 rounded-lg bg-h91-relativistic text-h91-gravity font-semibold hover:bg-h91-ion transition"
          >
            Nous joindre
          </Link>
        </div>

        {/* HAMBURGER MOBILE */}
        <button
          className="md:hidden flex flex-col gap-1 ml-auto"
          onClick={() => setOpen(!open)}
        >
          <span className="w-6 h-0.5 bg-h91-stellar"></span>
          <span className="w-6 h-0.5 bg-h91-stellar"></span>
          <span className="w-6 h-0.5 bg-h91-stellar"></span>
        </button>
      </div>

      {/* MENU MOBILE */}
      {open && (
        <div className="md:hidden bg-h91-gravity border-t border-h91-relativistic/30 px-6 py-4 flex flex-col gap-4 text-h91-stellar">
          <Link href="/accueil" onClick={() => setOpen(false)}>Accueil</Link>
          <Link href="/divisions" onClick={() => setOpen(false)}>Divisions</Link>
          <Link href="/contacts" onClick={() => setOpen(false)}>Contacts</Link>

          <Link
            href="/rejoindre"
            className="px-4 py-2 rounded-lg bg-h91-relativistic text-h91-gravity font-semibold hover:bg-h91-ion transition"
            onClick={() => setOpen(false)}
          >
            Nous joindre
          </Link>
        </div>
      )}
    </header>
  );
}



