import type { MetaFunction } from "react-router"
import { CtaBand } from "~/components/ui/cta-band"
import { PageHero } from "~/components/ui/page-hero"
import { Reveal, Stagger, StaggerItem } from "~/components/ui/reveal"
import { Heading, Section } from "~/components/ui/section"
import { team, teamPhoto } from "~/content/team"
import { seo } from "~/lib/seo"

export const meta: MetaFunction = () =>
  seo({
    title: "Unser Team – Fahrlehrer in Kaufbeuren | Fahrschule Jelitto",
    description:
      "Fünf erfahrene Fahrlehrerinnen und Fahrlehrer der Fahrschule Jelitto begleiten dich in Kaufbeuren zum Führerschein – lerne unser Team kennen.",
    path: "/team",
    image: "/images/team.webp",
  })

export default function TeamPage() {
  return (
    <>
      <PageHero
        eyebrow="Team"
        title="Unser Team"
        image={teamPhoto.src}
        imageAlt={teamPhoto.alt}
        imagePosition="center 30%"
        lead={
          <>
            Fünf Fahrlehrerinnen und Fahrlehrer <strong>begleiten dich in Kaufbeuren zum Führerschein.</strong>
          </>
        }
        breadcrumbs={[{ label: "Startseite", to: "/" }, { label: "Team" }]}
      />

      <Section>
        <div className="wrap">
          <Reveal>
            <Heading eyebrow="Fahrlehrerinnen & Fahrlehrer" title="Die Menschen hinter Jelitto." />
          </Reveal>
          <Stagger className="mt-16 grid gap-x-5 gap-y-14 sm:grid-cols-2 lg:grid-cols-3" stagger={0.1}>
            {team.map((m, i) => (
              <StaggerItem key={m.name} className={i === 0 ? "group sm:col-span-2 lg:col-span-1" : "group"}>
                <div className="bg-tile relative aspect-[4/5] overflow-hidden rounded-[28px]">
                  <img
                    src={m.image}
                    alt={m.name}
                    loading="lazy"
                    decoding="async"
                    className="absolute inset-0 h-full w-full object-cover grayscale-[35%] transition-all duration-[1.2s] ease-[var(--ease-out-expo)] group-hover:scale-[1.05] group-hover:grayscale-0"
                  />
                  <div aria-hidden className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/60 to-transparent" />
                </div>
                <h2 className="mt-6 text-[24px] font-semibold tracking-[-0.025em]">{m.name}</h2>
                <p className="text-muted mt-1 text-[17px]">{m.role}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </Section>

      <CtaBand title="Lerne uns persönlich kennen." image="/images/stock/steering-dark.webp" />
    </>
  )
}
