# Citadelle Jiu-Jitsu

Site web officiel de **Citadelle Jiu-Jitsu** — école d'arts martiaux à Québec.
Premier projet pilote d'[**Horizon 91**](https://horizon91.ca).

---

## Stack

Next.js 16 · TypeScript · Tailwind v4 · Prisma · PostgreSQL · Stripe · next-intl · JWT (jose) · bcrypt

---

## Démarrage rapide

### Prérequis
- Node.js 20+
- Docker + Docker Compose
- Un compte Stripe (mode test)

### 1. Installation

```bash
git clone <repo>
cd citadelle-jiu-jitsu
npm install
```

### 2. Variables d'environnement

```bash
cp .env.example .env.local
# Éditer .env.local et remplir au minimum :
#   - DATABASE_URL (déjà bon pour Docker local par défaut)
#   - JWT_SECRET (générer avec : openssl rand -base64 64)
#   - STRIPE_SECRET_KEY + NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY (mode test)
#   - SEED_ADMIN_EMAIL + SEED_ADMIN_PASSWORD
```

### 3. Base de données

```bash
docker compose -f docker-compose.dev.yml up -d
npm run prisma:migrate    # crée les tables
npm run prisma:seed       # crée admin + plans + produits
```

### 4. Lancer le site

```bash
npm run dev
# → http://localhost:3000 (redirige vers /fr)
```

### 5. Webhooks Stripe (optionnel, pour tester paiements)

```bash
# Dans un autre terminal :
stripe listen --forward-to http://localhost:3000/api/webhooks/stripe
# Copier le `whsec_...` affiché dans .env.local → STRIPE_WEBHOOK_SECRET
```

---

## Scripts npm

| Commande | Effet |
|---|---|
| `npm run dev` | Serveur de développement avec hot reload |
| `npm run build` | Build de production |
| `npm run start` | Démarre le build de production |
| `npm run lint` | ESLint |
| `npm run type-check` | Vérification TypeScript stricte |
| `npm run format` | Prettier (write) |
| `npm run prisma:generate` | Régénère le client Prisma |
| `npm run prisma:migrate` | Migrations Prisma (dev) |
| `npm run prisma:studio` | UI graphique Prisma sur la BD |
| `npm run prisma:seed` | Seed initial (admin + plans + produits) |

---

## Structure

```
citadelle-jiu-jitsu/
├── app/
│   ├── [locale]/              ← routing i18n FR/EN
│   │   ├── layout.tsx         ← root layout (html/body)
│   │   ├── page.tsx           ← accueil
│   │   ├── instructeurs/
│   │   ├── horaires/
│   │   ├── galerie/
│   │   ├── contact/
│   │   ├── seance-essai/
│   │   ├── abonnements/
│   │   ├── boutique/
│   │   ├── connexion/
│   │   ├── inscription/
│   │   └── admin/             ← protégé par middleware
│   ├── api/
│   │   ├── auth/              ← login, register, logout, me
│   │   ├── trial/             ← séance d'essai
│   │   ├── checkout/          ← Stripe Checkout
│   │   └── webhooks/stripe/   ← webhook Stripe
│   └── globals.css            ← Tailwind v4 + design tokens
├── components/                ← Header, Footer, AuthForm, TrialForm, LocaleSwitcher
├── lib/
│   ├── auth.ts                ← JWT + bcrypt helpers
│   ├── db.ts                  ← client Prisma singleton
│   ├── stripe.ts              ← client Stripe
│   ├── validation.ts          ← schémas Zod
│   ├── locales.ts             ← config FR/EN
│   └── data/                  ← données fictives (instructors, schedule)
├── messages/                  ← traductions JSON FR/EN
├── prisma/
│   ├── schema.prisma          ← modèle BD
│   └── seed.ts                ← seed initial
├── i18n/request.ts            ← config next-intl serveur
├── middleware.ts              ← i18n routing + protection admin
├── next.config.ts             ← headers de sécurité + plugin next-intl
├── Dockerfile                 ← build production multi-stage
└── docker-compose.dev.yml     ← Postgres pour dev local
```

---

## Sécurité

Voir `AGENTS.md` (section Sécurité) pour la liste complète des règles non-négociables Horizon 91.

En résumé :
- HTTPS + HSTS + CSP + X-Frame-Options
- JWT en cookie HttpOnly + Secure + SameSite=Lax
- bcrypt coût 12 minimum
- Validation Zod sur tous les inputs serveur
- Honeypot anti-spam sur formulaires publics
- Conformité Loi 25 Québec (politique de confidentialité à finaliser)

---

## Documentation

- **Conventions IA / contexte projet** : `AGENTS.md` (et son alias `CLAUDE.md`)
- **Plan de développement Horizon 91** : `~/Horizon91/core/Documentation/`

---

## Licence

Propriété de Citadelle Jiu-Jitsu et Horizon 91. Tous droits réservés.
