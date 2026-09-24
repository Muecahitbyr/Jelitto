import type { MetaFunction } from "react-router"
import { LegalPage } from "~/components/legal/legal-page"
import { agb } from "~/content/legal"
import { seo } from "~/lib/seo"

export const meta: MetaFunction = () =>
  seo({
    title: "AGB - Fahrschule Jelitto",
    description: "Allgemeine Geschäftsbedingungen der Fahrschule Jelitto in Kaufbeuren – Bestandteil des Ausbildungsvertrages.",
    path: "/agb",
  })

const slug = (title: string) => title.toLowerCase().replace(/\s+/g, "-")

export default function AgbPage() {
  const toc = agb.map((z) => ({ id: slug(z.title), label: `${z.title} · ${z.blocks[0]?.heading ?? ""}` }))
  return (
    <LegalPage
      title="Allgemeine Geschäftsbedingungen"
      lead="Die folgenden Bedingungen sind Bestandteil des Ausbildungsvertrages mit der Fahrschule Jelitto."
      toc={toc}
    >
      <div className="space-y-5">
        {agb.map((z) => (
          <article key={z.title} id={slug(z.title)} className="bg-tile rounded-[24px] p-7 md:p-10">
            <h2 className="text-muted text-[13px] font-semibold tracking-wide uppercase">{z.title}</h2>
            <div className="mt-4 space-y-7">
              {z.blocks.map((block, bi) => (
                <div key={bi}>
                  {block.heading && <h3 className="text-xl font-semibold tracking-tight md:text-2xl">{block.heading}</h3>}
                  <div className="text-muted mt-2 space-y-3 text-[17px] leading-relaxed">
                    {block.paragraphs.map((p, pi) => (
                      <p key={pi} className={/^[a-e]\) /.test(p) ? "-indent-6 pl-6" : undefined}>
                        {p}
                      </p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </article>
        ))}
      </div>
    </LegalPage>
  )
}
