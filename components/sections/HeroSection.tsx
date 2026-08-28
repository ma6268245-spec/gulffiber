'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const statRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    let ctx: any

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

        // Number count-up animation: 0 -> 350+, 0 -> 25+, 0 -> 4+
        const targets = [
          { val: 0, end: 350, suffix: '+' },
          { val: 0, end: 25, suffix: '+' },
          { val: 0, end: 4, suffix: '+' },
        ]

        targets.forEach((target, index) => {
          gsap.to(target, {
            val: target.end,
            duration: 2.2,
            ease: 'power2.out',
            delay: 0.4 + index * 0.1,
            onUpdate: () => {
              const el = statRefs.current[index]
              if (el) {
                el.textContent = `${Math.floor(target.val)}${target.suffix}`
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
                fontSize: 'clamp(2.15rem, 4.4vw, 5rem)',
                lineHeight: 0.92,
                letterSpacing: '-0.02em',
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
          Polyester fibre and textile material solutions for spinning, filling, nonwoven and industrial applications. Manufactured and supplied from Pakistan.
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
        <div style={{ display: 'flex', gap: '0', borderTop: '1px solid var(--border-light)', paddingTop: '1rem' }}>
          {[
            { num: '350+', label: 'Customers Served' },
            { num: '25+', label: 'Years in Business' },
            { num: '4+', label: 'Quality Certifications' },
          ].map((stat, i) => (
            <div
              key={stat.label}
              className="hero-stat"
              style={{
                flex: 1,
                paddingInlineEnd: '1.25rem',
                borderRight: i < 2 ? '1px solid var(--border-light)' : 'none',
                paddingInlineStart: i > 0 ? '1.25rem' : 0,
              }}
            >
              <div
                ref={(el) => { statRefs.current[i] = el }}
                className="hero-stat-num"
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: 'clamp(1.5rem, 2.2vw, 2.25rem)',
                  fontWeight: 900,
                  color: 'var(--burg-primary)',
                  lineHeight: 1,
                  marginBottom: '0.25rem',
                }}
              >
                0+
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.6875rem',
                  fontWeight: 800,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  color: 'var(--ink)',
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
            marginTop: '0.875rem',
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
      <div style={{ position: 'relative', overflow: 'hidden', minHeight: '100%' }}>
        <div
          className="hero-image-wrap"
          style={{
            position: 'absolute',
            inset: 0,
          }}
        >
          <Image
            src="/images/hero-loom.jpg"
            alt="Gulf Fibre industrial loom"
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

        {/* Floating text — FEATURED PRODUCT (Pure Text Positioned on Left of Image) */}
        <div
          className="hero-card hero-card-offer"
          style={{
            position: 'absolute',
            bottom: 'clamp(2rem, 3.5vh, 2.75rem)',
            left: 'clamp(1.5rem, 3vw, 2.5rem)',
            right: 'auto',
            background: 'transparent',
            border: 'none',
            boxShadow: 'none',
            padding: 0,
            zIndex: 3,
            textAlign: 'left',
          }}
        >
          {/* Eyebrow: Crimson Icon + FEATURED */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.45rem',
              marginBottom: '0.35rem',
            }}
          >
            {/* Red Spool Icon */}
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#D32F2F"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="9" />
              <circle cx="9" cy="10" r="2" />
              <circle cx="15" cy="10" r="2" />
              <circle cx="12" cy="16" r="2" />
            </svg>
            <span
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.8125rem',
                fontWeight: 900,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: '#D32F2F',
                lineHeight: 1,
                textShadow: '0 1px 8px rgba(255, 255, 255, 0.95), 0 2px 16px rgba(255, 255, 255, 0.85)',
              }}
            >
              FEATURED
            </span>
          </div>

          {/* Title: Bold High-Contrast Serif */}
          <h3
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(1.65rem, 2.4vw, 2.35rem)',
              fontWeight: 800,
              color: '#06122C',
              lineHeight: 1.1,
              margin: '0 0 0.35rem 0',
              letterSpacing: '-0.02em',
              textShadow: '0 1px 10px rgba(255, 255, 255, 0.95), 0 2px 20px rgba(255, 255, 255, 0.85)',
            }}
          >
            Recycled PSF Pro
          </h3>

          {/* Subtitle / Specs */}
          <p
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '0.875rem',
              color: '#0F172A',
              fontWeight: 700,
              letterSpacing: '0.02em',
              margin: 0,
              textShadow: '0 1px 8px rgba(255, 255, 255, 0.95), 0 2px 16px rgba(255, 255, 255, 0.85)',
            }}
          >
            Pakistan Origin · 1.2D–15D · MOQ 5T
          </p>
        </div>

      </div>

      <style>{`
        @media (max-width: 992px) {
          section {
            grid-template-columns: 1fr !important;
            min-height: auto !important;
          }
          section > div:last-child {
            min-height: 55vh !important;
            height: 55vh !important;
          }
          .hero-card-offer {
            bottom: 1.5rem !important;
            left: 1.5rem !important;
            right: auto !important;
          }
        }
        @media (max-width: 576px) {
          .hero-card-offer {
            bottom: 1rem !important;
            left: 1rem !important;
          }
        }
      `}</style>
    </section>
  )
}
