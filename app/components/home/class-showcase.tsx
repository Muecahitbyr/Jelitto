import { motion, useMotionValue, useReducedMotion, useScroll, useTransform } from "motion/react"
import { ArrowRight } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import { Link } from "react-router"
import { autoClasses, bikeClasses } from "~/content/classes"
import { ClassCard } from "../ui/class-card"

export const b17Card = {
  path: "/begleitetes-fahren",
  code: "B17",
  shortName: "Begleitetes Fahren ab 17",
  summary: "Ein Jahr Fahrpraxis unter Aufsicht, bevor es allein losgeht – wer darf Begleitperson sein, welche Fristen gelten.",
  image: "/images/stock/driver-smile.webp",
  imageAlt: "Junge Fahrerin lächelt am Steuer",
  imagePosition: "60% center",
  ageBadge: "ab 17",
}

const cards = [autoClasses[0], b17Card, ...autoClasses.slice(1), ...bikeClasses]

/**
 * Horizontale Galerie aller Klassen. Auf großen Bildschirmen wird sie beim
 * vertikalen Scrollen „festgepinnt“ und fährt seitlich durch. Auf Mobilgeräten
 * ist es ein normales Wisch-Karussell.
 */
export function ClassShowcase() {
  const sectionRef = useRef<HTMLElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const [pinned, setPinned] = useState(false)
  const [distance, setDistance] = useState(0)
  const distanceMV = useMotionValue(0)
  const pinnedMV = useMotionValue(0)

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)")
    const measure = () => {
      const enable = mq.matches && !reduce
      setPinned(enable)
      pinnedMV.set(enable ? 1 : 0)
      if (!trackRef.current) return
      const d = Math.max(0, trackRef.current.scrollWidth - window.innerWidth)
      setDistance(d)
      distanceMV.set(d)
    }
    measure()
    // Nach dem Umschalten auf „gepinnt“ ändert sich die Breite der Leiste → neu messen
    const ro = new ResizeObserver(measure)
    if (trackRef.current) ro.observe(trackRef.current)
    window.addEventListener("resize", measure)
    mq.addEventListener("change", measure)
    return () => {
      ro.disconnect()
      window.removeEventListener("resize", measure)
      mq.removeEventListener("change", measure)
    }
  }, [reduce, distanceMV, pinnedMV])

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] })
  const x = useTransform([scrollYProgress, distanceMV, pinnedMV], ([sp, d, on]: number[]) => -sp * d * on)
  const progress = useTransform(scrollYProgress, [0, 1], ["0%", "100%"])

  return (
    <section
      ref={sectionRef}
      aria-labelledby="klassen-titel"
      className="tone-white relative"
      style={pinned ? { height: `calc(100vh + ${distance}px)` } : undefined}
    >
      <div className={pinned ? "sticky top-0 flex h-svh flex-col justify-center overflow-hidden" : "py-28"}>
        <div className="wrap mb-10 flex flex-wrap items-end justify-between gap-6 md:mb-12">
          <div>
            <p className="eyebrow mb-4">Wir bilden aus in den Führerscheinklassen</p>
            <h2 id="klassen-titel" className="display-lg max-w-[14ch] pb-2">
              <span className="text-metal">Auto. Motorrad.</span> <span className="text-leaf">Roller.</span>
            </h2>
          </div>
          <Link to="/klassen" className="text-accent group inline-flex items-center gap-1.5 text-[19px] font-medium">
            Alle Klassen
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden />
          </Link>
        </div>

        <motion.div
          ref={trackRef}
          style={{ x }}
          className={
            pinned
              ? "flex w-max gap-5 pr-[max(2.5rem,calc((100vw-1260px)/2+2.5rem))] pl-[max(2.5rem,calc((100vw-1260px)/2+2.5rem))]"
              : "no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-px-5 px-5 pb-4"
          }
        >
          {cards.map((item) => (
            <ClassCard key={item.path} item={item} className="w-[76vw] shrink-0 snap-start sm:w-[44vw] md:w-[330px] lg:w-[min(340px,26vw)] lg:[aspect-ratio:3/4.1]" />
          ))}
          <Link
            to="/preise"
            className="group tone-mint flex aspect-[3/4] w-[76vw] shrink-0 snap-start flex-col justify-between rounded-[28px] p-8 sm:w-[44vw] md:w-[330px] lg:w-[min(340px,26vw)] lg:[aspect-ratio:3/4.1]"
          >
            <span className="eyebrow">Transparent</span>
            <span>
              <span className="display-sm text-metal block">Alle Preise auf einen Blick.</span>
              <span className="text-accent mt-6 inline-flex items-center gap-1.5 text-[17px] font-medium">
                Zur Preisübersicht
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden />
              </span>
            </span>
          </Link>
        </motion.div>

        {pinned && (
          <div className="wrap mt-10">
            <div className="bg-line h-[3px] w-full overflow-hidden rounded-full">
              <motion.div className="bg-green h-full rounded-full" style={{ width: progress }} />
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
