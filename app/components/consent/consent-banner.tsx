import { AnimatePresence, motion, useReducedMotion } from "motion/react"
import { ShieldCheck } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import { Link } from "react-router"
import { onOpenConsentSettings, saveConsent, useConsent } from "~/lib/consent"
import { cn } from "~/lib/cn"
import { easeOutExpo } from "~/lib/motion"

/**
 * Datenschutz-/Cookie-Einstellungen.
 * Erscheint, solange noch keine Auswahl getroffen wurde, und lässt sich jederzeit
 * über „Cookie-Einstellungen“ im Footer wieder öffnen.
 * „Alle akzeptieren“ und „Nur notwendige“ sind bewusst gleichwertig gestaltet.
 */
export function ConsentBanner() {
  const consent = useConsent()
  const reduce = useReducedMotion()
  const [mounted, setMounted] = useState(false)
  const [forced, setForced] = useState(false)
  const [settings, setSettings] = useState(false)
  const [maps, setMaps] = useState(false)

  useEffect(() => setMounted(true), [])
  useEffect(
    () =>
      onOpenConsentSettings(() => {
        setForced(true)
        setSettings(true)
      }),
    [],
  )
  // Schalter mit gespeicherter Auswahl vorbelegen
  useEffect(() => setMaps(consent.maps), [consent.maps])

  const open = mounted && (!consent.decided || forced)

  // Auf dem Handy liegt der Banner über dem Chat-Knopf. Seine Höhe wird als CSS-Variable
  // bereitgestellt, damit der Chat-Knopf darüber ausweichen kann (siehe chat-widget.tsx).
  const panelRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const root = document.documentElement
    const el = panelRef.current
    if (!open || !el) {
      root.style.removeProperty("--consent-offset")
      return
    }
    const update = () => root.style.setProperty("--consent-offset", window.innerWidth < 768 ? `${el.offsetHeight + 12}px` : "0px")
    update()
    const ro = new ResizeObserver(update)
    ro.observe(el)
    window.addEventListener("resize", update)
    return () => {
      ro.disconnect()
      window.removeEventListener("resize", update)
      root.style.removeProperty("--consent-offset")
    }
  }, [open, settings])

  const decide = (allowMaps: boolean) => {
    saveConsent({ maps: allowMaps })
    setForced(false)
    setSettings(false)
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="consent"
          ref={panelRef}
          role="dialog"
          aria-labelledby="consent-title"
          aria-describedby="consent-text"
          initial={reduce ? false : { opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 30, transition: { duration: 0.25 } }}
          transition={{ duration: 0.6, ease: easeOutExpo }}
          className="tone-white fixed inset-x-2 bottom-[max(0.5rem,env(safe-area-inset-bottom))] z-[46] rounded-[28px] border border-black/[0.06] p-5 shadow-[0_30px_80px_-20px_rgb(0_0_0/0.35)] md:inset-x-auto md:bottom-6 md:left-6 md:w-[440px] md:p-6"
        >
          <div className="flex items-start gap-3">
            <span className="bg-green-soft text-green-deep grid size-10 shrink-0 place-items-center rounded-full">
              <ShieldCheck className="size-5" aria-hidden />
            </span>
            <div>
              <h2 id="consent-title" className="text-[17px] font-semibold tracking-[-0.02em]">
                Datenschutz-Einstellungen
              </h2>
              <p id="consent-text" className="text-muted mt-1 text-[14px] leading-relaxed">
                Wir verwenden keine Tracking- oder Werbe-Cookies. Mit deiner Einwilligung laden wir zusätzlich die Karte von Google Maps – dabei
                werden Daten an Google übertragen. Mehr dazu in der{" "}
                <Link to="/datenschutz" className="text-fg underline underline-offset-2">
                  Datenschutzerklärung
                </Link>
                .
              </p>
            </div>
          </div>

          <AnimatePresence initial={false}>
            {settings && (
              <motion.div
                key="settings"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.4, ease: easeOutExpo }}
                className="overflow-hidden"
              >
                <ul className="mt-5 space-y-2">
                  <li className="bg-tile flex items-start justify-between gap-4 rounded-2xl p-4">
                    <div>
                      <p className="text-[15px] font-semibold">Notwendig</p>
                      <p className="text-muted mt-0.5 text-[13px] leading-snug">Speichert deine Auswahl in diesem Browser. Immer aktiv.</p>
                    </div>
                    <Switch checked disabled label="Notwendig" />
                  </li>
                  <li className="bg-tile flex items-start justify-between gap-4 rounded-2xl p-4">
                    <div>
                      <p className="text-[15px] font-semibold">Externe Medien – Google Maps</p>
                      <p className="text-muted mt-0.5 text-[13px] leading-snug">
                        Zeigt unseren Standort auf einer Karte. Google kann dabei Daten wie deine IP-Adresse erheben und Cookies setzen.
                      </p>
                    </div>
                    <Switch checked={maps} onChange={setMaps} label="Google Maps erlauben" />
                  </li>
                </ul>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="mt-5 grid grid-cols-2 gap-2">
            {settings ? (
              <>
                <button type="button" onClick={() => decide(false)} className={btn("ghost")}>
                  Nur notwendige
                </button>
                <button type="button" onClick={() => decide(maps)} className={btn("primary")}>
                  Auswahl speichern
                </button>
              </>
            ) : (
              <>
                <button type="button" onClick={() => decide(false)} className={btn("ghost")}>
                  Nur notwendige
                </button>
                <button type="button" onClick={() => decide(true)} className={btn("primary")}>
                  Alle akzeptieren
                </button>
              </>
            )}
          </div>
          {!settings && (
            <button type="button" onClick={() => setSettings(true)} className="text-green-deep mt-3 w-full text-center text-[14px] font-medium hover:underline">
              Einstellungen
            </button>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  )
}

const btn = (variant: "primary" | "ghost") =>
  cn(
    "rounded-full px-4 py-3 text-[15px] font-semibold transition-transform active:scale-[0.98]",
    variant === "primary" ? "bg-green text-[#0f1a00]" : "bg-tile text-fg ring-1 ring-inset ring-black/10 hover:bg-tile-2",
  )

function Switch({ checked, onChange, disabled, label }: { checked: boolean; onChange?: (v: boolean) => void; disabled?: boolean; label: string }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      disabled={disabled}
      onClick={() => onChange?.(!checked)}
      className={cn(
        "relative mt-0.5 h-7 w-12 shrink-0 rounded-full transition-colors duration-300",
        checked ? "bg-green" : "bg-black/15",
        disabled && "opacity-60",
      )}
    >
      <span
        className={cn(
          "absolute top-0.5 left-0.5 size-6 rounded-full bg-white shadow transition-transform duration-300 ease-[var(--ease-out-expo)]",
          checked && "translate-x-5",
        )}
      />
    </button>
  )
}
