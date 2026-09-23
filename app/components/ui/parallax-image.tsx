import { motion, useReducedMotion, useScroll, useTransform } from "motion/react"
import { useRef } from "react"
import { cn } from "~/lib/cn"

type ParallaxImageProps = {
  src: string
  alt: string
  className?: string
  imgClassName?: string
  /** Stärke der Verschiebung (0.1 = ±10 % der Bildhöhe) */
  speed?: number
  priority?: boolean
  /** Füllt den (positionierten) Elterncontainer vollständig aus */
  fill?: boolean
}

/** Bild, das sich beim Scrollen langsamer bewegt als die Seite (Parallax). */
export function ParallaxImage({ src, alt, className, imgClassName, speed = 0.1, priority, fill }: ParallaxImageProps) {
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] })
  const y = useTransform(scrollYProgress, [0, 1], reduce ? ["0%", "0%"] : [`-${speed * 100}%`, `${speed * 100}%`])

  return (
    <div ref={ref} className={cn("overflow-hidden", fill ? "absolute inset-0" : "relative", className)}>
      <motion.img
        src={src}
        alt={alt}
        style={{ y, scale: reduce ? 1 : 1 + speed * 2.4 }}
        className={cn("absolute inset-0 h-full w-full object-cover will-change-transform", imgClassName)}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
      />
    </div>
  )
}
