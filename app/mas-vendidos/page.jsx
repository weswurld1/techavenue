export const dynamic = 'force-dynamic'
import { createClient } from '@supabase/supabase-js'
import Link from 'next/link'
import { toSlug } from '@/lib/utils'

async function getProductos() {
  try {
    const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SECRET_KEY)

    const { data: pedidos } = await supabase.from('pedidos').select('productos').not('productos', 'is', null)

    const conteo = {}
    pedidos?.forEach(p => {
      const prods = Array.isArray(p.productos) ? p.productos : []
      prods.forEach(prod => {
        const key = prod.sku || prod.nombre
        if (!key) return
        if (!conteo[key]) conteo[key] = { sku: prod.sku || null, cantidad: 0 }
        conteo[key].cantidad += prod.cantidad || 1
      })
    })

    const top = Object.entries(conteo)
      .sort((a, b) => b[1].cantidad - a[1].cantidad)
      .slice(0, 24)

    const skus = top.filter(([, v]) => v.sku).map(([, v]) => v.sku)
    if (!skus.length) return []

    const { data } = await supabase.from('productos').select('*').in('sku', skus)
    return skus.map(sku => {
      const prod = data?.find(p => p.sku === sku)
      if (!prod) return null
      return { ...prod, ventas: conteo[sku]?.cantidad || 0 }
    }).filter(Boolean)
  } catch { return [] }
}

export default async function MasVendidosPage() {
  const productos = await getProductos()

  return (
    <div style={{ maxWidth: 1200, margin: '0 auto', padding: '48px 32px 96px' }}>
      <div style={{ marginBottom: 36 }}>
        <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#16A34A', marginBottom: 8 }}>
          Ranking
        </div>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
          <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'clamp(36px, 5vw, 56px)', color: 'var(--black)', letterSpacing: '-0.02em', margin: 0 }}>
            Los más Vendidos
          </h1>
          <span style={{ fontSize: 13, color: 'var(--gray-400)', marginBottom: 8 }}>{productos.length} producto{productos.length !== 1 ? 's' : ''}</span>
        </div>
      </div>

      {productos.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '80px 0', color: 'var(--gray-400)' }}>
          <div style={{ fontSize: 16, fontWeight: 600, color: 'var(--black)', marginBottom: 8 }}>Aún no hay datos de ventas</div>
          <div style={{ fontSize: 14 }}>Los productos más vendidos aparecerán aquí automáticamente.</div>
          <Link href="/productos" style={{ display: 'inline-block', marginTop: 24, background: 'var(--black)', color: '#fff', padding: '10px 24px', borderRadius: 8, fontSize: 14, fontWeight: 600, textDecoration: 'none' }}>
            Ver catálogo completo
          </Link>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 20 }}>
          {productos.map((p, i) => <ProductCard key={p.sku} p={p} rank={i + 1} />)}
        </div>
      )}
    </div>
  )
}

function ProductCard({ p, rank }) {
  return (
    <Link href={`/producto/${toSlug(p.nombre)}`} style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
      <div style={{ border: '1.5px solid var(--gray-200)', borderRadius: 10, overflow: 'hidden', cursor: 'pointer', position: 'relative' }}>
        <div style={{ position: 'absolute', top: 10, left: 10, background: rank <= 3 ? '#F9BE16' : '#F3F4F6', color: rank <= 3 ? '#0d0d0d' : 'var(--gray-600)', fontSize: 11, fontWeight: 800, padding: '3px 8px', borderRadius: 20, zIndex: 1 }}>
          #{rank}
        </div>
        {p.en_oferta && (
          <div style={{ position: 'absolute', top: 10, right: 10, background: '#DC2626', color: '#fff', fontSize: 11, fontWeight: 700, padding: '3px 8px', borderRadius: 20, zIndex: 1 }}>
            Oferta
          </div>
        )}
        <div style={{ background: 'var(--gray-100)', aspectRatio: '1', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
          {p.imagen
            ? <img src={p.imagen} alt={p.nombre} style={{ width: '100%', height: '100%', objectFit: 'contain', padding: 16 }} />
            : <div style={{ color: 'var(--gray-300)', fontSize: 12 }}>Sin imagen</div>}
        </div>
        <div style={{ padding: '14px 16px' }}>
          <div style={{ fontSize: 11, color: 'var(--gray-400)', marginBottom: 4, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{p.marca}</div>
          <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--black)', marginBottom: 10, lineHeight: 1.3 }}>{p.nombre}</div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              {p.precio_original && <div style={{ fontSize: 11, color: 'var(--gray-400)', textDecoration: 'line-through' }}>₡{p.precio_original.toLocaleString('es-CR')}</div>}
              <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 18, color: p.en_oferta ? '#DC2626' : 'var(--black)' }}>₡{p.precio?.toLocaleString('es-CR')}</div>
            </div>
            <div style={{ fontSize: 11, fontWeight: 700, padding: '3px 8px', borderRadius: 20, background: p.stock > 0 ? '#F0FDF4' : '#FEE2E2', color: p.stock > 0 ? '#16A34A' : '#DC2626' }}>
              {p.ventas} venta{p.ventas !== 1 ? 's' : ''}
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}
