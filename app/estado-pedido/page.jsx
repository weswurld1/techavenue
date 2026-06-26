'use client'
import { useState } from 'react'

const ESTADOS = {
  recibido:       { label: 'Pedido recibido',   desc: 'Tu pedido fue recibido correctamente. Estamos verificando tu pago.', step: 1, color: '#D97706', bg: '#FFFBEB' },
  pago_verificado:{ label: 'Pago verificado',   desc: 'Tu transferencia fue confirmada. Estamos preparando tu pedido.',    step: 2, color: '#1E3A8A', bg: '#EEF2FF' },
  preparando:     { label: 'Preparando pedido', desc: 'Estamos alistando todos los productos de tu pedido.',               step: 3, color: '#6D28D9', bg: '#F5F3FF' },
  en_camino:      { label: 'En camino',         desc: 'Tu pedido ya salio para entrega. Pronto estara en tus manos.',      step: 4, color: '#0369A1', bg: '#E0F2FE' },
  entregado:      { label: 'Entregado',         desc: 'Tu pedido fue entregado exitosamente. Gracias por tu compra.',      step: 5, color: '#15803D', bg: '#F0FDF4' },
}

const PASOS = [
  { key: 'recibido',        label: 'Recibido' },
  { key: 'pago_verificado', label: 'Pago' },
  { key: 'preparando',      label: 'Preparando' },
  { key: 'en_camino',       label: 'En camino' },
  { key: 'entregado',       label: 'Entregado' },
]

export default function EstadoPedidoPage() {
  const [numero, setNumero]   = useState('')
  const [pedido, setPedido]   = useState(null)
  const [cargando, setCargando] = useState(false)
  const [error, setError]     = useState(null)

  const buscar = async () => {
    if (!numero.trim()) return
    setCargando(true); setError(null); setPedido(null)
    try {
      const res  = await fetch('/api/estado-pedido?orden=' + encodeURIComponent(numero.trim()))
      const data = await res.json()
      if (data.pedido) setPedido(data.pedido)
      else setError('No encontramos un pedido con ese numero. Verificá que sea correcto.')
    } catch {
      setError('Hubo un error al buscar tu pedido. Intentá de nuevo.')
    } finally {
      setCargando(false)
    }
  }

  const estado = pedido ? ESTADOS[pedido.estado] : null
  const progreso = estado ? ((estado.step - 1) / 4) * 100 : 0

  return (
    <div style={{ minHeight: '70vh', background: 'var(--white)', overflowX: 'hidden' }}>

      <div style={{ borderBottom: '1px solid var(--gray-200)', padding: '48px clamp(16px, 5vw, 32px) 40px', maxWidth: 680, margin: '0 auto' }}>
        <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: 12 }}>
          Soporte
        </div>
        <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'clamp(42px, 6vw, 68px)', lineHeight: 0.92, letterSpacing: '-0.02em', color: 'var(--black)', marginBottom: 20 }}>
          Estado de<br />tu pedido
        </h1>
        <p style={{ fontSize: 15, color: 'var(--gray-600)', maxWidth: 420 }}>
          Ingresa tu numero de orden para ver en tiempo real donde esta tu compra.
        </p>
      </div>

      <div style={{ maxWidth: 680, margin: '0 auto', padding: '40px clamp(16px, 5vw, 32px) 96px' }}>
        <a href="/" className="page-back">← Inicio</a>

        <div style={{ marginBottom: 40 }}>
          <label style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--gray-600)', display: 'block', marginBottom: 10 }}>
            Numero de orden
          </label>
          <div style={{ display: 'flex', gap: 10 }}>
            <input
              value={numero}
              onChange={e => setNumero(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && buscar()}
              placeholder="TA-20260525-0001"
              style={{ flex: 1, padding: '14px 18px', fontSize: 15, border: '1.5px solid var(--gray-200)', borderRadius: 6, fontFamily: 'var(--font-body)', outline: 'none', letterSpacing: '0.04em', color: 'var(--black)' }}
            />
            <button
              onClick={buscar}
              disabled={cargando}
              style={{ background: cargando ? 'var(--gray-400)' : 'var(--black)', color: '#fff', border: 'none', borderRadius: 6, padding: '14px 28px', fontWeight: 600, fontSize: 14, cursor: cargando ? 'not-allowed' : 'pointer', whiteSpace: 'nowrap', fontFamily: 'var(--font-body)', transition: 'background 0.15s' }}
            >
              {cargando ? 'Buscando...' : 'Buscar'}
            </button>
          </div>
          <div style={{ fontSize: 12, color: 'var(--gray-400)', marginTop: 8 }}>
            Encontras el numero de orden en el correo de confirmacion que te enviamos.
          </div>
        </div>

        {error && (
          <div style={{ background: '#FEF2F2', border: '1px solid #FCA5A5', borderLeft: '4px solid #DC2626', borderRadius: '0 6px 6px 0', padding: '16px 20px', fontSize: 14, color: '#991B1B', marginBottom: 32 }}>
            {error}
          </div>
        )}

        {pedido && estado && (
          <div>

            <div style={{ background: estado.bg, border: '1px solid var(--gray-200)', borderRadius: 12, padding: '32px 28px', marginBottom: 32, position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: 0, left: 0, width: 5, height: '100%', background: estado.color, borderRadius: '12px 0 0 12px' }} />
              <div style={{ paddingLeft: 8 }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 8, flexWrap: 'wrap', marginBottom: 16 }}>
                  <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: estado.color }}>
                    Estado actual — paso {estado.step} de 5
                  </div>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: 12, fontWeight: 700, color: 'var(--gray-400)', letterSpacing: '0.05em', flexShrink: 0 }}>
                    {pedido.numero_orden}
                  </div>
                </div>
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'clamp(28px, 5vw, 40px)', color: 'var(--black)', letterSpacing: '-0.02em', lineHeight: 1, marginBottom: 12 }}>
                  {estado.label}
                </div>
                <div style={{ fontSize: 14, color: 'var(--gray-600)', lineHeight: 1.6 }}>
                  {estado.desc}
                </div>
              </div>
            </div>

            <div style={{ marginBottom: 36, padding: '0 4px' }}>
              <div style={{ position: 'relative', marginBottom: 16 }}>
                <div style={{ height: 4, background: 'var(--gray-200)', borderRadius: 4 }} />
                <div style={{ position: 'absolute', top: 0, left: 0, height: 4, borderRadius: 4, background: estado.color, width: `${progreso}%`, transition: 'width 0.6s ease' }} />
              </div>
              <div className="estado-pasos-row">
                {PASOS.map((paso, i) => {
                  const hecho    = i + 1 < estado.step
                  const actual   = i + 1 === estado.step
                  const pendiente = i + 1 > estado.step
                  return (
                    <div key={paso.key} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, flex: 1 }}>
                      <div className="estado-paso-circle" style={{
                        borderRadius: '50%',
                        background: hecho ? estado.color : actual ? estado.color : 'var(--white)',
                        border: `2px solid ${pendiente ? 'var(--gray-200)' : estado.color}`,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        transition: 'all 0.3s', flexShrink: 0,
                      }}>
                        {hecho && (
                          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
                        )}
                        {actual && <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#fff' }} />}
                      </div>
                      <div className="estado-paso-label" style={{ fontWeight: actual ? 700 : 400, color: pendiente ? 'var(--gray-400)' : 'var(--black)', textAlign: 'center', lineHeight: 1.3 }}>
                        {paso.label}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            <div style={{ border: '1px solid var(--gray-200)', borderRadius: 8, overflow: 'hidden', marginBottom: 24 }}>
              <div style={{ padding: '14px 20px', borderBottom: '1px solid var(--gray-200)', background: 'var(--gray-100)' }}>
                <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--gray-600)' }}>Detalles del pedido</div>
              </div>
              <div className="estado-detalles-grid">
                {[
                  { label: 'Numero de orden', value: pedido.numero_orden,  accent: true },
                  { label: 'Cliente',          value: `${pedido.nombre} ${pedido.apellido}` },
                  { label: 'Total',            value: `₡${pedido.total?.toLocaleString('es-CR')}` },
                  { label: 'Fecha',            value: new Date(pedido.created_at).toLocaleDateString('es-CR') },
                ].map((item, i) => (
                  <div key={i} style={{ padding: '14px 20px', borderBottom: i < 2 ? '1px solid var(--gray-200)' : 'none', borderRight: i % 2 === 0 ? '1px solid var(--gray-200)' : 'none' }}>
                    <div style={{ fontSize: 11, color: 'var(--gray-400)', marginBottom: 4 }}>{item.label}</div>
                    <div style={{ fontSize: 14, fontWeight: 600, color: item.accent ? estado.color : 'var(--black)' }}>{item.value}</div>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ border: '1px solid var(--gray-200)', borderRadius: 8, padding: '20px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
              <div>
                <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--black)', marginBottom: 4 }}>Tenes alguna consulta?</div>
                <div style={{ fontSize: 13, color: 'var(--gray-600)' }}>Nuestro equipo te responde por WhatsApp en minutos.</div>
              </div>
              <a
                href={`https://wa.me/50663409795?text=Hola, tengo una consulta sobre mi pedido ${pedido.numero_orden}`}
                target="_blank" rel="noreferrer"
                style={{ background: '#25D366', color: '#fff', padding: '12px 22px', borderRadius: 6, fontWeight: 600, fontSize: 14, textDecoration: 'none', whiteSpace: 'nowrap', display: 'flex', alignItems: 'center', gap: 8 }}
              >
                <svg width="16" height="16" viewBox="0 0 32 32" fill="white"><path d="M16 0C7.163 0 0 7.163 0 16c0 2.824.738 5.47 2.031 7.772L0 32l8.469-2.219A15.93 15.93 0 0 0 16 32c8.837 0 16-7.163 16-16S24.837 0 16 0zm8.32 22.72c-.347.977-2.025 1.867-2.773 1.936-.748.07-1.469.36-4.96-1.036-4.208-1.666-6.896-5.936-7.104-6.208-.208-.272-1.664-2.213-1.664-4.224 0-2.01 1.053-3.002 1.427-3.413.373-.41.813-.513 1.083-.513.27 0 .54.003.776.014.25.012.585-.095.916.699.347.824 1.179 2.84 1.283 3.047.104.207.174.45.035.726-.139.275-.208.446-.416.687-.207.24-.437.537-.624.721-.208.204-.424.424-.183.833.241.41 1.072 1.765 2.302 2.86 1.582 1.41 2.914 1.848 3.323 2.057.41.208.649.174.89-.104.24-.277.997-1.162 1.264-1.56.267-.4.534-.333.9-.2.366.133 2.338 1.102 2.738 1.302.4.2.665.3.765.467.1.167.1.958-.247 1.91z"/></svg>
                Contactar por WhatsApp
              </a>
            </div>

          </div>
        )}


      </div>
    </div>
  )
}
