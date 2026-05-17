"use client";
// =============================================================================
// components/admin/ProductActions.tsx
// Boutons Edit / Toggle actif / Supprimer pour chaque ligne produit
// =============================================================================

import { useState, useTransition } from "react";
import { toggleProductActive, deleteProduct } from "@/app/actions/admin";
import { ProductModal } from "./ProductModal";
import type { Product } from "@prisma/client";

interface Props {
  product: Product;
  locale: string;
}

export function ProductActions({ product, locale }: Props) {
  const [showEdit, setShowEdit]       = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [pending, startTransition]    = useTransition();

  return (
    <>
      {/* Boutons inline */}
      <div style={{ display: "flex", gap: "0.4rem" }}>
        {/* Modifier */}
        <button
          className="btn-secondary"
          style={{ fontSize: "0.75rem", padding: "0.3rem 0.65rem" }}
          onClick={() => setShowEdit(true)}
          disabled={pending}
        >
          {locale === "fr" ? "Modifier" : "Edit"}
        </button>

        {/* Activer / Désactiver */}
        <button
          className="btn-secondary"
          style={{ fontSize: "0.75rem", padding: "0.3rem 0.65rem" }}
          disabled={pending}
          onClick={() =>
            startTransition(async () => {
              await toggleProductActive(product.id, !product.active);
            })
          }
        >
          {product.active
            ? (locale === "fr" ? "Désactiver" : "Disable")
            : (locale === "fr" ? "Activer"    : "Enable")}
        </button>

        {/* Supprimer */}
        <button
          style={{
            fontSize: "0.75rem",
            padding: "0.3rem 0.65rem",
            background: "none",
            border: "1px solid #ef4444",
            color: "#ef4444",
            borderRadius: "var(--radius-sm)",
            cursor: "pointer",
          }}
          disabled={pending}
          onClick={() => setShowConfirm(true)}
        >
          {locale === "fr" ? "Suppr." : "Delete"}
        </button>
      </div>

      {/* Modale édition */}
      {showEdit && (
        <ProductModal
          product={product}
          locale={locale}
          onClose={() => setShowEdit(false)}
        />
      )}

      {/* Confirmation suppression */}
      {showConfirm && (
        <div
          style={{
            position: "fixed", inset: 0, zIndex: 1000,
            background: "rgba(0,0,0,0.7)",
            display: "flex", alignItems: "center", justifyContent: "center",
            padding: "1rem",
          }}
        >
          <div className="card" style={{ maxWidth: "400px", textAlign: "center" }}>
            <p style={{ marginBottom: "1.5rem", fontSize: "1rem" }}>
              {locale === "fr"
                ? `Supprimer « ${product.nameFr} » ? Cette action est irréversible.`
                : `Delete "${product.nameEn}"? This cannot be undone.`}
            </p>
            <div style={{ display: "flex", gap: "0.75rem", justifyContent: "center" }}>
              <button
                className="btn-secondary"
                onClick={() => setShowConfirm(false)}
                disabled={pending}
              >
                {locale === "fr" ? "Annuler" : "Cancel"}
              </button>
              <button
                style={{
                  padding: "0.6rem 1.25rem",
                  background: "#ef4444",
                  color: "#fff",
                  border: "none",
                  borderRadius: "var(--radius-sm)",
                  cursor: "pointer",
                  fontWeight: 600,
                }}
                disabled={pending}
                onClick={() =>
                  startTransition(async () => {
                    await deleteProduct(product.id);
                    setShowConfirm(false);
                  })
                }
              >
                {pending
                  ? (locale === "fr" ? "Suppression…" : "Deleting…")
                  : (locale === "fr" ? "Supprimer"    : "Delete")}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
