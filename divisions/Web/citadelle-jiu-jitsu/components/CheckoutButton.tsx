"use client";

// =============================================================================
// CheckoutButton — Client Component
// -----------------------------------------------------------------------------
// Soumet un planId ou productId à /api/checkout, récupère l'URL Stripe en JSON,
// puis redirige le navigateur vers la page de paiement Stripe.
// Approche JSON + window.location.href = plus fiable qu'un redirect serveur 303.
// =============================================================================

import { useState } from "react";

interface CheckoutButtonProps {
  planId?: string;
  productId?: string;
  locale: string;
  label: string;
  className?: string;
}

export function CheckoutButton({
  planId,
  productId,
  locale,
  label,
  className = "btn-primary",
}: CheckoutButtonProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleClick() {
    setLoading(true);
    setError(null);

    const body = new FormData();
    if (planId)     body.append("planId", planId);
    if (productId)  body.append("productId", productId);
    body.append("locale", locale);

    try {
      const res = await fetch("/api/checkout", { method: "POST", body });
      const data = await res.json();

      if (!res.ok || !data.url) {
        setError(data.error ?? "Erreur lors de la création du paiement.");
        setLoading(false);
        return;
      }

      // Redirection vers la page de paiement Stripe (hors app Next.js)
      window.location.href = data.url;
    } catch {
      setError("Erreur réseau. Veuillez réessayer.");
      setLoading(false);
    }
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
      <button
        type="button"
        onClick={handleClick}
        disabled={loading}
        className={className}
        style={{ width: "100%", opacity: loading ? 0.7 : 1, cursor: loading ? "wait" : "pointer" }}
      >
        {loading ? "Redirection…" : label}
      </button>

      {error && (
        <p style={{ fontSize: "0.8rem", color: "var(--color-citadelle-danger)", textAlign: "center" }}>
          {error}
        </p>
      )}
    </div>
  );
}
