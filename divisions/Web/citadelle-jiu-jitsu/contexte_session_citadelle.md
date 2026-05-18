# Contexte Session — Citadelle Jiu-Jitsu

> Document de handoff entre sessions. À uploader en début de chaque nouvelle conversation.
> **Dernière mise à jour : 17 mai 2026 — Session productive. Voir section 4 pour le détail.**
> Auteur : Jonathan Patoine, Groupe Supernova.

---

## 0. Comment utiliser ce fichier

À l'ouverture d'une nouvelle session avec Claude :
1. Upload ce fichier dans le contexte
2. Upload aussi `horizon91_master.md` (dans HorizonSite/ — contexte global Groupe Supernova)
3. Décris la tâche du jour.

### Rituel de closing (OBLIGATOIRE à chaque fin de session)

```bash
cd ~/Horizon91/divisions/Web/citadelle-jiu-jitsu
git add -A
git commit -m "type: description courte"
git push origin main
```
Puis mettre à jour ce fichier contexte avant de fermer.

---

## 1. Le projet Citadelle Jiu-Jitsu

- **Client** : Jean-Sébastien Dionne — propriétaire d'un dojo de jiu-jitsu à Québec (964 Rue Mainguy, 418-564-1047)
- **Contact principal** : Kristina (copine de JS, conseillère SEO externe — point de contact officiel pour les infos client)
- **Accord** : projet à tarif préférentiel contre droits portfolio + témoignage
- **Statut** : template de référence Horizon 91 — base pour tous les futurs projets e-commerce
- **Workspace Cowork** : `C:\Users\Pc\OneDrive\Documents\Horizon 91\Web\Citadelle_JiuJitsu\Citadelle Jiu-Jitsu\`
- **Repo WSL** : `~/Horizon91/divisions/Web/citadelle-jiu-jitsu/`
- **Repo GitHub** : `https://github.com/NoOneJoe07/Horizon91` (sous `divisions/Web/citadelle-jiu-jitsu/`)
- **Domaine prévu** : `citadellejiujitsu.ca` (déjà utilisé dans sitemap, robots, OG tags)

---

## 2. Workflow sync OneDrive → WSL

Script automatisé — à lancer après chaque session Cowork :

```bash
bash ~/Horizon91/divisions/Web/citadelle-jiu-jitsu/sync-citadelle.sh
```

Le script copie tous les fichiers racine + dossiers (app, components, lib, i18n, messages, prisma, public, scripts) et supprime automatiquement `middleware.ts` si il réapparaît (obsolète — remplacé par `proxy.ts` en Next.js 16).

Après sync, commit :
```bash
cd ~/Horizon91/divisions/Web/citadelle-jiu-jitsu
git add -A
git commit -m "feat: description"
git push origin main
```

---

## 3. Stack technique

| Package | Version |
|---|---|
| next | 16.2.4 |
| next-intl | ^4.4.0 |
| react / react-dom | 19.2.4 |
| @prisma/client / prisma | ^6.2.0 (résolu 6.19.3) |
| tailwindcss | ^4 |
| typescript | ^5 |
| zod | ^3.24.1 |
| stripe | ^17.5.0 |
| jose | ^5.9.6 |
| bcryptjs | ^2.4.3 |

**Note Next.js 16** : utiliser `proxy.ts` et non `middleware.ts` (convention changée en Next.js 16).

---

## 4. État technique — Sessions complétées

### ✅ Session du 1er mai 2026
- Scaffold complet Next.js 16.2.4 + TypeScript + Tailwind v4 + next-intl v4 (FR/EN)
- Prisma 6 + 8 tables + migrations + seed
- Auth JWT (jose) + bcrypt + cookies HttpOnly SameSite=Lax
- Stripe Checkout fonctionnel — pattern JSON + `window.location.href` (jamais `NextResponse.redirect`)
- API routes : auth (login/register/logout/me), trial, checkout, webhooks/stripe
- Pages publiques complètes + admin protégé + dashboard stats temps réel
- Hero cinématique + logo SVG officiel + mobile nav drawer animé

### ✅ Session du 4 mai 2026
- Standards d'annotation établis (commenter le pourquoi, pas le quoi)
- PaymentBanner.tsx (success/canceled post-Stripe, auto-dismiss 8s)
- ContactForm.tsx + /api/contact (Zod + honeypot + BD + TODO Resend)
- generateMetadata() sur toutes les pages publiques
- Page /confidentialite (Loi 25 Québec, FR/EN, 10 sections)
- Open Graph de base dans le layout

### ✅ Session du 10 mai 2026
- Security headers renforcés — COOP + CORP + Permissions-Policy 11 directives
- proxy.ts — middleware.ts renommé, `localeDetection: false`
- sync-citadelle.sh — script sync OneDrive→WSL
- Footer — "Horizon 91" → "Groupe Supernova" + lien groupesupernova.ca
- Politique de confidentialité — LPRPDE fédérale + CPVP + CAI en cards
- sitemap.ts, robots.ts, JSON-LD SportsClub, Open Graph complet
- Page /conditions — Conditions d'utilisation FR/EN

### ✅ Session du 17 mai 2026
- **BillingInterval enum** — ajout de `ONETIME` dans schema.prisma
- **Migration** `20260517180505_init_with_onetime` — reset + migration propre
- **Seed réel** — 4 vrais forfaits (mensuel 135$, carte 10 séances 150$, cours privé 70$, drop-in 20$) + 4 vrais produits boutique (rash guard, cuissard, hoodie, crew neck — Noir, 60$/65$)
- **checkout/route.ts** — ONETIME → `mode: "payment"` Stripe, MONTH/YEAR → `mode: "subscription"`
- **Page /abonnements** — UI refaite sans icônes, labels ONETIME, notes taxes
- **Panneau admin complet** :
  - `app/actions/admin.ts` — Server Actions CRUD (produits, forfaits, essais, commandes, messages)
  - `components/admin/` — ProductModal, ProductCreateButton, ProductActions, PlanToggle, TrialActions, OrderActions, ContactMessageActions
  - Pages admin : produits (CRUD complet), abonnements (toggle), inscriptions (actions statut), commandes, messages, utilisateurs
  - Testé en dev : création ✅, désactivation ✅, suppression avec confirmation ✅
- **Argos** retiré de l'index Horizon91 + `.gitignore` mis à jour (repo privé Division Cyber)
- **Courriel envoyé à Kristina** — liste des 8 éléments manquants pour finaliser le site

---

## 5. En attente du client / Kristina

### Bloquant (lancement impossible sans ça)
- [ ] **Email entreprise** — pour activer Resend (notifications auto)
- [ ] **Compte Stripe production** — JS doit créer le sien et envoyer les clés API
- [ ] **Adresse complète** — ville + code postal (964 Rue Mainguy confirmé, reste à compléter)

### Contenu visuel
- [ ] **Photos produits** — rash guard, cuissard, hoodie, crew neck (Kristina les envoie)
- [ ] **Couleur Bleu** — confirmée ou non pour les produits ?
- [ ] **og-image.jpg** 1200×630px — en attente Paulina (shooting fait le 16 mai)

### Opérationnel
- [ ] **Politique d'âge** — 18+ seulement ou ados avec consentement parental ?
- [ ] **Package maintenance** — autonome 150$/mois ou gestion totale 200-350$/mois ?
  - Si autonome → CRUD forfaits avec wizard Stripe intégré à évaluer
  - Si gestion totale → on gère les updates de contenu nous-mêmes

### Quand email disponible
Décommenter blocs Resend dans :
- `app/api/contact/route.ts` (lignes ~99-110)
- `app/api/trial/route.ts` (lignes ~47-48)

---

## 6. Stripe — configuration dev

```bash
# 3 terminaux pour dev complet
npm run dev                                                           # Terminal 1
npm run prisma:studio                                                 # Terminal 2 (optionnel)
stripe listen --forward-to http://localhost:3000/api/webhooks/stripe  # Terminal 3
```

| Variable | Statut |
|---|---|
| `STRIPE_SECRET_KEY` | ✅ clé test dans `.env` WSL |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | ✅ clé test |
| `STRIPE_WEBHOOK_SECRET` | ✅ `whsec_...` du `stripe listen` |
| Plans BD (4) | ✅ seeded avec vrais prix réels |

---

## 7. Backlog

### Priorité haute
- [ ] Resend — notifications email → attente email JS
- [ ] og-image.jpg 1200×630px → session photo Paulina (shooting fait, traitement en cours)
- [ ] Photos produits → attente Kristina

### Priorité moyenne
- [ ] **Section /actualites** — feed de nouvelles du dojo (compétitions, ceintures, annonces)
  - Modèle Prisma `Post` à créer : titre FR/EN, slug, contenu, image, statut publié/brouillon, catégorie
  - Pages publiques : feed + article individuel `/actualites/[slug]`
  - Admin CRUD : éditeur simple, publier/dépublier
  - Lien externe optionnel → futur site martial arts Groupe Supernova (flywheel)
- [ ] Cours privés — formulaire email dédié (pas checkout direct)
- [ ] Rate limiting API routes publiques
- [ ] Wizard création forfait avec sync Stripe (si JS choisit package autonome)

### Backlog technique
- [ ] Prisma 6 → 7 (session dédiée, post-tests)
- [ ] Tests Vitest + Playwright
- [ ] CI GitHub Actions
- [ ] Déploiement Vercel production + domaine citadellejiujitsu.ca

---

## 8. Pièges connus

| Piège | Solution |
|---|---|
| `middleware.ts` ET `proxy.ts` coexistent | `rm middleware.ts` — Next.js 16 n'en accepte qu'un |
| Warning "middleware deprecated" | Utiliser `proxy.ts` — sync-citadelle.sh nettoie auto |
| `DATABASE_URL` not found | Prisma lit `.env` pas `.env.local` |
| `Port 3000 is in use` | `docker stop horizon91_site` |
| `eval()` CSP error dev | ✅ Résolu — `'unsafe-eval'` en NODE_ENV=development only |
| `checkoutSession.url` null | ✅ Résolu — JSON + `window.location.href` client |
| Dev server ancien code | `rm -rf .next && npm run dev` |
| Reboot — relancer Postgres | `docker compose -f docker-compose.dev.yml up -d` |
| `npm run dev` depuis mauvais dossier | Toujours `cd ~/Horizon91/divisions/Web/citadelle-jiu-jitsu` d'abord |
| `BillingInterval.ONETIME` undefined | Lancer `prisma migrate dev` avant le seed (régénère le client) |
| Argos dans git add -A | `.gitignore` racine Horizon91 — `divisions/Cyber/Monitoring/argos/` exclus |

---

## 9. Commandes essentielles

```bash
cd ~/Horizon91/divisions/Web/citadelle-jiu-jitsu
docker compose -f docker-compose.dev.yml up -d  # Postgres
npm run dev                                       # localhost:3000
npm run prisma:studio                             # localhost:5555
npx tsx scripts/stripe-seed.ts                    # Reseed Stripe si IDs perdus
npx prisma migrate dev --name "nom"               # Nouvelle migration
npm run prisma:seed                               # Re-seed BD
```

---

*Fin du document. Si tu lis ceci en début de nouvelle session : bonjour, on continue. 🥋*
