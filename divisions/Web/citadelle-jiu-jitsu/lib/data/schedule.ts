// =============================================================================
// Données fictives — Horaire des cours
// -----------------------------------------------------------------------------
// À déplacer en BD si le client veut éditer l'horaire depuis l'admin.
// =============================================================================

export type DayKey =
  | "monday"
  | "tuesday"
  | "wednesday"
  | "thursday"
  | "friday"
  | "saturday"
  | "sunday";

export interface ClassSlot {
  startTime: string; // "18:00"
  endTime: string; // "19:30"
  titleFr: string;
  titleEn: string;
  level: "ENFANT" | "DEBUTANT" | "INTERMEDIAIRE" | "AVANCE" | "TOUS";
  instructorSlug?: string;
}

export const weeklySchedule: Record<DayKey, ClassSlot[]> = {
  monday: [
    {
      startTime: "17:00",
      endTime: "18:00",
      titleFr: "Enfants (6-12 ans)",
      titleEn: "Kids (6-12)",
      level: "ENFANT",
      instructorSlug: "instructeur-junior",
    },
    {
      startTime: "18:30",
      endTime: "20:00",
      titleFr: "Adultes — Tous niveaux",
      titleEn: "Adults — All levels",
      level: "TOUS",
      instructorSlug: "maitre-fondateur",
    },
  ],
  tuesday: [
    {
      startTime: "18:30",
      endTime: "20:00",
      titleFr: "No-Gi avancé",
      titleEn: "No-Gi advanced",
      level: "AVANCE",
      instructorSlug: "instructeur-no-gi",
    },
  ],
  wednesday: [
    {
      startTime: "17:00",
      endTime: "18:00",
      titleFr: "Enfants (6-12 ans)",
      titleEn: "Kids (6-12)",
      level: "ENFANT",
      instructorSlug: "instructeur-junior",
    },
    {
      startTime: "18:30",
      endTime: "20:00",
      titleFr: "Débutants",
      titleEn: "Beginners",
      level: "DEBUTANT",
      instructorSlug: "maitre-fondateur",
    },
  ],
  thursday: [
    {
      startTime: "18:30",
      endTime: "20:00",
      titleFr: "Adultes — Tous niveaux",
      titleEn: "Adults — All levels",
      level: "TOUS",
      instructorSlug: "maitre-fondateur",
    },
  ],
  friday: [
    {
      startTime: "18:30",
      endTime: "20:00",
      titleFr: "Sparring libre",
      titleEn: "Open sparring",
      level: "INTERMEDIAIRE",
      instructorSlug: "instructeur-no-gi",
    },
  ],
  saturday: [
    {
      startTime: "10:00",
      endTime: "11:00",
      titleFr: "Enfants (6-12 ans)",
      titleEn: "Kids (6-12)",
      level: "ENFANT",
      instructorSlug: "instructeur-junior",
    },
    {
      startTime: "11:30",
      endTime: "13:00",
      titleFr: "Adultes — Tous niveaux",
      titleEn: "Adults — All levels",
      level: "TOUS",
      instructorSlug: "maitre-fondateur",
    },
  ],
  sunday: [],
};
