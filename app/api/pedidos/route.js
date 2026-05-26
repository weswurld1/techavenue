export const dynamic = 'force-dynamic'

import { Resend } from 'resend'
import { createClient } from '@supabase/supabase-js'

function generarNumeroOrden() {
  const fecha = new Date()
  const año = fecha.getFullYear()
  const mes = String(fecha.getMonth() + 1).padStart(2, '0')
  const dia = String(fecha.getDate()).padStart(2, '0')
  const random = String(Math.floor(Math.random() * 9000) + 1000)
  return `TA-${año}${mes}${dia}-${random}`
}

export async function POST(request) {
  const resend = new Resend(process.env.RESEND_API_KEY)
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SECRET_KEY
  )

  try {
    const body = await request.json()
    const { nombre, apellido, provincia, canton, direccion, telefono, correo, notas, productos, total } = body

    const numeroOrden = generarNumeroOrden()

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
      estado: 'recibido',
    })
    if (supabaseError) {
      console.error('SUPABASE ERROR:', supabaseError)
      return Response.json({ success: false, error: supabaseError.message }, { status: 500 })
    }  

    const productosHTML = productos.map(p =>
      `<tr>
        <td style="padding:8px;border-bottom:1px solid #eee;">${p.nombre}</td>
        <td style="padding:8px;border-bottom:1px solid #eee;text-align:center;">${p.cantidad}</td>
        <td style="padding:8px;border-bottom:1px solid #eee;text-align:right;">₡${p.precio.toLocaleString('es-CR')}</td>
      </tr>`
    ).join('')

    await resend.emails.send({
      from: 'TechAvenue <ventas@techavenuecr.com>',
      to: 'ventas@techavenuecr.com',
      subject: `Nuevo pedido ${numeroOrden} — ${nombre} ${apellido}`,
      html: `
        <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;">
          <div style="background:#0d0d0d;padding:24px;text-align:center;">
            <h1 style="color:#F9BE16;margin:0;font-size:24px;">TechAvenue</h1>
            <p style="color:rgba(255,255,255,0.6);margin:6px 0 0;font-size:14px;">Nuevo pedido recibido</p>
          </div>
          <div style="padding:24px;background:#f9f9f9;">
            <div style="background:#1E3A8A;color:#fff;padding:12px 20px;border-radius:6px;margin-bottom:20px;text-align:center;">
              <p style="margin:0;font-size:12px;opacity:0.8;">Numero de orden</p>
              <p style="margin:4px 0 0;font-size:22px;font-weight:700;">${numeroOrden}</p>
            </div>
            <h2 style="font-size:16px;color:#0d0d0d;margin:0 0 12px;">Datos del cliente</h2>
            <table style="width:100%;border-collapse:collapse;margin-bottom:20px;">
              <tr><td style="padding:6px;color:#666;width:140px;">Nombre</td><td style="padding:6px;font-weight:500;">${nombre} ${apellido}</td></tr>
              <tr style="background:#f0f0f0;"><td style="padding:6px;color:#666;">Provincia</td><td style="padding:6px;font-weight:500;">${provincia}</td></tr>
              <tr><td style="padding:6px;color:#666;">Canton</td><td style="padding:6px;font-weight:500;">${canton}</td></tr>
              <tr style="background:#f0f0f0;"><td style="padding:6px;color:#666;">Direccion</td><td style="padding:6px;font-weight:500;">${direccion}</td></tr>
              <tr><td style="padding:6px;color:#666;">Telefono</td><td style="padding:6px;font-weight:500;">${telefono}</td></tr>
              <tr style="background:#f0f0f0;"><td style="padding:6px;color:#666;">Correo</td><td style="padding:6px;font-weight:500;">${correo}</td></tr>
              ${notas ? `<tr><td style="padding:6px;color:#666;">Notas</td><td style="padding:6px;font-weight:500;">${notas}</td></tr>` : ''}
            </table>
            <h2 style="font-size:16px;color:#0d0d0d;margin:0 0 12px;">Productos</h2>
            <table style="width:100%;border-collapse:collapse;margin-bottom:20px;">
              <thead>
                <tr style="background:#0d0d0d;color:#fff;">
                  <th style="padding:8px;text-align:left;font-size:12px;">Producto</th>
                  <th style="padding:8px;text-align:center;font-size:12px;">Cant.</th>
                  <th style="padding:8px;text-align:right;font-size:12px;">Precio</th>
                </tr>
              </thead>
              <tbody>${productosHTML}</tbody>
            </table>
            <div style="background:#0d0d0d;color:#fff;padding:14px 20px;border-radius:6px;">
              <span style="font-size:14px;">Total del pedido</span>
              <span style="font-size:18px;font-weight:700;color:#F9BE16;float:right;">₡${total.toLocaleString('es-CR')}</span>
            </div>
          </div>
        </div>
      `
    })

    await resend.emails.send({
      from: 'TechAvenue <ventas@techavenuecr.com>',
      to: correo,
      subject: `Confirmacion de tu pedido ${numeroOrden} — TechAvenue`,
      html: `
        <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;">
          <div style="background:#0d0d0d;padding:24px;text-align:center;">
            <h1 style="color:#F9BE16;margin:0;font-size:24px;">TechAvenue</h1>
            <p style="color:rgba(255,255,255,0.6);margin:6px 0 0;font-size:14px;">Confirmacion de pedido</p>
          </div>
          <div style="padding:24px;">
            <h2 style="font-size:20px;color:#0d0d0d;margin:0 0 6px;">Gracias por tu compra, ${nombre}!</h2>
            <p style="color:#666;font-size:14px;margin:0 0 20px;">Tu pedido fue recibido. Nos pondremos en contacto pronto para coordinar la entrega.</p>
            <div style="background:#EEF2FF;border-radius:6px;padding:14px 20px;text-align:center;margin-bottom:20px;">
              <p style="margin:0;font-size:12px;color:#666;">Numero de orden</p>
              <p style="margin:4px 0 0;font-size:22px;font-weight:700;color:#1E3A8A;">${numeroOrden}</p>
            </div>
            <table style="width:100%;border-collapse:collapse;margin-bottom:16px;">
              <thead>
                <tr style="background:#f5f5f5;">
                  <th style="padding:8px;text-align:left;font-size:12px;color:#666;">Producto</th>
                  <th style="padding:8px;text-align:center;font-size:12px;color:#666;">Cant.</th>
                  <th style="padding:8px;text-align:right;font-size:12px;color:#666;">Precio</th>
                </tr>
              </thead>
              <tbody>${productosHTML}</tbody>
            </table>
            <div style="padding:12px;background:#0d0d0d;border-radius:6px;color:#fff;margin-bottom:20px;">
              <span style="font-size:14px;">Total</span>
              <span style="font-size:16px;font-weight:700;color:#F9BE16;float:right;">₡${total.toLocaleString('es-CR')}</span>
            </div>
            <div style="background:#EEF2FF;border:1px solid #C7D2FE;border-radius:8px;padding:16px;margin-bottom:20px;">
              <p style="margin:0 0 10px;font-size:13px;font-weight:600;color:#1E3A8A;">Datos para tu transferencia bancaria</p>
              <table style="width:100%;font-size:13px;">
                <tr><td style="color:#666;padding:3px 0;width:120px;">Banco</td><td style="font-weight:500;color:#0d0d0d;">Banco Promerica</td></tr>
                <tr><td style="color:#666;padding:3px 0;">IBAN</td><td style="font-weight:500;color:#0d0d0d;">CR53010200009691543011</td></tr>
                <tr><td style="color:#666;padding:3px 0;">A nombre de</td><td style="font-weight:500;color:#0d0d0d;">Juan Paulo Ulate Barcelli</td></tr>
                <tr><td style="color:#666;padding:3px 0;">Monto exacto</td><td style="font-weight:700;color:#1E3A8A;">₡${total.toLocaleString('es-CR')}</td></tr>
              </table>
            </div>
            <a href="https://wa.me/50663409795" style="display:inline-block;background:#25D366;color:#fff;padding:10px 20px;border-radius:6px;text-decoration:none;font-size:13px;font-weight:600;">Contactar por WhatsApp</a>
          </div>
          <div style="background:#f5f5f5;padding:16px;text-align:center;">
            <p style="margin:0;font-size:12px;color:#999;">2026 TechAvenue · techavenuecr.com</p>
          </div>
        </div>
      `
    })

    return Response.json({ success: true, numeroOrden })
  } catch (error) {
    console.error(error)
    return Response.json({ success: false, error: 'Error al procesar el pedido' }, { status: 500 })
  }
}
