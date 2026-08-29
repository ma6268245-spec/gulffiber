'use client'

import { useEffect, useState, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'

interface Message {
  id: string
  sender: 'bot' | 'user'
  text: string
  time: string
  quickOptions?: Array<{ label: string; query: string }>
  rating?: 'up' | 'down' | null
  actionLink?: { text: string; href: string }
}

const PRESET_CONVERSATIONS: Record<
  string,
  {
    answer: string
    quickOptions?: Array<{ label: string; query: string }>
    action?: { text: string; href: string }
  }
> = {
  shipping_eu: {
    answer: 'We dispatch FOB Karachi or CIF to major European ports (Rotterdam, Hamburg, Antwerp, Valencia) with standard 18–24 day container transit times and full EUR.1 / GRS certification documentation.',
    quickOptions: [
      { label: 'Container MOQ for Europe', query: 'What is the container MOQ for Europe?' },
      { label: 'Request Lab Sample to EU', query: 'Can I request lab test samples?' },
    ],
    action: { text: 'View Export Details →', href: '/services' },
  },
  shipping_usa: {
    answer: 'For USA & North American buyers, we provide CIF East Coast (New York, Savannah) and West Coast (Los Angeles) shipping. Standard MOQs are 1 x 40ft HQ container (~24 Metric Tonnes) with batch-specific Certificate of Analysis (COA).',
    quickOptions: [
      { label: 'Custom Denier Specs for USA', query: 'What denier specs are available?' },
      { label: 'Request Proforma Quote', query: 'How do I request a quote?' },
    ],
    action: { text: 'Request USA Proforma →', href: '/contact' },
  },
  samples: {
    answer: 'Yes! We dispatch 1kg–5kg test swatches, fiber sample cones, and non-woven swatch binders internationally via DHL/FedEx Express with comprehensive lab test parameters.',
    quickOptions: [
      { label: 'Shipping rates to EU', query: 'Tell me about shipping rates to EU' },
      { label: 'Shipping rates to USA', query: 'Tell me about shipping rates to USA' },
    ],
    action: { text: 'Order Sample Cones →', href: '/contact' },
  },
  specs: {
    answer: 'We manufacture Polyester Staple Fibre from 1.2D to 15D (cut lengths 32mm–102mm), high-loft thermal wadding, and needle-punched felts across semi-dull, bright, and dope-dyed finishes.',
    quickOptions: [
      { label: 'Do you provide GRS certificates?', query: 'Do you provide GRS and ISO certificates?' },
      { label: 'Request Sample Swatches', query: 'Can I request lab test samples?' },
    ],
    action: { text: 'Browse Full Catalog →', href: '/products' },
  },
  certs: {
    answer: 'Every shipment is verified under ISO 9001:2015, certified under GRS (Global Recycled Standard) with full Scope Certificates, compliant with OEKO-TEX Standard 100, and backed by the Membership Certificate of Lahore Chamber of Commerce and Industry (LCCI).',
    quickOptions: [
      { label: 'Shipping rates to EU', query: 'Tell me about shipping rates to EU' },
      { label: 'Request Proforma Quote', query: 'How do I request a quote?' },
    ],
    action: { text: 'View Quality Specs →', href: '/quality' },
  },
}

export function FloatingActions() {
  const [visible, setVisible] = useState(false)
  const [chatOpen, setChatOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'msg-init',
      sender: 'bot',
      text: 'Hello! 👋 How can I help you with your fibre specifications, export rates, or laboratory sample requests today?',
      time: 'Just now',
      quickOptions: [
        { label: 'Shipping rates to EU countries', query: 'Tell me about shipping rates to EU' },
        { label: 'Shipping rates to USA & Americas', query: 'Tell me about shipping rates to USA' },
        { label: 'Request Lab Test Samples (1–5kg)', query: 'Can I request lab test samples?' },
        { label: 'ISO 9001, GRS, OEKO-TEX & LCCI Certs', query: 'Do you provide GRS and ISO certificates?' },
      ],
    },
  ])
  const [inputVal, setInputVal] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 200)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (chatOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages, isTyping, chatOpen])

  const scrollToTop = () => {
    ;(window as unknown as { lenis?: { scrollTo: (target: number, opts: object) => void } }).lenis?.scrollTo(0, { duration: 1.2 }) ||
      window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleSend = (textToSend?: string) => {
    const query = (textToSend || inputVal).trim()
    if (!query) return

    const userMsg: Message = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text: query,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    }

    setMessages((prev) => [...prev, userMsg])
    if (!textToSend) setInputVal('')
    setIsTyping(true)

    // Determine smart matching
    let key = 'specs'
    const qLower = query.toLowerCase()
    if (qLower.includes('eu') || qLower.includes('europe') || qLower.includes('rotterdam')) {
      key = 'shipping_eu'
    } else if (qLower.includes('usa') || qLower.includes('america') || qLower.includes('us')) {
      key = 'shipping_usa'
    } else if (qLower.includes('sample') || qLower.includes('cone') || qLower.includes('swatch') || qLower.includes('lab')) {
      key = 'samples'
    } else if (qLower.includes('grs') || qLower.includes('cert') || qLower.includes('iso') || qLower.includes('oeko')) {
      key = 'certs'
    }

    const matched = PRESET_CONVERSATIONS[key] || PRESET_CONVERSATIONS.specs

    setTimeout(() => {
      setIsTyping(false)
      setMessages((prev) => [
        ...prev,
        {
          id: `bot-${Date.now()}`,
          sender: 'bot',
          text: matched.answer,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          quickOptions: matched.quickOptions,
          actionLink: matched.action,
          rating: null,
        },
      ])
    }, 650)
  }

  const handleRating = (messageId: string, rating: 'up' | 'down') => {
    setMessages((prev) =>
      prev.map((m) => (m.id === messageId ? { ...m, rating } : m))
    )
  }

  const handleResetChat = () => {
    setMessages([
      {
        id: 'msg-init',
        sender: 'bot',
        text: 'Hello! 👋 How can I help you with your fibre specifications, export rates, or laboratory sample requests today?',
        time: 'Just now',
        quickOptions: [
          { label: 'Shipping rates to EU countries', query: 'Tell me about shipping rates to EU' },
          { label: 'Shipping rates to USA & Americas', query: 'Tell me about shipping rates to USA' },
          { label: 'Request Lab Test Samples (1–5kg)', query: 'Can I request lab test samples?' },
        ],
      },
    ])
    setMenuOpen(false)
  }

  return (
    <>
      {/* Floating Action Orbs */}
      <div
        style={{
          position: 'fixed',
          bottom: 'clamp(1.25rem, 3vw, 2.5rem)',
          right: 'clamp(1.25rem, 3vw, 2.5rem)',
          zIndex: 900,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.85rem',
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(1rem)',
          transition: 'opacity 0.35s cubic-bezier(0.16,1,0.3,1), transform 0.35s cubic-bezier(0.16,1,0.3,1)',
          pointerEvents: visible ? 'auto' : 'none',
        }}
      >
        {/* Specialist Floating Trigger Orb */}
        <button
          onClick={() => setChatOpen(!chatOpen)}
          aria-label="Open Gulf Fibre Chat"
          style={{
            width: '3.75rem',
            height: '3.75rem',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #0076FF 0%, #005CE6 100%)',
            border: '2px solid #FFFFFF',
            color: '#FFFFFF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 16px 36px rgba(0, 118, 255, 0.45), 0 4px 12px rgba(0,0,0,0.15)',
            cursor: 'pointer',
            position: 'relative',
            transition: 'all 0.28s cubic-bezier(0.16, 1, 0.3, 1)',
            padding: '2px',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.1) translateY(-2px)'
            e.currentTarget.style.boxShadow = '0 20px 45px rgba(0, 118, 255, 0.55)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1) translateY(0)'
            e.currentTarget.style.boxShadow = '0 16px 36px rgba(0, 118, 255, 0.45), 0 4px 12px rgba(0,0,0,0.15)'
          }}
        >
          {chatOpen ? (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          ) : (
            <div style={{ position: 'relative', width: '100%', height: '100%', borderRadius: '50%', overflow: 'hidden' }}>
              <Image
                src="/images/specialist-avatar.jpg"
                alt="Technical Sales Specialist"
                fill
                style={{ objectFit: 'cover' }}
              />
            </div>
          )}

          {/* Active online dot */}
          <span
            style={{
              position: 'absolute',
              top: '2px',
              right: '2px',
              width: '12px',
              height: '12px',
              borderRadius: '50%',
              background: '#22C55E',
              border: '2px solid #FFFFFF',
              boxShadow: '0 0 8px #22C55E',
            }}
          />
        </button>

        {/* Back to top Button */}
        <button
          onClick={scrollToTop}
          aria-label="Back to top"
          style={{
            width: '2.75rem',
            height: '2.75rem',
            borderRadius: '50%',
            background: '#FFFFFF',
            border: '1px solid #E2E8F0',
            color: '#0F172A',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 8px 20px rgba(0, 0, 0, 0.08)',
            cursor: 'pointer',
            transition: 'transform 0.25s cubic-bezier(0.16,1,0.3,1)',
          }}
          onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.12)' }}
          onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)' }}
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 19V5M5 12l7-7 7 7" />
          </svg>
        </button>
      </div>

      {/* Exact Reference Chatbot Window */}
      {chatOpen && (
        <div
          className="tidio-style-chat-window"
          data-lenis-prevent="true"
          data-lenis-prevent-wheel="true"
          data-lenis-prevent-touch="true"
          onWheel={(e) => e.stopPropagation()}
          onTouchMove={(e) => e.stopPropagation()}
          style={{
            position: 'fixed',
            bottom: 'clamp(4.5rem, 6vh, 5.25rem)',
            right: 'clamp(1rem, 2.5vw, 2.5rem)',
            width: 'clamp(335px, 92vw, 390px)',
            height: 'min(545px, calc(100vh - 6rem))',
            maxHeight: 'calc(100vh - 6rem)',
            zIndex: 9000,
            background: '#FFFFFF',
            borderRadius: '24px',
            boxShadow: '0 28px 75px rgba(15, 23, 42, 0.24), 0 10px 30px rgba(0, 118, 255, 0.15)',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            animation: 'chatSpringIn 0.32s cubic-bezier(0.16, 1, 0.3, 1)',
            border: '1px solid rgba(226, 232, 240, 0.85)',
            overscrollBehavior: 'contain',
          }}
        >
          {/* Top Blue Gradient Header with Organic Wave */}
          <div
            style={{
              background: 'linear-gradient(135deg, #0076FF 0%, #005CE6 60%, #004ecc 100%)',
              color: '#FFFFFF',
              position: 'relative',
              padding: '1.15rem 1.25rem 0',
              zIndex: 3,
            }}
          >
            {/* Top Row: Avatar + Name + Dropdown & Collapse */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                {/* Profile Photo */}
                <div
                  style={{
                    position: 'relative',
                    width: '2.65rem',
                    height: '2.65rem',
                    borderRadius: '50%',
                    border: '2px solid rgba(255, 255, 255, 0.95)',
                    overflow: 'hidden',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.18)',
                    flexShrink: 0,
                  }}
                >
                  <Image
                    src="/images/specialist-avatar.jpg"
                    alt="Gulf Fibre Specialist"
                    fill
                    style={{ objectFit: 'cover' }}
                  />
                  <span
                    style={{
                      position: 'absolute',
                      bottom: '0px',
                      right: '0px',
                      width: '9px',
                      height: '9px',
                      borderRadius: '50%',
                      background: '#22C55E',
                      border: '1.5px solid #FFFFFF',
                    }}
                  />
                </div>

                <div>
                  <span style={{ fontSize: '0.625rem', color: 'rgba(255, 255, 255, 0.85)', display: 'block', fontWeight: 500 }}>
                    Chat with
                  </span>
                  <h4 style={{ fontFamily: 'var(--font-sans)', fontSize: '0.9375rem', fontWeight: 800, margin: 0, letterSpacing: '-0.01em' }}>
                    Gulf Fibre Specialist
                  </h4>
                </div>
              </div>

              {/* Options Menu & Collapse Arrow */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', position: 'relative' }}>
                <button
                  onClick={() => setMenuOpen(!menuOpen)}
                  aria-label="Options"
                  style={{
                    background: 'transparent',
                    border: 'none',
                    color: '#FFFFFF',
                    cursor: 'pointer',
                    padding: '0.35rem',
                    opacity: 0.9,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
                    <circle cx="12" cy="5" r="2" />
                    <circle cx="12" cy="12" r="2" />
                    <circle cx="12" cy="19" r="2" />
                  </svg>
                </button>
                <button
                  onClick={() => setChatOpen(false)}
                  aria-label="Collapse"
                  style={{
                    background: 'transparent',
                    border: 'none',
                    color: '#FFFFFF',
                    cursor: 'pointer',
                    padding: '0.35rem',
                    opacity: 0.9,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </button>

                {/* Dropdown Menu */}
                {menuOpen && (
                  <div
                    style={{
                      position: 'absolute',
                      top: '100%',
                      right: '0',
                      background: '#FFFFFF',
                      color: '#0F172A',
                      borderRadius: '12px',
                      boxShadow: '0 10px 30px rgba(0, 0, 0, 0.18)',
                      padding: '0.5rem',
                      width: '160px',
                      zIndex: 10,
                      border: '1px solid #E2E8F0',
                    }}
                  >
                    <button
                      onClick={handleResetChat}
                      style={{
                        width: '100%',
                        padding: '0.5rem 0.75rem',
                        background: 'transparent',
                        border: 'none',
                        textAlign: 'left',
                        fontSize: '0.75rem',
                        fontWeight: 600,
                        color: '#0F172A',
                        cursor: 'pointer',
                        borderRadius: '6px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                      }}
                      onMouseEnter={(e) => { e.currentTarget.style.background = '#F1F5F9' }}
                      onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent' }}
                    >
                      <span>🔄</span> Reset Chat
                    </button>
                    <Link
                      href="/contact"
                      onClick={() => { setChatOpen(false); setMenuOpen(false) }}
                      style={{
                        width: '100%',
                        padding: '0.5rem 0.75rem',
                        background: 'transparent',
                        border: 'none',
                        textAlign: 'left',
                        fontSize: '0.75rem',
                        fontWeight: 600,
                        color: '#0076FF',
                        textDecoration: 'none',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        borderRadius: '6px',
                      }}
                      onMouseEnter={(e) => { e.currentTarget.style.background = '#F1F5F9' }}
                      onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent' }}
                    >
                      <span>✉️</span> Direct RFQ Form
                    </Link>
                  </div>
                )}
              </div>
            </div>

            {/* Custom Tagline / Status Label */}
            <p style={{ fontSize: '0.8125rem', color: 'rgba(255, 255, 255, 0.95)', margin: '0.75rem 0 1.25rem', fontWeight: 450 }}>
              We typically reply in few minutes.
            </p>

            {/* Smooth Organic Wave Divider (SVG curve) */}
            <div style={{ overflow: 'hidden', lineHeight: 0, margin: '0 -1.25rem' }}>
              <svg
                viewBox="0 0 500 40"
                preserveAspectRatio="none"
                style={{ width: '100%', height: '24px', display: 'block' }}
              >
                <path
                  d="M0,0 C150,35 350,-10 500,25 L500,40 L0,40 Z"
                  fill="#FFFFFF"
                />
              </svg>
            </div>
          </div>

          {/* Messages Scroll Canvas */}
          <div
            data-lenis-prevent="true"
            data-lenis-prevent-wheel="true"
            data-lenis-prevent-touch="true"
            onWheel={(e) => e.stopPropagation()}
            onTouchMove={(e) => e.stopPropagation()}
            style={{
              flex: 1,
              padding: '0.875rem 1.125rem',
              overflowY: 'auto',
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
              background: '#FFFFFF',
              overscrollBehavior: 'contain',
              touchAction: 'pan-y',
            }}
          >
            {messages.map((m) => (
              <div
                key={m.id}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: m.sender === 'user' ? 'flex-end' : 'flex-start',
                  gap: '0.45rem',
                }}
              >
                {/* User Message Bubble */}
                {m.sender === 'user' ? (
                  <div
                    style={{
                      maxWidth: '85%',
                      padding: '0.75rem 1.125rem',
                      borderRadius: '18px 18px 4px 18px',
                      background: 'linear-gradient(135deg, #0076FF 0%, #005CE6 100%)',
                      color: '#FFFFFF',
                      fontSize: '0.84375rem',
                      lineHeight: 1.5,
                      fontWeight: 500,
                      boxShadow: '0 4px 14px rgba(0, 118, 255, 0.28)',
                    }}
                  >
                    {m.text}
                  </div>
                ) : (
                  /* Bot Message Bubble + Rating Box */
                  <div style={{ maxWidth: '90%', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <div
                      style={{
                        padding: '0.8125rem 1.125rem',
                        borderRadius: '18px 18px 18px 4px',
                        background: '#F1F5F9',
                        color: '#1E293B',
                        fontSize: '0.84375rem',
                        lineHeight: 1.55,
                        fontWeight: 450,
                      }}
                    >
                      {m.text}

                      {/* Optional Action Link */}
                      {m.actionLink && (
                        <div style={{ marginTop: '0.5rem', paddingTop: '0.4rem', borderTop: '1px solid rgba(0,0,0,0.06)' }}>
                          <Link
                            href={m.actionLink.href}
                            onClick={() => setChatOpen(false)}
                            style={{
                              fontSize: '0.75rem',
                              fontWeight: 700,
                              color: '#0076FF',
                              textDecoration: 'none',
                            }}
                          >
                            {m.actionLink.text}
                          </Link>
                        </div>
                      )}
                    </div>

                    {/* Quick Response Buttons (Right-aligned under question, matching reference) */}
                    {m.quickOptions && m.quickOptions.length > 0 && (
                      <div
                        style={{
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'flex-end',
                          gap: '0.4rem',
                          marginTop: '0.25rem',
                        }}
                      >
                        {m.quickOptions.map((opt, optIdx) => (
                          <button
                            key={optIdx}
                            onClick={() => handleSend(opt.query)}
                            style={{
                              padding: '0.45rem 0.875rem',
                              borderRadius: '9999px',
                              background: '#FFFFFF',
                              border: '1.5px solid #0076FF',
                              color: '#0076FF',
                              fontSize: '0.75rem',
                              fontWeight: 700,
                              cursor: 'pointer',
                              textAlign: 'right',
                              boxShadow: '0 2px 6px rgba(0, 118, 255, 0.08)',
                              transition: 'all 0.2s ease',
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.background = '#0076FF'
                              e.currentTarget.style.color = '#FFFFFF'
                              e.currentTarget.style.transform = 'translateY(-1px)'
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.background = '#FFFFFF'
                              e.currentTarget.style.color = '#0076FF'
                              e.currentTarget.style.transform = 'translateY(0)'
                            }}
                          >
                            {opt.label}
                          </button>
                        ))}
                      </div>
                    )}

                    {/* Response Rating Bar (Was this helpful? 👍 👎) */}
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        fontSize: '0.6875rem',
                        color: '#64748B',
                        paddingLeft: '0.25rem',
                        marginTop: '0.125rem',
                      }}
                    >
                      <span>Was this helpful?</span>
                      <div
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '0.25rem',
                          background: '#F8FAFC',
                          border: '1px solid #E2E8F0',
                          borderRadius: '9999px',
                          padding: '0.15rem 0.4rem',
                        }}
                      >
                        <button
                          onClick={() => handleRating(m.id, 'up')}
                          aria-label="Thumbs Up"
                          style={{
                            background: m.rating === 'up' ? '#0076FF' : 'transparent',
                            color: m.rating === 'up' ? '#FFFFFF' : '#475569',
                            border: 'none',
                            borderRadius: '50%',
                            width: '1.25rem',
                            height: '1.25rem',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '0.625rem',
                            transition: 'all 0.15s',
                          }}
                        >
                          👍
                        </button>
                        <button
                          onClick={() => handleRating(m.id, 'down')}
                          aria-label="Thumbs Down"
                          style={{
                            background: m.rating === 'down' ? '#EF4444' : 'transparent',
                            color: m.rating === 'down' ? '#FFFFFF' : '#475569',
                            border: 'none',
                            borderRadius: '50%',
                            width: '1.25rem',
                            height: '1.25rem',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '0.625rem',
                            transition: 'all 0.15s',
                          }}
                        >
                          👎
                        </button>
                      </div>
                      {m.rating && (
                        <span style={{ color: '#0076FF', fontWeight: 600, fontSize: '0.625rem' }}>
                          Thanks!
                        </span>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}

            {/* Animated Typing Indicator */}
            {isTyping && (
              <div
                style={{
                  alignSelf: 'flex-start',
                  padding: '0.625rem 0.875rem',
                  borderRadius: '18px 18px 18px 4px',
                  background: '#F1F5F9',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                }}
              >
                <span className="dot-pulse" style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#0076FF' }} />
                <span className="dot-pulse" style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#0076FF', animationDelay: '0.2s' }} />
                <span className="dot-pulse" style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#0076FF', animationDelay: '0.4s' }} />
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Bottom Message Input Console (With attachment, emoji, and send icons) */}
          <form
            onSubmit={(e) => {
              e.preventDefault()
              handleSend()
            }}
            style={{
              padding: '0.75rem 1rem',
              borderTop: '1px solid #E2E8F0',
              background: '#FFFFFF',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.5rem',
              position: 'relative',
            }}
          >
            {/* Input Line */}
            <input
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              placeholder="Enter your message..."
              style={{
                width: '100%',
                padding: '0.35rem 0',
                border: 'none',
                background: 'transparent',
                fontSize: '0.84375rem',
                color: '#0F172A',
                outline: 'none',
              }}
            />

            {/* Bottom Actions Row: Bot trigger, Attachments, Emojis, Powered By & Send Button */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '0.25rem' }}>
              {/* Left Action Icons */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: '#64748B' }}>
                {/* Triggering other bots icon */}
                <button
                  type="button"
                  title="Fibre AI Assistant active"
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#0076FF',
                    cursor: 'pointer',
                    padding: 0,
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2 2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z" />
                    <rect x="4" y="8" width="16" height="12" rx="4" />
                    <path d="M9 13v2M15 13v2M9 17h6" />
                  </svg>
                </button>

                {/* Attachments icon */}
                <button
                  type="button"
                  title="Attach Spec File"
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#64748B',
                    cursor: 'pointer',
                    padding: 0,
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48" />
                  </svg>
                </button>

                {/* Emojis icon */}
                <button
                  type="button"
                  title="Insert emoji"
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#64748B',
                    cursor: 'pointer',
                    padding: 0,
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M8 14s1.5 2 4 2 4-2 4-2M9 9h.01M15 9h.01" />
                  </svg>
                </button>

                {/* Powered By Badge */}
                <span style={{ fontSize: '0.5625rem', fontWeight: 700, color: '#94A3B8', letterSpacing: '0.04em', textTransform: 'uppercase', marginLeft: '0.25rem' }}>
                  POWERED BY <strong style={{ color: '#0076FF' }}>GULF FIBRE</strong>
                </span>
              </div>

              {/* Large Elevated Circular Send Button */}
              <button
                type="submit"
                aria-label="Send message"
                disabled={!inputVal.trim()}
                style={{
                  width: '2.75rem',
                  height: '2.75rem',
                  borderRadius: '50%',
                  background: inputVal.trim()
                    ? 'linear-gradient(135deg, #0076FF 0%, #005CE6 100%)'
                    : '#0076FF',
                  border: 'none',
                  color: '#FFFFFF',
                  cursor: inputVal.trim() ? 'pointer' : 'default',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 6px 18px rgba(0, 118, 255, 0.4)',
                  transition: 'all 0.2s ease',
                  flexShrink: 0,
                }}
                onMouseEnter={(e) => {
                  if (inputVal.trim()) {
                    e.currentTarget.style.transform = 'scale(1.08)'
                  }
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)'
                }}
              >
                {/* Paper plane icon (➤) */}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
                </svg>
              </button>
            </div>
          </form>
        </div>
      )}

      <style>{`
        @keyframes chatSpringIn {
          from { opacity: 0; transform: translateY(18px) scale(0.95); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        .dot-pulse {
          animation: dotBounce 1.2s infinite ease-in-out;
        }
        @keyframes dotBounce {
          0%, 80%, 100% { transform: scale(0.6); opacity: 0.4; }
          40% { transform: scale(1.1); opacity: 1; }
        }
      `}</style>
    </>
  )
}
