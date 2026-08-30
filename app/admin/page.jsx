'use client'
import { useState, useEffect, useMemo, Fragment } from 'react'

const ESTADOS = [
  { value: 'recibido',        label: 'Recibido' },
  { value: 'pago_verificado', label: 'Pago verificado' },
  { value: 'preparando',      label: 'Preparando' },
  { value: 'en_camino',       label: 'En camino' },
  { value: 'entregado',       label: 'Entregado' },
]

const FILTROS = [
  { key: 'todos',         label: 'Todos' },
  { key: 'anticipado',    label: 'Anticipado' },
  { key: 'contraentrega', label: 'Contraentrega' },
  { key: 'garantia',      label: 'Garantía' },
  { key: 'archivados',    label: 'Archivados' },
]

const BADGE_ESTADO = {
  recibido:        { bg: '#FFF8E1', color: '#B45309' },
  pago_verificado: { bg: '#EEF2FF', color: '#1E3A8A' },
  preparando:      { bg: '#F5F3FF', color: '#7C3AED' },
  en_camino:       { bg: '#E0F2FE', color: '#0284C7' },
  entregado:       { bg: '#F0FDF4', color: '#16A34A' },
}

export default function AdminPage() {
  const [pedidos, setPedidos]                     = useState([])
  const [cargando, setCargando]                   = useState(true)
  const [guardando, setGuardando]                 = useState(null)
  const [autenticado, setAutenticado]             = useState(false)
  const [token, setToken]                         = useState('')
  const [input, setInput]                         = useState('')
  const [errorAuth, setErrorAuth]                 = useState(false)
  const [filtro, setFiltro]                       = useState('todos')
  const [busqueda, setBusqueda]                   = useState('')
  const [expandido, setExpandido]                 = useState(null)
  const [seccion, setSeccion]                     = useState('pedidos')
  const [skuInput, setSkuInput]                   = useState('')
  const [destacados, setDestacados]               = useState([])
  const [cargandoDestacados, setCargandoDestacados] = useState(true)
  const [skuPromoInput, setSkuPromoInput]         = useState('')
  const [promociones, setPromociones]             = useState([])
  const [cargandoPromos, setCargandoPromos]       = useState(true)
  const [skuNovedadInput, setSkuNovedadInput]     = useState('')
  const [novedades, setNovedades]                 = useState([])
  const [cargandoNovedades, setCargandoNovedades] = useState(true)
  const [invalidando, setInvalidando]             = useState(false)
  const [mensajeCache, setMensajeCache]           = useState(null)

  const authHeaders = (extra = {}) => ({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
    ...extra,
  })

  const login = async () => {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password: input }),
    })
    if (res.ok) {
      const { token: t } = await res.json()
      setToken(t)
      setAutenticado(true)
    } else {
      setErrorAuth(true)
      setTimeout(() => setErrorAuth(false), 2000)
    }
  }

  useEffect(() => {
    if (!autenticado) return
    fetch('/api/admin/pedidos', { headers: authHeaders() })
      .then(r => r.json())
      .then(d => { setPedidos(d.pedidos || []); setCargando(false) })
    fetch('/api/destacados')
      .then(r => r.json())
      .then(d => { setDestacados(d.lista || []); setCargandoDestacados(false) })
    fetch('/api/promociones')
      .then(r => r.json())
      .then(d => { setPromociones(d.lista || []); setCargandoPromos(false) })
    fetch('/api/novedades')
      .then(r => r.json())
      .then(d => { setNovedades(d.lista || []); setCargandoNovedades(false) })
  }, [autenticado])

  const cambiarEstado = async (id, estado) => {
    setGuardando(id + '-estado')
    await fetch('/api/admin/actualizar-estado', {
      method: 'POST',
      headers: authHeaders(),
      body: JSON.stringify({ id, estado }),
    })
    setPedidos(prev => prev.map(p => p.id === id ? { ...p, estado } : p))
    setGuardando(null)
  }

  const toggleGarantia = async (id, valor) => {
    setGuardando(id + '-garantia')
    await fetch('/api/admin/actualizar-estado', {
      method: 'POST',
      headers: authHeaders(),
      body: JSON.stringify({ id, en_garantia: valor }),
    })
    setPedidos(prev => prev.map(p => p.id === id ? { ...p, en_garantia: valor } : p))
    setGuardando(null)
  }

  const toggleArchivado = async (id, valor) => {
    setGuardando(id + '-archivado')
    await fetch('/api/admin/actualizar-estado', {
      method: 'POST',
      headers: authHeaders(),
      body: JSON.stringify({ id, archivado: valor }),
    })
    setPedidos(prev => prev.map(p => p.id === id ? { ...p, archivado: valor } : p))
    setGuardando(null)
  }

  const agregarDestacado = async () => {
    if (!skuInput.trim()) return
    await fetch('/api/destacados', {
      method: 'POST',
      headers: authHeaders(),
      body: JSON.stringify({ sku: skuInput.trim() }),
    })
    setDestacados(prev => [...prev, { sku: skuInput.trim() }])
    setSkuInput('')
  }

  const eliminarDestacado = async (id) => {
    await fetch('/api/destacados', {
      method: 'DELETE',
      headers: authHeaders(),
      body: JSON.stringify({ id }),
    })
    setDestacados(prev => prev.filter(d => d.id !== id))
  }

  const agregarPromocion = async () => {
    if (!skuPromoInput.trim()) return
    const res = await fetch('/api/promociones', {
      method: 'POST',
      headers: authHeaders(),
      body: JSON.stringify({ sku: skuPromoInput.trim() }),
    })
    const data = await res.json()
    if (data.success) {
      setPromociones(prev => [...prev, { id: Date.now(), sku: skuPromoInput.trim() }])
      setSkuPromoInput('')
    }
  }

  const eliminarPromocion = async (id) => {
    await fetch('/api/promociones', {
      method: 'DELETE',
      headers: authHeaders(),
      body: JSON.stringify({ id }),
    })
    setPromociones(prev => prev.filter(d => d.id !== id))
  }

  const agregarNovedad = async () => {
    if (!skuNovedadInput.trim()) return
    const res = await fetch('/api/novedades', {
      method: 'POST',
      headers: authHeaders(),
      body: JSON.stringify({ sku: skuNovedadInput.trim() }),
    })
    const data = await res.json()
    if (data.success) {
      setNovedades(prev => [...prev, { id: Date.now(), sku: skuNovedadInput.trim() }])
      setSkuNovedadInput('')
    }
  }

  const eliminarNovedad = async (id) => {
    await fetch('/api/novedades', {
      method: 'DELETE',
      headers: authHeaders(),
      body: JSON.stringify({ id }),
    })
    setNovedades(prev => prev.filter(d => d.id !== id))
  }

  const invalidarCatalogo = async () => {
    setInvalidando(true)
    setMensajeCache(null)
    try {
      const res = await fetch('/api/admin/invalidar-catalogo', {
        method: 'POST',
        headers: authHeaders(),
      })
      const data = await res.json()
      if (data.ok) {
        const hora = data.actualizado_en ? new Date(data.actualizado_en).toLocaleTimeString('es-CR') : ''
        setMensajeCache({ tipo: 'ok', texto: `${data.mensaje}${hora ? ` (${hora})` : ''}` })
      } else {
        setMensajeCache({ tipo: 'error', texto: data.mensaje || data.error })
      }
    } catch {
      setMensajeCache({ tipo: 'error', texto: 'Error de conexión' })
    } finally {
      setInvalidando(false)
    }
  }

  const pedidosFiltrados = useMemo(() => {
    let result = pedidos.filter(p => {
      if (filtro === 'archivados')    return p.archivado
      if (p.archivado)                return false
      if (filtro === 'todos')         return true
      if (filtro === 'anticipado')    return p.metodo_pago === 'anticipado'
      if (filtro === 'contraentrega') return p.metodo_pago === 'contraentrega'
      if (filtro === 'garantia')      return p.en_garantia
      return true
    })
    if (busqueda.trim()) {
      const q = busqueda.toLowerCase()
      result = result.filter(p =>
        p.numero_orden?.toLowerCase().includes(q) ||
        p.nombre?.toLowerCase().includes(q) ||
        p.apellido?.toLowerCase().includes(q) ||
        p.correo?.toLowerCase().includes(q)
      )
    }
    return result
  }, [pedidos, filtro, busqueda])

  const conteos = {
    todos:         pedidos.filter(p => !p.archivado).length,
    anticipado:    pedidos.filter(p => !p.archivado && p.metodo_pago === 'anticipado').length,
    contraentrega: pedidos.filter(p => !p.archivado && p.metodo_pago === 'contraentrega').length,
    garantia:      pedidos.filter(p => p.en_garantia).length,
    archivados:    pedidos.filter(p => p.archivado).length,
  }

  const totalIngresos = pedidos
    .filter(p => !p.archivado)
    .reduce((acc, p) => acc + (p.total || 0), 0)

  if (!autenticado) return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--black)' }}>
      <div style={{ background: '#fff', borderRadius: 14, padding: '48px 40px', width: 360, boxShadow: '0 32px 80px rgba(0,0,0,0.5)' }}>
        <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 26, marginBottom: 4 }}>
          Tech<em style={{ color: '#1E3A8A' }}>Avenue</em>
        </div>
        <div style={{ fontSize: 13, color: 'var(--gray-400)', marginBottom: 36 }}>Panel de administración</div>
        <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--gray-600)', marginBottom: 6 }}>
          Contraseña
        </div>
        <input
          type="password"
          placeholder="••••••••••••"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && login()}
          style={{
            width: '100%', padding: '11px 14px', fontSize: 14, boxSizing: 'border-box',
            border: `1.5px solid ${errorAuth ? '#FCA5A5' : 'var(--gray-200)'}`,
            borderRadius: 8, outline: 'none', fontFamily: 'var(--font-body)', marginBottom: 10,
          }}
        />
        {errorAuth && (
          <div style={{ fontSize: 13, color: '#DC2626', marginBottom: 10, fontWeight: 500 }}>Contraseña incorrecta</div>
        )}
        <button
          onClick={login}
          style={{ width: '100%', background: 'var(--black)', color: '#fff', border: 'none', borderRadius: 8, padding: '12px', fontWeight: 700, fontSize: 14, cursor: 'pointer', fontFamily: 'var(--font-body)' }}
        >
          Ingresar
        </button>
      </div>
    </div>
  )

  if (cargando) return (
    <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--gray-400)', fontSize: 14 }}>
      Cargando panel...
    </div>
  )

  return (
    <div style={{ minHeight: '100vh', background: '#F4F5F7' }}>

      <div style={{ background: 'var(--black)', height: 56, padding: '0 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, zIndex: 100 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 20, color: '#fff' }}>
            Tech<em style={{ color: '#F9BE16' }}>Avenue</em>
            <span style={{ fontSize: 10, fontWeight: 700, color: 'var(--gray-400)', marginLeft: 10, textTransform: 'uppercase', letterSpacing: '0.12em' }}>Admin</span>
          </div>
          <div style={{ width: 1, height: 18, background: '#333' }} />
          <div style={{ display: 'flex', gap: 2 }}>
            {[
              { key: 'pedidos',     label: 'Pedidos' },
              { key: 'destacados',  label: 'Destacados' },
              { key: 'promociones', label: 'Promociones' },
              { key: 'novedades',   label: 'Novedades' },
              { key: 'catalogo',    label: 'Catálogo' },
            ].map(s => (
              <button
                key={s.key}
                onClick={() => setSeccion(s.key)}
                style={{
                  padding: '6px 14px', fontSize: 13, fontWeight: 600, cursor: 'pointer', border: 'none',
                  borderRadius: 6, fontFamily: 'var(--font-body)',
                  background: seccion === s.key ? 'rgba(255,255,255,0.12)' : 'transparent',
                  color: seccion === s.key ? '#fff' : 'var(--gray-400)',
                }}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <a
            href="https://mail.zoho.com/"
            target="_blank"
            rel="noreferrer"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 7, fontSize: 13, fontWeight: 600,
              color: '#fff', textDecoration: 'none', padding: '7px 14px', borderRadius: 7,
              background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)',
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
            </svg>
            Zoho Mail
          </a>
          <button
            onClick={() => { setAutenticado(false); setInput('') }}
            style={{ background: 'transparent', color: 'var(--gray-400)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 7, padding: '7px 14px', fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'var(--font-body)' }}
          >
            Salir
          </button>
        </div>
      </div>

      <div style={{ maxWidth: 1400, margin: '0 auto', padding: '28px 32px 64px' }}>

        {seccion === 'pedidos' && (
          <>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 14, marginBottom: 24 }}>
              {[
                { label: 'Pedidos activos',  value: conteos.todos,         color: '#1E3A8A', bg: '#EEF2FF', border: '#C7D2FE' },
                { label: 'Pago anticipado',  value: conteos.anticipado,    color: '#16A34A', bg: '#F0FDF4', border: '#BBF7D0' },
                { label: 'Contra entrega',   value: conteos.contraentrega, color: '#0284C7', bg: '#E0F2FE', border: '#BAE6FD' },
                { label: 'En garantía',      value: conteos.garantia,      color: '#B45309', bg: '#FFF8E1', border: '#FDE68A' },
                { label: 'Ingresos totales', value: `₡${totalIngresos.toLocaleString('es-CR')}`, color: '#16A34A', bg: '#F0FDF4', border: '#BBF7D0', mono: true },
              ].map(stat => (
                <div key={stat.label} style={{ background: stat.bg, border: `1px solid ${stat.border}`, borderRadius: 10, padding: '16px 20px' }}>
                  <div style={{ fontFamily: stat.mono ? 'var(--font-display)' : 'var(--font-body)', fontWeight: 800, fontSize: stat.mono ? 18 : 32, color: stat.color, lineHeight: 1, marginBottom: 6 }}>
                    {stat.value}
                  </div>
                  <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.07em', color: stat.color, opacity: 0.75 }}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            <div style={{ background: '#fff', borderRadius: 12, border: '1px solid #E5E7EB', overflow: 'hidden' }}>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 20px', borderBottom: '1px solid #E5E7EB' }}>
                <div style={{ display: 'flex' }}>
                  {FILTROS.map(f => (
                    <button
                      key={f.key}
                      onClick={() => setFiltro(f.key)}
                      style={{
                        padding: '14px 14px', fontSize: 13, fontWeight: 600, cursor: 'pointer',
                        border: 'none', background: 'none', fontFamily: 'var(--font-body)',
                        borderBottom: filtro === f.key ? '2px solid var(--black)' : '2px solid transparent',
                        color: filtro === f.key ? 'var(--black)' : 'var(--gray-400)',
                        display: 'flex', alignItems: 'center', gap: 6,
                      }}
                    >
                      {f.label}
                      <span style={{ fontSize: 11, background: filtro === f.key ? 'var(--black)' : '#F3F4F6', color: filtro === f.key ? '#fff' : 'var(--gray-600)', borderRadius: 20, padding: '1px 7px', fontWeight: 700 }}>
                        {conteos[f.key]}
                      </span>
                    </button>
                  ))}
                </div>
                <input
                  value={busqueda}
                  onChange={e => setBusqueda(e.target.value)}
                  placeholder="Buscar orden, cliente o correo..."
                  style={{ padding: '8px 14px', fontSize: 13, border: '1.5px solid #E5E7EB', borderRadius: 8, outline: 'none', width: 280, fontFamily: 'var(--font-body)' }}
                />
              </div>

              {pedidosFiltrados.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '56px 0', color: 'var(--gray-400)', fontSize: 14 }}>
                  No hay pedidos en esta categoría.
                </div>
              ) : (
                <div style={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                    <thead>
                      <tr style={{ background: '#FAFAFA', borderBottom: '1px solid #E5E7EB' }}>
                        {['', 'Orden', 'Cliente', 'Correo', 'Pago', 'Total', 'Fecha', 'Estado', 'Garantía', ''].map((h, i) => (
                          <th key={i} style={{ padding: '10px 14px', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.07em', color: 'var(--gray-600)', textAlign: 'left' }}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {pedidosFiltrados.map(p => {
                        const badge   = BADGE_ESTADO[p.estado] || { bg: '#F3F4F6', color: '#6B7280' }
                        const isOpen  = expandido === p.id
                        const prods   = Array.isArray(p.productos) ? p.productos : (typeof p.productos === 'string' ? JSON.parse(p.productos) : [])
                        return (
                          <Fragment key={p.id}>
                            <tr
                              style={{ borderBottom: isOpen ? 'none' : '1px solid #E5E7EB', background: p.en_garantia ? '#FFFBEB' : '#fff', cursor: 'pointer' }}
                              onClick={() => setExpandido(isOpen ? null : p.id)}
                            >
                              <td style={{ padding: '14px 6px 14px 16px', width: 20 }}>
                                <span style={{ fontSize: 9, color: 'var(--gray-400)', display: 'inline-block', transform: isOpen ? 'rotate(90deg)' : 'none', transition: 'transform 0.15s' }}>▶</span>
                              </td>
                              <td style={{ padding: '14px', fontWeight: 700, color: '#1E3A8A', whiteSpace: 'nowrap' }}>{p.numero_orden}</td>
                              <td style={{ padding: '14px', fontWeight: 600, whiteSpace: 'nowrap' }}>{p.nombre} {p.apellido}</td>
                              <td style={{ padding: '14px', color: 'var(--gray-600)', fontSize: 12 }}>{p.correo}</td>
                              <td style={{ padding: '14px' }}>
                                <span style={{ fontSize: 11, fontWeight: 700, padding: '3px 9px', borderRadius: 20, background: p.metodo_pago === 'anticipado' ? '#F0FDF4' : '#EEF2FF', color: p.metodo_pago === 'anticipado' ? '#16A34A' : '#1E3A8A' }}>
                                  {p.metodo_pago === 'anticipado' ? 'Anticipado' : 'Contraentrega'}
                                </span>
                              </td>
                              <td style={{ padding: '14px', fontWeight: 700, whiteSpace: 'nowrap' }}>₡{p.total?.toLocaleString('es-CR')}</td>
                              <td style={{ padding: '14px', color: 'var(--gray-600)', whiteSpace: 'nowrap' }}>{new Date(p.created_at).toLocaleDateString('es-CR')}</td>
                              <td style={{ padding: '14px' }} onClick={e => e.stopPropagation()}>
                                <select
                                  value={p.estado}
                                  disabled={guardando === p.id + '-estado'}
                                  onChange={e => cambiarEstado(p.id, e.target.value)}
                                  style={{ padding: '5px 8px', borderRadius: 6, fontSize: 12, cursor: 'pointer', border: `1.5px solid ${badge.color}`, background: badge.bg, color: badge.color, fontWeight: 700, fontFamily: 'var(--font-body)' }}
                                >
                                  {ESTADOS.map(e => <option key={e.value} value={e.value}>{e.label}</option>)}
                                </select>
                              </td>
                              <td style={{ padding: '14px' }} onClick={e => e.stopPropagation()}>
                                <button
                                  onClick={() => toggleGarantia(p.id, !p.en_garantia)}
                                  disabled={guardando === p.id + '-garantia'}
                                  style={{ padding: '5px 10px', borderRadius: 6, fontSize: 12, fontWeight: 600, cursor: 'pointer', border: 'none', background: p.en_garantia ? '#FEF3C7' : '#F3F4F6', color: p.en_garantia ? '#B45309' : 'var(--gray-400)', whiteSpace: 'nowrap' }}
                                >
                                  {p.en_garantia ? 'Activa' : 'Sin garantía'}
                                </button>
                              </td>
                              <td style={{ padding: '14px 16px 14px 8px' }} onClick={e => e.stopPropagation()}>
                                <button
                                  onClick={() => toggleArchivado(p.id, !p.archivado)}
                                  disabled={guardando === p.id + '-archivado'}
                                  style={{ padding: '5px 10px', borderRadius: 6, fontSize: 12, fontWeight: 600, cursor: 'pointer', border: 'none', background: p.archivado ? '#F0FDF4' : '#F3F4F6', color: p.archivado ? '#16A34A' : 'var(--gray-400)' }}
                                >
                                  {p.archivado ? 'Restaurar' : 'Archivar'}
                                </button>
                              </td>
                            </tr>

                            {isOpen && (
                              <tr style={{ borderBottom: '1px solid #E5E7EB' }}>
                                <td colSpan={10} style={{ padding: '0 20px 24px 48px', background: '#FAFAFA' }}>
                                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 32, paddingTop: 20 }}>

                                    <div>
                                      <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--gray-600)', marginBottom: 10 }}>Dirección de entrega</div>
                                      <div style={{ fontSize: 13, color: 'var(--black)', lineHeight: 1.9 }}>
                                        <div style={{ fontWeight: 600 }}>{p.nombre} {p.apellido}</div>
                                        <div>{p.direccion}</div>
                                        <div>{p.canton}, {p.provincia}</div>
                                        {p.notas && <div style={{ color: 'var(--gray-600)', marginTop: 6, fontStyle: 'italic', fontSize: 12 }}>"{p.notas}"</div>}
                                      </div>
                                    </div>

                                    <div>
                                      <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--gray-600)', marginBottom: 10 }}>Contacto</div>
                                      <div style={{ fontSize: 13, color: 'var(--black)', lineHeight: 1.9 }}>
                                        <div>{p.correo}</div>
                                        <a
                                          href={`https://wa.me/506${p.telefono?.replace(/\D/g, '')}`}
                                          target="_blank"
                                          rel="noreferrer"
                                          style={{ color: '#16A34A', fontWeight: 600, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 5 }}
                                          onClick={e => e.stopPropagation()}
                                        >
                                          {p.telefono} → WhatsApp
                                        </a>
                                      </div>
                                    </div>

                                    <div>
                                      <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--gray-600)', marginBottom: 10 }}>
                                        Productos ({prods.length})
                                      </div>
                                      <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
                                        {prods.map((prod, i) => (
                                          <div key={i} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13 }}>
                                            <span style={{ color: 'var(--black)' }}>
                                              {prod.nombre}
                                              <span style={{ color: 'var(--gray-400)', marginLeft: 4 }}>×{prod.cantidad}</span>
                                            </span>
                                            <span style={{ fontWeight: 600, marginLeft: 16, whiteSpace: 'nowrap' }}>
                                              ₡{(prod.precio * prod.cantidad).toLocaleString('es-CR')}
                                            </span>
                                          </div>
                                        ))}
                                      </div>
                                    </div>

                                  </div>
                                </td>
                              </tr>
                            )}
                          </Fragment>
                        )
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </>
        )}

        {seccion === 'destacados' && (
          <ColeccionAdmin
            titulo="Productos destacados"
            descripcion="Aparecen en el slideshow del home y en /destacados."
            skuInput={skuInput}
            setSkuInput={setSkuInput}
            onAgregar={agregarDestacado}
            cargando={cargandoDestacados}
            lista={destacados}
            onEliminar={eliminarDestacado}
          />
        )}

        {seccion === 'promociones' && (
          <ColeccionAdmin
            titulo="Promociones"
            descripcion="Los productos en /promociones. Usá SKUs de productos en oferta."
            skuInput={skuPromoInput}
            setSkuInput={setSkuPromoInput}
            onAgregar={agregarPromocion}
            cargando={cargandoPromos}
            lista={promociones}
            onEliminar={eliminarPromocion}
          />
        )}

        {seccion === 'novedades' && (
          <ColeccionAdmin
            titulo="Novedades"
            descripcion="Los productos que aparecen en /novedades como recién llegados."
            skuInput={skuNovedadInput}
            setSkuInput={setSkuNovedadInput}
            onAgregar={agregarNovedad}
            cargando={cargandoNovedades}
            lista={novedades}
            onEliminar={eliminarNovedad}
          />
        )}

        {seccion === 'catalogo' && (
          <div style={{ background: '#fff', borderRadius: 12, border: '1px solid #E5E7EB', padding: '32px', maxWidth: 560 }}>
            <div style={{ fontSize: 18, fontWeight: 700, color: 'var(--black)', marginBottom: 4 }}>Catálogo Divia</div>
            <div style={{ fontSize: 13, color: 'var(--gray-400)', marginBottom: 28 }}>
              Los precios vienen del endpoint de Divia y se guardan en caché por 20 minutos. Si Divia actualizó un precio y querés que el sitio lo muestre de inmediato, usá este botón para borrar el caché.
            </div>

            <button
              onClick={invalidarCatalogo}
              disabled={invalidando}
              style={{
                display: 'flex', alignItems: 'center', gap: 8,
                background: invalidando ? '#F3F4F6' : 'var(--black)',
                color: invalidando ? 'var(--gray-400)' : '#fff',
                border: 'none', borderRadius: 8, padding: '12px 24px',
                fontWeight: 700, fontSize: 14, cursor: invalidando ? 'not-allowed' : 'pointer',
                fontFamily: 'var(--font-body)', transition: 'background 0.15s',
              }}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/><path d="M8 16H3v5"/>
              </svg>
              {invalidando ? 'Actualizando...' : 'Forzar actualización de precios'}
            </button>

            {invalidando && (
              <div style={{ marginTop: 10, fontSize: 12, color: 'var(--gray-400)' }}>
                Puede tardar hasta 2 minutos (Divia entrega el catálogo por páginas) — no cierres esta pestaña.
              </div>
            )}

            {mensajeCache && (
              <div style={{
                marginTop: 16, padding: '12px 16px', borderRadius: 8, fontSize: 13, fontWeight: 500,
                background: mensajeCache.tipo === 'ok' ? '#F0FDF4' : '#FEF2F2',
                color: mensajeCache.tipo === 'ok' ? '#16A34A' : '#DC2626',
                border: `1px solid ${mensajeCache.tipo === 'ok' ? '#BBF7D0' : '#FECACA'}`,
              }}>
                {mensajeCache.texto}
              </div>
            )}

            <div style={{ marginTop: 28, padding: '16px', background: '#F9FAFB', borderRadius: 8, border: '1px solid #E5E7EB' }}>
              <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--gray-600)', marginBottom: 8 }}>¿Cómo funciona?</div>
              <div style={{ fontSize: 13, color: 'var(--gray-600)', lineHeight: 1.7 }}>
                <div>1. Divia actualiza el precio en su sistema</div>
                <div>2. Entrás aquí y presionás el botón</div>
                <div>3. El sitio jala los precios de Divia al instante y los actualiza</div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  )
}

function ColeccionAdmin({ titulo, descripcion, skuInput, setSkuInput, onAgregar, cargando, lista, onEliminar }) {
  return (
    <div style={{ background: '#fff', borderRadius: 12, border: '1px solid #E5E7EB', padding: '32px', maxWidth: 560 }}>
      <div style={{ fontSize: 18, fontWeight: 700, color: 'var(--black)', marginBottom: 4 }}>{titulo}</div>
      <div style={{ fontSize: 13, color: 'var(--gray-400)', marginBottom: 28 }}>{descripcion}</div>

      <div style={{ display: 'flex', gap: 10, marginBottom: 24 }}>
        <input
          value={skuInput}
          onChange={e => setSkuInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && onAgregar()}
          placeholder="SKU del producto"
          style={{ flex: 1, padding: '10px 14px', fontSize: 14, border: '1.5px solid #E5E7EB', borderRadius: 8, outline: 'none', fontFamily: 'var(--font-body)' }}
        />
        <button
          onClick={onAgregar}
          style={{ background: 'var(--black)', color: '#fff', border: 'none', borderRadius: 8, padding: '10px 22px', fontWeight: 700, fontSize: 14, cursor: 'pointer', fontFamily: 'var(--font-body)' }}
        >
          Agregar
        </button>
      </div>

      {cargando ? (
        <div style={{ fontSize: 14, color: 'var(--gray-400)' }}>Cargando...</div>
      ) : lista.length === 0 ? (
        <div style={{ fontSize: 14, color: 'var(--gray-400)', textAlign: 'center', padding: '32px 0' }}>
          No hay productos. Agregá un SKU arriba.
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {lista.map((d, i) => (
            <div key={d.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '13px 16px', border: '1px solid #E5E7EB', borderRadius: 8, background: '#FAFAFA' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--gray-400)', width: 20 }}>#{i + 1}</span>
                <span style={{ fontSize: 14, fontWeight: 600, color: '#1E3A8A' }}>SKU: {d.sku}</span>
              </div>
              <button
                onClick={() => onEliminar(d.id)}
                style={{ fontSize: 12, color: '#DC2626', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 600 }}
              >
                Eliminar
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
