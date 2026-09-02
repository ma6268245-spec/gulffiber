'use client'

import { useState } from 'react'
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
          src={DIRECTOR.portrait || '/images/specialist-avatar.jpg'}
          alt={`${DIRECTOR.name ?? 'Founder & Director'} - Gulf Fiber`}
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
            fontSize: 'clamp(1.25rem, 2.3vw, 1.85rem)',
            lineHeight: 1.45,
            color: 'var(--ink)',
            margin: '0 0 1.75rem',
          }}
        >
          {DIRECTOR.bio}
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

function PersonContactActions({ contact, name, role }: { contact: string; name?: string | null; role?: string | null }) {
  const [copied, setCopied] = useState(false)
  const cleanNumber = contact.replace(/[^\d+]/g, '')
  const whatsappDigits = contact.replace(/\D/g, '')
  const waUrl = `https://wa.me/${whatsappDigits}?text=${encodeURIComponent(`Hello ${name ?? 'Team'}${role ? ` (${role})` : ''}, I am inquiring about Gulf Fiber materials.`)}`

  const handleCopy = async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    try {
      await navigator.clipboard.writeText(contact)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {}
  }

  return (
    <div
      className="sp-person-actions"
      style={{
        marginTop: 'auto',
        paddingTop: '0.85rem',
        display: 'flex',
        flexWrap: 'wrap',
        gap: '0.45rem',
        alignItems: 'center',
      }}
    >
      {/* Direct Call Link */}
      <a
        href={`tel:${cleanNumber}`}
        className="sp-person-btn sp-person-btn--call"
        title={`Call ${name ?? ''}`}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.4rem',
          padding: '0.38rem 0.75rem',
          borderRadius: '9999px',
          background: 'rgba(10, 75, 184, 0.08)',
          border: '1px solid rgba(10, 75, 184, 0.22)',
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
        <span>{contact}</span>
      </a>

      {/* Direct WhatsApp Action */}
      <a
        href={waUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="sp-person-btn sp-person-btn--wa"
        title={`Chat on WhatsApp with ${name ?? ''}`}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.35rem',
          padding: '0.38rem 0.75rem',
          borderRadius: '9999px',
          background: 'rgba(37, 211, 102, 0.12)',
          border: '1px solid rgba(37, 211, 102, 0.35)',
          color: '#128C7E',
          fontSize: '0.75rem',
          fontFamily: 'var(--font-sans)',
          fontWeight: 800,
          letterSpacing: '0.02em',
          textDecoration: 'none',
          transition: 'all 0.2s ease',
        }}
      >
        <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.664-.698c.969.586 1.761.884 2.796.885h.005c3.179 0 5.766-2.586 5.767-5.767.001-3.18-2.584-5.771-5.772-5.771zm3.374 8.163c-.144.405-.837.774-1.17.825-.311.05-.712.068-2.288-.583-1.637-.677-2.673-2.348-2.753-2.457-.081-.109-.665-.884-.665-1.686 0-.802.42-1.196.57-1.356.15-.16.327-.2.436-.2.11 0 .219.002.316.006.102.005.239-.039.373.285.141.341.482 1.176.524 1.263.042.087.071.19.012.308-.059.117-.089.19-.176.292-.088.102-.185.228-.264.307-.088.088-.18.183-.078.358.102.175.454.748.974 1.212.67.597 1.235.782 1.41.87.175.088.277.073.38-.044.103-.117.436-.508.552-.682.117-.175.233-.146.393-.087.16.059 1.016.479 1.191.566.175.088.292.131.335.204.044.073.044.423-.1 1.028z" />
        </svg>
        <span>WhatsApp</span>
      </a>

      {/* Copy Number Action */}
      <button
        type="button"
        onClick={handleCopy}
        className="sp-person-btn sp-person-btn--copy"
        aria-label="Copy phone number to clipboard"
        title="Copy phone number to clipboard"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.35rem',
          padding: '0.38rem 0.65rem',
          borderRadius: '9999px',
          background: copied ? 'var(--accent-green, #12B76A)' : 'var(--white)',
          border: copied ? '1px solid var(--accent-green, #12B76A)' : '1px solid var(--border-light)',
          color: copied ? '#FFFFFF' : 'var(--muted)',
          fontSize: '0.71875rem',
          fontFamily: 'var(--font-sans)',
          fontWeight: 700,
          cursor: 'pointer',
          transition: 'all 0.2s ease',
        }}
      >
        {copied ? (
          <>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
            <span>Copied!</span>
          </>
        ) : (
          <>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
            </svg>
            <span>Copy</span>
          </>
        )}
      </button>
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
              <PersonContactActions contact={person.contact} name={person.name} role={person.role} />
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
