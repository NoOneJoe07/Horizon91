// =============================================================================
// Admin — Liste des produits (CRUD à brancher sur /api/admin/products)
// =============================================================================

import { prisma } from "@/lib/db";
import { setRequestLocale } from "next-intl/server";
import type { Locale } from "@/lib/locales";

export default async function AdminProductsPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  let products: Awaited<ReturnType<typeof prisma.product.findMany>> = [];
  try {
    products = await prisma.product.findMany({ orderBy: { createdAt: "desc" } });
  } catch {
    products = [];
  }

  return (
    <div>
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "1.5rem",
        }}
      >
        <h1 style={{ fontSize: "1.75rem" }}>
          {locale === "fr" ? "Produits" : "Products"}
        </h1>
        <button className="btn-primary" disabled title="TODO: ouvrir modale création">
          + {locale === "fr" ? "Créer" : "Create"}
        </button>
      </header>

      {products.length === 0 ? (
        <div className="card" style={{ textAlign: "center", padding: "2rem" }}>
          <p style={{ color: "var(--color-citadelle-text-muted)" }}>
            {locale === "fr" ? "Aucun produit pour l'instant." : "No products yet."}
          </p>
        </div>
      ) : (
        <div className="card" style={{ padding: 0, overflow: "hidden" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: "var(--color-citadelle-surface-2)" }}>
                <Th>{locale === "fr" ? "Nom" : "Name"}</Th>
                <Th>{locale === "fr" ? "Catégorie" : "Category"}</Th>
                <Th>{locale === "fr" ? "Prix" : "Price"}</Th>
                <Th>{locale === "fr" ? "Stock" : "Stock"}</Th>
                <Th>{locale === "fr" ? "Statut" : "Status"}</Th>
                <Th>Actions</Th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr
                  key={p.id}
                  style={{ borderTop: "1px solid var(--color-citadelle-border)" }}
                >
                  <Td>{locale === "fr" ? p.nameFr : p.nameEn}</Td>
                  <Td>{p.category}</Td>
                  <Td>{(p.priceCents / 100).toFixed(2)} $</Td>
                  <Td>{p.stockQuantity}</Td>
                  <Td>
                    <span
                      style={{
                        color: p.active
                          ? "var(--color-citadelle-success)"
                          : "var(--color-citadelle-text-muted)",
                        fontSize: "0.875rem",
                      }}
                    >
                      {p.active
                        ? locale === "fr" ? "Actif" : "Active"
                        : locale === "fr" ? "Inactif" : "Inactive"}
                    </span>
                  </Td>
                  <Td>
                    <button
                      className="btn-secondary"
                      style={{ fontSize: "0.75rem", padding: "0.35rem 0.75rem" }}
                      disabled
                      title="TODO: brancher edit/delete"
                    >
                      ⋯
                    </button>
                  </Td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <p
        style={{
          marginTop: "1.5rem",
          fontSize: "0.825rem",
          color: "var(--color-citadelle-text-muted)",
          fontStyle: "italic",
        }}
      >
        TODO: brancher les actions Create/Edit/Delete sur des Server Actions
        ou des routes API dans <code>app/api/admin/products/</code>.
      </p>
    </div>
  );
}

function Th({ children }: { children: React.ReactNode }) {
  return (
    <th
      style={{
        textAlign: "left",
        padding: "0.75rem 1rem",
        fontSize: "0.75rem",
        textTransform: "uppercase",
        letterSpacing: "0.05em",
        color: "var(--color-citadelle-text-muted)",
        fontWeight: 600,
      }}
    >
      {children}
    </th>
  );
}

function Td({ children }: { children: React.ReactNode }) {
  return <td style={{ padding: "0.75rem 1rem", fontSize: "0.9rem" }}>{children}</td>;
}
