"use client";
// Bouton "+ Nouveau produit" + modale création — Client Component

import { useState } from "react";
import { ProductModal } from "./ProductModal";

export function ProductCreateButton({ locale }: { locale: string }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button className="btn-primary" onClick={() => setOpen(true)}>
        + {locale === "fr" ? "Nouveau produit" : "New product"}
      </button>
      {open && <ProductModal locale={locale} onClose={() => setOpen(false)} />}
    </>
  );
}
