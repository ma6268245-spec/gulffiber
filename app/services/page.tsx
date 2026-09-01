'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useRef } from 'react'
import { PageHero } from '@/components/subpages/PageHero'
import { PageShell } from '@/components/subpages/PageShell'
import { JourneyChapter } from '@/components/subpages/JourneyChapter'
import {
  ArrowLink,
  DataSlot,
  SectionHead,
  SpecRows,
} from '@/components/subpages/Primitives'
import { useSectionReveal } from '@/components/subpages/useSectionReveal'
import { COMMERCIAL_TERMS, PROCESS_STAGES, SERVICE_CAPABILITIES, VERIFIED } from '@/lib/data/company'

/**
 * /services
 *
 * Design: the approved homepage's grammar - ivory and white sections, sapphire
 * eyebrows with the star glyph, 900-weight uppercase headings with a Cormorant
 * italic accent, white hairline cards at 1.5rem gaps, one dark band for the
 * production sequence. No new design language; the homepage is untouched.
 *
 * Data: capabilities, process stages and commercial terms come from
 * lib/data/company.ts. Lead times, minimum order quantities, Incoterms, ports
 * and machinery are NOT verified anywhere in this repository, so they are
 * rendered as labelled slots rather than invented.
 */
export default function ServicesPage() {
  const scope = useRef<HTMLDivElement>(null)
  useSectionReveal(scope)

  return (
    <PageShell>
      <div ref={scope}>
        <PageHero
          eyebrow="Manufacturing & Services"
          lines={[{ text: 'Built to your' }, { text: 'specification,' }, { text: 'not to a catalogue', serif: true }]}
          lede="Denier, cut length, crimp and finish are set by the order rather than by a standing range - then verified in-house, sealed at 200–300 kg and documented for export before it leaves the floor."
          meta={[
            { label: 'Annual capacity', value: VERIFIED.annualCapacity },
            { label: 'Denier range', value: VERIFIED.denierRange },
            { label: 'Standard bale', value: VERIFIED.baleWeight },
            { label: 'Workforce', value: VERIFIED.workforce },
          ]}
          bgVideo="/videos/services-hero.mp4"
        >
          <Link className="btn-primary" href="/contact">
            Send a specification
          </Link>
        </PageHero>

        {/* ── Capabilities: editorial index + scroll-driven 3D extrusion ─── */}
        <section className="section-pad" data-sp-section style={{ background: 'var(--white)' }}>
          <div className="container">
            <div className="sp-anim">
              <SectionHead
                eyebrow="Capabilities"
                title="Four things we do"
                em="for every order"
                lede="Specification, verification, packing and export documentation are handled by the same operation, which is what keeps an agreed figure intact from melt to intake."
                link="/quality"
                linkLabel="How it is verified"
              />
            </div>

            <ul className="sp-index sp-anim">
              {SERVICE_CAPABILITIES.map((c, i) => (
                <li key={c.title}>
                  <a className="sp-index-row" href="/contact">
                    <span className="sp-index-num" aria-hidden="true">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span>
                      <h3 className="sp-index-title">{c.title}</h3>
                      <p className="sp-index-sub">{c.description}</p>
                    </span>
                    <span className="sp-index-arrow" aria-hidden="true">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ── The customer journey: one scroll, enquiry to consignment ──── */}
        <section className="section-pad" data-sp-section>
          <div className="container">
            <div className="sp-anim">
              <SectionHead
                eyebrow="The Journey"
                title="What happens"
                em="when you work with us"
                lede="Seven steps from your requirement to a delivered, documented consignment - each one a capability the house actually holds, walked here as a single scroll."
              />
            </div>
            <JourneyChapter />
          </div>
        </section>

        {/* ── Production sequence ───────────────────────────────────────── */}
        <section className="section-pad sp-dark" data-sp-section>
          <div className="container">
            <div className="sp-anim">
              <SectionHead
                eyebrow="Production Sequence"
                title="From flake"
                em="to sealed bale"
                lede="The four stages published on the homepage, read here as the route an order actually travels."
              />
            </div>

            <ol className="sp-steps">
              {PROCESS_STAGES.map((s, i) => (
                <li className="sp-step sp-anim" key={s.id}>
                  <span className="sp-step-num" aria-hidden="true">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <h3 className="sp-step-title">{s.title}</h3>
                    <p className="sp-body">{s.summary}</p>
                  </div>
                </li>
              ))}
            </ol>

            <p className="sp-small sp-anim" style={{ marginTop: '1.5rem' }}>
              Source: {PROCESS_STAGES[0].source}
            </p>
          </div>
        </section>

        {/* ── What to send ──────────────────────────────────────────────── */}
        <section className="section-pad" data-sp-section>
          <div className="container">
            <div className="sp-anim" style={{ marginBottom: 'clamp(2rem, 4vh, 3rem)' }}>
              <SectionHead
                eyebrow="Specification Intake"
                title="What we need"
                em="to quote properly"
              />
            </div>

            <div className="sp-split">
              <div className="sp-anim">
                <SpecRows
                  rows={[
                    { key: 'Denier', value: <>Target count within <strong>{VERIFIED.denierRange}</strong></> },
                    { key: 'Cut length', value: 'Set per order rather than from a standing range' },
                    { key: 'Crimp & finish', value: 'Crimp frequency and finish chemistry to your process' },
                    { key: 'Feedstock', value: <>Recycled (<strong>{VERIFIED.recycledInput}</strong>) or prime polymer</> },
                    { key: 'Volume & destination', value: 'Quantity and delivery country, for packing and documentation' },
                  ]}
                />
                <div style={{ marginTop: '2rem' }}>
                  <ArrowLink href="/contact">Open a specification enquiry</ArrowLink>
                </div>
              </div>

              <div className="sp-anim" style={{ display: 'grid', gap: '1.5rem' }}>
                <DataSlot
                  title="Lead time and minimum order quantity"
                  note="Neither is recorded in this repository. Confirm the standard lead time per line and the MOQ, and they will be published here where buyers look for them first."
                  minHeight="10rem"
                />
                <DataSlot
                  title="Incoterms and loading ports"
                  note="Export documentation and container loading are handled in-house, but the specific Incoterms offered and ports used are not verified here."
                  minHeight="10rem"
                />
              </div>
            </div>
          </div>
        </section>

        {/* ── Packing & export ──────────────────────────────────────────── */}
        <section className="section-pad" data-sp-section style={{ background: 'var(--white)' }}>
          <div className="container">
            <div className="sp-anim">
              <SectionHead
                eyebrow="Packing & Export"
                title="How the order"
                em="leaves the floor"
                lede="Packing, documentation and loading are coordinated in-house rather than subcontracted, so one party is accountable for what arrives."
              />
            </div>
            <div className="sp-anim">
              <SpecRows rows={COMMERCIAL_TERMS.map((t) => ({ key: t.label, value: <strong>{t.value}</strong> }))} />
            </div>
          </div>
        </section>

        {/* ── Close ─────────────────────────────────────────────────────── */}
        <section className="section-pad" data-sp-section>
          <div className="container" style={{ textAlign: 'center' }}>
            <div className="sp-anim" style={{ marginBottom: '1.25rem' }}>
              <h2 className="h-section" style={{ margin: '0 auto', maxWidth: '24ch' }}>
                Send the order sheet.
                <br />
                <em>We will answer on feasibility.</em>
              </h2>
            </div>
            <p className="sp-lede sp-anim" style={{ margin: '0 auto 2rem', maxWidth: '54ch' }}>
              Denier, cut length, volume and destination are enough for a firm answer on whether we are the right plant
              for the job.
            </p>
            <div className="sp-anim">
              <Link className="btn-primary" href="/contact">
                Start an enquiry
              </Link>
            </div>
          </div>
        </section>
      </div>
    </PageShell>
  )
}
