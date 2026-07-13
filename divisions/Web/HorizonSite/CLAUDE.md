@AGENTS.md

# CONTEXTE PROJET — Groupe Étoile Boréale Inc. / HorizonSite
Dernière mise à jour : 2026-07-13 — SESSION LANCEMENT — Bios JP+AE, OG image, Firewall Vercel, Article Loi 25, sitemap complet, Chambly portfolio ✅

## Fichiers de contexte global Horizon 91
- **Master context :** `C:\Users\Pc\OneDrive\Documents\Horizon 91\horizon91_master.md`
- **Starlog officiel :** `C:\Users\Pc\OneDrive\Documents\Horizon 91\STARLOG_Vaisseau_Horizon91.md`
- À uploader en début de session pour le contexte complet de l'écosystème Horizon 91
- À mettre à jour en fin de session si décisions systémiques prises (master) ou session productive (starlog)

## Stack technique
- Next.js 16.x App Router (TypeScript, Tailwind v4) — package.json: ^16.0.0 ← MIS À JOUR 2026-07-03
- next-intl 4.x pour l'internationalisation (FR/EN/ES) — package.json: ^4.0.0 ← MIS À JOUR 2026-07-03
- Deux copies : OneDrive (Cowork édite ici) ↔ WSL ~/Horizon91/divisions/Web/HorizonSite (npm run dev)
- Sync manuel requis après chaque session : rsync depuis OneDrive vers WSL, puis git add/commit/push
- middleware.ts renommé en proxy.ts (session 2026-07-03) — routing locale géré par page-level redirects
- .gitignore recréé (session 2026-07-03) — .next/ et node_modules/ exclus du tracking git ← CRITIQUE
- Déployé sur Vercel (Hobby) — Framework Preset: Next.js, Root Directory: divisions/Web/HorizonSite

## Structure app/
```
app/
  layout.tsx              ← Root minimal (redirect /fr si accès racine)
  page.tsx                ← Redirect → /fr
  sitemap.ts              ← Sitemap dynamique — BASE_URL = etoileboreale.ca
  robots.ts               ← robots.txt — host = etoileboreale.ca
  globals.css             ← Tokens CSS h91-* BRAND BOOK PAULINA, font Inter+Gotham, hero-dark, pilier-*
  accueil/page.tsx        ← Redirect → /fr (résidu)
  contacts/page.tsx       ← Redirect → /fr/contacts (résidu)
  divisions/page.tsx      ← Redirect → /fr/divisions (résidu)
  portfolio/page.tsx      ← Redirect → /fr/portfolio (résidu)
  rejoindre/page.tsx      ← Redirect → /fr/rejoindre (résidu)
  api/
    contact/route.ts      ← API contact — nodemailer smtp.zohocloud.ca:465 SSL ✅ OPÉRATIONNEL 2026-07-07
  [locale]/
    layout.tsx            ← Layout complet + generateMetadata() trilingue + OG tags
    page.tsx              ← Homepage (generateMetadata + JSON-LD LocalBusiness enrichi + hero + équipe + histoire)
    divisions/
      page.tsx            ← Liste 3 divisions (Arpenteur/Draveur/Carillon) + section Écosystème discrète
      arpenteur/page.tsx  ← Division Arpenteur (generateMetadata + JSON-LD Service + lore Bourdon/Holland) ← NOUVEAU
      web/page.tsx        ← Division Draveur (generateMetadata + JSON-LD Service + 6 services + CTA)
      cyber/page.tsx      ← Division Carillon (generateMetadata + JSON-LD Service + Saurel + Suite Carignan)
    actualites/page.tsx   ← Blogue (generateMetadata — contenu phase 2)
    portfolio/
      page.tsx            ← Serveur — generateMetadata + importe PortfolioClient
      PortfolioClient.tsx ← "use client" — filtre catégories (useState)
    contacts/page.tsx     ← generateMetadata + liste contacts (bg blanc #F4F4F0 sur les cartes — Server Component, Tailwind hover only)
    rejoindre/
      page.tsx            ← Serveur — generateMetadata + importe RejoindreCl
      RejoindreCl.tsx     ← "use client" — formulaire contact (useState + useLocale)
    le-crieur/page.tsx    ← Teaser portail Le Crieur / The Town Crier (robot noindex pour l'instant) ← NOUVEAU
    tarification/page.tsx ← Serveur — generateMetadata + forfaits (PAS "use client")
    confidentialite/
      page.tsx            ← Serveur async — generateMetadata + contenu FR/EN/ES inline (PAS "use client")
    equipe/
      jonathan-patoine/page.tsx  ← Profil complet JP (generateMetadata + bio histoire.p1-p6 + rôles) ← NOUVEAU 2026-07-03
      alexandra-espin/page.tsx   ← Stub AE (generateMetadata + "à venir") ← NOUVEAU 2026-07-03
      paulina-jaramillo/page.tsx ← Stub PJ (generateMetadata + "à venir") ← NOUVEAU 2026-07-03
  components/
    Header.tsx            ← Dropdown langue (useState) + mark-etoile.svg + nav ← MIS À JOUR 2026-07-03
    Footer.tsx            ← Nom de marque adaptatif
i18n/
  routing.ts              ← locales: [fr, en, es], default: fr
  request.ts
  navigation.ts           ← Link, useRouter, usePathname locale-aware
messages/
  fr.json                 ← Maître (tout le contenu FR)
  en.json                 ← Contenu EN (à réviser par Alexandra)
  es.json                 ← Contenu ES (à réviser par Alexandra/Paulina)
public/
  mark-etoile.svg         ← L'ÉTOILE Polaris — Groupe Étoile Boréale (header + hero) ← NOUVEAU
  mark-web.svg            ← La Flamme — Division Draveur (violet→orange)
  mark-cyber.svg          ← Singularité — Division Carillon (orange)
  mark-nordik.svg         ← Vortex — Nordik Legion Studio (cyan)
  og-image.jpg            ← ⚠️ À REFAIRE avec branding Étoile Boréale (tâche 7 en attente)
DEPLOIEMENT.md            ← Guide complet Vercel + domaines Namecheap (mis à jour)
ZOHO-MAIL.md              ← Guide complet Zoho Mail + MX records + comptes + alias
```

## Palette de couleurs — BRAND BOOK PAULINA 2026-07-01
```css
/* Couleurs principales */
h91-space:   #1D1D1B   /* Noir de l'Espace — hero, header, footer, fond body */
h91-white:   #F4F4F0   /* Blanc Polaire — fond sections claires, texte sur fond sombre */
h91-blue:    #0099D1   /* Bleu Polaire — Division Draveur (développement web) */
h91-violet:  #5762A2   /* Violette Boréale — Division Arpenteur (graphisme & marque) */
h91-night:   #203478   /* Bleu Nuit Boréal — Division Carillon (cyber) + header */
h91-gold:    #C9A84C   /* Or Boréal — accent chaud, CTA sur fond clair */

/* Aliases rétro-compat (évitent de réécrire l'ancien code) */
h91-gravity:     #1D1D1B   /* ≡ h91-space */
h91-stellar:     #F4F4F0   /* ≡ h91-white */
h91-ion:         #0099D1   /* ≡ h91-blue   (était cyan #00F0FF) */
h91-warp:        #5762A2   /* ≡ h91-violet (était violet foncé #6A00FF) */
h91-accretion:   #203478   /* ≡ h91-night  (était orange #FF7A1A) */
h91-fusion:      #C9A84C   /* ≡ h91-gold   (était jaune #FFD65C) */
```

## Typographie — BRAND BOOK PAULINA
- **Gotham** (titres/logo) — licence commerciale requise (Hoefler & Co.) ← PAS Montserrat, PAS Aptos
- **Inter** (corps de texte) — libre, chargé via next/font/google (variable `--font-inter`)
- Gotham déclaré via `--font-display` dans globals.css (fallback: Montserrat system-ui)

## Système de marks (logos par division) — BRAND BOOK PAULINA 2026-07-01
- Concept : marks géométriques partageant le même langage cosmique/compas + branding folklorique canadien
- **Rose des Vents (Compas)** → Groupe Étoile Boréale maison mère (mark-etoile.svg) ← REBRAND 2026-07-01
  - SVG blanc sur fond sombre, étoile 4 pointes + anneaux + points cardinaux, centre Bleu Nuit #203478
- **L'Arpenteur** → Division Arpenteur — Graphisme & Marque (mark-arpenteur.svg) ← NOUVEAU 2026-07-01
  - SVG Violette Boréale #5762A2 + clair #8A92C8, croix d'arpenteur + cercle de précision
- **Singularité** → Division Carillon — Cybersécurité (mark-cyber.svg) → /divisions/cyber ✓
- **Vortex**      → Nordik Legion Studio (mark-nordik.svg) → nordiklegion.ca (externe)
- **La Flamme**   → Division Draveur — Développement Web (mark-web.svg) → /divisions/web ✓
- Marks CLIQUABLES depuis la page /divisions ✓ (3 divisions + écosystème discret)

## Noms de marque adaptatifs par langue
- FR : Groupe Étoile Boréale (etoileboreale.ca) ← REBRAND 2026-05-26
- EN : Boreal Star Group (borealstar.ca)        ← REBRAND 2026-05-26
- ES : Grupo Estrella Boreal (futur domaine)     ← REBRAND 2026-05-26
- Implémenté via clé brand.name dans chaque messages/*.json

## Noms des divisions (branding historique/folklorique québécois)
- **Division Draveur** — Développement Web (réf. aux draveurs, maîtres des rivières québécoises)
- **Division Carillon** — Cybersécurité (réf. à la Bataille de Carillon 1758, Montcalm 3 600 vs 15 000)
- **Nordik Legion Studio** — Jeux vidéo (mythologie nordique + patrimoine canadien)

## Domaines en production (Namecheap + Vercel)
- etoileboreale.ca → FR par défaut ← REBRAND 2026-05-26
- borealstar.ca    → EN par défaut ← REBRAND 2026-05-26
- groupesupernova.ca → 301 → etoileboreale.ca (anciens domaines redirigés)
- supernovagroup.ca  → 301 → borealstar.ca
- Routing par domaine next-intl : à activer dans i18n/routing.ts (voir DEPLOIEMENT.md)

## Équipe
- Jonathan Patoine — Fondateur & DG (maison mère + Nordik Legion Studio)
- Alexandra Marcela Espin Espinoza — DG Communications (révision EN/ES)
- Paulina Jaramillo — DG Marketing & Photographie (Division Draveur + réseaux sociaux)
- Gabriel Patoine — CISO Division Carillon (en formation, à venir)

## Emails (Zoho Mail Lite — voir ZOHO-MAIL.md)
Plan : Mail Lite, C$1.25/user/mois, 5 users, 10 Go/user, renouvellement mai 2027

✅ MIGRATION @etoileboreale.ca COMPLÈTE (2026-07-07) — tous les vestiges @groupesupernova.ca supprimés de Zoho

### Comptes @etoileboreale.ca actifs ✅
  - contact@etoileboreale.ca          ← compte SMTP pour formulaire de contact (auth Vercel)
  - jonathan.patoine@etoileboreale.ca ← destinataire CONTACT_TO
  - alexandra.espin@etoileboreale.ca
  - paulina.jaramillo@etoileboreale.ca
  - gabriel.patoine@etoileboreale.ca

### SMTP — CRITIQUE ⚠️
- **Serveur : smtp.zohocloud.ca:465 SSL** ← Centre de données canadien Zoho (zohocloud.ca)
- ❌ smtp.zoho.com → serveur US/global, ne reconnaît PAS les comptes zohocloud.ca (535 Auth Failed)
- ❌ smtp.zoho.ca → résout vers Bluehost (erreur SSL)
- ❌ smtp.zohomail.ca → résout vers Cloudflare (ETIMEDOUT)
- App password : généré dans accounts.zohocloud.ca → Sécurité → Mots de passe spécifiques aux apps
- ⚠️ Copier-coller le mot de passe app Zoho ajoute un \n → Vercel affiche symbole jaune "↵" et refuse. Coller dans Notepad d'abord, copier les caractères seulement, puis coller dans Vercel.

### Variables ENV Vercel ✅
  - ZOHO_USER = contact@etoileboreale.ca
  - ZOHO_PASS = [app password — généré dans accounts.zohocloud.ca]
  - CONTACT_TO = jonathan.patoine@etoileboreale.ca

### DNS etoileboreale.ca ✅
MX zohocloud.ca + SPF + DKIM + DMARC — propagés et vérifiés

## Architecture de site décidée
- etoileboreale.ca = site principal maison mère
- Divisions Draveur et Carillon = pages profondes (/divisions/web, /divisions/cyber) ✓
- Nordik Legion Studio = site séparé (nordiklegion.ca) — redirect depuis mark
- PAS de domaines séparés par division pour l'instant

## Produits cyber internes — Fort Saurel & Suite Carignan
- **Saurel** : Dark Web Monitoring SaaS — 4 tiers en production sur /divisions/cyber
  - Sentinelle 75$/mois | Gardien 150$/mois (featured) | Bouclier 200$/mois | Forteresse 350$/mois
  - Tagline : "La vigie numérique des PME."
  - Sentinelles = agents automatisés internes du logiciel (scripts, alertes, traqueurs) — ≠ tier tarifaire
  - Lore ancré sur **Fort Saurel** : Pierre de Saurel 1665, verrou rivière Richelieu, régiment Carignan-Salières
  - Parallèle produit : fort surveille l'autoroute fluviale → SaaS surveille les flux de données / Dark Web
  - Nom produit = **Saurel** | Contexte narratif = Fort Saurel ← DISTINCTION IMPORTANTE
  - JSON-LD SoftwareApplication sur /divisions/cyber (name: "Saurel")
  - ✅ DÉCISION FINALE (2026-07-06) : **Saurel** (nom produit), lore Fort Saurel
- **Suite Carignan** : 4 produits en développement (ex-Suite Olympus) — cartes floutées "Zone de travaux"
  - Sorel (remédiation & réponse aux incidents)
  - Contrecoeur (simulation phishing & ingénierie sociale)
  - Berthier (analyseur de légitimité des courriels)
  - Chambly (IAM — contrôle d'accès & identités)
- Données hardcodées dans app/[locale]/divisions/cyber/page.tsx (pas i18n pour l'instant)

## SEO — Session 2026-05-26 (complet)
- generateMetadata() sur TOUTES les pages (homepage, divisions, web, cyber, portfolio, contacts, rejoindre, tarification, actualites, confidentialite)
- JSON-LD enrichis : LocalBusiness (homepage), Service (web + cyber), SoftwareApplication (Fort Saurel)
- Descriptions avec branding historique/folklorique :
  - Draveurs : maîtrisaient les rivières tumultueuses du Québec
  - Carillon : Montcalm 3 600 vs 15 000 Britanniques (1758)
  - Étoile Polaire : guide des coureurs des bois et voyageurs
- Canonical URLs : etoileboreale.ca (FR/ES), borealstar.ca (EN)
- Client components extraits (PortfolioClient.tsx, RejoindreCl.tsx) pour permettre generateMetadata serveur
- Google Search Console : etoileboreale.ca + borealstar.ca vérifiés ✅, sitemaps soumis ✅, indexation demandée ✅

## Session 2026-07-03 (soir) — Contenu, Tarification, Portfolio

### Accomplissements
- **Portfolio Citadelle BJJ** : statut "En cours" → "Livré" (FR/EN/ES), champ `url` ajouté, carte cliquable → citadellebjj.com, indicateur "Voir le site →" au hover
- **Tarification** : sous-titre "poignée de main", titre web "bâtis à la hauteur de vos ambitions", heures 60$/h · 70$/h · banque 500$ (FR/EN/ES)
- **Boîte Division Arpenteur** (violet) : médias sociaux + identité de marque (dès 450$) + photo & communication (dès 275$) — remplace section standalone
- **Boîte Division Carillon** : fond `#203478/15` pour cohérence visuelle avec couleur de division
- **Page /divisions/arpenteur** : bloc tarification ajouté (3 cartes + CTAs) avant CTA final

## Session 2026-07-03 — Infra, UX, Pages équipe

### Accomplissements
- **`.gitignore` recréé** : avait été supprimé → `.next/` (372 MiB cache turbopack) avait été committé → 2 fichiers >100 MB rejetés par GitHub. Fix : `git reset HEAD~1` + `.gitignore` + re-commit propre (38 objets, 87 KiB)
- **Import paths corrigés** : `@/components/` → `@/app/components/` dans cyber/page.tsx, web/page.tsx, arpenteur/page.tsx (tsconfig paths: `"@/*": ["./*"]` = racine projet, pas `app/`)
- **package.json** : `next ^15.3.1 → ^16.0.0`, `next-intl ^3.26.5 → ^4.0.0`, `eslint-config-next ^15 → ^16`
- **Dropdown langue Header** : `useState langOpen` + `useEffect` clic extérieur → remplace les 3 boutons FR|EN|ES inline. Dropdown `#162260`, min-width 68px, chevron rotatif
- **Cartes contacts** : fond `bg-h91-stellar` (#F4F4F0) + hover Tailwind uniquement (pas d'event handlers — contacts/page.tsx est un Server Component)
- **Pages profil équipe** (3 nouvelles routes) :
  - `/equipe/jonathan-patoine` : bio complète (réutilise home.histoire.p1-p6 + quote), section rôles & expertises (3 cartes hardcodées FR), generateMetadata trilingue
  - `/equipe/alexandra-espin` : stub "à venir" + description rôle, generateMetadata trilingue
  - `/equipe/paulina-jaramillo` : stub "à venir" + description rôle, generateMetadata trilingue
- **Homepage cartes équipe cliquables** : `membresMeta` avec slug, `<div>` → `<Link href="/equipe/[slug]">`, clé `home.team.cta_profile` ajoutée FR/EN/ES
- **Git** : commit `f550e80` propre — 18 fichiers, 1500 insertions

### Règles techniques importantes apprises
- `@/` dans ce projet = racine repo (`tsconfig paths`), donc imports de `app/components/` = `@/app/components/`
- Server Components (pages sans "use client") : PAS d'event handlers JS sur les éléments JSX → Tailwind `hover:` uniquement
- `.next/` doit TOUJOURS être dans `.gitignore` — ne jamais supprimer ce fichier
- rsync exclude `.next/` : `rsync -av --exclude='.next/' --exclude='node_modules/' ...`

## Session 2026-07-07 — Migration Zoho @etoileboreale.ca + SMTP zohocloud.ca

### Accomplissements
- **Migration Zoho complète** : tous les 5 comptes (@groupesupernova.ca) migrés → @etoileboreale.ca comme adresse principale + adresse de connexion. Tous les vestiges @groupesupernova.ca supprimés (y compris l'adresse de connexion — nécessitait de définir l'adresse @etoileboreale.ca comme messagerie par défaut sur chaque compte d'abord)
- **SMTP corrigé** : découverte critique — Zoho Canada utilise `smtp.zohocloud.ca:465` (pas smtp.zoho.com). Le compte appartient au data center canadien (zohocloud.ca), le serveur global US refuse l'authentification (535)
- **Vercel ENV mis à jour** : ZOHO_USER = contact@etoileboreale.ca, ZOHO_PASS = app password (accounts.zohocloud.ca → Sécurité → Mots de passe spécifiques aux apps), CONTACT_TO = jonathan.patoine@etoileboreale.ca
- **Formulaire de contact** : 100% opérationnel ✅ — test live etoileboreale.ca/fr/contacts → "Message envoyé!" → reçu dans Zoho jonathan.patoine@etoileboreale.ca

### Anomalies & Résolutions SMTP
| Serveur testé | Résultat | Cause |
|---|---|---|
| smtp.zoho.com:465 | 535 Authentication Failed | Serveur US ne reconnaît pas les comptes zohocloud.ca |
| smtp.zoho.ca:465 | Erreur SSL | Résout vers Bluehost (pas un serveur Zoho) |
| smtp.zohomail.ca:465 | ETIMEDOUT | Résout vers Cloudflare (pas un serveur SMTP) |
| **smtp.zohocloud.ca:465** | **✅ SUCCÈS** | **Serveur canadien Zoho — correct** |

### Règle critique à retenir
- Zoho Canada (zohocloud.ca) ≠ Zoho global (zoho.com) — le serveur SMTP doit correspondre au data center du compte
- App password Zoho : ne jamais copier-coller directement dans Vercel (ajoute \n invisible) → coller dans Notepad d'abord
- nslookup -type=MX zohocloud.ca → mx.zohocloud.ca, mx2.zohocloud.ca, mx3.zohocloud.ca

## Session 2026-07-08 — Police Urbanist, Sécurité, Articles trilingues, Portfolio, Lore Carignan, Photos, Analytics

### Accomplissements
- **Triptyque corrigé** : "Guider·Bâtir·Protéger" → "Créer·Bâtir·Protéger" (FR/EN/ES) dans messages/*.json, Footer.tsx, layout.tsx metadata, page.tsx JSON-LD, globals.css
  - "guider" conservé dans les textes narratifs faisant référence à l'Étoile Polaire (distinction sémantique intentionnelle)
- **Tagline hero** : "accompagne les entrepreneurs" → "guide les entrepreneurs" (FR/EN/ES)
- **Police Urbanist** (Google Fonts, gratuit) remplace Gotham (licence indisponible) :
  - Chargé via `next/font/google` dans `app/[locale]/layout.tsx`
  - Variable CSS `--font-display` → `var(--font-urbanist)` dans globals.css
  - CSP next.config.ts mis à jour : `style-src` +fonts.googleapis.com, `font-src` +fonts.gstatic.com
- **Sécurité formulaire de contact** :
  - Rate limiting en mémoire (5 req/IP/10 min) → HTTP 429
  - Validation longueurs max (nom ≤ 100, courriel ≤ 254 RFC 5321, message ≤ 5000)
  - CSP `connect-src` + `script-src` mis à jour pour GA4 (googletagmanager.com + google-analytics.com)
- **Page /actualites** : placeholder remplacé par vrais articles (Server Component)
  - `app/[locale]/actualites/articlesData.ts` : données trilingues des 2 articles, helpers formatDate + getArticleBySlug
  - `app/[locale]/actualites/page.tsx` : liste articles avec cartes cliquables (couleur par article, tags, date, extrait)
  - `app/[locale]/actualites/[slug]/page.tsx` : page article individuelle (generateMetadata, generateStaticParams, CTA)
- **Articles trilingues** (FR/EN/ES from day one — signal entreprise multilingue) :
  - "Groupe Étoile Boréale naît officiellement" — date 2026-05-15, lore 3 divisions, mention trilinguisme
  - "Premier site livré : Citadelle Jiu-Jitsu" — date 2026-06-21, lien citadellebjj.com + mention etoileboreale.ca
  - Images hero dans chaque article : citadelle-bjj-screenshot.png + Etoile_Boreale.png → /photos_images/
- **Portfolio** : entrée "Site Groupe Étoile Boréale" ajoutée (couleur or, statut Livré, url etoileboreale.ca) dans FR/EN/ES
- **Sitemap** : /actualites + /actualites/[slug]×2 ajoutés (lastModified = date article, priority 0.85/0.75)
- **Suite Carignan — Section lore historique** : `app/[locale]/divisions/cyber/page.tsx`
  - Nouvelle section "La doctrine de la chaîne" avant les cartes blurrées
  - Narratif Régiment Carignan-Salières 1665 : 1 200 soldats, chaîne fortifiée le long du Richelieu
  - Visualisation 5 nœuds connectés : Saurel (en prod. #203478) + Sorel/Contrecoeur/Berthier/Chambly (en dev 🚧)
  - `CHAINE_FORTS[]` data structure avec fort historique → produit → mission
  - Zone de travaux blurrée rebgée en `#111111` pour dégradé visuel distinct
- **Photo Jonathan Patoine** :
  - `Jonathan_Patoine.jpg` (3.7 MB) → `jonathan-patoine.jpg` (24 KB, 600×600, crop top)
  - `app/[locale]/page.tsx` : membresMeta.jonathan.photo + rendu conditionnel Image/initiales (Alexandra & Paulina gardent initiales)
  - `app/[locale]/equipe/jonathan-patoine/page.tsx` : Image 160×160 object-top remplace placeholder "JP"
- **Vercel Analytics + Speed Insights** :
  - `@vercel/analytics` + `@vercel/speed-insights` installés dans package.json
  - `<Analytics />` + `<SpeedInsights />` ajoutés dans layout.tsx
  - Analytics et Speed Insights activés dans le dashboard Vercel (Hobby plan) ✅
  - Firewall → Vercel Managed Ruleset à activer dans Settings → Firewall

### Architecture articles
- Données centralisées dans `articlesData.ts` (hors messages/*.json — article content is rich, not i18n key-value)
- Interface Article : slug, date, readTime, tags, accentColor, image?, imageAlt?, fr/en/es: { title, excerpt, paragraphs[], cta }
- Route individuelle : `/[locale]/actualites/[slug]` — SEO-optimisé, generateStaticParams = pré-rendu statique
- Ajouter un article : append dans `articles[]` de articlesData.ts (aucune autre modification requise)
- Trilingue natif : chaque article objet = { slug, date, tags, fr: {}, en: {}, es: {} }

### Commits session 2026-07-08
- `b5d637a` — articles trilingues + portfolio etoileboreale.ca + sitemap
- `b1da542` — Suite Carignan lore doctrine chaîne forts
- `9943396` — images hero articles + photo Jonathan
- `5950878` — layout.tsx Analytics + SpeedInsights (build fail — packages manquants)
- `c3be1bc` — fix package.json @vercel/analytics + @vercel/speed-insights ✅ build OK

## Session 2026-07-13 — Lancement site, Bios, OG Image, Firewall, Loi 25, Sitemap complet

### Accomplissements
- **Vercel Firewall** : Bot Protection (Challenge mode) + AI Bots (Deny) activés dans Vercel Settings → Firewall
  - Contexte : JA4 fingerprinting montrait 717/942 requêtes avec même fingerprint (trafic automatisé)
  - Bot Protection Challenge = CAPTCHA invisible pour bots suspectés, transparent pour humains
  - AI Bots Deny = bloque scrapers IA (GPTBot, Claude-Web, Bytespider, etc.)
- **OG Image** : `public/og-image.jpg` remplacé par design Paulina (1200×630) — starfield + grille bleue + mark-etoile.svg + "ÉTOILE BORÉALE" + "Créer · Bâtir · Protéger" + etoileboreale.ca
- **public/ nettoyé** : fichiers `__MACOSX/` et `Tipografía Gotham/` (artefacts macOS ZIP) supprimés via File Explorer (jamais stagés git — aucune action git requise)
- **Photo Alexandra Espin** :
  - `Alexandra.jpg` (952×1197, 35 KB) → `alexandra-espin.jpg` (600×600, 25 KB, crop top, Pillow q=85)
  - Homepage : carte Alexandra mise à jour avec vraie photo (membresMeta.alexandra.photo)
  - Page `/equipe/alexandra-espin` : Image 160×160 remplace placeholder "AE"
- **Galerie Division Carillon** : photo Fort Ticonderoga (fort_ticonderoga_place_d_arms.jpg) remplacée par vue aérienne Fort Carillon (Fort_Carillon_1.jpg) dans `/divisions/cyber/page.tsx`
- **Vercel 404 — faux incident** : découverte d'un projet doublon "horizon91" (même repo GitHub, aucun domaine custom). Le vrai projet est "horizon91-2zpm" (borealstar.ca + etoileboreale.ca). Site n'a jamais été down.
- **Bio Jonathan restructurée** :
  - messages/*.json (FR/EN/ES) : `home.histoire` réduit à p1 + p2 + p3 (3 paragraphes + quote) — retrait p4/p5/p6
  - `app/[locale]/page.tsx` : rendu p1-p3 seulement, section histoire plus concise
  - `app/[locale]/equipe/jonathan-patoine/page.tsx` : affiche p1-p3 seulement
- **Page Alexandra Espin — réécrite complète** (`app/[locale]/equipe/alexandra-espin/page.tsx`) :
  - `useLocale()` de next-intl pour choisir la langue correcte (FR/EN/ES)
  - Bio trilingue hardcodée en objet `bio` : p1 + p2 + p3 + quote par langue
  - Sections : Hero (photo 160×160, border violette #5762A2), Parcours (3 §), Rôles (3 cartes), CTAs
  - generateMetadata trilingue mis à jour avec vraie description
- **Portfolio Chambly** : entrée "Chambly — IAM / RBAC" ajoutée dans messages/*.json (FR/EN/ES)
  - Statut "En cours", `border-h91-night`, client "Groupe Étoile Boréale — Produit interne"
  - Correction au passage : EN/ES messages avaient "Argos" (vieux nom) → corrigé "Saurel"
- **Sitemap complet** (`app/sitemap.ts`) :
  - Ajout `/tarification` (priority 0.75, monthly)
  - Ajout `/equipe/jonathan-patoine`, `/equipe/alexandra-espin`, `/equipe/paulina-jaramillo` (priority 0.65, monthly)
  - `/le-crieur` conservé tel quel (Jonathan en développement ~35%, domaine à venir)
- **Article Loi 25** (`app/[locale]/actualites/articlesData.ts`) — 3e article, placé en premier (plus récent) :
  - Slug : `loi-25-guide-pme-quebec` | Date : 2026-07-13 | readTime : 6 min | accentColor : #203478
  - Tags : Cybersécurité, Conformité, PME, Loi 25
  - 6 paragraphes trilingues : qu'est-ce que la Loi 25, qui est concerné, obligations (RPRP 72h), droits individuels, sanctions (jusqu'à 25 M$), solution Division Carillon
  - CTA → /contacts "Parler à Division Carillon →"
- **DÉCISION LANCEMENT** : procéder maintenant, ajouter photo + bio Paulina mercredi 2026-07-16 (examens de francisation lundi-mardi)

### Commits session 2026-07-13
- `3121bfa` — bios JP+AE, photo AE, Chambly portfolio, OG image, Fort Carillon gallery
- `67b8f17` — article Loi 25 trilingue + sitemap /equipe/* + /tarification

### Anomalies & Résolutions
| Anomalie | Résolution |
|---|---|
| rsync `--relative` flag créait chemin `app/mnt/c/Users/Pc/...` dans WSL | `sudo rm -rf ~/Horizon91/.../app/mnt` + rsync sans `--relative` |
| Alexandra page : `const locale = "fr"` hardcodé → FR seulement | Ajout `import { useLocale }` + `const locale = useLocale()` |
| EN/ES portfolio : "Argos" (vieux nom produit) | Corrigé → "Saurel" lors de l'ajout Chambly |
| OG image avec espaces dans le nom ("OG Image — etoileboreale.ca 2 (2).jpg") | Renommé en `og-image.jpg` via File Explorer avant rsync |
| OneDrive sync arrow (bleu) sur og-image.jpg | Attendre checkmark vert File Explorer avant rsync |

## Enrichissement contenu — Session 2026-05-28

### Accomplissements session 2026-05-28
- **StarField.tsx** : composant React Canvas (180 étoiles animées, twinkling) — remplace approches CSS échouées
  - Ajouté dans app/components/StarField.tsx + importé dans app/[locale]/layout.tsx
- **Aurora tunée** : opacités réduites à 0.22/0.28/0.24 dans globals.css pour équilibre étoiles/aurore
- **Tagline homepage** : remplacée par option 2 (positionnement élite) — FR/EN/ES dans messages/*.json
- **Section Équipe** : restructurée — nouveau subtitle narratif, bio JP condensée, bouton "En savoir plus → #histoire" sur carte JP seulement
- **Correction historique** : dojo jiu-jitsu "à Québec" (pas "en Beauce") + phrase d'ouverture régionale dans p6 histoire (FR/EN/ES)
- **Galerie Division Draveur** : 5 photos domaine public dans /divisions/web/page.tsx (1 grande + grille 4)
  - Draveur_HR.jpg, Botte_draveur.jpg, draveur_1.avif, Draveur_2.jpg, Draveur_3.avif
- **Galerie Division Carillon** : 5 photos domaine public dans /divisions/cyber/page.tsx (1 grande + grille 4)
  - Ogden painting (principale), British at Carillon.webp, Carillon_map.jpg, Fort_Carillon_1.jpg, Fort_ticonderoga_place_d_arms.jpg
  - ⚠️ 2 photos Alamy (watermark) remplacées par équivalents domaine public
- **Bloc cyber Tarification** : section Division Carillon ajoutée dans /tarification/page.tsx
  - Fort Saurel SaaS dès 75$/mois + Suite Carignan sur devis + CTA → /divisions/cyber
- **Bloc tarif Division Draveur** : résumé forfaits ajouté dans /divisions/web/page.tsx avant CTA final
- **⚠️ NOM PRODUIT EN RÉFLEXION** : "Fort Saurel" vs "Fort Richelieu" (voir section produits cyber)
- **⚠️ RSYNC + GIT PUSH EN ATTENTE** : toutes les modifs session prêtes, pas encore poussées sur Vercel

### Photos domaine public dans public/photos_images/
- Draveur_HR.jpg, Botte_draveur.jpg, draveur_1.avif, Draveur_2.jpg, Draveur_3.avif (Division Draveur)
- The_Victory_of_Montcalms_Troops_at_Carillon_by_Henry_Alexander_OgdenAAA.jpg (Carillon — Ogden)
- British at Carillon.webp, Carillon_map.jpg, Fort_Carillon_1.jpg, Fort_ticonderoga_place_d_arms.jpg (Carillon)
- Fort Saurel / Fort Richelieu photos → À ajouter (Jonathan en recherche — BAnQ, BAC, Wikimedia Commons)

## Enrichissement contenu — Session 2026-05-26 (soir)
### SEO sémantique Division Draveur (FR + EN + ES)
- Vocabulaire sémantique injecté dans messages/*.json :
  - "maîtrise du flux numérique", "portails web robustes", "optimisation de l'achalandage web"
  - Analogie draveurs → rivières → flux numérique dans hero_description, approche_texte, card /divisions
- Quote homepage remplacée : Étoile Polaire / coureurs des bois / flux numérique (FR + EN + ES)
- p6 histoire enrichi : "marier la rigueur de nos bâtisseurs historiques à la puissance des technologies de demain"

### Sections narratives hardcodées dans les pages TSX
- **divisions/web/page.tsx** : section "Maîtriser le flux" (récit draveurs + embâcle) + encadré "L'avantage Étoile Boréale" (20-40% moins cher que les grandes firmes) + bloc "Saviez-vous que ?" (+22% BDC / 3k$–10k$ marché canadien)
- **divisions/cyber/page.tsx** : section "Architecture défensive" (Bataille de Carillon 1758 + abatis) + encadré "L'avantage Étoile Boréale" (gouvernance données + Loi 25 + preuve documentée) + bloc "Saviez-vous que ?" (40% PME ciblées / 25 000$+ coût incident) + section "Fort Saurel — Le Verrou du Richelieu" (Pierre de Saurel 1665 + Sentinelles + avantage Boréale)

### Fort Saurel (rebrand final)
- Renommé de "Saurel" → "Fort Saurel" (H2, tagline, JSON-LD)
- Nouvelle tagline : "La vigie numérique des PME."
- Sentinelles = agents automatisés internes (scripts, alertes, traqueurs) — terme fonctionnel, pas tier tarifaire

### Micro-animations — globals.css
- `.card-lift` : hover élévation (translateY -5px + lueur orange) sur cartes divisions, équipe, services
- `.animate-fade-in-up` + `.stagger-1` à `.stagger-6` : entrée échelonnée des grilles de cartes
- `.scroll-fade` : CSS scroll-driven animations (animation-timeline: view()) sur paragraphes histoire
- Transitions globales fluides sur a et button

## Modèle de tarification — Décisions session 2026-05-06

### Forfaits de livraison (one-time)
- Vitrine Essentiel   : ~1 500 – 2 200$
- Pro Interactif      : ~3 000 – 4 500$ (réservation, blog, galerie)
- Commerce Complet    : ~5 500 – 8 000$+ (e-commerce, paiement, panel admin)

### Maintenance mensuelle (obligatoire, inclus dans tout contrat)
- Option A (client autonome via CMS) : 150$/mois — plomberie + monitoring
- Option B (Étoile Boréale gère tout) : 200 – 350$/mois — contenu inclus

### Heures supplémentaires hors contrat
- Support client / modifs contenu      : 75 – 90$/h
- Développement (nouvelle fonctionnalité) : 80 – 120$/h
- Banque d'heures prépayée             : 10h à 700$ (économie ~100$)
  → Email automatique quand solde < 3h pour renouvellement

### Services complémentaires — Gestion réseaux sociaux (Paulina)
- Présence Essentielle (FB+IG, 2-3 posts/sem) : 399$/mois
- Présence Active (multi-plateforme + vidéo)  : 699$/mois
- Présence Complète (écosystème + livre postal) : 1 099$/mois
- Design de pamphlets/imprimés : facturation horaire (partenariat impression local)
- Banque d'heures couvre tous les services y compris déplacements Paulina

## Stratégie médias & contenu — Décisions session 2026-05-06

### Tier 1 — Activer immédiatement
- YouTube @etoileboreale
- Instagram @etoileboreale
- Facebook Page Groupe Étoile Boréale
- TikTok @etoileboreale
- LinkedIn Page Groupe Étoile Boréale

### Tier 2 — Phase 2 contenu
- Pinterest (fort potentiel pour artisanat, déco, cuisine — clients cibles)
- LinkedIn personnel Jonathan Patoine (crédibilité B2B, cybersec)

### Tier 3 — Phase 3+
- Spotify / Podcast (15-20 min, invités clients, entrepreneurs région)
- Twitch — UNIQUEMENT pour Nordik Legion Studio (développement)

### Entonnoir de contenu
1 production (vidéo Paulina chez client) → Short TikTok + Reel Instagram + épingle Pinterest
+ Article de blogue /actualites avec vidéo embarquée + Publication Facebook 48-72h après

### Revenus publicitaires visés (long terme)
- Google AdSense sur site éditorial Groupe Étoile Boréale
- Facebook Ads Revenue (pages de marque)
- YouTube Programme Partenaire (1000 abonnés + 4000h ou 10M vues Shorts/90j)

## Positionnement
- Marché cible : PME et entrepreneurs de Beauce, Bellechasse, Chaudière-Appalaches
- Différenciateur : proximité locale, compréhension de la réalité régionale
- Branding : hommage aux héros historiques/folkloriques/mythologiques canadiens
- PAS en compétition avec les agences urbaines de Québec/MTL
- Prix justes pour la région : accessible sans être cheap (signal de qualité)
- Modèle de croissance : 5 clients bien servis + bouche-à-oreille > 50 clients mal suivis

## Phase 2 — Contenu à ajouter (APRÈS revamping actuel)
- ✅ Section historique/lore Division Draveur : histoire des draveurs québécois + ancrage web
- ✅ Section historique/lore Division Carillon : Bataille de Carillon 1758 + ancrage cybersec
- ✅ "Saviez-vous que ?" stats : BDC +22%, marché 3k-10k$ (Draveur) / 40% PME, 25k$ incident (Carillon)
- ✅ Contexte Fort Saurel : Pierre de Saurel 1665, Richelieu, Sentinelles, avantage Boréale
- ✅ Galerie photos Division Draveur (5 photos domaine public)
- ✅ Galerie photos Division Carillon (5 photos domaine public)
- ✅ Bloc tarification cyber sur page /tarification
- [ ] Photos Fort Saurel/Richelieu → Jonathan en recherche (BAnQ, BAC, Wikimedia)
- [ ] Décision finale nom produit : "Fort Saurel" ou "Fort Richelieu"
- [ ] Galerie photos Fort Saurel dans /divisions/cyber (après décision nom + photos trouvées)
- [ ] Contexte Suite Carignan (Sorel, Contrecoeur, Berthier, Chambly) avec lore historique
- ✅ Articles Loi 25 sur /actualites — slug loi-25-guide-pme-quebec (2026-07-13)
- ✅ og-image.jpg avec branding Étoile Boréale — design Paulina Jaramillo, 1200×630 (2026-07-13)
- ✅ Pages profil équipe créées : /equipe/jonathan-patoine (complet), /equipe/alexandra-espin (complet), /equipe/paulina-jaramillo (stub)
- ✅ Cartes équipe homepage rendues cliquables → /equipe/[slug] (clé cta_profile ajoutée FR/EN/ES)
- ✅ Photos Jonathan + Alexandra remplacent initiales sur pages profil (Paulina mercredi 2026-07-16)
- ✅ Bio Jonathan restructurée (p1-p3) + Bio Alexandra complète (FR/EN/ES) — Paulina mercredi
- [ ] Photo et bio Paulina Jaramillo — mercredi 2026-07-16
- [ ] Réécrire histoire cie (home.histoire.*) quand les 3 bios fondateurs seront prêts
- [ ] Supprimer projet Vercel doublon "horizon91" (garder uniquement "horizon91-2zpm")
- [ ] Resubmit sitemap Google Search Console (etoileboreale.ca + borealstar.ca) après suppression doublon

## À faire — Jonathan (hors code)
- [ ] Enregistrement légal : NEQ (Registraire entreprises QC) + numéro fédéral ARC — "Groupe Étoile Boréale Inc."
- [ ] Numéros de taxes : TPS/TVQ (seuil obligatoire 30 000$/an, recommandé dès maintenant)
- ✅ Migration Zoho @etoileboreale.ca — comptes créés + SMTP zohocloud.ca:465 (2026-07-07)
- [ ] Réserver handles @etoileboreale sur toutes les plateformes sociales (Alexandra — phase lancement)
- ✅ Photo Jonathan ajoutée (jonathan-patoine.jpg, 600×600, 24 KB) — 2026-07-08
- ✅ Photo Alexandra ajoutée (alexandra-espin.jpg, 600×600, 25 KB) — 2026-07-13
- [ ] Photo Paulina — mercredi 2026-07-16
- ✅ Bio Jonathan restructurée (p1-p3) — 2026-07-13
- ✅ Bio Alexandra complète FR/EN/ES — 2026-07-13
- [ ] Bio Paulina — mercredi 2026-07-16
- [ ] Contenu Citadelle Jiu-Jitsu — en attente retour client
- [ ] Supprimer projet Vercel doublon "horizon91" (garder horizon91-2zpm) ← SESSION 2026-07-13
- [ ] Resubmit sitemap Google Search Console (etoileboreale.ca + borealstar.ca) ← SESSION 2026-07-13
- ✅ Zoho Mail configuré — comptes créés, DNS en place (voir ZOHO-MAIL.md)
- ✅ DKIM propagé et vérifié (groupesupernova.ca)
- ✅ Test courriel envoyé — premier courriel professionnel expédié à Citadelle Jiu-Jitsu
- ✅ Signature courriel configurée dans Zoho webmail

## Prochaines étapes techniques — REBRAND 2026-05-26
1.  ✅ Nouveau logo/mark L'ÉTOILE (mark-etoile.svg)
2.  ✅ Header + page accueil mis à jour (mark-etoile.svg, 310px hero)
3.  ✅ messages/fr.json — branding complet + SEO sémantique Draveur + Story enrichie
4.  ✅ messages/en.json + es.json — Boreal Star Group / Grupo Estrella Boreal + SEO sémantique
5.  ✅ layout.tsx — metadata + OG + canonical nouveaux domaines
6.  ✅ divisions/page.tsx — Draveur, Carillon, Nordik Legion Studio (card-lift animations)
7.  ✅ divisions/web/page.tsx — héritage draveurs + avantage Boréale + Saviez-vous que + animations
8.  ✅ divisions/cyber/page.tsx — Fort Saurel (rebrand) + héritage Carillon + Saviez-vous que + section Fort Saurel complète
9.  ✅ api/contact/route.ts — noms expéditeurs + domain footer
10. ✅ robots.ts + sitemap.ts — etoileboreale.ca
11. ✅ confidentialite/page.tsx — Groupe Étoile Boréale partout
12. ✅ SEO complet — generateMetadata + JSON-LD Service/SoftwareApp sur toutes les pages
13. ✅ Client components extraits (PortfolioClient, RejoindreCl) pour SEO serveur
14. ✅ Google Search Console — etoileboreale.ca + borealstar.ca vérifiés + sitemaps + indexation
15. ✅ Micro-animations — globals.css (card-lift, animate-fade-in-up, stagger, scroll-fade)
16. ✅ og-image.jpg — design Paulina Jaramillo, 1200×630 (2026-07-13)
17. [ ] Google Business Profile — mettre à jour nom "Groupe Étoile Boréale Inc."
18. ✅ Photos Jonathan + Alexandra ajoutées / Paulina mercredi 2026-07-16
19. ✅ Bio Jonathan restructurée (p1-p3) + Bio Alexandra complète FR/EN/ES — Paulina mercredi
20. [ ] Suite Carignan — section lore historique (Sorel, Contrecoeur, Berthier, Chambly)
21. ✅ Article Loi 25 trilingue sur /actualites (slug: loi-25-guide-pme-quebec, 2026-07-13)
22. ✅ Upgrade Next.js 16.x + next-intl 4.x (2026-07-03) — testé en local WSL, déployé sur Vercel
23. ✅ Vercel Analytics + Speed Insights activés (2026-07-08) / Firewall Bot Protection Challenge + AI Bots Deny (2026-07-13)
24. [ ] Supprimer projet Vercel doublon "horizon91" + resubmit sitemap GSC

## Vercel — Notes configuration
- Projet : horizon91-2zpm (Hobby plan)
- Root Directory : divisions/Web/HorizonSite ← CRITIQUE, ne pas changer
- Framework Preset : Next.js ← CRITIQUE, ne pas changer
- Node.js : 24.x
- Build auto sur chaque push git → main
- Domaines Production : etoileboreale.ca, borealstar.ca, groupesupernova.ca (301), supernovagroup.ca (301)
- ATTENTION : changer Root Directory ou Framework Preset casse le déploiement
- ⚠️ DOUBLON à supprimer : projet "horizon91" (même repo GitHub, aucun domaine custom, 0 visiteurs) — garder uniquement "horizon91-2zpm"
