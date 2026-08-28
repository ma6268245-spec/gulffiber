'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

const SEARCH_DATABASE = [
  { title: 'Recycled Polyester Staple Fibre (PSF)', category: 'Product', href: '/products', tag: '1.2D–15D', desc: 'High-tenacity GRS-certified staple fibre for spinning mills.' },
  { title: 'Hollow Conjugate Siliconized Fibre (HCS)', category: 'Product', href: '/products', tag: '7D / 15D', desc: '3D helical spiral crimp for luxury pillows and thermal infill.' },
  { title: 'Automotive & Industrial Non-Woven Felt', category: 'Product', href: '/products', tag: '80–1200 GSM', desc: 'Needle-punched geotextiles, acoustic felts, and headliners.' },
  { title: 'Custom Denier Extrusion & Spinning', category: 'Service', href: '/services', tag: 'Capabilities', desc: 'Tailored tensile strength, cut lengths (32mm–102mm), and crimp rates.' },
  { title: 'GRS (Global Recycled Standard) Certification', category: 'Quality', href: '/quality', tag: '100% Recycled', desc: 'Scope certificates and batch-specific Certificate of Analysis (COA).' },
  { title: 'ISO 9001:2015 Quality Management', category: 'Quality', href: '/quality', tag: 'ISO Certified', desc: 'Automated optical testing and German draw-frame parameters.' },
  { title: 'Eco-Loop Circular Sustainability', category: 'Sustainability', href: '/sustainability', tag: 'Eco-Loop', desc: 'Diverting millions of plastic bottles from coastal landfills annually.' },
  { title: 'Karachi Manufacturing Plant & Port Logistics', category: 'Company', href: '/company', tag: 'FOB / CIF', desc: '24-hour export container dispatch to 18 worldwide destinations.' },
  { title: 'Executive Leadership & Management Team', category: 'Company', href: '/company', tag: 'Leadership', desc: 'Meet our Co-Founder, Operations Directors, and Polymer Scientists.' },
  { title: 'Request Sample Cones & Proforma Quote', category: 'Contact', href: '/contact', tag: 'Sales Desk', desc: 'Direct inquiry for 1kg–5kg lab test swatches and volume pricing.' },
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
        style={{
          width: '100%',
          maxWidth: '640px',
          background: 'rgba(255, 255, 255, 0.92)',
          backdropFilter: 'blur(32px) saturate(180%)',
          WebkitBackdropFilter: 'blur(32px) saturate(180%)',
          border: '1px solid rgba(255, 255, 255, 0.95)',
          borderRadius: '24px',
          boxShadow: '0 28px 70px rgba(7, 20, 46, 0.35), inset 0 1px 1px #FFFFFF',
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
            padding: '1.25rem 1.5rem',
            borderBottom: '1px solid rgba(10, 35, 80, 0.1)',
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
              border: 'none',
              background: 'transparent',
              fontSize: '1rem',
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
              background: 'rgba(10, 75, 184, 0.08)',
              color: 'var(--burg-primary)',
              border: '1px solid rgba(10, 75, 184, 0.15)',
            }}
          >
            ESC
          </kbd>
        </div>

        {/* Results List */}
        <div style={{ maxHeight: '380px', overflowY: 'auto', padding: '0.75rem' }}>
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
      `}</style>
    </div>
  )
}
