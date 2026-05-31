'use client'
import dynamic from 'next/dynamic'
import Link from 'next/link'

const CategoryModel = dynamic(() => import('./CategoryModel'), { ssr: false })

const CATEGORIES = [
  { href: '/categoria/gpu',            label: 'Tarjetas Gráficas', model: '/models/gpu.glb' },
  { href: '/categoria/cpu',            label: 'Procesadores',      model: '/models/cpu.glb' },
  { href: '/categoria/placas-madre',   label: 'Placas Madre',      model: '/models/motherboard.glb' },
  { href: '/categoria/ram',            label: 'Memoria RAM',       model: '/models/ram.glb' },
  { href: '/categoria/almacenamiento', label: 'Almacenamiento',    model: '/models/almacenamiento.glb' },
  { href: '/categoria/refrigeracion',  label: 'Refrigeración',     model: '/models/cooling.glb' },
  { href: '/categoria/perifericos',    label: 'Periféricos',       model: '/models/perifericos.glb' },
  { href: '/categoria/gabinetes',      label: 'Gabinetes',         model: '/models/pccase.glb' },
  { href: '/categoria/psu',            label: 'Fuentes de Poder',  model: '/models/fuentedepoder.glb' },
  { href: '/categoria/redes',          label: 'Redes',             model: '/models/redes.glb' },
]

export default function CategoriesGrid() {
  return (
    <div className="categories-grid">
      {CATEGORIES.map((cat) => (
        <Link href={cat.href} className="category-card" key={cat.href}>
          <div className="category-img-wrap" style={{ padding: 0 }}>
            <CategoryModel url={cat.model} />
          </div>
          <div className="category-body">
            <span className="category-name"><em>//</em> {cat.label}</span>
            <span className="category-arrow">→</span>
          </div>
        </Link>
      ))}
    </div>
  )
}
