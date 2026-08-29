'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { FloatingActions } from '@/components/layout/FloatingActions'

// ── Leadership Team Data ──
const LEADERSHIP_TEAM = [
  {
    name: 'Tariq Mahmood',
    role: 'Co-Founder & Chief Executive Officer',
    quote: 'Pioneering sustainable polyester staple fibre and polymer innovation for 25+ years.',
    experience: '25+ Yrs',
    projects: '15,000 T / Yr',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop',
    tag: 'Executive Board',
  },
  {
    name: 'Bilal Tariq',
    role: 'Director of Plant Operations & Engineering',
    quote: 'Overseeing multi-stage extrusion, high-tenacity thermomechanical crimping, and automated quality lines.',
    experience: '15+ Yrs',
    projects: '4 Lines',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=800&auto=format&fit=crop',
    tag: 'Plant Operations',
  },
  {
    name: 'Harris Tariq',
    role: 'Director of Global Exports & Supply Chain',
    quote: 'Directing port logistics, FOB/CIF container shipping, and international customer partnerships.',
    experience: '12+ Yrs',
    projects: '350+ Clients',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=800&auto=format&fit=crop',
    tag: 'Global Trade',
  },
  {
    name: 'Dr. Arshad Khan',
    role: 'Chief Technology Officer & Head of Polymer R&D',
    quote: 'Advancing GRS post-consumer PET depolymerization and conjugate siliconization formulas.',
    experience: '18+ Yrs',
    projects: '1.2D–60D Range',
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=800&auto=format&fit=crop',
    tag: 'Polymer R&D',
  },
  {
    name: 'Zainab Fatima',
    role: 'Head of Quality Assurance & Testing Lab',
    quote: 'Guaranteeing zero-defect staple cut length, denier uniformity, and ISO 9001:2015 batch certification.',
    experience: '10+ Yrs',
    projects: 'ISO Lead',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop',
    tag: 'Quality Lab',
  },
  {
    name: 'Usman Farooq',
    role: 'Senior Non-Woven & Wadding Production Manager',
    quote: 'Managing high-capacity needle-punch textile lines and thermal bonding batting for industrial applications.',
    experience: '14+ Yrs',
    projects: 'High-Loft Lines',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=800&auto=format&fit=crop',
    tag: 'Nonwoven & Felts',
  },
]

// ── Interactive Timeline Milestones ──
const MILESTONES = [
  {
    year: '1999',
    phase: 'ERA 01 · THE FOUNDING',
    title: 'Textile Roots in Karachi',
    desc: 'Founded as a synthetic staple fibre distribution unit in Karachi, supplying domestic spinning mills with reliable raw materials.',
    metric: '12 Mills Supplied',
    icon: '🏛️',
  },
  {
    year: '2008',
    phase: 'ERA 02 · INDUSTRIAL EXPANSION',
    title: 'Melt Extrusion Plant',
    desc: 'Commissioned our first continuous melt extrusion and drawing plant, gaining full in-house control over deniers from 1.2D to 15D.',
    metric: 'In-House Extrusion',
    icon: '⚡',
  },
  {
    year: '2016',
    phase: 'ERA 03 · CIRCULAR SHIFT',
    title: '100% GRS Recycled Transition',
    desc: 'Pioneered closed-loop recycling in Pakistan by converting post-consumer PET bottles into high-grade PSF under Global Recycled Standard (GRS).',
    metric: 'Zero Virgin Fossil',
    icon: '♻️',
  },
  {
    year: '2021',
    phase: 'ERA 04 · DIVERSIFICATION',
    title: 'Non-Wovens & Thermal Wadding',
    desc: 'Commissioned heavy-duty needle-punching machinery and thermal bonding lines for automotive acoustic felts and industrial wadding.',
    metric: 'Technical Felts',
    icon: '🏭',
  },
  {
    year: '2026',
    phase: 'ERA 05 · MODERN ERA',
    title: '15,000 MT Annual Scale',
    desc: 'Operating at 15,000 MT capacity with 250+ employees and supplying over 350 active spinning mills worldwide with ISO 9001:2015 certification.',
    metric: '15,000 MT Output',
    icon: '🌍',
  },
]

// ── Official Certifications ──
const CERTIFICATIONS = [
  {
    name: 'ISO 9001:2015',
    tag: 'Quality Management System',
    status: 'Active & Verified',
    badge: '/images/iso-9001-seal-v2.png',
  },
  {
    name: 'GRS (Global Recycled Standard)',
    tag: '100% Post-Consumer PET Recycled Traceability',
    status: 'Certified Recycled',
    badge: null,
  },
  {
    name: 'OEKO-TEX Standard 100',
    tag: 'Tested for Harmful Substances & Skin Safety',
    status: 'Skin-Contact Safe',
    badge: null,
  },
  {
    name: 'Lahore Chamber of Commerce & Industry',
    tag: 'Membership Certificate (LCCI Member)',
    status: 'Corporate Member',
    badge: null,
  },
]

export default function CompanyPage() {
  const [activeMilestoneIdx, setActiveMilestoneIdx] = useState(4)
  const pageRef = useRef<HTMLDivElement>(null)

  // 3D Card Hover Tilt Effect
  const handleCardMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2
    const rotateX = (-y / (rect.height / 2)) * 6
    const rotateY = (x / (rect.width / 2)) * 6
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`
  }

  const handleCardMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget
    card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)`
  }

  useEffect(() => {
    let ctx: any
    const init = async () => {
      const gsap = (await import('gsap')).default
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)

      ctx = gsap.context(() => {
        gsap.fromTo(
          '.anim-hero-element',
          { opacity: 0, y: 25 },
          { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: 'power3.out' }
        )

        gsap.fromTo(
          '.anim-leadership-card',
          { opacity: 0, y: 40, scale: 0.96 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.7,
            stagger: 0.08,
            ease: 'power3.out',
            scrollTrigger: { trigger: '.anim-leadership-wrap', start: 'top 75%' },
          }
        )
      }, pageRef)
    }

    init()
    return () => {
      if (ctx) ctx.revert()
    }
  }, [])

  return (
    <>
      <Header />
      <main ref={pageRef} style={{ paddingTop: '5.5rem', background: 'var(--ivory)', color: 'var(--ink)', minHeight: '100vh' }}>
        
        {/* ════════════════════════════════════════════════════════════════════
            01. HERO SECTION (Classic Deep Blue Sapphire Banner)
        ════════════════════════════════════════════════════════════════════ */}
        <section
          style={{
            background: 'var(--burg-primary)',
            color: 'var(--white)',
            padding: 'clamp(4.5rem, 9vh, 7.5rem) var(--pad-x)',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <div className="container" style={{ position: 'relative', zIndex: 2 }}>
            <div
              className="eyebrow anim-hero-element"
              style={{ color: 'rgba(255, 255, 255, 0.85)', marginBottom: '1rem', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}
            >
              <svg viewBox="0 0 16 16" fill="currentColor" style={{ width: '1rem', height: '1rem' }}>
                <path d="M8 1L10 6H15L11 9L13 14L8 11L3 14L5 9L1 6H6L8 1Z" />
              </svg>
              About Gulf Fibre Company · Est. 1999
            </div>

            <h1
              className="anim-hero-element"
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: 'clamp(2.5rem, 5.5vw, 6rem)',
                fontWeight: 900,
                lineHeight: 0.92,
                letterSpacing: '-0.025em',
                textTransform: 'uppercase',
                marginBottom: '1.75rem',
              }}
            >
              Over 25 Years of <br />
              <span style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontWeight: 600, color: 'var(--white)' }}>
                Textile Excellence
              </span>
            </h1>

            <p
              className="anim-hero-element"
              style={{
                fontSize: '1.0625rem',
                lineHeight: 1.75,
                color: 'rgba(255, 255, 255, 0.9)',
                maxWidth: '62ch',
                marginBottom: '2.5rem',
              }}
            >
              Gulf Fibre Company (PVT) Limited is Pakistan&apos;s leading manufacturer of regenerated polyester staple fibre, conjugate hollow fibres, and non-woven industrial textiles.
            </p>

            {/* Quick Metrics Bar in Hero */}
            <div
              className="anim-hero-element"
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                gap: '1.5rem',
                paddingTop: '2rem',
                borderTop: '1px solid rgba(255, 255, 255, 0.2)',
              }}
            >
              {[
                { val: '25+ Years', label: 'In Business', sub: 'Est. 1999' },
                { val: '15,000 T', label: 'Annual Output', sub: 'Continuous capacity' },
                { val: '350+', label: 'Active Clients', sub: 'Global & domestic' },
                { val: '250+', label: 'Team Members', sub: 'Engineers & staff' },
              ].map((m) => (
                <div key={m.label}>
                  <div style={{ fontFamily: 'var(--font-sans)', fontSize: 'clamp(1.75rem, 2.5vw, 2.5rem)', fontWeight: 900, lineHeight: 1, color: '#FFFFFF', marginBottom: '0.25rem' }}>
                    {m.val}
                  </div>
                  <div style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'rgba(255, 255, 255, 0.9)' }}>
                    {m.label}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'rgba(255, 255, 255, 0.65)', fontStyle: 'italic', fontFamily: 'var(--font-serif)' }}>
                    {m.sub}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════════════
            02. ABOUT US & FACTORY CRAFTSMANSHIP
        ════════════════════════════════════════════════════════════════════ */}
        <section className="section-pad" style={{ borderBottom: '1px solid var(--border-light)', background: 'var(--ivory)' }}>
          <div className="container">
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1.1fr 0.9fr',
                gap: 'clamp(3rem, 6vw, 6rem)',
                alignItems: 'center',
              }}
              className="about-split-grid"
            >
              <div>
                <span className="eyebrow" style={{ marginBottom: '1rem' }}>Our Heritage</span>
                <h2 className="h-section" style={{ marginBottom: '1.5rem' }}>
                  PRECISION FIBRE<br />
                  <em>Craftsmanship</em>
                </h2>
                <p style={{ fontSize: '0.9375rem', lineHeight: 1.75, color: 'var(--muted)', marginBottom: '1.25rem' }}>
                  Founded in 1999 in Karachi, Pakistan, Gulf Fibre has grown from a regional supplier into a trusted global manufacturer. We convert millions of post-consumer plastic bottles into high-grade textile raw materials each year.
                </p>
                <p style={{ fontSize: '0.9375rem', lineHeight: 1.75, color: 'var(--muted)', marginBottom: '2rem' }}>
                  Our advanced continuous extrusion and drafting equipment guarantees consistent denier, precise staple length cutting, and uniform crimping frequency required by top spinning mills worldwide.
                </p>

                {/* 3 Quick Data Badges */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', borderTop: '1px solid var(--border-light)', paddingTop: '1.5rem' }}>
                  {[
                    { val: '4 Lines', label: 'Continuous Extrusion' },
                    { val: '100%', label: 'GRS Recycled PET' },
                    { val: '280 KG', label: 'Moisture-Sealed Bales' },
                  ].map((item) => (
                    <div key={item.label}>
                      <div style={{ fontFamily: 'var(--font-sans)', fontSize: '1.5rem', fontWeight: 900, color: 'var(--burg-primary)', lineHeight: 1, marginBottom: '0.25rem' }}>
                        {item.val}
                      </div>
                      <div style={{ fontSize: '0.6875rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--ink)', letterSpacing: '0.04em' }}>
                        {item.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Plant Image Card */}
              <div
                style={{
                  position: 'relative',
                  height: 'clamp(20rem, 34vw, 30rem)',
                  borderRadius: '24px',
                  overflow: 'hidden',
                  border: '1px solid var(--border-light)',
                  boxShadow: '0 20px 50px rgba(10, 75, 184, 0.08)',
                }}
              >
                <Image
                  src="/images/workshop-factory.jpg"
                  alt="Gulf Fibre Manufacturing Plant"
                  fill
                  style={{ objectFit: 'cover' }}
                />
                <div
                  style={{
                    position: 'absolute',
                    bottom: '1.25rem',
                    left: '1.25rem',
                    background: 'rgba(255, 255, 255, 0.9)',
                    backdropFilter: 'blur(16px)',
                    WebkitBackdropFilter: 'blur(16px)',
                    border: '1px solid rgba(10, 75, 184, 0.15)',
                    borderRadius: '16px',
                    padding: '0.75rem 1.25rem',
                  }}
                >
                  <div style={{ fontSize: '0.625rem', fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--burg-primary)' }}>
                    FACILITY HEADQUARTERS
                  </div>
                  <div style={{ fontSize: '0.875rem', fontWeight: 800, color: 'var(--ink)' }}>
                    Karachi, Pakistan · 15,000 MT Facility
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════════════
            03. MANAGING DIRECTOR & LEADERSHIP TEAM (Glassmorphic)
        ════════════════════════════════════════════════════════════════════ */}
        <section
          id="directors-message"
          style={{
            background: 'var(--white)',
            paddingBlock: 'clamp(5rem, 9vh, 7.5rem)',
            borderBottom: '1px solid var(--border-light)',
          }}
          className="anim-leadership-wrap"
        >
          <div className="container">
            {/* Director Message Header */}
            <div style={{ textAlign: 'center', marginBottom: 'clamp(2.5rem, 5vh, 3.5rem)' }}>
              <span className="eyebrow" style={{ marginBottom: '0.75rem' }}>Executive Vision</span>
              <h2 className="h-section">
                MESSAGE FROM OUR<br />
                <em>Managing Director</em>
              </h2>
            </div>

            {/* Director Message Card */}
            <div
              style={{
                background: 'var(--ivory)',
                border: '1px solid var(--border-light)',
                borderRadius: '32px',
                padding: 'clamp(2rem, 5vw, 4rem)',
                boxShadow: '0 20px 50px rgba(10, 75, 184, 0.06)',
                display: 'grid',
                gridTemplateColumns: '300px 1fr',
                gap: 'clamp(2rem, 4vw, 4rem)',
                alignItems: 'center',
                marginBottom: 'clamp(4rem, 8vh, 6rem)',
              }}
              className="director-card-grid"
            >
              {/* Executive Image */}
              <div style={{ textAlign: 'center' }}>
                <div
                  style={{
                    position: 'relative',
                    width: 'clamp(180px, 20vw, 240px)',
                    height: 'clamp(230px, 25vw, 290px)',
                    margin: '0 auto 1.25rem',
                    borderRadius: '20px',
                    overflow: 'hidden',
                    boxShadow: '0 12px 30px rgba(15, 23, 42, 0.12)',
                    border: '3px solid #FFFFFF',
                  }}
                >
                  <Image
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop"
                    alt="Tariq Mahmood — Co-Founder & CEO"
                    fill
                    style={{ objectFit: 'cover', objectPosition: 'top' }}
                  />
                </div>
                <h3 style={{ fontFamily: 'var(--font-sans)', fontSize: '1.25rem', fontWeight: 900, color: 'var(--ink)', marginBottom: '0.2rem' }}>
                  Tariq Mahmood
                </h3>
                <p style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--burg-primary)' }}>
                  Co-Founder &amp; Chief Executive Officer
                </p>
              </div>

              {/* Message Content */}
              <div>
                <svg width="40" height="40" viewBox="0 0 24 24" fill="var(--burg-primary)" style={{ opacity: 0.25, marginBottom: '0.75rem' }}>
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>

                <h4 style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontSize: 'clamp(1.2rem, 1.8vw, 1.5rem)', fontWeight: 600, color: 'var(--ink)', lineHeight: 1.4, marginBottom: '1.25rem' }}>
                  &ldquo;Since 1999, our fundamental mission has been simple: to engineer dependable textile raw materials with unwavering integrity, technical precision, and enduring client trust.&rdquo;
                </h4>

                <p style={{ fontSize: '0.9375rem', lineHeight: 1.75, color: 'var(--muted)', marginBottom: '1rem' }}>
                  Over the past quarter-century, we have transitioned our operations into a 100% circular polymer model. Today, our 15,000-ton capacity plant transforms post-consumer plastic bottles into high-tenacity polyester staple fibres that spin smoothly across domestic and international spinning mills.
                </p>
                <p style={{ fontSize: '0.9375rem', lineHeight: 1.75, color: 'var(--muted)', marginBottom: '1.5rem' }}>
                  We remain dedicated to our 350+ client partners, our 250+ workforce in Pakistan, and the sustainable future of global textiles.
                </p>

                <div style={{ borderTop: '1px solid var(--border-light)', paddingTop: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                  <div>
                    <div style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontSize: '1.5rem', color: 'var(--burg-primary)', fontWeight: 700 }}>
                      Tariq Mahmood
                    </div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--muted)' }}>Managing Director &amp; Co-Founder</div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '0.625rem', fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--muted)' }}>HEADQUARTERS</div>
                    <div style={{ fontSize: '0.8125rem', fontWeight: 700, color: 'var(--ink)' }}>Karachi, Pakistan</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Board of Directors Header */}
            <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
              <span className="eyebrow" style={{ marginBottom: '0.75rem' }}>Leadership &amp; Engineering</span>
              <h2 className="h-section">
                DIRECTORS, CO-FOUNDER &amp;<br />
                <em>Management Team</em>
              </h2>
              <p style={{ maxWidth: '60ch', margin: '1rem auto 0', color: 'var(--muted)', fontSize: '0.9375rem' }}>
                The multidisciplinary textile engineers, manufacturing directors, and polymer scientists driving Gulf Fibre&apos;s quality standards across 18 countries.
              </p>
            </div>

            {/* 3D Glass Profile Cards Grid */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                gap: 'clamp(1.5rem, 3vw, 2.5rem)',
              }}
            >
              {LEADERSHIP_TEAM.map((member, idx) => (
                <div
                  key={idx}
                  className="glass-profile-card anim-leadership-card"
                  onMouseMove={handleCardMouseMove}
                  onMouseLeave={handleCardMouseLeave}
                  style={{
                    borderRadius: '2.75rem',
                    overflow: 'clip',
                    padding: '0.875rem',
                    background: 'rgba(255, 255, 255, 0.85)',
                    boxShadow: 'inset 0 0 4px -1px rgba(255, 255, 255, 0.95), 0 16px 36px rgba(10, 75, 184, 0.08)',
                    backdropFilter: 'blur(20px)',
                    WebkitBackdropFilter: 'blur(20px)',
                    position: 'relative',
                    transition: 'transform 0.25s ease-out, box-shadow 0.25s ease-out',
                    transformStyle: 'preserve-3d',
                  }}
                >
                  <div className="glass-profile-card__inner">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      className="glass-profile-card__cover"
                      src={member.image}
                      alt={member.name}
                      loading="lazy"
                    />

                    {/* Badge Pill on top-right */}
                    <div
                      style={{
                        position: 'absolute',
                        top: '1.25rem',
                        right: '1.25rem',
                        background: 'rgba(7, 20, 46, 0.75)',
                        backdropFilter: 'blur(12px)',
                        WebkitBackdropFilter: 'blur(12px)',
                        border: '1px solid rgba(255, 255, 255, 0.25)',
                        borderRadius: '9999px',
                        padding: '0.25rem 0.75rem',
                        fontSize: '0.625rem',
                        fontWeight: 800,
                        letterSpacing: '0.08em',
                        textTransform: 'uppercase',
                        color: '#FFFFFF',
                        zIndex: 3,
                      }}
                    >
                      {member.tag}
                    </div>

                    {/* Content Overlay */}
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

        {/* ════════════════════════════════════════════════════════════════════
            04. INTERACTIVE 3D HORIZON TIMELINE SLIDER (1999 → 2026)
        ════════════════════════════════════════════════════════════════════ */}
        <section
          style={{
            paddingBlock: 'clamp(5rem, 9vh, 8rem)',
            background: 'var(--ivory-deep)',
            borderBottom: '1px solid var(--border-light)',
          }}
        >
          <div className="container">
            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
              <span className="eyebrow" style={{ marginBottom: '0.75rem' }}>Our Journey</span>
              <h2 className="h-section">
                QUARTER CENTURY OF<br />
                <em>Milestones</em>
              </h2>
            </div>

            {/* Decade Selector Tabs */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                gap: '0.5rem',
                flexWrap: 'wrap',
                marginBottom: '2.5rem',
              }}
            >
              {MILESTONES.map((m, idx) => {
                const isActive = idx === activeMilestoneIdx
                return (
                  <button
                    key={m.year}
                    onClick={() => setActiveMilestoneIdx(idx)}
                    style={{
                      background: isActive ? 'var(--burg-primary)' : '#FFFFFF',
                      color: isActive ? '#FFFFFF' : 'var(--ink)',
                      border: isActive ? '2px solid var(--burg-primary)' : '1px solid var(--border-light)',
                      borderRadius: '9999px',
                      padding: '0.5rem 1.25rem',
                      fontFamily: 'var(--font-sans)',
                      fontSize: '0.8125rem',
                      fontWeight: 800,
                      cursor: 'pointer',
                      boxShadow: isActive ? '0 8px 20px rgba(10, 75, 184, 0.25)' : '0 2px 6px rgba(0,0,0,0.03)',
                      transition: 'all 0.3s ease',
                    }}
                  >
                    {m.year}
                  </button>
                )
              })}
            </div>

            {/* Active Milestone Display Card */}
            <div
              style={{
                maxWidth: '850px',
                margin: '0 auto',
                background: '#FFFFFF',
                border: '1px solid var(--border-light)',
                borderRadius: '32px',
                padding: 'clamp(2rem, 4vw, 3.5rem)',
                boxShadow: '0 20px 50px rgba(10, 75, 184, 0.06)',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              {/* Year Watermark */}
              <div
                style={{
                  position: 'absolute',
                  top: '-20px',
                  right: '20px',
                  fontFamily: 'var(--font-sans)',
                  fontSize: 'clamp(5rem, 10vw, 8rem)',
                  fontWeight: 900,
                  color: 'rgba(10, 75, 184, 0.05)',
                  userSelect: 'none',
                  pointerEvents: 'none',
                  lineHeight: 1,
                }}
              >
                {MILESTONES[activeMilestoneIdx].year}
              </div>

              <div style={{ position: 'relative', zIndex: 2 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
                  <span style={{ fontSize: '1.5rem' }}>{MILESTONES[activeMilestoneIdx].icon}</span>
                  <span style={{ fontSize: '0.6875rem', fontWeight: 800, color: 'var(--burg-primary)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                    {MILESTONES[activeMilestoneIdx].phase}
                  </span>
                </div>

                <h3
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: 'clamp(1.75rem, 2.8vw, 2.5rem)',
                    fontWeight: 900,
                    color: 'var(--ink)',
                    marginBottom: '1rem',
                    lineHeight: 1.1,
                  }}
                >
                  {MILESTONES[activeMilestoneIdx].title}
                </h3>

                <p style={{ fontSize: '1rem', lineHeight: 1.75, color: 'var(--muted)', marginBottom: '1.5rem', maxWidth: '62ch' }}>
                  {MILESTONES[activeMilestoneIdx].desc}
                </p>

                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    background: 'rgba(10, 75, 184, 0.08)',
                    border: '1px solid rgba(10, 75, 184, 0.2)',
                    padding: '0.45rem 1rem',
                    borderRadius: '8px',
                    fontSize: '0.8125rem',
                    fontWeight: 800,
                    color: 'var(--burg-primary)',
                    letterSpacing: '0.06em',
                  }}
                >
                  ✓ {MILESTONES[activeMilestoneIdx].metric}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════════════
            05. OFFICIAL QUALITY CERTIFICATIONS SHOWCASE
        ════════════════════════════════════════════════════════════════════ */}
        <section
          style={{
            paddingBlock: 'clamp(5rem, 9vh, 7.5rem)',
            background: 'var(--white)',
            borderBottom: '1px solid var(--border-light)',
          }}
        >
          <div className="container">
            <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
              <span className="eyebrow" style={{ marginBottom: '0.75rem' }}>Quality Assurance</span>
              <h2 className="h-section">
                CERTIFIED STANDARDS &amp;<br />
                <em>Regulatory Accreditations</em>
              </h2>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
                gap: '1.75rem',
              }}
            >
              {CERTIFICATIONS.map((cert) => (
                <div
                  key={cert.name}
                  style={{
                    background: 'var(--ivory)',
                    border: '1px solid var(--border-light)',
                    borderRadius: '20px',
                    padding: '2rem 1.5rem',
                    boxShadow: '0 10px 30px rgba(10, 75, 184, 0.04)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                      <span
                        style={{
                          fontSize: '0.625rem',
                          fontWeight: 800,
                          letterSpacing: '0.06em',
                          textTransform: 'uppercase',
                          color: '#16A34A',
                          background: 'rgba(34, 197, 94, 0.1)',
                          padding: '0.2rem 0.6rem',
                          borderRadius: '9999px',
                        }}
                      >
                        {cert.status}
                      </span>

                      {cert.badge && (
                        <div style={{ width: '40px', height: '40px', position: 'relative' }}>
                          <Image src={cert.badge} alt={cert.name} fill style={{ objectFit: 'contain' }} />
                        </div>
                      )}
                    </div>

                    <h3 style={{ fontFamily: 'var(--font-sans)', fontSize: '1.25rem', fontWeight: 900, color: 'var(--ink)', marginBottom: '0.25rem' }}>
                      {cert.name}
                    </h3>
                    <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--burg-primary)', marginBottom: '0.75rem' }}>
                      {cert.tag}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════════════
            06. CLOSING CTA (Solid Sapphire Brand Primary)
        ════════════════════════════════════════════════════════════════════ */}
        <section
          style={{
            background: 'var(--burg-primary)',
            color: '#FFFFFF',
            padding: 'clamp(5rem, 9vh, 7.5rem) 0',
            textAlign: 'center',
          }}
        >
          <div className="container">
            <span className="eyebrow" style={{ color: 'rgba(255, 255, 255, 0.8)', marginBottom: '1rem' }}>
              Industrial Cooperation
            </span>
            <h2
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: 'clamp(2.25rem, 4.5vw, 4.25rem)',
                fontWeight: 900,
                lineHeight: 1.05,
                textTransform: 'uppercase',
                maxWidth: '22ch',
                margin: '0 auto 1.5rem',
              }}
            >
              Partner With Pakistan&apos;s <br />
              <span style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', color: 'rgba(255, 255, 255, 0.95)' }}>
                Fibre Pioneers
              </span>
            </h2>
            <p
              style={{
                fontSize: '1rem',
                lineHeight: 1.7,
                color: 'rgba(255, 255, 255, 0.85)',
                maxWidth: '56ch',
                margin: '0 auto 2.25rem',
              }}
            >
              Operating at 15,000 MT annual capacity with 250+ employees. Connect directly with our executive leadership or schedule an on-site plant audit in Karachi.
            </p>

            <div style={{ display: 'flex', gap: '1.25rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link href="/contact" className="btn-primary" style={{ background: '#FFFFFF', color: 'var(--burg-primary)', border: 'none' }}>
                CONNECT WITH LEADERSHIP
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </section>

        {/* ── Hidden SVG Symbols for Icons ── */}
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

      {/* ── Glassmorphic Profile Card Styles matching theme ── */}
      <style jsx global>{`
        @media (max-width: 900px) {
          .about-split-grid,
          .director-card-grid {
            grid-template-columns: 1fr !important;
          }
        }

        .glass-profile-card {
          border-radius: 2.75rem;
          overflow: clip;
          padding: 0.875rem;
          background: rgba(255, 255, 255, 0.85);
          box-shadow: inset 0 0 4px -1px rgba(255, 255, 255, 0.95), 0 16px 36px rgba(10, 75, 184, 0.08);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          position: relative;
          transition: transform 0.25s ease-out, box-shadow 0.25s ease-out;
        }

        [data-theme="dark"] .glass-profile-card {
          background: rgba(13, 28, 56, 0.65);
          box-shadow: inset 0 0 4px -2px rgba(255, 255, 255, 0.35), 0 16px 40px rgba(0, 0, 0, 0.45);
        }

        .glass-profile-card__inner {
          display: grid;
          grid-template-areas: "stack";
          position: relative;
          border-radius: 2.25rem;
          overflow: clip;
          aspect-ratio: 3 / 4.2;
          box-shadow: inset 0 0 4px -2px rgba(255, 255, 255, 0.6), 0 0 4px -2px rgba(255, 255, 255, 0.6);
        }

        .glass-profile-card__inner:after {
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

        .glass-profile-card__cover {
          grid-area: stack;
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .glass-profile-card:hover .glass-profile-card__cover {
          transform: scale(1.06);
        }

        .glass-profile-card__body {
          z-index: 2;
          grid-area: stack;
          margin-top: auto;
          padding: 1.5rem 1.5rem 1.25rem;
          background: linear-gradient(180deg, transparent 0%, rgba(4, 15, 38, 0.85) 50%, rgba(4, 15, 38, 0.96) 100%);
          border-radius: 0 0 2.25rem 2.25rem;
        }

        .glass-profile-card__header {
          margin: 0;
        }

        .glass-profile-card__quote {
          font-size: 0.8125rem;
          line-height: 1.5;
          color: rgba(255, 255, 255, 0.8);
          font-style: italic;
          margin: 0.25rem 0 0.75rem;
        }

        .chips {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          color: #FFFFFF;
          font-weight: 800;
          font-size: 1.15rem;
        }

        .icon {
          width: 1em;
          height: 1em;
          display: inline-block;
          vertical-align: middle;
        }

        .glass-profile-card__footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 0.5rem;
          margin-top: 0.5rem;
          padding-top: 0.75rem;
          border-top: 1px solid rgba(255, 255, 255, 0.15);
        }

        .glass-profile-card__footer .chips {
          font-size: 0.75rem;
          font-weight: 600;
          color: rgba(255, 255, 255, 0.85);
        }

        .glass-profile-card__footer .button {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          background: rgba(255, 255, 255, 0.12);
          border: 1px solid rgba(255, 255, 255, 0.25);
          color: #FFFFFF;
          font-size: 0.6875rem;
          font-weight: 700;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          padding: 0.4rem 0.75rem;
          border-radius: 9999px;
          text-decoration: none;
          transition: all 0.25s ease;
        }

        .glass-profile-card__footer .button:hover {
          background: #0A4BB8 !important;
          border-color: #0A4BB8 !important;
          color: #FFFFFF !important;
          transform: scale(1.05);
        }
      `}</style>
    </>
  )
}
