// =============================================================================
// app/[locale]/mon-compte/page.tsx — Espace membre
// -----------------------------------------------------------------------------
// Accessible uniquement aux utilisateurs connectés.
// Affiche : profil, abonnement actif, historique de commandes.
// =============================================================================

import { redirect } from "next/navigation";
import Link from "next/link";
import { setRequestLocale } from "next-intl/server";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/db";
import type { Locale } from "@/lib/locales";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: locale === "fr" ? "Mon compte" : "My Account",
  };
}

// ---------------------------------------------------------------------------
// Helpers d'affichage
// ---------------------------------------------------------------------------
function StatusBadge({ status, locale }: { status: string; locale: string }) {
  const map: Record<string, { label: Record<string, string>; color: string; bg: string }> = {
    PAID:          { label: { fr: "Payée",      en: "Paid"        }, color: "#22c55e", bg: "rgba(34,197,94,0.12)"   },
    READY_PICKUP:  { label: { fr: "Prête",       en: "Ready"       }, color: "#3b82f6", bg: "rgba(59,130,246,0.12)" },
    DELIVERED:     { label: { fr: "Livrée",      en: "Delivered"   }, color: "#a855f7", bg: "rgba(168,85,247,0.12)" },
    CANCELED:      { label: { fr: "Annulée",     en: "Canceled"    }, color: "#ef4444", bg: "rgba(239,68,68,0.12)"  },
    ACTIVE:        { label: { fr: "Actif",        en: "Active"      }, color: "#22c55e", bg: "rgba(34,197,94,0.12)"  },
    PAST_DUE:      { label: { fr: "En retard",   en: "Past due"    }, color: "#f59e0b", bg: "rgba(245,158,11,0.12)" },
    CANCELED_SUB:  { label: { fr: "Résilié",     en: "Canceled"    }, color: "#ef4444", bg: "rgba(239,68,68,0.12)"  },
  };
  const key = status === "CANCELED" && !map[status] ? "CANCELED_SUB" : status;
  const cfg = map[key] ?? { label: { fr: status, en: status }, color: "var(--color-citadelle-text-muted)", bg: "var(--color-citadelle-surface-2)" };
  return (
    <span style={{
      fontSize: "0.7rem", fontWeight: 700, textTransform: "uppercase",
      padding: "0.15rem 0.5rem", borderRadius: "var(--radius-sm)",
      color: cfg.color, background: cfg.bg,
    }}>
      {cfg.label[locale as "fr" | "en"] ?? status}
    </span>
  );
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------
export default async function MonComptePage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const session = await getSession();
  if (!session) {
    redirect(`/${locale}/connexion?redirect=/${locale}/mon-compte`);
  }

  const fr = locale === "fr";

  // Données utilisateur
  const user = await prisma.user.findUnique({
    where: { id: session.userId },
    select: {
      id: true, firstName: true, lastName: true, email: true,
      createdAt: true,
      subscriptions: {
        orderBy: { createdAt: "desc" },
        take: 1,
        include: { plan: { select: { nameFr: true, nameEn: true, interval: true, priceCents: true } } },
      },
      orders: {
        orderBy: { createdAt: "desc" },
        include: {
          items: {
            include: { product: { select: { nameFr: true, nameEn: true } } },
          },
        },
      },
      waivers: {
        orderBy: { signedAt: "desc" },
        take: 1,
        select: { signedAt: true },
      },
    },
  });

  if (!user) redirect(`/${locale}/connexion`);

  const activeSub = user.subscriptions[0] ?? null;
  const memberSince = user.createdAt.toLocaleDateString(
    fr ? "fr-CA" : "en-CA",
    { year: "numeric", month: "long", day: "numeric" }
  );

  const sectionTitle: React.CSSProperties = {
    fontSize: "0.7rem", fontWeight: 700, textTransform: "uppercase",
    letterSpacing: "0.1em", color: "var(--color-citadelle-text-muted)",
    marginBottom: "1rem",
  };

  return (
    <section className="section">
      <div className="container-citadelle" style={{ maxWidth: "760px" }}>

        {/* En-tête */}
        <header style={{ marginBottom: "2.5rem" }}>
          <p style={{ color: "var(--color-citadelle-gold)", fontSize: "0.78rem", textTransform: "uppercase", letterSpacing: "0.15em", marginBottom: "0.5rem" }}>
            {fr ? "Espace membre" : "Member area"}
          </p>
          <h1 style={{ fontSize: "clamp(1.75rem, 4vw, 2.5rem)", fontWeight: 800 }}>
            {fr ? `Bonjour, ${user.firstName} !` : `Hello, ${user.firstName}!`}
          </h1>
          <p style={{ color: "var(--color-citadelle-text-muted)", fontSize: "0.875rem", marginTop: "0.4rem" }}>
            {fr ? `Membre depuis ${memberSince}` : `Member since ${memberSince}`}
          </p>
        </header>

        <div style={{ display: "grid", gap: "1.5rem" }}>

          {/* ── Abonnement actif ─────────────────────────────────────────── */}
          <div className="card">
            <p style={sectionTitle}>{fr ? "Abonnement" : "Subscription"}</p>
            {activeSub ? (
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
                <div>
                  <p style={{ fontWeight: 600, marginBottom: "0.25rem" }}>
                    {fr ? activeSub.plan.nameFr : activeSub.plan.nameEn}
                  </p>
                  <p style={{ fontSize: "0.875rem", color: "var(--color-citadelle-text-muted)" }}>
                    {(activeSub.plan.priceCents / 100).toLocaleString(fr ? "fr-CA" : "en-CA", { style: "currency", currency: "CAD" })}
                    {activeSub.plan.interval === "MONTH" ? (fr ? " / mois" : " / month") :
                     activeSub.plan.interval === "YEAR"  ? (fr ? " / an"   : " / year")  : ""}
                    {activeSub.currentPeriodEnd && (
                      <span style={{ marginLeft: "0.75rem" }}>
                        · {fr ? "Renouvellement" : "Renews"}{" "}
                        {new Date(activeSub.currentPeriodEnd).toLocaleDateString(fr ? "fr-CA" : "en-CA")}
                      </span>
                    )}
                  </p>
                </div>
                <StatusBadge status={activeSub.status} locale={locale} />
              </div>
            ) : (
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
                <p style={{ color: "var(--color-citadelle-text-muted)", fontSize: "0.9rem" }}>
                  {fr ? "Aucun abonnement actif." : "No active subscription."}
                </p>
                <Link href={`/${locale}/abonnements`} className="btn-primary" style={{ fontSize: "0.85rem" }}>
                  {fr ? "Voir les forfaits" : "View plans"}
                </Link>
              </div>
            )}
          </div>

          {/* ── Historique commandes ─────────────────────────────────────── */}
          <div className="card">
            <p style={sectionTitle}>{fr ? "Commandes" : "Orders"}</p>
            {user.orders.length === 0 ? (
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
                <p style={{ color: "var(--color-citadelle-text-muted)", fontSize: "0.9rem" }}>
                  {fr ? "Aucune commande pour l'instant." : "No orders yet."}
                </p>
                <Link href={`/${locale}/boutique`} className="btn-secondary" style={{ fontSize: "0.85rem" }}>
                  {fr ? "Visiter la boutique" : "Visit the shop"}
                </Link>
              </div>
            ) : (
              <div style={{ display: "grid", gap: "0.75rem" }}>
                {user.orders.map((order) => {
                  const date = order.createdAt.toLocaleDateString(fr ? "fr-CA" : "en-CA", { year: "numeric", month: "long", day: "numeric" });
                  const total = (order.totalCents / 100).toLocaleString(fr ? "fr-CA" : "en-CA", { style: "currency", currency: "CAD" });
                  return (
                    <div key={order.id} style={{
                      padding: "0.85rem 1rem",
                      background: "var(--color-citadelle-surface-2)",
                      borderRadius: "var(--radius-sm)",
                      border: "1px solid var(--color-citadelle-border)",
                    }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "0.5rem", marginBottom: "0.5rem" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                          <StatusBadge status={order.status} locale={locale} />
                          <span style={{ fontSize: "0.8rem", color: "var(--color-citadelle-text-muted)" }}>{date}</span>
                        </div>
                        <span style={{ fontWeight: 700, color: "var(--color-citadelle-gold)" }}>{total}</span>
                      </div>
                      <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: "0.2rem" }}>
                        {order.items.map((item) => (
                          <li key={item.id} style={{ fontSize: "0.85rem", color: "var(--color-citadelle-text-muted)" }}>
                            {fr ? item.product.nameFr : item.product.nameEn}
                            {item.quantity > 1 && ` × ${item.quantity}`}
                          </li>
                        ))}
                      </ul>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* ── Profil ──────────────────────────────────────────────────── */}
          <div className="card">
            <p style={sectionTitle}>{fr ? "Profil" : "Profile"}</p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
              <div>
                <p style={{ fontSize: "0.75rem", color: "var(--color-citadelle-text-muted)", marginBottom: "0.2rem" }}>
                  {fr ? "Prénom" : "First name"}
                </p>
                <p style={{ fontWeight: 500 }}>{user.firstName}</p>
              </div>
              <div>
                <p style={{ fontSize: "0.75rem", color: "var(--color-citadelle-text-muted)", marginBottom: "0.2rem" }}>
                  {fr ? "Nom" : "Last name"}
                </p>
                <p style={{ fontWeight: 500 }}>{user.lastName}</p>
              </div>
              <div style={{ gridColumn: "span 2" }}>
                <p style={{ fontSize: "0.75rem", color: "var(--color-citadelle-text-muted)", marginBottom: "0.2rem" }}>
                  {fr ? "Courriel" : "Email"}
                </p>
                <p style={{ fontWeight: 500 }}>{user.email}</p>
              </div>
            </div>
            <p style={{ marginTop: "1rem", fontSize: "0.8rem", color: "var(--color-citadelle-text-muted)" }}>
              {fr
                ? "Pour modifier tes informations ou ton mot de passe, contacte-nous."
                : "To update your information or password, contact us."}
            </p>
          </div>

          {/* ── Décharge de responsabilité ──────────────────────────────── */}
          <div className="card">
            <p style={sectionTitle}>{fr ? "Décharge de responsabilité" : "Liability Waiver"}</p>
            {user.waivers.length > 0 ? (
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                  <span style={{ fontSize: "1.4rem" }}>✅</span>
                  <div>
                    <p style={{ fontWeight: 600, fontSize: "0.9rem" }}>
                      {fr ? "Décharge signée" : "Waiver signed"}
                    </p>
                    <p style={{ fontSize: "0.8rem", color: "var(--color-citadelle-text-muted)" }}>
                      {user.waivers[0].signedAt.toLocaleDateString(fr ? "fr-CA" : "en-CA", {
                        year: "numeric", month: "long", day: "numeric",
                      })}
                    </p>
                  </div>
                </div>
                <Link href={`/${locale}/decharge`} style={{ fontSize: "0.8rem", color: "var(--color-citadelle-gold)" }}>
                  {fr ? "Voir la décharge" : "View waiver"}
                </Link>
              </div>
            ) : (
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
                <div>
                  <p style={{ color: "#f59e0b", fontWeight: 600, fontSize: "0.9rem", marginBottom: "0.2rem" }}>
                    ⚠️ {fr ? "Décharge non signée" : "Waiver not signed"}
                  </p>
                  <p style={{ color: "var(--color-citadelle-text-muted)", fontSize: "0.85rem" }}>
                    {fr
                      ? "Requis pour participer aux cours."
                      : "Required to participate in classes."}
                  </p>
                </div>
                <Link href={`/${locale}/decharge`} className="btn-primary" style={{ fontSize: "0.85rem" }}>
                  {fr ? "Signer la décharge" : "Sign the waiver"}
                </Link>
              </div>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}
