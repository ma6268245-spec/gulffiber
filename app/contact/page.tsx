'use client'

import { useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { FloatingActions } from '@/components/layout/FloatingActions'

function ContactForm() {
  const searchParams = useSearchParams()
  const initialProduct = searchParams.get('product') || 'Polyester Staple Fibre (Recycled)'

  const [submitted, setSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    product: initialProduct,
    quantity: '10 MT',
    message: '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <div style={{ background: 'var(--white)', border: '1px solid var(--border-light)', padding: 'clamp(2rem, 5vw, 3.5rem)' }}>
      {submitted ? (
        <div style={{ textAlign: 'center', padding: '3rem 1rem' }}>
          <div style={{ width: '4rem', height: '4rem', borderRadius: '50%', background: 'rgba(10,75,184,0.1)', color: 'var(--burg-primary)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
          <h3 style={{ fontFamily: 'var(--font-sans)', fontSize: '1.75rem', fontWeight: 900, color: 'var(--ink)', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
            Inquiry Received
          </h3>
          <p style={{ fontSize: '0.9375rem', color: 'var(--muted)', maxWidth: '42ch', margin: '0 auto 2rem', lineHeight: 1.6 }}>
            Thank you, <strong>{formData.name}</strong>. Our export and technical sales team will review your specifications and reply with a formal proforma quote within 24 hours.
          </p>
          <button
            onClick={() => setSubmitted(false)}
            className="btn-secondary"
          >
            SUBMIT ANOTHER INQUIRY
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <h3 style={{ fontFamily: 'var(--font-sans)', fontSize: '1.5rem', fontWeight: 900, color: 'var(--ink)', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
            Request Quotation & Technical Specs
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.6875rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--ink)', marginBottom: '0.375rem' }}>
                Full Name *
              </label>
              <input
                required
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g. Tariq Mahmood"
                style={{ width: '100%', padding: '0.875rem 1rem', border: '1px solid var(--border-light)', background: 'var(--ivory)', fontSize: '0.875rem', color: 'var(--ink)', outline: 'none' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.6875rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--ink)', marginBottom: '0.375rem' }}>
                Company Name *
              </label>
              <input
                required
                type="text"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                placeholder="e.g. Apex Textiles Ltd"
                style={{ width: '100%', padding: '0.875rem 1rem', border: '1px solid var(--border-light)', background: 'var(--ivory)', fontSize: '0.875rem', color: 'var(--ink)', outline: 'none' }}
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.6875rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--ink)', marginBottom: '0.375rem' }}>
                Business Email *
              </label>
              <input
                required
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="buyer@company.com"
                style={{ width: '100%', padding: '0.875rem 1rem', border: '1px solid var(--border-light)', background: 'var(--ivory)', fontSize: '0.875rem', color: 'var(--ink)', outline: 'none' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.6875rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--ink)', marginBottom: '0.375rem' }}>
                Phone / WhatsApp *
              </label>
              <input
                required
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="+92 300 1234567"
                style={{ width: '100%', padding: '0.875rem 1rem', border: '1px solid var(--border-light)', background: 'var(--ivory)', fontSize: '0.875rem', color: 'var(--ink)', outline: 'none' }}
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '1.25rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.6875rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--ink)', marginBottom: '0.375rem' }}>
                Product Interest
              </label>
              <select
                value={formData.product}
                onChange={(e) => setFormData({ ...formData, product: e.target.value })}
                style={{ width: '100%', padding: '0.875rem 1rem', border: '1px solid var(--border-light)', background: 'var(--ivory)', fontSize: '0.875rem', color: 'var(--ink)', outline: 'none' }}
              >
                <option value="Polyester Staple Fibre (Recycled)">Polyester Staple Fibre (Recycled)</option>
                <option value="Polyester Staple Fibre (Virgin)">Polyester Staple Fibre (Virgin)</option>
                <option value="Conjugate Hollow Siliconised 7D">Conjugate Hollow Siliconised 7D</option>
                <option value="Hollow Conjugate Slick 15D">Hollow Conjugate Slick 15D</option>
                <option value="Needle-Punched Industrial Felt">Needle-Punched Industrial Felt</option>
                <option value="Geotextile Non-Woven Fabric">Geotextile Non-Woven Fabric</option>
                <option value="Other / Custom Denier">Other / Custom Denier</option>
              </select>
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.6875rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--ink)', marginBottom: '0.375rem' }}>
                Estimated Quantity
              </label>
              <input
                type="text"
                value={formData.quantity}
                onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                placeholder="e.g. 20 Metric Tonnes"
                style={{ width: '100%', padding: '0.875rem 1rem', border: '1px solid var(--border-light)', background: 'var(--ivory)', fontSize: '0.875rem', color: 'var(--ink)', outline: 'none' }}
              />
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.6875rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--ink)', marginBottom: '0.375rem' }}>
              Specific Technical Requirements / Message
            </label>
            <textarea
              rows={4}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              placeholder="Please provide details about cut length, tenacity requirements, end application, or port of destination."
              style={{ width: '100%', padding: '0.875rem 1rem', border: '1px solid var(--border-light)', background: 'var(--ivory)', fontSize: '0.875rem', color: 'var(--ink)', outline: 'none', resize: 'vertical' }}
            />
          </div>

          <button
            type="submit"
            className="btn-primary"
            style={{ width: '100%', justifyContent: 'center', padding: '1.125rem' }}
          >
            SUBMIT INQUIRY FOR FAST QUOTE
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
        </form>
      )}
    </div>
  )
}

export default function ContactPage() {
  return (
    <>
      <Header />
      <main style={{ paddingTop: '5.5rem', background: 'var(--ivory)', minHeight: '100vh' }}>
        {/* Banner */}
        <section
          style={{
            background: 'var(--burg-darker)',
            color: 'var(--white)',
            padding: 'clamp(4.5rem, 8vh, 6.5rem) var(--pad-x)',
          }}
        >
          <div className="container">
            <div className="eyebrow" style={{ color: 'rgba(255,255,255,0.6)', marginBottom: '1rem' }}>
              <svg viewBox="0 0 16 16" fill="currentColor">
                <path d="M8 1L10 6H15L11 9L13 14L8 11L3 14L5 9L1 6H6L8 1Z" />
              </svg>
              Global Sales & Exports
            </div>
            <h1
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: 'clamp(2.5rem, 5vw, 5.5rem)',
                fontWeight: 900,
                lineHeight: 0.95,
                letterSpacing: '-0.02em',
                textTransform: 'uppercase',
                marginBottom: '1.5rem',
              }}
            >
              Get In Touch With <br />
              <span style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', color: 'var(--burg-bright)' }}>Our Technical Team</span>
            </h1>
            <p style={{ fontSize: '1rem', lineHeight: 1.7, color: 'rgba(255,255,255,0.7)', maxWidth: '56ch' }}>
              Direct factory pricing, FOB Karachi and CIF worldwide shipping rates. Reach out to our technical fibre experts today.
            </p>
          </div>
        </section>

        {/* Content */}
        <section className="section-pad">
          <div className="container">
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1.2fr 0.8fr',
                gap: 'clamp(3rem, 5vw, 5rem)',
                alignItems: 'flex-start',
              }}
            >
              {/* Form with Suspense for useSearchParams */}
              <Suspense fallback={<div style={{ padding: '3rem', textAlign: 'center' }}>Loading form...</div>}>
                <ContactForm />
              </Suspense>

              {/* Plant & Contact Info */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                <div style={{ background: 'var(--white)', border: '1px solid var(--border-light)', padding: '2rem' }}>
                  <span className="eyebrow" style={{ marginBottom: '0.75rem' }}>Factory Headquarters</span>
                  <h4 style={{ fontFamily: 'var(--font-sans)', fontSize: '1.125rem', fontWeight: 800, color: 'var(--ink)', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
                    Gulf Fibre Company (PVT) Limited
                  </h4>
                  <p style={{ fontSize: '0.875rem', color: 'var(--muted)', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                    Plot # 45-B, Sector 7-A, Korangi Industrial Area,<br />
                    Karachi – 74900, Sindh, Pakistan
                  </p>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem', borderTop: '1px solid var(--border-light)', paddingTop: '1.25rem' }}>
                    <div>
                      <span style={{ fontSize: '0.6875rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--ink)', display: 'block' }}>
                        Phone & Fax
                      </span>
                      <a href="tel:+922135012345" style={{ fontSize: '0.875rem', color: 'var(--burg-primary)', textDecoration: 'none', fontWeight: 600 }}>
                        +92 (21) 3501-2345 / 46
                      </a>
                    </div>
                    <div>
                      <span style={{ fontSize: '0.6875rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--ink)', display: 'block' }}>
                        Direct WhatsApp Export Desk
                      </span>
                      <a href="https://wa.me/923001234567" target="_blank" rel="noopener noreferrer" style={{ fontSize: '0.875rem', color: '#25D366', textDecoration: 'none', fontWeight: 700 }}>
                        +92 300 1234567 (Chat Now)
                      </a>
                    </div>
                    <div>
                      <span style={{ fontSize: '0.6875rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--ink)', display: 'block' }}>
                        Export Sales Email
                      </span>
                      <a href="mailto:exports@gulffibre.com" style={{ fontSize: '0.875rem', color: 'var(--burg-primary)', textDecoration: 'none', fontWeight: 600 }}>
                        exports@gulffibre.com
                      </a>
                    </div>
                  </div>
                </div>

                <div style={{ background: 'var(--burg-primary)', color: 'var(--white)', padding: '2rem' }}>
                  <h4 style={{ fontFamily: 'var(--font-sans)', fontSize: '1rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                    Express Sample Dispatch
                  </h4>
                  <p style={{ fontSize: '0.8125rem', color: 'rgba(255,255,255,0.85)', lineHeight: 1.6, marginBottom: '1.25rem' }}>
                    We dispatch 1kg–5kg test swatches and laboratory samples internationally via DHL / FedEx with tracking within 24 hours.
                  </p>
                  <a
                    href="mailto:samples@gulffibre.com?subject=Sample%20Request"
                    className="btn-primary"
                    style={{ background: 'var(--white)', color: 'var(--ink)', border: 'none' }}
                  >
                    REQUEST SAMPLE SWATCHES
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <FloatingActions />
    </>
  )
}
