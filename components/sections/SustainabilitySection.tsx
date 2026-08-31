'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'

const PILLARS = [
  {
    img: '/images/collection-rolls.jpg',
    category: 'Circular Inputs',
    name: 'Recycled Polyester Materials',
    spec: 'Post-Consumer PET Sourcing',
    moq: 'GRS Certified',
  },
  {
    img: '/images/process-fibre.jpg',
    category: 'Traceability',
    name: 'Batch-Specific Documentation',
    spec: 'Full Chain of Custody',
    moq: 'Scope Certificates',
  },
  {
    img: '/images/quality-lab.jpg',
    category: 'Stewardship',
    name: 'Responsible Processing',
    spec: 'Resource Conservation',
    moq: 'Controlled Effluent',
  },
]

export function SustainabilitySection() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    let ctx: { revert: () => void } | undefined
    const init = async () => {
      const { getGsap, fadeUpReveal } = await import('@/lib/animations')
      const gsap = await getGsap()
      ctx = gsap.context(() => {
        fadeUpReveal(gsap, '.sust-heading', { trigger: '.sust-heading' })
        fadeUpReveal(gsap, '.sust-card', { trigger: '.sust-cards', stagger: 0.15 })
      }, sectionRef)
    }
    init()

    return () => { if (ctx) ctx.revert() }
  }, [])

  return (
    <section ref={sectionRef} className="section-pad" style={{ background: 'var(--ivory)' }}>
      <div className="container">
        {/* Header */}
        <div
          className="sust-header"
          style={{
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            marginBottom: '3rem',
            flexWrap: 'wrap',
            gap: '2rem',
          }}
        >
          <div>
            <div className="eyebrow" style={{ marginBottom: '0.875rem' }}>
              <svg viewBox="0 0 16 16" fill="currentColor">
                <path d="M8 1L10 6H15L11 9L13 14L8 11L3 14L5 9L1 6H6L8 1Z" />
              </svg>
              Responsible Manufacturing
            </div>
            <h2 className="sust-heading h-section">
              MATERIALS FOR A MORE<br />
              <em>Circular Future</em>
            </h2>
          </div>

          <div style={{ maxWidth: '46ch' }}>
            <p style={{ fontSize: '0.9375rem', lineHeight: 1.7, color: 'var(--muted)', margin: 0, marginBottom: '1.25rem' }}>
              Supporting circular textile production through certified recycled inputs, material traceability, and responsible manufacturing stewardship.
            </p>
            <Link href="/sustainability" className="btn-ghost">
              CIRCULAR INITIATIVES
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>

        {/* Product cards */}
        <div
          className="sust-cards"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '1.5rem',
          }}
        >
          {PILLARS.map((p, i) => (
            <div
              key={i}
              className="sust-card"
              style={{
                background: 'var(--white)',
                border: '1px solid var(--border-light)',
                overflow: 'hidden',
                transition: 'box-shadow 0.3s ease',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLDivElement).style.boxShadow = '0 12px 40px rgba(0,0,0,0.1)'
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLDivElement).style.boxShadow = 'none'
              }}
            >
              {/* Image */}
              <div style={{ position: 'relative', height: '14rem', overflow: 'hidden' }}>
                <Image
                  src={p.img}
                  alt={p.name}
                  fill
                  style={{ objectFit: 'cover' }}
                />
              </div>

              {/* Body */}
              <div style={{ padding: '1.5rem' }}>
                <span
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '0.5625rem',
                    fontWeight: 700,
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    color: 'var(--burg-primary)',
                    display: 'block',
                    marginBottom: '0.375rem',
                  }}
                >
                  {p.category}
                </span>
                <h3
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '1rem',
                    fontWeight: 800,
                    color: 'var(--ink)',
                    lineHeight: 1.3,
                    marginBottom: '0.5rem',
                  }}
                >
                  {p.name}
                </h3>
                <p style={{ fontSize: '0.8125rem', color: 'var(--muted)', marginBottom: '1.25rem' }}>
                  {p.spec}
                </p>

                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    borderTop: '1px solid var(--border-light)',
                    paddingTop: '1rem',
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: '0.6875rem',
                      fontWeight: 700,
                      color: 'var(--ink)',
                      letterSpacing: '0.04em',
                      textTransform: 'uppercase',
                    }}
                  >
                    {p.moq}
                  </span>
                  <Link
                    href="/sustainability"
                    style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: '0.6875rem',
                      fontWeight: 700,
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                      color: 'var(--burg-primary)',
                      textDecoration: 'none',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.25rem',
                    }}
                  >
                    Details
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .sust-cards { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 600px) {
          .sust-header { flex-direction: column !important; align-items: flex-start !important; gap: 1.5rem !important; }
          .sust-header p { max-width: 100% !important; }
        }
      `}</style>
    </section>
  )
}
