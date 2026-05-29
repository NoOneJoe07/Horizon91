// =============================================================================
// WaiverForm.tsx — Formulaire de signature de décharge (client component)
// -----------------------------------------------------------------------------
// Champs : nom, date de naissance, adresse, mineur (toggle), tuteur si mineur,
//          consentement photos (radio), signature tapée.
// Soumission → POST /api/waiver → feedback visuel succès/erreur.
// =============================================================================

"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

interface WaiverFormProps {
  locale: string;
}

type FormStatus = "idle" | "submitting" | "success" | "error";

export default function WaiverForm({ locale }: WaiverFormProps) {
  const t = useTranslations("Waiver");
  const [status, setStatus]       = useState<FormStatus>("idle");
  const [errorMsg, setErrorMsg]   = useState<string | null>(null);
  const [isMinor, setIsMinor]     = useState(false);

  if (status === "success") {
    return (
      <div
        className="card"
        style={{ textAlign: "center", padding: "2.5rem" }}
        role="alert"
        aria-live="polite"
      >
        <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>✅</div>
        <p style={{ color: "var(--color-citadelle-success, #22c55e)", fontSize: "1.1rem" }}>
          {t("success")}
        </p>
      </div>
    );
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setErrorMsg(null);

    const fd = new FormData(e.currentTarget);
    const payload = {
      participantName: fd.get("participantName") as string,
      birthDate:       fd.get("birthDate") as string,
      address:         fd.get("address") as string,
      isMinor:         isMinor,
      guardianName:    isMinor ? (fd.get("guardianName") as string) : undefined,
      photoConsent:    fd.get("photoConsent") === "yes",
      signatureName:   fd.get("signatureName") as string,
    };

    try {
      const res = await fetch("/api/waiver", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify(payload),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error ?? t("error"));
      }

      setStatus("success");
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : t("error"));
    }
  }

  const inputStyle: React.CSSProperties = {
    width:           "100%",
    padding:         "0.65rem 0.875rem",
    background:      "var(--color-citadelle-surface)",
    border:          "1px solid var(--color-citadelle-border)",
    borderRadius:    "var(--radius-sm)",
    color:           "var(--color-citadelle-text)",
    fontSize:        "0.95rem",
  };

  const labelStyle: React.CSSProperties = {
    display:      "block",
    marginBottom: "0.35rem",
    fontSize:     "0.875rem",
    fontWeight:   600,
    color:        "var(--color-citadelle-text-muted)",
    textTransform: "uppercase",
    letterSpacing: "0.04em",
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="card"
      style={{ display: "grid", gap: "1.25rem", padding: "2rem" }}
      noValidate
    >
      {/* Nom du participant */}
      <div>
        <label style={labelStyle} htmlFor="w-name">{t("fields.participantName")} *</label>
        <input
          id="w-name"
          name="participantName"
          type="text"
          required
          style={inputStyle}
          autoComplete="name"
          placeholder={locale === "fr" ? "Jean Tremblay" : "John Smith"}
        />
      </div>

      {/* Date de naissance */}
      <div>
        <label style={labelStyle} htmlFor="w-birthdate">{t("fields.birthDate")} *</label>
        <input
          id="w-birthdate"
          name="birthDate"
          type="date"
          required
          style={inputStyle}
        />
      </div>

      {/* Adresse */}
      <div>
        <label style={labelStyle} htmlFor="w-address">{t("fields.address")} *</label>
        <input
          id="w-address"
          name="address"
          type="text"
          required
          style={inputStyle}
          autoComplete="street-address"
          placeholder={locale === "fr" ? "123 Rue Principale, Québec, QC G1A 1A1" : "123 Main St, Québec, QC G1A 1A1"}
        />
      </div>

      {/* Mineur */}
      <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
        <input
          id="w-minor"
          type="checkbox"
          checked={isMinor}
          onChange={(e) => setIsMinor(e.target.checked)}
          style={{ width: "1.1rem", height: "1.1rem", accentColor: "var(--color-citadelle-gold)", cursor: "pointer" }}
        />
        <label htmlFor="w-minor" style={{ fontSize: "0.9rem", cursor: "pointer" }}>
          {t("fields.isMinor")}
        </label>
      </div>

      {/* Nom tuteur — visible si mineur */}
      {isMinor && (
        <div>
          <label style={labelStyle} htmlFor="w-guardian">{t("fields.guardianName")} *</label>
          <input
            id="w-guardian"
            name="guardianName"
            type="text"
            required={isMinor}
            style={inputStyle}
            placeholder={locale === "fr" ? "Marie Tremblay (mère)" : "Marie Smith (mother)"}
          />
        </div>
      )}

      {/* Consentement photos */}
      <fieldset style={{ border: "1px solid var(--color-citadelle-border)", borderRadius: "var(--radius-sm)", padding: "1rem" }}>
        <legend style={{ ...labelStyle, padding: "0 0.5rem" }}>
          {t("fields.photoConsentLabel")} *
        </legend>
        <div style={{ display: "grid", gap: "0.6rem" }}>
          <label style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem", cursor: "pointer", fontSize: "0.9rem" }}>
            <input
              type="radio"
              name="photoConsent"
              value="yes"
              required
              style={{ marginTop: "0.2rem", accentColor: "var(--color-citadelle-gold)" }}
            />
            {t("fields.photoConsentYes")}
          </label>
          <label style={{ display: "flex", alignItems: "center", gap: "0.75rem", cursor: "pointer", fontSize: "0.9rem" }}>
            <input
              type="radio"
              name="photoConsent"
              value="no"
              style={{ accentColor: "var(--color-citadelle-gold)" }}
            />
            {t("fields.photoConsentNo")}
          </label>
        </div>
      </fieldset>

      {/* Signature */}
      <div>
        <label style={labelStyle} htmlFor="w-signature">{t("fields.signatureName")} *</label>
        <input
          id="w-signature"
          name="signatureName"
          type="text"
          required
          style={{ ...inputStyle, fontStyle: "italic", fontSize: "1.05rem" }}
          placeholder={locale === "fr" ? "Jean Tremblay" : "John Smith"}
          autoComplete="off"
        />
        <p style={{ marginTop: "0.4rem", fontSize: "0.8rem", color: "var(--color-citadelle-text-muted)" }}>
          {t("fields.signatureHint")}
        </p>
      </div>

      {/* Message d'erreur */}
      {status === "error" && errorMsg && (
        <p
          role="alert"
          style={{
            color:        "#ef4444",
            fontSize:     "0.875rem",
            padding:      "0.75rem 1rem",
            background:   "rgba(239,68,68,0.08)",
            borderRadius: "var(--radius-sm)",
            border:       "1px solid rgba(239,68,68,0.3)",
          }}
        >
          {errorMsg}
        </p>
      )}

      {/* Bouton soumettre */}
      <button
        type="submit"
        disabled={status === "submitting"}
        className="btn-primary"
        style={{ marginTop: "0.5rem", width: "100%" }}
      >
        {status === "submitting" ? t("submitting") : t("submit")}
      </button>
    </form>
  );
}
