'use client'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { useGLTF } from '@react-three/drei'

const CategoryModel = dynamic(() => import('./CategoryModel'), { ssr: false })

const H = Math.PI / 2

const CATEGORIES = [
  { href: '/categoria/componentes',           label: 'Componentes',             model: '/models/gpu.glb' },
  { href: '/categoria/perifericos',           label: 'Periféricos',             model: '/models/perifericos.glb' },
  { href: '/categoria/accesorios',            label: 'Accesorios',              model: '/models/almacenamiento.glb', rotation: [-H, 0, 0] },
  { href: '/categoria/energia-y-conectividad',label: 'Energía y Conectividad',  model: '/models/redes.glb' },
  { href: '/categoria/streaming-y-gaming',    label: 'Streaming y Gaming',      model: '/models/cooling.glb' },
  { href: '/categoria/computadoras',          label: 'Computadoras',            model: '/models/cpu.glb',           rotation: [-H, 0, Math.PI] },
  { href: '/categoria/hogar',                 label: 'Hogar',                   model: '/models/fuentedepoder.glb' },
  { href: '/categoria/software',              label: 'Software',                model: '/models/motherboard.glb',   rotation: [H, 0, 0] },
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
