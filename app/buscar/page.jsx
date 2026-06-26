'use client'
import { useState, useEffect, useRef, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'

function SkeletonCard() {
  return (
    <div className="skeleton-card">
      <div className="skeleton" style={{ aspectRatio: '1' }} />
      <div style={{ padding: '14px 16px' }}>
        <div className="skeleton" style={{ height: 10, width: '40%', marginBottom: 8 }} />
        <div className="skeleton" style={{ height: 13, width: '90%', marginBottom: 6 }} />
        <div className="skeleton" style={{ height: 13, width: '70%', marginBottom: 16 }} />
        <div className="skeleton" style={{ height: 22, width: '55%' }} />
      </div>
    </div>
  )
}

function BuscarContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const inputRef = useRef(null)
  const query = searchParams.get('q') || ''
  const [valor, setValor] = useState(query)

  useEffect(() => { setValor(query) }, [query])

  const handleBuscar = () => {
    if (valor.trim()) router.push('/buscar?q=' + encodeURIComponent(valor.trim()))
  }

  return (
    <div style={{ maxWidth: 1100, margin: '0 auto', padding: '56px clamp(16px, 4vw, 32px) 96px' }}>

      <div style={{ marginBottom: 40 }}>
        <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#1E3A8A', marginBottom: 10 }}>
          Búsqueda
        </div>
        <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'clamp(36px, 5vw, 56px)', color: 'var(--black)', letterSpacing: '-0.02em', marginBottom: 24, lineHeight: 1 }}>
          {query ? <>Resultados para <span style={{ color: '#1E3A8A' }}>"{query}"</span></> : 'Buscar productos'}
        </h1>

        <div style={{ display: 'flex', gap: 10, maxWidth: 640 }}>
          <div style={{ position: 'relative', flex: 1 }}>
            <svg style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', color: 'var(--gray-400)', pointerEvents: 'none' }}
              width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
            </svg>
            <input
              ref={inputRef}
              value={valor}
              onChange={e => setValor(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter') handleBuscar() }}
              type="text"
              placeholder="Nombre, marca o categoría..."
              style={{
                width: '100%', padding: '14px 16px 14px 46px', fontSize: 15,
                border: '1.5px solid var(--gray-200)', borderRadius: 8,
                outline: 'none', fontFamily: 'var(--font-body)',
                color: 'var(--black)', background: 'var(--white)',
                transition: 'border-color 0.15s',
              }}
              onFocus={e => e.target.style.borderColor = 'var(--black)'}
              onBlur={e => e.target.style.borderColor = 'var(--gray-200)'}
            />
          </div>
          <button
            onClick={handleBuscar}
            style={{
              background: 'var(--black)', color: '#fff', border: 'none',
              borderRadius: 8, padding: '0 24px', fontWeight: 600, fontSize: 14,
              cursor: 'pointer', fontFamily: 'var(--font-body)', whiteSpace: 'nowrap',
              transition: 'opacity 0.15s',
            }}
            onMouseOver={e => e.currentTarget.style.opacity = '0.8'}
            onMouseOut={e => e.currentTarget.style.opacity = '1'}
          >
            Buscar →
          </button>
        </div>
      </div>

      {query ? (
        <div>
          <div style={{ fontSize: 13, color: 'var(--gray-400)', marginBottom: 24 }}>
            Conectando catálogo — los resultados aparecerán aquí pronto.
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 20 }}>
            {Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)}
          </div>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div style={{ fontSize: 13, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--gray-600)', marginBottom: 4 }}>
            Sugerencias
          </div>
          {['GPU', 'CPU', 'RAM DDR5', 'Placas Madre', 'SSD NVMe', 'Periféricos', 'Gabinetes'].map(s => (
            <button
              key={s}
              onClick={() => router.push('/buscar?q=' + encodeURIComponent(s))}
              style={{
                textAlign: 'left', background: 'none', border: 'none',
                padding: '12px 16px', fontSize: 14, color: 'var(--gray-800)',
                cursor: 'pointer', fontFamily: 'var(--font-body)',
                borderRadius: 8, transition: 'background 0.12s',
                display: 'flex', alignItems: 'center', gap: 12,
              }}
              onMouseOver={e => e.currentTarget.style.background = 'var(--gray-100)'}
              onMouseOut={e => e.currentTarget.style.background = 'none'}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--gray-400)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
              </svg>
              {s}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default function BuscarPage() {
  return (
    <Suspense fallback={<div style={{ padding: '96px 32px', textAlign: 'center', color: 'var(--gray-400)' }}>Cargando...</div>}>
      <BuscarContent />
    </Suspense>
  )
}
