import { AnimatePresence, motion, useMotionValueEvent, useReducedMotion, useScroll } from "motion/react"
import { useRef, useState, type ReactNode } from "react"
import { easeOutExpo } from "~/lib/motion"

export type Chapter = { eyebrow: string; title: string; text: ReactNode; image: string; alt: string; position?: string }

/**
 * Apple-typische Scroll-Sequenz auf Weiß: Der Abschnitt bleibt stehen, links wechselt
 * der Text, rechts blendet eine große Bildkarte weich über. Fortschritt in Logo-Grün.
 */
export function FeatureSequence({ chapters, label }: { chapters: Chapter[]; label: string }) {
  const ref = useRef<HTMLElement>(null)
  const reduce = useReducedMotion()
  const [active, setActive] = useState(0)
  const [local, setLocal] = useState(0)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] })

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const f = Math.min(chapters.length - 0.0001, Math.max(0, v * chapters.length))
    setActive(Math.floor(f))
    setLocal(f - Math.floor(f))
  })

  const chapter = chapters[active]

  return (
    <section ref={ref} aria-label={label} className="tone-light relative" style={{ height: `${chapters.length * 90 + 60}vh` }}>
      <div className="sticky top-0 flex h-svh items-center overflow-hidden pt-12">
        <div className="wrap grid items-center gap-8 md:grid-cols-12 md:gap-14">
          {/* Bildkarte */}
          <div className="relative order-1 h-[40svh] overflow-hidden rounded-[32px] md:order-2 md:col-span-7 md:h-[72svh]">
            {chapters.map((c, i) => (
              <motion.img
                key={c.image}
                src={c.image}
                alt={i === active ? c.alt : ""}
                aria-hidden={i !== active}
                loading={i === 0 ? "eager" : "lazy"}
                decoding="async"
                style={{ objectPosition: c.position }}
                initial={false}
                animate={{ opacity: i === active ? 1 : 0, scale: i === active ? 1 : 1.1 }}
                transition={{ duration: reduce ? 0 : 1.1, ease: easeOutExpo }}
                className="absolute inset-0 h-full w-full object-cover"
              />
            ))}
            <span className="glass absolute bottom-5 left-5 rounded-full px-3.5 py-1.5 text-[13px] font-semibold text-white">
              {active + 1} / {chapters.length}
            </span>
          </div>

          {/* Text */}
          <div className="order-2 md:order-1 md:col-span-5">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 30, filter: "blur(6px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -20, filter: "blur(6px)" }}
                transition={{ duration: 0.55, ease: easeOutExpo }}
              >
                <p className="eyebrow mb-3">{chapter.eyebrow}</p>
                <h3 className="display-md text-metal pb-[0.18em]">{chapter.title}</h3>
                <div className="copy mt-5">{chapter.text}</div>
              </motion.div>
            </AnimatePresence>
            <ol className="mt-10 flex gap-2" aria-hidden>
              {chapters.map((c, i) => (
                <li key={c.title} className="bg-line h-[3px] flex-1 overflow-hidden rounded-full">
                  <span
                    className="bg-green block h-full rounded-full"
                    style={{ width: i < active ? "100%" : i === active ? `${local * 100}%` : "0%" }}
                  />
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  )
}
