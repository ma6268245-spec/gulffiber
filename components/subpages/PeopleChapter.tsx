'use client'

import Image from 'next/image'
import { DataSlot } from '@/components/subpages/Primitives'
import { DIRECTOR, FOUNDERS, MANAGEMENT, type PersonSlot } from '@/lib/data/company'

/* ===========================================================================
   PEOPLE CHAPTERS (Company page - director, founders, management)
   ---------------------------------------------------------------------------
   The brief asks for a director with a separate visual presence, a founders
   section and a management grid. No named individual, portrait, role or
   message is verified in this repository, so each person renders as a
   structured frame - a real portrait slot, a name slot, a role slot - that
   states exactly what to supply. The structure is the deliverable: fill the
   PersonSlot fields in lib/data/company.ts and the frames become the real
   sections without touching a component.

   Portrait frames are deliberately empty outlines with a person glyph - never
   a generated face that could be mistaken for a photograph of a real person.
   =========================================================================== */

const PERSON_GLYPH = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" aria-hidden="true">
    <circle cx="12" cy="7.5" r="3.75" />
    <path d="M3.75 21c0-4.5 3.75-7.5 8.25-7.5s8.25 3 8.25 7.5" />
  </svg>
)

/** Portrait slot: the real photograph when it exists, an honest frame when not. */
function Portrait({ person, ratio = '4 / 5' }: { person: PersonSlot; ratio?: string }) {
  return (
    <div
      className="sp-person__photo"
      style={{
        position: 'relative',
        width: '100%',
        aspectRatio: ratio,
        borderRadius: '16px',
        overflow: 'hidden',
        background: 'var(--burg-darker)',
        border: '1px solid rgba(10, 75, 184, 0.15)',
        boxShadow: '0 8px 24px rgba(10, 75, 184, 0.08)',
      }}
    >
      {person.portrait ? (
        <Image
          src={person.portrait}
          alt={`${person.name ?? 'Portrait'} - ${person.role ?? ''}`.trim()}
          fill
          sizes="(max-width: 992px) 100vw, (max-width: 1400px) 40vw, 360px"
          style={{ objectFit: 'cover', objectPosition: 'center 15%' }}
        />
      ) : (
        <div className="sp-person__placeholder">
          {PERSON_GLYPH}
          <span>{person.placeholderKey}</span>
        </div>
      )}
    </div>
  )
}

/** Chapter 04 - the director gets a dedicated, authoritative presence. */
export function DirectorFeature() {
  return (
    <div
      className="sp-director"
      style={{
        display: 'grid',
        gridTemplateColumns: 'minmax(280px, 360px) 1fr',
        gap: 'clamp(2rem, 5vw, 4.5rem)',
        alignItems: 'center',
        background: 'var(--card-bg)',
        padding: 'clamp(1.75rem, 3.5vw, 3rem)',
        borderRadius: '24px',
        border: '1px solid var(--border-light)',
        boxShadow: '0 12px 40px rgba(10, 75, 184, 0.05)',
      }}
    >
      <div
        className="sp-director__portrait"
        style={{
          position: 'relative',
          width: '100%',
          aspectRatio: '4 / 5',
          borderRadius: '20px',
          overflow: 'hidden',
          background: 'var(--burg-darker)',
          border: '2px solid rgba(10, 75, 184, 0.18)',
          boxShadow: '0 16px 36px rgba(10, 75, 184, 0.12)',
        }}
      >
        <Image
          src={DIRECTOR.portrait || '/images/specialist-avatar.jpg'}
          alt={`${DIRECTOR.name ?? 'Founder & Director'} - Gulf Fibre`}
          fill
          sizes="(max-width: 992px) 100vw, 360px"
          style={{ objectFit: 'cover', objectPosition: 'center 15%' }}
          priority
        />
      </div>

      <div className="sp-director__body">
        <span
          style={{
            fontSize: '3.5rem',
            lineHeight: 0.8,
            fontFamily: 'var(--font-serif)',
            color: 'var(--burg-primary)',
            display: 'block',
            marginBottom: '1rem',
            opacity: 0.85,
          }}
          aria-hidden="true"
        >
          &ldquo;
        </span>
        <blockquote
          style={{
            fontFamily: 'var(--font-serif)',
            fontStyle: 'italic',
            fontSize: 'clamp(1.35rem, 2.2vw, 1.85rem)',
            lineHeight: 1.4,
            color: 'var(--ink)',
            margin: '0 0 1.75rem',
          }}
        >
          {DIRECTOR.bio}
          <span style={{ color: 'var(--burg-primary)', fontStyle: 'normal', marginLeft: '0.15em' }}>
            &rdquo;
          </span>
        </blockquote>

        <div>
          <h3
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '1.25rem',
              fontWeight: 900,
              letterSpacing: '-0.01em',
              textTransform: 'uppercase',
              color: 'var(--ink)',
              margin: '0 0 0.25rem',
            }}
          >
            {DIRECTOR.name}
          </h3>
          <p
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '0.8125rem',
              fontWeight: 800,
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              color: 'var(--burg-primary)',
              margin: 0,
            }}
          >
            {DIRECTOR.role}
          </p>
        </div>
      </div>
    </div>
  )
}

/** A single founder or manager card. */
export function PersonCard({ person }: { person: PersonSlot }) {
  return (
    <article className="sp-person">
      <Portrait person={person} />
      <div className="sp-person__body">
        {person.name ? (
          <>
            <h3 className="sp-person__name">{person.name}</h3>
            <p className="sp-person__role" style={{ minHeight: '2.4rem', display: 'flex', alignItems: 'flex-start' }}>
              {person.role}
            </p>
            {person.bio && (
              <p className="sp-small" style={{ margin: '0.4rem 0 0', flex: 1 }}>
                {person.bio}
              </p>
            )}
            {person.contact && (
              <div style={{ marginTop: 'auto', paddingTop: '0.85rem' }}>
                <a
                  href={`tel:${person.contact.replace(/[^\d+]/g, '')}`}
                  className="sp-person-phone-pill"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.45rem',
                    padding: '0.38rem 0.85rem',
                    borderRadius: '9999px',
                    background: 'rgba(10, 75, 184, 0.08)',
                    border: '1px solid rgba(10, 75, 184, 0.2)',
                    color: 'var(--burg-primary)',
                    fontSize: '0.75rem',
                    fontFamily: 'var(--font-sans)',
                    fontWeight: 800,
                    letterSpacing: '0.02em',
                    textDecoration: 'none',
                    transition: 'all 0.2s ease',
                  }}
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                  {person.contact}
                </a>
              </div>
            )}
          </>
        ) : (
          <DataSlot title="Name, designation and portrait" note={person.note} status={person.status} />
        )}
      </div>
    </article>
  )
}

/** Chapter 05 - founders. */
export function FoundersSection() {
  return (
    <div className="sp-grid-2">
      {FOUNDERS.map((p) => (
        <PersonCard person={p} key={p.id} />
      ))}
    </div>
  )
}

/** Chapter 06 - management. */
export function ManagementSection() {
  return (
    <div className="sp-grid-3">
      {MANAGEMENT.map((p) => (
        <PersonCard person={p} key={p.id} />
      ))}
    </div>
  )
}
