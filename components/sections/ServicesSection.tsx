'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

const SERVICES = [
  {
    num: '01',
    title: 'CUSTOM SPECIFICATIONS',
    badge: 'Tailored Specs',
    desc: 'Tailored manufacturing across denier, cut length, crimp frequency, lustre, and finish chemistry to match your mill setup.',
    img: '/images/Gallery/12.jpeg',
  },
  {
    num: '02',
    title: 'QUALITY & TESTING',
    badge: 'Lab Verified',
    desc: 'Comprehensive in-house batch testing, tensile analysis, moisture verification, and official Certificate of Analysis (COA) with every shipment.',
    img: '/images/quality-lab-equipment.jpg',
  },
  {
    num: '03',
    title: 'PACKAGING & HANDLING',
    badge: 'Moisture Sealed',
    desc: 'Export-grade moisture-sealed baling (280kg standard) and protective roll wrapping for damage-free transit and automated warehouse handling.',
    img: '/images/Gallery/23.jpeg',
  },
  {
    num: '04',
    title: 'EXPORT & LOGISTICS',
    badge: 'Global Dispatch',
    desc: 'Full export documentation, container loading, and dedicated shipping coordination for reliable delivery across worldwide spinning markets.',
    img: '/images/Gallery/14.jpeg',
  },
]

export function ServicesSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [activeRow, setActiveRow] = useState<number | null>(null)

  useEffect(() => {
    let ctx: { revert: () => void } | undefined;
    const init = async () => {
      const gsap = (await import('gsap')).default
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)

      ctx = gsap.context(() => {
        gsap.fromTo(
          '.srv-heading',
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: 'power4.out',
            scrollTrigger: { trigger: '.srv-heading', start: 'top 88%', once: true },
          }
        )

        gsap.fromTo(
          '.srv-row',
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.08,
            ease: 'power3.out',
            scrollTrigger: { trigger: '.srv-rows', start: 'top 85%', once: true },
          }
        )
      }, sectionRef)
    }
    init()

    return () => { if (ctx) ctx.revert() }
  }, [])

  return (
    <section
      id="services"
      ref={sectionRef}
      style={{
        background: 'var(--burg-darker)',
        paddingBlock: 'clamp(5rem, 10vh, 10rem)',
      }}
    >
      <div className="container">
        {/* Header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            marginBottom: '3.5rem',
            flexWrap: 'wrap',
            gap: '1.5rem',
          }}
        >
          <div>
            <div
              className="eyebrow"
              style={{ marginBottom: '1rem', color: 'rgba(255,255,255,0.5)' }}
            >
              <svg viewBox="0 0 16 16" fill="currentColor">
                <path d="M8 1L10 6H15L11 9L13 14L8 11L3 14L5 9L1 6H6L8 1Z" />
              </svg>
              Our Services
            </div>
            <h2
              className="srv-heading"
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: 'clamp(2rem, 5vw, 5.5rem)',
                fontWeight: 900,
                lineHeight: 0.92,
                letterSpacing: '-0.02em',
                textTransform: 'uppercase',
                color: 'var(--white)',
              }}
            >
              WHAT WE<br />
              <span
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontStyle: 'italic',
                  fontWeight: 600,
                  fontSize: '1em',
                  textTransform: 'none',
                  color: 'var(--burg-primary)',
                }}
              >
                Manufacture
              </span>
            </h2>
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
              color: 'rgba(255,255,255,0.5)',
              textDecoration: 'none',
              transition: 'color 0.2s',
            }}
          >
            ALL SERVICES
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        {/* Service rows */}
        <div className="srv-rows">
          {SERVICES.map((srv, i) => (
            <div
              key={srv.num}
              className="srv-row"
              data-active={activeRow === i}
              onClick={() => setActiveRow((prev) => (prev === i ? null : i))}
              onMouseEnter={() => setActiveRow(i)}
              onMouseLeave={() => setActiveRow(null)}
              style={{
                display: 'grid',
                gridTemplateColumns: '4.5rem 1fr auto auto',
                alignItems: 'center',
                gap: '1.5rem',
                padding: '1.75rem 0',
                borderTop: '1px solid var(--border-dark)',
                cursor: 'pointer',
                transition: 'background 0.2s',
                borderRadius: '2px',
              }}
            >
              {/* Number */}
              <span
                className="srv-num"
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  letterSpacing: '0.1em',
                  color: activeRow === i ? 'var(--burg-primary)' : 'rgba(255,255,255,0.25)',
                  transition: 'color 0.3s',
                }}
              >
                {srv.num}
              </span>

              {/* Content */}
              <div className="srv-content">
                <h3
                  className="srv-title"
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: 'clamp(1rem, 2.2vw, 1.75rem)',
                    fontWeight: 900,
                    letterSpacing: '-0.01em',
                    textTransform: 'uppercase',
                    color: activeRow === i ? 'var(--white)' : 'rgba(255,255,255,0.85)',
                    transition: 'color 0.3s',
                    margin: 0,
                  }}
                >
                  {srv.title}
                </h3>
                <p
                  className="srv-desc"
                  style={{
                    fontSize: 'clamp(0.8125rem, 1.5vw, 0.875rem)',
                    lineHeight: 1.65,
                    color: 'rgba(255,255,255,0.88)',
                    maxWidth: '55ch',
                    maxHeight: activeRow === i ? '12rem' : 0,
                    overflow: 'hidden',
                    opacity: activeRow === i ? 1 : 0,
                    transition: 'max-height 0.35s ease, opacity 0.35s ease, margin-top 0.25s ease',
                    marginTop: activeRow === i ? '0.5rem' : 0,
                  }}
                >
                  {srv.desc}
                </p>
              </div>

              {/* Thumbnail — visible on hover */}
              <div
                className="srv-thumb"
                style={{
                  width: '5rem',
                  height: '3.5rem',
                  overflow: 'hidden',
                  opacity: activeRow === i ? 1 : 0,
                  transform: activeRow === i ? 'translateX(0)' : 'translateX(1rem)',
                  transition: 'opacity 0.35s ease, transform 0.35s ease',
                  flexShrink: 0,
                }}
              >
                <Image
                  src={srv.img}
                  alt={srv.title}
                  width={80}
                  height={56}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>

              {/* Right cluster: Badge + Arrow button */}
              <div className="srv-right-cluster">
                <span
                  className="srv-badge"
                  style={{
                    fontSize: '0.625rem',
                    fontWeight: 800,
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    background: activeRow === i ? 'var(--burg-primary)' : 'rgba(255,255,255,0.08)',
                    color: 'var(--white)',
                    padding: '0.35rem 0.75rem',
                    borderRadius: '4px',
                    whiteSpace: 'nowrap',
                    transition: 'all 0.3s',
                  }}
                >
                  {srv.badge}
                </span>

                <div
                  className="srv-arrow-btn"
                  aria-label={`View details for ${srv.title}`}
                  style={{
                    width: '2.875rem',
                    height: '2.875rem',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: activeRow === i ? '#0066FF' : 'rgba(255, 255, 255, 0.05)',
                    border: activeRow === i ? '1px solid #0066FF' : '1px solid rgba(255, 255, 255, 0.16)',
                    color: activeRow === i ? '#FFFFFF' : 'rgba(255, 255, 255, 0.75)',
                    boxShadow: activeRow === i ? '0 8px 24px rgba(0, 102, 255, 0.35)' : 'none',
                    transform: activeRow === i ? 'translateX(4px) scale(1.08)' : 'translateX(0)',
                    transition: 'all 0.28s cubic-bezier(0.16, 1, 0.3, 1)',
                    flexShrink: 0,
                  }}
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{
                      transform: activeRow === i ? 'translateX(2px)' : 'translateX(0)',
                      transition: 'transform 0.28s ease',
                    }}
                  >
                    <path d="M5 12h14" />
                    <path d="m13 6 6 6-6 6" />
                  </svg>
                </div>
              </div>
            </div>
          ))}
          {/* Bottom border */}
          <div className="rule-dark" />
        </div>
      </div>

      <style>{`
        .srv-right-cluster {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          justify-content: flex-end;
          flex-shrink: 0;
        }
        @media (max-width: 900px) {
          .srv-row {
            grid-template-columns: 2.75rem 1fr auto !important;
            gap: 1rem !important;
            padding: 1.35rem 0 !important;
          }
          .srv-thumb {
            display: none !important;
          }
          .srv-title {
            font-size: 1.15rem !important;
          }
        }
        @media (max-width: 600px) {
          .srv-row {
            grid-template-columns: 1fr auto !important;
            gap: 0.85rem !important;
            padding: 1.15rem 0 !important;
          }
          .srv-num {
            display: none !important;
          }
          .srv-title {
            font-size: 1rem !important;
          }
          .srv-desc {
            font-size: 0.78125rem !important;
            line-height: 1.55 !important;
            max-width: 100% !important;
          }
          .srv-right-cluster {
            gap: 0.5rem !important;
          }
          .srv-badge {
            font-size: 0.5625rem !important;
            padding: 0.3rem 0.5rem !important;
            letter-spacing: 0.05em !important;
            white-space: nowrap !important;
          }
          .srv-arrow-btn {
            width: 2.25rem !important;
            height: 2.25rem !important;
          }
          .srv-arrow-btn svg {
            width: 1rem !important;
            height: 1rem !important;
          }
        }
      `}</style>
    </section>
  )
}
