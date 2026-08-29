'use client'

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { MaterialCanvas } from '@/components/three/MaterialCanvas'
import { PROCESS_STAGES } from '@/lib/data/company'
import type { SceneVariant } from '@/components/three/materialScene'

/* ===========================================================================
   "HOW IT IS MADE" - PINNED 3D SCROLL CHAPTER (reusable)
   ---------------------------------------------------------------------------
   A tall dark chapter whose sticky viewport holds a scroll-scrubbed three.js
   sequence - one station per slice of the scroll. The stage captions and the
   progress rail are HTML over the canvas, so they stay crisp and accessible.

   Used by /products (the four production stages, "process" variant) and by
   /sustainability (the material lifecycle, "circular" variant) - same
   machinery, different narrative.

   Reduced-motion and mobile visitors get the numbered stations as a plain
   editorial list with a photograph - the same content, no WebGL.
   =========================================================================== */

export interface ChapterStation {
  id: string
  title: string
  summary: string
}

export function ProcessScrollChapter({
  photo,
  photoAlt,
  variant = 'process',
  stations,
  kicker = 'Scroll to follow the material',
}: {
  photo: string
  photoAlt: string
  variant?: SceneVariant
  stations?: ChapterStation[]
  kicker?: string
}) {
  const wrapRef = useRef<HTMLDivElement>(null)
  const [progress, setProgress] = useState(0)
  const [stage, setStage] = useState(0)

  const stops: ChapterStation[] =
    stations ??
    PROCESS_STAGES.map((s) => ({ id: s.id, title: s.title, summary: s.summary }))

  useEffect(() => {
    let ctx: { revert: () => void } | undefined
    let cancelled = false

    const run = async () => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
      const { getGsap } = await import('@/lib/animations')
      const gsap = await getGsap()
      if (cancelled || !wrapRef.current) return

      ctx = gsap.context(() => {
        const proxy = { p: 0 }
        gsap.to(proxy, {
          p: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: wrapRef.current,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 0.5,
            onUpdate: (self: { progress: number }) => {
              setProgress(self.progress)
              const s = Math.min(stops.length - 1, Math.floor(self.progress * stops.length))
              setStage((prev) => (prev === s ? prev : s))
            },
          },
        })
      }, wrapRef.current)
    }

    run()
    return () => {
      cancelled = true
      if (ctx) ctx.revert()
    }
  }, [stops.length])

  return (
    <div className="sp-process" ref={wrapRef}>
      <div className="sp-process__sticky">
        <div className="sp-process__canvas">
          <MaterialCanvas
            variant={variant}
            progress={progress}
            label={`Scroll-driven animation of the ${stops.length}-station sequence: ${stops.map((s) => s.title.toLowerCase()).join(', ')}`}
            height="100%"
            fallback={
              <Image
                src={photo}
                alt={photoAlt}
                fill
                sizes="(max-width: 992px) 100vw, 85vw"
                style={{ objectFit: 'cover' }}
              />
            }
          />
        </div>

        {/* Stage captions + progress rail over the canvas */}
        <div className="sp-process__overlay">
          <p className="sp-process__kicker">{kicker}</p>
          <ol className="sp-process__stages">
            {stops.map((s, i) => (
              <li className="sp-process__stage" data-on={i === stage} key={s.id}>
                <span className="sp-process__stage-num">{String(i + 1).padStart(2, '0')}</span>
                <span className="sp-process__stage-title">{s.title}</span>
                <span className="sp-process__stage-note">{s.summary}</span>
              </li>
            ))}
          </ol>
          <div className="sp-process__rail" aria-hidden="true">
            <span style={{ transform: `scaleX(${progress})` }} />
          </div>
        </div>
      </div>
    </div>
  )
}
