'use client'

import { useEffect, useRef, useState } from 'react'

export interface HeroLine {
  text: string
  /** Rendered in the homepage's Cormorant italic sapphire accent style. */
  serif?: boolean
}

export interface HeroMeta {
  label: string
  value: string
}

/**
 * The shared subpage hero.
 *
 * Supports both the standard split 2-column image layout and full-bleed ambient
 * background video mode (with dark glassmorphic scrim, parallax scrub, and controls).
 */
export function PageHero({
  eyebrow,
  lines,
  lede,
  meta = [],
  aside,
  bgVideo,
  tone = 'light',
  children,
}: {
  eyebrow: string
  lines: HeroLine[]
  lede: string
  meta?: HeroMeta[]
  aside?: React.ReactNode
  bgVideo?: string
  tone?: 'light' | 'dark'
  /** Ignored - kept so existing callers still type-check. */
  coord?: string
  children?: React.ReactNode
}) {
  const ref = useRef<HTMLElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isMuted, setIsMuted] = useState(true)
  const [isPlaying, setIsPlaying] = useState(true)

  useEffect(() => {
    const video = videoRef.current
    if (!video || !bgVideo) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (isPlaying) video.play().catch(() => {})
        } else {
          video.pause()
        }
      },
      { threshold: 0.15 }
    )

    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [isPlaying, bgVideo])

  useEffect(() => {
    let ctx: { revert: () => void } | undefined
    let cancelled = false

    const run = async () => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
      const { getGsap } = await import('@/lib/animations')
      const gsap = await getGsap()
      if (cancelled) return

      ctx = gsap.context(() => {
        // Homepage HeroSection idiom: one timeline, power3.out, short stagger.
        const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
        tl.fromTo('.sph-eyebrow', { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.6, delay: 0.05 })
          .fromTo('.sph-line', { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.9, stagger: 0.1 }, '-=0.3')
          .fromTo('.sph-lede', { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.8 }, '-=0.55')
          .fromTo('.sph-extra', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.7 }, '-=0.6')
          .fromTo('.sph-meta-item', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.7, stagger: 0.08 }, '-=0.5')

        if (aside) {
          gsap.fromTo(
            '.sph-aside',
            { opacity: 0, scale: 1.06 },
            { opacity: 1, scale: 1, duration: 1.4, ease: 'power4.out', delay: 0.1 }
          )
        }

        if (bgVideo && videoRef.current) {
          gsap.to(videoRef.current, {
            yPercent: 12,
            scale: 1.08,
            ease: 'none',
            scrollTrigger: {
              trigger: ref.current,
              start: 'top top',
              end: 'bottom top',
              scrub: 0.5,
            },
          })
        }
      }, ref)
    }

    run()
    return () => {
      cancelled = true
      if (ctx) ctx.revert()
    }
  }, [aside, bgVideo])

  const dark = tone === 'dark' || Boolean(bgVideo)

  const togglePlay = () => {
    const video = videoRef.current
    if (!video) return
    if (video.paused) {
      video.play().then(() => setIsPlaying(true)).catch(() => {})
    } else {
      video.pause()
      setIsPlaying(false)
    }
  }

  const toggleMute = () => {
    const video = videoRef.current
    if (!video) return
    video.muted = !video.muted
    setIsMuted(video.muted)
  }

  return (
    <section
      ref={ref}
      className={`sp-hero ${bgVideo ? 'sp-hero--fullscreen-video' : ''} ${dark ? 'sp-dark' : ''}`.trim()}
    >
      {bgVideo && (
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 0,
            overflow: 'hidden',
            background: 'var(--burg-darker)',
          }}
        >
          <video
            ref={videoRef}
            src={bgVideo}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center',
              willChange: 'transform',
            }}
          />
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background:
                'linear-gradient(90deg, rgba(4, 15, 38, 0.78) 0%, rgba(4, 15, 38, 0.58) 48%, rgba(4, 15, 38, 0.2) 100%), linear-gradient(0deg, rgba(4, 15, 38, 0.7) 0%, transparent 45%)',
              zIndex: 1,
            }}
          />
        </div>
      )}

      <div className="sp-hero-body" style={bgVideo ? { position: 'relative', zIndex: 2 } : undefined}>
        <div className="eyebrow sph-eyebrow" style={{ marginBottom: 'clamp(0.5rem, 1vh, 0.85rem)' }}>
          <svg width="10" height="10" viewBox="0 0 10 10" aria-hidden="true" focusable="false">
            <path d="M5 0 L6.1 3.9 L10 5 L6.1 6.1 L5 10 L3.9 6.1 L0 5 L3.9 3.9 Z" fill="currentColor" />
          </svg>
          {eyebrow}
        </div>

        <h1 className="sp-hero-title">
          {lines.map((l, i) =>
            l.serif ? (
              <span key={i} className="sph-line" style={{ display: 'block' }}>
                <em>{l.text}</em>
              </span>
            ) : (
              <span key={i} className="sph-line" style={{ display: 'block' }}>
                {l.text}
              </span>
            )
          )}
        </h1>

        <p className="sp-lede sph-lede">{lede}</p>

        {children && (
          <div className="sph-extra" style={{ marginTop: 'clamp(0.85rem, 1.8vh, 1.35rem)' }}>
            {children}
          </div>
        )}

        {meta.length > 0 && (
          <dl className="sp-stats" style={{ marginTop: 'clamp(1.15rem, 2.2vh, 1.65rem)', marginBottom: 0 }}>
            {meta.map((m) => (
              <div key={m.label} className="sp-stat sph-meta-item">
                <dd className="sp-stat-num" style={{ margin: 0 }}>
                  {m.value}
                </dd>
                <dt className="sp-stat-label">{m.label}</dt>
              </div>
            ))}
          </dl>
        )}
      </div>

      {bgVideo && (
        <div
          className="sp-hero-video-controls"
          style={{
            position: 'absolute',
            zIndex: 15,
            display: 'flex',
            alignItems: 'center',
            gap: '0.65rem',
          }}
        >
          <button
            type="button"
            onClick={togglePlay}
            aria-label={isPlaying ? 'Pause film' : 'Play film'}
            title={isPlaying ? 'Pause' : 'Play'}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '2.75rem',
              height: '2.75rem',
              borderRadius: '50%',
              background: 'rgba(4, 15, 38, 0.75)',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
              border: '1px solid rgba(255, 255, 255, 0.25)',
              color: '#FFFFFF',
              cursor: 'pointer',
              transition: 'all 0.25s ease',
              boxShadow: '0 4px 16px rgba(0, 0, 0, 0.35)',
            }}
          >
            {isPlaying ? (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <rect x="6" y="4" width="4" height="16" rx="1" />
                <rect x="14" y="4" width="4" height="16" rx="1" />
              </svg>
            ) : (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <polygon points="6 4 20 12 6 20 6 4" />
              </svg>
            )}
          </button>

          <button
            type="button"
            onClick={toggleMute}
            aria-label={isMuted ? 'Unmute film' : 'Mute film'}
            title={isMuted ? 'Unmute audio' : 'Mute audio'}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '2.75rem',
              height: '2.75rem',
              borderRadius: '50%',
              background: 'rgba(4, 15, 38, 0.75)',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
              border: '1px solid rgba(255, 255, 255, 0.25)',
              color: '#FFFFFF',
              cursor: 'pointer',
              transition: 'all 0.25s ease',
              boxShadow: '0 4px 16px rgba(0, 0, 0, 0.35)',
            }}
          >
            {isMuted ? (
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" fill="currentColor" />
                <line x1="23" y1="9" x2="17" y2="15" />
                <line x1="17" y1="9" x2="23" y2="15" />
              </svg>
            ) : (
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" fill="currentColor" />
                <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
              </svg>
            )}
          </button>
        </div>
      )}

      {!bgVideo && aside && (
        <div className="sp-hero-media sph-aside">
          {aside}
          <div className="sp-hero-scrim" aria-hidden="true" />
        </div>
      )}
    </section>
  )
}

