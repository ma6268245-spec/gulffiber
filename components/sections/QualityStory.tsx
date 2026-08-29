'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'

export function QualityStory() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    let ctx: { revert: () => void } | undefined;
    const init = async () => {
      const gsap = (await import('gsap')).default
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)

      ctx = gsap.context(() => {
        gsap.fromTo(
          '.qs-img-wrap',
          { opacity: 0, scale: 0.95 },
          {
            opacity: 1,
            scale: 1,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: { trigger: '.qs-img-wrap', start: 'top 85%', once: true },
          }
        )
        gsap.fromTo(
          '.qs-content > *',
          { opacity: 0, y: 35 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: { trigger: '.qs-content', start: 'top 85%', once: true },
          }
        )
        // Parallax image
        gsap.to('.qs-img', {
          yPercent: -6,
          ease: 'none',
          scrollTrigger: {
            trigger: '.qs-img-wrap',
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        })
      }, sectionRef)
    }
    init()

    return () => { if (ctx) ctx.revert() }
  }, [])

  return (
    <section ref={sectionRef} className="section-pad" style={{ background: 'var(--ivory)' }}>
      <div className="container">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 'clamp(3rem, 6vw, 7rem)',
            alignItems: 'center',
          }}
        >
          {/* Left: Image + floating badge */}
          <div style={{ position: 'relative' }}>
            <div
              className="qs-img-wrap"
              style={{
                position: 'relative',
                height: 'clamp(28rem, 55vh, 50rem)',
                overflow: 'hidden',
              }}
            >
              <Image
                src="/images/workshop-factory.jpg"
                alt="Gulf Fibre Manufacturing Facility"
                fill
                className="qs-img"
                style={{ objectFit: 'cover', objectPosition: 'center', scale: '1.06' }}
              />
            </div>
            {/* Floating badge */}
            <div
              style={{
                position: 'absolute',
                bottom: '2rem',
                right: '-1.5rem',
                background: 'var(--ivory)',
                boxShadow: '0 8px 40px rgba(0,0,0,0.12)',
                padding: '1.25rem 1.75rem',
                textAlign: 'center',
              }}
            >
              <div
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '2.5rem',
                  fontWeight: 900,
                  color: 'var(--burg-primary)',
                  lineHeight: 1,
                  marginBottom: '0.25rem',
                }}
              >
                25+
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.5625rem',
                  fontWeight: 700,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: 'var(--muted)',
                }}
              >
                Years in<br />Business
              </div>
            </div>
          </div>

          {/* Right: Content */}
          <div className="qs-content">
            <div className="eyebrow" style={{ marginBottom: '1.25rem' }}>
              <svg viewBox="0 0 16 16" fill="currentColor">
                <path d="M8 1L10 6H15L11 9L13 14L8 11L3 14L5 9L1 6H6L8 1Z" />
              </svg>
              Company Heritage
            </div>

            <h2 className="h-section" style={{ marginBottom: '1.5rem' }}>
              BUILT ON<br />
              <em>Experience</em>
            </h2>

            <p style={{ fontSize: '0.9375rem', lineHeight: 1.75, color: 'var(--muted)', marginBottom: '1.25rem', maxWidth: '50ch' }}>
              Established in 1999, Gulf Fibre Company has grown from a specialized domestic supplier into an established manufacturer of polyester staple fibres and technical textile materials in Pakistan.
            </p>

            <p style={{ fontSize: '0.9375rem', lineHeight: 1.75, color: 'var(--muted)', marginBottom: '2.5rem', maxWidth: '50ch' }}>
              Our manufacturing capabilities serve spinning mills, wadding producers, and non-woven fabric manufacturers with reliable product consistency, flexible specifications, and long-standing supplier partnerships.
            </p>

            <Link href="/company" className="btn-ghost">
              OUR COMPANY STORY
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .qs-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}
