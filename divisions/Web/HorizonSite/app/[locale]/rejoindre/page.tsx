"use client";

import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";

type Status = "idle" | "loading" | "success" | "error";

export default function RejoindrePage() {
  const t = useTranslations("rejoindre");
  const locale = useLocale();

  const [nom, setNom] = useState("");
  const [courriel, setCourriel] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nom, courriel, message, locale }),
      });

      const data = await res.json();

      if (res.ok) {
        setStatus("success");
        setNom("");
        setCourriel("");
        setMessage("");
      } else {
        setStatus("error");
        setErrorMsg(data.error ?? t("error_generic"));
      }
    } catch {
      setStatus("error");
      setErrorMsg(t("error_generic"));
    }
  };

  return (
    <main className="max-w-2xl mx-auto px-6 py-20">
      <h1 className="text-5xl font-bold text-h91-stellar text-center mb-4">
        {t("title")}
      </h1>
      <p className="text-center text-h91-stellar/60 mb-12 text-lg">
        {t("description")}
      </p>

      {status === "success" ? (
        <div className="text-center p-10 border border-h91-accretion/40 rounded-xl bg-h91-gravity/50">
          <p className="text-3xl mb-4">✅</p>
          <p className="text-h91-stellar text-xl font-semibold">{t("success_title")}</p>
          <p className="text-h91-stellar/60 mt-2">{t("success_desc")}</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          {/* Nom */}
          <div className="flex flex-col gap-2">
            <label className="text-h91-stellar/80 text-sm font-semibold">
              {t("label_nom")} *
            </label>
            <input
              type="text"
              value={nom}
              onChange={(e) => setNom(e.target.value)}
              required
              minLength={2}
              placeholder={t("placeholder_nom")}
              className="bg-h91-gravity/80 border border-h91-accretion/30 rounded-lg px-4 py-3 text-h91-stellar placeholder-h91-stellar/30 focus:outline-none focus:border-h91-accretion transition"
            />
          </div>

          {/* Courriel */}
          <div className="flex flex-col gap-2">
            <label className="text-h91-stellar/80 text-sm font-semibold">
              {t("label_courriel")} *
            </label>
            <input
              type="email"
              value={courriel}
              onChange={(e) => setCourriel(e.target.value)}
              required
              placeholder={t("placeholder_courriel")}
              className="bg-h91-gravity/80 border border-h91-accretion/30 rounded-lg px-4 py-3 text-h91-stellar placeholder-h91-stellar/30 focus:outline-none focus:border-h91-accretion transition"
            />
          </div>

          {/* Message */}
          <div className="flex flex-col gap-2">
            <label className="text-h91-stellar/80 text-sm font-semibold">
              {t("label_message")} *
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              minLength={10}
              rows={6}
              placeholder={t("placeholder_message")}
              className="bg-h91-gravity/80 border border-h91-accretion/30 rounded-lg px-4 py-3 text-h91-stellar placeholder-h91-stellar/30 focus:outline-none focus:border-h91-accretion transition resize-none"
            />
          </div>

          {/* Erreur */}
          {status === "error" && (
            <p className="text-red-400 text-sm">{errorMsg}</p>
          )}

          {/* Bouton */}
          <button
            type="submit"
            disabled={status === "loading"}
            className="px-8 py-4 bg-h91-accretion text-h91-gravity font-bold rounded-lg text-lg hover:bg-h91-fusion transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {status === "loading" ? t("sending") : t("cta")}
          </button>
        </form>
      )}

      {/* Infos de contact */}
      <div className="mt-16 pt-10 border-t border-h91-accretion/20 grid grid-cols-1 md:grid-cols-3 gap-6 text-center text-h91-stellar/60 text-sm">
        <div>
          <p className="text-h91-stellar/40 text-xs uppercase tracking-widest mb-1">{t("phone_label")}</p>
          <p>{t("phone")}</p>
        </div>
        <div>
          <p className="text-h91-stellar/40 text-xs uppercase tracking-widest mb-1">{t("email_label")}</p>
          <p>{t("email")}</p>
        </div>
        <div>
          <p className="text-h91-stellar/40 text-xs uppercase tracking-widest mb-1">{t("address_label")}</p>
          <p>{t("address")}</p>
        </div>
      </div>
    </main>
  );
}
