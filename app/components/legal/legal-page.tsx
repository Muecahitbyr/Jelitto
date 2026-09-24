import type { ReactNode } from "react"
import { NavLink } from "react-router"
import { openConsentSettings } from "~/lib/consent"
import { cn } from "~/lib/cn"
import { Reveal } from "../ui/reveal"

const pages = [
  { label: "Impressum", to: "/impressum" },
  { label: "Datenschutz", to: "/datenschutz" },
  { label: "AGB", to: "/agb" },
]

/** Gemeinsamer Rahmen für Impressum, Datenschutz und AGB */
export function LegalPage({
  title,
  lead,
  toc,
  children,
}: {
  title: string
  lead?: ReactNode
  toc?: { id: string; label: string }[]
  children: ReactNode
}) {
  return (
    <div className="tone-white pt-36 pb-28 md:pt-48 md:pb-40">
      <div className="wrap">
        <Reveal>
          <p className="eyebrow mb-4">Rechtliches</p>
          <h1 className="display-lg max-md:text-[1.85rem] max-md:leading-tight">{title}</h1>
          {lead && <div className="copy mt-6 max-w-[42rem]">{lead}</div>}
        </Reveal>

        {/* Umschalter zwischen den Rechtsseiten */}
        <nav aria-label="Rechtliche Seiten" className="mt-10 flex flex-wrap items-center gap-2">
          {pages.map((p) => (
            <NavLink
              key={p.to}
              to={p.to}
              className={({ isActive }) =>
                cn(
                  "rounded-full px-4 py-2 text-[14px] font-semibold transition-colors",
                  isActive ? "bg-ink text-white" : "bg-tile text-fg hover:bg-tile-2",
                )
              }
            >
              {p.label}
            </NavLink>
          ))}
          <button type="button" onClick={openConsentSettings} className="text-green-deep px-3 py-2 text-[14px] font-medium hover:underline">
            Cookie-Einstellungen
          </button>
        </nav>

        <div className="mt-14 grid gap-12 md:mt-16 lg:grid-cols-12">
          {toc && (
            <nav aria-label="Inhalt" className="min-w-0 lg:col-span-3">
              <p className="text-muted mb-3 hidden text-[13px] font-medium lg:block">Auf dieser Seite</p>
              <ul className="no-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5 lg:sticky lg:top-24 lg:mx-0 lg:flex-col lg:gap-0.5 lg:overflow-visible lg:px-0">
                {toc.map((t) => (
                  <li key={t.id} className="shrink-0">
                    <a
                      href={`#${t.id}`}
                      className="bg-tile hover:text-fg text-muted block rounded-full px-4 py-2 text-[14px] font-medium transition-colors lg:rounded-xl lg:bg-transparent lg:px-3 lg:py-1.5"
                    >
                      {t.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          )}
          <div className={cn("min-w-0", toc ? "lg:col-span-9" : "lg:col-span-12")}>{children}</div>
        </div>
      </div>
    </div>
  )
}

/** Überschrift + Text eines Abschnitts im Stil der Rechtsseiten */
export function LegalSection({ id, title, children }: { id?: string; title: string; children: ReactNode }) {
  return (
    <section id={id} className="border-line grid gap-3 border-t py-8 first:border-t-0 first:pt-0 md:grid-cols-12 md:gap-10">
      <h2 className="text-[21px] leading-snug font-semibold tracking-[-0.02em] md:col-span-4">{title}</h2>
      <div className="body-copy min-w-0 space-y-4 [overflow-wrap:anywhere] md:col-span-8">{children}</div>
    </section>
  )
}
