import { motion, useReducedMotion } from "motion/react"
import { Fragment } from "react"
import { easeOutExpo } from "~/lib/motion"
import { cn } from "~/lib/cn"

/** Headline, deren Wörter beim Laden nacheinander aus einer Maske nach oben gleiten. */
export function AnimatedWords({ text, className, delay = 0 }: { text: string; className?: string; delay?: number }) {
  const reduce = useReducedMotion()
  const words = text.split(" ")
  return (
    <span className={cn("inline", className)}>
      {words.map((word, i) => (
        <Fragment key={i}>
          <span className="-mr-[0.12em] -mb-[0.25em] inline-block overflow-hidden pr-[0.12em] pb-[0.25em] align-bottom">
            <motion.span
              className="word -mr-[0.1em] -mb-[0.22em] inline-block pr-[0.1em] pb-[0.22em]"
              initial={reduce ? false : { y: "105%", opacity: 0 }}
              animate={{ y: "0%", opacity: 1 }}
              transition={{ duration: 1.1, delay: delay + i * 0.06, ease: easeOutExpo }}
            >
              {word}
            </motion.span>
          </span>
          {i < words.length - 1 && " "}
        </Fragment>
      ))}
    </span>
  )
}
