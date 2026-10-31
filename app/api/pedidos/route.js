export const dynamic = 'force-dynamic'

import { Resend } from 'resend'
import { createClient } from '@supabase/supabase-js'
import { obtenerIp, rateLimit } from '@/lib/security'
import { generarNumeroOrden, validarDatosPedido } from '@/lib/pedidos'
import { construirEmailAdmin, construirEmailCliente } from '@/lib/emailsPedido'

export async function POST(request) {
  try {
    const ip = obtenerIp(request)
    if (!rateLimit(`pedidos:${ip}`, { limite: 5, ventanaMs: 15 * 60 * 1000 })) {
      return Response.json({ success: false, error: 'Demasiados pedidos enviados. Intenta de nuevo más tarde.' }, { status: 429 })
    }

    const body = await request.json()
    const { nombre, apellido, provincia, canton, direccion, telefono, correo, notas, productos, total } = body
    const metodoPago = 'anticipado'

    const errorValidacion = validarDatosPedido(body)
    if (errorValidacion) {
      return Response.json({ success: false, ...errorValidacion }, { status: 400 })
    }
    if (!rateLimit(`pedidos-correo:${correo.toLowerCase()}`, { limite: 5, ventanaMs: 60 * 60 * 1000 })) {
      return Response.json({ success: false, error: 'Ya se enviaron varios pedidos a este correo. Intenta más tarde.' }, { status: 429 })
    }

    const numeroOrden = generarNumeroOrden()

    const resend = new Resend(process.env.RESEND_API_KEY)
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
      metodo_pago: metodoPago,
      estado: 'recibido',
    })

    if (supabaseError) {
      console.error('SUPABASE ERROR:', supabaseError)
      return Response.json({ success: false, error: supabaseError.message }, { status: 500 })
    }

    const pedido = { numeroOrden, nombre, apellido, provincia, canton, direccion, telefono, correo, notas, productos, total, metodoPago }

    if (!process.env.RESEND_API_KEY) {
      console.error('PEDIDOS: RESEND_API_KEY no está configurada — pedido', numeroOrden, 'se guardó pero no se enviaron correos')
    } else {
      const { error: errorAdmin } = await resend.emails.send({
        from: 'TechAvenue <ventas@techavenuecr.com>',
        to: 'ventas@techavenuecr.com',
        subject: `Nuevo pedido ${numeroOrden} — ${nombre} ${apellido}`,
        html: construirEmailAdmin(pedido),
      })
      if (errorAdmin) console.error('PEDIDOS: Resend falló (admin) para', numeroOrden, errorAdmin)

      const { error: errorCliente } = await resend.emails.send({
        from: 'TechAvenue <ventas@techavenuecr.com>',
        to: correo,
        subject: `Confirmacion de tu pedido ${numeroOrden} — TechAvenue`,
        html: construirEmailCliente(pedido),
      })
      if (errorCliente) console.error('PEDIDOS: Resend falló (cliente) para', numeroOrden, '->', correo, errorCliente)
    }

    return Response.json({ success: true, numeroOrden })
  } catch (error) {
    console.error(error)
    return Response.json({ success: false, error: 'Error al procesar el pedido' }, { status: 500 })
  }
}
