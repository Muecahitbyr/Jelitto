import { AnimatePresence, motion } from "motion/react"
import { CheckCircle2, Download, MapPin, Phone } from "lucide-react"
import { useState, type FormEvent } from "react"
import type { MetaFunction } from "react-router"
import { Link } from "react-router"
import { ButtonLink } from "~/components/ui/button"
import { PageHero } from "~/components/ui/page-hero"
import { Reveal } from "~/components/ui/reveal"
import { Heading, Section } from "~/components/ui/section"
import { Tile } from "~/components/ui/tile"
import { classes } from "~/content/classes"
import { site } from "~/content/site"
import { cn } from "~/lib/cn"
import { easeOutExpo } from "~/lib/motion"
import { seo } from "~/lib/seo"

export const meta: MetaFunction = () =>
  seo({
    title: "Anmeldung – Fahrschule Jelitto Kaufbeuren",
    description:
      "Melde dich bei der Fahrschule Jelitto in Kaufbeuren an: vor Ort Mo.–Do. ab 18:30 Uhr in der Alte Weberei 12, telefonisch, per Formular-Download oder online.",
    path: "/anmeldung",
  })

const licenseOptions = [...classes.map((c) => c.navLabel), "B17 (Begleitetes Fahren)"]

/**
 * Online-Anmeldung. Das Formular erzeugt aktuell eine vorausgefüllte E-Mail an die Fahrschule
 * (funktioniert ohne Server). Für den direkten Versand kann `handleSubmit` an einen
 * Formular-Dienst oder die Fahrschulsoftware angebunden werden – siehe README.
 */
export default function AnmeldungPage() {
  const [sent, setSent] = useState(false)

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    const get = (k: string) => String(data.get(k) ?? "").trim()
    const body = [
      "Online-Anmeldung über fahrschule-jelitto.com",
      "",
      `Führerscheinklasse: ${get("klasse")}`,
      `Vorname: ${get("vorname")}`,
      `Nachname: ${get("nachname")}`,
      `Geburtsdatum: ${get("geburtsdatum")}`,
      `Straße und Hausnummer: ${get("strasse")}`,
      `PLZ / Ort: ${get("plz")} ${get("ort")}`,
      `Mobiltelefon: ${get("telefon")}`,
      `E-Mail: ${get("email")}`,
      `Vorhandene Führerscheinklassen: ${get("vorbesitz") || "–"}`,
      "",
      "Nachricht:",
      get("nachricht") || "–",
    ].join("\n")
    const subject = `Anmeldung Klasse ${get("klasse")} – ${get("vorname")} ${get("nachname")}`
    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    setSent(true)
  }

  return (
    <>
      <PageHero
        eyebrow="Anmeldung"
        title="Dein Weg zum Führerschein beginnt hier."
        image="/images/stock/car-key.webp"
        imageAlt="Hand hält einen Autoschlüssel"
        imagePosition="center 40%"
        lead={
          <>
            Du kannst dich auch online anmelden – oder komm <strong>montags bis donnerstags ab 18:30 Uhr</strong> direkt bei uns in der Alten Weberei 12
            in Kaufbeuren vorbei.
          </>
        }
        breadcrumbs={[{ label: "Startseite", to: "/" }, { label: "Anmeldung" }]}
      />

      <Section>
        <div className="wrap grid gap-4 md:grid-cols-3">
          <Tile className="flex min-h-[340px] flex-col p-8 md:p-10">
            <MapPin className="text-accent size-8" strokeWidth={1.6} aria-hidden />
            <h2 className="mt-auto pt-10 text-[28px] font-semibold tracking-[-0.03em]">Vorbeikommen</h2>
            <p className="body-copy mt-3">
              {site.address.street}, {site.address.zip} {site.address.city}
              <br />
              Öffnungszeit für Neuanmeldungen: Mo./Di/Mi/Do ab 18:30 Uhr
            </p>
            <div className="mt-6">
              <ButtonLink href={site.maps.link} variant="link">
                Route planen
              </ButtonLink>
            </div>
          </Tile>
          <Tile delay={0.06} className="flex min-h-[340px] flex-col p-8 md:p-10">
            <Phone className="text-accent size-8" strokeWidth={1.6} aria-hidden />
            <h2 className="mt-auto pt-10 text-[28px] font-semibold tracking-[-0.03em]">Anrufen</h2>
            <p className="body-copy mt-3">Du erreichst uns telefonisch unter</p>
            <a href={site.phone.href} className="text-metal mt-2 text-[34px] font-semibold tracking-[-0.03em]">
              {site.phone.display}
            </a>
          </Tile>
          <Tile delay={0.12} className="!bg-green flex min-h-[340px] flex-col p-8 text-[#0f1a00] md:p-10">
            <Download className="size-8" strokeWidth={1.6} aria-hidden />
            <h2 className="mt-auto pt-10 text-[28px] font-semibold tracking-[-0.03em]">Anmeldung zum Download</h2>
            <p className="mt-3 text-[17px] opacity-75">Ausfüllen und mitbringen.</p>
            <a
              href={site.downloads.anmeldung}
              download
              className="bg-ink mt-6 inline-flex w-fit items-center gap-2 rounded-full px-5 py-2.5 text-[15px] font-medium text-white"
            >
              <Download className="size-4" aria-hidden /> PDF herunterladen
            </a>
          </Tile>
        </div>
      </Section>

      <Section tone="light" id="online">
        <div className="wrap grid gap-14 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-4">
            <Heading eyebrow="Online" title="Online anmelden." size="md">
              Wir melden uns per E-Mail, Telefon oder direkt vor Ort bei dir, um einen Termin zum Vertragsabschluss zu vereinbaren. Ein Vertrag kommt
              erst bei Unterzeichnung der Vertragsunterlagen zustande.
            </Heading>
          </Reveal>

          <Reveal delay={0.1} className="lg:col-span-8">
            <AnimatePresence mode="wait">
              {sent ? (
                <motion.div
                  key="done"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, ease: easeOutExpo }}
                  className="bg-tile rounded-[28px] p-10 text-center md:p-16"
                >
                  <CheckCircle2 className="text-green mx-auto size-14" aria-hidden />
                  <p className="display-sm mt-6">Fast geschafft!</p>
                  <p className="text-muted mx-auto mt-4 max-w-md text-lg">
                    Dein E-Mail-Programm hat sich mit deiner Anmeldung geöffnet. Bitte sende die E-Mail ab – wir melden uns dann bei dir.
                  </p>
                  <button type="button" onClick={() => setSent(false)} className="text-accent mt-8 font-medium hover:underline">
                    Formular erneut öffnen
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  exit={{ opacity: 0, scale: 0.98 }}
                  onSubmit={handleSubmit}
                  className="bg-tile grid gap-5 rounded-[28px] p-6 sm:grid-cols-2 md:p-10"
                >
                  <Field label="Führerscheinklasse" className="sm:col-span-2">
                    <select name="klasse" required defaultValue="" className={inputClass}>
                      <option value="" disabled>
                        Bitte wählen
                      </option>
                      {licenseOptions.map((o) => (
                        <option key={o}>{o}</option>
                      ))}
                    </select>
                  </Field>
                  <Field label="Vorname">
                    <input name="vorname" required autoComplete="given-name" className={inputClass} />
                  </Field>
                  <Field label="Nachname">
                    <input name="nachname" required autoComplete="family-name" className={inputClass} />
                  </Field>
                  <Field label="Geburtsdatum">
                    <input name="geburtsdatum" type="date" required autoComplete="bday" className={inputClass} />
                  </Field>
                  <Field label="Mobiltelefon">
                    <input name="telefon" type="tel" required autoComplete="tel" className={inputClass} />
                  </Field>
                  <Field label="Straße und Hausnummer" className="sm:col-span-2">
                    <input name="strasse" required autoComplete="street-address" className={inputClass} />
                  </Field>
                  <Field label="PLZ">
                    <input name="plz" required inputMode="numeric" autoComplete="postal-code" className={inputClass} />
                  </Field>
                  <Field label="Ort">
                    <input name="ort" required autoComplete="address-level2" className={inputClass} />
                  </Field>
                  <Field label="E-Mail" className="sm:col-span-2">
                    <input name="email" type="email" required autoComplete="email" className={inputClass} />
                  </Field>
                  <Field label="Vorhandene Führerscheinklassen" optional className="sm:col-span-2">
                    <input name="vorbesitz" placeholder="z. B. AM, A1" className={inputClass} />
                  </Field>
                  <Field label="Nachricht" optional className="sm:col-span-2">
                    <textarea name="nachricht" rows={4} className={cn(inputClass, "resize-y")} />
                  </Field>
                  <label className="text-muted flex gap-3 text-sm sm:col-span-2">
                    <input type="checkbox" required className="accent-[#88b018] mt-0.5 size-4 shrink-0" />
                    <span>
                      Ich habe die{" "}
                      <Link to="/impressum#datenschutz" className="text-accent underline-offset-2 hover:underline">
                        Datenschutzerklärung
                      </Link>{" "}
                      gelesen und bin mit der Verarbeitung meiner Angaben zur Vorbereitung der Vertragsunterlagen einverstanden.
                    </span>
                  </label>
                  <div className="sm:col-span-2">
                    <button
                      type="submit"
                      className="bg-green w-full rounded-full px-7 py-4 text-[#0f1a00] text-[17px] font-semibold transition-transform active:scale-[0.98] sm:w-auto"
                    >
                      Anmeldung absenden
                    </button>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </Reveal>
        </div>
      </Section>
    </>
  )
}

const inputClass =
  "bg-tile-2/60 w-full rounded-[14px] border border-transparent px-4 py-3.5 text-[17px] outline-none transition-[border-color,box-shadow] focus:border-[#88b018] focus:shadow-[0_0_0_4px_rgb(248_216_0/0.35)]"

function Field({ label, optional, className, children }: { label: string; optional?: boolean; className?: string; children: React.ReactNode }) {
  return (
    <label className={cn("block", className)}>
      <span className="mb-2 block text-sm font-medium">
        {label} {optional && <span className="text-muted font-normal">(optional)</span>}
      </span>
      {children}
    </label>
  )
}
