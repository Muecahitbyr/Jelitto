/** Inhalte der Infoseite: Ablauf in fünf Schritten und häufige Fragen. */

export type Step = {
  number: string
  title: string
  paragraphs?: string[]
  list?: string[]
  after?: string[]
  highlight?: string
}

export const steps: Step[] = [
  {
    number: "01",
    title: "Antrag auf Fahrerlaubnis",
    paragraphs: ["Der Antrag wird bei deiner zuständigen Führerscheinstelle gestellt.", "Du benötigst dazu:"],
    list: [
      "Antragsformular mit Unterschriftenabschnitt. (erhältst du von uns)",
      "Biometrisches Passbild",
      "Nachweis Erste Hilfe",
      "Bescheinigung über Sehtest (ist max. 1 Jahr gültig)",
      "Deinen gültigen Personalausweis oder Reisepass",
      "Bei Klasse BF17, Zusatzblatt für begleitetes Fahren mit Kopien und Unterschriften",
    ],
    after: [
      "Einen Termin bei der Führerscheinstelle kannst du telefonisch, oder per E-Mail machen.",
      "Ist der Antrag gestellt, dauert es 2 bis 12 Wochen, bis die Bearbeitung abgeschlossen und ein Prüfauftrag vorliegt. Erst dann kann ein Termin zur theoretischen Prüfung ausgemacht werden.",
    ],
    highlight: "Achte bei der Antragstellung darauf, dass du den richtigen Führerschein angekreuzt hast.",
  },
  {
    number: "02",
    title: "Theoretischer Unterricht",
    paragraphs: [
      "Der Unterricht findet zu den oben genannten Zeiten statt. Es gibt 12 Grundstoffthemen für alle Führerscheinklassen, sowie zwei Sonderthemen für Klasse B, AM und vier Sonderthemen für Klasse A, A1 und A2.",
      "Folgender theoretischer Unterricht ist notwendig (Eine Einheit = 90min), abhängig von bereits bestehenden Führerscheinklassen:",
    ],
    list: [
      "B/BF17/BA/B197/AM 12 Grundstoffthemen, 2 Sonderthemen",
      "A, A1, A2 12 Grundstoffthemen, 4 Sonderthemen",
      "A, A1, A2 bei Vorbesitz 6 Grundstoffthemen, 4 Sonderthemen",
      "A, A2 bei Aufstieg (A1, A2 Besitz länger als 2 Jahre) keine theoretische Ausbildung nötig",
    ],
    after: ["Zur Vorbereitung auf die theoretische Prüfung bieten wir die App: Fahren Lernen Max vom Vogelverlag an."],
  },
  {
    number: "03",
    title: "Praktische Ausbildung",
    paragraphs: [
      "Folgende Fahrstunden sind für die Klassen B, BF17, BA, B197, A, A1 und A2 vorgeschrieben (eine Fahrstunde = 45min):",
    ],
    list: ["5 Überlandfahrten", "4 Autobahnfahrten", "3 Nachtfahrten"],
    after: ["Bei Erweiterung der Klasse A1 auf A2, oder A2 auf A entfallen die Sonderfahrten (weitere Varianten sind möglich)."],
  },
  {
    number: "04",
    title: "Zahlungsweise",
    paragraphs: [
      "Bei der Anmeldung wird der Grundbetrag fällig.",
      "Vor der praktischen Prüfung muss die Endabrechnung beglichen sein, die Rechnungen erhältst du von uns per Post. Es kann per Überweisung oder auch in Bar bezahlt werden.",
      "Zusätzlich fallen Gebühren für Rathaus und Landratsamt (Führerscheinantrag), sowie für den TÜV, für die theoretische und praktische Prüfung an, die vor Prüfungsantritt dort zu bezahlen sind.",
    ],
  },
  {
    number: "05",
    title: "Prüfung",
    paragraphs: [
      "Sobald der Antrag von der Führerscheinstelle bearbeitet ist, kann eine Anmeldung zur theoretischen und anschließend zur praktischen Prüfung erfolgen. Fühlst du dich bereit für die Theorieprüfung, kannst du dich bei einem unserer Fahrlehrer melden.",
      "Die theoretische Prüfung findet montags beim TÜV in Kaufbeuren oder mittwochs beim TÜV in Mindelheim statt. Die praktische Prüfung beginnt beim TÜV in Kaufbeuren oder Mindelheim.",
    ],
    highlight: "Du benötigst deinen Ausweis oder Reisepass, damit du an den Prüfungen teilnehmen kannst.",
  },
]

export type Faq = { q: string; a: string }

export const infoFaq: Faq[] = [
  {
    q: "Wann findet der Theorieunterricht statt?",
    a: "Der Theorieunterricht findet montags, dienstags, mittwochs und donnerstags von 19:00 bis 20:30 Uhr in der Alten Weberei 12 in 87600 Kaufbeuren statt.",
  },
  {
    q: "Wie melde ich mich in der Fahrschule an?",
    a: "Für Neuanmeldungen sind wir montags bis donnerstags ab 18:30 Uhr in der Alten Weberei 12 in Kaufbeuren vor Ort. Du kannst uns auch vorab unter 0171 1977876 anrufen.",
  },
  {
    q: "Welche Unterlagen brauche ich für den Führerscheinantrag?",
    a: "Du benötigst das Antragsformular mit Unterschriftenabschnitt (bekommst du von uns), ein biometrisches Passbild, den Nachweis über den Erste-Hilfe-Kurs, die Sehtestbescheinigung (maximal 1 Jahr alt) sowie deinen gültigen Personalausweis oder Reisepass. Für die Klasse BF17 kommt das Zusatzblatt für das begleitete Fahren mit Kopien und Unterschriften dazu.",
  },
  {
    q: "Wie lange dauert die Bearbeitung des Führerscheinantrags?",
    a: "Nach der Antragstellung dauert es in der Regel 2 bis 12 Wochen, bis die Bearbeitung abgeschlossen ist und ein Prüfauftrag vorliegt. Erst danach kann ein Termin für die theoretische Prüfung vereinbart werden.",
  },
  {
    q: "Wie viele Theoriestunden sind vorgeschrieben?",
    a: "Eine Unterrichtseinheit dauert 90 Minuten. Für die Klassen B, BF17, BA, B197 und AM sind 12 Grundstoffthemen und 2 klassenspezifische Themen vorgeschrieben, für A, A1 und A2 sind es 12 Grundstoffthemen und 4 klassenspezifische Themen. Bei Vorbesitz einer Führerscheinklasse reduziert sich der Grundstoff auf 6 Themen.",
  },
  {
    q: "Welche Sonderfahrten muss ich machen?",
    a: "Für die Klassen B, BF17, BA, B197, A, A1 und A2 sind 5 Überlandfahrten, 4 Autobahnfahrten und 3 Nachtfahrten vorgeschrieben. Eine Fahrstunde entspricht 45 Minuten. Beim Aufstieg von A1 auf A2 oder von A2 auf A entfallen die Sonderfahrten.",
  },
  {
    q: "Ab welchem Alter kann ich den Führerschein machen?",
    a: "Die Mofa-Prüfbescheinigung und die Klasse AM sind ab 15 Jahren möglich, die Klasse A1 ab 16 Jahren, das begleitete Fahren (B17) ab 17 Jahren, die Klassen B und A2 ab 18 Jahren. Die Klasse A ist im Direkteinstieg ab 24 Jahren möglich, beim Aufstieg von A2 nach zwei Jahren Vorbesitz ab 20 Jahren.",
  },
  {
    q: "Was kostet der Führerschein?",
    a: "Grundbetrag, Preise für Übungs- und Sonderfahrten sowie die Prüfungsgebühren stehen auf jeder Klassenseite. Dazu kommen die Gebühren für den Führerscheinantrag bei Stadt bzw. Landratsamt und die TÜV-Gebühren für die theoretische und praktische Prüfung.",
  },
  {
    q: "Wie kann ich bezahlen?",
    a: "Bei der Anmeldung wird der Grundbetrag fällig. Die Endabrechnung muss vor der praktischen Prüfung beglichen sein; die Rechnungen bekommst du von uns per Post. Bezahlen kannst du per Überweisung oder in bar.",
  },
  {
    q: "Was bedeutet die Schlüsselzahl B196?",
    a: "Mit der Schlüsselzahl B196 darfst du mit dem Autoführerschein Motorräder der Klasse A1 im Inland fahren, ohne eine zusätzliche Prüfung abzulegen. Voraussetzung sind ein Mindestalter von 25 Jahren und fünf Jahre Besitz der Klasse B. Die Ausbildung umfasst 4 Einheiten Theorie und 5 Einheiten Praxis à 90 Minuten.",
  },
]
