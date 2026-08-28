'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { FloatingActions } from '@/components/layout/FloatingActions'

const METRICS = [
  { num: '100%', label: 'Post-Consumer PET', sub: 'Recycled Source' },
  { num: '30M+', label: 'Bottles Diverted', sub: 'From Landfills Annually' },
  { num: '55%', label: 'CO2 Reduction', sub: 'Vs. Virgin Polymer' },
  { num: 'GRS', label: 'Certified Facility', sub: 'Scope Certified Traceability' },
]

export default function SustainabilityPage() {
  return (
    <>
      <Header />
      <main style={{ paddingTop: '5.5rem', background: 'var(--ivory)', minHeight: '100vh' }}>
        {/* Banner */}
        <section
          style={{
            background: 'var(--burg-primary)',
            color: 'var(--white)',
            padding: 'clamp(4.5rem, 8vh, 6.5rem) var(--pad-x)',
          }}
        >
          <div className="container">
            <div className="eyebrow" style={{ color: 'rgba(255,255,255,0.7)', marginBottom: '1rem' }}>
              <svg viewBox="0 0 16 16" fill="currentColor">
                <path d="M8 1L10 6H15L11 9L13 14L8 11L3 14L5 9L1 6H6L8 1Z" />
              </svg>
              Circular Economy
            </div>
            <h1
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: 'clamp(2.5rem, 5.5vw, 5.5rem)',
                fontWeight: 900,
                lineHeight: 0.95,
                letterSpacing: '-0.02em',
                textTransform: 'uppercase',
                marginBottom: '1.5rem',
              }}
            >
              Transforming Waste into <br />
              <span style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontWeight: 600 }}>High-Performance Fibre</span>
            </h1>
            <p style={{ fontSize: '1rem', lineHeight: 1.7, color: 'rgba(255,255,255,0.85)', maxWidth: '58ch' }}>
              We close the loop on plastic pollution by converting post-consumer PET bottles into premium-grade polyester staple fibre and non-wovens with global traceability.
            </p>
          </div>
        </section>

        {/* Metrics */}
        <section style={{ background: 'var(--white)', borderBottom: '1px solid var(--border-light)', padding: '3.5rem 0' }}>
          <div className="container">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem', textAlign: 'center' }}>
              {METRICS.map((m) => (
                <div key={m.label}>
                  <div style={{ fontFamily: 'var(--font-sans)', fontSize: 'clamp(2.5rem, 4vw, 4rem)', fontWeight: 900, color: 'var(--burg-primary)', lineHeight: 1, marginBottom: '0.5rem' }}>
                    {m.num}
                  </div>
                  <div style={{ fontFamily: 'var(--font-sans)', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--ink)', marginBottom: '0.25rem' }}>
                    {m.label}
                  </div>
                  <div style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontSize: '0.875rem', color: 'var(--muted)' }}>
                    {m.sub}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Process Flow */}
        <section className="section-pad">
          <div className="container">
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'clamp(3rem, 6vw, 6rem)', alignItems: 'center' }}>
              <div style={{ position: 'relative', height: '30rem', overflow: 'hidden' }}>
                <Image
                  src="/images/sustainability-cotton.jpg"
                  alt="Sustainable Fibre Manufacturing"
                  fill
                  style={{ objectFit: 'cover' }}
                />
              </div>
              <div>
                <span className="eyebrow" style={{ marginBottom: '1rem' }}>Recycling Process</span>
                <h2 className="h-section" style={{ marginBottom: '1.5rem' }}>
                  THE GRS<br />
                  <em>Transformation Cycle</em>
                </h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  <div style={{ borderLeft: '3px solid var(--burg-primary)', paddingLeft: '1.25rem' }}>
                    <h4 style={{ fontFamily: 'var(--font-sans)', fontSize: '1rem', fontWeight: 800, color: 'var(--ink)', textTransform: 'uppercase', marginBottom: '0.25rem' }}>
                      1. Bottle Collection & Sorting
                    </h4>
                    <p style={{ fontSize: '0.8125rem', color: 'var(--muted)', lineHeight: 1.6 }}>
                      Local post-consumer PET bottles are collected, optical-sorted by color, and de-labeled to ensure pristine flake quality.
                    </p>
                  </div>
                  <div style={{ borderLeft: '3px solid var(--burg-primary)', paddingLeft: '1.25rem' }}>
                    <h4 style={{ fontFamily: 'var(--font-sans)', fontSize: '1rem', fontWeight: 800, color: 'var(--ink)', textTransform: 'uppercase', marginBottom: '0.25rem' }}>
                      2. Hot Washing & De-Polymerisation Flaking
                    </h4>
                    <p style={{ fontSize: '0.8125rem', color: 'var(--muted)', lineHeight: 1.6 }}>
                      Flakes undergo caustic hot washing to remove adhesives, achieving an intrinsic viscosity (IV) greater than 0.72 dl/g.
                    </p>
                  </div>
                  <div style={{ borderLeft: '3px solid var(--burg-primary)', paddingLeft: '1.25rem' }}>
                    <h4 style={{ fontFamily: 'var(--font-sans)', fontSize: '1rem', fontWeight: 800, color: 'var(--ink)', textTransform: 'uppercase', marginBottom: '0.25rem' }}>
                      3. High-Tenacity Melt Spinning
                    </h4>
                    <p style={{ fontSize: '0.8125rem', color: 'var(--muted)', lineHeight: 1.6 }}>
                      Extruded through micro-pore spinnerets into continuous filament tow, drawn, crimped, and cut into precise staple lengths.
                    </p>
                  </div>
                </div>
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
