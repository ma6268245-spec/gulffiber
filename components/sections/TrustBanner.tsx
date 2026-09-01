'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'

export function TrustBanner() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    let ctx: { revert: () => void } | undefined
    const init = async () => {
      const { getGsap, textLineReveal, fadeUpReveal, parallaxImage } = await import('@/lib/animations')
      const gsap = await getGsap()
      ctx = gsap.context(() => {
        textLineReveal(gsap, '.tb-line', { trigger: sectionRef.current!, start: 'top 75%' })
        fadeUpReveal(gsap, '.tb-body', { trigger: sectionRef.current!, delay: 0.4 })
        fadeUpReveal(gsap, '.tb-ctas', { trigger: sectionRef.current!, delay: 0.6 })
        fadeUpReveal(gsap, '.tb-thumbs', { trigger: sectionRef.current!, delay: 0.8 })
        parallaxImage(gsap, '.tb-plant-img', { trigger: sectionRef.current!, intensity: 6 })
      }, sectionRef)
    }
    init()

    return () => { if (ctx) ctx.revert() }
  }, [])

  return (
    <section
      id="trust"
      ref={sectionRef}
      className="tb-section"
      style={{
        background: 'var(--burg-primary)',
        position: 'relative',
        overflow: 'hidden',
        minHeight: '85vh',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
      }}
    >
      {/* Blurred decorative background */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          top: '10%',
          left: '5%',
          width: '35vw',
          height: '35vw',
          background: 'radial-gradient(circle, rgba(0,112,243,0.35) 0%, transparent 70%)',
          filter: 'blur(80px)',
          pointerEvents: 'none',
        }}
      />

      {/* LEFT: Content */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: 'clamp(4rem, 8vh, 8rem) var(--pad-x)',
          position: 'relative',
          zIndex: 2,
        }}
      >
        {/* Large stat */}
        <div style={{ marginBottom: '2rem' }}>
          <span
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 'clamp(4rem, 10vw, 12rem)',
              fontWeight: 900,
              lineHeight: 0.85,
              color: 'rgba(255,255,255,0.08)',
              letterSpacing: '-0.04em',
              display: 'block',
            }}
          >
            1M+
          </span>
        </div>

        {/* Heading */}
        <div style={{ marginBottom: '1.5rem' }}>
          <div className="clip-line">
            <span
              className="tb-line"
              style={{
                display: 'block',
                fontFamily: 'var(--font-sans)',
                fontSize: 'clamp(2rem, 5vw, 5.5rem)',
                fontWeight: 900,
                lineHeight: 0.92,
                letterSpacing: '-0.02em',
                textTransform: 'uppercase',
                color: 'var(--white)',
              }}
            >
              THREADS OF
            </span>
          </div>
          <div className="clip-line">
            <span
              className="tb-line"
              style={{
                display: 'block',
                fontFamily: 'var(--font-sans)',
                fontSize: 'clamp(2rem, 5vw, 5.5rem)',
                fontWeight: 900,
                lineHeight: 0.92,
                letterSpacing: '-0.02em',
                textTransform: 'uppercase',
                color: 'var(--white)',
              }}
            >
              THE{' '}
              <span
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontStyle: 'italic',
                  fontWeight: 600,
                  textTransform: 'none',
                  letterSpacing: '-0.01em',
                }}
              >
                Trust
              </span>
            </span>
          </div>
        </div>

        {/* Body */}
        <p
          className="tb-body"
          style={{
            fontFamily: 'var(--font-serif)',
            fontStyle: 'italic',
            fontSize: 'clamp(1rem, 2vw, 1.375rem)',
            lineHeight: 1.65,
            color: 'rgba(255,255,255,0.65)',
            maxWidth: '42ch',
            marginBottom: '2.5rem',
          }}
        >
          Our commitment goes beyond production — it&apos;s about building long-term relationships with every customer who chooses us.
        </p>

        {/* CTAs */}
        <div className="tb-ctas" style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
          <Link href="/products" className="btn-primary" style={{ background: 'var(--white)', color: 'var(--burg-primary)' }}>
            EXPLORE PRODUCTS
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
          <Link
            href="/company"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.875rem 0.5rem',
              background: 'transparent',
              color: 'var(--white)',
              fontFamily: 'var(--font-sans)',
              fontSize: '0.75rem',
              fontWeight: 700,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              border: 'none',
              textDecoration: 'none',
              transition: 'opacity 0.25s',
            }}
          >
            DISCOVER MORE
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        {/* Verification and Association badges */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '0.625rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'rgba(255,255,255,0.6)' }}>
              Accredited Certifications:
            </span>
            <span style={{ fontSize: '0.625rem', fontWeight: 800, background: 'rgba(255,255,255,0.12)', padding: '0.2rem 0.55rem', borderRadius: '9999px', color: '#FFFFFF', border: '1px solid rgba(255,255,255,0.2)' }}>
              ISO 9001:2015
            </span>
            <span style={{ fontSize: '0.625rem', fontWeight: 800, background: 'rgba(255,255,255,0.12)', padding: '0.2rem 0.55rem', borderRadius: '9999px', color: '#FFFFFF', border: '1px solid rgba(255,255,255,0.2)' }}>
              GRS Certified
            </span>
            <span style={{ fontSize: '0.625rem', fontWeight: 800, background: 'rgba(255,255,255,0.12)', padding: '0.2rem 0.55rem', borderRadius: '9999px', color: '#FFFFFF', border: '1px solid rgba(255,255,255,0.2)' }}>
              OEKO-TEX Standard 100
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '0.625rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'rgba(255,255,255,0.6)' }}>
              Trade Chamber:
            </span>
            <span style={{ fontSize: '0.625rem', fontWeight: 800, background: 'rgba(255,255,255,0.06)', padding: '0.2rem 0.55rem', borderRadius: '9999px', color: 'rgba(255,255,255,0.85)', border: '1px solid rgba(255,255,255,0.15)' }}>
              Lahore Chamber of Commerce & Industry (LCCI Member)
            </span>
          </div>
        </div>
      </div>

      {/* RIGHT: Production image */}
      <div style={{ position: 'relative', overflow: 'hidden' }}>
        <Image
          src="/images/Gallery/11.jpeg"
          alt="Continuous synthetic filament strands — Gulf Fiber Company"
          fill
          className="tb-plant-img"
          style={{
            objectFit: 'cover',
            objectPosition: 'center',
            scale: '1.1',
          }}
        />
        {/* Semi-transparent overlay */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to right, var(--burg-primary) 0%, rgba(10,75,184,0.3) 40%, transparent 70%)',
          }}
        />

        {/* Thumbnail images (bottom-right) */}
        <div
          className="tb-thumbs"
          style={{
            position: 'absolute',
            bottom: '2rem',
            right: '2rem',
            display: 'flex',
            gap: '0.75rem',
            zIndex: 2,
          }}
        >
          <div style={{ width: '8rem', height: '5.5rem', overflow: 'hidden', borderRadius: '0.375rem' }}>
            <Image
              src="/images/Gallery/Thermal-Bonded Polyester Wadding.jpeg"
              alt="Thermal-Bonded Polyester Wadding"
              width={128}
              height={88}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>
          <div style={{ width: '8rem', height: '5.5rem', overflow: 'hidden', borderRadius: '0.375rem' }}>
            <Image
              src="/images/process-fibre-lab.jpg"
              alt="Single fibre tensile testing equipment"
              width={128}
              height={88}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .tb-section { grid-template-columns: 1fr !important; min-height: auto !important; }
          .tb-section > div:nth-child(3) { min-height: 45vh; }
        }
        @media (max-width: 576px) {
          .tb-section > div:nth-child(3) { min-height: 35vh; }
          .tb-thumbs { display: none !important; }
        }
        @media (max-width: 900px) and (orientation: landscape) {
          .tb-section > div:nth-child(3) { min-height: 50vw; }
        }
      `}</style>
    </section>
  )
}
