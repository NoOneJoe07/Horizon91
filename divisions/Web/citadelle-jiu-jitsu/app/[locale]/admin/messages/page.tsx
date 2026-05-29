// =============================================================================
// Admin — Messages de contact
// =============================================================================

import { prisma } from "@/lib/db";
import { setRequestLocale } from "next-intl/server";
import type { Locale } from "@/lib/locales";
import { ContactMessageActions } from "@/components/admin/ContactMessageActions";

export default async function AdminMessagesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  let messages: Awaited<ReturnType<typeof prisma.contactMessage.findMany>> = [];
  try {
    messages = await prisma.contactMessage.findMany({
      orderBy: { createdAt: "desc" },
      take: 100,
    });
  } catch {
    messages = [];
  }

  const unread = messages.filter((m) => !m.read);
  const read   = messages.filter((m) => m.read);

  return (
    <div>
      <h1 style={{ fontSize: "1.75rem", marginBottom: "1.5rem" }}>
        {locale === "fr" ? "Messages de contact" : "Contact messages"}
        {unread.length > 0 && (
          <span style={{
            marginLeft: "0.75rem", fontSize: "0.875rem",
            background: "var(--color-citadelle-gold)",
            color: "var(--color-citadelle-bg)",
            padding: "0.2rem 0.6rem",
            borderRadius: "var(--radius-sm)", fontWeight: 700,
          }}>
            {unread.length} {locale === "fr" ? "non lu(s)" : "unread"}
          </span>
        )}
      </h1>

      {messages.length === 0 ? (
        <div className="card" style={{ textAlign: "center", padding: "2rem" }}>
          <p style={{ color: "var(--color-citadelle-text-muted)" }}>
            {locale === "fr" ? "Aucun message pour l'instant." : "No messages yet."}
          </p>
        </div>
      ) : (
        <>
          {unread.length > 0 && (
            <div style={{ display: "grid", gap: "0.75rem", marginBottom: "2rem" }}>
              {unread.map((m) => <MessageCard key={m.id} message={m} locale={locale} />)}
            </div>
          )}
          {read.length > 0 && (
            <>
              <h2 style={{
                fontSize: "0.8rem", textTransform: "uppercase",
                letterSpacing: "0.08em", color: "var(--color-citadelle-text-muted)",
                marginBottom: "0.75rem",
              }}>
                {locale === "fr" ? "Lus" : "Read"}
              </h2>
              <div style={{ display: "grid", gap: "0.5rem", opacity: 0.65 }}>
                {read.map((m) => <MessageCard key={m.id} message={m} locale={locale} />)}
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
}

type Message = Awaited<ReturnType<typeof prisma.contactMessage.findMany>>[number];

function MessageCard({ message, locale }: { message: Message; locale: string }) {
  return (
    <div className="card" style={{
      padding: "1rem",
      borderColor: !message.read ? "var(--color-citadelle-gold)" : "var(--color-citadelle-border)",
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "1rem", flexWrap: "wrap" }}>
        <div style={{ flex: 1 }}>
          <div style={{ display: "flex", gap: "0.75rem", alignItems: "baseline", marginBottom: "0.35rem" }}>
            <h3 style={{ fontSize: "1rem" }}>{message.name}</h3>
            <span style={{ fontSize: "0.825rem", color: "var(--color-citadelle-text-muted)" }}>
              {message.email}
            </span>
          </div>
          {message.subject && (
            <p style={{ fontSize: "0.875rem", fontWeight: 600, marginBottom: "0.35rem" }}>
              {message.subject}
            </p>
          )}
          <p style={{ fontSize: "0.9rem", lineHeight: 1.6, marginBottom: "0.5rem" }}>
            {message.message}
          </p>
          <p style={{ fontSize: "0.75rem", color: "var(--color-citadelle-text-muted)" }}>
            {new Date(message.createdAt).toLocaleDateString(locale === "fr" ? "fr-CA" : "en-CA", {
              year: "numeric", month: "long", day: "numeric",
              hour: "2-digit", minute: "2-digit",
            })}
          </p>
        </div>

        <ContactMessageActions id={message.id} read={message.read} locale={locale} />
      </div>
    </div>
  );
}
