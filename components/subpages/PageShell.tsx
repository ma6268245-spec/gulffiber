'use client'

import { useEffect, useRef } from 'react'
import { FloatingActions } from '@/components/layout/FloatingActions'

/**
 * Wrapper for every subpage.
 *
 * - Applies the `.sp-root` token scope (see styles/subpage.css).
 * - Renders FloatingActions once, so individual pages no longer do. The global
 *   Header / Footer / <main> come from app/layout.tsx, so subpages must NOT
 *   render their own; doing so produced duplicate banner landmarks and a
 *   nested <main> on every previous subpage.
 * - Resets scroll on mount. Next.js 16 no longer overrides scroll-behavior on
 *   navigation, and Lenis owns the scroll position, so a route change would
 *   otherwise land mid-page.
 * - Refreshes ScrollTrigger once fonts and images have settled.
 */
export function PageShell({
  children,
  id = 'sp-content',
}: {
  children: React.ReactNode
  id?: string
}) {
  const rootRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const lenis = (window as unknown as { lenis?: { scrollTo: (t: number, o?: object) => void } }).lenis
    if (lenis) lenis.scrollTo(0, { immediate: true })
    window.scrollTo(0, 0)
    document.documentElement.scrollTop = 0
    document.body.scrollTop = 0

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!reduce && rootRef.current) rootRef.current.setAttribute('data-motion', 'on')

    let cancelled = false
    const refresh = async () => {
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      if (cancelled) return
      ScrollTrigger.refresh()
    }
    const timer = window.setTimeout(refresh, 200)
    if (typeof document !== 'undefined' && 'fonts' in document) {
      ;(document as Document & { fonts: FontFaceSet }).fonts.ready.then(() => {
        if (!cancelled) refresh()
      })
    }

    return () => {
      cancelled = true
      window.clearTimeout(timer)
    }
  }, [])

  return (
    <div ref={rootRef} className="sp-root">
      <a className="sp-skip" href={`#${id}`}>
        Skip to page content
      </a>
      <div id={id}>{children}</div>
      <FloatingActions />
    </div>
  )
}
