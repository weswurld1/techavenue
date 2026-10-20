'use client'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { useGLTF } from '@react-three/drei'
import { CATEGORIAS } from '@/lib/categorias'

const CategoryModel = dynamic(() => import('./CategoryModel'), { ssr: false })

if (typeof window !== 'undefined') {
  CATEGORIAS.forEach(c => useGLTF.preload(c.model))
}

export default function CategoriesGrid() {
  return (
    <div className="categories-grid">
      {CATEGORIAS.map((cat) => (
        <Link href={cat.href} className="category-card" key={cat.href}>
          <div className="category-img-wrap" style={{ padding: 0 }}>
            <CategoryModel url={cat.model} rotation={cat.rotation} />
          </div>
          <div className="category-body">
            {/* eslint-disable-next-line react/jsx-no-comment-textnodes -- intentional "// label" design accent, not a leftover comment */}
            <span className="category-name"><em>//</em> {cat.label}</span>
            <span className="category-arrow">→</span>
          </div>
        </Link>
      ))}
    </div>
  )
}
