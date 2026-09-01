'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'

const PRODUCTS = [
  {
    id: '01',
    title: 'Polyester Staple Fibre',
    subtitle: 'Virgin & Recycled · 1.2D–60D',
    img: '/images/Gallery/Staple Fiber.jpeg',
    video: '/videos/staple-fiber.mp4',
    desc: 'High-tenacity PSF for spinning, wadding, and technical applications.',
    aspectStyle: { gridRow: 'span 2' },
  },
  {
    id: '02',
    title: 'Wadding & Thermal Infill',
    subtitle: 'High-loft · Thermal bonding',
    img: '/images/Gallery/Thermal-Bonded Polyester Wadding.jpeg',
    video: '/videos/thermally-bonded-wadding.mp4',
    desc: 'Superior loft and resilience for premium apparel and bedding filling applications.',
    aspectStyle: {},
  },
  {
    id: '03',
    title: 'Felt & Non-Woven Materials',
    subtitle: 'Needle-punched · All weights',
    img: '/images/Gallery/non woven felt.jpeg',
    video: '/videos/non-woven-felt.mp4',
    desc: 'Industrial, acoustic, and automotive grade non-woven felt products.',
    aspectStyle: {},
  },
]

export function ProductCollection() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    let ctx: { revert: () => void } | undefined;
    const init = async () => {
      const gsap = (await import('gsap')).default
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)

      ctx = gsap.context(() => {
        gsap.fromTo(
          '.coll-eyebrow, .coll-heading',
          { opacity: 0, y: 35 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: { trigger: '.coll-heading', start: 'top 88%', once: true },
          }
        )

        gsap.fromTo(
          '.coll-tile',
          { opacity: 0, y: 45 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            stagger: 0.12,
            ease: 'power4.out',
            scrollTrigger: { trigger: '.coll-grid', start: 'top 85%', once: true },
          }
        )
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
            <div className="coll-eyebrow eyebrow" style={{ marginBottom: '1rem' }}>
              <svg viewBox="0 0 16 16" fill="currentColor">
                <path d="M8 1L10 6H15L11 9L13 14L8 11L3 14L5 9L1 6H6L8 1Z" />
              </svg>
              Premium Products
            </div>
            <h2 className="coll-heading h-section">
              PREMIUM FIBRE<br />
              <em>Collection</em>
            </h2>
          </div>
          <Link href="/products" className="btn-ghost">
            VIEW ALL
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        {/* Grid */}
        <div
          className="coll-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: '1.2fr 1fr',
            gridTemplateRows: 'repeat(2, 24rem)',
            gap: '1.5rem',
          }}
        >
          {PRODUCTS.map((p, i) => (
            <Link
              key={p.id}
              href="/products"
              className="coll-tile"
              style={{
                position: 'relative',
                overflow: 'hidden',
                cursor: 'pointer',
                display: 'block',
                textDecoration: 'none',
                ...(i === 0 ? { gridRow: 'span 2' } : {}),
              }}
            >
              <video
                src={p.video}
                poster={p.img}
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                className="coll-video"
                style={{
                  position: 'absolute',
                  inset: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: 'center',
                  transition: 'transform 0.7s cubic-bezier(0.16,1,0.3,1)',
                }}
              />
              {/* Gradient overlay */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to top, rgba(20,5,5,0.75) 0%, transparent 55%)',
                  pointerEvents: 'none',
                }}
              />
              {/* Content */}
              <div
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  padding: '1.5rem',
                  pointerEvents: 'none',
                }}
              >
                <span
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '0.5625rem',
                    fontWeight: 700,
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    color: 'rgba(255,255,255,0.6)',
                    display: 'block',
                    marginBottom: '0.375rem',
                  }}
                >
                  {p.subtitle}
                </span>
                <h3
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: i === 0 ? '1.375rem' : '1rem',
                    fontWeight: 800,
                    color: 'var(--white)',
                    lineHeight: 1.2,
                    marginBottom: '0.375rem',
                  }}
                >
                  {p.title}
                </h3>
                {i === 0 && (
                  <p style={{ fontSize: '0.8125rem', color: 'rgba(255,255,255,0.65)', lineHeight: 1.6 }}>
                    {p.desc}
                  </p>
                )}
              </div>
            </Link>
          ))}

          {/* 4th tile — red info panel */}
          <div
            className="coll-tile"
            style={{
              background: 'var(--burg-primary)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              padding: '2rem',
            }}
          >
            <div>
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5">
                <rect x="6" y="6" width="12" height="12" />
                <rect x="22" y="6" width="12" height="12" />
                <rect x="6" y="22" width="12" height="12" />
                <rect x="22" y="22" width="12" height="12" />
              </svg>
            </div>
            <div>
              <h3
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '1.25rem',
                  fontWeight: 800,
                  color: 'var(--white)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.02em',
                  marginBottom: '0.75rem',
                }}
              >
                LININGS & FUSING MATERIALS
              </h3>
              <p style={{ fontSize: '0.8125rem', color: 'rgba(255,255,255,0.7)', lineHeight: 1.65, marginBottom: '1.5rem' }}>
                Woven & non-woven fusible interlinings and tailored textile materials for industrial apparel manufacturing.
              </p>
              <Link
                href="/products"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.6875rem',
                  fontWeight: 700,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: 'var(--white)',
                  textDecoration: 'none',
                }}
              >
                VIEW ALL
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .coll-tile:hover .coll-video,
        .coll-tile:hover .coll-img { transform: scale(1.05); }
        @media (max-width: 900px) {
          .coll-grid {
            grid-template-columns: 1fr 1fr !important;
            grid-template-rows: auto !important;
          }
          .coll-tile { min-height: clamp(14rem, 35vw, 20rem); height: auto; }
          .coll-tile:first-child { grid-row: span 1 !important; }
        }
        @media (max-width: 600px) {
          .coll-grid {
            grid-template-columns: 1fr !important;
          }
          .coll-tile { min-height: 16rem; }
        }
      `}</style>
    </section>
  )
}
