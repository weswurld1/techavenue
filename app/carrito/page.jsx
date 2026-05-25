'use client'
import { useState } from 'react'
import Link from 'next/link'

// Productos de ejemplo — luego se conectan con la API de Eurocomp
const productosEjemplo = [
  { id: 1, nombre: 'GeForce RTX 4070 Super', marca: 'NVIDIA', spec: '12GB GDDR6X', precio: 329000, cantidad: 1 },
  { id: 2, nombre: 'Ryzen 9 7900X', marca: 'AMD', spec: 'AM5 · 12 núcleos', precio: 199000, cantidad: 1 },
]

export default function CarritoPage() {
  const [items, setItems] = useState(productosEjemplo)

  const cambiarCantidad = (id, delta) => {
    setItems(prev => prev.map(p =>
      p.id === id ? { ...p, cantidad: Math.max(1, p.cantidad + delta) } : p
    ))
  }

  const eliminar = (id) => setItems(prev => prev.filter(p => p.id !== id))

  const total = items.reduce((acc, p) => acc + p.precio * p.cantidad, 0)

  if (items.length === 0) return (
    <div style={{ maxWidth: 520, margin: '0 auto', padding: '80px 32px', textAlign: 'center' }}>
      <div style={{ fontSize: 48, marginBottom: 16 }}>🛒</div>
      <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 32, color: 'var(--black)', marginBottom: 12 }}>Tu carrito está vacío</h1>
      <p style={{ color: 'var(--gray-600)', fontSize: 15, marginBottom: 28 }}>Explorá nuestro catálogo y agregá productos.</p>
      <Link href="/" style={{ background: 'var(--black)', color: '#fff', padding: '13px 28px', borderRadius: 5, textDecoration: 'none', fontWeight: 600, fontSize: 14 }}>Ver productos →</Link>
    </div>
  )

  return (
    <div style={{ maxWidth: 580, margin: '0 auto', padding: '56px 32px 96px' }}>
      <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'clamp(32px, 5vw, 48px)', color: 'var(--black)', letterSpacing: '-0.02em', marginBottom: 6 }}>
        Tu carrito
      </h1>
      <p style={{ color: 'var(--gray-400)', fontSize: 14, marginBottom: 32 }}>{items.length} {items.length === 1 ? 'producto' : 'productos'}</p>

      <div style={{ marginBottom: 28 }}>
        {items.map((p, i) => (
          <div key={p.id} style={{
            display: 'flex', gap: 16, padding: '20px 0',
            borderBottom: '1px solid var(--gray-200)',
            alignItems: 'center',
          }}>
            <div style={{ width: 72, height: 72, background: 'var(--gray-100)', borderRadius: 8, flexShrink: 0 }} />
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--black)', marginBottom: 2 }}>{p.nombre}</div>
              <div style={{ fontSize: 12, color: 'var(--gray-400)', marginBottom: 10 }}>{p.marca} · {p.spec}</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ display: 'flex', alignItems: 'center', border: '1px solid var(--gray-200)', borderRadius: 6, overflow: 'hidden' }}>
                  <button onClick={() => cambiarCantidad(p.id, -1)} style={{ width: 30, height: 30, background: 'none', border: 'none', cursor: 'pointer', fontSize: 16, color: 'var(--gray-600)' }}>−</button>
                  <span style={{ width: 30, textAlign: 'center', fontSize: 13, fontWeight: 600 }}>{p.cantidad}</span>
                  <button onClick={() => cambiarCantidad(p.id, 1)} style={{ width: 30, height: 30, background: 'none', border: 'none', cursor: 'pointer', fontSize: 16, color: 'var(--gray-600)' }}>+</button>
                </div>
                <button onClick={() => eliminar(p.id)} style={{ fontSize: 12, color: 'var(--gray-400)', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>Eliminar</button>
              </div>
            </div>
            <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 20, color: 'var(--black)', flexShrink: 0 }}>
              ₡{(p.precio * p.cantidad).toLocaleString('es-CR')}
            </div>
          </div>
        ))}
      </div>

      <div style={{ background: 'var(--gray-100)', borderRadius: 8, padding: '20px 24px', marginBottom: 16 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, color: 'var(--gray-600)', marginBottom: 8 }}>
          <span>Subtotal</span>
          <span>₡{total.toLocaleString('es-CR')}</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, color: '#16a34a', fontWeight: 600, marginBottom: 14 }}>
          <span>Envío</span>
          <span>Gratis 🎉</span>
        </div>
        <div style={{ borderTop: '1px solid var(--gray-200)', paddingTop: 14, display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
          <span style={{ fontSize: 15, fontWeight: 600, color: 'var(--black)' }}>Total</span>
          <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 28, color: 'var(--black)', letterSpacing: '-0.02em' }}>₡{total.toLocaleString('es-CR')}</span>
        </div>
      </div>

      <Link
        href={{ pathname: '/checkout', query: { items: JSON.stringify(items), total } }}
        style={{ display: 'block', background: 'var(--black)', color: '#fff', padding: '14px', borderRadius: 6, textDecoration: 'none', fontWeight: 600, fontSize: 15, textAlign: 'center' }}
      >
        Proceder al checkout →
      </Link>
      <Link href="/" style={{ display: 'block', textAlign: 'center', marginTop: 12, fontSize: 13, color: 'var(--gray-400)', textDecoration: 'none' }}>← Seguir comprando</Link>
    </div>
  )
}