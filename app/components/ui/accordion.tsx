import { motion } from "motion/react"
import { Plus } from "lucide-react"
import { useId, useState } from "react"
import { easeOutExpo } from "~/lib/motion"
import { cn } from "~/lib/cn"

export type AccordionItem = { q: string; a: string }

/** FAQ-Akkordeon. Antworten bleiben im HTML (SEO) und werden nur optisch ein-/ausgeklappt. */
export function Accordion({ items, className }: { items: AccordionItem[]; className?: string }) {
  const [open, setOpen] = useState<number | null>(0)
  const id = useId()

  return (
    <div className={cn("border-line divide-line divide-y border-y", className)}>
      {items.map((item, i) => {
        const isOpen = open === i
        return (
          <div key={item.q}>
            <h3>
              <button
                type="button"
                id={`${id}-q-${i}`}
                aria-expanded={isOpen}
                aria-controls={`${id}-a-${i}`}
                onClick={() => setOpen(isOpen ? null : i)}
                className="group flex w-full items-center justify-between gap-6 py-6 text-left text-[19px] font-semibold tracking-[-0.02em] md:py-8 md:text-2xl"
              >
                <span className="transition-opacity group-hover:opacity-70">{item.q}</span>
                <span
                  className={cn(
                    "bg-tile-2 grid size-9 shrink-0 place-items-center rounded-full transition-all duration-500 ease-[var(--ease-out-expo)]",
                    isOpen && "bg-brand text-ink rotate-45",
                  )}
                >
                  <Plus className="size-4" aria-hidden />
                </span>
              </button>
            </h3>
            <motion.div
              id={`${id}-a-${i}`}
              role="region"
              aria-labelledby={`${id}-q-${i}`}
              initial={false}
              animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
              transition={{ duration: 0.55, ease: easeOutExpo }}
              className="overflow-hidden"
              inert={!isOpen}
            >
              <p className="body-copy pr-4 pb-8 md:pr-20 md:text-[19px]">{item.a}</p>
            </motion.div>
          </div>
        )
      })}
    </div>
  )
}
