'use client'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { useGLTF } from '@react-three/drei'

const CategoryModel = dynamic(() => import('./CategoryModel'), { ssr: false })

const H = Math.PI / 2

const CATEGORIES = [
  { href: '/categoria/gpu',            label: 'Tarjetas Gráficas', model: '/models/gpu.glb' },
  { href: '/categoria/cpu',            label: 'Procesadores',      model: '/models/cpu.glb',           rotation: [-H, 0, Math.PI] },
  { href: '/categoria/placas-madre',   label: 'Placas Madre',      model: '/models/motherboard.glb',   rotation: [H, 0, 0] },
  { href: '/categoria/ram',            label: 'Memoria RAM',        model: '/models/ram.glb' },
  { href: '/categoria/almacenamiento', label: 'Almacenamiento',    model: '/models/almacenamiento.glb', rotation: [-H, 0, 0] },
  { href: '/categoria/refrigeracion',  label: 'Refrigeración',     model: '/models/cooling.glb' },
  { href: '/categoria/perifericos',    label: 'Periféricos',       model: '/models/perifericos.glb' },
  { href: '/categoria/gabinetes',      label: 'Gabinetes',         model: '/models/pccase.glb' },
  { href: '/categoria/psu',            label: 'Fuentes de Poder',  model: '/models/fuentedepoder.glb' },
  { href: '/categoria/redes',          label: 'Redes',             model: '/models/redes.glb' },
]

if (typeof window !== 'undefined') {
  CATEGORIES.forEach(c => useGLTF.preload(c.model))
}

export default function CategoriesGrid() {
  return (
    <div className="categories-grid">
      {CATEGORIES.map((cat) => (
        <Link href={cat.href} className="category-card" key={cat.href}>
          <div className="category-img-wrap" style={{ padding: 0 }}>
            <CategoryModel url={cat.model} rotation={cat.rotation} />
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
