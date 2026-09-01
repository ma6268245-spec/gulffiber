'use client'

import { useRef, useState } from 'react'

interface ProductVideoPlayerProps {
  src: string
  poster: string
  alt: string
  title: string
  code: string
}

export function ProductVideoPlayer({ src, poster, alt, title, code }: ProductVideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isPlaying, setIsPlaying] = useState(true)

  const togglePlay = () => {
    if (!videoRef.current) return
    if (videoRef.current.paused) {
      videoRef.current.play()
      setIsPlaying(true)
    } else {
      videoRef.current.pause()
      setIsPlaying(false)
    }
  }

  return (
    <div
      onClick={togglePlay}
      role="button"
      tabIndex={0}
      aria-label={`${isPlaying ? 'Pause' : 'Play'} production video for ${title}`}
      className="product-video-player-container"
      style={{
        position: 'relative',
        width: '100%',
        flex: 1,
        minHeight: '460px',
        overflow: 'hidden',
        background: '#040814',
        cursor: 'pointer',
      }}
    >
      <style>{`
        @media (max-width: 768px) {
          .product-video-player-container {
            min-height: auto !important;
            height: clamp(210px, 58vw, 260px) !important;
            aspect-ratio: 16 / 10 !important;
            flex: none !important;
          }
        }
      `}</style>
      {/* 60 FPS Looping Production Video */}
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: 'center',
          display: 'block',
        }}
      />

      {/* Top Badge: Product Name */}
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
        <span
          style={{
            width: '7px',
            height: '7px',
            borderRadius: '50%',
            background: isPlaying ? '#22C55E' : '#EAB308',
            boxShadow: isPlaying ? '0 0 8px #22C55E' : 'none',
            display: 'inline-block',
            flexShrink: 0,
          }}
        />
        <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {title}
        </span>
      </div>

      {/* Play/Pause indicator icon in bottom right */}
      <div
        style={{
          position: 'absolute',
          bottom: '1rem',
          right: '1rem',
          background: 'rgba(10, 17, 40, 0.75)',
          backdropFilter: 'blur(6px)',
          width: '34px',
          height: '34px',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          color: '#FFFFFF',
          zIndex: 2,
          fontSize: '0.8125rem',
        }}
      >
        {isPlaying ? '⏸' : '▶'}
      </div>
    </div>
  )
}
