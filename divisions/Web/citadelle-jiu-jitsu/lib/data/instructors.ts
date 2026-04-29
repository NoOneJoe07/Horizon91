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
  nameFr: "Fondateur — Nom à venir",       // ← À remplacer
  nameEn: "Founder — Name coming soon",
  titleFr: "Fondateur & Instructeur en chef",
  titleEn: "Founder & Head Instructor",
  beltFr: "Ceinture noire",                // ← Préciser degré quand disponible
  beltEn: "Black belt",
  yearsExperience: 15,                     // ← Ajuster avec les vraies années
  bioFr:
    "Un parcours d'exception forgé sur les tatamis du monde entier. " +
    "La biographie complète du fondateur sera publiée prochainement — " +
    "une histoire qui se raconte mieux en personne.",
  bioEn:
    "An exceptional journey forged on mats around the world. " +
    "The founder's full biography will be published soon — " +
    "a story best told in person.",
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
    { value: "Top 5", labelFr: "au Canada", labelEn: "in Canada" },
    { value: "Intl.", labelFr: "compétiteur", labelEn: "competitor" },
    { value: "Houston", labelFr: "formation élite", labelEn: "elite training" },
    { value: "15+", labelFr: "ans de pratique", labelEn: "years of practice" },
  ],
};

export const instructors: Instructor[] = [founder];
