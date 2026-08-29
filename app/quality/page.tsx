'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useRef } from 'react'
import { PageHero } from '@/components/subpages/PageHero'
import { PageShell } from '@/components/subpages/PageShell'
import { ScrollProductScene } from '@/components/subpages/ScrollProductScene'
import {
  ArrowLink,
  Provenance,
  SectionHead,
  SpecRows,
} from '@/components/subpages/Primitives'
import { useSectionReveal } from '@/components/subpages/useSectionReveal'
import { CertificationGallery } from '@/components/subpages/CertificationGallery'
import { PROCESS_STAGES, QA_DISCIPLINES, VERIFIED } from '@/lib/data/company'

/**
 * /quality
 *
 * Design: the approved homepage's own grammar - ivory and white sections,
 * sapphire eyebrows with the star glyph, 900-weight uppercase headings with a
 * Cormorant italic accent, white hairline cards, hairline stat strips, one dark
 * band for the process sequence.
 */
export default function QualityPage() {
  const scope = useRef<HTMLDivElement>(null)
  useSectionReveal(scope)

  return (
    <PageShell>
      <div ref={scope}>
        <PageHero
          eyebrow="Quality & Compliance"
          lines={[{ text: 'Certified by' }, { text: 'document,' }, { text: 'not by adjective', serif: true }]}
          lede="Five accredited and institutional registrations, an in-house verification sequence, and a Certificate of Analysis against which a receiving mill can reconcile every consignment."
          meta={[
            { label: 'Registrations', value: VERIFIED.certificationCount },
            { label: 'Established', value: String(VERIFIED.established) },
            { label: 'Annual capacity', value: VERIFIED.annualCapacity },
            { label: 'Customers served', value: VERIFIED.customers },
          ]}
          aside={
            <Image
              src="/images/quality-lab.jpg"
              alt="Fibre being inspected under laboratory conditions at Gulf Fibre"
              fill
              priority
              sizes="(max-width: 992px) 100vw, 48vw"
              style={{ objectFit: 'cover' }}
            />
          }
        >
          <Link className="btn-primary" href="/contact">
            Request documentation
          </Link>
        </PageHero>

        {/* ── Registrations ─────────────────────────────────────────────── */}
        <section className="section-pad" data-sp-section style={{ background: 'var(--white)' }}>
          <div className="container">
            <div className="sp-anim" style={{ marginBottom: '2.5rem' }}>
              <SectionHead
                eyebrow="Registrations & Scans"
                title="What we hold,"
                em="and what each one covers"
                lede="Six verified statutory registrations, scope appendices, and environmental permits. Click any document below to open high-resolution full-screen viewing."
                link="/contact"
                linkLabel="Ask for certified copies"
              />
            </div>

            <div className="sp-anim">
              <CertificationGallery />
            </div>
          </div>
        </section>

        {/* ── Verification sequence: scroll-driven 3D cross-section ─────── */}
        <section className="section-pad" data-sp-section>
          <div className="container">
            <div className="sp-anim">
              <SectionHead
                eyebrow="In-house verification"
                title="Four checks that"
                em="decide the bale"
                lede="Verification is placed where the outcome is still recoverable: before the melt, at the fibre, and before the bale is sealed."
              />
            </div>

            <div className="sp-anim" style={{ marginBottom: 'clamp(2.5rem, 5vh, 4rem)' }}>
              <ScrollProductScene
                variant="cross"
                photo="/images/quality-lab.jpg"
                photoAlt="Fibre being inspected under laboratory conditions at Gulf Fibre"
                caption="Scroll to lift the measurement wedge out of the fibre cross-section - indicative visualisation of laboratory inspection, not a measured rendering of a grade."
              />
            </div>

            <ol className="sp-steps">
              {QA_DISCIPLINES.map((q, i) => (
                <li className="sp-step sp-anim" key={q.code}>
                  <span className="sp-step-num" aria-hidden="true">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <h3 className="sp-step-title">{q.title}</h3>
                    <p className="sp-body">{q.detail}</p>
                    <div style={{ marginTop: '0.85rem' }}>
                      <Provenance status={q.status} />
                    </div>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ── Where verification sits in production ─────────────────────── */}
        <section className="section-pad sp-dark" data-sp-section>
          <div className="container">
            <div className="sp-anim">
              <SectionHead
                eyebrow="Production sequence"
                title="Control points,"
                em="stage by stage"
                lede="The same four production stages published on the homepage, read here for where control is applied rather than for throughput."
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

        {/* ── Certificate of Analysis ────────────────────────────────────── */}
        <section className="section-pad" data-sp-section style={{ background: 'var(--white)' }}>
          <div className="container">
            <div
              className="sp-split"
              style={{
                alignItems: 'stretch',
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                gap: 'clamp(2rem, 4vw, 3.5rem)',
              }}
            >
              <div
                className="sp-anim"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                }}
              >
                <div>
                  <SectionHead
                    eyebrow="Documentation"
                    title="Every consignment"
                    em="arrives with its record"
                  />
                  <SpecRows
                    rows={[
                      {
                        key: 'Issued with',
                        value: (
                          <>
                            A <strong>Certificate of Analysis</strong> per consignment, so delivered material can be
                            reconciled against the agreed specification.
                          </>
                        ),
                      },
                      { key: 'Standard bale', value: <strong>{VERIFIED.baleWeight}, moisture-sealed</strong> },
                      { key: 'Denier range', value: <strong>{VERIFIED.denierRange}</strong> },
                      { key: 'Recycled input', value: <strong>{VERIFIED.recycledInput}</strong> },
                    ]}
                  />
                </div>
                <div style={{ marginTop: '2rem' }}>
                  <ArrowLink href="/contact">Send a specification to quote against</ArrowLink>
                </div>
              </div>

              <div
                className="sp-anim"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  gap: '1.25rem',
                  marginTop: 'clamp(1.5rem, 3.5vw, 3rem)',
                }}
              >
                <div
                  className="sp-panel"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flex: '1 1 auto',
                    minHeight: '15rem',
                    background: 'var(--bg-subtle, #F8FAFC)',
                    border: '1px solid var(--border-light, #E2E8F0)',
                    borderRadius: '16px',
                    padding: '1.75rem',
                  }}
                >
                  <Image
                    src="/images/iso-9001-seal-v2.png"
                    alt="ISO 9001:2015 certification seal"
                    width={200}
                    height={200}
                    sizes="200px"
                    style={{ height: 'auto', maxWidth: '100%', filter: 'drop-shadow(0 6px 18px rgba(10, 75, 184, 0.12))' }}
                  />
                </div>

                <div
                  style={{
                    background: 'var(--bg-subtle, #F8FAFC)',
                    border: '1px solid rgba(10, 75, 184, 0.15)',
                    borderRadius: '16px',
                    padding: '1.15rem 1.35rem',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.3rem' }}>
                    <span style={{ fontSize: '0.85rem' }}>🛡️</span>
                    <p
                      style={{
                        fontSize: '0.6875rem',
                        fontWeight: 800,
                        color: 'var(--burg-primary, #0A4BB8)',
                        letterSpacing: '0.06em',
                        textTransform: 'uppercase',
                        margin: 0,
                      }}
                    >
                      Quality Assurance Record
                    </p>
                  </div>
                  <h4 style={{ fontSize: '0.875rem', fontWeight: 800, color: '#0F172A', margin: '0 0 0.3rem' }}>
                    Consignment Certificate of Analysis (COA)
                  </h4>
                  <p style={{ fontSize: '0.75rem', color: '#64748B', lineHeight: 1.45, margin: 0 }}>
                    Every dispatched bale shipment is accompanied by verified laboratory batch metrics covering denier, cut length tolerance, tensile strength, elongation, and moisture limits.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Close ──────────────────────────────────────────────────────── */}
        <section className="section-pad" data-sp-section>
          <div className="container" style={{ textAlign: 'center' }}>
            <div className="sp-anim" style={{ marginBottom: '1.25rem' }}>
              <h2 className="h-section" style={{ margin: '0 auto', maxWidth: '22ch' }}>
                Send the specification.
                <br />
                <em>Test the bale yourself.</em>
              </h2>
            </div>
            <p className="sp-lede sp-anim" style={{ margin: '0 auto 2rem', maxWidth: '52ch' }}>
              We would rather be measured on a sample against your own method sheet than on a claim published on a
              website.
            </p>
            <div className="sp-anim">
              <Link className="btn-primary" href="/contact">
                Request a sample
              </Link>
            </div>
          </div>
        </section>
      </div>
    </PageShell>
  )
}
