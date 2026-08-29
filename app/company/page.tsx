'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useRef } from 'react'
import { CompanyVideoScrollStory } from '@/components/company/CompanyVideoScrollStory'
import { PageHero } from '@/components/subpages/PageHero'
import { PageShell } from '@/components/subpages/PageShell'
import { ScrollProductScene } from '@/components/subpages/ScrollProductScene'
import { TimelineChapter } from '@/components/subpages/TimelineChapter'
import { DirectorFeature } from '@/components/subpages/PeopleChapter'
import { CompanyOrgTree } from '@/components/company/CompanyOrgTree'
import { CertificationGallery } from '@/components/subpages/CertificationGallery'
import {
  ArrowLink,
  Counter,
  DataSlot,
  Provenance,
  SectionHead,
  SpecRows,
} from '@/components/subpages/Primitives'
import { useSectionReveal } from '@/components/subpages/useSectionReveal'
import { LEADERSHIP_NOTE, PROCESS_STAGES, VERIFIED } from '@/lib/data/company'

/* ===========================================================================
   /company - the documentary
   ---------------------------------------------------------------------------
   Ten chapters in the approved homepage's grammar (ivory and white sections,
   sapphire eyebrows, 900-weight uppercase headings with a Cormorant italic
   accent, hairline rules, one dark band for chronology):

     01 Hero            - who Gulf Fibre is
     02 Story           - manufacturer, not a trading house
     03 History         - scroll-lit timeline, dated facts only
     04 Director        - dedicated feature, awaiting approved content
     05 Founders        - structured frames
     06 Management      - structured frames
     07 Certifications  - gallery with lightbox
     08 Manufacturing   - the four-stage sequence + film
     09 Today           - verified figures
     10 Future + CTA    - open chapter, honestly labelled

   Data discipline is absolute: every person, date and figure renders from
   lib/data/company.ts, and anything unverified renders as a labelled slot
   that states exactly what to supply - never a plausible invention.
   =========================================================================== */

export default function CompanyPage() {
  const scope = useRef<HTMLDivElement>(null)
  useSectionReveal(scope)

  return (
    <PageShell>
      <div ref={scope}>
        {/* ── Chapter 01 - Hero ─────────────────────────────────────────── */}
        <PageHero
          eyebrow="The Company"
          lines={[{ text: 'Twenty-five years' }, { text: 'on one' }, { text: 'material', serif: true }]}
          lede={`${VERIFIED.legalName} has manufactured polyester fibre in ${VERIFIED.country} since ${VERIFIED.established}, supplying spinning mills, wadding converters and nonwoven manufacturers.`}
          meta={[
            { label: 'Established', value: String(VERIFIED.established) },
            { label: 'Annual capacity', value: VERIFIED.annualCapacity },
            { label: 'Customers served', value: VERIFIED.customers },
            { label: 'Workforce', value: VERIFIED.workforce },
          ]}
          aside={
            <Image
              src="/images/hero-loom.jpg"
              alt="Textile machinery running Gulf Fibre material"
              fill
              priority
              sizes="(max-width: 992px) 100vw, 48vw"
              style={{ objectFit: 'cover' }}
            />
          }
        >
          <Link className="btn-primary" href="/contact">
            Talk to the export desk
          </Link>
        </PageHero>

        {/* ── Chapter 02 - The story ────────────────────────────────────── */}
        <section className="section-pad" data-sp-section style={{ background: 'var(--white)' }}>
          <div className="container">
            <div className="sp-split">
              <div className="sp-anim">
                <SectionHead eyebrow="Chapter 02 - Who We Are" title="A fibre manufacturer," em="not a trading house" />
                <p className="sp-body" style={{ marginBottom: '1.75rem' }}>
                  Material is produced on our own line, verified in-house and documented before dispatch. That is the
                  difference a procurement team feels when a specification has to hold across repeat orders rather than
                  a single shipment.
                </p>
                <SpecRows
                  rows={[
                    { key: 'Legal name', value: <strong>{VERIFIED.legalName}</strong> },
                    { key: 'Country', value: <strong>{VERIFIED.country}</strong> },
                    { key: 'Established', value: <strong>{String(VERIFIED.established)}</strong> },
                    { key: 'Registrations', value: <strong>{VERIFIED.certificationCount} held</strong> },
                  ]}
                />
                <div style={{ marginTop: '1.75rem', display: 'flex', alignItems: 'center', gap: '1.25rem', flexWrap: 'wrap' }}>
                  <ArrowLink href="/quality">See the registrations</ArrowLink>
                  <Provenance status="VERIFIED" />
                </div>
              </div>

              <div className="sp-anim" style={{ display: 'grid', gap: '1.5rem' }}>
                <div className="sp-panel">
                  <div className="sp-grid-2">
                    <div>
                      <p className="sp-stat-num" style={{ marginBottom: '0.35rem' }}>
                        <Counter end={VERIFIED.annualCapacityValue} comma suffix=" MT" />
                      </p>
                      <p className="sp-stat-label">Annual production capacity</p>
                    </div>
                    <div>
                      <p className="sp-stat-num" style={{ marginBottom: '0.35rem' }}>
                        <Counter end={VERIFIED.customersValue} suffix="+" />
                      </p>
                      <p className="sp-stat-label">Customers served</p>
                    </div>
                    <div style={{ marginTop: '1.5rem' }}>
                      <p className="sp-stat-num" style={{ marginBottom: '0.35rem' }}>
                        <Counter end={VERIFIED.workforceValue} suffix="+" />
                      </p>
                      <p className="sp-stat-label">People employed</p>
                    </div>
                    <div style={{ marginTop: '1.5rem' }}>
                      <p className="sp-stat-num" style={{ marginBottom: '0.35rem' }}>
                        {VERIFIED.denierRange}
                      </p>
                      <p className="sp-stat-label">Denier range supplied</p>
                    </div>
                  </div>
                </div>
                <DataSlot
                  title="Plant location and site detail"
                  note="This repository verifies the country only. Supply the plant address, site area and line configuration if they are to be published."
                  minHeight="8rem"
                />
                <ScrollProductScene
                  variant="bundle"
                  photo="/images/hero-loom.jpg"
                  photoAlt="Textile machinery running Gulf Fibre material"
                  caption="Scroll to open a baled fibre bundle - indicative visualisation of the material the company has manufactured since 1999."
                />
              </div>
            </div>
          </div>
        </section>

        {/* ── Chapter 03 - History: scroll-lit timeline ──────────────────── */}
        <section className="section-pad sp-dark" data-sp-section>
          <div className="container">
            <div className="sp-anim">
              <SectionHead
                eyebrow="Chapter 03 - Chronology"
                title="What is dated,"
                em="and what is not yet"
                lede="Only the founding year and the present operating position are dated in our records. The certification years are open items rather than guesses - each slot names the date to supply."
              />
            </div>
            <div className="sp-anim">
              <TimelineChapter />
            </div>
          </div>
        </section>

        {/* ── Chapter 04 - Director ─────────────────────────────────────── */}
        <section className="section-pad" data-sp-section style={{ background: 'var(--white)' }}>
          <div className="container">
            <div className="sp-anim">
              <SectionHead
                eyebrow="Chapter 04 - Director"
                title="Leadership &"
                em="Vision"
                lede="A message from Founder & Director Muhammad Iftikhar on 25+ years of engineering discipline, technical innovation, and customer-first manufacturing."
              />
            </div>
            <div className="sp-anim">
              <DirectorFeature />
            </div>
          </div>
        </section>

        {/* ── Chapter 05 - Interactive Company Organization Tree ───────── */}
        <section className="section-pad" data-sp-section>
          <div className="container">
            <div className="sp-anim">
              <SectionHead
                eyebrow="Chapter 05 - Organization & Leadership Hierarchy"
                title="Company structure"
                em="and leadership"
                lede="An interactive visualization of Gulf Fibre's corporate hierarchy - from founding executive governance to specialized technical product sales departments. Click any circular profile node to view credentials, material domains, and direct contact details."
              />
            </div>
            <div className="sp-anim">
              <CompanyOrgTree />
            </div>
          </div>
        </section>

        {/* ── Chapter 06 - Certifications: gallery + lightbox ───────────── */}
        <section className="section-pad" data-sp-section style={{ background: 'var(--white)' }}>
          <div className="container">
            <div className="sp-anim">
              <SectionHead
                eyebrow="Chapter 06 - Registrations"
                title="Certified by"
                em="document"
                lede="Four registrations, each stating its own scope. Where the certificate scan is in hand it can be inspected; where it is not, the frame says so."
                link="/quality"
                linkLabel="Read the compliance detail"
              />
            </div>
            <div className="sp-anim">
              <CertificationGallery />
            </div>
          </div>
        </section>

        {/* ── Chapter 07 - Manufacturing / craftsmanship ────────────────── */}
        <section className="section-pad" data-sp-section>
          <div className="container">
            <div className="sp-anim">
              <SectionHead
                eyebrow="Chapter 07 - Manufacturing"
                title="How value"
                em="is created here"
                lede="One line, four stages, every order. The sequence below is the published record of how material moves from feedstock to sealed bale."
                link="/products"
                linkLabel="Follow it in 3D"
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

        {/* ── The floor, on film ────────────────────────────────────────── */}
        <section className="section-pad" data-sp-section style={{ background: 'var(--white)' }}>
          <div className="container">
            <div className="sp-anim">
              <SectionHead
                eyebrow="Inside The Plant"
                title="See the floor"
                em="before you buy from it"
                lede="A short film of the production environment. It loads only when you press play."
              />
            </div>
            <div className="sp-anim">
              <CompanyVideoScrollStory />
            </div>
          </div>
        </section>

        {/* ── Chapter 08 - Today: verified figures ──────────────────────── */}
        <section className="section-pad" data-sp-section>
          <div className="container">
            <div className="sp-anim">
              <SectionHead
                eyebrow="Chapter 08 - Today"
                title="The company,"
                em="in numbers"
                lede="Every figure below is drawn from the verified company record - nothing here is an estimate or a rounding of an unpublished number."
              />
            </div>
            <div className="sp-grid-2 sp-anim">
              <div className="sp-panel">
                <p className="sp-stat-num" style={{ marginBottom: '0.35rem' }}>
                  <Counter end={VERIFIED.annualCapacityValue} comma suffix=" MT" />
                </p>
                <p className="sp-stat-label">Annual production capacity</p>
              </div>
              <div className="sp-panel">
                <p className="sp-stat-num" style={{ marginBottom: '0.35rem' }}>
                  <Counter end={VERIFIED.customersValue} suffix="+" />
                </p>
                <p className="sp-stat-label">Customers served</p>
              </div>
              <div className="sp-panel">
                <p className="sp-stat-num" style={{ marginBottom: '0.35rem' }}>
                  <Counter end={VERIFIED.workforceValue} suffix="+" />
                </p>
                <p className="sp-stat-label">People employed</p>
              </div>
              <div className="sp-panel">
                <p className="sp-stat-num" style={{ marginBottom: '0.35rem' }}>
                  {VERIFIED.yearsInBusiness}
                </p>
                <p className="sp-stat-label">Years in business, since {VERIFIED.established}</p>
              </div>
            </div>
            <div className="sp-grid-2 sp-anim" style={{ marginTop: '1.5rem' }}>
              <DataSlot
                title="Markets and export destinations"
                note="The countries the company exports to are not recorded in this repository. Supply the verified market list and it belongs in this panel."
                minHeight="9rem"
              />
              <DataSlot
                title="Product categories supplied"
                note="Four verified categories exist in the record - the breakdown of volumes by category does not, so it is not printed."
                minHeight="9rem"
              />
            </div>
          </div>
        </section>

        {/* ── Chapter 09 - Future + CTA ─────────────────────────────────── */}
        <section className="section-pad" data-sp-section style={{ background: 'var(--white)' }}>
          <div className="container">
            <div className="sp-anim">
              <SectionHead
                eyebrow="Chapter 09 - The Next Chapter"
                title="What comes"
                em="after 25 years"
                lede="Investment, capacity growth and sustainability targets belong in this chapter - as company-approved statements, which none is yet. The frame is here; the words will be the company's own."
              />
            </div>
            <div className="sp-anim">
              <DataSlot
                title="Forward-looking statement"
                note="Any statement about future capacity, markets or sustainability targets must be supplied and approved by the company before publication."
                minHeight="10rem"
              />
            </div>
          </div>
        </section>

        {/* ── Close ─────────────────────────────────────────────────────── */}
        <section className="section-pad sp-dark" data-sp-section>
          <div className="container" style={{ textAlign: 'center' }}>
            <div className="sp-anim" style={{ marginBottom: '1.25rem' }}>
              <h2 className="h-section" style={{ margin: '0 auto', maxWidth: '24ch' }}>
                Judge us on a bale,
                <br />
                <em>not on a brochure.</em>
              </h2>
            </div>
            <p className="sp-lede sp-anim" style={{ margin: '0 auto 2rem', maxWidth: '54ch' }}>
              Send a specification and a sample request. Everything else on this page is only context for that
              conversation.
            </p>
            <div className="sp-anim">
              <Link className="btn-primary" href="/contact">
                Contact the company
              </Link>
            </div>
          </div>
        </section>
      </div>
    </PageShell>
  )
}
