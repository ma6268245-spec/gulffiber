'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { FloatingActions } from '@/components/layout/FloatingActions'

const CATEGORIES = ['All Products', 'Polyester Staple Fibre', 'Conjugate / BiCo', 'Non-Woven Felt']

const PRODUCTS = [
  {
    id: 'psf-12d',
    title: 'Recycled PSF 1.2D – 1.4D',
    category: 'Polyester Staple Fibre',
    spec: '1.2–1.4 Denier · 32/38/51mm Cut',
    luster: 'Semi-Dull / Super White',
    application: 'Ring Spinning, Open-End Yarns, Blended Textiles',
    moq: '5 Metric Tonnes',
    img: '/images/collection-rolls.jpg',
    features: ['100% Post-Consumer PET', 'High Tenacity (>5.5 g/denier)', 'Uniform Crimp Frequency'],
  },
  {
    id: 'psf-6d',
    title: 'Coarse Denier PSF 3D – 15D',
    category: 'Polyester Staple Fibre',
    spec: '3.0–15.0 Denier · 64mm Cut',
    luster: 'Raw White / Optical Bright',
    application: 'Thermal-Bonded Wadding, Mattresses, Geotextiles',
    moq: '8 Metric Tonnes',
    img: '/images/process-fibre.jpg',
    features: ['Superior Crimp Retention', 'High Bulk & Resilience', 'Thermal Stability'],
  },
  {
    id: 'bico-7d',
    title: 'Conjugate Hollow Siliconised 7D',
    category: 'Conjugate / BiCo',
    spec: '7.0 Denier · 64mm Cut',
    luster: 'Super White · Siliconised',
    application: 'Pillows, Cushions, Quilts, Premium Plush Toys',
    moq: '5 Metric Tonnes',
    img: '/images/quality-lab.jpg',
    features: ['3D Spiral Crimp', 'Feather-Soft Touch', 'Antimicrobial Finish Available'],
  },
  {
    id: 'bico-15d',
    title: 'Hollow Conjugate Slick 15D',
    category: 'Conjugate / BiCo',
    spec: '15.0 Denier · 64mm Cut',
    luster: 'White · Slick Finish',
    application: 'Sofa Cushions, Sleeping Bags, Insulated Outerwear',
    moq: '10 Metric Tonnes',
    img: '/images/workshop-factory.jpg',
    features: ['Maximum Loft Recovery', 'High Compression Resistance', 'Washable & Durable'],
  },
  {
    id: 'felt-ind',
    title: 'Needle-Punched Industrial Felt',
    category: 'Non-Woven Felt',
    spec: '150–800 GSM · 1.0–5.0mm Thickness',
    luster: 'Custom Colors Available',
    application: 'Automotive Acoustic Liners, Filtration, Carpet Underlay',
    moq: '2,000 Square Metres',
    img: '/images/hero-loom.jpg',
    features: ['High Acoustic Absorption', 'Flame Retardant Options', 'Custom Roll Widths (up to 3.2m)'],
  },
  {
    id: 'felt-geo',
    title: 'Civil & Geotextile Felt',
    category: 'Non-Woven Felt',
    spec: '200–600 GSM · High Permeability',
    luster: 'Grey / Black / Off-White',
    application: 'Road Drainage, Soil Stabilization, Landfill Liners',
    moq: '5,000 Square Metres',
    img: '/images/sustainability-cotton.jpg',
    features: ['UV Stabilized', 'Puncture Resistant', 'Standard ASTM / ISO Compliance'],
  },
]

export default function ProductsPage() {
  const [activeCategory, setActiveCategory] = useState('All Products')

  const filtered = activeCategory === 'All Products'
    ? PRODUCTS
    : PRODUCTS.filter((p) => p.category === activeCategory)

  return (
    <>
      <Header />
      <main style={{ paddingTop: '5.5rem', background: 'var(--ivory)', minHeight: '100vh' }}>
        {/* Hero Banner */}
        <section
          style={{
            background: 'var(--burg-darker)',
            color: 'var(--white)',
            padding: 'clamp(4rem, 8vh, 6.5rem) var(--pad-x)',
            borderBottom: '1px solid var(--border-dark)',
          }}
        >
          <div className="container">
            <div className="eyebrow" style={{ color: 'rgba(255,255,255,0.6)', marginBottom: '1rem' }}>
              <svg viewBox="0 0 16 16" fill="currentColor">
                <path d="M8 1L10 6H15L11 9L13 14L8 11L3 14L5 9L1 6H6L8 1Z" />
              </svg>
              Complete Portfolio
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
              Engineered <span style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontWeight: 600, color: 'var(--burg-bright)' }}>Fibres</span> for Industry
            </h1>
            <p
              style={{
                fontSize: '1rem',
                lineHeight: 1.7,
                color: 'rgba(255,255,255,0.7)',
                maxWidth: '56ch',
              }}
            >
              From ultra-fine spinning deniers to resilient 3D conjugate hollows and heavy-duty industrial felts, discover our GRS-certified product range manufactured in Pakistan.
            </p>
          </div>
        </section>

        {/* Filter Navigation - Floating Frosted Glass Capsule */}
        <section style={{ position: 'sticky', top: '5.5rem', zIndex: 50, padding: '1rem 0' }}>
          <div className="container" style={{ display: 'flex', justifyContent: 'center' }}>
            <div
              style={{
                display: 'inline-flex',
                gap: '0.5rem',
                overflowX: 'auto',
                padding: '0.45rem 0.625rem',
                background: 'rgba(255, 255, 255, 0.85)',
                backdropFilter: 'blur(24px) saturate(180%)',
                WebkitBackdropFilter: 'blur(24px) saturate(180%)',
                border: '1px solid rgba(255, 255, 255, 0.85)',
                borderRadius: '9999px',
                boxShadow: '0 12px 36px rgba(7, 20, 46, 0.08), inset 0 1px 1px rgba(255, 255, 255, 0.95)',
                maxWidth: '100%',
              }}
            >
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  style={{
                    padding: '0.5rem 1.25rem',
                    border: 'none',
                    background: activeCategory === cat ? 'var(--burg-primary)' : 'transparent',
                    color: activeCategory === cat ? 'var(--white)' : 'var(--ink)',
                    fontFamily: 'var(--font-sans)',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    letterSpacing: '0.04em',
                    textTransform: 'uppercase',
                    cursor: 'pointer',
                    borderRadius: '9999px',
                    whiteSpace: 'nowrap',
                    boxShadow: activeCategory === cat ? '0 4px 12px rgba(10, 75, 184, 0.28)' : 'none',
                    transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Product Grid */}
        <section className="section-pad" style={{ paddingTop: '2rem' }}>
          <div className="container">
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
                gap: '2.5rem',
              }}
            >
              {filtered.map((prod) => (
                <div
                  key={prod.id}
                  style={{
                    background: 'var(--white)',
                    border: '1px solid var(--border-light)',
                    borderRadius: '24px',
                    display: 'flex',
                    flexDirection: 'column',
                    overflow: 'hidden',
                    boxShadow: '0 10px 30px rgba(7, 20, 46, 0.04)',
                    transition: 'transform 0.35s cubic-bezier(0.16,1,0.3,1), box-shadow 0.35s cubic-bezier(0.16,1,0.3,1)',
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.transform = 'translateY(-6px)'
                    ;(e.currentTarget as HTMLElement).style.boxShadow = '0 20px 48px rgba(7, 20, 46, 0.1)'
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'
                    ;(e.currentTarget as HTMLElement).style.boxShadow = '0 10px 30px rgba(7, 20, 46, 0.04)'
                  }}
                >
                  {/* Image */}
                  <div style={{ position: 'relative', height: '17rem', overflow: 'hidden' }}>
                    <Image
                      src={prod.img}
                      alt={prod.title}
                      fill
                      style={{ objectFit: 'cover' }}
                    />
                    <span
                      style={{
                        position: 'absolute',
                        top: '1rem',
                        left: '1rem',
                        fontSize: '0.625rem',
                        fontWeight: 800,
                        letterSpacing: '0.08em',
                        textTransform: 'uppercase',
                        background: 'rgba(255, 255, 255, 0.85)',
                        backdropFilter: 'blur(16px)',
                        WebkitBackdropFilter: 'blur(16px)',
                        border: '1px solid rgba(255, 255, 255, 0.9)',
                        color: 'var(--burg-primary)',
                        padding: '0.4rem 0.85rem',
                        borderRadius: '9999px',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                      }}
                    >
                      {prod.category}
                    </span>
                  </div>

                  {/* Body */}
                  <div style={{ padding: '1.85rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <h3
                      style={{
                        fontFamily: 'var(--font-sans)',
                        fontSize: '1.25rem',
                        fontWeight: 800,
                        color: 'var(--ink)',
                        marginBottom: '0.4rem',
                      }}
                    >
                      {prod.title}
                    </h3>
                    <p style={{ fontSize: '0.8125rem', color: 'var(--burg-primary)', fontWeight: 700, marginBottom: '0.75rem' }}>
                      {prod.spec}
                    </p>
                    <p style={{ fontSize: '0.875rem', color: 'var(--muted)', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                      <strong style={{ color: 'var(--ink)' }}>Application:</strong> {prod.application}
                    </p>

                    {/* Features */}
                    <div style={{ borderTop: '1px solid var(--border-light)', paddingTop: '1.125rem', marginBottom: '1.5rem' }}>
                      {prod.features.map((feat, i) => (
                        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8125rem', fontWeight: 600, color: 'var(--ink)', marginBottom: '0.4rem' }}>
                          <span style={{ color: 'var(--burg-primary)', fontWeight: 'bold' }}>✓</span> {feat}
                        </div>
                      ))}
                    </div>

                    {/* Footer / CTA */}
                    <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid var(--border-light)', paddingTop: '1.25rem' }}>
                      <span style={{ fontSize: '0.6875rem', fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--muted)' }}>
                        MOQ: {prod.moq}
                      </span>
                      <Link
                        href={`/contact?product=${encodeURIComponent(prod.title)}`}
                        className="btn-primary"
                        style={{ fontSize: '0.6875rem', padding: '0.6rem 1.25rem', borderRadius: '9999px' }}
                      >
                        REQUEST QUOTE
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <FloatingActions />
    </>
  )
}
