'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useRef, useState } from 'react'
import { PageHero } from '@/components/subpages/PageHero'
import { PageShell } from '@/components/subpages/PageShell'
import { ScrollProductScene } from '@/components/subpages/ScrollProductScene'
import { ProcessScrollChapter } from '@/components/subpages/ProcessScrollChapter'
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
 *
 * Data: the previously published bottle-diversion count, the CO2 reduction
 * percentage and the intrinsic-viscosity figure were removed, not restated -
 * none of them is verifiable in this repository. The calculator below therefore
 * computes only what follows arithmetically from verified figures (tonnage
 * within the stated annual capacity, and 280 kg standard bales) and leaves the
 * environmental conversions as labelled slots until a real factor is supplied.
 */
export default function SustainabilityPage() {
  const scope = useRef<HTMLDivElement>(null)
  useSectionReveal(scope)

  const [tonnes, setTonnes] = useState(1000)
  const bales = Math.ceil((tonnes * 1000) / 280)

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
              src="/images/sustainability-cotton.jpg"
              alt="Regenerated fibre produced by Gulf Fibre"
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
            <div className="sp-split">
              <div className="sp-anim">
                <SectionHead
                  eyebrow="Chain of Custody"
                  title="What the standard"
                  em="actually certifies"
                />
                <p className="sp-body" style={{ marginBottom: '1.75rem' }}>
                  {GRS.what}
                </p>
                <SpecRows
                  rows={[
                    { key: 'Standard', value: <strong>{GRS.name}</strong> },
                    { key: 'Scope', value: GRS.scope },
                    { key: 'Input material', value: <strong>{VERIFIED.recycledInput}</strong> },
                    { key: 'Kind', value: 'Accredited certification, not self-declaration' },
                  ]}
                />
                <div style={{ marginTop: '1.75rem', display: 'flex', alignItems: 'center', gap: '1.25rem', flexWrap: 'wrap' }}>
                  <ArrowLink href="/quality">See all registrations</ArrowLink>
                  <Provenance status={GRS.status} />
                </div>
              </div>

              <div className="sp-anim">
                <DataSlot
                  title="GRS certificate and scope certificate"
                  note="The certificate number, issuing body, certified scope and validity dates are not recorded in this repository. Supply the documents and this panel becomes a dated, downloadable register a buyer can audit."
                  minHeight="16rem"
                />
              </div>
            </div>
          </div>
        </section>

        {/* ── Transformation: scroll-driven 3D + state cards ───────────── */}
        <section className="section-pad" data-sp-section>
          <div className="container">
            <div className="sp-anim">
              <SectionHead
                eyebrow="Transformation"
                title="Three states,"
                em="one material"
                lede="The recycled route is the same production line described on the homepage, read here from the feedstock's point of view. Scroll the visualisation to follow the material from flake to fibre."
              />
            </div>

            <div className="sp-anim" style={{ marginBottom: 'clamp(2.5rem, 5vh, 4rem)' }}>
              <ScrollProductScene
                variant="circular"
                photo="/images/sustainability-cotton.jpg"
                photoAlt="Regenerated fibre produced by Gulf Fibre"
                caption="Scroll to transform post-consumer flake into aligned staple fibre - indicative visualisation of the recycled route, not a measured rendering of a grade."
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

        {/* ── Lifecycle: pinned 3D chapter + honest slots ───────────────── */}
        <section data-sp-section aria-label="Material lifecycle">
          <ProcessScrollChapter
            photo="/images/sustainability-cotton.jpg"
            photoAlt="Regenerated fibre produced by Gulf Fibre"
            variant="circular"
            kicker="Scroll to follow the material's lifecycle"
            stations={SUSTAINABILITY_LOOP.filter((s) => s.detail).map((s) => ({
              id: s.id,
              title: s.title,
              summary: s.detail as string,
            }))}
          />
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

        {/* ── Volume calculator ────────────────────────────────────────── */}
        <section className="section-pad sp-dark" data-sp-section>
          <div className="container">
            <div className="sp-anim">
              <SectionHead
                eyebrow="Volume Planner"
                title="Plan a volume,"
                em="not a percentage"
                lede="Move the slider to see what a given annual offtake means in certified recycled content and in standard bales. Both figures follow arithmetically from verified numbers."
              />
            </div>

            <div className="sp-panel sp-anim" style={{ background: 'rgba(255, 255, 255, 0.04)', border: '1px solid var(--border-dark)', borderRadius: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.25rem' }}>
                <label htmlFor="sp-volume" className="sp-row-key" style={{ color: 'var(--burg-bright)', fontSize: '0.75rem' }}>
                  Target Annual Offtake (up to verified {VERIFIED.annualCapacity} capacity)
                </label>
                <span style={{ fontFamily: 'var(--font-sans)', fontSize: '1.25rem', fontWeight: 900, color: '#fff' }}>
                  {tonnes.toLocaleString()} MT / year
                </span>
              </div>

              <input
                id="sp-volume"
                type="range"
                min={10}
                max={VERIFIED.annualCapacityValue}
                step={10}
                value={tonnes}
                onChange={(e) => setTonnes(Number(e.target.value))}
                style={{ width: '100%', accentColor: 'var(--burg-bright)', height: '6px', cursor: 'pointer' }}
              />

              {/* Volume Presets */}
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginTop: '1.25rem' }}>
                {[25, 50, 100, 250, 500, 1000, 2500, 5000].map((preset) => (
                  <button
                    key={preset}
                    type="button"
                    onClick={() => setTonnes(preset)}
                    style={{
                      padding: '0.35rem 0.75rem',
                      borderRadius: '999px',
                      fontSize: '0.6875rem',
                      fontFamily: 'var(--font-sans)',
                      fontWeight: 800,
                      letterSpacing: '0.04em',
                      textTransform: 'uppercase',
                      border: tonnes === preset ? '1px solid var(--burg-bright)' : '1px solid rgba(255, 255, 255, 0.18)',
                      background: tonnes === preset ? 'var(--burg-primary)' : 'rgba(255, 255, 255, 0.05)',
                      color: '#fff',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                    }}
                  >
                    {preset >= 1000 ? `${preset / 1000}k MT` : `${preset} MT`}
                  </button>
                ))}
              </div>

              <div className="sp-grid-3" style={{ marginTop: '2rem' }}>
                <div style={{ padding: '1.25rem', background: 'rgba(255, 255, 255, 0.03)', borderRadius: '8px', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
                  <p className="sp-stat-num" style={{ marginBottom: '0.35rem', color: 'var(--burg-bright)' }}>
                    {tonnes.toLocaleString()} MT
                  </p>
                  <p className="sp-stat-label" style={{ color: 'rgba(255, 255, 255, 0.65)' }}>Certified 100% GRS input</p>
                </div>
                <div style={{ padding: '1.25rem', background: 'rgba(255, 255, 255, 0.03)', borderRadius: '8px', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
                  <p className="sp-stat-num" style={{ marginBottom: '0.35rem', color: 'var(--burg-bright)' }}>
                    {bales.toLocaleString()}
                  </p>
                  <p className="sp-stat-label" style={{ color: 'rgba(255, 255, 255, 0.65)' }}>Standard {VERIFIED.baleWeight} bales</p>
                </div>
                <div style={{ padding: '1.25rem', background: 'rgba(255, 255, 255, 0.03)', borderRadius: '8px', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
                  <p className="sp-stat-num" style={{ marginBottom: '0.35rem', color: 'var(--burg-bright)' }}>
                    ~{Math.ceil(tonnes / 25).toLocaleString()} FCL
                  </p>
                  <p className="sp-stat-label" style={{ color: 'rgba(255, 255, 255, 0.65)' }}>Estimated 40ft HQ loads</p>
                </div>
              </div>

              <div className="sp-grid-2" style={{ marginTop: '1.5rem' }}>
                <DataSlot
                  title="CO2e avoided vs virgin polymer"
                  note="This needs a per-tonne emissions factor from your own LCA or an accredited dataset. We hold none, so we print none."
                  minHeight="8rem"
                />
                <DataSlot
                  title="Energy and water avoided"
                  note="Same requirement: a verified per-tonne factor. The panel is built so a real factor drops straight in."
                  minHeight="8rem"
                />
              </div>

              <p className="sp-small" style={{ marginTop: '1.75rem', color: 'rgba(255, 255, 255, 0.55)' }}>
                An unverifiable number helps nobody who has to defend it. All conversion calculations are based strictly on 280 kg standard moisture-barrier export bales.
              </p>
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
