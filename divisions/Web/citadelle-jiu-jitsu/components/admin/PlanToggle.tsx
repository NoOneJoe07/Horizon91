"use client";
// Toggle activer/désactiver un forfait

import { useTransition } from "react";
import { togglePlanActive } from "@/app/actions/admin";

export function PlanToggle({ id, active, locale }: { id: string; active: boolean; locale: string }) {
  const [pending, startTransition] = useTransition();

  return (
    <button
      className="btn-secondary"
      style={{ fontSize: "0.8rem", padding: "0.35rem 0.85rem", whiteSpace: "nowrap" }}
      disabled={pending}
      onClick={() => startTransition(async () => { await togglePlanActive(id, !active); })}
    >
      {active
        ? (locale === "fr" ? "Désactiver" : "Disable")
        : (locale === "fr" ? "Activer"    : "Enable")}
    </button>
  );
}
