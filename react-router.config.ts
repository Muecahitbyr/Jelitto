import { writeFile } from "node:fs/promises"
import { join } from "node:path"
import type { Config } from "@react-router/dev/config"
import { classes } from "./app/content/classes"

const SITE_URL = "https://fahrschule-jelitto.com"
const pages = ["/", "/info", "/unterricht", "/team", "/klassen", "/preise", "/begleitetes-fahren", "/anmeldung", "/impressum", ...classes.map((c) => c.path)]

export default {
  // Statische Website: jede Seite wird beim Build als fertiges HTML vorgerendert
  // (schnell, SEO-freundlich, auf jedem Webspace ohne Node-Server lauffähig).
  ssr: false,
  prerender: true,

  // sitemap.xml für Google erzeugen
  async buildEnd({ reactRouterConfig }) {
    const today = new Date().toISOString().slice(0, 10)
    const urls = pages
      .map((p) => `  <url><loc>${SITE_URL}${p === "/" ? "/" : `${p}/`}</loc><lastmod>${today}</lastmod></url>`)
      .join("\n")
    const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`
    await writeFile(join(reactRouterConfig.buildDirectory, "client", "sitemap.xml"), xml)
  },
} satisfies Config
