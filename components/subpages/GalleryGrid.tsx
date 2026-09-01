'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { ACTIVE_CATEGORIES, GALLERY_ITEMS, type GalleryCategoryId } from '@/lib/data/gallery'
import { Provenance } from '@/components/subpages/Primitives'

/* ===========================================================================
   GALLERY GRID (/gallery)
   ---------------------------------------------------------------------------
   The visual archive: category filtering, an editorial masonry grid, and a
   lightbox with full keyboard navigation (Escape closes, arrows move, Tab
   cycles the metadata link). Real photographs render; items whose asset is
   not yet in the repository render as labelled placeholder frames - never
   stock imagery or generated "events".

   The filter is URL-free and stateful only: the whole archive is small and
   client-side, so filtering is instant with no route changes.
   =========================================================================== */

const PHOTO_GLYPH = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" aria-hidden="true">
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <circle cx="9" cy="10" r="1.6" />
    <path d="m5 17 4.5-4.5 3 3L16 12l3 3" />
  </svg>
)

const ARROW_L = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
    <path d="M19 12H5M12 19l-7-7 7-7" />
  </svg>
)

const ARROW_R = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
)

const CLOSE = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
    <path d="M18 6L6 18M6 6l12 12" />
  </svg>
)

const TAG_GLYPH = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <path d="M12 5v14M5 12h14" />
  </svg>
)

const categoryLabel = (id: GalleryCategoryId) =>
  ACTIVE_CATEGORIES.find((c) => c.id === id)?.label ?? id

export function GalleryGrid() {
  const [filter, setFilter] = useState<GalleryCategoryId | 'all'>('all')
  const [openIdx, setOpenIdx] = useState<number | null>(null)
  const [mounted, setMounted] = useState(false)
  const closeRef = useRef<HTMLButtonElement>(null)
  const tileRefs = useRef<(HTMLButtonElement | null)[]>([])

  useEffect(() => {
    setMounted(true)
  }, [])

  const items = filter === 'all' ? GALLERY_ITEMS : GALLERY_ITEMS.filter((i) => i.category === filter)
  const open = openIdx === null ? null : items[openIdx]

  const step = (dir: 1 | -1) => {
    setOpenIdx((prev) => {
      if (prev === null) return prev
      return (prev + dir + items.length) % items.length
    })
  }

  /* Keyboard: Escape closes, arrows navigate. Focus lands on Close on open
     and returns to the originating tile on close. */
  useEffect(() => {
    if (openIdx === null) return
    closeRef.current?.focus()
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpenIdx(null)
      if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
        const dir = e.key === 'ArrowRight' ? 1 : -1
        setOpenIdx((prev) => (prev === null ? prev : (prev + dir + items.length) % items.length))
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [openIdx, items.length])

  const prevTile = useRef(-1)
  useEffect(() => {
    if (openIdx === null && prevTile.current >= 0) {
      tileRefs.current[prevTile.current]?.focus()
    }
  }, [openIdx])

  return (
    <>
      {/* ── Category filter ───────────────────────────────────────────── */}
      <div className="sp-gfilter" role="group" aria-label="Filter the archive by category">
        {ACTIVE_CATEGORIES.map((c) => (
          <button
            key={c.id}
            type="button"
            className="sp-gfilter__chip"
            data-on={filter === c.id ? 'true' : undefined}
            aria-pressed={filter === c.id}
            onClick={() => {
              setFilter(c.id)
              setOpenIdx(null)
            }}
          >
            {c.label}
            <span className="sp-gfilter__count" aria-hidden="true">
              {c.id === 'all' ? GALLERY_ITEMS.length : GALLERY_ITEMS.filter((i) => i.category === c.id).length}
            </span>
          </button>
        ))}
      </div>

      {/* ── Masonry grid ──────────────────────────────────────────────── */}
      <ul className="sp-ggrid">
        {items.map((item, i) => (
          <li key={item.id}>
            <button
              type="button"
              className="sp-gtile"
              ref={(el) => {
                tileRefs.current[i] = el
              }}
              onClick={() => {
                prevTile.current = i
                setOpenIdx(i)
              }}
              aria-label={`Open ${item.title} - ${categoryLabel(item.category)}`}
            >
              <span className="sp-gtile__media">
                {item.image ? (
                  <Image
                    src={item.image}
                    alt={item.alt}
                    fill
                    sizes="(max-width: 600px) 100vw, (max-width: 992px) 50vw, 33vw"
                    style={{ objectFit: 'cover' }}
                  />
                ) : (
                  <span className="sp-gtile__placeholder">
                    {PHOTO_GLYPH}
                    <span>Photograph to be supplied</span>
                  </span>
                )}
                <span className="sp-gtile__scrim" aria-hidden="true" />
                <span className="sp-gtile__body">
                  <span className="sp-gtile__cat">{categoryLabel(item.category)}</span>
                  <span className="sp-gtile__title">{item.title}</span>
                </span>
              </span>
            </button>
          </li>
        ))}
      </ul>

      {/* ── Lightbox Portal ─────────────────────────────────────────── */}
      {open && mounted && typeof document !== 'undefined'
        ? createPortal(
          <div
            className="sp-lightbox"
            role="dialog"
            aria-modal="true"
            aria-label={`${open.title} - ${categoryLabel(open.category)}`}
            onClick={() => setOpenIdx(null)}
            data-lenis-prevent="true"
            onWheel={(e) => e.stopPropagation()}
            onTouchMove={(e) => e.stopPropagation()}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 999999,
              display: 'grid',
              placeItems: 'center',
              padding: 'clamp(0.75rem, 3vw, 2.5rem)',
              background: 'rgba(4, 15, 38, 0.92)',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
              animation: 'sp-lightbox-in 0.25s ease',
            }}
          >
            <div className="sp-lightbox__panel sp-glightbox" onClick={(e) => e.stopPropagation()}>
              <button
                ref={closeRef}
                type="button"
                className="sp-lightbox__close"
                onClick={() => setOpenIdx(null)}
                aria-label="Close the image view"
              >
                {CLOSE}
              </button>

              <button
                type="button"
                className="sp-glightbox__nav sp-glightbox__nav--prev"
                onClick={() => step(-1)}
                aria-label="Previous image"
              >
                {ARROW_L}
              </button>
              <button
                type="button"
                className="sp-glightbox__nav sp-glightbox__nav--next"
                onClick={() => step(1)}
                aria-label="Next image"
              >
                {ARROW_R}
              </button>

              <div className="sp-lightbox__media sp-glightbox__media">
                {open.image ? (
                  <Image
                    src={open.image}
                    alt={open.alt}
                    fill
                    sizes="90vw"
                    style={{ objectFit: 'contain' }}
                    priority
                  />
                ) : (
                  <span className="sp-gtile__placeholder">
                    {PHOTO_GLYPH}
                    <span>{open.title} - photograph to be supplied</span>
                  </span>
                )}
              </div>

              <div className="sp-lightbox__caption">
                <span className="sp-cat">
                  {categoryLabel(open.category)}
                  {open.year ? ` - ${open.year}` : ''}
                </span>
                <h3 className="sp-cert__title">{open.title}</h3>
                <p className="sp-small">{open.description}</p>
                {open.tags.length > 0 && (
                  <p className="sp-small" style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginTop: '0.25rem' }}>
                    {open.tags.map((t) => (
                      <span className="sp-pill" key={t}>
                        {t}
                      </span>
                    ))}
                  </p>
                )}
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap', marginTop: '0.5rem' }}>
                  <Provenance status={open.status} />
                  {open.relatedPage && (
                    <Link className="btn-ghost" href={open.relatedPage} onClick={() => setOpenIdx(null)}>
                      {open.relatedProduct ? 'See the product line' : 'See the related page'}
                      {ARROW_R}
                    </Link>
                  )}
                </div>
                <p className="sp-small" style={{ opacity: 0.7 }}>
                  {String((openIdx ?? 0) + 1).padStart(2, '0')} / {String(items.length).padStart(2, '0')} - arrow keys to
                  browse, Escape to close
                  {TAG_GLYPH}
                </p>
              </div>
            </div>
          </div>,
          document.body
        )
        : null}
    </>
  )
}
