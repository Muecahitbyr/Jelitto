import { cn } from "~/lib/cn"

/** Originales Jelitto-Logo (freigestellt) */
export function Logo({ className }: { className?: string }) {
  return (
    <img
      src="/images/logo.png"
      alt="Fahrschule Jelitto – …dein Weg zum Führerschein!"
      width={285}
      height={96}
      className={cn("h-8 w-auto select-none", className)}
      draggable={false}
    />
  )
}
