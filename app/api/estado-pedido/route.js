export const dynamic = 'force-dynamic'

import { createClient } from '@supabase/supabase-js'
import { obtenerIp, rateLimit } from '@/lib/security'

export async function GET(request) {
  const ip = obtenerIp(request)
  if (!rateLimit(`estado-pedido:${ip}`, { limite: 20, ventanaMs: 10 * 60 * 1000 })) {
    return Response.json({ error: 'Demasiadas solicitudes. Intenta de nuevo más tarde.' }, { status: 429 })
  }

  try {
    const { searchParams } = new URL(request.url)
    const orden = searchParams.get('orden')

    if (!orden) {
      return Response.json({ error: 'Numero de orden requerido' }, { status: 400 })
    }

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.SUPABASE_SECRET_KEY
    )

    const { data, error } = await supabase
      .from('pedidos')
      .select('numero_orden, nombre, apellido, total, estado, created_at')
      .eq('numero_orden', orden)
      .single()

    if (error || !data) {
      return Response.json({ pedido: null })
    }

    return Response.json({ pedido: data })
  } catch (error) {
    console.error(error)
    return Response.json({ error: 'Error al buscar pedido' }, { status: 500 })
  }
}
