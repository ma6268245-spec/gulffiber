'use client'

import { useEffect, useRef } from 'react'

const APPLICATIONS = [
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="12" r="10" />
        <line x1="2" y1="12" x2="22" y2="12" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    ),
    title: 'SPINNING & BLENDING',
    desc: 'High-tenacity staple fibre engineered for ring, rotor, and open-end yarn spinning and cotton-polyester blends.',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    title: 'BEDDING & FILLING',
    desc: 'High-loft conjugate and thermal infill fibres providing superior resilience for pillows, duvets, and upholstery.',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="1" y="3" width="15" height="13" />
        <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
        <circle cx="5.5" cy="18.5" r="2.5" />
        <circle cx="18.5" cy="18.5" r="2.5" />
      </svg>
    ),
    title: 'NON-WOVEN FELTS',
    desc: 'Needle-punched felt materials engineered for apparel interlinings, thermal wadding, and protective technical covers.',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
      </svg>
    ),
    title: 'AUTOMOTIVE & INDUSTRIAL',
    desc: 'Durable non-woven felts and high-denier fibres for automotive headliners, acoustic dampening, and geotextiles.',
  },
]

export function AdvantagesSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    let ctx: { revert: () => void } | undefined
    const init = async () => {
      const gsap = (await import('gsap')).default
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)

      ctx = gsap.context(() => {
        gsap.fromTo(
          '.adv-heading',
          { opacity: 0, y: 35 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: { trigger: '.adv-heading', start: 'top 88%', once: true },
          }
        )
        gsap.fromTo(
          '.adv-card',
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: { trigger: '.adv-grid', start: 'top 85%', once: true },
          }
        )
      }, sectionRef)
    }
    init()

    return () => { if (ctx) ctx.revert() }
  }, [])

  return (
    <section
      ref={sectionRef}
      style={{
        background: 'var(--ivory)',
        paddingTop: 'clamp(3.5rem, 7vh, 6rem)',
        paddingBottom: 'clamp(1.5rem, 2.5vh, 2.5rem)',
      }}
    >
      <div className="container">
        {/* Header */}
        <div
          className="adv-header-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 'clamp(1.5rem, 3vw, 3.5rem)',
            alignItems: 'end',
            marginBottom: 'clamp(2rem, 4vh, 3rem)',
          }}
        >
          <div>
            <div className="eyebrow" style={{ marginBottom: '1rem' }}>
              <svg viewBox="0 0 16 16" fill="currentColor">
                <path d="M8 1L10 6H15L11 9L13 14L8 11L3 14L5 9L1 6H6L8 1Z" />
              </svg>
              Industrial Applications
            </div>
            <h2 className="adv-heading h-section">
              DESIGNED FOR YOUR<br />
              <em>Application</em>
            </h2>
          </div>
          <p
            style={{
              fontSize: '0.9375rem',
              lineHeight: 1.75,
              color: 'var(--muted)',
              maxWidth: '46ch',
            }}
          >
            From high-speed yarn spinning to automotive acoustic felts, our fibre specifications are tailored to the exact requirements of your manufacturing setup.
          </p>
        </div>

        {/* 4-Card Grid */}
        <div
          className="adv-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '1.5rem',
          }}
        >
          {APPLICATIONS.map((a, i) => (
            <div
              key={i}
              className="adv-card card"
              style={{
                background: 'var(--white)',
                padding: '2.5rem 1.75rem',
                border: '1px solid var(--border-light)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                minHeight: '18rem',
              }}
            >
              <div>
                <div
                  style={{
                    color: 'var(--burg-primary)',
                    marginBottom: '2rem',
                    width: '3.5rem',
                    height: '3.5rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: 'var(--ivory)',
                    borderRadius: '50%',
                  }}
                >
                  {a.icon}
                </div>
                <h3
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '0.9375rem',
                    fontWeight: 800,
                    letterSpacing: '0.06em',
                    textTransform: 'uppercase',
                    color: 'var(--ink)',
                    marginBottom: '0.875rem',
                  }}
                >
                  {a.title}
                </h3>
                <p
                  style={{
                    fontSize: '0.8125rem',
                    lineHeight: 1.65,
                    color: 'var(--muted)',
                  }}
                >
                  {a.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .adv-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 992px) {
          .adv-header-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 600px) {
          .adv-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}
