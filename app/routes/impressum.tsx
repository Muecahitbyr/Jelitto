import type { MetaFunction } from "react-router"
import { LegalPage } from "~/components/legal/legal-page"
import { site } from "~/content/site"
import { seo } from "~/lib/seo"

export const meta: MetaFunction = () =>
  seo({
    title: "Impressum - Fahrschule Jelitto",
    description: "Impressum der Fahrschule Jelitto in Kaufbeuren: Inhaber Berndt Gaugler, Alte Weberei 12, Telefon 0171 1977876.",
    path: "/impressum",
  })

export default function ImpressumPage() {
  return (
    <LegalPage title="Impressum">
      <div className="grid gap-5 md:grid-cols-2">
        {/* § 5 DDG (Digitale-Dienste-Gesetz) hat am 14.05.2024 den früheren § 5 TMG abgelöst */}
        <LegalCard title="Angaben gemäß § 5 DDG">
          {site.owner}
          <br />
          {site.name}
          <br />
          {site.address.street}
          <br />
          {site.address.zip} {site.address.city}
        </LegalCard>
        <LegalCard title="Kontakt">
          Telefon: <a href={site.phone.href}>{site.phone.international}</a>
          <br />
          E-Mail: <a href={`mailto:${site.email}`}>{site.email}</a>
        </LegalCard>
        <LegalCard title="Aufsichtsbehörde">
          Landratsamt Kaufbeuren
          <br />
          Rathaus Kaufbeuren
          <br />
          Am Graben 3
          <br />
          87600 Kaufbeuren
          <br />
          <a href="https://www.kaufbeuren.de/home.aspx" target="_blank" rel="noopener noreferrer">
            https://www.kaufbeuren.de/home.aspx
          </a>
        </LegalCard>
        <LegalCard title="Berufsbezeichnung und berufsrechtliche Regelungen">
          Berufsbezeichnung: Verkehrspädagoge
          <br />
          Zuständige Kammer:
          <br />
          Verliehen durch: Bayern
          <br />
          Es gelten folgende berufsrechtliche Regelungen:
          <br />
          Regelungen einsehbar unter:
        </LegalCard>
        <LegalCard title="Angaben zur Berufshaftpflichtversicherung">
          Name und Sitz des Versicherers:
          <br />
          Fahrlehrerversicherung
          <br />
          Mittlerer Pfad 5
          <br />
          70499 Stuttgart
          <br />
          <br />
          Geltungsraum der Versicherung:
          <br />
          Deutschland
        </LegalCard>
        <LegalCard title="Verbraucherstreitbeilegung">
          Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.
        </LegalCard>
      </div>
      <p className="text-muted mt-6 text-sm">
        Quelle:{" "}
        <a href="https://www.e-recht24.de" target="_blank" rel="noopener noreferrer" className="underline-offset-2 hover:underline">
          https://www.e-recht24.de
        </a>
      </p>
    </LegalPage>
  )
}

function LegalCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-tile rounded-[24px] p-7 md:p-8">
      <h2 className="text-lg font-semibold tracking-tight">{title}</h2>
      <p className="text-muted [&_a]:text-fg mt-3 text-[17px] leading-relaxed break-words [&_a]:underline [&_a]:underline-offset-2">{children}</p>
    </div>
  )
}
