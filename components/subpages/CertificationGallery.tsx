'use client'

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { Provenance } from '@/components/subpages/Primitives'
import { CERT_ASSETS, CERTIFICATION_DETAIL } from '@/lib/data/company'

/* ===========================================================================
   CERTIFICATION GALLERY (Company page - chapter 07)
   ---------------------------------------------------------------------------
   Each registration gets a certificate card: the real scan where one exists
   (today only the ISO 9001 seal), otherwise a clearly labelled frame awaiting
   the scan. Cards open a lightbox for closer inspection - a certificate this
   small is decorative, a certificate you can read is evidence.

   The architecture is the point: drop the scan into CERT_ASSETS
   (lib/data/company.ts) and the card and lightbox pick it up unchanged.
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
  scope: string
  asset: string | null
  kind: 'ACCREDITED_CERTIFICATION' | 'TRADE_ASSOCIATION'
}

const ENTRIES: CertEntry[] = CERTIFICATION_DETAIL.map((c) => ({
  code: c.code,
  name: c.name,
  scope: c.scope,
  asset: CERT_ASSETS[c.code] ?? null,
  kind: c.kind,
}))

export function CertificationGallery() {
  const [openIdx, setOpenIdx] = useState<number | null>(null)
  const closeRef = useRef<HTMLButtonElement>(null)
  const cardRefs = useRef<(HTMLButtonElement | null)[]>([])

  const open = openIdx === null ? null : ENTRIES[openIdx]

  /* Lightbox behaviour: Escape closes, focus moves to the close button on
     open and back to the originating card on close; body scroll is locked. */
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

  const prevIdx = useRef<number>(0)

  return (
    <>
      <div className="sp-grid-2">
        {ENTRIES.map((c, i) => (
          <article className="sp-cert" key={c.code}>
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
              aria-label={
                c.asset
                  ? `Inspect the ${c.code} certificate`
                  : `${c.code} - certificate scan not yet supplied`
              }
            >
              {c.asset ? (
                <Image
                  src={c.asset}
                  alt={`${c.code} certification seal`}
                  fill
                  sizes="(max-width: 992px) 100vw, 46vw"
                  style={{ objectFit: 'contain', padding: '1.5rem' }}
                />
              ) : (
                <span className="sp-cert__placeholder">
                  {CERT_GLYPH}
                  <span>{c.code} scan to be supplied</span>
                </span>
              )}
              {c.asset && (
                <span className="sp-cert__zoom" aria-hidden="true">
                  {MAGNIFIER}
                  Inspect
                </span>
              )}
            </button>

            <div className="sp-cert__body">
              <span className="sp-cat">{c.code}</span>
              <h3 className="sp-cert__title">{c.name}</h3>
              <p className="sp-small">{c.scope}</p>
              <div className="sp-card-foot">
                <span className="sp-card-foot-key">
                  {c.kind === 'ACCREDITED_CERTIFICATION' ? 'Accredited certification' : 'Trade association'}
                </span>
                <Provenance status="VERIFIED" />
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* ── Lightbox ──────────────────────────────────────────────────── */}
      {open && (
        <div
          className="sp-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={`${open.code} certificate`}
          onClick={() => setOpenIdx(null)}
        >
          <div className="sp-lightbox__panel" onClick={(e) => e.stopPropagation()}>
            <button
              ref={closeRef}
              type="button"
              className="sp-lightbox__close"
              onClick={() => setOpenIdx(null)}
              aria-label="Close the certificate view"
            >
              {CLOSE}
            </button>

            <div className="sp-lightbox__media">
              {open.asset ? (
                <Image
                  src={open.asset}
                  alt={`${open.code} - ${open.name} certificate`}
                  fill
                  sizes="90vw"
                  style={{ objectFit: 'contain' }}
                />
              ) : (
                <span className="sp-cert__placeholder">
                  {CERT_GLYPH}
                  <span>{open.code} - certificate scan to be supplied</span>
                </span>
              )}
            </div>

            <div className="sp-lightbox__caption">
              <span className="sp-cat">{open.code}</span>
              <h3 className="sp-cert__title">{open.name}</h3>
              <p className="sp-small">
                {open.scope}. Certificate number, issuing body and validity dates are supplied against
                request through the contact desk.
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
