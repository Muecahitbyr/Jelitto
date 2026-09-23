import type { MetaDescriptor } from "react-router"
import { site } from "~/content/site"

type SeoInput = {
  title: string
  description: string
  path: string
  image?: string
  jsonLd?: Record<string, unknown>
}

/** Meta-Tags inkl. Open Graph und Canonical. URLs mit Slash am Ende wie auf der bisherigen WordPress-Seite. */
export function seo({ title, description, path, image = "/og-image.jpg", jsonLd }: SeoInput): MetaDescriptor[] {
  const url = path === "/" ? `${site.url}/` : `${site.url}${path}/`
  const tags: MetaDescriptor[] = [
    { title },
    { name: "description", content: description },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:type", content: "website" },
    { property: "og:locale", content: "de_DE" },
    { property: "og:site_name", content: site.name },
    { property: "og:url", content: url },
    { property: "og:image", content: `${site.url}${image}` },
    { name: "twitter:card", content: "summary_large_image" },
    { tagName: "link", rel: "canonical", href: url },
  ]
  if (jsonLd) tags.push({ "script:ld+json": jsonLd })
  return tags
}

export function faqJsonLd(items: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  }
}
