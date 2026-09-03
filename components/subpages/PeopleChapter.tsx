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
export function DirectorFeature({ person = DIRECTOR }: { person?: PersonSlot } = {}) {
  const paragraphs = person.message
  return (
    <div
      className="sp-director"
      style={{
        background: 'var(--card-bg)',
        padding: 'clamp(1.75rem, 4vw, 3.25rem)',
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
          src={person.portrait || '/images/specialist-avatar.jpg'}
          alt={`${person.name ?? 'Founder & Director'} - Gulf Fiber`}
          fill
          sizes="(max-width: 992px) 100vw, 360px"
          style={{ objectFit: 'cover', objectPosition: 'center 15%' }}
          priority
        />
      </div>

      <div className="sp-director__body">
        <span
          style={{
            fontSize: 'clamp(4.5rem, 9vw, 6.5rem)',
            lineHeight: 0.6,
            fontFamily: 'var(--font-serif)',
            color: 'var(--burg-primary)',
            display: 'block',
            marginBottom: '0.75rem',
            opacity: 0.9,
          }}
          aria-hidden="true"
        >
          &ldquo;
        </span>
        <blockquote
          style={{
            fontFamily: 'var(--font-serif)',
            fontStyle: 'italic',
            /* A multi-paragraph signed letter reads at body scale; the single-sentence
               bio keeps the original pull-quote scale. Layout/grid are untouched. */
            fontSize: paragraphs ? 'clamp(1rem, 1.15vw, 1.0625rem)' : 'clamp(1.25rem, 2.3vw, 1.85rem)',
            lineHeight: paragraphs ? 1.7 : 1.45,
            color: 'var(--ink)',
            margin: '0 0 1.75rem',
          }}
        >
          {paragraphs
            ? paragraphs.map((para, i) => (
                <p key={para} style={{ margin: i === paragraphs.length - 1 ? 0 : '0 0 1em' }}>
                  {para}
                </p>
              ))
            : person.bio}
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
            {person.name}
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
            {person.role}
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
