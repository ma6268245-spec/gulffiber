'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useRef } from 'react'
import { PageHero } from '@/components/subpages/PageHero'
import { PageShell } from '@/components/subpages/PageShell'
import { ProductVideoPlayer } from '@/components/subpages/ProductVideoPlayer'
import { CompanyVideoScrollStory } from '@/components/company/CompanyVideoScrollStory'
import {
  ArrowLink,
  Chip,
  DataSlot,
  Provenance,
  SectionHead,
  SpecRows,
} from '@/components/subpages/Primitives'
import { useSectionReveal } from '@/components/subpages/useSectionReveal'
import { COMMERCIAL_TERMS, PRODUCT_LINES, PRODUCT_ROUTES, VERIFIED } from '@/lib/data/company'

export default function ProductsPage() {
  const scope = useRef<HTMLDivElement>(null)
  useSectionReveal(scope)

  return (
    <PageShell>
      <div ref={scope}>
        <PageHero
          eyebrow="Product Portfolio"
          lines={[{ text: 'Five lines,' }, { text: 'one specification' }, { text: 'discipline', serif: true }]}
          lede={`Regenerated solid and hollow staple fibre (${VERIFIED.denierRange}), high-loft thermal-bonded wadding, needle-punched technical felt, and fusible garment interlinings — engineered to the precise specification of the receiving operation.`}
          meta={[
            { label: 'Denier range', value: VERIFIED.denierRange },
            { label: 'Annual capacity', value: VERIFIED.annualCapacity },
            { label: 'Product lines', value: String(PRODUCT_LINES.length) },
            { label: 'Customers served', value: VERIFIED.customers },
          ]}
          bgVideo="/videos/product-hero.mp4"
        >
          <Link className="btn-primary" href="/contact">
            Request a quotation
          </Link>
        </PageHero>

        {/* ── Editorial index of the five lines ─────────────────────────── */}
        <section className="section-pad" data-sp-section style={{ background: 'var(--white)' }}>
          <div className="container">
            <div className="sp-anim">
              <SectionHead
                eyebrow="The Collection"
                title="What we make,"
                em="and who buys it"
                lede="Spinning mills, wadding converters, nonwoven manufacturers and making-up operations. Each line below states the applications it is actually supplied into."
                link="/services"
                linkLabel="How it is made to order"
              />
            </div>

            <ul className="sp-index sp-anim">
              {PRODUCT_LINES.map((p, i) => (
                <li key={p.id}>
                  <a className="sp-index-row" href={`#${p.id}`}>
                    <span className="sp-index-num" aria-hidden="true">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span>
                      <h3 className="sp-index-title">
                        {p.title.split(' & ')[0]}
                        {p.title.includes(' & ') && (
                          <>
                            {' & '}
                            <em>{p.title.split(' & ')[1]}</em>
                          </>
                        )}
                      </h3>
                      <p className="sp-index-sub">{p.subtitle}</p>
                    </span>
                    <span className="sp-index-arrow" aria-hidden="true">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ── Line-by-line deep dives ───────────────────────────────────── */}
        {PRODUCT_LINES.map((p, i) => (
          <section
            className="section-pad"
            data-sp-section
            id={p.id}
            key={p.id}
            style={{
              background: i % 2 === 0 ? 'var(--ivory)' : 'var(--white)',
              borderBottom: '1px solid var(--border-light)',
            }}
          >
            <div className="container">
              {/* Product Header (Full Width) */}
              <div className="sp-anim" style={{ marginBottom: 'clamp(2rem, 3.5vh, 2.75rem)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap', marginBottom: '0.65rem' }}>
                  <span className="sp-cat">{p.code}</span>
                  <Provenance status={p.status} />
                </div>
                <h2 className="h-section" style={{ margin: '0 0 0.5rem', fontSize: 'clamp(2rem, 3.6vw, 2.85rem)', lineHeight: 1.15 }}>
                  {p.title}
                </h2>
                <p style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--burg-primary)', margin: '0 0 0.85rem' }}>
                  {p.subtitle}
                </p>
                <p className="sp-body" style={{ margin: 0, maxWidth: '60rem', lineHeight: 1.7, fontSize: '0.96875rem' }}>
                  {p.positioning}
                </p>
              </div>

              {/* 2-Column Balanced Dossier Grid (Alternating Left/Right) */}
              <div className="sp-deep" style={{ alignItems: 'stretch' }}>
                {i % 2 === 0 ? (
                  <>
                    {/* Information / Specifications (Left) */}
                    <div
                      className="sp-anim"
                      style={{
                        background: 'var(--card-bg, #FFFFFF)',
                        border: '1px solid var(--border-light)',
                        borderRadius: '20px',
                        padding: 'clamp(1.35rem, 2.2vw, 1.85rem)',
                        boxShadow: '0 12px 36px rgba(10, 75, 184, 0.04)',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                      }}
                    >
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1rem', borderBottom: '1px solid var(--border-light)', paddingBottom: '0.75rem' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                            <span style={{ display: 'inline-block', width: '8px', height: '8px', borderRadius: '50%', background: 'var(--burg-primary)', flexShrink: 0 }} />
                            <span style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--burg-primary)' }}>
                              Verified Technical Specifications
                            </span>
                          </div>
                          <span
                            style={{
                              fontSize: '0.6875rem',
                              fontWeight: 800,
                              color: 'var(--ink)',
                              background: 'var(--ivory)',
                              padding: '0.25rem 0.6rem',
                              borderRadius: '6px',
                              border: '1px solid var(--border-light)',
                              whiteSpace: 'nowrap',
                              flexShrink: 0,
                            }}
                          >
                            Standard Baseline
                          </span>
                        </div>

                        <SpecRows rows={p.verifiedAttributes.map((a) => ({ key: a.label, value: <strong>{a.value}</strong> }))} />

                        <div style={{ marginTop: '1.25rem' }}>
                          <p style={{ fontSize: '0.6875rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--muted)', marginBottom: '0.5rem' }}>
                            Verified Applications
                          </p>
                          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.45rem' }} aria-label="Applications">
                            {p.appliedIn.map((a) => (
                              <Chip key={a}>{a}</Chip>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div style={{ paddingTop: '1.25rem', marginTop: '1.25rem', borderTop: '1px solid var(--border-light)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
                        <ArrowLink href="/contact">Enquire about {p.code}</ArrowLink>
                        <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--muted)' }}>
                          Batch COA Provided
                        </span>
                      </div>
                    </div>

                    {/* Media / Video Showcase & Feasibility (Right) */}
                    <div
                      className="sp-anim"
                      style={{
                        background: 'var(--card-bg, #FFFFFF)',
                        border: '1px solid var(--border-light)',
                        borderRadius: '20px',
                        overflow: 'hidden',
                        boxShadow: '0 12px 36px rgba(10, 75, 184, 0.04)',
                        display: 'flex',
                        flexDirection: 'column',
                        height: '100%',
                      }}
                    >
                      {/* Photo or Video Player */}
                      {p.video ? (
                        <ProductVideoPlayer
                          src={p.video}
                          poster={p.image ?? '/images/process-fibre.jpg'}
                          alt={`${p.title} at the Gulf Fibre plant`}
                          title={p.title}
                          code={p.code}
                        />
                      ) : (
                        <div
                          className="product-media-showcase-container"
                          style={{
                            position: 'relative',
                            width: '100%',
                            flex: 1,
                            minHeight: '460px',
                            overflow: 'hidden',
                            background: '#071738',
                          }}
                        >
                          <Image
                            src={p.image ?? '/images/collection-rolls.jpg'}
                            alt={`${p.title} at the Gulf Fibre plant`}
                            fill
                            sizes="(max-width: 992px) 100vw, 48vw"
                            style={{ objectFit: 'cover' }}
                          />
                          <div
                            style={{
                              position: 'absolute',
                              top: '1rem',
                              left: '1rem',
                              background: 'rgba(10, 17, 40, 0.88)',
                              backdropFilter: 'blur(8px)',
                              padding: '0.4rem 0.85rem',
                              borderRadius: '9999px',
                              border: '1px solid rgba(255, 255, 255, 0.2)',
                              fontSize: '0.71875rem',
                              fontWeight: 800,
                              letterSpacing: '0.04em',
                              textTransform: 'uppercase',
                              color: '#FFFFFF',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '0.45rem',
                              zIndex: 2,
                              maxWidth: 'calc(100% - 4rem)',
                            }}
                          >
                            <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#22C55E', boxShadow: '0 0 8px #22C55E', display: 'inline-block', flexShrink: 0 }} />
                            <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{p.title}</span>
                          </div>
                        </div>
                      )}

                      {/* Feasibility Details */}
                      <div style={{ padding: '1.25rem 1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem', background: 'var(--card-bg)', marginTop: 'auto' }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                            <span style={{ display: 'inline-block', width: '8px', height: '8px', borderRadius: '50%', background: 'var(--burg-primary)' }} />
                            <span style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--burg-primary)' }}>
                              Technical Feasibility & QA Parameters
                            </span>
                          </div>
                          <span style={{ fontSize: '0.6875rem', fontWeight: 800, color: 'var(--ink)', background: 'var(--ivory)', padding: '0.25rem 0.6rem', borderRadius: '6px', border: '1px solid var(--border-light)' }}>
                            {p.code} Standard
                          </span>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.65rem' }}>
                          <div style={{ background: 'var(--ivory)', padding: '0.75rem 0.85rem', borderRadius: '10px', border: '1px solid var(--border-light)' }}>
                            <p style={{ fontSize: '0.625rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--muted)', margin: '0 0 0.15rem' }}>
                              Standard Baling
                            </p>
                            <p style={{ fontSize: '0.8125rem', fontWeight: 800, color: 'var(--ink)', margin: 0 }}>
                              {VERIFIED.baleWeight}
                            </p>
                          </div>
                          <div style={{ background: 'var(--ivory)', padding: '0.75rem 0.85rem', borderRadius: '10px', border: '1px solid var(--border-light)' }}>
                            <p style={{ fontSize: '0.625rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--muted)', margin: '0 0 0.15rem' }}>
                              Quality Verification
                            </p>
                            <p style={{ fontSize: '0.8125rem', fontWeight: 800, color: 'var(--ink)', margin: 0 }}>
                              100% In-House Tested
                            </p>
                          </div>
                        </div>

                        <div style={{ paddingTop: '0.5rem', borderTop: '1px solid var(--border-light)' }}>
                          <Link
                            href="/contact"
                            className="btn-secondary"
                            style={{ width: '100%', justifyContent: 'center', textAlign: 'center', fontSize: '0.75rem' }}
                          >
                            Request Specification & Sample
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                              <path d="M5 12h14M12 5l7 7-7 7" />
                            </svg>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    {/* Media / Video Showcase & Feasibility (Left) */}
                    <div
                      className="sp-anim"
                      style={{
                        background: 'var(--card-bg, #FFFFFF)',
                        border: '1px solid var(--border-light)',
                        borderRadius: '20px',
                        overflow: 'hidden',
                        boxShadow: '0 12px 36px rgba(10, 75, 184, 0.04)',
                        display: 'flex',
                        flexDirection: 'column',
                        height: '100%',
                      }}
                    >
                      {/* Photo or Video Player */}
                      {p.video ? (
                        <ProductVideoPlayer
                          src={p.video}
                          poster={p.image ?? '/images/process-fibre.jpg'}
                          alt={`${p.title} at the Gulf Fibre plant`}
                          title={p.title}
                          code={p.code}
                        />
                      ) : (
                        <div
                          className="product-media-showcase-container"
                          style={{
                            position: 'relative',
                            width: '100%',
                            flex: 1,
                            minHeight: '460px',
                            overflow: 'hidden',
                            background: '#071738',
                          }}
                        >
                          <Image
                            src={p.image ?? '/images/collection-rolls.jpg'}
                            alt={`${p.title} at the Gulf Fibre plant`}
                            fill
                            sizes="(max-width: 992px) 100vw, 48vw"
                            style={{ objectFit: 'cover' }}
                          />
                          <div
                            style={{
                              position: 'absolute',
                              top: '1rem',
                              left: '1rem',
                              background: 'rgba(10, 17, 40, 0.88)',
                              backdropFilter: 'blur(8px)',
                              padding: '0.4rem 0.85rem',
                              borderRadius: '9999px',
                              border: '1px solid rgba(255, 255, 255, 0.2)',
                              fontSize: '0.71875rem',
                              fontWeight: 800,
                              letterSpacing: '0.04em',
                              textTransform: 'uppercase',
                              color: '#FFFFFF',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '0.45rem',
                              zIndex: 2,
                              maxWidth: 'calc(100% - 4rem)',
                            }}
                          >
                            <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#22C55E', boxShadow: '0 0 8px #22C55E', display: 'inline-block', flexShrink: 0 }} />
                            <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{p.title}</span>
                          </div>
                        </div>
                      )}

                      {/* Feasibility Details */}
                      <div style={{ padding: '1.25rem 1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem', background: 'var(--card-bg)', marginTop: 'auto' }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                            <span style={{ display: 'inline-block', width: '8px', height: '8px', borderRadius: '50%', background: 'var(--burg-primary)' }} />
                            <span style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--burg-primary)' }}>
                              Technical Feasibility & QA Parameters
                            </span>
                          </div>
                          <span style={{ fontSize: '0.6875rem', fontWeight: 800, color: 'var(--ink)', background: 'var(--ivory)', padding: '0.25rem 0.6rem', borderRadius: '6px', border: '1px solid var(--border-light)' }}>
                            {p.code} Standard
                          </span>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.65rem' }}>
                          <div style={{ background: 'var(--ivory)', padding: '0.75rem 0.85rem', borderRadius: '10px', border: '1px solid var(--border-light)' }}>
                            <p style={{ fontSize: '0.625rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--muted)', margin: '0 0 0.15rem' }}>
                              Standard Baling
                            </p>
                            <p style={{ fontSize: '0.8125rem', fontWeight: 800, color: 'var(--ink)', margin: 0 }}>
                              {VERIFIED.baleWeight}
                            </p>
                          </div>
                          <div style={{ background: 'var(--ivory)', padding: '0.75rem 0.85rem', borderRadius: '10px', border: '1px solid var(--border-light)' }}>
                            <p style={{ fontSize: '0.625rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--muted)', margin: '0 0 0.15rem' }}>
                              Quality Verification
                            </p>
                            <p style={{ fontSize: '0.8125rem', fontWeight: 800, color: 'var(--ink)', margin: 0 }}>
                              100% In-House Tested
                            </p>
                          </div>
                        </div>

                        <div style={{ paddingTop: '0.5rem', borderTop: '1px solid var(--border-light)' }}>
                          <Link
                            href="/contact"
                            className="btn-secondary"
                            style={{ width: '100%', justifyContent: 'center', textAlign: 'center', fontSize: '0.75rem' }}
                          >
                            Request Specification & Sample
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                              <path d="M5 12h14M12 5l7 7-7 7" />
                            </svg>
                          </Link>
                        </div>
                      </div>
                    </div>

                    {/* Information / Specifications (Right) */}
                    <div
                      className="sp-anim"
                      style={{
                        background: 'var(--card-bg, #FFFFFF)',
                        border: '1px solid var(--border-light)',
                        borderRadius: '20px',
                        padding: 'clamp(1.35rem, 2.2vw, 1.85rem)',
                        boxShadow: '0 12px 36px rgba(10, 75, 184, 0.04)',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                      }}
                    >
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1rem', borderBottom: '1px solid var(--border-light)', paddingBottom: '0.75rem' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                            <span style={{ display: 'inline-block', width: '8px', height: '8px', borderRadius: '50%', background: 'var(--burg-primary)', flexShrink: 0 }} />
                            <span style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--burg-primary)' }}>
                              Verified Technical Specifications
                            </span>
                          </div>
                          <span
                            style={{
                              fontSize: '0.6875rem',
                              fontWeight: 800,
                              color: 'var(--ink)',
                              background: 'var(--ivory)',
                              padding: '0.25rem 0.6rem',
                              borderRadius: '6px',
                              border: '1px solid var(--border-light)',
                              whiteSpace: 'nowrap',
                              flexShrink: 0,
                            }}
                          >
                            Standard Baseline
                          </span>
                        </div>

                        <SpecRows rows={p.verifiedAttributes.map((a) => ({ key: a.label, value: <strong>{a.value}</strong> }))} />

                        <div style={{ marginTop: '1.25rem' }}>
                          <p style={{ fontSize: '0.6875rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--muted)', marginBottom: '0.5rem' }}>
                            Verified Applications
                          </p>
                          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.45rem' }} aria-label="Applications">
                            {p.appliedIn.map((a) => (
                              <Chip key={a}>{a}</Chip>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div style={{ paddingTop: '1.25rem', marginTop: '1.25rem', borderTop: '1px solid var(--border-light)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
                        <ArrowLink href="/contact">Enquire about {p.code}</ArrowLink>
                        <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--muted)' }}>
                          Batch COA Provided
                        </span>
                      </div>
                    </div>
                  </>
                )}
              </div>

              {/* Per-line manufacturing route - composed only from this line's
                  verified construction and the published production sequence. */}
              <div className="sp-route sp-anim" style={{ marginTop: 'clamp(2rem, 4vh, 3rem)', paddingTop: 'clamp(1.5rem, 3vh, 2.25rem)' }}>
                <p className="sp-cat" style={{ marginBottom: '1.25rem', fontSize: '0.875rem', letterSpacing: '0.1em' }}>
                  The route to {p.code} - how this line is made
                </p>
                <ol className="sp-route__list">
                  {(PRODUCT_ROUTES[p.id] ?? []).map((st, j) => (
                    <li className="sp-route__station" key={`${p.id}-${st.label}`}>
                      <span className="sp-route__num" aria-hidden="true">
                        {String(j + 1).padStart(2, '0')}
                      </span>
                      <div>
                        <h4 className="sp-route__label">{st.label}</h4>
                        <p className="sp-route__detail">{st.detail}</p>
                      </div>
                    </li>
                  ))}
                </ol>
                <p className="sp-small" style={{ marginTop: '1.25rem', fontSize: '0.8125rem', lineHeight: 1.6 }}>
                  Route assembled from the line&rsquo;s verified construction and the published production sequence -
                  per-grade parameters are order-specific and not published from a standing table.
                </p>
              </div>
            </div>
          </section>
        ))}

        {/* ── The floor, on film ────────────────────────────────────────── */}
        <section className="section-pad" data-sp-section style={{ background: 'var(--white)' }}>
          <div className="container">
            <div className="sp-anim">
              <SectionHead
                eyebrow="Inside The Plant"
                title="See the floor"
                em="before you buy from it"
                lede="A short film of the production environment. It loads only when you press play."
              />
            </div>
            <div className="sp-anim">
              <CompanyVideoScrollStory />
            </div>
          </div>
        </section>

        {/* ── Commercial terms ──────────────────────────────────────────── */}
        <section className="section-pad sp-dark" data-sp-section>
          <div className="container">
            <div className="sp-anim">
              <SectionHead
                eyebrow="Supply & Packing"
                title="How it ships"
                em="once it is agreed"
                lede="Packing, documentation and loading are handled in-house, which is what keeps a specification intact between our floor and your intake."
                dark
              />
            </div>
            <div className="sp-anim">
              <SpecRows rows={COMMERCIAL_TERMS.map((t) => ({ key: t.label, value: <strong>{t.value}</strong> }))} />
            </div>
          </div>
        </section>

        {/* ── Close ─────────────────────────────────────────────────────── */}
        <section className="section-pad" data-sp-section>
          <div className="container" style={{ textAlign: 'center' }}>
            <div className="sp-anim" style={{ marginBottom: '1.25rem' }}>
              <h2 className="h-section" style={{ margin: '0 auto', maxWidth: '24ch' }}>
                Tell us the count.
                <br />
                <em>We will quote the bale.</em>
              </h2>
            </div>
            <p className="sp-lede sp-anim" style={{ margin: '0 auto 2rem', maxWidth: '54ch' }}>
              Send denier, cut length, volume and destination. That is enough for a firm answer on feasibility and lead
              time.
            </p>
            <div className="sp-anim">
              <Link className="btn-primary" href="/contact">
                Start an enquiry
              </Link>
            </div>
          </div>
        </section>
      </div>
    </PageShell>
  )
}
