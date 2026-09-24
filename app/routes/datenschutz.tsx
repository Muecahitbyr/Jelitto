import type { MetaFunction } from "react-router"
import { Link } from "react-router"
import { LegalPage, LegalSection } from "~/components/legal/legal-page"
import { datenschutz } from "~/content/legal"
import { site } from "~/content/site"
import { openConsentSettings } from "~/lib/consent"
import { seo } from "~/lib/seo"

export const meta: MetaFunction = () =>
  seo({
    title: "Datenschutzerklärung - Fahrschule Jelitto",
    description: "Datenschutzerklärung der Fahrschule Jelitto in Kaufbeuren: welche Daten die Website verarbeitet, Cookies, Google Maps und Ihre Rechte.",
    path: "/datenschutz",
  })

/*
 * Aufbau:
 * - Abschnitte zu Hosting, Cookies, Schriftarten, Google Maps, Online-Anmeldung, Kontakt,
 *   Fahrschul-Assistent und Links beschreiben die NEUE Website und wurden neu formuliert.
 *   → Vor dem Livegang juristisch prüfen lassen (z. B. Anwalt oder Datenschutz-Generator).
 *   Den Hosting-Abschnitt an den tatsächlichen Anbieter anpassen, falls nicht Vercel.
 * - Die Abschnitte zu Ihren Rechten und zur Verschlüsselung stammen wörtlich aus der
 *   bisherigen Datenschutzerklärung (app/content/legal.ts).
 */

// Aus der alten Erklärung ersetzt (beschrieben die alte WordPress-Seite): Google Maps, Online-Anmeldung
const replaced = ["Verwendung von Google Maps", "Online-Anmeldung"]
const kept = datenschutz.sections.filter((s) => !replaced.includes(s.heading))
const keptId = (heading: string) =>
  heading
    .toLowerCase()
    .replace(/ä/g, "ae")
    .replace(/ö/g, "oe")
    .replace(/ü/g, "ue")
    .replace(/ß/g, "ss")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")

const toc = [
  { id: "verantwortlich", label: "Verantwortliche Stelle" },
  { id: "ueberblick", label: "Das Wichtigste in Kürze" },
  { id: "hosting", label: "Hosting & Server-Logfiles" },
  { id: "cookies", label: "Cookies & Speicherung" },
  { id: "schriftarten", label: "Schriftarten" },
  { id: "google-maps", label: "Google Maps" },
  { id: "online-anmeldung", label: "Online-Anmeldung" },
  { id: "kontakt", label: "Kontakt" },
  { id: "assistent", label: "Fahrschul-Assistent" },
  { id: "links", label: "Links zu anderen Seiten" },
  ...kept.map((s) => ({ id: keptId(s.heading), label: s.heading })),
]

export default function DatenschutzPage() {
  return (
    <LegalPage title="Datenschutzerklärung" lead="Stand: September 2026" toc={toc}>
      <LegalSection id="verantwortlich" title="Verantwortliche Stelle">
        <p>
          {datenschutz.address.map((line, i) => (
            <span key={line} className={i === 0 ? "text-fg block font-semibold" : "block"}>
              {line}
            </span>
          ))}
        </p>
        <p>
          Telefon: <a href={site.phone.href}>{site.phone.display}</a>
          <br />
          E-Mail: <a href={`mailto:${site.email}`}>{site.email}</a>
        </p>
        {datenschutz.intro.map((p) => (
          <p key={p.text}>{p.text}</p>
        ))}
      </LegalSection>

      <LegalSection id="ueberblick" title="Das Wichtigste in Kürze">
        <ul className="list-disc space-y-2 pl-5">
          <li>Diese Website setzt keine Tracking-, Analyse- oder Werbe-Cookies ein.</li>
          <li>Schriftarten werden von unserem eigenen Server geladen, nicht von Google.</li>
          <li>Google Maps wird nur geladen, wenn Sie dem zustimmen.</li>
          <li>Das Anmeldeformular und der Fahrschul-Assistent senden keine Daten an unseren Server oder an Dritte.</li>
          <li>
            Ihre Auswahl können Sie jederzeit in den{" "}
            <button type="button" onClick={openConsentSettings} className="text-fg underline underline-offset-4">
              Cookie-Einstellungen
            </button>{" "}
            ändern.
          </li>
        </ul>
      </LegalSection>

      <LegalSection id="hosting" title="Hosting und Server-Logfiles">
        <p>
          Diese Website wird bei Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, USA, gehostet. Beim Aufruf der Seiten verarbeitet der Hoster
          automatisch technisch notwendige Daten, die Ihr Browser übermittelt: IP-Adresse, Datum und Uhrzeit des Zugriffs, aufgerufene Seite, Referrer,
          Browsertyp und Betriebssystem.
        </p>
        <p>
          Die Verarbeitung dient der sicheren und stabilen Bereitstellung der Website. Rechtsgrundlage ist unser berechtigtes Interesse nach Art. 6 Abs. 1
          lit. f DSGVO. Die Daten werden nur so lange gespeichert, wie es für diese Zwecke erforderlich ist. Dabei kann eine Übermittlung in die USA
          stattfinden. Weitere Informationen:{" "}
          <a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer">
            Datenschutzerklärung von Vercel
          </a>
          .
        </p>
      </LegalSection>

      <LegalSection id="cookies" title="Cookies und Speicherung im Browser">
        <p>Diese Website selbst setzt keine Cookies.</p>
        <p>
          Wenn Sie in den Datenschutz-Einstellungen eine Auswahl treffen, speichern wir diese Auswahl im lokalen Speicher Ihres Browsers (localStorage,
          Eintrag „jelitto-consent-v1“), damit wir Sie nicht bei jedem Besuch erneut fragen müssen. Diese Speicherung ist technisch erforderlich (§ 25 Abs. 2
          Nr. 2 TDDDG). Sie können den Eintrag jederzeit über die Einstellungen Ihres Browsers löschen.
        </p>
        <p>
          Erst wenn Sie Google Maps zustimmen, kann Google beim Laden der Karte eigene Cookies setzen (siehe unten). Ihre Auswahl können Sie jederzeit in den{" "}
          <button type="button" onClick={openConsentSettings} className="text-fg underline underline-offset-4">
            Cookie-Einstellungen
          </button>{" "}
          ändern oder widerrufen.
        </p>
      </LegalSection>

      <LegalSection id="schriftarten" title="Schriftarten">
        <p>
          Die auf dieser Website verwendete Schrift wird direkt von unserem Server ausgeliefert. Es wird keine Verbindung zu Google Fonts oder anderen
          Schriftanbietern hergestellt. Auf Apple-Geräten wird die im System vorhandene Schrift verwendet.
        </p>
      </LegalSection>

      <LegalSection id="google-maps" title="Google Maps (nur mit Einwilligung)">
        <p>
          Zur Darstellung unseres Standorts können Sie eine Karte von Google Maps laden. Anbieter ist die Google Ireland Limited, Gordon House, Barrow Street,
          Dublin 4, Irland.
        </p>
        <p>
          Die Karte wird erst geladen, wenn Sie dem in den Datenschutz-Einstellungen oder direkt an der Karte zustimmen. Vorher werden keine Daten an Google
          übertragen. Nach dem Laden erhält Google insbesondere Ihre IP-Adresse und Informationen über die Nutzung der Karte, kann Cookies setzen und Daten
          auch in die USA übermitteln.
        </p>
        <p>
          Rechtsgrundlage ist Ihre Einwilligung nach Art. 6 Abs. 1 lit. a DSGVO und § 25 Abs. 1 TDDDG. Sie können die Einwilligung jederzeit mit Wirkung
          für die Zukunft in den{" "}
          <button type="button" onClick={openConsentSettings} className="text-fg underline underline-offset-4">
            Cookie-Einstellungen
          </button>{" "}
          widerrufen. Weitere Informationen:{" "}
          <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">
            Datenschutzerklärung von Google
          </a>
          .
        </p>
      </LegalSection>

      <LegalSection id="online-anmeldung" title="Online-Anmeldung">
        <p>
          Auf der Seite <Link to="/anmeldung">Anmeldung</Link> können Sie Ihre Angaben (z. B. Name, Anschrift, Geburtsdatum, Telefonnummer, E-Mail-Adresse
          und gewünschte Führerscheinklasse) in ein Formular eingeben. Das Formular sendet diese Daten nicht an unseren Server: Es öffnet lediglich Ihr
          E-Mail-Programm mit einer vorausgefüllten Nachricht an {site.email}. Erst wenn Sie diese E-Mail selbst abschicken, erhalten wir Ihre Angaben.
        </p>
        <p>
          Wir verwenden die Angaben, um die Vertragsunterlagen vorzubereiten und mit Ihnen per E-Mail, Telefon oder vor Ort einen Termin zum
          Vertragsabschluss zu vereinbaren. Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO (vorvertragliche Maßnahmen). Ein Vertrag kommt erst bei
          Unterzeichnung der Vertragsunterlagen zustande.
        </p>
        <p>
          Kommt es nicht zum Vertragsabschluss, werden wir alle von Ihnen gespeicherten Daten löschen, sofern keine gesetzliche Aufbewahrungspflicht für die
          Daten besteht.
        </p>
      </LegalSection>

      <LegalSection id="kontakt" title="Kontakt per E-Mail oder Telefon">
        <p>
          Wenn Sie uns per E-Mail oder Telefon kontaktieren, verarbeiten wir Ihre Angaben, um Ihre Anfrage zu beantworten. Rechtsgrundlage ist Art. 6 Abs. 1
          lit. b DSGVO, sofern Ihre Anfrage mit einer Ausbildung zusammenhängt, ansonsten unser berechtigtes Interesse an der Beantwortung von Anfragen (Art.
          6 Abs. 1 lit. f DSGVO). Wir löschen die Daten, sobald sie nicht mehr erforderlich sind und keine Aufbewahrungspflichten bestehen.
        </p>
      </LegalSection>

      <LegalSection id="assistent" title="Fahrschul-Assistent">
        <p>
          Der Fahrschul-Assistent auf dieser Website beantwortet häufige Fragen anhand der Inhalte dieser Website. Er läuft vollständig in Ihrem Browser. Ihre
          Eingaben werden weder an uns noch an Dritte (etwa KI-Anbieter) übertragen und nicht gespeichert. Beim Schließen oder Neuladen der Seite ist der
          Verlauf gelöscht.
        </p>
      </LegalSection>

      <LegalSection id="links" title="Links zu anderen Websites">
        <p>
          Unsere Website enthält Links zu anderen Anbietern, etwa zu Facebook, Google Maps (Routenplanung) oder Behörden. Es handelt sich um einfache Links,
          keine eingebundenen Inhalte oder Plugins. Daten werden erst übertragen, wenn Sie einen Link anklicken und die fremde Website öffnen. Dort gilt die
          Datenschutzerklärung des jeweiligen Anbieters.
        </p>
      </LegalSection>

      {/* Wörtlich aus der bisherigen Datenschutzerklärung */}
      {kept.map((section) => (
        <LegalSection key={section.heading} id={keptId(section.heading)} title={section.heading}>
          {section.paragraphs.map((p) => (
            <p key={p.text}>
              <LinkedText text={p.text} links={p.links} />
            </p>
          ))}
        </LegalSection>
      ))}
    </LegalPage>
  )
}

/** Ersetzt Link-Beschriftungen im Text durch echte Links */
function LinkedText({ text, links }: { text: string; links?: { href: string; label: string }[] }) {
  if (!links?.length) return <>{text}</>
  const parts: React.ReactNode[] = []
  let rest = text
  links.forEach((link, i) => {
    const idx = rest.indexOf(link.label)
    if (idx === -1) return
    parts.push(rest.slice(0, idx))
    parts.push(
      <a key={i} href={link.href} target="_blank" rel="noopener noreferrer">
        {link.label}
      </a>,
    )
    rest = rest.slice(idx + link.label.length)
  })
  parts.push(rest)
  return <>{parts}</>
}
