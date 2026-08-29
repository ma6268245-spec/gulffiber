'use client'

import { useEffect, useRef, useState } from 'react'
import { DataSlot, Provenance } from '@/components/subpages/Primitives'
import { MILESTONES } from '@/lib/data/company'

/* ===========================================================================
   TIMELINE CHAPTER (Company page - history)
   ---------------------------------------------------------------------------
   A vertical rail that fills with scroll while the milestones light up as they
   cross the viewport - the visitor feels the chronology advancing under their
   own scroll. Every milestone keeps its provenance: dated entries carry the
   VERIFIED pill, undated ones render as labelled slots that name exactly what
   date or statement to supply. Reduced motion: the rail is full and every
   entry is lit from the start.
   =========================================================================== */

export function TimelineChapter() {
  const wrapRef = useRef<HTMLOListElement>(null)
  const [rail, setRail] = useState(0)
  const [lit, setLit] = useState<number[]>([])

  useEffect(() => {
    let ctx: { revert: () => void } | undefined
    let cancelled = false

    const run = async () => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        setRail(1)
        setLit(MILESTONES.map((_, i) => i))
        return
      }
      const { getGsap } = await import('@/lib/animations')
      const gsap = await getGsap()
      if (cancelled || !wrapRef.current) return

      const wrap = wrapRef.current
      if (!wrap) return

      ctx = gsap.context(() => {
        /* Rail fills across the whole list's travel through the viewport. */
        gsap.to(
          { v: 0 },
          {
            v: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: wrap,
              start: 'top 70%',
              end: 'bottom 55%',
              scrub: 0.5,
              onUpdate: (self: { progress: number }) => setRail(self.progress),
            },
          }
        )

        /* Each milestone lights up when it enters, and stays lit. */
        Array.from(wrap.children).forEach((el, i) => {
          gsap.fromTo(
            el,
            { opacity: 0.45 },
            {
              opacity: 1,
              duration: 0.5,
              scrollTrigger: {
                trigger: el,
                start: 'top 78%',
                once: true,
                onEnter: () => setLit((prev) => (prev.includes(i) ? prev : [...prev, i])),
              },
            }
          )
        })
      }, wrapRef.current)
    }

    run()
    return () => {
      cancelled = true
      if (ctx) ctx.revert()
    }
  }, [])

  return (
    <div className="sp-timeline">
      <div className="sp-timeline__rail" aria-hidden="true">
        <span className="sp-timeline__fill" style={{ transform: `scaleY(${rail})` }} />
      </div>

      <ol className="sp-timeline__list" ref={wrapRef}>
        {MILESTONES.map((m, i) => (
          <li className="sp-timeline__item" data-lit={lit.includes(i)} key={m.id}>
            <span className="sp-timeline__marker">{m.marker}</span>
            <div className="sp-timeline__body">
              <h3 className="sp-timeline__title">{m.title}</h3>
              {m.body ? (
                <>
                  <p className="sp-body">{m.body}</p>
                  <div style={{ marginTop: '0.85rem' }}>
                    <Provenance status={m.status} />
                  </div>
                </>
              ) : (
                <DataSlot
                  title="Date or statement required"
                  note={m.note ?? 'A verified date is required before this entry can be published.'}
                  status={m.status}
                />
              )}
            </div>
          </li>
        ))}
      </ol>
    </div>
  )
}
