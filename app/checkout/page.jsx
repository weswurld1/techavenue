'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

const productosEjemplo = [
  { id: 1, nombre: 'GeForce RTX 4070 Super', marca: 'NVIDIA', precio: 329000, cantidad: 1 },
  { id: 2, nombre: 'Ryzen 9 7900X', marca: 'AMD', precio: 199000, cantidad: 1 },
]

export default function CheckoutPage() {
  const router = useRouter()
  const [form, setForm] = useState({
    nombre: '', apellido: '', provincia: '', canton: '',
    direccion: '', telefono: '', correo: '', notas: ''
  })
  const [cargando, setCargando] = useState(false)
  const [error, setError] = useState(null)

  const productos = productosEjemplo
  const total = productos.reduce((acc, p) => acc + p.precio * p.cantidad, 0)

  const set = (key, val) => setForm(prev => ({ ...prev, [key]: val }))

  const inputStyle = {
    width: '100%', padding: '10px 14px', fontSize: 14,
    border: '1.5px solid var(--gray-200)', borderRadius: 6,
    fontFamily: 'var(--font-body)', outline: 'none',
    background: 'var(--white)', color: 'var(--black)',
  }

  const labelStyle = {
    fontSize: 11, fontWeight: 700, letterSpacing: '0.07em',
    textTransform: 'uppercase', color: 'var(--gray-600)',
    display: 'block', marginBottom: 5,
  }

  const fieldStyle = { marginBottom: 14 }

  const handleSubmit = async () => {
    const requeridos = ['nombre', 'apellido', 'provincia', 'canton', 'direccion', 'telefono', 'correo']
    for (const campo of requeridos) {
      if (!form[campo].trim()) {
        setError('Por favor completá todos los campos obligatorios.')
        return
      }
    }
    setCargando(true)
    setError(null)
    try {
      const res = await fetch('/api/pedidos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, productos, total })
      })
      const data = await res.json()
      if (data.success) {
        router.push(`/orden-confirmada?orden=${data.numeroOrden}&total=${total}&nombre=${form.nombre}`)
      } else {
        setError('Hubo un error al procesar tu pedido. Intentá de nuevo.')
      }
    } catch {
      setError('Hubo un error al procesar tu pedido. Intentá de nuevo.')
    } finally {
      setCargando(false)
    }
  }

  return (
    <div style={{ maxWidth: 1100, margin: '0 auto', padding: '56px 32px 96px' }}>
      <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'clamp(32px, 5vw, 48px)', color: 'var(--black)', letterSpacing: '-0.02em', marginBottom: 40 }}>
        Checkout
      </h1>

      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1.5fr) minmax(0,1fr)', gap: 40 }}>

        {/* FORMULARIO */}
        <div>
          <div style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--black)', marginBottom: 16, paddingBottom: 10, borderBottom: '1px solid var(--gray-200)' }}>
            Datos de entrega
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <div style={fieldStyle}>
              <label style={labelStyle}>Nombre *</label>
              <input style={inputStyle} value={form.nombre} onChange={e => set('nombre', e.target.value)} placeholder="Juan" />
            </div>
            <div style={fieldStyle}>
              <label style={labelStyle}>Apellido *</label>
              <input style={inputStyle} value={form.apellido} onChange={e => set('apellido', e.target.value)} placeholder="Pérez" />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <div style={fieldStyle}>
              <label style={labelStyle}>Provincia *</label>
              <select style={inputStyle} value={form.provincia} onChange={e => set('provincia', e.target.value)}>
                <option value="">Seleccioná...</option>
                {['San José','Alajuela','Cartago','Heredia','Guanacaste','Puntarenas','Limón'].map(p => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </select>
            </div>
            <div style={fieldStyle}>
              <label style={labelStyle}>Cantón *</label>
              <input style={inputStyle} value={form.canton} onChange={e => set('canton', e.target.value)} placeholder="Central" />
            </div>
          </div>

          <div style={fieldStyle}>
            <label style={labelStyle}>Dirección exacta *</label>
            <input style={inputStyle} value={form.direccion} onChange={e => set('direccion', e.target.value)} placeholder="100m norte del parque, casa azul..." />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <div style={fieldStyle}>
              <label style={labelStyle}>Teléfono *</label>
              <input style={inputStyle} value={form.telefono} onChange={e => set('telefono', e.target.value)} placeholder="6340-9795" />
            </div>
            <div style={fieldStyle}>
              <label style={labelStyle}>Correo electrónico *</label>
              <input style={inputStyle} type="email" value={form.correo} onChange={e => set('correo', e.target.value)} placeholder="correo@email.com" />
            </div>
          </div>

          <div style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--black)', marginTop: 8, marginBottom: 16, paddingBottom: 10, borderBottom: '1px solid var(--gray-200)' }}>
            Método de pago
          </div>

          <div style={{ border: '1.5px solid #1E3A8A', background: '#EEF2FF', borderRadius: 8, padding: '14px 16px', marginBottom: 16, display: 'flex', alignItems: 'flex-start', gap: 12 }}>
            <div style={{ width: 20, height: 20, background: '#1E3A8A', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 1 }}>
              <div style={{ width: 8, height: 8, background: '#fff', borderRadius: '50%' }} />
            </div>
            <div>
              <div style={{ fontSize: 14, fontWeight: 600, color: '#1E3A8A', marginBottom: 4 }}>Transferencia bancaria</div>
              <div style={{ fontSize: 12, color: '#3730A3' }}>Los datos bancarios se mostrarán al confirmar tu pedido para que puedas realizar la transferencia</div>
            </div>
          </div>

          <div style={fieldStyle}>
            <label style={labelStyle}>Notas adicionales (opcional)</label>
            <textarea
              style={{ ...inputStyle, height: 80, resize: 'vertical' }}
              value={form.notas}
              onChange={e => set('notas', e.target.value)}
              placeholder="Instrucciones especiales de entrega..."
            />
          </div>

          {error && (
            <div style={{ background: '#FEE2E2', border: '1px solid #FCA5A5', borderRadius: 6, padding: '10px 14px', fontSize: 13, color: '#DC2626', marginBottom: 16 }}>
              {error}
            </div>
          )}
        </div>

        {/* RESUMEN */}
        <div>
          <div style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--black)', marginBottom: 16, paddingBottom: 10, borderBottom: '1px solid var(--gray-200)' }}>
            Resumen del pedido
          </div>

          <div style={{ marginBottom: 16 }}>
            {productos.map(p => (
              <div key={p.id} style={{ display: 'flex', gap: 10, marginBottom: 12, alignItems: 'center' }}>
                <div style={{ width: 44, height: 44, background: 'var(--gray-100)', borderRadius: 6, flexShrink: 0 }} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 500, color: 'var(--black)' }}>{p.nombre}</div>
                  <div style={{ fontSize: 11, color: 'var(--gray-400)' }}>{p.marca} · x{p.cantidad}</div>
                </div>
                <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--black)', flexShrink: 0 }}>
                  ₡{(p.precio * p.cantidad).toLocaleString('es-CR')}
                </div>
              </div>
            ))}
          </div>

          <div style={{ borderTop: '1px solid var(--gray-200)', paddingTop: 14, marginBottom: 14 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, color: 'var(--gray-600)', marginBottom: 8 }}>
              <span>Subtotal</span>
              <span>₡{total.toLocaleString('es-CR')}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, color: '#16a34a', fontWeight: 600, marginBottom: 14 }}>
              <span>Envío</span>
              <span>Gratis 🎉</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', borderTop: '1px solid var(--gray-200)', paddingTop: 12 }}>
              <span style={{ fontSize: 15, fontWeight: 600, color: 'var(--black)' }}>Total</span>
              <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 26, color: 'var(--black)', letterSpacing: '-0.02em' }}>
                ₡{total.toLocaleString('es-CR')}
              </span>
            </div>
          </div>

          <button
            onClick={handleSubmit}
            disabled={cargando}
            style={{
              width: '100%', background: cargando ? 'var(--gray-400)' : 'var(--black)',
              color: '#fff', border: 'none', borderRadius: 6, padding: '14px',
              fontWeight: 600, fontSize: 15, cursor: cargando ? 'not-allowed' : 'pointer',
              fontFamily: 'var(--font-body)', transition: 'background 0.15s',
            }}
          >
            {cargando ? 'Procesando...' : 'Confirmar pedido →'}
          </button>

          <div style={{ marginTop: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, fontSize: 12, color: 'var(--gray-400)' }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
            Compra segura y protegida
          </div>
        </div>
      </div>
    </div>
  )
}