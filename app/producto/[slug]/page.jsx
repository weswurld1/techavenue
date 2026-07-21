'use client'
import { useState, use } from 'react'
import Link from 'next/link'
import { useCarrito } from '@/context/CartContext'
import { useToast } from '@/components/Toast'
import { useCatalogo } from '@/context/CatalogoContext'

const CATEGORIA_LABEL = {
  'gpu':            'Tarjetas Gráficas',
  'cpu':            'Procesadores',
  'placas-madre':   'Placas Madre',
  'ram':            'Memoria RAM',
  'almacenamiento': 'Almacenamiento',
  'perifericos':    'Periféricos',
  'gabinetes':      'Gabinetes',
  'refrigeracion':  'Refrigeración',
  'psu':            'Fuentes de Poder',
  'redes':          'Redes',
}

const SPECS_LABELS = {
  marca:               'Marca',
  socket:              'Socket',
  nucleos:             'Núcleos',
  frecuencia:          'Frecuencia',
  capacidad:           'Capacidad',
  vram:                'Memoria VRAM',
  tipo_gpu:            'Fabricante GPU',
  tipo_almacenamiento: 'Tipo',
  factor_forma:        'Factor de forma',
  tipo_periferico:     'Tipo',
  tipo_refrigeracion:  'Tipo de refrigeración',
  potencia:            'Potencia',
  certificacion:       'Certificación',
  tipo_red:            'Tipo de red',
}

export default function ProductoPage({ params }) {
  const { slug } = use(params)
  const id = slug.slice(slug.lastIndexOf('-') + 1)
  const { productos, loading } = useCatalogo()
  const producto = productos.find(p => String(p.id) === id)
  const { agregar } = useCarrito()
  const { mostrar } = useToast()
  const [agregado, setAgregado] = useState(false)

  if (loading) {
    return (
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '40px 32px 96px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'start' }}>
          <div className="skeleton" style={{ aspectRatio: '1', borderRadius: 12 }} />
          <div>
            <div className="skeleton" style={{ height: 12, width: '30%', marginBottom: 16 }} />
            <div className="skeleton" style={{ height: 40, width: '90%', marginBottom: 8 }} />
            <div className="skeleton" style={{ height: 40, width: '70%', marginBottom: 24 }} />
            <div className="skeleton" style={{ height: 56, width: '50%', marginBottom: 32 }} />
            <div className="skeleton" style={{ height: 48, width: '100%', marginBottom: 12 }} />
            <div className="skeleton" style={{ height: 48, width: '100%' }} />
          </div>
        </div>
      </div>
    )
  }

  if (!producto) {
    return (
      <div style={{ maxWidth: 600, margin: '0 auto', padding: '96px 32px', textAlign: 'center' }}>
        <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 72, color: 'var(--gray-200)', lineHeight: 1, marginBottom: 24 }}>404</div>
        <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'clamp(28px, 4vw, 40px)', color: 'var(--black)', letterSpacing: '-0.02em', marginBottom: 12 }}>
          Producto no encontrado
        </h1>
        <p style={{ fontSize: 15, color: 'var(--gray-600)', lineHeight: 1.7, marginBottom: 40 }}>
          Este producto no existe o todavía no está disponible en nuestro catálogo. Podés explorar todas nuestras categorías.
        </p>
        <Link href="/productos" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'var(--black)', color: 'var(--white)', padding: '12px 28px', borderRadius: 6, fontWeight: 600, fontSize: 14, textDecoration: 'none' }}>
          ← Ver catálogo completo
        </Link>
      </div>
    )
  }

  const specs = Object.entries(SPECS_LABELS)
    .filter(([key]) => producto[key])
    .map(([key, label]) => ({ label, valor: producto[key] }))

  const handleAgregar = () => {
    agregar(producto)
    mostrar(`${producto.nombre} agregado al carrito`)
    setAgregado(true)
    setTimeout(() => setAgregado(false), 2200)
  }

  return (
    <div className="product-detail-wrap">

      <div className="product-detail-breadcrumb">
        <Link href="/" style={{ color: 'var(--gray-400)', textDecoration: 'none' }}>Inicio</Link>
        <span>/</span>
        {producto.categoria && (
          <>
            <Link href={`/categoria/${producto.categoria}`} style={{ color: 'var(--gray-400)', textDecoration: 'none' }}>
              {CATEGORIA_LABEL[producto.categoria] || producto.categoria}
            </Link>
            <span>/</span>
          </>
        )}
        <span style={{ color: 'var(--black)', fontWeight: 600 }}>{producto.nombre}</span>
      </div>

      <div className="product-detail-grid">

        <div className="product-image-col" style={{ position: 'sticky', top: 24 }}>
          <div style={{ background: 'var(--gray-100)', borderRadius: 12, aspectRatio: '1', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', position: 'relative' }}>
            {producto.en_oferta && (
              <div style={{ position: 'absolute', top: 16, left: 16, background: '#DC2626', color: '#fff', fontSize: 12, fontWeight: 700, padding: '4px 10px', borderRadius: 20, zIndex: 1 }}>
                Oferta
              </div>
            )}
            {producto.imagen ? (
              <img src={producto.imagen} alt={producto.nombre} style={{ width: '80%', height: '80%', objectFit: 'contain' }} />
            ) : (
              <div style={{ color: 'var(--gray-400)', fontSize: 13 }}>Sin imagen</div>
            )}
          </div>
        </div>

        <div>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#1E3A8A', marginBottom: 8 }}>
            {producto.marca}
          </div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'clamp(26px, 3vw, 38px)', color: 'var(--black)', letterSpacing: '-0.02em', lineHeight: 1.05, marginBottom: 8 }}>
            {producto.nombre}
          </h1>
          <div style={{ fontSize: 12, color: 'var(--gray-400)', marginBottom: 28 }}>SKU: {producto.sku}</div>

          <div style={{ marginBottom: 20 }}>
            {producto.precio_original && (
              <div style={{ fontSize: 13, color: 'var(--gray-400)', textDecoration: 'line-through', marginBottom: 2 }}>
                ₡{producto.precio_original.toLocaleString('es-CR')}
              </div>
            )}
            <div className="product-detail-price" style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 44, color: producto.en_oferta ? '#DC2626' : 'var(--black)', lineHeight: 1 }}>
              ₡{producto.precio.toLocaleString('es-CR')}
            </div>
          </div>

          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 12, fontWeight: 700, padding: '5px 12px', borderRadius: 20, marginBottom: 32, background: producto.stock > 0 ? '#F0FDF4' : '#FEE2E2', color: producto.stock > 0 ? '#16A34A' : '#DC2626' }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'currentColor', display: 'inline-block' }} />
            {producto.stock > 0 ? `En stock (${producto.stock} disponibles)` : 'Agotado'}
          </div>

          <button
            onClick={handleAgregar}
            disabled={producto.stock === 0 || agregado}
            style={{
              display: 'block',
              width: '100%',
              padding: '14px 24px',
              background: agregado ? '#16A34A' : producto.stock === 0 ? 'var(--gray-200)' : 'var(--black)',
              color: producto.stock === 0 ? 'var(--gray-400)' : 'var(--white)',
              border: 'none',
              borderRadius: 8,
              fontFamily: 'var(--font-body)',
              fontWeight: 700,
              fontSize: 15,
              cursor: producto.stock === 0 || agregado ? 'not-allowed' : 'pointer',
              transition: 'background 0.2s',
              marginBottom: 12,
            }}
          >
            {agregado ? '+ Agregado al carrito' : producto.stock === 0 ? 'Agotado' : 'Agregar al carrito'}
          </button>

          <Link href="/carrito" style={{ display: 'block', width: '100%', padding: '13px 24px', background: 'transparent', color: 'var(--black)', border: '1.5px solid var(--gray-200)', borderRadius: 8, fontWeight: 600, fontSize: 15, textDecoration: 'none', textAlign: 'center', boxSizing: 'border-box', transition: 'border-color 0.15s' }}>
            Ver carrito →
          </Link>

          <a
            href="https://wa.me/50663409795"
            target="_blank"
            rel="noreferrer"
            style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: 13, color: '#16A34A', fontWeight: 600, textDecoration: 'none', marginTop: 24 }}
          >
            <svg width="15" height="15" viewBox="0 0 32 32" fill="#16A34A">
              <path d="M16 0C7.163 0 0 7.163 0 16c0 2.824.738 5.47 2.031 7.772L0 32l8.469-2.219A15.93 15.93 0 0 0 16 32c8.837 0 16-7.163 16-16S24.837 0 16 0zm8.32 22.72c-.347.977-2.025 1.867-2.773 1.936-.748.07-1.469.36-4.96-1.036-4.208-1.666-6.896-5.936-7.104-6.208-.208-.272-1.664-2.213-1.664-4.224 0-2.01 1.053-3.002 1.427-3.413.373-.41.813-.513 1.083-.513.27 0 .54.003.776.014.25.012.585-.095.916.699.347.824 1.179 2.84 1.283 3.047.104.207.174.45.035.726-.139.275-.208.446-.416.687-.207.24-.437.537-.624.721-.208.204-.424.424-.183.833.241.41 1.072 1.765 2.302 2.86 1.582 1.41 2.914 1.848 3.323 2.057.41.208.649.174.89-.104.24-.277.997-1.162 1.264-1.56.267-.4.534-.333.9-.2.366.133 2.338 1.102 2.738 1.302.4.2.665.3.765.467.1.167.1.958-.247 1.91z"/>
            </svg>
            Consultar por WhatsApp
          </a>

          {specs.length > 0 && (
            <div style={{ marginTop: 40, borderTop: '1px solid var(--gray-200)', paddingTop: 32 }}>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--gray-600)', marginBottom: 20 }}>
                Especificaciones
              </div>
              <div>
                {specs.map(({ label, valor }, i) => (
                  <div key={label} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', padding: '10px 12px', background: i % 2 === 0 ? 'var(--gray-100)' : 'transparent', borderRadius: 4 }}>
                    <div style={{ fontSize: 13, color: 'var(--gray-600)', fontWeight: 500 }}>{label}</div>
                    <div style={{ fontSize: 13, color: 'var(--black)', fontWeight: 600 }}>{valor}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
