import { createClient } from '@supabase/supabase-js'

function verificarToken(request) {
  const auth = request.headers.get('Authorization') || ''
  return auth.replace('Bearer ', '') === process.env.ADMIN_SECRET
}

export async function POST(request) {
  if (!verificarToken(request)) {
    return Response.json({ error: 'No autorizado' }, { status: 401 })
  }

  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.SUPABASE_SECRET_KEY
    )

    // Marca el caché como vencido (fecha antigua) sin borrarlo.
    // Así si Divia falla, el sitio muestra los datos viejos en vez de quedar vacío.
    const { error } = await supabase
      .from('cache_catalogo_externo')
      .update({ actualizado_en: new Date(0).toISOString() })
      .eq('clave', 'catalogo-divia')

    if (error) throw error

    return Response.json({ ok: true, mensaje: 'Caché marcado como vencido. El próximo visitante cargará los precios actualizados de Divia.' })
  } catch (err) {
    return Response.json({ error: err.message }, { status: 500 })
  }
}
