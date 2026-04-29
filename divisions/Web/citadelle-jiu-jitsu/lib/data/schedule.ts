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
      startTime: "12:00",
      endTime: "13:30",
      titleFr: "Cours du midi — Tous niveaux",
      titleEn: "Noon class — All levels",
      level: "TOUS",
    },
    {
      startTime: "19:00",
      endTime: "21:00",
      titleFr: "Cours du soir — Tous niveaux",
      titleEn: "Evening class — All levels",
      level: "TOUS",
    },
  ],
  tuesday: [
    {
      startTime: "12:00",
      endTime: "13:30",
      titleFr: "Cours du midi — Tous niveaux",
      titleEn: "Noon class — All levels",
      level: "TOUS",
    },
    {
      startTime: "19:00",
      endTime: "21:00",
      titleFr: "Cours du soir — Tous niveaux",
      titleEn: "Evening class — All levels",
      level: "TOUS",
    },
  ],
  wednesday: [
    {
      startTime: "12:00",
      endTime: "13:30",
      titleFr: "Cours du midi — Tous niveaux",
      titleEn: "Noon class — All levels",
      level: "TOUS",
    },
    {
      startTime: "16:30",
      endTime: "18:00",
      titleFr: "Nouveau cours (à confirmer)",
      titleEn: "New class (to be confirmed)",
      level: "TOUS",
    },
    {
      startTime: "19:00",
      endTime: "21:00",
      titleFr: "Cours du soir — Tous niveaux",
      titleEn: "Evening class — All levels",
      level: "TOUS",
    },
  ],
  thursday: [
    {
      startTime: "12:00",
      endTime: "13:30",
      titleFr: "Cours du midi — Tous niveaux",
      titleEn: "Noon class — All levels",
      level: "TOUS",
    },
    {
      startTime: "19:00",
      endTime: "21:00",
      titleFr: "Cours du soir — Tous niveaux",
      titleEn: "Evening class — All levels",
      level: "TOUS",
    },
  ],
  friday: [
    {
      startTime: "12:00",
      endTime: "13:30",
      titleFr: "Cours du midi — Tous niveaux",
      titleEn: "Noon class — All levels",
      level: "TOUS",
    },
    {
      startTime: "18:00",
      endTime: "19:00",
      titleFr: "Open Mat",
      titleEn: "Open Mat",
      level: "TOUS",
    },
  ],
  saturday: [
    {
      startTime: "11:00",
      endTime: "12:30",
      titleFr: "Cours du weekend — Tous niveaux",
      titleEn: "Weekend class — All levels",
      level: "TOUS",
    },
  ],
  sunday: [
    {
      startTime: "11:00",
      endTime: "12:30",
      titleFr: "Cours du weekend — Tous niveaux",
      titleEn: "Weekend class — All levels",
      level: "TOUS",
    },
  ],
};
