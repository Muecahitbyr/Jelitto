import { animate, motion, useMotionValue, useMotionValueEvent, useReducedMotion, useScroll, useTransform } from "motion/react"
import { useCallback, useEffect, useRef } from "react"
import { easeOutExpo } from "~/lib/motion"
import { AnimatedWords } from "../ui/animated-headline"
import { ButtonLink } from "../ui/button"

const clamp = (v: number) => Math.min(1, Math.max(0, v))
/** Handy: Oberkante und Seitenverhältnis (Höhe/Breite) des Bild-Bands im Endzustand */
const MOBILE_BAND_TOP = 88
const MOBILE_BAND_RATIO = 0.8
const ease = (t: number) => 1 - Math.pow(1 - t, 3)

/**
 * Startseiten-Hero auf Weiß: große Headline, darunter eine Bildkarte (Audi TT der
 * Fahrschule). Beim Scrollen wächst die Karte zum Vollbild (Handy: zum vollbreiten Band),
 * die Headline gleitet weg und eine zweite Aussage erscheint.
 */
export function HomeHero() {
  const ref = useRef<HTMLElement>(null)
  const headRef = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ["start start", "end end"] })
  // Gemessene Kartenränder (in px) und die daraus berechnete clip-path
  const dims = useRef({ top: 460, side: 40, bottom: 40, mobile: false, vw: 1440, vh: 900 })
  const clipPath = useMotionValue("inset(460px 40px 40px 40px round 36px)")
  // Handy: Position und Größe der Karte selbst (das Foto füllt immer die Karte aus)
  const boxTop = useMotionValue(0)
  const boxSide = useMotionValue(0)
  const boxH = useMotionValue("100%")
  const boxRadius = useMotionValue(0)
  // Die Bildkarte bleibt unsichtbar, bis ihre echte Größe berechnet ist – sonst zeigt das
  // vorgerenderte HTML kurz eine zu große Karte, die dann zusammenspringt
  const cardOpacity = useMotionValue(0)

  // Kartengröße direkt setzen – nach jeder Messung und bei jedem Scroll-Schritt.
  // (Kein automatisch verknüpfter Transform: der reagiert im Entwicklungsmodus nicht auf neue Messwerte.)
  const updateClip = useCallback(() => {
    const t = reduce ? 0 : ease(clamp(p.get() / 0.5))
    const { top, side, bottom, mobile, vw, vh } = dims.current
    if (!mobile) {
      // Desktop/Tablet: Foto liegt bildschirmfüllend, die Karte ist ein Ausschnitt, der zum Vollbild aufzieht
      boxTop.set(0)
      boxSide.set(0)
      boxH.set("100%")
      boxRadius.set(0)
      clipPath.set(`inset(${top * (1 - t)}px ${side * (1 - t)}px ${bottom * (1 - t)}px ${side * (1 - t)}px round ${36 * (1 - t)}px)`)
      return
    }
    // Handy: Das Foto ist Querformat. Statt es auf den hohen Bildschirm aufzuziehen (starker
    // Beschnitt), bewegt sich die Karte selbst: vom 4:3-Bild unter den Buttons zu einem
    // vollbreiten Band direkt unter der Navigation. Das Foto füllt dabei immer die Karte aus.
    const lerp = (a: number, b: number) => a + (b - a) * t
    const startH = Math.min((vw - 2 * side) * 0.75, vh - top - 28)
    const endH = vw * MOBILE_BAND_RATIO
    clipPath.set("none")
    boxTop.set(lerp(top, MOBILE_BAND_TOP))
    boxSide.set(lerp(side, 0))
    boxH.set(`${lerp(startH, endH)}px`)
    boxRadius.set(lerp(28, 0))
  }, [p, reduce, clipPath, boxTop, boxSide, boxH, boxRadius])
  useMotionValueEvent(p, "change", updateClip)

  useEffect(() => {
    const measure = () => {
      if (!headRef.current) return
      const vw = window.innerWidth
      const vh = window.innerHeight
      const mobile = vw < 768
      const top = headRef.current.offsetTop + headRef.current.offsetHeight + (mobile ? 28 : 44)
      dims.current = {
        top,
        side: mobile ? 20 : Math.max(40, (vw - 1260) / 2 + 40) + vw * 0.06,
        bottom: Math.max(40, vh * 0.07),
        mobile,
        vw,
        vh,
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

        <motion.div
          className="absolute overflow-hidden will-change-[clip-path]"
          style={{ clipPath, opacity: cardOpacity, top: boxTop, left: boxSide, right: boxSide, height: boxH, borderRadius: boxRadius }}
        >
          <motion.img
            src="/images/hero-audi-tt.webp"
            alt="Audi TT der Fahrschule Jelitto im Herbstlaub"
            style={{ scale: imgScale }}
            className="h-full w-full object-cover object-[45%_center] md:object-[center_40%]"
            fetchPriority="high"
            decoding="async"
          />
          <motion.div aria-hidden className="absolute inset-0 hidden bg-gradient-to-t from-black via-black/40 to-transparent md:block" style={{ opacity: shade }} />
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

        {/* Aussage auf dem Vollbild (Desktop/Tablet) */}
        <motion.div style={{ opacity: overlayOpacity, y: overlayY }} className="pointer-events-none absolute inset-x-0 bottom-0 hidden pb-16 text-white md:block md:pb-24">
          <div className="wrap">
            <p className="display-lg max-w-[14ch]">
              Seit über 30 Jahren. <span className="text-[#d9f28f]">Mitten in Kaufbeuren.</span>
            </p>
          </div>
        </motion.div>

        {/* Aussage unter dem Bild-Band (Handy) – Position passend zu MOBILE_BAND_TOP/RATIO */}
        <motion.div
          style={{ opacity: overlayOpacity, y: overlayY, top: `calc(${MOBILE_BAND_TOP}px + ${MOBILE_BAND_RATIO * 100}vw + 28px)` }}
          className="pointer-events-none absolute inset-x-0 md:hidden"
        >
          <div className="wrap">
            <p className="display-md">
              <span className="text-metal">Seit über 30 Jahren.</span> <span className="text-leaf">Mitten in Kaufbeuren.</span>
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
