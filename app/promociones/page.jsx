'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useCatalogo } from '@/context/CatalogoContext'
import { toSlug } from '@/lib/utils'

export default function PromocionesPage() {
  const [skus, setSkus] = useState(null)
  const { productos, loading } = useCatalogo()

  useEffect(() => {
    fetch('/api/promociones')
      .then(r => r.json())
      .then(d => setSkus((d.lista || []).map(x => String(x.sku))))
  }, [])

  const lista = skus === null || loading
    ? null
    : skus.map(sku => productos.find(p => String(p.sku) === sku)).filter(Boolean)

  return (
    <div style={{ maxWidth: 1200, margin: '0 auto', padding: '48px 32px 96px' }}>
      <div style={{ marginBottom: 36 }}>
        <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#DC2626', marginBottom: 8 }}>
          Ofertas
        </div>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
          <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'clamp(36px, 5vw, 56px)', color: 'var(--black)', letterSpacing: '-0.02em', margin: 0 }}>
            Promociones
          </h1>
          {lista && <span style={{ fontSize: 13, color: 'var(--gray-400)', marginBottom: 8 }}>{lista.length} producto{lista.length !== 1 ? 's' : ''}</span>}
        </div>
      </div>

      {lista === null ? (
        <div className="catalogo-grid">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="skeleton-card">
              <div className="skeleton" style={{ aspectRatio: '1' }} />
              <div style={{ padding: 16 }}>
                <div className="skeleton" style={{ height: 10, width: '40%', marginBottom: 8 }} />
                <div className="skeleton" style={{ height: 13, width: '90%', marginBottom: 16 }} />
                <div className="skeleton" style={{ height: 22, width: '55%' }} />
              </div>
            </div>
          ))}
        </div>
      ) : lista.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '80px 0', color: 'var(--gray-400)' }}>
          <div style={{ fontSize: 16, fontWeight: 600, color: 'var(--black)', marginBottom: 8 }}>Sin promociones activas</div>
          <div style={{ fontSize: 14 }}>Volvé pronto para ver nuestras próximas ofertas.</div>
          <Link href="/productos" style={{ display: 'inline-block', marginTop: 24, background: 'var(--black)', color: '#fff', padding: '10px 24px', borderRadius: 8, fontSize: 14, fontWeight: 600, textDecoration: 'none' }}>
            Ver catálogo completo
          </Link>
        </div>
      ) : (
        <div className="catalogo-grid">
          {lista.map(p => <ProductCard key={p.id} p={p} />)}
        </div>
      )}
    </div>
  )
}

function ProductCard({ p }) {
  return (
    <Link href={`/producto/${toSlug(p.nombre)}-${p.id}`} style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
      <div
        style={{ border: '1.5px solid var(--gray-200)', borderRadius: 10, overflow: 'hidden', cursor: 'pointer', position: 'relative', transition: 'border-color 0.15s, box-shadow 0.15s' }}
        onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--black)'; e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.08)' }}
        onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--gray-200)'; e.currentTarget.style.boxShadow = 'none' }}
      >
        {p.en_oferta && (
          <div style={{ position: 'absolute', top: 10, left: 10, background: '#DC2626', color: '#fff', fontSize: 11, fontWeight: 700, padding: '3px 8px', borderRadius: 20, zIndex: 1 }}>Oferta</div>
        )}
        <div style={{ background: 'var(--gray-100)', aspectRatio: '1', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
          {p.imagen
            ? <img src={p.imagen} alt={p.nombre} loading="lazy" decoding="async" style={{ width: '100%', height: '100%', objectFit: 'contain', padding: 16 }} />
            : <div style={{ color: 'var(--gray-300)', fontSize: 12 }}>Sin imagen</div>}
        </div>
        <div className="card-body" style={{ padding: '14px 16px' }}>
          <div className="card-marca" style={{ fontSize: 11, color: 'var(--gray-400)', marginBottom: 4, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{p.marca}</div>
          <div className="card-nombre" style={{ fontSize: 14, fontWeight: 600, color: 'var(--black)', marginBottom: 10, lineHeight: 1.3 }}>{p.nombre}</div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              {p.precio_original && <div style={{ fontSize: 11, color: 'var(--gray-400)', textDecoration: 'line-through' }}>₡{p.precio_original.toLocaleString('es-CR')}</div>}
              <div className="card-precio" style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 18, color: p.en_oferta ? '#DC2626' : 'var(--black)' }}>₡{p.precio?.toLocaleString('es-CR')}</div>
            </div>
            <div className="card-stock" style={{ fontSize: 11, fontWeight: 700, padding: '3px 8px', borderRadius: 20, background: p.stock > 0 ? '#F0FDF4' : '#FEE2E2', color: p.stock > 0 ? '#16A34A' : '#DC2626' }}>
              {p.stock > 0 ? 'En stock' : 'Agotado'}
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}
