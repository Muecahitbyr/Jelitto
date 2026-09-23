import type { ReactNode } from "react"
import { isRouteErrorResponse, Links, Meta, Outlet, Scripts, ScrollRestoration } from "react-router"
import type { LinksFunction } from "react-router"
import "./app.css"
import { site } from "./content/site"

export const links: LinksFunction = () => [
  { rel: "icon", href: "/favicon.svg", type: "image/svg+xml" },
  { rel: "apple-touch-icon", href: "/apple-touch-icon.png" },
  { rel: "preload", href: "/images/hero-audi-tt.webp", as: "image", type: "image/webp" },
]

const localBusiness = {
  "@context": "https://schema.org",
  "@type": "DrivingSchool",
  name: site.name,
  url: site.url,
  telephone: site.phone.international,
  email: site.email,
  image: `${site.url}/og-image.jpg`,
  founder: site.owner,
  address: {
    "@type": "PostalAddress",
    streetAddress: site.address.street,
    postalCode: site.address.zip,
    addressLocality: site.address.city,
    addressCountry: "DE",
  },
  geo: { "@type": "GeoCoordinates", latitude: site.maps.lat, longitude: site.maps.lng },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday"],
      opens: "18:30",
      closes: "20:30",
    },
  ],
  sameAs: [site.facebook],
}

export function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="de">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <meta name="theme-color" content="#000000" />
        <meta name="format-detection" content="telephone=no" />
        <Meta />
        <Links />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusiness) }} />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  )
}

export default function App() {
  return <Outlet />
}

export function ErrorBoundary({ error }: { error: unknown }) {
  let title = "Da ist etwas schiefgelaufen."
  let details = "Bitte lade die Seite neu oder versuche es später noch einmal."

  if (isRouteErrorResponse(error) && error.status === 404) {
    title = "Seite nicht gefunden."
    details = "Die angeforderte Seite existiert nicht."
  } else if (import.meta.env.DEV && error instanceof Error) {
    details = error.message
  }

  return (
    <main className="tone-white wrap-narrow flex min-h-svh flex-col justify-center py-24">
      <p className="text-accent mb-3 font-semibold">{site.name}</p>
      <h1 className="text-5xl font-semibold tracking-tight md:text-6xl">{title}</h1>
      <p className="text-muted mt-5 text-xl">{details}</p>
      <a href="/" className="bg-green text-ink mt-10 inline-flex w-fit rounded-full px-6 py-3 font-medium">
        Zur Startseite
      </a>
    </main>
  )
}
