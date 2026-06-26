'use client'
import { useState, useMemo, use, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { toSlug } from '@/lib/utils'
import { useCatalogo } from '@/context/CatalogoContext'

const NOMBRES_CATEGORIA = {
  // Categorías originales
  'gpu':                    'Tarjetas Gráficas',
  'cpu':                    'Procesadores',
  'placas-madre':           'Placas Madre',
  'ram':                    'Memoria RAM',
  'almacenamiento':         'Almacenamiento',
  'perifericos':            'Periféricos',
  'gabinetes':              'Gabinetes',
  'refrigeracion':          'Refrigeración',
  'fuentes-de-poder':       'Fuentes de Poder',
  'redes':                  'Redes',
  // Categorías principales nuevas
  'componentes':            'Componentes',
  'accesorios':             'Accesorios',
  'energia-y-conectividad': 'Energía y Conectividad',
  'streaming-y-gaming':     'Streaming y Gaming',
  'computadoras':           'Computadoras',
  'hogar':                  'Hogar',
  'software':               'Software',
  // Subcategorías específicas
  'monitores':              'Monitores',
  'escritorios':            'Escritorios',
  'sillas':                 'Sillas',
  'laptops':                'Laptops',
  'tablets':                'Tablets',
  'power-banks':            'Power Banks',
  'ups':                    'UPS',
  'smart-home':             'Smart Home',
  'sim-racing':             'Simulación de Carreras',
  'streaming':              'Streaming y Capturadoras',
  'licencias':              'Licencias y Software',
  'electrodomesticos':      'Electrodomésticos',
  'pastas-termicas':        'Pastas Térmicas',
}

// Filtros de sidebar por categoría
const FILTROS_CATEGORIA = {
  'gpu':                    ['marca', 'vram', 'tipo_gpu', 'en_oferta'],
  'cpu':                    ['marca', 'nucleos', 'socket', 'en_oferta'],
  'ram':                    ['marca', 'capacidad', 'frecuencia', 'en_oferta'],
  'almacenamiento':         ['marca', 'tipo_almacenamiento', 'capacidad', 'en_oferta'],
  'placas-madre':           ['marca', 'socket', 'factor_forma', 'en_oferta'],
  'perifericos':            ['marca', 'tipo_periferico', 'en_oferta'],
  'gabinetes':              ['marca', 'factor_forma', 'en_oferta'],
  'refrigeracion':          ['marca', 'tipo_refrigeracion', 'en_oferta'],
  'fuentes-de-poder':       ['marca', 'potencia', 'certificacion', 'en_oferta'],
  'redes':                  ['marca', 'tipo_red', 'en_oferta'],
  'componentes':            ['marca', 'subcategoria', 'en_oferta'],
  'accesorios':             ['marca', 'subcategoria', 'en_oferta'],
  'energia-y-conectividad': ['marca', 'subcategoria', 'en_oferta'],
  'streaming-y-gaming':     ['marca', 'subcategoria', 'en_oferta'],
  'computadoras':           ['marca', 'subcategoria', 'en_oferta'],
  'hogar':                  ['marca', 'en_oferta'],
  'software':               ['marca', 'en_oferta'],
}

const ETIQUETAS_FILTRO = {
  marca:               'Marca',
  vram:                'Memoria VRAM',
  tipo_gpu:            'Fabricante GPU',
  nucleos:             'Núcleos',
  socket:              'Socket',
  capacidad:           'Capacidad',
  frecuencia:          'Frecuencia',
  tipo_almacenamiento: 'Tipo',
  factor_forma:        'Factor de forma',
  tipo_periferico:     'Tipo',
  tipo_refrigeracion:  'Tipo',
  potencia:            'Potencia',
  certificacion:       'Certificación',
  tipo_red:            'Tipo',
  subcategoria:        'Subcategoría',
}

const ORDENAR_OPCIONES = [
  { value: 'default',    label: 'Destacados' },
  { value: 'precio-asc', label: 'Precio: menor a mayor' },
  { value: 'precio-desc',label: 'Precio: mayor a menor' },
  { value: 'nombre',     label: 'Nombre A-Z' },
]

// Pills de subcategoría — campo: qué propiedad del producto se filtra
const SUBCATEGORIAS = {
  'perifericos': {
    campo: 'tipo_periferico',
    items: [
      { label: 'Todos',       valor: null },
      { label: 'Mouse',       valor: 'Mouse' },
      { label: 'Teclados',    valor: 'Teclado' },
      { label: 'Audífonos',   valor: 'Audífonos' },
      { label: 'Headsets',    valor: 'Headset' },
      { label: 'Webcams',     valor: 'Webcam' },
      { label: 'Micrófonos',  valor: 'Micrófono' },
      { label: 'Parlantes',   valor: 'Parlantes' },
      { label: 'Monitores',   valor: 'Monitor' },
      { label: 'Escritorios', valor: 'Escritorio' },
      { label: 'Sillas',      valor: 'Silla' },
    ],
  },
  'componentes': {
    campo: 'subcategoria',
    items: [
      { label: 'Todos',              valor: null },
      { label: 'Procesadores',       valor: 'cpu' },
      { label: 'Tarjetas de Video',  valor: 'gpu' },
      { label: 'Tarjetas Madre',     valor: 'placas-madre' },
      { label: 'Memoria RAM',        valor: 'ram' },
      { label: 'Almacenamiento',     valor: 'almacenamiento' },
      { label: 'Fuentes de Poder',   valor: 'fuentes-de-poder' },
      { label: 'Gabinetes',          valor: 'gabinetes' },
      { label: 'Refrigeración',      valor: 'refrigeracion' },
      { label: 'Pastas Térmicas',    valor: 'pastas-termicas' },
    ],
  },
  'accesorios': {
    campo: 'subcategoria',
    items: [
      { label: 'Todos',          valor: null },
      { label: 'Hubs',           valor: 'hubs' },
      { label: 'Bases',          valor: 'bases' },
      { label: 'Soportes',       valor: 'soportes' },
      { label: 'Barra de Sonido',valor: 'barra-sonido' },
      { label: 'Mantenimiento',  valor: 'mantenimiento' },
    ],
  },
  'energia-y-conectividad': {
    campo: 'subcategoria',
    items: [
      { label: 'Todos',       valor: null },
      { label: 'Power Banks', valor: 'power-banks' },
      { label: 'UPS',         valor: 'ups' },
      { label: 'Smart Home',  valor: 'smart-home' },
      { label: 'Redes',       valor: 'redes' },
    ],
  },
  'streaming-y-gaming': {
    campo: 'subcategoria',
    items: [
      { label: 'Todos',            valor: null },
      { label: 'Sim Racing',       valor: 'sim-racing' },
      { label: 'Capturadoras',     valor: 'streaming' },
    ],
  },
  'computadoras': {
    campo: 'subcategoria',
    items: [
      { label: 'Todos',   valor: null },
      { label: 'Laptops', valor: 'laptops' },
      { label: 'Tablets', valor: 'tablets' },
    ],
  },
}

function SkeletonCard() {
  return (
    <div className="skeleton-card">
      <div className="skeleton" style={{ aspectRatio: '1' }} />
      <div style={{ padding: '14px 16px' }}>
        <div className="skeleton" style={{ height: 10, width: '40%', marginBottom: 8 }} />
        <div className="skeleton" style={{ height: 13, width: '90%', marginBottom: 6 }} />
        <div className="skeleton" style={{ height: 13, width: '70%', marginBottom: 16 }} />
        <div className="skeleton" style={{ height: 22, width: '55%' }} />
      </div>
    </div>
  )
}

export default function CategoryClient({ params }) {
  const { nombre } = use(params)
  const searchParams = useSearchParams()
  const nombreCategoria = NOMBRES_CATEGORIA[nombre] || nombre
  const { productos: todosLosProductos, loading } = useCatalogo()
  const productos = useMemo(
    () => todosLosProductos.filter(p => p.categoria === nombre),
    [todosLosProductos, nombre]
  )
  const filtrosActivos = FILTROS_CATEGORIA[nombre] || ['marca', 'en_oferta']
  const subcatConfig = SUBCATEGORIAS[nombre] || null

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
  const [subcatActiva, setSubcatActiva] = useState(() => searchParams.get('sub') || null)

  useEffect(() => {
    const sub = searchParams.get('sub')
    setSubcatActiva(sub || null)
  }, [searchParams])
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
        [clave]: actual.includes(valor) ? actual.filter(v => v !== valor) : [...actual, valor],
      }
    })
  }

  const limpiarFiltros = () => {
    setSeleccionados({})
    setSubcatActiva(null)
    setPrecioDesde(precioMin)
    setPrecioHasta(precioMax)
    setSoloEnStock(false)
    setSoloEnOferta(false)
  }

  const hayFiltrosActivos = Object.values(seleccionados).some(v => v.length > 0) || soloEnStock || soloEnOferta || subcatActiva !== null || precioDesde > precioMin || precioHasta < precioMax

  const productosFiltrados = useMemo(() => {
    let result = [...productos]
    if (soloEnStock) result = result.filter(p => p.stock > 0)
    if (soloEnOferta) result = result.filter(p => p.en_oferta)
    result = result.filter(p => p.precio >= precioDesde && p.precio <= precioHasta)
    if (subcatConfig && subcatActiva !== null) {
      result = result.filter(p => p[subcatConfig.campo] === subcatActiva)
    }
    Object.entries(seleccionados).forEach(([clave, valores]) => {
      if (valores.length > 0) result = result.filter(p => valores.includes(p[clave]))
    })
    if (ordenar === 'precio-asc') result.sort((a, b) => a.precio - b.precio)
    if (ordenar === 'precio-desc') result.sort((a, b) => b.precio - a.precio)
    if (ordenar === 'nombre') result.sort((a, b) => a.nombre.localeCompare(b.nombre))
    return result
  }, [productos, seleccionados, subcatActiva, subcatConfig, precioDesde, precioHasta, soloEnStock, soloEnOferta, ordenar])

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

  const pillStyle = (activo) => ({
    padding: '7px 16px',
    borderRadius: 20,
    border: activo ? '1.5px solid var(--black)' : '1.5px solid var(--gray-200)',
    background: activo ? 'var(--black)' : 'var(--white)',
    color: activo ? '#fff' : 'var(--gray-800)',
    fontSize: 13,
    fontWeight: activo ? 600 : 400,
    cursor: 'pointer',
    transition: 'all 0.15s',
    fontFamily: 'var(--font-body)',
    whiteSpace: 'nowrap',
  })

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

        {/* ── SIDEBAR ── */}
        <div className={`category-sidebar${filtrosMobileOpen ? ' open' : ''}`}>
          <div style={{ position: 'sticky', top: 24 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16, paddingBottom: 10, borderBottom: '1px solid var(--gray-200)' }}>
              <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--black)' }}>Filtros</div>
              {hayFiltrosActivos && (
                <button onClick={limpiarFiltros} style={{ fontSize: 11, color: '#DC2626', background: 'none', border: 'none', cursor: 'pointer', padding: 0, fontWeight: 600 }}>
                  Limpiar
                </button>
              )}
            </div>

            {/* Subcategorías en sidebar (si aplica) */}
            {subcatConfig && (
              <div style={{ marginBottom: 24 }}>
                <div style={seccionLabel}>Subcategoría</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  {subcatConfig.items.map(sub => {
                    const activo = sub.valor === null ? subcatActiva === null : subcatActiva === sub.valor
                    return (
                      <button
                        key={sub.label}
                        onClick={() => setSubcatActiva(sub.valor)}
                        style={{
                          textAlign: 'left',
                          padding: '7px 10px',
                          borderRadius: 6,
                          border: 'none',
                          background: activo ? 'var(--gray-100)' : 'none',
                          color: activo ? 'var(--black)' : 'var(--gray-600)',
                          fontSize: 13,
                          fontWeight: activo ? 700 : 400,
                          cursor: 'pointer',
                          fontFamily: 'var(--font-body)',
                          transition: 'all 0.12s',
                        }}
                      >
                        {activo && <span style={{ color: '#1E3A8A', marginRight: 6 }}>→</span>}
                        {sub.label}
                      </button>
                    )
                  })}
                </div>
              </div>
            )}

            {/* Stock y oferta */}
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

            {/* Rango de precio */}
            <div style={{ marginBottom: 24 }}>
              <div style={seccionLabel}>Rango de precio</div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                <div>
                  <div style={{ fontSize: 11, color: 'var(--gray-400)', marginBottom: 4 }}>Desde</div>
                  <input type="number" value={precioDesde} onChange={e => setPrecioDesde(Number(e.target.value))} style={inputStyle} min={precioMin} max={precioHasta} />
                </div>
                <div>
                  <div style={{ fontSize: 11, color: 'var(--gray-400)', marginBottom: 4 }}>Hasta</div>
                  <input type="number" value={precioHasta} onChange={e => setPrecioHasta(Number(e.target.value))} style={inputStyle} min={precioDesde} max={precioMax} />
                </div>
              </div>
            </div>

            {/* Filtros dinámicos por campo */}
            {filtrosActivos.filter(f => f !== 'en_oferta' && f !== 'subcategoria').map(clave => {
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

        {/* ── GRID DE PRODUCTOS ── */}
        <div>
          <button className="category-filter-toggle" onClick={() => setFiltrosMobileOpen(prev => !prev)}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="4" y1="6" x2="20" y2="6"/><line x1="8" y1="12" x2="16" y2="12"/><line x1="11" y1="18" x2="13" y2="18"/>
            </svg>
            {filtrosMobileOpen ? 'Ocultar filtros' : 'Mostrar filtros'}
            {hayFiltrosActivos && <span style={{ background: 'var(--accent)', color: '#fff', borderRadius: '50%', width: 18, height: 18, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 700 }}>!</span>}
          </button>

          {/* Pills de subcategoría (horizontal, encima del grid) */}
          {subcatConfig && (
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 20, paddingBottom: 20, borderBottom: '1px solid var(--gray-200)' }}>
              {subcatConfig.items.map(sub => {
                const activo = sub.valor === null ? subcatActiva === null : subcatActiva === sub.valor
                return (
                  <button key={sub.label} onClick={() => setSubcatActiva(sub.valor)} style={pillStyle(activo)}>
                    {sub.label}
                  </button>
                )
              })}
            </div>
          )}

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

          {loading ? (
            <div className="catalogo-grid">
              {Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)}
            </div>
          ) : productosFiltrados.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '80px 0', color: 'var(--gray-400)' }}>
              <div style={{ fontSize: 16, fontWeight: 600, color: 'var(--black)', marginBottom: 8 }}>Productos próximamente</div>
              <div style={{ fontSize: 14 }}>Estamos preparando el catálogo de TechAvenue. Volvé pronto.</div>
            </div>
          ) : (
            <div className="catalogo-grid">
              {productosFiltrados.map(p => (
                <Link key={p.id} href={`/producto/${p.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
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
                      {p.imagen
                        ? <img src={p.imagen} alt={p.nombre} style={{ width: '100%', height: '100%', objectFit: 'contain', padding: 16 }} />
                        : <div style={{ color: 'var(--gray-300)', fontSize: 12 }}>Sin imagen</div>}
                    </div>
                    <div style={{ padding: '14px 16px' }}>
                      <div style={{ fontSize: 11, color: 'var(--gray-400)', marginBottom: 4, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{p.marca}</div>
                      <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--black)', marginBottom: 8, lineHeight: 1.3 }}>{p.nombre}</div>
                      <div style={{ fontSize: 11, color: 'var(--gray-400)', marginBottom: 10 }}>SKU: {p.sku}</div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                          {p.precio_original && (
                            <div style={{ fontSize: 11, color: 'var(--gray-400)', textDecoration: 'line-through' }}>₡{p.precio_original.toLocaleString('es-CR')}</div>
                          )}
                          <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 18, color: p.en_oferta ? '#DC2626' : 'var(--black)' }}>
                            ₡{p.precio.toLocaleString('es-CR')}
                          </div>
                        </div>
                        <div style={{ fontSize: 11, fontWeight: 700, padding: '3px 8px', borderRadius: 20, background: p.stock > 0 ? '#F0FDF4' : '#FEE2E2', color: p.stock > 0 ? '#16A34A' : '#DC2626' }}>
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
