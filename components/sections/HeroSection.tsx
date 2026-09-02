'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const statRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    let ctx: { revert: () => void } | undefined

    const initGsap = async () => {
      const gsap = (await import('gsap')).default
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)

      ctx = gsap.context(() => {
        const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

        // 1. Eyebrow
        tl.fromTo(
          '.hero-eyebrow',
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.6, delay: 0.1 }
        )

        // 2. Headline lines in from bottom
        tl.fromTo(
          '.hero-line',
          { yPercent: 100, opacity: 0 },
          { yPercent: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: 'power4.out' },
          '-=0.3'
        )

        // 3. Body text
        tl.fromTo(
          '.hero-body',
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.7 },
          '-=0.4'
        )

        // 4. CTAs
        tl.fromTo(
          '.hero-ctas',
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.6 },
          '-=0.4'
        )

        // 5. Stats
        tl.fromTo(
          '.hero-stat',
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.6, stagger: 0.08 },
          '-=0.3'
        )

        // Number count-up animation: 0 -> 15,000 T, 0 -> 350+, 0 -> 25+, 0 -> 4+
        const targets = [
          { val: 0, end: 15000, suffix: ' T', formatComma: true },
          { val: 0, end: 350, suffix: '+' },
          { val: 0, end: 25, suffix: '+' },
          { val: 0, end: 4, suffix: '+' },
        ]

        targets.forEach((target, index) => {
          gsap.to(target, {
            val: target.end,
            duration: 2.2,
            ease: 'power2.out',
            delay: 0.4 + index * 0.08,
            onUpdate: () => {
              const el = statRefs.current[index]
              if (el) {
                const formattedNum = target.formatComma
                  ? Math.floor(target.val).toLocaleString()
                  : Math.floor(target.val)
                el.textContent = `${formattedNum}${target.suffix}`
              }
            },
          })
        })

        // 6. Right side image reveal
        gsap.fromTo(
          '.hero-image-wrap',
          { opacity: 0, scale: 0.96 },
          { opacity: 1, scale: 1, duration: 1.1, ease: 'power3.out', delay: 0.2 }
        )

        // 7. Floating featured text reveal
        gsap.fromTo(
          '.hero-card',
          { opacity: 0, x: -20 },
          { opacity: 1, x: 0, duration: 0.8, ease: 'power3.out', delay: 0.5 }
        )

        // 8. Subtle Parallax on scroll
        gsap.to('.hero-img', {
          yPercent: -6,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        })
      }, sectionRef)
    }

    initGsap()

    return () => {
      if (ctx) ctx.revert()
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      className="hero-section"
      style={{
        background: 'var(--ivory)',
        minHeight: '100vh',
        display: 'grid',
        gridTemplateColumns: '1.05fr 0.95fr',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* LEFT: Content */}
      <div
        className="hero-content-col"
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: 'clamp(4rem, 5.5vh, 5.25rem) var(--pad-x) 1rem',
          zIndex: 2,
        }}
      >
        {/* Eyebrow */}
        <div className="hero-eyebrow" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '0.625rem' }}>
          <span className="eyebrow">
            <svg viewBox="0 0 16 16" fill="currentColor">
              <path d="M8 1L10 6H15L11 9L13 14L8 11L3 14L5 9L1 6H6L8 1Z" />
            </svg>
            EST. 1999 · PAKISTAN
          </span>
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.35rem',
              fontSize: '0.625rem',
              fontFamily: 'var(--font-sans)',
              fontWeight: 800,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: 'var(--ink)',
              background: 'rgba(10, 75, 184, 0.06)',
              border: '1px solid rgba(10, 75, 184, 0.15)',
              padding: '0.18rem 0.55rem',
              borderRadius: '9999px',
            }}
          >
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#22C55E' }} />
            GRS & ISO 9001 CERTIFIED
          </span>
        </div>

        {/* Heading */}
        <div style={{ marginBottom: '0.875rem' }}>
          <div className="clip-line">
            <span
              className="hero-line"
              style={{
                display: 'block',
                fontFamily: 'var(--font-sans)',
                fontSize: 'clamp(2.4rem, 4.8vw, 5.5rem)',
                fontWeight: 900,
                lineHeight: 0.9,
                letterSpacing: '-0.035em',
                textTransform: 'uppercase',
                color: 'var(--ink)',
              }}
            >
              PIONEERS OF
            </span>
          </div>
          <div className="clip-line">
            <span
              className="hero-line"
              style={{
                display: 'block',
                fontFamily: 'var(--font-sans)',
                fontSize: 'clamp(2.4rem, 4.8vw, 5.5rem)',
                fontWeight: 900,
                lineHeight: 0.9,
                letterSpacing: '-0.035em',
                textTransform: 'uppercase',
                color: 'var(--ink)',
              }}
            >
              REGENERATED
            </span>
          </div>
          <div className="clip-line">
            <span
              className="hero-line"
              style={{
                display: 'block',
                fontFamily: 'var(--font-serif)',
                fontStyle: 'italic',
                fontWeight: 600,
                fontSize: 'clamp(1.75rem, 3.4vw, 3.75rem)',
                lineHeight: 1.05,
                letterSpacing: '-0.015em',
                color: 'var(--burg-primary)',
              }}
            >
              Polyester Fiber in Pakistan
            </span>
          </div>
        </div>

        {/* Body text */}
        <p
          className="hero-body"
          style={{
            fontSize: '1rem',
            lineHeight: 1.65,
            color: 'var(--ink)',
            maxWidth: '48ch',
            marginBottom: '1.25rem',
            fontWeight: 500,
          }}
        >
          Polyester fiber and textile material solutions for spinning, filling, nonwoven and industrial applications. Manufactured and supplied from Pakistan.
        </p>

        {/* CTAs */}
        <div className="hero-ctas" style={{ display: 'flex', gap: '1.25rem', flexWrap: 'wrap', marginBottom: '1.25rem', alignItems: 'center' }}>
          <Link href="/products" className="btn-primary">
            BROWSE PRODUCTS
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
          <Link href="/company" className="btn-inline-story">
            <span className="play-orb">
              <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor">
                <polygon points="6 4 20 12 6 20 6 4" />
              </svg>
            </span>
            OUR STORY
          </Link>
        </div>

        {/* Stats */}
        <div className="hero-stats-row" style={{ display: 'flex', flexWrap: 'wrap', gap: '0', borderTop: '1px solid var(--border-light)', paddingTop: '1.25rem' }}>
          {[
            { num: '15,000 T', label: 'Yearly Production' },
            { num: '350+', label: 'Customers Served' },
            { num: '25+', label: 'Years in Business' },
            { num: '4+', label: 'Quality Certs' },
          ].map((stat, i) => (
            <div
              key={stat.label}
              className="hero-stat"
              style={{
                flex: 1,
                paddingInlineEnd: '1rem',
                borderRight: i < 3 ? '1px solid var(--border-light)' : 'none',
                paddingInlineStart: i > 0 ? '1rem' : 0,
              }}
            >
              <div
                ref={(el) => { statRefs.current[i] = el }}
                className="hero-stat-num"
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: 'clamp(1.5rem, 2.1vw, 2.25rem)',
                  fontWeight: 900,
                  color: 'var(--burg-primary)',
                  lineHeight: 1,
                  marginBottom: '0.35rem',
                  whiteSpace: 'nowrap',
                }}
              >
                0
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.6875rem',
                  fontWeight: 800,
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  color: 'var(--ink)',
                  whiteSpace: 'nowrap',
                }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Scroll indicator */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            marginTop: 'clamp(1.5rem, 2.5vh, 2.25rem)',
            opacity: 1,
          }}
        >
          <div style={{ width: '2.5rem', height: '2.5px', background: 'var(--burg-primary)' }} />
          <span style={{ fontSize: '0.6875rem', fontWeight: 800, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--ink)' }}>
            SCROLL TO EXPLORE
          </span>
        </div>
      </div>

      {/* RIGHT: Image + floating card */}
      <div className="hero-image-col" style={{ position: 'relative', overflow: 'hidden', minHeight: '100%' }}>
        <div
          className="hero-image-wrap"
          style={{
            position: 'absolute',
            inset: 0,
          }}
        >
          <Image
            src="/images/hero-production-line.jpg"
            alt="Gulf Fiber continuous draw stands and staple fiber production line"
            fill
            className="hero-img"
            style={{ objectFit: 'cover', objectPosition: 'center', scale: '1.05' }}
            priority
          />
          {/* Overlay gradient */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(to right, rgba(246,244,239,0.35) 0%, transparent 35%)',
            }}
          />
        </div>

        {/* Official ISO 9001:2015 Certified Seal */}
        <div
          className="hero-card hero-card-offer"
          style={{
            position: 'absolute',
            bottom: 'clamp(2rem, 3.5vh, 2.75rem)',
            right: 'clamp(1.5rem, 3vw, 2.5rem)',
            left: 'auto',
            zIndex: 3,
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <div
            style={{
              position: 'relative',
              width: 'clamp(6.5rem, 9vw, 9.25rem)',
              height: 'clamp(6.5rem, 9vw, 9.25rem)',
              filter: 'drop-shadow(0 14px 28px rgba(7, 20, 46, 0.28)) drop-shadow(0 2px 8px rgba(0, 0, 0, 0.15))',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Image
              src="/images/iso-9001-seal-v2.png"
              alt="ISO 9001 Certified Company"
              width={180}
              height={180}
              style={{ objectFit: 'contain', width: '100%', height: '100%' }}
              priority
            />
          </div>
        </div>

      </div>

      <style>{`
        @media (max-width: 1024px) {
          .hero-section {
            position: relative !important;
            display: flex !important;
            flex-direction: column !important;
            justify-content: center !important;
            min-height: auto !important;
            grid-template-columns: 1fr !important;
            overflow: hidden !important;
            background: var(--ivory) !important;
          }
          .hero-image-col {
            position: absolute !important;
            inset: 0 !important;
            width: 100% !important;
            height: 100% !important;
            min-height: 100% !important;
            z-index: 1 !important;
            pointer-events: none !important;
            overflow: hidden !important;
          }
          .hero-image-wrap {
            position: absolute !important;
            inset: 0 !important;
            width: 100% !important;
            height: 100% !important;
          }
          .hero-img {
            position: absolute !important;
            inset: 0 !important;
            width: 100% !important;
            height: 100% !important;
            object-fit: cover !important;
            object-position: center !important;
            filter: blur(1px) !important;
            transform: scale(1.02) !important;
            opacity: 0.65 !important;
          }
          .hero-image-wrap > div:last-child {
            position: absolute !important;
            inset: 0 !important;
            background: linear-gradient(180deg, rgba(246, 244, 239, 0.38) 0%, rgba(246, 244, 239, 0.58) 100%) !important;
            z-index: 2 !important;
          }
          .hero-content-col {
            position: relative !important;
            z-index: 3 !important;
            padding-top: clamp(6.25rem, 11vh, 7.5rem) !important;
            padding-bottom: clamp(2.5rem, 5vh, 3.5rem) !important;
          }
          .hero-card-offer {
            display: none !important;
          }
        }
        [data-theme='dark'] .hero-image-wrap > div:last-child {
          background: linear-gradient(180deg, rgba(4, 15, 38, 0.45) 0%, rgba(4, 15, 38, 0.68) 100%) !important;
        }
        @media (max-width: 576px) {
          .hero-content-col {
            padding-top: clamp(5.75rem, 12vh, 6.75rem) !important;
            padding-bottom: 2rem !important;
          }
        }
        @media (max-width: 480px) {
          .hero-stats-row {
            gap: 1rem 0 !important;
          }
          .hero-stats-row .hero-stat {
            flex: 0 0 50% !important;
            min-width: 0 !important;
          }
          .hero-stats-row .hero-stat:nth-child(2) {
            border-right: none !important;
          }
          .hero-stats-row .hero-stat:nth-child(3) {
            border-right: 1px solid var(--border-light) !important;
            padding-inline-start: 0 !important;
          }
        }
        @media (max-width: 360px) {
          .hero-stat-num {
            font-size: clamp(1.4rem, 7vw, 1.85rem) !important;
          }
          .hero-stat-label {
            font-size: 0.625rem !important;
          }
        }
        @media (max-width: 992px) and (orientation: landscape) {
          .hero-section {
            min-height: auto !important;
          }
          .hero-section > div:last-child {
            min-height: 60vw !important;
            height: auto !important;
          }
        }
        @media (max-height: 480px) and (orientation: landscape) {
          .hero-section {
            min-height: auto !important;
          }
        }
      `}</style>
    </section>
  )
}
