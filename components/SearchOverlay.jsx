'use client'
import { useEffect, useRef } from 'react'

const CHIPS = ['GPU', 'CPU', 'RAM DDR5', 'Placas Madre', 'SSD NVMe', 'Periféricos', 'Gabinetes']

function navSearch(q) {
  if (q.trim()) window.location.href = '/buscar?q=' + encodeURIComponent(q.trim())
}

export default function SearchOverlay({ open, onClose }) {
  const inputRef = useRef(null)

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 100)
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
  }, [open])

  useEffect(() => {
    const handleKey = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [onClose])

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0,
        background: 'rgba(0,0,0,0.85)',
        backdropFilter: 'blur(8px)',
        zIndex: 999,
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        padding: '32px',
        opacity: open ? 1 : 0,
        pointerEvents: open ? 'all' : 'none',
        transition: 'opacity 0.3s ease',
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '100%', maxWidth: 680,
          transform: open ? 'translateY(0)' : 'translateY(-24px)',
          transition: 'transform 0.35s cubic-bezier(0.4,0,0.2,1)',
        }}
      >
        <div style={{
          fontFamily: 'var(--font-display)', fontWeight: 800,
          fontSize: 'clamp(32px, 5vw, 52px)', color: '#ffffff',
          letterSpacing: '-0.02em', marginBottom: 32, lineHeight: 1,
        }}>
          ¿Qué estás<br />
          <span style={{ color: '#F9BE16' }}>buscando?</span>
        </div>

        <div style={{ position: 'relative', display: 'flex', gap: 10 }}>
          <div style={{ position: 'relative', flex: 1 }}>
            <svg style={{ position: 'absolute', left: 20, top: '50%', transform: 'translateY(-50%)', color: 'rgba(255,255,255,0.4)', pointerEvents: 'none' }}
              width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
            </svg>
            <input
              ref={inputRef}
              type="text"
              placeholder="GPU, CPU, RAM, placas madre..."
              style={{
                width: '100%', padding: '18px 20px 18px 54px', fontSize: 17,
                background: 'rgba(255,255,255,0.08)',
                border: '1.5px solid rgba(255,255,255,0.15)',
                borderRadius: 8, color: '#ffffff', outline: 'none',
                fontFamily: 'var(--font-body)', transition: 'border-color 0.2s',
              }}
              onFocus={(e) => e.target.style.borderColor = '#F9BE16'}
              onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.15)'}
              onKeyDown={(e) => { if (e.key === 'Enter') navSearch(e.target.value) }}
            />
          </div>
          <button
            onClick={() => navSearch(inputRef.current?.value || '')}
            style={{
              background: '#F9BE16', color: '#0d0d0d',
              border: 'none', borderRadius: 8,
              padding: '0 24px', fontSize: 14, fontWeight: 700,
              cursor: 'pointer', fontFamily: 'var(--font-body)',
              whiteSpace: 'nowrap', flexShrink: 0,
              transition: 'opacity 0.15s',
            }}
            onMouseOver={(e) => e.currentTarget.style.opacity = '0.85'}
            onMouseOut={(e) => e.currentTarget.style.opacity = '1'}
          >
            Buscar →
          </button>
        </div>

        <div style={{ marginTop: 20, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {CHIPS.map((s) => (
            <button key={s}
              style={{
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.12)',
                borderRadius: 20, padding: '6px 14px',
                color: 'rgba(255,255,255,0.6)', fontSize: 13,
                cursor: 'pointer', fontFamily: 'var(--font-body)',
                transition: 'all 0.15s',
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.background = 'rgba(249,190,22,0.15)'
                e.currentTarget.style.borderColor = 'rgba(249,190,22,0.4)'
                e.currentTarget.style.color = '#F9BE16'
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.06)'
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)'
                e.currentTarget.style.color = 'rgba(255,255,255,0.6)'
              }}
              onClick={() => navSearch(s)}
            >
              {s}
            </button>
          ))}
        </div>

        <div style={{ marginTop: 20, fontSize: 12, color: 'rgba(255,255,255,0.25)', textAlign: 'center' }}>
          Presioná <kbd style={{ background: 'rgba(255,255,255,0.1)', padding: '2px 6px', borderRadius: 3, fontFamily: 'monospace' }}>ESC</kbd> para cerrar
        </div>
      </div>
    </div>
  )
}
