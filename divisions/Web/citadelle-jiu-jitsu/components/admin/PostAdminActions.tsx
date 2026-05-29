"use client";
// =============================================================================
// components/admin/PostAdminActions.tsx — Boutons CRUD articles Dojo Time
// =============================================================================

import { useState, useTransition } from "react";
import { PostModal } from "./PostModal";
import { deletePost, togglePostStatus } from "@/app/actions/admin";
import type { Post } from "@prisma/client";

interface Props {
  locale: string;
  mode: "create" | "edit";
  post?: Post;
}

export function PostAdminActions({ locale, mode, post }: Props) {
  const [showModal, setShowModal] = useState(false);
  const [pending, startTransition] = useTransition();

  // ── Mode CREATE ────────────────────────────────────────────────────────────
  if (mode === "create") {
    return (
      <>
        <button
          className="btn-primary"
          onClick={() => setShowModal(true)}
          style={{ fontSize: "0.875rem" }}
        >
          + {locale === "fr" ? "Nouvel article" : "New post"}
        </button>

        {showModal && (
          <PostModal
            locale={locale}
            onClose={() => setShowModal(false)}
          />
        )}
      </>
    );
  }

  // ── Mode EDIT ──────────────────────────────────────────────────────────────
  if (!post) return null;

  function handleToggle() {
    if (!post) return;
    const next = post.status === "PUBLISHED" ? "DRAFT" : "PUBLISHED";
    startTransition(async () => { await togglePostStatus(post.id, next); });
  }

  function handleDelete() {
    if (!post) return;
    const msg =
      locale === "fr"
        ? `Supprimer « ${post.titleFr} » ? Cette action est irréversible.`
        : `Delete "${post.titleEn}"? This cannot be undone.`;
    if (!window.confirm(msg)) return;
    startTransition(async () => { await deletePost(post.id); });
  }

  return (
    <>
      <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
        {/* Modifier */}
        <button
          className="btn-secondary"
          onClick={() => setShowModal(true)}
          disabled={pending}
          style={{ fontSize: "0.8rem", padding: "0.35rem 0.75rem" }}
        >
          {locale === "fr" ? "Modifier" : "Edit"}
        </button>

        {/* Publier / Dépublier */}
        <button
          className="btn-secondary"
          onClick={handleToggle}
          disabled={pending}
          style={{
            fontSize: "0.8rem", padding: "0.35rem 0.75rem",
            color: post.status === "PUBLISHED" ? "var(--color-citadelle-text-muted)" : "#22c55e",
            borderColor: post.status === "PUBLISHED" ? undefined : "#22c55e",
          }}
        >
          {post.status === "PUBLISHED"
            ? (locale === "fr" ? "Dépublier" : "Unpublish")
            : (locale === "fr" ? "Publier" : "Publish")}
        </button>

        {/* Supprimer */}
        <button
          onClick={handleDelete}
          disabled={pending}
          style={{
            fontSize: "0.8rem", padding: "0.35rem 0.75rem",
            background: "none",
            border: "1px solid #ef4444",
            borderRadius: "var(--radius-sm)",
            color: "#ef4444",
            cursor: "pointer",
          }}
        >
          {locale === "fr" ? "Supprimer" : "Delete"}
        </button>
      </div>

      {showModal && (
        <PostModal
          post={post}
          locale={locale}
          onClose={() => setShowModal(false)}
        />
      )}
    </>
  );
}
