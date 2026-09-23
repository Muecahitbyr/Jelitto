import { AnimatePresence, motion } from "motion/react"
import { Phone } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import { Link, NavLink, useLocation } from "react-router"
import { autoClasses, bikeClasses } from "~/content/classes"
import { mainNav, site } from "~/content/site"
import { cn } from "~/lib/cn"
import { easeOutExpo } from "~/lib/motion"
import { Logo } from "../ui/logo"
import { useLenis } from "./smooth-scroll"

type FlyoutLink = { label: string; sub: string; to: string }

const autoLinks: FlyoutLink[] = [
  ...autoClasses.map((c) => ({ label: c.code, sub: c.shortName, to: c.path })),
  { label: "B17", sub: "Begleitetes Fahren ab 17", to: "/begleitetes-fahren" },
]
const bikeLinks: FlyoutLink[] = bikeClasses.map((c) => ({ label: c.code, sub: c.shortName, to: c.path }))

/** Globale Navigation im Stil von apple.com: 44 px, Glas, zentrierte Links, Flyout für „Klassen“ */
export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [flyout, setFlyout] = useState(false)
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined)
  const location = useLocation()
  const lenis = useLenis()

  useEffect(() => {
    setMenuOpen(false)
    setFlyout(false)
  }, [location.pathname])

  useEffect(() => {
    if (menuOpen) lenis?.stop()
    else lenis?.start()
    document.documentElement.style.overflow = menuOpen ? "hidden" : ""
  }, [menuOpen, lenis])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMenuOpen(false)
        setFlyout(false)
      }
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [])

  const open = () => {
    clearTimeout(timer.current)
    setFlyout(true)
  }
  const close = () => {
    clearTimeout(timer.current)
    timer.current = setTimeout(() => setFlyout(false), 160)
  }

  const klassenActive = location.pathname.startsWith("/klassen") || ["/b196", "/b197", "/begleitetes-fahren"].includes(location.pathname)

  return (
    <>
      <header className={cn("glass-nav fixed inset-x-0 top-0 z-50 border-b border-black/[0.06] text-ink", (flyout || menuOpen) && "!bg-white")} onMouseLeave={close}>
        <a href="#inhalt" className="bg-green text-ink sr-only z-50 rounded-full px-4 py-2 focus:not-sr-only focus:absolute focus:top-1.5 focus:left-2">
          Zum Inhalt springen
        </a>
        <nav className="wrap flex h-16 items-center justify-between" aria-label="Hauptnavigation">
          <Link to="/" aria-label={`${site.name} – Startseite`} className="relative z-10 transition-opacity hover:opacity-80">
            <Logo className="h-11 md:h-12" />
          </Link>

          <ul className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-7 lg:flex">
            {mainNav.slice(1).map((item) => (
              <li key={item.to} onMouseEnter={item.to === "/klassen" ? open : close}>
                <NavLink
                  to={item.to}
                  prefetch="intent"
                  onFocus={item.to === "/klassen" ? open : undefined}
                  aria-expanded={item.to === "/klassen" ? flyout : undefined}
                  className={({ isActive }) =>
                    cn(
                      "relative text-[12.5px] tracking-[-0.01em] transition-colors",
                      isActive || (item.to === "/klassen" && klassenActive) ? "text-green-deep font-medium" : "text-ink/75 hover:text-ink",
                    )
                  }
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-1">
            <a href={site.phone.href} aria-label={`Anrufen: ${site.phone.display}`} className="hidden items-center gap-1.5 px-2 text-[12.5px] text-ink/75 transition-colors hover:text-ink md:inline-flex">
              <Phone className="size-[14px]" aria-hidden /> {site.phone.display}
            </a>
            <a href={site.phone.href} aria-label={`Anrufen: ${site.phone.display}`} className="grid size-10 place-items-center text-ink/80 md:hidden">
              <Phone className="size-[16px]" aria-hidden />
            </a>
            <Link to="/anmeldung" className="bg-green ml-2 hidden rounded-full px-3.5 py-1 text-[12.5px] font-semibold text-[#0f1a00] transition-transform active:scale-95 sm:inline-flex">
              Anmelden
            </Link>
            <button
              type="button"
              className="relative z-10 -mr-2.5 grid size-11 place-items-center lg:hidden"
              aria-label={menuOpen ? "Menü schließen" : "Menü öffnen"}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              onClick={() => setMenuOpen((v) => !v)}
            >
              <span className="relative block h-[10px] w-[17px]">
                <span className={cn("absolute left-0 h-[1.2px] w-full rounded bg-current transition-all duration-500 ease-[var(--ease-out-expo)]", menuOpen ? "top-1/2 rotate-45" : "top-0")} />
                <span className={cn("absolute left-0 h-[1.2px] w-full rounded bg-current transition-all duration-500 ease-[var(--ease-out-expo)]", menuOpen ? "top-1/2 -rotate-45" : "top-full")} />
              </span>
            </button>
          </div>
        </nav>

        {/* Flyout „Klassen“ */}
        <AnimatePresence>
          {flyout && (
            <motion.div
              key="flyout"
              initial={{ height: 0 }}
              animate={{ height: "auto" }}
              exit={{ height: 0 }}
              transition={{ duration: 0.45, ease: easeOutExpo }}
              className="hidden overflow-hidden lg:block"
              onMouseEnter={open}
            >
              <div className="wrap grid grid-cols-12 gap-10 pt-8 pb-14">
                <FlyoutColumn title="Auto" links={autoLinks} className="col-span-4" />
                <FlyoutColumn title="Zweirad" links={bikeLinks} className="col-span-4" />
                <div className="col-span-4">
                  <p className="mb-4 text-[12px] text-[#6e6e73]">Mehr zum Führerschein</p>
                  <ul className="space-y-2.5">
                    {[
                      ["Alle Klassen", "/klassen"],
                      ["Preise", "/preise"],
                      ["Ablauf & Kosten", "/info"],
                      ["Theorieunterricht", "/unterricht"],
                      ["Anmeldung", "/anmeldung"],
                    ].map(([label, to], i) => (
                      <motion.li key={to} initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.04 * i + 0.08, duration: 0.4 }}>
                        <Link to={to} className="text-[13px] font-semibold text-ink/85 hover:text-green-deep">
                          {label}
                        </Link>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <AnimatePresence>
        {flyout && (
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="fixed inset-0 z-40 hidden bg-black/15 backdrop-blur-xl lg:block"
            onMouseEnter={close}
            aria-hidden
          />
        )}
      </AnimatePresence>

      {/* Mobiles Menü */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            key="mobile"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.2 } }}
            className="fixed inset-0 z-40 overflow-y-auto bg-white pt-20 pb-12 text-ink lg:hidden"
          >
            <nav className="wrap" aria-label="Mobile Navigation">
              <ul>
                {mainNav.map((item, i) => (
                  <motion.li key={item.to} initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.03 * i, duration: 0.5, ease: easeOutExpo }}>
                    <NavLink to={item.to} className="block py-1.5 text-[28px] leading-tight font-semibold tracking-[-0.03em]">
                      {item.label}
                    </NavLink>
                  </motion.li>
                ))}
              </ul>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="mt-10 grid grid-cols-2 gap-8 border-t border-black/10 pt-8">
                {[
                  ["Auto", autoLinks],
                  ["Zweirad", bikeLinks],
                ].map(([title, links]) => (
                  <div key={title as string}>
                    <p className="mb-3 text-[12px] text-[#6e6e73]">{title as string}</p>
                    <ul className="space-y-2">
                      {(links as FlyoutLink[]).map((l) => (
                        <li key={l.to}>
                          <Link to={l.to} className="text-[15px] font-semibold">
                            {l.label} <span className="font-normal text-[#6e6e73]">· {l.sub.replace(/^(Klasse|Schlüsselzahl) /, "")}</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </motion.div>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="mt-10 grid gap-3">
                <Link to="/anmeldung" className="bg-green rounded-full py-3.5 text-center font-semibold text-[#0f1a00]">
                  Jetzt anmelden
                </Link>
                <a href={site.phone.href} className="inline-flex items-center justify-center gap-2 rounded-full py-3.5 font-medium ring-1 ring-black/15">
                  <Phone className="size-4" aria-hidden /> {site.phone.display}
                </a>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

function FlyoutColumn({ title, links, className }: { title: string; links: FlyoutLink[]; className?: string }) {
  return (
    <div className={className}>
      <p className="mb-4 text-[12px] text-[#6e6e73]">{title}</p>
      <ul className="space-y-1.5">
        {links.map((l, i) => (
          <motion.li key={l.to} initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.03 * i + 0.06, duration: 0.4, ease: easeOutExpo }}>
            <Link to={l.to} prefetch="intent" className="group flex items-baseline gap-4">
              <span className="w-16 text-[24px] font-semibold text-ink tracking-[-0.03em] transition-colors group-hover:text-green-deep">{l.label}</span>
              <span className="text-[12px] text-[#6e6e73] transition-colors group-hover:text-ink">{l.sub}</span>
            </Link>
          </motion.li>
        ))}
      </ul>
    </div>
  )
}
