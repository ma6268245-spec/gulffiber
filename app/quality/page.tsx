'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useRef } from 'react'
import { PageHero } from '@/components/subpages/PageHero'
import { PageShell } from '@/components/subpages/PageShell'
import { ScrollProductScene } from '@/components/subpages/ScrollProductScene'
import {
  ArrowLink,
  DataSlot,
  InfoCard,
  Provenance,
  SectionHead,
  SpecRows,
} from '@/components/subpages/Primitives'
import { useSectionReveal } from '@/components/subpages/useSectionReveal'
import { CERTIFICATION_DETAIL, PROCESS_STAGES, QA_DISCIPLINES, VERIFIED } from '@/lib/data/company'

/**
 * /quality
 *
 * Design: the approved homepage's own grammar - ivory and white sections,
 * sapphire eyebrows with the star glyph, 900-weight uppercase headings with a
 * Cormorant italic accent, white hairline cards, hairline stat strips, one dark
 * band for the process sequence. No new design language, no mono face, no
 * blueprint or coordinate markers. The homepage itself is untouched.
 *
 * Data: the previously published page asserted test methods and tolerances that
 * are nowhere in this repository - ASTM D1577 at +/-0.05 D, ISO 5079 above
 * 5.5 cN/dtex, ASTM D3822, JIS L1015, ASTM D5104, a spin-finish (OPU) window,
 * a "Karachi manufacturing facility", and four invented status pills
 * ("Active & Verified", "Certified Recycled", "Skin-Contact Safe", "Corporate
 * Member"). Those were removed rather than restated: a tolerance a buyer cannot
 * hold a supplier to is worse than no tolerance at all. Where a real document
 * or figure belongs, this page renders a labelled slot instead.
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
          lede="Four accredited and institutional registrations, an in-house verification sequence, and a Certificate of Analysis against which a receiving mill can reconcile every consignment."
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
            <div className="sp-anim">
              <SectionHead
                eyebrow="Registrations"
                title="What we hold,"
                em="and what each one covers"
                lede="Each entry below states its own scope. Nothing is described as a guarantee of a property it does not test, and the trade membership is labelled as a membership rather than a certification."
                link="/contact"
                linkLabel="Ask for certificates"
              />
            </div>

            <div className="sp-grid-2">
              {CERTIFICATION_DETAIL.map((c) => (
                <div className="sp-anim" key={c.code}>
                  <InfoCard
                    category={c.scope}
                    title={`${c.code} - ${c.name}`}
                    body={c.what}
                    footKey={c.kind === 'ACCREDITED_CERTIFICATION' ? 'Accredited certification' : 'Trade association'}
                    footValue={<Provenance status={c.status} />}
                  />
                </div>
              ))}
            </div>

            <div className="sp-grid-2 sp-anim" style={{ marginTop: '1.5rem' }}>
              <DataSlot
                title="Certificate documents"
                note="Certificate numbers, issuing bodies, scopes and expiry dates are not recorded in this repository. Supply the certificate PDFs and this panel becomes a downloadable, dated register."
                minHeight="11rem"
              />
              <DataSlot
                title="Test method and tolerance matrix"
                note="Method references and agreed tolerances per product line belong here. None are verified in this repository, so none are printed - a published tolerance a buyer cannot hold us to is worse than no tolerance at all."
                minHeight="11rem"
              />
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
            <div className="sp-split">
              <div className="sp-anim">
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
                <div style={{ marginTop: '2rem' }}>
                  <ArrowLink href="/contact">Send a specification to quote against</ArrowLink>
                </div>
              </div>

              <div className="sp-anim" style={{ display: 'grid', gap: '1.5rem' }}>
                <div
                  className="sp-panel"
                  style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '16rem' }}
                >
                  <Image
                    src="/images/iso-9001-seal-v2.png"
                    alt="ISO 9001:2015 certification seal"
                    width={220}
                    height={220}
                    sizes="220px"
                    style={{ height: 'auto', maxWidth: '100%' }}
                  />
                </div>
                <DataSlot
                  title="Sample Certificate of Analysis"
                  note="A redacted specimen COA would let a buyer see exactly which parameters are reported before placing a first order. Provide one and it can be published or gated here."
                  minHeight="10rem"
                />
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
