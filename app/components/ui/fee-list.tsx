import type { Fees } from "~/content/classes"
import { formatEuro } from "~/content/classes"
import { Stagger, StaggerItem } from "./reveal"

type Row = { label: string; value: string; hint?: string }

const plural = (n: number, one: string, many: string) => `${n} ${n === 1 ? one : many}`

export function feeRows(fees: Fees): Row[] {
  const rows: Row[] = [{ label: "Grundbetrag", value: formatEuro(fees.grundbetrag) }]
  if (fees.grundbetragErweiterung) rows.push({ label: "Grundbetrag bei Erweiterung", value: formatEuro(fees.grundbetragErweiterung) })
  if (fees.lehrmaterial) rows.push({ label: fees.lehrmaterialLabel ?? "Lehrmaterial", value: formatEuro(fees.lehrmaterial) })
  if (fees.uebungsfahrt) rows.push({ label: "Übungsfahrt", value: formatEuro(fees.uebungsfahrt) })
  if (fees.sonderfahrten) {
    const { ueberland, autobahn, nacht, price } = fees.sonderfahrten
    const each = (n: number) => (n > 1 ? `à ${formatEuro(price)}` : formatEuro(price))
    rows.push({ label: plural(ueberland, "Überlandfahrt", "Überlandfahrten"), value: each(ueberland) })
    rows.push({ label: plural(autobahn, "Autobahnfahrt", "Autobahnfahrten"), value: each(autobahn) })
    rows.push({ label: plural(nacht, "Nachtfahrt", "Nachtfahrten"), value: each(nacht) })
  }
  if (fees.testfahrt) rows.push({ label: "Testfahrt B197", value: formatEuro(fees.testfahrt) })
  if (fees.theoriepruefung) rows.push({ label: "Theorieprüfung", value: formatEuro(fees.theoriepruefung) })
  if (fees.praktischePruefung) rows.push({ label: "Praktische Prüfung", value: formatEuro(fees.praktischePruefung) })
  return rows
}

/** Preisliste im Stil eines Apple-Tech-Specs-Blocks */
export function FeeList({ fees, showLessonNote }: { fees: Fees; showLessonNote?: boolean }) {
  const rows = feeRows(fees)
  return (
    <div>
      <Stagger as="ul" className="border-line divide-line divide-y border-y" stagger={0.05}>
        {rows.map((row) => (
          <StaggerItem as="li" key={row.label} className="flex items-baseline justify-between gap-6 py-5">
            <span className="text-[17px] md:text-[19px]">{row.label}</span>
            <span className="text-[17px] font-semibold whitespace-nowrap tabular-nums md:text-[19px]">{row.value}</span>
          </StaggerItem>
        ))}
      </Stagger>
      {showLessonNote && <p className="text-muted mt-4 text-sm">(*eine Fahrstunde entspricht 45min)</p>}
    </div>
  )
}
