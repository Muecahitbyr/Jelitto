import { Phone } from "lucide-react"
import { site } from "~/content/site"
import { AnimatedWords } from "./animated-headline"
import { ButtonLink } from "./button"
import { Reveal } from "./reveal"

/** Abschluss jeder Seite: helle Fläche mit gelb-grünem Lichtschein, großer Satz, zwei Aktionen */
export function CtaBand({
  title = "Du kannst dich auch online anmelden.",
  text = `Oder komm montags bis donnerstags ab ${site.hours.registrationFrom} in der ${site.address.street} in ${site.address.city} vorbei.`,
}: {
  title?: string
  text?: string
  image?: string
}) {
  return (
    <section className="tone-white px-3 pb-3 md:px-5 md:pb-5">
      <div className="tone-mint relative isolate overflow-hidden rounded-[36px] px-6 py-28 text-center md:py-40">
        <div aria-hidden className="glow absolute -top-1/3 left-1/2 -z-10 aspect-square w-[90vw] max-w-[1000px] -translate-x-1/2 opacity-80" />
        <div
          aria-hidden
          className="absolute -bottom-24 -left-24 -z-10 size-[420px] rounded-full opacity-40 blur-3xl"
          style={{ background: "radial-gradient(circle, #88b018, transparent 70%)" }}
        />
        <div className="wrap-narrow">
          <h2 className="display-lg text-metal mx-auto max-w-[16ch] pb-[0.18em]">
            <AnimatedWords text={title} />
          </h2>
          <Reveal delay={0.2}>
            <p className="copy mx-auto mt-6 max-w-[32rem]">{text}</p>
          </Reveal>
          <Reveal delay={0.3}>
            <div className="mt-11 flex flex-wrap items-center justify-center gap-4">
              <ButtonLink to="/anmeldung" size="lg">
                Jetzt anmelden
              </ButtonLink>
              <ButtonLink href={site.phone.href} size="lg" variant="ghost" icon={<Phone className="size-4" aria-hidden />} className="bg-white">
                {site.phone.display}
              </ButtonLink>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
