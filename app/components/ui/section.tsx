import type { ReactNode } from "react"
import { cn } from "~/lib/cn"

export type Tone = "white" | "light" | "mint" | "dark"

/** Seitenabschnitt. `tone` schaltet die komplette Farbwelt (hell/dunkel) für alles darin um. */
export function Section({
  children,
  className,
  id,
  tone = "white",
  space = "lg",
}: {
  children: ReactNode
  className?: string
  id?: string
  tone?: Tone
  space?: "none" | "md" | "lg"
}) {
  return (
    <section
      id={id}
      className={cn(
        `tone-${tone} relative`,
        space === "lg" && "py-28 md:py-40",
        space === "md" && "py-20 md:py-28",
        className,
      )}
    >
      {children}
    </section>
  )
}

/** Überschriftenblock: Eyebrow + große Headline + optionaler Apple-Absatz */
export function Heading({
  eyebrow,
  title,
  children,
  className,
  center,
  size = "lg",
  as: As = "h2",
}: {
  eyebrow?: ReactNode
  title: ReactNode
  children?: ReactNode
  className?: string
  center?: boolean
  size?: "xl" | "lg" | "md" | "sm"
  as?: "h1" | "h2" | "h3"
}) {
  return (
    <div className={cn(center && "mx-auto text-center", className)}>
      {eyebrow && <p className="eyebrow mb-4">{eyebrow}</p>}
      <As className={cn(`display-${size}`, center ? "mx-auto" : "", "max-w-[18ch]", size === "sm" && "max-w-[24ch]")}>{title}</As>
      {children && <div className={cn("copy mt-6 max-w-[36rem]", center && "mx-auto")}>{children}</div>}
    </div>
  )
}
