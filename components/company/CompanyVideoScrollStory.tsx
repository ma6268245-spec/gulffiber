'use client'

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'

const POSTER = '/images/workshop-factory.jpg'

/**
 * Company story film.
 *
 * Presented exactly the way the homepage presents film: a full-width image with
 * a dark scrim and a 5rem circular sapphire play button. Nothing bespoke.
 *
 * The source file is ~45 MB, so it is never preloaded and never scrubbed: it
 * loads only when the user asks for it, and it pauses whenever it leaves the
 * viewport.
 *
 * All copy here is limited to what lib/data/company.ts verifies.
 */
export function CompanyVideoScrollStory() {
  const [playing, setPlaying] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const el = videoRef.current
    if (!el || !playing) return

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) el.pause()
      },
      { threshold: 0.25 }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [playing])

  return (
    <div
      style={{
        position: 'relative',
        aspectRatio: '16 / 9',
        overflow: 'hidden',
        background: 'var(--burg-darker)',
        border: '1px solid var(--border-light)',
      }}
    >
      {playing ? (
        <video
          ref={videoRef}
          src="/videos/company-story.mp4"
          poster={POSTER}
          controls
          autoPlay
          playsInline
          preload="none"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
        />
      ) : (
        <>
          <Image
            src={POSTER}
            alt="Gulf Fibre production floor"
            fill
            sizes="(max-width: 992px) 100vw, 70vw"
            style={{ objectFit: 'cover' }}
          />
          <div
            aria-hidden="true"
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(to top, rgba(4, 15, 38, 0.7) 0%, rgba(4, 15, 38, 0.25) 60%)',
            }}
          />
          <button type="button" className="sp-play" onClick={() => setPlaying(true)} aria-label="Play the company film">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M8 5v14l11-7z" />
            </svg>
          </button>
          <p
            className="sp-small"
            style={{
              position: 'absolute',
              inset: 'auto 1.5rem 1.5rem 1.5rem',
              color: 'rgba(255, 255, 255, 0.7)',
              margin: 0,
            }}
          >
            Company film - approx. 45 MB, loaded only when you press play.
          </p>
        </>
      )}
    </div>
  )
}
