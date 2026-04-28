# MIGRATION — De ton scaffold initial au projet complet

Ce document est **temporaire** : à supprimer une fois la migration faite.

## Contexte

Le 27 avril 2026, ton scaffold de départ était :
- `npx create-next-app@16.2.4` brut
- Aucune dépendance ajoutée (ni Prisma, ni Stripe, ni next-intl, etc.)
- Pages : `app/page.tsx` + `app/layout.tsx` (default)

Cette session a généré la **structure complète** du projet pilote — i18n bilingue, auth, Stripe, admin, boutique, sécurité, Docker.

---

## Étapes de migration (à faire dans WSL Ubuntu)

### 1. Récupérer les fichiers générés

Les fichiers sont dans `C:\Users\Pc\OneDrive\Documents\Horizon 91\Web\Citadelle_JiuJitsu\Citadelle Jiu-Jitsu\`.
Depuis WSL, tu peux y accéder via `/mnt/c/Users/Pc/OneDrive/Documents/Horizon 91/Web/Citadelle_JiuJitsu/Citadelle Jiu-Jitsu/`.

**Option A — repartir from scratch (recommandé, propre)** :
```bash
cd ~/Horizon91/divisions/Web

# Sauvegarder l'ancien si besoin
mv citadelle-jiu-jitsu citadelle-jiu-jitsu.old.$(date +%Y%m%d)

# Créer le nouveau dossier et copier tous les fichiers générés
mkdir citadelle-jiu-jitsu
cd citadelle-jiu-jitsu

# Copier (attention au chemin avec espace) :
cp -r "/mnt/c/Users/Pc/OneDrive/Documents/Horizon 91/Web/Citadelle_JiuJitsu/Citadelle Jiu-Jitsu/." .
```

**Option B — merger sur l'existant** (si tu veux garder ton `.git` et ton `package-lock.json`) :
```bash
cd ~/Horizon91/divisions/Web/citadelle-jiu-jitsu

# Supprimer les fichiers défaut create-next-app qui vont être remplacés
rm app/page.tsx app/layout.tsx app/globals.css

# Copier les nouveaux fichiers (rsync préserve la structure)
rsync -av --exclude=node_modules --exclude=.next --exclude=.git \
  "/mnt/c/Users/Pc/OneDrive/Documents/Horizon 91/Web/Citadelle_JiuJitsu/Citadelle Jiu-Jitsu/" .

# Le package-lock devra être regénéré (nouvelles deps)
rm package-lock.json
```

### 2. Installer les nouvelles dépendances

```bash
npm install
# Ça va prendre 1-2 minutes (Prisma + Stripe + next-intl + bcrypt + jose + zod)
```

### 3. Configurer l'environnement

```bash
cp .env.example .env.local
nano .env.local
# Au minimum, remplir :
#   - JWT_SECRET (générer : openssl rand -base64 64)
#   - SEED_ADMIN_EMAIL + SEED_ADMIN_PASSWORD
# Stripe peut rester en placeholder pour l'instant (les pages tournent sans)
```

### 4. Lancer Postgres + initialiser la BD

```bash
# Démarre Postgres dans Docker
docker compose -f docker-compose.dev.yml up -d

# Attendre 5s que Postgres soit prêt, puis :
npx prisma migrate dev --name init
npm run prisma:seed
```

### 5. Lancer le site

```bash
npm run dev
# → http://localhost:3000 (redirige automatiquement vers /fr)
```

### 6. Tester rapidement

- `http://localhost:3000` → redirige vers `/fr` (homepage)
- `http://localhost:3000/en` → version anglaise
- `http://localhost:3000/fr/abonnements` → 4 plans depuis la BD
- `http://localhost:3000/fr/boutique` → 6 produits depuis la BD
- `http://localhost:3000/fr/connexion` → connecte-toi avec `SEED_ADMIN_EMAIL/PASSWORD`
- Après connexion admin → `/fr/admin` → dashboard avec stats

### 7. Vérifications

```bash
npm run type-check    # 0 erreur attendu
npm run lint          # warnings OK, errors à corriger
npm run build         # doit compiler sans erreur
```

### 8. Premier commit

```bash
git add .
git commit -m "feat: scaffold complet — i18n, auth, Stripe, admin, sécurité

- Setup Next.js 16 + TypeScript + Tailwind v4
- i18n FR/EN avec next-intl
- Auth JWT (jose) + bcrypt + cookies HttpOnly
- Schéma Prisma complet (User, Plans, Subscriptions, Products, Orders, TrialSessions)
- Stripe Checkout (abonnements + boutique) + webhook
- Admin protégé (middleware + re-check BD du rôle)
- Sécurité : CSP, HSTS, X-Frame-Options, honeypot
- Docker : Dockerfile multi-stage + Postgres dev"
git push origin main
```

### 9. Supprimer ce fichier

```bash
rm MIGRATION.md
git add MIGRATION.md
git commit -m "docs: cleanup migration doc"
```

---

## Si quelque chose ne marche pas

| Problème | Solution |
|---|---|
| `Module not found: @/lib/...` | Vérifier `tsconfig.json` → `paths: { "@/*": ["./*"] }` |
| `next-intl: Couldn't find next.config` | `i18n/request.ts` doit être à la racine, pas dans `src/` |
| `Prisma Client not generated` | `npx prisma generate` |
| Erreur connexion BD | Postgres démarré ? `docker ps` |
| `JWT_SECRET trop court` | Min 32 caractères. `openssl rand -base64 64` |
| Page admin → 500 | Vérifier que tu es bien admin (rôle en BD via `npm run prisma:studio`) |
