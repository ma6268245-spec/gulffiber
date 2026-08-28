'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { FloatingActions } from '@/components/layout/FloatingActions'

const TESTING_PARAMETERS = [
  { param: 'Denier Uniformity', standard: 'ASTM D1577', tolerance: '± 0.05 D', desc: 'Gravimetric and vibroscopic linear density verification across all production spindles.' },
  { param: 'Single-Fibre Tenacity', standard: 'ISO 5079', tolerance: '> 5.5 cN/dtex', desc: 'Tensile break load testing ensuring high spinning efficiency and low yarn breakage.' },
  { param: 'Elongation at Break', standard: 'ASTM D3822', tolerance: '25% – 35%', desc: 'Ductility testing to ensure downstream carding resilience and optimal yarn elongation.' },
  { param: 'Crimp Frequency & Angle', standard: 'JIS L1015', tolerance: '12 – 16 crimps/inch', desc: 'Microscopic 3D optical analysis of mechanical crimp retention after thermal exposure.' },
  { param: 'Hot Air Shrinkage', standard: 'ASTM D5104', tolerance: '< 4.5% @ 180°C', desc: 'Dimensional stability verification for thermo-bonded wadding and technical felts.' },
  { param: 'Spin Finish Oil Pickup (OPU)', standard: 'Solvent Extraction', tolerance: '0.12% – 0.18%', desc: 'Static dissipation and lubrication uniformity for friction-free high-speed spinning.' },
]

export default function QualityPage() {
  return (
    <>
      <Header />
      <main style={{ paddingTop: '5.5rem', background: 'var(--ivory)', minHeight: '100vh' }}>
        {/* Banner */}
        <section
          style={{
            background: 'var(--burg-darker)',
            color: 'var(--white)',
            padding: 'clamp(4.5rem, 8vh, 6.5rem) var(--pad-x)',
          }}
        >
          <div className="container">
            <div className="eyebrow" style={{ color: 'rgba(255,255,255,0.6)', marginBottom: '1rem' }}>
              <svg viewBox="0 0 16 16" fill="currentColor">
                <path d="M8 1L10 6H15L11 9L13 14L8 11L3 14L5 9L1 6H6L8 1Z" />
              </svg>
              ISO 9001:2015 Certified
            </div>
            <h1
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: 'clamp(2.5rem, 5vw, 5.5rem)',
                fontWeight: 900,
                lineHeight: 0.95,
                letterSpacing: '-0.02em',
                textTransform: 'uppercase',
                marginBottom: '1.5rem',
              }}
            >
              Zero Compromise <br />
              <span style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', color: 'var(--burg-bright)' }}>Quality Assurance</span>
            </h1>
            <p style={{ fontSize: '1rem', lineHeight: 1.7, color: 'rgba(255,255,255,0.7)', maxWidth: '56ch' }}>
              Every tonne of Gulf Fibre shipped across the globe is backed by multi-stage in-house testing and batch-specific Certificates of Analysis.
            </p>
          </div>
        </section>

        {/* Quality Lab Showcase */}
        <section className="section-pad">
          <div className="container">
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'clamp(3rem, 6vw, 6rem)', alignItems: 'center', marginBottom: '5rem' }}>
              <div>
                <span className="eyebrow" style={{ marginBottom: '1rem' }}>Laboratory Testing</span>
                <h2 className="h-section" style={{ marginBottom: '1.5rem' }}>
                  PRECISION TESTING<br />
                  <em>Every Batch</em>
                </h2>
                <p style={{ fontSize: '0.9375rem', lineHeight: 1.75, color: 'var(--muted)', marginBottom: '1.25rem' }}>
                  Our Karachi manufacturing facility houses a state-of-the-art conditioning and testing laboratory operating under ASTM, ISO, and JIS international standards.
                </p>
                <p style={{ fontSize: '0.9375rem', lineHeight: 1.75, color: 'var(--muted)', marginBottom: '2rem' }}>
                  From raw flake incoming inspection to final bale testing, our dedicated quality control team monitors every production stage 24 hours a day.
                </p>
                <Link href="/contact" className="btn-primary">
                  REQUEST LAB TEST REPORT
                </Link>
              </div>
              <div style={{ position: 'relative', height: '28rem', overflow: 'hidden' }}>
                <Image
                  src="/images/quality-lab.jpg"
                  alt="Quality Testing Laboratory"
                  fill
                  style={{ objectFit: 'cover' }}
                />
              </div>
            </div>

            {/* Test Parameters Table */}
            <div>
              <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                <span className="eyebrow" style={{ marginBottom: '0.75rem' }}>Standard Specifications</span>
                <h3 className="h-section">
                  KEY TESTING<br />
                  <em>Parameters & Standards</em>
                </h3>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
                {TESTING_PARAMETERS.map((t) => (
                  <div key={t.param} style={{ background: 'var(--white)', border: '1px solid var(--border-light)', padding: '2rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
                      <h4 style={{ fontFamily: 'var(--font-sans)', fontSize: '1rem', fontWeight: 800, color: 'var(--ink)', textTransform: 'uppercase' }}>
                        {t.param}
                      </h4>
                      <span style={{ fontSize: '0.6875rem', fontWeight: 700, color: 'var(--burg-primary)', background: 'rgba(10,75,184,0.08)', padding: '0.2rem 0.5rem' }}>
                        {t.tolerance}
                      </span>
                    </div>
                    <span style={{ fontSize: '0.6875rem', fontWeight: 600, color: 'var(--muted)', display: 'block', marginBottom: '0.75rem' }}>
                      Standard: {t.standard}
                    </span>
                    <p style={{ fontSize: '0.8125rem', color: 'var(--muted)', lineHeight: 1.6 }}>
                      {t.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <FloatingActions />
    </>
  )
}
