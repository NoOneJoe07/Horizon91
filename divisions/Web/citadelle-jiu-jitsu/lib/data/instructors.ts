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
  /** Chemin dans /public — laisser undefined tant que le client n'a pas fourni la photo */
  imageUrl?: string;
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
  nameFr: "Jean-Sébastien Dionne",
  nameEn: "Jean-Sébastien Dionne",
  titleFr: "Fondateur & Instructeur en chef",
  titleEn: "Founder & Head Instructor",
  beltFr: "Ceinture noire",                // ← Préciser degré quand disponible
  beltEn: "Black belt",
  yearsExperience: 15,
  bioFr:
    "Avec plus de 15 ans de pratique du jiu-jitsu brésilien, dont 12 ans dans le milieu de la compétition " +
    "et 10 ans comme entraîneur, Jean-Sébastien Dionne a forgé son art sur les tatamis du monde entier. " +
    "Compétiteur de calibre national, il a atteint le Top 5 canadien et s'est illustré sur la scène internationale, " +
    "notamment lors de formations d'élite à Houston, Texas. " +
    "Fondateur de Citadelle Jiu-Jitsu, il transmet aujourd'hui sa passion avec rigueur et bienveillance — " +
    "que vous soyez débutant curieux, pratiquant assidu ou compétiteur ambitieux.",
  bioEn:
    "With over 15 years of Brazilian jiu-jitsu practice, including 12 years competing at a high level " +
    "and 10 years as a coach, Jean-Sébastien Dionne has honed his craft on mats around the world. " +
    "A national-level competitor, he has reached the Top 5 in Canada and distinguished himself internationally, " +
    "including elite training in Houston, Texas. " +
    "As founder of Citadelle Jiu-Jitsu, he now shares his passion with rigor and care — " +
    "whether you're a curious beginner, a dedicated practitioner, or an ambitious competitor.",
  specialtyFr: "BJJ gi & no-gi — Compétition et self-défense",
  specialtyEn: "BJJ gi & no-gi — Competition and self-defense",
  isFounder: true,
  philosophyFr:
    "« Le tatami est un miroir. Chaque entraînement révèle qui tu es — et qui tu peux devenir. »",
  philosophyEn:
    "« The mat is a mirror. Every training session reveals who you are — and who you can become. »",
  achievements: [
    {
      titleFr: "Top 5 canadien — classement national BJJ",
      titleEn: "Top 5 in Canada — national BJJ ranking",
    },
    {
      titleFr: "Compétiteur international — podiums à l'échelle mondiale",
      titleEn: "International competitor — podium finishes worldwide",
    },
    {
      titleFr: "Formation avec l'élite mondiale à Houston, Texas",
      titleEn: "Trained alongside world's elite in Houston, Texas",
    },
    {
      titleFr: "Fondateur de Citadelle Jiu-Jitsu — Québec",
      titleEn: "Founder of Citadelle Jiu-Jitsu — Québec City",
    },
  ],
  stats: [
    { value: "15+", labelFr: "ans de pratique", labelEn: "years of practice" },
    { value: "12",  labelFr: "ans en compétition", labelEn: "years competing" },
    { value: "10",  labelFr: "ans comme entraîneur", labelEn: "years coaching" },
    { value: "Top 5", labelFr: "au Canada", labelEn: "in Canada" },
  ],
};

export const instructors: Instructor[] = [founder];
