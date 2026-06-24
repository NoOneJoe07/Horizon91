"use client";

// =============================================================================
// ContactForm.tsx — Composant Client
// -----------------------------------------------------------------------------
// RÔLE :
//   Formulaire de contact général du site Citadelle Jiu-Jitsu.
//   Permet à n'importe quel visiteur (connecté ou non) d'envoyer un message
//   au propriétaire du dojo. Le message est sauvegardé en BD et pourra
//   éventuellement être envoyé par courriel via Resend (TODO futur).
//
// ARCHITECTURE :
//   Ce composant est délibérément inspiré de TrialForm.tsx pour maintenir
//   une cohérence dans la base de code. Même pattern :
//     useState pour gérer le cycle de vie (idle → submitting → success/error)
//     fetch() POST vers l'API route → réponse JSON → feedback visuel
//
// DIFFÉRENCE AVEC TrialForm :
//   - Pas de champs date/âge/expérience (contact général, pas réservation)
//   - Champ "Sujet" pour catégoriser les messages côté admin
//   - Pas de liaison à un userId (contact anonyme possible et attendu)
//
// ANTI-SPAM :
//   Honeypot "website" — champ caché visuellement.
//   Les bots remplissent tous les champs → si "website" est rempli,
//   l'API retourne 200 sans rien faire (on ne dit pas au bot qu'il est détecté).
//
// TRADUCTIONS :
//   Clés dans messages/fr.json et messages/en.json → namespace "Contact.form"
//   Ex : t("name") → "Nom complet" (FR) ou "Full name" (EN)
//
// AUTEUR    : Horizon 91 — Jonathan Patoine + Claude (Anthropic)
// CRÉÉ      : 2026-05-04
// DÉPENDANCES : react (useState), next-intl (useTranslations), /api/contact
// =============================================================================

import { useState } from "react";
import { useTranslations } from "next-intl";

// ---------------------------------------------------------------------------
// Props
// ---------------------------------------------------------------------------
interface ContactFormProps {
  /** Code de langue actif ("fr" | "en") — nécessaire pour l'API et les messages. */
  locale: string;
}

// ---------------------------------------------------------------------------
// Types d'état du formulaire
// ---------------------------------------------------------------------------
// "idle"       → état initial, formulaire vide et prêt
// "submitting" → requête API en cours, bouton désactivé
// "success"    → message envoyé, afficher confirmation
// "error"      → erreur API ou réseau, afficher message d'erreur
type FormStatus = "idle" | "submitting" | "success" | "error";

// ---------------------------------------------------------------------------
// Composant principal
// ---------------------------------------------------------------------------
export function ContactForm({ locale }: ContactFormProps) {
  // Accès aux traductions via le namespace "Contact.form"
  // Ex: t("name") → "Nom complet" en FR, "Full name" en EN
  const t = useTranslations("Contact.form");

  // État du cycle de vie du formulaire
  const [status, setStatus] = useState<FormStatus>("idle");

  // Message d'erreur spécifique à afficher sous le formulaire
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // ---------------------------------------------------------------------------
  // Handler de soumission
  // ---------------------------------------------------------------------------
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    // Empêche le comportement par défaut du navigateur (rechargement de page)
    e.preventDefault();
    setStatus("submitting");
    setErrorMsg(null);

    // FormData lit automatiquement tous les champs <input name="..."> du <form>
    // Object.fromEntries() convertit en objet JS plat : { name: "...", email: "..." }
    const formData = new FormData(e.currentTarget);
    const payload = Object.fromEntries(formData.entries());

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // On inclut la locale pour que l'API puisse adapter ses réponses d'erreur
        body: JSON.stringify({ ...payload, locale }),
      });

      if (!res.ok) {
        // L'API a répondu avec un statut HTTP d'erreur (400, 500...)
        const body = await res.json().catch(() => ({}));
        // Si Zod a rejeté un champ précis (ex: "Message trop court"), on
        // affiche CE message plutôt que le générique "Données invalides" —
        // beaucoup plus utile pour comprendre quoi corriger.
        const fieldErrors = body.details?.fieldErrors as
          | Record<string, string[]>
          | undefined;
        const firstFieldError = fieldErrors
          ? Object.values(fieldErrors).flat()[0]
          : undefined;
        throw new Error(firstFieldError ?? body.error ?? "Erreur serveur");
      }

      // Succès : réinitialiser le formulaire et afficher la confirmation
      setStatus("success");
      (e.target as HTMLFormElement).reset();

    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Erreur inconnue");
    }
  }

  // ---------------------------------------------------------------------------
  // Rendu — État succès : remplace le formulaire par un message de confirmation
  // ---------------------------------------------------------------------------
  // On cache le formulaire entier après soumission réussie pour éviter
  // un double-envoi accidentel. L'utilisateur voit la confirmation clairement.
  if (status === "success") {
    return (
      <div
        className="card"
        style={{ textAlign: "center", padding: "2.5rem" }}
        role="alert"
        aria-live="polite"
      >
        {/* Coche de succès */}
        <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>✓</div>
        <p style={{ color: "var(--color-citadelle-success)", fontSize: "1.1rem" }}>
          {t("success")}
        </p>
      </div>
    );
  }

  // ---------------------------------------------------------------------------
  // Rendu — Formulaire principal
  // ---------------------------------------------------------------------------
  return (
    <form
      onSubmit={handleSubmit}
      className="card"
      style={{ display: "grid", gap: "1rem", padding: "2rem" }}
      // noValidate : on désactive la validation HTML native pour utiliser
      // notre propre validation Zod côté serveur. Sinon les messages
      // d'erreur du navigateur entrent en conflit avec les nôtres.
      noValidate
    >
      {/* ── Honeypot anti-spam ─────────────────────────────────────────────
          Champ invisible pour les humains (position absolute hors écran),
          mais visible pour les robots qui remplissent automatiquement les forms.
          Si ce champ contient quoi que ce soit à la soumission → spam détecté.
          tabIndex={-1} : exclu de la navigation clavier (accessibilité).
          aria-hidden : ignoré par les lecteurs d'écran. */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        // display:none (plutôt qu'un positionnement hors-écran) : un champ
        // réellement absent du rendu est beaucoup moins susceptible d'être
        // ciblé par l'autofill du navigateur ou un gestionnaire de mots de
        // passe, qui peuvent autrement injecter une valeur dans un champ
        // simplement déplacé hors-écran et faire échouer un vrai visiteur.
        style={{ display: "none" }}
        aria-hidden
      />

      {/* ── Nom complet ─────────────────────────────────────────────────── */}
      <div>
        <label className="label" htmlFor="contact-name">
          {t("name")}
        </label>
        <input
          id="contact-name"
          name="name"
          type="text"
          required
          className="input"
          autoComplete="name"
          placeholder={locale === "fr" ? "Jean Tremblay" : "John Smith"}
        />
      </div>

      {/* ── Courriel ────────────────────────────────────────────────────── */}
      <div>
        <label className="label" htmlFor="contact-email">
          {t("email")}
        </label>
        <input
          id="contact-email"
          name="email"
          type="email"
          required
          className="input"
          autoComplete="email"
          placeholder="jean@exemple.com"
        />
      </div>

      {/* ── Sujet ───────────────────────────────────────────────────────── */}
      {/* Le sujet aide le proprio à trier ses messages dans le panel admin.
          Ex: "Question sur les horaires", "Groupe scolaire", "Partenariat", etc. */}
      <div>
        <label className="label" htmlFor="contact-subject">
          {t("subject")}
        </label>
        <input
          id="contact-subject"
          name="subject"
          type="text"
          required
          className="input"
          placeholder={
            locale === "fr"
              ? "Question sur les horaires, cours privés..."
              : "Question about schedule, private lessons..."
          }
        />
      </div>

      {/* ── Message ─────────────────────────────────────────────────────── */}
      <div>
        <label className="label" htmlFor="contact-message">
          {t("message")}
        </label>
        <textarea
          id="contact-message"
          name="message"
          rows={5}
          required
          className="input"
          // min 10 caractères côté serveur (validation Zod) — pas de min HTML
          // pour éviter les conflits de validation UI
        />
      </div>

      {/* ── Bouton de soumission ─────────────────────────────────────────── */}
      <button
        type="submit"
        className="btn-primary"
        disabled={status === "submitting"}
        style={{ marginTop: "0.5rem" }}
      >
        {/* Texte dynamique selon l'état */}
        {status === "submitting"
          ? locale === "fr" ? "Envoi en cours…" : "Sending…"
          : t("submit")}
      </button>

      {/* ── Message d'erreur ─────────────────────────────────────────────── */}
      {/* Visible uniquement en cas d'erreur réseau ou serveur */}
      {status === "error" && (
        <p
          role="alert"
          style={{
            color: "var(--color-citadelle-danger)",
            fontSize: "0.875rem",
            textAlign: "center",
          }}
        >
          {errorMsg ?? t("error")}
        </p>
      )}
    </form>
  );
}
