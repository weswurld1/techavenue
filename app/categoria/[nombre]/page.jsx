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

  const marcas = useMemo(() => [...new Set(productos.map(p => p.marca))].sort(), [productos])
  const precios = useMemo(() => productos.map(p => p.precio), [productos])
  const precioMin = precios.length ? Math.min(...precios) : 0
  const precioMax = precios.length ? Math.max(...precios) : 1000000

  const [marcasSeleccionadas, setMarcasSeleccionadas] = useState([])
  const [rangoMax, setRangoMax] = useState(precioMax)
  const [ordenar, setOrdenar] = useState('default')
  const [soloEnStock, setSoloEnStock] = useState(false)

  const toggleMarca = (marca) => {
    setMarcasSeleccionadas(prev =>
      prev.includes(marca) ? prev.filter(m => m !== marca) : [...prev, marca]
    )
  }

  const productosFiltrados = useMemo(() => {
    let result = [...productos]
    if (marcasSeleccionadas.length > 0) result = result.filter(p => marcasSeleccionadas.includes(p.marca))
    if (soloEnStock) result = result.filter(p => p.stock > 0)
    result = result.filter(p => p.precio <= rangoMax)
    if (ordenar === 'precio-asc') result.sort((a, b) => a.precio - b.precio)
    if (ordenar === 'precio-desc') result.sort((a, b) => b.precio - a.precio)
    if (ordenar === 'nombre') result.sort((a, b) => a.nombre.localeCompare(b.nombre))
    return result
  }, [productos, marcasSeleccionadas, rangoMax, ordenar, soloEnStock])

  const inputStyle = {
    width: '100%', padding: '8px 12px', fontSize: 13,
    border: '1.5px solid var(--gray-200)', borderRadius: 6,
    fontFamily: 'var(--font-body)', outline: 'none',
    background: 'var(--white)', color: 'var(--black)',
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

      <div style={{ display: 'grid', gridTemplateColumns: '220px 1fr', gap: 40 }}>

        <div>
          <div style={{ position: 'sticky', top: 24 }}>
            <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--black)', marginBottom: 16, paddingBottom: 10, borderBottom: '1px solid var(--gray-200)' }}>
              Filtros
            </div>

            <div style={{ marginBottom: 24 }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', fontSize: 13, color: 'var(--black)', fontWeight: 500 }}>
                <input
                  type="checkbox"
                  checked={soloEnStock}
                  onChange={e => setSoloEnStock(e.target.checked)}
                  style={{ width: 15, height: 15, cursor: 'pointer' }}
                />
                Solo en stock
              </label>
            </div>

            <div style={{ marginBottom: 24 }}>
              <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--gray-600)', marginBottom: 12 }}>
                Precio máximo
              </div>
              <input
                type="range"
                min={precioMin}
                max={precioMax}
                value={rangoMax}
                onChange={e => setRangoMax(Number(e.target.value))}
                style={{ width: '100%', cursor: 'pointer' }}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: 'var(--gray-600)', marginTop: 6 }}>
                <span>₡{precioMin.toLocaleString('es-CR')}</span>
                <span style={{ fontWeight: 600, color: 'var(--black)' }}>₡{rangoMax.toLocaleString('es-CR')}</span>
              </div>
            </div>

            {marcas.length > 0 && (
              <div style={{ marginBottom: 24 }}>
                <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--gray-600)', marginBottom: 12 }}>
                  Marca
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {marcas.map(marca => (
                    <label key={marca} style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', fontSize: 13 }}>
                      <input
                        type="checkbox"
                        checked={marcasSeleccionadas.includes(marca)}
                        onChange={() => toggleMarca(marca)}
                        style={{ width: 15, height: 15, cursor: 'pointer' }}
                      />
                      {marca}
                    </label>
                  ))}
                </div>
              </div>
            )}

            {(marcasSeleccionadas.length > 0 || soloEnStock || rangoMax !== precioMax) && (
              <button
                onClick={() => { setMarcasSeleccionadas([]); setSoloEnStock(false); setRangoMax(precioMax) }}
                style={{ fontSize: 12, color: '#DC2626', background: 'none', border: 'none', cursor: 'pointer', padding: 0, fontWeight: 600 }}
              >
                Limpiar filtros
              </button>
            )}
          </div>
        </div>

        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
            <div style={{ fontSize: 13, color: 'var(--gray-400)' }}>
              {productosFiltrados.length} producto{productosFiltrados.length !== 1 ? 's' : ''}
            </div>
            <select
              value={ordenar}
              onChange={e => setOrdenar(e.target.value)}
              style={{ ...inputStyle, width: 'auto' }}
            >
              {ORDENAR_OPCIONES.map(o => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
          </div>

          {productosFiltrados.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '80px 0', color: 'var(--gray-400)' }}>
              <div style={{ fontSize: 48, marginBottom: 16 }}>📦</div>
              <div style={{ fontSize: 16, fontWeight: 600, color: 'var(--black)', marginBottom: 8 }}>
                Productos próximamente
              </div>
              <div style={{ fontSize: 14 }}>
                Estamos preparando el catálogo de {nombreCategoria}. Volvé pronto.
              </div>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 20 }}>
              {productosFiltrados.map(p => (
                <Link key={p.id} href={`/producto/${p.sku}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                  <div
                    style={{ border: '1.5px solid var(--gray-200)', borderRadius: 10, overflow: 'hidden', transition: 'border-color 0.15s, box-shadow 0.15s', cursor: 'pointer' }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--black)'; e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.08)' }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--gray-200)'; e.currentTarget.style.boxShadow = 'none' }}
                  >
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
                        <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 18, color: 'var(--black)' }}>
                          ₡{p.precio.toLocaleString('es-CR')}
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