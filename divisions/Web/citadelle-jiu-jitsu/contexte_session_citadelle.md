# Contexte Session — Citadelle Jiu-Jitsu

> Document de handoff entre sessions. À uploader en début de chaque nouvelle conversation.
> **Dernière mise à jour : 4 mai 2026 — Session closée proprement. Commit pushé sur main. Voir section 4 pour le détail.**
> Auteur : Jonathan Patoine, Groupe Supernova.

---

## 0. Comment utiliser ce fichier

À l'ouverture d'une nouvelle session avec Claude (Sonnet ou Opus) :
1. Upload ce fichier dans le contexte
2. Upload aussi `contexte_groupesupernova.md` (constitution agence — standards, vision, conventions)
3. Décris la tâche du jour. L'agent saura où on est sans avoir besoin de tout relire.

### Rituel de closing (OBLIGATOIRE à chaque fin de session)

```bash
cd "$HOME/Horizon91/divisions/Web/citadelle-jiu-jitsu"
git add -A
git commit -m "type: description courte"
git push origin main
```
Puis mettre à jour ce fichier contexte avant de fermer.

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

## 3. Architecture deux copies — workflow de sync

> **Décision finale** : Cowork édite OneDrive, dev server tourne dans WSL. Merger complexe → on garde le workflow cp manuel.

Après chaque session Cowork, copier avec ce bloc dans le terminal WSL :

```bash
ONEDRIVE="/mnt/c/Users/Pc/OneDrive/Documents/Horizon 91/Web/Citadelle_JiuJitsu/Citadelle Jiu-Jitsu"
WSL="$HOME/Horizon91/divisions/Web/citadelle-jiu-jitsu"

# Ajouter les fichiers modifiés pendant la session
cp "$ONEDRIVE/app/api/checkout/route.ts"            "$WSL/app/api/checkout/route.ts"
cp "$ONEDRIVE/lib/stripe.ts"                         "$WSL/lib/stripe.ts"
cp "$ONEDRIVE/components/CheckoutButton.tsx"         "$WSL/components/CheckoutButton.tsx"
cp "$ONEDRIVE/app/[locale]/abonnements/page.tsx"     "$WSL/app/[locale]/abonnements/page.tsx"
cp "$ONEDRIVE/next.config.ts"                        "$WSL/next.config.ts"
```

Puis valider avec :
```bash
grep -n "redirect" "$WSL/app/api/checkout/route.ts"
# → aucun résultat = bon
```

---

## 4. État technique au 1er mai 2026

### Ce qui est livré et fonctionnel

✅ **Scaffold complet Next.js 16.2.4 + TypeScript strict + Tailwind v4**
✅ **i18n bilingue FR/EN** (next-intl v4) — routing `/fr` et `/en`, switcher langue
✅ **Prisma 6.19.3** — 8 tables, migration `init` appliquée, seed exécuté
✅ **Auth JWT** (jose, edge-compatible) + bcrypt + cookies HttpOnly + SameSite=Lax
✅ **API routes** — `/api/auth/{login,register,logout,me}`, `/api/trial`, `/api/checkout`, `/api/webhooks/stripe`
✅ **Pages publiques** — accueil, instructeurs, horaires, galerie, contact, séance-essai, abonnements, boutique, connexion, inscription
✅ **Admin protégé** — middleware + re-vérif rôle BD, dashboard avec stats, sous-pages
✅ **Sécurité** — CSP, HSTS, X-Frame-Options, honeypot, validation Zod
✅ **Docker** — Dockerfile multi-stage + `docker-compose.dev.yml`
✅ **Logo SVG officiel** intégré — Header, Footer, hero watermark, favicon
✅ **Menu hamburger mobile** — `MobileNav.tsx` Client Component, drawer animé
✅ **Hero cinématique** — animated gradient, orbes dorées, fade-in-up, watermark
✅ **Page Instructeurs** — redesign personal brand (2 colonnes, stats, accomplissements, citation)
✅ **Données client réelles** — adresse, téléphone, Instagram, Facebook, horaire

### ✅ NOUVEAU — Session du 4 mai 2026

**Standards de code établis :**
- Annotations obligatoires sur tous les fichiers Horizon 91 (en-tête, sections, inline)
- Convention : commenter le *pourquoi*, pas le *quoi*
- Standard à appliquer à tous les projets futurs de l'agence

**Livrés et validés :**
- `components/PaymentBanner.tsx` — banner vert/rouge post-paiement Stripe, disparition auto 8s, bouton ×, bilingue, `<Suspense>` requis
- `app/[locale]/abonnements/page.tsx` — PaymentBanner intégré
- `app/[locale]/boutique/page.tsx` — checkout migré vers `<CheckoutButton>`, PaymentBanner ajouté, bouton hors-stock propre
- `components/ContactForm.tsx` — formulaire contact client component, honeypot, cycle idle/submitting/success/error
- `app/api/contact/route.ts` — validation Zod, honeypot silencieux, sauvegarde BD ContactMessage, TODO Resend documenté
- `app/[locale]/contact/page.tsx` — placeholder retiré, ContactForm branché
- `generateMetadata()` sur toutes les pages publiques (layout template + 7 pages)
- Open Graph ajouté dans le layout (partages réseaux sociaux)
- `messages/fr.json` et `en.json` — clé `Meta.siteName` ajoutée
- `app/[locale]/confidentialite/page.tsx` — politique Loi 25 complète, bilingue FR/EN, 10 sections, robots:noindex

**Validé en test :**
- ✅ Banner vert "Paiement réussi !" après checkout Stripe 4242
- ✅ Banner rouge "Paiement annulé" via bouton annulation Stripe et URL directe
- ✅ Reset carte sur retour navigateur (comportement Stripe attendu)

**Notions apprises :**
- SEO : title template Next.js, generateMetadata, différence metadata vs contenu
- Balise `<meta keywords>` obsolète depuis 2009 (Google l'ignore)
- Push media (Obox) vs Pull media (SEO content) — deux modèles distincts
- Syndication de contenu : canonical tag, publier l'original d'abord
- `<Suspense>` requis pour tout composant utilisant `useSearchParams()`
- `mkdir -p` avant `cp` quand le dossier cible n'existe pas encore
- Docker Desktop doit tourner en arrière-plan avant toute commande docker WSL

### ✅ Stripe checkout fonctionnel (1er mai 2026)

**Problème résolu** : `NextResponse.redirect(303)` renvoyait `url: null` silencieusement vers la page d'accueil.

**Solution implémentée** :
- `lib/stripe.ts` — API version mise à jour `2024-12-18.acacia` → `2025-03-31.basil`
- `app/api/checkout/route.ts` — retourne maintenant `{ url }` en JSON (plus de redirect serveur)
- `components/CheckoutButton.tsx` — nouveau Client Component : `fetch('/api/checkout')` → `window.location.href = data.url`
- `app/[locale]/abonnements/page.tsx` — `<form>` remplacé par `<CheckoutButton>`
- `next.config.ts` — CSP corrigé : `'unsafe-eval'` ajouté uniquement en `NODE_ENV === "development"`

**Testé et validé** :
- ✅ `POST /api/checkout 200` (plus de 303)
- ✅ URL Stripe générée et loggée côté serveur
- ✅ Page de paiement Stripe ouverte dans le navigateur
- ✅ Paiement test carte `4242 4242 4242 4242` complété
- ✅ 12 webhooks Stripe reçus et vérifiés (signature `whsec_` valide)
- ✅ Handler `checkout.session.completed` opérationnel
- ✅ Redirection vers `/fr/abonnements?success=1`

**Note webhook** : les événements `charge.succeeded`, `invoice.created`, etc. tombent dans le `default` (log "event non géré") — c'est intentionnel. Seul `checkout.session.completed` crée l'abonnement en BD (nécessite un `userId` → l'utilisateur doit être connecté).

---

## 5. Stripe — configuration actuelle

| Variable | Statut |
|---|---|
| `STRIPE_SECRET_KEY` | ✅ clé test `sk_test_...` dans `.env` WSL |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | ✅ clé test `pk_test_...` dans `.env` WSL |
| `STRIPE_WEBHOOK_SECRET` | ✅ `whsec_...` du `stripe listen` dans `.env` WSL |
| Plans BD (4) | ✅ seeded avec vrais `stripeProductId` + `stripePriceId` |

**Pour relancer Stripe en dev** (3 terminaux) :
```bash
# Terminal 1 : dev server
npm run dev

# Terminal 2 : Prisma Studio (optionnel)
npm run prisma:studio

# Terminal 3 : Stripe webhook listener
stripe listen --forward-to http://localhost:3000/api/webhooks/stripe
```

---

## 6. Versions exactes (figées)

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

## 7. Convention d'architecture (NON-NÉGOCIABLE)

- **Pas de `src/`** — tout à la racine (`app/`, `components/`, `lib/`, etc.)
- **Path alias** : `@/*` → `./*`
- **Routing i18n** : `app/[locale]/<page>/page.tsx`
- **API** : `app/api/<endpoint>/route.ts`
- **Variables CSS** : tokens centralisés dans `app/globals.css` (`--color-citadelle-*`)
- **Validation** : tous les inputs serveur passent par Zod (`lib/validation.ts`)
- **Auth** : `getSession()`, `requireUser()`, `requireAdmin()` dans `lib/auth.ts`
- **Prix** : TOUJOURS lus depuis la BD côté checkout Stripe
- **Checkout** : pattern JSON + `window.location.href` (jamais `NextResponse.redirect` vers Stripe)

---

## 8. En attente du client

### Contenu bloquant (frontend incomplet sans ça)
- [ ] **Vrai nom + bio** du fondateur (historique impressionnant : Top 5 Canada, Houston, compétitions internationales, ceinture noire)
- [ ] **Photo** du fondateur (pour `public/` + `imageUrl` dans `instructors.ts`)
- [ ] **Nom exact du cours mercredi 16h30** (type, niveau)

### Stripe / Business
- [ ] **Forfaits abonnement** — structure (1 mois / 3 mois / 1 an) + prix + inclus (actuellement : Adulte Mensuel 120$/mois, Adulte Annuel 1200$/an, Enfant 80$/mois, Famille 300$/mois)
- [ ] **Cours privés** — prix, durée, fonctionnement réservation, politique annulation
- [ ] **Produits boutique** — liste + photos + prix CAD
- [ ] **Taxes** — confirmé enregistré TPS/TVQ → Stripe doit collecter
- [ ] **Politique de remboursement** abonnements
- [ ] Compte Stripe **production** — le client doit créer le sien

### Contenu marketing (2e vague)
- [ ] Photos du dojo (intérieur, tatami, cours en action)
- [ ] Témoignages d'élèves (3-5 quotes)
- [ ] Résultats de compétition (palmarès)

---

## 9. Pièges connus

| Piège | Solution |
|---|---|
| `Environment variable not found: DATABASE_URL` | Prisma CLI lit `.env`, pas `.env.local`. Toujours `cp .env.example .env`. |
| `Port 3000 is in use` | `docker stop horizon91_site` ou utiliser port 3001. |
| Warning `middleware deprecated` | Next 16 a renommé. `middleware.ts` → `proxy.ts` (backlog — ne casse rien). |
| `eval() not supported (CSP)` | ✅ Résolu — `'unsafe-eval'` ajouté au CSP uniquement en dev (`NODE_ENV`). |
| Fichiers Cowork pas dans WSL | Copier manuellement avec le bloc `cp` de la section 3. |
| Dev server sert ancien code après cp | `rm -rf .next && npm run dev` pour forcer recompilation. |
| `checkoutSession.url` null (Stripe) | ✅ Résolu — retourner JSON + `window.location.href` côté client. |
| Pour relancer après reboot | `docker compose -f docker-compose.dev.yml up -d` puis `npm run dev`. |

---

## 10. Backlog (prochaines sessions)

### 🔄 Rebranding — Horizon 91 → Groupe Supernova (4 mai 2026)
- Nouveau nom officiel : **Groupe Supernova** (FR) / **Supernova Group** (EN)
- Domaines enregistrés chez Namecheap (2 ans) :
  - `groupesupernova.ca` ✅
  - `supernovagroup.ca` ✅
- Logo existant (trou noir absorbant une étoile) = parfaitement aligné avec "Supernova"
- **À faire prochaine session HorizonSite** :
  - Remplacer "Horizon 91" par "Groupe Supernova" partout dans le code
  - Mettre à jour CLAUDE.md et AGENTS.md
  - Configurer redirection DNS vers le futur site
  - Courriel : jonathan@groupesupernova.ca (à configurer)

### Priorité haute — avant démo client
- [x] ~~Banner `?success=1` / `?canceled=1` sur la page abonnements~~ ✅ 2026-05-04
- [x] ~~Formulaire contact `/api/contact`~~ ✅ 2026-05-04
- [x] ~~Page `/confidentialite` Loi 25 Québec~~ ✅ 2026-05-04
- [x] ~~SEO generateMetadata toutes les pages~~ ✅ 2026-05-04
- [ ] Page `/seance-essai` — formulaire fonctionnel → email Resend (attente config Resend)

### Priorité moyenne
- [ ] CRUD admin complet (modales create/edit/delete pour plans, produits, instructeurs)
- [ ] Notifications email Resend (confirmation séance, confirmation commande, contact)
- [ ] Page `/conditions` — conditions d'utilisation (lien déjà dans le footer)

### Backlog technique
- [ ] Renommer `middleware.ts` → `proxy.ts`
- [ ] Rate limiting sur API routes publiques
- [ ] Prisma 6 → 7 (major update, post-tests)
- [ ] Locale `es` (espagnol) — 3e langue planifiée
- [ ] Tests Vitest + Playwright
- [ ] CI GitHub Actions
- [ ] Déploiement final (OVH Canada / Vercel / AWS Lightsail)

---

## 11. Commandes essentielles

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

# Stripe webhook listener (terminal séparé)
stripe listen --forward-to http://localhost:3000/api/webhooks/stripe

# Quand on modifie schema.prisma
npm run prisma:migrate
npm run prisma:seed

# Reseed Stripe (si les IDs sont perdus)
npx tsx scripts/stripe-seed.ts
```

---

## 12. Conseil modèle Claude

- **Sonnet 4.6** : suffisant pour 80% du travail (pages, debug, intégration, i18n)
- **Opus** : architecture complexe, debug multi-fichiers tordu, audit sécurité

---

*Fin du document. Si tu lis ceci en début de nouvelle session : bonjour, on continue. 🥋*
