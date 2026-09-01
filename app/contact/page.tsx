'use client'

import { useRef, useState, useId } from 'react'
import { PageShell } from '@/components/subpages/PageShell'
import { SectionHead, SectionLabel, SpecRows } from '@/components/subpages/Primitives'
import { PersonCard } from '@/components/subpages/PeopleChapter'
import { useSectionReveal } from '@/components/subpages/useSectionReveal'
import { MANAGEMENT, PRODUCT_LINES, VERIFIED } from '@/lib/data/company'

type Fields = {
  company: string
  person: string
  email: string
  phone: string
  country: string
  line: string
  denier: string
  volume: string
  message: string
}

const EMPTY: Fields = {
  company: '',
  person: '',
  email: '',
  phone: '',
  country: '',
  line: PRODUCT_LINES[0].code,
  denier: '',
  volume: '',
  message: '',
}

/** Inquiry paths. Each one adapts the message prompt to what the desk needs. */
const INTENTS = [
  { id: 'quotation', label: 'Quotation', prompt: 'Denier, cut length, volume and destination - enough for a firm answer.' },
  { id: 'sample', label: 'Sample request', prompt: 'What should we sample, which grade, and where should it go?' },
  { id: 'technical', label: 'Technical question', prompt: 'The parameter or behaviour in question - we answer against the record.' },
  { id: 'product', label: 'Product enquiry', prompt: 'The line and application you are looking at.' },
  { id: 'general', label: 'General', prompt: 'Anything else - one line is enough to start.' },
] as const

type IntentId = (typeof INTENTS)[number]['id']

interface PhoneCountry {
  name: string
  code: string
  dialCode: string
  flag: string
  digits: number
  formatHint: string
}

const PHONE_COUNTRIES: PhoneCountry[] = [
  { name: 'Pakistan', code: 'PK', dialCode: '+92', flag: '🇵🇰', digits: 10, formatHint: '300 1234567' },
  { name: 'United Arab Emirates', code: 'AE', dialCode: '+971', flag: '🇦🇪', digits: 9, formatHint: '50 123 4567' },
  { name: 'Saudi Arabia', code: 'SA', dialCode: '+966', flag: '🇸🇦', digits: 9, formatHint: '50 123 4567' },
  { name: 'United States', code: 'US', dialCode: '+1', flag: '🇺🇸', digits: 10, formatHint: '202 555 0123' },
  { name: 'United Kingdom', code: 'GB', dialCode: '+44', flag: '🇬🇧', digits: 10, formatHint: '7911 123456' },
  { name: 'China', code: 'CN', dialCode: '+86', flag: '🇨🇳', digits: 11, formatHint: '138 0013 8000' },
  { name: 'Germany', code: 'DE', dialCode: '+49', flag: '🇩🇪', digits: 10, formatHint: '151 12345678' },
  { name: 'Turkey', code: 'TR', dialCode: '+90', flag: '🇹🇷', digits: 10, formatHint: '532 123 4567' },
  { name: 'India', code: 'IN', dialCode: '+91', flag: '🇮🇳', digits: 10, formatHint: '98765 43210' },
  { name: 'Bangladesh', code: 'BD', dialCode: '+880', flag: '🇧🇩', digits: 10, formatHint: '1712 345678' },
  { name: 'Vietnam', code: 'VN', dialCode: '+84', flag: '🇻🇳', digits: 9, formatHint: '91 234 5678' },
  { name: 'Egypt', code: 'EG', dialCode: '+20', flag: '🇪🇬', digits: 10, formatHint: '10 1234 5678' },
  { name: 'Italy', code: 'IT', dialCode: '+39', flag: '🇮🇹', digits: 10, formatHint: '320 123 4567' },
  { name: 'Spain', code: 'ES', dialCode: '+34', flag: '🇪🇸', digits: 9, formatHint: '612 345 678' },
  { name: 'Canada', code: 'CA', dialCode: '+1', flag: '🇨🇦', digits: 10, formatHint: '416 555 0123' },
  { name: 'Australia', code: 'AU', dialCode: '+61', flag: '🇦🇺', digits: 9, formatHint: '412 345 678' },
  { name: 'Other Countries', code: 'OTHER', dialCode: '+', flag: '🌐', digits: 15, formatHint: 'International number' },
]

export default function ContactPage() {
  const scope = useRef<HTMLDivElement>(null)
  useSectionReveal(scope)

  const [v, setV] = useState<Fields>(EMPTY)
  const [phoneCountry, setPhoneCountry] = useState<PhoneCountry>(PHONE_COUNTRIES[0]) // Default Pakistan
  const [phoneRawNumber, setPhoneRawNumber] = useState<string>('')
  const [errors, setErrors] = useState<Partial<Record<keyof Fields, string>>>({})
  const [status, setStatus] = useState<'idle' | 'sending' | 'ok' | 'error'>('idle')
  const [intent, setIntent] = useState<IntentId>('quotation')

  const intentMeta = INTENTS.find((i) => i.id === intent) ?? INTENTS[0]

  const set = (k: keyof Fields) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setV((prev) => ({ ...prev, [k]: e.target.value }))
    setErrors((prev) => ({ ...prev, [k]: undefined }))
  }

  const handlePhoneCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = PHONE_COUNTRIES.find((c) => c.code === e.target.value) ?? PHONE_COUNTRIES[0]
    setPhoneCountry(selected)
    
    // Truncate raw number if it exceeds new country's limit
    const cleaned = phoneRawNumber.replace(/\D/g, '').slice(0, selected.digits)
    setPhoneRawNumber(cleaned)
    setV((prev) => ({ ...prev, phone: cleaned ? `${selected.dialCode} ${cleaned}` : '' }))
    setErrors((prev) => ({ ...prev, phone: undefined }))
  }

  const handlePhoneInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let raw = e.target.value.replace(/\D/g, '') // Only digits
    // If user starts with 0 for domestic format (e.g. 0300...), strip the leading 0 if in non-US international mode
    if (phoneCountry.code !== 'OTHER' && raw.startsWith('0') && raw.length > phoneCountry.digits) {
      raw = raw.substring(1)
    }
    const limited = raw.slice(0, phoneCountry.digits)
    setPhoneRawNumber(limited)
    setV((prev) => ({ ...prev, phone: limited ? `${phoneCountry.dialCode} ${limited}` : '' }))
    setErrors((prev) => ({ ...prev, phone: undefined }))
  }

  const validate = () => {
    const next: Partial<Record<keyof Fields, string>> = {}
    if (!v.company.trim()) next.company = 'Company name is required so we can address the quotation.'
    if (!v.person.trim()) next.person = 'A contact name is required.'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.email.trim())) next.email = 'Enter an email address we can reply to.'
    if (!v.country.trim()) next.country = 'Destination country is required for packing and documentation.'
    if (!v.message.trim()) next.message = 'Tell us what you need - even one line is enough to start.'
    
    // Phone validation if provided
    if (phoneRawNumber.trim().length > 0) {
      if (phoneCountry.code !== 'OTHER' && phoneRawNumber.length < phoneCountry.digits) {
        next.phone = `${phoneCountry.name} phone numbers require ${phoneCountry.digits} digits (e.g. ${phoneCountry.formatHint}). Currently: ${phoneRawNumber.length}/${phoneCountry.digits}.`
      } else if (phoneCountry.code === 'OTHER' && phoneRawNumber.length < 7) {
        next.phone = 'Please enter a valid international phone number (minimum 7 digits).'
      }
    }

    setErrors(next)
    return Object.keys(next).length === 0
  }

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (status === 'sending') return
    if (!validate()) {
      setStatus('idle')
      return
    }
    setStatus('sending')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...v, intent }),
      })
      if (!res.ok) throw new Error('request failed')
      setStatus('ok')
      setV(EMPTY)
      setPhoneRawNumber('')
    } catch {
      setStatus('error')
    }
  }

  const field = (
    k: keyof Fields,
    label: string,
    opts: { type?: string; full?: boolean; required?: boolean; placeholder?: string } = {}
  ) => (
    <div className={`sp-field ${opts.full ? 'sp-full' : ''}`.trim()}>
      <label className="sp-field-label" htmlFor={`f-${k}`}>
        {label}
        {opts.required ? ' *' : ''}
      </label>
      <input
        id={`f-${k}`}
        className="sp-input"
        type={opts.type ?? 'text'}
        value={v[k]}
        onChange={set(k)}
        placeholder={opts.placeholder}
        required={opts.required}
        aria-invalid={errors[k] ? 'true' : undefined}
        aria-describedby={errors[k] ? `e-${k}` : undefined}
      />
      {errors[k] && (
        <p className="sp-field-error" id={`e-${k}`}>
          {errors[k]}
        </p>
      )}
    </div>
  )

  return (
    <PageShell>
      <div ref={scope}>
        {/* ── Enquiry form (Top Section) ─────────────────────────────── */}
        <section
          className="section-pad"
          data-sp-section
          style={{
            background: 'var(--white)',
            paddingTop: 'clamp(6.5rem, 13vh, 9rem)',
          }}
        >
          <div className="container">
            {/* Enhanced Heading with Responsive Centered Alignment for Tablet/Mobile */}
            <div className="sp-anim sp-contact-header">
              <div style={{ marginBottom: '1rem' }}>
                <SectionLabel>Contact & Enquiries</SectionLabel>
              </div>
              <h2 className="sp-contact-title">
                SEND THE SPECIFICATION,
                <br />
                <em>we will answer it</em>
              </h2>
              <p className="sp-contact-lede">
                Denier, cut length, volume and destination are enough for a firm answer on feasibility. Sample requests are handled through the same route.
              </p>
            </div>

            <div className="sp-contact-layout">
              <div className="sp-anim">
                <form onSubmit={onSubmit} noValidate>
                  {/* Inquiry path - adapts the message prompt to the desk it routes to */}
                  <fieldset style={{ border: 'none', margin: '0 0 1.75rem', padding: 0 }}>
                    <legend className="sp-field-label" style={{ marginBottom: '0.75rem', textAlign: 'center', width: '100%' }}>
                      What is this about?
                    </legend>
                    <div role="radiogroup" aria-label="Inquiry type" style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', justifyContent: 'center' }}>
                      {INTENTS.map((i) => (
                        <button
                          key={i.id}
                          type="button"
                          role="radio"
                          aria-checked={intent === i.id}
                          data-on={intent === i.id ? 'true' : undefined}
                          onClick={() => setIntent(i.id)}
                          style={{
                            padding: '0.4rem clamp(0.65rem, 2vw, 1rem)',
                            cursor: 'pointer',
                            fontSize: 'clamp(0.6875rem, 1.8vw, 0.75rem)',
                            fontFamily: 'var(--font-sans)',
                            fontWeight: 800,
                            letterSpacing: '0.05em',
                            textTransform: 'uppercase',
                            borderRadius: '999px',
                            border: intent === i.id ? '1px solid var(--burg-primary)' : '1px solid var(--border-light)',
                            background: intent === i.id ? 'var(--burg-primary)' : 'var(--white)',
                            color: intent === i.id ? '#FFFFFF' : 'var(--ink)',
                            boxShadow: intent === i.id ? '0 4px 14px rgba(10, 75, 184, 0.25)' : 'none',
                            transition: 'all 0.25s ease',
                          }}
                        >
                          {i.label}
                        </button>
                      ))}
                    </div>
                  </fieldset>

                  <div className="sp-form-grid">
                    {field('company', 'Company', { required: true })}
                    {field('person', 'Contact name', { required: true })}
                    {field('email', 'Email', { type: 'email', required: true })}

                    {/* ── International Phone Input with Country Selector & Digit Handling ── */}
                    <div className="sp-field">
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                        <label className="sp-field-label" htmlFor="f-phone-input">
                          Phone (optional)
                        </label>
                        {phoneRawNumber.length > 0 && phoneCountry.code !== 'OTHER' && (
                          <span
                            style={{
                              fontSize: '0.6875rem',
                              fontWeight: 700,
                              color: phoneRawNumber.length === phoneCountry.digits ? 'var(--accent-green, #12B76A)' : 'var(--muted)',
                            }}
                          >
                            {phoneRawNumber.length} / {phoneCountry.digits} digits
                          </span>
                        )}
                      </div>
                      
                      <div
                        className="sp-phone-group"
                        style={{
                          display: 'grid',
                          gridTemplateColumns: 'minmax(115px, 145px) 1fr',
                          gap: '0.5rem',
                          alignItems: 'stretch',
                        }}
                      >
                        <select
                          id="f-phone-country"
                          aria-label="Select phone country code"
                          className="sp-select"
                          value={phoneCountry.code}
                          onChange={handlePhoneCountryChange}
                          style={{
                            paddingLeft: '0.65rem',
                            paddingRight: '1.75rem',
                            fontSize: '0.8125rem',
                            fontWeight: 700,
                            cursor: 'pointer',
                          }}
                        >
                          {PHONE_COUNTRIES.map((c) => (
                            <option key={c.code} value={c.code}>
                              {c.flag} {c.code} ({c.dialCode})
                            </option>
                          ))}
                        </select>

                        <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                          <span
                            style={{
                              position: 'absolute',
                              left: '0.85rem',
                              fontFamily: 'var(--font-sans)',
                              fontSize: '0.875rem',
                              fontWeight: 700,
                              color: 'var(--burg-primary)',
                              pointerEvents: 'none',
                            }}
                          >
                            {phoneCountry.dialCode}
                          </span>
                          <input
                            id="f-phone-input"
                            className="sp-input"
                            type="tel"
                            inputMode="numeric"
                            value={phoneRawNumber}
                            onChange={handlePhoneInputChange}
                            placeholder={phoneCountry.formatHint}
                            maxLength={phoneCountry.digits}
                            style={{
                              paddingLeft: `calc(${phoneCountry.dialCode.length}ch + 1.65rem)`,
                            }}
                            aria-invalid={errors.phone ? 'true' : undefined}
                            aria-describedby={errors.phone ? 'e-phone' : undefined}
                          />
                        </div>
                      </div>

                      {errors.phone && (
                        <p className="sp-field-error" id="e-phone">
                          {errors.phone}
                        </p>
                      )}
                    </div>

                    {field('country', 'Destination country', { required: true })}

                    <div className="sp-field">
                      <label className="sp-field-label" htmlFor="f-line">
                        Product line
                      </label>
                      <select id="f-line" className="sp-select" value={v.line} onChange={set('line')}>
                        {PRODUCT_LINES.map((p) => (
                          <option key={p.code} value={p.code}>
                            {p.code} - {p.title}
                          </option>
                        ))}
                      </select>
                    </div>

                    {field('denier', 'Denier / cut length', { placeholder: VERIFIED.denierRange })}
                    {field('volume', 'Volume', { full: true, placeholder: 'e.g. monthly or annual tonnage' })}

                    <div className="sp-field sp-full">
                      <label className="sp-field-label" htmlFor="f-message">
                        {intentMeta.label} *
                      </label>
                      <textarea
                        id="f-message"
                        className="sp-textarea"
                        value={v.message}
                        onChange={set('message')}
                        placeholder={intentMeta.prompt}
                        required
                        aria-invalid={errors.message ? 'true' : undefined}
                        aria-describedby={errors.message ? 'e-message' : undefined}
                      />
                      {errors.message && (
                        <p className="sp-field-error" id="e-message">
                          {errors.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div style={{ marginTop: '2rem' }}>
                    <button type="submit" className="btn-primary contact-submit-btn" disabled={status === 'sending'}>
                      {status === 'sending' ? 'Submitting…' : 'Submit enquiry'}
                    </button>
                  </div>

                  <div aria-live="polite">
                    {status === 'ok' && (
                      <div className="sp-form-note" style={{ marginTop: '1.5rem', background: 'rgba(10, 75, 184, 0.05)', border: '1px solid rgba(10, 75, 184, 0.25)', borderRadius: '8px', padding: '1.25rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem' }}>
                          <span style={{ display: 'inline-flex', width: '1.25rem', height: '1.25rem', borderRadius: '50%', background: 'var(--accent-green, #12B76A)', color: '#fff', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', fontWeight: 900 }}>✓</span>
                          <p className="sp-slot-title" style={{ margin: 0, color: 'var(--burg-primary)' }}>
                            Enquiry Sent
                          </p>
                        </div>
                        <p className="sp-small" style={{ margin: 0 }}>Thank you - your enquiry has reached our production engineering desk. We reply within 24 business hours. A confirmation with a copy of your enquiry is on its way to your inbox.</p>
                      </div>
                    )}
                    {status === 'error' && (
                      <div className="sp-form-note" style={{ marginTop: '1.5rem', background: 'rgba(180, 35, 24, 0.05)', border: '1px solid rgba(180, 35, 24, 0.25)', borderRadius: '8px', padding: '1.25rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem' }}>
                          <span style={{ display: 'inline-flex', width: '1.25rem', height: '1.25rem', borderRadius: '50%', background: '#B42318', color: '#fff', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', fontWeight: 900 }}>!</span>
                          <p className="sp-slot-title" style={{ margin: 0, color: '#B42318' }}>
                            Could Not Send
                          </p>
                        </div>
                        <p className="sp-small" style={{ margin: 0 }}>Something went wrong sending your enquiry. Please try again in a moment.</p>
                      </div>
                    )}
                  </div>
                </form>
              </div>

              {/* Right-Hand Information Column */}
              <div className="sp-anim" style={{ display: 'grid', gap: '1.5rem', alignContent: 'start' }}>
                {/* Response Commitment Card */}
                <div
                  style={{
                    background: 'var(--bg-subtle, #F8FAFC)',
                    border: '1px solid rgba(10, 75, 184, 0.15)',
                    borderRadius: '16px',
                    padding: '1.25rem 1.4rem',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem' }}>
                    <span style={{ fontSize: '0.9rem' }}>⚡</span>
                    <h4 style={{ margin: 0, fontSize: '0.875rem', fontWeight: 800, color: 'var(--burg-primary, #0A4BB8)', letterSpacing: '0.04em', textTransform: 'uppercase' }}>
                      24-Hour Feasibility Review
                    </h4>
                  </div>
                  <p style={{ margin: 0, fontSize: '0.75rem', color: '#475569', lineHeight: 1.5 }}>
                    Every technical inquiry, denier requirement, and sample request is evaluated directly by our production engineering desk within 24 business hours.
                  </p>
                </div>

                {/* Steps Box / What Happens Next */}
                <div className="sp-panel" style={{ borderRadius: '16px' }}>
                  <p className="sp-cat">What happens next</p>
                  <SpecRows
                    rows={[
                      { key: 'Step 01', value: 'We read the specification and confirm whether we can hold it.' },
                      { key: 'Step 02', value: <>Sampling and pricing against your count within <strong>{VERIFIED.denierRange}</strong>.</> },
                      { key: 'Step 03', value: <>Packing agreed - standard <strong>{VERIFIED.baleWeight}</strong> moisture-sealed bales or roll wrapping.</> },
                      { key: 'Step 04', value: 'Export documentation prepared in-house before dispatch.' },
                    ]}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Google Maps & Plant Location Section ────────────────────────── */}
        <section
          className="section-pad"
          data-sp-section
          style={{
            background: 'var(--bg-subtle, #F8FAFC)',
            borderTop: '1px solid var(--border-light)',
          }}
        >
          <div className="container">
            <div className="sp-anim" style={{ marginBottom: 'clamp(2.5rem, 5vh, 3.5rem)' }}>
              <SectionHead
                eyebrow="Plant & Logistics Hub"
                title="Visit our facility,"
                em="Multan Road, Lahore"
                lede="Located directly on Pakistan’s prime industrial transit corridor (N-5 Highway) for seamless container dispatch to Karachi Port and rapid dry-port access."
              />
            </div>

            <div
              className="sp-anim"
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 340px), 1fr))',
                gap: 'clamp(1.5rem, 3vw, 2.5rem)',
                alignItems: 'stretch',
              }}
            >
              {/* Google Maps Interactive Frame */}
              <div
                style={{
                  position: 'relative',
                  minHeight: 'clamp(320px, 45vw, 420px)',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  border: '1px solid var(--border-light)',
                  boxShadow: '0 8px 30px rgba(0, 0, 0, 0.06)',
                  background: 'var(--white)',
                }}
              >
                <iframe
                  src="https://maps.google.com/maps?q=33-KM+Multan+Road,+Lahore,+Punjab,+Pakistan&t=&z=13&ie=UTF8&iwloc=&output=embed"
                  width="100%"
                  height="100%"
                  style={{
                    border: 0,
                    position: 'absolute',
                    inset: 0,
                    width: '100%',
                    height: '100%',
                  }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Gulf Fibre Company Facility Location"
                />
              </div>

              {/* Location Details & Directions Panel */}
              <div
                className="sp-panel"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  gap: '1.5rem',
                  borderRadius: '16px',
                  padding: 'clamp(1.5rem, 3vw, 2.25rem)',
                  background: 'var(--white)',
                }}
              >
                <div>
                  <span className="sp-cat" style={{ display: 'inline-block', marginBottom: '0.75rem' }}>
                    Industrial Site & Headquarters
                  </span>
                  <h3
                    style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: 'clamp(1.2rem, 2.5vw, 1.5rem)',
                      fontWeight: 800,
                      color: 'var(--ink)',
                      textTransform: 'uppercase',
                      letterSpacing: '-0.01em',
                      margin: '0 0 1rem',
                    }}
                  >
                    Gulf Fibre Company (PVT) Ltd.
                  </h3>

                  <div style={{ display: 'grid', gap: '1rem', marginTop: '1.25rem' }}>
                    <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                      <span style={{ fontSize: '1.1rem', flexShrink: 0 }}>📍</span>
                      <div>
                        <strong style={{ fontSize: '0.8125rem', color: 'var(--burg-primary)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                          Plant & Extrusion Lines
                        </strong>
                        <p style={{ margin: '0.2rem 0 0', fontSize: '0.875rem', color: 'var(--ink)', lineHeight: 1.5 }}>
                          33-KM Multan Road, Behind Daewoo Workshop, Lahore, Punjab, Pakistan
                        </p>
                      </div>
                    </div>

                    <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                      <span style={{ fontSize: '1.1rem', flexShrink: 0 }}>🏢</span>
                      <div>
                        <strong style={{ fontSize: '0.8125rem', color: 'var(--burg-primary)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                          Commercial & Export Desk
                        </strong>
                        <p style={{ margin: '0.2rem 0 0', fontSize: '0.875rem', color: 'var(--ink)', lineHeight: 1.5 }}>
                          Gulf Fibre Corporate Office, 33-KM Multan Road, Lahore 54000
                        </p>
                      </div>
                    </div>

                    <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                      <span style={{ fontSize: '1.1rem', flexShrink: 0 }}>⏱️</span>
                      <div>
                        <strong style={{ fontSize: '0.8125rem', color: 'var(--burg-primary)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                          Dispatch & Office Hours
                        </strong>
                        <p style={{ margin: '0.2rem 0 0', fontSize: '0.875rem', color: 'var(--muted)', lineHeight: 1.5 }}>
                          Plant: Continuous 24/7 Extrusion · Office: Mon – Sat 09:00 – 18:00 PKT
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div style={{ paddingTop: '1rem', borderTop: '1px solid var(--border-light)' }}>
                  <a
                    href="https://www.google.com/maps/search/?api=1&query=33-KM+Multan+Road+Lahore+Pakistan"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary"
                    style={{
                      width: '100%',
                      justifyContent: 'center',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.65rem',
                      padding: '0.75rem 1.5rem',
                    }}
                  >
                    <span>Get Directions on Google Maps</span>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Product Line Sales Leads ──────────────────────────────────── */}
        <section className="section-pad" data-sp-section style={{ background: 'var(--white)' }}>
          <div className="container">
            <div className="sp-anim">
              <SectionHead
                eyebrow="Direct Technical Sales"
                title="Product line"
                em="specialists"
                lede="Speak directly to the sales lead responsible for your specific material category."
              />
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
                gap: '1.5rem',
                alignItems: 'stretch',
              }}
            >
              {MANAGEMENT.map((m) => (
                <div className="sp-anim" key={m.id} style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                  <PersonCard person={m} />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Close ─────────────────────────────────────────────────────── */}
        <section className="section-pad sp-dark" data-sp-section>
          <div className="container" style={{ textAlign: 'center' }}>
            <div className="sp-anim" style={{ marginBottom: '1.25rem' }}>
              <h2 className="h-section" style={{ margin: '0 auto', maxWidth: '24ch' }}>
                One specification.
                <br />
                <em>One honest answer.</em>
              </h2>
            </div>
            <p className="sp-lede sp-anim" style={{ margin: '0 auto', maxWidth: '54ch' }}>
              If we are not the right plant for your count, we will say so rather than quote for the sake of it.
            </p>
          </div>
        </section>
      </div>

      <style>{`
        .sp-contact-header {
          margin-bottom: clamp(3rem, 6vh, 4.5rem);
        }
        .sp-contact-title {
          font-family: var(--font-sans);
          font-size: clamp(2.35rem, 5.5vw, 3.65rem);
          font-weight: 900;
          letter-spacing: -0.025em;
          text-transform: uppercase;
          line-height: 1.1;
          color: var(--ink);
          margin: 0 0 1.25rem;
        }
        .sp-contact-title em {
          font-family: var(--font-serif);
          font-style: italic;
          font-weight: 400;
          text-transform: none;
          color: var(--burg-primary);
        }
        .sp-contact-lede {
          font-size: 1.0625rem;
          line-height: 1.65;
          color: var(--muted);
          max-width: 54ch;
          margin: 0;
        }
        @media (max-width: 1024px) {
          .sp-contact-header {
            text-align: center;
            display: flex;
            flex-direction: column;
            align-items: center;
          }
          .sp-contact-lede {
            text-align: center;
          }
        }
        @media (max-width: 480px) {
          .sp-phone-group {
            grid-template-columns: 1fr !important;
          }
          .contact-submit-btn {
            width: 100% !important;
            justify-content: center !important;
          }
        }
      `}</style>
    </PageShell>
  )
}
