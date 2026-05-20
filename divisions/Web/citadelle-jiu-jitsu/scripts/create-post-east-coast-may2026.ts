// =============================================================================
// Script one-shot — Créer l'article Dojo Time : East Coast Absolute, mai 2026
// -----------------------------------------------------------------------------
// Usage (depuis WSL, racine du projet) :
//   npx ts-node --compiler-options '{"module":"commonjs"}' scripts/create-post-east-coast-may2026.ts
// =============================================================================

import { PrismaClient, PostCategory, PostStatus } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const post = await prisma.post.upsert({
    where: { slug: "east-coast-absolute-or-mai-2026" },
    update: {},
    create: {
      slug:      "east-coast-absolute-or-mai-2026",
      category:  PostCategory.COMPETITION,
      status:    PostStatus.PUBLISHED,
      publishedAt: new Date("2026-05-18T12:00:00-04:00"),

      // ── Titre ──────────────────────────────────────────────────────────────
      titleFr: "🥇 Jean-Sébastien remporte l'or à l'East Coast Absolute — mai 2026",
      titleEn: "🥇 Jean-Sébastien takes gold at East Coast Absolute — May 2026",

      // ── Extrait (card du feed) ─────────────────────────────────────────────
      excerptFr:
        "Une semaine après son double or au Hub Grappling, JS enchaîne avec une victoire dominante " +
        "à l'East Coast Absolute. Deux tournois. Deux or. Aucune pitié. #2 au Canada et en progression.",
      excerptEn:
        "One week after his double gold at Hub Grappling, JS follows up with a dominant performance " +
        "at the East Coast Absolute. Two tournaments. Two golds. No mercy. #2 in Canada and climbing.",

      // ── Contenu complet ────────────────────────────────────────────────────
      contentFr: `## Le momentum ne s'arrête pas

Le 17 mai 2026, Jean-Sébastien Dionne-Roy montait une nouvelle fois sur la plus haute marche du podium — cette fois à l'**East Coast Absolute**. Une semaine à peine après son double or au Hub Grappling Event du 9 mai, JS a confirmé ce que ses adversaires commencent à comprendre : il n'est pas là pour participer. Il est là pour soumettre.

## Un finisseur, pas un marqueur de points

Avec plus de **129 victoires en compétition — dont 66 % par soumission** — JS incarne une philosophie simple : le jiu-jitsu ne se gagne pas aux points, il se gagne sur le tatami. Chaque match, il cherche la finition. Chaque tournoi, il l'obtient.

Ces deux médailles d'or consécutives (Hub Grappling et East Coast Absolute) ne sont pas encore comptabilisées dans le classement officiel **ADCC Top Men Rankings 2025-2026**, où il pointe déjà **#2 au Canada**. Quand elles le seront, le tableau change.

## Vers le sommet du classement canadien

La trajectoire est claire. Avec **47 points au classement ADCC** (15 victoires, 4 défaites, 3 🥇 2 🥈 2 🥉), JS est à portée de la première place nationale. Le seul obstacle entre lui et le #1 est un adversaire qui n'est pas en compétition active dans sa catégorie — ce qui signifie que chaque tournoi que JS remporte rapproche la Citadelle du sommet.

## Ce que ça signifie pour nos élèves

Quand votre instructeur est un compétiteur actif classé parmi les meilleurs du pays, ce n'est pas de la théorie qu'il enseigne. C'est ce qu'il vit, perfectionne, et ramène au dojo chaque semaine.

C'est la philosophie de la Citadelle : **le tatami est un miroir. Chaque entraînement révèle qui tu es — et qui tu peux devenir.**

---

*Félicitations JS. Le dojo est fier. 🏆*`,

      contentEn: `## The momentum doesn't stop

On May 17, 2026, Jean-Sébastien Dionne-Roy stepped onto the top of the podium again — this time at the **East Coast Absolute**. Just one week after his double gold at the Hub Grappling Event on May 9th, JS confirmed what his opponents are beginning to understand: he's not here to participate. He's here to submit.

## A finisher, not a point scorer

With over **129 competition victories — 66% by submission** — JS embodies a simple philosophy: jiu-jitsu isn't won on points, it's won on the mat. Every match, he hunts the finish. Every tournament, he gets it.

These two consecutive gold medals (Hub Grappling and East Coast Absolute) are not yet counted in the official **ADCC Top Men Rankings 2025-2026**, where he already sits at **#2 in Canada**. When they are, the leaderboard shifts.

## Climbing toward the top of the Canadian rankings

The trajectory is clear. With **47 points in the ADCC rankings** (15 wins, 4 losses, 3 🥇 2 🥈 2 🥉), JS is within striking distance of first place nationally. The only obstacle between him and #1 is a competitor who isn't actively competing in his weight class — which means every tournament JS wins brings Citadelle closer to the top.

## What this means for our students

When your instructor is an active competitor ranked among the best in the country, what he teaches isn't theory. It's what he lives, perfects, and brings back to the dojo every single week.

That's the Citadelle philosophy: **the mat is a mirror. Every training session reveals who you are — and who you can become.**

---

*Congratulations JS. The dojo is proud. 🏆*`,

      externalUrl: "https://smoothcomp.com/en/profile/77192",
    },
  });

  console.log(`✅ Post créé : ${post.slug} (${post.status})`);
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });
