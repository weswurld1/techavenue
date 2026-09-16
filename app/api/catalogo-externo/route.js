export const dynamic = 'force-dynamic'
// Solo se usa si no hay ningún caché todavía (primer deploy); en ese caso puede tardar ~100s.
export const maxDuration = 150

import { createClient } from '@supabase/supabase-js'
import { obtenerCatalogoDivia } from '@/lib/divia'

const CACHE_MINUTOS = 20
const CACHE_CLAVE = 'catalogo-divia-v2'

function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SECRET_KEY
  )
}

async function obtenerDesdeCache(supabase) {
  const hace20min = new Date(Date.now() - CACHE_MINUTOS * 60 * 1000).toISOString()
  const { data } = await supabase
    .from('cache_catalogo_externo')
    .select('datos, actualizado_en')
    .eq('clave', CACHE_CLAVE)
    .gte('actualizado_en', hace20min)
    .single()
  return data
}

async function guardarEnCache(supabase, datos) {
  const { error } = await supabase.from('cache_catalogo_externo').upsert(
    { clave: CACHE_CLAVE, datos, actualizado_en: new Date().toISOString() },
    { onConflict: 'clave' }
  )
  if (error) console.error('[cache] Error al guardar en Supabase:', error.message)
}

export async function GET() {
  const supabase = getSupabase()

  const cache = await obtenerDesdeCache(supabase)
  if (cache) {
    return Response.json({
      datos: cache.datos,
      fuente: 'cache',
      actualizado_en: cache.actualizado_en,
    })
  }

  // El caché venció, pero traer el catálogo completo de Divia toma ~100s (API paginada).
  // Nunca hacemos esperar a un visitante real por eso: si hay algo guardado, aunque esté
  // vencido, se sirve tal cual. La actualización queda a cargo del botón de admin (o un cron).
  const { data: cacheViejo } = await supabase
    .from('cache_catalogo_externo')
    .select('datos, actualizado_en')
    .eq('clave', CACHE_CLAVE)
    .single()

  if (cacheViejo) {
    return Response.json({
      datos: cacheViejo.datos,
      fuente: 'cache-vencido',
      actualizado_en: cacheViejo.actualizado_en,
    })
  }

  // No hay ningún caché todavía (primera vez que corre el sitio) — no queda otra que esperar a Divia.
  try {
    const datos = await obtenerCatalogoDivia(supabase)
    await guardarEnCache(supabase, datos)
    return Response.json({
      datos,
      fuente: 'externo',
      actualizado_en: new Date().toISOString(),
    })
  } catch (err) {
    return Response.json({ error: err.message }, { status: 502 })
  }
}
