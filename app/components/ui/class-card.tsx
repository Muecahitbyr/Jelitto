import { ArrowUpRight } from "lucide-react"
import { Link } from "react-router"
import { cn } from "~/lib/cn"

export type ClassCardItem = {
  path: string
  code: string
  shortName: string
  summary: string
  image: string
  cardImage?: string
  imageAlt: string
  imagePosition?: string
  ageBadge?: string
}

/** Hochformat-Karte einer Führerscheinklasse mit Glas-Label */
export function ClassCard({ item, className }: { item: ClassCardItem; className?: string }) {
  return (
    <Link
      to={item.path}
      prefetch="intent"
      className={cn("group relative isolate block aspect-[3/4] overflow-hidden rounded-[28px] bg-[#111] text-white", className)}
    >
      <img
        src={item.cardImage ?? item.image}
        alt={item.imageAlt}
        loading="lazy"
        decoding="async"
        style={{ objectPosition: item.imagePosition }}
        className="absolute inset-0 -z-10 h-full w-full object-cover transition-transform duration-[1.6s] ease-[var(--ease-out-expo)] group-hover:scale-[1.07]"
      />
      <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-b from-black/55 via-transparent to-black/90" />
      <div className="flex h-full flex-col justify-between p-7">
        <div className="flex items-start justify-between gap-3">
          <span className="text-[3.5rem] leading-[0.9] font-semibold tracking-[-0.05em]">{item.code}</span>
          {item.ageBadge && <span className="glass rounded-full px-3 py-1 text-[12px] font-semibold">{item.ageBadge}</span>}
        </div>
        <div>
          <p className="text-[21px] font-semibold tracking-[-0.02em]">{item.shortName}</p>
          <p className="mt-2 line-clamp-2 text-[15px] leading-snug text-white/70">{item.summary}</p>
          <span className="mt-5 inline-flex items-center gap-1 text-[15px] font-medium text-[#f8d800]">
            Mehr erfahren
            <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden />
          </span>
        </div>
      </div>
    </Link>
  )
}
