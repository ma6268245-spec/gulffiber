'use client'

import Image from 'next/image'
import { useRef, useState } from 'react'
import { PageHero } from '@/components/subpages/PageHero'
import { PageShell } from '@/components/subpages/PageShell'
import { ScrollProductScene } from '@/components/subpages/ScrollProductScene'
import { DataSlot, SectionHead, SpecRows } from '@/components/subpages/Primitives'
import { PersonCard } from '@/components/subpages/PeopleChapter'
import { useSectionReveal } from '@/components/subpages/useSectionReveal'
import { CONTACT_SLOTS, MANAGEMENT, PRODUCT_LINES, RFQ_ENDPOINT_NOTE, VERIFIED } from '@/lib/data/company'

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
            <div className="sp-split" style={{ alignItems: 'start' }}>
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
                <DataSlot
                  title="Response time commitment"
                  note="No response-time undertaking is recorded in this repository, so none is promised here. Confirm one and it belongs in this panel."
                  minHeight="8rem"
                />
              </div>
            </div>
          </div>
        </section>

        {/* ── The material, while you write ─────────────────────────────── */}
        <section className="section-pad" data-sp-section>
          <div className="container">
            <div className="sp-anim">
              <SectionHead
                eyebrow="The Material"
                title="What your enquiry"
                em="is about"
                lede="The same fibre the enquiry desk will answer on - scroll to open the bale while you decide what to write."
              />
            </div>
            <div className="sp-anim">
              <ScrollProductScene
                variant="bundle"
                photo="/images/process-fibre.jpg"
                photoAlt="Polyester staple fibre produced by Gulf Fibre"
                caption="Scroll to open a baled fibre bundle - indicative visualisation of the material every enquiry is answered against."
              />
            </div>
          </div>
        </section>

        {/* ── Channels ──────────────────────────────────────────────────── */}
        <section className="section-pad" data-sp-section>
          <div className="container">
            <div className="sp-anim">
              <SectionHead
                eyebrow="Direct Channels"
                title="Addresses and numbers"
                em="we will not invent"
                lede={`This repository verifies the country - ${VERIFIED.country} - and nothing more granular. Rather than publish a plausible address or number, each channel below states exactly what needs to be supplied.`}
              />
            </div>

            <div className="sp-grid-3">
              {CONTACT_SLOTS.map((c) => (
                <div className="sp-anim" key={c.id}>
                  {c.value ? (
                    <div className="sp-panel">
                      <p className="sp-cat">{c.label}</p>
                      <p className="sp-card-title" style={{ margin: 0 }}>
                        {c.value}
                      </p>
                    </div>
                  ) : (
                    <DataSlot title={c.label} note={c.note} status={c.status} minHeight="10rem" />
                  )}
                </div>
              ))}
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
