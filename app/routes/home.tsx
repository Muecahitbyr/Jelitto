import { motion, useReducedMotion, useScroll, useTransform } from "motion/react"
import { ArrowRight, Download } from "lucide-react"
import { useRef } from "react"
import type { MetaFunction } from "react-router"
import { Link } from "react-router"
import { ClassShowcase } from "~/components/home/class-showcase"
import { FeatureSequence, type Chapter } from "~/components/home/feature-sequence"
import { HomeHero } from "~/components/home/hero"
import { ButtonLink } from "~/components/ui/button"
import { Counter } from "~/components/ui/counter"
import { CtaBand } from "~/components/ui/cta-band"
import { MapEmbed } from "~/components/ui/map-embed"
import { Reveal, Stagger, StaggerItem } from "~/components/ui/reveal"
import { ScrollText } from "~/components/ui/scroll-text"
import { Heading, Section } from "~/components/ui/section"
import { Tile } from "~/components/ui/tile"
import { ZoomMedia } from "~/components/ui/zoom-media"
import { news, site } from "~/content/site"
import { team, teamPhoto } from "~/content/team"
import { seo } from "~/lib/seo"

export const meta: MetaFunction = () =>
  seo({
    title: "Fahrschule Jelitto Kaufbeuren – dein Weg zum Führerschein",
    description:
      "Fahrschule in Kaufbeuren seit über 30 Jahren: Führerschein Klasse B, B17, A, A1, A2, AM & Mofa. Theorieunterricht Mo.–Do. 19:00–20:30 Uhr, Alte Weberei 12.",
    path: "/",
  })

const chapters: Chapter[] = [
  {
    eyebrow: "Theorieunterricht",
    title: "Vier Abende pro Woche.",
    text: (
      <>
        Wer schnell seinen Führerschein machen möchte, besucht den Theorieunterricht am{" "}
        <strong>Montag, Dienstag, Mittwoch und Donnerstag von 19:00–20:30 Uhr</strong> in der Alte Weberei 12 in Kaufbeuren.
      </>
    ),
    image: "/images/stock/classroom.webp",
    alt: "Lernende im Unterricht",
  },
  {
    eyebrow: "Lernen",
    title: "Dein Lerntempo bestimmst du.",
    text: (
      <>
        Kleine Filme, Smartboard, Gruppenarbeiten, Lernzielkontrollen und Lerngespräche –{" "}
        <strong>so wird jeder Lerntyp angesprochen und motiviert.</strong>
      </>
    ),
    image: "/images/stock/students.webp",
    alt: "Zwei Lernende arbeiten gemeinsam am Laptop",
  },
  {
    eyebrow: "Fahrzeuge",
    title: "Modernste Fahrtechnik.",
    text: (
      <>
        Wir begleiten deine Ausbildung mit <strong>modernster Fahrtechnik von Audi.</strong>
      </>
    ),
    image: "/images/stock/steering-hands.webp",
    alt: "Hände am Lenkrad während der Fahrstunde",
  },
  {
    eyebrow: "Sonderfahrten",
    title: "Überland. Autobahn. Nacht.",
    text: (
      <>
        <strong>5 Überlandfahrten, 4 Autobahnfahrten und 3 Nachtfahrten</strong> – wir bereiten Dich gezielt auf deine Fahrprüfung vor.
      </>
    ),
    image: "/images/stock/mountain-car.webp",
    alt: "Auto auf einer kurvigen Landstraße im Herbst",
  },
]

export default function Home() {
  return (
    <>
      <HomeHero />

      {/* Aussage – Wort für Wort */}
      <Section>
        <div className="wrap">
          <p className="eyebrow mb-8">Fahrschule Jelitto</p>
          <ScrollText
            className="display-md max-w-[22ch] !leading-[1.12]"
            text="Unsere Fahrschule gibt es schon seit über 30 Jahren in Kaufbeuren. Wir passen unsere Methoden deinen individuellen Bedürfnissen an, damit du erfolgreich und motiviert durchstartest."
          />

          <Stagger className="mt-28 grid grid-cols-2 gap-x-6 gap-y-14 md:mt-40 md:grid-cols-4">
            {[
              { value: 30, suffix: "+", label: "Jahre in Kaufbeuren" },
              { value: 4, label: "Theorieabende pro Woche" },
              { value: 12, label: "Führerscheinklassen" },
              { value: 5, label: "Fahrlehrerinnen & Fahrlehrer" },
            ].map((s) => (
              <StaggerItem key={s.label} className="border-line border-t pt-6">
                <p className="text-metal text-[clamp(3.5rem,7vw,6.5rem)] leading-none font-semibold tracking-[-0.05em]">
                  <Counter to={s.value} suffix={s.suffix} />
                </p>
                <p className="text-muted mt-3 text-[15px] font-medium md:text-[17px]">{s.label}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </Section>

      <FeatureSequence chapters={chapters} label="Was dich bei uns erwartet" />

      <AerialParallax />

      <ClassShowcase />

      {/* Bento */}
      <Section tone="light">
        <div className="wrap">
          <Reveal>
            <Heading eyebrow="Auf einen Blick" title="Alles, was du wissen musst." />
          </Reveal>
          <div className="mt-14 grid auto-rows-[minmax(300px,auto)] gap-4 md:mt-20 md:grid-cols-6 md:gap-5">
            <Tile
              image="/images/stock/classroom.webp"
              imageAlt="Lernende im Theorieunterricht"
              className="flex min-h-[460px] flex-col justify-end p-8 md:col-span-4 md:row-span-2 md:p-12"
            >
              <p className="eyebrow !text-[#d9f28f]">Theorieunterricht</p>
              <p className="mt-4 text-[clamp(1.5rem,2.6vw,2rem)] font-semibold tracking-[-0.02em] text-white/80">Mo · Di · Mi · Do</p>
              <p className="text-metal mt-1 text-[clamp(3.5rem,8vw,7rem)] leading-[0.95] font-semibold tracking-[-0.05em] tabular-nums">19:00–20:30</p>
              <p className="mt-4 text-[17px] text-white/70">
                Uhr · {site.address.street}, {site.address.city}
              </p>
            </Tile>

            <Tile delay={0.05} className="flex flex-col justify-between p-8 md:col-span-2">
              <p className="eyebrow">Neuanmeldung</p>
              <div>
                <p className="text-[clamp(3rem,5vw,4.25rem)] leading-none font-semibold tracking-[-0.045em]">18:30</p>
                <p className="text-muted mt-3 text-[17px]">Öffnungszeit für Neuanmeldungen, Mo./Di/Mi/Do ab 18:30 Uhr</p>
              </div>
            </Tile>

            {news.items.length > 0 && (
              <Tile delay={0.1} className="flex flex-col justify-between p-8 md:col-span-2">
                <p className="eyebrow">Neuigkeiten</p>
                <div>
                  <p className="text-[21px] leading-tight font-semibold tracking-[-0.02em]">{news.title}</p>
                  <ul className="text-muted mt-4 space-y-1.5 text-[15px]">
                    {news.items.map((n) => (
                      <li key={n}>{n}</li>
                    ))}
                  </ul>
                </div>
              </Tile>
            )}

            <Tile delay={0.05} className="!bg-green flex flex-col justify-between p-8 text-[#0f1a00] md:col-span-2 md:p-10">
              <p className="text-[17px] font-semibold opacity-70">Anmeldung</p>
              <div>
                <p className="text-[clamp(2rem,3vw,2.5rem)] leading-[1.05] font-semibold tracking-[-0.035em]">Anmeldung zum Download.</p>
                <a
                  href={site.downloads.anmeldung}
                  download
                  className="bg-ink mt-6 inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-[15px] font-medium text-white transition-transform active:scale-95"
                >
                  <Download className="size-4" aria-hidden /> PDF herunterladen
                </a>
              </div>
            </Tile>

            <Tile
              delay={0.1}
              image="/images/stock/students.webp"
              imageAlt="Lernende am Laptop"
              className="flex min-h-[340px] flex-col justify-end p-8 md:col-span-2 md:p-10"
            >
              <p className="text-[13px] font-semibold text-white/70">Unser Partner</p>
              <p className="mt-2 text-[24px] leading-tight font-semibold tracking-[-0.02em]">Verlag Heinrich Vogel & App „Fahren Lernen Max“</p>
            </Tile>

            <Tile delay={0.15} className="flex flex-col justify-between p-8 md:col-span-2 md:p-10">
              <p className="eyebrow">Preise</p>
              <div>
                <p className="text-muted text-[17px]">Grundbetrag Klasse B</p>
                <p className="text-[clamp(3rem,5vw,4.25rem)] leading-none font-semibold tracking-[-0.045em]">490 €</p>
                <Link to="/preise" className="text-accent mt-5 inline-flex items-center gap-1.5 text-[17px] font-medium hover:underline">
                  Alle Preise ansehen <ArrowRight className="size-4" aria-hidden />
                </Link>
              </div>
            </Tile>
          </div>
        </div>
      </Section>

      {/* Team */}
      <Section space="none" className="pt-28 md:pt-40">
        <div className="wrap">
          <Reveal>
            <Heading eyebrow="Unser Team" title="Deine Fahrschule Jelitto.">
              Fünf Fahrlehrerinnen und Fahrlehrer, <strong>die dich persönlich zum Führerschein begleiten.</strong>
            </Heading>
          </Reveal>
        </div>
        <ZoomMedia src={teamPhoto.src} alt={teamPhoto.alt} className="mt-16 md:mt-24" height="aspect-[3/2] md:aspect-auto md:h-[88svh]" position="center 35%" />
        <div className="wrap py-14 md:py-20">
          <Stagger className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-5">
            {team.map((m) => (
              <StaggerItem key={m.name}>
                <p className="text-[19px] font-semibold tracking-[-0.02em]">{m.name}</p>
                <p className="text-muted text-[15px]">{m.role}</p>
              </StaggerItem>
            ))}
          </Stagger>
          <Reveal className="mt-12">
            <ButtonLink to="/team" variant="link" className="text-[19px]">
              Lerne unser Team kennen
            </ButtonLink>
          </Reveal>
        </div>
      </Section>

      {/* Anfahrt */}
      <Section tone="light">
        <div className="wrap grid gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-5">
            <Heading eyebrow="Kontakt" title="So findest du uns." size="md" />
            <dl className="mt-12 space-y-7">
              {[
                ["Adresse", `${site.address.street}, ${site.address.zip} ${site.address.city}`],
                ["Telefon", site.phone.display, site.phone.href],
                ["E-Mail", site.email, `mailto:${site.email}`],
                ["Öffnungs- und Anmeldezeiten", site.hours.openingAndRegistration],
              ].map(([label, value, href]) => (
                <div key={label} className="border-line border-t pt-4">
                  <dt className="text-muted text-[13px] font-medium">{label}</dt>
                  <dd className="mt-1 text-[21px] font-semibold tracking-[-0.02em] break-words">{href ? <a href={href}>{value}</a> : value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
          <Reveal delay={0.1} className="lg:col-span-7">
            <MapEmbed className="lg:aspect-auto lg:h-full lg:min-h-[480px]" />
          </Reveal>
        </div>
      </Section>

      <CtaBand />
    </>
  )
}

/** Vollbild-Luftaufnahme mit Tiefen-Parallax: Bild und Text bewegen sich unterschiedlich schnell */
function AerialParallax() {
  const ref = useRef<HTMLElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] })
  const imgY = useTransform(scrollYProgress, [0, 1], reduce ? ["0%", "0%"] : ["-16%", "16%"])
  const textY = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [180, -180])
  const textOpacity = useTransform(() => {
    const v = scrollYProgress.get()
    return Math.min(1, Math.max(0, (v - 0.22) / 0.18)) * Math.min(1, Math.max(0, (0.82 - v) / 0.14))
  })

  return (
    <section ref={ref} className="tone-dark relative h-[130svh] overflow-hidden" aria-label="Unterwegs">
      <motion.img
        src="/images/stock/aerial-serpentine.webp"
        alt="Serpentinenstraße aus der Vogelperspektive"
        loading="lazy"
        decoding="async"
        style={{ y: imgY, scale: 1.4 }}
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div aria-hidden className="absolute inset-0 bg-black/40" />
      <motion.div style={{ y: textY, opacity: textOpacity }} className="wrap relative flex h-full flex-col items-center justify-center text-center">
        <p className="eyebrow mb-6">Wir bereiten Dich gezielt auf deine Fahrprüfung vor</p>
        <p className="display-xl max-w-[13ch] pb-3 text-white">
          Jede Kurve. Jede Strecke. <span className="text-[#d9f28f]">Sicher.</span>
        </p>
      </motion.div>
    </section>
  )
}
