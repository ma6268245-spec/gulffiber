'use client'

const ITEMS = [
  'POLYESTER STAPLE FIBRE',
  'WADDING & THERMAL INFILL',
  'FELT & NON-WOVENS',
  'LININGS & FUSING MATERIALS',
  'TEXTILE FIBRE SOLUTIONS',
  'CUSTOM MATERIAL REQUIREMENTS',
]

export function FabricMarquee() {
  const doubled = [...ITEMS, ...ITEMS]

  return (
    <div
      style={{
        background: 'var(--burg-primary)',
        overflow: 'hidden',
        padding: '1.25rem 0',
        position: 'relative',
      }}
    >
      <div className="sp-marquee-track">
        {doubled.map((item, i) => (
          <div
            key={i}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '3.5rem',
              flexShrink: 0,
            }}
          >
            <span
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.8125rem',
                fontWeight: 700,
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.9)',
              }}
            >
              {item}
            </span>
            <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: '1.125rem', lineHeight: 1 }}>☆</span>
          </div>
        ))}
      </div>

      <style>{`
        @keyframes marquee {
          0%   { transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(-50%, 0, 0); }
        }
        .sp-marquee-track {
          display: flex !important;
          gap: 3.5rem !important;
          animation: marquee 20s linear infinite !important;
          white-space: nowrap !important;
          will-change: transform !important;
        }
        @media (max-width: 1024px) {
          .sp-marquee-track {
            animation-duration: 12s !important;
          }
        }
        @media (max-width: 640px) {
          .sp-marquee-track {
            animation-duration: 8s !important;
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .sp-marquee-track { animation: none !important; }
        }
      `}</style>
    </div>
  )
}
