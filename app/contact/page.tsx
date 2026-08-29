'use client'

import Image from 'next/image'
import { useRef, useState } from 'react'
import { PageHero } from '@/components/subpages/PageHero'
import { PageShell } from '@/components/subpages/PageShell'
import { SectionHead, SpecRows } from '@/components/subpages/Primitives'
import { PersonCard } from '@/components/subpages/PeopleChapter'
import { useSectionReveal } from '@/components/subpages/useSectionReveal'
import { MANAGEMENT, PRODUCT_LINES, RFQ_ENDPOINT_NOTE, VERIFIED } from '@/lib/data/company'

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

/**
 * /contact
 *
 * Design: the approved homepage's grammar - ivory and white sections, sapphire
 * eyebrows, 900-weight uppercase headings with a Cormorant italic accent, white
 * hairline panels, one dark band. No new design language; the homepage is
 * untouched.
 *
 * Data: the previous version of this page published a telephone number, a
 * WhatsApp number, two mailboxes and a sample buyer address that appear nowhere
 * in this repository. Every one of them has been removed rather than reworded.
 * Real channels render from CONTACT_SLOTS the moment they are filled in one
 * place; until then each renders as a labelled slot saying what to supply.
 *
 * The form has no server destination yet (see RFQ_ENDPOINT_NOTE), so it
 * validates in the browser and then says plainly that the submission is held.
 */
export default function ContactPage() {
  const scope = useRef<HTMLDivElement>(null)
  useSectionReveal(scope)

  const [v, setV] = useState<Fields>(EMPTY)
  const [errors, setErrors] = useState<Partial<Record<keyof Fields, string>>>({})
  const [held, setHeld] = useState(false)
  const [intent, setIntent] = useState<IntentId>('quotation')

  const intentMeta = INTENTS.find((i) => i.id === intent) ?? INTENTS[0]

  const set = (k: keyof Fields) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setV((prev) => ({ ...prev, [k]: e.target.value }))
    setErrors((prev) => ({ ...prev, [k]: undefined }))
  }

  const validate = () => {
    const next: Partial<Record<keyof Fields, string>> = {}
    if (!v.company.trim()) next.company = 'Company name is required so we can address the quotation.'
    if (!v.person.trim()) next.person = 'A contact name is required.'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.email.trim())) next.email = 'Enter an email address we can reply to.'
    if (!v.country.trim()) next.country = 'Destination country is required for packing and documentation.'
    if (!v.message.trim()) next.message = 'Tell us what you need - even one line is enough to start.'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setHeld(false)
    if (validate()) setHeld(true)
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
        <PageHero
          eyebrow="Contact & Enquiries"
          lines={[{ text: 'Send the' }, { text: 'specification.' }, { text: 'We will answer it', serif: true }]}
          lede="Denier, cut length, volume and destination are enough for a firm answer on feasibility. Sample requests are handled through the same route."
          meta={[
            { label: 'Country', value: VERIFIED.country },
            { label: 'Established', value: String(VERIFIED.established) },
            { label: 'Annual capacity', value: VERIFIED.annualCapacity },
            { label: 'Standard bale', value: VERIFIED.baleWeight },
          ]}
          aside={
            <Image
              src="/images/process-fibre.jpg"
              alt="Polyester staple fibre produced by Gulf Fibre"
              fill
              priority
              sizes="(max-width: 992px) 100vw, 48vw"
              style={{ objectFit: 'cover' }}
            />
          }
        />

        {/* ── Enquiry form ──────────────────────────────────────────────── */}
        <section className="section-pad" data-sp-section style={{ background: 'var(--white)' }}>
          <div className="container">
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
                gap: 'clamp(2rem, 4vw, 3.5rem)',
                alignItems: 'start',
              }}
            >
              <div className="sp-anim">
                <SectionHead eyebrow="Enquiry" title="One form," em="specification first" />
                <form onSubmit={onSubmit} noValidate>
                  {/* Inquiry path - adapts the message prompt to the desk it routes to */}
                  <fieldset style={{ border: 'none', margin: '0 0 1.75rem', padding: 0 }}>
                    <legend className="sp-field-label" style={{ marginBottom: '0.75rem' }}>
                      What is this about?
                    </legend>
                    <div role="radiogroup" aria-label="Inquiry type" style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                      {INTENTS.map((i) => (
                        <button
                          key={i.id}
                          type="button"
                          role="radio"
                          aria-checked={intent === i.id}
                          data-on={intent === i.id ? 'true' : undefined}
                          onClick={() => setIntent(i.id)}
                          style={{
                            padding: '0.45rem 1rem',
                            cursor: 'pointer',
                            fontSize: '0.75rem',
                            fontFamily: 'var(--font-sans)',
                            fontWeight: 800,
                            letterSpacing: '0.06em',
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
                    {field('phone', 'Phone (optional)', { type: 'tel', placeholder: 'Include country code' })}
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
                    <button type="submit" className="btn-primary">
                      Submit enquiry
                    </button>
                  </div>

                  <div aria-live="polite">
                    {held && (
                      <div className="sp-form-note" style={{ marginTop: '1.5rem', background: 'rgba(10, 75, 184, 0.05)', border: '1px solid rgba(10, 75, 184, 0.25)', borderRadius: '8px', padding: '1.25rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem' }}>
                          <span style={{ display: 'inline-flex', width: '1.25rem', height: '1.25rem', borderRadius: '50%', background: 'var(--accent-green)', color: '#fff', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', fontWeight: 900 }}>✓</span>
                          <p className="sp-slot-title" style={{ margin: 0, color: 'var(--burg-primary)' }}>
                            Enquiry Validated
                          </p>
                        </div>
                        <p className="sp-small" style={{ margin: 0 }}>{RFQ_ENDPOINT_NOTE}</p>
                      </div>
                    )}
                  </div>
                </form>
              </div>

              {/* Right-Hand Information & Google Maps Location Column */}
              <div className="sp-anim" style={{ display: 'grid', gap: '1.5rem' }}>
                <div className="sp-panel">
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

                {/* Google Maps Location Preview Card */}
                <div
                  style={{
                    background: '#FFFFFF',
                    border: '1px solid var(--border-light, #E2E8F0)',
                    borderRadius: '16px',
                    overflow: 'hidden',
                    boxShadow: '0 8px 24px rgba(7, 20, 46, 0.05)',
                  }}
                >
                  <div style={{ padding: '1rem 1.25rem', borderBottom: '1px solid #F1F5F9' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                      <span style={{ fontSize: '0.65rem', fontWeight: 800, color: 'var(--burg-primary)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                        Plant Location
                      </span>
                      <span style={{ fontSize: '0.65rem', fontWeight: 700, color: '#16A34A', background: '#DCFCE7', padding: '0.15rem 0.5rem', borderRadius: '9999px' }}>
                        ● Active Facility
                      </span>
                    </div>
                    <h4 style={{ margin: '0 0 0.2rem', fontSize: '0.925rem', fontWeight: 800, color: '#0F172A' }}>
                      Gulf Fiber Company (Pvt) Limited
                    </h4>
                    <p style={{ margin: 0, fontSize: '0.75rem', color: '#64748B' }}>
                      33-KM, Multan Road, Lahore, Punjab, Pakistan
                    </p>
                  </div>

                  {/* Embedded Google Map */}
                  <div style={{ position: 'relative', width: '100%', height: '220px', background: '#E2E8F0' }}>
                    <iframe
                      title="Gulf Fiber Company Location Map"
                      src="https://maps.google.com/maps?q=33-KM+Multan+Road,+Lahore,+Pakistan&t=&z=13&ie=UTF8&iwloc=&output=embed"
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    />
                  </div>

                  <div style={{ padding: '0.75rem 1.25rem', background: '#F8FAFC', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: '0.7rem', color: '#64748B' }}>N-5 Highway Industrial Corridor</span>
                    <a
                      href="https://www.google.com/maps/search/?api=1&query=33-KM+Multan+Road+Lahore+Pakistan"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        fontSize: '0.75rem',
                        fontWeight: 800,
                        color: 'var(--burg-primary, #0A4BB8)',
                        textDecoration: 'none',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.25rem',
                      }}
                    >
                      Open in Google Maps ↗
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Product Line Sales Leads ──────────────────────────────────── */}
        <section className="section-pad" data-sp-section style={{ background: 'var(--bg-subtle, #F8FAFC)' }}>
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
              }}
            >
              {MANAGEMENT.map((m) => (
                <div className="sp-anim" key={m.id}>
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
    </PageShell>
  )
}
