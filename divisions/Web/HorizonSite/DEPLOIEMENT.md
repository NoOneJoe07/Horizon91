# Guide de déploiement — Groupe Supernova
Dernière mise à jour : 2026-05-06

## Étape 1 — Pousser le code sur GitHub

Dans WSL, après chaque sync depuis OneDrive :
```bash
cd ~/Horizon91/divisions/Web/HorizonSite
git add -A
git commit -m "feat: [description du changement]"
git push origin main
```

## Étape 2 — Créer le projet sur Vercel

1. Aller sur https://vercel.com et se connecter avec GitHub
2. Cliquer **Add New → Project**
3. Sélectionner le repo **HorizonSite**
4. Framework preset : **Next.js** (détecté automatiquement)
5. Root directory : laisser à la racine
6. Cliquer **Deploy**

Vercel déploie automatiquement à chaque `git push` sur `main`.

## Étape 3 — Configurer les domaines

### groupesupernova.ca (FR — domaine principal)

Dans Vercel → Settings → Domains → Add :
- Ajouter `groupesupernova.ca`
- Ajouter `www.groupesupernova.ca` (redirect vers apex)

Dans Namecheap → DNS pour groupesupernova.ca :
```
Type    Host    Value                   TTL
A       @       76.76.21.21             Auto
CNAME   www     cname.vercel-dns.com    Auto
```

### supernovagroup.ca (EN — domaine secondaire)

Dans Vercel → Settings → Domains → Add :
- Ajouter `supernovagroup.ca`

Dans Namecheap → DNS pour supernovagroup.ca :
```
Type    Host    Value                   TTL
A       @       76.76.21.21             Auto
CNAME   www     cname.vercel-dns.com    Auto
```

### Routing par domaine (next-intl)

Ajouter dans i18n/routing.ts une fois les domaines actifs :
```ts
export const routing = defineRouting({
  locales: ["fr", "en", "es"],
  defaultLocale: "fr",
  domains: [
    { domain: "groupesupernova.ca", defaultLocale: "fr" },
    { domain: "supernovagroup.ca", defaultLocale: "en" },
  ],
});
```

## Étape 4 — Variables d'environnement

Dans Vercel → Settings → Environment Variables :
```
NEXT_PUBLIC_SITE_URL=https://groupesupernova.ca
```
(Ajouter d'autres variables ici quand Stripe/Supabase seront intégrés)

## Étape 5 — Vérifications post-déploiement

- [ ] https://groupesupernova.ca charge en FR
- [ ] https://supernovagroup.ca charge en EN
- [ ] /fr/divisions/web fonctionne
- [ ] /fr/divisions/cyber fonctionne
- [ ] /fr/actualites fonctionne
- [ ] Sélecteur de langue opérationnel
- [ ] Sitemap accessible : https://groupesupernova.ca/sitemap.xml
- [ ] Robots.txt : https://groupesupernova.ca/robots.txt
- [ ] Formulaire de contact envoie vers contact@groupesupernova.ca

## Rollback

En cas de problème : Vercel → Deployments → choisir le déploiement précédent → Promote to Production

---

## À faire après déploiement

1. Soumettre sitemap dans Google Search Console
2. Créer fiche Google Business Profile
3. Créer comptes sociaux : YouTube, Instagram, Facebook, TikTok, LinkedIn, Pinterest
4. Réserver handles @groupesupernova sur toutes les plateformes
