# AGENTS.md — Citadelle Jiu-Jitsu

> Source de vérité pour Claude, Copilot, et autres assistants IA travaillant sur ce projet.
> `CLAUDE.md` ne fait que pointer ici (`@AGENTS.md`).

---

## Contexte

Site web officiel de **Citadelle Jiu-Jitsu**, gym d'arts martiaux à Québec.
Premier projet pilote de l'agence **Horizon 91** (Jonathan Patoine).
Sert de **template de référence Commerce Complet** pour tous les futurs projets Horizon Web.
Client : Kristina (proprio) + JS (directeur marketing).

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
| Rate limiting | @upstash/ratelimit + @upstash/redis (Vercel Edge) |
| Lint | ESLint 9 (config Next.js) |
| Format | Prettier 3 |
| Hébergement cible | Vercel |

---

## Conventions

### Structure
- **Pas de `src/`** — tout est à la racine (`app/`, `components/`, `lib/`, etc.)
- Path alias : `@/*` → `./*`
- App Router avec routing `[locale]` : `app/[locale]/<page>/page.tsx`
- API routes : `app/api/<endpoint>/route.ts`
- **`proxy.ts`** remplace `middleware.ts` (Next.js 16 breaking change — ne jamais recréer middleware.ts)

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
10. **Conformité Loi 25 Québec** — politique de confidentialité livrée.
11. **Rate limiting** Upstash : 5 tentatives login / 15 min, 3 inscriptions / h, par IP.

---

## Commandes essentielles

```bash
# Sync OneDrive → WSL (toujours faire en début de session)
~/sync-citadelle.sh

# Installer les dépendances (à faire une fois)
npm install

# Lancer la BD locale
docker compose -f docker-compose.dev.yml up -d

# Migrer + seeder la BD (à refaire à chaque modif schema.prisma)
npx prisma migrate dev --name "description"
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

## Modules livrés (état au 19 mai 2026)

### Infrastructure
✅ Setup Next.js 16 + TypeScript + Tailwind v4
✅ i18n FR/EN complet (next-intl)
✅ Schéma Prisma (User, SubscriptionPlan, UserSubscription, Product, Order, OrderItem, TrialSession, ContactMessage, Post)
✅ BillingInterval : MONTH, YEAR, ONETIME
✅ PostCategory : COMPETITION, BELTS, ANNOUNCEMENT, COMMUNITY
✅ Seed avec 1 admin + 4 plans réels + 4 produits réels
✅ Docker : Dockerfile multi-stage + docker-compose dev (Postgres)
✅ proxy.ts (ex-middleware.ts) — i18n + protection routes admin
✅ Sitemap dynamique (routes statiques + slugs Dojo Time)
✅ robots.ts
✅ SEO : metadata, JSON-LD SportsClub, Open Graph

### Auth
✅ JWT + bcrypt + cookies HttpOnly/Secure/SameSite=Lax
✅ Register / Login / Logout
✅ Remember me : session cookie (2h JWT) ou persistant 7 jours
✅ ADMIN toujours 7 jours, USER selon checkbox
✅ Feedback logout : redirect /connexion?bye=1 + bannière verte
✅ Rate limiting Upstash : login 5/15min, register 3/h (désactivé gracieusement en dev sans vars)
✅ Anti-énumération : même message email inconnu / mot de passe faux
✅ Re-vérification rôle en BD dans le layout admin

### Pages publiques
✅ Accueil (hero animé, coach spotlight, valeurs, showcase, CTA)
✅ Instructeurs
✅ Horaires
✅ Galerie
✅ Contact
✅ Séance d'essai (formulaire + API)
✅ Abonnements (plans réels : mensuel 135$/mo, carte 10 séances 150$, cours privé 70$, drop-in 20$)
✅ Boutique (rash guard, cuissard, hoodie, crew neck — Noir)
✅ Dojo Time (feed PUBLISHED, filtré, ordonné par date)
✅ Dojo Time / [slug] (article individuel, renderer Markdown léger : ##, **bold**, *italic*, ---)
✅ Lien Smoothcomp sur page accueil (section coach) + page instructeurs (entre accomplissements et philosophie)
✅ Confidentialité (Loi 25 QC + PIPEDA)
✅ Conditions

### Pages auth / compte
✅ /connexion (Remember me checkbox, bannière bye)
✅ /inscription
✅ /mon-compte (abonnement actif, historique commandes, profil)

### Admin (/[locale]/admin/*)
✅ Dashboard (stats agrégées : commandes, inscriptions, messages non-lus, membres)
✅ Produits (CRUD complet : créer, modifier, activer/désactiver, supprimer)
✅ Abonnements (toggle actif/inactif — modifs prix via Stripe Groupe Supernova)
✅ Inscriptions / séances d'essai (machine d'état : PENDING→CONFIRMED/CANCELED→ATTENDED/NO_SHOW)
✅ Commandes (PAID→READY_PICKUP→DELIVERED)
✅ Messages contact (lire/marquer lu, supprimer)
✅ Utilisateurs (liste read-only, badge ADMIN gold)
✅ Dojo Time (CRUD articles : créer, modifier, publier/dépublier, supprimer)

### Sécurité headers
✅ CSP, HSTS, X-Frame-Options, X-Content-Type-Options, Permissions-Policy

### Composants admin (Client Components)
✅ ProductModal, ProductActions, ProductCreateButton
✅ PlanToggle
✅ TrialActions
✅ OrderActions
✅ ContactMessageActions
✅ PostModal, PostAdminActions

---

## Contenu Dojo Time — articles créés (19 mai 2026)

5 articles PUBLISHED en base, chronologiques :

| Slug | Catégorie | Date | Image |
|---|---|---|---|
| `east-coast-absolute-or-mai-2026` | COMPETITION | 18 mai 2026 | ⏳ à copier (`JS ECFS.jpg` → `public/images/dojo-time/east-coast-absolute-mai-2026.jpg`) |
| `hub-grappling-double-or-mai-2026` | COMPETITION | 10 mai 2026 | ⏳ placeholder (photo à recevoir de JS) |
| `adcc-calgary-open-argent-avril-2026` | COMPETITION | 28 avr 2026 | ⏳ placeholder (photo à recevoir de JS) |
| `ouverture-citadelle-jiu-jitsu-quebec` | ANNOUNCEMENT | 1 avr 2026 | — |
| `pourquoi-commencer-bjj-quebec` | COMMUNITY | 15 avr 2026 | — |

**À créer prochainement :**
- Article IBJJF Montreal International Open 2026 (double or JS + Max) — dossier photo en préparation par Jonathan
- Fiche instructeur Max — en attente infos/photo
- Article Hub Grappling mai 2026 (photo podium à recevoir)

**Images en attente :**
- JS ECFS (East Coast) → déjà sauvegardée dans `Images/JS ECFS.jpg`
- JS IBJJF Montreal Open double or → à sauvegarder depuis Facebook
- JS Hub Grappling → à sauvegarder depuis Facebook
- Max au Montreal Open → à sauvegarder

---

## En attente (client / déploiement)

| Item | Bloqué sur |
|---|---|
| Notifications email (commandes, séances d'essai) | Email Resend — JS doit fournir l'email business |
| Reset mot de passe ("Mot de passe oublié") | Resend idem |
| Photos instructeurs (JS + Max) | JS / Paulina |
| Photos produits | Kristina |
| Dossier historique Citadelle (compétitions, événements) | Jonathan — en préparation |
| Fiche instructeur Max (nom complet, grade, bio) | JS |
| Décision politique enfants / mensuel | JS |
| Clés Stripe production | Pre-deploy |
| Credentials Upstash production | Pre-deploy (upstash.com → créer DB Redis gratuit) |
| Manuel client PDF | Fin de projet, remis en main propre |

---

## Pre-deploy checklist (session dédiée)

- [ ] `npm run build` propre (0 erreurs TypeScript)
- [ ] `npm run lint` propre
- [ ] Variables Vercel : DATABASE_URL, JWT_SECRET, STRIPE_*, UPSTASH_*, NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
- [ ] Stripe live keys (sk_live_, pk_live_)
- [ ] Upstash Redis créé + vars copiées
- [ ] Test flow complet : inscription → achat → webhook → commande admin
- [ ] Test Stripe Checkout séance d'essai
- [ ] DNS Vercel → citadellejiujitsu.ca
- [ ] Google Search Console → soumettre sitemap

---

## Notes spécifiques au projet

- **Boutique sans expédition automatique** : ramassage au dojo OU livraison manuelle. Pas d'intégration transporteur.
- **Compte admin** : créé par seed depuis `SEED_ADMIN_EMAIL` / `SEED_ADMIN_PASSWORD`. À changer après 1ère connexion prod.
- **Stripe en mode test** par défaut — passer en `_live_` uniquement après pre-deploy complet.
- **BillingInterval ONETIME** → Stripe `mode:"payment"` (pas subscription).
- **Dojo Time externalUrl** → champ optionnel pour lier vers futur site Groupe Supernova arts martiaux (flywheel strategy).
- **middleware.ts SUPPRIMÉ** — Next.js 16 utilise proxy.ts. Ne jamais recréer middleware.ts.
- **Sync requis** : OneDrive (Cowork édite) → WSL (npm run dev). Toujours `~/sync-citadelle.sh` avant de lancer le serveur.

---

## Liens utiles

- Spec projet originale : `AGENTS.md` (ce fichier)
- Site vitrine Horizon 91 (frère) : `~/Horizon91/divisions/Web/HorizonSite/`
- Master context Horizon 91 : `C:\Users\Pc\OneDrive\Documents\Horizon 91\horizon91_master.md`
- Starlog : `C:\Users\Pc\OneDrive\Documents\Horizon 91\STARLOG_Vaisseau_Horizon91.md`
