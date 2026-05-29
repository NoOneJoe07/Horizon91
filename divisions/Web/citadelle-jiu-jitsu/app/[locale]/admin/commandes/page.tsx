// =============================================================================
// Admin — Commandes boutique
// =============================================================================

import { prisma } from "@/lib/db";
import { setRequestLocale } from "next-intl/server";
import type { Locale } from "@/lib/locales";
import { OrderActions } from "@/components/admin/OrderActions";

export default async function AdminOrdersPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  let orders: Awaited<ReturnType<typeof prisma.order.findMany>> = [];
  try {
    orders = await prisma.order.findMany({
      orderBy: { createdAt: "desc" },
      take: 100,
      include: {
        items: {
          include: { product: true },
        },
      },
    });
  } catch {
    orders = [];
  }

  const active   = orders.filter((o) => ["PAID", "READY_PICKUP"].includes(o.status));
  const archived = orders.filter((o) => !["PAID", "READY_PICKUP"].includes(o.status));

  return (
    <div>
      <h1 style={{ fontSize: "1.75rem", marginBottom: "1.5rem" }}>
        {locale === "fr" ? "Commandes" : "Orders"}
        {active.length > 0 && (
          <span style={{
            marginLeft: "0.75rem", fontSize: "0.875rem",
            background: "var(--color-citadelle-gold)",
            color: "var(--color-citadelle-bg)",
            padding: "0.2rem 0.6rem",
            borderRadius: "var(--radius-sm)", fontWeight: 700,
          }}>
            {active.length}
          </span>
        )}
      </h1>

      {orders.length === 0 ? (
        <div className="card" style={{ textAlign: "center", padding: "2rem" }}>
          <p style={{ color: "var(--color-citadelle-text-muted)" }}>
            {locale === "fr" ? "Aucune commande pour l'instant." : "No orders yet."}
          </p>
        </div>
      ) : (
        <>
          {active.length > 0 && (
            <div style={{ display: "grid", gap: "0.75rem", marginBottom: "2rem" }}>
              {active.map((o) => <OrderCard key={o.id} order={o} locale={locale} />)}
            </div>
          )}
          {archived.length > 0 && (
            <>
              <h2 style={{
                fontSize: "0.8rem", textTransform: "uppercase",
                letterSpacing: "0.08em", color: "var(--color-citadelle-text-muted)",
                marginBottom: "0.75rem",
              }}>
                {locale === "fr" ? "Archivées" : "Archived"}
              </h2>
              <div style={{ display: "grid", gap: "0.5rem", opacity: 0.65 }}>
                {archived.map((o) => <OrderCard key={o.id} order={o} locale={locale} />)}
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
}

type OrderWithItems = Awaited<ReturnType<typeof prisma.order.findMany>> extends (infer T)[] ? T : never;

function OrderCard({ order, locale }: { order: OrderWithItems; locale: string }) {
  return (
    <div className="card" style={{ padding: "1rem" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "1rem", flexWrap: "wrap" }}>
        <div style={{ flex: 1 }}>
          {/* En-tête commande */}
          <div style={{ display: "flex", gap: "1rem", alignItems: "baseline", marginBottom: "0.5rem" }}>
            <h3 style={{ fontSize: "1rem" }}>{order.email}</h3>
            <span style={{ fontSize: "0.875rem", color: "var(--color-citadelle-gold)", fontWeight: 700 }}>
              {(order.totalCents / 100).toFixed(2)} $
            </span>
          </div>

          {/* Articles */}
          {"items" in order && Array.isArray((order as { items?: unknown[] }).items) && (
            <ul style={{ listStyle: "none", padding: 0, display: "grid", gap: "0.25rem", marginBottom: "0.5rem" }}>
              {(order as { items: { id: string; quantity: number; product: { nameFr: string; nameEn: string } | null }[] }).items.map((item) => (
                <li key={item.id} style={{ fontSize: "0.875rem", color: "var(--color-citadelle-text-muted)" }}>
                  × {item.quantity} — {locale === "fr" ? item.product?.nameFr : item.product?.nameEn}
                </li>
              ))}
            </ul>
          )}

          <p style={{ fontSize: "0.75rem", color: "var(--color-citadelle-text-muted)" }}>
            {new Date(order.createdAt).toLocaleDateString(locale === "fr" ? "fr-CA" : "en-CA", {
              year: "numeric", month: "long", day: "numeric", hour: "2-digit", minute: "2-digit",
            })}
            {" · "}{order.fulfillment}
          </p>
        </div>

        <OrderActions id={order.id} status={order.status} locale={locale} />
      </div>
    </div>
  );
}
