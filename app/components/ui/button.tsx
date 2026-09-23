import { ChevronRight } from "lucide-react"
import type { ReactNode } from "react"
import { Link } from "react-router"
import { cn } from "~/lib/cn"

type Variant = "primary" | "light" | "ghost" | "link"
type Size = "sm" | "md" | "lg"

const variants: Record<Variant, string> = {
  primary: "bg-green text-[#0f1a00] hover:bg-[#97c41f] shadow-[0_8px_24px_-12px_rgb(136_176_24/0.8)]",
  light: "bg-fg text-bg hover:opacity-90",
  ghost: "ring-1 ring-inset ring-line text-fg hover:bg-fg/10",
  link: "text-accent hover:underline underline-offset-4 !p-0",
}

const sizes: Record<Size, string> = {
  sm: "px-4 py-1.5 text-[13px]",
  md: "px-[22px] py-3 text-[17px]",
  lg: "px-7 py-4 text-[17px]",
}

/** Pill-Button im Apple-Stil. Interne Ziele per `to`, externe Ziele/Downloads per `href`. */
export function ButtonLink({
  children,
  to,
  href,
  variant = "primary",
  size = "md",
  icon,
  download,
  className,
}: {
  children: ReactNode
  to?: string
  href?: string
  variant?: Variant
  size?: Size
  icon?: ReactNode
  download?: boolean
  className?: string
}) {
  const classes = cn(
    "group inline-flex max-w-full items-center justify-center gap-2 rounded-full text-center font-medium tracking-[-0.01em] transition-all duration-300 active:scale-[0.97] [&>svg]:shrink-0",
    variants[variant],
    sizes[size],
    className,
  )
  const content = (
    <>
      {icon}
      <span>{children}</span>
      {variant === "link" && <ChevronRight className="size-[1em] transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden />}
    </>
  )
  if (to)
    return (
      <Link to={to} prefetch="intent" className={classes}>
        {content}
      </Link>
    )
  const external = href?.startsWith("http")
  return (
    <a href={href} className={classes} download={download || undefined} target={external ? "_blank" : undefined} rel={external ? "noopener noreferrer" : undefined}>
      {content}
    </a>
  )
}
