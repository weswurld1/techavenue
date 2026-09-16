import { CATEGORIAS } from '@/lib/categorias'
import ProductosGrid from './ProductosGrid'

export const metadata = {
  title: 'Catálogo | TechAvenue CR',
  description: 'Explorá todo el catálogo de TechAvenue: componentes, periféricos, computadoras, accesorios y más.',
}

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

      <ProductosGrid />
    </div>
  )
}
