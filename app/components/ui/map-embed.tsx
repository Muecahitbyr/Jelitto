import { MapPin, Navigation } from "lucide-react"
import { useState } from "react"
import { Link } from "react-router"
import { site } from "~/content/site"
import { saveConsent, useConsent } from "~/lib/consent"
import { cn } from "~/lib/cn"

/**
 * Google Maps nur mit Einwilligung: Wurde „Google Maps“ in den Datenschutz-Einstellungen
 * erlaubt, lädt die Karte direkt. Sonst erst nach Klick (einmalig oder „immer erlauben“) –
 * vorher fließen keine Daten an Google.
 */
export function MapEmbed({ className }: { className?: string }) {
  const consent = useConsent()
  const [loadedOnce, setLoadedOnce] = useState(false)
  const loaded = consent.maps || loadedOnce

  return (
    <div className={cn("bg-tile relative aspect-[4/3] overflow-hidden rounded-[28px] md:aspect-[16/10]", className)}>
      {loaded ? (
        <iframe
          src={site.maps.embed}
          title="Standort der Fahrschule Jelitto in Kaufbeuren auf Google Maps"
          className="absolute inset-0 h-full w-full border-0"
          loading="lazy"
          allowFullScreen
          referrerPolicy="no-referrer-when-downgrade"
        />
      ) : (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-5 p-8 text-center">
          <div
            aria-hidden
            className="absolute inset-0 opacity-[0.35]"
            style={{
              backgroundImage:
                "linear-gradient(var(--line) 1px, transparent 1px), linear-gradient(90deg, var(--line) 1px, transparent 1px)",
              backgroundSize: "44px 44px",
            }}
          />
          <span className="bg-brand text-ink relative grid size-14 place-items-center rounded-full shadow-[0_0_60px_rgb(248_216_0/0.5)]">
            <MapPin className="size-6" aria-hidden />
          </span>
          <div className="relative">
            <p className="text-xl font-semibold tracking-tight">{site.name}</p>
            <p className="text-muted">
              {site.address.street}, {site.address.zip} {site.address.city}
            </p>
          </div>
          <div className="relative flex flex-wrap justify-center gap-3">
            <button
              type="button"
              onClick={() => setLoadedOnce(true)}
              className="bg-fg text-bg rounded-full px-5 py-2.5 text-[15px] font-medium transition-opacity hover:opacity-85"
            >
              Karte laden
            </button>
            <a
              href={site.maps.link}
              target="_blank"
              rel="noopener noreferrer"
              className="ring-line hover:bg-fg/10 inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-[15px] font-medium ring-1 ring-inset transition-colors"
            >
              <Navigation className="size-4" aria-hidden /> Route planen
            </a>
          </div>
          <button
            type="button"
            onClick={() => saveConsent({ maps: true })}
            className="text-green-deep relative text-[13px] font-medium underline-offset-2 hover:underline"
          >
            Google Maps immer erlauben
          </button>
          <p className="text-muted relative max-w-sm text-xs">
            Beim Laden der Karte werden Daten an Google übertragen. Mehr dazu in unserer{" "}
            <Link to="/datenschutz#google-maps" className="underline underline-offset-2">
              Datenschutzerklärung
            </Link>
            .
          </p>
        </div>
      )}
    </div>
  )
}
