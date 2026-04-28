// =============================================================================
// POST /api/checkout
// -----------------------------------------------------------------------------
// Crée une Stripe Checkout Session pour :
//   - un plan d'abonnement (mode: "subscription")
//   - OU un produit boutique (mode: "payment")
//
// IMPORTANT : on lit le prix DEPUIS LA BD (jamais depuis le client) pour
// éviter qu'un user malicieux n'envoie un prix manipulé.
// =============================================================================

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getStripe } from "@/lib/stripe";
import { getSession } from "@/lib/auth";

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const planId = formData.get("planId")?.toString();
  const productId = formData.get("productId")?.toString();
  const locale = formData.get("locale")?.toString() ?? "fr";

  if (!planId && !productId) {
    return NextResponse.json(
      { error: "planId ou productId requis" },
      { status: 400 },
    );
  }

  const stripe = getStripe();
  const session = await getSession();
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

  try {
    // -------------------------------------------------------------------------
    // Mode ABONNEMENT
    // -------------------------------------------------------------------------
    if (planId) {
      const plan = await prisma.subscriptionPlan.findUnique({
        where: { id: planId, active: true },
      });
      if (!plan) {
        return NextResponse.json({ error: "Plan introuvable" }, { status: 404 });
      }

      const checkoutSession = await stripe.checkout.sessions.create({
        mode: "subscription",
        payment_method_types: ["card"],
        line_items: [
          {
            price_data: {
              currency: "cad",
              product_data: {
                name: locale === "fr" ? plan.nameFr : plan.nameEn,
                description: locale === "fr" ? plan.descriptionFr : plan.descriptionEn,
              },
              unit_amount: plan.priceCents,
              recurring: {
                interval: plan.interval === "MONTH" ? "month" : "year",
              },
            },
            quantity: 1,
          },
        ],
        customer_email: session?.email,
        success_url: `${baseUrl}/${locale}/abonnements?success=1`,
        cancel_url: `${baseUrl}/${locale}/abonnements?canceled=1`,
        metadata: {
          planId: plan.id,
          userId: session?.userId ?? "",
        },
      });

      return NextResponse.redirect(checkoutSession.url ?? `${baseUrl}/${locale}`, 303);
    }

    // -------------------------------------------------------------------------
    // Mode PRODUIT (one-shot)
    // -------------------------------------------------------------------------
    if (productId) {
      const product = await prisma.product.findUnique({
        where: { id: productId, active: true },
      });
      if (!product) {
        return NextResponse.json({ error: "Produit introuvable" }, { status: 404 });
      }
      if (product.stockQuantity <= 0) {
        return NextResponse.json({ error: "Rupture de stock" }, { status: 409 });
      }

      const checkoutSession = await stripe.checkout.sessions.create({
        mode: "payment",
        payment_method_types: ["card"],
        line_items: [
          {
            price_data: {
              currency: "cad",
              product_data: {
                name: locale === "fr" ? product.nameFr : product.nameEn,
                description: locale === "fr" ? product.descriptionFr : product.descriptionEn,
              },
              unit_amount: product.priceCents,
            },
            quantity: 1,
          },
        ],
        customer_email: session?.email,
        success_url: `${baseUrl}/${locale}/boutique?success=1`,
        cancel_url: `${baseUrl}/${locale}/boutique?canceled=1`,
        metadata: {
          productId: product.id,
          userId: session?.userId ?? "",
        },
      });

      return NextResponse.redirect(checkoutSession.url ?? `${baseUrl}/${locale}`, 303);
    }

    return NextResponse.json({ error: "Cas non géré" }, { status: 400 });
  } catch (e) {
    console.error("[/api/checkout]", e);
    return NextResponse.json({ error: "Erreur Stripe" }, { status: 500 });
  }
}
