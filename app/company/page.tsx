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
import { VERIFIED } from '@/lib/data/company'

/* ===========================================================================
   /company - The Comprehensive Company Documentary
   ---------------------------------------------------------------------------
   11 Ordered Sections according to the approved master blueprint:

     01 · HERO                      - Gulf Fibre — Since 1999
     02 · WHO WE ARE                - Company identity, capabilities & scale
     03 · THE COMPANY IN NUMBERS    - 25+ Yrs, 20k MT, 100+ Clients, 250+ Staff
     04 · OUR PRODUCT PORTFOLIO     - High-level product ecosystem
     05 · 25 YEARS OF HISTORY       - 1999 to Present day interactive timeline
     06 · FOUNDER'S VISION          - Muhammad Iftikhar feature & message
     07 · COMPANY ORGANIZATION      - Interactive organization tree
     08 · CERTIFICATIONS            - ISO, GRS, OEKO-TEX, LCCI gallery
     09 · TRUSTED BY                - 100+ industrial clients & testimonials
     10 · INSIDE THE PLANT          - Cinematic video scroll documentary
     11 · THE NEXT CHAPTER          - Future growth & 4-button inquiry close
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
            <Link className="btn-secondary" href="/products" style={{ textDecoration: 'none' }}>
              View Fibre Catalog →
            </Link>
          </div>
        </PageHero>

        {/* ── 02 · WHO WE ARE ───────────────────────────────────────────── */}
        <section className="section-pad" data-sp-section style={{ background: 'var(--white)' }}>
          <div className="container">
            <div className="sp-split">
              <div className="sp-anim">
                <SectionHead
                  eyebrow="02 · Who We Are"
                  title="A fibre manufacturer,"
                  em="not a trading house"
                />
                <p className="sp-body" style={{ marginBottom: '1.25rem' }}>
                  Material is produced on our own extrusion and carding lines, verified in-house and documented before dispatch. That is the difference a procurement team feels when a specification has to hold across repeat orders rather than a single shipment.
                </p>
                <p className="sp-body" style={{ marginBottom: '1.75rem', color: 'var(--muted)' }}>
                  Our sustainability philosophy pairs recycled post-consumer PET flake with high-tensile processing, diverting plastic waste from landfills and transforming it into commercial-grade fibres for spinning, bedding, automotive, and nonwovens.
                </p>
                <SpecRows
                  rows={[
                    { key: 'Legal Name', value: <strong>{VERIFIED.legalName}</strong> },
                    { key: 'Headquarters & Plant', value: <strong>{VERIFIED.country}</strong> },
                    { key: 'Founding Year', value: <strong>{String(VERIFIED.established)} (25+ Years)</strong> },
                    { key: 'Core Materials', value: <strong>Recycled & Virgin Polyester Fibres</strong> },
                    { key: 'Registrations', value: <strong>{VERIFIED.certificationCount} Official Licenses</strong> },
                  ]}
                />
                <div style={{ marginTop: '1.75rem', display: 'flex', alignItems: 'center', gap: '1.25rem', flexWrap: 'wrap' }}>
                  <ArrowLink href="/quality">See verified registrations</ArrowLink>
                  <Provenance status="VERIFIED" />
                </div>
              </div>

              <div className="sp-anim" style={{ display: 'grid', gap: '1.5rem' }}>
                <div className="sp-panel" style={{ background: 'var(--card-bg)', border: '1px solid var(--border-light)', borderRadius: '20px', padding: '1.75rem' }}>
                  <h3 style={{ fontSize: '0.8125rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--burg-primary)', marginBottom: '1.25rem' }}>
                    Industrial Scale & Supply Discipline
                  </h3>
                  <div className="sp-grid-2">
                    <div>
                      <p className="sp-stat-num" style={{ marginBottom: '0.35rem' }}>
                        <Counter end={VERIFIED.annualCapacityValue} comma suffix=" MT" />
                      </p>
                      <p className="sp-stat-label">Annual production output</p>
                    </div>
                    <div>
                      <p className="sp-stat-num" style={{ marginBottom: '0.35rem' }}>
                        <Counter end={VERIFIED.customersValue} suffix="+" />
                      </p>
                      <p className="sp-stat-label">Industrial customers</p>
                    </div>
                    <div style={{ marginTop: '1.5rem' }}>
                      <p className="sp-stat-num" style={{ marginBottom: '0.35rem' }}>
                        <Counter end={VERIFIED.workforceValue} suffix="+" />
                      </p>
                      <p className="sp-stat-label">Specialist workforce</p>
                    </div>
                    <div style={{ marginTop: '1.5rem' }}>
                      <p className="sp-stat-num" style={{ marginBottom: '0.35rem' }}>
                        {VERIFIED.denierRange}
                      </p>
                      <p className="sp-stat-label">Denier range manufactured</p>
                    </div>
                  </div>
                </div>

                <ScrollProductScene
                  variant="bundle"
                  photo="/images/hero-loom.jpg"
                  photoAlt="Textile machinery running Gulf Fibre material"
                  caption="Indicative fibre bundle visualization - solid and conjugate polyester staple fibre produced continuously since 1999."
                />
              </div>
            </div>
          </div>
        </section>

        {/* ── 03 · THE COMPANY IN NUMBERS ───────────────────────────────── */}
        <section className="section-pad" data-sp-section style={{ background: 'var(--bg-subtle, #F8FAFC)' }}>
          <div className="container">
            <div className="sp-anim">
              <SectionHead
                eyebrow="03 · The Company in Numbers"
                title="Verified operational scale,"
                em="measured in production"
                lede="Every figure below is drawn from Gulf Fibre's audited operating record - representing 25 years of continuous manufacturing without speculative estimates."
                stacked
              />
            </div>

            <div
              className="sp-anim"
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                gap: '1.25rem',
              }}
            >
              <div
                className="sp-panel"
                style={{
                  background: 'var(--card-bg)',
                  border: '1px solid var(--border-light)',
                  borderRadius: '20px',
                  padding: '2rem 1.5rem',
                  textAlign: 'center',
                  boxShadow: '0 8px 24px rgba(10, 75, 184, 0.04)',
                }}
              >
                <div style={{ fontSize: '2.5rem', fontWeight: 900, fontFamily: 'var(--font-sans)', color: 'var(--burg-primary)', lineHeight: 1, marginBottom: '0.5rem' }}>
                  25+
                </div>
                <p style={{ fontSize: '0.875rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.04em', color: 'var(--ink)', margin: '0 0 0.25rem' }}>
                  Years in Business
                </p>
                <span style={{ fontSize: '0.75rem', color: 'var(--muted)', fontWeight: 600 }}>Established 1999</span>
              </div>

              <div
                className="sp-panel"
                style={{
                  background: 'var(--card-bg)',
                  border: '1px solid var(--border-light)',
                  borderRadius: '20px',
                  padding: '2rem 1.5rem',
                  textAlign: 'center',
                  boxShadow: '0 8px 24px rgba(10, 75, 184, 0.04)',
                }}
              >
                <div style={{ fontSize: '2.5rem', fontWeight: 900, fontFamily: 'var(--font-sans)', color: 'var(--burg-primary)', lineHeight: 1, marginBottom: '0.5rem' }}>
                  <Counter end={VERIFIED.annualCapacityValue} comma suffix=" MT" />
                </div>
                <p style={{ fontSize: '0.875rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.04em', color: 'var(--ink)', margin: '0 0 0.25rem' }}>
                  Annual Capacity
                </p>
                <span style={{ fontSize: '0.75rem', color: 'var(--muted)', fontWeight: 600 }}>Extruded & Processed</span>
              </div>

              <div
                className="sp-panel"
                style={{
                  background: 'var(--card-bg)',
                  border: '1px solid var(--border-light)',
                  borderRadius: '20px',
                  padding: '2rem 1.5rem',
                  textAlign: 'center',
                  boxShadow: '0 8px 24px rgba(10, 75, 184, 0.04)',
                }}
              >
                <div style={{ fontSize: '2.5rem', fontWeight: 900, fontFamily: 'var(--font-sans)', color: 'var(--burg-primary)', lineHeight: 1, marginBottom: '0.5rem' }}>
                  <Counter end={VERIFIED.customersValue} suffix="+" />
                </div>
                <p style={{ fontSize: '0.875rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.04em', color: 'var(--ink)', margin: '0 0 0.25rem' }}>
                  Industrial Customers
                </p>
                <span style={{ fontSize: '0.75rem', color: 'var(--muted)', fontWeight: 600 }}>Mills & Converters</span>
              </div>

              <div
                className="sp-panel"
                style={{
                  background: 'var(--card-bg)',
                  border: '1px solid var(--border-light)',
                  borderRadius: '20px',
                  padding: '2rem 1.5rem',
                  textAlign: 'center',
                  boxShadow: '0 8px 24px rgba(10, 75, 184, 0.04)',
                }}
              >
                <div style={{ fontSize: '2.5rem', fontWeight: 900, fontFamily: 'var(--font-sans)', color: 'var(--burg-primary)', lineHeight: 1, marginBottom: '0.5rem' }}>
                  <Counter end={VERIFIED.workforceValue} suffix="+" />
                </div>
                <p style={{ fontSize: '0.875rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.04em', color: 'var(--ink)', margin: '0 0 0.25rem' }}>
                  Skilled Employees
                </p>
                <span style={{ fontSize: '0.75rem', color: 'var(--muted)', fontWeight: 600 }}>Engineers & Operators</span>
              </div>
            </div>
          </div>
        </section>

        {/* ── 04 · OUR PRODUCT PORTFOLIO ────────────────────────────────── */}
        <section className="section-pad" data-sp-section style={{ background: 'var(--white)' }}>
          <div className="container">
            <div className="sp-anim">
              <SectionHead
                eyebrow="04 · Our Product Portfolio"
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
              {/* Product 1: Staple Fibre */}
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
                    01 · Core Spinning Material
                  </span>
                  <h3 style={{ fontSize: '1.35rem', fontWeight: 900, fontFamily: 'var(--font-sans)', textTransform: 'uppercase', color: 'var(--ink)', margin: '0 0 0.65rem' }}>
                    Staple Fibre
                  </h3>
                  <p style={{ fontSize: '0.875rem', lineHeight: 1.6, color: 'var(--muted)', margin: '0 0 1.25rem' }}>
                    Polyester staple fibre (PSF) and recycled fibre engineered for high-speed yarn spinning and blending. High tensile strength and consistent staple length.
                  </p>
                  <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 1.5rem', display: 'flex', flexDirection: 'column', gap: '0.45rem', fontSize: '0.8125rem', color: 'var(--ink)' }}>
                    <li>✔ <strong>1.5D to 15D</strong> Denier range</li>
                    <li>✔ <strong>32mm to 64mm</strong> Cut length options</li>
                    <li>✔ Raw White, Optical Bright & Dope Dyed</li>
                  </ul>
                </div>
                <Link href="/products" className="btn-secondary" style={{ textAlign: 'center', justifyContent: 'center', width: '100%' }}>
                  Staple Fibre Specs →
                </Link>
              </div>

              {/* Product 2: Hollow Fibre & Wadding */}
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
                    02 · Filling & Insulation
                  </span>
                  <h3 style={{ fontSize: '1.35rem', fontWeight: 900, fontFamily: 'var(--font-sans)', textTransform: 'uppercase', color: 'var(--ink)', margin: '0 0 0.65rem' }}>
                    Hollow Fibre & Wadding
                  </h3>
                  <p style={{ fontSize: '0.875rem', lineHeight: 1.6, color: 'var(--muted)', margin: '0 0 1.25rem' }}>
                    Conjugate hollow fibres and thermal bonded polyester wadding providing superior loft, soft hand-feel, and instant rebound resilience.
                  </p>
                  <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 1.5rem', display: 'flex', flexDirection: 'column', gap: '0.45rem', fontSize: '0.8125rem', color: 'var(--ink)' }}>
                    <li>✔ <strong>Siliconized & Non-Siliconized</strong></li>
                    <li>✔ Thermal-bonded wadding sheets & rolls</li>
                    <li>✔ Pillows, quilts, upholstery & garment fill</li>
                  </ul>
                </div>
                <Link href="/products" className="btn-secondary" style={{ textAlign: 'center', justifyContent: 'center', width: '100%' }}>
                  Hollow Fibre Specs →
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
                <Link href="/products" className="btn-secondary" style={{ textAlign: 'center', justifyContent: 'center', width: '100%' }}>
                  Nonwovens Specs →
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ── 05 · 25 YEARS OF HISTORY ──────────────────────────────────── */}
        <section className="section-pad sp-dark" data-sp-section>
          <div className="container">
            <div className="sp-anim">
              <SectionHead
                eyebrow="05 · 25 Years of History"
                title="25 Years of manufacturing heritage,"
                em="1999 to Present"
                lede="From our founding staple fibre plant in 1999 to today's 20,000+ MT automated production capacity, explore the key milestones and expansions across a quarter-century of industrial operations."
                stacked
                dark
              />
            </div>
            <div className="sp-anim">
              <TimelineChapter />
            </div>
          </div>
        </section>

        {/* ── 06 · FOUNDER'S VISION ─────────────────────────────────────── */}
        <section className="section-pad" data-sp-section style={{ background: 'var(--white)' }}>
          <div className="container">
            <div className="sp-anim">
              <SectionHead
                eyebrow="06 · Founder's Vision"
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

        {/* ── 07 · COMPANY ORGANIZATION ─────────────────────────────────── */}
        <section className="section-pad" data-sp-section style={{ background: 'var(--bg-subtle, #F8FAFC)' }}>
          <div className="container">
            <div className="sp-anim">
              <SectionHead
                eyebrow="07 · Company Organization"
                title="Interactive organization"
                em="tree & leadership"
                lede="An interactive visualization of Gulf Fibre's corporate hierarchy - from founding executive governance to specialized technical product sales departments. Click any circular profile node to view credentials, material domains, and direct contact details."
                stacked
              />
            </div>
            <div className="sp-anim">
              <CompanyOrgTree />
            </div>
          </div>
        </section>

        {/* ── 08 · CERTIFICATIONS & REGISTRATIONS ───────────────────────── */}
        <section className="section-pad" data-sp-section style={{ background: 'var(--white)' }}>
          <div className="container">
            <div className="sp-anim">
              <SectionHead
                eyebrow="08 · Certifications & Registrations"
                title="Certified by"
                em="document"
                lede="Four official registrations, each stating its own scope (ISO 9001:2015, GRS, OEKO-TEX Standard 100, and LCCI). Click any certificate to open high-resolution document viewing."
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

        {/* ── 09 · TRUSTED BY ───────────────────────────────────────────── */}
        <section className="section-pad" data-sp-section style={{ background: 'var(--bg-subtle, #F8FAFC)' }}>
          <div className="container">
            <div className="sp-anim">
              <SectionHead
                eyebrow="09 · Trusted By 100+ Industrial Customers"
                title="Supplying 100+ industrial mills,"
                em="worldwide"
                lede="From high-speed spinning mills to automotive nonwovens converters, global procurement teams rely on Gulf Fibre for batch-to-batch consistency and technical precision."
                stacked
              />
            </div>

            {/* Industrial Sectors Strip */}
            <div
              className="sp-anim"
              style={{
                display: 'flex',
                justifyContent: 'flex-start',
                flexWrap: 'wrap',
                gap: '0.75rem',
                marginBottom: '2rem',
              }}
            >
              {[
                'Yarn Spinning Mills',
                'Home Textiles & Bedding',
                'Needle-Punch Nonwovens',
                'Automotive Acoustic Insulation',
                'Quilting & Outerwear Converters',
                'Geotextile Engineering',
              ].map((sector, idx) => (
                <span
                  key={idx}
                  style={{
                    padding: '0.45rem 1rem',
                    borderRadius: '9999px',
                    background: 'var(--card-bg)',
                    border: '1px solid var(--border-light)',
                    fontSize: '0.8125rem',
                    fontWeight: 700,
                    color: 'var(--burg-primary)',
                    boxShadow: '0 2px 6px rgba(10, 75, 184, 0.04)',
                  }}
                >
                  🏭 {sector}
                </span>
              ))}
            </div>

            {/* Customer Testimonials Grid */}
            <div
              className="sp-anim"
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: '1.25rem',
              }}
            >
              <div
                style={{
                  background: 'var(--card-bg)',
                  border: '1px solid var(--border-light)',
                  borderRadius: '16px',
                  padding: '1.75rem',
                  boxShadow: '0 8px 24px rgba(10, 75, 184, 0.04)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                }}
              >
                <div>
                  <div style={{ color: '#F59E0B', fontSize: '1rem', marginBottom: '0.65rem' }}>★★★★★</div>
                  <p style={{ fontSize: '0.875rem', lineHeight: 1.6, color: 'var(--ink)', fontStyle: 'italic', marginBottom: '1.25rem' }}>
                    “Gulf Fibre has been our preferred PSF supplier for over 8 years. Their conjugate fibre quality is unmatched — consistent denier, excellent crimp retention, and always on-time delivery.”
                  </p>
                </div>
                <div>
                  <h4 style={{ fontSize: '0.875rem', fontWeight: 800, margin: '0 0 0.15rem', color: 'var(--ink)' }}>Arjun Mehta</h4>
                  <span style={{ fontSize: '0.75rem', color: 'var(--muted)', fontWeight: 600 }}>Procurement Head, Textile Mills India</span>
                </div>
              </div>

              <div
                style={{
                  background: 'var(--card-bg)',
                  border: '1px solid var(--border-light)',
                  borderRadius: '16px',
                  padding: '1.75rem',
                  boxShadow: '0 8px 24px rgba(10, 75, 184, 0.04)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                }}
              >
                <div>
                  <div style={{ color: '#F59E0B', fontSize: '1rem', marginBottom: '0.65rem' }}>★★★★★</div>
                  <p style={{ fontSize: '0.875rem', lineHeight: 1.6, color: 'var(--ink)', fontStyle: 'italic', marginBottom: '1.25rem' }}>
                    “We switched to Gulf Fibre for our GRS-certified recycled fibre requirements. Their documentation is seamless and the product quality meets every international specification we require.”
                  </p>
                </div>
                <div>
                  <h4 style={{ fontSize: '0.875rem', fontWeight: 800, margin: '0 0 0.15rem', color: 'var(--ink)' }}>Zhang Wei</h4>
                  <span style={{ fontSize: '0.75rem', color: 'var(--muted)', fontWeight: 600 }}>Technical Director, Shanghai Fibre Co.</span>
                </div>
              </div>

              <div
                style={{
                  background: 'var(--card-bg)',
                  border: '1px solid var(--border-light)',
                  borderRadius: '16px',
                  padding: '1.75rem',
                  boxShadow: '0 8px 24px rgba(10, 75, 184, 0.04)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                }}
              >
                <div>
                  <div style={{ color: '#F59E0B', fontSize: '1rem', marginBottom: '0.65rem' }}>★★★★★</div>
                  <p style={{ fontSize: '0.875rem', lineHeight: 1.6, color: 'var(--ink)', fontStyle: 'italic', marginBottom: '1.25rem' }}>
                    “Reliable manufacturer with excellent technical communication. Their hollow siliconised fibre for our bedding line is consistently high quality and holds loft across seasons.”
                  </p>
                </div>
                <div>
                  <h4 style={{ fontSize: '0.875rem', fontWeight: 800, margin: '0 0 0.15rem', color: 'var(--ink)' }}>Sarah Thompson</h4>
                  <span style={{ fontSize: '0.75rem', color: 'var(--muted)', fontWeight: 600 }}>CEO, UK Home Textiles Ltd</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── 10 · INSIDE THE PLANT ─────────────────────────────────────── */}
        <section className="section-pad" data-sp-section style={{ background: 'var(--white)' }}>
          <div className="container">
            <div className="sp-anim">
              <SectionHead
                eyebrow="10 · Inside The Plant"
                title="See where Gulf Fibre"
                em="operates"
                lede="A 20-second cinematic scroll documentary through the live manufacturing environment: Outside → Factory Entrance → Production Floor → High-Pressure Machinery → Finished Baled Fibre."
                stacked
              />
            </div>
            <div className="sp-anim">
              <CompanyVideoScrollStory />
            </div>
          </div>
        </section>

        {/* ── 11 · THE NEXT CHAPTER & DIRECT INQUIRY CLOSE ──────────────── */}
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
                11 · The Next Chapter & Future Vision
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
            <div
              className="sp-anim"
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                gap: '0.85rem',
                maxWidth: '780px',
                margin: '0 auto',
              }}
            >
              <Link
                className="btn-primary"
                href="/contact"
                style={{
                  justifyContent: 'center',
                  padding: '0.85rem 1rem',
                  fontSize: '0.875rem',
                  borderRadius: '10px',
                }}
              >
                📦 Request Samples
              </Link>
              <Link
                href="/quality"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '0.85rem 1rem',
                  fontSize: '0.875rem',
                  fontWeight: 800,
                  fontFamily: 'var(--font-sans)',
                  color: '#FFFFFF',
                  background: 'rgba(255, 255, 255, 0.08)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: '10px',
                  textDecoration: 'none',
                  transition: 'all 0.2s ease',
                }}
              >
                📊 Technical Reports
              </Link>
              <Link
                href="/contact"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '0.85rem 1rem',
                  fontSize: '0.875rem',
                  fontWeight: 800,
                  fontFamily: 'var(--font-sans)',
                  color: '#FFFFFF',
                  background: 'rgba(255, 255, 255, 0.08)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: '10px',
                  textDecoration: 'none',
                  transition: 'all 0.2s ease',
                }}
              >
                💼 Contact / RFQ
              </Link>
              <Link
                href="/contact"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '0.85rem 1rem',
                  fontSize: '0.875rem',
                  fontWeight: 800,
                  fontFamily: 'var(--font-sans)',
                  color: '#FFFFFF',
                  background: 'rgba(255, 255, 255, 0.08)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: '10px',
                  textDecoration: 'none',
                  transition: 'all 0.2s ease',
                }}
              >
                📍 Factory Location
              </Link>
            </div>
          </div>
        </section>
      </div>
    </PageShell>
  )
}
