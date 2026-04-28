// =============================================================================
// Schémas de validation Zod
// -----------------------------------------------------------------------------
// Source unique pour valider les inputs côté serveur (API routes) ET
// inférer les types côté client (formulaires).
// =============================================================================

import { z } from "zod";

// -----------------------------------------------------------------------------
// Auth
// -----------------------------------------------------------------------------

export const loginSchema = z.object({
  email: z.string().email("Courriel invalide"),
  password: z.string().min(1, "Mot de passe requis"),
});

export const registerSchema = z
  .object({
    firstName: z.string().min(1, "Prénom requis").max(100),
    lastName: z.string().min(1, "Nom requis").max(100),
    email: z.string().email("Courriel invalide").max(254),
    password: z
      .string()
      .min(10, "Minimum 10 caractères")
      .max(128, "Maximum 128 caractères")
      .regex(/[A-Z]/, "Doit contenir une majuscule")
      .regex(/[a-z]/, "Doit contenir une minuscule")
      .regex(/[0-9]/, "Doit contenir un chiffre"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Les mots de passe ne correspondent pas",
    path: ["confirmPassword"],
  });

export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;

// -----------------------------------------------------------------------------
// Séance d'essai
// -----------------------------------------------------------------------------

export const trialSessionSchema = z.object({
  firstName: z.string().min(1).max(100),
  lastName: z.string().min(1).max(100),
  email: z.string().email().max(254),
  phone: z
    .string()
    .min(10, "Numéro invalide")
    .max(20)
    .regex(/^[\d\s\-+().]+$/, "Caractères invalides"),
  age: z.coerce.number().int().min(4, "Âge minimum: 4 ans").max(99),
  experience: z.enum(["NONE", "SOME", "YEARS"]),
  preferredDate: z.coerce.date().refine((d) => d > new Date(), {
    message: "La date doit être dans le futur",
  }),
  message: z.string().max(1000).optional(),
  // Honeypot anti-spam (champ caché — doit rester vide)
  website: z.string().max(0, "Spam détecté").optional(),
});

export type TrialSessionInput = z.infer<typeof trialSessionSchema>;

// -----------------------------------------------------------------------------
// Contact
// -----------------------------------------------------------------------------

export const contactSchema = z.object({
  name: z.string().min(1).max(200),
  email: z.string().email().max(254),
  subject: z.string().min(1).max(200),
  message: z.string().min(10, "Message trop court").max(5000),
  website: z.string().max(0).optional(), // honeypot
});

export type ContactInput = z.infer<typeof contactSchema>;

// -----------------------------------------------------------------------------
// Admin — Produits
// -----------------------------------------------------------------------------

export const productSchema = z.object({
  slug: z
    .string()
    .min(1)
    .max(120)
    .regex(/^[a-z0-9-]+$/, "Slug invalide (a-z, 0-9, tirets)"),
  nameFr: z.string().min(1).max(200),
  nameEn: z.string().min(1).max(200),
  descriptionFr: z.string().min(1).max(2000),
  descriptionEn: z.string().min(1).max(2000),
  priceCents: z.coerce.number().int().min(1, "Prix invalide"),
  category: z.enum(["APPAREL", "GEAR", "ACCESSORY"]),
  imageUrl: z.string().url().optional().nullable(),
  stockQuantity: z.coerce.number().int().min(0),
  active: z.boolean().default(true),
});

export type ProductInput = z.infer<typeof productSchema>;
