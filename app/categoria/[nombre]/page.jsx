'use client'
import { useState, useMemo } from 'react'
import Link from 'next/link'

const NOMBRES_CATEGORIA = {
  'gpu': 'Tarjetas Gráficas',
  'cpu': 'Procesadores',
  'placas-madre': 'Placas Madre',
  'ram': 'Memoria RAM',
  'almacenamiento': 'Almacenamiento',
  'perifericos': 'Periféricos',
  'gabinetes': 'Gabinetes',
  'refrigeracion': 'Refrigeración',
  'fuentes-de-poder': 'Fuentes de Poder',
  'redes': 'Redes',
}

const FILTROS_CATEGORIA = {
  'gpu':            ['marca', 'vram', 'tipo_gpu', 'en_oferta'],
  'cpu':            ['marca', 'nucleos', 'socket', 'en_oferta'],
  'ram':            ['marca', 'capacidad', 'frecuencia', 'en_oferta'],
  'almacenamiento': ['marca', 'tipo_almacenamiento', 'capacidad', 'en_oferta'],
  'placas-madre':   ['marca', 'socket', 'factor_forma', 'en_oferta'],
  'perifericos':    ['marca', 'tipo_periferico', 'en_oferta'],
  'gabinetes':      ['marca', 'factor_forma', 'en_oferta'],
  'refrigeracion':  ['marca', 'tipo_refrigeracion', 'en_oferta'],
  'fuentes-de-poder': ['marca', 'potencia', 'certificacion', 'en_oferta'],
  'redes':          ['marca', 'tipo_red', 'en_oferta'],
}

const ETIQUETAS_FILTRO = {
  marca: 'Marca',
  vram: 'Memoria VRAM',
  tipo_gpu: 'Fabricante GPU',
  nucleos: 'Núcleos',
  socket: 'Socket',
  capacidad: 'Capacidad',
  frecuencia: 'Frecuencia',
  tipo_almacenamiento: 'Tipo',
  factor_forma: 'Factor de forma',
  tipo_periferico: 'Tipo',
  tipo_refrigeracion: 'Tipo',
  potencia: 'Potencia',
  certificacion: 'Certificación',
  tipo_red: 'Tipo',
}

const ORDENAR_OPCIONES = [
  { value: 'default',     label: 'Destacados' },
  { value: 'precio-asc',  label: 'Precio: menor a mayor' },
  { value: 'precio-desc', label: 'Precio: mayor a menor' },
  { value: 'nombre',      label: 'Nombre A-Z' },
]

const PRODUCTOS_API = []

export default function CategoriaPage({ params }) {
  const nombreCategoria = NOMBRES_CATEGORIA[params.nombre] || params.nombre
  const productos = PRODUCTOS_API
  const filtrosActivos = FILTROS_CATEGORIA[params.nombre] || ['marca', 'en_oferta']

  const precios = useMemo(() => productos.map(p => p.precio), [productos])
  const precioMin = precios.length ? Math.min(...precios) : 0
  const precioMax = precios.length ? Math.max(...precios) : 1000000

  const opcionesFiltro = useMemo(() => {
    const result = {}
    filtrosActivos.forEach(filtro => {
      if (filtro === 'en_oferta') return
      result[filtro] = [...new Set(productos.map(p => p[filtro]).filter(Boolean))].sort()
    })
    return result
  }, [productos, filtrosActivos])

  const [seleccionados, setSeleccionados] = useState({})
  const [precioDesde, setPrecioDesde] = useState(precioMin)
  const [precioHasta, setPrecioHasta] = useState(precioMax)
  const [soloEnStock, setSoloEnStock] = useState(false)
  const [soloEnOferta, setSoloEnOferta] = useState(false)
  const [ordenar, setOrdenar] = useState('default')
  const [filtrosMobileOpen, setFiltrosMobileOpen] = useState(false)

  const toggleFiltro = (clave, valor) => {
    setSeleccionados(prev => {
      const actual = prev[clave] || []
      return {
        ...prev,
        [clave]: actual.includes(valor) ? actual.filter(v => v !== valor) : [...actual, valor]
      }
    })
  }

  const limpiarFiltros = () => {
    setSeleccionados({})
    setPrecioDesde(precioMin)
    setPrecioHasta(precioMax)
    setSoloEnStock(false)
    setSoloEnOferta(false)
  }

  const hayFiltrosActivos = Object.values(seleccionados).some(v => v.length > 0) || soloEnStock || soloEnOferta || precioDesde > precioMin || precioHasta < precioMax

  const productosFiltrados = useMemo(() => {
    let result = [...productos]
    if (soloEnStock) result = result.filter(p => p.stock > 0)
    if (soloEnOferta) result = result.filter(p => p.en_oferta)
    result = result.filter(p => p.precio >= precioDesde && p.precio <= precioHasta)
    Object.entries(seleccionados).forEach(([clave, valores]) => {
      if (valores.length > 0) result = result.filter(p => valores.includes(p[clave]))
    })
    if (ordenar === 'precio-asc') result.sort((a, b) => a.precio - b.precio)
    if (ordenar === 'precio-desc') result.sort((a, b) => b.precio - a.precio)
    if (ordenar === 'nombre') result.sort((a, b) => a.nombre.localeCompare(b.nombre))
    return result
  }, [productos, seleccionados, precioDesde, precioHasta, soloEnStock, soloEnOferta, ordenar])

  const inputStyle = {
    width: '100%', padding: '8px 12px', fontSize: 13,
    border: '1.5px solid var(--gray-200)', borderRadius: 6,
    fontFamily: 'var(--font-body)', outline: 'none',
    background: 'var(--white)', color: 'var(--black)',
  }

  const seccionLabel = {
    fontSize: 11, fontWeight: 700, textTransform: 'uppercase',
    letterSpacing: '0.08em', color: 'var(--gray-600)', marginBottom: 12,
  }

  return (
    <div style={{ maxWidth: 1200, margin: '0 auto', padding: '48px 32px 96px' }}>

      <div style={{ marginBottom: 36 }}>
        <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#1E3A8A', marginBottom: 8 }}>
          // {nombreCategoria}
        </div>
        <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'clamp(36px, 5vw, 56px)', color: 'var(--black)', letterSpacing: '-0.02em', margin: 0 }}>
          {nombreCategoria}
        </h1>
      </div>

      <div className="category-layout">

        <div className={`category-sidebar${filtrosMobileOpen ? ' open' : ''}`}>
          <div style={{ position: 'sticky', top: 24 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16, paddingBottom: 10, borderBottom: '1px solid var(--gray-200)' }}>
              <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--black)' }}>
                Filtros
              </div>
              {hayFiltrosActivos && (
                <button onClick={limpiarFiltros} style={{ fontSize: 11, color: '#DC2626', background: 'none', border: 'none', cursor: 'pointer', padding: 0, fontWeight: 600 }}>
                  Limpiar
                </button>
              )}
            </div>

            <div style={{ marginBottom: 24 }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', fontSize: 13, fontWeight: 500 }}>
                  <input type="checkbox" checked={soloEnStock} onChange={e => setSoloEnStock(e.target.checked)} style={{ width: 15, height: 15, cursor: 'pointer' }} />
                  Solo en stock
                </label>
                {filtrosActivos.includes('en_oferta') && (
                  <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', fontSize: 13, fontWeight: 500 }}>
                    <input type="checkbox" checked={soloEnOferta} onChange={e => setSoloEnOferta(e.target.checked)} style={{ width: 15, height: 15, cursor: 'pointer' }} />
                    Solo en oferta
                  </label>
                )}
              </div>
            </div>

            <div style={{ marginBottom: 24 }}>
              <div style={seccionLabel}>Rango de precio</div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                <div>
                  <div style={{ fontSize: 11, color: 'var(--gray-400)', marginBottom: 4 }}>Desde</div>
                  <input
                    type="number"
                    value={precioDesde}
                    onChange={e => setPrecioDesde(Number(e.target.value))}
                    style={inputStyle}
                    min={precioMin}
                    max={precioHasta}
                  />
                </div>
                <div>
                  <div style={{ fontSize: 11, color: 'var(--gray-400)', marginBottom: 4 }}>Hasta</div>
                  <input
                    type="number"
                    value={precioHasta}
                    onChange={e => setPrecioHasta(Number(e.target.value))}
                    style={inputStyle}
                    min={precioDesde}
                    max={precioMax}
                  />
                </div>
              </div>
            </div>

            {filtrosActivos.filter(f => f !== 'en_oferta').map(clave => {
              const opciones = opcionesFiltro[clave] || []
              if (opciones.length === 0) return null
              return (
                <div key={clave} style={{ marginBottom: 24 }}>
                  <div style={seccionLabel}>{ETIQUETAS_FILTRO[clave] || clave}</div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    {opciones.map(opcion => (
                      <label key={opcion} style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', fontSize: 13 }}>
                        <input
                          type="checkbox"
                          checked={(seleccionados[clave] || []).includes(opcion)}
                          onChange={() => toggleFiltro(clave, opcion)}
                          style={{ width: 15, height: 15, cursor: 'pointer' }}
                        />
                        {opcion}
                      </label>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        <div>
          <button
            className="category-filter-toggle"
            onClick={() => setFiltrosMobileOpen(prev => !prev)}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="4" y1="6" x2="20" y2="6"/><line x1="8" y1="12" x2="16" y2="12"/><line x1="11" y1="18" x2="13" y2="18"/>
            </svg>
            {filtrosMobileOpen ? 'Ocultar filtros' : 'Mostrar filtros'}
            {hayFiltrosActivos && <span style={{ background: 'var(--accent)', color: '#fff', borderRadius: '50%', width: 18, height: 18, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 700 }}>!</span>}
          </button>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
            <div style={{ fontSize: 13, color: 'var(--gray-400)' }}>
              {productosFiltrados.length} producto{productosFiltrados.length !== 1 ? 's' : ''}
            </div>
            <select value={ordenar} onChange={e => setOrdenar(e.target.value)} style={{ ...inputStyle, width: 'auto' }}>
              {ORDENAR_OPCIONES.map(o => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
          </div>

          {productosFiltrados.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '80px 0', color: 'var(--gray-400)' }}>
              <div style={{ fontSize: 16, fontWeight: 600, color: 'var(--black)', marginBottom: 8 }}>
                Productos próximamente
              </div>
              <div style={{ fontSize: 14 }}>
                Estamos preparando el catálogo de TechAvenue. Volvé pronto.
              </div>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 20 }}>
              {productosFiltrados.map(p => (
                <Link key={p.id} href={`/producto/${p.sku}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                  <div
                    style={{ border: '1.5px solid var(--gray-200)', borderRadius: 10, overflow: 'hidden', transition: 'border-color 0.15s, box-shadow 0.15s', cursor: 'pointer', position: 'relative' }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--black)'; e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.08)' }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--gray-200)'; e.currentTarget.style.boxShadow = 'none' }}
                  >
                    {p.en_oferta && (
                      <div style={{ position: 'absolute', top: 10, left: 10, background: '#DC2626', color: '#fff', fontSize: 11, fontWeight: 700, padding: '3px 8px', borderRadius: 20, zIndex: 1 }}>
                        Oferta
                      </div>
                    )}
                    <div style={{ background: 'var(--gray-100)', aspectRatio: '1', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                      {p.imagen ? (
                        <img src={p.imagen} alt={p.nombre} style={{ width: '100%', height: '100%', objectFit: 'contain', padding: 16 }} />
                      ) : (
                        <div style={{ color: 'var(--gray-300)', fontSize: 12 }}>Sin imagen</div>
                      )}
                    </div>
                    <div style={{ padding: '14px 16px' }}>
                      <div style={{ fontSize: 11, color: 'var(--gray-400)', marginBottom: 4, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                        {p.marca}
                      </div>
                      <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--black)', marginBottom: 8, lineHeight: 1.3 }}>
                        {p.nombre}
                      </div>
                      <div style={{ fontSize: 11, color: 'var(--gray-400)', marginBottom: 10 }}>
                        SKU: {p.sku}
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                          {p.precio_original && (
                            <div style={{ fontSize: 11, color: 'var(--gray-400)', textDecoration: 'line-through' }}>
                              ₡{p.precio_original.toLocaleString('es-CR')}
                            </div>
                          )}
                          <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 18, color: p.en_oferta ? '#DC2626' : 'var(--black)' }}>
                            ₡{p.precio.toLocaleString('es-CR')}
                          </div>
                        </div>
                        <div style={{
                          fontSize: 11, fontWeight: 700, padding: '3px 8px', borderRadius: 20,
                          background: p.stock > 0 ? '#F0FDF4' : '#FEE2E2',
                          color: p.stock > 0 ? '#16A34A' : '#DC2626',
                        }}>
                          {p.stock > 0 ? 'En stock' : 'Agotado'}
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}