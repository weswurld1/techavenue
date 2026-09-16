'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useCarrito } from '../../context/CartContext'

export default function CheckoutPage() {
  const router = useRouter()
  const { items, vaciar } = useCarrito()
  const [form, setForm] = useState({
    nombre: '', apellido: '', provincia: '', canton: '',
    direccion: '', telefono: '', correo: '', notas: ''
  })
  const [cargando, setCargando] = useState(false)
  const [error, setError] = useState(null)

  const subtotal = items.reduce((acc, p) => acc + p.precio * p.cantidad, 0)
  const envio = 0
  const total = subtotal + envio

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
    if (items.length === 0) {
      setError('Tu carrito está vacío.')
      return
    }
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
        body: JSON.stringify({ ...form, productos: items, total, envio })
      })
      const data = await res.json()
      if (data.success) {
        vaciar()
        router.push('/orden-confirmada?orden=' + data.numeroOrden + '&total=' + total + '&nombre=' + form.nombre)
      } else {
        setError('Hubo un error al procesar tu pedido. Intentá de nuevo.')
      }
    } catch {
      setError('Hubo un error al procesar tu pedido. Intentá de nuevo.')
    } finally {
      setCargando(false)
    }
  }

  if (items.length === 0) return (
    <div style={{ maxWidth: 520, margin: '0 auto', padding: '80px 32px', textAlign: 'center' }}>
      <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 32, color: 'var(--black)', marginBottom: 12 }}>Tu carrito está vacío</h1>
      <p style={{ color: 'var(--gray-600)', fontSize: 15, marginBottom: 28 }}>Agregá productos antes de proceder al checkout.</p>
      <a href="/" style={{ background: 'var(--black)', color: '#fff', padding: '13px 28px', borderRadius: 5, textDecoration: 'none', fontWeight: 600, fontSize: 14 }}>Ver productos →</a>
    </div>
  )

  return (
    <div style={{ maxWidth: 1100, margin: '0 auto', padding: '56px 32px 96px' }}>
      <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'clamp(32px, 5vw, 48px)', color: 'var(--black)', letterSpacing: '-0.02em', marginBottom: 40 }}>
        Checkout
      </h1>

      <div className="checkout-grid">

        <div>
          <div style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--black)', marginBottom: 16, paddingBottom: 10, borderBottom: '1px solid var(--gray-200)' }}>
            Datos de entrega
          </div>

          <div className="form-row-2">
            <div style={fieldStyle}>
              <label style={labelStyle}>Nombre *</label>
              <input style={inputStyle} value={form.nombre} onChange={e => set('nombre', e.target.value)} placeholder="Juan" />
            </div>
            <div style={fieldStyle}>
              <label style={labelStyle}>Apellido *</label>
              <input style={inputStyle} value={form.apellido} onChange={e => set('apellido', e.target.value)} placeholder="Pérez" />
            </div>
          </div>

          <div className="form-row-2">
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

          <div className="form-row-2">
            <div style={fieldStyle}>
              <label style={labelStyle}>Teléfono *</label>
              <input style={inputStyle} value={form.telefono} onChange={e => set('telefono', e.target.value)} placeholder="6340-9795" />
            </div>
            <div style={fieldStyle}>
              <label style={labelStyle}>Correo electrónico *</label>
              <input style={inputStyle} type="email" value={form.correo} onChange={e => set('correo', e.target.value)} placeholder="correo@email.com" />
            </div>
          </div>

          <div style={fieldStyle}>
            <label style={labelStyle}>Notas adicionales (opcional)</label>
            <textarea style={{ ...inputStyle, height: 80, resize: 'vertical' }} value={form.notas} onChange={e => set('notas', e.target.value)} placeholder="Instrucciones especiales de entrega..." />
          </div>

          <div style={{ marginTop: 8, padding: '14px 16px', background: 'var(--gray-100)', borderRadius: 8, fontSize: 13, color: 'var(--gray-600)', lineHeight: 1.6 }}>
            <div style={{ fontWeight: 700, color: 'var(--black)', marginBottom: 8, fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.07em' }}>Tiempos de procesamiento</div>
            <div style={{ marginBottom: 4 }}><strong style={{ color: 'var(--black)' }}>Antes de las 5:30 p.m.</strong> — Pedidos confirmados antes de esa hora se procesan el mismo día hábil.</div>
            <div style={{ marginBottom: 4 }}><strong style={{ color: 'var(--black)' }}>Después de las 5:30 p.m.</strong> — Se procesan el siguiente día hábil.</div>
            <div><strong style={{ color: 'var(--black)' }}>Sábado o Domingo</strong> — Pedidos del fin de semana se procesan el Lunes.</div>
          </div>

          {error && (
            <div style={{ background: '#FEE2E2', border: '1px solid #FCA5A5', borderRadius: 6, padding: '10px 14px', fontSize: 13, color: '#DC2626', marginTop: 16 }}>
              {error}
            </div>
          )}
        </div>

        <div>
          <div style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--black)', marginBottom: 16, paddingBottom: 10, borderBottom: '1px solid var(--gray-200)' }}>
            Resumen del pedido
          </div>

          <div style={{ marginBottom: 16 }}>
            {items.map(p => (
              <div key={p.id} style={{ display: 'flex', gap: 10, marginBottom: 12, alignItems: 'center' }}>
                <div style={{ width: 44, height: 44, background: 'var(--gray-100)', borderRadius: 6, flexShrink: 0, overflow: 'hidden' }}>
                  {p.imagen && <img src={p.imagen} alt={p.nombre} style={{ width: '100%', height: '100%', objectFit: 'contain', padding: 4 }} />}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 500, color: 'var(--black)' }}>{p.nombre}</div>
                  <div style={{ fontSize: 11, color: 'var(--gray-400)' }}>{p.marca} x{p.cantidad}</div>
                </div>
                <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--black)', flexShrink: 0 }}>
                  ₡{(p.precio * p.cantidad).toLocaleString('es-CR')}
                </div>
              </div>
            ))}
          </div>

          <div style={{ borderTop: '1px solid var(--gray-200)', paddingTop: 14, marginBottom: 20 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, color: 'var(--gray-600)', marginBottom: 8 }}>
              <span>Subtotal</span>
              <span>₡{subtotal.toLocaleString('es-CR')}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, fontWeight: 600, marginBottom: 14, color: envio === 0 ? '#16a34a' : 'var(--black)' }}>
              <span>Envío</span>
              <span>{envio === 0 ? 'Gratis' : '₡' + envio.toLocaleString('es-CR')}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', borderTop: '1px solid var(--gray-200)', paddingTop: 12 }}>
              <span style={{ fontSize: 15, fontWeight: 600, color: 'var(--black)' }}>Total</span>
              <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 26, color: 'var(--black)', letterSpacing: '-0.02em' }}>
                ₡{total.toLocaleString('es-CR')}
              </span>
            </div>
          </div>

          <div style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--black)', marginBottom: 12 }}>
            Método de pago
          </div>

          <div style={{ padding: '12px 14px', borderRadius: 8, border: '1.5px solid var(--gray-200)', background: 'var(--gray-100)', marginBottom: 20 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--black)', marginBottom: 3 }}>Transferencia bancaria</div>
            <div style={{ fontSize: 11, color: 'var(--gray-600)' }}>Pagás antes de la entrega. Te enviamos los datos bancarios para completar la transferencia.</div>
          </div>

          <button onClick={handleSubmit} disabled={cargando} style={{ width: '100%', background: cargando ? 'var(--gray-400)' : 'var(--black)', color: '#fff', border: 'none', borderRadius: 6, padding: '14px', fontWeight: 600, fontSize: 15, cursor: cargando ? 'not-allowed' : 'pointer', fontFamily: 'var(--font-body)', transition: 'background 0.15s' }}>
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