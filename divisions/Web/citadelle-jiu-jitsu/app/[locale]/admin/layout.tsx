// =============================================================================
// Layout admin — protection serveur (défense en profondeur)
// -----------------------------------------------------------------------------
// Le middleware vérifie déjà la présence du cookie. Ici on RE-vérifie côté
// serveur que le JWT est valide ET que l'utilisateur a toujours le rôle ADMIN
// en BD (au cas où le rôle aurait été révoqué).
// =============================================================================

import { redirect } from "next/navigation";
import Link from "next/link";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/db";
import type { Locale } from "@/lib/locales";

export default async function AdminLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const session = await getSession();
  if (!session) {
    redirect(`/${locale}/connexion?redirect=/${locale}/admin`);
  }

  // Re-vérification BD du rôle (défense en profondeur)
  const user = await prisma.user.findUnique({
    where: { id: session.userId },
    select: { role: true },
  });
  if (!user || user.role !== "ADMIN") {
    redirect(`/${locale}`);
  }

  const t = await getTranslations({ locale, namespace: "Admin" });

  const navItems = [
    { href: `/${locale}/admin`, label: t("title") },
    { href: `/${locale}/admin/produits`, label: t("sections.products") },
    { href: `/${locale}/admin/abonnements`, label: t("sections.subscriptions") },
    { href: `/${locale}/admin/inscriptions`, label: t("sections.trials") },
    { href: `/${locale}/admin/utilisateurs`, label: t("sections.users") },
    { href: `/${locale}/admin/commandes`, label: t("sections.orders") },
  ];

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "240px 1fr",
        minHeight: "calc(100vh - 200px)",
      }}
    >
      <aside
        style={{
          background: "var(--color-citadelle-surface)",
          borderRight: "1px solid var(--color-citadelle-border)",
          padding: "2rem 1rem",
        }}
      >
        <h2
          style={{
            fontSize: "0.75rem",
            color: "var(--color-citadelle-text-muted)",
            textTransform: "uppercase",
            letterSpacing: "0.1em",
            marginBottom: "1rem",
          }}
        >
          Admin
        </h2>
        <nav style={{ display: "grid", gap: "0.25rem" }}>
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              style={{
                padding: "0.5rem 0.75rem",
                borderRadius: "var(--radius-sm)",
                color: "var(--color-citadelle-text)",
                fontSize: "0.9rem",
              }}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </aside>

      <main style={{ padding: "2rem" }}>{children}</main>
    </div>
  );
}
