// Plantillas de correo compartidas por las rutas que confirman pedidos (transferencia
// bancaria en /api/pedidos, tarjeta ONVO en /api/webhooks/onvo), para que una no quede
// desactualizada en escapado/formato respecto a la otra.

import { escapeHtml } from '@/lib/security'

function filaProducto(p) {
  return `<tr>
    <td style="padding:8px;border-bottom:1px solid #eee;">${escapeHtml(p.nombre)}</td>
    <td style="padding:8px;border-bottom:1px solid #eee;text-align:center;">${escapeHtml(p.cantidad)}</td>
    <td style="padding:8px;border-bottom:1px solid #eee;text-align:right;">₡${p.precio.toLocaleString('es-CR')}</td>
  </tr>`
}

function tablaProductos(productos) {
  return `<table style="width:100%;border-collapse:collapse;margin-bottom:20px;">
    <thead>
      <tr style="background:#0d0d0d;color:#fff;">
        <th style="padding:8px;text-align:left;font-size:12px;">Producto</th>
        <th style="padding:8px;text-align:center;font-size:12px;">Cant.</th>
        <th style="padding:8px;text-align:right;font-size:12px;">Precio</th>
      </tr>
    </thead>
    <tbody>${productos.map(filaProducto).join('')}</tbody>
  </table>`
}

function resumenPagoHTML(metodoPago) {
  if (metodoPago === 'onvo') {
    return `<tr><td style="padding:6px;color:#1E3A8A;font-weight:600;">Pago</td><td style="padding:6px;color:#1E3A8A;font-weight:600;">Pagado con tarjeta ✓</td></tr>
      <tr><td style="padding:6px;color:#16A34A;font-weight:600;">Envio</td><td style="padding:6px;color:#16A34A;font-weight:600;">Gratis</td></tr>`
  }
  return `<tr><td style="padding:6px;color:#16A34A;font-weight:600;">Envio</td><td style="padding:6px;color:#16A34A;font-weight:600;">Gratis</td></tr>`
}

// Correo interno a ventas@ cuando llega un pedido nuevo.
export function construirEmailAdmin(pedido) {
  const { numeroOrden, nombre, apellido, provincia, canton, direccion, telefono, correo, notas, productos, total, metodoPago } = pedido

  const metodoLabel = metodoPago === 'onvo'
    ? `<div style="background:#EEF2FF;border-radius:6px;padding:10px 16px;margin-bottom:20px;text-align:center;"><p style="margin:0;font-size:13px;font-weight:600;color:#1E3A8A;">Metodo de pago: Tarjeta (ONVO) — ya pagado</p></div>`
    : `<div style="background:#F0FDF4;border-radius:6px;padding:10px 16px;margin-bottom:20px;text-align:center;"><p style="margin:0;font-size:13px;font-weight:600;color:#16A34A;">Metodo de pago: Transferencia bancaria (antes de la entrega)</p></div>`

  return `
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
        ${metodoLabel}
        <h2 style="font-size:16px;color:#0d0d0d;margin:0 0 12px;">Datos del cliente</h2>
        <table style="width:100%;border-collapse:collapse;margin-bottom:20px;">
          <tr><td style="padding:6px;color:#666;width:140px;">Nombre</td><td style="padding:6px;font-weight:500;">${escapeHtml(nombre)} ${escapeHtml(apellido)}</td></tr>
          <tr style="background:#f0f0f0;"><td style="padding:6px;color:#666;">Provincia</td><td style="padding:6px;font-weight:500;">${escapeHtml(provincia)}</td></tr>
          <tr><td style="padding:6px;color:#666;">Canton</td><td style="padding:6px;font-weight:500;">${escapeHtml(canton)}</td></tr>
          <tr style="background:#f0f0f0;"><td style="padding:6px;color:#666;">Direccion</td><td style="padding:6px;font-weight:500;">${escapeHtml(direccion)}</td></tr>
          <tr><td style="padding:6px;color:#666;">Telefono</td><td style="padding:6px;font-weight:500;">${escapeHtml(telefono)}</td></tr>
          <tr style="background:#f0f0f0;"><td style="padding:6px;color:#666;">Correo</td><td style="padding:6px;font-weight:500;">${escapeHtml(correo)}</td></tr>
          ${notas ? `<tr><td style="padding:6px;color:#666;">Notas</td><td style="padding:6px;font-weight:500;">${escapeHtml(notas)}</td></tr>` : ''}
        </table>
        <h2 style="font-size:16px;color:#0d0d0d;margin:0 0 12px;">Productos</h2>
        ${tablaProductos(productos)}
        <table style="width:100%;border-collapse:collapse;margin-bottom:20px;font-size:13px;">
          ${resumenPagoHTML(metodoPago)}
        </table>
        <div style="background:#0d0d0d;color:#fff;padding:14px 20px;border-radius:6px;">
          <span style="font-size:14px;">Total del pedido</span>
          <span style="font-size:18px;font-weight:700;color:#F9BE16;float:right;">₡${total.toLocaleString('es-CR')}</span>
        </div>
      </div>
    </div>
  `
}

// Correo de confirmación al cliente.
export function construirEmailCliente(pedido) {
  const { numeroOrden, nombre, productos, total, metodoPago } = pedido
  const nombreSeguro = escapeHtml(nombre)

  const bloquePago = metodoPago === 'onvo'
    ? `<div style="background:#F0FDF4;border:1px solid #BBF7D0;border-radius:8px;padding:16px;margin-bottom:20px;text-align:center;">
         <p style="margin:0;font-size:14px;font-weight:700;color:#16A34A;">✓ Pago con tarjeta confirmado</p>
       </div>`
    : `<div style="background:#EEF2FF;border:1px solid #C7D2FE;border-radius:8px;padding:16px;margin-bottom:20px;">
         <p style="margin:0 0 10px;font-size:13px;font-weight:600;color:#1E3A8A;">Datos para tu transferencia bancaria</p>
         <table style="width:100%;font-size:13px;">
           <tr><td style="color:#666;padding:3px 0;width:120px;">Banco</td><td style="font-weight:500;color:#0d0d0d;">Banco Promerica</td></tr>
           <tr><td style="color:#666;padding:3px 0;">IBAN</td><td style="font-weight:500;color:#0d0d0d;">CR53010200009691543011</td></tr>
           <tr><td style="color:#666;padding:3px 0;">A nombre de</td><td style="font-weight:500;color:#0d0d0d;">Juan Paulo Ulate Barcelli</td></tr>
           <tr><td style="color:#666;padding:3px 0;">Monto exacto</td><td style="font-weight:700;color:#1E3A8A;">₡${total.toLocaleString('es-CR')}</td></tr>
         </table>
       </div>`

  return `
    <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;">
      <div style="background:#0d0d0d;padding:24px;text-align:center;">
        <h1 style="color:#F9BE16;margin:0;font-size:24px;">TechAvenue</h1>
        <p style="color:rgba(255,255,255,0.6);margin:6px 0 0;font-size:14px;">Confirmacion de pedido</p>
      </div>
      <div style="padding:24px;">
        <h2 style="font-size:20px;color:#0d0d0d;margin:0 0 6px;">Gracias por tu compra, ${nombreSeguro}!</h2>
        <p style="color:#666;font-size:14px;margin:0 0 20px;">Tu pedido fue recibido. Nos pondremos en contacto pronto para coordinar la entrega.</p>
        <div style="background:#EEF2FF;border-radius:6px;padding:14px 20px;text-align:center;margin-bottom:20px;">
          <p style="margin:0;font-size:12px;color:#666;">Numero de orden</p>
          <p style="margin:4px 0 0;font-size:22px;font-weight:700;color:#1E3A8A;">${numeroOrden}</p>
        </div>
        ${tablaProductos(productos)}
        <table style="width:100%;border-collapse:collapse;margin-bottom:16px;font-size:13px;">
          ${resumenPagoHTML(metodoPago)}
        </table>
        <div style="padding:12px;background:#0d0d0d;border-radius:6px;color:#fff;margin-bottom:20px;">
          <span style="font-size:14px;">Total</span>
          <span style="font-size:16px;font-weight:700;color:#F9BE16;float:right;">₡${total.toLocaleString('es-CR')}</span>
        </div>
        ${bloquePago}
        <a href="https://wa.me/50663409795" style="display:inline-block;background:#25D366;color:#fff;padding:10px 20px;border-radius:6px;text-decoration:none;font-size:13px;font-weight:600;">Contactar por WhatsApp</a>
      </div>
      <div style="background:#f5f5f5;padding:16px;text-align:center;">
        <p style="margin:0;font-size:12px;color:#999;">2026 TechAvenue · techavenuecr.com</p>
      </div>
    </div>
  `
}
