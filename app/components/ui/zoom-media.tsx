import { motion, useReducedMotion, useScroll, useTransform } from "motion/react"
import { useRef, type ReactNode } from "react"
import { cn } from "~/lib/cn"

/**
 * Bild, das beim Hereinscrollen von einer abgerundeten Karte zur vollen Breite
 * aufzieht (Apple-„Produkt-Reveal“). Optional mit Text-Overlay.
 */
export function ZoomMedia({
  src,
  alt,
  position,
  className,
  height = "h-[70svh] md:h-[92svh]",
  children,
  priority,
}: {
  src: string
  alt: string
  position?: string
  className?: string
  height?: string
  children?: ReactNode
  priority?: boolean
}) {
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "start 0.15"] })
  const inset = useTransform(scrollYProgress, [0, 1], reduce ? ["0%", "0%"] : ["9%", "0%"])
  const radius = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [36, 0])
  const clipPath = useTransform(() => `inset(0 ${inset.get()} round ${radius.get()}px)`)
  const imgScale = useTransform(scrollYProgress, [0, 1], reduce ? [1, 1] : [1.3, 1])

  return (
    <div ref={ref} className={cn("relative", className)}>
      <motion.div style={{ clipPath }} className={cn("relative overflow-hidden", height)}>
        <motion.img
          src={src}
          alt={alt}
          style={{ scale: imgScale, objectPosition: position }}
          className="absolute inset-0 h-full w-full object-cover"
          loading={priority ? "eager" : "lazy"}
          decoding="async"
        />
        {children}
      </motion.div>
    </div>
  )
}
