'use client'

import { useEffect, useRef } from 'react'

const TESTIMONIALS = [
  {
    stars: 5,
    quote: 'Gulf Fiber has been our preferred PSF supplier for over 8 years. Their conjugate fibre quality is unmatched — consistent denier, excellent crimp retention, and always on-time delivery.',
    name: 'Arjun Mehta',
    role: 'Procurement Head, Textile Mills India',
    initials: 'AM',
  },
  {
    stars: 5,
    quote: 'We switched to Gulf Fiber for our GRS-certified recycled fibre requirements. Their documentation process is seamless and the product quality meets every international standard we need.',
    name: 'Zhang Wei',
    role: 'Technical Director, Shanghai Fibre Co.',
    initials: 'ZW',
  },
  {
    stars: 4,
    quote: 'Reliable manufacturer with excellent communication. Their hollow siliconised fibre for our bedding products is consistently high quality, and they\'ve accommodated our custom specifications perfectly.',
    name: 'Sarah Thompson',
    role: 'CEO, UK Home Textiles Ltd',
    initials: 'ST',
  },
]

export function TestimonialsSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    let ctx: { revert: () => void } | undefined
    const init = async () => {
      const gsap = (await import('gsap')).default
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)

      ctx = gsap.context(() => {
        gsap.fromTo(
          '.test-card',
          { opacity: 0, y: 35 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.12,
            ease: 'power3.out',
            scrollTrigger: { trigger: '.test-cards', start: 'top 85%', once: true },
          }
        )
      }, sectionRef)
    }
    init()

    return () => { if (ctx) ctx.revert() }
  }, [])

  return (
    <section ref={sectionRef}>
      {/* Header — dark red */}
      <div style={{ background: 'var(--burg-primary)', paddingBlock: '3.5rem' }}>
        <div className="container">
          <div
            style={{
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '1.5rem',
            }}
          >
            <div>
              <div
                className="eyebrow"
                style={{ marginBottom: '0.875rem', color: 'rgba(255,255,255,0.5)' }}
              >
                <svg viewBox="0 0 16 16" fill="currentColor">
                  <path d="M8 1L10 6H15L11 9L13 14L8 11L3 14L5 9L1 6H6L8 1Z" />
                </svg>
                What We Offer
              </div>
              <h2
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: 'clamp(2rem, 5vw, 5rem)',
                  fontWeight: 900,
                  lineHeight: 0.9,
                  letterSpacing: '-0.02em',
                  textTransform: 'uppercase',
                  color: 'var(--white)',
                }}
              >
                WHAT THEY<br />
                <span
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontStyle: 'italic',
                    fontWeight: 600,
                    textTransform: 'none',
                    fontSize: '1em',
                  }}
                >
                  Say
                </span>
              </h2>
            </div>
            <p style={{ fontSize: '0.9375rem', lineHeight: 1.75, color: 'rgba(255,255,255,0.6)', maxWidth: '36ch' }}>
              Over 500 manufacturers and industrial buyers trust Gulf Fiber for quality, speed, and honest sourcing.
            </p>
          </div>
        </div>
      </div>

      {/* Cards — ivory */}
      <div style={{ background: 'var(--ivory)', paddingBlock: 'clamp(4rem, 8vh, 7rem)' }}>
        <div className="container">
          <div
            className="test-cards"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '1.5rem',
            }}
          >
            {TESTIMONIALS.map((t, i) => (
              <div
                key={i}
                className="test-card"
                style={{
                  background: 'var(--ivory)',
                  border: '1px solid var(--border-light)',
                  padding: '2.25rem',
                }}
              >
                {/* Quote marks */}
                <div
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: '3rem',
                    lineHeight: 0.7,
                    color: 'var(--border-light)',
                    marginBottom: '1rem',
                  }}
                >
                  &ldquo;
                </div>

                {/* Stars */}
                <div style={{ display: 'flex', gap: '0.2rem', marginBottom: '1rem' }}>
                  {Array.from({ length: 5 }).map((_, si) => (
                    <svg
                      key={si}
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill={si < t.stars ? 'var(--burg-primary)' : 'none'}
                      stroke="var(--burg-primary)"
                      strokeWidth="2"
                    >
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  ))}
                </div>

                <p
                  style={{
                    fontSize: '0.875rem',
                    lineHeight: 1.75,
                    color: 'var(--muted)',
                    marginBottom: '1.75rem',
                    fontStyle: 'italic',
                  }}
                >
                  &ldquo;{t.quote}&rdquo;
                </p>

                {/* Author */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.875rem' }}>
                  <div
                    style={{
                      width: '2.5rem',
                      height: '2.5rem',
                      borderRadius: '50%',
                      background: 'var(--burg-primary)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontFamily: 'var(--font-sans)',
                      fontSize: '0.6875rem',
                      fontWeight: 700,
                      color: 'var(--white)',
                      flexShrink: 0,
                    }}
                  >
                    {t.initials}
                  </div>
                  <div>
                    <div
                      style={{
                        fontFamily: 'var(--font-sans)',
                        fontSize: '0.875rem',
                        fontWeight: 700,
                        color: 'var(--ink)',
                        marginBottom: '0.1rem',
                      }}
                    >
                      {t.name}
                    </div>
                    <div style={{ fontSize: '0.6875rem', color: 'var(--muted)', letterSpacing: '0.04em' }}>
                      {t.role}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .test-cards { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 480px) {
          .test-card { padding: 1.5rem 1.25rem !important; }
        }
      `}</style>
    </section>
  )
}
