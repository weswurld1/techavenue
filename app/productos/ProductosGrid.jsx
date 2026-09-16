'use client'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { useGLTF } from '@react-three/drei'
import { CATEGORIAS } from '@/lib/categorias'

const CategoryModel = dynamic(() => import('@/components/CategoryModel'), { ssr: false })

if (typeof window !== 'undefined') {
  CATEGORIAS.forEach(c => useGLTF.preload(c.model))
}

export default function ProductosGrid() {
  return (
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
          <div style={{ width: 72, height: 72, background: 'var(--gray-100)', borderRadius: 8, flexShrink: 0, overflow: 'hidden' }}>
            <CategoryModel url={cat.model} rotation={cat.rotation} />
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
  )
}
