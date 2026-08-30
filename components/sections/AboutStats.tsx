'use client'

import { useEffect, useRef } from 'react'

const STATS = [
  { num: 25, suffix: '+', label: 'Years in Business', sub: 'Established 1999' },
  { num: 4, suffix: '+', label: 'Accredited Standards', sub: 'ISO 9001, GRS, OEKO-TEX, LCCI' },
  { num: 100, suffix: '%', label: 'GRS Recycled Input', sub: 'Post-consumer verification' },
  { num: 350, suffix: '+', label: 'Industrial Clients', sub: 'Spinning & nonwoven mills' },
]

export function AboutStats() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    let ctx: { revert: () => void } | undefined
    const init = async () => {
      const { getGsap, counterAnim } = await import('@/lib/animations')
      const gsap = await getGsap()
      ctx = gsap.context(() => {
        STATS.forEach((stat, i) => {
          const el = document.querySelector(`.astat-num-${i}`)
          if (el) counterAnim(gsap, el, stat.num, stat.suffix)
        })
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
        paddingTop: 'clamp(0.5rem, 1.5vh, 1rem)',
        paddingBottom: 'clamp(3.5rem, 7vh, 6rem)',
      }}
    >
      <div className="container">
        <div
          className="astats-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '0',
            borderTop: '1px solid var(--border-light)',
            borderBottom: '1px solid var(--border-light)',
          }}
        >
          {STATS.map((stat, i) => (
            <div
              key={stat.label}
              className="astat-col"
              style={{
                padding: '2.5rem 1.5rem',
                borderRight: i < 3 ? '1px solid var(--border-light)' : 'none',
                textAlign: 'center',
              }}
            >
              <div
                className={`astat-num-${i}`}
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: 'clamp(2.5rem, 5vw, 5rem)',
                  fontWeight: 900,
                  color: 'var(--ink)',
                  lineHeight: 1,
                  marginBottom: '0.625rem',
                }}
              >
                0{stat.suffix}
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.6875rem',
                  fontWeight: 700,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: 'var(--muted)',
                  marginBottom: '0.25rem',
                }}
              >
                {stat.label}
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontStyle: 'italic',
                  fontSize: '0.875rem',
                  color: 'var(--muted)',
                }}
              >
                {stat.sub}
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .astats-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
          .astat-col {
            border-right: none !important;
            border-bottom: 1px solid var(--border-light);
            padding: 2rem 1rem !important;
          }
        }
        @media (max-width: 480px) {
          .astats-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  )
}
