import { motion, useReducedMotion, useScroll, useTransform } from "motion/react"
import { Globe, ShieldCheck, Wine } from "lucide-react"
import { useRef } from "react"
import type { MetaFunction } from "react-router"
import { Link } from "react-router"
import { LocalNav } from "~/components/layout/local-nav"
import { Accordion } from "~/components/ui/accordion"
import { CtaBand } from "~/components/ui/cta-band"
import { PageHero } from "~/components/ui/page-hero"
import { Reveal, Stagger, StaggerItem } from "~/components/ui/reveal"
import { ScrollText } from "~/components/ui/scroll-text"
import { Heading, Section } from "~/components/ui/section"
import { Tile } from "~/components/ui/tile"
import { ZoomMedia } from "~/components/ui/zoom-media"
import { begleitetFaq, conditions, consequences, timeline } from "~/content/begleitetes-fahren"
import { site } from "~/content/site"
import { easeOutExpo } from "~/lib/motion"
import { faqJsonLd, seo } from "~/lib/seo"

export const meta: MetaFunction = () =>
  seo({
    title: "Begleitetes Fahren ab 17 (B17) in Kaufbeuren | Jelitto",
    description:
      "Begleitetes Fahren ab 17 in Kaufbeuren: Wer darf Begleitperson sein, welche Fristen gelten, was passiert mit 18 – alle Antworten für Eltern von der Fahrschule Jelitto.",
    path: "/begleitetes-fahren",
    image: "/images/stock/driver-smile.webp",
    jsonLd: faqJsonLd(begleitetFaq),
  })

export default function BegleitetesFahrenPage() {
  return (
    <>
      <LocalNav
        title="Begleitetes Fahren ab 17"
        links={[
          { label: "Begleitperson", href: "#begleitperson" },
          { label: "Zeitplan", href: "#zeitplan" },
          { label: "FAQ", href: "#faq" },
        ]}
      />
      <PageHero
        eyebrow="B17 · Für Eltern erklärt"
        title="Begleitetes Fahren ab 17."
        image="/images/stock/driver-smile.webp"
        imageAlt="Junge Fahrerin lächelt am Steuer"
        imagePosition="65% center"
        lead={
          <>
            Beim begleiteten Fahren macht Ihr Kind mit 17 den ganz normalen Führerschein der Klasse B und darf danach bis zum 18. Geburtstag fahren –{" "}
            <strong>aber nur, wenn eine von Ihnen benannte Begleitperson mit im Auto sitzt.</strong>
          </>
        }
        breadcrumbs={[{ label: "Startseite", to: "/" }, { label: "Klassen", to: "/klassen" }, { label: "Begleitetes Fahren ab 17" }]}
      />

      <Section>
        <div className="wrap">
          <p className="eyebrow mb-8">Begleitetes Fahren ab 17 in Kaufbeuren</p>
          <ScrollText
            className="display-md max-w-[24ch] !leading-[1.12]"
            text="Ein Jahr Fahrpraxis unter Aufsicht, bevor es allein losgeht: Fahranfänger, die so gestartet sind, sind danach nachweislich seltener in Unfälle verwickelt."
          />
          <p className="copy mt-10">Diese Seite beantwortet die Fragen, die uns Eltern am häufigsten stellen.</p>
        </div>
      </Section>

      {/* Drei Bedingungen */}
      <Section id="begleitperson" tone="light">
        <div className="wrap">
          <Reveal>
            <Heading eyebrow="Begleitperson" title="Dürfen Sie Begleitperson sein?">
              Das ist die Frage, an der es meistens hängt. <strong>Alle drei Punkte müssen erfüllt sein:</strong>
            </Heading>
          </Reveal>
          <div className="mt-16 grid gap-4 md:grid-cols-3">
            {conditions.map((c, i) => (
              <Tile key={c.unit} delay={i * 0.08} className="flex min-h-[380px] flex-col p-8 md:p-10">
                <span className="text-muted text-[15px] font-medium">{i + 1} / 3</span>
                <p className="mt-auto flex items-baseline gap-3 pt-10">
                  <span className="text-leaf text-[clamp(5rem,9vw,8rem)] leading-[0.9] font-semibold tracking-[-0.06em]">{c.value}</span>
                  <span className="text-[21px] font-semibold tracking-[-0.02em]">{c.unit}</span>
                </p>
                <p className="body-copy mt-6">{c.text}</p>
              </Tile>
            ))}
          </div>
          <Reveal className="mt-14">
            <p className="copy max-w-[48rem]">
              Sie dürfen mehrere Begleitpersonen benennen – typischerweise beide Elternteile, oft zusätzlich ein Großelternteil, eine ältere Schwester oder
              ein Nachbar. Jede Person wird vorab namentlich in die Prüfungsbescheinigung eingetragen und von der Führerscheinstelle überprüft.{" "}
              <strong>
                Unser Rat: Benennen Sie von Anfang an alle, die realistisch in Frage kommen. Wer nicht eingetragen ist, darf nicht begleiten – auch nicht
                spontan, wenn es einmal eng wird.
              </strong>{" "}
              Ein Nachtragen ist möglich, kostet aber einen weiteren Behördengang.
            </p>
          </Reveal>
        </div>
      </Section>

      {/* Rolle */}
      <Section>
        <div className="wrap grid gap-14 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <Heading eyebrow="Rolle" title="Was die Begleitperson tut – und was nicht." size="md" />
          </Reveal>
          <div className="space-y-4 lg:col-span-7">
            <Reveal>
              <p className="copy">
                Sie sind ausdrücklich keine Fahrlehrerin und kein Fahrlehrer. Sie dürfen nicht in die Bedienung des Fahrzeugs eingreifen, also nicht ins
                Lenkrad greifen und nicht in die Pedale. <strong>Sie sitzen als erfahrene Ansprechperson daneben</strong>, geben Sicherheit und besprechen
                Situationen – die Verantwortung für das Fahren trägt Ihr Kind. Wo Sie sitzen, ist nicht vorgeschrieben; der Beifahrersitz ist das Übliche.
              </p>
            </Reveal>
            <Tile className="!bg-brand text-ink mt-10 p-8 md:p-10">
              <Wine className="size-8" strokeWidth={1.6} aria-hidden />
              <p className="mt-6 text-[24px] leading-tight font-semibold tracking-[-0.025em]">
                Wichtig und oft unterschätzt: Für Sie als Begleitperson gilt während der Fahrt die 0,5-Promille-Grenze.
              </p>
              <p className="mt-4 text-[17px] leading-relaxed opacity-75">
                Wer mehr getrunken hat oder unter dem Einfluss von Drogen steht, darf nicht begleiten – die Fahrt gilt dann als Fahrt ohne Begleitperson,
                mit allen Folgen weiter unten. Der Rückweg vom Grillfest ist also genau die Situation, für die das begleitete Fahren nicht gedacht ist.
              </p>
            </Tile>
            <Reveal>
              <p className="body-copy pt-4">
                Für Ihr Kind am Steuer gilt ohnehin das absolute Alkoholverbot – als Fahranfänger in der Probezeit und als unter 21-Jährige oder unter
                21-Jähriger.
              </p>
            </Reveal>
          </div>
        </div>
      </Section>

      <ZoomMedia src="/images/stock/driver-window.webp" alt="Junge Fahrerin lächelt aus dem Autofenster" position="center 35%" height="h-[60svh] md:h-[80svh]" />

      {/* Zeitplan */}
      <Section id="zeitplan">
        <div className="wrap grid gap-14 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <Heading eyebrow="Zeitplan" title="Wann anfangen?" size="lg">
              Damit Ihr Kind am 17. Geburtstag tatsächlich fahren darf, <strong>muss die Ausbildung vorher laufen.</strong> Diese Fristen gelten:
            </Heading>
          </Reveal>
          <div className="lg:col-span-7">
            <Timeline />
            <Reveal>
              <p className="copy mt-14">
                Rechnen Sie für die Bearbeitung des Antrags 2 bis 12 Wochen ein – erst wenn der Prüfauftrag vorliegt, kann ein Prüfungstermin vereinbart
                werden. Wer den Antrag zu spät stellt, verliert genau diese Wochen.{" "}
                <strong>Eine sinnvolle Faustregel: etwa ein halbes Jahr vor dem 17. Geburtstag anmelden.</strong>
              </p>
            </Reveal>
          </div>
        </div>
      </Section>

      {/* 18 & Ausland */}
      <Section tone="light">
        <div className="wrap grid gap-4 md:grid-cols-2">
          <Tile className="p-8 md:p-12">
            <ShieldCheck className="text-accent size-9" strokeWidth={1.6} aria-hidden />
            <h2 className="display-sm mt-8">Was mit 18 passiert</h2>
            <div className="body-copy mt-5 space-y-4">
              <p>
                Ab dem 18. Geburtstag darf Ihr Kind allein fahren – ohne dass irgendetwas beantragt werden muss. Die Prüfungsbescheinigung gilt in
                Deutschland noch bis drei Monate nach dem 18. Geburtstag als Nachweis der Fahrerlaubnis. In dieser Zeit sollte der eigentliche Führerschein
                bei der Führerscheinstelle abgeholt werden.
              </p>
              <p>
                Die Probezeit beginnt bereits mit der Erteilung, also mit 17, und dauert zwei Jahre. Wer mit 17 anfängt, hat sie in der Regel mit 19 hinter
                sich.
              </p>
            </div>
          </Tile>
          <Tile delay={0.08} className="p-8 md:p-12">
            <Globe className="text-accent size-9" strokeWidth={1.6} aria-hidden />
            <h2 className="display-sm mt-8">Im Ausland: nur Österreich</h2>
            <p className="body-copy mt-5">
              Die Prüfungsbescheinigung wird außerhalb Deutschlands ausschließlich in Österreich anerkannt – und dort nur exakt bis zum 18. Geburtstag, die
              deutsche Verlängerung um drei Monate gilt in Österreich nicht. In allen anderen Ländern darf mit der Bescheinigung nicht gefahren werden. Der
              Sommerurlaub in Italien ist also keine Gelegenheit zum Üben.
            </p>
          </Tile>
        </div>
      </Section>

      {/* Folgen */}
      <Section>
        <div className="wrap grid gap-14 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <Heading eyebrow="Folgen" title="Wenn ohne Begleitperson gefahren wird." size="md">
              Das sollten Sie mit Ihrem Kind einmal offen besprechen, weil die Folgen härter sind, als die meisten erwarten.{" "}
              <strong>Wer ohne eingetragene Begleitperson fährt:</strong>
            </Heading>
          </Reveal>
          <div className="lg:col-span-7">
            <Stagger as="ol" className="space-y-3" stagger={0.1}>
              {consequences.map((c, i) => (
                <StaggerItem as="li" key={c} className="bg-tile flex items-center gap-5 rounded-[24px] p-6 md:p-7">
                  <span className="grid size-11 shrink-0 place-items-center rounded-full bg-[#ff453a]/15 text-[17px] font-semibold text-[#ff6961]">{i + 1}</span>
                  <span className="text-[19px] font-medium tracking-[-0.015em]">{c}</span>
                </StaggerItem>
              ))}
            </Stagger>
            <Reveal>
              <p className="copy mt-10">
                Ein Jahr Warten und die Ausbildung teilweise von vorn – <strong>dafür lohnt sich keine Fahrt.</strong> Genau deshalb der Rat von oben: lieber
                eine Begleitperson zu viel eintragen lassen als eine zu wenig.
              </p>
            </Reveal>
          </div>
        </div>
      </Section>

      {/* Versicherung, Kosten, Unterlagen */}
      <Section tone="mint">
        <div className="wrap grid gap-4 lg:grid-cols-3">
          <Tile className="p-8 md:p-10">
            <h2 className="text-[28px] font-semibold tracking-[-0.03em]">Versicherung</h2>
            <p className="body-copy mt-4">
              Das Fahrzeug muss so versichert sein, dass Fahrerinnen und Fahrer unter 23 Jahren mitversichert sind – ein Anruf bei Ihrer Kfz-Versicherung
              klärt das in fünf Minuten. Viele Versicherer gewähren später außerdem günstigere Beiträge für Fahranfänger, die am begleiteten Fahren
              teilgenommen haben. Wie hoch der Nachlass ist, unterscheidet sich je Anbieter deutlich; fragen Sie am besten vor der Anmeldung nach.
            </p>
          </Tile>
          <Tile delay={0.06} className="p-8 md:p-10">
            <h2 className="text-[28px] font-semibold tracking-[-0.03em]">Was es kostet</h2>
            <p className="body-copy mt-4">
              Bei uns kostet die Ausbildung genau dasselbe wie die Klasse B – <strong>für B17 nehmen wir keinen Aufschlag.</strong> Alle Positionen stehen
              offen in unserer <Link to="/preise">Preisübersicht</Link>. Hinzu kommen bei der Führerscheinstelle kleine Gebühren für die
              Prüfungsbescheinigung und für die Eintragung und Überprüfung jeder Begleitperson.
            </p>
          </Tile>
          <Tile delay={0.12} className="p-8 md:p-10">
            <h2 className="text-[28px] font-semibold tracking-[-0.03em]">Welche Unterlagen Sie brauchen</h2>
            <p className="body-copy mt-4">
              Zusätzlich zu den üblichen Unterlagen für den Führerscheinantrag – Antragsformular, biometrisches Passbild, Erste-Hilfe-Nachweis, Sehtest und
              Ausweis – kommt beim begleiteten Fahren das Zusatzblatt für das begleitete Fahren hinzu, mit den Angaben, Kopien und Unterschriften jeder
              Begleitperson. Die vollständige Liste und den Ablauf finden Sie auf unserer <Link to="/info">Infoseite</Link>.
            </p>
          </Tile>
        </div>
      </Section>

      {/* Anmelden */}
      <Section>
        <div className="wrap-narrow text-center">
          <Reveal>
            <h2 className="display-lg text-metal pb-2">Anmelden und losfahren.</h2>
            <p className="copy mx-auto mt-8">
              Kommen Sie mit Ihrem Kind montags bis donnerstags ab 18:30 Uhr in die Alte Weberei 12 in Kaufbeuren – wir gehen die Unterlagen gemeinsam
              durch und sagen Ihnen, welche Fristen in Ihrem Fall gelten. Vorab erreichen Sie uns unter <a href={site.phone.href}>{site.phone.display}</a>.
              Der Theorieunterricht läuft montags bis donnerstags von 19:00 bis 20:30 Uhr; alles dazu steht unter{" "}
              <Link to="/unterricht">Theorieunterricht</Link>, die Leistungen der Klasse B auf der <Link to="/klassen/b-b17">Seite zur Klasse B, B17 und BA</Link>.
            </p>
          </Reveal>
        </div>
      </Section>

      {/* FAQ */}
      <Section id="faq" tone="light">
        <div className="wrap grid gap-14 lg:grid-cols-12">
          <Reveal className="lg:col-span-4">
            <Heading eyebrow="FAQ" title="Häufige Fragen zum begleiteten Fahren." size="md" />
          </Reveal>
          <Reveal delay={0.1} className="lg:col-span-8">
            <Accordion items={begleitetFaq} />
            <p className="text-muted mt-10 text-[13px]">
              Die rechtlichen Angaben auf dieser Seite entsprechen dem Stand August 2026. Verbindlich entscheidet über Ihren Antrag und die Eintragung der
              Begleitpersonen immer die zuständige Führerscheinstelle.
            </p>
          </Reveal>
        </div>
      </Section>

      <CtaBand title="Mit 17 losfahren." image="/images/stock/mountain-car.webp" />
    </>
  )
}

/** Zeitleiste, deren Linie sich beim Scrollen gelb „zeichnet“ */
function Timeline() {
  const ref = useRef<HTMLOListElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.75", "end 0.5"] })
  const scaleY = useTransform(scrollYProgress, [0, 1], reduce ? [1, 1] : [0, 1])

  return (
    <ol ref={ref} className="relative space-y-12 pl-12">
      <span aria-hidden className="bg-line absolute top-2 bottom-2 left-[13px] w-[2px]" />
      <motion.span aria-hidden style={{ scaleY }} className="absolute top-2 bottom-2 left-[13px] w-[2px] origin-top bg-gradient-to-b from-[#f8d800] to-[#88b018]" />
      {timeline.map((t, i) => (
        <motion.li
          key={t.step}
          initial={reduce ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.8 }}
          transition={{ duration: 0.8, ease: easeOutExpo }}
          className="relative"
        >
          <span
            aria-hidden
            className={`absolute top-1.5 -left-12 grid size-7 place-items-center rounded-full ${i === timeline.length - 1 ? "bg-brand shadow-[0_0_30px_rgb(248_216_0/0.7)]" : "bg-white ring-2 ring-black/10"}`}
          >
            <span className={`size-2 rounded-full ${i === timeline.length - 1 ? "bg-ink" : "bg-green"}`} />
          </span>
          <p className="text-muted text-[15px] font-medium">{t.when}</p>
          <p className="mt-1 text-[28px] leading-tight font-semibold tracking-[-0.03em] md:text-[34px]">{t.step}</p>
        </motion.li>
      ))}
    </ol>
  )
}
