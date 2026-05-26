# Contexte Session — HorizonSite (Groupe Étoile Boréale)

> Document de handoff entre sessions. À uploader en début de chaque nouvelle conversation.
> **Dernière mise à jour : 25 mai 2026 — Tâches 1-4 complétées ✅**
> Auteur : Jonathan Patoine, Horizon 91.

---

## 0. Comment utiliser ce fichier

À l'ouverture d'une nouvelle session :
1. Upload `horizon91_master.md` (contexte global écosystème)
2. Upload ce fichier (contexte local HorizonSite)
3. Décris la tâche du jour.

---

## 1. Le projet

Site vitrine corporatif de la maison mère — présente l'entreprise, les divisions, l'équipe, le portfolio et la tarification.
- **Workspace Cowork** : `C:\Users\Pc\OneDrive\Documents\Horizon 91\Web\HorizonSite\`
- **Repo WSL** : `~/Horizon91/divisions/Web/HorizonSite/`
- **Repo GitHub** : `https://github.com/NoOneJoe07/Horizon91` (sous `divisions/Web/HorizonSite/`)
- **Vercel** : projet `horizon91-2zpm` (Hobby), Root Directory `divisions/Web/HorizonSite`, Framework Next.js — NE PAS CHANGER

---

## 2. Stack technique

| Package | Version | Notes |
|---|---|---|
| next | ^15.3.1 (15.5.18) | App Router, TypeScript |
| react / react-dom | 19+ | |
| tailwindcss | v4 | Tokens CSS `h91-*` |
| typescript | ^5 | |
| next-intl | 3.26.5 | FR/EN/ES, routing `/[locale]/...` |

Pas de Prisma, pas d'auth, pas de Stripe — site vitrine pur.
API route `/api/contact` : nodemailer + Zoho SMTP port 465 SSL.

---

## 3. État en production — 25 mai 2026

### Domaines actifs
| Domaine | Langue | Statut |
|---|---|---|
| groupesupernova.ca | FR | ✅ Production — 301 → etoileboreale.ca configuré dans Vercel |
| supernovagroup.ca | EN | ✅ Production — 301 → borealstar.ca configuré dans Vercel |
| etoileboreale.ca | FR | ✅ Enregistré + DNS Namecheap + Vercel SSL actif |
| borealstar.ca | EN | ✅ Enregistré + DNS Namecheap + Vercel SSL actif |

### Pages existantes
| Route | Statut |
|---|---|
| `/[locale]/` | ✅ Homepage (hero, équipe, histoire, JSON-LD LocalBusiness) |
| `/[locale]/divisions` | ✅ Marks cliquables → /web et /cyber |
| `/[locale]/divisions/web` | ✅ Division Web (hero, 6 services, CTA) |
| `/[locale]/divisions/cyber` | ✅ Division Cybersécurité (hero, Argos 4 tiers, Suite Olympus) |
| `/[locale]/portfolio` | ✅ Filtre catégories client-side |
| `/[locale]/contacts` | ✅ Formulaire + API route Zoho |
| `/[locale]/rejoindre` | ✅ |
| `/[locale]/tarification` | ✅ 5 sections (forfaits web, maintenance, heures, social) |
| `/[locale]/confidentialite` | ✅ Loi 25 QC + PIPEDA fédéral |
| `/[locale]/actualites` | ✅ Structure vide phase 2 |

### Zoho Mail — MIGRÉ ✅ (25 mai 2026)
- Domaine principal : @groupesupernova.ca (SMTP auth — NE PAS CHANGER)
- Nouveau domaine ajouté : @etoileboreale.ca ✅ (MX + SPF + DKIM configurés, DMARC en propagation)
- 5 comptes : jonathan.patoine, alexandra.espin, paulina.jaramillo, gabriel.patoine, contact
- Aliases @groupesupernova.ca : direction, web, cyber, studio, facturation, noreply ✅
- Aliases @etoileboreale.ca ajoutés à chaque compte :
  - jonathan.patoine : jonathan.patoine, direction, facturation, studio @etoileboreale.ca ✅
  - alexandra.espin : alexandra.espin @etoileboreale.ca ✅
  - contact : contact @etoileboreale.ca ✅
  - gabriel.patoine : gabriel.patoine @etoileboreale.ca ✅
  - paulina.jaramillo : paulina.jaramillo, web.marketing @etoileboreale.ca ✅
- ENV Vercel : ZOHO_USER=contact@groupesupernova.ca (inchangé), CONTACT_TO=jonathan.patoine@etoileboreale.ca ✅
- ⚠️ DMARC @etoileboreale.ca : enregistrement mis à jour dans Namecheap, propagation DNS en cours — re-vérifier dans Zoho Admin dans 24-48h

---

## 4. ⚠️ CHANTIER EN COURS — Rebrand Groupe Étoile Boréale

**Décision unanime 22 mai 2026** : abandon du nom public "Groupe Supernova" (3 refus NUANS).
Nouveau nom : **Groupe Étoile Boréale Inc.** (FR) / **Boreal Star Digital Inc.** (EN)

### Nouvelle architecture de marque — VERROUILLÉE ✅
| Division | Nouveau nom affiché | Ancien nom | URL |
|---|---|---|---|
| Maison mère | Groupe Étoile Boréale Inc. | Groupe Supernova | — |
| Web & Numérique | Division Draveur — Développement Web | Division Web | /divisions/web (inchangée) |
| Cybersécurité | Division Carillon — Cybersécurité | Division Cybersécurité | /divisions/cyber (inchangée) |
| Jeux vidéo | Nordik Legion Studio | Studio Nordik Legion | externe nordiklegion.ca |

**Lore des divisions :**
- **Draveur** : les draveurs québécois guidaient des milliers de billots sur les rivières sauvages jusqu'au moulin. Métaphore directe : maîtriser le flux de trafic numérique, éliminer les embâcles (bugs/UX), guider l'achalandage vers la conversion client. Territoire SEO vierge en tech/web.
- **Carillon** : Bataille de Carillon 1758 — 3 600 défenseurs repoussent 15 000 assaillants. Architecture défensive supérieure. Cybersécurité = tenir la ligne contre des forces supérieures.
- **Astrolabe** : NOM RÉSERVÉ — futur outil de navigation sécurisée dark web pour professionnels cybersec (Suite Carignan premium, Phase 3+). Ne pas utiliser pour une division.

### Nouveaux noms produits cyber (Suite Carignan)
| Nom public nouveau | Nom interne ancien | Fonction |
|---|---|---|
| Saurel | Argos | Dark web monitoring SaaS |
| Chambly | Cerbère | IAM / Gestion des identités |
| Contrecoeur | Dolos | Simulation phishing |
| Berthier | Aegis | Analyseur légitimité courriels |
| Sorel | Bellérophon | Remédiation / réponse incidents |

### Liste des 18 tâches du chantier (ordre logique)
1. ✅ Enregistrer etoileboreale.ca + borealstar.ca sur Namecheap
2. ✅ Configurer DNS Namecheap (A record, CNAME www) — etoileboreale.ca + borealstar.ca
3. ✅ Ajouter nouveaux domaines dans Vercel + SSL + redirects 301 anciens domaines
4. ✅ Zoho Mail — migrer vers @etoileboreale.ca (aliases tous comptes + CONTACT_TO Vercel)
5. ❌ Créer nouveau logo principal Groupe Étoile Boréale (SVG) ← PROCHAIN
6. ❌ Créer nouveau mark maison mère pour le header (remplace mark-supernova.svg)
7. ❌ Créer nouvelle og-image.jpg avec nouveau branding
8. ❌ Mettre à jour messages/fr.json — nouveau branding complet
9. ❌ Mettre à jour messages/en.json + es.json
10. ❌ Mettre à jour Header.tsx + Footer.tsx
11. ❌ Mettre à jour app/[locale]/layout.tsx (metadata + OG + JSON-LD)
12. ❌ Mettre à jour Homepage (hero, équipe, histoire — intégrer lore Étoile Boréale)
13. ❌ Mettre à jour pages /divisions, /divisions/web (Draveur), /divisions/cyber (Carillon)
14. ❌ Mettre à jour /portfolio, /tarification, /confidentialite, /contacts
15. ❌ Refaire SEO complet (metadata, mots-clés, JSON-LD toutes pages)
16. ❌ Mettre à jour CLAUDE.md + DEPLOIEMENT.md + ZOHO-MAIL.md
17. ❌ Sync WSL + git commit + push → déploiement Vercel nouveau branding
18. ❌ Soumettre nouveaux domaines à Google Search Console

### Décisions d'architecture — FINALISÉES ✅
- URLs des divisions : **conservées** `/divisions/web` et `/divisions/cyber` — intuitivité pour le user
- Noms affichés : Option A avec tiret long — **Division Draveur — Développement Web** / **Division Carillon — Cybersécurité**
- "Division" peut apparaître en petit label au-dessus du nom sur les cartes /divisions
- Astrolabe réservé pour produit futur (navigation dark web pro)

---

## 5. Identité visuelle — Palette de couleurs

Tokens Tailwind dans `app/globals.css` :

| Token | Hex | Usage |
|---|---|---|
| `h91-gravity` | `#000000` | Fond trou noir absolu |
| `h91-accretion` | `#FF7A1A` | Orange principal — Groupe Étoile Boréale |
| `h91-fusion` | `#FFD65C` | Or/jaune — Direction générale |
| `h91-ion` | `#00F0FF` | Cyan — Studio Nordik Legion |
| `h91-warp` | `#6A00FF` | Violet — Division Astrolabe (Web) |
| `h91-stellar` | `#F2F7FF` | Blanc stellaire — texte principal |
| `h91-relativistic` | `#1A8CFF` | Bleu (réservé, non utilisé en UI) |

---

## 6. Workflow de sync Cowork → WSL

```bash
# Script sync-horizonsite.sh dans WSL
SRC="/mnt/c/Users/Pc/OneDrive/Documents/Horizon 91/Web/HorizonSite"
DEST="$HOME/Horizon91/divisions/Web/HorizonSite"
rsync -av --exclude='.next' --exclude='node_modules' "$SRC/" "$DEST/"
# Après sync :
rm -rf .next && npm run dev
```

---

## 7. En attente — contenu équipe

- [ ] Photos d'équipe — portraits professionnels (Paulina)
- [ ] Bio Alexandra et Paulina
- [ ] Témoignage Jean-Sébastien (Citadelle JJ) — après livraison site
- [ ] Google Business Profile — fiche locale Sainte-Marie-de-Beauce

---

## 8. Commandes essentielles

```bash
# Dev local (WSL)
cd ~/Horizon91/divisions/Web/HorizonSite
npm run dev   # → http://localhost:3000

# Commit et push
git add -A
git commit -m "feat: description du changement"
git push
```

---

*Fin du document. Si tu lis ceci en début de nouvelle session : tâches 1-4 complétées ✅. Prochain focus : tâche 5 (logo SVG Groupe Étoile Boréale) → tâches 6-7 (marks + og-image) → tâches 8-16 (code + contenu). Deadline : 1er juin 2026. Bonne continuation. 🌟*
