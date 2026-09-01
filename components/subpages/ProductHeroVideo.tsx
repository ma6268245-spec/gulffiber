'use client'

import { useEffect, useRef, useState } from 'react'

interface ProductHeroVideoProps {
  src?: string
  poster?: string
  alt?: string
}

export function ProductHeroVideo({
  src = '/videos/company-page.mp4',
  poster = '/images/collection-rolls.jpg',
  alt = 'Gulf Fibre manufacturing and material production film',
}: ProductHeroVideoProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isMuted, setIsMuted] = useState(true)
  const [isPlaying, setIsPlaying] = useState(true)
  const [hasLoaded, setHasLoaded] = useState(false)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    // IntersectionObserver: auto-pause when scrolled out of view, auto-resume when in view
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (isPlaying) {
            video.play().catch(() => {
              // Autoplay policy fallback: mute and play
              video.muted = true
              setIsMuted(true)
              video.play().catch(() => {})
            })
          }
        } else {
          video.pause()
        }
      },
      { threshold: 0.15 }
    )

    if (containerRef.current) {
      observer.observe(containerRef.current)
    }

    return () => {
      observer.disconnect()
    }
  }, [isPlaying])

  // Subtle scroll parallax & scale effect on scroll
  useEffect(() => {
    let ctx: { revert: () => void } | undefined

    const initScroll = async () => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
      const gsap = (await import('gsap')).default
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)

      if (!containerRef.current || !videoRef.current) return

      ctx = gsap.context(() => {
        gsap.to(videoRef.current, {
          yPercent: 12,
          scale: 1.08,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 0.5,
          },
        })
      }, containerRef)
    }

    initScroll()

    return () => {
      if (ctx) ctx.revert()
    }
  }, [])

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
    <div
      ref={containerRef}
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        minHeight: '100%',
        overflow: 'hidden',
        background: 'var(--burg-darker)',
      }}
    >
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        onLoadedData={() => setHasLoaded(true)}
        aria-label={alt}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: 'center',
          willChange: 'transform',
          transition: 'opacity 0.6s ease',
          opacity: hasLoaded ? 1 : 0.85,
        }}
      />

      {/* Ambient gradient scrim on left and bottom */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to right, rgba(246, 248, 252, 0.35) 0%, transparent 35%), linear-gradient(to top, rgba(4, 15, 38, 0.6) 0%, transparent 35%)',
          pointerEvents: 'none',
        }}
      />

      {/* Top Badge: Production Reel */}
      <div
        style={{
          position: 'absolute',
          top: 'clamp(1rem, 2vh, 1.5rem)',
          right: 'clamp(1rem, 2vw, 1.5rem)',
          zIndex: 3,
          display: 'flex',
          alignItems: 'center',
          gap: '0.45rem',
          padding: '0.35rem 0.75rem',
          borderRadius: '9999px',
          background: 'rgba(4, 15, 38, 0.75)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          color: '#FFFFFF',
          fontSize: '0.625rem',
          fontFamily: 'var(--font-sans)',
          fontWeight: 800,
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          boxShadow: '0 4px 16px rgba(0, 0, 0, 0.25)',
        }}
      >
        <span
          style={{
            display: 'inline-block',
            width: '6px',
            height: '6px',
            borderRadius: '50%',
            background: '#22C55E',
            boxShadow: '0 0 8px #22C55E',
          }}
        />
        Production Floor Film
      </div>

      {/* Bottom Floating Action Pill (Play/Pause & Sound) */}
      <div
        style={{
          position: 'absolute',
          bottom: 'clamp(1.25rem, 2.5vh, 2rem)',
          right: 'clamp(1.25rem, 2.5vw, 2rem)',
          zIndex: 3,
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
        }}
      >
        {/* Play/Pause Button */}
        <button
          type="button"
          onClick={togglePlay}
          aria-label={isPlaying ? 'Pause film' : 'Play film'}
          title={isPlaying ? 'Pause' : 'Play'}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '2.5rem',
            height: '2.5rem',
            borderRadius: '50%',
            background: 'rgba(4, 15, 38, 0.8)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            border: '1px solid rgba(255, 255, 255, 0.25)',
            color: '#FFFFFF',
            cursor: 'pointer',
            transition: 'all 0.25s ease',
            boxShadow: '0 4px 16px rgba(0, 0, 0, 0.3)',
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

        {/* Audio Mute/Unmute Button */}
        <button
          type="button"
          onClick={toggleMute}
          aria-label={isMuted ? 'Unmute film' : 'Mute film'}
          title={isMuted ? 'Unmute audio' : 'Mute audio'}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '2.5rem',
            height: '2.5rem',
            borderRadius: '50%',
            background: 'rgba(4, 15, 38, 0.8)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            border: '1px solid rgba(255, 255, 255, 0.25)',
            color: '#FFFFFF',
            cursor: 'pointer',
            transition: 'all 0.25s ease',
            boxShadow: '0 4px 16px rgba(0, 0, 0, 0.3)',
          }}
        >
          {isMuted ? (
            /* Muted Icon */
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" fill="currentColor" />
              <line x1="23" y1="9" x2="17" y2="15" />
              <line x1="17" y1="9" x2="23" y2="15" />
            </svg>
          ) : (
            /* Sound Waves Icon */
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" fill="currentColor" />
              <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
              <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
            </svg>
          )}
        </button>
      </div>
    </div>
  )
}
