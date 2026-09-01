'use client'

import Link from 'next/link'
import { useRef } from 'react'
import { CompanyVideoScrollStory } from '@/components/company/CompanyVideoScrollStory'
import { PageHero } from '@/components/subpages/PageHero'
import { PageShell } from '@/components/subpages/PageShell'
import { TimelineChapter } from '@/components/subpages/TimelineChapter'
import { DirectorFeature } from '@/components/subpages/PeopleChapter'
import { CompanyOrgTree } from '@/components/company/CompanyOrgTree'
import { CertificationGallery } from '@/components/subpages/CertificationGallery'
import {
  ArrowLink,
  Counter,
  Provenance,
  SectionHead,
  SpecRows,
} from '@/components/subpages/Primitives'
import { useSectionReveal } from '@/components/subpages/useSectionReveal'
import { VERIFIED } from '@/lib/data/company'

/* ===========================================================================
   /company - The Comprehensive Company Documentary
   ---------------------------------------------------------------------------
   9 Sequential Sections:

     01 · HERO                      - Gulf Fibre — Since 1999 (Video Ambient Hero)
     02 · WHO WE ARE                - Company identity, capabilities & scale
     03 · OUR PRODUCT PORTFOLIO     - High-level product ecosystem
     04 · 25 YEARS OF HISTORY       - 1999 to Present day interactive timeline
     05 · FOUNDER'S VISION          - Muhammad Iftikhar feature & message
     06 · COMPANY ORGANIZATION      - Interactive organization tree
     07 · CERTIFICATIONS            - ISO, GRS, OEKO-TEX, LCCI gallery
     08 · INSIDE THE PLANT          - Cinematic video scroll documentary
     09 · THE NEXT CHAPTER          - Future growth & 4-button inquiry close
   =========================================================================== */

export default function CompanyPage() {
  const scope = useRef<HTMLDivElement>(null)
  useSectionReveal(scope)

  return (
    <PageShell>
      <div ref={scope}>
        {/* ── 01 · HERO ─────────────────────────────────────────────────── */}
        <PageHero
          eyebrow="01 · Established 1999 · Pakistan"
          lines={[
            { text: 'Gulf Fibre —' },
            { text: 'Since 1999', serif: true },
          ]}
          lede={`${VERIFIED.legalName} has manufactured synthetic polyester fibre in ${VERIFIED.country} for over 25 years, supplying spinning mills, wadding converters, and nonwoven manufacturers with uncompromising batch-to-batch consistency.`}
          meta={[
            { label: 'Established', value: String(VERIFIED.established) },
            { label: 'Heritage', value: '25+ Years' },
            { label: 'Annual capacity', value: VERIFIED.annualCapacity },
            { label: 'Accreditations', value: 'ISO · GRS · OEKO-TEX' },
          ]}
          bgVideo="/videos/company-hero.mp4"
        >
          <div style={{ display: 'flex', gap: '0.85rem', flexWrap: 'wrap', alignItems: 'center' }}>
            <Link className="btn-primary" href="/contact">
              Talk to the Export Desk
            </Link>
            <Link
              className="btn-secondary"
              href="/products"
              style={{
                textDecoration: 'none',
                color: '#FFFFFF',
                borderColor: 'rgba(255, 255, 255, 0.45)',
                background: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
              }}
            >
              View Fibre Catalog →
            </Link>
          </div>
        </PageHero>

        {/* ── 02 · WHO WE ARE ───────────────────────────────────────────── */}
        <section className="section-pad" data-sp-section style={{ background: 'var(--white)' }}>
          <div className="container">
            <div className="sp-anim" style={{ marginBottom: 'clamp(2rem, 4vh, 3rem)' }}>
              <SectionHead
                eyebrow="02 · Who We Are"
                title="A fibre manufacturer,"
                em="not a trading house"
                lede="Direct manufacturer of high-tenacity and recycled polyester staple fibres, operating dedicated extrusion and carding lines in Pakistan since 1999."
              />
            </div>

            <div
              className="sp-anim company-who-we-are-grid"
              style={{
                display: 'grid',
                gridTemplateColumns: '1.1fr 0.9fr',
                gap: 'clamp(2rem, 4vw, 3.5rem)',
                alignItems: 'stretch',
              }}
            >
              {/* Left Column: Specifications & Provenance */}
              <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <SpecRows
                  rows={[
                    { key: 'Legal Name', value: <strong>{VERIFIED.legalName}</strong> },
                    { key: 'Headquarters & Plant', value: <strong>{VERIFIED.country}</strong> },
                    { key: 'Founding Year', value: <strong>{String(VERIFIED.established)} (25+ Years)</strong> },
                    { key: 'Core Materials', value: <strong>Recycled & Staple Polyester Fibres</strong> },
                    { key: 'Registrations', value: <strong>{VERIFIED.certificationCount} Official Licenses</strong> },
                  ]}
                />
                <div style={{ marginTop: '1.75rem', display: 'flex', alignItems: 'center', gap: '1.25rem', flexWrap: 'wrap' }}>
                  <ArrowLink href="/quality">See verified registrations</ArrowLink>
                  <Provenance status="VERIFIED" />
                </div>
              </div>

              {/* Right Column: Industrial Scale & Supply Discipline Card */}
              <div
                style={{
                  background: 'var(--card-bg)',
                  border: '1px solid var(--border-light)',
                  borderRadius: '20px',
                  padding: 'clamp(1.75rem, 3vw, 2.25rem)',
                  boxShadow: '0 10px 30px rgba(10, 75, 184, 0.04)',
                }}
              >
                <h3
                  style={{
                    fontSize: '0.8125rem',
                    fontWeight: 800,
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                    color: 'var(--burg-primary)',
                    marginBottom: '1.75rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                  }}
                >
                  <span style={{ display: 'inline-block', width: '8px', height: '8px', borderRadius: '50%', background: 'var(--burg-primary)' }} />
                  Industrial Scale & Supply Discipline
                </h3>

                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '1.5rem 1.25rem',
                  }}
                >
                  <div>
                    <p style={{ fontSize: 'clamp(1.65rem, 2.5vw, 2.25rem)', fontWeight: 900, fontFamily: 'var(--font-sans)', color: 'var(--burg-primary)', lineHeight: 1, margin: '0 0 0.35rem' }}>
                      <Counter end={VERIFIED.annualCapacityValue} comma suffix=" T" />
                    </p>
                    <p style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--ink)', margin: '0 0 0.15rem' }}>
                      Annual Production
                    </p>
                    <span style={{ fontSize: '0.6875rem', color: 'var(--muted)', display: 'block' }}>Extruded & Processed</span>
                  </div>

                  <div>
                    <p style={{ fontSize: 'clamp(1.65rem, 2.5vw, 2.25rem)', fontWeight: 900, fontFamily: 'var(--font-sans)', color: 'var(--burg-primary)', lineHeight: 1, margin: '0 0 0.35rem' }}>
                      <Counter end={VERIFIED.customersValue} suffix="+" />
                    </p>
                    <p style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--ink)', margin: '0 0 0.15rem' }}>
                      Industrial Customers
                    </p>
                    <span style={{ fontSize: '0.6875rem', color: 'var(--muted)', display: 'block' }}>Spinning & Nonwovens</span>
                  </div>

                  {/* Full-width continuous divider line */}
                  <div style={{ gridColumn: '1 / -1', height: '1px', background: 'var(--border-light)', margin: '0.25rem 0' }} />

                  <div>
                    <p style={{ fontSize: 'clamp(1.65rem, 2.5vw, 2.25rem)', fontWeight: 900, fontFamily: 'var(--font-sans)', color: 'var(--burg-primary)', lineHeight: 1, margin: '0 0 0.35rem' }}>
                      <Counter end={VERIFIED.workforceValue} suffix="+" />
                    </p>
                    <p style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--ink)', margin: '0 0 0.15rem' }}>
                      Specialist Workforce
                    </p>
                    <span style={{ fontSize: '0.6875rem', color: 'var(--muted)', display: 'block' }}>Engineers & Operators</span>
                  </div>

                  <div>
                    <p style={{ fontSize: 'clamp(1.65rem, 2.5vw, 2.25rem)', fontWeight: 900, fontFamily: 'var(--font-sans)', color: 'var(--burg-primary)', lineHeight: 1, margin: '0 0 0.35rem' }}>
                      {VERIFIED.denierRange}
                    </p>
                    <p style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--ink)', margin: '0 0 0.15rem' }}>
                      Denier Range
                    </p>
                    <span style={{ fontSize: '0.6875rem', color: 'var(--muted)', display: 'block' }}>Solid & Conjugate Hollow</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── 03 · OUR PRODUCT PORTFOLIO ────────────────────────────────── */}
        <section className="section-pad" data-sp-section style={{ background: 'var(--bg-subtle, #F8FAFC)' }}>
          <div className="container">
            <div className="sp-anim">
              <SectionHead
                eyebrow="03 · Our Product Portfolio"
                title="High-level product"
                em="ecosystem"
                lede="Gulf Fibre manufactures three core synthetic material categories tailored for spinning mills, bedding manufacturers, and industrial nonwoven processors."
                link="/products"
                linkLabel="Explore Full Product Specifications"
                stacked
              />
            </div>

            <div
              className="sp-anim"
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: '1.5rem',
                marginTop: '1.5rem',
              }}
            >
              {/* Product 1: Staple & Hollow Fibre */}
              <div
                style={{
                  background: 'var(--card-bg)',
                  border: '1px solid var(--border-light)',
                  borderRadius: '20px',
                  padding: '2rem',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  boxShadow: '0 10px 30px rgba(10, 75, 184, 0.04)',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                }}
              >
                <div>
                  <span style={{ fontSize: '0.6875rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--burg-primary)', background: 'rgba(10, 75, 184, 0.08)', padding: '0.3rem 0.75rem', borderRadius: '9999px', display: 'inline-block', marginBottom: '1rem' }}>
                    01 · Core Spinning & Filling Fibres
                  </span>
                  <h3 style={{ fontSize: '1.35rem', fontWeight: 900, fontFamily: 'var(--font-sans)', textTransform: 'uppercase', color: 'var(--ink)', margin: '0 0 0.65rem' }}>
                    Staple & Hollow Fibre
                  </h3>
                  <p style={{ fontSize: '0.875rem', lineHeight: 1.6, color: 'var(--muted)', margin: '0 0 1.25rem' }}>
                    Polyester staple fibre (PSF) and conjugate hollow fibres engineered for high-speed yarn spinning, textile blending, and premium cushioning resilience.
                  </p>
                  <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 1.5rem', display: 'flex', flexDirection: 'column', gap: '0.45rem', fontSize: '0.8125rem', color: 'var(--ink)' }}>
                    <li>✔ <strong>1.5D to 15D</strong> Solid & Hollow conjugate deniers</li>
                    <li>✔ <strong>32mm to 64mm</strong> Cut length options</li>
                    <li>✔ Siliconized, Non-Siliconized & Dope Dyed</li>
                  </ul>
                </div>
                <Link href="/products#psf-regenerated" className="btn-secondary" style={{ textAlign: 'center', justifyContent: 'center', width: '100%' }}>
                  Staple & Hollow Specs →
                </Link>
              </div>

              {/* Product 2: Thermal-Bonded Wadding */}
              <div
                style={{
                  background: 'var(--card-bg)',
                  border: '1px solid var(--border-light)',
                  borderRadius: '20px',
                  padding: '2rem',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  boxShadow: '0 10px 30px rgba(10, 75, 184, 0.04)',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                }}
              >
                <div>
                  <span style={{ fontSize: '0.6875rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--burg-primary)', background: 'rgba(10, 75, 184, 0.08)', padding: '0.3rem 0.75rem', borderRadius: '9999px', display: 'inline-block', marginBottom: '1rem' }}>
                    02 · Thermal Insulation
                  </span>
                  <h3 style={{ fontSize: '1.35rem', fontWeight: 900, fontFamily: 'var(--font-sans)', textTransform: 'uppercase', color: 'var(--ink)', margin: '0 0 0.65rem' }}>
                    Thermal-Bonded Wadding
                  </h3>
                  <p style={{ fontSize: '0.875rem', lineHeight: 1.6, color: 'var(--muted)', margin: '0 0 1.25rem' }}>
                    High-loft thermal-bonded polyester wadding sheets and rolls engineered for bedding, upholstery, and garment thermal insulation.
                  </p>
                  <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 1.5rem', display: 'flex', flexDirection: 'column', gap: '0.45rem', fontSize: '0.8125rem', color: 'var(--ink)' }}>
                    <li>✔ <strong>High-loft batting & roll wadding</strong></li>
                    <li>✔ <strong>100 to 1000+ GSM</strong> customizable weights</li>
                    <li>✔ Pillows, quilts, mattresses & garment fill</li>
                  </ul>
                </div>
                <Link href="/products#wadding" className="btn-secondary" style={{ textAlign: 'center', justifyContent: 'center', width: '100%' }}>
                  Wadding Specs →
                </Link>
              </div>

              {/* Product 3: Felts & Nonwovens */}
              <div
                style={{
                  background: 'var(--card-bg)',
                  border: '1px solid var(--border-light)',
                  borderRadius: '20px',
                  padding: '2rem',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  boxShadow: '0 10px 30px rgba(10, 75, 184, 0.04)',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                }}
              >
                <div>
                  <span style={{ fontSize: '0.6875rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--burg-primary)', background: 'rgba(10, 75, 184, 0.08)', padding: '0.3rem 0.75rem', borderRadius: '9999px', display: 'inline-block', marginBottom: '1rem' }}>
                    03 · Industrial Nonwovens
                  </span>
                  <h3 style={{ fontSize: '1.35rem', fontWeight: 900, fontFamily: 'var(--font-sans)', textTransform: 'uppercase', color: 'var(--ink)', margin: '0 0 0.65rem' }}>
                    Felts & Nonwovens
                  </h3>
                  <p style={{ fontSize: '0.875rem', lineHeight: 1.6, color: 'var(--muted)', margin: '0 0 1.25rem' }}>
                    High-density needle-punched felts, stitch-bonded fabrics, and fusion interlinings engineered for structural filtration, footwear, and automotive use.
                  </p>
                  <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 1.5rem', display: 'flex', flexDirection: 'column', gap: '0.45rem', fontSize: '0.8125rem', color: 'var(--ink)' }}>
                    <li>✔ <strong>Needle punch & Stitch bonding</strong></li>
                    <li>✔ Geotextile filtration & mattress felts</li>
                    <li>✔ Automotive acoustic & thermal barriers</li>
                  </ul>
                </div>
                <Link href="/products#felt" className="btn-secondary" style={{ textAlign: 'center', justifyContent: 'center', width: '100%' }}>
                  Nonwovens Specs →
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ── 04 · 25 YEARS OF HISTORY ──────────────────────────────────── */}
        <section className="section-pad sp-dark" data-sp-section>
          <div className="container">
            <div className="sp-anim">
              <SectionHead
                eyebrow="04 · 25 Years of History"
                title="25 Years of manufacturing heritage,"
                em="1999 to Present"
                lede="From our founding staple fibre plant in 1999 to today's 15,000+ T automated production capacity, explore the key milestones and expansions across a quarter-century of industrial operations."
                stacked
                dark
              />
            </div>
            <div className="sp-anim">
              <TimelineChapter />
            </div>
          </div>
        </section>

        {/* ── 05 · FOUNDER'S VISION ─────────────────────────────────────── */}
        <section className="section-pad" data-sp-section style={{ background: 'var(--white)' }}>
          <div className="container">
            <div className="sp-anim">
              <SectionHead
                eyebrow="05 · Founder's Vision"
                title="Leadership &"
                em="Executive Vision"
                lede="A signed message from Founder & Managing Director Muhammad Iftikhar on 25+ years of engineering discipline, technical innovation, and customer-first manufacturing."
                stacked
              />
            </div>
            <div className="sp-anim">
              <DirectorFeature />
            </div>
          </div>
        </section>

        {/* ── 06 · COMPANY ORGANIZATION ─────────────────────────────────── */}
        <section className="section-pad" data-sp-section style={{ background: 'var(--bg-subtle, #F8FAFC)' }}>
          <div className="container">
            <div className="sp-anim">
              <SectionHead
                eyebrow="06 · Company Organization"
                title="Interactive organization"
                em="tree & leadership"
                lede="An interactive visualization of Gulf Fibre's corporate hierarchy - from founding executive governance to specialized technical product sales departments. Click any circular profile node to view credentials, material domains, and direct contact details."
              />
            </div>
            <div className="sp-anim">
              <CompanyOrgTree />
            </div>
          </div>
        </section>

        {/* ── 07 · CERTIFICATIONS & REGISTRATIONS ───────────────────────── */}
        <section className="section-pad" data-sp-section style={{ background: 'var(--white)' }}>
          <div className="container">
            <div className="sp-anim">
              <SectionHead
                eyebrow="07 · Certifications & Registrations"
                title="Certified by"
                em="document"
                lede="Six official certificate documents, each verified with official statutory documentation (ISO 9001:2015, GRS Scope Certificate, GRS Site Appendix, OEKO-TEX Standard 100, EPA Punjab Approval, and LCCI). Hover over any certificate on the wall to zoom in and verify details, or click to examine the full-resolution scan."
                link="/quality"
                linkLabel="Read Quality Management Manual"
                stacked
              />
            </div>
            <div className="sp-anim">
              <CertificationGallery />
            </div>
          </div>
        </section>

        {/* ── 08 · INSIDE THE PLANT ─────────────────────────────────────── */}
        <section className="section-pad" data-sp-section style={{ background: 'var(--bg-subtle, #F8FAFC)' }}>
          <div className="container">
            <div className="sp-anim">
              <SectionHead
                eyebrow="08 · Inside The Plant"
                title="See where Gulf Fibre"
                em="operates"
                lede="Explore authentic footage of our 33-KM Multan Road, Lahore production facility and live high-pressure extrusion lines in action."
                stacked
              />
            </div>
            <div className="sp-anim">
              <CompanyVideoScrollStory />
            </div>
          </div>
        </section>

        {/* ── 09 · THE NEXT CHAPTER & DIRECT INQUIRY CLOSE ──────────────── */}
        <section className="section-pad sp-dark" data-sp-section>
          <div className="container" style={{ textAlign: 'center', maxWidth: '840px', margin: '0 auto' }}>
            <div className="sp-anim" style={{ marginBottom: '1.25rem' }}>
              <span
                style={{
                  fontSize: '0.75rem',
                  fontWeight: 800,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  color: 'var(--burg-bright)',
                  background: 'rgba(10, 75, 184, 0.25)',
                  padding: '0.35rem 0.95rem',
                  borderRadius: '9999px',
                  display: 'inline-block',
                  marginBottom: '1.5rem',
                }}
              >
                09 · The Next Chapter & Future Vision
              </span>
              <h2 className="h-section" style={{ margin: '0 auto', maxWidth: '24ch' }}>
                Judge us on a bale,
                <br />
                <em>not on a brochure.</em>
              </h2>
            </div>

            <p className="sp-lede sp-anim" style={{ margin: '0 auto 2.5rem', maxWidth: '56ch', color: '#94A3B8' }}>
              Send a technical specification and a sample request. Everything else on this page is only context for that conversation.
            </p>

            {/* 4 Direct Action Trigger Buttons */}
            <div className="sp-anim sp-cta-actions">
              <Link
                className="btn-primary"
                href="/contact"
                style={{
                  width: '100%',
                  justifyContent: 'center',
                  padding: '0.85rem 1rem',
                  fontSize: '0.8125rem',
                  letterSpacing: '0.04em',
                  borderRadius: '10px',
                  textAlign: 'center',
                }}
              >
                📦 Request Samples
              </Link>
              <Link
                href="/quality"
                style={{
                  width: '100%',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '0.85rem 1rem',
                  fontSize: '0.8125rem',
                  fontWeight: 800,
                  fontFamily: 'var(--font-sans)',
                  letterSpacing: '0.04em',
                  textTransform: 'uppercase',
                  color: '#FFFFFF',
                  background: 'rgba(255, 255, 255, 0.08)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: '10px',
                  textDecoration: 'none',
                  transition: 'all 0.2s ease',
                  textAlign: 'center',
                }}
              >
                📊 Quality Reports
              </Link>
              <Link
                href="/contact"
                style={{
                  width: '100%',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '0.85rem 1rem',
                  fontSize: '0.8125rem',
                  fontWeight: 800,
                  fontFamily: 'var(--font-sans)',
                  letterSpacing: '0.04em',
                  textTransform: 'uppercase',
                  color: '#FFFFFF',
                  background: 'rgba(255, 255, 255, 0.08)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: '10px',
                  textDecoration: 'none',
                  transition: 'all 0.2s ease',
                  textAlign: 'center',
                }}
              >
                💼 Direct RFQ
              </Link>
              <Link
                href="/contact"
                style={{
                  width: '100%',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '0.85rem 1rem',
                  fontSize: '0.8125rem',
                  fontWeight: 800,
                  fontFamily: 'var(--font-sans)',
                  letterSpacing: '0.04em',
                  textTransform: 'uppercase',
                  color: '#FFFFFF',
                  background: 'rgba(255, 255, 255, 0.08)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: '10px',
                  textDecoration: 'none',
                  transition: 'all 0.2s ease',
                  textAlign: 'center',
                }}
              >
                📍 Plant Location
              </Link>
            </div>
          </div>
        </section>
      </div>
      <style>{`
        @media (max-width: 992px) {
          .company-who-we-are-grid {
            grid-template-columns: 1fr !important;
            gap: 2.25rem !important;
          }
        }
      `}</style>
    </PageShell>
  )
}
