'use client'

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { Provenance } from '@/components/subpages/Primitives'
import { CERT_ASSETS, CERTIFICATION_DETAIL } from '@/lib/data/company'

/* ===========================================================================
   CERTIFICATION GALLERY (Company page - chapter 07 & Quality page)
   ---------------------------------------------------------------------------
   Renders all 6 authentic official certificate documents in a balanced 3x2
   responsive grid. Clicking any card opens a full-screen interactive lightbox
   with Prev / Next navigation and keyboard controls.
   =========================================================================== */

const CERT_GLYPH = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" aria-hidden="true">
    <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" />
    <path d="M14 3v5h5" />
    <path d="M9 13h6M9 17h4" />
  </svg>
)

const MAGNIFIER = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
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
}

const ENTRIES: CertEntry[] = CERTIFICATION_DETAIL.map((c) => ({
  code: c.code,
  name: c.name,
  certNumber: c.certNumber,
  scope: c.scope,
  what: c.what,
  asset: CERT_ASSETS[c.code] ?? null,
  kind: c.kind,
}))

export function CertificationGallery() {
  const [openIdx, setOpenIdx] = useState<number | null>(null)
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
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '1.75rem',
        }}
      >
        {ENTRIES.map((c, i) => (
          <article
            className="sp-cert"
            key={c.code}
            style={{
              background: 'var(--card-bg, #FFFFFF)',
              border: '1px solid var(--border-light, #E2E8F0)',
              borderRadius: '20px',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              boxShadow: '0 8px 24px rgba(10, 75, 184, 0.04)',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease',
            }}
          >
            <button
              type="button"
              className="sp-cert__media"
              onClick={() => {
                prevIdx.current = i
                setOpenIdx(i)
              }}
              ref={(el) => {
                cardRefs.current[i] = el
              }}
              aria-label={`Inspect ${c.name} (${c.code})`}
              style={{
                position: 'relative',
                height: '290px',
                width: '100%',
                background: '#F8FAFC',
                border: 'none',
                borderBottom: '1px solid var(--border-light, #E2E8F0)',
                cursor: 'pointer',
                overflow: 'hidden',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {c.asset ? (
                <Image
                  src={c.asset}
                  alt={`${c.code} - ${c.name} document scan`}
                  fill
                  sizes="(max-width: 992px) 100vw, 33vw"
                  style={{ objectFit: 'contain', padding: '1rem' }}
                />
              ) : (
                <span className="sp-cert__placeholder">
                  {CERT_GLYPH}
                  <span>{c.code} scan</span>
                </span>
              )}
              <span className="sp-cert__zoom" aria-hidden="true">
                {MAGNIFIER}
                Inspect Document
              </span>
            </button>

            <div className="sp-cert__body" style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <span className="sp-cat" style={{ margin: 0 }}>{c.code}</span>
                {c.certNumber && (
                  <span style={{ fontSize: '0.6875rem', color: 'var(--muted, #64748B)', fontWeight: 600 }}>
                    {c.certNumber.split(' ')[0]}
                  </span>
                )}
              </div>
              <h3 className="sp-cert__title" style={{ fontSize: '1.0625rem', fontWeight: 800, margin: '0 0 0.5rem', color: 'var(--ink, #0F172A)' }}>
                {c.name}
              </h3>
              <p className="sp-small" style={{ margin: '0 0 1.25rem', color: 'var(--muted, #64748B)', fontSize: '0.8125rem', lineHeight: 1.5, flex: 1 }}>
                {c.scope}
              </p>
              <div className="sp-card-foot" style={{ marginTop: 'auto', borderTop: '1px solid var(--border-light, #E2E8F0)', paddingTop: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span className="sp-card-foot-key" style={{ fontSize: '0.6875rem', fontWeight: 700, color: 'var(--burg-primary, #0A4BB8)' }}>
                  {c.kind === 'ACCREDITED_CERTIFICATION' ? 'Official License' : 'Trade Body Member'}
                </span>
                <Provenance status="VERIFIED" />
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* ── Lightbox Modal ──────────────────────────────────────────────────── */}
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
            background: 'rgba(4, 15, 38, 0.92)',
            backdropFilter: 'blur(12px)',
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
              maxWidth: '880px',
              width: '100%',
              maxHeight: '92vh',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              boxShadow: '0 30px 70px rgba(0, 0, 0, 0.5)',
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
                  background: 'rgba(4, 15, 38, 0.75)',
                  color: '#FFFFFF',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  padding: '0.35rem 0.85rem',
                  borderRadius: '9999px',
                  backdropFilter: 'blur(8px)',
                  pointerEvents: 'auto',
                }}
              >
                Document {openIdx! + 1} of {ENTRIES.length}
              </span>

              <button
                ref={closeRef}
                type="button"
                className="sp-lightbox__close"
                onClick={() => setOpenIdx(null)}
                aria-label="Close document view"
                style={{
                  background: 'rgba(4, 15, 38, 0.75)',
                  color: '#FFFFFF',
                  border: 'none',
                  borderRadius: '50%',
                  width: '38px',
                  height: '38px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  pointerEvents: 'auto',
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
                minHeight: '460px',
                maxHeight: '64vh',
                background: '#0B1528',
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
                  left: '1rem',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  zIndex: 5,
                  background: 'rgba(255, 255, 255, 0.2)',
                  color: '#FFFFFF',
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                  borderRadius: '50%',
                  width: '44px',
                  height: '44px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  backdropFilter: 'blur(8px)',
                  transition: 'background 0.2s ease, transform 0.2s ease',
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
                  right: '1rem',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  zIndex: 5,
                  background: 'rgba(255, 255, 255, 0.2)',
                  color: '#FFFFFF',
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                  borderRadius: '50%',
                  width: '44px',
                  height: '44px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  backdropFilter: 'blur(8px)',
                  transition: 'background 0.2s ease, transform 0.2s ease',
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
                  style={{ objectFit: 'contain', padding: '1rem' }}
                />
              ) : (
                <span className="sp-cert__placeholder">
                  {CERT_GLYPH}
                  <span>{open.code} scan</span>
                </span>
              )}
            </div>

            {/* Document Details Footer */}
            <div
              className="sp-lightbox__caption"
              style={{
                padding: '1.25rem 1.75rem',
                borderTop: '1px solid var(--border-light, #E2E8F0)',
                background: '#FFFFFF',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.35rem' }}>
                <span className="sp-cat" style={{ margin: 0 }}>{open.code}</span>
                {open.certNumber && (
                  <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--burg-primary, #0A4BB8)' }}>
                    {open.certNumber}
                  </span>
                )}
              </div>
              <h3 className="sp-cert__title" style={{ fontSize: '1.15rem', fontWeight: 800, margin: '0 0 0.4rem', color: 'var(--ink, #0F172A)' }}>
                {open.name}
              </h3>
              <p className="sp-small" style={{ margin: 0, color: 'var(--muted, #64748B)', fontSize: '0.875rem', lineHeight: 1.5 }}>
                {open.what}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

