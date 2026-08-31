'use client'

import { useEffect, useRef, useState } from 'react'
import { SERVICE_JOURNEY } from '@/lib/data/company'

/* ===========================================================================
   JOURNEY CHAPTER (Services page)
   ---------------------------------------------------------------------------
   "What happens when I work with Gulf Fibre?" answered as one continuous scroll:
   a sticky station marker (big number + step badge + step title + progress rail)
   on the left, and the 7-step process ladder on the right.
   =========================================================================== */

export function JourneyChapter() {
  const containerRef = useRef<HTMLDivElement>(null)
  const listRef = useRef<HTMLOListElement>(null)
  const [active, setActive] = useState(0)
  const [rail, setRail] = useState(0)

  const scrollToStep = (index: number) => {
    if (!listRef.current) return
    const stepEl = listRef.current.children[index] as HTMLElement
    if (stepEl) {
      const yOffset = -120
      const y = stepEl.getBoundingClientRect().top + window.pageYOffset + yOffset
      window.scrollTo({ top: y, behavior: 'smooth' })
      setActive(index)
    }
  }

  useEffect(() => {
    let ctx: { revert: () => void } | undefined
    let cancelled = false

    const run = async () => {
      const { getGsap } = await import('@/lib/animations')
      const gsap = await getGsap()
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)

      if (cancelled || !listRef.current) return
      const list = listRef.current

      ctx = gsap.context(() => {
        // Master rail progress scrub
        ScrollTrigger.create({
          trigger: list,
          start: 'top 75%',
          end: 'bottom 50%',
          scrub: 0.3,
          onUpdate: (self) => {
            setRail(self.progress)
          },
        })

        // Step activation triggers
        const steps = Array.from(list.children) as HTMLElement[]
        steps.forEach((el, i) => {
          ScrollTrigger.create({
            trigger: el,
            start: 'top 55%',
            end: 'bottom 55%',
            onEnter: () => setActive(i),
            onEnterBack: () => setActive(i),
            onLeaveBack: () => {
              if (i === 0) setActive(0)
              else setActive(i - 1)
            },
          })
        })

        // Refresh triggers once layout settles
        setTimeout(() => {
          ScrollTrigger.refresh()
        }, 150)
      }, containerRef)
    }

    run()
    return () => {
      cancelled = true
      if (ctx) ctx.revert()
    }
  }, [])

  const current = SERVICE_JOURNEY[active] ?? SERVICE_JOURNEY[0]

  return (
    <div className="sp-journey" ref={containerRef}>
      {/* Sticky station marker */}
      <div className="sp-journey__aside" aria-hidden="true">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
          <span
            style={{
              fontSize: '0.6875rem',
              fontWeight: 800,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'var(--burg-primary)',
              background: 'rgba(10, 75, 184, 0.08)',
              padding: '0.35rem 0.75rem',
              borderRadius: '999px',
            }}
          >
            Step {String(active + 1).padStart(2, '0')} of {String(SERVICE_JOURNEY.length).padStart(2, '0')}
          </span>
          <div style={{ display: 'flex', gap: '0.35rem' }}>
            {SERVICE_JOURNEY.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => scrollToStep(idx)}
                style={{
                  width: idx === active ? '1.5rem' : '0.45rem',
                  height: '0.45rem',
                  borderRadius: '999px',
                  background: idx === active ? 'var(--burg-primary)' : 'var(--border-light)',
                  border: 'none',
                  padding: 0,
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                }}
                title={`Jump to Step ${idx + 1}`}
              />
            ))}
          </div>
        </div>

        <p className="sp-journey__big">{String(active + 1).padStart(2, '0')}</p>
        <h3 className="sp-journey__big-title">{current.title}</h3>
        <p className="sp-journey__big-note">{current.detail}</p>

        <div className="sp-journey__rail">
          <span style={{ transform: `scaleX(${Math.max(rail, (active + 1) / SERVICE_JOURNEY.length)})` }} />
        </div>
      </div>

      {/* Scrolling step ladder */}
      <ol className="sp-journey__list" ref={listRef}>
        {SERVICE_JOURNEY.map((s, i) => (
          <li
            className="sp-journey__step"
            data-on={i === active}
            key={s.id}
            onClick={() => scrollToStep(i)}
            style={{ cursor: 'pointer' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span className="sp-journey__step-num">
                Step {String(i + 1).padStart(2, '0')} · of {String(SERVICE_JOURNEY.length).padStart(2, '0')}
              </span>
              {i === active && (
                <span
                  style={{
                    fontSize: '0.625rem',
                    fontWeight: 700,
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    color: 'var(--burg-primary)',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.35rem',
                  }}
                >
                  <span
                    style={{
                      width: '6px',
                      height: '6px',
                      borderRadius: '50%',
                      background: 'var(--burg-primary)',
                      boxShadow: '0 0 8px var(--burg-primary)',
                    }}
                  />
                  ACTIVE STAGE
                </span>
              )}
            </div>
            <h3 className="sp-journey__step-title">{s.title}</h3>
            <p className="sp-body" style={{ color: i === active ? 'var(--ink)' : 'var(--muted)', transition: 'color 0.3s ease' }}>
              {s.detail}
            </p>
          </li>
        ))}
      </ol>
    </div>
  )
}

