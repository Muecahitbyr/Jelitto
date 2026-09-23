import Lenis from "lenis"
import { createContext, useContext, useEffect, useState, type ReactNode } from "react"

const LenisContext = createContext<Lenis | null>(null)

/** Zugriff auf die Lenis-Instanz (null, wenn reduzierte Bewegung aktiv ist) */
export const useLenis = () => useContext(LenisContext)

export function SmoothScroll({ children }: { children: ReactNode }) {
  const [lenis, setLenis] = useState<Lenis | null>(null)

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    const instance = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      autoRaf: true,
      anchors: true,
    })
    setLenis(instance)
    return () => instance.destroy()
  }, [])

  return <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>
}
