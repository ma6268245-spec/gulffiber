'use client'

import { useEffect, useRef, useState } from 'react'
import { SERVICE_JOURNEY } from '@/lib/data/company'

/* ===========================================================================
   JOURNEY CHAPTER (Services page)
   ---------------------------------------------------------------------------
   "What happens when I work with Gulf Fibre?" answered as one scroll: a
   sticky station marker (big number + step title + progress rail) on the
   left, the seven-step ladder on the right. Each step lights the sticky
   marker as it crosses the viewport, so the scroll itself walks the order
   from enquiry to delivered consignment.

   Every step maps to a verified capability in lib/data/company.ts - none is
   invented. Reduced motion and narrow viewports: the sticky column collapses
   and every step simply reads.
   =========================================================================== */

export function JourneyChapter() {
  const listRef = useRef<HTMLOListElement>(null)
  const [active, setActive] = useState(0)
  const [rail, setRail] = useState(0)

  useEffect(() => {
    let ctx: { revert: () => void } | undefined
    let cancelled = false

    const run = async () => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        setRail(1)
        return
      }
      const { getGsap } = await import('@/lib/animations')
      const gsap = await getGsap()
      if (cancelled || !listRef.current) return

      const list = listRef.current
      if (!list) return

      ctx = gsap.context(() => {
        gsap.to(
          { v: 0 },
          {
            v: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: list,
              start: 'top 70%',
              end: 'bottom 60%',
              scrub: 0.5,
              onUpdate: (self: { progress: number }) => setRail(self.progress),
            },
          }
        )

        Array.from(list.children).forEach((el, i) => {
          gsap.fromTo(
            el,
            { opacity: 0.38 },
            {
              opacity: 1,
              scrollTrigger: {
                trigger: el,
                start: 'top 62%',
                end: 'bottom 38%',
                onEnter: () => setActive(i),
                onEnterBack: () => setActive(i),
              },
            }
          )
        })
      }, listRef.current)
    }

    run()
    return () => {
      cancelled = true
      if (ctx) ctx.revert()
    }
  }, [])

  const current = SERVICE_JOURNEY[active] ?? SERVICE_JOURNEY[0]

  return (
    <div className="sp-journey">
      <div className="sp-journey__aside" aria-hidden="true">
        <p className="sp-journey__big">{String(active + 1).padStart(2, '0')}</p>
        <h3 className="sp-journey__big-title">{current.title}</h3>
        <p className="sp-journey__big-note">{current.detail}</p>
        <div className="sp-journey__rail">
          <span style={{ transform: `scaleX(${rail})` }} />
        </div>
      </div>

      <ol className="sp-journey__list" ref={listRef}>
        {SERVICE_JOURNEY.map((s, i) => (
          <li className="sp-journey__step" data-on={i <= active} key={s.id}>
            <span className="sp-journey__step-num">
              Step {String(i + 1).padStart(2, '0')} - of {String(SERVICE_JOURNEY.length).padStart(2, '0')}
            </span>
            <h3 className="sp-journey__step-title">{s.title}</h3>
            <p className="sp-body">{s.detail}</p>
          </li>
        ))}
      </ol>
    </div>
  )
}
