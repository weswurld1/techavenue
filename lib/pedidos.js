// Utilidades compartidas por las rutas que crean pedidos (transferencia bancaria y ONVO),
// para que ambas validen y numeren igual y no se desalineen con el tiempo.

import { randomBytes } from 'crypto'
import { esEmailValido } from '@/lib/security'

const MAX_LARGO = { nombre: 80, apellido: 80, provincia: 60, canton: 60, direccion: 200, telefono: 30, notas: 500 }

export function generarNumeroOrden() {
  const fecha = new Date()
  const año = fecha.getFullYear()
  const mes = String(fecha.getMonth() + 1).padStart(2, '0')
  const dia = String(fecha.getDate()).padStart(2, '0')
  const random = randomBytes(5).toString('hex').toUpperCase()
  return `TA-${año}${mes}${dia}-${random}`
}

// Valida los datos de un pedido entrante. Devuelve { error } si algo es inválido, o null si todo está bien.
export function validarDatosPedido(body) {
  const { nombre, apellido, provincia, canton, direccion, telefono, correo, productos, total } = body

  if (!nombre || !apellido || !correo || !telefono || !direccion || !provincia || !canton) {
    return { error: 'Datos del cliente incompletos' }
  }
  if (!esEmailValido(correo)) {
    return { error: 'Correo inválido' }
  }
  for (const [campo, max] of Object.entries(MAX_LARGO)) {
    const valor = body[campo]
    if (valor != null && String(valor).length > max) {
      return { error: `Campo "${campo}" demasiado largo` }
    }
  }
  if (!Array.isArray(productos) || productos.length === 0 || productos.length > 50) {
    return { error: 'El pedido no tiene productos' }
  }
  if (!productos.every(p => p && typeof p.nombre === 'string' && p.nombre.length <= 200 && typeof p.precio === 'number' && typeof p.cantidad === 'number')) {
    return { error: 'Productos inválidos' }
  }
  if (typeof total !== 'number' || total <= 0) {
    return { error: 'Total inválido' }
  }
  return null
}
