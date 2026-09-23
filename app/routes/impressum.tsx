import type { MetaFunction } from "react-router"
import { Reveal } from "~/components/ui/reveal"
import { agb, datenschutz } from "~/content/legal"
import { site } from "~/content/site"
import { seo } from "~/lib/seo"

export const meta: MetaFunction = () =>
  seo({
    title: "Impressum & Datenschutz - Fahrschule Jelitto",
    description:
      "Impressum und Datenschutzerklärung der Fahrschule Jelitto in Kaufbeuren: Inhaber Berndt Gaugler, Alte Weberei 12, Telefon 0171 1977876.",
    path: "/impressum",
  })

const toc = [
  { id: "impressum", label: "Impressum" },
  { id: "datenschutz", label: "Datenschutzerklärung" },
  { id: "agb", label: "Allgemeine Geschäftsbedingungen" },
]

export default function ImpressumPage() {
  return (
    <div className="tone-white pt-36 pb-28 md:pt-48 md:pb-40">
      <div className="wrap">
        <Reveal>
          <p className="eyebrow mb-4">Rechtliches</p>
          <h1 className="display-lg">Impressum & Datenschutz</h1>
        </Reveal>

        <div className="mt-14 grid gap-12 md:mt-20 lg:grid-cols-12">
          <nav aria-label="Inhalt" className="min-w-0 lg:col-span-3">
            <ul className="no-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5 lg:sticky lg:top-24 lg:mx-0 lg:flex-col lg:gap-1 lg:overflow-visible lg:px-0">
              {toc.map((t) => (
                <li key={t.id} className="shrink-0">
                  <a
                    href={`#${t.id}`}
                    className="bg-tile hover:text-fg text-muted block rounded-full px-4 py-2 text-[14px] font-medium transition-colors lg:rounded-xl lg:bg-transparent lg:px-3"
                  >
                    {t.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="min-w-0 space-y-24 lg:col-span-9">
            {/* Impressum */}
            <section id="impressum" className="scroll-mt-28">
              <h2 className="display-sm">Impressum</h2>
              <div className="mt-10 grid gap-5 md:grid-cols-2">
                <LegalCard title="Angaben gemäß § 5 TMG">
                  {site.owner}
                  <br />
                  {site.name}
                  <br />
                  {site.address.street}
                  <br />
                  {site.address.zip} {site.address.city}
                </LegalCard>
                <LegalCard title="Kontakt">
                  Telefon: <a href={site.phone.href}>{site.phone.international}</a>
                  <br />
                  E-Mail: <a href={`mailto:${site.email}`}>{site.email}</a>
                </LegalCard>
                <LegalCard title="Aufsichtsbehörde">
                  Landratsamt Kaufbeuren
                  <br />
                  Rathaus Kaufbeuren
                  <br />
                  Am Graben 3
                  <br />
                  87600 Kaufbeuren
                  <br />
                  <a href="https://www.kaufbeuren.de/home.aspx" target="_blank" rel="noopener noreferrer">
                    https://www.kaufbeuren.de/home.aspx
                  </a>
                </LegalCard>
                <LegalCard title="Berufsbezeichnung und berufsrechtliche Regelungen">
                  Berufsbezeichnung: Verkehrspädagoge
                  <br />
                  Zuständige Kammer:
                  <br />
                  Verliehen durch: Bayern
                  <br />
                  Es gelten folgende berufsrechtliche Regelungen:
                  <br />
                  Regelungen einsehbar unter:
                </LegalCard>
                <LegalCard title="Angaben zur Berufshaftpflichtversicherung">
                  Name und Sitz des Versicherers:
                  <br />
                  Fahrlehrerversicherung
                  <br />
                  Mittlerer Pfad 5
                  <br />
                  70499 Stuttgart
                  <br />
                  <br />
                  Geltungsraum der Versicherung:
                  <br />
                  Deutschland
                </LegalCard>
                <LegalCard title="Verbraucherstreitbeilegung">
                  Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.
                </LegalCard>
              </div>
              <p className="text-muted mt-6 text-sm">
                Quelle:{" "}
                <a href="https://www.e-recht24.de" target="_blank" rel="noopener noreferrer" className="underline-offset-2 hover:underline">
                  https://www.e-recht24.de
                </a>
              </p>
            </section>

            {/* Datenschutz */}
            <section id="datenschutz" className="scroll-mt-28">
              <h2 className="display-sm">Datenschutzerklärung</h2>
              <div className="bg-tile mt-10 rounded-[24px] p-7 text-[17px] leading-relaxed md:p-9">
                {datenschutz.address.map((line) => (
                  <span key={line} className="block font-semibold">
                    {line}
                  </span>
                ))}
                {datenschutz.intro.map((p) => (
                  <p key={p.text} className="text-muted mt-4">
                    {p.text}
                  </p>
                ))}
              </div>
              <div className="divide-line mt-6 divide-y">
                {datenschutz.sections.map((section) => (
                  <div key={section.heading} className="grid gap-3 py-8 md:grid-cols-12 md:gap-10">
                    <h3 className="text-xl font-semibold tracking-tight md:col-span-4">{section.heading}</h3>
                    <div className="text-muted min-w-0 space-y-4 text-[17px] leading-relaxed [overflow-wrap:anywhere] md:col-span-8">
                      {section.paragraphs.map((p) => (
                        <p key={p.text}>
                          <LinkedText text={p.text} links={p.links} />
                        </p>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* AGB */}
            <section id="agb" className="scroll-mt-28">
              <h2 className="display-sm">Allgemeine Geschäftsbedingungen</h2>
              <div className="mt-10 space-y-5">
                {agb.map((z) => (
                  <article key={z.title} className="bg-tile rounded-[24px] p-7 md:p-10">
                    <h3 className="text-muted text-[13px] font-semibold tracking-wide uppercase">{z.title}</h3>
                    <div className="mt-4 space-y-7">
                      {z.blocks.map((block, bi) => (
                        <div key={bi}>
                          {block.heading && <h4 className="text-xl font-semibold tracking-tight md:text-2xl">{block.heading}</h4>}
                          <div className="text-muted mt-2 space-y-3 text-[17px] leading-relaxed">
                            {block.paragraphs.map((p, pi) => (
                              <p key={pi} className={/^[a-e]\) /.test(p) ? "pl-6 -indent-6" : undefined}>
                                {p}
                              </p>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </article>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}

function LegalCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-tile rounded-[24px] p-7 md:p-8">
      <h3 className="text-lg font-semibold tracking-tight">{title}</h3>
      <p className="text-muted [&_a]:text-fg [&_a]:underline mt-3 text-[17px] leading-relaxed break-words [&_a]:underline-offset-2 hover:[&_a]:underline">
        {children}
      </p>
    </div>
  )
}

/** Ersetzt Link-Beschriftungen im Text durch echte Links */
function LinkedText({ text, links }: { text: string; links?: { href: string; label: string }[] }) {
  if (!links?.length) return <>{text}</>
  const parts: React.ReactNode[] = []
  let rest = text
  links.forEach((link, i) => {
    const idx = rest.indexOf(link.label)
    if (idx === -1) return
    parts.push(rest.slice(0, idx))
    parts.push(
      <a key={i} href={link.href} target="_blank" rel="noopener noreferrer" className="text-fg underline underline-offset-2">
        {link.label}
      </a>,
    )
    rest = rest.slice(idx + link.label.length)
  })
  parts.push(rest)
  return <>{parts}</>
}
