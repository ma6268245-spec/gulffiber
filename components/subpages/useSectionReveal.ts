'use client'

import { useEffect, type RefObject } from 'react'

/**
 * Declarative scroll reveals for the subpages.
 *
 * This is the homepage's own reveal, nothing else: a staggered fade-up from
 * y:35-40 with `power3.out`, one ScrollTrigger per section, `once: true`, all
 * inside a `gsap.context` that is reverted on unmount. It reads from
 * `lib/animations.ts` - the same module the homepage sections use - so the
 * motion feel is identical rather than merely similar.
 *
 * Mark up sections with `data-sp-section` and children with `.sp-anim`. The
 * legacy `.sp-anim-line` / `.sp-anim-rule` / `.sp-anim-mask` hooks are treated
 * as the same fade-up so no bespoke motion survives anywhere.
 */
export function useSectionReveal(scope: RefObject<HTMLElement | null>) {
  useEffect(() => {
    let ctx: { revert: () => void } | undefined
    let cancelled = false

    const run = async () => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
      const { getGsap } = await import('@/lib/animations')
      const gsap = await getGsap()
      if (cancelled || !scope.current) return

      ctx = gsap.context(() => {
        const sections = gsap.utils.toArray<HTMLElement>('[data-sp-section]')

        sections.forEach((section) => {
          const items = section.querySelectorAll<HTMLElement>(
            '.sp-anim, .sp-anim-line, .sp-anim-rule, .sp-anim-mask'
          )
          if (!items.length) return

          gsap.fromTo(
            items,
            { opacity: 0, y: 35 },
            {
              opacity: 1,
              y: 0,
              duration: 0.9,
              stagger: 0.1,
              ease: 'power3.out',
              scrollTrigger: { trigger: section, start: 'top 85%', once: true },
            }
          )
        })
      }, scope.current)
    }

    run()
    return () => {
      cancelled = true
      if (ctx) ctx.revert()
    }
  }, [scope])
}
