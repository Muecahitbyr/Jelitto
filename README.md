# Fahrschule Jelitto – Website

Neuauflage von [fahrschule-jelitto.com](https://fahrschule-jelitto.com) als modernes React-Projekt im Apple-Stil. Alle Inhalte, Preise, Klassen, das Team sowie Impressum, Datenschutz und AGB stammen von der bisherigen WordPress-Seite.

## Technik

| Bereich | Werkzeug |
| --- | --- |
| Framework | React 19 + React Router 8 (Framework-Modus, **alle Seiten vorgerendert**) |
| Styling | Tailwind CSS 4, Design-Tokens in `app/app.css` – dunkles Apple-„Pro“-Design mit hellen Sektionen (`tone`-Klassen) |
| Animationen | Motion: Hero-Zoom, Scroll-Sequenzen, Parallax, Bild-Reveal, horizontale Klassen-Galerie, Wort-für-Wort-Text |
| Smooth Scrolling | Lenis (deaktiviert bei „Bewegung reduzieren“) |
| Schrift | SF Pro auf Apple-Geräten, sonst lokal eingebundene Inter (kein Google-Fonts-Aufruf) |
| Icons | lucide-react |

## Befehle

```bash
npm install          # Abhängigkeiten installieren
npm run dev          # Entwicklungsserver auf http://localhost:5173
npm run build        # Produktions-Build nach build/client (statisches HTML je Seite + sitemap.xml)
npm run preview      # Build lokal testen auf http://localhost:4173
npm run typecheck    # TypeScript prüfen
```

## Inhalte pflegen

Texte und Daten liegen getrennt vom Design in `app/content/`:

| Datei | Inhalt |
| --- | --- |
| `site.ts` | Adresse, Telefon, E-Mail, Öffnungszeiten, **Neuigkeiten** (Startseite), Navigation, Preisstand |
| `classes.ts` | Alle Führerscheinklassen inkl. **Preise**. Preisübersicht, Klassenübersicht und Klassenseiten lesen daraus |
| `info.ts` | Ablauf in 5 Schritten und FAQ der Infoseite |
| `begleitetes-fahren.ts` | Bedingungen, Zeitplan und FAQ zu B17 |
| `team.ts` | Teammitglieder und Fotos |
| `legal.ts` | Datenschutzerklärung und AGB (wörtlich übernommen) |

Das Impressum steht direkt in `app/routes/impressum.tsx`.

Bilder liegen in `public/images/` (WebP, optimiert), PDFs in `public/downloads/`.

### Bildquellen

- `public/images/stock/` – Beispielbilder von [Pexels](https://www.pexels.com/license/) (kostenlos, auch kommerziell nutzbar, keine Quellenangabe nötig). Sie lassen sich jederzeit durch eigene Fotos der Fahrschule ersetzen: Datei mit gleichem Namen austauschen.
- `public/images/team*`, `public/images/klassen/` – Originalfotos der Fahrschule (Team, Ausbildungsfahrzeuge).

## Seiten & URLs

Die URLs sind identisch mit der alten Seite. Dadurch bleiben Google-Rankings und bestehende Links erhalten.

`/` · `/info` · `/unterricht` · `/team` · `/klassen` · `/klassen/b-b17` · `/b197` · `/klassen/be` · `/klassen/mo-mofa` · `/klassen/am` · `/klassen/a1` · `/klassen/a2` · `/klassen/a` · `/b196` · `/begleitetes-fahren` · `/preise` · `/anmeldung` · `/impressum`

Pro Seite gibt es SEO-Titel und -Beschreibung (von der alten Seite übernommen), Canonical-URL, Open-Graph-Daten, JSON-LD (Fahrschule + FAQ) und eine automatisch erzeugte `sitemap.xml`.

## Veröffentlichen

Nach `npm run build` den **Inhalt von `build/client/`** auf den Webspace hochladen. Einen Node-Server braucht es nicht.

- **Apache / klassischer Webspace:** Die mitgelieferte `.htaccess` kümmert sich um die 404-Seite, Caching, Komprimierung und Weiterleitungen alter PDF-Links.
- **Netlify / Vercel / Cloudflare Pages:** Build-Befehl `npm run build`, Ausgabeordner `build/client`.

## Online-Anmeldung

Das Formular unter `/anmeldung` öffnet derzeit eine vorausgefüllte E-Mail an die Fahrschule. Es funktioniert also ohne Server. Für einen direkten Versand kann `handleSubmit` in `app/routes/anmeldung.tsx` an einen Formular-Dienst (z. B. Formspree, Web3Forms) oder an die Fahrschulsoftware angebunden werden.

## Rechtliches, Cookies & Einwilligung

- Eigene Seiten: `/impressum`, `/datenschutz`, `/agb` (gemeinsamer Rahmen in `app/components/legal/legal-page.tsx`).
- AGB und die Abschnitte zu den Betroffenenrechten stammen wörtlich aus der bisherigen Website (`app/content/legal.ts`).
- Die Datenschutz-Abschnitte zu Hosting, Cookies, Schriftarten, Google Maps, Online-Anmeldung, Kontakt, Assistent und Links beschreiben die neue Website und wurden neu formuliert (`app/routes/datenschutz.tsx`). **Vor dem Livegang juristisch prüfen lassen** und den Hosting-Abschnitt anpassen, falls nicht Vercel.
- Die Website setzt keine eigenen Cookies. Der Einwilligungs-Banner (`app/components/consent/consent-banner.tsx`) fragt nur nach Google Maps; die Auswahl liegt im localStorage (`jelitto-consent-v1`) und lässt sich über „Cookie-Einstellungen“ im Footer ändern. Kommen später weitere externe Dienste dazu (z. B. Analyse), müssen sie dort und in der Datenschutzerklärung ergänzt werden.

## Google Maps

Google Maps wird nur mit Einwilligung geladen: automatisch, wenn in den Cookie-Einstellungen erlaubt, sonst erst nach Klick auf „Karte laden“.
