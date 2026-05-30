'use client'
import { useState, useEffect } from 'react'

const CONTRASENA = 'TechAvenue2026!'

const ESTADOS = [
  { value: 'recibido',        label: 'Recibido' },
  { value: 'pago_verificado', label: 'Pago verificado' },
  { value: 'preparando',      label: 'Preparando' },
  { value: 'en_camino',       label: 'En camino' },
  { value: 'entregado',       label: 'Entregado' },
]

const FILTROS = [
  { key: 'todos',         label: 'Todos' },
  { key: 'anticipado',    label: 'Pago anticipado' },
  { key: 'contraentrega', label: 'Contra entrega' },
  { key: 'garantia',      label: 'En garantia' },
  { key: 'archivados',    label: 'Archivados' },
]

export default function AdminPage() {
  const [pedidos, setPedidos] = useState([])
  const [cargando, setCargando] = useState(true)
  const [guardando, setGuardando] = useState(null)
  const [autenticado, setAutenticado] = useState(false)
  const [input, setInput] = useState('')
  const [errorAuth, setErrorAuth] = useState(false)
  const [filtro, setFiltro] = useState('todos')
  const [skuInput, setSkuInput] = useState('')
  const [destacados, setDestacados] = useState([])
  const [cargandoDestacados, setCargandoDestacados] = useState(true)

  const login = () => {
    if (input === CONTRASENA) {
      setAutenticado(true)
    } else {
      setErrorAuth(true)
      setTimeout(() => setErrorAuth(false), 2000)
    }
  }

  useEffect(() => {
    if (!autenticado) return
    fetch('/api/admin/pedidos')
      .then(r => r.json())
      .then(d => { setPedidos(d.pedidos || []); setCargando(false) })
    fetch('/api/destacados')
      .then(r => r.json())
      .then(d => { setDestacados(d.productos || []); setCargandoDestacados(false) })
  }, [autenticado])

  const cambiarEstado = async (id, estado) => {
    setGuardando(id + '-estado')
    await fetch('/api/admin/actualizar-estado', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, estado })
    })
    setPedidos(prev => prev.map(p => p.id === id ? { ...p, estado } : p))
    setGuardando(null)
  }

  const toggleGarantia = async (id, valor) => {
    setGuardando(id + '-garantia')
    await fetch('/api/admin/actualizar-estado', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, en_garantia: valor })
    })
    setPedidos(prev => prev.map(p => p.id === id ? { ...p, en_garantia: valor } : p))
    setGuardando(null)
  }

  const toggleArchivado = async (id, valor) => {
    setGuardando(id + '-archivado')
    await fetch('/api/admin/actualizar-estado', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, archivado: valor })
    })
    setPedidos(prev => prev.map(p => p.id === id ? { ...p, archivado: valor } : p))
    setGuardando(null)
  }

  const agregarDestacado = async () => {
    if (!skuInput.trim()) return
    await fetch('/api/destacados', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ sku: skuInput.trim() })
    })
    setDestacados(prev => [...prev, { sku: skuInput.trim() }])
    setSkuInput('')
  }

  const eliminarDestacado = async (id) => {
    await fetch('/api/destacados', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id })
    })
    setDestacados(prev => prev.filter(d => d.id !== id))
  }

  const pedidosFiltrados = pedidos.filter(p => {
    if (filtro === 'archivados') return p.archivado
    if (p.archivado) return false
    if (filtro === 'todos') return true
    if (filtro === 'anticipado') return p.metodo_pago === 'anticipado'
    if (filtro === 'contraentrega') return p.metodo_pago === 'contraentrega'
    if (filtro === 'garantia') return p.en_garantia
    return true
  })

  const badgeEstado = (estado) => {
    const map = {
      recibido:        { bg: '#FFF8E1', color: '#B45309' },
      pago_verificado: { bg: '#EEF2FF', color: '#1E3A8A' },
      preparando:      { bg: '#F5F3FF', color: '#7C3AED' },
      en_camino:       { bg: '#E0F2FE', color: '#0284C7' },
      entregado:       { bg: '#F0FDF4', color: '#16A34A' },
    }
    return map[estado] || { bg: '#F3F4F6', color: '#6B7280' }
  }

  if (!autenticado) return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '60vh', gap: 16 }}>
      <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 32 }}>Panel Admin</h1>
      <input
        type="password"
        placeholder="Contraseña"
        value={input}
        onChange={e => setInput(e.target.value)}
        onKeyDown={e => e.key === 'Enter' && login()}
        style={{ padding: '10px 16px', fontSize: 14, border: `1.5px solid ${errorAuth ? '#FCA5A5' : 'var(--gray-200)'}`, borderRadius: 6, width: 260, outline: 'none' }}
      />
      {errorAuth && <div style={{ color: '#DC2626', fontSize: 13 }}>Contraseña incorrecta</div>}
      <button onClick={login} style={{ background: 'var(--black)', color: '#fff', border: 'none', borderRadius: 6, padding: '10px 28px', fontWeight: 600, fontSize: 14, cursor: 'pointer' }}>
        Entrar
      </button>
    </div>
  )

  if (cargando) return <div style={{ padding: 40 }}>Cargando pedidos...</div>

  return (
    <div style={{ maxWidth: 1200, margin: '0 auto', padding: '48px 32px' }}>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 32 }}>
        <div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 40, margin: 0 }}>Panel Admin</h1>
          <p style={{ color: 'var(--gray-400)', fontSize: 14, marginTop: 4 }}>{pedidos.filter(p => !p.archivado).length} pedidos activos</p>
        </div>
        <div style={{ display: 'flex', gap: 16, fontSize: 13 }}>
          <div style={{ background: '#F0FDF4', border: '1px solid #BBF7D0', borderRadius: 8, padding: '10px 16px', textAlign: 'center' }}>
            <div style={{ fontWeight: 700, color: '#16A34A', fontSize: 20 }}>{pedidos.filter(p => !p.archivado && p.metodo_pago === 'anticipado').length}</div>
            <div style={{ color: '#16A34A', fontSize: 11 }}>Pago anticipado</div>
          </div>
          <div style={{ background: '#EEF2FF', border: '1px solid #C7D2FE', borderRadius: 8, padding: '10px 16px', textAlign: 'center' }}>
            <div style={{ fontWeight: 700, color: '#1E3A8A', fontSize: 20 }}>{pedidos.filter(p => !p.archivado && p.metodo_pago === 'contraentrega').length}</div>
            <div style={{ color: '#1E3A8A', fontSize: 11 }}>Contra entrega</div>
          </div>
          <div style={{ background: '#FFF8E1', border: '1px solid #FDE68A', borderRadius: 8, padding: '10px 16px', textAlign: 'center' }}>
            <div style={{ fontWeight: 700, color: '#B45309', fontSize: 20 }}>{pedidos.filter(p => p.en_garantia).length}</div>
            <div style={{ color: '#B45309', fontSize: 11 }}>En garantia</div>
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', gap: 8, marginBottom: 24, borderBottom: '1px solid var(--gray-200)', paddingBottom: 0 }}>
        {FILTROS.map(f => (
          <button
            key={f.key}
            onClick={() => setFiltro(f.key)}
            style={{
              padding: '10px 18px', fontSize: 13, fontWeight: 600, cursor: 'pointer',
              border: 'none', background: 'none', fontFamily: 'var(--font-body)',
              borderBottom: filtro === f.key ? '2px solid var(--black)' : '2px solid transparent',
              color: filtro === f.key ? 'var(--black)' : 'var(--gray-400)',
              marginBottom: -1, transition: 'all 0.15s',
            }}
          >
            {f.label}
            <span style={{ marginLeft: 6, fontSize: 11, background: filtro === f.key ? 'var(--black)' : 'var(--gray-200)', color: filtro === f.key ? '#fff' : 'var(--gray-600)', borderRadius: 20, padding: '1px 7px' }}>
              {f.key === 'todos' && pedidos.filter(p => !p.archivado).length}
              {f.key === 'anticipado' && pedidos.filter(p => !p.archivado && p.metodo_pago === 'anticipado').length}
              {f.key === 'contraentrega' && pedidos.filter(p => !p.archivado && p.metodo_pago === 'contraentrega').length}
              {f.key === 'garantia' && pedidos.filter(p => p.en_garantia).length}
              {f.key === 'archivados' && pedidos.filter(p => p.archivado).length}
            </span>
          </button>
        ))}
      </div>

      {pedidosFiltrados.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '48px 0', color: 'var(--gray-400)', fontSize: 14 }}>
          No hay pedidos en esta categoria.
        </div>
      ) : (
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
          <thead>
            <tr style={{ borderBottom: '2px solid var(--gray-200)', textAlign: 'left' }}>
              {['Orden', 'Cliente', 'Correo', 'Pago', 'Total', 'Fecha', 'Estado', 'Garantia', 'Archivar'].map(h => (
                <th key={h} style={{ padding: '10px 12px', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.07em', color: 'var(--gray-600)' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {pedidosFiltrados.map(p => {
              const badge = badgeEstado(p.estado)
              return (
                <tr key={p.id} style={{ borderBottom: '1px solid var(--gray-200)', background: p.en_garantia ? '#FFFBEB' : 'transparent' }}>
                  <td style={{ padding: '14px 12px', fontWeight: 600, color: '#1E3A8A', whiteSpace: 'nowrap' }}>{p.numero_orden}</td>
                  <td style={{ padding: '14px 12px', whiteSpace: 'nowrap' }}>{p.nombre} {p.apellido}</td>
                  <td style={{ padding: '14px 12px', color: 'var(--gray-600)', fontSize: 13 }}>{p.correo}</td>
                  <td style={{ padding: '14px 12px' }}>
                    <span style={{
                      fontSize: 11, fontWeight: 700, padding: '3px 8px', borderRadius: 20,
                      background: p.metodo_pago === 'anticipado' ? '#F0FDF4' : '#EEF2FF',
                      color: p.metodo_pago === 'anticipado' ? '#16A34A' : '#1E3A8A',
                    }}>
                      {p.metodo_pago === 'anticipado' ? 'Anticipado' : 'Contra entrega'}
                    </span>
                  </td>
                  <td style={{ padding: '14px 12px', fontWeight: 600, whiteSpace: 'nowrap' }}>₡{p.total?.toLocaleString('es-CR')}</td>
                  <td style={{ padding: '14px 12px', color: 'var(--gray-600)', whiteSpace: 'nowrap' }}>{new Date(p.created_at).toLocaleDateString('es-CR')}</td>
                  <td style={{ padding: '14px 12px' }}>
                    <select
                      value={p.estado}
                      disabled={guardando === p.id + '-estado'}
                      onChange={e => cambiarEstado(p.id, e.target.value)}
                      style={{
                        padding: '5px 8px', borderRadius: 6, fontSize: 12, cursor: 'pointer',
                        border: `1.5px solid ${badge.color}`, background: badge.bg, color: badge.color, fontWeight: 600,
                      }}
                    >
                      {ESTADOS.map(e => (
                        <option key={e.value} value={e.value}>{e.label}</option>
                      ))}
                    </select>
                  </td>
                  <td style={{ padding: '14px 12px' }}>
                    <button
                      onClick={() => toggleGarantia(p.id, !p.en_garantia)}
                      disabled={guardando === p.id + '-garantia'}
                      style={{
                        padding: '5px 10px', borderRadius: 6, fontSize: 12, fontWeight: 600, cursor: 'pointer', border: 'none',
                        background: p.en_garantia ? '#FEF3C7' : 'var(--gray-100)',
                        color: p.en_garantia ? '#B45309' : 'var(--gray-400)',
                      }}
                    >
                      {p.en_garantia ? 'Activa' : 'Sin garantia'}
                    </button>
                  </td>
                  <td style={{ padding: '14px 12px' }}>
                    <button
                      onClick={() => toggleArchivado(p.id, !p.archivado)}
                      disabled={guardando === p.id + '-archivado'}
                      style={{
                        padding: '5px 10px', borderRadius: 6, fontSize: 12, fontWeight: 600, cursor: 'pointer', border: 'none',
                        background: p.archivado ? '#F0FDF4' : 'var(--gray-100)',
                        color: p.archivado ? '#16A34A' : 'var(--gray-400)',
                      }}
                    >
                      {p.archivado ? 'Restaurar' : 'Archivar'}
                    </button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      )}

      <div style={{ marginTop: 64 }}>
        <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--black)', marginBottom: 16, paddingBottom: 10, borderBottom: '1px solid var(--gray-200)' }}>
          Productos destacados
        </div>

        <div style={{ display: 'flex', gap: 10, marginBottom: 20 }}>
          <input
            value={skuInput}
            onChange={e => setSkuInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && agregarDestacado()}
            placeholder="Ingresá el SKU del producto"
            style={{ flex: 1, padding: '10px 14px', fontSize: 14, border: '1.5px solid var(--gray-200)', borderRadius: 6, outline: 'none', fontFamily: 'var(--font-body)' }}
          />
          <button
            onClick={agregarDestacado}
            style={{ background: 'var(--black)', color: '#fff', border: 'none', borderRadius: 6, padding: '10px 20px', fontWeight: 600, fontSize: 14, cursor: 'pointer' }}
          >
            Agregar
          </button>
        </div>

        {cargandoDestacados ? (
          <div style={{ fontSize: 14, color: 'var(--gray-400)' }}>Cargando...</div>
        ) : destacados.length === 0 ? (
          <div style={{ fontSize: 14, color: 'var(--gray-400)' }}>No hay productos destacados. Agregá un SKU arriba.</div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {destacados.map(d => (
              <div key={d.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 16px', border: '1px solid var(--gray-200)', borderRadius: 8 }}>
                <div style={{ fontSize: 14, fontWeight: 600, color: '#1E3A8A' }}>SKU: {d.sku}</div>
                <button
                  onClick={() => eliminarDestacado(d.id)}
                  style={{ fontSize: 12, color: '#DC2626', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 600 }}
                >
                  Eliminar
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}