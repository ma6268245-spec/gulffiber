'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'

export function ContactStrip() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    let ctx: { revert: () => void } | undefined
    const init = async () => {
      const { getGsap, fadeUpReveal } = await import('@/lib/animations')
      const gsap = await getGsap()
      ctx = gsap.context(() => {
        fadeUpReveal(gsap, '.cstrip-content', { trigger: sectionRef.current! })
      }, sectionRef)
    }
    init()

    return () => { if (ctx) ctx.revert() }
  }, [])

  return (
    <section
      ref={sectionRef}
      style={{
        background: 'var(--ivory)',
        paddingBlock: 'clamp(3.5rem, 7vh, 5.5rem)',
        borderTop: '1px solid var(--border-light)',
        borderBottom: '1px solid var(--border-light)',
      }}
    >
      <div className="container">
        <div className="cstrip-content" style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto' }}>
          {/* Header Row */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '1rem',
              marginBottom: '1rem',
              flexWrap: 'wrap',
            }}
          >
            {/* Avatar + phone icon */}
            <div style={{ position: 'relative', width: '3.25rem', height: '3.25rem' }}>
              <div
                style={{
                  width: '3.25rem',
                  height: '3.25rem',
                  borderRadius: '50%',
                  background: 'var(--ivory-deep)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  overflow: 'hidden',
                  border: '1px solid var(--border-light)',
                }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="var(--burg-primary)">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              </div>
              {/* Phone badge */}
              <div
                style={{
                  position: 'absolute',
                  bottom: '-2px',
                  right: '-2px',
                  width: '1.5rem',
                  height: '1.5rem',
                  borderRadius: '50%',
                  background: 'var(--burg-primary)',
                  border: '2px solid var(--ivory)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
              </div>
            </div>

            <h3
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: 'clamp(1.25rem, 2.5vw, 1.875rem)',
                fontWeight: 900,
                letterSpacing: '-0.02em',
                textTransform: 'uppercase',
                color: 'var(--ink)',
                margin: 0,
              }}
            >
              NEED A SPECIFIC MATERIAL?
            </h3>
          </div>

          <p
            style={{
              fontSize: '0.9375rem',
              lineHeight: 1.6,
              color: 'var(--muted)',
              marginBottom: '1.75rem',
            }}
          >
            Tell us your application, required specification and quantity. Our technical sales team can help identify the appropriate material.
          </p>

          {/* Action buttons */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <Link href="/contact" className="btn-primary">
              REQUEST A QUOTE
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
            <Link href="/contact" className="btn-secondary">
              REQUEST A SAMPLE
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 440px) {
          .cstrip-content .btn-primary,
          .cstrip-content .btn-secondary {
            width: 100% !important;
            justify-content: center !important;
          }
        }
      `}</style>
    </section>
  )
}
