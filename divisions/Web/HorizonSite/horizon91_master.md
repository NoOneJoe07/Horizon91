# Horizon 91 — Contexte Maître (Jonathan Patoine)

> Fichier de référence centrale pour toutes les sessions Claude / Cowork.
> À uploader en début de session dans n'importe quel projet Horizon 91.
> **Dernière mise à jour : 11 mai 2026**

---

## 0. Comment utiliser ce fichier

- **Projet Cowork actif** : si le projet a un `CLAUDE.md` qui pointe vers ce fichier via `@`, il est chargé automatiquement.
- **Nouveau projet ou session hors workspace** : uploader ce fichier manuellement en début de conversation.
- **Mise à jour** : à la fin de chaque session productive, ajouter 2-3 lignes pour capturer les décisions clés.

---

## 1. Qui je suis

**Jonathan Patoine** — Fondateur & DG, Groupe Supernova / Horizon 91
- Formation : AEC Cybersécurité, Cégep de l'Outaouais (Cumberland)
- Profil : développeur web full-stack + cybersécurité + entrepreneur
- Région : Sainte-Marie-de-Beauce, Chaudière-Appalaches, Québec
- Email professionnel : jonathan.patoine@groupesupernova.ca
- Email personnel : jonathanpatoine81@gmail.com

**Équipe Groupe Supernova :**
- **Alexandra Marcela Espin Espinoza** — DG Communications ; PhD communications, ex-coordonnatrice nationale communications Président de l'Équateur (2015-2016) ; révision contenu EN/ES
- **Paulina Jaramillo** — DG Marketing & Photographie ; directrice artistique, infographiste, photographe
- **Gabriel Patoine** — CISO Division Cybersécurité (en formation, à venir)
- **Kristina** (externe) — conseillère ponctuelle SEO & ventes, copine du premier client (Jean-Sébastien, Citadelle JJ) ; n'est pas membre de Groupe Supernova

---

## 2. Groupe Supernova — L'entreprise

**Noms de marque :**
- FR : Groupe Supernova → groupesupernova.ca
- EN : Supernova Group → supernovagroup.ca
- ES : Grupo Supernova (futur)

**Divisions :**
| Division | Mark | Couleur | Domaine |
|---|---|---|---|
| Groupe Supernova (maison mère) | Event Horizon | Orange `#FF7A1A` | Direction, stratégie |
| Développement Web | La Flamme | Violet `#6A00FF` | Sites, e-commerce, apps |
| Cybersécurité | Singularité | Orange/rouge | Audits, conformité, conseil |
| Studio Nordik Legion | Vortex | Cyan `#00F0FF` | Jeux vidéo (Cyber-Mythos) |

**Positionnement :**
- Marché cible : PME et entrepreneurs de Beauce, Bellechasse, Chaudière-Appalaches
- Différenciateur : proximité locale, prix justes pour la région, qualité agence
- Modèle de croissance : 5 clients bien servis + bouche-à-oreille > 50 clients mal suivis
- PAS en compétition avec les agences urbaines de Québec/MTL

**Statut légal — Stratégie arrêtée 2026-05-11 :**
- [ ] Rapport NUANS — vérification fédérale (~30-75 $) — CE SOIR
- [ ] Dépôt marque OPIC verbale « Groupe Supernova » — Classes 35 + 42 (~916 $) — dès NUANS confirmé
- [ ] Incorporation SPA — REQ Québec (~385-1 885 $ selon avocate) — semaines suivantes
- [ ] Enregistrement TPS/TVQ sous le nom de la société
- [ ] Continuation fédérale (Corporations Canada) — Phase 2 / lancement SaaS
- Disponibilité confirmée : REQ Québec ✅ — OPIC Canada ✅ — entités similaires hors QC : risque faible à nul
- Document préparé : `StrategieIncorporation_GroupeSupernova.docx` — remis à avocate

---

## 3. Stack technique standard — Horizon 91

Chaque projet client part de cette base :

| Technologie | Version | Notes |
|---|---|---|
| Next.js | 15+ App Router | TypeScript obligatoire |
| React | 19+ | |
| Tailwind CSS | v4 | Tokens CSS custom `h91-*` |
| next-intl | 3.26+ | FR par défaut, EN/ES selon projet |
| Prisma | 6+ | ORM PostgreSQL (projets avec DB) |
| Stripe | API `2025-03-31.basil` | Checkout + Webhooks |
| Resend | — | Emails transactionnels |

**Architecture deux copies (Cowork + WSL) :**
- Cowork édite dans OneDrive
- Dev server tourne dans WSL `~/Horizon91/divisions/Web/clients/[client]/`
- Sync manuel : `cp` depuis OneDrive vers WSL après chaque session
- Après sync : `rm -rf .next && npm run dev` si le hot reload ne prend pas

---

## 4. Template sécurité — next.config.ts

Socle commun à appliquer sur **chaque** projet Next.js Horizon 91 :

**Headers invariants (tous projets) :**
- `Strict-Transport-Security` : `max-age=63072000; includeSubDomains; preload`
- `X-Frame-Options` : `DENY`
- `X-Content-Type-Options` : `nosniff`
- `Referrer-Policy` : `strict-origin-when-cross-origin`
- `Cross-Origin-Opener-Policy` : `same-origin` ← protection Spectre/XS-Leaks
- `Cross-Origin-Resource-Policy` : `same-site`
- `Permissions-Policy` : camera, micro, géoloc, payment, usb, bluetooth, display-capture, browsing-topics, private-state-token-* → tous révoqués

**Ajouts par type de projet :**
- Stripe → `script-src += https://js.stripe.com`, `connect-src += https://api.stripe.com`, `frame-src += https://js.stripe.com https://hooks.stripe.com`
- YouTube → `frame-src += https://www.youtube.com`
- Maps → `frame-src += https://maps.google.com`, `connect-src += https://maps.googleapis.com`

**Fichier de référence :** `HorizonSite/next.config.ts` (version propre, sans Stripe)

---

## 5. Modèle de tarification — Développement Web

> Note : tarification de lancement — à réviser à la hausse après 3-4 clients livrés avec témoignages.
> Nous sommes ~40-60% sous le marché de Montréal/Québec pour une qualité équivalente.

### Forfaits de livraison (one-time)
| Forfait | Prix | Contenu |
|---|---|---|
| Vitrine Essentiel | 1 800 – 2 800 $ | Site vitrine jusqu'à 5 pages, bilingue, SEO, Vercel |
| Pro Interactif | 3 000 – 4 500 $ | Réservation, blog, galerie, formulaires |
| Commerce Complet | 5 500 – 12 000 $+ | E-commerce, Stripe, Prisma, panel admin CRUD |

### Maintenance mensuelle (obligatoire dans tout contrat)
| Option | Prix | Description |
|---|---|---|
| A — Client autonome | 150 $/mois | Plomberie + monitoring + mises à jour sécurité |
| B — Supernova gère tout | 200 – 350 $/mois | Contenu + mises à jour inclus |

### Heures supplémentaires hors contrat
- Support / modifs contenu : 75 – 90 $/h
- Développement (nouvelle fonctionnalité) : 80 – 120 $/h
- Banque d'heures prépayée : 10h à 700 $ (vs ~800 $ au taux normal)
- Email automatique quand solde < 3h pour renouvellement

### Médias sociaux — Add-on mensuel (Paulina, DG Marketing)
| Palier | Prix | Description |
|---|---|---|
| Essentielle | 300 $/mois | Présence maintenue, publications régulières |
| Active | 500 $/mois | Contenu original, engagement communauté, stratégie |
| Complète | 800 $/mois | Production photo/vidéo chez client, campagnes, rapports |

### Services complémentaires
- Design imprimé / pamphlets : facturation horaire (partenariat impression local)

---

## 6. Portfolio Jonathan — Compétences démontrées

_(Utile pour candidatures emploi, pitch client, ou profil LinkedIn)_

### Projets livrés

**Citadelle Jiu-Jitsu** — E-commerce complet (2026)
- Next.js 16 App Router + TypeScript + Tailwind v4
- next-intl (FR/EN bilingue)
- Stripe Checkout + Webhooks (abonnements + marchandise)
- Prisma 6 + PostgreSQL (plans, produits, instructeurs)
- Authentification sécurisée + panel admin CRUD
- Security headers OWASP (HSTS, CSP, COOP, CORP, Permissions-Policy)
- Pattern checkout : JSON API + `window.location.href` (robust, debuggable)
- Défi notable : débogage Stripe null URL → root cause API version mismatch

**Groupe Supernova — HorizonSite** — Site vitrine corporatif trilingue (2026)
- Next.js 15 App Router + TypeScript + Tailwind v4
- next-intl 3 (FR/EN/ES, routing `/fr/...`, sélecteur langue header)
- SEO complet : `generateMetadata` par page, JSON-LD LocalBusiness, sitemap dynamique, robots.txt
- Open Graph, HSTS preload, Mozilla Observatory A+
- Déployé sur Vercel (Hobby) — 4 domaines SSL actifs
- Zoho Mail Lite configuré — 5 comptes, DNS MX + SPF + DKIM + DMARC

### Compétences techniques clés
- **Frontend** : Next.js App Router, React 19, TypeScript, Tailwind CSS v4
- **i18n** : next-intl (routing multi-locale, messages JSON, sélecteur langue)
- **Paiement** : Stripe Checkout, Webhooks, API version pinning
- **ORM** : Prisma 6, migrations, relations PostgreSQL
- **Sécurité** : OWASP Secure Headers, CSP, COOP, CORP, Loi 25 Québec
- **SEO** : metadata structuré, JSON-LD, sitemap, robots.txt, mots-clés locaux
- **DevOps** : Vercel, Git/GitHub, architecture two-copy Cowork+WSL
- **Email** : Zoho Mail, DNS (MX, SPF, DKIM, DMARC), Resend (transactionnel)
- **Cybersécurité** : en formation (AEC Cumberland), CISO Division Cyber

---

## 7. Clients actifs

### Citadelle Jiu-Jitsu
- **Contact** : Jean-Sébastien (propriétaire) + Kristina (copine, conseillère SEO)
- **Workspace** : `C:\Users\Pc\OneDrive\Documents\Horizon 91\Web\Citadelle_JiuJitsu\Citadelle Jiu-Jitsu\`
- **Contexte détaillé** : voir `contexte_session_citadelle.md` dans le workspace
- **Statut** : développement actif — en attente contenu client (bio, photos, prix réels)
- **Prochaines étapes** : cours privés (formulaire email), SEO par page, banner success/canceled Stripe, admin CRUD

### En pipeline
- **Atelier 91** — artisanat produits naturels (ami de Jean-Sébastien)
- **Salon Mélanie Roy** — coiffeuse/barbière (Sainte-Marie-de-Beauce)
- **Bois Rond inc.** — construction maisons en bois rond
- **Eliza Doyon** — courtière immobilière RE/MAX

---

## 8. Stratégie SEO (Kristina)

- Modèle 3-clients-par-niche : Groupe Supernova = 1 client par niche régionale pour dominer le référencement local
- Chaque page a son `generateMetadata` avec mots-clés spécifiques à la page (pas seulement au site)
- Cibler également Bing (même pratiques SEO, audience différente)
- Google Search Console + Google Business Profile pour chaque client
- Contenu : entonnoir 1 production vidéo → TikTok Short + Reel Instagram + article blog + épingle Pinterest + publication Facebook

---

## 9. Projet recherche d'emploi (Jonathan personnel)

_(Section à enrichir selon les candidatures en cours)_

- Profil : développeur web + cybersécurité, bilingue FR/EN
- Stack mise en avant : Next.js, React, TypeScript, Tailwind, Prisma, Stripe
- Projets démontrables : HorizonSite (GitHub public), Citadelle (privé, démo sur demande)
- Différenciateur candidature : expérience full-stack end-to-end + sécurité + déploiement prod

---

## 10. Division Cybersécurité — Singularité

### Mission déclarée (10 mai 2026)
> *"Pendant que les grandes firmes cyber se battent pour les contrats des grandes entreprises et institutions, Groupe Supernova — Division Singularité s'occupe de ceux que tout le monde ignore : les PME régionales, les cliniques de village, les commerces de coin de rue, les citoyens. On aide les régions à se préparer à ce qui s'en vient pour tout le monde."*

### Positionnement
- PAS en compétition avec les grandes firmes cyber de Québec/Montréal
- Marché cible : PME et organisations régionales de Chaudière-Appalaches et Beauce
- Différenciateur : proximité, accessibilité, prix justes, sécurité intégrée dès la conception

### Trois piliers de l'offre de base

| # | Pilier | Description | Stade | Revenu |
|---|---|---|---|---|
| 1 | 🎣 Phishing Sim & Sensibilisation | Fausses campagnes + exercices pratiques pour distinguer courriels légitimes vs suspects. Mandat écrit obligatoire. | ✅ MAINTENANT | Forfait mandat + abonnement |
| 2 | 🔍 Dark Web Monitoring as a Service | Surveillance continue domaines/courriels/credentials dans bases de brèches (HaveIBeenPwned, Dehashed, Flare). Alertes + rapports mensuels. | ✅ MAINTENANT | 75-200$/mois/PME (récurrent) |
| 3 | 🌐 Audit OSINT Posture de Défense | Évaluation surface d'exposition publique via outils open source (theHarvester, Shodan, Nikto, Nuclei, WhatWeb). | 🔜 PHASE 2 (2027) | Forfait audit + rapport |

### Triangle de valeur
- Phishing Sim → **Éducation** ("Comment on t'attaque")
- Dark Web Monitoring → **Détection** ("As-tu déjà été compromis ?")
- Audit OSINT → **Évaluation** ("Ce que les attaquants voient de toi")

### Stratégie de crédibilité
- Sites clients construits avec sécurité intégrée (MFA, DKIM, DMARC, OWASP, Loi 25) → portfolio vivant
- Site d'actualité cybersécurité (division web) → articles co-rédigés, liens vers produits
- Podcast/vidéo : explication des produits, sensibilisation grand public
- Validation juridique obligatoire avant commercialisation de tout logiciel/app

### Outil interne Phase 3+ (jamais commercialisé)
- Environnement d'anonymisation opérationnel (proxychaining, Tor, jump servers) — pour mandats forensic/IR uniquement, avec cadre contractuel béton

---

## 11. Décisions techniques importantes (log)

| Date | Décision | Raison |
|---|---|---|
| 2026-05 | Stripe API version `2025-03-31.basil` | Résout null URL sur `checkoutSession.url` |
| 2026-05 | Checkout : JSON `{ url }` + `window.location.href` | Plus robuste que `NextResponse.redirect` avec Stripe |
| 2026-05 | COOP + CORP ajoutés au template security headers | Protection Spectre/XS-Leaks, alignement OWASP |
| 2026-05 | Permissions-Policy étendu (8 → 11 directives) | Révocation Topics API + Payment API + USB/BT |
| 2026-05 | next-intl v3/v4 pour HorizonSite et Citadelle | Routing multi-locale natif App Router |
| 2026-05 | Vercel Hobby, Root Directory `divisions/Web/HorizonSite` | Ne jamais changer le Framework Preset |
| 2026-05-10 | `proxy.ts` remplace `middleware.ts` (Next.js 16+) | Convention renommée — les deux fichiers ensemble = crash |
| 2026-05-10 | `localeDetection: false` dans proxy.ts | Empêche redirect EN sur PC/navigateur anglais |
| 2026-05-10 | horizon91_master.md créé dans HorizonSite/ | Fichier de contexte central — uploader dans toute nouvelle session |
| 2026-05-11 | Stratégie incorporation : SPA REQ QC → continuation fédérale Phase 2 | Adéquation opérations actuelles + expansion future SaaS |
| 2026-05-11 | Marque OPIC verbale Classes 35+42 (~916$) prioritaire sur incorporation | Date dépôt OPIC = priorité légale nationale immédiate |
| 2026-05-11 | Rapport NUANS ce soir (~30-75$) avant tout engagement | Validation fédérale du nom avant dépenses significatives |
| 2026-05-11 | Claude HorizonSite intégré au protocole Starlog | Symbiose inter-Claude opérationnelle — tous projets Cowork couverts |
| 2026-05-10 | sync-citadelle.sh — script de sync OneDrive→WSL | Remplace les cp manuels, nettoyage automatique middleware.ts |
| 2026-05-10 | Tarification médias sociaux : 300/500/800$/mois | Couvre Paulina (photographe/graphiste/DG Marketing) |
| 2026-05-10 | Vitrine Essentiel plancher relevé à 1 800-2 800$ | Nous sommes 40-60% sous le marché urbain pour qualité équivalente |

---

---

## 11. Protocole de collaboration Claude ↔ Jonathan

> Cette section définit comment tous les Claude, dans tous les projets Cowork, doivent se comporter pour maximiser la symbiose et l'efficacité.

### Fichiers de contexte (par projet)
- Chaque projet Cowork a un fichier `contexte_session_courante.md` dans son dossier workspace
- Ce fichier est **créé ou mis à jour à la fin de chaque session** par Claude
- Il contient : date, mode de la session, ce qui a été accompli, décisions clés, fichiers modifiés, prochaines étapes
- En **début de session**, Jonathan peut préciser le mode (`exploration/brainstorm` vs `production/livrable`) et ses contraintes de temps

### Fichier maître (ce fichier)
- `horizon91_master.md` est le **cerveau partagé** de tout l'écosystème Horizon 91
- Il est mis à jour **uniquement** quand une décision, pratique ou idée profite à **tous les projets**
- Chaque Claude qui découvre une amélioration systémique la propose à Jonathan avant de l'intégrer ici

### Protocole de début de session
1. Lire `horizon91_master.md` (ce fichier) pour le contexte global
2. Lire `contexte_session_courante.md` du projet actif pour le contexte local
3. Demander à Jonathan le mode et l'intention du jour si non précisé

### Protocole de fin de session
1. Mettre à jour `contexte_session_courante.md` avec ce qui a été accompli
2. Si une décision systémique a été prise → mettre à jour ce fichier maître
3. Toujours terminer avec les prochaines étapes concrètes

### Le Starlog — Journal de bord officiel
- Fichier : `STARLOG_Vaisseau_Horizon91.md` (dans le projet Cowork Division Cybersécurité)
- **Double vocation** : narration thématique spatiale (ADN Supernova) + documentation légale horodatée (preuve en cas de litige)
- Chaque entrée porte : numéro séquentiel, date ISO, heure, fuseau horaire, auteur
- À mettre à jour à chaque session productive — particulièrement pour les anomalies et résolutions (valeur légale)
- Peut un jour devenir : contenu de marque, livre blanc, preuve d'antériorité, matériel de storytelling

### Vision
L'objectif est une **symbiose évolutive** : chaque session améliore l'environnement de travail pour tous les Claude futurs dans tous les projets. Le cerveau partagé grandit à chaque session.

---

*Fin du fichier. Si tu lis ceci en début de session : bienvenue dans l'écosystème Horizon 91. 🚀*
*Pour la tâche du jour, lis le `contexte_session_courante.md` du projet actif.*
