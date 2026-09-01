'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useRef } from 'react'
import { PageHero } from '@/components/subpages/PageHero'
import { PageShell } from '@/components/subpages/PageShell'
import { SectionHead, SpecRows, Provenance } from '@/components/subpages/Primitives'
import { useSectionReveal } from '@/components/subpages/useSectionReveal'
import { COMMERCIAL_TERMS, VERIFIED } from '@/lib/data/company'

export default function TermsAndCopyrightPage() {
  const scope = useRef<HTMLDivElement>(null)
  useSectionReveal(scope)

  const currentYear = new Date().getFullYear()

  return (
    <PageShell>
      <div ref={scope}>
        {/* ── Page Hero ────────────────────────────────────────────────── */}
        <PageHero
          eyebrow="Governance, Supply & Intellectual Property"
          lines={[
            { text: 'Commercial Terms &' },
            { text: 'Copyright', serif: true },
            { text: 'Framework' },
          ]}
          lede="The legal and operational terms governing purchase contracts, specification tolerances, freight logistics, and intellectual property protections for Gulf Fibre Company (PVT) Limited."
          meta={[
            { label: 'Established', value: String(VERIFIED.established) },
            { label: 'Legal entity', value: 'PVT Limited' },
            { label: 'Quality audit', value: 'ISO 9001:2015' },
            { label: 'Recycled standard', value: 'GRS 4.0 Scope' },
          ]}
          aside={
            <Image
              src="/images/Gallery/18.jpeg"
              alt="Administration and corporate office at the Gulf Fibre manufacturing facility"
              fill
              priority
              sizes="(max-width: 992px) 100vw, 48vw"
              style={{ objectFit: 'cover' }}
            />
          }
        >
          <Link className="btn-primary" href="/contact">
            Commercial enquiry
          </Link>
        </PageHero>

        {/* ── Section 01: Commercial Supply Terms ──────────────────────── */}
        <section className="section-pad" data-sp-section style={{ background: 'var(--white)' }}>
          <div className="container">
            <div className="sp-anim">
              <SectionHead
                eyebrow="Commercial Supply"
                title="Specification governance &"
                em="orders"
                lede="Every consignment leaving the Gulf Fibre plant is bound by written technical specifications, agreed tolerances, and pre-shipment quality verification."
              />
            </div>

            <div className="sp-anim" style={{ marginTop: '2.5rem' }}>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 420px), 1fr))',
                  gap: 'clamp(1.5rem, 2.5vw, 2.5rem)',
                  alignItems: 'stretch',
                }}
              >
                <div
                  className="sp-card"
                  style={{
                    padding: 'clamp(1.75rem, 3vw, 2.5rem)',
                    background: 'var(--bg-light)',
                    borderRadius: '16px',
                    border: '1px solid var(--border-light)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                  }}
                >
                  <div>
                    <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--burg-primary)', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
                      Clause 01
                    </span>
                    <h3 style={{ fontFamily: 'var(--font-sans)', fontSize: '1.25rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.02em', margin: '0.5rem 0 1rem', color: 'var(--ink)' }}>
                      Quotations & Contracts
                    </h3>
                    <p className="sp-body" style={{ marginBottom: '1rem' }}>
                      All formal price quotations, proforma invoices, and contract commitments are issued in writing by authorized company management. Quotations reflect prevailing polymer raw material indices and energy tariffs at the time of issuance and remain valid for the period explicitly stipulated on the commercial document.
                    </p>
                    <p className="sp-body">
                      Orders become legally binding upon written purchase order confirmation and settlement of agreed advance or letter of credit (L/C) arrangements.
                    </p>
                  </div>
                </div>

                <div
                  className="sp-card"
                  style={{
                    padding: 'clamp(1.75rem, 3vw, 2.5rem)',
                    background: 'var(--bg-light)',
                    borderRadius: '16px',
                    border: '1px solid var(--border-light)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                  }}
                >
                  <div>
                    <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--burg-primary)', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
                      Clause 02
                    </span>
                    <h3 style={{ fontFamily: 'var(--font-sans)', fontSize: '1.25rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.02em', margin: '0.5rem 0 1rem', color: 'var(--ink)' }}>
                      Technical Tolerances
                    </h3>
                    <p className="sp-body" style={{ marginBottom: '1rem' }}>
                      Fibre specifications across the <strong>{VERIFIED.denierRange}</strong> range (linear density, staple cut length, crimp frequency, tensile strength, and oil pick-up / spin finish) adhere to international textile manufacturing standards (ASTM / ISO).
                    </p>
                    <p className="sp-body">
                      Custom tailored parameters requested by client spinning mills or nonwoven converters are documented in the mutual technical data sheet (TDS) accompanying the supply agreement.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Standing Terms Table */}
            <div className="sp-anim" style={{ marginTop: '3.5rem' }}>
              <div
                style={{
                  background: 'var(--bg-light)',
                  border: '1px solid var(--border-light)',
                  borderRadius: '16px',
                  padding: 'clamp(1.5rem, 2.5vw, 2.25rem)',
                }}
              >
                <h4 style={{ fontFamily: 'var(--font-sans)', fontSize: '0.9375rem', fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--burg-primary)', marginBottom: '1.25rem' }}>
                  Standing Commercial Parameters & Specifications
                </h4>
                <SpecRows
                  rows={COMMERCIAL_TERMS.map((t) => ({
                    key: t.label,
                    value: <strong>{t.value}</strong>,
                  }))}
                />
              </div>
            </div>
          </div>
        </section>

        {/* ── Section 02: Logistics, Delivery & Claims ─────────────────── */}
        <section className="section-pad sp-dark" data-sp-section>
          <div className="container">
            <div className="sp-anim">
              <SectionHead
                eyebrow="Logistics & Delivery"
                title="Packaging standards &"
                em="consignment transit"
                lede="Factory-direct dispatch protocols designed to protect physical fibre integrity from warehouse loading to customer receiving mills."
              />
            </div>

            <div className="sp-anim" style={{ marginTop: '2.5rem' }}>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))',
                  gap: 'clamp(1.25rem, 2vw, 2rem)',
                  alignItems: 'stretch',
                }}
              >
                <div
                  style={{
                    padding: 'clamp(1.5rem, 2.5vw, 2rem)',
                    border: '1px solid rgba(255, 255, 255, 0.12)',
                    borderRadius: '16px',
                    background: 'rgba(255, 255, 255, 0.03)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                  }}
                >
                  <div>
                    <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--burg-bright)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                      Packaging Integrity
                    </span>
                    <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#FFFFFF', margin: '0.65rem 0 1rem' }}>
                      High-Density Moisture Baling
                    </h3>
                    <p className="sp-body" style={{ color: 'rgba(255, 255, 255, 0.72)' }}>
                      Standard staple fibre is compressed into 200–300 kg high-density bales wrapped in heavy multi-layer polypropylene with high-tensile steel strapping. Roll goods (wadding, felt, interlinings) are vacuum poly-wrapped to prevent ambient moisture ingress.
                    </p>
                  </div>
                </div>

                <div
                  style={{
                    padding: 'clamp(1.5rem, 2.5vw, 2rem)',
                    border: '1px solid rgba(255, 255, 255, 0.12)',
                    borderRadius: '16px',
                    background: 'rgba(255, 255, 255, 0.03)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                  }}
                >
                  <div>
                    <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--burg-bright)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                      Shipping & Ports
                    </span>
                    <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#FFFFFF', margin: '0.65rem 0 1rem' }}>
                      Export Container Loading
                    </h3>
                    <p className="sp-body" style={{ color: 'rgba(255, 255, 255, 0.72)' }}>
                      Full Container Load (FCL 20ft & 40ft HC) loading is executed directly on plant ramps at 33-KM Multan Road, Lahore, and coordinated via dry port or bonded road transit to Karachi Sea Ports (Karachi Port / Port Qasim) for global ocean export.
                    </p>
                  </div>
                </div>

                <div
                  style={{
                    padding: 'clamp(1.5rem, 2.5vw, 2rem)',
                    border: '1px solid rgba(255, 255, 255, 0.12)',
                    borderRadius: '16px',
                    background: 'rgba(255, 255, 255, 0.03)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                  }}
                >
                  <div>
                    <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--burg-bright)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                      Verification & Claims
                    </span>
                    <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#FFFFFF', margin: '0.65rem 0 1rem' }}>
                      Certificate of Analysis (COA)
                    </h3>
                    <p className="sp-body" style={{ color: 'rgba(255, 255, 255, 0.72)' }}>
                      Every consignment is dispatched with an authentic Certificate of Analysis. Any discrepancy in weight or specification must be formally notified in writing with laboratory counter-test data within 14 calendar days of consignment arrival.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Section 03: Copyright & Intellectual Property ────────────── */}
        <section className="section-pad" data-sp-section style={{ background: 'var(--white)' }}>
          <div className="container">
            <div className="sp-anim">
              <SectionHead
                eyebrow="Intellectual Property"
                title="Copyright notice &"
                em="proprietary rights"
                lede="All digital content, imagery, technical specifications, trademarks, and documentation published across this website are protected under national and international copyright laws."
              />
            </div>

            <div className="sp-anim" style={{ marginTop: '2.5rem' }}>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 420px), 1fr))',
                  gap: 'clamp(1.5rem, 2.5vw, 2.5rem)',
                  alignItems: 'stretch',
                }}
              >
                <div
                  style={{
                    padding: 'clamp(1.75rem, 3vw, 2.5rem)',
                    border: '1px solid var(--border-light)',
                    borderRadius: '16px',
                    background: 'var(--white)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                      <span style={{ fontSize: '1.5rem', color: 'var(--burg-primary)' }}>©</span>
                      <h3 style={{ fontFamily: 'var(--font-sans)', fontSize: '1.25rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.02em', color: 'var(--ink)', margin: 0 }}>
                        Copyright Ownership
                      </h3>
                    </div>
                    <p className="sp-body" style={{ marginBottom: '1.25rem' }}>
                      Copyright © 1999–{currentYear} <strong>Gulf Fibre Company (PVT) Limited</strong>. All rights reserved.
                    </p>
                    <p className="sp-body" style={{ marginBottom: '1.25rem' }}>
                      All original materials, text content, photographs, plant imagery, technical tables, 3D animations, code architecture, graphic designs, and digital assets published on this website (and its related subdomains) are the exclusive proprietary property of Gulf Fibre Company (PVT) Limited.
                    </p>
                    <p className="sp-body">
                      No part of this website may be reproduced, distributed, mirrored, deep-linked without attribution, scraped, translated, or transmitted in any form or by any means (electronic, mechanical, photocopying, recording, or automated web retrieval) without express prior written permission from the company.
                    </p>
                  </div>
                </div>

                <div
                  style={{
                    padding: 'clamp(1.75rem, 3vw, 2.5rem)',
                    border: '1px solid var(--border-light)',
                    borderRadius: '16px',
                    background: 'var(--white)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                      <span style={{ fontSize: '1.5rem', color: 'var(--burg-primary)' }}>®</span>
                      <h3 style={{ fontFamily: 'var(--font-sans)', fontSize: '1.25rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.02em', color: 'var(--ink)', margin: 0 }}>
                        Trademarks & Brand Identity
                      </h3>
                    </div>
                    <p className="sp-body" style={{ marginBottom: '1.25rem' }}>
                      The company name <strong>Gulf Fibre Company (PVT) Limited</strong>, <strong>Gulf Fiber</strong>, the circular brand mark, product line monikers, and associated logos are registered corporate marks.
                    </p>
                    <p className="sp-body" style={{ marginBottom: '1.25rem' }}>
                      Third-party certification marks—including <em>Global Recycled Standard (GRS 4.0)</em>, <em>ISO 9001:2015</em>, <em>OEKO-TEX® Standard 100</em>, <em>EPA Punjab</em>, and <em>LCCI</em>—are the property of their respective accredited institutions and are displayed strictly under verified accreditation scope.
                    </p>
                    <Provenance status="VERIFIED" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Section 04: Legal Disclaimer & Jurisdiction ──────────────── */}
        <section className="section-pad sp-dark" data-sp-section>
          <div className="container">
            <div className="sp-anim">
              <SectionHead
                eyebrow="Compliance & Jurisdiction"
                title="Legal warranties &"
                em="governing law"
                lede="Statutory governance, environmental compliance, and legal jurisdiction applicable to all corporate transactions and website usage."
              />
            </div>

            <div className="sp-anim" style={{ marginTop: '2.5rem' }}>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))',
                  gap: 'clamp(1.25rem, 2vw, 2rem)',
                  alignItems: 'stretch',
                }}
              >
                <div
                  style={{
                    padding: 'clamp(1.5rem, 2.5vw, 2rem)',
                    border: '1px solid rgba(255, 255, 255, 0.12)',
                    borderRadius: '16px',
                    background: 'rgba(255, 255, 255, 0.03)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                  }}
                >
                  <div>
                    <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--burg-bright)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                      Legal Framework
                    </span>
                    <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#FFFFFF', margin: '0.65rem 0 1rem' }}>
                      Governing Law & Venue
                    </h3>
                    <p className="sp-body" style={{ color: 'rgba(255, 255, 255, 0.72)' }}>
                      These terms, commercial agreements, and website terms of service are governed by and construed in accordance with the substantive laws of the <strong>Islamic Republic of Pakistan</strong>. Any legal dispute, arbitration, or statutory claim arising from commercial sales contracts or intellectual property infringements shall be subject to the exclusive jurisdiction of the competent commercial courts in Lahore, Pakistan.
                    </p>
                  </div>
                </div>

                <div
                  style={{
                    padding: 'clamp(1.5rem, 2.5vw, 2rem)',
                    border: '1px solid rgba(255, 255, 255, 0.12)',
                    borderRadius: '16px',
                    background: 'rgba(255, 255, 255, 0.03)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                  }}
                >
                  <div>
                    <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--burg-bright)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                      Commercial Warranty
                    </span>
                    <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#FFFFFF', margin: '0.65rem 0 1rem' }}>
                      Liability Limitations
                    </h3>
                    <p className="sp-body" style={{ color: 'rgba(255, 255, 255, 0.72)' }}>
                      Gulf Fibre warrants that delivered fibres conform to the agreed written physical specifications and certified quality standards at the point of factory dispatch. The company makes no warranty of merchantability for non-intended secondary conversions. In all cases, maximum aggregate liability shall not exceed the net invoice amount received for the specific consignment.
                    </p>
                  </div>
                </div>

                <div
                  style={{
                    padding: 'clamp(1.5rem, 2.5vw, 2rem)',
                    border: '1px solid rgba(255, 255, 255, 0.12)',
                    borderRadius: '16px',
                    background: 'rgba(255, 255, 255, 0.03)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                  }}
                >
                  <div>
                    <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--burg-bright)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                      Data Protection
                    </span>
                    <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#FFFFFF', margin: '0.65rem 0 1rem' }}>
                      Confidentiality & Privacy
                    </h3>
                    <p className="sp-body" style={{ color: 'rgba(255, 255, 255, 0.72)' }}>
                      Commercial customer enquiries, sample requests, proprietary mill blends, and trading specifications submitted through our forms or enquiry desks are handled with strict commercial confidentiality and will never be disclosed or sold to external third parties.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom CTA */}
            <div className="sp-anim" style={{ textAlign: 'center', marginTop: '3.5rem' }}>
              <p className="sp-body" style={{ color: 'rgba(255, 255, 255, 0.6)', marginBottom: '1.5rem' }}>
                Need formal supply documentation, proforma terms, or contract verification?
              </p>
              <Link className="btn-primary" href="/contact">
                Contact Legal & Commercial Desk
              </Link>
            </div>
          </div>
        </section>
      </div>
    </PageShell>
  )
}
