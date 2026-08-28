'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useTheme } from '@/components/layout/ThemeProvider'
import { SearchModal } from '@/components/layout/SearchModal'

const NAV_LINKS = [
  { label: 'Company', href: '/company' },
  { label: 'Products', href: '/products' },
  { label: 'Services', href: '/services' },
  { label: 'Sustainability', href: '/sustainability' },
  { label: 'Quality', href: '/quality' },
  { label: 'Contact', href: '/contact' },
]

export function Header() {
  const pathname = usePathname()
  const headerRef = useRef<HTMLElement>(null)
  const navRef = useRef<HTMLElement>(null)
  const itemRefs = useRef<(HTMLAnchorElement | null)[]>([])
  const { theme, toggleTheme } = useTheme()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)

  // Anchored indicator positioning
  const [indicatorStyle, setIndicatorStyle] = useState<{ left: number; width: number; opacity: number }>({
    left: 0,
    width: 0,
    opacity: 0,
  })

  // Find active index
  const activeIndex = NAV_LINKS.findIndex((link) => link.href === pathname)

  const updateIndicator = (index: number) => {
    if (index >= 0 && itemRefs.current[index] && navRef.current) {
      const navRect = navRef.current.getBoundingClientRect()
      const itemRect = itemRefs.current[index]!.getBoundingClientRect()
      setIndicatorStyle({
        left: itemRect.left - navRect.left,
        width: itemRect.width,
        opacity: 1,
      })
    }
  }

  useEffect(() => {
    if (activeIndex >= 0) {
      updateIndicator(activeIndex)
    } else {
      setIndicatorStyle((prev) => ({ ...prev, opacity: 0 }))
    }
  }, [pathname, activeIndex])

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <header
        ref={headerRef}
        className="glass-navbar"
        style={{
          position: 'fixed',
          top: 'clamp(0.75rem, 1.8vh, 1.25rem)',
          left: '50%',
          transform: 'translateX(-50%)',
          width: 'calc(100% - clamp(1.5rem, 4vw, 4rem))',
          maxWidth: '1120px',
          zIndex: 9999,
          borderRadius: '9999px',
          background: scrolled ? 'var(--glass-nav-bg)' : 'var(--glass-nav-bg)',
          backdropFilter: 'blur(24px) saturate(180%)',
          WebkitBackdropFilter: 'blur(24px) saturate(180%)',
          border: '1px solid var(--glass-nav-border)',
          boxShadow: scrolled
            ? '0 16px 40px rgba(7, 20, 46, 0.12), 0 2px 8px rgba(7, 20, 46, 0.04), inset 0 1px 1px rgba(255, 255, 255, 0.95)'
            : '0 10px 30px rgba(7, 20, 46, 0.08), 0 2px 6px rgba(7, 20, 46, 0.03), inset 0 1px 1px rgba(255, 255, 255, 0.95)',
          padding: '0.45rem 0.75rem 0.45rem 1.25rem',
          transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1rem',
          }}
        >
          {/* Logo */}
          <Link href="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', flexShrink: 0 }}>
            <Image
              src="/gulf-fibre-logo.png"
              alt="Gulf Fibre Company (PVT) Limited"
              width={140}
              height={44}
              style={{ objectFit: 'contain', height: '2.25rem', width: 'auto' }}
              priority
            />
          </Link>

          {/* Desktop Nav - Anchored Glassmorphic Tab Indicator */}
          <nav
            ref={navRef}
            className="desktop-nav"
            style={{
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              gap: '0.35rem',
              padding: '0.25rem',
            }}
            onMouseLeave={() => {
              if (activeIndex >= 0) {
                updateIndicator(activeIndex)
              } else {
                setIndicatorStyle((prev) => ({ ...prev, opacity: 0 }))
              }
            }}
          >
            {/* Anchored Floating Glass Indicator Pill */}
            <div
              className="anchored-glass-pointer"
              style={{
                position: 'absolute',
                top: 0,
                bottom: 0,
                left: `${indicatorStyle.left}px`,
                width: `${indicatorStyle.width}px`,
                opacity: indicatorStyle.opacity,
                borderRadius: '9999px',
                background: theme === 'dark'
                  ? 'linear-gradient(180deg, rgba(29, 120, 255, 0.35) 0%, rgba(20, 50, 110, 0.45) 100%)'
                  : 'radial-gradient(120% 120% at 50% 15%, rgba(255, 255, 255, 0.95) 0%, rgba(225, 240, 255, 0.8) 55%, rgba(195, 225, 255, 0.65) 100%)',
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)',
                border: '1px solid rgba(255, 255, 255, 0.95)',
                boxShadow: theme === 'dark'
                  ? '0 6px 20px rgba(0, 0, 0, 0.4), inset 0 1px 1px rgba(255, 255, 255, 0.4)'
                  : '0 8px 24px rgba(10, 75, 184, 0.12), inset 0 2px 3px #FFFFFF, inset 0 -2px 4px rgba(10, 75, 184, 0.14)',
                pointerEvents: 'none',
                transition: 'left 0.55s var(--spring-easing), width 0.55s var(--spring-easing), opacity 0.25s ease',
                zIndex: 0,
              }}
            />

            {NAV_LINKS.map((link, idx) => (
              <Link
                key={link.href}
                href={link.href}
                ref={(el) => { itemRefs.current[idx] = el }}
                className="nav-pill"
                onMouseEnter={() => updateIndicator(idx)}
                style={{
                  position: 'relative',
                  zIndex: 1,
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.84375rem',
                  fontWeight: pathname === link.href ? 800 : 650,
                  letterSpacing: '0.02em',
                  textTransform: 'uppercase',
                  color: pathname === link.href ? 'var(--burg-primary)' : 'var(--ink)',
                  textDecoration: 'none',
                  padding: '0.55rem 1.05rem',
                  borderRadius: '9999px',
                  transition: 'color 0.2s ease',
                }}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right: Search + Theme Toggle + CTA */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', flexShrink: 0 }}>
            <button
              aria-label="Search (Ctrl+K)"
              title="Search (Ctrl+K)"
              data-search-btn
              onClick={() => setSearchOpen(true)}
              style={{
                width: '2.4rem',
                height: '2.4rem',
                borderRadius: '50%',
                background: 'rgba(10, 75, 184, 0.06)',
                border: '1px solid rgba(10, 75, 184, 0.12)',
                cursor: 'pointer',
                color: 'var(--ink)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background = 'rgba(10, 75, 184, 0.12)'
                  ; (e.currentTarget as HTMLElement).style.transform = 'scale(1.05)'
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background = 'rgba(10, 75, 184, 0.06)'
                  ; (e.currentTarget as HTMLElement).style.transform = 'scale(1)'
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.35-4.35" />
              </svg>
            </button>

            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
              title={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
              style={{
                width: '2.4rem',
                height: '2.4rem',
                borderRadius: '50%',
                background: theme === 'dark' ? 'rgba(255, 255, 255, 0.12)' : 'rgba(10, 75, 184, 0.06)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                cursor: 'pointer',
                color: theme === 'dark' ? '#FFD700' : 'var(--ink)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.transform = 'scale(1.1)'
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.transform = 'scale(1)'
              }}
            >
              {theme === 'dark' ? (
                /* Sun Icon */
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="5" fill="#FFD700" stroke="#FFD700" />
                  <line x1="12" y1="1" x2="12" y2="3" />
                  <line x1="12" y1="21" x2="12" y2="23" />
                  <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                  <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                  <line x1="1" y1="12" x2="3" y2="12" />
                  <line x1="21" y1="12" x2="23" y2="12" />
                  <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                  <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                </svg>
              ) : (
                /* Moon Icon */
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                </svg>
              )}
            </button>

            <Link
              href="/contact"
              className="btn-primary"
              style={{
                fontSize: '0.8125rem',
                fontWeight: 800,
                letterSpacing: '0.06em',
                padding: '0.65rem 1.45rem',
                borderRadius: '9999px',
                boxShadow: 'none',
              }}
            >
              GET IN TOUCH
            </Link>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Menu"
              className="mobile-menu-btn"
              style={{
                width: '2.25rem',
                height: '2.25rem',
                borderRadius: '50%',
                background: 'rgba(10, 75, 184, 0.05)',
                border: '1px solid rgba(10, 75, 184, 0.1)',
                cursor: 'pointer',
                color: 'var(--ink)',
                display: 'none',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {mobileOpen ? (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              ) : (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M3 12h18M3 6h18M3 18h18" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Nav Floating Glass Dropdown */}
      {mobileOpen && (
        <div
          style={{
            position: 'fixed',
            top: 'calc(clamp(0.75rem, 1.8vh, 1.25rem) + 4rem)',
            left: '50%',
            transform: 'translateX(-50%)',
            width: 'calc(100% - clamp(1.5rem, 4vw, 4rem))',
            maxWidth: '1120px',
            zIndex: 9998,
            background: 'rgba(4, 15, 38, 0.94)',
            backdropFilter: 'blur(28px) saturate(180%)',
            WebkitBackdropFilter: 'blur(28px) saturate(180%)',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            boxShadow: '0 20px 50px rgba(0, 0, 0, 0.35)',
            borderRadius: '24px',
            padding: '2rem 1.5rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.25rem',
            alignItems: 'center',
          }}
        >
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '1.125rem',
                fontWeight: 800,
                letterSpacing: '0.04em',
                textTransform: 'uppercase',
                color: 'var(--white)',
                textDecoration: 'none',
                padding: '0.5rem 1.5rem',
                borderRadius: '9999px',
                transition: 'background 0.2s ease',
              }}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/contact"
            className="btn-primary"
            onClick={() => setMobileOpen(false)}
            style={{
              width: '100%',
              justifyContent: 'center',
              borderRadius: '9999px',
              marginTop: '0.5rem',
            }}
          >
            Get In Touch
          </Link>
        </div>
      )}

      {/* Frosted Glass Spotlight Search Modal */}
      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />

      <style>{`
        @media (max-width: 960px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
        }
      `}</style>
    </>
  )
}
