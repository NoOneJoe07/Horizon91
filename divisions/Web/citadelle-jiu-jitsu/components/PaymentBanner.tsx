"use client";

// =============================================================================
// PaymentBanner.tsx — Composant Client
// -----------------------------------------------------------------------------
// RÔLE :
//   Affiche un message visuel de confirmation ou d'annulation après qu'un
//   utilisateur revient de la page de paiement Stripe.
//
// FLUX COMPLET (pour comprendre le contexte) :
//   1. L'utilisateur clique "Choisir ce plan" sur /abonnements
//   2. CheckoutButton.tsx envoie une requête POST à /api/checkout
//   3. /api/checkout crée une session Stripe et retourne { url: "https://checkout.stripe.com/..." }
//   4. Le navigateur redirige vers Stripe (page de paiement externe)
//   5. L'utilisateur paie (ou annule)
//   6. Stripe redirige vers notre site :
//        → Succès  : /fr/abonnements?success=1
//        → Annulé  : /fr/abonnements?canceled=1
//   7. CE COMPOSANT lit ce paramètre d'URL et affiche le bon message
//
// POURQUOI UN CLIENT COMPONENT ("use client") ?
//   Le hook useSearchParams() — qui lit les paramètres d'URL (?success=1) —
//   n'est disponible que côté navigateur (client). Les Server Components Next.js
//   tournent côté serveur (Node.js) et n'ont pas accès à l'URL du navigateur.
//   Dès qu'on utilise useSearchParams, useState ou useEffect, on doit déclarer
//   "use client" en haut du fichier.
//
// POURQUOI <Suspense> dans la page parente ?
//   Next.js App Router impose que tout composant utilisant useSearchParams()
//   soit enveloppé dans <Suspense> dans son parent. Cela permet à Next.js de
//   faire le rendu serveur du reste de la page normalement, puis d'hydrater
//   seulement ce composant côté client quand le navigateur est prêt.
//   Sans <Suspense> → erreur de build.
//
// AUTEUR    : Horizon 91 — Jonathan Patoine + Claude (Anthropic)
// CRÉÉ      : 2026-05-04
// DÉPENDANCES : next/navigation, react
// =============================================================================

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

// ---------------------------------------------------------------------------
// Props du composant
// ---------------------------------------------------------------------------
interface PaymentBannerProps {
  /** Code de langue actif : "fr" ou "en". Transmis depuis le Server Component
   *  parent (page abonnements) via les params de l'URL (route [locale]). */
  locale: string;
}

// ---------------------------------------------------------------------------
// Contenu textuel du banner — centralisé ici pour faciliter les traductions
// ---------------------------------------------------------------------------
// Structure : messages[type][locale] = { title, body }
// Ajouter une langue = ajouter un objet dans chaque type. Simple à maintenir.
const messages = {
  success: {
    fr: {
      title: "Paiement réussi !",
      body: "Bienvenue chez Citadelle Jiu-Jitsu. Votre abonnement est maintenant actif.",
    },
    en: {
      title: "Payment successful!",
      body: "Welcome to Citadelle Jiu-Jitsu. Your subscription is now active.",
    },
  },
  canceled: {
    fr: {
      title: "Paiement annulé",
      body: "Votre paiement n'a pas été complété. Vous pouvez réessayer en tout temps.",
    },
    en: {
      title: "Payment canceled",
      body: "Your payment was not completed. You can try again at any time.",
    },
  },
} as const;

// ---------------------------------------------------------------------------
// Composant principal
// ---------------------------------------------------------------------------
export function PaymentBanner({ locale }: PaymentBannerProps) {
  // useSearchParams() retourne un objet URLSearchParams qui donne accès
  // aux paramètres de l'URL (?success=1, ?canceled=1, etc.)
  const searchParams = useSearchParams();

  // État local : est-ce que le banner est visible ?
  const [visible, setVisible] = useState(false);

  // État local : quel type de message afficher ?
  // null = aucun paramètre trouvé dans l'URL → on ne rend rien
  const [type, setType] = useState<"success" | "canceled" | null>(null);

  // ---------------------------------------------------------------------------
  // useEffect — s'exécute une seule fois après le montage du composant
  // ---------------------------------------------------------------------------
  // useEffect(fn, [deps]) : React appelle fn après le premier rendu, et à
  // chaque fois que les valeurs dans [deps] changent.
  // Ici [searchParams] = on ré-évalue si l'URL change (navigation côté client).
  useEffect(() => {
    if (searchParams.get("success") === "1") {
      setType("success");
      setVisible(true);
    } else if (searchParams.get("canceled") === "1") {
      setType("canceled");
      setVisible(true);
    }

    // Disparition automatique après 8 secondes pour ne pas bloquer la lecture.
    // setTimeout retourne un ID qu'on passe à clearTimeout dans le "cleanup".
    // Le cleanup s'exécute si le composant est démonté avant les 8 secondes
    // (ex : l'utilisateur navigue vers une autre page) → évite une fuite mémoire.
    const timer = setTimeout(() => setVisible(false), 8000);
    return () => clearTimeout(timer); // ← fonction de cleanup de l'effet
  }, [searchParams]);

  // Si aucun paramètre Stripe trouvé → ne rien rendre (null = composant invisible)
  if (!visible || !type) return null;

  const isSuccess = type === "success";

  // Sélectionne le bon contenu selon le type et la langue.
  // Le ?? (nullish coalescing) : si locale n'est ni "fr" ni "en", on tombe sur "fr".
  const msg = messages[type][locale as "fr" | "en"] ?? messages[type]["fr"];

  // ---------------------------------------------------------------------------
  // Rendu JSX du banner
  // ---------------------------------------------------------------------------
  return (
    <div
      // role="alert" : indique aux lecteurs d'écran (accessibilité) que c'est
      // un message important. aria-live="polite" : annonce le contenu sans
      // interrompre brusquement ce que l'utilisateur est en train de lire.
      role="alert"
      aria-live="polite"
      style={{
        display: "flex",
        alignItems: "flex-start",
        gap: "0.75rem",
        padding: "1rem 1.25rem",
        marginBottom: "2rem",
        borderRadius: "var(--radius-md)",
        // Bordure colorée selon le résultat : vert succès, rouge annulation
        border: `1px solid ${
          isSuccess
            ? "var(--color-citadelle-success)"
            : "var(--color-citadelle-danger)"
        }`,
        // Fond légèrement teinté (8% d'opacité = très subtil, ne surcharge pas le design)
        backgroundColor: isSuccess
          ? "rgba(34, 197, 94, 0.08)"
          : "rgba(239, 68, 68, 0.08)",
        // Animation d'entrée définie dans globals.css
        animation: "fadeInDown 0.4s ease",
      }}
    >
      {/* Icône visuelle — aria-hidden="true" car purement décorative.
          Les lecteurs d'écran liront le texte, pas l'emoji. */}
      <span
        style={{ fontSize: "1.5rem", lineHeight: 1, flexShrink: 0, marginTop: "0.1rem" }}
        aria-hidden="true"
      >
        {isSuccess ? "✅" : "❌"}
      </span>

      {/* Bloc texte — flex: 1 pour qu'il prenne tout l'espace disponible */}
      <div style={{ flex: 1 }}>
        <p
          style={{
            fontWeight: 700,
            color: isSuccess
              ? "var(--color-citadelle-success)"
              : "var(--color-citadelle-danger)",
            marginBottom: "0.25rem",
          }}
        >
          {msg.title}
        </p>
        <p style={{ fontSize: "0.9rem", color: "var(--color-citadelle-text-muted)" }}>
          {msg.body}
        </p>
      </div>

      {/* Bouton × pour fermer manuellement le banner avant les 8 secondes.
          onClick déclenche setVisible(false) → React re-rend le composant
          → !visible → return null → composant retiré du DOM. */}
      <button
        onClick={() => setVisible(false)}
        aria-label={locale === "fr" ? "Fermer" : "Close"}
        style={{
          background: "none",
          border: "none",
          cursor: "pointer",
          color: "var(--color-citadelle-text-muted)",
          fontSize: "1.1rem",
          lineHeight: 1,
          padding: "0.1rem 0.25rem",
          flexShrink: 0,
        }}
      >
        ×
      </button>
    </div>
  );
}
