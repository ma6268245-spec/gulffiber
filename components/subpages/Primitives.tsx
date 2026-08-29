'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef } from 'react'
import type { DataStatus } from '@/lib/data/company'

/* ===========================================================================
   SUBPAGE PRIMITIVES

   Every primitive here renders in the approved homepage's visual grammar:
   Inter + Cormorant Garamond only, sapphire `.eyebrow` with the 5-point star,
   900-weight uppercase headings with a serif italic accent, white hairline
   cards, 1.5rem grids, sapphire figures. Nothing on this page is a new design
   language, and no homepage file is imported or modified.

   `Blueprint`, `Coord` and the monospace treatments from the earlier draft are
   kept as exports but render nothing - the homepage has no such markers.
   =========================================================================== */

const ARROW = (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    aria-hidden="true"
    style={{ width: '14px', height: '14px', flexShrink: 0, display: 'inline-block' }}
  >
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
)

const STAR = (
  <svg width="10" height="10" viewBox="0 0 10 10" aria-hidden="true" focusable="false">
    <path d="M5 0 L6.1 3.9 L10 5 L6.1 6.1 L5 10 L3.9 6.1 L0 5 L3.9 3.9 Z" fill="currentColor" />
  </svg>
)

/** Homepage `.eyebrow`: sapphire, 0.6875rem, 0.14em tracking, star glyph. */
export function SectionLabel({
  children,
  accent = true,
}: {
  children: React.ReactNode
  /** Kept for API compatibility; the homepage eyebrow is always sapphire. */
  accent?: boolean
}) {
  void accent
  return (
    <span className="eyebrow">
      {STAR}
      {children}
    </span>
  )
}

/** Hairline divider, same weight and colour as the homepage's `.divider`. */
export function Rule({ className = '', style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <div
      className={className}
      aria-hidden="true"
      style={{ height: 1, background: 'var(--border-light)', width: '100%', ...style }}
    />
  )
}

/** Intentionally renders nothing: the homepage has no blueprint overlay. */
export function Blueprint() {
  return null
}

/** Intentionally renders nothing: the homepage has no coordinate markers. */
export function Coord(_props: { children: React.ReactNode; style?: React.CSSProperties }) {
  void _props
  return null
}

/** Small sequence number, in the homepage's sapphire uppercase micro-label. */
export function IndexMark({ children }: { children: React.ReactNode }) {
  return (
    <span
      style={{
        fontFamily: 'var(--font-sans)',
        fontSize: '0.5625rem',
        fontWeight: 700,
        letterSpacing: '0.12em',
        textTransform: 'uppercase',
        color: 'var(--burg-primary)',
      }}
    >
      {children}
    </span>
  )
}

export function Chip({ children, on = false }: { children: React.ReactNode; on?: boolean }) {
  return (
    <span className="sp-pill">
      {on && <span className="sp-pill-dot" aria-hidden="true" />}
      {children}
    </span>
  )
}

const STATUS_COPY: Record<DataStatus, string> = {
  VERIFIED: 'Verified',
  CONTENT_REQUIRED: 'Content required',
  PENDING_APPROVAL: 'Pending approval',
  DO_NOT_PUBLISH: 'Do not publish',
}

/**
 * Provenance marker. Only `VERIFIED` gets the green dot; everything else reads
 * as an open item so no unconfirmed figure can be mistaken for a fact.
 */
export function Provenance({ status }: { status: DataStatus }) {
  return (
    <span className={status === 'VERIFIED' ? 'sp-pill' : 'sp-slot-badge'}>
      {status === 'VERIFIED' && <span className="sp-pill-dot" aria-hidden="true" />}
      {STATUS_COPY[status]}
    </span>
  )
}

/**
 * A visible, labelled placeholder. Used wherever the repository has no verified
 * value or asset - never a fabricated number, claim or photograph.
 */
export function DataSlot({
  title,
  note,
  minHeight,
  status = 'CONTENT_REQUIRED',
}: {
  title: string
  note: string
  minHeight?: string
  status?: DataStatus
}) {
  return (
    <div className="sp-slot" style={minHeight ? { minHeight } : undefined}>
      <Provenance status={status} />
      <p className="sp-slot-title">{title}</p>
      <p className="sp-slot-note">{note}</p>
    </div>
  )
}

/**
 * Homepage section header row: eyebrow + 900-weight heading with an optional
 * Cormorant italic accent on the left, a 46ch paragraph and an optional ghost
 * arrow link on the right.
 */
export function SectionHead({
  eyebrow,
  title,
  em,
  lede,
  link,
  linkLabel = 'Learn more',
  dark = false,
  stacked = false,
}: {
  eyebrow: string
  title: string
  em?: string
  lede?: string
  link?: string
  linkLabel?: string
  dark?: boolean
  stacked?: boolean
}) {
  void dark
  if (stacked) {
    return (
      <div style={{ maxWidth: '820px', marginBottom: 'clamp(2rem, 4vh, 3rem)' }}>
        <div style={{ marginBottom: '0.85rem' }}>
          <SectionLabel>{eyebrow}</SectionLabel>
        </div>
        <h2 className="h-section" style={{ marginBottom: lede || link ? '0.85rem' : 0 }}>
          {title}
          {em && (
            <>
              {' '}
              <em>{em}</em>
            </>
          )}
        </h2>
        {lede && (
          <p
            className="sp-lede"
            style={{
              maxWidth: '62ch',
              margin: '0 0 1rem',
              lineHeight: 1.65,
              color: dark ? 'rgba(255, 255, 255, 0.72)' : 'var(--muted)',
            }}
          >
            {lede}
          </p>
        )}
        {link && (
          <div style={{ marginTop: '0.85rem' }}>
            <ArrowLink href={link}>{linkLabel}</ArrowLink>
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="sp-head">
      <div>
        <div style={{ marginBottom: '1.25rem' }}>
          <SectionLabel>{eyebrow}</SectionLabel>
        </div>
        <h2 className="h-section">
          {title}
          {em && (
            <>
              <br />
              <em>{em}</em>
            </>
          )}
        </h2>
      </div>
      {(lede || link) && (
        <div className="sp-head-aside">
          {lede && <p className="sp-lede">{lede}</p>}
          {link && (
            <div style={{ marginTop: '1.5rem' }}>
              <ArrowLink href={link}>{linkLabel}</ArrowLink>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export interface Stat {
  label: string
  value: string
}

/** Hairline stat strip, identical in weight to the homepage hero's. */
export function StatStrip({ items, style }: { items: Stat[]; style?: React.CSSProperties }) {
  return (
    <dl className="sp-stats" style={{ marginBottom: 0, ...style }}>
      {items.map((s) => (
        <div key={s.label} className="sp-stat">
          <dd className="sp-stat-num" style={{ margin: 0 }}>
            {s.value}
          </dd>
          <dt className="sp-stat-label">{s.label}</dt>
        </div>
      ))}
    </dl>
  )
}

/** Scroll-triggered count-up. Writes textContent, so React never re-renders. */
export function Counter({
  end,
  decimals = 0,
  comma = false,
  prefix = '',
  suffix = '',
  className = '',
  style,
}: {
  end: number
  decimals?: number
  comma?: boolean
  prefix?: string
  suffix?: string
  className?: string
  style?: React.CSSProperties
}) {
  const ref = useRef<HTMLSpanElement>(null)

  const format = (v: number) => {
    const n = decimals > 0 ? v.toFixed(decimals) : String(Math.round(v))
    const withCommas = comma ? Number(n).toLocaleString('en-US', { minimumFractionDigits: decimals }) : n
    return `${prefix}${withCommas}${suffix}`
  }

  useEffect(() => {
    const el = ref.current
    if (!el) return

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      el.textContent = format(end)
      return
    }

    let ctx: { revert: () => void } | undefined
    let cancelled = false

    const run = async () => {
      const { getGsap } = await import('@/lib/animations')
      const gsap = await getGsap()
      if (cancelled || !ref.current) return

      ctx = gsap.context(() => {
        const box = { v: 0 }
        gsap.to(box, {
          v: end,
          duration: 2,
          ease: 'power2.out',
          onUpdate: () => {
            if (ref.current) ref.current.textContent = format(box.v)
          },
          scrollTrigger: { trigger: ref.current!, start: 'top 90%', once: true },
        })
      }, ref)
    }

    run()
    return () => {
      cancelled = true
      if (ctx) ctx.revert()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [end, decimals, comma, prefix, suffix])

  return (
    <span ref={ref} className={className} style={style}>
      {format(0)}
    </span>
  )
}

/** Homepage `.btn-ghost` arrow link. */
export function ArrowLink({
  href,
  children,
  external = false,
}: {
  href: string
  children: React.ReactNode
  external?: boolean
}) {
  if (external) {
    return (
      <a className="btn-ghost" href={href} target="_blank" rel="noopener noreferrer">
        {children}
        {ARROW}
      </a>
    )
  }
  return (
    <Link className="btn-ghost" href={href}>
      {children}
      {ARROW}
    </Link>
  )
}

/**
 * Framed figure. Only assets that exist in /public are ever passed here; when
 * an asset is missing the caller renders a DataSlot instead of a fabricated
 * image.
 */
export function FigureFrame({
  src,
  alt,
  caption,
  ratio = '4 / 3',
  priority = false,
  sizes = '(max-width: 992px) 100vw, 50vw',
  zoom = true,
}: {
  src: string
  alt: string
  caption?: string
  ratio?: string
  priority?: boolean
  sizes?: string
  zoom?: boolean
}) {
  return (
    <figure style={{ margin: 0 }}>
      <div
        className={zoom ? 'sp-tile' : undefined}
        style={{
          position: 'relative',
          aspectRatio: ratio,
          overflow: 'hidden',
          border: '1px solid var(--border-light)',
          background: 'var(--white)',
          minHeight: 0,
        }}
      >
        <Image src={src} alt={alt} fill sizes={sizes} priority={priority} style={{ objectFit: 'cover' }} />
      </div>
      {caption && (
        <figcaption className="sp-small" style={{ marginTop: '0.75rem' }}>
          {caption}
        </figcaption>
      )}
    </figure>
  )
}

/**
 * Image tile with the homepage ProductCollection treatment: bottom scrim,
 * white category / title / description, 1.05 image zoom on hover.
 */
export function PhotoTile({
  href,
  src,
  alt,
  category,
  title,
  description,
  sizes = '(max-width: 600px) 100vw, (max-width: 992px) 50vw, 33vw',
}: {
  href?: string
  src: string
  alt: string
  category?: string
  title: string
  description?: string
  sizes?: string
}) {
  const inner = (
    <>
      <Image src={src} alt={alt} fill sizes={sizes} />
      <div className="sp-tile-scrim" aria-hidden="true" />
      <div className="sp-tile-body">
        {category && <span className="sp-tile-cat">{category}</span>}
        <h3 className="sp-tile-title">{title}</h3>
        {description && <p className="sp-tile-desc">{description}</p>}
      </div>
    </>
  )

  if (href) {
    return (
      <Link className="sp-tile" href={href}>
        {inner}
      </Link>
    )
  }
  return <div className="sp-tile">{inner}</div>
}

/** White hairline card, 1.5rem body, optional footer row - as on the homepage. */
export function InfoCard({
  category,
  title,
  body,
  footKey,
  footValue,
  icon,
  children,
}: {
  category?: string
  title: string
  body?: string
  footKey?: string
  footValue?: React.ReactNode
  icon?: React.ReactNode
  children?: React.ReactNode
}) {
  return (
    <article className="sp-card">
      <div className="sp-card-body">
        {icon && <div className="sp-icon">{icon}</div>}
        {category && <span className="sp-cat">{category}</span>}
        <h3 className="sp-card-title">{title}</h3>
        {body && <p className="sp-small">{body}</p>}
        {children}
        {(footKey || footValue) && (
          <div className="sp-card-foot">
            {footKey && <span className="sp-card-foot-key">{footKey}</span>}
            {footValue && <span className="sp-small">{footValue}</span>}
          </div>
        )}
      </div>
    </article>
  )
}

/** Definition rows: sapphire uppercase key, ink/muted value, hairline rules. */
export function SpecRows({ rows }: { rows: { key: string; value: React.ReactNode }[] }) {
  return (
    <dl className="sp-rows" style={{ marginBottom: 0 }}>
      {rows.map((r) => (
        <div className="sp-row" key={r.key}>
          <dt className="sp-row-key">{r.key}</dt>
          <dd className="sp-row-val" style={{ margin: 0 }}>
            {r.value}
          </dd>
        </div>
      ))}
    </dl>
  )
}

/**
 * Tabular data in the homepage's typography. Kept API-compatible with the
 * earlier draft so existing callers continue to work.
 */
export function SpecTable({
  caption,
  columns,
  rows,
}: {
  caption?: React.ReactNode
  columns: string[]
  rows: (string | React.ReactNode)[][]
}) {
  const cell: React.CSSProperties = {
    padding: '0.85rem 1rem',
    borderBottom: '1px solid var(--border-light)',
    fontSize: '0.875rem',
    lineHeight: 1.6,
    color: 'var(--muted)',
    textAlign: 'left',
    verticalAlign: 'top',
  }
  const head: React.CSSProperties = {
    ...cell,
    fontSize: '0.5625rem',
    fontWeight: 700,
    letterSpacing: '0.12em',
    textTransform: 'uppercase',
    color: 'var(--burg-primary)',
  }

  return (
    <div style={{ overflowX: 'auto', background: 'var(--white)', border: '1px solid var(--border-light)' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '38rem' }}>
        {caption && (
          <caption className="sp-small" style={{ captionSide: 'bottom', padding: '0.85rem 1rem', textAlign: 'left' }}>
            {caption}
          </caption>
        )}
        <thead>
          <tr>
            {columns.map((c) => (
              <th key={c} scope="col" style={head}>
                {c}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i}>
              {r.map((c, j) =>
                j === 0 ? (
                  <th key={j} scope="row" style={{ ...cell, fontWeight: 700, color: 'var(--ink)' }}>
                    {c}
                  </th>
                ) : (
                  <td key={j} style={cell}>
                    {c}
                  </td>
                )
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
