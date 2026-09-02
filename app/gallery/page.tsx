'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useRef } from 'react'
import { PageHero } from '@/components/subpages/PageHero'
import { PageShell } from '@/components/subpages/PageShell'
import { GalleryGrid } from '@/components/subpages/GalleryGrid'
import { SectionHead } from '@/components/subpages/Primitives'
import { useSectionReveal } from '@/components/subpages/useSectionReveal'
import { GALLERY_ITEMS, GALLERY_CATEGORIES } from '@/lib/data/gallery'
import { VERIFIED } from '@/lib/data/company'

/* ===========================================================================
   /gallery - the visual archive
   ---------------------------------------------------------------------------
   Not an image grid: the archive of what Gulf Fiber actually looks like -
   factory, materials, manufacturing, products, quality, people and
   sustainability. Real photographs render; anything the repository does not
   hold renders as a labelled frame that says what to supply. The client adds
   a photograph to lib/data/gallery.ts and the tile, lightbox and search all
   pick it up - no redesign, no fake events, no generated employees.
   =========================================================================== */

const VERIFIED_COUNT = GALLERY_ITEMS.filter((i) => i.status === 'VERIFIED').length

export default function GalleryPage() {
  const scope = useRef<HTMLDivElement>(null)
  useSectionReveal(scope)

  return (
    <PageShell>
      <div ref={scope}>
        <PageHero
          eyebrow="The Visual Archive"
          lines={[{ text: 'What the company' }, { text: 'actually' }, { text: 'looks like', serif: true }]}
          lede="Explore the authentic visual archive of Gulf Fiber: plant facilities, extrusion and spinning lines, heavy machinery, materials, finished product lines, and rooftop solar installations."
          meta={[
            { label: 'Categories', value: String(GALLERY_CATEGORIES.length - 1) },
            { label: 'Archive entries', value: String(GALLERY_ITEMS.length) },
            { label: 'Photographs held', value: String(VERIFIED_COUNT) },
            { label: 'Established', value: String(VERIFIED.established) },
          ]}
          aside={
            <Image
              src="/images/Gallery/16.jpeg"
              alt="Gulf Fiber Company corporate entrance and main gate"
              fill
              priority
              sizes="(max-width: 992px) 100vw, 48vw"
              style={{ objectFit: 'cover' }}
            />
          }
        >
          <Link className="btn-primary" href="/contact">
            Request a sample
          </Link>
        </PageHero>

        {/* ── The archive ──────────────────────────────────────────────── */}
        <section className="section-pad" data-sp-section style={{ background: 'var(--white)' }}>
          <div className="container">
            <div className="sp-anim">
              <SectionHead
                eyebrow="The Archive"
                title="Browse the"
                em="record"
                lede="Filter by category, open any tile for the full frame, its metadata and the page it belongs to. Arrow keys browse inside the viewer."
              />
            </div>
            <div className="sp-anim">
              <GalleryGrid />
            </div>
          </div>
        </section>

        {/* ── How the archive grows ────────────────────────────────────── */}
        <section className="section-pad sp-dark" data-sp-section>
          <div className="container">
            <div className="sp-anim">
              <SectionHead
                eyebrow="Growing The Archive"
                title="Every frame"
                em="is a slot"
                lede="Each labelled frame names the photograph it waits for. Supply the image - it drops into lib/data/gallery.ts - and the tile, the lightbox and the global search pick it up without another change."
              />
            </div>
            <div className="sp-anim">
              <ol className="sp-steps">
                <li className="sp-step">
                  <span className="sp-step-num" aria-hidden="true">01</span>
                  <div>
                    <h3 className="sp-step-title">Supply the photograph</h3>
                    <p className="sp-body">
                      Plant, material, product, laboratory or approved people photography - tagged with the category it belongs to.
                    </p>
                  </div>
                </li>
                <li className="sp-step">
                  <span className="sp-step-num" aria-hidden="true">02</span>
                  <div>
                    <h3 className="sp-step-title">Fill one entry</h3>
                    <p className="sp-body">
                      The image path, a one-line description and the real alt text replace the placeholder in the archive data.
                    </p>
                  </div>
                </li>
                <li className="sp-step">
                  <span className="sp-step-num" aria-hidden="true">03</span>
                  <div>
                    <h3 className="sp-step-title">The page does the rest</h3>
                    <p className="sp-body">
                      The tile renders, the lightbox reads it, the filter counts update, and the entry becomes discoverable in search.
                    </p>
                  </div>
                </li>
              </ol>
            </div>
          </div>
        </section>

        {/* ── Close ────────────────────────────────────────────────────── */}
        <section className="section-pad" data-sp-section>
          <div className="container" style={{ textAlign: 'center' }}>
            <div className="sp-anim" style={{ marginBottom: '1.25rem' }}>
              <h2 className="h-section" style={{ margin: '0 auto', maxWidth: '24ch' }}>
                See the material
                <br />
                <em>in your own laboratory.</em>
              </h2>
            </div>
            <p className="sp-lede sp-anim" style={{ margin: '0 auto 2rem', maxWidth: '54ch' }}>
              The archive shows the plant; a sample shows the material. Both are one enquiry away.
            </p>
            <div className="sp-anim">
              <Link className="btn-primary" href="/contact">
                Request a sample
              </Link>
            </div>
          </div>
        </section>
      </div>
    </PageShell>
  )
}
