"use client";
// =============================================================================
// components/admin/OrderActions.tsx — Boutons de statut commandes
// =============================================================================

import { useTransition } from "react";
import { updateOrderStatus } from "@/app/actions/admin";
import type { OrderStatus } from "@prisma/client";

interface Props {
  id: string;
  status: OrderStatus;
  locale: string;
}

const TRANSITIONS: Record<OrderStatus, { next: OrderStatus; labelFr: string; labelEn: string }[]> = {
  PENDING:      [],
  PAID:         [{ next: "READY_PICKUP", labelFr: "Prête à ramasser", labelEn: "Ready for pickup" }],
  READY_PICKUP: [{ next: "DELIVERED",   labelFr: "Remise ✓",          labelEn: "Delivered ✓" }],
  DELIVERED:    [],
  CANCELED:     [],
  REFUNDED:     [],
};

const STATUS_LABEL: Record<OrderStatus, { fr: string; en: string; color: string }> = {
  PENDING:      { fr: "En attente",    en: "Pending",      color: "#6b7280" },
  PAID:         { fr: "Payée",         en: "Paid",         color: "#22c55e" },
  READY_PICKUP: { fr: "À ramasser",    en: "Ready pickup", color: "var(--color-citadelle-gold)" },
  DELIVERED:    { fr: "Remise",        en: "Delivered",    color: "#6b7280" },
  CANCELED:     { fr: "Annulée",       en: "Canceled",     color: "#ef4444" },
  REFUNDED:     { fr: "Remboursée",    en: "Refunded",     color: "#6b7280" },
};

export function OrderActions({ id, status, locale }: Props) {
  const [pending, startTransition] = useTransition();
  const { fr, en, color } = STATUS_LABEL[status];
  const actions = TRANSITIONS[status];

  return (
    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", flexWrap: "wrap" }}>
      <span
        style={{
          padding: "0.2rem 0.6rem",
          borderRadius: "var(--radius-sm)",
          fontSize: "0.7rem",
          fontWeight: 700,
          color,
          border: `1px solid ${color}`,
          textTransform: "uppercase",
          letterSpacing: "0.04em",
        }}
      >
        {locale === "fr" ? fr : en}
      </span>

      {actions.map((action) => (
        <button
          key={action.next}
          disabled={pending}
          className="btn-secondary"
          style={{ fontSize: "0.75rem", padding: "0.3rem 0.65rem" }}
          onClick={() =>
            startTransition(async () => {
              await updateOrderStatus(id, action.next);
            })
          }
        >
          {locale === "fr" ? action.labelFr : action.labelEn}
        </button>
      ))}
    </div>
  );
}
