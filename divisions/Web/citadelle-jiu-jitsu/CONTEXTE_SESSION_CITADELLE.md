# Contexte Session — Citadelle Jiu-Jitsu

> Document de handoff entre sessions. À uploader en début de chaque nouvelle conversation.
> **Dernière mise à jour : 28 avril 2026 — fin de la session de scaffolding.**
> Auteur : Jonathan Patoine, Horizon 91.

---

## 0. Comment utiliser ce fichier

À l'ouverture d'une nouvelle session avec Claude (Sonnet ou Opus) :
1. Upload ce fichier dans le contexte
2. Upload aussi `AGENTS.md` (source de vérité des conventions Horizon 91)
3. Décris la tâche du jour. L'agent saura où on est sans avoir besoin de tout relire.

Compléter ce document à la fin de chaque session significative.

---

## 1. Qui est Jonathan (rappel court)

- Étudiant AEC Cybersécurité, Collège Cumberland Montréal — diplôme déc. 2026
- Fondateur **Horizon 91** (agence tech locale, Sainte-Marie-de-Beauce)
- Environnement : **WSL 2 Ubuntu + VS Code + Docker Desktop**
- Disponibilités : lundi-jeudi PM/soir + weekends complets, **mode papa 16h-20h les jours de semaine**
- Style de collab : sensei mode, comprendre chaque étape, commits conventionnels en français

---

## 2. Le projet Citadelle Jiu-Jitsu

- **Client** : ami de Jonathan, propriétaire d'un dojo de jiu-jitsu à Québec
- **Accord** : projet réalisé gratuitement contre droits portfolio + entente future basée sur augmentation CA
- **Statut stratégique** : projet pilote vitrine pour Horizon 91 — sert de **template de référence** pour tous les futurs projets Horizon Web
- **Workspace** : `~/Horizon91/divisions/Web/citadelle-jiu-jitsu/`
- **Repo GitHub** : `https://github.com/NoOneJoe07/Horizon91` (sous `divisions/Web/citadelle-jiu-jitsu/`)

---

## 3. État technique au 28 avril 2026

### Ce qui est livré et fonctionnel

✅ **Scaffold complet Next.js 16.2.4 + TypeScript strict + Tailwind v4**
✅ **i18n bilingue FR/EN** (next-intl v4) — routing `/fr` et `/en`, switcher langue
✅ **Prisma 6.19.3** — 8 tables (User, SubscriptionPlan, UserSubscription, Product, Order, OrderItem, TrialSession, ContactMessage), migration `init` appliquée
✅ **Seed exécuté** — 1 admin + 4 plans + 6 produits fictifs en BD
✅ **Auth JWT** (`jose`, edge-compatible) + bcrypt + cookies HttpOnly + SameSite=Lax
✅ **API routes** — `/api/auth/{login,register,logout,me}`, `/api/trial`, `/api/checkout`, `/api/webhooks/stripe`
✅ **Pages publiques** — accueil, instructeurs, horaires, galerie, contact, séance-essai, abonnements, boutique, connexion, inscription
✅ **Admin protégé** — middleware + re-vérif rôle BD dans le layout (défense en profondeur), dashboard avec stats, sous-pages produits/abonnements/séances d'essai
✅ **Sécurité** — CSP, HSTS, X-Frame-Options, Permissions-Policy, honeypot anti-spam, validation Zod sur tous les inputs serveur
✅ **Docker** — Dockerfile multi-stage prod + `docker-compose.dev.yml` (Postgres 16-alpine sur port 5432)
✅ **Git** — staged/commit/push effectués en fin de session 28 avril

### Versions exactes (figées)

| Package | Version |
|---|---|
| next | 16.2.4 |
| next-intl | ^4.4.0 (bumpé pour compat Next 16) |
| react / react-dom | 19.2.4 |
| @prisma/client / prisma | ^6.2.0 (résolu en 6.19.3) |
| tailwindcss / @tailwindcss/postcss | ^4 |
| typescript | ^5 |
| zod | ^3.24.1 |
| stripe | ^17.5.0 |
| jose | ^5.9.6 |
| bcryptjs | ^2.4.3 |

### Convention d'architecture (NON-NÉGOCIABLE — c'est le template Horizon Web)

- **Pas de `src/`** — tout à la racine (`app/`, `components/`, `lib/`, etc.)
- **Path alias** : `@/*` → `./*` (PAS `./src/*`)
- **Routing i18n** : `app/[locale]/<page>/page.tsx`
- **API** : `app/api/<endpoint>/route.ts`
- **Variables CSS** : tokens centralisés dans `app/globals.css` (`--color-citadelle-*`)
- **Validation** : tous les inputs serveur passent par Zod (`lib/validation.ts`)
- **Auth** : `getSession()`, `requireUser()`, `requireAdmin()` dans `lib/auth.ts`
- **Prix** : TOUJOURS lus depuis la BD (jamais depuis le client) côté checkout Stripe

---

## 4. Pièges connus à se rappeler

| Piège | Solution |
|---|---|
| `Environment variable not found: DATABASE_URL` au seed | Prisma CLI ne lit que `.env`, pas `.env.local`. Toujours `cp .env.example .env`. |
| `ERESOLVE peer dep` à `npm install` | Si Next bump major, vérifier que next-intl supporte la nouvelle version (peer dep souvent en retard). |
| `Port 3000 is in use` | Probablement le conteneur Docker `horizon91_site` (HorizonSite) qui tourne. `docker stop horizon91_site` ou utiliser le port 3001. |
| Warning `middleware deprecated → use proxy` | Next 16 a renommé la convention. À renommer `middleware.ts` → `proxy.ts` dans une session de cleanup. Ne casse rien pour l'instant. |
| Console : `eval() not supported (CSP)` | CSP trop strict pour le mode dev de React. Ajouter `'unsafe-eval'` au `script-src` UNIQUEMENT en dev (à conditionner sur `NODE_ENV`). |
| `favicon.ico 404` | Pas de favicon généré. Sera réglé quand le SVG du logo arrivera. |
| Pour relancer après reboot | `docker compose -f docker-compose.dev.yml up -d` puis `npm run dev`. |

---

## 5. Décisions de design prises aujourd'hui

- **Palette finale** : NOIR + OR (placeholder garde-actuelle). La version navy/blanc/or testée et **revertie** sur préférence Jonathan. À retravailler quand le client fournit les codes brand exacts.
- **Logo** : placeholder texte "CITADELLE" en or pour l'instant. Le client a un logo officiel (emblème citadelle hexagonal sur fond navy + "CITADELLE / JIU-JITSU"). SVG source à demander à l'ami du client.
- **Boutique** : pas d'expédition automatique. Ramassage au dojo OU livraison manuelle par le proprio (fournisseur au Pakistan, géré hors-app).
- **Compte admin par défaut** : créé via seed avec `SEED_ADMIN_EMAIL` / `SEED_ADMIN_PASSWORD` (`.env`). Modifier ces variables ne met PAS à jour le compte existant — utiliser Prisma Studio ou page settings (à coder) pour changer plus tard.

---

## 6. En attente du client (Jonathan vérifie cet aprèm 28 avril)

### Branding
- [ ] Fichier logo en **SVG** (à défaut PNG haute résolution)
- [ ] Codes **couleurs brand officiels** (hex, RGB ou Pantone)
- [ ] Variantes logo : pleine, simplifiée (favicon), monochrome blanche
- [ ] Préférence d'emplacement (header/footer/hero/filigrane)

### Stripe
- [ ] Le client a-t-il un compte Stripe ? Sinon c'est lui qui doit créer le sien (5 min)
- [ ] Vrais noms / prix / inclus de chaque **forfait d'abonnement**
- [ ] Vrais **produits boutique** (noms, prix CAD, photos, stock initial)
- [ ] Décision **taxes** : affichées TTC ou HT ? (TPS+TVQ Québec)

### Contenu (sessions futures)
- [ ] Photos pro du dojo (galerie)
- [ ] Bios + photos + grade exact des instructeurs
- [ ] Vrai horaire hebdomadaire
- [ ] Adresse / téléphone / courriel pro
- [ ] Comptes réseaux sociaux
- [ ] Détails séance d'essai (durée, déroulement, à apporter)

---

## 7. Plan pour la session suivante (29 avril 2026 prévu)

### Priorité 1 — Intégration logo (si SVG reçu)
- Sauvegarder dans `public/logo-citadelle.svg`
- Modifier `components/Header.tsx` et `components/Footer.tsx` pour utiliser `<Image>` au lieu du texte
- Générer favicon depuis SVG (sharp ou outil en ligne)
- Décider placement hero (au-dessus du titre ? filigrane ?)
- Mettre à jour palette `globals.css` avec codes brand officiels si fournis

### Priorité 2 — Stripe en mode test
- Créer compte Stripe test (Jonathan) si pas déjà fait
- Mettre `STRIPE_SECRET_KEY` (`sk_test_...`) et `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` (`pk_test_...`) dans `.env`
- Lancer `stripe listen --forward-to localhost:3001/api/webhooks/stripe` (port 3001 si 3000 pris)
- Copier `whsec_...` dans `STRIPE_WEBHOOK_SECRET`
- Tester un paiement avec carte `4242 4242 4242 4242`
- Vérifier que le webhook crée bien la commande / l'abonnement en BD

### Priorité 3 (si temps) — Vrais plans/produits
- Si le client fournit les vraies données : remplacer en BD via Prisma Studio OU modifier `prisma/seed.ts` + re-seeder

### Backlog (sessions ultérieures)
- Renommer `middleware.ts` → `proxy.ts` (Next 16 convention)
- Ajouter `'unsafe-eval'` au CSP en mode dev (conditionnel)
- Notifications email Resend (séances d'essai, commandes payées)
- CRUD admin complet (modales create/edit/delete via Server Actions)
- Page `/[locale]/confidentialite` Loi 25 Québec
- Formulaire `/[locale]/contact` analogue à TrialForm
- Rate limiting (Upstash ou en-mémoire)
- Tests Vitest + Playwright
- CI GitHub Actions
- Choix déploiement final (OVH Canada / Vercel / AWS Lightsail)

---

## 8. Commandes essentielles pour reprendre

```bash
# Se positionner
cd ~/Horizon91/divisions/Web/citadelle-jiu-jitsu

# Démarrer Postgres si arrêté
docker compose -f docker-compose.dev.yml up -d

# Lancer le serveur de dev
npm run dev
# → http://localhost:3000 (ou 3001 si HorizonSite occupe 3000)

# Connexion admin par défaut (si seed pas modifié)
# Email : valeur de SEED_ADMIN_EMAIL dans .env
# Mot de passe : valeur de SEED_ADMIN_PASSWORD dans .env

# Vérifier la BD visuellement
npm run prisma:studio
# → http://localhost:5555

# Quand on modifie schema.prisma
npm run prisma:migrate    # crée + applique migration
npm run prisma:seed       # re-seed (upsert, ne supprime pas)
```

---

## 9. Conseil sur le choix du modèle Claude

D'après l'expérience de la session du 28 avril :
- **Sonnet 4.6** suffit pour 80% du travail Citadelle (génération de pages, debug, doc, intégration Stripe, refactor)
- **Opus** à réserver pour : architecture initiale d'une nouvelle feature complexe, debug tordu multi-fichiers, audit de sécurité approfondi
- Sessions courtes et focalisées > sessions-marathons (le contexte qui grossit coûte exponentiellement)

---

*Fin du document. Si tu lis ceci en début de nouvelle session : bonjour, on continue. 🥋*
