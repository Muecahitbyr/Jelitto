/** Das Team der Fahrschule Jelitto */

export type TeamMember = { name: string; role: string; image: string }

export const team: TeamMember[] = [
  { name: "Berndt Gaugler", role: "Geschäftsführer, Fahrlehrer", image: "/images/team/berndt.webp" },
  { name: "Evelyn Jelitto", role: "Fahrlehrerin", image: "/images/team/evi.webp" },
  { name: "Timo Wassermann", role: "Fahrlehrer", image: "/images/team/timo.webp" },
  { name: "Anette Gaugler", role: "Fahrlehrerin", image: "/images/team/anette.webp" },
  { name: "Wolfgang Jelitto", role: "Fahrlehrer", image: "/images/team/wolfgang.webp" },
]

export const teamPhoto = { src: "/images/team.webp", alt: "Das Team der Fahrschule Jelitto vor der Fahrschule in Kaufbeuren" }
