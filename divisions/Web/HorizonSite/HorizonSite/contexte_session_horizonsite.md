# Contexte Session — HorizonSite (Horizon 91)

> Document de handoff entre sessions. À uploader en début de chaque nouvelle conversation.
> **Dernière mise à jour : 3 mai 2026 — Base solide, portfolio et divisions à jour.**
> Auteur : Jonathan Patoine, Horizon 91.

---

## 0. Comment utiliser ce fichier

À l'ouverture d'une nouvelle session :
1. Upload ce fichier dans le contexte
2. Upload aussi `AGENTS.md` (conventions Horizon 91)
3. Décris la tâche du jour.

---

## 1. Le projet

Site vitrine corporatif d'Horizon 91 — présente l'agence, les divisions, l'équipe et le portfolio.
- **Workspace Cowork** : `C:\Users\Pc\OneDrive\Documents\Horizon 91\Web\HorizonSite\`
- **Repo WSL** : `~/Horizon91/divisions/Web/HorizonSite/`
- **Repo GitHub** : `https://github.com/NoOneJoe07/Horizon91` (sous `divisions/Web/HorizonSite/`)

---

## 2. Stack technique

| Package | Version |
|---|---|
| next | 16.2.3 |
| react / react-dom | 19.2.4 |
| tailwindcss | ^4.2.2 |
| typescript | ^5 |

Pas de i18n pour l'instant — FR seulement. Pas de Prisma, pas d'auth, pas de Stripe — site vitrine pur.

---

## 3. Identité visuelle — Event Horizon

Palette CSS dans `app/globals.css` :

| Token | Hex | Usage |
|---|---|---|
| `h91-gravity` | `#05070A` | Fond principal |
| `h91-relativistic` | `#1A8CFF` | Bleu — Cybersécurité, accents principaux |
| `h91-ion` | `#00F0FF` | Cyan — Web, highlights |
| `h91-accretion` | `#FF7A1A` | Orange — accents chauds |
| `h91-fusion` | `#FFD65C` | Jaune — Studio Jeux |
| `h91-warp` | `#6A00FF` | Violet — Immobilier, accents |
| `h91-stellar` | `#F2F7FF` | Blanc stellaire — texte |

Effets animés : aurora (`aurora-band`), disque d'accrétion (`accretion-ring`), noyau orbital (`orbital-core`), gradient titre (`h91-title-gradient-animated`).

---

## 4. État au 3 mai 2026

### Pages existantes

| Route | Fichier | Statut |
|---|---|---|
| `/` | `app/page.tsx` | ✅ Hero + logo orbital + présentation |
| `/divisions` | `app/divisions/page.tsx` | ✅ 3 divisions : Web, Cyber, Studio |
| `/portfolio` | `app/portfolio/page.tsx` | ✅ Filtre par catégorie, 5 projets |
| `/contacts` | `app/contacts/page.tsx` | ✅ 4 contacts par division |
| `/rejoindre` | `app/rejoindre/page.tsx` | ✅ Coordonnées + mailto |
| `/accueil` | `app/accueil/page.tsx` | ✅ Redirect vers `/` |

### Corrections appliquées
✅ Double `<main>` supprimé dans `layout.tsx`
✅ `next.config.ts` — headers de sécurité (CSP, HSTS, X-Frame-Options)
✅ `'unsafe-eval'` dans CSP uniquement en dev
✅ Lien Accueil du nav corrigé `/accueil` → `/`
✅ Image LCP — `priority` + `style` ratio ajoutés
✅ Divisions : Atelier91 et Librairie intégrés sous Développement Web
✅ Contacts : 4 divisions seulement (Web, Cyber, Studio, Direction)
✅ Portfolio : filtre catégories client-side, 5 projets avec statuts

---

## 5. Workflow de sync Cowork → WSL

```bash
SRC="/mnt/c/Users/Pc/OneDrive/Documents/Horizon 91/Web/HorizonSite"
DEST="$HOME/Horizon91/divisions/Web/HorizonSite"

# Copier les fichiers modifiés pendant la session
cp "$SRC/app/page.tsx"                "$DEST/app/page.tsx"
cp "$SRC/app/layout.tsx"              "$DEST/app/layout.tsx"
cp "$SRC/next.config.ts"              "$DEST/next.config.ts"
cp "$SRC/app/components/Header.tsx"   "$DEST/app/components/Header.tsx"
cp "$SRC/app/components/Footer.tsx"   "$DEST/app/components/Footer.tsx"
cp "$SRC/app/divisions/page.tsx"      "$DEST/app/divisions/page.tsx"
cp "$SRC/app/portfolio/page.tsx"      "$DEST/app/portfolio/page.tsx"
cp "$SRC/app/contacts/page.tsx"       "$DEST/app/contacts/page.tsx"
cp "$SRC/app/rejoindre/page.tsx"      "$DEST/app/rejoindre/page.tsx"
```

Après chaque sync : `rm -rf .next && npm run dev` si le hot reload ne prend pas.

---

## 6. En attente — contenu équipe

- [ ] **Bio Jonathan** — dev/cybersécurité, fondateur Horizon 91, AEC Cumberland
- [ ] **Bio Paulina Jaramillo** — directrice artistique, infographiste, photographe + mini portfolio images
- [ ] **Bio conjointe** — PhD communications, ex-coordonnatrice nationale communications Président de l'Équateur (2015-2016)
- [ ] **Photo équipe** — portraits professionnels (Paulina peut les faire)
- [ ] **Vrai téléphone** — quand disponible
- [ ] **Vrais courriels** `@horizon91.com` — quand domaine réservé
- [ ] **Témoignage Jean-Sébastien** — quand Citadelle est livré (premier client)

---

## 7. Backlog

- [ ] Section Équipe sur page d'accueil (bios + photos)
- [ ] Section Témoignages sur page d'accueil
- [ ] SEO `generateMetadata` par page (mots clés Kristina)
- [ ] Formulaire de contact fonctionnel sur `/rejoindre`
- [ ] Screenshots réels dans le portfolio quand projets livrés
- [ ] Logo Horizon 91 — vérifier que `public/LogoHorizon91.svg` est la version finale
- [ ] Domaine `horizon91.ca` ou `.com` — à réserver
- [ ] Déploiement (Vercel recommandé pour un site vitrine statique)

---

## 8. Commandes essentielles

```bash
# Depuis WSL
cd ~/Horizon91/divisions/Web/HorizonSite
npm run dev
# → http://localhost:3000

# Commit et push
git add -A
git commit -m "feat: description du changement"
git push
```

---

## 9. Workflow nouveau projet (pour futurs clients)

Chaque nouveau projet Horizon 91 suit ce modèle :
1. Nouveau dossier dans `~/Horizon91/divisions/Web/clients/[nom-client]/`
2. Nouveau projet Cowork pointant vers ce dossier
3. Fichier `contexte_session_[client].md` à la racine
4. `CLAUDE.md` qui pointe vers `AGENTS.md`
5. Git branch `feat/[nom-client]` ou repo séparé selon la taille

---

*Fin du document. Si tu lis ceci en début de nouvelle session : bonjour, on continue. 🚀*
