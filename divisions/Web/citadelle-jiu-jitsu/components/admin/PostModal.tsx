"use client";
// =============================================================================
// components/admin/PostModal.tsx — Modale Create/Edit article Dojo Time
// =============================================================================

import { useRef, useState, useTransition } from "react";
import { createPost, updatePost } from "@/app/actions/admin";
import type { Post, PostCategory } from "@prisma/client";

interface Props {
  post?: Post;
  onClose: () => void;
  locale: string;
}

const CATEGORIES: PostCategory[] = ["COMPETITION", "BELTS", "ANNOUNCEMENT", "COMMUNITY"];

const CATEGORY_LABELS: Record<PostCategory, string> = {
  COMPETITION:  "Compétition",
  BELTS:        "Remise de ceintures",
  ANNOUNCEMENT: "Annonce",
  COMMUNITY:    "Communauté",
};

const labelStyle: React.CSSProperties = {
  display: "block", fontSize: "0.78rem",
  color: "var(--color-citadelle-text-muted)",
  marginBottom: "0.3rem", textTransform: "uppercase", letterSpacing: "0.04em",
};
const inputStyle: React.CSSProperties = {
  width: "100%", padding: "0.5rem 0.75rem",
  background: "var(--color-citadelle-surface-2)",
  border: "1px solid var(--color-citadelle-border)",
  borderRadius: "var(--radius-sm)",
  color: "var(--color-citadelle-text)",
  fontSize: "0.875rem", boxSizing: "border-box",
};

export function PostModal({ post, onClose, locale }: Props) {
  const formRef = useRef<HTMLFormElement>(null);
  const [error, setError]     = useState<string | null>(null);
  const [pending, startTransition] = useTransition();
  const isEdit = !!post;

  // Date par défaut = aujourd'hui
  const defaultDate = (post?.publishedAt ?? new Date())
    .toISOString().slice(0, 10);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!formRef.current) return;
    const formData = new FormData(formRef.current);
    setError(null);
    startTransition(async () => {
      const result = isEdit
        ? await updatePost(post.id, formData)
        : await createPost(formData);
      if ('error' in result) setError(result.error);
      else onClose();
    });
  }

  return (
    <div
      style={{
        position: "fixed", inset: 0, zIndex: 1000,
        background: "rgba(0,0,0,0.75)",
        display: "flex", alignItems: "flex-start", justifyContent: "center",
        padding: "2rem 1rem", overflowY: "auto",
      }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="card" style={{ width: "100%", maxWidth: "700px" }}>

        {/* En-tête */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
          <h2 style={{ fontSize: "1.25rem" }}>
            {isEdit ? "Modifier l'article" : "Nouvel article Dojo Time"}
          </h2>
          <button onClick={onClose}
            style={{ background: "none", border: "none", cursor: "pointer", fontSize: "1.5rem", color: "var(--color-citadelle-text-muted)" }}>
            ×
          </button>
        </div>

        <form ref={formRef} onSubmit={handleSubmit} style={{ display: "grid", gap: "1.1rem" }}>

          {/* Titres */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
            <Field label="Titre (FR) *" name="titleFr" defaultValue={post?.titleFr} required />
            <Field label="Title (EN) *" name="titleEn" defaultValue={post?.titleEn} required />
          </div>

          {/* Extraits */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
            <TextareaField label="Extrait (FR) *" name="excerptFr" defaultValue={post?.excerptFr} rows={2} required />
            <TextareaField label="Excerpt (EN) *" name="excerptEn" defaultValue={post?.excerptEn} rows={2} required />
          </div>

          {/* Contenu complet */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
            <TextareaField label="Contenu complet (FR) *" name="contentFr" defaultValue={post?.contentFr} rows={8} required />
            <TextareaField label="Full content (EN) *" name="contentEn" defaultValue={post?.contentEn} rows={8} required />
          </div>
          <p style={{ fontSize: "0.75rem", color: "var(--color-citadelle-text-muted)", marginTop: "-0.5rem" }}>
            Séparer les paragraphes par une ligne vide.
          </p>

          {/* Catégorie / Statut / Date */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "0.75rem" }}>
            <div>
              <label style={labelStyle}>Catégorie *</label>
              <select name="category" defaultValue={post?.category ?? "COMPETITION"} style={inputStyle} required>
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>{CATEGORY_LABELS[c]}</option>
                ))}
              </select>
            </div>
            <div>
              <label style={labelStyle}>Statut *</label>
              <select name="status" defaultValue={post?.status ?? "DRAFT"} style={inputStyle} required>
                <option value="DRAFT">Brouillon</option>
                <option value="PUBLISHED">Publié</option>
              </select>
            </div>
            <div>
              <label style={labelStyle}>Date de publication</label>
              <input name="publishedAt" type="date" defaultValue={defaultDate} style={inputStyle} />
            </div>
          </div>

          {/* Image + lien externe */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
            <Field label="URL image (optionnel)" name="imageUrl" defaultValue={post?.imageUrl ?? ""} type="url" />
            <Field label="Lien Supernova (optionnel)" name="externalUrl" defaultValue={post?.externalUrl ?? ""} type="url" />
          </div>

          {error && (
            <p style={{ color: "#ef4444", fontSize: "0.875rem" }}>{error}</p>
          )}

          <div style={{ display: "flex", gap: "0.75rem", justifyContent: "flex-end" }}>
            <button type="button" className="btn-secondary" onClick={onClose} disabled={pending}>Annuler</button>
            <button type="submit" className="btn-primary" disabled={pending}>
              {pending ? "Enregistrement…" : "Enregistrer"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function Field({ label, name, defaultValue, required, type = "text" }: {
  label: string; name: string; defaultValue?: string | null; required?: boolean; type?: string;
}) {
  return (
    <div>
      <label style={labelStyle}>{label}</label>
      <input name={name} type={type} defaultValue={defaultValue ?? ""} required={required} style={inputStyle} />
    </div>
  );
}
function TextareaField({ label, name, defaultValue, required, rows = 4 }: {
  label: string; name: string; defaultValue?: string | null; required?: boolean; rows?: number;
}) {
  return (
    <div>
      <label style={labelStyle}>{label}</label>
      <textarea name={name} defaultValue={defaultValue ?? ""} required={required} rows={rows}
        style={{ ...inputStyle, resize: "vertical" }} />
    </div>
  );
}
