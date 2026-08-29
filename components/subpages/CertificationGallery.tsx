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
    plaqueTitle: 'GRS 4.0 · FACILITY & SITE APPENDIX',
    issuer: 'Control Union Certifications B.V. (Netherlands)',
    shortScope: 'Mechanical Recycling, Dyeing & Trading Operations',
  },
  LCCI: {
    top: '38.0%',
    left: '56.6%',
    width: '10.7%',
    height: '25.0%',
    plaqueTitle: 'THE LAHORE CHAMBER OF COMMERCE',
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
                  transform: isHovered ? 'scale(1.35) translateY(-8px)' : 'scale(1)',
                  transformOrigin: 'center center',
                  transition: 'transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.35s ease',
                  boxShadow: isHovered ? '0 28px 56px rgba(0, 0, 0, 0.45), 0 10px 20px rgba(0,0,0,0.25)' : 'none',
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
                              sizes="25vw"
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
                              fontSize: '0.5rem',
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

                        {/* Engraved Plaque */}
                        <div
                          style={{
                            marginTop: '2px',
                            background: 'linear-gradient(180deg, #FDE68A 0%, #D4AF37 45%, #B4881A 100%)',
                            borderRadius: '1.5px',
                            padding: '2px 3px',
                            textAlign: 'center',
                            border: '0.5px solid #8C6215',
                            color: '#2A1804',
                          }}
                        >
                          <div
                            style={{
                              fontSize: '0.45rem',
                              fontWeight: 800,
                              letterSpacing: '0.04em',
                              textTransform: 'uppercase',
                              lineHeight: 1.15,
                              fontFamily: 'var(--font-sans)',
                              whiteSpace: 'nowrap',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
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
                  top: 'calc(100% + 10px)',
                  left: '50%',
                  transform: isHovered
                    ? 'translateX(-50%) translateY(0)'
                    : 'translateX(-50%) translateY(6px)',
                  opacity: isHovered ? 1 : 0,
                  pointerEvents: isHovered ? 'auto' : 'none',
                  zIndex: 120,
                  width: '240px',
                  background: 'rgba(255, 255, 255, 0.96)',
                  backdropFilter: 'blur(10px)',
                  borderRadius: '10px',
                  padding: '0.65rem 0.8rem',
                  boxShadow: '0 16px 36px rgba(0, 0, 0, 0.28), 0 2px 6px rgba(0,0,0,0.08)',
                  border: '1px solid rgba(10, 75, 184, 0.25)',
                  transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.2rem' }}>
                  <span style={{ fontSize: '0.625rem', fontWeight: 800, color: 'var(--burg-primary, #0A4BB8)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                    {c.code}
                  </span>
                  <Provenance status="VERIFIED" />
                </div>

                <div style={{ fontSize: '0.6875rem', fontWeight: 700, color: '#0F172A', marginBottom: '0.15rem', lineHeight: 1.25 }}>
                  {c.issuer}
                </div>

                <div style={{ fontSize: '0.5625rem', color: '#64748B', lineHeight: 1.4, marginBottom: '0.25rem' }}>
                  {c.shortScope}
                </div>

                {c.certNumber && (
                  <div style={{ fontSize: '0.5rem', fontWeight: 700, color: '#334155', background: '#F1F5F9', padding: '0.15rem 0.35rem', borderRadius: '3px' }}>
                    Ref: {c.certNumber}
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>

      {/* ── FULL-SCREEN LIGHTBOX MODAL ────────────────────────────────────── */}
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
            zIndex: 9999,
            background: 'rgba(4, 15, 38, 0.94)',
            backdropFilter: 'blur(16px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 'clamp(1rem, 3vw, 2.5rem)',
          }}
        >
          <div
            className="sp-lightbox__panel"
            onClick={(e) => e.stopPropagation()}
            style={{
              position: 'relative',
              background: '#FFFFFF',
              borderRadius: '24px',
              maxWidth: '920px',
              width: '100%',
              maxHeight: '94vh',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              boxShadow: '0 30px 80px rgba(0, 0, 0, 0.6)',
            }}
          >
            {/* Header: Document Index & Close Button */}
            <div
              style={{
                position: 'absolute',
                top: '1rem',
                left: '1.25rem',
                right: '1rem',
                zIndex: 10,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                pointerEvents: 'none',
              }}
            >
              <span
                style={{
                  background: 'rgba(4, 15, 38, 0.85)',
                  color: '#FFFFFF',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  padding: '0.35rem 0.95rem',
                  borderRadius: '9999px',
                  backdropFilter: 'blur(8px)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  pointerEvents: 'auto',
                }}
              >
                Document {openIdx! + 1} of {ENTRIES.length} · {open.code}
              </span>

              <button
                ref={closeRef}
                type="button"
                className="sp-lightbox__close"
                onClick={() => setOpenIdx(null)}
                aria-label="Close document view"
                style={{
                  background: 'rgba(4, 15, 38, 0.85)',
                  color: '#FFFFFF',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: '50%',
                  width: '40px',
                  height: '40px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  pointerEvents: 'auto',
                  transition: 'background 0.2s ease',
                }}
              >
                {CLOSE}
              </button>
            </div>

            {/* Document Viewer Container with Prev / Next buttons */}
            <div
              className="sp-lightbox__media"
              style={{
                position: 'relative',
                flex: '1 1 auto',
                minHeight: '480px',
                maxHeight: '66vh',
                background: '#070E1C',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
              }}
            >
              {/* Prev Button */}
              <button
                type="button"
                onClick={goPrev}
                aria-label="Previous Certificate"
                style={{
                  position: 'absolute',
                  left: '1.25rem',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  zIndex: 5,
                  background: 'rgba(255, 255, 255, 0.18)',
                  color: '#FFFFFF',
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                  borderRadius: '50%',
                  width: '46px',
                  height: '46px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  backdropFilter: 'blur(10px)',
                  transition: 'all 0.2s ease',
                }}
              >
                {CHEVRON_LEFT}
              </button>

              {/* Next Button */}
              <button
                type="button"
                onClick={goNext}
                aria-label="Next Certificate"
                style={{
                  position: 'absolute',
                  right: '1.25rem',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  zIndex: 5,
                  background: 'rgba(255, 255, 255, 0.18)',
                  color: '#FFFFFF',
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                  borderRadius: '50%',
                  width: '46px',
                  height: '46px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  backdropFilter: 'blur(10px)',
                  transition: 'all 0.2s ease',
                }}
              >
                {CHEVRON_RIGHT}
              </button>

              {open.asset ? (
                <Image
                  src={open.asset}
                  alt={`${open.code} - ${open.name} official certificate document`}
                  fill
                  priority
                  sizes="90vw"
                  style={{ objectFit: 'contain', padding: '1.5rem' }}
                />
              ) : null}
            </div>

            {/* Document Details Footer */}
            <div
              className="sp-lightbox__caption"
              style={{
                padding: '1.5rem 2rem',
                borderTop: '1px solid var(--border-light, #E2E8F0)',
                background: '#FFFFFF',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.4rem' }}>
                <span className="sp-cat" style={{ margin: 0 }}>{open.code}</span>
                {open.certNumber && (
                  <span style={{ fontSize: '0.8125rem', fontWeight: 700, color: 'var(--burg-primary, #0A4BB8)' }}>
                    {open.certNumber}
                  </span>
                )}
              </div>
              <h3 className="sp-cert__title" style={{ fontSize: '1.25rem', fontWeight: 800, margin: '0 0 0.45rem', color: 'var(--ink, #0F172A)' }}>
                {open.name}
              </h3>
              <p className="sp-small" style={{ margin: 0, color: 'var(--muted, #64748B)', fontSize: '0.875rem', lineHeight: 1.6 }}>
                {open.what}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  )
}


