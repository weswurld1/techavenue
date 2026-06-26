export const dynamic = 'force-dynamic'
import { createClient } from '@supabase/supabase-js'

export async function GET() {
  const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SECRET_KEY)

  const { data: pedidos } = await supabase.from('pedidos').select('productos').not('productos', 'is', null)

  const conteo = {}
  pedidos?.forEach(p => {
    const prods = Array.isArray(p.productos) ? p.productos : []
    prods.forEach(prod => {
      const key = prod.sku || prod.nombre
      if (!key) return
      if (!conteo[key]) conteo[key] = { sku: prod.sku || null, nombre: prod.nombre, cantidad: 0 }
      conteo[key].cantidad += prod.cantidad || 1
    })
  })

  const top = Object.values(conteo)
    .sort((a, b) => b.cantidad - a.cantidad)
    .slice(0, 24)

  const skus = top.filter(p => p.sku).map(p => p.sku)

  let productos = []
  if (skus.length > 0) {
    const { data } = await supabase.from('productos').select('*').in('sku', skus)
    productos = skus.map(sku => {
      const prod = data?.find(p => p.sku === sku)
      if (!prod) return null
      return { ...prod, ventas: conteo[sku]?.cantidad || 0 }
    }).filter(Boolean)
  }

  return Response.json({ productos })
}
