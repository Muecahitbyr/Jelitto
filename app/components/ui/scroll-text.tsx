import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "motion/react"
import { Fragment, useRef } from "react"
import { cn } from "~/lib/cn"

/** Absatz, dessen Wörter beim Scrollen nacheinander „aufleuchten“. */
export function ScrollText({ text, className }: { text: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.45"] })
  const words = text.split(" ")

  return (
    <p ref={ref} className={cn("font-semibold tracking-tight", className)}>
      {words.map((word, i) => (
        <Fragment key={i}>
          {reduce ? (
            <span>{word}</span>
          ) : (
            <Word progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]}>
              {word}
            </Word>
          )}
          {i < words.length - 1 && " "}
        </Fragment>
      ))}
    </p>
  )
}

function Word({ children, progress, range }: { children: string; progress: MotionValue<number>; range: [number, number] }) {
  const opacity = useTransform(progress, range, [0.18, 1])
  return <motion.span style={{ opacity }}>{children}</motion.span>
}
