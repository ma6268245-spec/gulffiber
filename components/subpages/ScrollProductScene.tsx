'use client'

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { MaterialCanvas } from '@/components/three/MaterialCanvas'
import type { SceneVariant } from '@/components/three/materialScene'

/* ===========================================================================
   SCROLL-DRIVEN 3D PRODUCT VISUAL
   ---------------------------------------------------------------------------
   A sticky-in-view canvas whose 3D material scene is scrubbed by scroll
   progress through the surrounding section - the visitor scrolls, the material
   transforms (loft rises, felt compacts, weave interlaces, bundle opens).

   - Progress comes from a ScrollTrigger scrub so the visual is tied to the
     user's own scroll position, not a timer.
   - Reduced-motion and mobile users never boot WebGL: they see the real
     photograph instead, never a blank box.
   - The scene is a visualisation of material behaviour, not a measured
     rendering of a specific grade - the caption says so.
   =========================================================================== */

const STAGE_COPY: Record<string, { label: string; note: string }[]> = {
  loft: [
    { label: 'Layered', note: 'Thermally bonded fiber webs' },
    { label: 'Lofting', note: 'Layers gain height and volume' },
    { label: 'Recovery', note: 'Structure springs back under load' },
  ],
  felt: [
    { label: 'Fiber cloud', note: 'Loose recycled and prime fiber' },
    { label: 'Needling', note: 'Barbed needles interlock the structure' },
    { label: 'Compacted', note: 'A dimensionally stable mat' },
  ],
  weave: [
    { label: 'Warp & weft', note: 'Woven and non-woven constructions' },
    { label: 'Interlacing', note: 'Strands lock into a lattice' },
    { label: 'Fusible base', note: 'Ready for coating and fusing' },
  ],
  bundle: [
    { label: 'Baled', note: 'Filaments packed on the tow' },
    { label: 'Opening', note: 'The bundle opens to show the cross-section' },
    { label: 'Crimped', note: 'Bulk and cohesion per specification' },
  ],
}

export function ScrollProductScene({
  variant,
  photo,
  photoAlt,
  height = 'clamp(22rem, 55vh, 34rem)',
  caption,
}: {
  variant: SceneVariant
  photo: string
  photoAlt: string
  height?: string
  caption?: string
}) {
  const wrapRef = useRef<HTMLDivElement>(null)
  const [progress, setProgress] = useState(0)
  const [stage, setStage] = useState(0)

  useEffect(() => {
    let ctx: { revert: () => void } | undefined
    let cancelled = false

    const run = async () => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
      const { getGsap } = await import('@/lib/animations')
      const gsap = await getGsap()
      if (cancelled || !wrapRef.current) return

      // Use surrounding section for a wider, natural scroll tracking window
      const triggerEl = wrapRef.current.closest('section') || wrapRef.current

      ctx = gsap.context(() => {
        const proxy = { p: 0 }
        gsap.to(proxy, {
          p: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: triggerEl,
            start: 'top 70%',
            end: 'bottom 30%',
            scrub: 0.8,
            onUpdate: (self: { progress: number }) => {
              const p = Math.max(0, Math.min(1, self.progress))
              setProgress(p)
              const s = p < 0.33 ? 0 : p < 0.66 ? 1 : 2
              setStage(s)
            },
          },
        })
      }, triggerEl)
    }

    run()
    return () => {
      cancelled = true
      if (ctx) ctx.revert()
    }
  }, [])

  const stages = STAGE_COPY[variant] ?? []

  const handleStageSelect = (i: number) => {
    setStage(i)
    const targetProgress = i === 0 ? 0.05 : i === 1 ? 0.5 : 0.95
    setProgress(targetProgress)
  }

  return (
    <div ref={wrapRef} className="sp-scene" style={{ minHeight: height }}>
      <div className="sp-scene__canvas">
        <MaterialCanvas
          variant={variant}
          progress={progress}
          label={`Animated visualisation of ${photoAlt}`}
          height="100%"
          fallback={
            /* Real photograph, not a blank box, wherever WebGL is unavailable. */
            <Image
              src={photo}
              alt={photoAlt}
              fill
              sizes="(max-width: 992px) 100vw, 50vw"
              style={{ objectFit: 'cover' }}
            />
          }
        />
      </div>

      {stages.length > 0 && (
        <ol className="sp-scene__stages">
          {stages.map((s, i) => (
            <li
              className="sp-scene__stage"
              data-on={i === stage}
              key={s.label}
              onClick={() => handleStageSelect(i)}
              style={{ cursor: 'pointer' }}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  handleStageSelect(i)
                }
              }}
              aria-label={`View stage: ${s.label} - ${s.note}`}
            >
              <span className="sp-scene__stage-label">{s.label}</span>
              <span className="sp-scene__stage-note">{s.note}</span>
            </li>
          ))}
        </ol>
      )}

      <p className="sp-scene__caption">{caption ?? 'Scroll-driven visualisation of material behaviour - indicative, not a measured rendering of a specific grade.'}</p>
    </div>
  )
}
