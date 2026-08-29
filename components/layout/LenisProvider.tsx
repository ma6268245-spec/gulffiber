'use client'

import { useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'
import type Lenis from 'lenis'

export function LenisProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const lenisRef = useRef<Lenis | null>(null)

  useEffect(() => {
    if (typeof window !== 'undefined' && 'scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual'
    }

    let tickerHandler: ((time: number) => void) | null = null

    const initLenis = async () => {
      const LenisClass = (await import('lenis')).default
      const gsap = (await import('gsap')).default
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)

      const lenis = new LenisClass({
        lerp: 0.09, // Ultra smooth interpolation across 60Hz, 120Hz ProMotion, 144Hz+ monitors
        smoothWheel: true,
        wheelMultiplier: 0.9,
        touchMultiplier: 1.5,
        infinite: false,
      })
      lenisRef.current = lenis

      // Sync ScrollTrigger on each Lenis scroll
      lenis.on('scroll', () => {
        ScrollTrigger.update()
      })

      // Link GSAP ticker to Lenis RAF for buttery smooth 120Hz/144Hz execution
      tickerHandler = (time: number) => {
        lenis?.raf(time * 1000)
      }
      gsap.ticker.add(tickerHandler)
      gsap.ticker.lagSmoothing(0)

      ;(window as unknown as { lenis?: Lenis }).lenis = lenis
    }

    initLenis()

    return () => {
      if (tickerHandler) {
        import('gsap').then(({ default: gsap }) => {
          if (tickerHandler) gsap.ticker.remove(tickerHandler)
        })
      }
      if (lenisRef.current) {
        lenisRef.current.destroy()
        lenisRef.current = null
      }
    }
  }, [])

  // Instantly take user to top of the page on any navigation
  useEffect(() => {
    const resetScroll = () => {
      if (lenisRef.current) {
        lenisRef.current.scrollTo(0, { immediate: true })
      }
      window.scrollTo(0, 0)
      document.documentElement.scrollTop = 0
      document.body.scrollTop = 0
    }

    resetScroll()

    // Refresh GSAP ScrollTrigger after route transition
    import('gsap/ScrollTrigger')
      .then(({ ScrollTrigger }) => {
        try {
          if (ScrollTrigger && typeof ScrollTrigger.refresh === 'function') {
            ScrollTrigger.refresh()
          }
        } catch {
          // Ignore if ScrollTrigger is not ready yet
        }
      })
      .catch(() => {
        // Ignore dynamic import failure
      })

    // Re-verify on next animation frame & post-DOM mount timers
    const raf1 = requestAnimationFrame(resetScroll)
    const t1 = setTimeout(resetScroll, 40)
    const t2 = setTimeout(resetScroll, 120)

    return () => {
      cancelAnimationFrame(raf1)
      clearTimeout(t1)
      clearTimeout(t2)
    }
  }, [pathname])

  return <>{children}</>
}
