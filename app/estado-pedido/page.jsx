'use client'
import { useState } from 'react'

const estados = {
  recibido: {
    label: 'Pedido recibido',
    desc: 'Tu pedido fue recibido correctamente. Estamos verificando tu pago.',
    color: '#F9BE16',
    bg: '#FFF8E1',
    border: '#F9BE16',
    step: 1,
  },
  pago_verificado: {
    label: 'Pago verificado',
    desc: 'Tu transferencia fue confirmada. Estamos preparando tu pedido.',
    color: '#1E3A8A',
    bg: '#EEF2FF',
    border: '#C7D2FE',
    step: 2,
  },
  preparando: {
    label: 'Preparando pedido',
    desc: 'Estamos alistando todos los productos de tu pedido.',
    color: '#7C3AED',
    bg: '#F5F3FF',
    border: '#DDD6FE',
    step: 3,
  },
  en_camino: {
    label: 'En camino',
    desc: 'Tu pedido ya salio para entrega. Pronto estara en tus manos.',
    color: '#0284C7',
    bg: '#E0F2FE',
    border: '#BAE6FD',
    step: 4,
  },
  entregado: {
    label: 'Entregado',
    desc: 'Tu pedido fue entregado exitosamente. Gracias por tu compra.',
    color: '#16A34A',
    bg: '#F0FDF4',
    border: '#BBF7D0',
    step: 5,
  },
}

const pasos = [
  { key: 'recibido',       label: 'Recibido' },
  { key: 'pago_verificado',label: 'Pago verificado' },
  { key: 'preparando',     label: 'Preparando' },
  { key: 'en_camino',      label: 'En camino' },
  { key: 'entregado',      label: 'Entregado' },
]

export default function EstadoPedidoPage() {
  const [numero, setNumero] = useState('')
  const [pedido, setPedido] = useState(null)
  const [cargando, setCargando] = useState(false)
  const [error, setError] = useState(null)

  const buscar = async () => {
    if (!numero.trim()) return
    setCargando(true)
    setError(null)
    setPedido(null)

    try {
      const res = await fetch('/api/estado-pedido?orden=' + encodeURIComponent(numero.trim()))
      const data = await res.json()
      if (data.pedido) {
        setPedido(data.pedido)
      } else {
        setError('No encontramos un pedido con ese numero. Verificá que sea correcto.')
      }
    } catch {
      setError('Hubo un error al buscar tu pedido. Intentá de nuevo.')
    } finally {
      setCargando(false)
    }
  }

  const inputStyle = {
    width: '100%',
    padding: '13px 16px',
    fontSize: 15,
    border: '1.5px solid var(--gray-200)',
    borderRadius: 6,
    fontFamily: 'var(--font-body)',
    outline: 'none',
    color: 'var(--black)',
    letterSpacing: '0.05em',
  }

  const estadoActual = pedido ? estados[pedido.estado] : null

  return (
    <div style={{ maxWidth: 620, margin: '0 auto', padding: '64px 32px 96px' }}>

      <div style={{ marginBottom: 48 }}>
        <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#1E3A8A', marginBottom: 10 }}>Soporte</div>
        <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'clamp(40px, 6vw, 64px)', lineHeight: 0.95, color: 'var(--black)', letterSpacing: '-0.02em', marginBottom: 16 }}>
          Estado de<br />tu pedido
        </h1>
        <p style={{ fontSize: 14, color: 'var(--gray-400)', borderTop: '1px solid var(--gray-200)', paddingTop: 16, marginTop: 16 }}>
          Ingresa tu numero de orden para ver el estado actual.
        </p>
      </div>

      {/* BUSCADOR */}
      <div style={{ marginBottom: 40 }}>
        <label style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase', color: 'var(--gray-600)', display: 'block', marginBottom: 8 }}>
          Numero de orden
        </label>
        <div style={{ display: 'flex', gap: 10 }}>
          <input
            style={inputStyle}
            value={numero}
            onChange={(e) => setNumero(e.target.value)}
            placeholder="TA-20260525-0001"
            onKeyDown={(e) => e.key === 'Enter' && buscar()}
          />
          <button
            onClick={buscar}
            disabled={cargando}
            style={{
              background: cargando ? 'var(--gray-400)' : 'var(--black)',
              color: '#fff',
              border: 'none',
              borderRadius: 6,
              padding: '13px 24px',
              fontWeight: 600,
              fontSize: 14,
              cursor: cargando ? 'not-allowed' : 'pointer',
              whiteSpace: 'nowrap',
              fontFamily: 'var(--font-body)',
            }}
          >
            {cargando ? 'Buscando...' : 'Buscar'}
          </button>
        </div>
        <div style={{ fontSize: 12, color: 'var(--gray-400)', marginTop: 6 }}>
          El numero de orden lo encontras en el correo de confirmacion que te enviamos.
        </div>
      </div>

      {/* ERROR */}
      {error && (
        <div style={{
          background: '#FEE2E2',
          border: '1px solid #FCA5A5',
          borderRadius: 6,
          padding: '14px 18px',
          fontSize: 14,
          color: '#DC2626',
          marginBottom: 32,
        }}>
          {error}
        </div>
      )}

      {/* RESULTADO */}
      {pedido && estadoActual && (
        <div>
          {/* ESTADO ACTUAL */}
          <div style={{
            background: estadoActual.bg,
            border: `1px solid ${estadoActual.border}`,
            borderLeft: `4px solid ${estadoActual.color}`,
            borderRadius: '0 8px 8px 0',
            padding: '20px 24px',
            marginBottom: 28,
          }}>
            <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: estadoActual.color, marginBottom: 6 }}>
              Estado actual
            </div>
            <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 22, color: 'var(--black)', marginBottom: 6 }}>
              {estadoActual.label}
            </div>
            <div style={{ fontSize: 14, color: 'var(--gray-600)' }}>
              {estadoActual.desc}
            </div>
          </div>

          {/* BARRA DE PROGRESO */}
          <div style={{ marginBottom: 32 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', position: 'relative', marginBottom: 8 }}>
              <div style={{
                position: 'absolute',
                top: 12,
                left: 0,
                right: 0,
                height: 2,
                background: 'var(--gray-200)',
                zIndex: 0,
              }} />
              <div style={{
                position: 'absolute',
                top: 12,
                left: 0,
                height: 2,
                background: '#1E3A8A',
                width: `${((estadoActual.step - 1) / 4) * 100}%`,
                transition: 'width 0.5s ease',
                zIndex: 1,
              }} />
              {pasos.map((paso, i) => (
                <div key={paso.key} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, zIndex: 2, flex: 1 }}>
                  <div style={{
                    width: 24,
                    height: 24,
                    borderRadius: '50%',
                    background: i + 1 <= estadoActual.step ? '#1E3A8A' : 'var(--gray-200)',
                    border: `2px solid ${i + 1 <= estadoActual.step ? '#1E3A8A' : 'var(--gray-200)'}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                    {i + 1 < estadoActual.step && (
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20 6 9 17l-5-5"/>
                      </svg>
                    )}
                    {i + 1 === estadoActual.step && (
                      <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#fff' }} />
                    )}
                  </div>
                  <div style={{ fontSize: 11, color: i + 1 <= estadoActual.step ? 'var(--black)' : 'var(--gray-400)', fontWeight: i + 1 === estadoActual.step ? 700 : 400, textAlign: 'center' }}>
                    {paso.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* DETALLES DEL PEDIDO */}
          <div style={{ border: '1px solid var(--gray-200)', borderRadius: 8, overflow: 'hidden', marginBottom: 24 }}>
            <div style={{ background: 'var(--gray-100)', padding: '12px 20px', borderBottom: '1px solid var(--gray-200)' }}>
              <div style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--gray-600)' }}>
                Detalles del pedido
              </div>
            </div>
            <div style={{ padding: '16px 20px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <div>
                  <div style={{ fontSize: 11, color: 'var(--gray-400)', marginBottom: 2 }}>Numero de orden</div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: '#1E3A8A' }}>{pedido.numero_orden}</div>
                </div>
                <div>
                  <div style={{ fontSize: 11, color: 'var(--gray-400)', marginBottom: 2 }}>Cliente</div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--black)' }}>{pedido.nombre} {pedido.apellido}</div>
                </div>
                <div>
                  <div style={{ fontSize: 11, color: 'var(--gray-400)', marginBottom: 2 }}>Total</div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--black)' }}>₡{pedido.total?.toLocaleString('es-CR')}</div>
                </div>
                <div>
                  <div style={{ fontSize: 11, color: 'var(--gray-400)', marginBottom: 2 }}>Fecha</div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--black)' }}>
                    {new Date(pedido.created_at).toLocaleDateString('es-CR')}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* CTA WHATSAPP */}
          <div style={{ background: 'var(--gray-100)', border: '1px solid var(--gray-200)', borderRadius: 8, padding: '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16 }}>
            <div style={{ fontSize: 14, color: 'var(--gray-600)' }}>
              Tenes alguna consulta sobre tu pedido?
            </div>
            <a href={'https://wa.me/50663409795?text=Hola, tengo una consulta sobre mi pedido ' + pedido.numero_orden} target="_blank" rel="noreferrer" style={{
              background: '#25D366',
              color: '#fff',
              padding: '10px 18px',
              borderRadius: 6,
              fontWeight: 600,
              fontSize: 13,
              textDecoration: 'none',
              whiteSpace: 'nowrap',
            }}>
              Contactar por WhatsApp
            </a>
          </div>
        </div>
      )}

      <a href="/" style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 8,
        background: 'var(--black)',
        color: 'var(--white)',
        padding: '12px 24px',
        borderRadius: 5,
        fontWeight: 600,
        fontSize: 14,
        textDecoration: 'none',
        marginTop: 40,
      }}>
        Volver al inicio
      </a>
    </div>
  )
}