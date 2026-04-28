"use client";

// =============================================================================
// Formulaires d'authentification (login + register)
// =============================================================================

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

interface AuthFormProps {
  mode: "login" | "register";
  locale: string;
}

export function AuthForm({ mode, locale }: AuthFormProps) {
  const t = useTranslations(mode === "login" ? "Auth.login" : "Auth.register");
  const router = useRouter();
  const [status, setStatus] = useState<"idle" | "submitting" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setErrorMsg(null);

    const formData = new FormData(e.currentTarget);
    const payload = Object.fromEntries(formData.entries());

    try {
      const endpoint = mode === "login" ? "/api/auth/login" : "/api/auth/register";
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error ?? t("error"));
      }

      const data = await res.json();
      // Redirige vers admin si admin, sinon home
      const target =
        data.role === "ADMIN" ? `/${locale}/admin` : `/${locale}`;
      router.push(target);
      router.refresh();
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : t("error"));
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="card"
      style={{ display: "grid", gap: "1rem", padding: "2rem" }}
    >
      {mode === "register" && (
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
      )}

      <div>
        <label className="label" htmlFor="email">{t("email")}</label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          className="input"
        />
      </div>

      <div>
        <label className="label" htmlFor="password">{t("password")}</label>
        <input
          id="password"
          name="password"
          type="password"
          required
          minLength={mode === "register" ? 10 : 1}
          autoComplete={mode === "login" ? "current-password" : "new-password"}
          className="input"
        />
      </div>

      {mode === "register" && (
        <div>
          <label className="label" htmlFor="confirmPassword">{t("confirmPassword")}</label>
          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            required
            autoComplete="new-password"
            className="input"
          />
        </div>
      )}

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
          {errorMsg}
        </p>
      )}
    </form>
  );
}
