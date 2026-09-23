import { Film, MessageCircle, MonitorPlay, Smartphone, Target, Users } from "lucide-react"
import type { MetaFunction } from "react-router"
import { Link } from "react-router"
import { LocalNav } from "~/components/layout/local-nav"
import { CtaBand } from "~/components/ui/cta-band"
import { MapEmbed } from "~/components/ui/map-embed"
import { PageHero } from "~/components/ui/page-hero"
import { Reveal, Stagger, StaggerItem } from "~/components/ui/reveal"
import { Heading, Section } from "~/components/ui/section"
import { Tile } from "~/components/ui/tile"
import { ZoomMedia } from "~/components/ui/zoom-media"
import { site } from "~/content/site"
import { cn } from "~/lib/cn"
import { seo } from "~/lib/seo"

export const meta: MetaFunction = () =>
  seo({
    title: "Theorieunterricht in Kaufbeuren – Zeiten | Fahrschule Jelitto",
    description:
      "Theorieunterricht der Fahrschule Jelitto: Mo., Di., Mi. und Do. von 19:00–20:30 Uhr in der Alte Weberei 12, 87600 Kaufbeuren. Neuanmeldungen ab 18:30 Uhr.",
    path: "/unterricht",
    image: "/images/stock/classroom.webp",
  })

const week = [
  ["Mo", true],
  ["Di", true],
  ["Mi", true],
  ["Do", true],
  ["Fr", false],
  ["Sa", false],
  ["So", false],
] as const

const plans = [
  { classes: "B, BF17, BA, B197, AM", base: "12", special: "2" },
  { classes: "A, A1, A2", base: "12", special: "4" },
  { classes: "Mit vorhandener Führerscheinklasse", base: "6", special: null },
]

const methods = [
  { icon: Film, label: "Kurze Filme" },
  { icon: MonitorPlay, label: "Smartboard" },
  { icon: Users, label: "Gruppenarbeiten" },
  { icon: Target, label: "Lernzielkontrollen" },
  { icon: MessageCircle, label: "Lerngespräche" },
  { icon: Smartphone, label: "App „Fahren Lernen Max“" },
]

export default function UnterrichtPage() {
  return (
    <>
      <LocalNav
        title="Unterricht"
        links={[
          { label: "Zeiten", href: "#zeiten" },
          { label: "Umfang", href: "#umfang" },
          { label: "Methoden", href: "#methoden" },
          { label: "Anfahrt", href: "#anfahrt" },
        ]}
      />
      <PageHero
        eyebrow="Theorieunterricht"
        title="Theorieunterricht in Kaufbeuren"
        image="/images/stock/classroom.webp"
        imageAlt="Lernende im Unterrichtsraum"
        lead={
          <>
            Unser Theorieunterricht findet <strong>montags, dienstags, mittwochs und donnerstags von 19:00 bis 20:30 Uhr</strong> in der Alten Weberei 12
            in 87600 Kaufbeuren statt.
          </>
        }
        breadcrumbs={[{ label: "Startseite", to: "/" }, { label: "Unterricht" }]}
      />

      <Section id="zeiten">
        <div className="wrap">
          <Reveal>
            <Heading eyebrow="Deine Woche" title="Vier Abende. Dein Tempo.">
              Wer schnell vorankommen möchte, kann also <strong>an vier Abenden pro Woche Unterricht nehmen.</strong> Für Neuanmeldungen sind wir an
              denselben Tagen ab 18:30 Uhr vor Ort.
            </Heading>
          </Reveal>
          <Stagger className="mt-16 grid grid-cols-4 gap-2 sm:grid-cols-7 md:gap-4" stagger={0.07}>
            {week.map(([day, on]) => (
              <StaggerItem
                key={day}
                className={cn(
                  "flex aspect-[3/4] flex-col justify-between rounded-[20px] p-4 md:rounded-[28px] md:p-6",
                  on ? "bg-green text-[#0f1a00] shadow-[0_20px_60px_-20px_rgb(136_176_24/0.8)]" : "bg-tile text-muted hidden sm:flex",
                )}
              >
                <span className="text-[clamp(1.5rem,3vw,2.75rem)] font-semibold tracking-[-0.04em]">{day}</span>
                <span className="text-[12px] leading-tight font-semibold md:text-[15px]">{on ? "19:00 – 20:30" : "–"}</span>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </Section>

      <Section id="umfang" tone="light">
        <div className="wrap grid gap-14 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <Heading eyebrow="Umfang" title="Wie viele Theoriestunden brauche ich?" size="md" />
            <p className="body-copy mt-8 md:text-[19px]">
              Eine Unterrichtseinheit dauert 90 Minuten. Für die Klassen B, BF17, BA, B197 und AM sind 12 Grundstoffthemen und 2 klassenspezifische
              Themen vorgeschrieben, für die Klassen A, A1 und A2 sind es 12 Grundstoffthemen und 4 klassenspezifische Themen. Wenn du bereits eine
              Führerscheinklasse besitzt, reduziert sich der Grundstoff auf 6 Themen. Beim Aufstieg von A1 auf A2 oder von A2 auf A nach mindestens
              zwei Jahren Vorbesitz entfällt die theoretische Ausbildung.
            </p>
          </Reveal>
          <div className="space-y-3">
            {plans.map((p, i) => (
              <Tile key={p.classes} delay={i * 0.07} className="flex items-center justify-between gap-6 p-7 md:p-8">
                <p className="max-w-[13rem] text-[19px] leading-snug font-semibold tracking-[-0.02em]">{p.classes}</p>
                <div className="flex items-end gap-4 text-right">
                  <div>
                    <p className="text-metal text-[3rem] leading-none font-semibold tracking-[-0.05em]">{p.base}</p>
                    <p className="text-muted mt-1 text-[12px]">Grundstoff</p>
                  </div>
                  {p.special && (
                    <div>
                      <p className="text-leaf text-[3rem] leading-none font-semibold tracking-[-0.05em]">+{p.special}</p>
                      <p className="text-muted mt-1 text-[12px]">klassenspezifisch</p>
                    </div>
                  )}
                </div>
              </Tile>
            ))}
            <Tile delay={0.2} className="flex items-center justify-between gap-6 p-7 md:p-8">
              <p className="max-w-[15rem] text-[19px] leading-snug font-semibold tracking-[-0.02em]">Aufstieg A1 → A2 oder A2 → A nach 2 Jahren</p>
              <p className="text-muted text-[19px] font-semibold">entfällt</p>
            </Tile>
          </div>
        </div>
      </Section>

      <Section id="methoden" space="none" className="pt-28 md:pt-40">
        <div className="wrap">
          <Reveal>
            <Heading eyebrow="So unterrichten wir" title="Dein Lerntempo bestimmst du selbst.">
              Wir arbeiten mit unterschiedlichen Methoden, <strong>damit jeder Lerntyp angesprochen und motiviert wird.</strong> Unser Partner für das
              Lehrmaterial ist der Verlag Heinrich Vogel, zur Vorbereitung auf die theoretische Prüfung nutzen wir die App „Fahren Lernen Max“.
            </Heading>
          </Reveal>
          <Stagger className="mt-12 flex flex-wrap gap-2.5" stagger={0.05}>
            {methods.map(({ icon: Icon, label }) => (
              <StaggerItem key={label}>
                <span className="bg-tile inline-flex items-center gap-2.5 rounded-full px-5 py-3 text-[15px] font-medium">
                  <Icon className="text-accent size-4" aria-hidden /> {label}
                </span>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
        <ZoomMedia src="/images/stock/students.webp" alt="Zwei Lernende arbeiten gemeinsam" className="mt-20" />
      </Section>

      <Section id="anfahrt" tone="light">
        <div className="wrap grid gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-5">
            <Heading eyebrow="Standort" title="Anfahrt und Einzugsgebiet." size="md" />
            <p className="body-copy mt-8 md:text-[19px]">
              Die Fahrschule liegt in der Alten Weberei 12 in Kaufbeuren und ist aus der Kaufbeurer Innenstadt und aus Neugablonz gut zu erreichen.
              Fahrschülerinnen und Fahrschüler aus Kaufbeuren und dem Umland im Ostallgäu sind bei uns willkommen – der Theorieunterricht findet für alle
              Klassen an unserem Standort in Kaufbeuren statt.
            </p>
          </Reveal>
          <Reveal delay={0.1} className="lg:col-span-7">
            <MapEmbed />
          </Reveal>
        </div>
      </Section>

      <Section>
        <div className="wrap-narrow text-center">
          <Reveal>
            <h2 className="display-md">Noch Fragen?</h2>
            <p className="copy mx-auto mt-6">
              Ruf uns unter <a href={site.phone.href}>{site.phone.display}</a> an, komm montags bis donnerstags ab 18:30 Uhr vorbei oder lies auf der{" "}
              <Link to="/info">Infoseite</Link> nach, wie Antrag, Ausbildung und Kosten ablaufen. Eine Übersicht aller angebotenen{" "}
              <Link to="/klassen">Führerscheinklassen</Link> findest du hier.
            </p>
            <p className="display-lg mt-16 pb-2">
              <span className="marker">Wir freuen uns</span> <span className="text-leaf">auf Dein Kommen!</span>
            </p>
          </Reveal>
        </div>
      </Section>

      <CtaBand image="/images/stock/night-fog.webp" />
    </>
  )
}
