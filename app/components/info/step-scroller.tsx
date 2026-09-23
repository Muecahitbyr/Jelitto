import { AnimatePresence, motion, useInView } from "motion/react"
import { Check, Info } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import type { Step } from "~/content/info"
import { cn } from "~/lib/cn"
import { easeOutExpo } from "~/lib/motion"

/**
 * Scrollytelling: links bleibt die aktuelle Schrittnummer stehen,
 * rechts scrollen die Inhalte der fünf Schritte vorbei.
 */
export function StepScroller({ steps }: { steps: Step[] }) {
  const [active, setActive] = useState(0)

  return (
    <div className="wrap grid gap-12 lg:grid-cols-12 lg:gap-16">
      <div className="hidden lg:col-span-5 lg:block">
        <div className="sticky top-40">
          <p className="text-muted mb-6 text-sm font-medium">
            Schritt {active + 1} von {steps.length}
          </p>
          <div className="relative h-[11rem] overflow-hidden">
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.span
                key={steps[active].number}
                initial={{ y: "100%", opacity: 0 }}
                animate={{ y: "0%", opacity: 1 }}
                exit={{ y: "-100%", opacity: 0 }}
                transition={{ duration: 0.7, ease: easeOutExpo }}
                className="text-leaf absolute inset-0 text-[11rem] leading-none font-semibold tracking-[-0.07em]"
              >
                {steps[active].number}
              </motion.span>
            </AnimatePresence>
          </div>
          <ol className="mt-10 space-y-3">
            {steps.map((step, i) => (
              <li key={step.number} className="flex items-center gap-4">
                <span
                  className={cn(
                    "h-[3px] rounded-full transition-all duration-700 ease-[var(--ease-out-expo)]",
                    i === active ? "bg-green w-12" : i < active ? "bg-green/40 w-6" : "bg-line w-6",
                  )}
                />
                <span className={cn("text-lg font-semibold tracking-tight transition-colors duration-500", i === active ? "text-fg" : "text-muted")}>
                  {step.title}
                </span>
              </li>
            ))}
          </ol>
        </div>
      </div>

      <div className="space-y-6 lg:col-span-7 lg:space-y-[18vh] lg:pb-[20vh]">
        {steps.map((step, i) => (
          <StepCard key={step.number} step={step} index={i} active={active === i} onActive={() => setActive(i)} />
        ))}
      </div>
    </div>
  )
}

function StepCard({ step, index, active, onActive }: { step: Step; index: number; active: boolean; onActive: () => void }) {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { margin: "-45% 0px -45% 0px" })

  useEffect(() => {
    if (inView) onActive()
  }, [inView, onActive])

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.9, ease: easeOutExpo }}
      className={cn(
        "bg-tile rounded-[28px] p-8 transition-[opacity,box-shadow] duration-700 md:p-10",
        "lg:opacity-35",
        active && "lg:opacity-100",
      )}
      aria-labelledby={`schritt-${index}`}
    >
      <p className="text-accent mb-3 text-sm font-semibold lg:hidden">Schritt {step.number}</p>
      <h3 id={`schritt-${index}`} className="text-[28px] font-semibold tracking-[-0.03em] md:text-[40px]">
        <span className="text-muted/50 mr-3 hidden lg:inline">{step.number}</span>
        {step.title}
      </h3>
      <div className="text-muted mt-6 space-y-4 text-[17px] leading-relaxed md:text-lg">
        {step.paragraphs?.map((p) => <p key={p}>{p}</p>)}
        {step.list && (
          <ul className="space-y-3 pt-1">
            {step.list.map((item) => (
              <li key={item} className="text-fg flex gap-3">
                <span className="bg-brand text-ink mt-1 grid size-5 shrink-0 place-items-center rounded-full">
                  <Check className="size-3" strokeWidth={3} aria-hidden />
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        )}
        {step.after?.map((p) => <p key={p}>{p}</p>)}
        {step.highlight && (
          <p className="bg-tile-2 text-fg flex gap-3 rounded-2xl p-4 text-base font-medium">
            <Info className="text-accent mt-0.5 size-5 shrink-0" aria-hidden />
            {step.highlight}
          </p>
        )}
      </div>
    </motion.article>
  )
}
