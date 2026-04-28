// =============================================================================
// Données fictives — Instructeurs
// -----------------------------------------------------------------------------
// À remplacer par les vrais profils + photos quand le client les fournit.
// =============================================================================

export interface Instructor {
  slug: string;
  nameFr: string;
  nameEn: string;
  beltFr: string;
  beltEn: string;
  yearsExperience: number;
  bioFr: string;
  bioEn: string;
  imageUrl?: string;
  specialtyFr: string;
  specialtyEn: string;
}

export const instructors: Instructor[] = [
  {
    slug: "maitre-fondateur",
    nameFr: "Maître Antoine Tremblay",
    nameEn: "Master Antoine Tremblay",
    beltFr: "Ceinture noire 3e degré",
    beltEn: "3rd degree black belt",
    yearsExperience: 22,
    bioFr:
      "Fondateur de la Citadelle, formé au Brésil sous la lignée Gracie Barra. Compétiteur national et instructeur certifié IBJJF.",
    bioEn:
      "Founder of the Citadelle, trained in Brazil under the Gracie Barra lineage. National competitor and IBJJF certified instructor.",
    specialtyFr: "Self-défense et compétition",
    specialtyEn: "Self-defense and competition",
  },
  {
    slug: "instructeur-junior",
    nameFr: "Marie-Pier Gagnon",
    nameEn: "Marie-Pier Gagnon",
    beltFr: "Ceinture noire 1er degré",
    beltEn: "1st degree black belt",
    yearsExperience: 12,
    bioFr:
      "Spécialiste des cours enfants. Médaillée nationale en jiu-jitsu féminin.",
    bioEn:
      "Specialist in kids' classes. National medalist in women's jiu-jitsu.",
    specialtyFr: "Cours enfants et jeunesse",
    specialtyEn: "Kids and youth classes",
  },
  {
    slug: "instructeur-no-gi",
    nameFr: "Karim Rachidi",
    nameEn: "Karim Rachidi",
    beltFr: "Ceinture marron",
    beltEn: "Brown belt",
    yearsExperience: 9,
    bioFr:
      "Spécialiste no-gi et grappling. Instructeur des séances avancées du soir.",
    bioEn:
      "No-gi and grappling specialist. Lead instructor for evening advanced sessions.",
    specialtyFr: "No-gi et grappling avancé",
    specialtyEn: "No-gi and advanced grappling",
  },
];
