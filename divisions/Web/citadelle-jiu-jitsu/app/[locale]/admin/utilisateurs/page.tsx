// =============================================================================
// Admin — Utilisateurs (lecture seule)
// =============================================================================

import { prisma } from "@/lib/db";
import { setRequestLocale } from "next-intl/server";
import type { Locale } from "@/lib/locales";
import type { Role } from "@prisma/client";

type UserRow = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: Role;
  createdAt: Date;
};

export default async function AdminUsersPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  let users: UserRow[] = [];
  try {
    users = await prisma.user.findMany({
      orderBy: { createdAt: "desc" },
      select: {
        id: true, email: true, firstName: true, lastName: true,
        role: true, createdAt: true,
      },
    });
  } catch {
    users = [];
  }

  return (
    <div>
      <h1 style={{ fontSize: "1.75rem", marginBottom: "1.5rem" }}>
        {locale === "fr" ? `Utilisateurs (${users.length})` : `Users (${users.length})`}
      </h1>

      {users.length === 0 ? (
        <div className="card" style={{ textAlign: "center", padding: "2rem" }}>
          <p style={{ color: "var(--color-citadelle-text-muted)" }}>
            {locale === "fr" ? "Aucun utilisateur." : "No users."}
          </p>
        </div>
      ) : (
        <div className="card" style={{ padding: 0, overflow: "hidden" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: "var(--color-citadelle-surface-2)" }}>
                <Th>{locale === "fr" ? "Nom" : "Name"}</Th>
                <Th>Email</Th>
                <Th>Rôle</Th>
                <Th>{locale === "fr" ? "Inscrit le" : "Joined"}</Th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.id} style={{ borderTop: "1px solid var(--color-citadelle-border)" }}>
                  <Td>
                    {u.firstName} {u.lastName}
                  </Td>
                  <Td>{u.email}</Td>
                  <Td>
                    <span style={{
                      padding: "0.15rem 0.5rem",
                      borderRadius: "var(--radius-sm)",
                      fontSize: "0.75rem",
                      fontWeight: 700,
                      background: u.role === "ADMIN"
                        ? "var(--color-citadelle-gold)"
                        : "var(--color-citadelle-surface-2)",
                      color: u.role === "ADMIN"
                        ? "var(--color-citadelle-bg)"
                        : "var(--color-citadelle-text-muted)",
                    }}>
                      {u.role}
                    </span>
                  </Td>
                  <Td>
                    {new Date(u.createdAt).toLocaleDateString(locale === "fr" ? "fr-CA" : "en-CA")}
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
      letterSpacing: "0.05em", color: "var(--color-citadelle-text-muted)", fontWeight: 600,
    }}>
      {children}
    </th>
  );
}
function Td({ children }: { children: React.ReactNode }) {
  return <td style={{ padding: "0.75rem 1rem", fontSize: "0.9rem" }}>{children}</td>;
}
