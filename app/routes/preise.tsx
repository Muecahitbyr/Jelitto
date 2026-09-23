import { LayoutGroup, motion } from "motion/react"
import { Building2, TrendingUp, Wallet } from "lucide-react"
import { useState } from "react"
import type { MetaFunction } from "react-router"
import { Link } from "react-router"
import { LocalNav } from "~/components/layout/local-nav"
import { CtaBand } from "~/components/ui/cta-band"
import { PageHero } from "~/components/ui/page-hero"
import { Reveal } from "~/components/ui/reveal"
import { Heading, Section } from "~/components/ui/section"
import { Tile } from "~/components/ui/tile"
import { classes, formatEuro, priceNotes, type LicenseClass } from "~/content/classes"
import { site } from "~/content/site"
import { cn } from "~/lib/cn"
import { easeOutExpo } from "~/lib/motion"
import { seo } from "~/lib/seo"

export const meta: MetaFunction = () =>
  seo({
    title: "Führerschein Preise in Kaufbeuren – alle Klassen | Jelitto",
    description:
      "Was kostet der Führerschein in Kaufbeuren? Alle Preise der Fahrschule Jelitto je Klasse: Grundbetrag, Fahrstunden, Sonderfahrten und Prüfungen – offen aufgelistet.",
    path: "/preise",
  })

type Filter = "alle" | "auto" | "zweirad"

/** Reihenfolge und Zusatzbezeichnungen wie in der bisherigen Preistabelle */
const tableRows: { slug: string; name: string; sub?: string }[] = [
  { slug: "b-b17", name: "B / B17 / BA" },
  { slug: "b197", name: "B197", sub: "Automatik" },
  { slug: "be", name: "BE", sub: "Anhänger" },
  { slug: "a1", name: "A1" },
  { slug: "a2", name: "A2" },
  { slug: "a", name: "A", sub: `Erweiterung von A2: ${formatEuro(290)} Grundbetrag` },
  { slug: "am", name: "AM", sub: "Roller" },
  { slug: "mo-mofa", name: "MO", sub: "Mofa-Prüfbescheinigung" },
]
const rows = tableRows.map((r) => ({ ...r, item: classes.find((c) => c.slug === r.slug) as LicenseClass }))
const cell = (v?: number) => (v ? formatEuro(v) : "–")
const columns: { key: string; label: string; get: (c: LicenseClass) => string }[] = [
  { key: "grund", label: "Grundbetrag", get: (c) => cell(c.fees?.grundbetrag) },
  { key: "lehr", label: "Lehrmaterial", get: (c) => cell(c.fees?.lehrmaterial) },
  { key: "uebung", label: "Übungsfahrt", get: (c) => cell(c.fees?.uebungsfahrt) },
  { key: "sonder", label: "Sonderfahrt", get: (c) => cell(c.fees?.sonderfahrten?.price) },
  { key: "pruef", label: "Praktische Prüfung", get: (c) => cell(c.fees?.praktischePruefung) },
]

export default function PreisePage() {
  const [filter, setFilter] = useState<Filter>("alle")
  const visible = rows.filter((r) => filter === "alle" || r.item.category === filter)

  return (
    <>
      <LocalNav
        title="Preise"
        links={[
          { label: "Übersicht", href: "#tabelle" },
          { label: "Sonderfahrten", href: "#sonderfahrten" },
          { label: "Zahlung", href: "#zahlung" },
        ]}
      />
      <PageHero
        eyebrow="Preise"
        title="Führerschein-Preise in Kaufbeuren"
        image="/images/stock/aerial-forest-road.webp"
        imageAlt="Landstraße durch den Wald aus der Vogelperspektive"
        lead={
          <>
            Wir legen unsere Preise offen. Die Tabelle zeigt <strong>jede Position einzeln</strong>, genau so wie sie auch auf den Seiten der einzelnen
            Führerscheinklassen steht. <strong>Stand: {site.pricesAsOf}</strong>
          </>
        }
        breadcrumbs={[{ label: "Startseite", to: "/" }, { label: "Preise" }]}
      />

      {/* Tabelle */}
      <Section id="tabelle" tone="white">
        <div className="wrap">
          <div className="flex flex-wrap items-end justify-between gap-8">
            <Reveal>
              <Heading title="Alle Klassen im Vergleich." size="md" />
            </Reveal>
            <Reveal delay={0.1}>
              <LayoutGroup>
                <div role="tablist" aria-label="Klassen filtern" className="bg-tile inline-flex rounded-full p-1">
                  {(
                    [
                      ["alle", "Alle"],
                      ["auto", "Auto"],
                      ["zweirad", "Zweirad"],
                    ] as [Filter, string][]
                  ).map(([value, label]) => (
                    <button
                      key={value}
                      role="tab"
                      type="button"
                      aria-selected={filter === value}
                      onClick={() => setFilter(value)}
                      className={cn("relative rounded-full px-5 py-2 text-[15px] font-medium transition-colors", filter === value ? "text-[#0f1a00]" : "text-muted hover:text-fg")}
                    >
                      {filter === value && (
                        <motion.span layoutId="price-filter" className="bg-green absolute inset-0 rounded-full" transition={{ type: "spring", bounce: 0.15, duration: 0.5 }} />
                      )}
                      <span className="relative">{label}</span>
                    </button>
                  ))}
                </div>
              </LayoutGroup>
            </Reveal>
          </div>

          <Reveal delay={0.1} className="mt-14 hidden md:block">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="border-line text-muted border-b text-[13px]">
                  <th scope="col" className="py-4 pr-4 font-medium">
                    Klasse
                  </th>
                  {columns.map((col) => (
                    <th key={col.key} scope="col" className="px-4 py-4 text-right font-medium">
                      {col.label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {visible.map(({ slug, name, sub, item }, i) => (
                  <motion.tr
                    key={slug}
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: i * 0.03, ease: easeOutExpo }}
                    className="border-line group border-b"
                  >
                    <th scope="row" className="py-6 pr-4 align-top">
                      <Link to={item.path} className="block transition-opacity group-hover:opacity-70">
                        <span className="text-[28px] font-semibold tracking-[-0.03em]">{name}</span>
                        {sub && <span className="text-muted block text-[13px] font-normal">{sub}</span>}
                      </Link>
                    </th>
                    {columns.map((col) => (
                      <td key={col.key} className="px-4 py-6 text-right align-top text-[19px] tabular-nums">
                        {col.get(item)}
                      </td>
                    ))}
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </Reveal>

          <div className="mt-10 space-y-3 md:hidden">
            {visible.map(({ slug, name, sub, item }) => (
              <motion.div key={slug} layout initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-tile rounded-[24px] p-6">
                <Link to={item.path} className="block">
                  <p className="text-[28px] font-semibold tracking-[-0.03em]">{name}</p>
                  {sub && <p className="text-muted text-[13px]">{sub}</p>}
                </Link>
                <dl className="divide-line mt-4 divide-y">
                  {columns.map((col) => (
                    <div key={col.key} className="flex justify-between py-2.5 text-[15px]">
                      <dt className="text-muted">{col.label}</dt>
                      <dd className="font-semibold tabular-nums">{col.get(item)}</dd>
                    </div>
                  ))}
                </dl>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* Zusatzpositionen */}
      <Section tone="light">
        <div className="wrap grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <PriceNote value={formatEuro(priceNotes.theoriepruefungAlle)} text="Die Theorieprüfung kostet in allen Klassen 40,00 €." dark />
          <PriceNote value={formatEuro(priceNotes.grundbetragErweiterung)} text="Grundbetrag bei Erweiterung: 300€." />
          <PriceNote
            value={formatEuro(priceNotes.grundbetragWechsel)}
            text="Grundbetrag bei Fahrschulwechsel nach Theorie, Umschreibung, Doppelklasse & Aufstieg z.B. A1 auf A2: 80€."
          />
          <PriceNote
            value={formatEuro(30)}
            text="Bei der Klasse B197 kommt die Testfahrt mit dem Fahrlehrer mit 30,00 € hinzu, dafür entfällt eine zweite praktische Prüfung."
          />
          <Tile delay={0.1} className="!bg-brand text-ink flex flex-col justify-between p-8 sm:col-span-2 md:p-10">
            <p className="text-[17px] font-semibold opacity-70">Schlüsselzahl B196</p>
            <div>
              <p className="text-[clamp(3rem,5vw,4.5rem)] leading-none font-semibold tracking-[-0.05em]">ab {formatEuro(priceNotes.b196Paket)}</p>
              <p className="mt-5 max-w-[40rem] text-[17px] leading-relaxed opacity-80">
                Die Erweiterung B196 bieten wir als Paket ab 950 € an. Darin enthalten sind Grundbetrag, theoretischer Unterricht, die praktische
                Ausbildung und die Bescheinigung. Zusätzliche Übungsfahrstunden werden zu den Preisen der Klasse A1 abgerechnet. Alle Einzelheiten stehen
                auf der{" "}
                <Link to="/b196" className="font-semibold underline underline-offset-4">
                  Seite zur Schlüsselzahl B196
                </Link>
                .
              </p>
            </div>
          </Tile>
        </div>
      </Section>

      {/* Sonderfahrten */}
      <Section id="sonderfahrten">
        <div className="wrap">
          <Reveal>
            <Heading eyebrow="Pflicht" title="Welche Sonderfahrten sind vorgeschrieben?" size="md">
              Für die Klassen B, B17, BA, B197, A, A1 und A2 sind <strong>5 Überlandfahrten, 4 Autobahnfahrten und 3 Nachtfahrten</strong>{" "}
              vorgeschrieben, also zwölf Sonderfahrten. Bei der Klasse BE sind es 3 Überlandfahrten, 1 Autobahnfahrt und 1 Nachtfahrt. Für AM und die
              Mofa-Prüfbescheinigung sind keine Sonderfahrten vorgeschrieben. Beim Aufstieg von A1 auf A2 oder von A2 auf A entfallen die Sonderfahrten
              ebenfalls.
            </Heading>
          </Reveal>
          <div className="mt-16 grid gap-4 md:grid-cols-3">
            {[
              { n: 5, label: "Überlandfahrten", img: "/images/stock/mountain-car.webp" },
              { n: 4, label: "Autobahnfahrten", img: "/images/stock/view-from-car.webp" },
              { n: 3, label: "Nachtfahrten", img: "/images/stock/night-headlights.webp" },
            ].map((s, i) => (
              <Tile key={s.label} delay={i * 0.08} image={s.img} className="flex aspect-[4/5] flex-col justify-end p-8 md:aspect-[3/4]">
                <p className="text-metal text-[clamp(6rem,12vw,10rem)] leading-[0.85] font-semibold tracking-[-0.06em]">{s.n}</p>
                <p className="mt-3 text-[21px] font-semibold">{s.label}</p>
              </Tile>
            ))}
          </div>
        </div>
      </Section>

      {/* Gesamtpreis */}
      <Section tone="mint">
        <div className="wrap">
          <Reveal>
            <Heading eyebrow="Transparenz" title="So setzt sich dein Gesamtpreis zusammen." size="md">
              Drei Blöcke ergeben am Ende die Summe, und nur zwei davon stellen wir in Rechnung:
            </Heading>
          </Reveal>
          <div className="mt-14 grid gap-4 md:grid-cols-3">
            {[
              {
                icon: Wallet,
                title: "Die festen Positionen der Fahrschule.",
                text: "Grundbetrag, Lehrmaterial, die vorgeschriebenen Sonderfahrten und die Vorführentgelte für die Prüfungen. Die stehen alle in der Tabelle.",
              },
              {
                icon: TrendingUp,
                title: "Die Übungsfahrten.",
                text: "Das ist die veränderliche Größe. Wie viele du brauchst, hängt von deiner Vorerfahrung und deinem Lerntempo ab – eine ehrliche Pauschalzahl gibt es dafür nicht.",
              },
              {
                icon: Building2,
                title: "Gebühren, die nicht von uns kommen.",
                text: "Der Führerscheinantrag bei Stadt oder Landratsamt und die TÜV-Gebühren für die theoretische und die praktische Prüfung. Die zahlst du direkt an die Behörde beziehungsweise an den TÜV.",
              },
            ].map(({ icon: Icon, title, text }, i) => (
              <Tile key={title} delay={i * 0.08} className="flex flex-col p-8 md:p-10">
                <Icon className="text-accent size-8" strokeWidth={1.6} aria-hidden />
                <h3 className="mt-12 text-[24px] leading-tight font-semibold tracking-[-0.025em]">{title}</h3>
                <p className="body-copy mt-4">{text}</p>
              </Tile>
            ))}
          </div>
        </div>
      </Section>

      <Section id="zahlung" tone="light">
        <div className="wrap grid gap-4 md:grid-cols-2">
          <Tile className="p-8 md:p-12">
            <h2 className="display-sm">Zahlung</h2>
            <p className="body-copy mt-5">
              Nach Vertragsabschluss wird der Grundbetrag fällig. Die Endabrechnung muss vor der praktischen Prüfung beglichen sein; die Rechnungen
              bekommst du von uns per Post. Bezahlen kannst du per Überweisung oder in Bar.
            </p>
          </Tile>
          <Tile delay={0.08} className="p-8 md:p-12">
            <h2 className="display-sm">Fragen zum Preis?</h2>
            <p className="body-copy mt-5">
              Schreib uns eine E-Mail: <a href={`mailto:${site.email}`}>{site.email}</a>, oder komm Montags bis Donnerstags ab 18:30 Uhr in der Alten
              Weberei 12 in Kaufbeuren vorbei. Die Voraussetzungen und Leistungen je Klasse stehen in der <Link to="/klassen">Klassenübersicht</Link>, der
              komplette Ablauf vom Antrag bis zur Prüfung auf der <Link to="/info">Infoseite</Link>.
            </p>
          </Tile>
          <p className="text-muted text-[13px] md:col-span-2">Änderungen vorbehalten. Maßgeblich ist der Preis zum Zeitpunkt der Anmeldung.</p>
        </div>
      </Section>

      <CtaBand />
    </>
  )
}

function PriceNote({ value, text, dark }: { value: string; text: string; dark?: boolean }) {
  return (
    <Tile className={cn("flex min-h-[240px] flex-col justify-between p-8 md:p-10", dark && "!bg-green text-[#0f1a00]")}>
      <p className="text-[clamp(2.75rem,4.5vw,3.75rem)] leading-none font-semibold tracking-[-0.045em]">{value}</p>
      <p className={cn("mt-6 text-[17px] leading-relaxed", dark ? "opacity-75" : "text-muted")}>{text}</p>
    </Tile>
  )
}
