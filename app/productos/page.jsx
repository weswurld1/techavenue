import Link from 'next/link'

const CATEGORIAS = [
  { href: '/categoria/gpu',             label: 'Tarjetas Gráficas', desc: 'RTX, RX, Arc y más',              img: '/images/categorias/gpu.png' },
  { href: '/categoria/cpu',             label: 'Procesadores',      desc: 'Intel, AMD, para todo uso',       img: '/images/categorias/cpu.png' },
  { href: '/categoria/placas-madre',    label: 'Placas Madre',      desc: 'ATX, mATX, ITX',                  img: '/images/categorias/motherboard.png' },
  { href: '/categoria/ram',             label: 'Memoria RAM',       desc: 'DDR4, DDR5, alta frecuencia',     img: '/images/categorias/ram.png' },
  { href: '/categoria/almacenamiento',  label: 'Almacenamiento',    desc: 'SSD NVMe, SATA, HDD',             img: '/images/categorias/ssd.png' },
  { href: '/categoria/refrigeracion',   label: 'Refrigeración',     desc: 'Aire, liquida, pasta térmica',    img: '/images/categorias/cooling.png' },
  { href: '/categoria/perifericos',     label: 'Periféricos',       desc: 'Teclados, mouse, headsets',       img: '/images/categorias/perifericos.png' },
  { href: '/categoria/gabinetes',       label: 'Gabinetes',         desc: 'Full tower, mid tower, mini ITX', img: '/images/categorias/gabinete.png' },
  { href: '/categoria/fuentes-de-poder',label: 'Fuentes de Poder',  desc: '80+ Bronze, Gold, Platinum',      img: '/images/categorias/psu.png' },
  { href: '/categoria/redes',           label: 'Redes',             desc: 'WiFi, ethernet, switches',        img: '/images/categorias/redes.png' },
]

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

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 3 }}>
        {CATEGORIAS.map((cat) => (
          <Link
            key={cat.href}
            href={cat.href}
            style={{
              position: 'relative',
              aspectRatio: '3/4',
              background: '#141414',
              overflow: 'hidden',
              cursor: 'pointer',
              display: 'block',
              textDecoration: 'none',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'translateY(-6px) scale(1.02)'
              e.currentTarget.style.boxShadow = '0 16px 40px rgba(0,0,0,0.3)'
              e.currentTarget.style.zIndex = '2'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'none'
              e.currentTarget.style.boxShadow = 'none'
              e.currentTarget.style.zIndex = '1'
            }}
          >
            <div style={{
              position: 'absolute', inset: 0,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              padding: '20px 20px 72px',
              transition: 'filter 0.4s ease',
            }}>
              <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#2a2a2a' }}>
                foto aquí
              </div>
            </div>

            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 120, background: 'linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.6) 55%, transparent 100%)', zIndex: 1 }} />

            <div style={{ position: 'absolute', inset: 0, border: '1.5px solid transparent', transition: 'border-color 0.2s', zIndex: 2, pointerEvents: 'none' }} />

            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '12px 16px 16px', zIndex: 2 }}>
              <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 13, color: 'var(--white)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 3 }}>
                <em style={{ color: '#1E3A8A', fontStyle: 'normal' }}>// </em>{cat.label}
              </div>
              <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)', fontWeight: 400 }}>
                {cat.desc}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}