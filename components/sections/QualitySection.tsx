'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'

export function QualitySection() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    let ctx: { revert: () => void } | undefined;
    const init = async () => {
      const { getGsap, fadeUpReveal, clipReveal } = await import('@/lib/animations')
      const gsap = await getGsap()
      ctx = gsap.context(() => {
        fadeUpReveal(gsap, '.qt-heading, .qt-eyebrow', { trigger: '.qt-heading' })
        clipReveal(gsap, '.qt-img-1', 'up')
        clipReveal(gsap, '.qt-img-2', 'up', { trigger: '.qt-img-2' })
        fadeUpReveal(gsap, '.qt-card', { trigger: '.qt-cards', stagger: 0.12 })
      }, sectionRef)
    }
    init()

    return () => { if (ctx) ctx.revert() }
  }, [])

  return (
    <section ref={sectionRef} className="section-pad" style={{ background: 'var(--ivory)' }}>
      <div className="container">
        {/* Header row */}
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            marginBottom: '3rem',
            flexWrap: 'wrap',
            gap: '1rem',
          }}
        >
          <div>
            <div className="qt-eyebrow eyebrow" style={{ marginBottom: '1rem' }}>
              <svg viewBox="0 0 16 16" fill="currentColor">
                <path d="M8 1L10 6H15L11 9L13 14L8 11L3 14L5 9L1 6H6L8 1Z" />
              </svg>
              Quality Standards
            </div>
            <h2 className="qt-heading h-section">
              QUALITY WITHOUT<br />
              <em>Compromise</em>
            </h2>
          </div>
          <Link href="/quality" className="btn-ghost">
            QUALITY ASSURANCE
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        {/* Asymmetric grid: images + feature cards */}
        <div
          className="qt-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: '1.2fr 1fr 1fr',
            gridTemplateRows: 'auto auto',
            gap: '1.25rem',
          }}
        >
          {/* Left tall image */}
          <div
            className="qt-img-1"
            style={{
              gridRow: 'span 2',
              position: 'relative',
              minHeight: '32rem',
              overflow: 'hidden',
            }}
          >
            <Image
              src="/images/quality-lab-equipment.jpg"
              alt="Quality control testing apparatus and precision balance in Gulf Fiber laboratory"
              fill
              style={{ objectFit: 'cover' }}
            />
          </div>

          {/* Top-center: icon card */}
          <div
            className="qt-card qt-cards"
            style={{
              background: 'var(--white)',
              padding: '2rem',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              border: '1px solid var(--border-light)',
            }}
          >
            <div style={{ marginBottom: '1.25rem', color: 'var(--burg-primary)' }}>
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                <path d="M9 12l2 2 4-4" />
              </svg>
            </div>
            <h4 style={{ fontFamily: 'var(--font-sans)', fontSize: '0.9375rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.04em', color: 'var(--ink)', marginBottom: '0.5rem' }}>
              Quality Management
            </h4>
            <p style={{ fontSize: '0.8125rem', lineHeight: 1.65, color: 'var(--muted)' }}>
              Structured ISO 9001 quality management procedures ensuring strict parameter control across every batch.
            </p>
          </div>

          {/* Top-right: second image */}
          <div
            className="qt-img-2"
            style={{
              position: 'relative',
              minHeight: '15rem',
              overflow: 'hidden',
            }}
          >
            <Image
              src="/images/process-fiber-lab.jpg"
              alt="Electronic single fiber tensile gauging tester in Gulf Fiber laboratory"
              fill
              style={{ objectFit: 'cover' }}
            />
          </div>

          {/* Bottom-center: icon card */}
          <div
            className="qt-card"
            style={{
              background: 'var(--white)',
              padding: '2rem',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              border: '1px solid var(--border-light)',
            }}
          >
            <div style={{ marginBottom: '1.25rem', color: 'var(--burg-primary)' }}>
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="12" cy="12" r="10" />
                <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
              </svg>
            </div>
            <h4 style={{ fontFamily: 'var(--font-sans)', fontSize: '0.9375rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.04em', color: 'var(--ink)', marginBottom: '0.5rem' }}>
              Testing & Inspection
            </h4>
            <p style={{ fontSize: '0.8125rem', lineHeight: 1.65, color: 'var(--muted)' }}>
              In-house inspection of tenacity, elongation, crimp retention, and moisture content before dispatch.
            </p>
          </div>

          {/* Bottom-right: ethical badge card */}
          <div
            className="qt-card"
            style={{
              background: 'var(--burg-primary)',
              padding: '2rem',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
            }}
          >
            <div
              style={{
                width: '5rem',
                height: '5rem',
                borderRadius: '50%',
                border: '2px solid rgba(255,255,255,0.3)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1rem',
              }}
            >
              <span style={{ fontFamily: 'var(--font-sans)', fontSize: '1.5rem', fontWeight: 900, color: 'var(--white)' }}>
                COA
              </span>
            </div>
            <h4 style={{ fontFamily: 'var(--font-sans)', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--white)' }}>
              BATCH TRACEABILITY
            </h4>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .qt-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 600px) {
          .qt-grid { grid-template-columns: 1fr !important; }
          .qt-img-1 {
            grid-row: auto !important;
            min-height: clamp(14rem, 55vw, 22rem) !important;
          }
          .qt-img-2 {
            min-height: 13rem !important;
          }
        }
      `}</style>
    </section>
  )
}
