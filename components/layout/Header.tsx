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
    let rafId = 0
    if (activeIndex >= 0) {
      rafId = requestAnimationFrame(() => {
        updateIndicator(activeIndex)
      })
    } else {
      rafId = requestAnimationFrame(() => {
        setIndicatorStyle((prev) => (prev.opacity === 0 ? prev : { ...prev, opacity: 0 }))
      })
    }
    return () => {
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [pathname, activeIndex])

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollToTop = () => {
    if (typeof window !== 'undefined') {
      const win = window as unknown as { lenis?: { scrollTo: (t: number, o?: object) => void } }
      if (win.lenis) {
        win.lenis.scrollTo(0, { immediate: true })
      }
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
      document.documentElement.scrollTop = 0
      document.body.scrollTop = 0
    }
  }

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
          width: 'max-content',
          maxWidth: 'calc(100% - clamp(1.5rem, 4vw, 4rem))',
          zIndex: 9999,
          borderRadius: '9999px',
          background: scrolled ? 'var(--glass-nav-bg)' : 'var(--glass-nav-bg)',
          backdropFilter: 'blur(24px) saturate(180%)',
          WebkitBackdropFilter: 'blur(24px) saturate(180%)',
          border: '1px solid var(--glass-nav-border)',
          boxShadow: scrolled
            ? '0 16px 40px rgba(7, 20, 46, 0.12), 0 2px 8px rgba(7, 20, 46, 0.04), inset 0 1px 1px rgba(255, 255, 255, 0.95)'
            : '0 10px 30px rgba(7, 20, 46, 0.08), 0 2px 6px rgba(7, 20, 46, 0.03), inset 0 1px 1px rgba(255, 255, 255, 0.95)',
          padding: '0.45rem 1.15rem 0.45rem 1.25rem',
          transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1.5rem',
            width: '100%',
          }}
        >
          {/* Logo */}
          <Link
            href="/"
            onClick={scrollToTop}
            className="nav-brand-logo"
            aria-label="Gulf Fibre Home"
          >
            <Image
              src="/gulf-fibre-logo.png"
              alt="Gulf Fibre Company (PVT) Limited"
              width={145}
              height={45}
              style={{ objectFit: 'contain', height: '2.35rem', width: 'auto' }}
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
              padding: '0.2rem',
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
                top: '3px',
                bottom: '3px',
                left: `${indicatorStyle.left}px`,
                width: `${indicatorStyle.width}px`,
                opacity: indicatorStyle.opacity,
                borderRadius: '9999px',
                background: theme === 'dark'
                  ? 'linear-gradient(180deg, rgba(29, 120, 255, 0.3) 0%, rgba(20, 50, 110, 0.4) 100%)'
                  : 'radial-gradient(120% 120% at 50% 15%, rgba(255, 255, 255, 0.95) 0%, rgba(225, 240, 255, 0.8) 55%, rgba(195, 225, 255, 0.65) 100%)',
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)',
                border: '1px solid rgba(255, 255, 255, 0.95)',
                boxShadow: theme === 'dark'
                  ? '0 6px 20px rgba(0, 0, 0, 0.4), inset 0 1px 1px rgba(255, 255, 255, 0.4)'
                  : '0 4px 16px rgba(10, 75, 184, 0.12), inset 0 1px 2px #FFFFFF, inset 0 -1px 2px rgba(10, 75, 184, 0.1)',
                pointerEvents: 'none',
                transition: 'left 0.45s var(--spring-easing), width 0.45s var(--spring-easing), opacity 0.2s ease',
                zIndex: 0,
              }}
            />

            {NAV_LINKS.map((link, idx) => (
              <Link
                key={link.href}
                href={link.href}
                ref={(el) => { itemRefs.current[idx] = el }}
                className="nav-pill"
                onClick={scrollToTop}
                onMouseEnter={() => updateIndicator(idx)}
                style={{
                  position: 'relative',
                  zIndex: 1,
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.875rem',
                  fontWeight: pathname === link.href ? 800 : 700,
                  letterSpacing: '0.04em',
                  textTransform: 'uppercase',
                  color: pathname === link.href ? 'var(--burg-primary)' : 'var(--ink)',
                  textDecoration: 'none',
                  padding: '0.52rem 1.05rem',
                  borderRadius: '9999px',
                  transition: 'color 0.2s ease',
                  whiteSpace: 'nowrap',
                }}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right: Search + Theme Toggle + CTA */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.55rem', flexShrink: 0 }}>
            <button
              aria-label="Search (Ctrl+K)"
              title="Search (Ctrl+K)"
              data-search-btn
              onClick={() => setSearchOpen(true)}
              style={{
                width: '2.35rem',
                height: '2.35rem',
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
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
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
                width: '2.35rem',
                height: '2.35rem',
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
                (e.currentTarget as HTMLElement).style.transform = 'scale(1.08)'
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.transform = 'scale(1)'
              }}
            >
              {theme === 'dark' ? (
                /* Sun Icon */
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
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
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                </svg>
              )}
            </button>

            <Link
              href="/contact"
              onClick={scrollToTop}
              className="btn-primary"
              style={{
                fontSize: '0.8125rem',
                fontWeight: 800,
                letterSpacing: '0.06em',
                padding: '0.62rem 1.4rem',
                borderRadius: '9999px',
                boxShadow: 'none',
                whiteSpace: 'nowrap',
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

      {/* Mobile Nav Floating Glass Dropdown & Backdrop */}
      {mobileOpen && (
        <>
          <div
            onClick={() => setMobileOpen(false)}
            aria-hidden="true"
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 9997,
              background: 'rgba(4, 15, 38, 0.65)',
              backdropFilter: 'blur(4px)',
              WebkitBackdropFilter: 'blur(4px)',
            }}
          />
          <div
            style={{
              position: 'fixed',
              top: 'calc(clamp(0.75rem, 1.8vh, 1.25rem) + 4rem)',
              left: '50%',
              transform: 'translateX(-50%)',
              width: 'calc(100% - clamp(1.5rem, 4vw, 4rem))',
              maxWidth: '1120px',
              maxHeight: 'calc(100vh - 6rem)',
              overflowY: 'auto',
              zIndex: 9998,
              background: 'rgba(4, 15, 38, 0.96)',
              backdropFilter: 'blur(28px) saturate(180%)',
              WebkitBackdropFilter: 'blur(28px) saturate(180%)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              boxShadow: '0 20px 50px rgba(0, 0, 0, 0.45)',
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
                onClick={() => {
                  setMobileOpen(false)
                  scrollToTop()
                }}
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '1.125rem',
                  fontWeight: 800,
                  letterSpacing: '0.04em',
                  textTransform: 'uppercase',
                  color: '#FFFFFF',
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
              onClick={() => {
                setMobileOpen(false)
                scrollToTop()
              }}
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
        </>
      )}

      {/* Frosted Glass Spotlight Search Modal */}
      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />

      <style>{`
        @media (max-width: 1080px) {
          .glass-navbar { width: calc(100% - clamp(1.5rem, 4vw, 4rem)) !important; }
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
        }
      `}</style>
    </>
  )
}
