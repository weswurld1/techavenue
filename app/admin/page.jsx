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

export default function AdminPage() {
  const [pedidos, setPedidos] = useState([])
  const [cargando, setCargando] = useState(true)
  const [guardando, setGuardando] = useState(null)
  const [autenticado, setAutenticado] = useState(false)
  const [input, setInput] = useState('')
  const [errorAuth, setErrorAuth] = useState(false)

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
  }, [autenticado])

  const cambiarEstado = async (id, estado) => {
    setGuardando(id)
    await fetch('/api/admin/actualizar-estado', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, estado })
    })
    setPedidos(prev => prev.map(p => p.id === id ? { ...p, estado } : p))
    setGuardando(null)
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
    <div style={{ maxWidth: 1100, margin: '0 auto', padding: '48px 32px' }}>
      <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 40, marginBottom: 8 }}>Panel Admin</h1>
      <p style={{ color: 'var(--gray-400)', marginBottom: 32, fontSize: 14 }}>{pedidos.length} pedidos en total</p>

      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
        <thead>
          <tr style={{ borderBottom: '2px solid var(--gray-200)', textAlign: 'left' }}>
            {['Orden', 'Cliente', 'Correo', 'Total', 'Fecha', 'Estado'].map(h => (
              <th key={h} style={{ padding: '10px 12px', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.07em', color: 'var(--gray-600)' }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {pedidos.map(p => (
            <tr key={p.id} style={{ borderBottom: '1px solid var(--gray-200)' }}>
              <td style={{ padding: '12px', fontWeight: 600, color: '#1E3A8A' }}>{p.numero_orden}</td>
              <td style={{ padding: '12px' }}>{p.nombre} {p.apellido}</td>
              <td style={{ padding: '12px', color: 'var(--gray-600)' }}>{p.correo}</td>
              <td style={{ padding: '12px', fontWeight: 600 }}>₡{p.total?.toLocaleString('es-CR')}</td>
              <td style={{ padding: '12px', color: 'var(--gray-600)' }}>{new Date(p.created_at).toLocaleDateString('es-CR')}</td>
              <td style={{ padding: '12px' }}>
                <select
                  value={p.estado}
                  disabled={guardando === p.id}
                  onChange={e => cambiarEstado(p.id, e.target.value)}
                  style={{ padding: '6px 10px', borderRadius: 6, border: '1.5px solid var(--gray-200)', fontSize: 13, cursor: 'pointer', background: 'white' }}
                >
                  {ESTADOS.map(e => (
                    <option key={e.value} value={e.value}>{e.label}</option>
                  ))}
                </select>
                {guardando === p.id && <span style={{ marginLeft: 8, fontSize: 12, color: 'var(--gray-400)' }}>Guardando...</span>}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}