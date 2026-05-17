"use client";
// =============================================================================
// components/admin/TrialActions.tsx — Boutons de statut séances d'essai
// =============================================================================

import { useTransition } from "react";
import { updateTrialStatus } from "@/app/actions/admin";
import type { TrialStatus } from "@prisma/client";

interface Props {
  id: string;
  status: TrialStatus;
  locale: string;
}

const TRANSITIONS: Record<TrialStatus, { next: TrialStatus; labelFr: string; labelEn: string }[]> = {
  PENDING:   [
    { next: "CONFIRMED", labelFr: "Confirmer",    labelEn: "Confirm" },
    { next: "CANCELED",  labelFr: "Annuler",      labelEn: "Cancel" },
  ],
  CONFIRMED: [
    { next: "ATTENDED",  labelFr: "Présent ✓",    labelEn: "Attended ✓" },
    { next: "NO_SHOW",   labelFr: "No-show",      labelEn: "No-show" },
    { next: "CANCELED",  labelFr: "Annuler",      labelEn: "Cancel" },
  ],
  ATTENDED:  [],
  NO_SHOW:   [],
  CANCELED:  [],
};

const STATUS_COLOR: Record<TrialStatus, string> = {
  PENDING:   "var(--color-citadelle-gold)",
  CONFIRMED: "#22c55e",
  ATTENDED:  "#6b7280",
  NO_SHOW:   "#ef4444",
  CANCELED:  "#6b7280",
};

export function TrialActions({ id, status, locale }: Props) {
  const [pending, startTransition] = useTransition();
  const actions = TRANSITIONS[status];

  return (
    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", flexWrap: "wrap" }}>
      {/* Badge statut */}
      <span
        style={{
          padding: "0.2rem 0.6rem",
          borderRadius: "var(--radius-sm)",
          fontSize: "0.7rem",
          fontWeight: 700,
          color: STATUS_COLOR[status],
          border: `1px solid ${STATUS_COLOR[status]}`,
          textTransform: "uppercase",
          letterSpacing: "0.05em",
        }}
      >
        {status}
      </span>

      {/* Boutons de transition */}
      {actions.map((action) => (
        <button
          key={action.next}
          disabled={pending}
          className="btn-secondary"
          style={{ fontSize: "0.75rem", padding: "0.3rem 0.65rem" }}
          onClick={() =>
            startTransition(async () => {
              await updateTrialStatus(id, action.next);
            })
          }
        >
          {locale === "fr" ? action.labelFr : action.labelEn}
        </button>
      ))}
    </div>
  );
}
