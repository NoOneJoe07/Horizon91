# Contexte Session — Citadelle Jiu-Jitsu

> Document de handoff entre sessions. À uploader en début de chaque nouvelle conversation.
> **Dernière mise à jour : 29 avril 2026 — session données client + redesign frontend.**
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
- **Workspace Cowork** : `C:\Users\Pc\OneDrive\Documents\Horizon 91\Web\Citadelle_JiuJitsu\Citadelle Jiu-Jitsu\`
- **Repo WSL** : `~/Horizon91/divisions/Web/citadelle-jiu-jitsu/`
- **Repo GitHub** : `https://github.com/NoOneJoe07/Horizon91` (sous `divisions/Web/citadelle-jiu-jitsu/`)

---

## 3. Situation des deux copies du projet

> **IMPORTANT — à régler demain matin en priorité**

Il existe présentement **deux copies** du projet :
- **Cowork (OneDrive)** : là où Claude fait les modifications
- **WSL** : là où tourne `npm run dev`

**Plan pour demain** : merger tout vers OneDrive et pointer le dev server vers ce dossier, pour qu'il n'y ait plus qu'une seule source de vérité.

En attendant, après chaque session Cowork, copier avec ce bloc WSL :

```bash
SRC="/mnt/c/Users/Pc/OneDrive/Documents/Horizon 91/Web/Citadelle_JiuJitsu/Citadelle Jiu-Jitsu"
DEST="$HOME/Horizon91/divisions/Web/citadelle-jiu-jitsu"

cp "$SRC/lib/data/instructors.ts"            "$DEST/lib/data/instructors.ts"
cp "$SRC/lib/data/schedule.ts"               "$DEST/lib/data/schedule.ts"
cp "$SRC/app/globals.css"                    "$DEST/app/globals.css"
cp "$SRC/app/[locale]/page.tsx"              "$DEST/app/[locale]/page.tsx"
cp "$SRC/app/[locale]/instructeurs/page.tsx" "$DEST/app/[locale]/instructeurs/page.tsx"
cp "$SRC/app/[locale]/contact/page.tsx"      "$DEST/app/[locale]/contact/page.tsx"
cp "$SRC/components/Footer.tsx"              "$DEST/components/Footer.tsx"
cp "$SRC/messages/fr.json"                   "$DEST/messages/fr.json"
cp "$SRC/messages/en.json"                   "$DEST/messages/en.json"
```

---

## 4. État technique au 29 avril 2026

### Ce qui est livré et fonctionnel (hérité du 28 avril)

✅ **Scaffold complet Next.js 16.2.4 + TypeScript strict + Tailwind v4**
✅ **i18n bilingue FR/EN** (next-intl v4) — routing `/fr` et `/en`, switcher langue
✅ **Prisma 6.19.3** — 8 tables, migration `init` appliquée, seed exécuté
✅ **Auth JWT** (jose, edge-compatible) + bcrypt + cookies HttpOnly + SameSite=Lax
✅ **API routes** — `/api/auth/{login,register,logout,me}`, `/api/trial`, `/api/checkout`, `/api/webhooks/stripe`
✅ **Pages publiques** — accueil, instructeurs, horaires, galerie, contact, séance-essai, abonnements, boutique, connexion, inscription
✅ **Admin protégé** — middleware + re-vérif rôle BD, dashboard avec stats, sous-pages
✅ **Sécurité** — CSP, HSTS, X-Frame-Options, honeypot, validation Zod
✅ **Docker** — Dockerfile multi-stage + `docker-compose.dev.yml`

### Ajouts du 29 avril

✅ **Données réelles client intégrées**
- Adresse : 964 Rue Mainguy, Québec, QC G1V 3S4
- Téléphone : 418-564-1047 (cliquable `tel:`)
- Instagram : https://www.instagram.com/citadellebjj/
- Facebook : https://www.facebook.com/p/Citadelle-Jiu-Jitsu-61578755165328/

✅ **Horaire réel** (`lib/data/schedule.ts`) :
- Lun–Jeu : 12h00–13h30 et 19h00–21h00
- Mercredi : + nouveau cours 16h30–18h00 (nom à confirmer)
- Vendredi : 12h00–13h30 et Open Mat 18h00–19h00
- Sam & Dim : 11h00–12h30

✅ **Page Contact** mise à jour — vraie adresse, vrai téléphone, liens réseaux sociaux + Google Maps

✅ **Footer** — nouvelle colonne Contact/Social (téléphone, adresse, Instagram, Facebook)

✅ **Interface Instructor étendue** — `achievements`, `stats`, `philosophyFr/En`, `isFounder`, `titleFr/En`

✅ **Page d'accueil — redesign cinématique complet** :
- Hero full-viewport avec background animé (CSS keyframes `hero-animated-bg`)
- Orbes dorées respirantes
- Textes avec animations `fade-in-up` échelonnées
- Indicateur de scroll
- Section **Coach Spotlight** : stats Top 5 Canada / Intl. / Houston / 15 ans + placeholder photo
- Section Valeurs améliorée (accent doré top)
- Section **Showcase** — grille placeholder prête pour photos/vidéos
- **Trial Banner** final cinématique

✅ **Page Instructeurs — redesign personal brand** :
- Hero banner avec titre du fondateur
- Profil 2 colonnes : photo 3/4 + identité VS stats + bio + accomplissements + citation
- Note "équipe à venir" si un seul instructeur
- CTA séance d'essai

✅ **Animations CSS** ajoutées dans `globals.css` :
- `hero-animated-bg`, `fade-in-up` (4 délais), `orb-breathe`, `scroll-indicator`, `shimmer-in`, `gold-divider`
- Classes utilitaires : `stat-card-border`, `achievement-item`, `showcase-tile`

✅ **i18n** — nouveaux namespaces `Home.coach.*`, `Home.showcase.*`, `Home.trialBanner.*`, `Home.hero.scrollLabel`, `Instructors.achievements/philosophy/stats/teamSoon/trialCta*`

---

## 5. Versions exactes (figées)

| Package | Version |
|---|---|
| next | 16.2.4 |
| next-intl | ^4.4.0 |
| react / react-dom | 19.2.4 |
| @prisma/client / prisma | ^6.2.0 (résolu en 6.19.3) |
| tailwindcss / @tailwindcss/postcss | ^4 |
| typescript | ^5 |
| zod | ^3.24.1 |
| stripe | ^17.5.0 |
| jose | ^5.9.6 |
| bcryptjs | ^2.4.3 |

---

## 6. Convention d'architecture (NON-NÉGOCIABLE)

- **Pas de `src/`** — tout à la racine (`app/`, `components/`, `lib/`, etc.)
- **Path alias** : `@/*` → `./*`
- **Routing i18n** : `app/[locale]/<page>/page.tsx`
- **API** : `app/api/<endpoint>/route.ts`
- **Variables CSS** : tokens centralisés dans `app/globals.css` (`--color-citadelle-*`)
- **Validation** : tous les inputs serveur passent par Zod (`lib/validation.ts`)
- **Auth** : `getSession()`, `requireUser()`, `requireAdmin()` dans `lib/auth.ts`
- **Prix** : TOUJOURS lus depuis la BD côté checkout Stripe

---

## 7. En attente du client

### Contenu bloquant (frontend incomplet sans ça)
- [ ] **Logo** — SVG ou PNG haute-res (le client va vérifier ses fichiers)
- [ ] **Domaine** — il en possède un, va l'envoyer
- [ ] **Courriel professionnel** — il va s'en créer un pour toute la messagerie
- [ ] **Vrai nom + bio** du fondateur (historique impressionnant : Top 5 Canada, Houston, compétitions internationales, ceinture noire)
- [ ] **Photo** du fondateur (pour `public/` + `imageUrl` dans `instructors.ts`)
- [ ] **Nom exact du cours mercredi 16h30** (type, niveau)

### Stripe / Business
- [ ] **Forfaits abonnement** — structure (1 mois / 3 mois / 1 an) + prix + inclus
- [ ] **Cours privés** — prix, durée, fonctionnement réservation, politique annulation
- [ ] **Produits boutique** — liste + photos + prix CAD
- [ ] **Taxes** — confirmé enregistré TPS/TVQ (Jonathan vérifie) → Stripe doit collecter
- [ ] **Politique de remboursement** abonnements (Jonathan vérifie avec le client)
- [ ] Compte Stripe — le client doit créer le sien (5 min)

### Contenu marketing (2e vague)
- [ ] Photos du dojo (intérieur, tatami, cours en action)
- [ ] Témoignages d'élèves (3-5 quotes)
- [ ] Résultats de compétition (palmarès)
- [ ] Vrai horaire hebdomadaire complet (noms des cours)
- [ ] Comptes réseaux sociaux → déjà récupérés ✅

---

## 8. Pièges connus

| Piège | Solution |
|---|---|
| `Environment variable not found: DATABASE_URL` | Prisma CLI lit `.env`, pas `.env.local`. Toujours `cp .env.example .env`. |
| `Port 3000 is in use` | `docker stop horizon91_site` ou utiliser port 3001. |
| Warning `middleware deprecated` | Next 16 a renommé. `middleware.ts` → `proxy.ts` (backlog — ne casse rien). |
| `eval() not supported (CSP)` | Ajouter `'unsafe-eval'` au `script-src` UNIQUEMENT en dev, conditionné sur `NODE_ENV`. |
| `favicon.ico 404` | En attente du logo SVG client. |
| Deux copies du projet | Cowork édite OneDrive, dev server tourne dans WSL. Merger demain matin. |
| Pour relancer après reboot | `docker compose -f docker-compose.dev.yml up -d` puis `npm run dev`. |

---

## 9. Plan session 30 avril 2026

### Priorité 0 — Merger les deux copies (5 min)
- Choisir OneDrive comme source unique
- Configurer le dev server pour tourner depuis `/mnt/c/Users/Pc/OneDrive/...`
- Plus jamais de copie manuelle

### Priorité 1 — Intégration logo (si reçu)
- `public/logo-citadelle.svg`
- Modifier `Header.tsx` et `Footer.tsx`
- Générer favicon

### Priorité 2 — Stripe en mode test
- `STRIPE_SECRET_KEY` + `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` dans `.env`
- `stripe listen --forward-to localhost:3001/api/webhooks/stripe`
- Tester carte `4242 4242 4242 4242`

### Priorité 3 — Vrai contenu instructeur (si reçu)
- Remplacer les placeholders dans `lib/data/instructors.ts`
- Ajouter photo dans `public/`

### Backlog
- CRUD admin complet (modales create/edit/delete)
- Formulaire contact `/api/contact` (skeleton prêt)
- Notifications email Resend
- Page `/confidentialite` Loi 25 Québec
- Rate limiting
- Renommer `middleware.ts` → `proxy.ts`
- Tests Vitest + Playwright
- CI GitHub Actions
- Déploiement final (OVH Canada / Vercel / AWS Lightsail)

---

## 10. Commandes essentielles

```bash
# Depuis WSL — se positionner
cd ~/Horizon91/divisions/Web/citadelle-jiu-jitsu

# Démarrer Postgres
docker compose -f docker-compose.dev.yml up -d

# Lancer le dev server
npm run dev
# → http://localhost:3000

# Vérifier la BD
npm run prisma:studio
# → http://localhost:5555

# Quand on modifie schema.prisma
npm run prisma:migrate
npm run prisma:seed
```

---

## 11. Conseil modèle Claude

- **Sonnet 4.6** : suffisant pour 80% du travail (pages, debug, intégration, i18n)
- **Opus** : architecture complexe, debug multi-fichiers tordu, audit sécurité

---

*Fin du document. Si tu lis ceci en début de nouvelle session : bonjour, on continue. 🥋*
