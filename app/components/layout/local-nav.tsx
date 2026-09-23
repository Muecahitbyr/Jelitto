import { Link } from "react-router"
import { cn } from "~/lib/cn"

/**
 * Unter-Navigation einer Seite (wie die Produkt-Leiste auf apple.com):
 * klebt unter der Hauptnavigation, links der Seitentitel, rechts Sprungmarken + CTA.
 */
export function LocalNav({
  title,
  links = [],
  cta = { label: "Anmelden", to: "/anmeldung" },
  className,
}: {
  title: string
  links?: { label: string; href: string }[]
  cta?: { label: string; to: string }
  className?: string
}) {
  return (
    <div className={cn("glass-nav sticky top-16 z-40 border-b border-black/[0.08] text-ink", className)}>
      <div className="wrap flex h-12 items-center justify-between gap-6">
        <p className="truncate text-[19px] font-semibold tracking-[-0.02em] md:text-[21px]">{title}</p>
        <div className="flex shrink-0 items-center gap-6">
          <ul className="hidden items-center gap-6 md:flex">
            {links.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="text-[12.5px] text-ink/70 transition-colors hover:text-green-deep">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <Link to={cta.to} className="bg-green rounded-full px-3.5 py-1 text-[12.5px] font-semibold text-[#0f1a00] transition-transform active:scale-95">
            {cta.label}
          </Link>
        </div>
      </div>
    </div>
  )
}
