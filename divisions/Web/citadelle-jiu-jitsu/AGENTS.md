# AGENTS.md — Citadelle Jiu-Jitsu

> Source de vérité pour Claude, Copilot, et autres assistants IA travaillant sur ce projet.
> `CLAUDE.md` ne fait que pointer ici (`@AGENTS.md`).

---

## Contexte

Site web officiel de **Citadelle Jiu-Jitsu**, gym d'arts martiaux à Québec.
Premier projet pilote de l'agence **Horizon 91** (Jonathan Patoine).
Sert de **template de référence** pour tous les futurs projets Horizon Web.

---

## Stack

| Couche | Tech |
|---|---|
| Framework | Next.js 16.2.4 (App Router) |
| Langage | TypeScript 5 (strict) |
| Styles | Tailwind CSS v4 (config inline via `@theme` dans globals.css) |
| i18n | next-intl 3 (FR / EN) |
| ORM | Prisma 6 |
| BD | PostgreSQL 16 (Docker en dev) |
| Auth | JWT (jose, edge-compatible) + bcryptjs (hash) |
| Paiement | Stripe (Checkout Sessions) |
| Lint | ESLint 9 (config Next.js) |
| Format | Prettier 3 |
| Hébergement cible | OVH Canada / Vercel / AWS Lightsail |

---

## Conventions

### Structure
- **Pas de `src/`** — tout est à la racine (`app/`, `components/`, `lib/`, etc.)
- Path alias : `@/*` → `./*`
- App Router avec routing `[locale]` : `app/[locale]/<page>/page.tsx`
- API routes : `app/api/<endpoint>/route.ts`

### Nommage
- Composants : `PascalCase.tsx` dans `components/`
- Pages : `page.tsx` (convention Next.js)
- Utilitaires : `camelCase.ts` dans `lib/`
- Variables CSS : `--color-citadelle-*` (tokens centralisés dans `globals.css`)

### Commits (conventionnels, en français)
```
type(scope): description courte

- détail 1
- détail 2
```
Types : `feat`, `fix`, `refactor`, `docs`, `style`, `chore`, `test`, `build`.

### Sécurité (NON-NÉGOCIABLE — règle Horizon 91)
1. **Jamais de secrets dans Git** — tout dans `.env.local` (gitignored).
2. **Validation Zod** sur TOUS les inputs côté serveur.
3. **JWT en cookie HttpOnly + Secure + SameSite=Lax**.
4. **bcrypt** avec coût minimum 12.
5. **CSP + HSTS + X-Frame-Options** déjà configurés dans `next.config.ts`.
6. **Honeypot** sur formulaires publics (champ caché `website`).
7. **Re-vérification BD du rôle admin** dans le layout admin (défense en profondeur — pas que le JWT).
8. **Prix lus depuis la BD**, jamais depuis le client (Stripe Checkout).
9. **Webhook Stripe** vérifie la signature avec `STRIPE_WEBHOOK_SECRET`.
10. **Conformité Loi 25 Québec** — politique de confidentialité à finaliser avant lancement public.

---

## Commandes essentielles

```bash
# Installer les dépendances (à faire une fois)
npm install

# Lancer la BD locale
docker compose -f docker-compose.dev.yml up -d

# Migrer + seeder la BD (à refaire à chaque modif schema.prisma)
npm run prisma:migrate
npm run prisma:seed

# Développement
npm run dev          # http://localhost:3000 → redirige vers /fr

# Vérifications avant commit
npm run type-check
npm run lint
npm run format

# Production (build local)
npm run build
npm run start
```

---

## Modules livrés (état au 28 avril 2026)

✅ Setup Next.js 16 + TypeScript + Tailwind v4
✅ i18n FR/EN complet (next-intl)
✅ Schéma Prisma (User, SubscriptionPlan, UserSubscription, Product, Order, TrialSession, ContactMessage)
✅ Seed avec 1 admin + 4 plans + 6 produits
✅ Auth JWT + bcrypt + cookies HttpOnly
✅ API routes : login, register, logout, me, trial, checkout, webhook Stripe
✅ Pages publiques : accueil, instructeurs, horaires, galerie, contact, séance d'essai, abonnements, boutique
✅ Pages auth : connexion, inscription
✅ Admin : layout protégé + dashboard + listes produits/abonnements/séances d'essai
✅ Sécurité : headers HTTP (CSP, HSTS, etc.), middleware de protection admin, honeypot anti-spam
✅ Docker : Dockerfile multi-stage + docker-compose dev (Postgres)

---

## À faire (sessions futures, par ordre de priorité)

1. **Notifications email** — Resend pour notifier le proprio des nouvelles séances d'essai et commandes
2. **CRUD admin complet** — modales create/edit/delete pour produits, plans, utilisateurs (Server Actions)
3. **Page commandes admin** — historique, marquer "remis", refunds
4. **Page utilisateurs admin** — promouvoir/rétrograder rôle, voir abonnements actifs
5. **Formulaire contact public** — analogue à TrialForm + endpoint `/api/contact`
6. **Politique de confidentialité Loi 25** — `/[locale]/confidentialite`
7. **Branding officiel** — remplacer placeholders dans `globals.css` (`--color-citadelle-*`) + logo dans `public/`
8. **Photos clients** — galerie + photos d'instructeurs
9. **Rate limiting** — middleware avec Upstash ou en-mémoire pour les endpoints publics
10. **Tests** — Vitest pour la logique métier, Playwright pour les flows critiques
11. **CI/CD** — GitHub Actions (lint + type-check + build sur PR)
12. **Déploiement** — choix final entre OVH Canada / Vercel / Lightsail

---

## Notes spécifiques au projet

- **Boutique sans expédition automatique** : ramassage au dojo OU livraison manuelle par le proprio. Pas d'intégration transporteur (fournisseur au Pakistan, le proprio gère).
- **Compte admin** : créé automatiquement par le seed depuis `SEED_ADMIN_EMAIL`. À CHANGER après la 1ère connexion en prod.
- **Stripe en mode test** par défaut — clés `sk_test_` / `pk_test_`. Passer en `_live_` uniquement après audit complet.
- **Loi 25 Québec** : tous les inputs utilisateurs sont stockés dans la BD locale (pas de tracking tiers). Politique de confidentialité à rédiger.

---

## Liens utiles

- Spec projet originale : `~/Horizon91/divisions/Web/citadelle-jiu-jitsu/CLAUDE.md` → `@AGENTS.md`
- Documents Horizon 91 : `~/Horizon91/core/Documentation/`
- Branding Horizon 91 : `~/Horizon91/core/Branding/`
- Site vitrine Horizon 91 (frère) : `~/Horizon91/divisions/Web/HorizonSite/`
