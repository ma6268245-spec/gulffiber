'use client'

import Image from 'next/image'
import { useEffect, useRef, useState, useSyncExternalStore } from 'react'
import { createPortal } from 'react-dom'
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
  const mounted = useSyncExternalStore(() => () => { }, () => true, () => false)
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
      {/* ── INTERACTIVE INSTRUCTION BADGE (Positioned Cleanly Above Wall Box) ── */}
      <div
        className="cert-instruction-badge-container"
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: '0.85rem',
          zIndex: 30,
          pointerEvents: 'none',
          width: '100%',
        }}
      >
        <div
          className="cert-instruction-badge"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.45rem',
            background: 'rgba(255, 255, 255, 0.96)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            padding: '0.35rem 1.1rem',
            borderRadius: '9999px',
            boxShadow: '0 4px 16px rgba(7, 20, 46, 0.08), 0 1px 3px rgba(0, 0, 0, 0.04)',
            border: '1px solid rgba(10, 75, 184, 0.15)',
            whiteSpace: 'nowrap',
          }}
        >
          <span style={{ fontSize: '0.78rem' }}>🔍</span>
          <span className="cert-badge-desktop">
            Hover over frames to zoom in · Click to examine certificate
          </span>
          <span className="cert-badge-mobile">
            Tap any certificate to verify
          </span>
        </div>
      </div>

      {/* ── WALL OUTER WRAPPER ── */}
      <div
        className="cert-wall-wrapper"
        style={{
          position: 'relative',
          width: '100%',
          margin: '0 auto',
          overflow: 'hidden',
          boxShadow: '0 20px 50px rgba(10, 75, 184, 0.08), 0 4px 16px rgba(0, 0, 0, 0.06)',
          border: '1px solid var(--border-light)',
        }}
      >
        <div
          className="executive-office-wall-fullbleed"
          style={{
            position: 'relative',
            width: '100%',
            aspectRatio: '16 / 9',
            backgroundImage: 'url("/images/office-certificate-wall.jpg")',
            backgroundPosition: 'center center',
            backgroundSize: '100% 100%',
            backgroundRepeat: 'no-repeat',
            transition: 'transform 0.4s ease',
          }}
        >
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
                <button
                  type="button"
                  onClick={() => {
                    prevIdx.current = i
                    setOpenIdx(i)
                  }}
                  onTouchEnd={(e) => {
                    e.preventDefault()
                    prevIdx.current = i
                    setOpenIdx(i)
                  }}
                  onMouseEnter={() => setHoveredIdx(i)}
                  onMouseLeave={() => setHoveredIdx(null)}
                  ref={(el) => {
                    cardRefs.current[i] = el
                  }}
                  aria-label={`Inspect ${c.name} (${c.code})`}
                  className="cert-wall-frame-btn"
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
                    touchAction: 'manipulation',
                    transform: isHovered ? 'scale(1.4) translateY(-10px)' : 'scale(1)',
                    transformOrigin: 'center center',
                    transition: 'transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.35s ease',
                    boxShadow: isHovered ? '0 32px 64px rgba(0, 0, 0, 0.5), 0 12px 24px rgba(0,0,0,0.3)' : 'none',
                  }}
                >
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

                <div
                  className="cert-wall-tooltip"
                  style={{
                    position: 'absolute',
                    top: i >= 3 ? 'auto' : 'calc(100% + 12px)',
                    bottom: i >= 3 ? 'calc(100% + 12px)' : 'auto',
                    left: '50%',
                    transform: isHovered
                      ? 'translateX(-50%) translateY(0)'
                      : 'translateX(-50%) translateY(6px)',
                    opacity: isHovered ? 1 : 0,
                    pointerEvents: isHovered ? 'auto' : 'none',
                    zIndex: 120,
                    width: '230px',
                    background: 'rgba(255, 255, 255, 0.98)',
                    backdropFilter: 'blur(12px)',
                    borderRadius: '10px',
                    padding: '0.6rem 0.75rem',
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
      </div>

      {mounted && open && typeof document !== 'undefined'
        ? createPortal(
          <div
            onClick={() => setOpenIdx(null)}
            role="dialog"
            aria-modal="true"
            aria-label={`${open.name} High Resolution Certificate Verification`}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 999999,
              background: 'rgba(4, 15, 38, 0.94)',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: 'clamp(0.6rem, 2vh, 1.25rem) clamp(0.6rem, 3vw, 1.5rem)',
              animation: 'fadeIn 0.2s ease forwards',
            }}
          >
            {/* Top Bar with Document Indicator and Easy Close Button */}
            <div
              onClick={(e) => e.stopPropagation()}
              style={{
                width: '100%',
                maxWidth: 'min(94vw, 840px)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                zIndex: 100,
                marginBottom: '0.4rem',
              }}
            >
              <div
                style={{
                  background: 'rgba(15, 23, 42, 0.85)',
                  color: '#FFFFFF',
                  fontSize: '0.72rem',
                  fontWeight: 800,
                  padding: '0.3rem 0.85rem',
                  borderRadius: '9999px',
                  backdropFilter: 'blur(12px)',
                  WebkitBackdropFilter: 'blur(12px)',
                  border: '1px solid rgba(255, 255, 255, 0.25)',
                }}
              >
                <span style={{ color: '#60A5FA' }}>{open.code}</span> · {openIdx! + 1}/6
              </div>

              <button
                type="button"
                onClick={() => setOpenIdx(null)}
                onTouchEnd={(e) => {
                  e.preventDefault()
                  setOpenIdx(null)
                }}
                aria-label="Close certificate"
                style={{
                  background: 'rgba(255, 255, 255, 0.95)',
                  color: '#0F172A',
                  border: 'none',
                  borderRadius: '50%',
                  width: '40px',
                  height: '40px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.25rem',
                  fontWeight: 900,
                  cursor: 'pointer',
                  boxShadow: '0 4px 16px rgba(0, 0, 0, 0.4)',
                }}
              >
                ✕
              </button>
            </div>

            {/* Left/Right Navigation Arrows */}
            <button
              type="button"
              onClick={goPrev}
              aria-label="Previous Certificate"
              style={{
                position: 'fixed',
                left: 'clamp(0.4rem, 1.5vw, 1.5rem)',
                top: '50%',
                transform: 'translateY(-50%)',
                zIndex: 60,
                background: 'rgba(15, 23, 42, 0.75)',
                color: '#FFFFFF',
                border: '1px solid rgba(255, 255, 255, 0.25)',
                borderRadius: '50%',
                width: '42px',
                height: '42px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                boxShadow: '0 6px 20px rgba(0, 0, 0, 0.35)',
                transition: 'all 0.2s ease',
              }}
            >
              {CHEVRON_LEFT}
            </button>

            <button
              type="button"
              onClick={goNext}
              aria-label="Next Certificate"
              style={{
                position: 'fixed',
                right: 'clamp(0.4rem, 1.5vw, 1.5rem)',
                top: '50%',
                transform: 'translateY(-50%)',
                zIndex: 60,
                background: 'rgba(15, 23, 42, 0.75)',
                color: '#FFFFFF',
                border: '1px solid rgba(255, 255, 255, 0.25)',
                borderRadius: '50%',
                width: '42px',
                height: '42px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                boxShadow: '0 6px 20px rgba(0, 0, 0, 0.35)',
                transition: 'all 0.2s ease',
              }}
            >
              {CHEVRON_RIGHT}
            </button>

            {/* ── HIGH-RESOLUTION CERTIFICATE DOCUMENT DISPLAY ── */}
            <div
              style={{
                position: 'relative',
                flex: '1 1 auto',
                width: '100%',
                maxWidth: 'min(94vw, 840px)',
                maxHeight: 'calc(100dvh - 160px)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 10,
                filter: 'drop-shadow(0 20px 50px rgba(0, 0, 0, 0.65))',
                cursor: 'pointer',
              }}
            >
              {open.asset ? (
                <Image
                  src={open.asset}
                  alt={`${open.code} - ${open.name} official certificate document`}
                  fill
                  priority
                  sizes="(max-width: 1200px) 94vw, 840px"
                  style={{
                    objectFit: 'contain',
                    borderRadius: '6px',
                  }}
                />
              ) : null}
            </div>

            {/* ── FULL DETAILS & REF NUMBER BOTTOM CARD (Always visible across all devices) ── */}
            <div
              onClick={(e) => e.stopPropagation()}
              style={{
                position: 'relative',
                zIndex: 50,
                width: '100%',
                maxWidth: 'min(94vw, 680px)',
                background: 'rgba(15, 23, 42, 0.94)',
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                borderRadius: '12px',
                padding: '0.6rem 0.85rem',
                boxShadow: '0 8px 30px rgba(0, 0, 0, 0.6)',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.3rem',
                marginTop: '0.4rem',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', minWidth: 0 }}>
                  <span
                    style={{
                      background: 'rgba(59, 130, 246, 0.3)',
                      color: '#93C5FD',
                      fontSize: '0.65rem',
                      fontWeight: 800,
                      padding: '0.15rem 0.45rem',
                      borderRadius: '4px',
                      letterSpacing: '0.04em',
                      textTransform: 'uppercase',
                      flexShrink: 0,
                    }}
                  >
                    {open.code}
                  </span>
                  <span
                    style={{
                      fontSize: '0.78rem',
                      fontWeight: 800,
                      color: '#FFFFFF',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {open.name}
                  </span>
                </div>
                <Provenance status="VERIFIED" />
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.35rem', fontSize: '0.7rem', color: '#CBD5E1' }}>
                <span>Issuer: <strong style={{ color: '#F1F5F9' }}>{open.issuer}</strong></span>
                {open.certNumber && (
                  <span style={{ background: 'rgba(255, 255, 255, 0.12)', padding: '0.15rem 0.45rem', borderRadius: '4px', border: '1px solid rgba(255, 255, 255, 0.15)', color: '#F8FAFC', fontWeight: 700 }}>
                    Ref: {open.certNumber}
                  </span>
                )}
              </div>
            </div>
          </div>,
          document.body
        )
        : null}

      <style>{`
        .cert-wall-wrapper {
          width: 100%;
          max-width: 100%;
          aspect-ratio: 16 / 9;
          border-radius: 20px;
        }
        .executive-office-wall-fullbleed {
          transform: scale(1.0) translateY(0);
          transform-origin: center center;
        }
        .cert-badge-desktop {
          display: inline !important;
          font-size: 0.75rem;
          font-weight: 800;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--burg-primary, #0A4BB8);
          font-family: var(--font-sans);
        }
        .cert-badge-mobile {
          display: none !important;
          font-size: 0.6875rem;
          font-weight: 800;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: var(--burg-primary, #0A4BB8);
          font-family: var(--font-sans);
        }
        .cert-wall-tooltip {
          width: 230px !important;
          padding: 0.6rem 0.75rem !important;
        }
        @media (max-width: 992px) {
          .cert-badge-desktop {
            display: none !important;
          }
          .cert-badge-mobile {
            display: inline !important;
          }
          .cert-instruction-badge-container {
            margin-bottom: 0.75rem !important;
          }
          .cert-instruction-badge {
            padding: 0.28rem 0.85rem !important;
          }
          .cert-wall-wrapper {
            margin-left: calc(-1 * var(--container-pad, 1.25rem)) !important;
            margin-right: calc(-1 * var(--container-pad, 1.25rem)) !important;
            width: calc(100% + 2 * var(--container-pad, 1.25rem)) !important;
            max-width: 100vw !important;
            aspect-ratio: 16 / 11 !important;
            border-radius: 0 !important;
            border-left: none !important;
            border-right: none !important;
          }
          .executive-office-wall-fullbleed {
            transform: scale(1.5) translateY(7%) !important;
            transform-origin: 50% 36% !important;
          }
          .cert-wall-tooltip {
            display: none !important;
          }
        }
        @media (max-width: 600px) {
          .cert-instruction-badge-container {
            margin-bottom: 0.65rem !important;
          }
          .cert-wall-wrapper {
            margin-left: calc(-1 * var(--container-pad, 1rem)) !important;
            margin-right: calc(-1 * var(--container-pad, 1rem)) !important;
            width: calc(100% + 2 * var(--container-pad, 1rem)) !important;
            max-width: 100vw !important;
            aspect-ratio: 1 / 1 !important;
            border-radius: 0 !important;
            border-left: none !important;
            border-right: none !important;
          }
          .executive-office-wall-fullbleed {
            transform: scale(2.05) translateY(10%) !important;
            transform-origin: 50% 36% !important;
          }
          .cert-instruction-badge {
            padding: 0.22rem 0.65rem !important;
          }
        }
      `}</style>
    </>
  )
}




