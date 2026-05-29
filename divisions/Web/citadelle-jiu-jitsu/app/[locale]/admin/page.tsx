// =============================================================================
// Dashboard admin — vue d'ensemble
// =============================================================================

import { getTranslations, setRequestLocale } from "next-intl/server";
import { prisma } from "@/lib/db";
import type { Locale } from "@/lib/locales";

export default async function AdminDashboardPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "Admin" });

  // Stats agrégées (try/catch pour ne pas planter si BD pas migrée)
  const stats = await getStats();

  return (
    <div>
      <h1 style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>{t("title")}</h1>
      <p style={{ color: "var(--color-citadelle-text-muted)", marginBottom: "2rem" }}>
        {t("welcome")}
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
          gap: "1rem",
        }}
      >
        <StatCard label={t("sections.users")} value={stats.users} />
        <StatCard label={t("sections.products")} value={stats.products} />
        <StatCard label={t("sections.subscriptions")} value={stats.activeSubscriptions} />
        <StatCard label={t("sections.trials")} value={stats.pendingTrials} accent />
        <StatCard label={t("sections.orders")} value={stats.pendingOrders} accent />
      </div>
    </div>
  );
}

async function getStats() {
  try {
    const [users, products, activeSubscriptions, pendingTrials, pendingOrders] =
      await Promise.all([
        prisma.user.count(),
        prisma.product.count(),
        prisma.userSubscription.count({ where: { status: "ACTIVE" } }),
        prisma.trialSession.count({ where: { status: "PENDING" } }),
        prisma.order.count({ where: { status: "PAID" } }),
      ]);
    return { users, products, activeSubscriptions, pendingTrials, pendingOrders };
  } catch {
    return { users: 0, products: 0, activeSubscriptions: 0, pendingTrials: 0, pendingOrders: 0 };
  }
}

function StatCard({ label, value, accent }: { label: string; value: number; accent?: boolean }) {
  return (
    <div
      className="card"
      style={{
        textAlign: "center",
        borderColor: accent ? "var(--color-citadelle-gold)" : undefined,
      }}
    >
      <div
        style={{
          fontSize: "2.5rem",
          fontWeight: 700,
          color: accent ? "var(--color-citadelle-gold)" : "var(--color-citadelle-text)",
        }}
      >
        {value}
      </div>
      <div
        style={{
          fontSize: "0.875rem",
          color: "var(--color-citadelle-text-muted)",
          textTransform: "uppercase",
          letterSpacing: "0.05em",
          marginTop: "0.25rem",
        }}
      >
        {label}
      </div>
    </div>
  );
}
