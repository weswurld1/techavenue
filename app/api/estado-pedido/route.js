export const dynamic = 'force-dynamic'

import { createClient } from '@supabase/supabase-js'

export async function GET(request) {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SECRET_KEY
  )

  try {
    const { searchParams } = new URL(request.url)
    const orden = searchParams.get('orden')

    if (!orden) {
      return Response.json({ error: 'Numero de orden requerido' }, { status: 400 })
    }

    const { data, error } = await supabase
      .from('pedidos')
      .select('*')
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