// =============================================================================
// Script one-shot — Créer plusieurs articles Dojo Time
// -----------------------------------------------------------------------------
// Usage (depuis WSL, racine du projet) :
//   node scripts/create-posts-batch.js
// =============================================================================

const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const posts = [
  // ---------------------------------------------------------------------------
  // 1. Hub Grappling — double or, 9 mai 2026
  // ---------------------------------------------------------------------------
  {
    slug:        "hub-grappling-double-or-mai-2026",
    category:    "COMPETITION",
    status:      "PUBLISHED",
    publishedAt: new Date("2026-05-10T10:00:00-04:00"),
    // 📸 Remplacer par le vrai chemin quand JS envoie ses photos de podium
    imageUrl:    "/images/dojo-time/hub-grappling-mai-2026.jpg",

    titleFr: "🥇🥇 Double or au Hub Grappling Event — mai 2026",
    titleEn: "🥇🥇 Double gold at Hub Grappling Event — May 2026",

    excerptFr:
      "JS remporte deux catégories au Hub Grappling Event le 9 mai 2026. " +
      "Deux finales. Deux soumissions. Un message clair envoyé à tout le circuit canadien.",
    excerptEn:
      "JS wins two categories at the Hub Grappling Event on May 9, 2026. " +
      "Two finals. Two submissions. A clear message sent to the entire Canadian circuit.",

    contentFr: `## Deux catégories. Deux or. Zéro concession.

Le 9 mai 2026, Jean-Sébastien Dionne-Roy prenait le départ du Hub Grappling Event avec un objectif simple : soumettre. Il a tenu promesse — deux fois.

En remportant **deux catégories distinctes** lors du même événement, JS a démontré une polyvalence et une endurance qui distinguent les véritables compétiteurs d'élite. Ce n'est pas une question de chance. C'est le résultat de centaines d'heures de tatami, d'une stratégie affinée, et d'une mentalité de finisseur qui ne s'éteint jamais.

## 66 % de victoires par soumission — et ça continue

Cette performance s'inscrit dans une trajectoire cohérente : plus de **129 victoires en carrière**, dont **66 % par soumission**. JS ne joue pas pour les points. Il cherche la finition dès la première seconde, dans chaque position, contre chaque adversaire.

C'est ce qu'il enseigne à la Citadelle. Pas une imitation du jiu-jitsu — le vrai.

## La semaine suivante : East Coast Absolute

Une semaine après ce double or, JS remontait sur le tatami à l'East Coast Absolute pour y décrocher une troisième médaille d'or consécutive. La dynamique est lancée. Le classement national va suivre.

---

*Deux médailles. Une semaine. Le niveau de la Citadelle. 🏆*`,

    contentEn: `## Two categories. Two golds. Zero concessions.

On May 9, 2026, Jean-Sébastien Dionne-Roy entered the Hub Grappling Event with one simple goal: submit. He delivered — twice.

By winning **two separate categories** at the same event, JS demonstrated the versatility and endurance that separates true elite competitors from the rest. This isn't luck. It's the result of hundreds of hours on the mat, a refined strategy, and a finisher's mentality that never switches off.

## 66% of victories by submission — and counting

This performance is part of a consistent trajectory: over **129 career victories**, with **66% by submission**. JS doesn't play for points. He hunts the finish from the first second, in every position, against every opponent.

That's what he teaches at Citadelle. Not an imitation of jiu-jitsu — the real thing.

## The following week: East Coast Absolute

One week after this double gold, JS was back on the mat at the East Coast Absolute, where he claimed a third consecutive gold medal. The momentum is real. The national rankings will follow.

---

*Two medals. One week. The Citadelle standard. 🏆*`,

    externalUrl: "https://smoothcomp.com/en/profile/77192",
  },

  // ---------------------------------------------------------------------------
  // 2. ADCC Calgary Open — médaille d'argent, avril 2026
  // ---------------------------------------------------------------------------
  {
    slug:        "adcc-calgary-open-argent-avril-2026",
    category:    "COMPETITION",
    status:      "PUBLISHED",
    publishedAt: new Date("2026-04-28T10:00:00-04:00"),
    // 📸 Remplacer par le vrai chemin quand JS envoie ses photos de podium
    imageUrl:    "/images/dojo-time/calgary-open-avril-2026.jpg",

    titleFr: "🥈 Médaille d'argent à l'ADCC Canada Calgary Open — avril 2026",
    titleEn: "🥈 Silver medal at ADCC Canada Calgary Open — April 2026",

    excerptFr:
      "JS prend l'argent à Calgary dans l'un des tournois ADCC les plus relevés du circuit canadien. " +
      "Une performance qui consolide sa position de #2 au classement national.",
    excerptEn:
      "JS takes silver in Calgary at one of the most competitive ADCC events on the Canadian circuit. " +
      "A performance that solidifies his #2 ranking nationally.",

    contentFr: `## Calgary : un tournoi, un message

En avril 2026, Jean-Sébastien Dionne-Roy prenait l'avion pour Calgary afin de participer à l'**ADCC Canada Calgary Open** — l'un des tournois les plus relevés du circuit national. Il en est revenu avec une **médaille d'argent** et des points précieux au classement ADCC.

L'ADCC (Abu Dhabi Combat Club) est l'organisation de grappling la plus prestigieuse au monde. Ses classements régionaux servent de qualification pour les championnats mondiaux. Chaque point gagné compte.

## Le contexte du classement

À ce moment-là, JS pointait déjà dans le top 5 canadien. Cette médaille d'argent à Calgary lui permettait de consolider sa position et de confirmer sa régularité au plus haut niveau national.

Aujourd'hui, avec ses performances de mai (double or Hub Grappling, or East Coast Absolute), il est **#2 au Canada** avec **47 points** — et deux médailles d'or encore en attente de comptabilisation.

## La discipline comme moteur

Aller compétitionner à Calgary ce n'est pas anodin. C'est du temps, de l'énergie, de la préparation. C'est le choix d'un athlète qui ne se contente pas d'enseigner le jiu-jitsu — il le vit, le test, et le ramène bonifié à chaque cours.

---

*L'argent à Calgary. L'or à venir. 🥈*`,

    contentEn: `## Calgary: one tournament, one statement

In April 2026, Jean-Sébastien Dionne-Roy flew to Calgary to compete at the **ADCC Canada Calgary Open** — one of the most competitive events on the national circuit. He came back with a **silver medal** and valuable points in the ADCC rankings.

The ADCC (Abu Dhabi Combat Club) is the most prestigious grappling organization in the world. Its regional rankings serve as qualifications for the World Championships. Every point earned counts.

## The ranking context

At that point, JS was already in the Canadian top 5. This silver medal in Calgary allowed him to solidify his position and confirm his consistency at the highest national level.

Today, with his May performances (double gold Hub Grappling, gold East Coast Absolute), he sits at **#2 in Canada** with **47 points** — and two more gold medals still pending tabulation.

## Discipline as a driver

Competing in Calgary isn't a small thing. It takes time, energy, and preparation. It's the choice of an athlete who doesn't just teach jiu-jitsu — he lives it, tests it, and brings it back to every class, refined.

---

*Silver in Calgary. Gold to follow. 🥈*`,

    externalUrl: "https://smoothcomp.com/en/profile/77192",
  },

  // ---------------------------------------------------------------------------
  // 3. Ouverture officielle de Citadelle Jiu-Jitsu
  // ---------------------------------------------------------------------------
  {
    slug:        "ouverture-citadelle-jiu-jitsu-quebec",
    category:    "ANNOUNCEMENT",
    status:      "PUBLISHED",
    publishedAt: new Date("2026-04-01T09:00:00-04:00"),

    titleFr: "🏯 Citadelle Jiu-Jitsu ouvre ses portes à Québec",
    titleEn: "🏯 Citadelle Jiu-Jitsu opens its doors in Québec City",

    excerptFr:
      "Après des années de compétition au plus haut niveau, Jean-Sébastien Dionne-Roy fonde " +
      "Citadelle Jiu-Jitsu à Québec. Un dojo pour tous — débutants, pratiquants et compétiteurs.",
    excerptEn:
      "After years of competing at the highest level, Jean-Sébastien Dionne-Roy founds " +
      "Citadelle Jiu-Jitsu in Québec City. A dojo for everyone — beginners, regulars, and competitors.",

    contentFr: `## Un projet de longue haleine

Ceinture noire de jiu-jitsu brésilien. Compétiteur parmi les meilleurs du Canada. Formé au Tristar Gym aux côtés de l'élite mondiale. Après des années à perfectionner son art, Jean-Sébastien Dionne-Roy franchit une nouvelle étape : **ouvrir son propre dojo à Québec**.

Citadelle Jiu-Jitsu n'est pas un gym de plus. C'est un espace pensé pour transmettre un jiu-jitsu intelligent, rigoureux, et authentiquement compétitif — dans une atmosphère où chaque élève est respecté et poussé à devenir meilleur.

## Pour qui ?

Le dojo accueille **tous les niveaux** :

- **Les débutants** qui n'ont jamais mis le pied sur un tatami et qui veulent découvrir un art martial efficace, complet, et intellectuellement stimulant.
- **Les pratiquants** qui cherchent un environnement sérieux pour progresser régulièrement et consolider leurs bases.
- **Les compétiteurs** qui veulent s'entraîner avec un instructeur qui vit lui-même la compétition au niveau national.

## La philosophie de la Citadelle

*« Le tatami est un miroir. Chaque entraînement révèle qui tu es — et qui tu peux devenir. »*

Le jiu-jitsu n'est pas qu'un sport de combat. C'est un système qui développe la discipline, la stratégie, la persévérance et le respect — des qualités qui dépassent largement les murs du dojo.

## Première séance d'essai gratuite

Curieux ? La première séance est offerte, sans engagement. Viens voir par toi-même ce que le jiu-jitsu peut apporter à ta vie.

---

*Bienvenue à la Citadelle. 🏯*`,

    contentEn: `## A long-held vision

Brazilian jiu-jitsu black belt. One of Canada's top competitors. Trained at Tristar Gym alongside the world's elite. After years of perfecting his craft, Jean-Sébastien Dionne-Roy takes the next step: **opening his own dojo in Québec City**.

Citadelle Jiu-Jitsu isn't just another gym. It's a space designed to pass on intelligent, rigorous, and authentically competitive jiu-jitsu — in an environment where every student is respected and pushed to become better.

## Who is it for?

The dojo welcomes **all levels**:

- **Beginners** who have never set foot on a mat and want to discover an effective, well-rounded, and intellectually stimulating martial art.
- **Regular practitioners** who are looking for a serious environment to progress consistently and solidify their fundamentals.
- **Competitors** who want to train with an instructor who actively competes at the national level himself.

## The Citadelle philosophy

*"The mat is a mirror. Every training session reveals who you are — and who you can become."*

Jiu-jitsu is more than a combat sport. It's a system that develops discipline, strategy, perseverance and respect — qualities that extend far beyond the walls of the dojo.

## First trial class is free

Curious? Your first class is on the house, no commitment. Come see for yourself what jiu-jitsu can bring to your life.

---

*Welcome to the Citadelle. 🏯*`,

    externalUrl: null,
  },

  // ---------------------------------------------------------------------------
  // 4. Pourquoi commencer le BJJ — article communauté
  // ---------------------------------------------------------------------------
  {
    slug:        "pourquoi-commencer-bjj-quebec",
    category:    "COMMUNITY",
    status:      "PUBLISHED",
    publishedAt: new Date("2026-04-15T09:00:00-04:00"),

    titleFr: "5 raisons de commencer le jiu-jitsu brésilien — peu importe ton âge",
    titleEn: "5 reasons to start Brazilian jiu-jitsu — no matter your age",

    excerptFr:
      "Trop vieux ? Pas assez athlétique ? Pas le temps ? On entend ces objections chaque semaine. " +
      "Voici pourquoi le BJJ est fait pour toi — exactement comme tu es.",
    excerptEn:
      "Too old? Not athletic enough? Not enough time? We hear these objections every week. " +
      "Here's why BJJ is made for you — exactly as you are.",

    contentFr: `## Le jiu-jitsu n'est pas réservé aux athlètes d'élite

C'est probablement la plus grande idée reçue sur le jiu-jitsu brésilien. On s'imagine des combattants UFC, des corps sculptés, des gens qui ont commencé enfants. La réalité sur le tatami est très différente : le BJJ est l'un des arts martiaux les plus accessibles qui soient — parce qu'il valorise l'intelligence, la technique et la stratégie sur la force brute.

Voici 5 raisons concrètes de franchir la porte d'un dojo.

## 1. La technique bat la force

Le jiu-jitsu a été conçu pour permettre à une personne plus petite ou plus faible de contrôler et soumettre un adversaire plus grand et plus fort — grâce à des leviers, des angles et des positions. Tu n'as pas besoin d'être fort pour commencer. Tu as besoin d'apprendre.

## 2. C'est un entraînement complet

Une séance de BJJ travaille la force, l'endurance, la flexibilité, la coordination et la prise de décision en temps réel. C'est une heure qui remplace plusieurs entraînements distincts — et c'est rarement ennuyeux.

## 3. Ça développe la résilience mentale

Chaque roulade (sparring) est une mini-leçon de gestion du stress. Tu apprends à rester calme sous pression, à analyser plutôt que paniquer, à chercher une solution même quand tu es dans une position difficile. Ces réflexes se transfèrent dans la vie quotidienne.

## 4. C'est une vraie communauté

Sur le tatami, les égos se mettent vite de côté. Tu vas t'entraîner avec des avocats, des infirmières, des étudiants, des parents. Ce que vous partagez, c'est l'humilité d'apprendre ensemble. Le dojo devient rapidement une famille.

## 5. Il n'est jamais trop tard pour commencer

Des milliers de personnes commencent le BJJ après 30, 40, voire 50 ans. La progression est personnelle. Tu vas à ton rythme, tu t'améliores à chaque séance, et tu découvres des capacités que tu ne te connaissais pas.

---

**La première séance à la Citadelle est gratuite.** Pas d'engagement, pas de pression. Juste une invitation à découvrir ce que le jiu-jitsu peut faire pour toi.`,

    contentEn: `## Jiu-jitsu isn't just for elite athletes

That's probably the biggest misconception about Brazilian jiu-jitsu. People imagine UFC fighters, sculpted physiques, people who started as kids. The reality on the mat is very different: BJJ is one of the most accessible martial arts there is — because it values intelligence, technique and strategy over raw strength.

Here are 5 concrete reasons to walk through a dojo's door.

## 1. Technique beats strength

Jiu-jitsu was designed to allow a smaller or weaker person to control and submit a larger, stronger opponent — through leverage, angles and positioning. You don't need to be strong to start. You need to learn.

## 2. It's a complete workout

A BJJ session works strength, endurance, flexibility, coordination and real-time decision-making. It's one hour that replaces several separate workouts — and it's rarely boring.

## 3. It builds mental resilience

Every roll (sparring round) is a mini-lesson in stress management. You learn to stay calm under pressure, to analyze rather than panic, to find a solution even when you're in a tough position. These reflexes transfer directly into everyday life.

## 4. It's a real community

On the mat, egos get checked quickly. You'll train with lawyers, nurses, students, parents. What you share is the humility of learning together. The dojo quickly becomes a family.

## 5. It's never too late to start

Thousands of people start BJJ after 30, 40, even 50 years old. Progress is personal. You go at your own pace, you improve with every session, and you discover abilities you didn't know you had.

---

**Your first class at Citadelle is free.** No commitment, no pressure. Just an invitation to discover what jiu-jitsu can do for you.`,

    externalUrl: null,
  },
];

async function main() {
  console.log(`[batch] Création de ${posts.length} articles…\n`);

  for (const data of posts) {
    const post = await prisma.post.upsert({
      where:  { slug: data.slug },
      update: {},
      create: data,
    });
    console.log(`✅ ${post.slug} [${post.status}]`);
  }

  console.log("\n[batch] Terminé ✓");
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });
