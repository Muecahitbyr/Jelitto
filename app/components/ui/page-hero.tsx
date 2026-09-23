import { motion, useReducedMotion } from "motion/react"
import { ChevronRight } from "lucide-react"
import type { ReactNode } from "react"
import { Link } from "react-router"
import { easeOutExpo } from "~/lib/motion"
import { AnimatedWords } from "./animated-headline"
import { ZoomMedia } from "./zoom-media"

type Crumb = { label: string; to?: string }

/**
 * Heller Seitenkopf im Apple-Stil: große dunkle Headline auf Weiß,
 * darunter ein Foto, das beim Scrollen von der Karte zur vollen Breite aufzieht.
 */
export function PageHero({
  eyebrow,
  title,
  lead,
  image,
  imageAlt = "",
  imagePosition,
  breadcrumbs,
  children,
}: {
  eyebrow?: string
  title: string
  lead?: ReactNode
  image: string
  imageAlt?: string
  imagePosition?: string
  breadcrumbs?: Crumb[]
  children?: ReactNode
}) {
  const reduce = useReducedMotion()
  const fade = (delay: number) => ({
    initial: reduce ? false : ({ opacity: 0, y: 18 } as const),
    animate: { opacity: 1, y: 0 },
    transition: { duration: 1.1, delay, ease: easeOutExpo },
  })

  return (
    <header className="tone-white relative overflow-hidden pt-32 md:pt-44">
      <div aria-hidden className="glow pointer-events-none absolute -top-40 right-[-10%] aspect-square w-[60vw] max-w-[720px] opacity-50" />
      <div className="wrap relative">
        {breadcrumbs && (
          <motion.nav {...fade(0)} aria-label="Brotkrumen" className="text-muted mb-7 flex flex-wrap items-center gap-1 text-[13px]">
            {breadcrumbs.map((c, i) => (
              <span key={c.label} className="inline-flex items-center gap-1">
                {c.to ? (
                  <Link to={c.to} className="hover:text-fg transition-colors">
                    {c.label}
                  </Link>
                ) : (
                  <span className="text-fg" aria-current="page">
                    {c.label}
                  </span>
                )}
                {i < breadcrumbs.length - 1 && <ChevronRight className="size-3 opacity-60" aria-hidden />}
              </span>
            ))}
          </motion.nav>
        )}
        {eyebrow && (
          <motion.p {...fade(0.05)} className="eyebrow mb-4">
            {eyebrow}
          </motion.p>
        )}
        <h1 className="display-xl text-metal max-w-[14ch] pb-[0.18em]">
          <AnimatedWords text={title} delay={0.1} />
        </h1>
        {lead && (
          <motion.div {...fade(0.35)} className="copy mt-7 max-w-[40rem]">
            {lead}
          </motion.div>
        )}
        {children && (
          <motion.div {...fade(0.5)} className="mt-9 flex flex-wrap items-center gap-x-7 gap-y-3">
            {children}
          </motion.div>
        )}
      </div>
      <ZoomMedia src={image} alt={imageAlt} position={imagePosition} className="mt-16 md:mt-24" height="h-[58svh] md:h-[86svh]" priority />
    </header>
  )
}
