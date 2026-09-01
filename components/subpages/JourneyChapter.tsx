'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { SERVICE_JOURNEY } from '@/lib/data/company'

/* ===========================================================================
   JOURNEY CHAPTER (Services page)
   ---------------------------------------------------------------------------
   "What happens when I work with Gulf Fibre?" answered as one continuous scroll:
   a sticky station marker (big number + step badge + step title + progress rail)
   beside the 7-step process ladder. Synchronized via real-time scroll tracking
   across all devices (desktop, laptop, tablet, mobile).
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
      const asideEl = containerRef.current?.querySelector('.sp-journey__aside') as HTMLElement | null
      const isStacked = window.innerWidth <= 992
      const yOffset = isStacked && asideEl ? asideEl.offsetHeight + 90 : 140
      const y = stepEl.getBoundingClientRect().top + window.pageYOffset - yOffset
      window.scrollTo({ top: y, behavior: 'smooth' })
      setActive(index)
    }
  }

  const updateActiveStep = useCallback(() => {
    if (!listRef.current) return
    const steps = Array.from(listRef.current.children) as HTMLElement[]
    if (!steps.length) return

    const asideEl = containerRef.current?.querySelector('.sp-journey__aside') as HTMLElement | null
    const isStacked = window.innerWidth <= 992
    const asideRect = asideEl?.getBoundingClientRect()

    // On stacked viewports (tablet & mobile), focal reading line is just below the sticky HUD
    // On desktop, focal reading line is natural eye-level (38% of viewport)
    let focalY = window.innerHeight * 0.38
    if (isStacked && asideRect && asideRect.bottom > 0) {
      focalY = asideRect.bottom + 45
    }

    let bestIndex = 0
    let minDistance = Infinity

    steps.forEach((el, index) => {
      const rect = el.getBoundingClientRect()
      const center = rect.top + rect.height / 2
      const dist = Math.abs(center - focalY)

      if (rect.top <= focalY && rect.bottom >= focalY) {
        bestIndex = index
        minDistance = -1
      } else if (minDistance !== -1 && dist < minDistance) {
        minDistance = dist
        bestIndex = index
      }
    })

    setActive((prev) => (prev !== bestIndex ? bestIndex : prev))

    // Calculate overall list progress for the rail
    const listRect = listRef.current.getBoundingClientRect()
    const totalHeight = listRect.height
    if (totalHeight > 0) {
      const travel = focalY - listRect.top
      const progress = Math.min(Math.max(travel / totalHeight, 0), 1)
      setRail(progress)
    }
  }, [])

  useEffect(() => {
    updateActiveStep()

    let rafId: number | null = null
    const handleScroll = () => {
      if (rafId !== null) cancelAnimationFrame(rafId)
      rafId = requestAnimationFrame(() => {
        updateActiveStep()
        rafId = null
      })
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', updateActiveStep, { passive: true })

    // Lenis / GSAP ScrollTrigger synchronization
    let ctx: { revert: () => void } | undefined
    let cancelled = false

    const setupGsap = async () => {
      try {
        const { getGsap } = await import('@/lib/animations')
        const gsap = await getGsap()
        const { ScrollTrigger } = await import('gsap/ScrollTrigger')
        gsap.registerPlugin(ScrollTrigger)

        if (cancelled || !listRef.current) return

        ctx = gsap.context(() => {
          ScrollTrigger.create({
            trigger: listRef.current,
            start: 'top 85%',
            end: 'bottom 15%',
            onUpdate: () => updateActiveStep(),
          })
          ScrollTrigger.refresh()
        }, containerRef)
      } catch {}
    }

    setupGsap()

    // Periodic safety check during font / image hydration
    const interval = setInterval(updateActiveStep, 400)

    return () => {
      cancelled = true
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', updateActiveStep)
      clearInterval(interval)
      if (rafId !== null) cancelAnimationFrame(rafId)
      if (ctx) ctx.revert()
    }
  }, [updateActiveStep])

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

        <div className="sp-journey__aside-body">
          <p className="sp-journey__big">{String(active + 1).padStart(2, '0')}</p>
          <h3 className="sp-journey__big-title">{current.title}</h3>
        </div>
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

