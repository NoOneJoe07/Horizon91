// =============================================================================
// Admin — Produits (CRUD complet)
// -----------------------------------------------------------------------------
// Server Component : lit les produits depuis la BD côté serveur.
// Le bouton "+ Nouveau" et les actions par ligne sont des Client Components
// (ProductCreateButton, ProductActions) qui appellent des Server Actions.
// revalidatePath() dans les actions force le rechargement de cette page.
// =============================================================================

import { prisma } from "@/lib/db";
import { setRequestLocale } from "next-intl/server";
import type { Locale } from "@/lib/locales";
import { ProductCreateButton } from "@/components/admin/ProductCreateButton";
import { ProductActions } from "@/components/admin/ProductActions";

export default async function AdminProductsPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const locale = ((await params).locale) as Locale;
  setRequestLocale(locale);

  let products: Awaited<ReturnType<typeof prisma.product.findMany>> = [];
  try {
    products = await prisma.product.findMany({ orderBy: { createdAt: "desc" } });
  } catch {
    products = [];
  }

  return (
    <div>
      <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
        <h1 style={{ fontSize: "1.75rem" }}>
          {locale === "fr" ? "Produits" : "Products"}
        </h1>
        <ProductCreateButton locale={locale} />
      </header>

      {products.length === 0 ? (
        <div className="card" style={{ textAlign: "center", padding: "2rem" }}>
          <p style={{ color: "var(--color-citadelle-text-muted)" }}>
            {locale === "fr" ? "Aucun produit." : "No products."}
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
                <Th>Stock</Th>
                <Th>{locale === "fr" ? "Statut" : "Status"}</Th>
                <Th>Actions</Th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p.id} style={{ borderTop: "1px solid var(--color-citadelle-border)" }}>
                  <Td>
                    <span style={{ fontWeight: 500 }}>
                      {locale === "fr" ? p.nameFr : p.nameEn}
                    </span>
                  </Td>
                  <Td>{p.category}</Td>
                  <Td>{(p.priceCents / 100).toFixed(2)} $</Td>
                  <Td>
                    <span style={{ color: p.stockQuantity === 0 ? "#ef4444" : "inherit" }}>
                      {p.stockQuantity}
                    </span>
                  </Td>
                  <Td>
                    <span style={{
                      fontSize: "0.825rem",
                      color: p.active
                        ? "#22c55e"
                        : "var(--color-citadelle-text-muted)",
                    }}>
                      {p.active
                        ? (locale === "fr" ? "Actif"   : "Active")
                        : (locale === "fr" ? "Inactif" : "Inactive")}
                    </span>
                  </Td>
                  <Td>
                    <ProductActions product={p} locale={locale} />
                  </Td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

function Th({ children }: { children: React.ReactNode }) {
  return (
    <th style={{
      textAlign: "left", padding: "0.75rem 1rem",
      fontSize: "0.75rem", textTransform: "uppercase",
      letterSpacing: "0.05em",
      color: "var(--color-citadelle-text-muted)",
      fontWeight: 600,
    }}>
      {children}
    </th>
  );
}
function Td({ children }: { children: React.ReactNode }) {
  return <td style={{ padding: "0.75rem 1rem", fontSize: "0.9rem" }}>{children}</td>;
}
