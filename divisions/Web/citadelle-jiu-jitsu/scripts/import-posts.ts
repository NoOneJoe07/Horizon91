// =============================================================================
// scripts/import-posts.ts — Réimport des articles Dojo Time en production
// Usage : DATABASE_URL="..." npx tsx scripts/import-posts.ts
// =============================================================================

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const posts = [
  {
    slug: "ouverture-citadelle-jiu-jitsu-2025",
    titleFr: "Ouverture de Citadelle Jiu-Jitsu",
    titleEn: "Citadelle Jiu-Jitsu Opens Its Doors",
    excerptFr: "C'est avec grande fierté que nous annonçons l'ouverture officielle de Citadelle Jiu-Jitsu le 10 juillet 2025.",
    excerptEn: "We are proud to announce the official opening of Citadelle Jiu-Jitsu on July 10, 2025.",
    contentFr: `C'est avec une immense fierté que nous annonçons l'ouverture officielle de **Citadelle Jiu-Jitsu** le **10 juillet 2025**.

Après des mois de préparation, notre dojo ouvre enfin ses portes à la communauté. Notre mission : offrir un environnement accueillant, structuré et passionné pour apprendre le jiu-jitsu brésilien — que vous soyez débutant ou compétiteur.

Sous la direction de Coach JS Dionne, ceinture noire et compétiteur d'expérience, Citadelle Jiu-Jitsu vous offre :

- Des cours pour tous les niveaux (débutants, intermédiaires, avancés)
- Des séances d'entraînement compétitif
- Une communauté soudée et bienveillante
- Des horaires flexibles

Bienvenue à la famille Citadelle ! 🥋`,
    contentEn: `We are thrilled to announce the official opening of **Citadelle Jiu-Jitsu** on **July 10, 2025**.

After months of preparation, our dojo finally opens its doors to the community. Our mission: to provide a welcoming, structured, and passionate environment to learn Brazilian jiu-jitsu — whether you are a beginner or a competitor.

Under the leadership of Coach JS Dionne, black belt and experienced competitor, Citadelle Jiu-Jitsu offers:

- Classes for all levels (beginners, intermediate, advanced)
- Competitive training sessions
- A close-knit and supportive community
- Flexible schedules

Welcome to the Citadelle family! 🥋`,
    imageUrl: null,
    category: "ANNOUNCEMENT" as const,
    status: "PUBLISHED" as const,
    publishedAt: new Date("2025-07-10"),
  },
  {
    slug: "5-bienfaits-jiu-jitsu",
    titleFr: "5 bienfaits du Jiu-Jitsu Brésilien",
    titleEn: "5 Benefits of Brazilian Jiu-Jitsu",
    excerptFr: "Le jiu-jitsu va bien au-delà d'un simple sport de combat. Découvrez pourquoi de plus en plus de personnes choisissent le BJJ.",
    excerptEn: "Jiu-jitsu goes far beyond a simple combat sport. Discover why more and more people are choosing BJJ.",
    contentFr: `Le jiu-jitsu brésilien est bien plus qu'un sport de combat — c'est un outil de transformation personnelle. Voici 5 raisons de commencer dès aujourd'hui.

**1. Confiance en soi**
Apprendre à gérer des situations de pression sur le tapis se traduit directement dans la vie quotidienne. Chaque soumission réussie, chaque technique maîtrisée renforce votre estime personnelle.

**2. Condition physique complète**
Le BJJ sollicite l'ensemble du corps : force, endurance, flexibilité et coordination. Une heure sur le tapis équivaut à un entraînement complet.

**3. Gestion du stress**
Le tapis devient un espace de décompression. Quand vous roulez, votre cerveau est entièrement concentré sur l'instant présent — impossible de penser aux soucis du quotidien.

**4. Communauté et appartenance**
Il n'y a pas d'équipe comme une équipe de jiu-jitsu. Les partenaires d'entraînement deviennent rapidement des amis proches, unis par une passion commune.

**5. Autodéfense réelle**
Le BJJ est l'art martial le plus efficace pour les situations réelles d'autodéfense, particulièrement au sol. Une compétence qui vaut pour toute la vie.

Prêt à essayer ? Contactez-nous pour une séance d'essai gratuite ! 🥋`,
    contentEn: `Brazilian jiu-jitsu is much more than a combat sport — it's a tool for personal transformation. Here are 5 reasons to start today.

**1. Self-Confidence**
Learning to manage pressure situations on the mat translates directly into everyday life. Every successful submission, every mastered technique strengthens your self-esteem.

**2. Complete Physical Fitness**
BJJ engages the entire body: strength, endurance, flexibility, and coordination. One hour on the mat equals a complete workout.

**3. Stress Management**
The mat becomes a decompression space. When you roll, your brain is entirely focused on the present moment — impossible to think about daily worries.

**4. Community and Belonging**
There's no team like a jiu-jitsu team. Training partners quickly become close friends, united by a shared passion.

**5. Real Self-Defense**
BJJ is the most effective martial art for real self-defense situations, particularly on the ground. A skill that lasts a lifetime.

Ready to try? Contact us for a free trial session! 🥋`,
    imageUrl: null,
    category: "COMMUNITY" as const,
    status: "PUBLISHED" as const,
    publishedAt: new Date("2025-09-01"),
  },
  {
    slug: "adcc-open-calgary-avril-2026",
    titleFr: "ADCC Open Calgary — Max et Coach JS brillent !",
    titleEn: "ADCC Open Calgary — Max and Coach JS shine!",
    excerptFr: "Deux athlètes de Citadelle au ADCC Open de Calgary : des performances exceptionnelles à retenir.",
    excerptEn: "Two Citadelle athletes at the ADCC Open in Calgary: exceptional performances to remember.",
    contentFr: `Le 4 avril 2026, deux représentants de Citadelle Jiu-Jitsu ont fait le voyage jusqu'à Calgary pour l'**ADCC Open**, et ils sont revenus avec de superbes résultats !

**Max G. — Adulte Intermédiaire +100kg 🥇**
Deux victoires impressionnantes : une par soumission et une par points, pour décrocher la **première place** dans sa catégorie. Remarquable sachant que plusieurs de ses adversaires avaient un gabarit bien plus imposant que le sien. 💪

**Coach JS Dionne — Adulte Avancé -100kg & Absolute**
5 matchs au total sur le week-end :
- **3e place** en Adulte Avancé -100kg
- **2e place** en Absolute Adulte Avancé

Un weekend chargé et des performances de haut niveau qui confirment le calibre de nos athlètes.

Merci aux élèves de Citadelle Jiu-Jitsu pour les encouragements, les entraînements et l'aide à la préparation. C'est un effort d'équipe ! 🔥`,
    contentEn: `On April 4, 2026, two representatives of Citadelle Jiu-Jitsu made the trip to Calgary for the **ADCC Open**, and they came back with outstanding results!

**Max G. — Adult Intermediate +100kg 🥇**
Two impressive victories: one by submission and one by points, to claim **first place** in his category. Remarkable given that several of his opponents were significantly larger in size. 💪

**Coach JS Dionne — Adult Advanced -100kg & Absolute**
5 matches total over the weekend:
- **3rd place** in Adult Advanced -100kg
- **2nd place** in Adult Advanced Absolute

A packed weekend and high-level performances that confirm the caliber of our athletes.

Thank you to all Citadelle Jiu-Jitsu students for the encouragement, training sessions, and help with preparation. It's a team effort! 🔥`,
    imageUrl: "/images/dojo-time/JS_Max_Calgary.png",
    imagePosition: "top center",
    category: "COMPETITION" as const,
    status: "PUBLISHED" as const,
    publishedAt: new Date("2026-04-04"),
  },
  {
    slug: "hupf-grappling-medaille-or-mai-2026",
    titleFr: "Hupf Grappling — Médaille d'or et bourse 1ère place !",
    titleEn: "Hupf Grappling — Gold Medal and Prize Money 1st Place!",
    excerptFr: "Coach JS remporte la médaille d'or et une bourse au Hupf Grappling. Une performance exceptionnelle dans l'Absolute masculin.",
    excerptEn: "Coach JS wins the gold medal and prize money at Hupf Grappling. An exceptional performance in the male Absolute division.",
    contentFr: `Le **9 mai 2026**, Coach JS Dionne a participé au **Hupf Grappling** et nous sommes très fiers d'annoncer qu'il a remporté la **médaille d'or** ainsi qu'une **bourse** pour sa 1ère place dans l'Absolute masculin !

Comme le souligne l'organisation : *"We were so excited to see so much skill in our male Absolute division"* 💪🏼

Félicitations [@js_dionne](https://www.instagram.com/js_dionne/) 🏆

Une performance de plus qui démontre le niveau exceptionnel de notre coach et qui inspire toute la communauté Citadelle. Bravo ! 🔥`,
    contentEn: `On **May 9, 2026**, Coach JS Dionne competed at **Hupf Grappling** and we are very proud to announce that he won the **gold medal** and **prize money** for his 1st place finish in the male Absolute division!

As the organization noted: *"We were so excited to see so much skill in our male Absolute division"* 💪🏼

Congratulations [@js_dionne](https://www.instagram.com/js_dionne/) 🏆

One more performance that demonstrates the exceptional level of our coach and inspires the entire Citadelle community. Well done! 🔥`,
    imageUrl: "/images/dojo-time/JS_Hupfrapplng.png",
    imagePosition: "top center",
    category: "COMPETITION" as const,
    status: "PUBLISHED" as const,
    publishedAt: new Date("2026-05-09"),
  },
  {
    slug: "ecfs-competition-mai-2026",
    titleFr: "East Coast Fight Store — Coach JS remporte l'Absolute ! 🏆",
    titleEn: "East Coast Fight Store — Coach JS Wins the Absolute! 🏆",
    excerptFr: "Coach JS remporte l'Absolute de 15 compétiteurs avec 2 soumissions et 2 victoires aux points lors du East Coast Fight Store de grappling.",
    excerptEn: "Coach JS wins the Absolute of 15 competitors with 2 submissions and 2 point victories at the East Coast Fight Store grappling event.",
    contentFr: `Le **17 mai 2026**, Coach JS Dionne a participé à l'événement de grappling du **East Coast Fight Store (ECFS)** dans une cage, et quelle performance !

🏆 **Champion de l'Absolute — 15 compétiteurs**
- 2 victoires par **soumission**
- 2 victoires par **points**
- **Ceinture** remportée

Une domination totale dans un format cage grappling qui demande une adaptation technique et mentale particulière. Coach JS a brillé du début à la fin.

**Félicitations à Coach JS pour cette performance remarquable !**

Merci à tous les élèves de Citadelle Jiu-Jitsu qui ont contribué à sa préparation. Chaque round d'entraînement, chaque drill, chaque sparring session fait partie de cette victoire. Vous êtes tous champions ! 💪🔥`,
    contentEn: `On **May 17, 2026**, Coach JS Dionne competed at the **East Coast Fight Store (ECFS)** grappling event in a cage, and what a performance!

🏆 **Absolute Champion — 15 competitors**
- 2 victories by **submission**
- 2 victories by **points**
- **Belt** won

A total domination in a cage grappling format that requires special technical and mental adaptation. Coach JS shone from start to finish.

**Congratulations to Coach JS for this remarkable performance!**

Thank you to all Citadelle Jiu-Jitsu students who contributed to his preparation. Every training round, every drill, every sparring session is part of this victory. You are all champions! 💪🔥`,
    imageUrl: "/images/dojo-time/JS ECFS.jpg",
    imagePosition: "center",
    category: "COMPETITION" as const,
    status: "PUBLISHED" as const,
    publishedAt: new Date("2026-05-17"),
  },
  {
    slug: "adcc-open-toronto-fevrier-2026",
    titleFr: "ADCC Open Toronto — Coach JS champion de l'Absolute ! 🥇",
    titleEn: "ADCC Open Toronto — Coach JS Absolute Champion! 🥇",
    excerptFr: "Médaille d'or pour Coach JS Dionne à l'ADCC Open de Toronto dans la catégorie Absolute. Une belle victoire pour toute l'équipe Citadelle !",
    excerptEn: "Gold medal for Coach JS Dionne at the ADCC Open in Toronto in the Absolute category. A great victory for the entire Citadelle team!",
    contentFr: `🥇 **Médaille d'or** pour Coach [@js_dionne](https://www.instagram.com/js_dionne/) à l'**ADCC Open de Toronto** dans la catégorie **Absolute** ! 🔥

Une performance dominante qui confirme une fois de plus le calibre exceptionnel de notre coach sur la scène compétitive.

Merci aux élèves de Citadelle Jiu-Jitsu et aux partenaires d'entraînement pour la préparation — chaque session sur le tapis contribue à ces victoires.

📍 On se voit sur les mats cette semaine, on poursuit la saison des compétitions ! 💪`,
    contentEn: `🥇 **Gold medal** for Coach [@js_dionne](https://www.instagram.com/js_dionne/) at the **ADCC Open Toronto** in the **Absolute** category! 🔥

A dominant performance that once again confirms the exceptional caliber of our coach on the competitive scene.

Thank you to Citadelle Jiu-Jitsu students and training partners for the preparation — every session on the mat contributes to these victories.

📍 See you on the mats this week, the competition season continues! 💪`,
    imageUrl: "/images/dojo-time/ADCC Open Toronto.jpg",
    imagePosition: "top center",
    category: "COMPETITION" as const,
    status: "PUBLISHED" as const,
    publishedAt: new Date("2026-02-15"),
  },
  {
    slug: "ibjjf-open-montreal-mai-2026",
    titleFr: "IBJJF Open Montréal — Coach Max double médaillé d'or ! 🥇🥇",
    titleEn: "IBJJF Open Montreal — Coach Max Double Gold Medalist! 🥇🥇",
    excerptFr: "Deux médailles d'or pour Coach Max à l'IBJJF Open de Montréal — 3 victoires par soumission et 1 par points. Impressionnant !",
    excerptEn: "Two gold medals for Coach Max at the IBJJF Open in Montreal — 3 wins by submission and 1 by points. Impressive!",
    contentFr: `Félicitations à **Coach Max** pour ses deux **médailles d'or** 🥇🥇 à l'**IBJJF Open de Montréal** !

Un weekend exceptionnel avec des résultats qui parlent d'eux-mêmes :
- 3 victoires par **soumission**
- 1 victoire par **points**
- **2 catégories, 2 titres** 🏆

Une performance remarquable qui démontre la maîtrise technique et la condition physique de Coach Max au plus haut niveau.

Merci à tous les élèves de Citadelle Jiu-Jitsu ayant aidé à sa préparation. Ces victoires vous appartiennent aussi ! 💪🔥`,
    contentEn: `Congratulations to **Coach Max** for his two **gold medals** 🥇🥇 at the **IBJJF Open Montreal**!

An exceptional weekend with results that speak for themselves:
- 3 victories by **submission**
- 1 victory by **points**
- **2 categories, 2 titles** 🏆

A remarkable performance that demonstrates Coach Max's technical mastery and physical condition at the highest level.

Thank you to all Citadelle Jiu-Jitsu students who helped with his preparation. These victories belong to you too! 💪🔥`,
    imageUrl: "/images/dojo-time/CoachMAx ibjjf open MTL.jpg",
    imagePosition: "center 70%",
    category: "COMPETITION" as const,
    status: "PUBLISHED" as const,
    publishedAt: new Date("2026-05-19"),
  },
];

async function main() {
  console.log("[import-posts] début...");

  for (const post of posts) {
    await prisma.post.upsert({
      where: { slug: post.slug },
      update: post,
      create: post,
    });
    console.log(`[import-posts] ✓ ${post.titleFr}`);
  }

  console.log("[import-posts] terminé ✓");
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
