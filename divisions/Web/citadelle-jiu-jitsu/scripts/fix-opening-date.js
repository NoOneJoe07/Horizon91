// Corrige la date et le contenu de l'article d'ouverture du dojo
// node scripts/fix-opening-date.js

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  const result = await prisma.post.update({
    where: { slug: "ouverture-citadelle-jiu-jitsu-quebec" },
    data: {
      publishedAt: new Date("2025-07-10T09:00:00-04:00"),

      titleFr: "🏯 Citadelle Jiu-Jitsu ouvre ses portes à Québec — juillet 2025",
      titleEn: "🏯 Citadelle Jiu-Jitsu opens its doors in Québec City — July 2025",

      excerptFr:
        "Le 10 juillet 2025, Jean-Sébastien Dionne-Roy fondait Citadelle Jiu-Jitsu à Québec. " +
        "Un dojo pour tous — débutants, pratiquants et compétiteurs. Le début d'une aventure.",
      excerptEn:
        "On July 10, 2025, Jean-Sébastien Dionne-Roy founded Citadelle Jiu-Jitsu in Québec City. " +
        "A dojo for everyone — beginners, regulars, and competitors. The start of something.",

      contentFr: `## Un projet de longue haleine

Le 10 juillet 2025, Jean-Sébastien Dionne-Roy franchissait une nouvelle étape : **fonder Citadelle Jiu-Jitsu à Québec**. Ceinture noire de jiu-jitsu brésilien, compétiteur parmi les meilleurs au Canada, formé au Tristar Gym aux côtés de l'élite mondiale — après des années à perfectionner son art, il était temps de transmettre.

Citadelle Jiu-Jitsu n'est pas un gym de plus. C'est un espace pensé pour transmettre un jiu-jitsu intelligent, rigoureux, et authentiquement compétitif — dans une atmosphère où chaque élève est respecté et poussé à devenir meilleur.

## Pour qui ?

Citadelle Jiu-Jitsu accueille **tous les niveaux** :

- **Les débutants** qui n'ont jamais mis le pied sur un tatami et qui veulent découvrir un art martial efficace, complet, et intellectuellement stimulant.
- **Les pratiquants** qui cherchent un environnement sérieux pour progresser régulièrement et consolider leurs bases.
- **Les compétiteurs** qui veulent s'entraîner avec un instructeur qui vit lui-même la compétition au niveau national.

## La philosophie de Citadelle Jiu-Jitsu

*« Le tatami est un miroir. Chaque entraînement révèle qui tu es — et qui tu peux devenir. »*

Le jiu-jitsu n'est pas qu'un sport de combat. C'est un système qui développe la discipline, la stratégie, la persévérance et le respect — des qualités qui dépassent largement les murs du dojo.

## Première séance d'essai gratuite

Curieux ? La première séance est offerte, sans engagement. Viens voir par toi-même ce que le jiu-jitsu peut apporter à ta vie.

---

*Bienvenue chez Citadelle Jiu-Jitsu. 🏯*`,

      contentEn: `## A long-held vision

On July 10, 2025, Jean-Sébastien Dionne-Roy took the next step: **founding Citadelle Jiu-Jitsu in Québec City**. Brazilian jiu-jitsu black belt, one of Canada's top competitors, trained at Tristar Gym alongside the world's elite — after years of perfecting his craft, it was time to teach.

Citadelle Jiu-Jitsu isn't just another gym. It's a space designed to pass on intelligent, rigorous, and authentically competitive jiu-jitsu — in an environment where every student is respected and pushed to become better.

## Who is it for?

Citadelle Jiu-Jitsu welcomes **all levels**:

- **Beginners** who have never set foot on a mat and want to discover an effective, well-rounded, and intellectually stimulating martial art.
- **Regular practitioners** who are looking for a serious environment to progress consistently and solidify their fundamentals.
- **Competitors** who want to train with an instructor who actively competes at the national level himself.

## The philosophy of Citadelle Jiu-Jitsu

*"The mat is a mirror. Every training session reveals who you are — and who you can become."*

Jiu-jitsu is more than a combat sport. It's a system that develops discipline, strategy, perseverance and respect — qualities that extend far beyond the walls of the dojo.

## First trial class is free

Curious? Your first class is on the house, no commitment. Come see for yourself what jiu-jitsu can bring to your life.

---

*Welcome to Citadelle Jiu-Jitsu. 🏯*`,
    },
  });
  console.log(`✅ Article ouverture mis à jour — ${result.publishedAt?.toLocaleDateString("fr-CA")}`);
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });
