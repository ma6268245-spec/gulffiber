'use client'

import { useEffect, useRef, useState } from 'react'

const VIDEO_CHAPTERS = [
  {
    range: [0, 0.25],
    eyebrow: 'CHAPTER 01 · 1999 FOUNDING',
    title: 'Textile Craftsmanship In Karachi',
    desc: 'From our inception in 1999, Gulf Fibre established a reputation for uncompromising quality, delivering precision staple fibres to spinning mills across Pakistan.',
    stat: 'EST. 1999 · 25+ YEARS',
  },
  {
    range: [0.25, 0.5],
    eyebrow: 'CHAPTER 02 · INDUSTRIAL CAPACITY',
    title: 'Multi-Stage Extrusion & Drawing',
    desc: 'Automated continuous melt extrusion lines ensure uniform polymer orientation, exact staple lengths, and strict denier tolerances.',
    stat: '4 EXTRUSION LINES',
  },
  {
    range: [0.5, 0.75],
    eyebrow: 'CHAPTER 03 · CIRCULAR SUSTAINABILITY',
    title: '100% GRS Post-Consumer Recycling',
    desc: 'Diverting millions of post-consumer plastic bottles into high-tenacity staple fibre, verified by the Global Recycled Standard.',
    stat: '100% GRS ACCREDITED',
  },
  {
    range: [0.75, 1.0],
    eyebrow: 'CHAPTER 04 · MODERN SCALE',
    title: '15,000 MT Annual Production Scale',
    desc: 'Operating with 250+ technical specialists, delivering moisture-sealed 280kg export bales to over 350 active spinning mills globally.',
    stat: '15,000 MT / YEAR · 250+ TEAM',
  },
]

export function CompanyVideoScrollStory() {
  const trackRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)
  const [isMuted, setIsMuted] = useState(true)

  // Current active chapter
  const currentChapter =
    VIDEO_CHAPTERS.find((c) => scrollProgress >= c.range[0] && scrollProgress <= c.range[1]) ||
    VIDEO_CHAPTERS[0]

  useEffect(() => {
    const video = videoRef.current
    if (video) {
      video.muted = true
      video.playsInline = true
      video.play().catch(() => {})
    }

    let ctx: any
    const init = async () => {
      const gsap = (await import('gsap')).default
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)

      const track = trackRef.current
      if (!track) return

      ctx = gsap.context(() => {
        // Track scroll without DOM mutations (native sticky container)
        ScrollTrigger.create({
          trigger: track,
          start: 'top top',
          end: 'bottom bottom',
          scrub: true,
          onUpdate: (self) => {
            setScrollProgress(self.progress)
          },
        })
      }, track)
    }

    init()
    return () => {
      if (ctx) ctx.revert()
    }
  }, [])

  const togglePlay = () => {
    const video = videoRef.current
    if (!video) return
    if (video.paused) {
      video.play().then(() => setIsPlaying(true)).catch(() => {})
    } else {
      video.pause()
      setIsPlaying(false)
    }
  }

  const toggleMute = () => {
    const video = videoRef.current
    if (!video) return
    video.muted = !video.muted
    setIsMuted(video.muted)
  }

  return (
    <div
      ref={trackRef}
      style={{
        position: 'relative',
        width: '100%',
        height: '240vh', // Tall scroll track for smooth storytelling progression
        background: '#040F26',
      }}
    >
      {/* Sticky Full-Viewport Video Canvas Container */}
      <div
        style={{
          position: 'sticky',
          top: 0,
          left: 0,
          width: '100%',
          height: '100vh',
          overflow: 'hidden',
          color: '#FFFFFF',
        }}
      >
        {/* Background Video */}
        <video
          ref={videoRef}
          src="/videos/company-story.mp4"
          poster="/images/workshop-factory.jpg"
          autoPlay
          loop
          muted={isMuted}
          playsInline
          preload="auto"
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            position: 'absolute',
            inset: 0,
            opacity: 0.88,
          }}
        />

        {/* Cinematic Gradient Overlays */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(180deg, rgba(4, 15, 38, 0.8) 0%, rgba(4, 15, 38, 0.25) 40%, rgba(4, 15, 38, 0.88) 100%)',
            pointerEvents: 'none',
          }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'radial-gradient(circle at 20% 50%, rgba(0, 92, 230, 0.3) 0%, transparent 60%)',
            pointerEvents: 'none',
          }}
        />

        {/* Foreground Content */}
        <div
          className="container"
          style={{
            position: 'relative',
            zIndex: 2,
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            paddingBlock: 'clamp(2rem, 4vh, 3.5rem)',
          }}
        >
          {/* Top Telemetry & Chapter Indicator */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.65rem',
                background: 'rgba(7, 20, 46, 0.85)',
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                borderRadius: '9999px',
                padding: '0.4rem 1rem',
              }}
            >
              <span
                style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  background: isPlaying ? '#38B6FF' : '#F59E0B',
                  boxShadow: isPlaying ? '0 0 10px #38B6FF' : 'none',
                  animation: isPlaying ? 'pulse 1.5s infinite' : 'none',
                }}
              />
              <span style={{ fontSize: '0.6875rem', fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#FFFFFF' }}>
                {isPlaying ? 'FACTORY TOUR IN MOTION' : 'VIDEO PAUSED'}
              </span>
            </div>

            {/* Chapter Indicator Pills */}
            <div style={{ display: 'flex', gap: '0.4rem' }}>
              {VIDEO_CHAPTERS.map((chap, idx) => {
                const isActive = currentChapter.eyebrow === chap.eyebrow
                return (
                  <div
                    key={idx}
                    style={{
                      background: isActive ? '#005CE6' : 'rgba(255, 255, 255, 0.15)',
                      backdropFilter: 'blur(10px)',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      borderRadius: '9999px',
                      padding: '0.35rem 0.85rem',
                      fontSize: '0.6875rem',
                      fontWeight: 800,
                      letterSpacing: '0.06em',
                      textTransform: 'uppercase',
                      color: '#FFFFFF',
                      transition: 'all 0.3s ease',
                    }}
                  >
                    Era 0{idx + 1}
                  </div>
                )
              })}
            </div>
          </div>

          {/* Center Floating Story Glass Card */}
          <div style={{ maxWidth: '620px', marginBlock: 'auto' }}>
            <div
              style={{
                background: 'rgba(7, 20, 46, 0.85)',
                backdropFilter: 'blur(24px)',
                WebkitBackdropFilter: 'blur(24px)',
                border: '1px solid rgba(56, 182, 255, 0.3)',
                borderRadius: '28px',
                padding: 'clamp(1.75rem, 3.5vw, 2.75rem)',
                boxShadow: '0 24px 60px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
                transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
              }}
            >
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  fontSize: '0.6875rem',
                  fontWeight: 800,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: '#38B6FF',
                  marginBottom: '0.75rem',
                }}
              >
                {currentChapter.eyebrow}
              </div>

              <h3
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: 'clamp(1.65rem, 2.8vw, 2.5rem)',
                  fontWeight: 900,
                  lineHeight: 1.05,
                  letterSpacing: '-0.02em',
                  textTransform: 'uppercase',
                  color: '#FFFFFF',
                  marginBottom: '1rem',
                }}
              >
                {currentChapter.title}
              </h3>

              <p
                style={{
                  fontSize: '0.9375rem',
                  lineHeight: 1.7,
                  color: 'rgba(255, 255, 255, 0.88)',
                  marginBottom: '1.5rem',
                }}
              >
                {currentChapter.desc}
              </p>

              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  background: 'rgba(56, 182, 255, 0.15)',
                  border: '1px solid rgba(56, 182, 255, 0.35)',
                  padding: '0.4rem 0.85rem',
                  borderRadius: '8px',
                  fontSize: '0.75rem',
                  fontWeight: 800,
                  color: '#38B6FF',
                  letterSpacing: '0.06em',
                }}
              >
                ✓ {currentChapter.stat}
              </div>
            </div>
          </div>

          {/* Bottom Controls & Scrubber */}
          <div>
            {/* Scrubber Progress Bar */}
            <div
              style={{
                width: '100%',
                height: '6px',
                background: 'rgba(255, 255, 255, 0.2)',
                borderRadius: '9999px',
                overflow: 'hidden',
                marginBottom: '1rem',
              }}
            >
              <div
                style={{
                  width: `${scrollProgress * 100}%`,
                  height: '100%',
                  background: 'linear-gradient(90deg, #005CE6 0%, #38B6FF 100%)',
                  boxShadow: '0 0 12px #38B6FF',
                  transition: 'width 0.1s linear',
                }}
              />
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
              {/* Scroll Hint */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#38B6FF" strokeWidth="2">
                  <rect x="5" y="2" width="14" height="20" rx="7" />
                  <line x1="12" y1="6" x2="12" y2="10" />
                </svg>
                <span style={{ fontSize: '0.75rem', color: 'rgba(255, 255, 255, 0.8)', fontWeight: 600 }}>
                  Scroll down to explore plant eras · {Math.round(scrollProgress * 100)}%
                </span>
              </div>

              {/* Manual Play / Mute Buttons */}
              <div style={{ display: 'flex', gap: '0.75rem' }}>
                <button
                  onClick={togglePlay}
                  style={{
                    background: isPlaying ? '#005CE6' : 'rgba(255, 255, 255, 0.2)',
                    border: '1px solid rgba(255, 255, 255, 0.3)',
                    color: '#FFFFFF',
                    borderRadius: '9999px',
                    padding: '0.45rem 1rem',
                    fontSize: '0.75rem',
                    fontWeight: 800,
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    transition: 'all 0.2s ease',
                  }}
                >
                  {isPlaying ? '⏸ Pause' : '▶ Play Video'}
                </button>
                <button
                  onClick={toggleMute}
                  style={{
                    background: 'rgba(255, 255, 255, 0.15)',
                    border: '1px solid rgba(255, 255, 255, 0.25)',
                    color: '#FFFFFF',
                    borderRadius: '9999px',
                    padding: '0.45rem 1rem',
                    fontSize: '0.75rem',
                    fontWeight: 800,
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    transition: 'all 0.2s ease',
                  }}
                >
                  {isMuted ? '🔇 Unmute' : '🔊 Sound On'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
