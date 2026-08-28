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
      <div
        style={{
          display: 'flex',
          gap: '3.5rem',
          animation: 'marquee 30s linear infinite',
          whiteSpace: 'nowrap',
          willChange: 'transform',
        }}
      >
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
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @media (prefers-reduced-motion: reduce) {
          div[style*="marquee"] { animation: none; }
        }
      `}</style>
    </div>
  )
}
