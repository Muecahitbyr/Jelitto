import { animate, motion, useMotionValue, useMotionValueEvent, useReducedMotion, useScroll, useTransform } from "motion/react"
import { useCallback, useEffect, useRef } from "react"
import { easeOutExpo } from "~/lib/motion"
import { AnimatedWords } from "../ui/animated-headline"
import { ButtonLink } from "../ui/button"

const clamp = (v: number) => Math.min(1, Math.max(0, v))
const ease = (t: number) => 1 - Math.pow(1 - t, 3)

/**
 * Startseiten-Hero auf Weiß: große Headline, darunter eine Bildkarte (Audi TT der
 * Fahrschule). Beim Scrollen wächst die Karte zum Vollbild,
 * die Headline gleitet weg und eine zweite Aussage erscheint auf dem Foto.
 */
export function HomeHero() {
  const ref = useRef<HTMLElement>(null)
  const headRef = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ["start start", "end end"] })
  // Gemessene Kartenränder (in px) und die daraus berechnete clip-path
  const dims = useRef({ top: 460, side: 40, bottom: 40 })
  const clipPath = useMotionValue("inset(460px 40px 40px 40px round 36px)")
  // Die Bildkarte bleibt unsichtbar, bis ihre echte Größe berechnet ist – sonst zeigt das
  // vorgerenderte HTML kurz eine zu große Karte, die dann zusammenspringt
  const cardOpacity = useMotionValue(0)

  // Kartengröße direkt setzen – nach jeder Messung und bei jedem Scroll-Schritt.
  // (Kein automatisch verknüpfter Transform: der reagiert im Entwicklungsmodus nicht auf neue Messwerte.)
  const updateClip = useCallback(() => {
    const t = reduce ? 0 : ease(clamp(p.get() / 0.5))
    const { top, side, bottom } = dims.current
    clipPath.set(`inset(${top * (1 - t)}px ${side * (1 - t)}px ${bottom * (1 - t)}px ${side * (1 - t)}px round ${36 * (1 - t)}px)`)
  }, [p, reduce, clipPath])
  useMotionValueEvent(p, "change", updateClip)

  useEffect(() => {
    const measure = () => {
      if (!headRef.current) return
      const mobile = window.innerWidth < 768
      dims.current = {
        top: headRef.current.offsetTop + headRef.current.offsetHeight + (mobile ? 28 : 44),
        side: mobile ? 20 : Math.max(40, (window.innerWidth - 1260) / 2 + 40) + window.innerWidth * 0.06,
        bottom: mobile ? 28 : Math.max(40, window.innerHeight * 0.07),
      }
      updateClip()
    }
    measure()
    const ro = new ResizeObserver(measure)
    if (headRef.current) ro.observe(headRef.current)
    window.addEventListener("resize", measure)

    // Erst einblenden, wenn die Schrift geladen ist (sonst ändert sich die Headline-Höhe noch)
    let cancelled = false
    const fontsReady = document.fonts?.ready ?? Promise.resolve()
    Promise.race([fontsReady, new Promise((r) => setTimeout(r, 800))]).then(() => {
      if (cancelled) return
      measure()
      animate(cardOpacity, 1, { duration: reduce ? 0 : 0.9, ease: easeOutExpo })
    })

    return () => {
      cancelled = true
      ro.disconnect()
      window.removeEventListener("resize", measure)
    }
  }, [cardOpacity, reduce, updateClip])

  const range = (a: number, b: number) => (reduce ? 0 : clamp((p.get() - a) / (b - a)))

  const imgScale = useTransform(() => 1.06 - ease(range(0, 0.6)) * 0.06)
  const headOpacity = useTransform(() => 1 - range(0.02, 0.22))
  const headY = useTransform(() => -range(0, 0.3) * 80)
  const headPointer = useTransform(() => (range(0.02, 0.22) > 0.95 ? "none" : "auto"))
  const shade = useTransform(() => range(0.4, 0.62) * 0.55)
  const overlayOpacity = useTransform(() => range(0.5, 0.7))
  const overlayY = useTransform(() => (1 - range(0.5, 0.74)) * 40)

  return (
    <section ref={ref} className="tone-white relative h-[250vh]" aria-label="Willkommen">
      <div className="sticky top-0 h-svh overflow-hidden">
        <div aria-hidden className="absolute -top-40 left-1/2 aspect-square w-[80vw] max-w-[900px] -translate-x-1/2 rounded-full opacity-50 blur-[60px]" style={{ background: "radial-gradient(closest-side, rgb(136 176 24 / 0.28), transparent)" }} />

        <motion.div className="absolute inset-0 will-change-[clip-path]" style={{ clipPath, opacity: cardOpacity }}>
          <motion.img
            src="/images/hero-audi-tt.webp"
            alt="Audi TT der Fahrschule Jelitto im Herbstlaub"
            style={{ scale: imgScale }}
            className="h-full w-full object-cover object-[center_40%]"
            fetchPriority="high"
            decoding="async"
          />
          <motion.div aria-hidden className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" style={{ opacity: shade }} />
        </motion.div>

        {/* Headline auf Weiß */}
        <motion.div ref={headRef} style={{ opacity: headOpacity, y: headY, pointerEvents: headPointer }} className="wrap relative pt-24 text-center md:pt-32">
          <h1>
            <span className="display-xl block pb-2">
              <span className="text-metal -mb-[0.18em] block pb-[0.18em]">
                <AnimatedWords text="Dein Weg zur" delay={0.1} />
              </span>
              <span className="text-gold -mb-[0.18em] block pb-[0.18em]">
                <AnimatedWords text="Fahrschule Jelitto" delay={0.3} />
              </span>
            </span>
          </h1>
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, delay: 0.6, ease: easeOutExpo }}
          >
            <div className="mt-10 flex flex-wrap items-center justify-center gap-x-7 gap-y-3">
              <ButtonLink to="/anmeldung">Jetzt anmelden</ButtonLink>
              <ButtonLink to="/klassen" variant="link" className="text-[19px]">
                Klassen entdecken
              </ButtonLink>
            </div>
          </motion.div>
        </motion.div>

        {/* Aussage auf dem Vollbild */}
        <motion.div style={{ opacity: overlayOpacity, y: overlayY }} className="pointer-events-none absolute inset-x-0 bottom-0 pb-16 text-white md:pb-24">
          <div className="wrap">
            <p className="display-lg max-w-[14ch]">
              Seit über 30 Jahren. <span className="text-[#d9f28f]">Mitten in Kaufbeuren.</span>
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
