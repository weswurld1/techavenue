import { createClient } from '@supabase/supabase-js'

const CACHE_CLAVE = 'catalogo-divia-v2'

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

function limpiarProductos(respuesta) {
  const productos = respuesta?.data ?? []
  return {
    client: respuesta.client,
    count: respuesta.count,
    data: productos.map(p => ({
      id: p.id,
      sku: p.sku,
      partNumber: p.partNumber,
      nombre: p.nombre,
      detalle: p.detalle,
      stock: p.stock,
      peso: p.peso,
      imageUrls: p.imageUrls,
      marca: p.marca,
      subcategoria: p.subcategoria,
      precio: p.precio,
      precioConvertido: p.precioConvertido,
      PrecioNacional: p.PrecioNacional,
      precioOferta: p.precioOferta,
      isInOffer: p.isInOffer,
      IVA: p.IVA,
      simboloLocal: p.simboloLocal,
      new: p.new,
      Total: p.Total,
      TotalOferta: p.TotalOferta,
    })),
  }
}

export async function POST(request) {
  if (!verificarToken(request)) {
    return Response.json({ error: 'No autorizado' }, { status: 401 })
  }

  const supabase = getSupabase()
  const ahora = new Date().toISOString()

  try {
    // Fetch fresh data directly from Divia
    const url = process.env.CATALOGO_EXTERNO_URL
    const token = process.env.CATALOGO_EXTERNO_TOKEN
    const fullUrl = token ? `${url}?token=${token}` : url

    const res = await fetch(fullUrl, { cache: 'no-store' })
    if (!res.ok) throw new Error(`Divia respondió con error ${res.status}`)

    const raw = await res.json()
    const datos = limpiarProductos(raw)

    // Store fresh data in Supabase
    const { error } = await supabase.from('cache_catalogo_externo').upsert(
      { clave: CACHE_CLAVE, datos, actualizado_en: ahora },
      { onConflict: 'clave' }
    )
    if (error) throw new Error(`Error guardando en Supabase: ${error.message}`)

    return Response.json({
      ok: true,
      productos: datos.data?.length ?? 0,
      actualizado_en: ahora,
      mensaje: `Catálogo actualizado: ${datos.data?.length ?? 0} productos cargados directamente de Divia.`,
    })
  } catch (err) {
    // Fallback: at least mark the cache as expired so the next visitor triggers a fresh fetch
    await supabase
      .from('cache_catalogo_externo')
      .update({ actualizado_en: new Date(0).toISOString() })
      .eq('clave', CACHE_CLAVE)

    return Response.json({
      ok: false,
      error: err.message,
      mensaje: `No se pudo conectar a Divia (${err.message}). El caché fue marcado como vencido — el próximo visitante intentará actualizarlo.`,
    }, { status: 502 })
  }
}
