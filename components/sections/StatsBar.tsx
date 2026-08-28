'use client'

import { useEffect, useRef } from 'react'

const STATS = [
  { num: 500, suffix: '+', label: 'Active Clients', sub: 'Across 18 countries' },
  { num: 25, suffix: '+', label: 'Years of Excellence', sub: 'Since 1999' },
  { num: 100, suffix: '%', label: 'GRS Certified', sub: 'Global Recycled Standard' },
  { num: 24, suffix: 'h', label: 'Dispatch Time', sub: 'Guaranteed same-day' },
]

export function StatsBar() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let ctx: any;
    const init = async () => {
      const gsap = (await import('gsap')).default
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)

      ctx = gsap.context(() => {
        STATS.forEach((stat, i) => {
          const el = document.querySelector(`.stat-num-${i}`)
          if (!el) return
          const obj = { val: 0 }
          gsap.to(obj, {
            val: stat.num,
            duration: 1.8,
            ease: 'power2.out',
            scrollTrigger: { trigger: el, start: 'top 92%', once: true },
            onUpdate: () => {
              if (el) el.textContent = Math.round(obj.val) + stat.suffix
            },
          })
        })
      }, ref)
    }
    init()

    return () => { if (ctx) ctx.revert() }
  }, [])

  return (
    <div
      ref={ref}
      style={{
        background: 'var(--burg-primary)',
        borderTop: '1px solid rgba(255,255,255,0.1)',
      }}
    >
      <div className="container">
        <div
          className="stats-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
          }}
        >
          {STATS.map((stat, i) => (
            <div
              key={stat.label}
              className="stat-col"
              style={{
                padding: '2.5rem 1.5rem',
                borderRight: i < 3 ? '1px solid rgba(255,255,255,0.15)' : 'none',
                textAlign: 'center',
              }}
            >
              <div
                className={`stat-num-${i}`}
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: 'clamp(2.25rem, 4.5vw, 4.5rem)',
                  fontWeight: 900,
                  color: 'var(--white)',
                  lineHeight: 1,
                  marginBottom: '0.5rem',
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
                  color: 'rgba(255,255,255,0.85)',
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
                  color: 'rgba(255,255,255,0.6)',
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
          .stats-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
          .stat-col {
            border-right: none !important;
            border-bottom: 1px solid rgba(255,255,255,0.15);
            padding: 2rem 1rem !important;
          }
        }
        @media (max-width: 480px) {
          .stats-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  )
}
