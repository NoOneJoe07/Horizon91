# Contexte Session — Nordik Legion Studio

> Document de handoff entre sessions. À uploader en début de chaque conversation.
> **Dernière mise à jour : 4 mai 2026 — Création du fichier contexte initial, analyse du projet.**
> Auteur : Jonathan Patoine, Groupe Supernova.

---

## 0. Comment utiliser ce fichier

À l'ouverture d'une nouvelle session avec Claude :
1. Upload ce fichier dans le contexte
2. Décris la tâche du jour. L'agent saura où on est sans tout relire.

Compléter ce document à la fin de chaque session significative.

---

## 1. Qui est Jonathan (rappel court)

- Étudiant AEC Cybersécurité, Collège Cumberland Montréal — diplôme déc. 2026
- Fondateur **Groupe Supernova** (anciennement Horizon 91) — agence tech locale, Sainte-Marie-de-Beauce
  - Domaines : `groupesupernova.ca` ✅ + `supernovagroup.ca` ✅ (Namecheap, 2 ans, auto-renew)
  - Logo : trou noir absorbant une étoile → parfaitement aligné avec "Supernova"
- Environnement : **WSL 2 Ubuntu + VS Code + Docker Desktop**
- Style de collab : sensei mode, comprendre chaque étape, commits conventionnels en français

---

## 2. Le projet Nordik Legion Studio

### Contexte

- **Client / nature** : Premier projet web de Jonathan sous Horizon 91 (maintenant Groupe Supernova)
- **Rôle stratégique** : Pièce de portfolio vitrine — sert à démontrer les capacités de l'agence à des clients potentiels
- **Type de site** : Site vitrine pour un studio de production musicale
- **Statut** : Frontend fonctionnel, pas encore mis en ligne, nécessite polish avant démo portfolio

### Chemins

- **Workspace Cowork** : `C:\Users\Pc\OneDrive\Documents\Horizon 91\Studio\siteweb\`
- **Repo WSL** : `~/Horizon91/divisions/Web/nordik-legion-studio/` (à confirmer)
- **Repo GitHub** : `https://github.com/NoOneJoe07/Horizon91` sous `divisions/Web/nordik-legion-studio/` (à confirmer)

---

## 3. Architecture technique

### Stack

| Élément | Version / détail |
|---|---|
| Framework | Next.js 16.2.3 |
| React | 19 |
| TypeScript | strict |
| CSS | Tailwind v4 |
| Backend | **Aucun** — site vitrine pur frontend |
| Base de données | **Aucune** |
| Auth | **Aucune** |
| Paiement | **Aucun** |

### Pages existantes

| Route | Description |
|---|---|
| `/` | Accueil |
| `/studio` | Présentation du studio |
| `/projets` | Portfolio projets musicaux |
| `/contact` | Formulaire de contact |
| `/rejoindre` | Page recrutement / collaboration |

### Assets

- `LogoNordikLegion.svg` — logo officiel du studio ✅
- Autres assets visuels : à inventorier

### Architecture (convention à respecter)

- **Pas de `src/`** — tout à la racine (`app/`, `components/`, `lib/`, etc.)
- **Routing Next.js App Router**
- **i18n** : à valider (FR seulement ? FR/EN ?)

---

## 4. État au 4 mai 2026

### Ce qui existe

✅ Structure Next.js App Router complète  
✅ Pages : accueil, studio, projets, contact, rejoindre  
✅ Logo SVG intégré  
✅ Tailwind v4 configuré  

### Ce qui manque / à polir (backlog initial)

- [ ] **Audit complet du code** — lire tous les fichiers, évaluer la qualité
- [ ] **Annotations** — appliquer les standards d'annotation Groupe Supernova (commenter le *pourquoi*, pas le *quoi*)
- [ ] **SEO** — `generateMetadata()` sur toutes les pages (title template, description, OpenGraph)
- [ ] **Responsive mobile** — vérifier le menu hamburger, les breakpoints
- [ ] **Formulaire contact** — vérifier s'il est fonctionnel ou placeholder
- [ ] **Page projets** — données réelles ou placeholders ?
- [ ] **Performance** — audit Lighthouse
- [ ] **Favicon** — présent et correct ?
- [ ] **Footer** — liens légaux (confidentialité, conditions) présents ?
- [ ] **Domaine** — `nordiklegionstudio.ca` ou similaire (à sécuriser)
- [ ] **Déploiement** — Vercel / OVH Canada (à décider)

---

## 5. Standards Groupe Supernova à appliquer

Ces standards ont été établis sur le projet Citadelle Jiu-Jitsu et s'appliquent à **tous** les projets de l'agence :

### Annotations de code

```typescript
// =============================================================================
// NOM DU MODULE
// -----------------------------------------------------------------------------
// Pourquoi ce fichier existe, quel problème il résout.
// Décision d'architecture documentée ici (pas dans la doc externe).
// =============================================================================

// ---------------------------------------------------------------------------
// Section logique
// ---------------------------------------------------------------------------
// Pourquoi cette section fait ce qu'elle fait.
```

- Commenter le **pourquoi**, jamais le **quoi** (le quoi se lit dans le code)
- En-tête obligatoire sur chaque fichier

### SEO (Next.js App Router)

```typescript
// Dans chaque page :
export async function generateMetadata({ params }) {
  const { locale } = await params;
  return {
    title: locale === "fr" ? "Titre FR" : "Title EN",
    description: locale === "fr" ? "Description FR" : "Description EN",
  };
}

// Dans le layout racine :
export const metadata = {
  title: { template: "%s — Nordik Legion Studio", default: "Nordik Legion Studio" },
  openGraph: { ... }
}
```

### Pattern de commits

```
feat: ajouter page projets avec galerie
fix: corriger alignement hero mobile
refactor: extraire composant NavLink
```

---

## 6. Connexion avec Citadelle Jiu-Jitsu (projet frère)

Le projet Citadelle est le **template de référence** pour Groupe Supernova. Quand on implémente une fonctionnalité sur Nordik, regarder comment c'est fait côté Citadelle et reproduire le même pattern.

Fonctionnalités Citadelle réutilisables si besoin :
- `components/ContactForm.tsx` — formulaire avec honeypot anti-spam + Zod
- `lib/validation.ts` — schémas Zod réutilisables
- Pattern `generateMetadata()` bilingue
- Header/Footer structure

---

## 7. Prochaines étapes suggérées (session suivante)

1. **Audit complet** — lire tous les fichiers du projet et documenter l'état réel
2. **Plan de polish** — liste priorisée des améliorations avant démo portfolio
3. **SEO** — ajouter `generateMetadata()` sur toutes les pages
4. **Annotations** — mettre à jour selon les standards Groupe Supernova
5. **Domaine** — sécuriser `nordiklegionstudio.ca` sur Namecheap
6. **Déploiement** — décider de la plateforme et déployer

---

## 8. Rebranding Groupe Supernova (rappel)

**Ancien nom** : Horizon 91  
**Nouveau nom** : Groupe Supernova (FR) / Supernova Group (EN)  
**Domaines** : `groupesupernova.ca` + `supernovagroup.ca` (Namecheap, 2 ans)  
**À faire** : mettre à jour toutes les références "Horizon 91" dans le code des deux projets  

---

*Fin du document. Si tu lis ceci en début de nouvelle session : bonjour, on continue. 🎵*
