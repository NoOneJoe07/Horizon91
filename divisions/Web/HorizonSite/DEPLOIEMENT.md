# Guide de déploiement — Groupe Étoile Boréale Inc.
Dernière mise à jour : 2026-05-26

## Commande rsync OneDrive → WSL (à faire avant chaque push)

```bash
rsync -av --exclude='.next' --exclude='node_modules' \
  '/mnt/c/Users/Pc/OneDrive/Documents/Horizon 91/Web/HorizonSite/' \
  ~/Horizon91/divisions/Web/HorizonSite/
```

## Étape 1 — Pousser le code sur GitHub

Dans WSL, après chaque sync depuis OneDrive :
```bash
cd ~/Horizon91/divisions/Web/HorizonSite
git add -A
git commit -m "feat: [description du changement]"
git push origin main
```

Vercel déploie automatiquement à chaque `git push` sur `main`.

## Étape 2 — Configuration Vercel (déjà en place)

- Projet : **horizon91-2zpm** (Hobby plan)
- Framework Preset : **Next.js** ← NE PAS CHANGER
- Root Directory : **divisions/Web/HorizonSite** ← NE PAS CHANGER
- Node.js : 24.x
- Build auto sur push → main ✅

### Variables d'environnement Vercel ✅
```
ZOHO_USER   = contact@groupesupernova.ca   ← SMTP auth (ne pas changer sans migrer Zoho)
ZOHO_PASS   = [mot de passe Zoho]
CONTACT_TO  = jonathan.patoine@etoileboreale.ca
```

## Étape 3 — Domaines configurés (Namecheap + Vercel)

### etoileboreale.ca (FR — domaine principal) ✅
Dans Vercel → Settings → Domains :
- `etoileboreale.ca` ✅
- `www.etoileboreale.ca` → redirect 301 vers apex ✅

Dans Namecheap → DNS pour etoileboreale.ca :
```
Type    Host    Value                   TTL
A       @       76.76.21.21             Auto
CNAME   www     cname.vercel-dns.com    Auto
```
DNS Mail : MX zohocloud.ca + SPF + DKIM + DMARC ✅

### borealstar.ca (EN — domaine secondaire) ✅
Dans Vercel → Settings → Domains :
- `borealstar.ca` ✅
- `www.borealstar.ca` → redirect 301 ✅

Dans Namecheap → DNS pour borealstar.ca :
```
Type    Host    Value                   TTL
A       @       76.76.21.21             Auto
CNAME   www     cname.vercel-dns.com    Auto
```

### Anciens domaines — redirects 301 ✅
- groupesupernova.ca → 301 → etoileboreale.ca
- www.groupesupernova.ca → 301
- supernovagroup.ca → 301 → borealstar.ca
- www.supernovagroup.ca → 301

### Routing par domaine (next-intl — à activer)
Ajouter dans `i18n/routing.ts` une fois les domaines entièrement stables :
```ts
export const routing = defineRouting({
  locales: ["fr", "en", "es"],
  defaultLocale: "fr",
  domains: [
    { domain: "etoileboreale.ca", defaultLocale: "fr" },
    { domain: "borealstar.ca",    defaultLocale: "en" },
  ],
});
```

## Étape 4 — Vérifications post-déploiement

- [ ] https://etoileboreale.ca charge en FR
- [ ] https://borealstar.ca charge en EN
- [ ] https://groupesupernova.ca redirige vers etoileboreale.ca
- [ ] /fr/divisions/web fonctionne (Division Draveur)
- [ ] /fr/divisions/cyber fonctionne (Division Carillon + Saurel)
- [ ] /fr/tarification fonctionne
- [ ] Sélecteur de langue opérationnel
- [ ] Sitemap : https://etoileboreale.ca/sitemap.xml
- [ ] Robots.txt : https://etoileboreale.ca/robots.txt
- [ ] Formulaire de contact envoie courriel à jonathan.patoine@etoileboreale.ca
- [ ] JSON-LD valide sur Google Rich Results Test

## Rollback

En cas de problème : Vercel → Deployments → choisir le déploiement précédent → **Promote to Production**

---

## À faire après déploiement

1. Soumettre sitemap dans Google Search Console (etoileboreale.ca + borealstar.ca)
2. Mettre à jour/créer fiche Google Business Profile — "Groupe Étoile Boréale Inc."
3. Créer comptes sociaux : YouTube, Instagram, Facebook, TikTok, LinkedIn, Pinterest — @etoileboreale
4. Vérifier DMARC pour etoileboreale.ca (24-48h propagation)
5. Nouvelle og-image.jpg avec branding Étoile Boréale
