'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import { MILESTONES, type CompanyMilestone } from '@/lib/data/company'

/* ===========================================================================
   COMPACT ALTERNATING INDUSTRIAL TIMELINE WITH SMOOTH REVEAL
   ---------------------------------------------------------------------------
   - Compact width (880px max-width) and scaled image cards
   - Central luminous timeline rail with scroll-scrub fill
   - Smooth staggered GSAP ScrollTrigger reveals on every milestone
   =========================================================================== */

export function TimelineChapter() {
  const containerRef = useRef<HTMLDivElement>(null)
  const railFillRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let ctx: { revert: () => void } | undefined
    let cancelled = false

    const initAnimation = async () => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        if (railFillRef.current) railFillRef.current.style.transform = 'scaleY(1)'
        return
      }

      const { getGsap } = await import('@/lib/animations')
      const gsap = await getGsap()
      if (cancelled || !containerRef.current) return

      const container = containerRef.current
      if (!container) return

      ctx = gsap.context(() => {
        // 1. Scrub rail fill as the user scrolls through the timeline
        if (railFillRef.current) {
          gsap.fromTo(
            railFillRef.current,
            { scaleY: 0 },
            {
              scaleY: 1,
              ease: 'none',
              scrollTrigger: {
                trigger: container,
                start: 'top 75%',
                end: 'bottom 60%',
                scrub: 0.6,
              },
            }
          )
        }

        // 2. Smooth reveal for each row
        const rows = container.querySelectorAll('.timeline-row')
        rows.forEach((row) => {
          const img = row.querySelector('.timeline-img-box')
          const text = row.querySelector('.timeline-text-box')
          const dot = row.querySelector('.timeline-center-dot')

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: row,
              start: 'top 82%',
              once: true,
            },
          })

          if (dot) {
            tl.fromTo(
              dot,
              { scale: 0, opacity: 0 },
              { scale: 1, opacity: 1, duration: 0.45, ease: 'back.out(2)' },
              0
            )
          }

          if (img) {
            tl.fromTo(
              img,
              { opacity: 0, y: 35, scale: 0.96 },
              { opacity: 1, y: 0, scale: 1, duration: 0.75, ease: 'power3.out' },
              0.05
            )
          }

          if (text) {
            tl.fromTo(
              text,
              { opacity: 0, y: 30 },
              { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' },
              0.12
            )
          }
        })
      }, containerRef)
    }

    initAnimation()

    return () => {
      cancelled = true
      if (ctx) ctx.revert()
    }
  }, [])

  return (
    <div
      ref={containerRef}
      style={{
        position: 'relative',
        maxWidth: '880px',
        margin: '0 auto',
        width: '100%',
      }}
    >
      {/* ── Central Vertical Glowing Rail Background ── */}
      <div
        className="timeline-center-rail"
        style={{
          position: 'absolute',
          top: '1.5rem',
          bottom: '1.5rem',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '2px',
          background: 'rgba(255, 255, 255, 0.08)',
          zIndex: 1,
        }}
      >
        {/* Dynamic Glowing Fill Line */}
        <div
          ref={railFillRef}
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(180deg, #38B6FF 0%, #0A4BB8 50%, #38B6FF 100%)',
            boxShadow: '0 0 10px #38B6FF, 0 0 20px rgba(56, 182, 255, 0.4)',
            transformOrigin: 'top',
            transform: 'scaleY(0)',
          }}
        />
      </div>

      {/* ── Timeline Rows ── */}
      <div
        className="timeline-rows-list"
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 'clamp(2.5rem, 5vh, 4rem)',
          position: 'relative',
          zIndex: 2,
        }}
      >
        {MILESTONES.map((m: CompanyMilestone, idx: number) => {
          const isEven = idx % 2 === 0

          return (
            <div
              key={m.id}
              className={`timeline-row ${isEven ? 'timeline-row--even' : 'timeline-row--odd'}`}
              style={{
                position: 'relative',
              }}
            >
              {/* Center / Left Dot on Rail */}
              <div
                className="timeline-center-dot"
                style={{
                  width: '12px',
                  height: '12px',
                  borderRadius: '50%',
                  background: '#38B6FF',
                  boxShadow: '0 0 10px #38B6FF, 0 0 18px rgba(56, 182, 255, 0.6)',
                  border: '2px solid #040F26',
                  zIndex: 3,
                }}
              />

              {/* ── Image Column ── */}
              <div className="timeline-img-col">
                <div
                  className="timeline-img-box"
                  style={{
                    position: 'relative',
                    borderRadius: '14px',
                    overflow: 'hidden',
                    border: '1px solid rgba(255, 255, 255, 0.12)',
                    boxShadow: '0 12px 28px rgba(0, 0, 0, 0.35)',
                    aspectRatio: '16 / 10',
                    maxWidth: '380px',
                    width: '100%',
                    background: 'rgba(255, 255, 255, 0.03)',
                    transition: 'transform 0.3s ease, border-color 0.3s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(1.02)'
                    e.currentTarget.style.borderColor = 'rgba(56, 182, 255, 0.5)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1)'
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.12)'
                  }}
                >
                  <Image
                    src={m.image}
                    alt={m.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 400px"
                    style={{ objectFit: 'cover' }}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'linear-gradient(180deg, rgba(4, 15, 38, 0) 65%, rgba(4, 15, 38, 0.6) 100%)',
                    }}
                  />
                </div>
              </div>

              {/* ── Text Column ── */}
              <div className="timeline-text-col">
                <div className="timeline-text-box" style={{ maxWidth: '380px', width: '100%' }}>
                  <span
                    className="timeline-category"
                    style={{
                      fontSize: '0.6875rem',
                      fontWeight: 800,
                      fontFamily: 'var(--font-sans)',
                      textTransform: 'uppercase',
                      letterSpacing: '0.08em',
                      color: 'var(--burg-bright, #38B6FF)',
                      display: 'block',
                      marginBottom: '0.25rem',
                    }}
                  >
                    {m.category}
                  </span>
                  <div
                    className="timeline-marker"
                    style={{
                      fontSize: 'clamp(2rem, 3.2vw, 2.65rem)',
                      fontWeight: 900,
                      fontFamily: 'var(--font-sans)',
                      letterSpacing: '-0.03em',
                      color: '#FFFFFF',
                      lineHeight: 1,
                    }}
                  >
                    {m.marker}
                  </div>
                  <div
                    className="timeline-divider"
                    style={{
                      width: '100%',
                      height: '1px',
                      background: 'rgba(255, 255, 255, 0.12)',
                      margin: '0.65rem 0 0.85rem',
                    }}
                  />
                  <p
                    className="timeline-body"
                    style={{
                      fontSize: '0.875rem',
                      lineHeight: 1.65,
                      color: 'rgba(255, 255, 255, 0.72)',
                      margin: 0,
                    }}
                  >
                    {m.body}
                  </p>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* ── Responsive CSS ── */}
      <style jsx>{`
        /* Desktop & Tablet: 2-column alternating grid */
        @media (min-width: 769px) {
          .timeline-row {
            display: grid;
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: clamp(1.5rem, 3.5vw, 2.75rem);
            align-items: center;
          }
          .timeline-center-dot {
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
          }
          .timeline-row--even .timeline-img-col {
            order: 1;
            padding-right: clamp(0.25rem, 1.5vw, 1rem);
          }
          .timeline-row--even .timeline-img-box {
            margin-left: auto;
          }
          .timeline-row--even .timeline-text-col {
            order: 2;
            padding-left: clamp(0.25rem, 1.5vw, 1rem);
          }
          .timeline-row--odd .timeline-text-col {
            order: 1;
            padding-right: clamp(0.25rem, 1.5vw, 1rem);
          }
          .timeline-row--odd .timeline-text-box {
            margin-left: auto;
          }
          .timeline-row--odd .timeline-img-col {
            order: 2;
            padding-left: clamp(0.25rem, 1.5vw, 1rem);
          }
        }

        /* Phone: Left-anchored timeline rail with consistent Text -> Image order */
        @media (max-width: 768px) {
          .timeline-root-container {
            padding-left: 0.25rem !important;
            padding-right: 0.25rem !important;
          }
          .timeline-center-rail {
            left: 0.75rem !important;
            top: 0.5rem !important;
            bottom: 0.5rem !important;
            transform: none !important;
          }
          .timeline-row {
            display: flex !important;
            flex-direction: column !important;
            padding-left: 1.85rem !important;
            gap: 0.95rem !important;
          }
          .timeline-center-dot {
            position: absolute !important;
            left: 0.75rem !important;
            top: 0.25rem !important;
            transform: translate(-50%, 0) !important;
          }
          .timeline-text-col {
            order: 1 !important;
            padding: 0 !important;
            width: 100% !important;
          }
          .timeline-img-col {
            order: 2 !important;
            padding: 0 !important;
            width: 100% !important;
          }
          .timeline-text-box {
            max-width: 100% !important;
            margin: 0 !important;
            width: 100% !important;
          }
          .timeline-img-box {
            max-width: 100% !important;
            margin: 0 !important;
            width: 100% !important;
            border-radius: 12px !important;
          }
          .timeline-marker {
            font-size: clamp(1.75rem, 6vw, 2.2rem) !important;
          }
          .timeline-body {
            font-size: 0.8125rem !important;
            line-height: 1.6 !important;
          }
        }
      `}</style>
    </div>
  )
}
