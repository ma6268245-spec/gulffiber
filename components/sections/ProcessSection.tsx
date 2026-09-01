'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

export function ProcessSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isPlaying, setIsPlaying] = useState(true)

  const togglePlay = () => {
    if (!videoRef.current) return
    if (videoRef.current.paused) {
      videoRef.current.play()
      setIsPlaying(true)
    } else {
      videoRef.current.pause()
      setIsPlaying(false)
    }
  }

  useEffect(() => {
    let ctx: { revert: () => void } | undefined;
    const init = async () => {
      const gsap = (await import('gsap')).default
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)

      ctx = gsap.context(() => {
        gsap.fromTo(
          '.proc-img-wrap',
          { opacity: 0, scale: 0.95 },
          {
            opacity: 1,
            scale: 1,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: { trigger: '.proc-img-wrap', start: 'top 85%', once: true },
          }
        )
        gsap.fromTo(
          '.proc-content > *',
          { opacity: 0, y: 35 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: { trigger: '.proc-content', start: 'top 85%', once: true },
          }
        )
      }, sectionRef)
    }
    init()

    return () => { if (ctx) ctx.revert() }
  }, [])

  return (
    <section
      ref={sectionRef}
      style={{ background: 'var(--burg-dark)', paddingBlock: 'clamp(5rem, 10vh, 10rem)' }}
    >
      <div className="container">
        <div
          className="proc-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 'clamp(2.5rem, 5vw, 7rem)',
            alignItems: 'center',
          }}
        >
          {/* Left: Video container */}
          <div style={{ position: 'relative' }}>
            <div
              className="proc-img-wrap"
              style={{
                position: 'relative',
                height: 'clamp(24rem, 50vh, 48rem)',
                overflow: 'hidden',
                background: '#040814',
              }}
            >
              <video
                ref={videoRef}
                src="/videos/product-hero.mp4"
                poster="/images/process-fibre.jpg"
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
                style={{
                  position: 'absolute',
                  inset: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: 'center',
                }}
              />
              {/* Dark overlay */}
              <div style={{ position: 'absolute', inset: 0, background: 'rgba(10, 17, 40, 0.35)', pointerEvents: 'none' }} />
            </div>
            {/* Play/Pause toggle button */}
            <button
              type="button"
              onClick={togglePlay}
              aria-label={isPlaying ? 'Pause video' : 'Play video'}
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 'clamp(3.5rem, 8vw, 5rem)',
                height: 'clamp(3.5rem, 8vw, 5rem)',
                borderRadius: '50%',
                background: 'var(--burg-primary)',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--white)',
                transition: 'transform 0.3s ease, background 0.3s, opacity 0.3s',
                opacity: isPlaying ? 0.85 : 1,
                boxShadow: '0 8px 24px rgba(10, 75, 184, 0.4)',
              }}
              onMouseEnter={(e) => {
                const btn = e.currentTarget
                btn.style.transform = 'translate(-50%, -50%) scale(1.12)'
                btn.style.background = 'var(--burg-bright)'
                btn.style.opacity = '1'
              }}
              onMouseLeave={(e) => {
                const btn = e.currentTarget
                btn.style.transform = 'translate(-50%, -50%) scale(1)'
                btn.style.background = 'var(--burg-primary)'
                btn.style.opacity = isPlaying ? '0.85' : '1'
              }}
            >
              {isPlaying ? (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <rect x="6" y="4" width="4" height="16" rx="1" />
                  <rect x="14" y="4" width="4" height="16" rx="1" />
                </svg>
              ) : (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                  <polygon points="5 3 19 12 5 21 5 3" />
                </svg>
              )}
            </button>
          </div>

          {/* Right: Content */}
          <div className="proc-content">
            <div
              className="eyebrow"
              style={{ marginBottom: '1.25rem', color: 'rgba(255,255,255,0.5)' }}
            >
              <svg viewBox="0 0 16 16" fill="currentColor">
                <path d="M8 1L10 6H15L11 9L13 14L8 11L3 14L5 9L1 6H6L8 1Z" />
              </svg>
              What We Offer
            </div>

            <h2
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: 'clamp(2rem, 4.5vw, 4.5rem)',
                fontWeight: 900,
                lineHeight: 0.95,
                letterSpacing: '-0.02em',
                textTransform: 'uppercase',
                color: 'var(--white)',
                marginBottom: '1.5rem',
              }}
            >
              ADVANCED FIBRE
              <br />
              <span
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontStyle: 'italic',
                  fontWeight: 600,
                  textTransform: 'none',
                  color: 'var(--burg-primary)',
                  fontSize: '1em',
                }}
              >
                Processing
              </span>
            </h2>

            <p
              style={{
                fontSize: '0.9375rem',
                lineHeight: 1.75,
                color: 'rgba(255,255,255,0.55)',
                maxWidth: '50ch',
                marginBottom: '2.5rem',
              }}
            >
              We believe transparency starts on the factory floor. Our integrated manufacturing process documents the collision of high-performance engineering and the precision of fine fibre production.
            </p>

            {/* Mini stats */}
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '1.5rem 2rem',
                marginBottom: '2.5rem',
                paddingBottom: '2.5rem',
                borderBottom: '1px solid var(--border-dark)',
              }}
            >
              {[
                { n: '10K+', l: 'MT Annual Output' },
                { n: '99.9%', l: 'On-Time Delivery' },
              ].map((s) => (
                <div key={s.l}>
                  <div
                    style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: '1.75rem',
                      fontWeight: 900,
                      color: 'var(--burg-primary)',
                      lineHeight: 1,
                      marginBottom: '0.25rem',
                    }}
                  >
                    {s.n}
                  </div>
                  <div
                    style={{
                      fontSize: '0.625rem',
                      fontWeight: 600,
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      color: 'rgba(255,255,255,0.4)',
                    }}
                  >
                    {s.l}
                  </div>
                </div>
              ))}
            </div>

            <Link
              href="/services"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                fontFamily: 'var(--font-sans)',
                fontSize: '0.6875rem',
                fontWeight: 700,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.6)',
                textDecoration: 'none',
                transition: 'color 0.2s, gap 0.2s',
              }}
            >
              ALL SERVICES
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .proc-grid {
            grid-template-columns: 1fr !important;
            gap: 2.5rem !important;
          }
          .proc-img-wrap {
            height: clamp(18rem, 50vw, 28rem) !important;
          }
        }
        @media (max-width: 480px) {
          .proc-img-wrap {
            height: clamp(14rem, 55vw, 20rem) !important;
          }
        }
      `}</style>
    </section>
  )
}
