# Contexte Session — HorizonSite (Groupe Étoile Boréale)

> Document de handoff entre sessions. À uploader en début de chaque nouvelle conversation.
> **Dernière mise à jour : 26 juin 2026 — Site en production, rebrand complet ✅**
> Auteur : Jonathan Patoine, Horizon 91.

---

## 0. Comment utiliser ce fichier

À l'ouverture d'une nouvelle session :
1. Upload `horizon91_master.md` (contexte global écosystème)
2. Upload ce fichier (contexte local HorizonSite)
3. Décris la tâche du jour.

Pour le détail complet du projet (stack, structure, branding, tarification, équipe), voir `CLAUDE.md` à la racine du projet — ce fichier-ci ne couvre que l'état courant et le journal des dernières sessions.

---

## 1. État actuel — 26 juin 2026

- Rebrand Groupe Étoile Boréale : **complet** (domaines, branding, SEO, animations — voir CLAUDE.md)
- Domaines en production : etoileboreale.ca (FR), borealstar.ca (EN), groupesupernova.ca + supernovagroup.ca (301 redirects)
- ⚠️ SEO : soumission Google Search Console à refaire — plusieurs pages étaient revenues "non indexables" parce que soumises avant que le site soit stable en prod (même symptôme rencontré sur Citadelle Jiu-Jitsu). Tâche ouverte : resoumettre sitemap + redemander l'indexation maintenant que le site est figé.

---

## 2. Journal des dernières sessions

### 2026-06-26
- Discussion fond hero : combiner le champ d'étoiles déjà en place (StarField.tsx) avec une grille numérique en perspective — outils d'extraction/recréation à déterminer à la prochaine session
- Brainstorm **Le Crieur** — futur portail éditorial multi-verticales (Techno/cybersec, Habitation & Finances, Sport & Performance, Artisanat & Culture) pour alimenter le flywheel publicitaire et tagger les sites des clients. Direction retenue : domaine et projet séparés d'etoileboreale.ca (même logique que Nordik Legion Studio). Détails complets dans `horizon91_master.md` section 12.
- Point de discussion ouvert : renommer "Fort Saurel" → "Saurel Sentinelle" (collision possible avec le palier tarifaire "Sentinelle" à 75$/mois) — à trancher avec Alexandra (DG Comms) et Paulina (DG Marketing). Voir master, section 11 (log des décisions).
- Leçon SEO indexation consignée au master (section 11) — aucun fichier de code modifié cette session.

---

## 3. Prochaines étapes (liste complète dans CLAUDE.md)

- [ ] Resoumettre l'indexation Google Search Console (site maintenant stable)
- [ ] og-image.jpg avec branding Étoile Boréale
- [ ] Photos d'équipe (Jonathan, Alexandra, Paulina) + bios Alexandra/Paulina
- [ ] Décision finale : Fort Saurel vs Fort Richelieu vs Saurel Sentinelle
- [ ] Le Crieur : trancher le nom final, réserver le domaine, choisir la pile technique (MDX vs CMS léger)
- [ ] Suite Carignan — lore historique (Sorel, Contrecoeur, Berthier, Chambly)
- [ ] Articles Loi 25 sur /actualites
- [ ] Fond hero — finaliser l'approche étoiles + grille numérique

---

## 4. Commandes essentielles

```bash
# Sync Cowork (OneDrive) → WSL
SRC="/mnt/c/Users/Pc/OneDrive/Documents/Horizon 91/Web/HorizonSite"
DEST="$HOME/Horizon91/divisions/Web/HorizonSite"
rsync -av --exclude='.next' --exclude='node_modules' "$SRC/" "$DEST/"
rm -rf .next && npm run dev

# Commit et push
git add -A
git commit -m "feat: description du changement"
git push
```

---

*Fin du document. Voir CLAUDE.md pour le contexte complet du projet.*
