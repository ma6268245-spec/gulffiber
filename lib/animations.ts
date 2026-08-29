import type gsapCore from 'gsap'

export type Gsap = typeof gsapCore
export type Targets = string | Element | Element[] | NodeListOf<Element> | null

// Lazy-load GSAP + ScrollTrigger once
let gsapReady: Promise<typeof import('gsap')['default']> | null = null

export async function getGsap(): Promise<typeof import('gsap')['default']> {
  if (!gsapReady) {
    gsapReady = (async () => {
      const gsap = (await import('gsap')).default
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)
      return gsap
    })()
  }
  return gsapReady
}

/* ─── Shared durations & easings ─── */
export const EASE = {
  out: 'power4.out',
  inOut: 'power4.inOut',
  smooth: 'power3.out',
  linear: 'none',
} as const

export const DUR = {
  fast: 0.6,
  normal: 0.9,
  slow: 1.2,
  reveal: 1.3,
} as const

export const STAGGER = {
  tight: 0.06,
  normal: 0.1,
  wide: 0.15,
} as const

/* ─── Reusable animation factories ─── */

/** Fade-up reveal for generic elements */
export function fadeUpReveal(
  gsap: Gsap,
  targets: Targets,
  opts?: {
    trigger?: string | Element | null
    start?: string
    stagger?: number
    duration?: number
    delay?: number
    y?: number
  }
) {
  if (!targets) return
  const o = {
    trigger: opts?.trigger ?? targets,
    start: opts?.start ?? 'top 88%',
    stagger: opts?.stagger ?? STAGGER.normal,
    duration: opts?.duration ?? DUR.normal,
    delay: opts?.delay ?? 0,
    y: opts?.y ?? 35,
  }

  return gsap.fromTo(
    targets,
    { opacity: 0, y: o.y },
    {
      opacity: 1,
      y: 0,
      duration: o.duration,
      stagger: o.stagger,
      delay: o.delay,
      ease: EASE.smooth,
      scrollTrigger: { trigger: o.trigger as gsap.DOMTarget, start: o.start, once: true },
    }
  )
}

/** Line-by-line masked text reveal */
export function textLineReveal(
  gsap: Gsap,
  targets: Targets,
  opts?: {
    trigger?: string | Element | null
    start?: string
    stagger?: number
    duration?: number
    delay?: number
  }
) {
  if (!targets) return
  const o = {
    trigger: opts?.trigger ?? targets,
    start: opts?.start ?? 'top 88%',
    stagger: opts?.stagger ?? STAGGER.normal,
    duration: opts?.duration ?? 0.9,
    delay: opts?.delay ?? 0,
  }

  return gsap.fromTo(
    targets,
    { yPercent: 100, opacity: 0 },
    {
      yPercent: 0,
      opacity: 1,
      duration: o.duration,
      stagger: o.stagger,
      delay: o.delay,
      ease: EASE.out,
      scrollTrigger: { trigger: o.trigger as gsap.DOMTarget, start: o.start, once: true },
    }
  )
}

/** Fade scale image/section reveal */
export function clipReveal(
  gsap: Gsap,
  target: Targets,
  _direction: 'up' | 'down' | 'left' | 'right' = 'up',
  opts?: {
    trigger?: string | Element | null
    start?: string
    duration?: number
  }
) {
  if (!target) return
  void _direction
  return gsap.fromTo(
    target,
    { opacity: 0, scale: 0.96 },
    {
      opacity: 1,
      scale: 1,
      duration: opts?.duration ?? DUR.reveal,
      ease: EASE.smooth,
      scrollTrigger: {
        trigger: (opts?.trigger ?? target) as gsap.DOMTarget,
        start: opts?.start ?? 'top 85%',
        once: true,
      },
    }
  )
}

/** Scroll-linked parallax for images */
export function parallaxImage(
  gsap: Gsap,
  target: Targets,
  opts?: {
    trigger?: string | Element | null
    intensity?: number
    start?: string
    end?: string
  }
) {
  if (!target) return
  return gsap.to(target, {
    yPercent: -(opts?.intensity ?? 6),
    ease: EASE.linear,
    scrollTrigger: {
      trigger: (opts?.trigger ?? target) as gsap.DOMTarget,
      start: opts?.start ?? 'top bottom',
      end: opts?.end ?? 'bottom top',
      scrub: true,
    },
  })
}

/** Animated number counter on scroll */
export function counterAnim(
  gsap: Gsap,
  el: Element,
  endVal: number,
  suffix: string = '',
  opts?: {
    duration?: number
    start?: string
  }
) {
  const obj = { val: 0 }
  return gsap.to(obj, {
    val: endVal,
    duration: opts?.duration ?? 1.8,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: el,
      start: opts?.start ?? 'top 92%',
      once: true,
    },
    onUpdate: () => {
      el.textContent = Math.round(obj.val) + suffix
    },
  })
}

/** Stagger card entrance (scale + opacity) */
export function cardEntrance(
  gsap: Gsap,
  targets: Targets,
  opts?: {
    trigger?: string | Element | null
    start?: string
    stagger?: number
    delay?: number
  }
) {
  if (!targets) return
  return gsap.fromTo(
    targets,
    { opacity: 0, scale: 0.9, y: 25 },
    {
      opacity: 1,
      scale: 1,
      y: 0,
      duration: DUR.fast,
      stagger: opts?.stagger ?? STAGGER.wide,
      delay: opts?.delay ?? 0,
      ease: 'back.out(1.4)',
      scrollTrigger: {
        trigger: (opts?.trigger ?? targets) as gsap.DOMTarget,
        start: opts?.start ?? 'top 85%',
        once: true,
      },
    }
  )
}
