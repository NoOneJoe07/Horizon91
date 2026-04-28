// =============================================================================
// Footer global
// =============================================================================

import Link from "next/link";
import { getTranslations } from "next-intl/server";
import type { Locale } from "@/lib/locales";

interface FooterProps {
  locale: Locale;
}

export async function Footer({ locale }: FooterProps) {
  const tNav = await getTranslations({ locale, namespace: "Nav" });
  const tFooter = await getTranslations({ locale, namespace: "Footer" });
  const year = new Date().getFullYear();

  return (
    <footer
      style={{
        backgroundColor: "var(--color-citadelle-surface)",
        borderTop: "1px solid var(--color-citadelle-border)",
        marginTop: "auto",
        paddingBlock: "3rem 2rem",
      }}
    >
      <div className="container-citadelle">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "2rem",
            marginBottom: "2rem",
          }}
        >
          {/* Branding */}
          <div>
            <div
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "1.25rem",
                fontWeight: 700,
                color: "var(--color-citadelle-gold)",
                marginBottom: "0.5rem",
              }}
            >
              CITADELLE
            </div>
            <p
              style={{
                color: "var(--color-citadelle-text-muted)",
                fontSize: "0.875rem",
              }}
            >
              {tFooter("tagline")}
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h3
              style={{
                fontSize: "0.875rem",
                color: "var(--color-citadelle-text-muted)",
                marginBottom: "0.75rem",
                textTransform: "uppercase",
                letterSpacing: "0.05em",
              }}
            >
              {tFooter("quickLinks")}
            </h3>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: "0.4rem" }}>
              <li><Link href={`/${locale}/abonnements`}>{tNav("subscriptions")}</Link></li>
              <li><Link href={`/${locale}/boutique`}>{tNav("shop")}</Link></li>
              <li><Link href={`/${locale}/horaires`}>{tNav("schedule")}</Link></li>
              <li><Link href={`/${locale}/contact`}>{tNav("contact")}</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3
              style={{
                fontSize: "0.875rem",
                color: "var(--color-citadelle-text-muted)",
                marginBottom: "0.75rem",
                textTransform: "uppercase",
                letterSpacing: "0.05em",
              }}
            >
              {tFooter("legal")}
            </h3>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: "0.4rem" }}>
              <li><Link href={`/${locale}/confidentialite`}>{tFooter("privacy")}</Link></li>
              <li><Link href={`/${locale}/conditions`}>{tFooter("terms")}</Link></li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div
          style={{
            borderTop: "1px solid var(--color-citadelle-border)",
            paddingTop: "1.5rem",
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "1rem",
            color: "var(--color-citadelle-text-muted)",
            fontSize: "0.875rem",
          }}
        >
          <div>
            © {year} Citadelle Jiu-Jitsu. {tFooter("copyright")}.
          </div>
          <div>
            {tFooter("developedBy")}{" "}
            <a href="https://horizon91.ca" target="_blank" rel="noopener noreferrer">
              Horizon 91
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
