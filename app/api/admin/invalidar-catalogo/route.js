// Traer el catálogo completo de Divia paginado toma ~100s; dejamos margen.
export const maxDuration = 150

import { createClient } from '@supabase/supabase-js'
import { actualizarCatalogoCache } from '@/lib/divia'

function verificarToken(request) {
  const auth = request.headers.get('Authorization') || ''
  return auth.replace('Bearer ', '') === process.env.ADMIN_SECRET
}

function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SECRET_KEY
  )
}

export async function POST(request) {
  if (!verificarToken(request)) {
    return Response.json({ error: 'No autorizado' }, { status: 401 })
  }

  const supabase = getSupabase()

  try {
    const { productos, actualizado_en } = await actualizarCatalogoCache(supabase)
    return Response.json({
      ok: true,
      productos,
      actualizado_en,
      mensaje: `Catálogo actualizado: ${productos} productos cargados directamente de Divia.`,
    })
  } catch (err) {
    return Response.json({
      ok: false,
      error: err.message,
      mensaje: `No se pudo conectar a Divia (${err.message}). El caché fue marcado como vencido — el próximo intento (admin o cron) lo reintentará.`,
    }, { status: 502 })
  }
}
