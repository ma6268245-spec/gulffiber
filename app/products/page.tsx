'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useRef } from 'react'
import { PageHero } from '@/components/subpages/PageHero'
import { PageShell } from '@/components/subpages/PageShell'
import { ScrollProductScene } from '@/components/subpages/ScrollProductScene'
import { ProcessScrollChapter } from '@/components/subpages/ProcessScrollChapter'
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
import type { SceneVariant } from '@/components/three/materialScene'

/* ===========================================================================
   /products - redesigned
   ---------------------------------------------------------------------------
   Editorial grammar of the frozen homepage (numbered index rows, hairlines,
   sapphire eyebrows, 900-weight uppercase headings with Cormorant italic
   accent) plus the two new layers this page asked for:
     1. Scroll-driven 3D product visualisations - each product line gets a
        scene whose material behaviour is scrubbed by scroll (wadding lofts,
        felt compacts, interlining weaves, staple fibre opens).
     2. A pinned 3D "how it is made" chapter - the four verified production
        stages played as one continuous scroll sequence - and the company film.
   Data discipline is unchanged: every attribute comes from
   lib/data/company.ts; anything unverified renders as a labelled slot.
   =========================================================================== */

/** Scroll-scrubbed scene per product line - behaviour each line is known for. */
const SCENE: Record<string, SceneVariant> = {
  'psf-regenerated': 'bundle',
  'psf-virgin': 'bundle',
  wadding: 'loft',
  felt: 'felt',
  interlining: 'weave',
}

const SCENE_CAPTION: Record<string, string> = {
  'psf-regenerated': 'Scroll to open the baled bundle and read the crimped cross-section - indicative visualisation, not a measured rendering of a grade.',
  'psf-virgin': 'Scroll to inspect the conjugate hollow structure and 3D spiral crimp - indicative visualisation of filling loft recovery.',
  wadding: 'Scroll to loft the wadding - layers gain height and volume, then recover. Indicative visualisation of thermal-bonded behaviour.',
  felt: 'Scroll to compact the felt - loose fibre interlocks under needling into a dimensionally stable mat. Indicative visualisation.',
  interlining: 'Scroll to interlace the lattice - warp and weft strands lock into a woven structure. Indicative visualisation.',
}

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

        {/* ── Line-by-line deep dives with scroll-driven 3D scenes ──────── */}
        {PRODUCT_LINES.map((p, i) => (
          <section
            className="section-pad"
            data-sp-section
            id={p.id}
            key={p.id}
            style={{ background: i % 2 === 0 ? 'var(--ivory)' : 'var(--white)' }}
          >
            <div className="container">
              <div className="sp-deep">
                <div className="sp-deep__aside sp-anim">
                  <span className="sp-cat">{p.code}</span>
                  <h2 className="h-section">{p.title}</h2>
                  <p className="sp-body">{p.positioning}</p>
                  <SpecRows rows={p.verifiedAttributes.map((a) => ({ key: a.label, value: <strong>{a.value}</strong> }))} />
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }} aria-label="Applications">
                    {p.appliedIn.map((a) => (
                      <Chip key={a}>{a}</Chip>
                    ))}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', flexWrap: 'wrap' }}>
                    <ArrowLink href="/contact">Enquire about {p.code}</ArrowLink>
                    <Provenance status={p.status} />
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  <div className="sp-anim">
                    <ScrollProductScene
                      variant={SCENE[p.id] ?? 'bundle'}
                      photo={p.image ?? '/images/collection-rolls.jpg'}
                      photoAlt={`${p.title} produced by Gulf Fibre`}
                      caption={SCENE_CAPTION[p.id]}
                    />
                  </div>
                  
                  <figure style={{ margin: 0 }} className="sp-anim">
                    <div
                      style={{
                        position: 'relative',
                        aspectRatio: '16 / 9',
                        overflow: 'hidden',
                        borderRadius: '16px',
                        border: '1px solid var(--border-light)',
                      }}
                    >
                      <Image
                        src={p.image ?? '/images/collection-rolls.jpg'}
                        alt={`${p.title} at the Gulf Fibre plant`}
                        fill
                        sizes="(max-width: 992px) 100vw, 46vw"
                        style={{ objectFit: 'cover' }}
                      />
                    </div>
                    <figcaption className="sp-small" style={{ marginTop: '0.5rem' }}>
                      {p.title} — production photograph.
                    </figcaption>
                  </figure>

                  <div
                    className="sp-anim"
                    style={{
                      background: 'var(--card-bg, #FFFFFF)',
                      border: '1px solid var(--border-light)',
                      borderRadius: '16px',
                      padding: '1.15rem 1.35rem',
                      boxShadow: '0 4px 16px rgba(10, 75, 184, 0.04)',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', marginBottom: '0.35rem' }}>
                      <span style={{ display: 'inline-block', width: '6px', height: '6px', borderRadius: '50%', background: 'var(--burg-primary)' }} />
                      <span style={{ fontSize: '0.6875rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--burg-primary)' }}>
                        Technical Specification & Feasibility
                      </span>
                    </div>
                    <p style={{ fontSize: '0.8125rem', lineHeight: 1.6, color: 'var(--muted)', margin: 0 }}>
                      {p.specSlot}
                    </p>
                  </div>
                </div>
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

        {/* ── How it is made - pinned 3D scroll chapter ─────────────────── */}
        <ProcessScrollChapter photo="/images/process-fibre.jpg" photoAlt="Polyester fibre production at the Gulf Fibre plant" />

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
