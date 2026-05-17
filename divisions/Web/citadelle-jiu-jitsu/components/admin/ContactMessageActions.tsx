"use client";
// =============================================================================
// components/admin/ContactMessageActions.tsx
// Marquer lu/non-lu + supprimer un message de contact
// =============================================================================

import { useTransition } from "react";
import { markContactRead, deleteContactMessage } from "@/app/actions/admin";

interface Props {
  id: string;
  read: boolean;
  locale: string;
}

export function ContactMessageActions({ id, read, locale }: Props) {
  const [pending, startTransition] = useTransition();

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem", alignItems: "flex-end" }}>
      <button
        className="btn-secondary"
        style={{ fontSize: "0.75rem", padding: "0.3rem 0.65rem", whiteSpace: "nowrap" }}
        disabled={pending}
        onClick={() => startTransition(async () => { await markContactRead(id, !read); })}
      >
        {read
          ? (locale === "fr" ? "Marquer non lu" : "Mark unread")
          : (locale === "fr" ? "Marquer lu ✓"  : "Mark read ✓")}
      </button>
      <button
        style={{
          fontSize: "0.75rem", padding: "0.3rem 0.65rem",
          background: "none", border: "1px solid #ef4444",
          color: "#ef4444", borderRadius: "var(--radius-sm)",
          cursor: "pointer", whiteSpace: "nowrap",
        }}
        disabled={pending}
        onClick={() => {
          if (!confirm(locale === "fr" ? "Supprimer ce message ?" : "Delete this message?")) return;
          startTransition(async () => { await deleteContactMessage(id); });
        }}
      >
        {locale === "fr" ? "Supprimer" : "Delete"}
      </button>
    </div>
  );
}
