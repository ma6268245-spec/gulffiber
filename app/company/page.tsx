'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { FloatingActions } from '@/components/layout/FloatingActions'

const LEADERSHIP_TEAM = [
  {
    name: 'Tariq Mahmood',
    role: 'Co-Founder & Chief Executive Officer',
    quote: 'Pioneering sustainable polyester staple fibre and polymer innovation for 25+ years.',
    experience: '25+ Yrs',
    projects: '18 Countries',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop',
    verified: true,
  },
  {
    name: 'Bilal Tariq',
    role: 'Director of Plant Operations & Engineering',
    quote: 'Overseeing multi-stage extrusion, high-tenacity crimping, and automated quality controls.',
    experience: '15+ Yrs',
    projects: '4 Lines',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=800&auto=format&fit=crop',
    verified: true,
  },
  {
    name: 'Harris Tariq',
    role: 'Director of Global Exports & Supply Chain',
    quote: 'Directing port logistics, FOB/CIF container shipping, and international customer partnerships.',
    experience: '12+ Yrs',
    projects: '500+ Clients',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=800&auto=format&fit=crop',
    verified: true,
  },
  {
    name: 'Dr. Arshad Khan',
    role: 'Chief Technology Officer & Head of Polymer R&D',
    quote: 'Advancing GRS post-consumer PET depolymerization and conjugate siliconization formulas.',
    experience: '18+ Yrs',
    projects: '14 Patents',
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=800&auto=format&fit=crop',
    verified: true,
  },
  {
    name: 'Zainab Fatima',
    role: 'Head of Quality Assurance & Testing Lab',
    quote: 'Guaranteeing zero-defect staple cut length, denier uniformity, and GRS batch certification.',
    experience: '10+ Yrs',
    projects: 'ISO Lead',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop',
    verified: true,
  },
  {
    name: 'Usman Farooq',
    role: 'Senior Non-Woven & Felt Production Manager',
    quote: 'Managing needle-punch textile lines for automotive, geotextile, and thermal insulation.',
    experience: '14+ Yrs',
    projects: '2.5k T/Mo',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=800&auto=format&fit=crop',
    verified: true,
  },
]

const MILESTONES = [
  { year: '1999', title: 'Founding in Karachi', desc: 'Established as an innovative textile processing unit focusing on synthetic staple fibre distribution.' },
  { year: '2008', title: 'Industrial Manufacturing Line', desc: 'Commissioned our first multi-stage extrusion line, producing virgin and blend polyester staple fibres.' },
  { year: '2016', title: 'GRS Recycling Transition', desc: 'Pioneered 100% post-consumer PET bottle recycling into high-tenacity polyester staple fibres.' },
  { year: '2021', title: 'Non-Woven & Felt Expansion', desc: 'Launched high-capacity needle-punched non-woven line for automotive and civil engineering applications.' },
  { year: '2026', title: 'Global Supply Chain Network', desc: 'Supplying over 500 manufacturers across 18 countries with 24-hour dispatch commitments.' },
]

export default function CompanyPage() {
  return (
    <>
      <Header />
      <main style={{ paddingTop: '5.5rem', background: 'var(--ivory)', minHeight: '100vh' }}>
        {/* Hero Section */}
        <section
          style={{
            background: 'var(--burg-primary)',
            color: 'var(--white)',
            padding: 'clamp(4.5rem, 9vh, 7rem) var(--pad-x)',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <div className="container">
            <div className="eyebrow" style={{ color: 'rgba(255,255,255,0.7)', marginBottom: '1rem' }}>
              <svg viewBox="0 0 16 16" fill="currentColor">
                <path d="M8 1L10 6H15L11 9L13 14L8 11L3 14L5 9L1 6H6L8 1Z" />
              </svg>
              About Gulf Fibre
            </div>
            <h1
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: 'clamp(2.5rem, 5.5vw, 6rem)',
                fontWeight: 900,
                lineHeight: 0.92,
                letterSpacing: '-0.02em',
                textTransform: 'uppercase',
                marginBottom: '1.75rem',
              }}
            >
              Over 25 Years of <br />
              <span style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontWeight: 600 }}>Textile Excellence</span>
            </h1>
            <p
              style={{
                fontSize: '1.0625rem',
                lineHeight: 1.7,
                color: 'rgba(255,255,255,0.85)',
                maxWidth: '58ch',
              }}
            >
              Gulf Fibre Company (PVT) Limited is Pakistan&apos;s leading manufacturer of recycled polyester staple fibre, conjugate hollow fibres, and non-woven industrial textiles.
            </p>
          </div>
        </section>

        {/* Story Section */}
        <section className="section-pad">
          <div className="container">
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1.1fr 0.9fr',
                gap: 'clamp(3rem, 6vw, 6rem)',
                alignItems: 'center',
              }}
            >
              <div>
                <span className="eyebrow" style={{ marginBottom: '1rem' }}>Our Heritage</span>
                <h2 className="h-section" style={{ marginBottom: '1.5rem' }}>
                  PRECISION FIBRE<br />
                  <em>Craftsmanship</em>
                </h2>
                <p style={{ fontSize: '0.9375rem', lineHeight: 1.75, color: 'var(--muted)', marginBottom: '1.25rem' }}>
                  Founded in 1999 in Karachi, Pakistan, Gulf Fibre has grown from a regional supplier into a trusted global exporter. We convert millions of post-consumer plastic bottles into high-grade textile raw materials each year.
                </p>
                <p style={{ fontSize: '0.9375rem', lineHeight: 1.75, color: 'var(--muted)', marginBottom: '2rem' }}>
                  Our advanced German and Taiwanese production equipment guarantees consistent denier, precise staple length cutting, and uniform crimping frequency required by top spinning mills worldwide.
                </p>
                <div style={{ display: 'flex', gap: '2rem', borderTop: '1px solid var(--border-light)', paddingTop: '1.5rem' }}>
                  <div>
                    <h3 style={{ fontFamily: 'var(--font-sans)', fontSize: '2.5rem', fontWeight: 900, color: 'var(--burg-primary)', lineHeight: 1 }}>
                      25+
                    </h3>
                    <p style={{ fontSize: '0.6875rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--ink)' }}>
                      Years in Business
                    </p>
                  </div>
                  <div>
                    <h3 style={{ fontFamily: 'var(--font-sans)', fontSize: '2.5rem', fontWeight: 900, color: 'var(--burg-primary)', lineHeight: 1 }}>
                      18
                    </h3>
                    <p style={{ fontSize: '0.6875rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--ink)' }}>
                      Export Countries
                    </p>
                  </div>
                  <div>
                    <h3 style={{ fontFamily: 'var(--font-sans)', fontSize: '2.5rem', fontWeight: 900, color: 'var(--burg-primary)', lineHeight: 1 }}>
                      100%
                    </h3>
                    <p style={{ fontSize: '0.6875rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--ink)' }}>
                      GRS Certified
                    </p>
                  </div>
                </div>
              </div>
              <div style={{ position: 'relative', height: '32rem', overflow: 'hidden', borderRadius: '24px' }}>
                <Image
                  src="/images/workshop-factory.jpg"
                  alt="Gulf Fibre Manufacturing Plant"
                  fill
                  style={{ objectFit: 'cover' }}
                />
              </div>
            </div>
          </div>
        </section>

        {/* ── Executive Leadership & Management Glassmorphic Section ── */}
        <section
          style={{
            background: 'var(--ivory-deep)',
            padding: 'clamp(5rem, 10vh, 8rem) 0',
            borderTop: '1px solid var(--border-light)',
            borderBottom: '1px solid var(--border-light)',
            position: 'relative',
          }}
        >
          <div className="container">
            <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
              <span className="eyebrow" style={{ marginBottom: '0.75rem' }}>Leadership & Engineering</span>
              <h2 className="h-section">
                DIRECTORS, CO-FOUNDER &<br />
                <em>Management Team</em>
              </h2>
              <p style={{ maxWidth: '60ch', margin: '1rem auto 0', color: 'var(--muted)', fontSize: '0.9375rem' }}>
                The multidisciplinary textile engineers, manufacturing directors, and polymer scientists driving Gulf Fibre&apos;s quality standards across 18 countries.
              </p>
            </div>

            {/* Glassmorphic Cards Grid */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                gap: 'clamp(1.5rem, 3vw, 2.5rem)',
              }}
            >
              {LEADERSHIP_TEAM.map((member, idx) => (
                <div key={idx} className="glass-profile-card">
                  <div className="glass-profile-card__inner">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      className="glass-profile-card__cover"
                      src={member.image}
                      alt={member.name}
                      loading="lazy"
                    />

                    <div className="glass-profile-card__body">
                      <h3 className="glass-profile-card__header">
                        <span className="chips">
                          {member.name}
                          <svg className="icon" style={{ fill: '#38B6FF', width: '1.25rem', height: '1.25rem' }}>
                            <use xlinkHref="#icon-check" />
                          </svg>
                        </span>
                      </h3>

                      <p
                        style={{
                          fontSize: '0.75rem',
                          fontWeight: 700,
                          letterSpacing: '0.08em',
                          textTransform: 'uppercase',
                          color: '#38B6FF',
                          margin: '0.1rem 0 0.25rem',
                        }}
                      >
                        {member.role}
                      </p>

                      <p className="glass-profile-card__quote">
                        &ldquo;{member.quote}&rdquo;
                      </p>

                      <div className="glass-profile-card__footer">
                        <span className="chips">
                          <svg className="icon">
                            <use xlinkHref="#icon-user" />
                          </svg>
                          {member.experience}
                        </span>

                        <span className="chips">
                          <svg className="icon">
                            <use xlinkHref="#icon-cards" />
                          </svg>
                          {member.projects}
                        </span>

                        <Link href="/contact" className="button">
                          Connect
                          <svg className="icon">
                            <use xlinkHref="#icon-plus" />
                          </svg>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section style={{ background: 'var(--white)', padding: 'clamp(5rem, 10vh, 8rem) 0' }}>
          <div className="container">
            <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
              <span className="eyebrow" style={{ marginBottom: '0.75rem' }}>Our Journey</span>
              <h2 className="h-section">
                QUARTER CENTURY OF<br />
                <em>Milestones</em>
              </h2>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '2rem' }}>
              {MILESTONES.map((m) => (
                <div key={m.year} style={{ borderTop: '2px solid var(--burg-primary)', paddingTop: '1.5rem' }}>
                  <span style={{ fontFamily: 'var(--font-sans)', fontSize: '2rem', fontWeight: 900, color: 'var(--burg-primary)', display: 'block', marginBottom: '0.5rem' }}>
                    {m.year}
                  </span>
                  <h4 style={{ fontFamily: 'var(--font-sans)', fontSize: '1rem', fontWeight: 800, color: 'var(--ink)', marginBottom: '0.5rem' }}>
                    {m.title}
                  </h4>
                  <p style={{ fontSize: '0.8125rem', color: 'var(--muted)', lineHeight: 1.6 }}>
                    {m.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Hidden SVG Symbols from User Component */}
        <svg width="0" height="0" style={{ display: 'none' }}>
          <symbol id="icon-plus" height="24" viewBox="0 -960 960 960" width="24" fill="currentColor">
            <path d="M453-140v-313H140v-54h313v-313h54v313h313v54H507v313h-54Z" />
          </symbol>
          <symbol id="icon-user" height="24" viewBox="0 -960 960 960" width="24" fill="currentColor">
            <path d="M480-524q-54.55 0-92.27-37.72Q350-599.45 350-654q0-54.55 37.73-92.28Q425.45-784 480-784t92.28 37.72Q610-708.55 610-654q0 54.55-37.72 92.28Q534.55-524 480-524ZM182-171v-83q0-29 15.69-52.85Q213.38-330.71 240-344q59-29 119.41-43.5t120.5-14.5q60.09 0 120.59 14.5T720-344q26.63 13.29 42.31 37.15Q778-283 778-254v83H182Zm54-54h488v-29q0-14-7.5-24.5T695-296q-49-23-105.19-37.5Q533.63-348 480-348t-109.81 14Q314-320 265-296q-14 6-21.5 17t-7.5 25v29Zm244-353q32 0 54-22t22-54q0-32-22-54t-54-22q-32 0-54 22t-22 54q0 32 22 54t54 22Zm0-76Zm0 429Z" />
          </symbol>
          <symbol id="icon-cards" height="24" viewBox="0 -960 960 960" width="24" fill="currentColor">
            <path d="m493-469 87-52 87 52-24-98 77-67-101-9-39-92-39 92-101 9 77 67-24 98Zm129 257h118q9 18-10.5 28.5T691-170l-447 58q-36 3-63.4-18.65Q153.19-152.3 149-188l-49-382q-4-36 18.35-64.86Q140.7-663.71 177-667l33-1v54l-28 1q-14 1-22 11.5t-6 24.5l48 383q2 14 12 22t24 6l384-46Zm-246-80q-36.73 0-61.36-24.64Q290-341.27 290-378v-408q0-36.72 24.64-61.36Q339.27-872 376-872h408q36.72 0 61.36 24.64T870-786v408q0 36.73-24.64 61.36Q820.72-292 784-292H376Zm0-54h408q14 0 23-9t9-23v-408q0-14-9-23t-23-9H376q-14 0-23 9t-9 23v408q0 14 9 23t23 9Zm204-236ZM196-162Z" />
          </symbol>
          <symbol id="icon-check" height="35" viewBox="0 -960 960 960" width="35" fill="currentColor">
            <path d="m443-429 169-169-38-39-131 132-57-56-38 38 95 94ZM222-160v-578q0-36.72 24.64-61.36Q271.27-824 308-824h344q36.72 0 61.36 24.64T738-738v578L480-270 222-160Zm54-82 204-87.66L684-242v-496q0-12-10-22t-22-10H308q-12 0-22 10t-10 22v496Zm0-528h408-408Z" />
          </symbol>
        </svg>
      </main>
      <Footer />
      <FloatingActions />

      {/* Scoped CSS for the Glass Profile Card */}
      <style jsx global>{`
        .team-glass-card {
          border-radius: 2.75rem;
          overflow: clip;
          padding: 0.875rem;
          background: rgba(255, 255, 255, 0.75);
          box-shadow: inset 0 0 4px -1px rgba(255, 255, 255, 0.95), 0 16px 36px rgba(10, 75, 184, 0.08);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          position: relative;
          transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.35s cubic-bezier(0.16, 1, 0.3, 1);
        }

        [data-theme="dark"] .team-glass-card {
          background: rgba(13, 28, 56, 0.65);
          box-shadow: inset 0 0 4px -2px rgba(255, 255, 255, 0.35), 0 16px 40px rgba(0, 0, 0, 0.45);
        }

        .team-glass-card:hover {
          transform: translateY(-6px);
          box-shadow: inset 0 0 4px -1px rgba(255, 255, 255, 1), 0 24px 50px rgba(10, 75, 184, 0.16);
        }

        .team-glass-card__inner {
          display: grid;
          grid-template-areas: "stack";
          position: relative;
          border-radius: 2.25rem;
          overflow: clip;
          aspect-ratio: 3 / 4.2;
          box-shadow: inset 0 0 4px -2px rgba(255, 255, 255, 0.6), 0 0 4px -2px rgba(255, 255, 255, 0.6);
        }

        .team-glass-card__inner:after {
          content: "";
          position: absolute;
          inset: 0;
          border-radius: 2.25rem;
          backdrop-filter: blur(80px);
          -webkit-backdrop-filter: blur(80px);
          mask: linear-gradient(-14deg, black 32%, transparent 72%);
          -webkit-mask: linear-gradient(-14deg, black 32%, transparent 72%);
          pointer-events: none;
        }

        .team-glass-card__cover {
          grid-area: stack;
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .team-glass-card:hover .team-glass-card__cover {
          transform: scale(1.06);
        }

        .team-glass-card__body {
          z-index: 2;
          grid-area: stack;
          margin-top: auto;
          padding: 1.5rem 1.5rem 1.25rem;
          background: linear-gradient(180deg, transparent 0%, rgba(4, 15, 38, 0.85) 50%, rgba(4, 15, 38, 0.96) 100%);
          border-radius: 0 0 2.25rem 2.25rem;
        }

        .chips {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
        }

        .icon {
          width: 1em;
          height: 1em;
          display: inline-block;
          vertical-align: middle;
        }

        .team-card-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 0.5rem;
          margin-top: 0.5rem;
          padding-top: 0.75rem;
          border-top: 1px solid rgba(255, 255, 255, 0.15);
        }

        .team-card-btn:hover {
          background: #38B6FF !important;
          color: #FFFFFF !important;
          transform: scale(1.05);
        }
      `}</style>
    </>
  )
}
