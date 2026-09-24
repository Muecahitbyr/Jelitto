import { AnimatePresence, motion, useReducedMotion } from "motion/react"
import { MessageCircle, X } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import { Link, useLocation } from "react-router"
import { answer, greeting, questions, type Answer, type AnswerLink } from "~/content/assistant"
import { cn } from "~/lib/cn"
import { easeOutExpo } from "~/lib/motion"

type Message = { id: number; from: "bot"; answer: Answer } | { id: number; from: "user"; text: string }

/**
 * Fahrschul-Assistent: Besucher tippen auf eine der vorgefertigten Fragen, die Antwort
 * kommt direkt aus den Inhalten der Website. Alle Fragen sind gleichzeitig sichtbar.
 * Läuft komplett im Browser – es werden keine Nachrichten an externe Dienste gesendet.
 */
export function ChatWidget() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([{ id: 0, from: "bot", answer: greeting }])
  const [typing, setTyping] = useState(false)
  const listRef = useRef<HTMLDivElement>(null)
  const nextId = useRef(1)
  const reduce = useReducedMotion()
  const location = useLocation()

  // Beim Seitenwechsel (z. B. Klick auf einen Link in einer Antwort) schließen
  useEffect(() => setOpen(false), [location.pathname])

  // Automatisch zur neuesten Nachricht scrollen
  useEffect(() => {
    const el = listRef.current
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: reduce ? "auto" : "smooth" })
  }, [messages, typing, reduce])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false)
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [open])

  const ask = (question: string) => {
    if (typing) return
    setMessages((m) => [...m, { id: nextId.current++, from: "user", text: question }])
    setTyping(true)
    const delay = reduce ? 0 : 650
    setTimeout(() => {
      setMessages((m) => [...m, { id: nextId.current++, from: "bot", answer: answer(question) }])
      setTyping(false)
    }, delay)
  }

  return (
    <>
      {/* Startknopf */}
      <AnimatePresence>
        {!open && (
          <motion.button
            key="launcher"
            type="button"
            onClick={() => setOpen(true)}
            initial={reduce ? false : { opacity: 0, scale: 0.8, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85 }}
            transition={{ duration: 0.4, ease: easeOutExpo }}
            className="bg-green fixed right-4 bottom-[calc(max(1rem,env(safe-area-inset-bottom))+var(--consent-offset,0px))] z-[47] inline-flex items-center gap-2 rounded-full p-4 text-[15px] font-semibold text-[#0f1a00] shadow-[0_12px_32px_-10px_rgb(77_115_9/0.7)] transition-[bottom,transform] duration-500 ease-[var(--ease-out-expo)] hover:scale-[1.04] active:scale-95 md:right-6 md:bottom-6 md:px-5 md:py-3.5"
            aria-label="Fragen an den Fahrschul-Assistenten"
            aria-haspopup="dialog"
          >
            <MessageCircle className="size-6 md:size-5" aria-hidden />
            <span className="hidden md:inline">Fragen?</span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chatfenster (liegt über dem Cookie-Banner z-46 und dem Knopf z-47) */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="panel"
            role="dialog"
            aria-label="Fahrschul-Assistent"
            initial={reduce ? false : { opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.97, transition: { duration: 0.25 } }}
            transition={{ duration: 0.5, ease: easeOutExpo }}
            style={{ transformOrigin: "bottom right" }}
            className="tone-white fixed inset-x-2 top-[max(4.5rem,env(safe-area-inset-top))] bottom-[max(0.5rem,env(safe-area-inset-bottom))] [@media(max-height:640px)]:top-[max(0.5rem,env(safe-area-inset-top))] z-[48] flex flex-col overflow-hidden rounded-[28px] border border-black/[0.06] shadow-[0_30px_80px_-20px_rgb(0_0_0/0.35)] md:inset-x-auto md:top-auto md:right-6 md:bottom-6 md:h-[min(720px,86vh)] md:w-[420px]"
          >
            {/* Kopf */}
            <div className="flex items-center gap-3 border-b border-black/[0.06] px-4 py-3.5">
              <span className="bg-green grid size-10 shrink-0 place-items-center rounded-full text-[#0f1a00]">
                <MessageCircle className="size-5" aria-hidden />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-[16px] leading-tight font-semibold tracking-[-0.02em]">Fahrschul-Assistent</p>
                <p className="text-muted flex items-center gap-1.5 text-[12px]">
                  <span className="bg-green inline-block size-1.5 rounded-full" aria-hidden /> Antwortet sofort
                </p>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="bg-tile hover:bg-tile-2 grid size-9 place-items-center rounded-full transition-colors"
                aria-label="Chat schließen"
              >
                <X className="size-4" aria-hidden />
              </button>
            </div>

            {/* Verlauf */}
            <div ref={listRef} data-lenis-prevent className="min-h-0 flex-1 space-y-3 overflow-y-auto overscroll-contain px-4 py-4" aria-live="polite">
              {messages.map((m) =>
                m.from === "user" ? (
                  <motion.div
                    key={m.id}
                    initial={reduce ? false : { opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-green ml-auto w-fit max-w-[85%] rounded-[20px] rounded-br-[6px] px-4 py-2.5 text-[15px] leading-snug font-medium text-[#0f1a00]"
                  >
                    {m.text}
                  </motion.div>
                ) : (
                  <motion.div
                    key={m.id}
                    initial={reduce ? false : { opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35 }}
                    className="bg-tile w-fit max-w-[90%] rounded-[20px] rounded-bl-[6px] px-4 py-3 text-[15px] leading-relaxed"
                  >
                    {m.answer.text.map((t, i) => (
                      <p key={i} className={i > 0 ? "mt-2" : undefined}>
                        {t}
                      </p>
                    ))}
                    {m.answer.bullets && (
                      <ul className="mt-2 space-y-1">
                        {m.answer.bullets.map((b) => (
                          <li key={b} className="flex gap-2">
                            <span className="bg-green mt-[0.55em] size-1.5 shrink-0 rounded-full" aria-hidden />
                            <span>{b}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                    {m.answer.links && (
                      <div className="mt-3 flex flex-wrap gap-2">
                        {m.answer.links.map((l) => (
                          <AnswerButton key={l.label} link={l} />
                        ))}
                      </div>
                    )}
                  </motion.div>
                ),
              )}

              {typing && (
                <div className="bg-tile flex w-fit gap-1 rounded-[20px] rounded-bl-[6px] px-4 py-3.5" aria-label="Assistent schreibt">
                  {[0, 1, 2].map((i) => (
                    <motion.span
                      key={i}
                      className="bg-muted size-2 rounded-full"
                      animate={reduce ? undefined : { opacity: [0.3, 1, 0.3], y: [0, -3, 0] }}
                      transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.15 }}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Alle Fragen – immer vollständig sichtbar */}
            <div className="border-t border-black/[0.06] bg-[#fafafa] px-3 pt-3 pb-3">
              <p className="text-muted mb-2 px-1 text-[12px] font-medium [@media(max-height:640px)]:hidden">Häufige Fragen – einfach antippen</p>
              <div className="flex flex-wrap gap-1.5">
                {questions.map((q) => (
                  <button
                    key={q.label}
                    type="button"
                    onClick={() => ask(q.question)}
                    disabled={typing}
                    className="bg-green-soft text-green-deep hover:bg-green/25 inline-flex items-center rounded-full px-3 py-1.5 text-[13px] font-medium transition-colors active:scale-[0.97] disabled:opacity-60 [@media(max-height:640px)]:px-2.5 [@media(max-height:640px)]:py-1 [@media(max-height:640px)]:text-[12px]"
                  >
                    {q.label}
                  </button>
                ))}
              </div>
              <p className="text-muted mt-2.5 text-center text-[11px] [@media(max-height:640px)]:hidden">Antworten basieren auf den Angaben dieser Website.</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

function AnswerButton({ link }: { link: AnswerLink }) {
  const cls = cn(
    "rounded-full bg-white px-3.5 py-1.5 text-[13px] font-semibold text-green-deep ring-1 ring-black/[0.08] transition-colors hover:bg-green-soft",
  )
  if (link.to)
    return (
      <Link to={link.to} className={cls}>
        {link.label} ›
      </Link>
    )
  const external = link.href?.startsWith("http")
  return (
    <a href={link.href} className={cls} target={external ? "_blank" : undefined} rel={external ? "noopener noreferrer" : undefined}>
      {link.label} ›
    </a>
  )
}
