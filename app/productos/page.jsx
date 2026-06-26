import Link from 'next/link'

export const metadata = {
  title: 'Catálogo | TechAvenue CR',
  description: 'Explorá todo el catálogo de TechAvenue: componentes, periféricos, computadoras, accesorios y más.',
}

const CATEGORIAS = [
  { href: '/categoria/componentes',           label: 'Componentes',              desc: 'CPU, GPU, RAM, placas madre y más',           img: '/images/categorias/gpu.png' },
  { href: '/categoria/perifericos',           label: 'Periféricos',              desc: 'Mouse, teclados, monitores, headsets',         img: '/images/categorias/perifericos.png' },
  { href: '/categoria/accesorios',            label: 'Accesorios',               desc: 'Hubs, bases, soportes, sonido',                img: '/images/categorias/ssd.png' },
  { href: '/categoria/energia-y-conectividad',label: 'Energía y Conectividad',   desc: 'UPS, power banks, redes, smart home',          img: '/images/categorias/redes.png' },
  { href: '/categoria/streaming-y-gaming',    label: 'Streaming y Gaming',       desc: 'Capturadoras, sim racing y más',               img: '/images/categorias/cooling.png' },
  { href: '/categoria/computadoras',          label: 'Computadoras',             desc: 'Laptops, tablets y equipos completos',         img: '/images/categorias/cpu.png' },
  { href: '/categoria/hogar',                 label: 'Hogar',                    desc: 'Electrodomésticos y tecnología para el hogar', img: '/images/categorias/psu.png' },
  { href: '/categoria/software',              label: 'Software',                 desc: 'Licencias, Windows y más',                     img: '/images/categorias/motherboard.png' },
]

export default function ProductosPage() {
  return (
    <div style={{ maxWidth: 900, margin: '0 auto', padding: '64px 32px 96px' }}>

      <div style={{ marginBottom: 48 }}>
        <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#1E3A8A', marginBottom: 8 }}>
          Explorar
        </div>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8 }}>
          <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'clamp(40px, 5vw, 64px)', color: 'var(--black)', letterSpacing: '-0.02em', margin: 0 }}>
            Catálogo completo
          </h1>
          <span style={{ fontSize: 13, color: 'var(--gray-400)', marginBottom: 8 }}>{CATEGORIAS.length} secciones</span>
        </div>
      </div>

      <div className="productos-grid">
        {CATEGORIAS.map((cat) => (
          <Link
            key={cat.href}
            href={cat.href}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 16,
              border: '1.5px solid var(--gray-200)',
              borderRadius: 10,
              padding: '16px 20px',
              textDecoration: 'none',
              background: 'var(--white)',
              transition: 'border-color 0.15s, box-shadow 0.15s',
            }}
          >
            <div style={{ width: 72, height: 72, background: 'var(--gray-100)', borderRadius: 8, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 8 }}>
              <img
                src={cat.img}
                alt={cat.label}
                style={{ width: '100%', height: '100%', objectFit: 'contain' }}
              />
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 14, fontWeight: 700, color: 'var(--black)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 4 }}>
                {cat.label}
              </div>
              <div style={{ fontSize: 12, color: 'var(--gray-400)', lineHeight: 1.4 }}>{cat.desc}</div>
            </div>
            <span style={{ color: 'var(--gray-400)', fontSize: 18, flexShrink: 0 }}>→</span>
          </Link>
        ))}
      </div>
    </div>
  )
}
