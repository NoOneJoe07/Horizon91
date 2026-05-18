// =============================================================================
// app/actions/admin.ts — Server Actions CRUD admin
// -----------------------------------------------------------------------------
// Toutes les mutations admin (produits, abonnements, séances d'essai, commandes,
// messages) centralisées ici.
//
// Chaque action :
//   1. Vérifie que l'appelant est ADMIN (défense en profondeur)
//   2. Valide les données (Zod)
//   3. Effectue l'opération Prisma
//   4. Retourne { success: true } ou { error: string }
//
// "use server" → ces fonctions ne s'exécutent que côté serveur Node.js,
// jamais dans le navigateur. Next.js App Router gère la sérialisation.
// =============================================================================

"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { prisma } from "@/lib/db";
import { getSession } from "@/lib/auth";
import { ProductCategory, TrialStatus, OrderStatus } from "@prisma/client";

// ---------------------------------------------------------------------------
// Garde ADMIN — appelée en tête de chaque action
// ---------------------------------------------------------------------------
async function requireAdmin() {
  const session = await getSession();
  if (!session) throw new Error("Non authentifié");

  const user = await prisma.user.findUnique({
    where: { id: session.userId },
    select: { role: true },
  });
  if (!user || user.role !== "ADMIN") throw new Error("Accès refusé");

  return session;
}

// =============================================================================
// PRODUITS
// =============================================================================

const ProductSchema = z.object({
  nameFr:        z.string().min(2).max(120),
  nameEn:        z.string().min(2).max(120),
  descriptionFr: z.string().min(2).max(500),
  descriptionEn: z.string().min(2).max(500),
  priceCents:    z.coerce.number().int().min(100),   // min 1 $
  category:      z.nativeEnum(ProductCategory),
  stockQuantity: z.coerce.number().int().min(0),
  imageUrl:      z.string().url().optional().or(z.literal("")),
});

export async function createProduct(formData: FormData) {
  try {
    await requireAdmin();

    const raw = {
      nameFr:        formData.get("nameFr"),
      nameEn:        formData.get("nameEn"),
      descriptionFr: formData.get("descriptionFr"),
      descriptionEn: formData.get("descriptionEn"),
      priceCents:    formData.get("priceCents"),
      category:      formData.get("category"),
      stockQuantity: formData.get("stockQuantity"),
      imageUrl:      formData.get("imageUrl") || undefined,
    };

    const data = ProductSchema.parse(raw);

    // Génère un slug depuis le nom FR
    const slug = data.nameFr
      .toLowerCase()
      .normalize("NFD").replace(/[̀-ͯ]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "")
      + "-" + Date.now().toString(36);

    await prisma.product.create({
      data: { ...data, slug, imageUrl: data.imageUrl || null },
    });

    revalidatePath("/fr/admin/produits");
    revalidatePath("/en/admin/produits");
    revalidatePath("/fr/boutique");
    revalidatePath("/en/boutique");

    return { success: true };
  } catch (e) {
    return { error: e instanceof Error ? e.message : "Erreur inconnue" };
  }
}

export async function updateProduct(id: string, formData: FormData) {
  try {
    await requireAdmin();

    const raw = {
      nameFr:        formData.get("nameFr"),
      nameEn:        formData.get("nameEn"),
      descriptionFr: formData.get("descriptionFr"),
      descriptionEn: formData.get("descriptionEn"),
      priceCents:    formData.get("priceCents"),
      category:      formData.get("category"),
      stockQuantity: formData.get("stockQuantity"),
      imageUrl:      formData.get("imageUrl") || undefined,
    };

    const data = ProductSchema.parse(raw);

    await prisma.product.update({
      where: { id },
      data: { ...data, imageUrl: data.imageUrl || null },
    });

    revalidatePath("/fr/admin/produits");
    revalidatePath("/en/admin/produits");
    revalidatePath("/fr/boutique");
    revalidatePath("/en/boutique");

    return { success: true };
  } catch (e) {
    return { error: e instanceof Error ? e.message : "Erreur inconnue" };
  }
}

export async function toggleProductActive(id: string, active: boolean) {
  try {
    await requireAdmin();
    await prisma.product.update({ where: { id }, data: { active } });
    revalidatePath("/fr/admin/produits");
    revalidatePath("/en/admin/produits");
    revalidatePath("/fr/boutique");
    revalidatePath("/en/boutique");
    return { success: true };
  } catch (e) {
    return { error: e instanceof Error ? e.message : "Erreur inconnue" };
  }
}

export async function deleteProduct(id: string) {
  try {
    await requireAdmin();
    await prisma.product.delete({ where: { id } });
    revalidatePath("/fr/admin/produits");
    revalidatePath("/en/admin/produits");
    revalidatePath("/fr/boutique");
    revalidatePath("/en/boutique");
    return { success: true };
  } catch (e) {
    return { error: e instanceof Error ? e.message : "Erreur inconnue" };
  }
}

// =============================================================================
// ABONNEMENTS — toggle uniquement (modifs Stripe = session dédiée)
// =============================================================================

export async function togglePlanActive(id: string, active: boolean) {
  try {
    await requireAdmin();
    await prisma.subscriptionPlan.update({ where: { id }, data: { active } });
    revalidatePath("/fr/admin/abonnements");
    revalidatePath("/en/admin/abonnements");
    revalidatePath("/fr/abonnements");
    revalidatePath("/en/abonnements");
    return { success: true };
  } catch (e) {
    return { error: e instanceof Error ? e.message : "Erreur inconnue" };
  }
}

// =============================================================================
// SÉANCES D'ESSAI
// =============================================================================

export async function updateTrialStatus(id: string, status: TrialStatus) {
  try {
    await requireAdmin();
    await prisma.trialSession.update({ where: { id }, data: { status } });
    revalidatePath("/fr/admin/inscriptions");
    revalidatePath("/en/admin/inscriptions");
    return { success: true };
  } catch (e) {
    return { error: e instanceof Error ? e.message : "Erreur inconnue" };
  }
}

// =============================================================================
// COMMANDES
// =============================================================================

export async function updateOrderStatus(id: string, status: OrderStatus) {
  try {
    await requireAdmin();
    await prisma.order.update({ where: { id }, data: { status } });
    revalidatePath("/fr/admin/commandes");
    revalidatePath("/en/admin/commandes");
    return { success: true };
  } catch (e) {
    return { error: e instanceof Error ? e.message : "Erreur inconnue" };
  }
}

// =============================================================================
// MESSAGES CONTACT
// =============================================================================

export async function markContactRead(id: string, read: boolean) {
  try {
    await requireAdmin();
    await prisma.contactMessage.update({ where: { id }, data: { read } });
    revalidatePath("/fr/admin/messages");
    revalidatePath("/en/admin/messages");
    return { success: true };
  } catch (e) {
    return { error: e instanceof Error ? e.message : "Erreur inconnue" };
  }
}

export async function deleteContactMessage(id: string) {
  try {
    await requireAdmin();
    await prisma.contactMessage.delete({ where: { id } });
    revalidatePath("/fr/admin/messages");
    revalidatePath("/en/admin/messages");
    return { success: true };
  } catch (e) {
    return { error: e instanceof Error ? e.message : "Erreur inconnue" };
  }
}

// =============================================================================
// DOJO TIME — Articles
// =============================================================================

const PostSchema = z.object({
  titleFr:     z.string().min(2).max(200),
  titleEn:     z.string().min(2).max(200),
  excerptFr:   z.string().min(2).max(400),
  excerptEn:   z.string().min(2).max(400),
  contentFr:   z.string().min(10),
  contentEn:   z.string().min(10),
  category:    z.enum(["COMPETITION", "BELTS", "ANNOUNCEMENT", "COMMUNITY"]),
  imageUrl:    z.string().url().optional().or(z.literal("")),
  externalUrl: z.string().url().optional().or(z.literal("")),
  publishedAt: z.string().optional(),
  status:      z.enum(["DRAFT", "PUBLISHED"]),
});

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .normalize("NFD").replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    + "-" + Date.now().toString(36);
}

export async function createPost(formData: FormData) {
  try {
    await requireAdmin();

    const raw = {
      titleFr:     formData.get("titleFr"),
      titleEn:     formData.get("titleEn"),
      excerptFr:   formData.get("excerptFr"),
      excerptEn:   formData.get("excerptEn"),
      contentFr:   formData.get("contentFr"),
      contentEn:   formData.get("contentEn"),
      category:    formData.get("category"),
      imageUrl:    formData.get("imageUrl") || undefined,
      externalUrl: formData.get("externalUrl") || undefined,
      publishedAt: formData.get("publishedAt") || undefined,
      status:      formData.get("status"),
    };

    const data = PostSchema.parse(raw);
    const slug = generateSlug(data.titleFr);

    await prisma.post.create({
      data: {
        slug,
        titleFr:     data.titleFr,
        titleEn:     data.titleEn,
        excerptFr:   data.excerptFr,
        excerptEn:   data.excerptEn,
        contentFr:   data.contentFr,
        contentEn:   data.contentEn,
        category:    data.category,
        status:      data.status,
        imageUrl:    data.imageUrl    || null,
        externalUrl: data.externalUrl || null,
        publishedAt: data.publishedAt ? new Date(data.publishedAt) : new Date(),
      },
    });

    revalidatePath("/fr/dojo-time");
    revalidatePath("/en/dojo-time");
    revalidatePath("/fr/admin/dojo-time");
    revalidatePath("/en/admin/dojo-time");
    return { success: true };
  } catch (e) {
    return { error: e instanceof Error ? e.message : "Erreur inconnue" };
  }
}

export async function updatePost(id: string, formData: FormData) {
  try {
    await requireAdmin();

    const raw = {
      titleFr:     formData.get("titleFr"),
      titleEn:     formData.get("titleEn"),
      excerptFr:   formData.get("excerptFr"),
      excerptEn:   formData.get("excerptEn"),
      contentFr:   formData.get("contentFr"),
      contentEn:   formData.get("contentEn"),
      category:    formData.get("category"),
      imageUrl:    formData.get("imageUrl") || undefined,
      externalUrl: formData.get("externalUrl") || undefined,
      publishedAt: formData.get("publishedAt") || undefined,
      status:      formData.get("status"),
    };

    const data = PostSchema.parse(raw);

    await prisma.post.update({
      where: { id },
      data: {
        titleFr:     data.titleFr,
        titleEn:     data.titleEn,
        excerptFr:   data.excerptFr,
        excerptEn:   data.excerptEn,
        contentFr:   data.contentFr,
        contentEn:   data.contentEn,
        category:    data.category,
        status:      data.status,
        imageUrl:    data.imageUrl    || null,
        externalUrl: data.externalUrl || null,
        publishedAt: data.publishedAt ? new Date(data.publishedAt) : undefined,
      },
    });

    revalidatePath("/fr/dojo-time");
    revalidatePath("/en/dojo-time");
    revalidatePath("/fr/admin/dojo-time");
    revalidatePath("/en/admin/dojo-time");
    return { success: true };
  } catch (e) {
    return { error: e instanceof Error ? e.message : "Erreur inconnue" };
  }
}

export async function togglePostStatus(id: string, status: "DRAFT" | "PUBLISHED") {
  try {
    await requireAdmin();
    await prisma.post.update({ where: { id }, data: { status } });
    revalidatePath("/fr/dojo-time");
    revalidatePath("/en/dojo-time");
    revalidatePath("/fr/admin/dojo-time");
    revalidatePath("/en/admin/dojo-time");
    return { success: true };
  } catch (e) {
    return { error: e instanceof Error ? e.message : "Erreur inconnue" };
  }
}

export async function deletePost(id: string) {
  try {
    await requireAdmin();
    await prisma.post.delete({ where: { id } });
    revalidatePath("/fr/dojo-time");
    revalidatePath("/en/dojo-time");
    revalidatePath("/fr/admin/dojo-time");
    revalidatePath("/en/admin/dojo-time");
    return { success: true };
  } catch (e) {
    return { error: e instanceof Error ? e.message : "Erreur inconnue" };
  }
}
