'use client'

import { useEffect, useRef, useState } from 'react'

const VIDEO_SRC = '/videos/company-page.mp4'
const POSTER = '/images/workshop-factory.jpg'

export function CompanyVideoScrollStory() {
  const [isPlaying, setIsPlaying] = useState(true)
  const [isMuted, setIsMuted] = useState(true)
  const [progress, setProgress] = useState(0)
  const videoRef = useRef<HTMLVideoElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = videoRef.current
    if (!el) return

    // Attempt autoplay immediately (muted is required by browsers for autoplay)
    el.muted = true
    setIsMuted(true)
    el.play().catch(() => {})

    // Intersection observer to pause when offscreen and play when visible
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
      ref={containerRef}
      style={{
        position: 'relative',
        maxWidth: '920px',
        margin: '0 auto',
        aspectRatio: '16 / 9',
        borderRadius: '20px',
        overflow: 'hidden',
        background: '#040F26',
        boxShadow: '0 24px 60px rgba(7, 20, 46, 0.18), 0 4px 16px rgba(7, 20, 46, 0.08)',
        border: '1px solid rgba(10, 75, 184, 0.15)',
        cursor: 'pointer',
      }}
      onClick={togglePlay}
    >
      {/* Live Autoplaying Plant Video */}
      <video
        ref={videoRef}
        src={VIDEO_SRC}
        poster={POSTER}
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

      {/* Top Floating Badge: Live Status */}
      <div
        style={{
          position: 'absolute',
          top: '1rem',
          left: '1rem',
          zIndex: 10,
          background: 'rgba(15, 23, 42, 0.82)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          border: '1px solid rgba(255, 255, 255, 0.18)',
          borderRadius: '9999px',
          padding: '0.35rem 0.9rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.45rem',
          color: '#FFFFFF',
          fontSize: '0.72rem',
          fontWeight: 700,
          pointerEvents: 'none',
        }}
      >
        <span
          style={{
            width: '7px',
            height: '7px',
            borderRadius: '50%',
            background: '#22C55E',
            boxShadow: '0 0 8px #22C55E',
            display: 'inline-block',
          }}
        />
        Live Plant Footage · Lahore Facility
      </div>

      {/* Center Play/Pause Overlay Indicator (Only visible when paused) */}
      {!isPlaying && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'rgba(4, 15, 38, 0.45)',
            backdropFilter: 'blur(4px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 15,
            transition: 'opacity 0.2s ease',
          }}
        >
          <div
            style={{
              width: '60px',
              height: '60px',
              borderRadius: '50%',
              background: '#0A4BB8',
              color: '#FFFFFF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 10px 30px rgba(10, 75, 184, 0.6)',
              border: '2px solid rgba(255, 255, 255, 0.4)',
            }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" style={{ marginLeft: '3px' }}>
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>
      )}

      {/* Bottom Floating Minimal Control Bar */}
      <div
        style={{
          position: 'absolute',
          bottom: '0.85rem',
          left: '0.85rem',
          right: '0.85rem',
          zIndex: 20,
          background: 'rgba(15, 23, 42, 0.85)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          border: '1px solid rgba(255, 255, 255, 0.15)',
          borderRadius: '12px',
          padding: '0.45rem 0.85rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '0.85rem',
          boxShadow: '0 8px 24px rgba(0, 0, 0, 0.4)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
          {/* Play/Pause Button */}
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
              padding: '0.2rem',
            }}
          >
            {isPlaying ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
              </svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M8 5v14l11-7z" />
              </svg>
            )}
          </button>

          {/* Sound Mute / Unmute Button */}
          <button
            type="button"
            onClick={toggleMute}
            aria-label={isMuted ? 'Unmute Audio' : 'Mute Audio'}
            style={{
              background: isMuted ? 'rgba(255, 255, 255, 0.1)' : 'rgba(10, 75, 184, 0.5)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              borderRadius: '9999px',
              padding: '0.25rem 0.65rem',
              color: '#FFFFFF',
              fontSize: '0.7rem',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.35rem',
            }}
          >
            {isMuted ? (
              <>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M11 5L6 9H2v6h4l5 4V5zM23 9l-6 6M17 9l6 6" />
                </svg>
                Muted
              </>
            ) : (
              <>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M11 5L6 9H2v6h4l5 4V5zM19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
                </svg>
                Sound On
              </>
            )}
          </button>
        </div>

        {/* Minimal Timeline Bar */}
        <div
          style={{
            flex: 1,
            height: '4px',
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

        {/* Fullscreen Button */}
        <button
          type="button"
          onClick={toggleFullscreen}
          aria-label="Toggle Fullscreen"
          style={{
            background: 'transparent',
            border: 'none',
            color: '#FFFFFF',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            padding: '0.2rem',
          }}
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3" />
          </svg>
        </button>
      </div>
    </div>
  )
}
