'use client'

import { useEffect, useRef } from 'react'

const STATS = [
  { num: 15000, suffix: ' T', label: 'Yearly Production', sub: 'High-grade regenerated PSF', formatComma: true },
  { num: 350, suffix: '+', label: 'Active Clients', sub: 'Spinning & industrial mills' },
  { num: 250, suffix: '+', label: 'Employees', sub: 'Plant engineers & workforce' },
  { num: 25, suffix: '+', label: 'Years of Excellence', sub: 'Established 1999' },
  { num: 100, suffix: '%', label: 'GRS Certified', sub: 'Global Recycled Standard' },
]

export function StatsBar() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let ctx: { revert: () => void } | undefined
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
              if (el) {
                const formatted = stat.formatComma
                  ? Math.round(obj.val).toLocaleString()
                  : Math.round(obj.val)
                el.textContent = `${formatted}${stat.suffix}`
              }
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
      <div style={{ width: '100%', maxWidth: '100%', paddingInline: 'clamp(1rem, 2.5vw, 3.5rem)' }}>
        <div
          className="stats-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(5, 1fr)',
            width: '100%',
          }}
        >
          {STATS.map((stat, i) => (
            <div
              key={stat.label}
              className="stat-col"
              style={{
                padding: '2.5rem 1rem',
                borderRight: i < STATS.length - 1 ? '1px solid rgba(255,255,255,0.15)' : 'none',
                textAlign: 'center',
              }}
            >
              <div
                className={`stat-num-${i}`}
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: 'clamp(2rem, 3.3vw, 3.85rem)',
                  fontWeight: 900,
                  color: 'var(--white)',
                  lineHeight: 1,
                  marginBottom: '0.5rem',
                  whiteSpace: 'nowrap',
                }}
              >
                0{stat.suffix}
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: 'rgba(255,255,255,0.85)',
                  marginBottom: '0.25rem',
                  whiteSpace: 'nowrap',
                }}
              >
                {stat.label}
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontStyle: 'italic',
                  fontSize: '0.875rem',
                  color: 'rgba(255,255,255,0.65)',
                }}
              >
                {stat.sub}
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .stats-grid {
            grid-template-columns: repeat(3, 1fr) !important;
          }
          .stat-col {
            border-right: 1px solid rgba(255,255,255,0.15) !important;
            border-bottom: 1px solid rgba(255,255,255,0.15);
            padding: 2rem 1rem !important;
          }
        }
        @media (max-width: 768px) {
          .stats-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 480px) {
          .stats-grid {
            grid-template-columns: 1fr !important;
          }
          .stat-col {
            border-right: none !important;
          }
        }
      `}</style>
    </div>
  )
}
