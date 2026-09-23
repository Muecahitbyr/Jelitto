/**
 * Alle Führerscheinklassen inkl. Preise. Die Preisübersicht (/preise), die
 * Klassenübersicht und jede Klassenseite lesen aus dieser einen Quelle –
 * ein Preis muss also nur hier geändert werden.
 */

export type Category = "auto" | "zweirad"

export type SpecialDrives = {
  ueberland: number
  autobahn: number
  nacht: number
  /** Preis je Sonderfahrt */
  price: number
}

export type Fees = {
  grundbetrag: number
  grundbetragErweiterung?: number
  lehrmaterial?: number
  lehrmaterialLabel?: string
  uebungsfahrt?: number
  sonderfahrten?: SpecialDrives
  testfahrt?: number
  theoriepruefung?: number
  praktischePruefung?: number
}

export type SpecGroup = { title?: string; items: string[] }
export type Highlight = { title: string; text: string[] }
export type InfoSection = { title: string; items: { title?: string; text?: string[]; list?: string[] }[] }

export type LicenseClass = {
  slug: string
  path: string
  code: string
  navLabel: string
  shortName: string
  category: Category
  title: string
  summary: string
  seo: { title: string; description: string }
  ageBadge?: string
  minAge?: { value: string; label?: string }[]
  intro?: string[]
  specs?: SpecGroup[]
  notes?: string[]
  highlights?: Highlight[]
  sections?: InfoSection[]
  theory?: string
  fees?: Fees
  /** Paketpreis statt Einzelpositionen (B196) */
  pricePackage?: string[]
  showLessonNote?: boolean
  related?: { label: string; to: string }
  image: string
  imageAlt: string
  /** CSS object-position für den Bildausschnitt */
  imagePosition?: string
  /** Karten-/Teaserbild (hochkant) */
  cardImage?: string
  gallery?: { src: string; alt: string; caption?: string }[]
}

export const classes: LicenseClass[] = [
  {
    slug: "b-b17",
    path: "/klassen/b-b17",
    code: "B",
    navLabel: "B / B17 / BA",
    shortName: "Klasse B, B17 und BA",
    category: "auto",
    title: "Führerschein Klasse B & B17 in Kaufbeuren",
    summary:
      "Kraftwagen bis 3.500 kg zulässiges Gesamtgewicht und maximal 9 Plätze einschließlich Fahrer. Mit B17 fährst du bereits ab 17 Jahren in Begleitung, BA ist die Ausbildung auf Automatik.",
    seo: {
      title: "Führerschein Klasse B, B17 & Automatik in Kaufbeuren | Jelitto",
      description:
        "Autoführerschein Klasse B, begleitetes Fahren ab 17 (B17) und Automatik (BA) in Kaufbeuren – Voraussetzungen, Ausbildung und Kosten bei Fahrschule Jelitto.",
    },
    ageBadge: "ab 17 / 18",
    minAge: [
      { value: "18 Jahre", label: "Klasse B" },
      { value: "17 Jahre", label: "B17 – begleitetes Fahren" },
    ],
    specs: [
      {
        items: ["Kraftwagen bis 3.500kg zulässiges Gesamtgewicht und maximal 9 Plätze, einschließlich Fahrer"],
      },
      {
        title: "Mit der Klasse B darfst du folgende Anhänger ziehen:",
        items: [
          "Anhänger bis 750kg zulässiges Gesamtgewicht",
          "Anhänger über 750kg zulässigem Gesamtgewicht, wenn die Summe der zulässigen Gesamtgewichtmasse von Zugfahrzeug und Anhänger nicht größer ist als 3.500kg.",
        ],
      },
    ],
    theory: "12 Grundstoff, 2 Klassenspezifisch",
    related: {
      label: "Ausführlich für Eltern erklärt: Begleitetes Fahren ab 17 – wer darf Begleitperson sein, welche Fristen gelten",
      to: "/begleitetes-fahren",
    },
    fees: {
      grundbetrag: 490,
      lehrmaterial: 55,
      uebungsfahrt: 80,
      sonderfahrten: { ueberland: 5, autobahn: 4, nacht: 3, price: 90 },
      theoriepruefung: 40,
      praktischePruefung: 165,
    },
    showLessonNote: true,
    image: "/images/stock/steering-hands.webp",
    imageAlt: "Hände am Lenkrad während einer Fahrstunde",
    imagePosition: "center 40%",
    cardImage: "/images/stock/wheel-hand-dark.webp",
    gallery: [
      { src: "/images/stock/mountain-car.webp", alt: "Auto auf einer kurvigen Bergstraße im Herbst" },
    ],
  },
  {
    slug: "b197",
    path: "/b197",
    code: "B197",
    navLabel: "B197",
    shortName: "Schlüsselzahl B197",
    category: "auto",
    title: "Schlüsselzahl B197 in Kaufbeuren",
    summary:
      "Ausbildung im Automatikfahrzeug mit 10 Schaltstunden und einem Test statt einer zweiten Prüfung.",
    seo: {
      title: "Führerschein B197 in Kaufbeuren – Automatik | Fahrschule Jelitto",
      description:
        "B197: Ausbildung im Automatikfahrzeug mit 10 Schaltstunden und Test statt Prüfung – Ablauf, Vorteile und Kosten bei der Fahrschule Jelitto in Kaufbeuren.",
    },
    ageBadge: "Automatik",
    intro: ["Der B197 ist eine Erweiterung des Automatikführerscheins, die am 01.04.2021 in Kraft getreten ist."],
    highlights: [
      {
        title: "Preise",
        text: ["ohne Mehrkosten für die Ausbildung/Prüfung. Voraussichtlich sogar günstiger, da die Prüfung einfacher wird."],
      },
      {
        title: "Pädagogisch sinnvoller – von leicht zu schwer",
        text: ["Somit weniger Stress und Überforderung des Fahrschülers in der Ausbildung – schneller Erfolg, weniger Kosten."],
      },
      { title: "Mehr Wissensvermittlung", text: ["da auch der Umgang mit Automatik ausgebildet wird."] },
      {
        title: "Ablauf der Erweiterung",
        text: [
          "10 Stunden Schalten innerhalb der Fahrausbildung, nach Abschluss der Grundausbildung.",
          "15 Minuten-Test mit dem Fahrlehrer (innerorts/außerorts), aber keine Prüfung.",
        ],
      },
    ],
    sections: [
      {
        title: "Informationen zur Klasse B197",
        items: [
          {
            title: "Theoretisch Ausbildung und Prüfung",
            text: ["In der theoretischen Ausbildung und Prüfung bestehen keine Unterschiede zur Klasse B."],
          },
          {
            title: "Grundausbildung",
            text: [
              "Die Grundausbildung findet zu einem Großteil auf einem Automatikfahrzeug statt.",
              "Sie kann auch mit einem Schaltfahrzeug begonnen werden.",
            ],
          },
          {
            title: "Sonderfahrten",
            text: ["Sonderfahrten können zum Teil auf einem Automatikfahrzeug und zum Teil auch auf einem Schaltfahrzeug stattfinden."],
          },
          {
            title: "Prüfungsvorbereitung / Prüfungsreifefeststellung",
            text: ["Die Prüfungsvorbereitung und die Feststellung der Prüfungsreife findet auf einem Automatikfahrzeug statt."],
          },
          { title: "Praktische Prüfung", text: ["Die Prüfungsfahrt findet auf einem Automatikfahrzeug statt."] },
        ],
      },
      {
        title: "Häufige Fragen",
        items: [
          {
            title: "Darf mit einem Führerschein mit der Schlüsselzahl 197 auch im Ausland ein Schaltfahrzeug gefahren werden?",
            text: [
              "Ja. Die dreistellige Schlüsselzahl hat lediglich nationale Bedeutung und dokumentiert, das die praktische Fahrerlaubnisprüfung auf einem Automatik abgelegt wurde.",
              "Sie hat keine einschränkende Wirkung und ist somit im Ausland ohne Bedeutung.",
            ],
          },
          {
            title: "Gibt es Nachteile der Klasse B mit Schlüsselzahl 197 gegenüber der Klasse B ohne Schlüsselzahl?",
            text: [
              "Zunächst gibt es keinerlei Nachteile. Nach bestandener Prüfung dürfen mit beiden Führerscheinen dieselben Fahrzeuge gefahren werden.",
              "Wenn später eine weitere Fahrerlaubnisklasse erworben wird, kann es zu Nachteilen kommen. (z.B. muss die Prüfung für BE mit einem Schaltfahrzeug abgeschlossen werden.)",
            ],
          },
        ],
      },
    ],
    theory: "12 Grundstoff, 2 Klassenspezifisch",
    fees: {
      grundbetrag: 490,
      lehrmaterial: 55,
      uebungsfahrt: 80,
      sonderfahrten: { ueberland: 5, autobahn: 4, nacht: 3, price: 90 },
      testfahrt: 30,
      theoriepruefung: 40,
      praktischePruefung: 165,
    },
    showLessonNote: true,
    image: "/images/stock/shifter-auto.webp",
    imageAlt: "Automatik-Wählhebel in einem modernen Auto",
    imagePosition: "center",
    cardImage: "/images/stock/shifter-auto-dark.webp",
    gallery: [
      { src: "/images/stock/dashboard-night.webp", alt: "Beleuchtetes Cockpit bei Nacht" },
    ],
  },
  {
    slug: "be",
    path: "/klassen/be",
    code: "BE",
    navLabel: "BE",
    shortName: "Klasse BE",
    category: "auto",
    title: "Führerschein Klasse BE in Kaufbeuren",
    summary: "Anhänger bis 3.500 kg zulässiges Gesamtgewicht hinter einem Zugfahrzeug der Klasse B.",
    seo: {
      title: "Führerschein Klasse BE in Kaufbeuren – Anhänger | Jelitto",
      description:
        "Klasse BE: Züge mit einem Zugfahrzeug der Klasse B und Anhänger bis 3.500 kg. Sonderfahrten, Prüfung und Kosten bei der Fahrschule Jelitto Kaufbeuren.",
    },
    ageBadge: "Anhänger",
    intro: [
      "Mit der Klasse BE darfst du alle Züge mit einem Zugfahrzeug der Klasse B fahren.",
      "Das zulässige Gesamtgewicht des Anhängers darf max 3.500kg betragen.",
    ],
    fees: {
      grundbetrag: 120,
      uebungsfahrt: 85,
      sonderfahrten: { ueberland: 3, autobahn: 1, nacht: 1, price: 93 },
      praktischePruefung: 170,
    },
    showLessonNote: true,
    image: "/images/stock/aerial-forest-road.webp",
    imageAlt: "Straße durch den Wald aus der Vogelperspektive",
    imagePosition: "center",
    cardImage: "/images/stock/aerial-road-car.webp",
    gallery: [
      { src: "/images/klassen/be.webp", alt: "Ausbildungsfahrzeug der Fahrschule Jelitto mit Anhänger", caption: "Unser Ausbildungsgespann" },
    ],
  },
  {
    slug: "mo-mofa",
    path: "/klassen/mo-mofa",
    code: "MO",
    navLabel: "MO (Mofa)",
    shortName: "Mofa (Klasse MO)",
    category: "zweirad",
    title: "Mofa-Prüfbescheinigung in Kaufbeuren",
    summary: "Prüfbescheinigung ab 15 Jahren für Fahrzeuge bis 50 cm³ und 25 km/h.",
    seo: {
      title: "Mofa-Prüfbescheinigung in Kaufbeuren – ab 15 Jahren | Jelitto",
      description:
        "Mofa-Prüfbescheinigung ab 15 Jahren für Fahrzeuge bis 50 cm³ und 25 km/h: Unterricht, Übungsfahrt, Prüfung und Kosten bei der Fahrschule Jelitto Kaufbeuren.",
    },
    ageBadge: "ab 15",
    minAge: [{ value: "15 Jahre" }],
    intro: ["Mit Prüfbescheinigung darf man Fahrzeuge mit höchstens 50cm³, maximal 25km/h fahren."],
    fees: { grundbetrag: 90, uebungsfahrt: 55, theoriepruefung: 40, lehrmaterial: 55 },
    image: "/images/stock/vespa-orange.webp",
    imageAlt: "Roller in warmem Licht",
    imagePosition: "center 60%",
    cardImage: "/images/stock/vespa-orange.webp",
    gallery: [
      { src: "/images/klassen/mofa.webp", alt: "Mofa vor einer Holzwand" },
    ],
  },
  {
    slug: "am",
    path: "/klassen/am",
    code: "AM",
    navLabel: "AM",
    shortName: "Klasse AM",
    category: "zweirad",
    title: "Führerschein Klasse AM in Kaufbeuren",
    summary: "Roller und Kleinkrafträder bis 45 km/h, ab 15 Jahren.",
    seo: {
      title: "Führerschein Klasse AM in Kaufbeuren – Roller ab 15 | Jelitto",
      description:
        "Klasse AM ab 15 Jahren: Roller und Kleinkrafträder bis 45 km/h. Theorieunterricht, Übungsfahrten und Kosten bei der Fahrschule Jelitto in Kaufbeuren.",
    },
    ageBadge: "ab 15",
    minAge: [{ value: "15 Jahre" }],
    specs: [
      {
        items: [
          "Zweirädrige Kleinkrafträder",
          "Zweirädrige Fahrräder mit Hilfsmotor",
          "Dreirädrige Kleinkrafträder",
          "Leichtfahrzeuge",
        ],
      },
      { title: "Krafträder bis 45 km/h", items: ["Elektromotor max. 4kW Nennleistung", "Verbrennungsmotor max 50cm³"] },
    ],
    theory: "12 Grundstoff 2 Klassenspezifisch",
    fees: { grundbetrag: 490, lehrmaterial: 55, uebungsfahrt: 78, theoriepruefung: 40, praktischePruefung: 150 },
    image: "/images/stock/vespa-street.webp",
    imageAlt: "Roller am Straßenrand",
    imagePosition: "center 65%",
    cardImage: "/images/stock/vespa-black.webp",
    gallery: [
      { src: "/images/klassen/am.webp", alt: "Vespa vor der Fahrschule Jelitto", caption: "Unser Ausbildungsroller" },
    ],
  },
  {
    slug: "a1",
    path: "/klassen/a1",
    code: "A1",
    navLabel: "A1",
    shortName: "Klasse A1",
    category: "zweirad",
    title: "Führerschein Klasse A1 in Kaufbeuren",
    summary: "Leichtkrafträder bis 125 cm³ und maximal 11 kW, ab 16 Jahren.",
    seo: {
      title: "Führerschein Klasse A1 in Kaufbeuren – ab 16 Jahren | Jelitto",
      description:
        "Klasse A1 (bis 125 cm³, max. 11 kW) ab 16 Jahren bei der Fahrschule Jelitto in Kaufbeuren: Voraussetzungen, Theorie, Sonderfahrten und alle Kosten.",
    },
    ageBadge: "ab 16",
    minAge: [{ value: "16 Jahre" }],
    specs: [
      { items: ["Leichtkrafträder", "Dreirädrige Kraftfahrzeuge"] },
      {
        title: "Technische Grenzen",
        items: [
          "Kraftrad bis 125cm³ Hubraum, max 11kW Motorleistung, Leistungsgewicht max. 0,1kW/kg",
          "Dreirädrige Kraftfahrzeuge mit mehr als 45km/h, max 15 kW Motorleistung",
        ],
      },
    ],
    theory: "12 Grundstoff 4 Klassenspezifisch",
    fees: {
      grundbetrag: 490,
      lehrmaterial: 55,
      uebungsfahrt: 82,
      sonderfahrten: { ueberland: 5, autobahn: 4, nacht: 3, price: 92 },
      theoriepruefung: 40,
      praktischePruefung: 175,
    },
    showLessonNote: true,
    image: "/images/stock/moto-woman.webp",
    imageAlt: "Motorradfahrerin in einer Kurve",
    imagePosition: "center 45%",
    cardImage: "/images/stock/moto-woman.webp",
    gallery: [
      { src: "/images/klassen/a1.webp", alt: "KTM 125 vor der Fahrschule Jelitto", caption: "Unser A1-Ausbildungsmotorrad" },
    ],
  },
  {
    slug: "a2",
    path: "/klassen/a2",
    code: "A2",
    navLabel: "A2",
    shortName: "Klasse A2",
    category: "zweirad",
    title: "Führerschein Klasse A2 in Kaufbeuren",
    summary:
      "Krafträder bis 35 kW, ab 18 Jahren. Bei zweijährigem Vorbesitz der Klasse A1 genügt die praktische Prüfung.",
    seo: {
      title: "Führerschein Klasse A2 in Kaufbeuren – ab 18 Jahren | Jelitto",
      description:
        "Klasse A2 (bis 35 kW) ab 18 Jahren in Kaufbeuren – bei zweijährigem Vorbesitz der Klasse A1 nur praktische Prüfung. Ausbildung und Kosten bei Fahrschule Jelitto.",
    },
    ageBadge: "ab 18",
    minAge: [{ value: "18 Jahre" }],
    specs: [
      { items: ["Mittelschwere Krafträder"] },
      { title: "Technische Grenzen", items: ["Kraftrad bis 35kW Motorleistung, Leistungsgewicht max 0,2kW/kg"] },
    ],
    notes: ["Bei zweijährigem Vorbesitz der Klasse A1 ist nur die praktische Prüfung benötigt."],
    theory: "12 Grundstoff, 4 Klassenspezifisch",
    fees: {
      grundbetrag: 490,
      lehrmaterial: 50,
      uebungsfahrt: 85,
      sonderfahrten: { ueberland: 5, autobahn: 4, nacht: 3, price: 95 },
      theoriepruefung: 40,
      praktischePruefung: 175,
    },
    showLessonNote: true,
    image: "/images/stock/moto-rider.webp",
    imageAlt: "Motorradfahrer mit Helm auf seiner Maschine",
    imagePosition: "center 35%",
    cardImage: "/images/stock/helmet-light.webp",
    gallery: [
      { src: "/images/klassen/a2.webp", alt: "KTM Duke vor der Fahrschule Jelitto", caption: "Unser A2-Ausbildungsmotorrad" },
    ],
  },
  {
    slug: "a",
    path: "/klassen/a",
    code: "A",
    navLabel: "A",
    shortName: "Klasse A",
    category: "zweirad",
    title: "Motorradführerschein Klasse A in Kaufbeuren",
    summary:
      "Krafträder ohne Leistungsbegrenzung, ab 24 Jahren im Direkteinstieg oder ab 20 Jahren im Aufstieg von A2.",
    seo: {
      title: "Motorradführerschein Klasse A in Kaufbeuren | Fahrschule Jelitto",
      description:
        "Klasse A ohne Leistungsgrenze: Direkteinstieg ab 24 Jahren oder Aufstieg von A2 ab 20 Jahren. Ausbildung und Kosten bei der Fahrschule Jelitto Kaufbeuren.",
    },
    ageBadge: "ab 20 / 24",
    minAge: [
      { value: "24 Jahre", label: "Direkteinstieg" },
      { value: "20 Jahre", label: "Bei zweijährigem Vorbesitz von A2" },
      { value: "21 Jahre", label: "Dreirädrige Kraftfahrzeuge" },
    ],
    specs: [
      { title: "Kraftrad", items: ["über 35kW Motorleistung", "Leistungsgewicht von mehr als 0,2kW/kg"] },
      { title: "Kraftfahrzeuge", items: ["Motorleistung mehr als 15kW", "Hubraum mehr als 50cm³"] },
    ],
    notes: [
      "Wer die Klasse A2 mindestens seit zwei Jahren besitzt kann die Klasse A nach einer praktischen Prüfung erteilt bekommen, nur mit dieser Fahrerlaubnis dürfen Kraftfahrzeuge der Klasse A gefahren werden; dreirädrige Kraftfahrzeuge jedoch erst mit 21 Jahren",
    ],
    theory: "12 Grundstoff, 4 Klassenspezifische",
    fees: {
      grundbetrag: 490,
      grundbetragErweiterung: 290,
      lehrmaterial: 55,
      lehrmaterialLabel: "Lehrmittel",
      uebungsfahrt: 85,
      sonderfahrten: { ueberland: 5, autobahn: 4, nacht: 3, price: 95 },
      theoriepruefung: 40,
      praktischePruefung: 175,
    },
    image: "/images/stock/moto-mountain.webp",
    imageAlt: "Motorrad auf einer Bergstraße",
    imagePosition: "center 60%",
    cardImage: "/images/stock/moto-mountain.webp",
    gallery: [
      { src: "/images/klassen/a.webp", alt: "KTM Duke 790 vor der Fahrschule Jelitto", caption: "Unser A-Ausbildungsmotorrad" },
    ],
  },
  {
    slug: "b196",
    path: "/b196",
    code: "B196",
    navLabel: "B196",
    shortName: "Schlüsselzahl B196",
    category: "zweirad",
    title: "Schlüsselzahl B196 in Kaufbeuren",
    summary:
      "Mit dem Autoführerschein Motorräder der Klasse A1 fahren, ohne zusätzliche Prüfung. Voraussetzung sind 25 Jahre und fünf Jahre Klasse B.",
    seo: {
      title: "Schlüsselzahl B196 in Kaufbeuren – A1 ohne Prüfung | Jelitto",
      description:
        "Mit B196 Motorräder der Klasse A1 fahren – ohne Prüfung, ab 25 Jahren und 5 Jahren Besitz der Klasse B. Ausbildung und Kosten bei Fahrschule Jelitto Kaufbeuren.",
    },
    ageBadge: "ab 25",
    minAge: [{ value: "25 Jahre" }],
    intro: [
      "Seit dem 01.01.2020 besteht die Möglichkeit zu einer Ausbildung (Erweiterung der Klasse B – ohne Prüfung), die Berechtigung Motorräder der Klasse A1 im Inland zu fahren.",
    ],
    sections: [
      {
        title: "Voraussetzungen und Ausbildung",
        items: [
          { title: "Voraussetzungen", list: ["Mindestalter: 25 Jahre", "5 Jahre im Besitz der Führerscheinklasse B"] },
          {
            title: "Ausbildung",
            list: [
              "4x 90min Klassenspezifischer Unterricht der Klasse A",
              "5x 90min praktische Ausbildung, Überlandstrecken u. Autobahnabschnitte",
            ],
          },
          {
            title: "Abschluss",
            text: [
              "Die Ausbildung endet ohne eine Prüfung, der Fahrschüler erhält eine Bescheinigung über die erfolgreiche Teilnahme und muss diese bei der zuständigen Behörde einreichen und den neuen Führerschein mit Schlüsselzahl 196 beantragen",
            ],
          },
        ],
      },
    ],
    pricePackage: [
      "Wir bieten die Ausbildung ab 950€ an (Grundbetrag, theoretischer Unterricht, praktische Ausbildung und Bescheinigung).",
      "Gegebenenfalls Zusatzkosten durch weiter anfallende Übungsfahrstunden, siehe Preise der Klasse A1",
    ],
    image: "/images/stock/helmet-dark.webp",
    imageAlt: "Motorradhelm im Dunkeln",
    imagePosition: "center 40%",
    cardImage: "/images/stock/helmet-dark.webp",
    gallery: [
      { src: "/images/stock/moto-and-vespa.webp", alt: "Motorrad und Roller am Straßenrand" },
    ],
  },
]

export const autoClasses = classes.filter((c) => c.category === "auto")
export const bikeClasses = classes.filter((c) => c.category === "zweirad")

/** Reihenfolge wie im Menü der bisherigen Website */
export const classNavOrder = ["b-b17", "b197", "begleitetes-fahren", "be", "b196", "a", "a1", "a2", "am", "mo-mofa"]

export const getClassByPath = (path: string) => {
  const clean = path.replace(/\/+$/, "") || "/"
  return classes.find((c) => c.path === clean)
}

/** Zusätzliche Gebühren laut Preisübersicht */
export const priceNotes = {
  theoriepruefungAlle: 40,
  grundbetragErweiterung: 300,
  grundbetragWechsel: 80,
  b196Paket: 950,
}

const euro = new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR", minimumFractionDigits: 2 })
export const formatEuro = (value: number) => euro.format(value)
