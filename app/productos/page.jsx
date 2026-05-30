'use client'
import Link from 'next/link'

const CATEGORIAS = [
  { href: '/categoria/gpu',              label: 'Tarjetas Gráficas', desc: 'RTX, RX, Arc y más' },
  { href: '/categoria/cpu',              label: 'Procesadores',      desc: 'Intel, AMD, para todo uso' },
  { href: '/categoria/placas-madre',     label: 'Placas Madre',      desc: 'ATX, mATX, ITX' },
  { href: '/categoria/ram',              label: 'Memoria RAM',       desc: 'DDR4, DDR5, alta frecuencia' },
  { href: '/categoria/almacenamiento',   label: 'Almacenamiento',    desc: 'SSD NVMe, SATA, HDD' },
  { href: '/categoria/refrigeracion',    label: 'Refrigeración',     desc: 'Aire, líquida, pasta térmica' },
  { href: '/categoria/perifericos',      label: 'Periféricos',       desc: 'Teclados, mouse, headsets' },
  { href: '/categoria/gabinetes',        label: 'Gabinetes',         desc: 'Full tower, mid tower, mini ITX' },
  { href: '/categoria/fuentes-de-poder', label: 'Fuentes de Poder',  desc: '80+ Bronze, Gold, Platinum' },
  { href: '/categoria/redes',            label: 'Redes',             desc: 'WiFi, ethernet, switches' },
]

function CategoriaCard({ cat }) {
  return (
    <Link
      href={cat.href}
      className="category-card"
      style={{ display: 'block', textDecoration: 'none' }}
    >
      <div className="category-img-wrap">
        <div className="category-img-placeholder">foto aquí</div>
      </div>
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 120, background: 'linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.6) 55%, transparent 100%)', zIndex: 1 }} />
      <div className="category-body">
        <div>
          <div className="category-name"><em>//</em> {cat.label}</div>
          <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)', marginTop: 3 }}>{cat.desc}</div>
        </div>
        <span className="category-arrow">→</span>
      </div>
    </Link>
  )
}

export default function ProductosPage() {
  return (
    <div style={{ maxWidth: 1360, margin: '0 auto', padding: '64px 32px 96px' }}>
      <div style={{ marginBottom: 48 }}>
        <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#1E3A8A', marginBottom: 8 }}>
          Explorar
        </div>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
          <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'clamp(40px, 5vw, 64px)', color: 'var(--black)', letterSpacing: '-0.02em', margin: 0 }}>
            Catálogo completo
          </h1>
          <span style={{ fontSize: 13, color: 'var(--gray-400)', marginBottom: 8 }}>{CATEGORIAS.length} categorías</span>
        </div>
      </div>

      <div className="categories-grid">
        {CATEGORIAS.map(cat => (
          <CategoriaCard key={cat.href} cat={cat} />
        ))}
      </div>
    </div>
  )
}