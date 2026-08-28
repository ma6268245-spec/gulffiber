'use client'

import { useEffect, useRef } from 'react'

const STATS = [
  { num: 11, suffix: '+', label: 'Years in Business', sub: 'Since 1999' },
  { num: 3, suffix: '+', label: 'GRS Certificates', sub: 'Global Standard' },
  { num: 21, suffix: '%', label: 'Recycled Content', sub: 'Year-on-year growth' },
  { num: 15, suffix: '%', label: 'Energy Reduction', sub: 'Vs. industry average' },
]

export function AboutStats() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    let ctx: any;
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
        paddingBlock: 'clamp(4rem, 8vh, 7rem)',
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
