/**
 * Motion helpers for the Gulf Fiber subpages.
 *
 * Deliberately a SEPARATE module from `lib/animations.ts`: that file is
 * imported by five homepage sections (TrustBanner, QualitySection,
 * SustainabilitySection, ContactStrip, AboutStats), so it is treated as
 * frozen. Everything here is additive and used by subpages only.
 *
 * Every helper takes the caller's `gsap` instance so callers stay in control
 * of `gsap.context()` scoping and `ctx.revert()` cleanup.
 */

import type gsapCore from 'gsap'
import type { ScrollTrigger as ScrollTriggerInstance } from 'gsap/ScrollTrigger'

/** The gsap core instance, as returned by `loadGsap()`. */
export type Gsap = typeof gsapCore
/** Anything gsap will accept as a tween target. */
export type Targets = Parameters<Gsap['fromTo']>[0]

export const SP_EASE = {
  out: 'power3.out',
  strong: 'power4.out',
  inOut: 'power2.inOut',
  none: 'none',
} as const

export const SP_DUR = { fast: 0.5, base: 0.8, slow: 1.1 } as const

/** Lazy-load GSAP + ScrollTrigger. Mirrors the homepage's own pattern. */
export async function loadGsap() {
  const gsap = (await import('gsap')).default
  const { ScrollTrigger } = await import('gsap/ScrollTrigger')
  gsap.registerPlugin(ScrollTrigger)
  return { gsap, ScrollTrigger }
}

export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

export function isNarrowViewport(px = 767): boolean {
  if (typeof window === 'undefined') return false
  return window.matchMedia(`(max-width: ${px}px)`).matches
}

type Anim = { trigger?: Element | null; start?: string; delay?: number; stagger?: number }

/** Masked line-by-line rise. Targets must sit inside a `.sp-clip` parent. */
export function spLineRise(gsap: Gsap, targets: Targets, opts: Anim = {}) {
  return gsap.fromTo(
    targets,
    { yPercent: 108, opacity: 0 },
    {
      yPercent: 0,
      opacity: 1,
      duration: SP_DUR.slow,
      ease: SP_EASE.strong,
      stagger: opts.stagger ?? 0.09,
      delay: opts.delay ?? 0,
      scrollTrigger: opts.trigger
        ? { trigger: opts.trigger, start: opts.start ?? 'top 82%', once: true }
        : undefined,
    }
  )
}

/** Standard entrance for blocks, cells and figures. */
export function spFadeUp(gsap: Gsap, targets: Targets, opts: Anim = {}) {
  return gsap.fromTo(
    targets,
    { y: 26, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: SP_DUR.base,
      ease: SP_EASE.out,
      stagger: opts.stagger ?? 0.07,
      delay: opts.delay ?? 0,
      scrollTrigger: opts.trigger
        ? { trigger: opts.trigger, start: opts.start ?? 'top 85%', once: true }
        : undefined,
    }
  )
}

/** Technical rules drawing themselves in - the site's signature engineering cue. */
export function spDrawRule(gsap: Gsap, targets: Targets, opts: Anim = {}) {
  return gsap.fromTo(
    targets,
    { scaleX: 0 },
    {
      scaleX: 1,
      duration: 1.15,
      ease: SP_EASE.inOut,
      stagger: opts.stagger ?? 0.06,
      delay: opts.delay ?? 0,
      scrollTrigger: opts.trigger
        ? { trigger: opts.trigger, start: opts.start ?? 'top 88%', once: true }
        : undefined,
    }
  )
}

/** Image/figure reveal via clip-path - no layout thrash, GPU friendly. */
export function spMaskReveal(gsap: Gsap, targets: Targets, opts: Anim = {}) {
  return gsap.fromTo(
    targets,
    { clipPath: 'inset(0% 0% 100% 0%)', scale: 1.06 },
    {
      clipPath: 'inset(0% 0% 0% 0%)',
      scale: 1,
      duration: 1.25,
      ease: SP_EASE.strong,
      delay: opts.delay ?? 0,
      scrollTrigger: opts.trigger
        ? { trigger: opts.trigger, start: opts.start ?? 'top 82%', once: true }
        : undefined,
    }
  )
}

export function spParallax(gsap: Gsap, target: Targets, trigger: Element | null, amount = -8) {
  if (!trigger) return
  return gsap.to(target, {
    yPercent: amount,
    ease: SP_EASE.none,
    scrollTrigger: { trigger, start: 'top bottom', end: 'bottom top', scrub: true },
  })
}

interface CountOpts {
  end: number
  decimals?: number
  comma?: boolean
  prefix?: string
  suffix?: string
  trigger?: Element | null
}

/** Count-up that writes textContent directly (same technique as the hero). */
export function spCountUp(gsap: Gsap, el: HTMLElement | null, o: CountOpts) {
  if (!el) return
  const state = { v: 0 }
  const render = (n: number) => {
    const fixed = o.decimals ? n.toFixed(o.decimals) : String(Math.floor(n))
    const body = o.comma
      ? Number(fixed).toLocaleString(undefined, {
          minimumFractionDigits: o.decimals ?? 0,
          maximumFractionDigits: o.decimals ?? 0,
        })
      : fixed
    el.textContent = `${o.prefix ?? ''}${body}${o.suffix ?? ''}`
  }
  render(0)
  return gsap.to(state, {
    v: o.end,
    duration: 2,
    ease: 'power2.out',
    onUpdate: () => render(state.v),
    scrollTrigger: o.trigger ? { trigger: o.trigger, start: 'top 88%', once: true } : undefined,
  })
}

/**
 * Pin a section and translate a horizontal track across it.
 * Returns nothing on mobile / reduced motion - the CSS falls back to a native
 * swipeable, scroll-snapped row instead, so no content is ever unreachable.
 */
export function spHorizontalPin(
  gsap: Gsap,
  section: HTMLElement | null,
  track: HTMLElement | null,
  opts: { endPad?: number } = {}
) {
  if (!section || !track) return
  if (prefersReducedMotion() || isNarrowViewport(1023)) return
  const distance = () => Math.max(0, track.scrollWidth - section.clientWidth)
  return gsap.to(track, {
    x: () => -distance(),
    ease: SP_EASE.none,
    scrollTrigger: {
      trigger: section,
      start: 'top top',
      end: () => `+=${distance() + (opts.endPad ?? 0)}`,
      pin: true,
      scrub: 0.8,
      anticipatePin: 1,
      invalidateOnRefresh: true,
    },
  })
}

/**
 * Pin a section and report 0..1 progress. Used for the scroll-driven
 * transformation sequences (sustainability, quality, company video).
 */
export function spScrubStage(
  gsap: Gsap,
  section: HTMLElement | null,
  onProgress: (p: number) => void,
  opts: { length?: string; pin?: boolean | Element } = {}
) {
  if (!section) return
  return gsap.timeline({
    scrollTrigger: {
      trigger: section,
      start: 'top top',
      end: opts.length ?? '+=220%',
      pin: opts.pin ?? true,
      scrub: 0.6,
      anticipatePin: 1,
      invalidateOnRefresh: true,
      onUpdate: (self: ScrollTriggerInstance) => onProgress(self.progress),
    },
  })
}
