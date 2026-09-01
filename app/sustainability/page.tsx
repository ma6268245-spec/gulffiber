'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useRef } from 'react'
import { PageHero } from '@/components/subpages/PageHero'
import { PageShell } from '@/components/subpages/PageShell'
import {
  ArrowLink,
  DataSlot,
  InfoCard,
  Provenance,
  SectionHead,
  SpecRows,
} from '@/components/subpages/Primitives'
import { useSectionReveal } from '@/components/subpages/useSectionReveal'
import { CERTIFICATION_DETAIL, PROCESS_STAGES, SUSTAINABILITY_LOOP, VERIFIED } from '@/lib/data/company'

const GRS = CERTIFICATION_DETAIL.find((c) => c.code.startsWith('GRS'))!

/**
 * /sustainability
 *
 * Design: the approved homepage's grammar - ivory and white sections, sapphire
 * eyebrows, 900-weight uppercase headings with a Cormorant italic accent, white
 * hairline cards, sapphire figures, one dark band. No new design language, and
 * the homepage is untouched.
 */
export default function SustainabilityPage() {
  const scope = useRef<HTMLDivElement>(null)
  useSectionReveal(scope)

  return (
    <PageShell>
      <div ref={scope}>
        <PageHero
          eyebrow="Sustainability"
          lines={[{ text: 'Recycled under' }, { text: 'a chain' }, { text: 'of custody', serif: true }]}
          lede={`Regenerated staple fibre produced from ${VERIFIED.recycledInput} and tracked under Global Recycled Standard chain of custody, so a recycled-content claim on your product can be substantiated on ours.`}
          meta={[
            { label: 'Recycled input', value: '100% PET' },
            { label: 'Chain of custody', value: 'GRS' },
            { label: 'Annual capacity', value: VERIFIED.annualCapacity },
            { label: 'Established', value: String(VERIFIED.established) },
          ]}
          aside={
            <Image
              src="/images/Gallery/15.jpeg"
              alt="Factory rooftop solar energy array and clean manufacturing facility at Gulf Fiber"
              fill
              priority
              sizes="(max-width: 992px) 100vw, 48vw"
              style={{ objectFit: 'cover' }}
            />
          }
        >
          <Link className="btn-primary" href="/contact">
            Ask for the GRS certificate
          </Link>
        </PageHero>

        {/* ── What GRS actually covers ──────────────────────────────────── */}
        <section className="section-pad" data-sp-section style={{ background: 'var(--white)' }}>
          <div className="container">
            <div className="sp-anim" style={{ marginBottom: 'clamp(2rem, 4vh, 3rem)' }}>
              <SectionHead
                eyebrow="Chain of Custody"
                title="What the standard"
                em="actually certifies"
                lede={GRS.what}
              />
            </div>

            <div
              className="sp-anim"
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                gap: 'clamp(2rem, 4vw, 3.5rem)',
                alignItems: 'stretch',
              }}
            >
              {/* Left Column: Technical Specifications */}
              <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <SpecRows
                  rows={[
                    { key: 'Standard', value: <strong>{GRS.name}</strong> },
                    { key: 'Certificate No.', value: <strong>{GRS.certNumber}</strong> },
                    { key: 'Scope', value: GRS.scope },
                    { key: 'Input Material', value: <strong>{VERIFIED.recycledInput}</strong> },
                    { key: 'Kind', value: 'Accredited statutory certification, not self-declaration' },
                  ]}
                />
                <div style={{ marginTop: '1.75rem', display: 'flex', alignItems: 'center', gap: '1.25rem', flexWrap: 'wrap' }}>
                  <ArrowLink href="/quality">See all verified registrations</ArrowLink>
                  <Provenance status={GRS.status} />
                </div>
              </div>

              {/* Right Column: Verified Chain of Custody Card */}
              <div
                style={{
                  background: 'var(--card-bg)',
                  border: '1px solid var(--border-light)',
                  borderRadius: '20px',
                  padding: 'clamp(1.75rem, 3vw, 2.25rem)',
                  boxShadow: '0 10px 30px rgba(10, 75, 184, 0.04)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                }}
              >
                <div>
                  <h3
                    style={{
                      fontSize: '0.8125rem',
                      fontWeight: 800,
                      textTransform: 'uppercase',
                      letterSpacing: '0.08em',
                      color: 'var(--burg-primary)',
                      marginBottom: '1.5rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                    }}
                  >
                    <span style={{ display: 'inline-block', width: '8px', height: '8px', borderRadius: '50%', background: '#12B76A' }} />
                    Verified Chain of Custody Record
                  </h3>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', fontSize: '0.875rem', lineHeight: 1.6, color: 'var(--muted)' }}>
                    <div>
                      <p style={{ fontSize: '0.6875rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--ink)', margin: '0 0 0.25rem' }}>
                        Auditing Authority & Scope
                      </p>
                      <p style={{ margin: 0, color: 'var(--ink)', fontWeight: 600 }}>
                        Control Union Certifications B.V. (Netherlands)
                      </p>
                      <span style={{ fontSize: '0.8125rem', color: 'var(--muted)' }}>Scope Certificate CU1068996GRS · Site Appendix TE-00005889</span>
                    </div>

                    <div style={{ borderTop: '1px solid var(--border-light)', paddingTop: '0.85rem' }}>
                      <p style={{ fontSize: '0.6875rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--ink)', margin: '0 0 0.25rem' }}>
                        Certified Industrial Processes
                      </p>
                      <p style={{ margin: 0, color: 'var(--ink)' }}>
                        Mechanical Recycling (PR0017) · Industrial Dyeing (PR0008) · Global Trading (PR0030)
                      </p>
                    </div>

                    <div style={{ borderTop: '1px solid var(--border-light)', paddingTop: '0.85rem' }}>
                      <p style={{ fontSize: '0.6875rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--ink)', margin: '0 0 0.25rem' }}>
                        Traceability Guarantee
                      </p>
                      <p style={{ margin: 0, color: 'var(--muted)', fontSize: '0.8125rem' }}>
                        Every consignment is shipped with statutory Transaction Certificates (TC) tracking post-consumer PET material directly back to origin.
                      </p>
                    </div>
                  </div>
                </div>

                <div style={{ marginTop: '1.5rem', paddingTop: '1rem', borderTop: '1px solid var(--border-light)' }}>
                  <Link href="/company#certifications" className="btn-secondary" style={{ width: '100%', justifyContent: 'center', textDecoration: 'none' }}>
                    Examine GRS Certificate Scan →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Transformation: Three states, one material ───────────── */}
        <section className="section-pad" data-sp-section>
          <div className="container">
            <div className="sp-anim" style={{ marginBottom: 'clamp(2rem, 4vh, 3rem)' }}>
              <SectionHead
                eyebrow="Transformation"
                title="Three states,"
                em="one material"
                lede="The recycled route follows the same production line described on the homepage, read here from the feedstock's point of view across three distinct physical states."
              />
            </div>

            <div className="sp-grid-3">
              <div className="sp-anim">
                <InfoCard
                  category="State 01"
                  title="Post-consumer PET"
                  body="Collected PET arrives as post-consumer material rather than as industrial offcut, which is what makes the recycled claim meaningful to a brand's own reporting."
                  footKey="Input"
                  footValue={VERIFIED.recycledInput}
                />
              </div>
              <div className="sp-anim">
                <InfoCard
                  category="State 02"
                  title="Refined flake"
                  body={PROCESS_STAGES[0].summary}
                  footKey="Stage"
                  footValue={PROCESS_STAGES[0].title}
                />
              </div>
              <div className="sp-anim">
                <InfoCard
                  category="State 03"
                  title="Staple fibre"
                  body="The output is staple fibre supplied across the full count range for spinning and nonwoven conversion, under the same chain of custody as the input."
                  footKey="Denier range"
                  footValue={VERIFIED.denierRange}
                />
              </div>
            </div>
          </div>
        </section>

        <section className="section-pad" data-sp-section style={{ background: 'var(--white)' }}>
          <div className="container">
            <div className="sp-anim">
              <SectionHead
                eyebrow="Lifecycle - Open Items"
                title="What the record"
                em="does not yet hold"
                lede="Resource efficiency, waste reduction and future goals belong in the lifecycle story - but only as verified figures or company-approved statements. Each panel below names what to supply."
              />
            </div>
            <div className="sp-grid-3">
              {SUSTAINABILITY_LOOP.filter((s) => !s.detail).map((s) => (
                <div className="sp-anim" key={s.id}>
                  <DataSlot title={s.title} note={s.note ?? 'Verified content required.'} status={s.status} minHeight="10rem" />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Close ─────────────────────────────────────────────────────── */}
        <section className="section-pad" data-sp-section>
          <div className="container" style={{ textAlign: 'center' }}>
            <div className="sp-anim" style={{ marginBottom: '1.25rem' }}>
              <h2 className="h-section" style={{ margin: '0 auto', maxWidth: '22ch' }}>
                Ask for the certificate,
                <br />
                <em>not the adjective.</em>
              </h2>
            </div>
            <p className="sp-lede sp-anim" style={{ margin: '0 auto 2rem', maxWidth: '54ch' }}>
              Recycled content is either documented through a chain of custody or it is marketing. Ours is documented -
              request the paperwork and judge it.
            </p>
            <div className="sp-anim">
              <Link className="btn-primary" href="/contact">
                Request documentation
              </Link>
            </div>
          </div>
        </section>
      </div>
    </PageShell>
  )
}
