import { Link } from "react-router"
import { classes } from "~/content/classes"
import { site } from "~/content/site"
import { Logo } from "../ui/logo"
import { useLenis } from "./smooth-scroll"

const columns: { title: string; links: [string, string][] }[] = [
  {
    title: "Führerschein",
    links: [
      ["Alle Klassen", "/klassen"],
      ["Preise", "/preise"],
      ["Ablauf & Kosten", "/info"],
      ["Theorieunterricht", "/unterricht"],
      ["Begleitetes Fahren ab 17", "/begleitetes-fahren"],
    ],
  },
  { title: "Klassen", links: classes.map((c) => [c.navLabel, c.path]) },
  {
    title: "Fahrschule",
    links: [
      ["Startseite", "/"],
      ["Team", "/team"],
      ["Anmeldung", "/anmeldung"],
      ["Impressum & Datenschutz", "/impressum"],
    ],
  },
]

/** Footer im Apple-Stil: kleine Schrift, klare Spalten, dunkel */
export function Footer() {
  const lenis = useLenis()
  const toTop = () => (lenis ? lenis.scrollTo(0, { duration: 1.6 }) : window.scrollTo({ top: 0, behavior: "smooth" }))

  return (
    <footer className="tone-light text-[12px] leading-[1.5] text-[#6e6e73]">
      <div className="wrap pt-14 pb-8">
        <div className="flex items-center justify-between border-b border-black/10 pb-6">
          <Link to="/" aria-label="Startseite">
            <Logo className="h-10" />
          </Link>
          <button type="button" onClick={toTop} className="transition-colors hover:text-ink">
            Nach oben ↑
          </button>
        </div>

        <div className="grid gap-10 py-10 sm:grid-cols-2 lg:grid-cols-4">
          {columns.map((col) => (
            <div key={col.title}>
              <h2 className="mb-3 font-semibold text-ink">{col.title}</h2>
              <ul className="space-y-2">
                {col.links.map(([label, to]) => (
                  <li key={to + label}>
                    <Link to={to} className="transition-colors hover:text-ink hover:underline">
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div>
            <h2 className="mb-3 font-semibold text-ink">Kontakt</h2>
            <address className="space-y-2 not-italic">
              <p>
                {site.name}
                <br />
                Inh. {site.owner}
                <br />
                {site.address.street}
                <br />
                {site.address.zip} {site.address.city}
              </p>
              <p>
                <a href={site.phone.href} className="hover:text-ink">
                  Tel.: {site.phone.display}
                </a>
                <br />
                <a href={`mailto:${site.email}`} className="hover:text-ink">
                  {site.email}
                </a>
              </p>
              <p>
                <span className="text-ink">Öffnungs- und Anmeldezeiten</span>
                <br />
                {site.hours.openingAndRegistration}
              </p>
              <p>
                <a href={site.facebook} target="_blank" rel="noopener noreferrer" className="hover:text-ink">
                  Facebook
                </a>
              </p>
            </address>
          </div>
        </div>

        <div className="flex flex-col gap-2 border-t border-black/10 pt-6 sm:flex-row sm:justify-between">
          <p>Copyright © {new Date().getFullYear()} {site.name}. Alle Rechte vorbehalten.</p>
          <Link to="/impressum" className="hover:text-ink">
            Impressum & Datenschutz
          </Link>
        </div>
      </div>
    </footer>
  )
}
