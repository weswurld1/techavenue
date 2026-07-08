export const dynamic = 'force-dynamic'
import { createClient } from '@supabase/supabase-js'

function verificarToken(request) {
  const auth = request.headers.get('authorization') || ''
  return auth === `Bearer ${process.env.ADMIN_SECRET}`
}

export async function GET(request) {
  if (!verificarToken(request)) {
    return Response.json({ error: 'No autorizado' }, { status: 401 })
  }

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SECRET_KEY
  )

  const { data, error } = await supabase
    .from('cache_catalogo_externo')
    .select('datos')
    .eq('clave', 'catalogo-divia-v2')
    .single()

  if (error || !data) {
    return Response.json({ error: 'No hay caché disponible', detalle: error?.message }, { status: 404 })
  }

  const productos = data.datos?.data || []

  // Campos disponibles en un producto de muestra
  const muestra = productos[0] || null
  const campos = muestra ? Object.keys(muestra) : []

  // Conteo por subcategoria
  const conteo = {}
  for (const p of productos) {
    const sub = p.subcategoria || '(sin subcategoría)'
    conteo[sub] = (conteo[sub] || 0) + 1
  }
  const subcategorias = Object.entries(conteo)
    .sort((a, b) => b[1] - a[1])
    .map(([subcategoria, cantidad]) => ({ subcategoria, cantidad }))

  // Muestra 3 productos con todos sus campos para ver la estructura real
  const ejemplos = productos.slice(0, 3)

  return Response.json({ total: productos.length, campos, subcategorias, ejemplos })
}
