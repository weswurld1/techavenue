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

    const { error } = await supabase
      .from('cache_catalogo_externo')
      .delete()
      .eq('clave', 'catalogo-divia')

    if (error) throw error

    return Response.json({ ok: true, mensaje: 'Caché borrado. El próximo visitante cargará los precios actualizados de Divia.' })
  } catch (err) {
    return Response.json({ error: err.message }, { status: 500 })
  }
}
