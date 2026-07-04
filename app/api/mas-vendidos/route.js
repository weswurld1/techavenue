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
      if (!conteo[key]) conteo[key] = { sku: prod.sku || null, ventas: 0 }
      conteo[key].ventas += prod.cantidad || 1
    })
  })

  const productos = Object.values(conteo)
    .filter(p => p.sku)
    .sort((a, b) => b.ventas - a.ventas)
    .slice(0, 24)

  return Response.json({ productos })
}
