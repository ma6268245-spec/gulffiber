'use client'

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { Provenance } from '@/components/subpages/Primitives'
import { CERT_ASSETS, CERTIFICATION_DETAIL } from '@/lib/data/company'

/* ===========================================================================
   PHOTOREALISTIC EXECUTIVE OFFICE CERTIFICATE GALLERY
   ---------------------------------------------------------------------------
   Features:
   - 16:9 architectural corporate photography of Gulf Fiber office.
   - Symmetrical 3-column × 2-row gallery layout.
   - Exactly 6 authentic certificates:
       Row 1: ISO 9001:2015 | GRS Scope P.1 | EPA Punjab Approval
       Row 2: OEKO-TEX® 100 | GRS Site P.3  | LCCI Membership
   - Interactive hover zoom reveals high-res original scan with glass gleam.
   - Interactive full-screen high-resolution lightbox viewer.
   - Clean, professional design with all UI artifacts removed.
   =========================================================================== */

const MAGNIFIER = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true" style={{ width: '13px', height: '13px' }}>
    <circle cx="11" cy="11" r="7" />
    <path d="m21 21-4.3-4.3" />
  </svg>
)

const CLOSE = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
    <path d="M18 6L6 18M6 6l12 12" />
  </svg>
)

const CHEVRON_LEFT = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ width: '22px', height: '22px' }}>
    <polyline points="15 18 9 12 15 6" />
  </svg>
)

const CHEVRON_RIGHT = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ width: '22px', height: '22px' }}>
    <polyline points="9 18 15 12 9 6" />
  </svg>
)

interface CertEntry {
  code: string
  name: string
  certNumber?: string
  scope: string
  what: string
  asset: string | null
  kind: 'ACCREDITED_CERTIFICATION' | 'TRADE_ASSOCIATION'
  plaqueTitle: string
  issuer: string
  shortScope: string
  // Exact percentage positions on the 16:9 wall
  top: string
  left: string
  width: string
  height: string
}

const CERT_COORDS: Record<string, { top: string; left: string; width: string; height: string; plaqueTitle: string; issuer: string; shortScope: string }> = {
  'ISO 9001:2015': {
    top: '10.8%',
    left: '33.2%',
    width: '10.7%',
    height: '25.0%',
    plaqueTitle: 'ISO 9001:2015 · QUALITY MANAGEMENT',
    issuer: 'Sustainable Management System Inc. · ASCB (USA)',
    shortScope: 'Manufacturing & Export of Recycled Polyester Fiber',
  },
  'GRS (Scope P.1)': {
    top: '10.8%',
    left: '44.9%',
    width: '10.7%',
    height: '25.0%',
    plaqueTitle: 'GRS 4.0 · MAIN SCOPE CERTIFICATE',
    issuer: 'Control Union Certifications B.V. (Netherlands)',
    shortScope: '100% Post-Consumer Recycled PET Flake & Fibres',
  },
  'EPA Punjab': {
    top: '10.8%',
    left: '56.6%',
    width: '10.7%',
    height: '25.0%',
    plaqueTitle: 'EPA PUNJAB · STATUTORY APPROVAL',
    issuer: 'Govt. of the Punjab Environmental Protection Agency',
    shortScope: 'Operational Environmental Approval for PET Processing',
  },
  'OEKO-TEX 100': {
    top: '38.0%',
    left: '33.2%',
    width: '10.7%',
    height: '25.0%',
    plaqueTitle: 'OEKO-TEX® 100 · CLASS I (BABY SAFE)',
    issuer: 'AITEX Textile Research Institute (Spain)',
    shortScope: '100% Recycled Polyester Staple Fiber (White, Green, Black)',
  },
  'GRS (Site P.3)': {
    top: '38.0%',
    left: '44.9%',
    width: '10.7%',
    height: '25.0%',
    plaqueTitle: 'GRS 4.0 · SITE & FACILITY APPENDIX',
    issuer: 'Control Union Certifications B.V. (Netherlands)',
    shortScope: 'Mechanical Recycling, Dyeing & Trading Operations',
  },
  LCCI: {
    top: '38.0%',
    left: '56.6%',
    width: '10.7%',
    height: '25.0%',
    plaqueTitle: 'LAHORE CHAMBER OF COMMERCE (LCCI)',
    issuer: 'The Lahore Chamber of Commerce & Industry',
    shortScope: 'Registered Corporate Manufacturer & Exporter (Member Since 2004)',
  },
}

// Ordered strictly in the 3x2 layout:
// Row 1: ISO 9001, GRS Scope, EPA Punjab
// Row 2: OEKO-TEX 100, GRS Site, LCCI
const ORDERED_CODES = [
  'ISO 9001:2015',
  'GRS (Scope P.1)',
  'EPA Punjab',
  'OEKO-TEX 100',
  'GRS (Site P.3)',
  'LCCI',
]

const ENTRIES: CertEntry[] = ORDERED_CODES.map((code) => {
  const detail = CERTIFICATION_DETAIL.find((c) => c.code === code)!
  const coords = CERT_COORDS[code]
  return {
    code: detail.code,
    name: detail.name,
    certNumber: detail.certNumber,
    scope: detail.scope,
    what: detail.what,
    asset: CERT_ASSETS[detail.code] ?? null,
    kind: detail.kind,
    top: coords.top,
    left: coords.left,
    width: coords.width,
    height: coords.height,
    plaqueTitle: coords.plaqueTitle,
    issuer: coords.issuer,
    shortScope: coords.shortScope,
  }
})

export function CertificationGallery() {
  const [openIdx, setOpenIdx] = useState<number | null>(null)
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null)
  const closeRef = useRef<HTMLButtonElement>(null)
  const cardRefs = useRef<(HTMLButtonElement | null)[]>([])
  const prevIdx = useRef<number>(0)

  const open = openIdx === null ? null : ENTRIES[openIdx]

  useEffect(() => {
    if (openIdx === null) return
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpenIdx(null)
      } else if (e.key === 'ArrowLeft') {
        setOpenIdx((idx) => (idx !== null ? (idx - 1 + ENTRIES.length) % ENTRIES.length : null))
      } else if (e.key === 'ArrowRight') {
        setOpenIdx((idx) => (idx !== null ? (idx + 1) % ENTRIES.length : null))
      }
    }

    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [openIdx])

  useEffect(() => {
    if (openIdx === null) {
      const card = cardRefs.current[prevIdx.current]
      card?.focus()
    }
  }, [openIdx])

  const goPrev = (e: React.MouseEvent) => {
    e.stopPropagation()
    setOpenIdx((idx) => (idx !== null ? (idx - 1 + ENTRIES.length) % ENTRIES.length : null))
  }

  const goNext = (e: React.MouseEvent) => {
    e.stopPropagation()
    setOpenIdx((idx) => (idx !== null ? (idx + 1) % ENTRIES.length : null))
  }

  return (
    <>
      {/* ── FULL-BLEED 16:9 REALISTIC EXECUTIVE OFFICE CONTAINER ───────── */}
      <div
        className="executive-office-wall-fullbleed"
        style={{
          position: 'relative',
          width: '100vw',
          marginLeft: 'calc(-50vw + 50%)',
          marginRight: 'calc(-50vw + 50%)',
          aspectRatio: '16 / 9',
          minHeight: '520px',
          maxHeight: '850px',
          backgroundImage: 'url("/images/office-certificate-wall.jpg")',
          backgroundPosition: 'center center',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          overflow: 'visible',
          boxShadow: 'inset 0 20px 40px rgba(0,0,0,0.06), inset 0 -20px 40px rgba(0,0,0,0.08)',
        }}
      >
        {/* ── INTERACTIVE INSTRUCTION BADGE (Top Center) ── */}
        <div
          style={{
            position: 'absolute',
            top: '3.5%',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 20,
            background: 'rgba(255, 255, 255, 0.94)',
            padding: '0.35rem 1.25rem',
            borderRadius: '9999px',
            backdropFilter: 'blur(12px)',
            boxShadow: '0 4px 16px rgba(0, 0, 0, 0.08)',
            border: '1px solid rgba(255, 255, 255, 0.9)',
            pointerEvents: 'none',
          }}
        >
          <span
            style={{
              fontSize: '0.75rem',
              fontWeight: 800,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: 'var(--burg-primary, #0A4BB8)',
              fontFamily: 'var(--font-sans)',
            }}
          >
            ✦ Hover over images to verify · Click to examine certificate ✦
          </span>
        </div>

        {/* ── INTERACTIVE HOVER & LIGHTBOX HOTSPOTS OVER 3×2 FRAMES ───────── */}
        {ENTRIES.map((c, i) => {
          const isHovered = hoveredIdx === i

          return (
            <div
              key={c.code}
              style={{
                position: 'absolute',
                top: c.top,
                left: c.left,
                width: c.width,
                height: c.height,
                zIndex: isHovered ? 100 : 10,
              }}
            >
              {/* Interactive Frame Button */}
              <button
                type="button"
                onClick={() => {
                  prevIdx.current = i
                  setOpenIdx(i)
                }}
                onMouseEnter={() => setHoveredIdx(i)}
                onMouseLeave={() => setHoveredIdx(null)}
                ref={(el) => {
                  cardRefs.current[i] = el
                }}
                aria-label={`Inspect ${c.name} (${c.code})`}
                style={{
                  position: 'relative',
                  width: '100%',
                  height: '100%',
                  background: 'transparent',
                  border: 'none',
                  padding: 0,
                  cursor: 'pointer',
                  borderRadius: '4px',
                  outline: 'none',
                  transform: isHovered ? 'scale(1.4) translateY(-10px)' : 'scale(1)',
                  transformOrigin: 'center center',
                  transition: 'transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.35s ease',
                  boxShadow: isHovered ? '0 32px 64px rgba(0, 0, 0, 0.5), 0 12px 24px rgba(0,0,0,0.3)' : 'none',
                }}
              >
                {/* When hovered, render high-res original scan in sharp wood frame overlay */}
                {isHovered && (
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'linear-gradient(135deg, #2E1B12 0%, #150A05 40%, #3B2418 70%, #120703 100%)',
                      borderRadius: '5px',
                      padding: '4px',
                      boxShadow: 'inset 0 1px 1px rgba(255, 255, 255, 0.3), inset 0 -1px 2px rgba(0, 0, 0, 0.6), 0 2px 4px rgba(0,0,0,0.3)',
                      border: '1px solid #100602',
                      display: 'flex',
                      flexDirection: 'column',
                    }}
                  >
                    <div
                      style={{
                        background: 'linear-gradient(135deg, #D4AF37 0%, #99751B 50%, #F5E096 100%)',
                        padding: '1.5px',
                        borderRadius: '3px',
                        flex: 1,
                        display: 'flex',
                        flexDirection: 'column',
                      }}
                    >
                      <div
                        style={{
                          background: '#FAF8F4',
                          borderRadius: '2px',
                          padding: '2px',
                          flex: 1,
                          display: 'flex',
                          flexDirection: 'column',
                          overflow: 'hidden',
                        }}
                      >
                        <div style={{ position: 'relative', flex: 1, width: '100%', overflow: 'hidden' }}>
                          {c.asset && (
                            <Image
                              src={c.asset}
                              alt={`${c.code} certificate`}
                              fill
                              sizes="30vw"
                              style={{ objectFit: 'contain', padding: '2px' }}
                            />
                          )}
                          <div
                            style={{
                              position: 'absolute',
                              inset: 0,
                              background: 'linear-gradient(135deg, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0.06) 40%, transparent 60%)',
                              pointerEvents: 'none',
                            }}
                          />
                          <div
                            style={{
                              position: 'absolute',
                              bottom: '3px',
                              right: '3px',
                              background: '#0A4BB8',
                              color: '#FFFFFF',
                              fontSize: '0.52rem',
                              fontWeight: 800,
                              padding: '0.15rem 0.45rem',
                              borderRadius: '9999px',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '0.2rem',
                              boxShadow: '0 2px 6px rgba(0, 0, 0, 0.4)',
                            }}
                          >
                            {MAGNIFIER}
                            Inspect
                          </div>
                        </div>

                        {/* Engraved Brass Plaque with clean wrapping so full name is NEVER cut off */}
                        <div
                          style={{
                            marginTop: '2px',
                            background: 'linear-gradient(180deg, #FDE68A 0%, #D4AF37 45%, #B4881A 100%)',
                            borderRadius: '1.5px',
                            padding: '2px 4px',
                            textAlign: 'center',
                            border: '0.5px solid #8C6215',
                            color: '#2A1804',
                            minHeight: '18px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                        >
                          <div
                            style={{
                              fontSize: '0.44rem',
                              fontWeight: 800,
                              letterSpacing: '0.03em',
                              textTransform: 'uppercase',
                              lineHeight: 1.15,
                              fontFamily: 'var(--font-sans)',
                              whiteSpace: 'normal',
                              wordBreak: 'normal',
                              display: '-webkit-box',
                              WebkitLineClamp: 2,
                              WebkitBoxOrient: 'vertical',
                              overflow: 'hidden',
                            }}
                          >
                            {c.plaqueTitle}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </button>

              {/* Verified Specs Tooltip on Hover */}
              <div
                style={{
                  position: 'absolute',
                  top: 'calc(100% + 12px)',
                  left: '50%',
                  transform: isHovered
                    ? 'translateX(-50%) translateY(0)'
                    : 'translateX(-50%) translateY(6px)',
                  opacity: isHovered ? 1 : 0,
                  pointerEvents: isHovered ? 'auto' : 'none',
                  zIndex: 120,
                  width: '260px',
                  background: 'rgba(255, 255, 255, 0.98)',
                  backdropFilter: 'blur(12px)',
                  borderRadius: '10px',
                  padding: '0.75rem 0.9rem',
                  boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3), 0 2px 6px rgba(0,0,0,0.08)',
                  border: '1px solid rgba(10, 75, 184, 0.25)',
                  transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                  <span style={{ fontSize: '0.65rem', fontWeight: 800, color: 'var(--burg-primary, #0A4BB8)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                    {c.code}
                  </span>
                  <Provenance status="VERIFIED" />
                </div>

                <div style={{ fontSize: '0.72rem', fontWeight: 800, color: '#0F172A', marginBottom: '0.2rem', lineHeight: 1.3 }}>
                  {c.issuer}
                </div>

                <div style={{ fontSize: '0.58rem', color: '#475569', lineHeight: 1.45, marginBottom: '0.35rem' }}>
                  {c.shortScope}
                </div>

                {c.certNumber && (
                  <div style={{ fontSize: '0.52rem', fontWeight: 700, color: '#1E293B', background: '#F1F5F9', padding: '0.2rem 0.4rem', borderRadius: '4px', border: '1px solid #E2E8F0' }}>
                    Ref: {c.certNumber}
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>

      {/* ── FULL-SCREEN GLASSMORPHIC LIGHTBOX MODAL ───────────────────────── */}
      {open && (
        <div
          className="sp-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={`${open.code} certificate`}
          onClick={() => setOpenIdx(null)}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 999999,
            background: 'rgba(5, 12, 28, 0.76)',
            backdropFilter: 'blur(28px) saturate(180%)',
            WebkitBackdropFilter: 'blur(28px) saturate(180%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 'clamp(1rem, 2.5vw, 2.5rem)',
          }}
        >
          {/* Floating Top Header: Document Counter & Close Button */}
          <div
            style={{
              position: 'fixed',
              top: '1.25rem',
              left: 'clamp(1rem, 3vw, 2.5rem)',
              right: 'clamp(1rem, 3vw, 2.5rem)',
              zIndex: 30,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              pointerEvents: 'none',
            }}
          >
            <div
              style={{
                background: 'rgba(255, 255, 255, 0.12)',
                color: '#FFFFFF',
                fontSize: '0.8125rem',
                fontWeight: 700,
                padding: '0.45rem 1.15rem',
                borderRadius: '9999px',
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)',
                border: '1px solid rgba(255, 255, 255, 0.22)',
                boxShadow: '0 8px 24px rgba(0, 0, 0, 0.25)',
                pointerEvents: 'auto',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
              }}
            >
              <span style={{ color: '#93C5FD' }}>{open.code}</span>
              <span style={{ opacity: 0.5 }}>·</span>
              <span>Document {openIdx! + 1} of {ENTRIES.length}</span>
            </div>

            <button
              ref={closeRef}
              type="button"
              className="sp-lightbox__close"
              onClick={() => setOpenIdx(null)}
              aria-label="Close document view"
              style={{
                background: 'rgba(255, 255, 255, 0.15)',
                color: '#FFFFFF',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                borderRadius: '50%',
                width: '44px',
                height: '44px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                pointerEvents: 'auto',
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)',
                boxShadow: '0 8px 24px rgba(0, 0, 0, 0.3)',
                transition: 'all 0.2s ease',
              }}
            >
              {CLOSE}
            </button>
          </div>

          {/* Floating Left Arrow */}
          <button
            type="button"
            onClick={goPrev}
            aria-label="Previous Certificate"
            style={{
              position: 'fixed',
              left: 'clamp(0.75rem, 2vw, 2rem)',
              top: '50%',
              transform: 'translateY(-50%)',
              zIndex: 25,
              background: 'rgba(255, 255, 255, 0.12)',
              color: '#FFFFFF',
              border: '1px solid rgba(255, 255, 255, 0.25)',
              borderRadius: '50%',
              width: '50px',
              height: '50px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
              boxShadow: '0 8px 30px rgba(0, 0, 0, 0.35)',
              transition: 'all 0.2s ease',
            }}
          >
            {CHEVRON_LEFT}
          </button>

          {/* Floating Right Arrow */}
          <button
            type="button"
            onClick={goNext}
            aria-label="Next Certificate"
            style={{
              position: 'fixed',
              right: 'clamp(0.75rem, 2vw, 2rem)',
              top: '50%',
              transform: 'translateY(-50%)',
              zIndex: 25,
              background: 'rgba(255, 255, 255, 0.12)',
              color: '#FFFFFF',
              border: '1px solid rgba(255, 255, 255, 0.25)',
              borderRadius: '50%',
              width: '50px',
              height: '50px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
              boxShadow: '0 8px 30px rgba(0, 0, 0, 0.35)',
              transition: 'all 0.2s ease',
            }}
          >
            {CHEVRON_RIGHT}
          </button>

          {/* Floating High-Resolution Certificate Document Canvas */}
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              position: 'relative',
              width: '100%',
              maxWidth: '860px',
              height: 'calc(80vh - 40px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 10,
              filter: 'drop-shadow(0 25px 60px rgba(0, 0, 0, 0.65))',
            }}
          >
            {open.asset ? (
              <Image
                src={open.asset}
                alt={`${open.code} - ${open.name} official certificate document`}
                fill
                priority
                sizes="(max-width: 1200px) 95vw, 860px"
                style={{
                  objectFit: 'contain',
                  borderRadius: '6px',
                }}
              />
            ) : null}
          </div>

          {/* Floating Frosted Glass Bottom Caption Bar */}
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              position: 'fixed',
              bottom: '1.25rem',
              left: '50%',
              transform: 'translateX(-50%)',
              zIndex: 30,
              width: 'min(92vw, 860px)',
              background: 'rgba(11, 20, 38, 0.82)',
              backdropFilter: 'blur(24px)',
              WebkitBackdropFilter: 'blur(24px)',
              border: '1px solid rgba(255, 255, 255, 0.18)',
              borderRadius: '16px',
              padding: '0.75rem 1.4rem',
              boxShadow: '0 16px 40px rgba(0, 0, 0, 0.45)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '1rem',
            }}
          >
            <div style={{ flex: '1 1 auto', minWidth: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.2rem' }}>
                <span
                  style={{
                    background: 'rgba(59, 130, 246, 0.2)',
                    color: '#93C5FD',
                    border: '1px solid rgba(147, 197, 253, 0.3)',
                    fontSize: '0.65rem',
                    fontWeight: 800,
                    padding: '0.15rem 0.5rem',
                    borderRadius: '4px',
                    letterSpacing: '0.05em',
                    textTransform: 'uppercase',
                  }}
                >
                  {open.code}
                </span>
                <h3
                  style={{
                    fontSize: '0.925rem',
                    fontWeight: 800,
                    margin: 0,
                    color: '#FFFFFF',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                  {open.name}
                </h3>
              </div>
              <p
                style={{
                  margin: 0,
                  color: 'rgba(255, 255, 255, 0.72)',
                  fontSize: '0.72rem',
                  lineHeight: 1.35,
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                {open.what}
              </p>
            </div>

            {open.certNumber && (
              <div
                style={{
                  flex: '0 0 auto',
                  background: 'rgba(255, 255, 255, 0.08)',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  borderRadius: '8px',
                  padding: '0.35rem 0.75rem',
                  textAlign: 'right',
                }}
              >
                <div style={{ fontSize: '0.58rem', color: '#94A3B8', fontWeight: 600, textTransform: 'uppercase' }}>Ref Number</div>
                <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#38BDF8' }}>
                  {open.certNumber}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )
}




