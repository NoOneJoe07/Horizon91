"use client";
// =============================================================================
// components/admin/ProductModal.tsx — Modale Create/Edit produit
// =============================================================================

import { useRef, useState, useTransition } from "react";
import { createProduct, updateProduct } from "@/app/actions/admin";
import type { Product, ProductCategory } from "@prisma/client";

interface Props {
  product?: Product;        // undefined = création, défini = édition
  onClose: () => void;
  locale: string;
}

const CATEGORIES: ProductCategory[] = ["APPAREL", "GEAR", "ACCESSORY"];

const CATEGORY_LABELS: Record<ProductCategory, string> = {
  APPAREL:   "Vêtement",
  GEAR:      "Équipement",
  ACCESSORY: "Accessoire",
};

export function ProductModal({ product, onClose, locale }: Props) {
  const formRef = useRef<HTMLFormElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  const isEdit = !!product;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!formRef.current) return;
    const formData = new FormData(formRef.current);

    setError(null);
    startTransition(async () => {
      const result = isEdit
        ? await updateProduct(product.id, formData)
        : await createProduct(formData);

      if ('error' in result) {
        setError(result.error);
      } else {
        onClose();
      }
    });
  }

  return (
    <div
      style={{
        position: "fixed", inset: 0, zIndex: 1000,
        background: "rgba(0,0,0,0.7)",
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: "1rem",
      }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div
        className="card"
        style={{ width: "100%", maxWidth: "560px", maxHeight: "90vh", overflowY: "auto" }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
          <h2 style={{ fontSize: "1.25rem" }}>
            {isEdit
              ? (locale === "fr" ? "Modifier le produit" : "Edit product")
              : (locale === "fr" ? "Nouveau produit" : "New product")}
          </h2>
          <button
            onClick={onClose}
            style={{ background: "none", border: "none", cursor: "pointer", fontSize: "1.5rem", color: "var(--color-citadelle-text-muted)" }}
          >
            ×
          </button>
        </div>

        <form ref={formRef} onSubmit={handleSubmit} style={{ display: "grid", gap: "1rem" }}>
          {/* Noms */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
            <Field label="Nom (FR)" name="nameFr" defaultValue={product?.nameFr} required />
            <Field label="Name (EN)" name="nameEn" defaultValue={product?.nameEn} required />
          </div>

          {/* Descriptions */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
            <TextareaField label="Description (FR)" name="descriptionFr" defaultValue={product?.descriptionFr} required />
            <TextareaField label="Description (EN)" name="descriptionEn" defaultValue={product?.descriptionEn} required />
          </div>

          {/* Prix / Stock / Catégorie */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "0.75rem" }}>
            <div>
              <label style={labelStyle}>Prix (¢) — ex: 6500 = 65$</label>
              <input
                name="priceCents"
                type="number"
                min={100}
                defaultValue={product?.priceCents ?? 6000}
                required
                style={inputStyle}
              />
            </div>
            <div>
              <label style={labelStyle}>Stock</label>
              <input
                name="stockQuantity"
                type="number"
                min={0}
                defaultValue={product?.stockQuantity ?? 20}
                required
                style={inputStyle}
              />
            </div>
            <div>
              <label style={labelStyle}>Catégorie</label>
              <select name="category" defaultValue={product?.category ?? "APPAREL"} style={inputStyle} required>
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>{CATEGORY_LABELS[c]}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Image URL */}
          <Field label="URL image (optionnel)" name="imageUrl" defaultValue={product?.imageUrl ?? ""} type="url" />

          {error && (
            <p style={{ color: "var(--color-citadelle-error, #ef4444)", fontSize: "0.875rem" }}>
              {error}
            </p>
          )}

          <div style={{ display: "flex", gap: "0.75rem", justifyContent: "flex-end", marginTop: "0.5rem" }}>
            <button type="button" className="btn-secondary" onClick={onClose} disabled={pending}>
              {locale === "fr" ? "Annuler" : "Cancel"}
            </button>
            <button type="submit" className="btn-primary" disabled={pending}>
              {pending
                ? (locale === "fr" ? "Enregistrement…" : "Saving…")
                : (locale === "fr" ? "Enregistrer" : "Save")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ── Helpers UI ────────────────────────────────────────────────────────────────

const labelStyle: React.CSSProperties = {
  display: "block",
  fontSize: "0.8rem",
  color: "var(--color-citadelle-text-muted)",
  marginBottom: "0.3rem",
  textTransform: "uppercase",
  letterSpacing: "0.04em",
};

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "0.5rem 0.75rem",
  background: "var(--color-citadelle-surface-2)",
  border: "1px solid var(--color-citadelle-border)",
  borderRadius: "var(--radius-sm)",
  color: "var(--color-citadelle-text)",
  fontSize: "0.9rem",
  boxSizing: "border-box",
};

function Field({ label, name, defaultValue, required, type = "text" }: {
  label: string; name: string; defaultValue?: string | null; required?: boolean; type?: string;
}) {
  return (
    <div>
      <label style={labelStyle}>{label}</label>
      <input
        name={name}
        type={type}
        defaultValue={defaultValue ?? ""}
        required={required}
        style={inputStyle}
      />
    </div>
  );
}

function TextareaField({ label, name, defaultValue, required }: {
  label: string; name: string; defaultValue?: string | null; required?: boolean;
}) {
  return (
    <div>
      <label style={labelStyle}>{label}</label>
      <textarea
        name={name}
        defaultValue={defaultValue ?? ""}
        required={required}
        rows={3}
        style={{ ...inputStyle, resize: "vertical" }}
      />
    </div>
  );
}
