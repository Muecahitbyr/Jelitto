import { Download, FileText } from "lucide-react"
import type { MetaFunction } from "react-router"
import { StepScroller } from "~/components/info/step-scroller"
import { LocalNav } from "~/components/layout/local-nav"
import { Accordion } from "~/components/ui/accordion"
import { ButtonLink } from "~/components/ui/button"
import { CtaBand } from "~/components/ui/cta-band"
import { PageHero } from "~/components/ui/page-hero"
import { Reveal } from "~/components/ui/reveal"
import { Heading, Section } from "~/components/ui/section"
import { infoFaq, steps } from "~/content/info"
import { site } from "~/content/site"
import { faqJsonLd, seo } from "~/lib/seo"

export const meta: MetaFunction = () =>
  seo({
    title: "Führerschein machen: Antrag, Theorie, Praxis & Kosten | Jelitto",
    description:
      "So läuft dein Führerschein ab: Antrag bei der Führerscheinstelle, Theorieunterricht, Pflicht- und Sonderfahrten, Prüfung und Zahlung – Schritt für Schritt erklärt.",
    path: "/info",
    jsonLd: faqJsonLd(infoFaq),
  })

export default function InfoPage() {
  return (
    <>
      <LocalNav
        title="Info"
        links={[
          { label: "Ablauf", href: "#ablauf" },
          { label: "Fragen", href: "#faq" },
        ]}
      />
      <PageHero
        eyebrow="Ablauf und Kosten"
        title="In fünf Schritten zum Führerschein."
        image="/images/stock/key-handover.webp"
        imageAlt="Übergabe eines Autoschlüssels"
        imagePosition="center 30%"
        lead={<>Führerschein machen in Kaufbeuren: <strong>vom Antrag bis zur Prüfung</strong> – so läuft deine Ausbildung ab.</>}
        breadcrumbs={[{ label: "Startseite", to: "/" }, { label: "Info" }]}
      >
        <ButtonLink href={site.downloads.anmeldung} download icon={<Download className="size-4" aria-hidden />}>
          Anmeldung (PDF)
        </ButtonLink>
        <ButtonLink to="/preise" variant="link" className="text-[19px]">
          Preisübersicht
        </ButtonLink>
      </PageHero>

      <Section id="ablauf">
        <div className="wrap mb-16 md:mb-24">
          <Reveal>
            <Heading eyebrow="Führerschein machen in Kaufbeuren" title="Ablauf und Kosten." />
          </Reveal>
        </div>
        <StepScroller steps={steps} />
      </Section>

      <Section id="faq" tone="light">
        <div className="wrap grid gap-14 lg:grid-cols-12">
          <Reveal className="lg:col-span-4">
            <Heading eyebrow="FAQ" title="Häufige Fragen zum Führerschein." size="md" />
            <div className="mt-10 flex flex-col items-start gap-4">
              <ButtonLink to="/preise" variant="link">
                Preisübersicht aller Führerscheinklassen
              </ButtonLink>
              <ButtonLink href={site.downloads.begriffliste} variant="ghost" icon={<FileText className="size-4" aria-hidden />} download>
                Begriffliste für die praktische Ausbildung
              </ButtonLink>
            </div>
          </Reveal>
          <Reveal delay={0.1} className="lg:col-span-8">
            <Accordion items={infoFaq} />
          </Reveal>
        </div>
      </Section>

      <CtaBand />
    </>
  )
}
