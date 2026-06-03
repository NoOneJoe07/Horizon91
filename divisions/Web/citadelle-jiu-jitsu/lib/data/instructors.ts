// =============================================================================
// Données instructeurs — Citadelle Jiu-Jitsu
// -----------------------------------------------------------------------------
// Le fondateur est le seul instructeur confirmé pour l'instant.
// Nom, bio, photo, grade exact, années → à remplacer avec le vrai contenu
// quand le client envoie son historique.
// =============================================================================

export interface Achievement {
  titleFr: string;
  titleEn: string;
  year?: number;
}

export interface InstructorStat {
  value: string;
  labelFr: string;
  labelEn: string;
}

export interface Instructor {
  slug: string;
  /** Vrai nom à mettre à jour quand le client l'envoie */
  nameFr: string;
  nameEn: string;
  titleFr: string;
  titleEn: string;
  beltFr: string;
  beltEn: string;
  yearsExperience: number;
  bioFr: string;
  bioEn: string;
  /** Portrait principal — utilisé dans le coach spotlight de l'accueil */
  imageUrl?: string;
  /** Photo officielle gi — utilisée sur la page Instructeurs */
  imageUrlGi?: string;
  specialtyFr: string;
  specialtyEn: string;
  isFounder?: boolean;
  achievements?: Achievement[];
  stats?: InstructorStat[];
  philosophyFr?: string;
  philosophyEn?: string;
}

// -----------------------------------------------------------------------------
// Fondateur — PLACEHOLDER en attente du vrai contenu client
// Tout ce qui est marqué "← À remplacer" doit être mis à jour dès réception
// -----------------------------------------------------------------------------
const founder: Instructor = {
  slug: "fondateur",
  nameFr: "Jean-Sébastien Dionne-Roy",
  nameEn: "Jean-Sébastien Dionne-Roy",
  titleFr: "Fondateur & Instructeur en chef",
  titleEn: "Founder & Head Instructor",
  beltFr: "Ceinture noire — Jiu-Jitsu Brésilien",
  beltEn: "Black Belt — Brazilian Jiu-Jitsu",
  yearsExperience: 20,

  // ── Bio FR ──────────────────────────────────────────────────────────────────
  // Mis à jour juin 2026 — contenu fourni directement par JS, enrichi
  bioFr:
    "Jean-Sébastien Dionne-Roy est ceinture noire de jiu-jitsu brésilien sous Firas Zahabi — " +
    "l'entraîneur-chef légendaire et propriétaire du Tristar Gym de Montréal, " +
    "mondialement reconnu pour avoir guidé Georges St-Pierre, Rory MacDonald " +
    "et de nombreux combattants de l'UFC et des arts martiaux mixtes professionnels " +
    "vers les plus hautes sphères de leur discipline. " +
    "Jean-Sébastien est le seul gradé ceinture noire sous Zahabi dans la région de Québec — " +
    "une filiation rare qui définit la qualité et l'authenticité de l'enseignement offert chez Citadelle Jiu-Jitsu.\n\n" +
    "Fort de 20 ans d'expérience en arts martiaux, il enseigne depuis 10 ans " +
    "et évolue comme compétiteur actif depuis environ 15 ans. " +
    "Avec un palmarès construit sur les scènes provinciale, nationale et internationale, " +
    "il fait partie de l'élite canadienne dans sa catégorie.\n\n" +
    "Comme entraîneur, il a guidé une clientèle diversifiée vers leur plein potentiel : " +
    "membres des forces de l'ordre, compétiteurs de tous niveaux évoluant dans différentes " +
    "organisations de jiu-jitsu sportif, et combattants d'arts martiaux mixtes — " +
    "de la scène amateur locale jusqu'aux organisations professionnelles internationales, dont l'UFC.\n\n" +
    "Chez Citadelle Jiu-Jitsu, les élèves ont la chance de bénéficier d'un enseignement " +
    "de haut niveau, personnalisé aux besoins de chacun — " +
    "que vous soyez débutant curieux, pratiquant assidu ou compétiteur ambitieux.",

  // ── Bio EN ──────────────────────────────────────────────────────────────────
  bioEn:
    "Jean-Sébastien Dionne-Roy holds a Brazilian jiu-jitsu black belt under Firas Zahabi — " +
    "the legendary head coach and owner of Tristar Gym in Montréal, " +
    "world-renowned for guiding Georges St-Pierre, Rory MacDonald, " +
    "and numerous fighters to the highest levels of the UFC and professional mixed martial arts. " +
    "Jean-Sébastien is the only black belt under Zahabi in the Québec City region — " +
    "a rare lineage that defines the quality and authenticity of the instruction offered at Citadelle Jiu-Jitsu.\n\n" +
    "With 20 years of martial arts experience, 10 years of coaching, " +
    "and approximately 15 years as an active competitor, " +
    "he is part of the Canadian elite in his division, " +
    "having competed and won events at the provincial, national and international level.\n\n" +
    "As a coach, Jean-Sébastien has helped a diverse range of athletes reach their full potential: " +
    "law enforcement professionals, competitors at every level across multiple jiu-jitsu organizations, " +
    "and MMA fighters — from the local amateur scene all the way to professional international " +
    "organizations, including the UFC.\n\n" +
    "At Citadelle Jiu-Jitsu, students benefit from high-level, personalized instruction " +
    "tailored to each individual's goals — whether you are a curious beginner, " +
    "a dedicated practitioner, or an ambitious competitor.",

  imageUrl:   "/images/JS_Dionne_and_co/_MG_3524-Enhanced-NR.jpg",
  imageUrlGi: "/images/JS_Dionne_and_co/_MG_3545-Enhanced-NR.jpg",
  specialtyFr: "BJJ gi & no-gi — Compétition, self-défense et MMA",
  specialtyEn: "BJJ gi & no-gi — Competition, self-defense and MMA",
  isFounder: true,
  philosophyFr:
    "« Le tatami est un miroir. Chaque entraînement révèle qui tu es — et qui tu peux devenir. »",
  philosophyEn:
    "« The mat is a mirror. Every training session reveals who you are — and who you can become. »",
  achievements: [
    {
      titleFr: "🥋 Ceinture noire sous Firas Zahabi — Tristar Gym, Montréal",
      titleEn: "🥋 Black belt under Firas Zahabi — Tristar Gym, Montréal",
    },
    {
      titleFr: "⭐ Seul gradé ceinture noire sous Zahabi dans la région de Québec",
      titleEn: "⭐ Only Zahabi black belt in the Québec City region",
    },
  ],
  stats: [
    { value: "🥋",  labelFr: "Ceinture noire sous Firas Zahabi",              labelEn: "Black belt under Firas Zahabi"              },
    { value: "12",  labelFr: "ans d'expérience en compétition internationale", labelEn: "years of international competition"          },
    { value: "20",  labelFr: "ans d'expérience en arts martiaux",              labelEn: "years of martial arts experience"            },
    { value: "10",  labelFr: "ans d'enseignement",                             labelEn: "years of coaching"                          },
  ],
};

export const instructors: Instructor[] = [founder];
