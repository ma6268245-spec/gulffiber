'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

import { GALLERY_CATEGORIES, GALLERY_ITEMS } from '@/lib/data/gallery'

/* Every entry below is grounded in lib/data/company.ts (and gallery.ts) -
   no invented deniers, capacities, destinations or claims. */
const SEARCH_DATABASE = [
  { title: 'Recycled Polyester Staple Fibre', category: 'Product', href: '/products#psf-regenerated', tag: 'GRS', desc: '100% post-consumer PET regenerated into staple fibre under GRS chain of custody.' },
  { title: 'Regenerated Polyester Hollow Fibre', category: 'Product', href: '/products#psf-virgin', tag: 'HCS', desc: 'Siliconized and non-siliconized conjugate hollow fibre for bedding, upholstery and thermal insulation.' },
  { title: 'High-Loft Wadding', category: 'Product', href: '/products#wadding', tag: 'Bonded', desc: 'High-loft, thermally bonded wadding for bedding, furniture and insulation.' },
  { title: 'Needle-Punched Felt', category: 'Product', href: '/products#felt', tag: 'Nonwoven', desc: 'Needle-punched technical felts for automotive, acoustic and industrial uses.' },
  { title: 'Interlining Materials', category: 'Product', href: '/products#interlining', tag: 'Woven', desc: 'Woven and non-woven interlining goods for garment tailoring.' },
  { title: 'The Service Journey', category: 'Service', href: '/services', tag: '7 Steps', desc: 'How an enquiry moves from requirement to delivered consignment, step by step.' },
  { title: 'The Production Sequence', category: 'Service', href: '/services', tag: 'Process', desc: 'The published manufacturing sequence, from feedstock to cut and baled material.' },
  { title: 'ISO 9001:2015 Quality Management', category: 'Quality', href: '/quality', tag: 'Certified', desc: 'The certified quality management system governing specifications and verification.' },
  { title: 'GRS - Global Recycled Standard', category: 'Quality', href: '/quality', tag: 'Recycled', desc: 'Scope certificate and chain of custody for recycled material.' },
  { title: 'The Circular Material Journey', category: 'Sustainability', href: '/sustainability', tag: 'Lifecycle', desc: 'The recycled route from post-consumer PET back to fibre - verified facts only.' },
  { title: 'Company Story & Timeline', category: 'Company', href: '/company', tag: 'Since 1999', desc: 'The company history, timeline and leadership - with slots where the record is outstanding.' },
  { title: 'The Visual Archive', category: 'Gallery', href: '/gallery', tag: 'Archive', desc: 'Factory, machinery, manufacturing, products, and sustainability.' },
  { title: 'Terms & Conditions & Copyright Notice', category: 'Legal', href: '/terms', tag: 'Governance', desc: 'Commercial supply terms, specification tolerances, shipping, warranties, and copyright ownership.' },
  { title: 'Samples, Quotations & Documentation', category: 'Contact', href: '/contact', tag: 'Enquiry', desc: 'Choose an intent and the enquiry reaches the desk that answers it.' },
  /* Archive entries: search reaches straight into the gallery data, so a
     photograph the client adds becomes discoverable with no extra work. */
  ...GALLERY_ITEMS.map((item) => ({
    title: item.title,
    category: 'Gallery',
    href: '/gallery',
    tag: GALLERY_CATEGORIES.find((c) => c.id === item.category)?.label ?? 'Archive',
    desc: item.description,
  })),
]

export function SearchModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [query, setQuery] = useState('')

  // Keyboard shortcut listener (Ctrl+K or Cmd+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault()
        if (isOpen) onClose()
        else {
          const btn = document.querySelector('[data-search-btn]') as HTMLButtonElement
          if (btn) btn.click()
        }
      }
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  if (!isOpen) return null

  const filtered = SEARCH_DATABASE.filter(
    (item) =>
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      item.desc.toLowerCase().includes(query.toLowerCase()) ||
      item.category.toLowerCase().includes(query.toLowerCase()) ||
      item.tag.toLowerCase().includes(query.toLowerCase())
  )

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 10000,
        background: 'rgba(4, 15, 38, 0.65)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        paddingTop: 'clamp(4rem, 12vh, 8rem)',
        paddingInline: '1rem',
        animation: 'searchModalFadeIn 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
      }}
      onClick={onClose}
    >
      {/* Modal Dialog Card */}
      <div
        className="search-modal-card"
        style={{
          width: '100%',
          maxWidth: '640px',
          background: 'var(--glass-card-bg)',
          backdropFilter: 'blur(32px) saturate(180%)',
          WebkitBackdropFilter: 'blur(32px) saturate(180%)',
          border: '1px solid var(--glass-card-border)',
          borderRadius: '24px',
          boxShadow: '0 28px 70px rgba(7, 20, 46, 0.35)',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            padding: 'clamp(0.85rem, 2vh, 1.25rem) clamp(1rem, 3vw, 1.5rem)',
            borderBottom: '1px solid var(--border-light)',
          }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--burg-primary)" strokeWidth="2.5">
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
          </svg>
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search fibres, deniers (1.4D, 7D), GRS certification, specs..."
            style={{
              flex: 1,
              minWidth: 0,
              border: 'none',
              background: 'transparent',
              fontSize: 'clamp(0.875rem, 2vw, 1rem)',
              fontFamily: 'var(--font-sans)',
              color: 'var(--ink)',
              outline: 'none',
              fontWeight: 600,
            }}
          />
          <kbd
            style={{
              fontSize: '0.6875rem',
              fontWeight: 800,
              padding: '0.2rem 0.5rem',
              borderRadius: '6px',
              background: 'rgba(10, 75, 184, 0.1)',
              color: 'var(--burg-primary)',
              border: '1px solid var(--border-light)',
              flexShrink: 0,
            }}
          >
            ESC
          </kbd>
        </div>

        {/* Results List */}
        <div style={{ maxHeight: 'clamp(240px, 55vh, 420px)', overflowY: 'auto', padding: '0.75rem' }}>
          {filtered.length === 0 ? (
            <div style={{ padding: '2.5rem', textAlign: 'center', color: 'var(--muted)' }}>
              <p style={{ fontWeight: 600, margin: 0 }}>No matching technical specifications found.</p>
              <p style={{ fontSize: '0.8125rem', marginTop: '0.35rem' }}>Try searching &ldquo;1.4D&rdquo;, &ldquo;Conjugate&rdquo;, &ldquo;GRS&rdquo;, or &ldquo;Felt&rdquo;.</p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
              {filtered.map((item, i) => (
                <Link
                  key={i}
                  href={item.href}
                  onClick={onClose}
                  className="search-item-row"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0.85rem 1rem',
                    borderRadius: '14px',
                    textDecoration: 'none',
                    transition: 'all 0.18s ease',
                  }}
                >
                  <div style={{ paddingRight: '1rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.2rem' }}>
                      <span style={{ fontSize: '0.5625rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', padding: '0.15rem 0.45rem', borderRadius: '9999px', background: 'rgba(10, 75, 184, 0.1)', color: 'var(--burg-primary)' }}>
                        {item.category}
                      </span>
                      <strong style={{ fontSize: '0.875rem', color: 'var(--ink)' }}>{item.title}</strong>
                    </div>
                    <p style={{ fontSize: '0.75rem', color: 'var(--muted)', margin: 0, lineHeight: 1.4 }}>{item.desc}</p>
                  </div>
                  <span style={{ fontSize: '0.6875rem', fontWeight: 800, color: 'var(--burg-primary)', whiteSpace: 'nowrap' }}>
                    {item.tag} →
                  </span>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>

      <style jsx global>{`
        @keyframes searchModalFadeIn {
          from { opacity: 0; transform: scale(0.98); }
          to { opacity: 1; transform: scale(1); }
        }
        .search-item-row:hover {
          background: rgba(10, 75, 184, 0.08);
          transform: translateX(3px);
        }
        [data-theme="dark"] .search-item-row:hover {
          background: rgba(29, 120, 255, 0.15);
        }
        [data-theme="dark"] .search-modal-card {
          box-shadow: 0 28px 70px rgba(0, 0, 0, 0.75), inset 0 1px 1px rgba(255, 255, 255, 0.15) !important;
        }
      `}</style>
    </div>
  )
}
