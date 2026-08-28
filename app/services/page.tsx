'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { FloatingActions } from '@/components/layout/FloatingActions'

const SERVICES_LIST = [
  {
    num: '01',
    title: 'Custom Denier & Crimp Compounding',
    desc: 'From 1.2D spinning fibres to 15D hollow conjugate, our engineers configure exact molecular orientation, draw ratios, and 3D spiral crimp frequencies to suit your machines.',
    features: ['Custom Denier (1.2D – 15D)', 'Precision Cut Lengths (32, 38, 51, 64mm)', 'Hydrophilic / Hydrophobic Finishes'],
    img: '/images/process-fibre.jpg',
  },
  {
    num: '02',
    title: 'In-House Laboratory Batch Testing',
    desc: 'Every production lot undergoes rigorous multi-point testing including single-fibre tenacity, elongation percentage, hot air shrinkage, and finish oil pick-up rate.',
    features: ['ISO 9001:2015 Standards', 'Batch-Specific Certificate of Analysis (COA)', 'Color Spectrophotometry (Delta E < 0.5)'],
    img: '/images/quality-lab.jpg',
  },
  {
    num: '03',
    title: 'OEM Private Labeling & Baling',
    desc: 'Custom bale packaging, high-density strapping, moisture-barrier wrappers, and bespoke buyer labeling configured for automated bale plucker opening lines.',
    features: ['Standard 250kg–300kg Bales', 'Waterproof Polypropylene Wrapping', 'Custom Barcode & Lot Number Tracking'],
    img: '/images/collection-rolls.jpg',
  },
  {
    num: '04',
    title: 'Global Export & Freight Logistics',
    desc: 'Direct container stuffing at our Karachi plant with express port clearance at Port Qasim and Karachi Port. Full documentation support including Form E, Bill of Lading, and GRS Scope Certificates.',
    features: ['FOB Karachi / CIF Destination Ports', 'Same-Day Dispatch for Stock Grades', 'Export Documentation Compliance'],
    img: '/images/workshop-factory.jpg',
  },
]

export default function ServicesPage() {
  return (
    <>
      <Header />
      <main style={{ paddingTop: '5.5rem', background: 'var(--ivory)', minHeight: '100vh' }}>
        {/* Header */}
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
              Manufacturing & Technical Services
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
              Tailored <span style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', color: 'var(--burg-bright)' }}>Solutions</span> for Textile Mills
            </h1>
            <p style={{ fontSize: '1rem', lineHeight: 1.7, color: 'rgba(255,255,255,0.7)', maxWidth: '56ch' }}>
              We partner directly with spinning mills, automotive tier-1 suppliers, and non-woven manufacturers to deliver end-to-end technical compounding, quality certification, and export logistics.
            </p>
          </div>
        </section>

        {/* Services List */}
        <section className="section-pad">
          <div className="container">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '3.5rem' }}>
              {SERVICES_LIST.map((srv, i) => (
                <div
                  key={srv.num}
                  style={{
                    background: 'var(--white)',
                    border: '1px solid var(--border-light)',
                    padding: 'clamp(2rem, 4vw, 3.5rem)',
                    display: 'grid',
                    gridTemplateColumns: i % 2 === 0 ? '1.2fr 0.8fr' : '0.8fr 1.2fr',
                    gap: '2.5rem',
                    alignItems: 'center',
                  }}
                >
                  <div style={{ order: i % 2 === 0 ? 1 : 2 }}>
                    <span style={{ fontFamily: 'var(--font-sans)', fontSize: '1.25rem', fontWeight: 900, color: 'var(--burg-primary)', display: 'block', marginBottom: '0.75rem' }}>
                      SERVICE {srv.num}
                    </span>
                    <h3 style={{ fontFamily: 'var(--font-sans)', fontSize: 'clamp(1.5rem, 3vw, 2.25rem)', fontWeight: 800, color: 'var(--ink)', textTransform: 'uppercase', marginBottom: '1rem', lineHeight: 1.1 }}>
                      {srv.title}
                    </h3>
                    <p style={{ fontSize: '0.9375rem', lineHeight: 1.75, color: 'var(--muted)', marginBottom: '1.5rem' }}>
                      {srv.desc}
                    </p>
                    <div style={{ borderTop: '1px solid var(--border-light)', paddingTop: '1.25rem', marginBottom: '2rem' }}>
                      {srv.features.map((f, idx) => (
                        <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', fontSize: '0.8125rem', fontWeight: 600, color: 'var(--ink)', marginBottom: '0.5rem' }}>
                          <span style={{ color: 'var(--burg-primary)' }}>✓</span> {f}
                        </div>
                      ))}
                    </div>
                    <Link href="/contact" className="btn-primary" style={{ fontSize: '0.6875rem' }}>
                      INQUIRE ABOUT THIS SERVICE
                    </Link>
                  </div>
                  <div style={{ order: i % 2 === 0 ? 2 : 1, position: 'relative', height: '22rem', overflow: 'hidden' }}>
                    <Image
                      src={srv.img}
                      alt={srv.title}
                      fill
                      style={{ objectFit: 'cover' }}
                    />
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
