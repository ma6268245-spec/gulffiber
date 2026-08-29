'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'

const ARTICLES = [
  {
    category: 'Technical Guide',
    date: 'Aug 2026',
    title: 'How to Select the Correct Polyester Staple Fibre Denier',
    img: '/images/sustainability-cotton.jpg',
    large: true,
  },
  {
    category: 'Spinning',
    date: 'Jul 2026',
    title: 'Understanding Staple Length in Synthetic Fibre Spinning',
    img: '/images/collection-rolls.jpg',
    large: false,
  },
  {
    category: 'Certification',
    date: 'Jun 2026',
    title: 'What GRS Certification Means for Textile Procurement',
    img: '/images/quality-lab.jpg',
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
          <Link href="/blog" className="btn-ghost">
            ALL ARTICLES
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
          <div
            className="blog-card"
            style={{
              position: 'relative',
              overflow: 'hidden',
              cursor: 'pointer',
              height: '34rem',
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
                background: 'linear-gradient(to top, rgba(20,5,5,0.82) 0%, transparent 50%)',
              }}
            />
            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '2rem' }}>
              <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '0.75rem', alignItems: 'center' }}>
                <span
                  style={{
                    fontSize: '0.5625rem',
                    fontWeight: 700,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    color: 'var(--burg-primary)',
                    background: 'rgba(0,112,243,0.2)',
                    padding: '0.2rem 0.625rem',
                  }}
                >
                  {ARTICLES[0].category}
                </span>
                <span style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.5)' }}>{ARTICLES[0].date}</span>
              </div>
              <h3
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '1.25rem',
                  fontWeight: 800,
                  color: 'var(--white)',
                  lineHeight: 1.3,
                  marginBottom: '1rem',
                }}
              >
                {ARTICLES[0].title}
              </h3>
              <Link href="/blog" className="btn-ghost" style={{ color: 'rgba(255,255,255,0.7)' }}>
                READ MORE
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>

          {/* Small articles */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {ARTICLES.slice(1).map((article, i) => (
              <div
                key={i}
                className="blog-card"
                style={{
                  position: 'relative',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  flex: 1,
                  minHeight: '15rem',
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
                    background: 'linear-gradient(to top, rgba(20,5,5,0.8) 0%, transparent 55%)',
                  }}
                />
                <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '1.5rem' }}>
                  <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '0.5rem', alignItems: 'center' }}>
                    <span
                      style={{
                        fontSize: '0.5625rem',
                        fontWeight: 700,
                        letterSpacing: '0.1em',
                        textTransform: 'uppercase',
                        color: 'var(--burg-primary)',
                        background: 'rgba(0,112,243,0.2)',
                        padding: '0.2rem 0.5rem',
                      }}
                    >
                      {article.category}
                    </span>
                    <span style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.5)' }}>{article.date}</span>
                  </div>
                  <h3
                    style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: '0.9375rem',
                      fontWeight: 700,
                      color: 'var(--white)',
                      lineHeight: 1.35,
                    }}
                  >
                    {article.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .blog-card:hover .blog-img { transform: scale(1.05); }
        @media (max-width: 900px) {
          .blog-grid { grid-template-columns: 1fr !important; }
          .blog-card { height: 22rem !important; min-height: 22rem !important; }
        }
      `}</style>
    </section>
  )
}
