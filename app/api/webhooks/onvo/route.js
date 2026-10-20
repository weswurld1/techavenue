export const dynamic = 'force-dynamic'

import { Resend } from 'resend'
import { createClient } from '@supabase/supabase-js'
import { compararSeguro } from '@/lib/adminAuth'
import { construirEmailAdmin, construirEmailCliente } from '@/lib/emailsPedido'

export async function POST(request) {
  try {
    const secretRecibido = request.headers.get('x-webhook-secret') || ''
    if (!process.env.ONVO_WEBHOOK_SECRET || !compararSeguro(secretRecibido, process.env.ONVO_WEBHOOK_SECRET)) {
      return Response.json({ error: 'No autorizado' }, { status: 401 })
    }

    const body = await request.json()
    const { type, data } = body

    if (type !== 'checkout-session.succeeded') {
      // Otros eventos (pago fallido, suscripciones, etc.) no se manejan en esta primera versión.
      return Response.json({ recibido: true })
    }

    const numeroOrden = data?.metadata?.numeroOrden
    if (!numeroOrden) {
      console.error('ONVO WEBHOOK: checkout-session.succeeded sin metadata.numeroOrden', data)
      return Response.json({ recibido: true })
    }

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.SUPABASE_SECRET_KEY
    )

    const { data: pedido, error: buscarError } = await supabase
      .from('pedidos')
      .select('*')
      .eq('numero_orden', numeroOrden)
      .single()

    if (buscarError || !pedido) {
      console.error('ONVO WEBHOOK: pedido no encontrado', numeroOrden, buscarError)
      return Response.json({ recibido: true })
    }

    // Idempotente: si ya se procesó (webhook duplicado/reintento de ONVO), no reenviar correos.
    if (pedido.estado !== 'pendiente_pago') {
      return Response.json({ recibido: true })
    }

    const { error: actualizarError } = await supabase
      .from('pedidos')
      .update({ estado: 'pago_verificado' })
      .eq('numero_orden', numeroOrden)

    if (actualizarError) {
      console.error('ONVO WEBHOOK: error actualizando estado', actualizarError)
      return Response.json({ error: 'Error al actualizar el pedido' }, { status: 500 })
    }

    const resend = new Resend(process.env.RESEND_API_KEY)
    const productos = Array.isArray(pedido.productos) ? pedido.productos : JSON.parse(pedido.productos)
    const pedidoEmail = {
      numeroOrden: pedido.numero_orden,
      nombre: pedido.nombre,
      apellido: pedido.apellido,
      provincia: pedido.provincia,
      canton: pedido.canton,
      direccion: pedido.direccion,
      telefono: pedido.telefono,
      correo: pedido.correo,
      notas: pedido.notas,
      productos,
      total: pedido.total,
      metodoPago: 'onvo',
    }

    await resend.emails.send({
      from: 'TechAvenue <ventas@techavenuecr.com>',
      to: 'ventas@techavenuecr.com',
      subject: `Nuevo pedido ${pedido.numero_orden} — ${pedido.nombre} ${pedido.apellido}`,
      html: construirEmailAdmin(pedidoEmail),
    })

    await resend.emails.send({
      from: 'TechAvenue <ventas@techavenuecr.com>',
      to: pedido.correo,
      subject: `Confirmacion de tu pedido ${pedido.numero_orden} — TechAvenue`,
      html: construirEmailCliente(pedidoEmail),
    })

    return Response.json({ recibido: true })
  } catch (error) {
    console.error('ONVO WEBHOOK ERROR:', error)
    return Response.json({ error: 'Error al procesar el webhook' }, { status: 500 })
  }
}
