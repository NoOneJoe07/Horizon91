// Met à jour l'article Calgary avec les vraies infos (Instagram citadellebjj, 4 avril 2026)
// node scripts/update-calgary-article.js

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  const result = await prisma.post.update({
    where: { slug: "adcc-calgary-open-argent-avril-2026" },
    data: {
      publishedAt: new Date("2026-04-05T10:00:00-04:00"),

      titleFr: "🥇🥈🥉 Citadelle Jiu-Jitsu à l'ADCC Open de Calgary — avril 2026",
      titleEn: "🥇🥈🥉 Citadelle Jiu-Jitsu at the ADCC Open in Calgary — April 2026",

      excerptFr:
        "Première sortie officielle de l'équipe Citadelle en compétition : Max remporte l'or en " +
        "+100kg intermédiaire et JS fait 5 matchs en avancé, récoltant bronze et argent. " +
        "Le dojo se fait connaître sur la scène nationale.",
      excerptEn:
        "Citadelle's first official team showing at competition: Max takes gold in +100kg intermediate " +
        "and JS goes 5 matches in advanced, earning bronze and silver. " +
        "The dojo makes its mark on the national scene.",

      contentFr: `## L'équipe Citadelle débarque à Calgary

Le 4 avril 2026, deux athlètes de Citadelle Jiu-Jitsu faisaient le voyage à Calgary pour participer à l'**ADCC Open Canada** — l'un des tournois de grappling les plus relevés du circuit national canadien. Ce n'était pas une sortie anodine : c'était la première présence officielle de l'équipe Citadelle sur la scène compétitive ADCC.

## Max : or en Adulte Intermédiaire +100kg

**Deux victoires. Une par soumission, une par points.** Max remporte la catégorie Adulte Intermédiaire +100kg avec une dominance remarquable — d'autant plus impressionnante que plusieurs de ses adversaires affichaient un gabarit physique supérieur au sien. Ce n'est pas la taille qui gagne sur le tatami. C'est la technique, la stratégie, et l'instinct de finisseur.

Une médaille d'or ADCC à Calgary, c'est un signal clair envoyé au circuit canadien.

## JS : 5 matchs en Adulte Avancé

**Coach et compétiteur.** Jean-Sébastien Dionne-Roy a disputé **5 matchs** lors de cette compétition, répartis sur deux catégories :

- **-100kg Adulte Avancé** → 🥉 3e place
- **Absolute Adulte Avancé** → 🥈 2e place

L'Absolute est la catégorie la plus exigeante — tous les poids confondus, contre des adversaires souvent plus lourds. Décrocher l'argent dans ces conditions, après avoir déjà enchaîné plusieurs matchs en poids, c'est une performance qui ne s'improvise pas.

## Une équipe qui grandit

Cette sortie à Calgary marque quelque chose d'important pour la Citadelle : ce n'est plus seulement JS qui compétitionne. C'est **une équipe** qui se construit, s'entraîne ensemble, et se bat ensemble. Max a remporté l'or. JS a ramené deux médailles. Et les élèves qui les ont encouragés depuis Québec font partie de cette victoire aussi.

*« Merci aux élèves de Citadelle Jiu-Jitsu pour les encouragements, entraînements et l'aide à la préparation. »*
— citadellebjj, Instagram

---

*La Citadelle à Calgary. Le début de quelque chose. 🏔️*`,

      contentEn: `## The Citadelle team arrives in Calgary

On April 4, 2026, two athletes from Citadelle Jiu-Jitsu made the trip to Calgary to compete at the **ADCC Open Canada** — one of the most competitive grappling events on the Canadian national circuit. This wasn't just another tournament: it was Citadelle's first official showing as a team on the ADCC competitive scene.

## Max: gold in Adult Intermediate +100kg

**Two victories. One by submission, one by points.** Max wins the Adult Intermediate +100kg division with remarkable dominance — all the more impressive given that several of his opponents were physically much larger. Size doesn't win on the mat. Technique, strategy, and a finisher's instinct do.

A gold medal at the ADCC Calgary Open is a clear statement to the Canadian circuit.

## JS: 5 matches in Adult Advanced

**Coach and competitor.** Jean-Sébastien Dionne-Roy competed in **5 matches** across two categories:

- **-100kg Adult Advanced** → 🥉 3rd place
- **Absolute Adult Advanced** → 🥈 2nd place

The Absolute is the most demanding division — all weights combined, facing opponents who are often much heavier. Taking silver in those conditions, after already competing through multiple matches at weight, is not something that happens by accident.

## A team that's growing

This trip to Calgary marks something important for Citadelle: it's no longer just JS competing. It's **a team** — training together, building together, fighting together. Max took gold. JS brought home two medals. And the students who cheered them on from Québec City are part of that victory too.

*"Thank you to the students of Citadelle Jiu-Jitsu for the encouragement, training, and help with preparation."*
— citadellebjj, Instagram

---

*Citadelle in Calgary. The beginning of something. 🏔️*`,
    },
  });
  console.log(`✅ Article Calgary mis à jour : ${result.slug}`);
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });
