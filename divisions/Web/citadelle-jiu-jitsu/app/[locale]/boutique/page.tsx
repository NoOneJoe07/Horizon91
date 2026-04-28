import { getTranslations, setRequestLocale } from "next-intl/server";
import { prisma } from "@/lib/db";
import type { Locale } from "@/lib/locales";

function formatPrice(cents: number): string {
  return (cents / 100).toLocaleString("fr-CA", {
    style: "currency",
    currency: "CAD",
  });
}

export default async function ShopPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "Shop" });

  let products: Awaited<ReturnType<typeof prisma.product.findMany>> = [];
  try {
    products = await prisma.product.findMany({
      where: { active: true },
      orderBy: [{ category: "asc" }, { nameFr: "asc" }],
    });
  } catch {
    products = [];
  }

  return (
    <section className="section">
      <div className="container-citadelle">
        <header style={{ textAlign: "center", marginBottom: "3rem" }}>
          <h1 style={{ fontSize: "2.5rem", marginBottom: "0.5rem" }}>{t("title")}</h1>
          <p style={{ color: "var(--color-citadelle-text-muted)" }}>{t("subtitle")}</p>
          <p
            style={{
              marginTop: "0.75rem",
              fontSize: "0.875rem",
              color: "var(--color-citadelle-gold)",
            }}
          >
            {t("pickup")}
          </p>
        </header>

        {products.length === 0 ? (
          <div className="card" style={{ textAlign: "center", padding: "3rem" }}>
            <p style={{ color: "var(--color-citadelle-text-muted)" }}>
              {locale === "fr"
                ? "Aucun produit disponible. Initialise la BD : npm run prisma:migrate puis npm run prisma:seed."
                : "No products available. Initialize DB: npm run prisma:migrate then npm run prisma:seed."}
            </p>
          </div>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
              gap: "1.5rem",
            }}
          >
            {products.map((product) => {
              const inStock = product.stockQuantity > 0;
              return (
                <article key={product.id} className="card" style={{ display: "flex", flexDirection: "column" }}>
                  <div
                    aria-hidden
                    style={{
                      width: "100%",
                      aspectRatio: "1",
                      background:
                        "linear-gradient(135deg, var(--color-citadelle-surface-2), var(--color-citadelle-bg))",
                      borderRadius: "var(--radius-md)",
                      marginBottom: "1rem",
                      display: "grid",
                      placeItems: "center",
                      fontSize: "2rem",
                      color: "var(--color-citadelle-gold)",
                    }}
                  >
                    {product.category === "APPAREL"
                      ? "👕"
                      : product.category === "GEAR"
                      ? "🥋"
                      : "🎒"}
                  </div>
                  <h2 style={{ fontSize: "1.05rem", marginBottom: "0.25rem" }}>
                    {locale === "fr" ? product.nameFr : product.nameEn}
                  </h2>
                  <p
                    style={{
                      fontSize: "0.875rem",
                      color: "var(--color-citadelle-text-muted)",
                      marginBottom: "1rem",
                      flex: 1,
                    }}
                  >
                    {locale === "fr" ? product.descriptionFr : product.descriptionEn}
                  </p>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: "0.75rem",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "1.25rem",
                        fontWeight: 700,
                        color: "var(--color-citadelle-gold)",
                      }}
                    >
                      {formatPrice(product.priceCents)}
                    </span>
                    {!inStock && (
                      <span
                        style={{
                          fontSize: "0.75rem",
                          color: "var(--color-citadelle-danger)",
                          textTransform: "uppercase",
                        }}
                      >
                        {t("outOfStock")}
                      </span>
                    )}
                  </div>
                  <form action="/api/checkout" method="POST">
                    <input type="hidden" name="productId" value={product.id} />
                    <input type="hidden" name="locale" value={locale} />
                    <button
                      type="submit"
                      className="btn-primary"
                      style={{ width: "100%" }}
                      disabled={!inStock}
                    >
                      {t("addToCart")}
                    </button>
                  </form>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
