'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

const SERVICES = [
  'Crafted to Impress',
  'Sustainable Fibres',
  'Tailored Perfection',
  'Technical Innovation',
  'Durability Woven In',
]

const QUICKLINKS = [
  { label: 'About Us', href: '/company' },
  { label: 'Products', href: '/products' },
  { label: 'Services', href: '/services' },
  { label: 'Sustainability', href: '/sustainability' },
  { label: 'Quality', href: '/quality' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Terms & Copyright', href: '/terms' },
  { label: 'Contact', href: '/contact' },
]

export function Footer() {
  const [email, setEmail] = useState('')
  const [nl, setNl] = useState<'idle' | 'sending' | 'ok' | 'error'>('idle')

  const subscribe = async (e: React.FormEvent) => {
    e.preventDefault()
    if (nl === 'sending') return
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim())) {
      setNl('error')
      return
    }
    setNl('sending')
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim() }),
      })
      if (!res.ok) throw new Error('request failed')
      setNl('ok')
      setEmail('')
    } catch {
      setNl('error')
    }
  }

  return (
    <footer
      style={{
        background: 'var(--burg-darker)',
        color: 'var(--white)',
        paddingTop: '5rem',
      }}
    >
      <div className="container">
        {/* Main grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '3rem',
            paddingBottom: '4rem',
            borderBottom: '1px solid var(--border-dark)',
          }}
        >
          {/* Brand */}
          <div style={{ gridColumn: 'span 1' }}>
            <div style={{ background: 'var(--white)', padding: '0.5rem 0.875rem', borderRadius: '4px', display: 'inline-block', marginBottom: '1.25rem' }}>
              <Image
                src="/gulf-fibre-logo.png"
                alt="Gulf Fibre Company (PVT) Limited"
                width={150}
                height={46}
                style={{ objectFit: 'contain', height: '2.5rem', width: 'auto', display: 'block' }}
              />
            </div>
            <p style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontSize: '1.0625rem', lineHeight: 1.7, color: 'rgba(255,255,255,0.7)', maxWidth: '22ch', marginBottom: '1.5rem' }}>
              Elevating Industry Through Superior Fibre Solutions
            </p>
            <p
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.625rem',
                fontWeight: 700,
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                marginBottom: '0.875rem',
                color: 'rgba(255,255,255,0.5)',
              }}
            >
              FOLLOW ME
            </p>
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              {['facebook', 'twitter', 'instagram', 'linkedin'].map((s) => (
                <a
                  key={s}
                  href="#"
                  aria-label={s}
                  style={{
                    width: '2.25rem',
                    height: '2.25rem',
                    border: '1px solid var(--border-dark)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'rgba(255,255,255,0.6)',
                    textDecoration: 'none',
                    transition: 'border-color 0.2s, color 0.2s',
                  }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                    {s === 'facebook' && <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />}
                    {s === 'twitter' && <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />}
                    {s === 'instagram' && <><rect x="2" y="2" width="20" height="20" rx="5" ry="5" fill="none" stroke="currentColor" strokeWidth="2" /><circle cx="12" cy="12" r="5" fill="none" stroke="currentColor" strokeWidth="2" /><circle cx="17.5" cy="6.5" r="1.5" /></>}
                    {s === 'linkedin' && <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z" />}
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <p
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                fontFamily: 'var(--font-sans)',
                fontSize: '0.625rem',
                fontWeight: 700,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.5)',
                marginBottom: '1.25rem',
              }}
            >
              <span>★</span> Our Services
            </p>
            <ul style={{ listStyle: 'none' }}>
              {SERVICES.map((s) => (
                <li key={s} style={{ marginBottom: '0.75rem' }}>
                  <Link
                    href="/services"
                    style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: '0.875rem',
                      color: 'rgba(255,255,255,0.6)',
                      textDecoration: 'none',
                      transition: 'color 0.2s',
                    }}
                  >
                    {s}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <p
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                fontFamily: 'var(--font-sans)',
                fontSize: '0.625rem',
                fontWeight: 700,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.5)',
                marginBottom: '1.25rem',
              }}
            >
              <span>★</span> Quicklinks
            </p>
            <ul style={{ listStyle: 'none' }}>
              {QUICKLINKS.map((l) => (
                <li key={l.href} style={{ marginBottom: '0.75rem' }}>
                  <Link
                    href={l.href}
                    style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: '0.875rem',
                      color: 'rgba(255,255,255,0.6)',
                      textDecoration: 'none',
                      transition: 'color 0.2s',
                    }}
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <p
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                fontFamily: 'var(--font-sans)',
                fontSize: '0.625rem',
                fontWeight: 700,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.5)',
                marginBottom: '1.25rem',
              }}
            >
              <span>★</span> Get Updates
            </p>
            <p style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.6)', lineHeight: 1.7, marginBottom: '1.25rem' }}>
              Premium fibres into high-quality textiles that define excellence.
            </p>
            <form
              onSubmit={subscribe}
              style={{ display: 'flex', gap: '0', marginBottom: '1rem' }}
            >
              <input
                type="email"
                placeholder="Email Address"
                aria-label="Email Address"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value)
                  if (nl !== 'idle') setNl('idle')
                }}
                style={{
                  flex: 1,
                  padding: '0.75rem 1rem',
                  background: 'rgba(255,255,255,0.08)',
                  border: '1px solid var(--border-dark)',
                  borderRight: 'none',
                  color: 'var(--white)',
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.8125rem',
                  outline: 'none',
                }}
              />
              <button
                type="submit"
                disabled={nl === 'sending'}
                style={{
                  padding: '0.75rem 1rem',
                  background: 'var(--burg-primary)',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  color: 'var(--white)',
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="m22 2-7 20-4-9-9-4 20-7z" />
                </svg>
              </button>
            </form>
            <p
              aria-live="polite"
              style={{
                fontSize: '0.75rem',
                lineHeight: 1.5,
                minHeight: '1.05rem',
                marginTop: '-0.5rem',
                marginBottom: '1rem',
                color:
                  nl === 'ok'
                    ? 'var(--burg-primary)'
                    : nl === 'error'
                      ? '#ff9b9b'
                      : 'rgba(255,255,255,0.5)',
              }}
            >
              {nl === 'ok'
                ? 'Thank you — you are subscribed. A confirmation is on its way to your inbox.'
                : nl === 'error'
                  ? 'Please enter a valid email address.'
                  : ''}
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
              {[1,2,3,4].map(i => (
                <svg key={i} width="12" height="12" viewBox="0 0 24 24" fill="var(--burg-primary)">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              ))}
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--burg-primary)" strokeWidth="2">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
              <span style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.5)' }}>4.7 | 800+ Reviews</span>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1.5rem 0',
            gap: '0.85rem',
            flexWrap: 'wrap',
          }}
        >
          <p style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.45)', textAlign: 'center', margin: 0 }}>
            © Copyright {new Date().getFullYear()}. All rights reserved.{' '}
            <strong style={{ color: 'rgba(255,255,255,0.7)' }}>Gulf Fibre Company (PVT) Limited</strong>
          </p>
          <span style={{ color: 'rgba(255,255,255,0.25)', fontSize: '0.75rem' }}>·</span>
          <Link
            href="/terms"
            style={{
              fontSize: '0.75rem',
              color: 'rgba(255,255,255,0.6)',
              textDecoration: 'underline',
              textUnderlineOffset: '3px',
              transition: 'color 0.2s',
            }}
          >
            Terms & Conditions · Copyright Notice
          </Link>
        </div>
      </div>
    </footer>
  )
}
