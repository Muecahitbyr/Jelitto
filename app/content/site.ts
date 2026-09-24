/**
 * Zentrale Stammdaten der Fahrschule. Adresse, Zeiten, Kontakt und Neuigkeiten
 * werden überall auf der Website aus dieser Datei gelesen.
 */

export const site = {
  name: "Fahrschule Jelitto",
  claim: "…dein Weg zum Führerschein!",
  owner: "Berndt Gaugler",
  url: "https://fahrschule-jelitto.com",
  address: {
    street: "Alte Weberei 12",
    zip: "87600",
    city: "Kaufbeuren",
  },
  phone: { display: "0171 1977876", href: "tel:+491711977876", international: "+491711977876" },
  email: "info@fahrschule-jelitto.com",
  facebook: "https://www.facebook.com/Fahrschule-Jelitto-212207898951645/",
  hours: {
    office: "Mo./Di./Mi./Do. 18:30 – 19:00 Uhr",
    theory: "Mo./Di./Mi./Do. 19:00 – 20:30 Uhr",
    openingAndRegistration: "Mo./Di./Mi./Do. 18:30 – 20:30 Uhr",
    theoryDays: ["Montag", "Dienstag", "Mittwoch", "Donnerstag"],
    theoryTime: "19:00 – 20:30 Uhr",
    registrationFrom: "18:30 Uhr",
  },
  maps: {
    embed:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d473.0094026617964!2d10.622844244143783!3d47.8832592764595!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x479c6b66e6297d8f%3A0xb7317708a98bd4b!2sFahrschule%20Jelitto!5e0!3m2!1sde!2sde!4v1658244875501!5m2!1sde!2sde",
    link: "https://www.google.com/maps/search/?api=1&query=Fahrschule+Jelitto+Alte+Weberei+12+87600+Kaufbeuren",
    lat: 47.8832592764595,
    lng: 10.622844244143783,
  },
  downloads: {
    anmeldung: "/downloads/Anmeldung.pdf",
    begriffliste: "/downloads/Begriffliste-fuer-Praktische-Pruefung.pdf",
  },
  partner: { name: "Verlag Heinrich Vogel", url: "https://www.springerfachmedien-muenchen.de/" },
  pricesAsOf: "18. August 2026",
} as const

/** „Neuigkeiten“-Box der Startseite. Leeres `items`-Array blendet die Box aus. */
export const news = {
  title: "Nächster Klasse A spezifischer Theorieunterricht:",
  items: ["21.08. 17:00 – 20:00 Uhr Thema 1 & 2", "22.08. 09:00 – 12:00 Uhr Thema 3 & 4"],
}

export type NavItem = { label: string; to: string }

export const mainNav: NavItem[] = [
  { label: "Startseite", to: "/" },
  { label: "Info", to: "/info" },
  { label: "Unterricht", to: "/unterricht" },
  { label: "Team", to: "/team" },
  { label: "Klassen", to: "/klassen" },
  { label: "Preise", to: "/preise" },
  { label: "Anmeldung", to: "/anmeldung" },
]

export const footerPages: NavItem[] = [
  { label: "B196", to: "/b196" },
  { label: "B197", to: "/b197" },
  { label: "Begleitetes Fahren ab 17", to: "/begleitetes-fahren" },
  { label: "Impressum", to: "/impressum" },
  { label: "Datenschutz", to: "/datenschutz" },
  { label: "AGB", to: "/agb" },
  { label: "Info", to: "/info" },
  { label: "Klassen", to: "/klassen" },
  { label: "Preise", to: "/preise" },
  { label: "Startseite", to: "/" },
  { label: "Team", to: "/team" },
  { label: "Unterricht", to: "/unterricht" },
]
