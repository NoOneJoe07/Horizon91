@AGENTS.md

# CONTEXTE PROJET — Groupe Supernova / HorizonSite
Dernière mise à jour : 2026-05-06

## Stack technique
- Next.js 16.2.3 App Router (TypeScript, Tailwind v4)
- next-intl pour l'internationalisation (FR/EN/ES)
- Deux copies : OneDrive (Cowork édite ici) ↔ WSL ~/Horizon91/divisions/Web/HorizonSite (npm run dev)
- Sync manuel requis après chaque session : cp depuis OneDrive vers WSL
- Middleware actif : middleware.ts (proxy.ts = résidu vidé, peut être supprimé du repo)

## Structure app/
```
app/
  layout.tsx              ← Root minimal (redirect /fr si accès racine)
  page.tsx                ← Redirect → /fr
  sitemap.ts              ← Sitemap dynamique (toutes locales)
  robots.ts               ← robots.txt dynamique
  globals.css             ← Tokens CSS h91-*, fond cosmique
  accueil/page.tsx        ← Redirect → /fr (résidu)
  contacts/page.tsx       ← Redirect → /fr/contacts (résidu)
  divisions/page.tsx      ← Redirect → /fr/divisions (résidu)
  portfolio/page.tsx      ← Redirect → /fr/portfolio (résidu)
  rejoindre/page.tsx      ← Redirect → /fr/rejoindre (résidu)
  [locale]/
    layout.tsx            ← Layout complet + generateMetadata() trilingue + OG tags
    page.tsx              ← Homepage (hero + JSON-LD LocalBusiness + équipe + histoire)
    divisions/
      page.tsx            ← Liste divisions (marks cliquables vers /web et /cyber)
      web/page.tsx        ← Page Division Web (hero + 6 services + CTA)
      cyber/page.tsx      ← Page Division Cybersécurité (hero + 6 services + CTA)
    actualites/page.tsx   ← Section Blog/Actualités (structure vide, phase 2)
    portfolio/page.tsx    ← "use client" (filtre catégories)
    contacts/page.tsx
    rejoindre/page.tsx
  components/
    Header.tsx            ← Sélecteur FR|EN|ES + mark-supernova.svg + nav Actualités
    Footer.tsx            ← Nom de marque adaptatif
i18n/
  routing.ts              ← locales: [fr, en, es], default: fr
  request.ts
  navigation.ts           ← Link, useRouter, usePathname locale-aware
messages/
  fr.json                 ← Maître (tout le contenu FR) — inclut divisionWeb, divisionCyber, actualites
  en.json                 ← Contenu EN (à réviser par Alexandra)
  es.json                 ← Contenu ES (à réviser par Alexandra/Paulina)
public/
  LogoGroupeSupernova.svg ← Logo hero principal (ne pas remplacer)
  mark-supernova.svg      ← Event Horizon — Groupe Supernova (header)
  mark-web.svg            ← La Flamme — Division Web (violet→orange)
  mark-cyber.svg          ← Singularité — Cybersécurité (orange)
  mark-nordik.svg         ← Vortex — Studio Nordik Legion (cyan)
  og-image.jpg            ← À CRÉER : image Open Graph 1200×630px
DEPLOIEMENT.md            ← Guide complet Vercel + domaines Namecheap
ZOHO-MAIL.md              ← Guide complet Zoho Mail + MX records + comptes + alias
```

## Palette de couleurs (tokens Tailwind)
```css
h91-gravity:    #000000   /* Fond trou noir absolu */
h91-accretion:  #FF7A1A   /* Orange principal — Groupe Supernova */
h91-fusion:     #FFD65C   /* Or/jaune — Direction générale */
h91-ion:        #00F0FF   /* Cyan — Studio Nordik Legion */
h91-warp:       #6A00FF   /* Violet — Développement Web */
h91-stellar:    #F2F7FF   /* Blanc stellaire — texte principal */
h91-relativistic: #1A8CFF /* Bleu (token réservé, non utilisé en UI) */
```

## Système de marks (logos par division)
- Concept : 4 marks géométriques partageant le même langage cosmique
- A — Singularité  → Cybersécurité (mark-cyber.svg) → /divisions/cyber ✓
- B — Vortex       → Studio Nordik Legion (mark-nordik.svg) → nordiklegion.ca (externe)
- C — Event Horizon → Groupe Supernova maison mère (mark-supernova.svg)
- D — La Flamme    → Développement Web (mark-web.svg) → /divisions/web ✓
- Marks CLIQUABLES depuis la page /divisions ✓

## Noms de marque adaptatifs par langue
- FR : Groupe Supernova (groupesupernova.ca)
- EN : Supernova Group (supernovagroup.ca)
- ES : Grupo Supernova (futur : gruposupernova.ca)
- Implémenté via clé brand.name dans chaque messages/*.json

## Domaines réservés (Namecheap)
- groupesupernova.ca → FR par défaut
- supernovagroup.ca  → EN par défaut
- Routing par domaine next-intl à activer dans i18n/routing.ts au déploiement (voir DEPLOIEMENT.md)

## Équipe
- Jonathan Patoine — Fondateur & DG (maison mère + Studio Nordik Legion)
- Alexandra Marcela Espin Espinoza — DG Communications (révision EN/ES)
- Paulina Jaramillo — DG Marketing & Photographie (Division Web + réseaux sociaux)
- Gabriel Patoine — CISO Division Cybersécurité (en formation, à venir)

## Emails (Zoho Mail gratuit — voir ZOHO-MAIL.md)
Vrais comptes : jonathan, alexandra, paulina, gabriel, contact
Alias → redirect : direction, web, cyber, studio, facturation, noreply

## Architecture de site décidée
- groupesupernova.ca = site principal maison mère
- Divisions Web et Cyber = pages profondes (/divisions/web, /divisions/cyber) ✓
- Studio Nordik Legion = site séparé (nordiklegion.ca) — redirect depuis mark
- PAS de domaines séparés par division pour l'instant

## Modèle de tarification — Décisions session 2026-05-06

### Forfaits de livraison (one-time)
- Vitrine Essentiel   : ~1 500 – 2 200$
- Pro Interactif      : ~3 000 – 4 500$ (réservation, blog, galerie)
- Commerce Complet    : ~5 500 – 8 000$+ (e-commerce, paiement, panel admin)

### Maintenance mensuelle (obligatoire, inclus dans tout contrat)
- Option A (client autonome via CMS) : 150$/mois — plomberie + monitoring
- Option B (Supernova gère tout)     : 200 – 350$/mois — contenu inclus

### Heures supplémentaires hors contrat
- Support client / modifs contenu    : 60 – 80$/h
- Développement (nouvelle fonctionnalité) : 80 – 100$/h
- Banque d'heures prépayée           : 10h à 700$ (vs 800$ au taux normal)
  → Email automatique quand solde < 3h pour renouvellement

### Services complémentaires (phase 2+)
- Gestion réseaux sociaux (Paulina)  : 300 – 500$/mois add-on
- Design de pamphlets/imprimés       : facturation horaire (partenariat impression local)
- Banque d'heures couvre tous les services y compris déplacements Paulina

## Stratégie médias & contenu — Décisions session 2026-05-06

### Tier 1 — Activer immédiatement (avant lancement)
- YouTube @groupesupernova
- Instagram @groupesupernova
- Facebook Page Groupe Supernova
- TikTok @groupesupernova
- LinkedIn Page Groupe Supernova

### Tier 2 — Phase 2 contenu
- Pinterest (fort potentiel pour artisanat, déco, cuisine — clients cibles)
- LinkedIn personnel Jonathan Patoine (crédibilité B2B, cybersec)

### Tier 3 — Phase 3+
- Spotify / Podcast (15-20 min, invités clients, entrepreneurs région)
- Twitch — UNIQUEMENT pour Studio Nordik Legion (développement Cyber-Mythos)

### Entonnoir de contenu
1 production (vidéo Paulina chez client) → Short TikTok + Reel Instagram + épingle Pinterest
+ Article de blogue /actualites avec vidéo embarquée + Publication Facebook 48-72h après

### Revenus publicitaires visés (long terme)
- Google AdSense sur site éditorial Groupe Supernova
- Facebook Ads Revenue (pages de marque)
- YouTube Programme Partenaire (1000 abonnés + 4000h ou 10M vues Shorts/90j)

## Positionnement — Décisions session 2026-05-06
- Marché cible : PME et entrepreneurs de Beauce, Bellechasse, Chaudière-Appalaches
- Différenciateur : proximité locale, compréhension de la réalité régionale
- PAS en compétition avec les agences urbaines de Québec/MTL
- Prix justes pour la région : accessible sans être cheap (signal de qualité)
- Modèle de croissance : 5 clients bien servis + bouche-à-oreille > 50 clients mal suivis

## À faire — Jonathan (hors code)
- [ ] Enregistrement légal : NEQ (Registraire entreprises QC) + numéro fédéral ARC
- [ ] Numéros de taxes : TPS/TVQ (seuil obligatoire 30 000$/an, recommandé dès maintenant)
- [ ] Configurer Zoho Mail (voir ZOHO-MAIL.md)
- [ ] Réserver handles @groupesupernova sur toutes les plateformes sociales
- [ ] Créer og-image.jpg (1200×630px) pour Open Graph — logo sur fond cosmique
- [ ] Photos d'équipe (Jonathan, Alexandra, Paulina) — attendues cette semaine
- [ ] Bios Alexandra et Paulina — à rédiger

## Prochaines étapes techniques — Objectif déploiement fin mai 2026
1. ✅ Conflits de routing résolus (vieilles pages → redirects)
2. ✅ SEO : metadata, Open Graph, JSON-LD LocalBusiness, sitemap, robots.txt
3. ✅ Pages /divisions/web et /divisions/cyber créées
4. ✅ Marks cliquables depuis page Divisions
5. ✅ Section /actualites plantée (structure vide phase 2)
6. ✅ Guide déploiement Vercel (DEPLOIEMENT.md)
7. ✅ Guide Zoho Mail (ZOHO-MAIL.md)
8. [ ] Créer og-image.jpg (public/)
9. [ ] Photos équipe → remplacer placeholders initiales
10. [ ] Déploiement Vercel + config domaines Namecheap
11. [ ] Zoho Mail → comptes + alias opérationnels
12. [ ] Enregistrement légal Jonathan
13. [ ] Google Search Console → soumettre sitemap
14. [ ] Google Business Profile → créer fiche
15. [ ] Comptes sociaux → créer + réserver handles
