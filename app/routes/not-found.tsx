import type { MetaFunction } from "react-router"
import { ButtonLink } from "~/components/ui/button"
import { Reveal } from "~/components/ui/reveal"

export const meta: MetaFunction = () => [{ title: "Seite nicht gefunden | Fahrschule Jelitto" }, { name: "robots", content: "noindex" }]

export default function NotFound() {
  return (
    <section className="tone-white relative isolate flex min-h-svh items-center overflow-hidden">
      <div aria-hidden className="glow absolute top-1/2 left-1/2 -z-10 aspect-square w-[80vw] max-w-[800px] -translate-x-1/2 -translate-y-1/2 opacity-70" />
      <div className="wrap-narrow text-center">
        <Reveal>
          <p className="text-leaf text-[clamp(8rem,25vw,16rem)] leading-none font-semibold tracking-[-0.07em]">404</p>
          <h1 className="display-md mt-4">
            <span className="marker">Falsch abgebogen.</span>
          </h1>
          <p className="copy mx-auto mt-5 max-w-md">Diese Seite gibt es nicht (mehr). Kein Problem – hier geht’s weiter:</p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <ButtonLink to="/">Zur Startseite</ButtonLink>
            <ButtonLink to="/klassen" variant="ghost">
              Alle Klassen
            </ButtonLink>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
