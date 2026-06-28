export const dynamic = 'force-dynamic'
import { createClient } from '@supabase/supabase-js'

const CACHE_MINUTOS = 20
const CACHE_CLAVE = 'catalogo-divia'

function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SECRET_KEY
  )
}

function buildUrl() {
  const base = process.env.CATALOGO_EXTERNO_URL
  const token = process.env.CATALOGO_EXTERNO_TOKEN
  if (token) return `${base}?token=${token}`
  return base
}

// Solo guarda los campos que necesita la tienda para reducir el tamaño
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

async function fetchEndpointExterno() {
  const url = buildUrl()
  const res = await fetch(url, { cache: 'no-store' })
  if (!res.ok) throw new Error(`Error externo: ${res.status}`)
  return res.json()
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

  try {
    const respuestaRaw = await fetchEndpointExterno()
    const datos = limpiarProductos(respuestaRaw)
    await guardarEnCache(supabase, datos)
    return Response.json({
      datos,
      fuente: 'externo',
      actualizado_en: new Date().toISOString(),
    })
  } catch (err) {
    const { data: cacheViejo } = await supabase
      .from('cache_catalogo_externo')
      .select('datos, actualizado_en')
      .eq('clave', CACHE_CLAVE)
      .single()

    if (cacheViejo) {
      return Response.json({
        datos: cacheViejo.datos,
        fuente: 'cache-fallback',
        actualizado_en: cacheViejo.actualizado_en,
        advertencia: 'Datos desactualizados — el endpoint externo falló',
      })
    }

    return Response.json({ error: err.message }, { status: 502 })
  }
}
