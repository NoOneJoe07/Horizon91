"use client";

// =============================================================================
// Formulaire de séance d'essai (client component)
// =============================================================================

import { useState } from "react";
import { useTranslations } from "next-intl";

interface TrialFormProps {
  locale: string;
}

export function TrialForm({ locale }: TrialFormProps) {
  const t = useTranslations("Trial.form");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setErrorMsg(null);

    const formData = new FormData(e.currentTarget);
    const payload = Object.fromEntries(formData.entries());

    try {
      const res = await fetch(`/api/trial`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...payload, locale }),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        // Si Zod a rejeté un champ précis, on affiche ce message plutôt que
        // le générique "Données invalides" — beaucoup plus utile pour
        // comprendre quoi corriger.
        const fieldErrors = body.details?.fieldErrors as
          | Record<string, string[]>
          | undefined;
        const firstFieldError = fieldErrors
          ? Object.values(fieldErrors).flat()[0]
          : undefined;
        throw new Error(firstFieldError ?? body.error ?? "Request failed");
      }

      setStatus("success");
      (e.target as HTMLFormElement).reset();
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Unknown error");
    }
  }

  if (status === "success") {
    return (
      <div className="card" style={{ textAlign: "center", padding: "2.5rem" }}>
        <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>✓</div>
        <p style={{ color: "var(--color-citadelle-success)", fontSize: "1.1rem" }}>
          {t("success")}
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="card"
      style={{ display: "grid", gap: "1rem", padding: "2rem" }}
    >
      {/* Honeypot anti-spam — display:none (moins ciblé par l'autofill
          qu'un champ simplement déplacé hors-écran) */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        style={{ display: "none" }}
        aria-hidden
      />

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
        <div>
          <label className="label" htmlFor="firstName">{t("firstName")}</label>
          <input id="firstName" name="firstName" type="text" required className="input" />
        </div>
        <div>
          <label className="label" htmlFor="lastName">{t("lastName")}</label>
          <input id="lastName" name="lastName" type="text" required className="input" />
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
        <div>
          <label className="label" htmlFor="email">{t("email")}</label>
          <input id="email" name="email" type="email" required className="input" />
        </div>
        <div>
          <label className="label" htmlFor="phone">{t("phone")}</label>
          <input id="phone" name="phone" type="tel" required className="input" />
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
        <div>
          <label className="label" htmlFor="age">{t("age")}</label>
          <input id="age" name="age" type="number" min={4} max={99} required className="input" />
        </div>
        <div>
          <label className="label" htmlFor="experience">{t("experience")}</label>
          <select id="experience" name="experience" required className="input">
            <option value="NONE">{t("experienceNone")}</option>
            <option value="SOME">{t("experienceSome")}</option>
            <option value="YEARS">{t("experienceYears")}</option>
          </select>
        </div>
      </div>

      <div>
        <label className="label" htmlFor="preferredDate">{t("preferredDate")}</label>
        <input
          id="preferredDate"
          name="preferredDate"
          type="date"
          min={new Date().toISOString().slice(0, 10)}
          required
          className="input"
        />
      </div>

      <div>
        <label className="label" htmlFor="message">{t("message")}</label>
        <textarea id="message" name="message" rows={4} className="input" />
      </div>

      <button
        type="submit"
        className="btn-primary"
        disabled={status === "submitting"}
        style={{ marginTop: "0.5rem" }}
      >
        {status === "submitting" ? t("submitting") : t("submit")}
      </button>

      {status === "error" && (
        <p style={{ color: "var(--color-citadelle-danger)", fontSize: "0.875rem" }}>
          {errorMsg ?? t("error")}
        </p>
      )}
    </form>
  );
}
