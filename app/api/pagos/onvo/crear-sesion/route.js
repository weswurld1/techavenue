export const dynamic = 'force-dynamic'

import { createClient } from '@supabase/supabase-js'
import { obtenerIp, rateLimit } from '@/lib/security'
import { generarNumeroOrden, validarDatosPedido } from '@/lib/pedidos'
import { crearSesionCheckout } from '@/lib/onvo'

export async function POST(request) {
  try {
    if (!process.env.ONVO_SECRET_KEY) {
      return Response.json({ success: false, error: 'Pago con tarjeta no disponible por el momento' }, { status: 503 })
    }

    const ip = obtenerIp(request)
    if (!rateLimit(`onvo-sesion:${ip}`, { limite: 5, ventanaMs: 15 * 60 * 1000 })) {
      return Response.json({ success: false, error: 'Demasiados intentos. Intenta de nuevo más tarde.' }, { status: 429 })
    }

    const body = await request.json()
    const { nombre, apellido, provincia, canton, direccion, telefono, correo, notas, productos } = body

    const errorValidacion = validarDatosPedido(body)
    if (errorValidacion) {
      return Response.json({ success: false, ...errorValidacion }, { status: 400 })
    }
    if (!rateLimit(`onvo-sesion-correo:${correo.toLowerCase()}`, { limite: 5, ventanaMs: 60 * 60 * 1000 })) {
      return Response.json({ success: false, error: 'Ya se enviaron varios pedidos a este correo. Intenta más tarde.' }, { status: 429 })
    }

    // El total que se cobra sale de los productos, no del campo "total" que mandó el cliente
    // (ese se puede manipular desde el navegador; el pago en sí es la fuente de verdad acá).
    const total = productos.reduce((acc, p) => acc + p.precio * p.cantidad, 0)
    if (total <= 0) {
      return Response.json({ success: false, error: 'Total inválido' }, { status: 400 })
    }

    const numeroOrden = generarNumeroOrden()
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.SUPABASE_SECRET_KEY
    )

    const { error: supabaseError } = await supabase.from('pedidos').insert({
      numero_orden: numeroOrden,
      nombre,
      apellido,
      provincia,
      canton,
      direccion,
      telefono,
      correo,
      notas,
      productos,
      total,
      metodo_pago: 'onvo',
      estado: 'pendiente_pago',
    })

    if (supabaseError) {
      console.error('SUPABASE ERROR:', supabaseError)
      return Response.json({ success: false, error: supabaseError.message }, { status: 500 })
    }

    const origin = new URL(request.url).origin
    let sesion
    try {
      sesion = await crearSesionCheckout({
        lineItems: productos.map(p => ({
          quantity: p.cantidad,
          unitAmount: Math.round(p.precio * 100),
          currency: 'CRC',
          description: p.nombre.slice(0, 200),
        })),
        customerEmail: correo,
        redirectUrl: `${origin}/orden-confirmada?orden=${numeroOrden}`,
        cancelUrl: `${origin}/checkout?onvo_cancelado=1`,
        metadata: { numeroOrden },
      })
    } catch (onvoError) {
      console.error('ONVO ERROR:', onvoError)
      await supabase.from('pedidos').delete().eq('numero_orden', numeroOrden)
      return Response.json({ success: false, error: 'No pudimos iniciar el pago con tarjeta. Intenta de nuevo.' }, { status: 502 })
    }

    return Response.json({ success: true, url: sesion.url })
  } catch (error) {
    console.error(error)
    return Response.json({ success: false, error: 'Error al procesar el pedido' }, { status: 500 })
  }
}
