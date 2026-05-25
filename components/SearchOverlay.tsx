'use client'
import { useState, useEffect, useRef } from 'react'

export default function SearchOverlay() {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 100)
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
      setQuery('')
    }
  }, [open])

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [])

  return (
    <>
      {/* BOTONES QUE ABREN EL OVERLAY */}
      <button
        onClick={() => setOpen(true)}
        className="nav-icon-btn"
        aria-label="Buscar"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
        </svg>
      </button>

      <button
        onClick={() => setOpen(true)}
        className="nav-cta"
      >
        Buscar productos
      </button>

      {/* OVERLAY */}
      <div
        onClick={() => setOpen(false)}
        style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0,0,0,0.85)',
          backdropFilter: 'blur(8px)',
          zIndex: 999,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '32px',
          opacity: open ? 1 : 0,
          pointerEvents: open ? 'all' : 'none',
          transition: 'opacity 0.3s ease',
        }}
      >
        <div
          onClick={(e) => e.stopPropagation()}
          style={{
            width: '100%',
            maxWidth: 680,
            transform: open ? 'translateY(0)' : 'translateY(-24px)',
            transition: 'transform 0.35s cubic-bezier(0.4,0,0.2,1)',
          }}
        >
          {/* LABEL */}
          <div style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 800,
            fontSize: 'clamp(32px, 5vw, 52px)',
            color: '#ffffff',
            letterSpacing: '-0.02em',
            marginBottom: 32,
            lineHeight: 1,
          }}>
            ¿Qué estás<br />
            <span style={{ color: '#F9BE16' }}>buscando?</span>
          </div>

          {/* INPUT */}
          <div style={{
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
          }}>
            <svg
              style={{ position: 'absolute', left: 20, color: 'rgba(255,255,255,0.4)', flexShrink: 0 }}
              width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
            </svg>
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="GPU, CPU, RAM, placas madre..."
              style={{
                width: '100%',
                padding: '18px 20px 18px 54px',
                fontSize: 17,
                background: 'rgba(255,255,255,0.08)',
                border: '1.5px solid rgba(255,255,255,0.15)',
                borderRadius: 8,
                color: '#ffffff',
                outline: 'none',
                fontFamily: 'var(--font-body)',
                transition: 'border-color 0.2s',
              }}
              onFocus={(e) => e.target.style.borderColor = '#F9BE16'}
              onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.15)'}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && query.trim()) {
                  window.location.href = `/buscar?q=${encodeURIComponent(query)}`
                }
              }}
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                style={{
                  position: 'absolute',
                  right: 16,
                  background: 'rgba(255,255,255,0.1)',
                  border: 'none',
                  borderRadius: '50%',
                  width: 28,
                  height: 28,
                  color: 'rgba(255,255,255,0.6)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 16,
                }}
              >
                ×
              </button>
            )}
          </div>

          {/* SUGERENCIAS */}
          <div style={{ marginTop: 24, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {['GPU', 'CPU', 'RAM DDR5', 'Placas Madre', 'SSD NVMe', 'Periféricos', 'Gabinetes'].map((s) => (
              <button
                key={s}
                onClick={() => setQuery(s)}
                style={{
                  background: 'rgba(255,255,255,0.06)',
                  border: '1px solid rgba(255,255,255,0.12)',
                  borderRadius: 20,
                  padding: '6px 14px',
                  color: 'rgba(255,255,255,0.6)',
                  fontSize: 13,
                  cursor: 'pointer',
                  fontFamily: 'var(--font-body)',
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
              >
                {s}
              </button>
            ))}
          </div>

          {/* ESC hint */}
          <div style={{ marginTop: 24, fontSize: 12, color: 'rgba(255,255,255,0.25)', textAlign: 'center' }}>
            Presioná <kbd style={{ background: 'rgba(255,255,255,0.1)', padding: '2px 6px', borderRadius: 3, fontFamily: 'monospace' }}>ESC</kbd> para cerrar
          </div>
        </div>
      </div>
    </>
  )
}