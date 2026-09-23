import { motion, useReducedMotion, useScroll, useTransform } from "motion/react"
import { ArrowRight, BookOpen, Check, Info, Package } from "lucide-react"
import { useRef } from "react"
import type { MetaFunction } from "react-router"
import { Link, useLocation } from "react-router"
import { LocalNav } from "~/components/layout/local-nav"
import { AnimatedWords } from "~/components/ui/animated-headline"
import { ButtonLink } from "~/components/ui/button"
import { CtaBand } from "~/components/ui/cta-band"
import { FeeList } from "~/components/ui/fee-list"
import { ParallaxImage } from "~/components/ui/parallax-image"
import { Reveal, Stagger, StaggerItem } from "~/components/ui/reveal"
import { Heading, Section } from "~/components/ui/section"
import { Tile } from "~/components/ui/tile"
import { ZoomMedia } from "~/components/ui/zoom-media"
import { classes, getClassByPath, type LicenseClass } from "~/content/classes"
import { cn } from "~/lib/cn"
import { easeOutExpo } from "~/lib/motion"
import { seo } from "~/lib/seo"

export const meta: MetaFunction = ({ location }) => {
  const item = getClassByPath(location.pathname)
  if (!item) return [{ title: "Seite nicht gefunden | Fahrschule Jelitto" }]
  return seo({ ...item.seo, path: item.path, image: item.image })
}

export default function KlassePage() {
  const location = useLocation()
  const item = getClassByPath(location.pathname)
  if (!item) throw new Response("Not Found", { status: 404 })

  const index = classes.findIndex((c) => c.slug === item.slug)
  const next = classes[(index + 1) % classes.length]
  const hasOverview = Boolean(item.minAge || item.theory || item.intro)
  const tileCount = (item.minAge?.length ?? 0) + (item.theory ? 1 : 0) + (item.fees?.sonderfahrten ? 1 : 0)
  const tileCols = tileCount >= 4 ? "lg:grid-cols-4" : tileCount === 3 ? "lg:grid-cols-3" : "lg:grid-cols-2"

  return (
    <>
      <LocalNav
        title={item.code === "B" ? "Klasse B / B17 / BA" : item.code.startsWith("B19") ? `Schlüsselzahl ${item.code}` : `Klasse ${item.code}`}
        links={[
          ...(hasOverview ? [{ label: "Überblick", href: "#ueberblick" }] : []),
          ...(item.specs ? [{ label: "Fahrzeuge", href: "#fahrzeuge" }] : []),
          { label: "Kosten", href: "#kosten" },
        ]}
      />

      <ClassHero item={item} />

      <ZoomMedia src={item.image} alt={item.imageAlt} position={item.imagePosition} priority />

      {/* Überblick */}
      {hasOverview && (
        <Section id="ueberblick">
          <div className="wrap">
            {item.intro && (
              <Reveal>
                <div className="max-w-[40rem] space-y-6">
                  {item.intro.map((p) => (
                    <p key={p} className="display-sm text-metal">
                      {p}
                    </p>
                  ))}
                </div>
              </Reveal>
            )}
            {(item.minAge || item.theory) && (
              <div className={cn("grid gap-4 sm:grid-cols-2", tileCols, item.intro && "mt-20 md:mt-28")}>
                {item.minAge?.map((age, i) => (
                  <Tile key={age.value + age.label} delay={i * 0.06} className="flex min-h-[200px] md:min-h-[260px] flex-col justify-between p-8">
                    <p className="text-muted text-[15px] font-medium">Mindestalter</p>
                    <div>
                      <p className="text-metal text-[clamp(3.5rem,6vw,5rem)] leading-none font-semibold tracking-[-0.05em]">
                        {age.value.replace(" Jahre", "")}
                      </p>
                      <p className="mt-2 text-[17px] font-semibold">Jahre</p>
                      {age.label && <p className="text-muted mt-1 text-[15px]">{age.label}</p>}
                    </div>
                  </Tile>
                ))}
                {item.theory && (
                  <Tile delay={0.2} className="flex min-h-[200px] md:min-h-[260px] flex-col justify-between p-8">
                    <p className="text-muted inline-flex items-center gap-2 text-[15px] font-medium">
                      <BookOpen className="text-accent size-4" aria-hidden /> Theorie Unterricht:
                    </p>
                    <div>
                      <p className="text-[28px] leading-[1.1] font-semibold tracking-[-0.03em]">{item.theory}</p>
                      <p className="text-muted mt-2 text-[15px]">Eine Einheit = 90 Minuten</p>
                    </div>
                  </Tile>
                )}
                {item.fees?.sonderfahrten && (
                  <Tile delay={0.26} className="flex min-h-[200px] md:min-h-[260px] flex-col justify-between p-8">
                    <p className="text-muted text-[15px] font-medium">Sonderfahrten</p>
                    <div>
                      <p className="text-leaf text-[clamp(3.5rem,6vw,5rem)] leading-none font-semibold tracking-[-0.05em]">
                        {item.fees.sonderfahrten.ueberland + item.fees.sonderfahrten.autobahn + item.fees.sonderfahrten.nacht}
                      </p>
                      <p className="text-muted mt-2 text-[15px]">
                        {item.fees.sonderfahrten.ueberland} Überland · {item.fees.sonderfahrten.autobahn} Autobahn · {item.fees.sonderfahrten.nacht} Nacht
                      </p>
                    </div>
                  </Tile>
                )}
              </div>
            )}
          </div>
        </Section>
      )}

      {/* Fahrzeuge */}
      {item.specs && (
        <Section id="fahrzeuge" tone="light">
          <div className="wrap grid gap-14 lg:grid-cols-12">
            <Reveal className="lg:col-span-5">
              <Heading eyebrow="Was du fahren darfst" title={`Klasse ${item.code}.`} size="lg" />
            </Reveal>
            <div className="space-y-4 lg:col-span-7">
              {item.specs.map((group, gi) => (
                <Tile key={gi} delay={gi * 0.08} className="p-8 md:p-10">
                  {group.title && <h3 className="mb-6 text-[21px] font-semibold tracking-[-0.02em]">{group.title}</h3>}
                  <ul className="space-y-4">
                    {group.items.map((s) => (
                      <li key={s} className="flex gap-4 text-[17px] leading-snug md:text-[19px]">
                        <Check className="text-accent mt-1 size-5 shrink-0" strokeWidth={2.5} aria-hidden />
                        {s}
                      </li>
                    ))}
                  </ul>
                </Tile>
              ))}
              {item.notes?.map((note) => (
                <Tile key={note} className="!bg-brand text-ink flex gap-4 p-8 md:p-10">
                  <Info className="mt-1 size-6 shrink-0" aria-hidden />
                  <p className="text-[19px] leading-snug font-semibold md:text-[21px]">{note}</p>
                </Tile>
              ))}
            </div>
          </div>
        </Section>
      )}

      {/* Vorteile (B197) */}
      {item.highlights && (
        <Section>
          <div className="wrap">
            <Reveal>
              <Heading eyebrow="Vorteile" title="Von leicht zu schwer." />
            </Reveal>
            <div className="mt-14 grid gap-4 md:grid-cols-2">
              {item.highlights.map((h, i) => (
                <Tile key={h.title} delay={i * 0.06} className="flex min-h-[200px] md:min-h-[260px] flex-col p-8 md:p-10">
                  <span className="text-muted text-[15px] font-medium">0{i + 1}</span>
                  <h3 className="mt-auto pt-10 text-[28px] leading-tight font-semibold tracking-[-0.03em]">{h.title}</h3>
                  <div className="body-copy mt-3 space-y-2">
                    {h.text.map((t) => (
                      <p key={t}>{t}</p>
                    ))}
                  </div>
                </Tile>
              ))}
            </div>
          </div>
        </Section>
      )}

      {/* Weitere Informationen */}
      {item.sections?.map((section, si) => (
        <Section key={section.title} tone={si % 2 === 0 ? "light" : "white"}>
          <div className="wrap">
            <Reveal>
              <Heading title={section.title} size="md" />
            </Reveal>
            <div className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {section.items.map((entry, i) => (
                <Tile key={entry.title} delay={i * 0.05} className="p-8">
                  {entry.title && <h3 className="text-[21px] leading-snug font-semibold tracking-[-0.02em]">{entry.title}</h3>}
                  {entry.text && (
                    <div className="body-copy mt-3 space-y-3">
                      {entry.text.map((t) => (
                        <p key={t}>{t}</p>
                      ))}
                    </div>
                  )}
                  {entry.list && (
                    <ul className="mt-4 space-y-3">
                      {entry.list.map((l) => (
                        <li key={l} className="flex gap-3 text-[17px] leading-snug">
                          <Check className="text-accent mt-0.5 size-5 shrink-0" strokeWidth={2.5} aria-hidden />
                          {l}
                        </li>
                      ))}
                    </ul>
                  )}
                </Tile>
              ))}
            </div>
          </div>
        </Section>
      ))}

      {/* B17-Verweis */}
      {item.related && (
        <Section space="md">
          <div className="wrap">
            <Reveal>
              <Link
                to={item.related.to}
                className="group tone-dark relative isolate flex min-h-[420px] items-end overflow-hidden rounded-[28px] p-8 md:min-h-[520px] md:p-14"
              >
                <ParallaxImage src="/images/stock/driver-smile.webp" alt="" fill className="-z-10" speed={0.08} />
                <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-t from-black via-black/40 to-transparent" />
                <div className="max-w-[36rem]">
                  <p className="eyebrow mb-3">B17 · Begleitetes Fahren</p>
                  <p className="display-sm text-metal">{item.related.label}</p>
                  <span className="mt-6 inline-flex items-center gap-2 text-[17px] font-medium text-white">
                    Weiterlesen <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden />
                  </span>
                </div>
              </Link>
            </Reveal>
          </div>
        </Section>
      )}

      {/* Kosten – heller „Tech Specs“-Block */}
      <Section id="kosten" tone="mint">
        <div className="wrap grid gap-14 lg:grid-cols-12 lg:gap-20">
          <Reveal className="lg:col-span-5">
            <Heading eyebrow={`Klasse ${item.code}`} title="Kosten." size="lg">
              Dazu kommen die Gebühren für den Führerscheinantrag und die TÜV-Gebühren für die Prüfungen.
            </Heading>
            <div className="mt-8">
              <ButtonLink to="/preise" variant="link" className="text-[19px]">
                Alle Klassen im Preisvergleich
              </ButtonLink>
            </div>
          </Reveal>
          <div className="lg:col-span-7">
            {item.fees && <FeeList fees={item.fees} showLessonNote={item.showLessonNote} />}
            {item.pricePackage && (
              <Stagger className="space-y-4">
                {item.pricePackage.map((p, i) => (
                  <StaggerItem key={p} className={cn("flex gap-4 rounded-[28px] p-8", i === 0 ? "bg-green text-[#0f1a00]" : "bg-tile")}>
                    {i === 0 ? (
                      <Package className="mt-1 size-6 shrink-0" aria-hidden />
                    ) : (
                      <Info className="text-muted mt-1 size-6 shrink-0" aria-hidden />
                    )}
                    <p className={cn("text-[19px] leading-snug", i === 0 && "font-semibold")}>{p}</p>
                  </StaggerItem>
                ))}
                <StaggerItem>
                  <ButtonLink to="/klassen/a1" variant="link">
                    Preise der Klasse A1
                  </ButtonLink>
                </StaggerItem>
              </Stagger>
            )}
          </div>
        </div>
      </Section>

      {/* Galerie */}
      {item.gallery?.map((g) => (
        <section key={g.src} className="tone-white pt-24 md:pt-32">
          <ZoomMedia src={g.src} alt={g.alt} height="h-[60svh] md:h-[85svh]" />
          {g.caption && (
            <div className="wrap">
              <p className="text-muted mt-5 text-[15px]">{g.caption}</p>
            </div>
          )}
        </section>
      ))}

      {/* Weitere Klassen */}
      <Section space="md">
        <div className="wrap">
          <p className="text-muted mb-5 text-[15px] font-medium">Weitere Klassen</p>
          <div className="flex flex-wrap gap-2">
            {classes.map((c) => (
              <Link
                key={c.slug}
                to={c.path}
                prefetch="intent"
                aria-current={c.slug === item.slug ? "page" : undefined}
                className={cn(
                  "rounded-full px-5 py-2.5 text-[15px] font-semibold transition-colors",
                  c.slug === item.slug ? "bg-fg text-bg" : "bg-tile hover:bg-tile-2",
                )}
              >
                {c.navLabel}
              </Link>
            ))}
          </div>
          <Link to={next.path} prefetch="intent" className="group border-line mt-16 flex items-end justify-between gap-6 border-t pt-10">
            <span>
              <span className="text-muted block text-[15px] font-medium">Nächste Klasse</span>
              <span className="display-md mt-2 block transition-opacity group-hover:opacity-70">{next.shortName}</span>
            </span>
            <ArrowRight className="size-10 shrink-0 transition-transform duration-500 group-hover:translate-x-2 md:size-14" aria-hidden />
          </Link>
        </div>
      </Section>

      <CtaBand title={item.code === "B" ? "Bereit für deinen Führerschein?" : `Bereit für Klasse ${item.code}?`} image={item.image} />
    </>
  )
}

function ClassHero({ item }: { item: LicenseClass }) {
  const ref = useRef<HTMLElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] })
  const codeY = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [0, 120])
  const codeOpacity = useTransform(() => 1 - Math.min(1, scrollYProgress.get() / 0.9))
  const long = item.code.length > 2

  return (
    <header ref={ref} className="tone-white relative overflow-hidden pt-20 pb-20 text-center md:pt-28 md:pb-28">
      <div aria-hidden className="glow absolute top-10 left-1/2 aspect-square w-[80vw] max-w-[760px] -translate-x-1/2 opacity-40" />
      <motion.div style={{ y: codeY, opacity: codeOpacity }} aria-hidden>
        <motion.p
          initial={reduce ? false : { opacity: 0, scale: 0.92, filter: "blur(20px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          transition={{ duration: 1.6, ease: easeOutExpo }}
          className={cn(
            "text-leaf relative pb-2 leading-[0.9] font-semibold tracking-[-0.07em] select-none",
            long ? "text-[clamp(6rem,20vw,15rem)]" : "text-[clamp(9rem,30vw,22rem)]",
          )}
        >
          {item.code}
        </motion.p>
      </motion.div>
      <div className="wrap relative">
        <p className="eyebrow mt-6">
          {item.category === "auto" ? "Auto" : "Zweirad"} · {item.shortName}
        </p>
        <h1 className="display-md mx-auto mt-4 max-w-[20ch]">
          <AnimatedWords text={item.title} delay={0.2} />
        </h1>
        <Reveal delay={0.4}>
          <p className="copy mx-auto mt-6 max-w-[36rem]">{item.summary}</p>
        </Reveal>
        <Reveal delay={0.5}>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-x-7 gap-y-3">
            <ButtonLink to="/anmeldung">Jetzt anmelden</ButtonLink>
            <ButtonLink href="#kosten" variant="link" className="text-[19px]">
              Kosten ansehen
            </ButtonLink>
          </div>
        </Reveal>
      </div>
    </header>
  )
}
