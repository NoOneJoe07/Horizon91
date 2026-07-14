#!/usr/bin/env bash
set -euo pipefail

# Scaffold Le Crieur — genere par CrierClaude, a executer dans WSL.
# Cree le projet dans ~/dev/le-crieur (ajuste TARGET_DIR si tu veux un autre chemin).
TARGET_DIR="${1:-$HOME/dev/le-crieur}"
mkdir -p "$TARGET_DIR"
cd "$TARGET_DIR"

# root file
cat > '.env.example' <<'LECRIEUR_FILE_EOF_0'
# Base de données Postgres DÉDIÉE à Le Crieur — instance séparée de Draveur
# (décision d'isolation confirmée 2026-07-10, cf. contexte_session_CrierClaude.md)
DATABASE_URI=postgres://user:password@localhost:5432/le_crieur

# Secret Payload — générer une chaîne aléatoire longue, jamais commit la vraie valeur
PAYLOAD_SECRET=change-me-generate-a-long-random-string

# URL publique du site (utilisée pour sitemap.xml, schema.org, canonical URLs)
NEXT_PUBLIC_SITE_URL=https://lecrieur.com

# Service courriel transactionnel pour l'infolettre — isolé du Google Workspace GEB
# (Resend ou Postmark, voir section 3 du brief)
RESEND_API_KEY=
NEWSLETTER_FROM_EMAIL=infolettre@lecrieur.com
LECRIEUR_FILE_EOF_0

# root file
cat > '.gitignore' <<'LECRIEUR_FILE_EOF_1'
# dependencies
node_modules/

# next.js
.next/
out/
build/

# payload
payload-types.ts

# env
.env
.env*.local

# logs
*.log
npm-debug.log*

# os
.DS_Store
Thumbs.db

# editor
.vscode/
.idea/

# misc
.turbo/
*.tsbuildinfo
LECRIEUR_FILE_EOF_1

# root file
cat > 'README.md' <<'LECRIEUR_FILE_EOF_2'
# Le Crieur

Portail de contenu B2B de Groupe Étoile Boréale Inc. — moteur du flywheel
publicitaire du groupe (voir `Brief_Fondations_CrierClaude.md` à la racine de
ce dossier pour le contexte complet, et `PlanAffaires_EtoileBoreale_2026_FR.docx`
pour le modèle de revenus en 3 phases).

## ⚠️ État du scaffold — à lire avant de commencer

Ce squelette a été écrit à la main dans un environnement sandbox **sans accès
réseau** (npm registry et GitHub bloqués). Concrètement :

- `npm install` n'a **jamais été exécuté** ni vérifié ici.
- `npm run build` / `npm run dev` n'ont **jamais tourné** — aucune garantie
  que le projet compile du premier coup.
- `payload-types.ts` (types générés par Payload) et `importMap.js` (admin)
  sont soit absents soit des placeholders — ils doivent être régénérés
  localement (étapes ci-dessous).

Le code suit fidèlement les patterns officiels de Payload CMS v3 + Next.js App
Router (adaptateur Postgres, éditeur Lexical, route groups `(payload)` /
`(frontend)`), mais une passe de vérification locale est nécessaire. Si
`npm run build` échoue, copie-moi l'erreur et je corrige.

## Démarrage local

```bash
npm install
cp .env.example .env   # puis remplir DATABASE_URI, PAYLOAD_SECRET, etc.
npm run generate:importmap
npm run generate:types
npm run dev
```

Admin Payload : `http://localhost:3000/admin` (créer le premier compte
Editor — ce sera Jonathan).

## Décisions d'architecture (session du 2026-07-10)

| Décision | Choix |
|---|---|
| Repo | Indépendant (pas de monorepo avec Draveur) — Le Crieur opère en branche parallèle, publié par GEB mais hors des 3 piliers de service |
| Base de données | PostgreSQL **dédiée**, instance séparée de Draveur |
| Hébergement frontend | Vercel |
| Domaines | `lecrieur.com` + `towncrier.com` (réservation défensive) — achat par Jonathan sur Namecheap |
| CMS | Payload CMS v3, éditeur Lexical |

## Structure

```
src/
  payload.config.ts          # config Payload — adaptateur Postgres, collections
  collections/
    Users.ts                 # rôles editor (Jonathan) / author (Paulina, Alexandra)
    Media.ts
    Categories.ts             # taxonomie — cybersecurite, developpement-web,
                               # image-de-marque, communication, nordik-geek,
                               # portraits-clients, jiu-jitsu, litterature
    Articles.ts               # contenu éditorial standard + allowThirdPartyAds
    PortraitsClients.ts       # type distinct — priorité éditoriale #1
  app/
    (payload)/                # admin Payload + routes API REST/GraphQL
    (frontend)/                # site public
      page.tsx                # accueil : hero + filtres + feed + "Nos partenaires"
      [categorie]/page.tsx
      [categorie]/[slug]/page.tsx   # article + AdSlot + schema.org JSON-LD
      portraits-clients/
      components/
        AdSlot.tsx             # ⚠️ cœur de la logique pub conditionnelle (voir ci-dessous)
    sitemap.ts / robots.ts
    api/newsletter/route.ts    # stub — à brancher sur Resend/Postmark
```

## Logique publicitaire conditionnelle (à ne jamais casser)

Deux filières strictement séparées par catégorie, jamais un interrupteur
global au site (`src/app/(frontend)/components/AdSlot.tsx`) :

1. `allowThirdPartyAds = false` (défaut, catégories B2B) → pub premium vendue
   directement à un client GEB. Zéro AdSense/Meta.
2. `allowThirdPartyAds = true` (catégories personnelles : nordik-geek,
   jiu-jitsu, littérature, dès 10 000 visites/mois) → AdSense / YouTube
   Partner / Meta Ads autorisés.

Le champ vit sur chaque document (`Articles`, `PortraitsClients`), jamais
codé en dur sur un nom de catégorie.

## Pas encore fait

- Isolation infra courriel (Resend/Postmark) — la route `/api/newsletter` est
  un stub, `console.log` seulement.
- Design final / Brand Book Le Crieur — palette actuelle dans
  `tailwind.config.ts` est un placeholder.
- Déploiement Vercel + provisioning Postgres (OVH Canada ou autre) — à faire
  une fois le domaine sécurisé.
- Tests, CI GitHub Actions.
LECRIEUR_FILE_EOF_2

# root file
cat > 'next.config.mjs' <<'LECRIEUR_FILE_EOF_3'
import { withPayload } from '@payloadcms/next/withPayload'

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lecrieur.com',
      },
    ],
  },
}

export default withPayload(nextConfig, { devBundleServerPackages: false })
LECRIEUR_FILE_EOF_3

# root file
cat > 'package.json' <<'LECRIEUR_FILE_EOF_4'
{
  "name": "le-crieur",
  "version": "0.1.0",
  "private": true,
  "description": "Le Crieur — portail de contenu B2B de Groupe Étoile Boréale Inc. (lecrieur.com). Moteur du flywheel publicitaire du groupe.",
  "license": "UNLICENSED",
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "payload": "payload",
    "generate:types": "payload generate:types",
    "generate:importmap": "payload generate:importmap"
  },
  "dependencies": {
    "@payloadcms/db-postgres": "^3.37.0",
    "@payloadcms/next": "^3.37.0",
    "@payloadcms/richtext-lexical": "^3.37.0",
    "graphql": "^16.9.0",
    "next": "^15.3.0",
    "payload": "^3.37.0",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "sharp": "^0.33.5"
  },
  "devDependencies": {
    "@types/node": "^22.10.0",
    "@types/react": "^19.0.0",
    "@types/react-dom": "^19.0.0",
    "autoprefixer": "^10.4.20",
    "postcss": "^8.4.49",
    "tailwindcss": "^3.4.15",
    "typescript": "^5.7.2"
  },
  "engines": {
    "node": ">=20.9.0"
  }
}
LECRIEUR_FILE_EOF_4

# root file
cat > 'postcss.config.mjs' <<'LECRIEUR_FILE_EOF_5'
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
LECRIEUR_FILE_EOF_5

mkdir -p "src/app/(frontend)/[categorie]/[slug]"
cat > 'src/app/(frontend)/[categorie]/[slug]/page.tsx' <<'LECRIEUR_FILE_EOF_6'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Image from 'next/image'
import { RichText } from '@payloadcms/richtext-lexical/react'
import { getPayloadClient } from '@/lib/payload'
import { Byline } from '../../components/Byline'
import { AdSlot } from '../../components/AdSlot'

export const revalidate = 300

type Props = { params: Promise<{ categorie: string; slug: string }> }

async function getArticle(categorie: string, slug: string) {
  const payload = await getPayloadClient()
  const result = await payload.find({
    collection: 'articles',
    where: { and: [{ slug: { equals: slug } }, { 'category.slug': { equals: categorie } }] },
    limit: 1,
    depth: 2,
  })
  return result.docs[0] ?? null
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { categorie, slug } = await params
  const article = await getArticle(categorie, slug)
  if (!article) return {}
  return {
    title: article.title,
    description: article.excerpt,
  }
}

// Logique conceptuelle reprise telle quelle du brief (section 9) : le rendu
// publicitaire est conditionnel PAR CHAMP (article.allowThirdPartyAds),
// jamais un switch global au site.
export default async function ArticlePage({ params }: Props) {
  const { categorie, slug } = await params
  const article = await getArticle(categorie, slug)
  if (!article) notFound()

  const category = typeof article.category === 'object' ? article.category : null
  const author = typeof article.author === 'object' ? article.author : null
  const heroImage = typeof article.heroImage === 'object' ? article.heroImage : null
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://lecrieur.com'

  // Balisage structuré schema.org Article (brief section 11).
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.excerpt,
    image: heroImage?.url ? [heroImage.url] : undefined,
    datePublished: article.publishedAt,
    author: author?.name ? { '@type': 'Person', name: author.name } : undefined,
    publisher: {
      '@type': 'Organization',
      name: 'Groupe Étoile Boréale Inc.',
      url: 'https://etoileboreale.ca',
    },
    mainEntityOfPage: `${siteUrl}/${categorie}/${slug}`,
  }

  return (
    <article className="mx-auto max-w-3xl">
      {/* eslint-disable-next-line react/no-danger */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <header className="mb-6">
        {category && (
          <span className="text-xs font-semibold uppercase tracking-wide text-crieur-accent">{category.label}</span>
        )}
        <h1 className="mt-2 text-3xl font-bold leading-tight">{article.title}</h1>
        <div className="mt-4">
          <Byline
            name={author?.name ?? 'Le Crieur'}
            avatarUrl={typeof author?.avatar === 'object' ? author?.avatar?.url : null}
            publishedAt={article.publishedAt}
          />
        </div>
      </header>

      {heroImage?.url && (
        <div className="relative mb-6 aspect-[16/9] w-full overflow-hidden rounded-lg">
          <Image src={heroImage.url} alt={article.title} fill className="object-cover" priority />
        </div>
      )}

      <div className="prose prose-invert max-w-none">
        <RichText data={article.content} />
      </div>

      <AdSlot allowThirdPartyAds={Boolean(article.allowThirdPartyAds)} slot="in-article" />

      {article.relatedClientLink && (
        <p className="mt-8 text-sm">
          En savoir plus:{' '}
          <a href={article.relatedClientLink} className="text-crieur-accent underline">
            {article.relatedClientLink}
          </a>
        </p>
      )}
    </article>
  )
}
LECRIEUR_FILE_EOF_6

mkdir -p "src/app/(frontend)/[categorie]"
cat > 'src/app/(frontend)/[categorie]/page.tsx' <<'LECRIEUR_FILE_EOF_7'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { getPayloadClient } from '@/lib/payload'
import { mapArticleToFeedItem } from '@/lib/mapFeedItem'
import { CategoryFilter } from '../components/CategoryFilter'
import { ArticleCard } from '../components/ArticleCard'

export const revalidate = 300

type Props = { params: Promise<{ categorie: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { categorie } = await params
  return { title: categorie }
}

export default async function CategoryPage({ params }: Props) {
  const { categorie } = await params
  const payload = await getPayloadClient()

  const [categories, category, articles] = await Promise.all([
    payload.find({ collection: 'categories', limit: 50, sort: 'label' }),
    payload.find({ collection: 'categories', where: { slug: { equals: categorie } }, limit: 1 }),
    payload.find({
      collection: 'articles',
      where: { 'category.slug': { equals: categorie } },
      sort: '-publishedAt',
      limit: 24,
      depth: 2,
    }),
  ])

  if (category.docs.length === 0) notFound()

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-bold">{category.docs[0].label}</h1>
      <CategoryFilter categories={categories.docs.map((c) => ({ label: c.label, slug: c.slug }))} active={categorie} />
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {articles.docs.map((a) => (
          <ArticleCard key={a.id} item={mapArticleToFeedItem(a)} />
        ))}
      </div>
    </div>
  )
}
LECRIEUR_FILE_EOF_7

mkdir -p "src/app/(frontend)/components"
cat > 'src/app/(frontend)/components/AdSlot.tsx' <<'LECRIEUR_FILE_EOF_8'
type AdSlotProps = {
  /** Vient TOUJOURS du champ Payload `allowThirdPartyAds` de l'article ou du
   * portrait client rendu — jamais d'un `if` codé en dur sur un nom de
   * catégorie, et jamais d'un interrupteur global au site (brief section 9). */
  allowThirdPartyAds: boolean
  slot?: string
}

/**
 * Rendu publicitaire conditionnel AU NIVEAU DU COMPOSANT.
 *
 * Deux filières strictement séparées par catégorie :
 * 1. allowThirdPartyAds = false (défaut, catégories B2B : cybersecurite,
 *    developpement-web, image-de-marque, communication, portraits-clients)
 *    → pub premium vendue directement à un client GEB. Zéro AdSense/Meta ici.
 * 2. allowThirdPartyAds = true (catégories personnelles à faible enjeu de
 *    conversion : nordik-geek, jiu-jitsu, littérature, dès 10 000 visites/mois)
 *    → AdSense / YouTube Partner / Meta Ads autorisés.
 *
 * Une pub tierce qui se glisse par erreur dans le feed principal ou une page
 * portrait client est un échec de spec, pas un détail — voir brief section 9.
 */
export function AdSlot({ allowThirdPartyAds, slot = 'in-article' }: AdSlotProps) {
  return allowThirdPartyAds ? (
    <AdSenseBanner slot={slot} />
  ) : (
    <CustomClientBiddingBanner zone="premium-sidebar" />
  )
}

function AdSenseBanner({ slot }: { slot: string }) {
  // TODO (an 3 du plan d'affaires) : brancher le script AdSense réel une fois
  // le seuil de 10 000 visites/mois atteint sur les catégories personnelles.
  return (
    <div
      data-ad-slot={slot}
      className="my-6 rounded border border-dashed border-crieur-accent/40 p-4 text-center text-sm text-crieur-ink/60"
    >
      Emplacement AdSense — {slot}
    </div>
  )
}

function CustomClientBiddingBanner({ zone }: { zone: string }) {
  // Pub premium vendue directement à un client GEB (placement/enchère
  // interne). Aucune pub tierce ne doit jamais apparaître dans cette filière.
  return (
    <div
      data-ad-zone={zone}
      className="my-6 rounded border border-crieur-accent bg-crieur-accent/10 p-4 text-center text-sm"
    >
      Espace partenaire premium — {zone}
    </div>
  )
}
LECRIEUR_FILE_EOF_8

mkdir -p "src/app/(frontend)/components"
cat > 'src/app/(frontend)/components/ArticleCard.tsx' <<'LECRIEUR_FILE_EOF_9'
import Image from 'next/image'
import Link from 'next/link'
import { Byline } from './Byline'

export type FeedItem = {
  id: string
  title: string
  href: string
  excerpt?: string | null
  heroImageUrl?: string | null
  categoryLabel?: string | null
  authorName: string
  authorAvatarUrl?: string | null
  publishedAt?: string | null
}

export function ArticleCard({ item }: { item: FeedItem }) {
  return (
    <Link
      href={item.href}
      className="group flex flex-col overflow-hidden rounded-lg border border-crieur-ink/10 transition hover:border-crieur-accent/60"
    >
      {item.heroImageUrl && (
        <div className="relative aspect-[16/10] w-full overflow-hidden">
          <Image
            src={item.heroImageUrl}
            alt={item.title}
            fill
            className="object-cover transition duration-300 group-hover:scale-105"
          />
        </div>
      )}
      <div className="flex flex-1 flex-col gap-2 p-4">
        {item.categoryLabel && (
          <span className="text-xs font-semibold uppercase tracking-wide text-crieur-accent">
            {item.categoryLabel}
          </span>
        )}
        <h3 className="font-semibold leading-snug">{item.title}</h3>
        {item.excerpt && <p className="line-clamp-2 text-sm text-crieur-ink/70">{item.excerpt}</p>}
        <div className="mt-auto pt-2">
          <Byline name={item.authorName} avatarUrl={item.authorAvatarUrl} publishedAt={item.publishedAt} />
        </div>
      </div>
    </Link>
  )
}
LECRIEUR_FILE_EOF_9

mkdir -p "src/app/(frontend)/components"
cat > 'src/app/(frontend)/components/Byline.tsx' <<'LECRIEUR_FILE_EOF_10'
import Image from 'next/image'

type BylineProps = {
  name: string
  avatarUrl?: string | null
  publishedAt?: string | null
}

// Bylines avec nom/photo par auteur — construit la crédibilité individuelle
// en plus de celle de GEB (brief section 7).
export function Byline({ name, avatarUrl, publishedAt }: BylineProps) {
  return (
    <div className="flex items-center gap-2 text-xs text-crieur-ink/60">
      {avatarUrl ? (
        <Image src={avatarUrl} alt={name} width={24} height={24} className="rounded-full" />
      ) : (
        <div className="h-6 w-6 rounded-full bg-crieur-ink/20" />
      )}
      <span>{name}</span>
      {publishedAt && (
        <>
          <span aria-hidden>·</span>
          <time dateTime={publishedAt}>
            {new Date(publishedAt).toLocaleDateString('fr-CA', { year: 'numeric', month: 'long', day: 'numeric' })}
          </time>
        </>
      )}
    </div>
  )
}
LECRIEUR_FILE_EOF_10

mkdir -p "src/app/(frontend)/components"
cat > 'src/app/(frontend)/components/CategoryFilter.tsx' <<'LECRIEUR_FILE_EOF_11'
import Link from 'next/link'

type Category = { label: string; slug: string }

// Filtres par catégorie sous le hero (brief section 7).
export function CategoryFilter({ categories, active }: { categories: Category[]; active?: string }) {
  return (
    <div className="flex flex-wrap gap-2">
      <Link
        href="/"
        className={`rounded-full border px-3 py-1 text-sm ${
          !active ? 'border-crieur-accent bg-crieur-accent/10' : 'border-crieur-ink/20'
        }`}
      >
        Tout
      </Link>
      {categories.map((cat) => (
        <Link
          key={cat.slug}
          href={`/${cat.slug}`}
          className={`rounded-full border px-3 py-1 text-sm ${
            active === cat.slug ? 'border-crieur-accent bg-crieur-accent/10' : 'border-crieur-ink/20'
          }`}
        >
          {cat.label}
        </Link>
      ))}
    </div>
  )
}
LECRIEUR_FILE_EOF_11

mkdir -p "src/app/(frontend)/components"
cat > 'src/app/(frontend)/components/Footer.tsx' <<'LECRIEUR_FILE_EOF_12'
import { NewsletterForm } from './NewsletterForm'

export function Footer() {
  return (
    <footer className="mt-16 border-t border-crieur-ink/10">
      <div className="mx-auto max-w-6xl px-6 py-10">
        <NewsletterForm />
        <p className="mt-8 text-xs text-crieur-ink/50">
          Le Crieur — une publication de Groupe Étoile Boréale Inc. · Sainte-Marie-de-Beauce, Québec
        </p>
      </div>
    </footer>
  )
}
LECRIEUR_FILE_EOF_12

mkdir -p "src/app/(frontend)/components"
cat > 'src/app/(frontend)/components/Header.tsx' <<'LECRIEUR_FILE_EOF_13'
import Link from 'next/link'

// Filtres par catégorie sous le hero + nav principale (brief section 7).
const NAV_CATEGORIES = [
  { label: 'Cybersécurité', slug: 'cybersecurite' },
  { label: 'Développement web', slug: 'developpement-web' },
  { label: 'Image de marque', slug: 'image-de-marque' },
  { label: 'Communication', slug: 'communication' },
  { label: 'Portraits clients', slug: 'portraits-clients' },
  { label: 'Nordik Geek', slug: 'nordik-geek' },
]

export function Header() {
  return (
    <header className="border-b border-crieur-ink/10">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-6 py-4">
        <Link href="/" className="text-xl font-bold tracking-tight text-crieur-accent">
          Le Crieur
        </Link>
        <nav className="flex flex-wrap gap-4 text-sm">
          {NAV_CATEGORIES.map((cat) => (
            <Link key={cat.slug} href={`/${cat.slug}`} className="hover:text-crieur-accent">
              {cat.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  )
}
LECRIEUR_FILE_EOF_13

mkdir -p "src/app/(frontend)/components"
cat > 'src/app/(frontend)/components/Hero.tsx' <<'LECRIEUR_FILE_EOF_14'
import Image from 'next/image'
import Link from 'next/link'
import { Byline } from './Byline'
import type { FeedItem } from './ArticleCard'

// Zone "à la une" — réservée en priorité aux portraits clients et au contenu
// cybersécurité/dev web/image de marque/communication. Ne JAMAIS laisser le
// contenu personnel dominer la première impression (brief section 7).
// Le filtrage (isPersonal === false) doit être appliqué en amont, côté
// requête Payload — voir app/(frontend)/page.tsx.
export function Hero({ item }: { item: FeedItem }) {
  return (
    <Link href={item.href} className="group relative block overflow-hidden rounded-xl">
      {item.heroImageUrl && (
        <div className="relative aspect-[21/9] w-full">
          <Image
            src={item.heroImageUrl}
            alt={item.title}
            fill
            priority
            className="object-cover transition duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-crieur-bg via-crieur-bg/20 to-transparent" />
        </div>
      )}
      <div className="absolute inset-x-0 bottom-0 p-6">
        {item.categoryLabel && (
          <span className="text-xs font-semibold uppercase tracking-wide text-crieur-accent">
            {item.categoryLabel}
          </span>
        )}
        <h1 className="mt-2 max-w-3xl text-2xl font-bold leading-tight md:text-4xl">{item.title}</h1>
        {item.excerpt && <p className="mt-2 max-w-2xl text-crieur-ink/80">{item.excerpt}</p>}
        <div className="mt-4">
          <Byline name={item.authorName} avatarUrl={item.authorAvatarUrl} publishedAt={item.publishedAt} />
        </div>
      </div>
    </Link>
  )
}
LECRIEUR_FILE_EOF_14

mkdir -p "src/app/(frontend)/components"
cat > 'src/app/(frontend)/components/NewsletterForm.tsx' <<'LECRIEUR_FILE_EOF_15'
'use client'

import { useState } from 'react'

// Capture de courriel dès le lancement, pas en phase 2 (brief section 10).
// L'actif réel d'un réseau média est l'audience possédée. Poste vers
// /api/newsletter (à brancher sur Resend/Postmark — jamais le Google
// Workspace principal de GEB, voir section 3 du brief).
export function NewsletterForm() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'done' | 'error'>('idle')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('loading')
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      setStatus(res.ok ? 'done' : 'error')
    } catch {
      setStatus('error')
    }
  }

  if (status === 'done') {
    return <p className="text-sm text-crieur-accent">Merci — vous êtes inscrit à l&apos;infolettre.</p>
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-wrap gap-2">
      <input
        type="email"
        required
        placeholder="Votre courriel"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="min-w-[240px] flex-1 rounded border border-crieur-ink/20 bg-transparent px-3 py-2 text-sm"
      />
      <button
        type="submit"
        disabled={status === 'loading'}
        className="rounded bg-crieur-accent px-4 py-2 text-sm font-medium text-crieur-bg"
      >
        {status === 'loading' ? 'Envoi...' : "S'abonner à l'infolettre"}
      </button>
      {status === 'error' && <p className="w-full text-xs text-red-400">Erreur — réessayez plus tard.</p>}
    </form>
  )
}
LECRIEUR_FILE_EOF_15

mkdir -p "src/app/(frontend)/components"
cat > 'src/app/(frontend)/components/PartnersBlock.tsx' <<'LECRIEUR_FILE_EOF_16'
import Link from 'next/link'
import Image from 'next/image'

type Partner = {
  id: string
  clientName: string
  href: string
  heroImageUrl?: string | null
  gebService: string
}

const SERVICE_LABEL: Record<string, string> = {
  draveur: 'Développement web',
  carillon: 'Cybersécurité',
  arpenteur: 'Image de marque',
}

// Bloc dédié "Nos partenaires" — visibilité supplémentaire aux portraits
// clients au-delà du feed chronologique (brief section 7).
export function PartnersBlock({ partners }: { partners: Partner[] }) {
  if (partners.length === 0) return null

  return (
    <section className="mt-12">
      <h2 className="mb-4 text-lg font-semibold">Nos partenaires</h2>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
        {partners.map((p) => (
          <Link
            key={p.id}
            href={p.href}
            className="group flex flex-col items-center gap-2 rounded-lg border border-crieur-ink/10 p-4 text-center transition hover:border-crieur-accent/60"
          >
            {p.heroImageUrl && (
              <div className="relative h-16 w-16 overflow-hidden rounded-full">
                <Image src={p.heroImageUrl} alt={p.clientName} fill className="object-cover" />
              </div>
            )}
            <span className="text-sm font-medium">{p.clientName}</span>
            <span className="text-xs text-crieur-ink/60">{SERVICE_LABEL[p.gebService] ?? p.gebService}</span>
          </Link>
        ))}
      </div>
    </section>
  )
}
LECRIEUR_FILE_EOF_16

mkdir -p "src/app/(frontend)"
cat > 'src/app/(frontend)/globals.css' <<'LECRIEUR_FILE_EOF_17'
@tailwind base;
@tailwind components;
@tailwind utilities;

body {
  @apply bg-crieur-bg text-crieur-ink;
}
LECRIEUR_FILE_EOF_17

mkdir -p "src/app/(frontend)"
cat > 'src/app/(frontend)/layout.tsx' <<'LECRIEUR_FILE_EOF_18'
import type { Metadata } from 'next'
import React from 'react'
import { Header } from './components/Header'
import { Footer } from './components/Footer'
import './globals.css'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://lecrieur.com'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Le Crieur — Contenu, médias & SEO pour PME régionales',
    template: '%s — Le Crieur',
  },
  description:
    "Le Crieur crie ce qui compte, au bon moment, au bon endroit. Une publication de Groupe Étoile Boréale sur la cybersécurité, le développement web, l'image de marque et la communication pour les PME régionales du Québec.",
}

export default function FrontendLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr-CA">
      <body>
        <Header />
        <main className="mx-auto max-w-6xl px-6 py-8">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
LECRIEUR_FILE_EOF_18

mkdir -p "src/app/(frontend)"
cat > 'src/app/(frontend)/page.tsx' <<'LECRIEUR_FILE_EOF_19'
import { getPayloadClient } from '@/lib/payload'
import { mapArticleToFeedItem, mapPortraitToFeedItem } from '@/lib/mapFeedItem'
import { Hero } from './components/Hero'
import { CategoryFilter } from './components/CategoryFilter'
import { ArticleCard } from './components/ArticleCard'
import { PartnersBlock } from './components/PartnersBlock'

export const revalidate = 300 // ISR — voir section 11 du brief (fondations SEO)

export default async function HomePage() {
  const payload = await getPayloadClient()

  const [categories, featuredResult, feedResult, partnersResult] = await Promise.all([
    payload.find({ collection: 'categories', limit: 50, sort: 'label' }),
    // Hero réservé aux portraits clients + contenu B2B — jamais le contenu
    // personnel (isPersonal) en première impression (brief section 7).
    payload.find({
      collection: 'articles',
      where: {
        and: [{ featured: { equals: true } }, { 'category.isPersonal': { not_equals: true } }],
      },
      limit: 1,
      sort: '-publishedAt',
      depth: 2,
    }),
    payload.find({
      collection: 'articles',
      where: { featured: { not_equals: true } },
      limit: 12,
      sort: '-publishedAt',
      depth: 2,
    }),
    payload.find({ collection: 'portraits-clients', limit: 8, sort: '-publishedAt', depth: 2 }),
  ])

  const featured = featuredResult.docs[0]
  const feedItems = feedResult.docs.map(mapArticleToFeedItem)
  const partners = partnersResult.docs.map((p) => ({
    id: String(p.id),
    clientName: p.clientName,
    href: `/portraits-clients/${p.slug}`,
    heroImageUrl:
      p.heroImage && typeof p.heroImage === 'object' ? (p.heroImage as { url?: string }).url ?? null : null,
    gebService: p.gebService,
  }))

  return (
    <div className="flex flex-col gap-8">
      {featured && <Hero item={mapArticleToFeedItem(featured)} />}

      <CategoryFilter categories={categories.docs.map((c) => ({ label: c.label, slug: c.slug }))} />

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {feedItems.map((item) => (
          <ArticleCard key={item.id} item={item} />
        ))}
      </div>

      <PartnersBlock partners={partners} />
    </div>
  )
}
LECRIEUR_FILE_EOF_19

mkdir -p "src/app/(frontend)/portraits-clients/[slug]"
cat > 'src/app/(frontend)/portraits-clients/[slug]/page.tsx' <<'LECRIEUR_FILE_EOF_20'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Image from 'next/image'
import { RichText } from '@payloadcms/richtext-lexical/react'
import { getPayloadClient } from '@/lib/payload'
import { Byline } from '../../components/Byline'
import { AdSlot } from '../../components/AdSlot'

export const revalidate = 300

type Props = { params: Promise<{ slug: string }> }

async function getPortrait(slug: string) {
  const payload = await getPayloadClient()
  const result = await payload.find({
    collection: 'portraits-clients',
    where: { slug: { equals: slug } },
    limit: 1,
    depth: 2,
  })
  return result.docs[0] ?? null
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const portrait = await getPortrait(slug)
  if (!portrait) return {}
  return { title: portrait.clientName, description: portrait.resultsSummary }
}

export default async function PortraitPage({ params }: Props) {
  const { slug } = await params
  const portrait = await getPortrait(slug)
  if (!portrait) notFound()

  const author = typeof portrait.author === 'object' ? portrait.author : null
  const heroImage = typeof portrait.heroImage === 'object' ? portrait.heroImage : null
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://lecrieur.com'

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: portrait.clientName,
    description: portrait.resultsSummary,
    image: heroImage?.url ? [heroImage.url] : undefined,
    datePublished: portrait.publishedAt,
    author: author?.name ? { '@type': 'Person', name: author.name } : undefined,
    publisher: { '@type': 'Organization', name: 'Groupe Étoile Boréale Inc.', url: 'https://etoileboreale.ca' },
    mainEntityOfPage: `${siteUrl}/portraits-clients/${slug}`,
  }

  return (
    <article className="mx-auto max-w-3xl">
      {/* eslint-disable-next-line react/no-danger */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <header className="mb-6">
        <span className="text-xs font-semibold uppercase tracking-wide text-crieur-accent">Portrait client</span>
        <h1 className="mt-2 text-3xl font-bold leading-tight">{portrait.clientName}</h1>
        <div className="mt-4">
          <Byline
            name={author?.name ?? 'Le Crieur'}
            avatarUrl={typeof author?.avatar === 'object' ? author?.avatar?.url : null}
            publishedAt={portrait.publishedAt}
          />
        </div>
      </header>

      {heroImage?.url && (
        <div className="relative mb-6 aspect-[16/9] w-full overflow-hidden rounded-lg">
          <Image src={heroImage.url} alt={portrait.clientName} fill className="object-cover" priority />
        </div>
      )}

      {portrait.testimonial && (
        <blockquote className="mb-6 border-l-4 border-crieur-accent pl-4 italic text-crieur-ink/80">
          {portrait.testimonial}
        </blockquote>
      )}

      <div className="prose prose-invert max-w-none">
        <RichText data={portrait.content} />
      </div>

      {/* Catégorie B2B pure — allowThirdPartyAds est verrouillé à false en amont
          dans Payload (PortraitsClients.ts), donc toujours la filière premium. */}
      <AdSlot allowThirdPartyAds={Boolean(portrait.allowThirdPartyAds)} slot="portrait-client" />

      {portrait.clientWebsite && (
        <p className="mt-8 text-sm">
          Visiter le site du client:{' '}
          <a href={portrait.clientWebsite} className="text-crieur-accent underline">
            {portrait.clientWebsite}
          </a>
        </p>
      )}
    </article>
  )
}
LECRIEUR_FILE_EOF_20

mkdir -p "src/app/(frontend)/portraits-clients"
cat > 'src/app/(frontend)/portraits-clients/page.tsx' <<'LECRIEUR_FILE_EOF_21'
import { getPayloadClient } from '@/lib/payload'
import { mapPortraitToFeedItem } from '@/lib/mapFeedItem'
import { ArticleCard } from '../components/ArticleCard'

export const revalidate = 300
export const metadata = { title: 'Portraits clients' }

// Priorité éditoriale #1 (brief section 6) — page dédiée en plus du bloc
// "Nos partenaires" sur l'accueil.
export default async function PortraitsClientsPage() {
  const payload = await getPayloadClient()
  const result = await payload.find({
    collection: 'portraits-clients',
    sort: '-publishedAt',
    limit: 24,
    depth: 2,
  })

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-bold">Portraits clients</h1>
      <p className="max-w-2xl text-crieur-ink/70">
        Avant/après, processus, résultats chiffrés — nos clients racontent leur mandat avec Groupe Étoile Boréale.
      </p>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {result.docs.map((p) => (
          <ArticleCard key={p.id} item={mapPortraitToFeedItem(p)} />
        ))}
      </div>
    </div>
  )
}
LECRIEUR_FILE_EOF_21

mkdir -p "src/app/(payload)/admin/[[...segments]]"
cat > 'src/app/(payload)/admin/[[...segments]]/not-found.tsx' <<'LECRIEUR_FILE_EOF_22'
import type { Metadata } from 'next'

import config from '@payload-config'
import '@payloadcms/next/css'
import { NotFoundPage, generatePageMetadata } from '@payloadcms/next/views'
import { importMap } from '../importMap'

type Args = {
  params: Promise<{
    segments: string[]
  }>
  searchParams: Promise<{
    [key: string]: string | string[]
  }>
}

export const generateMetadata = ({ params, searchParams }: Args): Promise<Metadata> =>
  generatePageMetadata({ config, params, searchParams })

const NotFound = ({ params, searchParams }: Args) => NotFoundPage({ config, params, searchParams, importMap })

export default NotFound
LECRIEUR_FILE_EOF_22

mkdir -p "src/app/(payload)/admin/[[...segments]]"
cat > 'src/app/(payload)/admin/[[...segments]]/page.tsx' <<'LECRIEUR_FILE_EOF_23'
import type { Metadata } from 'next'

import config from '@payload-config'
import '@payloadcms/next/css'
import { RootPage, generatePageMetadata } from '@payloadcms/next/views'
import { importMap } from '../importMap'

type Args = {
  params: Promise<{
    segments: string[]
  }>
  searchParams: Promise<{
    [key: string]: string | string[]
  }>
}

export const generateMetadata = ({ params, searchParams }: Args): Promise<Metadata> =>
  generatePageMetadata({ config, params, searchParams })

const Page = ({ params, searchParams }: Args) => RootPage({ config, params, searchParams, importMap })

export default Page
LECRIEUR_FILE_EOF_23

mkdir -p "src/app/(payload)/admin"
cat > 'src/app/(payload)/admin/importMap.js' <<'LECRIEUR_FILE_EOF_24'
// Fichier auto-généré par Payload. Placeholder — régénérer localement après
// `npm install` avec: npm run generate:importmap
export const importMap = {}
LECRIEUR_FILE_EOF_24

mkdir -p "src/app/(payload)/api/[...slug]"
cat > 'src/app/(payload)/api/[...slug]/route.ts' <<'LECRIEUR_FILE_EOF_25'
import {
  REST_DELETE,
  REST_GET,
  REST_OPTIONS,
  REST_PATCH,
  REST_POST,
  REST_PUT,
} from '@payloadcms/next/routes'
import config from '@payload-config'

export const GET = REST_GET(config)
export const POST = REST_POST(config)
export const DELETE = REST_DELETE(config)
export const PATCH = REST_PATCH(config)
export const PUT = REST_PUT(config)
export const OPTIONS = REST_OPTIONS(config)
LECRIEUR_FILE_EOF_25

mkdir -p "src/app/(payload)/api/graphql-playground"
cat > 'src/app/(payload)/api/graphql-playground/route.ts' <<'LECRIEUR_FILE_EOF_26'
import { GRAPHQL_PLAYGROUND_GET } from '@payloadcms/next/routes'
import config from '@payload-config'

export const GET = GRAPHQL_PLAYGROUND_GET(config)
LECRIEUR_FILE_EOF_26

mkdir -p "src/app/(payload)/api/graphql"
cat > 'src/app/(payload)/api/graphql/route.ts' <<'LECRIEUR_FILE_EOF_27'
import { GRAPHQL_POST } from '@payloadcms/next/routes'
import config from '@payload-config'

export const POST = GRAPHQL_POST(config)
LECRIEUR_FILE_EOF_27

mkdir -p "src/app/(payload)"
cat > 'src/app/(payload)/custom.scss' <<'LECRIEUR_FILE_EOF_28'
// Surcharges de style de l'admin Payload — vide pour l'instant.
LECRIEUR_FILE_EOF_28

mkdir -p "src/app/(payload)"
cat > 'src/app/(payload)/layout.tsx' <<'LECRIEUR_FILE_EOF_29'
import config from '@payload-config'
import '@payloadcms/next/css'
import { RootLayout } from '@payloadcms/next/layouts'
import React from 'react'
import './custom.scss'

type Args = {
  children: React.ReactNode
}

const Layout = ({ children }: Args) => <RootLayout config={config}>{children}</RootLayout>

export default Layout
LECRIEUR_FILE_EOF_29

mkdir -p "src/app/api/newsletter"
cat > 'src/app/api/newsletter/route.ts' <<'LECRIEUR_FILE_EOF_30'
import { NextResponse } from 'next/server'

// Stub d'inscription infolettre — section 10 du brief. À brancher sur un
// service transactionnel isolé (Resend/Postmark) via RESEND_API_KEY,
// jamais le Google Workspace principal de GEB (isolation, section 3).
// Placé hors du groupe (payload) pour ne pas être avalé par le catch-all
// /api/[...slug] de Payload — Next.js priorise les segments statiques.
export async function POST(request: Request) {
  const { email } = await request.json()

  if (!email || typeof email !== 'string') {
    return NextResponse.json({ error: 'Courriel invalide.' }, { status: 400 })
  }

  // TODO: appeler l'API Resend/Postmark ici avec RESEND_API_KEY.
  // Pour l'instant, no-op réussi pour ne pas bloquer le développement front.
  console.log(`[newsletter] inscription: ${email}`)

  return NextResponse.json({ ok: true })
}
LECRIEUR_FILE_EOF_30

mkdir -p "src/app"
cat > 'src/app/robots.ts' <<'LECRIEUR_FILE_EOF_31'
import type { MetadataRoute } from 'next'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://lecrieur.com'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: '*', allow: '/', disallow: ['/admin', '/api'] },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
  }
}
LECRIEUR_FILE_EOF_31

mkdir -p "src/app"
cat > 'src/app/sitemap.ts' <<'LECRIEUR_FILE_EOF_32'
import type { MetadataRoute } from 'next'
import { getPayloadClient } from '@/lib/payload'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://lecrieur.com'

// Sitemap XML généré automatiquement (brief section 11).
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const payload = await getPayloadClient()

  const [articles, portraits] = await Promise.all([
    payload.find({ collection: 'articles', where: { _status: { equals: 'published' } }, limit: 1000, depth: 1 }),
    payload.find({ collection: 'portraits-clients', where: { _status: { equals: 'published' } }, limit: 1000, depth: 0 }),
  ])

  const articleUrls: MetadataRoute.Sitemap = articles.docs.map((a) => {
    const categorySlug = typeof a.category === 'object' ? a.category?.slug : 'article'
    return {
      url: `${siteUrl}/${categorySlug}/${a.slug}`,
      lastModified: a.updatedAt,
      changeFrequency: 'weekly',
      priority: 0.7,
    }
  })

  const portraitUrls: MetadataRoute.Sitemap = portraits.docs.map((p) => ({
    url: `${siteUrl}/portraits-clients/${p.slug}`,
    lastModified: p.updatedAt,
    changeFrequency: 'monthly',
    priority: 0.8,
  }))

  return [
    { url: siteUrl, changeFrequency: 'daily', priority: 1 },
    { url: `${siteUrl}/portraits-clients`, changeFrequency: 'weekly', priority: 0.9 },
    ...articleUrls,
    ...portraitUrls,
  ]
}
LECRIEUR_FILE_EOF_32

mkdir -p "src/collections"
cat > 'src/collections/Articles.ts' <<'LECRIEUR_FILE_EOF_33'
import type { CollectionConfig } from 'payload'
import { lexicalEditor } from '@payloadcms/richtext-lexical'

// Contenu éditorial standard (brief section 5). Workflow brouillon → révision
// → publication via versions.drafts, éditable par les rôles Author sans
// dépendre de Jonathan pour publier.
export const Articles: CollectionConfig = {
  slug: 'articles',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'author', '_status', 'featured', 'publishedAt'],
  },
  versions: {
    drafts: {
      autosave: { interval: 2000 },
    },
  },
  access: {
    read: ({ req: { user } }) => {
      if (user) return true
      return { _status: { equals: 'published' } }
    },
    create: ({ req: { user } }) => Boolean(user),
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => user?.role === 'editor',
  },
  fields: [
    { name: 'title', type: 'text', required: true },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: { position: 'sidebar', description: 'URL finale: lecrieur.com/[categorie]/[slug]' },
    },
    {
      name: 'category',
      type: 'relationship',
      relationTo: 'categories',
      required: true,
      admin: { position: 'sidebar' },
    },
    {
      name: 'author',
      type: 'relationship',
      relationTo: 'users',
      required: true,
      admin: { position: 'sidebar' },
    },
    {
      name: 'excerpt',
      type: 'textarea',
      required: true,
      admin: { description: 'Résumé pour le feed, les cartes et les meta descriptions SEO (schema.org).' },
    },
    {
      name: 'heroImage',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'content',
      type: 'richText',
      editor: lexicalEditor(),
      required: true,
    },
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        position: 'sidebar',
        description:
          'Éligible à la zone "à la une". Ignoré si la catégorie est marquée isPersonal (voir section 7 du brief — jamais de contenu personnel en hero).',
      },
    },
    {
      name: 'allowThirdPartyAds',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        position: 'sidebar',
        description:
          "Active AdSense/Meta/YouTube Partner sur CET article. Défaut false — override manuel possible article par article. Ne jamais activer sur cybersecurite / developpement-web / image-de-marque / communication / portraits-clients (section 9 du brief).",
      },
    },
    {
      name: 'relatedClientLink',
      type: 'text',
      admin: {
        description:
          'Lien croisé vers le site du client et/ou la page de service GEB concernée — cœur de l\'internal linking du flywheel SEO (section 11).',
      },
    },
    {
      name: 'publishedAt',
      type: 'date',
      admin: { position: 'sidebar' },
    },
  ],
  hooks: {
    beforeChange: [
      ({ data, operation }) => {
        // Aligne le défaut de allowThirdPartyAds sur le défaut de la catégorie
        // à la création, sans jamais écraser un override manuel ultérieur.
        if (operation === 'create' && data.allowThirdPartyAds === undefined) {
          data.allowThirdPartyAds = false
        }
        return data
      },
    ],
  },
}
LECRIEUR_FILE_EOF_33

mkdir -p "src/collections"
cat > 'src/collections/Categories.ts' <<'LECRIEUR_FILE_EOF_34'
import type { CollectionConfig } from 'payload'

// Taxonomie — brief section 5. Chaque catégorie porte la valeur PAR DÉFAUT du
// rendu publicitaire (section 9) : false pour tout le contenu B2B, true
// uniquement pour le contenu personnel à faible enjeu de conversion.
// Cette valeur n'est qu'un défaut appliqué au champ allowThirdPartyAds de
// chaque article — jamais un interrupteur global au site (voir Articles.ts).
export const Categories: CollectionConfig = {
  slug: 'categories',
  admin: {
    useAsTitle: 'label',
    defaultColumns: ['label', 'slug', 'pillar', 'allowThirdPartyAdsDefault'],
  },
  access: {
    read: () => true,
    create: ({ req: { user } }) => user?.role === 'editor',
    update: ({ req: { user } }) => user?.role === 'editor',
    delete: ({ req: { user } }) => user?.role === 'editor',
  },
  fields: [
    { name: 'label', type: 'text', required: true },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        description:
          'Chemin URL de premier niveau, ex: cybersecurite, developpement-web, image-de-marque, communication, nordik-geek, portraits-clients.',
      },
    },
    {
      name: 'pillar',
      type: 'select',
      required: true,
      options: [
        { label: 'B2B — Carillon (cybersécurité)', value: 'carillon' },
        { label: 'B2B — Draveur (développement web)', value: 'draveur' },
        { label: 'B2B — Arpenteur (image de marque)', value: 'arpenteur' },
        { label: 'B2B — Communication', value: 'communication' },
        { label: 'B2B — Portraits clients', value: 'portraits-clients' },
        { label: 'Personnel — Nordik Geek', value: 'nordik-geek' },
        { label: 'Personnel — Jiu-Jitsu / arts martiaux', value: 'jiu-jitsu' },
        { label: 'Personnel — Littérature', value: 'litterature' },
      ],
    },
    {
      name: 'isPersonal',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description:
          'Contenu personnel de Jonathan (nordik-geek, jiu-jitsu, littérature). Ne doit jamais occuper la zone "à la une" (section 7 du brief).',
      },
    },
    {
      name: 'allowThirdPartyAdsDefault',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description:
          'Défaut appliqué à allowThirdPartyAds des nouveaux articles de cette catégorie. true UNIQUEMENT pour les catégories personnelles.',
      },
    },
  ],
}
LECRIEUR_FILE_EOF_34

mkdir -p "src/collections"
cat > 'src/collections/Media.ts' <<'LECRIEUR_FILE_EOF_35'
import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
      admin: { description: 'Texte alternatif — requis pour accessibilité et SEO image.' },
    },
    {
      name: 'caption',
      type: 'text',
    },
  ],
  upload: {
    imageSizes: [
      { name: 'thumbnail', width: 400, height: 300, position: 'centre' },
      { name: 'card', width: 768, height: 512, position: 'centre' },
      { name: 'hero', width: 1600, height: 900, position: 'centre' },
    ],
    adminThumbnail: 'thumbnail',
    mimeTypes: ['image/*'],
  },
}
LECRIEUR_FILE_EOF_35

mkdir -p "src/collections"
cat > 'src/collections/PortraitsClients.ts' <<'LECRIEUR_FILE_EOF_36'
import type { CollectionConfig } from 'payload'
import { lexicalEditor } from '@payloadcms/richtext-lexical'

// Type distinct des Articles (brief section 6) — priorité éditoriale #1.
// Déclencheur : chaque nouveau client signé (Draveur, Carillon, Arpenteur)
// devrait générer un portrait dans les semaines suivant la livraison.
// Catégorie B2B pure — allowThirdPartyAds reste verrouillé à false (section 9).
export const PortraitsClients: CollectionConfig = {
  slug: 'portraits-clients',
  labels: {
    singular: 'Portrait client',
    plural: 'Portraits clients',
  },
  admin: {
    useAsTitle: 'clientName',
    defaultColumns: ['clientName', 'gebService', 'author', '_status', 'publishedAt'],
  },
  versions: {
    drafts: { autosave: { interval: 2000 } },
  },
  access: {
    read: ({ req: { user } }) => {
      if (user) return true
      return { _status: { equals: 'published' } }
    },
    create: ({ req: { user } }) => Boolean(user),
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => user?.role === 'editor',
  },
  fields: [
    { name: 'clientName', type: 'text', required: true },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: { position: 'sidebar', description: 'URL finale: lecrieur.com/portraits-clients/[slug]' },
    },
    {
      name: 'clientWebsite',
      type: 'text',
      admin: { description: 'Lien vers le site du client — cross-linking client ↔ GEB (section 6).' },
    },
    {
      name: 'gebService',
      type: 'select',
      required: true,
      options: [
        { label: 'Draveur — Développement web', value: 'draveur' },
        { label: 'Carillon — Cybersécurité (Saurel)', value: 'carillon' },
        { label: 'Arpenteur — Image de marque', value: 'arpenteur' },
      ],
    },
    {
      name: 'testimonial',
      type: 'textarea',
      admin: { description: 'Citation/témoignage du client.' },
    },
    {
      name: 'resultsSummary',
      type: 'textarea',
      admin: { description: 'Résultats chiffrés avant/après — le format qui convertit le mieux (section 6).' },
    },
    { name: 'author', type: 'relationship', relationTo: 'users', required: true, admin: { position: 'sidebar' } },
    { name: 'heroImage', type: 'upload', relationTo: 'media', required: true },
    { name: 'content', type: 'richText', editor: lexicalEditor(), required: true },
    {
      name: 'allowThirdPartyAds',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        position: 'sidebar',
        readOnly: true,
        description: 'Toujours false — catégorie B2B pure, aucune exception (section 9 du brief).',
      },
    },
    { name: 'publishedAt', type: 'date', admin: { position: 'sidebar' } },
  ],
}
LECRIEUR_FILE_EOF_36

mkdir -p "src/collections"
cat > 'src/collections/Users.ts' <<'LECRIEUR_FILE_EOF_37'
import type { CollectionConfig } from 'payload'

// Trois contributeurs (brief section 4) : Jonathan (editor, admin complet),
// Paulina et Alexandra (author — publient sans dépendre de Jonathan).
export const Users: CollectionConfig = {
  slug: 'users',
  auth: true,
  admin: {
    useAsTitle: 'email',
    defaultColumns: ['name', 'email', 'role'],
  },
  access: {
    read: () => true,
    create: ({ req: { user } }) => user?.role === 'editor',
    update: ({ req: { user } }) => user?.role === 'editor',
    delete: ({ req: { user } }) => user?.role === 'editor',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'role',
      type: 'select',
      required: true,
      defaultValue: 'author',
      options: [
        { label: 'Editor (admin complet)', value: 'editor' },
        { label: 'Author (brouillon → révision → publication)', value: 'author' },
      ],
      admin: {
        description: 'Editor = Jonathan. Author = Paulina, Alexandra (peuvent publier sans passer par Jonathan).',
      },
    },
    {
      name: 'bio',
      type: 'textarea',
      admin: { description: 'Courte bio affichée sur les bylines des articles.' },
    },
    {
      name: 'avatar',
      type: 'upload',
      relationTo: 'media',
    },
  ],
}
LECRIEUR_FILE_EOF_37

mkdir -p "src/lib"
cat > 'src/lib/mapFeedItem.ts' <<'LECRIEUR_FILE_EOF_38'
import type { FeedItem } from '../app/(frontend)/components/ArticleCard'

// Types larges en attendant `npm run generate:types` (payload-types.ts est
// auto-généré et ignoré par git — voir README). À remplacer par les types
// générés (Article, PortraitClient) une fois disponibles localement.
type PopulatedMedia = { url?: string | null } | string | null | undefined
type PopulatedUser = { name?: string; avatar?: PopulatedMedia } | string | null | undefined
type PopulatedCategory = { label?: string; slug?: string } | string | null | undefined

type RawArticle = {
  id: string
  title: string
  slug: string
  excerpt?: string | null
  heroImage?: PopulatedMedia
  author?: PopulatedUser
  category?: PopulatedCategory
  publishedAt?: string | null
}

function mediaUrl(media: PopulatedMedia): string | null {
  if (media && typeof media === 'object') return media.url ?? null
  return null
}

export function mapArticleToFeedItem(article: RawArticle): FeedItem {
  const categorySlug = typeof article.category === 'object' ? article.category?.slug : undefined
  const categoryLabel = typeof article.category === 'object' ? article.category?.label : undefined
  const authorName = typeof article.author === 'object' ? article.author?.name ?? 'Le Crieur' : 'Le Crieur'
  const authorAvatarUrl = typeof article.author === 'object' ? mediaUrl(article.author?.avatar) : null

  return {
    id: article.id,
    title: article.title,
    href: `/${categorySlug ?? 'article'}/${article.slug}`,
    excerpt: article.excerpt,
    heroImageUrl: mediaUrl(article.heroImage),
    categoryLabel,
    authorName,
    authorAvatarUrl,
    publishedAt: article.publishedAt,
  }
}

type RawPortrait = {
  id: string
  clientName: string
  slug: string
  resultsSummary?: string | null
  heroImage?: PopulatedMedia
  author?: PopulatedUser
  publishedAt?: string | null
}

export function mapPortraitToFeedItem(portrait: RawPortrait): FeedItem {
  const authorName = typeof portrait.author === 'object' ? portrait.author?.name ?? 'Le Crieur' : 'Le Crieur'
  const authorAvatarUrl = typeof portrait.author === 'object' ? mediaUrl(portrait.author?.avatar) : null

  return {
    id: portrait.id,
    title: portrait.clientName,
    href: `/portraits-clients/${portrait.slug}`,
    excerpt: portrait.resultsSummary,
    heroImageUrl: mediaUrl(portrait.heroImage),
    categoryLabel: 'Portrait client',
    authorName,
    authorAvatarUrl,
    publishedAt: portrait.publishedAt,
  }
}
LECRIEUR_FILE_EOF_38

mkdir -p "src/lib"
cat > 'src/lib/payload.ts' <<'LECRIEUR_FILE_EOF_39'
import { getPayload, type Payload } from 'payload'
import config from '@payload-config'

let cached: Promise<Payload> | null = null

// Client Payload Local API mis en cache — évite de ré-instancier à chaque
// requête. Utilisé par les pages du frontend (app/(frontend)) pour lire
// articles, portraits clients et catégories directement, sans passer par
// l'API REST/GraphQL.
export const getPayloadClient = async (): Promise<Payload> => {
  if (!cached) {
    cached = getPayload({ config })
  }
  return cached
}
LECRIEUR_FILE_EOF_39

mkdir -p "src"
cat > 'src/payload.config.ts' <<'LECRIEUR_FILE_EOF_40'
import path from 'path'
import { fileURLToPath } from 'url'
import { buildConfig } from 'payload'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Categories } from './collections/Categories'
import { Articles } from './collections/Articles'
import { PortraitsClients } from './collections/PortraitsClients'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Users, Media, Categories, Articles, PortraitsClients],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  // Base de données DÉDIÉE à Le Crieur — instance séparée de Draveur, par
  // choix d'isolation (Le Crieur opère en branche parallèle, cf. décision
  // du 2026-07-10 avec Jonathan).
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || '',
    },
  }),
  sharp,
  cors: [process.env.NEXT_PUBLIC_SITE_URL || ''].filter(Boolean),
})
LECRIEUR_FILE_EOF_40

# root file
cat > 'tailwind.config.ts' <<'LECRIEUR_FILE_EOF_41'
import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/app/(frontend)/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Palette à ajuster selon le Brand Book GEB / lore Le Crieur
        crieur: {
          bg: '#0d1117',
          ink: '#f5f2e8',
          accent: '#c9a227',
        },
      },
    },
  },
  plugins: [],
}

export default config
LECRIEUR_FILE_EOF_41

# root file
cat > 'tsconfig.json' <<'LECRIEUR_FILE_EOF_42'
{
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"],
      "@payload-config": ["./src/payload.config.ts"]
    },
    "plugins": [{ "name": "next" }]
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
LECRIEUR_FILE_EOF_42

echo "Scaffold cree dans $TARGET_DIR"
echo "Prochaine etape: npm install && cp .env.example .env"

# --- Init git + install (WSL a un acces reseau complet, contrairement au sandbox Cowork) ---
if [ ! -d .git ]; then
  git init -q
  git add -A
  git commit -q -m "Scaffold initial Le Crieur (Next.js + Payload CMS v3 + Postgres)"
  echo "Repo git initialise avec un premier commit."
fi

read -p "Lancer 'npm install' maintenant ? (o/N) " REPLY
if [[ "$REPLY" =~ ^[Oo]$ ]]; then
  npm install
  cp -n .env.example .env || true
  echo "npm install termine. Remplis .env (DATABASE_URI, PAYLOAD_SECRET) avant 'npm run dev'."
fi

echo ""
echo "Pour ouvrir dans VS Code (extension WSL requise cote Windows):"
echo "  code \"$TARGET_DIR\""
