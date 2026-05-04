# Contexte Groupe Supernova — Constitution de l'agence

> **Fichier maître — à uploader dans CHAQUE projet Groupe Supernova.**
> Contient la vision, les standards, les conventions et l'état de l'agence.
> **Dernière mise à jour : 4 mai 2026 — Création initiale. Rebranding Horizon 91 → Groupe Supernova.**
> Auteur : Jonathan Patoine, Groupe Supernova.

---

## 0. Rituel de closing (OBLIGATOIRE — chaque fin de session)

Avant de fermer **n'importe quel** projet Groupe Supernova :

```bash
# 1. Sync OneDrive → WSL (si projet Cowork)
#    (voir section "sync" du contexte projet spécifique)

# 2. Commit et push
git add -A
git commit -m "type: description courte

- détail ligne 1
- détail ligne 2"
git push origin main

# 3. Mettre à jour le fichier contexte du projet
# 4. Fermer la session
```

> Sans ce rituel, le prochain Claude repart de zéro. Avec ce rituel, il repart de là où on s'est arrêtés.

---

## 1. Qui est Jonathan

- **Nom** : Jonathan Patoine
- **Email** : jonathanpatoine81@gmail.com
- **Localisation** : Sainte-Marie-de-Beauce, Québec, Canada
- **Formation** : AEC Cybersécurité, Collège Cumberland Montréal — diplôme décembre 2026
- **Rôle** : Fondateur et développeur principal, Groupe Supernova
- **Environnement dev** : WSL 2 Ubuntu + VS Code + Docker Desktop (Windows)
- **Disponibilités** : lundi-jeudi PM/soir + weekends complets — **mode papa 16h-20h les jours de semaine**
- **GitHub** : `https://github.com/NoOneJoe07`
- **Style de collaboration** : sensei mode — comprendre chaque étape, pas juste copier-coller

---

## 2. Groupe Supernova

### Identité

| Élément | Détail |
|---|---|
| Nom officiel FR | Groupe Supernova |
| Nom officiel EN | Supernova Group |
| Ancien nom | Horizon 91 |
| Logo | Trou noir absorbant une étoile (SVG existant) |
| Domaines | `groupesupernova.ca` ✅ + `supernovagroup.ca` ✅ |
| Registraire | Namecheap — 2 ans, auto-renew activé |
| Email futur | jonathan@groupesupernova.ca (à configurer) |

### Vision

Agence tech locale basée à Sainte-Marie-de-Beauce spécialisée en :
- **Sites web** pour PME locales (stack Next.js + TypeScript + Tailwind)
- **E-commerce** avec paiement Stripe intégré
- **SEO** et présence numérique locale
- **Contenu** : vision d'un hub média interne (articles, réseaux sociaux) — "Obox interne"

**Modèle d'affaires** : projets clients + ententes basées sur augmentation du CA client.

### Rebranding en cours (backlog)

- [ ] Remplacer toutes les références "Horizon 91" dans le code des projets
- [ ] Mettre à jour `CLAUDE.md` et `AGENTS.md` sur tous les repos
- [ ] Configurer DNS `groupesupernova.ca` → futur site vitrine
- [ ] Configurer courriel `jonathan@groupesupernova.ca`
- [ ] Déployer le site vitrine de l'agence (HorizonSite → GroupeSupernova)

---

## 3. Projets actifs

| Projet | Client | Statut | Dossier Cowork | Repo WSL |
|---|---|---|---|---|
| **Citadelle Jiu-Jitsu** | Ami de Jonathan, dojo Québec | 🟡 En dev — attente contenu client | `Horizon 91\Web\Citadelle_JiuJitsu\Citadelle Jiu-Jitsu` | `~/Horizon91/divisions/Web/citadelle-jiu-jitsu` |
| **Nordik Legion Studio** | Studio de production musicale | 🟡 Frontend existant — à polir | `Horizon 91\Studio\siteweb` | `~/Horizon91/divisions/Web/nordik-legion-studio` |
| **HorizonSite** | Site vitrine Groupe Supernova | 🔴 À rebaptiser + déployer | `Horizon 91\HorizonSite` (approx.) | `~/Horizon91` |

### Citadelle Jiu-Jitsu — résumé rapide

- Stack : Next.js 16.2.4 + TypeScript + Tailwind v4 + Prisma + Stripe + next-intl (FR/EN)
- Auth JWT, paiement Stripe fonctionnel, admin protégé
- **Contexte détaillé** → voir `contexte_session_citadelle.md`

### Nordik Legion Studio — résumé rapide

- Stack : Next.js 16.2.3 + TypeScript + Tailwind v4 — **pur frontend, pas de backend**
- Pages : accueil, studio, projets, contact, rejoindre
- **Contexte détaillé** → voir `contexte_session_nordik.md`

---

## 4. Stack préféré Groupe Supernova

| Couche | Choix |
|---|---|
| Framework | Next.js (App Router) — version la plus récente stable |
| Langage | TypeScript strict |
| CSS | Tailwind v4 |
| Base de données | PostgreSQL via Prisma |
| Auth | JWT (jose, edge-compatible) + bcrypt + cookies HttpOnly |
| Paiement | Stripe Checkout (pattern JSON + `window.location.href`) |
| i18n | next-intl v4 (routing `/fr` et `/en`) |
| Validation | Zod — tous les inputs serveur |
| Emails | Resend (à configurer sur les projets) |
| Conteneur | Docker (dev) |
| Déploiement | Vercel / OVH Canada / AWS Lightsail (à décider par projet) |

---

## 5. Standards de code (NON-NÉGOCIABLES)

### Architecture

- **Pas de `src/`** — tout à la racine : `app/`, `components/`, `lib/`, `messages/`
- **Path alias** : `@/*` → `./*`
- **Routing i18n** : `app/[locale]/<page>/page.tsx`
- **API** : `app/api/<endpoint>/route.ts`
- **Variables CSS** : tokens centralisés dans `app/globals.css`
- **Validation** : tous les inputs serveur passent par Zod (`lib/validation.ts`)
- **Auth helpers** : `getSession()`, `requireUser()`, `requireAdmin()` dans `lib/auth.ts`
- **Prix Stripe** : TOUJOURS lus depuis la BD côté checkout (jamais depuis le client)
- **Checkout** : pattern JSON + `window.location.href` (jamais `NextResponse.redirect` vers Stripe)

### Annotations de code

```typescript
// =============================================================================
// NOM DU MODULE
// -----------------------------------------------------------------------------
// Pourquoi ce fichier existe, quel problème il résout.
// Décision d'architecture importante documentée ici.
// =============================================================================

// ---------------------------------------------------------------------------
// Section logique
// ---------------------------------------------------------------------------
// Pourquoi cette section fait ce qu'elle fait.

const valeur = calcul(); // Pourquoi ce calcul (si non évident)
```

**Règle d'or** : commenter le **POURQUOI**, jamais le **QUOI**. Le quoi se lit dans le code.

### Commits conventionnels (en français)

```
feat: ajouter page abonnements avec checkout Stripe
fix: corriger redirection après paiement annulé
refactor: extraire CheckoutButton en composant réutilisable
docs: mettre à jour contexte session citadelle
chore: sync fichiers OneDrive → WSL
```

Types : `feat` `fix` `refactor` `docs` `chore` `test` `style` `perf`

### SEO (template standard)

```typescript
// Layout racine :
title: { template: "%s — Nom du Site", default: "Nom du Site" }
openGraph: { siteName, locale, type: "website" }

// Chaque page :
export async function generateMetadata({ params }) {
  return {
    title: locale === "fr" ? "Titre FR" : "Title EN",
    description: locale === "fr" ? "Description FR unique..." : "Unique EN description...",
  };
}
```

---

## 6. Sécurité — standards minimaux

Sur tout projet avec backend :

- CSP (Content Security Policy) dans `next.config.ts`
- HSTS, X-Frame-Options, X-Content-Type-Options
- Honeypot sur tous les formulaires publics
- Validation Zod côté serveur sur toutes les routes API
- Middleware auth avec re-vérification rôle BD (pas juste le JWT)
- Variables sensibles uniquement dans `.env` (jamais committées)
- `robots:noindex` sur les pages légales et admin

---

## 7. Workflow Cowork ↔ WSL

Les projets ont deux copies : Cowork édite OneDrive, le dev server tourne dans WSL.

**À chaque fin de session Cowork** → copier manuellement les fichiers modifiés (voir section sync du contexte projet), puis commit + push.

```bash
# Après reboot — relancer l'environnement
docker compose -f docker-compose.dev.yml up -d
npm run dev
stripe listen --forward-to http://localhost:3000/api/webhooks/stripe
```

---

## 8. Pièges connus

| Piège | Solution |
|---|---|
| Docker 'command not found' dans WSL | Docker Desktop doit tourner en arrière-plan — activer "start with Windows" |
| `mkdir -p` oublié avant `cp` | Toujours `mkdir -p <dossier>` si le chemin destination est nouveau |
| `Environment variable not found: DATABASE_URL` | Prisma lit `.env`, pas `.env.local` — faire `cp .env.example .env` |
| Dev server sert du vieux code après sync | `rm -rf .next && npm run dev` |
| `useSearchParams()` crash build | Entourer le composant dans `<Suspense>` dans le parent Server Component |
| `NextResponse.redirect` vers Stripe → url null | Toujours retourner `{ url }` en JSON et faire `window.location.href` côté client |

---

## 9. Modèle Claude recommandé

| Tâche | Modèle |
|---|---|
| Pages, debug, intégration, i18n, SEO | **Sonnet 4.6** (80% du travail) |
| Architecture complexe, audit sécurité, debug multi-fichiers tordu | **Opus** |

---

*Ce fichier est la constitution de Groupe Supernova. Il grandit avec l'agence.*  
*Upload-le dans chaque nouveau projet dès l'ouverture de session. 🚀*
