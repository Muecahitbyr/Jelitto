import type { MetaFunction } from "react-router"
import { Link } from "react-router"
import { b17Card } from "~/components/home/class-showcase"
import { LocalNav } from "~/components/layout/local-nav"
import { ClassCard } from "~/components/ui/class-card"
import { CtaBand } from "~/components/ui/cta-band"
import { PageHero } from "~/components/ui/page-hero"
import { Reveal, Stagger, StaggerItem } from "~/components/ui/reveal"
import { Heading, Section } from "~/components/ui/section"
import { Tile } from "~/components/ui/tile"
import { autoClasses, bikeClasses } from "~/content/classes"
import { site } from "~/content/site"
import { seo } from "~/lib/seo"

export const meta: MetaFunction = () =>
  seo({
    title: "Führerscheinklassen in Kaufbeuren – Auto & Motorrad | Jelitto",
    description:
      "Alle Führerscheinklassen der Fahrschule Jelitto in Kaufbeuren: Auto (B, B17, BA, B196, B197, BE) und Zweirad (A, A1, A2, AM, Mofa) – mit Kosten im Überblick.",
    path: "/klassen",
  })

export default function KlassenPage() {
  return (
    <>
      <LocalNav
        title="Klassen"
        links={[
          { label: "Auto", href: "#auto" },
          { label: "Zweirad", href: "#zweirad" },
          { label: "Kosten", href: "#kosten" },
        ]}
      />
      <PageHero
        eyebrow="Führerscheinklassen"
        title="Führerscheinklassen in Kaufbeuren"
        image="/images/stock/aerial-forest-winding.webp"
        imageAlt="Kurvige Straße durch den Wald aus der Luft"
        lead={
          <>
            In der Alten Weberei 12 in Kaufbeuren bilden wir in <strong>allen gängigen Auto- und Zweiradklassen</strong> aus. Der Theorieunterricht
            für alle Klassen findet montags bis donnerstags von 19:00 bis 20:30 Uhr statt, die praktische Ausbildung stimmen wir individuell mit dir ab.
          </>
        }
        breadcrumbs={[{ label: "Startseite", to: "/" }, { label: "Klassen" }]}
      />

      <Section id="auto">
        <div className="wrap">
          <Reveal>
            <Heading eyebrow="Auto" title="Autoklassen." />
          </Reveal>
          <Stagger className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4" stagger={0.08}>
            {[autoClasses[0], b17Card, ...autoClasses.slice(1)].map((c) => (
              <StaggerItem key={c.path}>
                <ClassCard item={c} />
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </Section>

      <Section id="zweirad" tone="light">
        <div className="wrap">
          <Reveal>
            <Heading eyebrow="Zweirad" title="Zweiradklassen." />
          </Reveal>
          <Stagger className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3" stagger={0.08}>
            {bikeClasses.map((c) => (
              <StaggerItem key={c.path}>
                <ClassCard item={c} />
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </Section>

      <Section id="kosten" tone="mint">
        <div className="wrap grid gap-4 md:grid-cols-2">
          <Tile className="p-8 md:p-12">
            <p className="eyebrow mb-4">Kosten</p>
            <h2 className="display-sm">Was kostet der Führerschein?</h2>
            <div className="body-copy mt-6 space-y-4">
              <p>
                Auf jeder Klassenseite findest du den aktuellen Grundbetrag, die Preise für Übungs- und Sonderfahrten sowie die Prüfungsgebühren. Dazu
                kommen die Gebühren für den Führerscheinantrag bei Stadt bzw. Landratsamt und die TÜV-Gebühren für die theoretische und praktische
                Prüfung. Den Grundbetrag zahlst du bei der Anmeldung, die Endabrechnung vor der praktischen Prüfung.
              </p>
              <p>
                Alle Preise auf einen Blick findest du in der <Link to="/preise">Preisübersicht aller Führerscheinklassen</Link>.
              </p>
            </div>
          </Tile>
          <Tile delay={0.08} className="p-8 md:p-12">
            <p className="eyebrow mb-4">Anmeldung</p>
            <h2 className="display-sm">So meldest du dich an.</h2>
            <div className="body-copy mt-6 space-y-4">
              <p>
                Melde dich montags bis donnerstags ab 18:30 Uhr direkt bei uns in der Alten Weberei 12 in Kaufbeuren an oder ruf uns unter{" "}
                <a href={site.phone.href}>{site.phone.display}</a> an. Alle Schritte zum Führerscheinantrag und das Anmeldeformular findest du auf der{" "}
                <Link to="/info">Infoseite</Link>, die Unterrichtszeiten unter <Link to="/unterricht">Theorieunterricht</Link>.
              </p>
              <p>
                Ausführlich für Eltern erklärt:{" "}
                <Link to="/begleitetes-fahren">Begleitetes Fahren ab 17 – wer darf Begleitperson sein, welche Fristen gelten</Link>.
              </p>
            </div>
          </Tile>
        </div>
      </Section>

      <CtaBand image="/images/stock/view-from-car.webp" />
    </>
  )
}
