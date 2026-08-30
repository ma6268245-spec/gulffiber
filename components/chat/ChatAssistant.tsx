'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
  FALLBACK_ACTION,
  FALLBACK_ANSWER,
  FALLBACK_SUGGESTIONS,
  GREETING_ANSWER,
  STARTER_SUGGESTIONS,
  matchIntent,
  type ChatAction,
  type ChatCard,
  type ChatSuggestion,
} from '@/lib/data/chatbot'

/* ===========================================================================
   GULF FIBRE CHAT ASSISTANT
   ---------------------------------------------------------------------------
   The complete redesign of the earlier Tidio-style clone. Speaks the frozen
   homepage's design grammar (Inter, sapphire, hairlines, ivory) through
   styles/chat.css, and answers ONLY from lib/data/chatbot.ts, which is built
   on lib/data/company.ts - the repository's verified record. The previous
   widget invented transit times, ports, MOQs and couriers; none of those
   appears here.

   Accessibility: the log is a aria-live region, the panel closes on Escape,
   the composer is a labelled form, and every control is focusable with a
   visible focus ring. Lenis scroll isolation attributes are kept so the log
   scrolls with the wheel inside a Lenis page.
   =========================================================================== */

interface Message {
  id: string
  sender: 'bot' | 'user'
  text: string
  time: string
  suggestions?: ChatSuggestion[]
  cards?: ChatCard[]
  action?: ChatAction
  rating?: 'up' | 'down' | null
}

const clock = () =>
  new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })

function welcome(): Message {
  return {
    id: 'msg-welcome',
    sender: 'bot',
    text: GREETING_ANSWER,
    time: clock(),
    suggestions: STARTER_SUGGESTIONS,
    rating: null,
  }
}

const ARROW = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
)

const CHAT_ICON = (
  <div style={{ position: 'absolute', inset: 0, borderRadius: '50%', overflow: 'hidden' }}>
    <Image 
      src="/images/ai-chat-logo.png" 
      alt="AI Chat Icon" 
      fill 
      sizes="60px"
      style={{ objectFit: 'cover' }} 
    />
  </div>
)

const CLOSE_ICON = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
    <path d="M18 6L6 18M6 6l12 12" />
  </svg>
)

const DOTS_ICON = (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <circle cx="12" cy="5" r="2" />
    <circle cx="12" cy="12" r="2" />
    <circle cx="12" cy="19" r="2" />
  </svg>
)

const SEND_ICON = (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
  </svg>
)

const RESET_ICON = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M3 12a9 9 0 1 0 3-6.7L3 8" />
    <path d="M3 3v5h5" />
  </svg>
)

const MAIL_ICON = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="2" y="4" width="20" height="16" rx="3" />
    <path d="m3 7 9 6 9-6" />
  </svg>
)

const UP_ICON = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M7 10v11" />
    <path d="M15 5.63 8.97 8.8a2 2 0 0 0-1.97 2v.2a2 2 0 0 0 .83 1.62L12 16.5" />
    <path d="m13.5 4.5 3 1" />
    <circle cx="15" cy="3.5" r="1.5" />
  </svg>
)

const DOWN_ICON = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M17 14V3" />
    <path d="M9 18.37l6.03-3.17a2 2 0 0 0 1.97-2v-.2a2 2 0 0 0-.83-1.62L12 8.5" />
    <path d="m10.5 19.5-3-1" />
    <circle cx="9" cy="20.5" r="1.5" />
  </svg>
)

const TOP_ICON = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M12 19V5M5 12l7-7 7 7" />
  </svg>
)

export function ChatAssistant() {
  const [visible, setVisible] = useState(false)
  const [open, setOpen] = useState(false)
  const [unread, setUnread] = useState(true)
  const [menuOpen, setMenuOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([welcome()])
  const [input, setInput] = useState('')
  const [typing, setTyping] = useState(false)

  const logRef = useRef<HTMLDivElement>(null)
  const endRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const containerRef = useRef<HTMLElement>(null)
  const launcherRef = useRef<HTMLDivElement>(null)

  /* Reveal the launcher after a short scroll, like the homepage widgets. */
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 200)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  /* Keep the newest message in view, but start from the top for the initial welcome message. */
  useEffect(() => {
    if (messages.length === 1 && !typing) return;
    endRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' })
  }, [messages, typing, open])

  /* Close on Escape; focus the composer when the panel opens. */
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false)
        setMenuOpen(false)
      }
    }
    const onClickOutside = (e: MouseEvent) => {
      const target = e.target as Node
      if (
        containerRef.current && !containerRef.current.contains(target) &&
        launcherRef.current && !launcherRef.current.contains(target)
      ) {
        setOpen(false)
        setMenuOpen(false)
      }
    }
    window.addEventListener('keydown', onKey)
    document.addEventListener('mousedown', onClickOutside)
    inputRef.current?.focus()
    return () => {
      window.removeEventListener('keydown', onKey)
      document.removeEventListener('mousedown', onClickOutside)
    }
  }, [open])

  const scrollTop = () => {
    const lenis = (window as unknown as { lenis?: { scrollTo: (t: number, o?: object) => void } }).lenis
    if (lenis) lenis.scrollTo(0, { duration: 1.2 })
    else window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const send = (raw?: string) => {
    const text = (raw ?? input).trim()
    if (!text || typing) return

    setMessages((prev) => [
      ...prev,
      { id: `usr-${Date.now()}`, sender: 'user', text, time: clock() },
    ])
    if (!raw) setInput('')
    setTyping(true)

    const intent = matchIntent(text)
    const answer = intent?.answer(text) ?? FALLBACK_ANSWER
    const suggestions = intent?.suggestions ?? FALLBACK_SUGGESTIONS
    const action = intent?.action ?? FALLBACK_ACTION
    const cards = intent?.cards

    window.setTimeout(
      () => {
        setTyping(false)
        setMessages((prev) => [
          ...prev,
          {
            id: `bot-${Date.now()}`,
            sender: 'bot',
            text: answer,
            time: clock(),
            suggestions,
            cards,
            action,
            rating: null,
          },
        ])
      },
      500 + Math.min(answer.length * 4, 700)
    )
  }

  const rate = (id: string, rating: 'up' | 'down') =>
    setMessages((prev) => prev.map((m) => (m.id === id ? { ...m, rating } : m)))

  const reset = () => {
    setMessages([welcome()])
    setMenuOpen(false)
    inputRef.current?.focus()
  }

  const closeChat = () => {
    setOpen(false)
    setMenuOpen(false)
  }

  return (
    <>
      {/* ── Launcher + back-to-top ─────────────────────────────────────── */}
      <div className="gf-chat-launch" data-hidden={!visible} data-unread={!open} ref={launcherRef}>
        <button
          className="gf-chat-launch__orb"
          onClick={() => {
            setOpen((v) => !v)
            setUnread(false)
          }}
          aria-label={open ? 'Close the Gulf Fibre assistant' : 'Open the Gulf Fibre assistant'}
          aria-expanded={open}
          aria-haspopup="dialog"
        >
          <span className="gf-chat-launch__ring" aria-hidden="true" />
          {open ? CLOSE_ICON : CHAT_ICON}
          <span className="gf-chat-launch__status" aria-hidden="true" />
        </button>
        <span className="gf-chat-launch__nudge" aria-hidden="true">
          Hi! Gulf Fibre Specialist. How can I help? 👋
        </span>
        <button className="gf-chat-top" onClick={scrollTop} aria-label="Back to top">
          {TOP_ICON}
        </button>
      </div>

      {/* ── Panel ───────────────────────────────────────────────────────── */}
      {open && (
        <section
          className="gf-chat"
          role="dialog"
          ref={containerRef}
          aria-label="Gulf Fibre assistant"
          data-lenis-prevent="true"
          data-lenis-prevent-wheel="true"
          data-lenis-prevent-touch="true"
          onWheel={(e) => e.stopPropagation()}
          onTouchMove={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <header className="gf-chat__head">
            <div className="gf-chat__avatar">
              <Image
                src="/images/ai-chat-logo.png"
                alt="AI Chat Assistant"
                fill
                sizes="44px"
                style={{ objectFit: 'contain' }}
              />
              <span className="gf-chat__avatar-dot" aria-hidden="true" />
            </div>
            <div className="gf-chat__who">
              <span className="gf-chat__who-kicker">Talk to</span>
              <h4 className="gf-chat__who-name">Gulf Fibre Specialist</h4>
              <span className="gf-chat__who-status">
                <span className="gf-chat__who-status-dot" aria-hidden="true" />
                Answers from the company record
              </span>
            </div>
            <div className="gf-chat__head-actions">
              <button
                onClick={() => setMenuOpen((v) => !v)}
                aria-label="Conversation options"
                aria-expanded={menuOpen}
              >
                {DOTS_ICON}
              </button>
              <button onClick={closeChat} aria-label="Close chat">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </button>

              {menuOpen && (
                <div className="gf-chat__menu" role="menu">
                  <button onClick={reset} role="menuitem">
                    {RESET_ICON}
                    Restart conversation
                  </button>
                  <Link href="/contact" onClick={closeChat} role="menuitem">
                    {MAIL_ICON}
                    Open the enquiry form
                  </Link>
                </div>
              )}
            </div>
          </header>

          {/* Message log */}
          <div
            className="gf-chat__log"
            ref={logRef}
            role="log"
            aria-live="polite"
            aria-label="Conversation messages"
            data-lenis-prevent="true"
            data-lenis-prevent-wheel="true"
            data-lenis-prevent-touch="true"
            onWheel={(e) => e.stopPropagation()}
            onTouchMove={(e) => e.stopPropagation()}
          >
            {messages.map((m) =>
              m.sender === 'user' ? (
                <div className="gf-chat__msg gf-chat__msg--user" key={m.id}>
                  <div className="gf-chat__bubble">{m.text}</div>
                  <span className="gf-chat__time">{m.time}</span>
                </div>
              ) : (
                <div className="gf-chat__msg gf-chat__msg--bot" key={m.id}>
                  <div className="gf-chat__bubble">
                    {m.text}

                    {m.cards && m.cards.length > 0 && (
                      <div className="gf-chat__cards">
                        {m.cards.map((c) =>
                          c.href ? (
                            <Link className="gf-chat__card" href={c.href} key={c.code} onClick={closeChat}>
                              <span className="gf-chat__card-code">{c.code}</span>
                              <span className="gf-chat__card-title">{c.title}</span>
                              <dl className="gf-chat__card-rows">
                                {c.rows.map((r) => (
                                  <div className="gf-chat__card-row" key={r.label}>
                                    <dt>{r.label}</dt>
                                    <dd>{r.value}</dd>
                                  </div>
                                ))}
                              </dl>
                              <span className="gf-chat__card-go" aria-hidden="true">
                                {ARROW}
                              </span>
                            </Link>
                          ) : (
                            <div className="gf-chat__card" key={c.code}>
                              <span className="gf-chat__card-code">{c.code}</span>
                              <span className="gf-chat__card-title">{c.title}</span>
                              <dl className="gf-chat__card-rows">
                                {c.rows.map((r) => (
                                  <div className="gf-chat__card-row" key={r.label}>
                                    <dt>{r.label}</dt>
                                    <dd>{r.value}</dd>
                                  </div>
                                ))}
                              </dl>
                            </div>
                          )
                        )}
                      </div>
                    )}

                    {m.action && (
                      <Link className="gf-chat__action" href={m.action.href} onClick={closeChat}>
                        {m.action.text}
                        {ARROW}
                      </Link>
                    )}
                  </div>

                  {m.suggestions && m.suggestions.length > 0 && (
                    <div className="gf-chat__chips">
                      {m.suggestions.map((s) => (
                        <button className="gf-chat__chip" key={s.label} onClick={() => send(s.query)}>
                          {s.label}
                        </button>
                      ))}
                    </div>
                  )}

                  {m.id !== 'msg-welcome' && (
                    <div className="gf-chat__rate">
                      <span>Helpful?</span>
                      <span className="gf-chat__rate-group">
                        <button
                          className="gf-chat__rate-btn"
                          data-on={m.rating === 'up' ? 'up' : undefined}
                          onClick={() => rate(m.id, 'up')}
                          aria-label="Helpful"
                        >
                          {UP_ICON}
                        </button>
                        <button
                          className="gf-chat__rate-btn"
                          data-on={m.rating === 'down' ? 'down' : undefined}
                          onClick={() => rate(m.id, 'down')}
                          aria-label="Not helpful"
                        >
                          {DOWN_ICON}
                        </button>
                      </span>
                      {m.rating && <span className="gf-chat__rate-done">Thank you</span>}
                    </div>
                  )}

                  <span className="gf-chat__time">{m.time}</span>
                </div>
              )
            )}

            {typing && (
              <div className="gf-chat__typing" aria-label="The specialist is typing">
                <i />
                <i />
                <i />
              </div>
            )}
            <div ref={endRef} />
          </div>

          {/* Composer */}
          <form
            className="gf-chat__form"
            onSubmit={(e) => {
              e.preventDefault()
              send()
            }}
          >
            <label htmlFor="gf-chat-input" className="gf-chat__who-kicker" style={{ position: 'absolute', left: -9999 }}>
              Message the Gulf Fibre specialist
            </label>
            <input
              id="gf-chat-input"
              ref={inputRef}
              className="gf-chat__input"
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about denier, GRS, samples…"
              autoComplete="off"
            />
            <button
              className="gf-chat__send"
              type="submit"
              aria-label="Send message"
              disabled={!input.trim()}
            >
              {SEND_ICON}
            </button>
          </form>

          <div className="gf-chat__foot">
            Powered by <strong>Gulf Fibre</strong> · verified company record
          </div>
        </section>
      )}
    </>
  )
}
