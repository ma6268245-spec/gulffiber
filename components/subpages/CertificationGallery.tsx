'use client'

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { Provenance } from '@/components/subpages/Primitives'
import { CERT_ASSETS, CERTIFICATION_DETAIL } from '@/lib/data/company'

/* ===========================================================================
   CERTIFICATION GALLERY (Company page - chapter 07 & Quality page)
   ---------------------------------------------------------------------------
   Each registration displays the authentic official high-resolution certificate
   document. Clicking any card opens a full-screen interactive lightbox for
   high-resolution document inspection.
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
  const [activeGrsPage, setActiveGrsPage] = useState<1 | 3>(1)
  const closeRef = useRef<HTMLButtonElement>(null)
  const cardRefs = useRef<(HTMLButtonElement | null)[]>([])
  const prevIdx = useRef<number>(0)

  const open = openIdx === null ? null : ENTRIES[openIdx]

  useEffect(() => {
    if (openIdx === null) return
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpenIdx(null)
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

  const getActiveAsset = (entry: CertEntry) => {
    if (entry.code === 'GRS') {
      return activeGrsPage === 1
        ? '/images/certificates/grs-scope-certificate-page1.jpg'
        : '/images/certificates/grs-scope-certificate-page3.jpg'
    }
    return entry.asset
  }

  return (
    <>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))',
          gap: '1.5rem',
        }}
      >
        {ENTRIES.map((c, i) => (
          <article
            className="sp-cert"
            key={c.code}
            style={{
              background: 'var(--card-bg)',
              border: '1px solid var(--border-light)',
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
                setActiveGrsPage(1)
              }}
              ref={(el) => {
                cardRefs.current[i] = el
              }}
              aria-label={`Inspect the ${c.code} certificate`}
              style={{
                position: 'relative',
                height: '280px',
                width: '100%',
                background: '#F8FAFC',
                border: 'none',
                borderBottom: '1px solid var(--border-light)',
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
                  alt={`${c.code} certification scan`}
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
                  <span style={{ fontSize: '0.6875rem', color: 'var(--muted)', fontWeight: 600 }}>
                    {c.certNumber.split(' ')[0]}
                  </span>
                )}
              </div>
              <h3 className="sp-cert__title" style={{ fontSize: '1.0625rem', fontWeight: 800, margin: '0 0 0.5rem', color: 'var(--ink)' }}>
                {c.name}
              </h3>
              <p className="sp-small" style={{ margin: '0 0 1.25rem', color: 'var(--muted)', fontSize: '0.8125rem', lineHeight: 1.5, flex: 1 }}>
                {c.scope}
              </p>
              <div className="sp-card-foot" style={{ marginTop: 'auto', borderTop: '1px solid var(--border-light)', paddingTop: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span className="sp-card-foot-key" style={{ fontSize: '0.6875rem', fontWeight: 700, color: 'var(--burg-primary)' }}>
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
            background: 'rgba(4, 15, 38, 0.88)',
            backdropFilter: 'blur(10px)',
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
              maxWidth: '860px',
              width: '100%',
              maxHeight: '92vh',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              boxShadow: '0 25px 60px rgba(0, 0, 0, 0.4)',
            }}
          >
            {/* Close Button */}
            <button
              ref={closeRef}
              type="button"
              className="sp-lightbox__close"
              onClick={() => setOpenIdx(null)}
              aria-label="Close the certificate view"
              style={{
                position: 'absolute',
                top: '1rem',
                right: '1rem',
                zIndex: 10,
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
              }}
            >
              {CLOSE}
            </button>

            {/* Document Viewer Container */}
            <div
              className="sp-lightbox__media"
              style={{
                position: 'relative',
                flex: '1 1 auto',
                minHeight: '440px',
                maxHeight: '62vh',
                background: '#F1F5F9',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
              }}
            >
              {open.asset ? (
                <Image
                  src={getActiveAsset(open)!}
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

              {/* GRS Multi-page switcher */}
              {open.code === 'GRS' && (
                <div
                  style={{
                    position: 'absolute',
                    bottom: '1rem',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    zIndex: 5,
                    display: 'flex',
                    gap: '0.5rem',
                    background: 'rgba(4, 15, 38, 0.85)',
                    padding: '0.35rem 0.6rem',
                    borderRadius: '9999px',
                    backdropFilter: 'blur(8px)',
                  }}
                >
                  <button
                    type="button"
                    onClick={() => setActiveGrsPage(1)}
                    style={{
                      border: 'none',
                      background: activeGrsPage === 1 ? 'var(--burg-primary)' : 'transparent',
                      color: '#FFFFFF',
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      padding: '0.25rem 0.75rem',
                      borderRadius: '9999px',
                      cursor: 'pointer',
                    }}
                  >
                    Page 1 (Scope)
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveGrsPage(3)}
                    style={{
                      border: 'none',
                      background: activeGrsPage === 3 ? 'var(--burg-primary)' : 'transparent',
                      color: '#FFFFFF',
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      padding: '0.25rem 0.75rem',
                      borderRadius: '9999px',
                      cursor: 'pointer',
                    }}
                  >
                    Page 3 (Site Appendix)
                  </button>
                </div>
              )}
            </div>

            {/* Document Details Footer */}
            <div
              className="sp-lightbox__caption"
              style={{
                padding: '1.25rem 1.75rem',
                borderTop: '1px solid var(--border-light)',
                background: '#FFFFFF',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.35rem' }}>
                <span className="sp-cat" style={{ margin: 0 }}>{open.code}</span>
                {open.certNumber && (
                  <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--burg-primary)' }}>
                    {open.certNumber}
                  </span>
                )}
              </div>
              <h3 className="sp-cert__title" style={{ fontSize: '1.15rem', fontWeight: 800, margin: '0 0 0.4rem', color: 'var(--ink)' }}>
                {open.name}
              </h3>
              <p className="sp-small" style={{ margin: 0, color: 'var(--muted)', fontSize: '0.875rem', lineHeight: 1.5 }}>
                {open.what}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
