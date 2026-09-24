import { useSyncExternalStore } from "react"

/**
 * Einwilligungen der Besucher (Cookie-/Datenschutz-Einstellungen).
 *
 * Die Website selbst setzt keine Cookies. Gespeichert wird nur die Auswahl selbst
 * (im localStorage des Browsers, technisch notwendig). Externe Inhalte – aktuell
 * Google Maps – werden erst nach Einwilligung geladen.
 */

export type Consent = {
  /** Hat der Besucher schon eine Auswahl getroffen? */
  decided: boolean
  /** Google Maps (externe Medien) erlaubt */
  maps: boolean
  /** Zeitpunkt der Auswahl (ISO) */
  date?: string
}

const KEY = "jelitto-consent-v1"
const DEFAULT: Consent = { decided: false, maps: false }
const OPEN_EVENT = "consent:open"

let snapshot: Consent | null = null
const listeners = new Set<() => void>()

function read(): Consent {
  try {
    const raw = window.localStorage.getItem(KEY)
    return raw ? { ...DEFAULT, ...(JSON.parse(raw) as Partial<Consent>) } : DEFAULT
  } catch {
    return DEFAULT
  }
}

function getSnapshot() {
  if (!snapshot) snapshot = read()
  return snapshot
}

function subscribe(listener: () => void) {
  listeners.add(listener)
  // Änderungen aus anderen Tabs übernehmen
  const onStorage = (e: StorageEvent) => {
    if (e.key === KEY) {
      snapshot = read()
      listener()
    }
  }
  window.addEventListener("storage", onStorage)
  return () => {
    listeners.delete(listener)
    window.removeEventListener("storage", onStorage)
  }
}

export function saveConsent(choice: { maps: boolean }) {
  const next: Consent = { decided: true, maps: choice.maps, date: new Date().toISOString() }
  try {
    window.localStorage.setItem(KEY, JSON.stringify(next))
  } catch {
    // z. B. privater Modus ohne Speicher – Auswahl gilt dann nur für diesen Besuch
  }
  snapshot = next
  listeners.forEach((l) => l())
}

/** Aktuelle Einwilligung (auf dem Server und beim ersten Rendern immer „keine Auswahl“) */
export function useConsent(): Consent {
  return useSyncExternalStore(subscribe, getSnapshot, () => DEFAULT)
}

/** Öffnet die Datenschutz-Einstellungen (z. B. aus dem Footer) */
export function openConsentSettings() {
  window.dispatchEvent(new CustomEvent(OPEN_EVENT))
}

export function onOpenConsentSettings(handler: () => void) {
  window.addEventListener(OPEN_EVENT, handler)
  return () => window.removeEventListener(OPEN_EVENT, handler)
}
