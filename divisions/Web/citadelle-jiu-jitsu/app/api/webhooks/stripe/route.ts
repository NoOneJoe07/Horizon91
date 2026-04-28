// =============================================================================
// POST /api/webhooks/stripe
// -----------------------------------------------------------------------------
// Reçoit les webhooks Stripe (paiements confirmés, abonnements, etc.).
// Vérifie la signature avec STRIPE_WEBHOOK_SECRET.
//
// EN DEV : utiliser `stripe listen --forward-to http://localhost:3000/api/webhooks/stripe`
// pour relayer les événements de Stripe Test vers ta machine.
// =============================================================================

import { NextRequest, NextResponse } from "next/server";
import type Stripe from "stripe";
import { getStripe } from "@/lib/stripe";
import { prisma } from "@/lib/db";

export const runtime = "nodejs"; // requis : Stripe webhook utilise Node crypto

export async function POST(req: NextRequest) {
  const sig = req.headers.get("stripe-signature");
  const secret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!sig || !secret) {
    return NextResponse.json(
      { error: "Signature ou secret manquant" },
      { status: 400 },
    );
  }

  const stripe = getStripe();
  const rawBody = await req.text();

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(rawBody, sig, secret);
  } catch (e) {
    console.error("[webhook] signature invalide:", e);
    return NextResponse.json({ error: "Signature invalide" }, { status: 400 });
  }

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const sess = event.data.object as Stripe.Checkout.Session;
        const { planId, productId, userId } = sess.metadata ?? {};

        if (planId && userId) {
          // Abonnement créé
          await prisma.userSubscription.create({
            data: {
              userId,
              planId,
              status: "ACTIVE",
              stripeSubscriptionId: typeof sess.subscription === "string"
                ? sess.subscription
                : null,
            },
          });
        }

        if (productId) {
          // Commande boutique payée
          const product = await prisma.product.findUnique({
            where: { id: productId },
          });
          if (product) {
            await prisma.order.create({
              data: {
                userId: userId || null,
                email: sess.customer_email ?? "unknown@unknown",
                totalCents: sess.amount_total ?? product.priceCents,
                status: "PAID",
                fulfillment: "PICKUP",
                stripeSessionId: sess.id,
                stripePaymentIntentId:
                  typeof sess.payment_intent === "string"
                    ? sess.payment_intent
                    : null,
                items: {
                  create: [
                    {
                      productId: product.id,
                      quantity: 1,
                      unitPriceCents: product.priceCents,
                      productNameFr: product.nameFr,
                      productNameEn: product.nameEn,
                    },
                  ],
                },
              },
            });
            // Décrémente le stock
            await prisma.product.update({
              where: { id: product.id },
              data: { stockQuantity: { decrement: 1 } },
            });
          }
        }
        break;
      }

      case "customer.subscription.deleted": {
        const sub = event.data.object as Stripe.Subscription;
        await prisma.userSubscription.updateMany({
          where: { stripeSubscriptionId: sub.id },
          data: { status: "CANCELED" },
        });
        break;
      }

      // TODO: gérer invoice.payment_failed, customer.subscription.updated, etc.
      default:
        console.log(`[webhook] event non géré: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (e) {
    console.error("[webhook] erreur traitement:", e);
    return NextResponse.json({ error: "Erreur traitement" }, { status: 500 });
  }
}
