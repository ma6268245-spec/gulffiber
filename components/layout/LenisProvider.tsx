'use client'

import { useEffect } from 'react'

export function LenisProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    let lenis: any = null
    let tickerHandler: ((time: number) => void) | null = null

    const initLenis = async () => {
      const Lenis = (await import('lenis')).default
      const gsap = (await import('gsap')).default
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)

      lenis = new Lenis({
        lerp: 0.09, // Ultra smooth interpolation across 60Hz, 120Hz ProMotion, 144Hz+ monitors
        smoothWheel: true,
        wheelMultiplier: 0.9,
        touchMultiplier: 1.5,
        infinite: false,
      })

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

      ;(window as Window & { lenis?: typeof lenis }).lenis = lenis
    }

    initLenis()

    return () => {
      if (tickerHandler) {
        import('gsap').then(({ default: gsap }) => {
          if (tickerHandler) gsap.ticker.remove(tickerHandler)
        })
      }
      if (lenis) lenis.destroy()
    }
  }, [])

  return <>{children}</>
}
