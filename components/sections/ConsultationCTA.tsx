'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'

export function ConsultationCTA() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    let ctx: { revert: () => void } | undefined
    const init = async () => {
      const gsap = (await import('gsap')).default
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)

      ctx = gsap.context(() => {
        gsap.fromTo(
          '.cta-eyebrow',
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: 'power3.out',
            scrollTrigger: { trigger: sectionRef.current, start: 'top 85%', once: true },
          }
        )
        gsap.fromTo(
          '.cta-line',
          { yPercent: 100, opacity: 0 },
          {
            yPercent: 0,
            opacity: 1,
            duration: 0.9,
            stagger: 0.1,
            ease: 'power4.out',
            scrollTrigger: { trigger: sectionRef.current, start: 'top 85%', once: true },
            delay: 0.1,
          }
        )
        gsap.fromTo(
          '.cta-sub',
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', once: true },
            delay: 0.3,
          }
        )
        gsap.fromTo(
          '.cta-btn',
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: 'power3.out',
            scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', once: true },
            delay: 0.4,
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
      style={{
        background: 'var(--burg-darker)',
        paddingBlock: 'clamp(5rem, 12vh, 12rem)',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Subtle decorative background text */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          pointerEvents: 'none',
          overflow: 'hidden',
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: 'clamp(8rem, 20vw, 24rem)',
            fontWeight: 900,
            letterSpacing: '-0.05em',
            textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.02)',
            lineHeight: 1,
            whiteSpace: 'nowrap',
          }}
        >
          CONSULT
        </span>
      </div>

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        {/* Eyebrow */}
        <div
          className="cta-eyebrow"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.5rem',
            marginBottom: '2rem',
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '0.6875rem',
              fontWeight: 700,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: 'var(--burg-primary)',
            }}
          >
            B2B Procurement & Sampling
          </span>
        </div>

        {/* Heading */}
        <h2
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: 'clamp(2.5rem, 8vw, 9rem)',
            fontWeight: 900,
            lineHeight: 0.9,
            letterSpacing: '-0.03em',
            textTransform: 'uppercase',
            marginBottom: '2.5rem',
          }}
        >
          <div className="clip-line">
            <span className="cta-line" style={{ display: 'block', color: 'var(--white)' }}>
              READY TO
            </span>
          </div>
          <div className="clip-line">
            <span
              className="cta-line"
              style={{ display: 'block', color: 'var(--burg-primary)' }}
            >
              SOURCE
            </span>
          </div>
          <div className="clip-line">
            <span className="cta-line" style={{ display: 'block', color: 'var(--white)' }}>
              TEXTILE FIBRES?
            </span>
          </div>
        </h2>

        {/* Sub copy */}
        <p
          className="cta-sub"
          style={{
            fontSize: '0.9375rem',
            lineHeight: 1.75,
            color: 'rgba(255,255,255,0.55)',
            maxWidth: '52ch',
            margin: '0 auto 3rem',
          }}
        >
          Tell us what you need and our technical sales team will help you identify the right material and specification.
        </p>

        {/* CTA Button */}
        <Link
          href="/contact"
          className="cta-btn"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.75rem',
            padding: '1.25rem 3rem',
            background: 'var(--burg-primary)',
            color: 'var(--white)',
            fontFamily: 'var(--font-sans)',
            fontSize: '0.875rem',
            fontWeight: 700,
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
            textDecoration: 'none',
            borderRadius: '0',
            transition: 'background 0.25s ease, transform 0.25s ease',
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLAnchorElement).style.background = 'var(--burg-bright)'
              ; (e.currentTarget as HTMLAnchorElement).style.transform = 'scale(1.04)'
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLAnchorElement).style.background = 'var(--burg-primary)'
              ; (e.currentTarget as HTMLAnchorElement).style.transform = 'scale(1)'
          }}
        >
          REQUEST A QUOTE
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </section>
  )
}
