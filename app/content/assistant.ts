/**
 * Wissensbasis des Fahrschul-Assistenten.
 *
 * Der Assistent arbeitet komplett im Browser und antwortet ausschließlich mit Daten
 * aus den Inhaltsdateien der Website (site.ts, classes.ts, info.ts). Ändert sich dort
 * ein Preis oder eine Uhrzeit, antwortet er automatisch mit dem neuen Wert.
 * Es werden keine Nachrichten an externe Dienste gesendet.
 */

import { classes, formatEuro, type LicenseClass } from "./classes"
import { infoFaq } from "./info"
import { site } from "./site"

export type AnswerLink = { label: string; to?: string; href?: string }
export type Answer = { text: string[]; bullets?: string[]; links?: AnswerLink[] }

/**
 * Fragen zum Antippen – alle gleichzeitig im Chat sichtbar.
 * `label` steht auf dem Knopf, `question` erscheint als Nachricht und wird beantwortet.
 */
export const questions: { label: string; question: string }[] = [
  { label: "Kosten Auto (B)", question: "Was kostet der Führerschein Klasse B ungefähr?" },
  { label: "Kosten Motorrad (A)", question: "Was kostet der Motorradführerschein Klasse A?" },
  { label: "Öffnungszeiten", question: "Wann sind die Öffnungszeiten?" },
  { label: "Bürozeiten", question: "Wann sind die Bürozeiten?" },
  { label: "Theorieunterricht", question: "Wann ist Theorieunterricht?" },
  { label: "Anmeldung", question: "Wie melde ich mich an?" },
  { label: "Unterlagen", question: "Welche Unterlagen brauche ich?" },
  { label: "Mindestalter", question: "Ab wann darf ich den Führerschein machen?" },
  { label: "Sonderfahrten", question: "Welche Sonderfahrten muss ich machen?" },
  { label: "Begleitetes Fahren ab 17", question: "Was ist begleitetes Fahren ab 17?" },
  { label: "Bezahlung", question: "Wie kann ich bezahlen?" },
  { label: "Anfahrt", question: "Wo finde ich euch?" },
  { label: "Kontakt", question: "Wie kann ich euch erreichen?" },
]

export const greeting: Answer = {
  text: [
    "Hallo! 👋 Ich bin der Assistent der Fahrschule Jelitto.",
    "Tippe unten auf eine Frage – ich antworte sofort.",
  ],
}

// ---------------------------------------------------------------------------
// Hilfsfunktionen
// ---------------------------------------------------------------------------

const faq = (start: string) => infoFaq.find((f) => f.q.startsWith(start))?.a ?? ""

const normalize = (s: string) =>
  ` ${s
    .toLowerCase()
    .replace(/ä/g, "ae")
    .replace(/ö/g, "oe")
    .replace(/ü/g, "ue")
    .replace(/ß/g, "ss")
    .replace(/[^a-z0-9 ]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()} `

const has = (n: string, words: string[]) => words.some((w) => n.includes(w))

/** Erkennt, nach welcher Klasse gefragt wird (spezifische Codes zuerst) */
function detectClass(n: string): LicenseClass | "b17" | undefined {
  const by = (slug: string) => classes.find((c) => c.slug === slug)
  if (has(n, ["b196", "b 196", "196"])) return by("b196")
  if (has(n, ["b197", "b 197", "197"])) return by("b197")
  if (has(n, [" b17 ", " bf17 ", "begleitet", "mit 17", "ab 17 "])) return "b17"
  if (has(n, [" be ", "anhaenger"])) return by("be")
  if (has(n, [" a1 ", "125er", "125 ccm", "leichtkraftrad"])) return by("a1")
  if (has(n, [" a2 "])) return by("a2")
  if (has(n, [" am ", "roller", "moped", "45 km"])) return by("am")
  if (has(n, ["mofa", " mo "])) return by("mo-mofa")
  if (has(n, [" klasse a ", " fuehrerschein a ", " a fuehrerschein ", "motorrad", "motorad"])) return by("a")
  if (has(n, [" klasse b ", " fuehrerschein b ", " b fuehrerschein ", " ba ", "auto", "pkw", "automatik"])) return by("b-b17")
  return undefined
}

function costAnswer(c: LicenseClass): Answer {
  if (c.pricePackage) {
    return {
      text: [`Die ${c.shortName} bieten wir als Paket an:`, ...c.pricePackage],
      links: [{ label: `Mehr zu ${c.code}`, to: c.path }, { label: "Alle Preise", to: "/preise" }],
    }
  }
  const f = c.fees!
  const sd = f.sonderfahrten
  const sdCount = sd ? sd.ueberland + sd.autobahn + sd.nacht : 0
  const fixed =
    f.grundbetrag + (f.lehrmaterial ?? 0) + (sd ? sdCount * sd.price : 0) + (f.testfahrt ?? 0) + (f.theoriepruefung ?? 0) + (f.praktischePruefung ?? 0)

  const bullets = [
    `Grundbetrag: ${formatEuro(f.grundbetrag)}`,
    ...(f.lehrmaterial ? [`${f.lehrmaterialLabel ?? "Lehrmaterial"}: ${formatEuro(f.lehrmaterial)}`] : []),
    ...(sd ? [`${sdCount} Sonderfahrten (${sd.ueberland} Überland, ${sd.autobahn} Autobahn, ${sd.nacht} Nacht) à ${formatEuro(sd.price)} = ${formatEuro(sdCount * sd.price)}`] : []),
    ...(f.testfahrt ? [`Testfahrt B197: ${formatEuro(f.testfahrt)}`] : []),
    ...(f.theoriepruefung ? [`Theorieprüfung: ${formatEuro(f.theoriepruefung)}`] : []),
    ...(f.praktischePruefung ? [`Praktische Prüfung: ${formatEuro(f.praktischePruefung)}`] : []),
  ]

  return {
    text: [
      `So setzen sich die Kosten für ${c.shortName} zusammen:`,
      `Die festen Positionen ergeben zusammen ${formatEuro(fixed)}.${
        f.uebungsfahrt
          ? ` Dazu kommen die Übungsfahrten à ${formatEuro(f.uebungsfahrt)} (eine Fahrstunde = 45 Minuten) – wie viele du brauchst, hängt von deiner Vorerfahrung und deinem Lerntempo ab.`
          : ""
      }`,
      "Außerdem fallen die Gebühren für den Führerscheinantrag bei Stadt bzw. Landratsamt und die TÜV-Gebühren an, die du direkt dort bezahlst.",
    ],
    bullets,
    links: [{ label: "Alle Preise ansehen", to: "/preise" }, { label: `Mehr zu Klasse ${c.code}`, to: c.path }],
  }
}

// ---------------------------------------------------------------------------
// Themen (Intents)
// ---------------------------------------------------------------------------

type Intent = { id: string; keywords: string[]; answer: () => Answer }

const intents: Intent[] = [
  {
    id: "buero",
    keywords: ["buero", "sprechzeit", "sprechstunde"],
    answer: () => ({
      text: [`Unsere Bürozeiten sind ${site.hours.office}.`, `Du erreichst uns außerdem telefonisch unter ${site.phone.display}.`],
      links: [{ label: "Anrufen", href: site.phone.href }],
    }),
  },
  {
    id: "oeffnung",
    keywords: ["oeffnung", "geoeffnet", " offen", "wann seid ihr da", "wann habt ihr", "erreichbar"],
    answer: () => ({
      text: [`Unsere Öffnungs- und Anmeldezeiten sind ${site.hours.openingAndRegistration}.`],
      bullets: [`Bürozeiten: ${site.hours.office}`, `Theorieunterricht: ${site.hours.theory}`],
      links: [{ label: "So findest du uns", to: "/unterricht#anfahrt" }],
    }),
  },
  {
    id: "theorie",
    keywords: ["theorie", "unterricht", "theoriestunde", "lehrstunde", "grundstoff"],
    answer: () => ({
      text: [
        `Der Theorieunterricht findet ${site.hours.theoryDays.join(", ").replace(/, (?=[^,]*$)/, " und ")} von ${site.hours.theoryTime} in der ${site.address.street} in ${site.address.city} statt.`,
        faq("Wie viele Theoriestunden"),
      ],
      links: [{ label: "Zum Theorieunterricht", to: "/unterricht" }],
    }),
  },
  {
    id: "anmeldung",
    keywords: ["anmeld", " melde ", "einschreiben", "vertrag", "starten", "anfangen", "beginnen"],
    answer: () => ({
      text: [faq("Wie melde ich mich")],
      bullets: [
        `Vor Ort: ${site.address.street}, ${site.address.city} – Mo./Di./Mi./Do. ab ${site.hours.registrationFrom}`,
        `Telefon: ${site.phone.display}`,
        "Anmeldeformular als PDF oder online",
      ],
      links: [
        { label: "Online anmelden", to: "/anmeldung" },
        { label: "Anmeldung (PDF)", href: site.downloads.anmeldung },
      ],
    }),
  },
  {
    id: "unterlagen",
    keywords: ["unterlagen", "dokument", "passbild", "sehtest", "erste hilfe", "antrag", "brauche ich"],
    answer: () => ({ text: [faq("Welche Unterlagen")], links: [{ label: "Ablauf Schritt für Schritt", to: "/info" }] }),
  },
  {
    id: "dauer",
    keywords: ["wie lange", "dauer", "dauert", "bearbeitung", "wochen"],
    answer: () => ({ text: [faq("Wie lange dauert")], links: [{ label: "Zum Ablauf", to: "/info" }] }),
  },
  {
    id: "alter",
    keywords: [" alter", " alt ", "ab wann", "wie alt", "mindestalter", " jahre"],
    answer: () => ({ text: [faq("Ab welchem Alter")], links: [{ label: "Alle Klassen", to: "/klassen" }] }),
  },
  {
    id: "sonderfahrten",
    keywords: ["sonderfahrt", "ueberland", "autobahn", "nachtfahrt", "pflichtstunde", "pflichtfahrt"],
    answer: () => ({ text: [faq("Welche Sonderfahrten")], links: [{ label: "Preise der Sonderfahrten", to: "/preise#sonderfahrten" }] }),
  },
  {
    id: "zahlung",
    keywords: ["bezahl", "zahlung", " zahlen", " rate", "ueberweisung", " bar "],
    answer: () => ({ text: [faq("Wie kann ich bezahlen")], links: [{ label: "Preise", to: "/preise" }] }),
  },
  {
    id: "pruefung",
    keywords: ["pruefung", "tuev", "pruefen"],
    answer: () => ({
      text: [
        "Die theoretische Prüfung findet montags beim TÜV in Kaufbeuren oder mittwochs beim TÜV in Mindelheim statt. Die praktische Prüfung beginnt beim TÜV in Kaufbeuren oder Mindelheim.",
        "Sobald dein Antrag bearbeitet ist und du dich bereit fühlst, meldest du dich bei einem unserer Fahrlehrer für die Theorieprüfung an. Zur Prüfung brauchst du deinen Ausweis oder Reisepass.",
      ],
      links: [{ label: "Zum Ablauf", to: "/info" }],
    }),
  },
  {
    id: "adresse",
    keywords: [" wo ", "adresse", "anfahrt", "finde ich", "finde euch", "standort", "parken", "weg zu"],
    answer: () => ({
      text: [`Du findest uns in der ${site.address.street}, ${site.address.zip} ${site.address.city}.`],
      links: [
        { label: "Route planen", href: site.maps.link },
        { label: "Anfahrt", to: "/unterricht#anfahrt" },
      ],
    }),
  },
  {
    id: "kontakt",
    keywords: ["telefon", "nummer", "anrufen", "kontakt", "mail", "erreichen"],
    answer: () => ({
      text: ["So erreichst du uns:"],
      bullets: [`Telefon: ${site.phone.display}`, `E-Mail: ${site.email}`, `Vor Ort: ${site.hours.openingAndRegistration}`],
      links: [
        { label: "Anrufen", href: site.phone.href },
        { label: "E-Mail schreiben", href: `mailto:${site.email}` },
      ],
    }),
  },
  {
    id: "klassen",
    keywords: ["klassen", "welche fuehrerschein", "was bietet", "angebot"],
    answer: () => ({
      text: ["Wir bilden in diesen Klassen aus:"],
      bullets: [
        `Auto: ${classes.filter((c) => c.category === "auto").map((c) => c.navLabel).join(", ")} (B17 = begleitetes Fahren ab 17)`,
        `Zweirad: ${classes.filter((c) => c.category === "zweirad").map((c) => c.navLabel).join(", ")}`,
      ],
      links: [{ label: "Alle Klassen", to: "/klassen" }],
    }),
  },
  {
    id: "team",
    keywords: ["fahrlehrer", "team", "wer ist", "inhaber", "chef"],
    answer: () => ({
      text: [`Inhaber der Fahrschule ist ${site.owner}. Insgesamt begleiten dich fünf Fahrlehrerinnen und Fahrlehrer zum Führerschein.`],
      links: [{ label: "Unser Team", to: "/team" }],
    }),
  },
  {
    id: "rechtliches",
    keywords: [" agb", "geschaeftsbedingung", "datenschutz", "cookie", "impressum", "kuendig", "storn", "absage", "absagen"],
    answer: () => ({
      text: [
        "Alle rechtlichen Informationen findest du auf diesen Seiten. Kurz zu Absagen: Fahrstunden, die nicht mindestens 2 Werktage vorher abgesagt werden, können laut unseren AGB mit drei Vierteln des Fahrstundenentgelts berechnet werden.",
      ],
      links: [
        { label: "AGB", to: "/agb" },
        { label: "Datenschutz", to: "/datenschutz" },
        { label: "Impressum", to: "/impressum" },
      ],
    }),
  },
  {
    id: "danke",
    keywords: ["danke", "dankeschoen", "super", "perfekt", "vielen dank"],
    answer: () => ({ text: ["Gern geschehen! Wenn du noch etwas wissen möchtest, frag einfach. Wir freuen uns auf dich. 🚗"] }),
  },
  {
    id: "hallo",
    keywords: [" hallo ", " hi ", " hey ", "servus", "guten tag", "moin", "gruess"],
    answer: () => greeting,
  },
]

const costWords = ["kost", "preis", "teuer", "euro", "gebuehr", "was zahlt", "betrag", "guenstig", "geld"]

function b17Answer(): Answer {
  return {
    text: [
      "Beim begleiteten Fahren (B17) machst du mit 17 den normalen Führerschein der Klasse B und darfst bis zum 18. Geburtstag mit einer eingetragenen Begleitperson fahren.",
      "Mit dem Unterricht kannst du mit 16 Jahren und 6 Monaten beginnen. Bei uns kostet B17 genau dasselbe wie die Klasse B – ohne Aufschlag.",
    ],
    links: [
      { label: "Begleitetes Fahren ab 17", to: "/begleitetes-fahren" },
      { label: "Preise Klasse B", to: "/klassen/b-b17#kosten" },
    ],
  }
}

const fallback: Answer = {
  text: [
    "Dazu habe ich leider keine sichere Antwort. 🙈",
    `Am besten fragst du direkt bei uns nach – telefonisch unter ${site.phone.display} oder ${site.hours.openingAndRegistration} vor Ort.`,
  ],
  links: [
    { label: "Anrufen", href: site.phone.href },
    { label: "E-Mail schreiben", href: `mailto:${site.email}` },
  ],
}

/** Beantwortet eine frei formulierte Frage anhand der Wissensbasis */
export function answer(question: string): Answer {
  const n = normalize(question)
  const cls = detectClass(n)
  const asksCost = has(n, costWords)

  if (asksCost) {
    if (cls === "b17") {
      const b = costAnswer(classes.find((c) => c.slug === "b-b17")!)
      return { ...b, text: ["Für B17 nehmen wir keinen Aufschlag – es gelten die Preise der Klasse B.", ...b.text.slice(1)] }
    }
    if (cls) return costAnswer(cls)
    // „Was kostet der Führerschein?“ ohne Klasse → Klasse B als häufigster Fall
    const b = costAnswer(classes.find((c) => c.slug === "b-b17")!)
    return { ...b, text: ["Für den Autoführerschein (Klasse B) sieht das so aus:", ...b.text.slice(1)] }
  }

  // Themen nach Trefferzahl bewerten
  let best: Intent | undefined
  let bestScore = 0
  for (const intent of intents) {
    const score = intent.keywords.reduce((s, k) => s + (n.includes(k) ? k.length : 0), 0)
    if (score > bestScore) {
      best = intent
      bestScore = score
    }
  }
  if (best && bestScore >= 3) return best.answer()

  // Nur eine Klasse genannt → Infos zur Klasse
  if (cls === "b17") return b17Answer()
  if (cls) {
    return {
      text: [cls.summary, ...(cls.minAge ? [`Mindestalter: ${cls.minAge.map((a) => (a.label ? `${a.value} (${a.label})` : a.value)).join(", ")}.`] : [])],
      links: [
        { label: `Mehr zu ${cls.code}`, to: cls.path },
        { label: "Kosten", to: `${cls.path}#kosten` },
      ],
    }
  }
  return fallback
}
