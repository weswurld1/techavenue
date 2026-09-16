// Traer el catálogo completo de Divia paginado toma ~100s; dejamos margen.
export const maxDuration = 150

import { createClient } from '@supabase/supabase-js'
import { actualizarCatalogoCache } from '@/lib/divia'

function verificarToken(request) {
  const auth = request.headers.get('Authorization') || ''
  return auth === `Bearer ${process.env.CRON_SECRET}`
}

function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SECRET_KEY
  )
}

export async function GET(request) {
  if (!process.env.CRON_SECRET || !verificarToken(request)) {
    return Response.json({ error: 'No autorizado' }, { status: 401 })
  }

  const supabase = getSupabase()

  try {
    const { productos, actualizado_en } = await actualizarCatalogoCache(supabase)
    console.log(`[cron] catálogo actualizado: ${productos} productos`)
    return Response.json({ ok: true, productos, actualizado_en })
  } catch (err) {
    console.error('[cron] falló la actualización del catálogo:', err.message)
    return Response.json({ ok: false, error: err.message }, { status: 502 })
  }
}
