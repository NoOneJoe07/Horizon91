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
  yearsExperience: 15,
  bioFr:
    "Ceinture noire de jiu-jitsu brésilien, Jean-Sébastien Dionne-Roy est l'un des grapplers " +
    "les plus actifs et les plus dominants au Canada. Avec plus de 129 victoires en compétition — " +
    "dont 66 % par soumission — il porte la signature d'un vrai finisseur : il ne gagne pas aux points, " +
    "il soumet. Actuellement #2 au Canada au ADCC Top Men Rankings 2025-2026, " +
    "avec deux médailles d'or consécutives (Hub Grappling le 9 mai et East Coast Absolute le 17 mai 2026) " +
    "en attente de comptabilisation — sa progression vers le sommet du classement national est en marche. " +
    "Il a forgé son art aux côtés de l'élite mondiale, notamment au Tristar Gym de Montréal " +
    "où il a partagé le tatami avec des légendes du sport, dont Georges St-Pierre. " +
    "Fondateur de Citadelle Jiu-Jitsu à Québec, il transmet aujourd'hui cette intelligence, " +
    "cette rigueur et cet esprit compétitif avec bienveillance — " +
    "que vous soyez débutant curieux, pratiquant assidu ou compétiteur ambitieux.",
  bioEn:
    "A Brazilian jiu-jitsu black belt and one of the most active and dominant grapplers in Canada, " +
    "Jean-Sébastien Dionne-Roy has recorded over 129 competition victories — 66% by submission. " +
    "He doesn't win on points. He finishes. " +
    "Currently ranked #2 in Canada in the ADCC Top Men Rankings 2025-2026, " +
    "with two consecutive gold medals (Hub Grappling May 9th and East Coast Absolute May 17th, 2026) " +
    "pending official tabulation — his climb to the top of the national rankings is well underway. " +
    "He has sharpened his craft alongside the world's elite, including training sessions at Tristar Gym in Montréal " +
    "where he shared the mat with legends of the sport, including Georges St-Pierre. " +
    "As founder of Citadelle Jiu-Jitsu in Québec City, he now channels that same intelligence, " +
    "rigor and competitive fire into every class he teaches — " +
    "whether you're a curious beginner, a dedicated practitioner, or an ambitious competitor.",
  imageUrl:   "/images/JS_Dionne_and_co/_MG_3524-Enhanced-NR.jpg",
  imageUrlGi: "/images/JS_Dionne_and_co/_MG_3545-Enhanced-NR.jpg",
  specialtyFr: "BJJ gi & no-gi — Compétition et self-défense",
  specialtyEn: "BJJ gi & no-gi — Competition and self-defense",
  isFounder: true,
  philosophyFr:
    "« Le tatami est un miroir. Chaque entraînement révèle qui tu es — et qui tu peux devenir. »",
  philosophyEn:
    "« The mat is a mirror. Every training session reveals who you are — and who you can become. »",
  achievements: [
    {
      titleFr: "129+ victoires en compétition — 66 % par soumission",
      titleEn: "129+ competition victories — 66% by submission",
    },
    {
      titleFr: "🏆 #2 au Canada — ADCC Top Men Rankings 2025-2026",
      titleEn: "🏆 #2 in Canada — ADCC Top Men Rankings 2025-2026",
    },
    {
      titleFr: "🥇 Médaille d'or — East Coast Absolute, mai 2026",
      titleEn: "🥇 Gold medal — East Coast Absolute, May 2026",
    },
    {
      titleFr: "🥇 Double médaille d'or — Hub Grappling, mai 2026",
      titleEn: "🥇 Double gold — Hub Grappling Event, May 2026",
    },
    {
      titleFr: "🥈 Médaille d'argent — ADCC Canada Calgary Open, avril 2026",
      titleEn: "🥈 Silver medal — ADCC Canada Calgary Open, April 2026",
    },
    {
      titleFr: "Formé au Tristar Gym — a roulé avec Georges St-Pierre",
      titleEn: "Trained at Tristar Gym — rolled with Georges St-Pierre",
    },
    {
      titleFr: "Fondateur de Citadelle Jiu-Jitsu — Québec",
      titleEn: "Founder of Citadelle Jiu-Jitsu — Québec City",
    },
  ],
  stats: [
    { value: "#2",   labelFr: "au Canada — ADCC 2025-2026", labelEn: "in Canada — ADCC 2025-2026" },
    { value: "129+", labelFr: "victoires en compétition",  labelEn: "competition victories"      },
    { value: "66%",  labelFr: "par soumission",            labelEn: "by submission"              },
    { value: "15+",  labelFr: "ans sur le tatami",         labelEn: "years on the mat"           },
  ],
};

export const instructors: Instructor[] = [founder];
