'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'

const ARTICLES = [
  {
    category: 'Technical Guide',
    date: 'Aug 2026',
    title: 'How to Select the Correct Polyester Staple Fibre Denier',
    img: '/images/Gallery/11.jpeg',
    href: '/products',
    large: true,
  },
  {
    category: 'Spinning',
    date: 'Jul 2026',
    title: 'Understanding Staple Length in Synthetic Fibre Spinning',
    img: '/images/Gallery/6.jpeg',
    href: '/services',
    large: false,
  },
  {
    category: 'Certification',
    date: 'Jun 2026',
    title: 'What GRS Certification Means for Textile Procurement',
    img: '/images/certificates/grs-site-appendix.jpg',
    href: '/quality',
    large: false,
  },
]

export function BlogSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    let ctx: { revert: () => void } | undefined
    const init = async () => {
      const gsap = (await import('gsap')).default
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)

      ctx = gsap.context(() => {
        gsap.fromTo(
          '.blog-heading',
          { opacity: 0, y: 35 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: { trigger: '.blog-heading', start: 'top 88%', once: true },
          }
        )
        gsap.fromTo(
          '.blog-card',
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: { trigger: '.blog-grid', start: 'top 85%', once: true },
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
        {/* Header */}
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
            <div className="eyebrow" style={{ marginBottom: '1rem' }}>
              <svg viewBox="0 0 16 16" fill="currentColor">
                <path d="M8 1L10 6H15L11 9L13 14L8 11L3 14L5 9L1 6H6L8 1Z" />
              </svg>
              Our Blog
            </div>
            <h2 className="blog-heading h-section">
              SMART FIBRE<br />
              <em>Stories</em>
            </h2>
          </div>
          <Link href="/products" className="btn-ghost">
            TECHNICAL ARTICLES
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        {/* Grid: 1 large + 2 stacked */}
        <div
          className="blog-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: '1.4fr 1fr',
            gap: '1.5rem',
          }}
        >
          {/* Large article */}
          <Link
            href={ARTICLES[0].href}
            className="blog-card"
            style={{
              position: 'relative',
              overflow: 'hidden',
              cursor: 'pointer',
              height: '34rem',
              display: 'block',
              textDecoration: 'none',
            }}
          >
            <Image
              src={ARTICLES[0].img}
              alt={ARTICLES[0].title}
              fill
              style={{
                objectFit: 'cover',
                transition: 'transform 0.7s cubic-bezier(0.16,1,0.3,1)',
              }}
              className="blog-img"
            />
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background:
                  'linear-gradient(to top, rgba(4, 15, 38, 0.94) 0%, rgba(4, 15, 38, 0.7) 48%, rgba(4, 15, 38, 0.15) 100%)',
              }}
            />
            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: 'clamp(1.25rem, 3vw, 2rem)' }}>
              <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '0.75rem', alignItems: 'center' }}>
                <span
                  style={{
                    fontSize: '0.625rem',
                    fontWeight: 800,
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    color: '#FFFFFF',
                    background: 'var(--burg-primary)',
                    padding: '0.25rem 0.65rem',
                    borderRadius: '2px',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.35)',
                  }}
                >
                  {ARTICLES[0].category}
                </span>
                <span
                  style={{
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    color: 'rgba(255,255,255,0.85)',
                    textShadow: '0 1px 4px rgba(0,0,0,0.5)',
                  }}
                >
                  {ARTICLES[0].date}
                </span>
              </div>
              <h3
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: 'clamp(1.125rem, 2.5vw, 1.35rem)',
                  fontWeight: 800,
                  color: '#FFFFFF',
                  lineHeight: 1.3,
                  marginBottom: '1rem',
                  textShadow: '0 2px 10px rgba(0,0,0,0.7)',
                }}
              >
                {ARTICLES[0].title}
              </h3>
              <span
                className="btn-ghost"
                style={{
                  color: '#FFFFFF',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  letterSpacing: '0.08em',
                }}
              >
                READ MORE
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </span>
            </div>
          </Link>

          {/* Small articles */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {ARTICLES.slice(1).map((article, i) => (
              <Link
                key={i}
                href={article.href}
                className="blog-card"
                style={{
                  position: 'relative',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  flex: 1,
                  minHeight: '15rem',
                  display: 'block',
                  textDecoration: 'none',
                }}
              >
                <Image
                  src={article.img}
                  alt={article.title}
                  fill
                  style={{
                    objectFit: 'cover',
                    transition: 'transform 0.7s cubic-bezier(0.16,1,0.3,1)',
                  }}
                  className="blog-img"
                />
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background:
                      'linear-gradient(to top, rgba(4, 15, 38, 0.94) 0%, rgba(4, 15, 38, 0.65) 50%, rgba(4, 15, 38, 0.15) 100%)',
                  }}
                />
                <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: 'clamp(1rem, 2.5vw, 1.5rem)' }}>
                  <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '0.5rem', alignItems: 'center' }}>
                    <span
                      style={{
                        fontSize: '0.5625rem',
                        fontWeight: 800,
                        letterSpacing: '0.08em',
                        textTransform: 'uppercase',
                        color: '#FFFFFF',
                        background: 'var(--burg-primary)',
                        padding: '0.2rem 0.55rem',
                        borderRadius: '2px',
                        boxShadow: '0 2px 6px rgba(0,0,0,0.3)',
                      }}
                    >
                      {article.category}
                    </span>
                    <span
                      style={{
                        fontSize: '0.75rem',
                        fontWeight: 600,
                        color: 'rgba(255,255,255,0.85)',
                        textShadow: '0 1px 4px rgba(0,0,0,0.5)',
                      }}
                    >
                      {article.date}
                    </span>
                  </div>
                  <h3
                    style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: '0.9375rem',
                      fontWeight: 700,
                      color: '#FFFFFF',
                      lineHeight: 1.35,
                      textShadow: '0 2px 8px rgba(0,0,0,0.7)',
                    }}
                  >
                    {article.title}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .blog-card:hover .blog-img { transform: scale(1.05); }
        .blog-card * { -webkit-font-smoothing: antialiased; }
        @media (max-width: 900px) {
          .blog-grid { grid-template-columns: 1fr !important; }
          .blog-card { height: 22rem !important; min-height: 22rem !important; }
        }
        @media (max-width: 480px) {
          .blog-card { height: 20rem !important; min-height: 20rem !important; }
        }
      `}</style>
    </section>
  )
}

