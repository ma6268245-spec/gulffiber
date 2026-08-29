'use client'

import { useEffect, useRef, useState } from 'react'

interface VideoItem {
  id: string
  title: string
  location: string
  src: string
  poster: string
  description: string
}

const VIDEOS: VideoItem[] = [
  {
    id: 'facility-tour',
    title: 'Plant Facility & Factory Operations',
    location: 'Lahore Manufacturing Plant',
    src: '/videos/company-page.mp4',
    poster: '/images/workshop-factory.jpg',
    description: 'Direct walk-through footage of plant grounds, raw PET flake ingestion, sorting lines, and logistics bays.',
  },
  {
    id: 'production-line',
    title: 'Fibre Extrusion & Spinning Machinery',
    location: 'High-Precision Extrusion Line',
    src: '/videos/product-hero.mp4',
    poster: '/images/process-fibre.jpg',
    description: 'Continuous melt filtration, multi-spinneret drawing, mechanical crimping, and automated baling in action.',
  },
]

function SingleVideoCard({ video }: { video: VideoItem }) {
  const [isPlaying, setIsPlaying] = useState(true)
  const [isMuted, setIsMuted] = useState(true)
  const [progress, setProgress] = useState(0)
  const videoRef = useRef<HTMLVideoElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = videoRef.current
    if (!el) return

    // Autoplay muted
    el.muted = true
    setIsMuted(true)
    el.play().catch(() => {})

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          el.pause()
          setIsPlaying(false)
        } else {
          el.play().catch(() => {})
          setIsPlaying(true)
        }
      },
      { threshold: 0.25 }
    )

    if (containerRef.current) io.observe(containerRef.current)
    return () => io.disconnect()
  }, [])

  const togglePlay = () => {
    const el = videoRef.current
    if (!el) return
    if (el.paused) {
      el.play().catch(() => {})
      setIsPlaying(true)
    } else {
      el.pause()
      setIsPlaying(false)
    }
  }

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation()
    const el = videoRef.current
    if (!el) return
    el.muted = !el.muted
    setIsMuted(el.muted)
  }

  const handleTimeUpdate = () => {
    const el = videoRef.current
    if (!el || !el.duration) return
    setProgress((el.currentTime / el.duration) * 100)
  }

  const toggleFullscreen = (e: React.MouseEvent) => {
    e.stopPropagation()
    const container = containerRef.current
    if (!container) return
    if (!document.fullscreenElement) {
      container.requestFullscreen?.().catch(() => {})
    } else {
      document.exitFullscreen?.().catch(() => {})
    }
  }

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        background: '#FFFFFF',
        borderRadius: '20px',
        border: '1px solid rgba(10, 75, 184, 0.12)',
        boxShadow: '0 16px 40px rgba(7, 20, 46, 0.07), 0 2px 8px rgba(7, 20, 46, 0.04)',
        overflow: 'hidden',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
      }}
    >
      {/* ── VIDEO CONTAINER ── */}
      <div
        ref={containerRef}
        onClick={togglePlay}
        style={{
          position: 'relative',
          width: '100%',
          aspectRatio: '16 / 9',
          background: '#040F26',
          cursor: 'pointer',
          overflow: 'hidden',
        }}
      >
        <video
          ref={videoRef}
          src={video.src}
          poster={video.poster}
          autoPlay
          playsInline
          muted={isMuted}
          loop
          onTimeUpdate={handleTimeUpdate}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />

        {/* Top Floating Badge */}
        <div
          style={{
            position: 'absolute',
            top: '0.85rem',
            left: '0.85rem',
            zIndex: 10,
            background: 'rgba(15, 23, 42, 0.85)',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.18)',
            borderRadius: '9999px',
            padding: '0.3rem 0.75rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.4rem',
            color: '#FFFFFF',
            fontSize: '0.6875rem',
            fontWeight: 700,
            pointerEvents: 'none',
          }}
        >
          <span
            style={{
              width: '6px',
              height: '6px',
              borderRadius: '50%',
              background: '#22C55E',
              boxShadow: '0 0 6px #22C55E',
              display: 'inline-block',
            }}
          />
          {video.location}
        </div>

        {/* Center Paused Indicator */}
        {!isPlaying && (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'rgba(4, 15, 38, 0.45)',
              backdropFilter: 'blur(3px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 15,
            }}
          >
            <div
              style={{
                width: '50px',
                height: '50px',
                borderRadius: '50%',
                background: '#0A4BB8',
                color: '#FFFFFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 8px 24px rgba(10, 75, 184, 0.6)',
                border: '2px solid rgba(255, 255, 255, 0.4)',
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" style={{ marginLeft: '2px' }}>
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </div>
        )}

        {/* Bottom Floating Minimal Control Bar */}
        <div
          style={{
            position: 'absolute',
            bottom: '0.65rem',
            left: '0.65rem',
            right: '0.65rem',
            zIndex: 20,
            background: 'rgba(15, 23, 42, 0.85)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            borderRadius: '10px',
            padding: '0.35rem 0.65rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '0.65rem',
            boxShadow: '0 6px 18px rgba(0, 0, 0, 0.35)',
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            {/* Play/Pause */}
            <button
              type="button"
              onClick={togglePlay}
              aria-label={isPlaying ? 'Pause' : 'Play'}
              style={{
                background: 'transparent',
                border: 'none',
                color: '#FFFFFF',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                padding: '0.15rem',
              }}
            >
              {isPlaying ? (
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                </svg>
              ) : (
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M8 5v14l11-7z" />
                </svg>
              )}
            </button>

            {/* Mute/Unmute */}
            <button
              type="button"
              onClick={toggleMute}
              aria-label={isMuted ? 'Unmute Audio' : 'Mute Audio'}
              style={{
                background: isMuted ? 'rgba(255, 255, 255, 0.12)' : 'rgba(10, 75, 184, 0.6)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                borderRadius: '9999px',
                padding: '0.2rem 0.55rem',
                color: '#FFFFFF',
                fontSize: '0.65rem',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.3rem',
              }}
            >
              {isMuted ? (
                <>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M11 5L6 9H2v6h4l5 4V5zM23 9l-6 6M17 9l6 6" />
                  </svg>
                  Muted
                </>
              ) : (
                <>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M11 5L6 9H2v6h4l5 4V5zM19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
                  </svg>
                  Sound On
                </>
              )}
            </button>
          </div>

          {/* Minimal Timeline */}
          <div
            style={{
              flex: 1,
              height: '3px',
              background: 'rgba(255, 255, 255, 0.2)',
              borderRadius: '9999px',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                height: '100%',
                width: `${progress}%`,
                background: '#38BDF8',
                borderRadius: '9999px',
                transition: 'width 0.1s linear',
              }}
            />
          </div>

          {/* Fullscreen */}
          <button
            type="button"
            onClick={toggleFullscreen}
            aria-label="Fullscreen"
            style={{
              background: 'transparent',
              border: 'none',
              color: '#FFFFFF',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              padding: '0.15rem',
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3" />
            </svg>
          </button>
        </div>
      </div>

      {/* ── INFO BAR BENEATH VIDEO ── */}
      <div style={{ padding: '1rem 1.25rem' }}>
        <h3
          style={{
            fontSize: '1rem',
            fontWeight: 800,
            color: '#0F172A',
            margin: '0 0 0.35rem',
            lineHeight: 1.3,
          }}
        >
          {video.title}
        </h3>
        <p
          style={{
            fontSize: '0.78rem',
            color: '#64748B',
            margin: 0,
            lineHeight: 1.45,
          }}
        >
          {video.description}
        </p>
      </div>
    </div>
  )
}

export function CompanyVideoScrollStory() {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: 'clamp(1rem, 2.5vw, 1.75rem)',
        maxWidth: '1120px',
        margin: '0 auto',
        width: '100%',
      }}
    >
      {VIDEOS.map((video) => (
        <SingleVideoCard key={video.id} video={video} />
      ))}
    </div>
  )
}
