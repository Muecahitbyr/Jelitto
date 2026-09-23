import type { Faq } from "./info"

/** Inhalte der Seite „Begleitetes Fahren ab 17“ */

export const conditions = [
  { value: "30", unit: "Jahre", text: "Mindestens 30 Jahre alt." },
  {
    value: "5",
    unit: "Jahre Klasse B",
    text: "Seit mindestens fünf Jahren ununterbrochen im Besitz der Klasse B. Gezählt wird ab der Erteilung, nicht ab dem Geburtstag.",
  },
  {
    value: "≤ 1",
    unit: "Punkt",
    text: "Höchstens ein Punkt im Fahreignungsregister in Flensburg. Bei zwei oder mehr Punkten ist eine Eintragung als Begleitperson nicht möglich.",
  },
]

export const timeline = [
  { step: "Theorie- und Fahrunterricht", when: "mit 16 Jahren und 6 Monaten" },
  { step: "Antrag bei der Führerscheinstelle", when: "am besten sofort mit der Anmeldung" },
  { step: "Theoretische Prüfung", when: "3 Monate vor dem 17. Geburtstag" },
  { step: "Praktische Prüfung", when: "1 Monat vor dem 17. Geburtstag" },
  { step: "Fahren mit Begleitperson", when: "ab dem 17. Geburtstag" },
]

export const consequences = [
  "zahlt ein Bußgeld und bekommt einen Punkt in Flensburg,",
  "verliert die Fahrerlaubnis – sie wird entzogen, nicht nur eingezogen,",
  "bekommt sie erst nach einer Sperrfrist und nach Teilnahme an einem Aufbauseminar neu erteilt,",
  "und die Probezeit verlängert sich von zwei auf vier Jahre.",
]

export const begleitetFaq: Faq[] = [
  {
    q: "Wer darf Begleitperson beim begleiteten Fahren sein?",
    a: "Die Begleitperson muss mindestens 30 Jahre alt sein, seit wenigstens fünf Jahren ununterbrochen einen Führerschein der Klasse B besitzen und darf höchstens einen Punkt im Fahreignungsregister in Flensburg haben. Alle Begleitpersonen werden vorab namentlich in die Prüfungsbescheinigung eingetragen; mehrere Personen sind möglich, zum Beispiel beide Eltern und ein Großelternteil.",
  },
  {
    q: "Muss die Begleitperson Fahrlehrer sein oder eingreifen?",
    a: "Nein. Die Begleitperson ist keine Fahrlehrerin und kein Fahrlehrer und darf nicht in die Bedienung des Fahrzeugs eingreifen. Sie sitzt als erfahrene Ansprechperson daneben, berät und gibt Sicherheit. Verantwortlich für das Fahren bleibt die Person am Steuer.",
  },
  {
    q: "Darf die Begleitperson Alkohol getrunken haben?",
    a: "Nein. Für die Begleitperson gilt während der Fahrt die 0,5-Promille-Grenze; unter dem Einfluss von Alkohol über diesem Wert oder von Drogen darf sie nicht begleiten. Wer dann fährt, gilt als ohne Begleitperson unterwegs. Für die 17-jährige Person am Steuer gilt ohnehin das absolute Alkoholverbot der Probezeit.",
  },
  {
    q: "Wann kann mein Kind mit der Ausbildung anfangen?",
    a: "Mit dem theoretischen und praktischen Unterricht darf im Alter von 16 Jahren und sechs Monaten begonnen werden. Die theoretische Prüfung ist frühestens drei Monate vor dem 17. Geburtstag möglich, die praktische Prüfung frühestens einen Monat davor. Wer die Ausbildung rechtzeitig beginnt, kann am 17. Geburtstag losfahren.",
  },
  {
    q: "Was passiert am 18. Geburtstag?",
    a: "Ab dem 18. Geburtstag darf ohne Begleitperson gefahren werden. Die Prüfungsbescheinigung gilt in Deutschland noch bis drei Monate nach dem 18. Geburtstag als Nachweis der Fahrerlaubnis – in dieser Zeit sollte der eigentliche Führerschein bei der Führerscheinstelle abgeholt werden.",
  },
  {
    q: "Gilt das begleitete Fahren auch im Ausland?",
    a: "Nur in Deutschland und in Österreich. Österreich erkennt die Prüfungsbescheinigung exakt bis zum 18. Geburtstag an, die deutsche Verlängerung um drei Monate gilt dort nicht. In allen anderen Ländern darf mit der Prüfungsbescheinigung nicht gefahren werden.",
  },
  {
    q: "Was kostet das begleitete Fahren zusätzlich?",
    a: "Bei uns kostet die Ausbildung dasselbe wie die Klasse B – für B17 fällt kein Aufschlag an. Bei der Führerscheinstelle kommen kleine Gebühren für die Prüfungsbescheinigung und für die Eintragung und Überprüfung jeder Begleitperson hinzu. Die genauen Beträge nennt dir deine Führerscheinstelle.",
  },
  {
    q: "Was passiert, wenn ohne Begleitperson gefahren wird?",
    a: "Das hat deutliche Folgen: ein Bußgeld, ein Punkt in Flensburg und der Entzug der Fahrerlaubnis. Neu erteilt wird sie erst nach einer Sperrfrist und nach Teilnahme an einem Aufbauseminar. Zusätzlich verlängert sich die Probezeit von zwei auf vier Jahre. Deshalb sollten alle in Frage kommenden Begleitpersonen von Anfang an eingetragen werden.",
  },
  {
    q: "Bringt begleitetes Fahren einen Vorteil bei der Versicherung?",
    a: "Viele Versicherer gewähren Fahranfängern, die am begleiteten Fahren teilgenommen haben, später günstigere Beiträge. Das ist von Anbieter zu Anbieter unterschiedlich – am besten vor der Anmeldung bei der eigenen Kfz-Versicherung nachfragen. Das Fahrzeug, mit dem gefahren wird, muss für Fahrerinnen und Fahrer unter 23 Jahren versichert sein.",
  },
  {
    q: "Sinkt das Unfallrisiko durch begleitetes Fahren wirklich?",
    a: "Das ist der Grund für die Regelung: Wer ein Jahr lang in Begleitung Erfahrung sammelt, fährt danach nachweislich sicherer als jemand, der mit 18 sofort allein startet. Genau deshalb empfehlen wir B17 allen, die früh anfangen können.",
  },
]
