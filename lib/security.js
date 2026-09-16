// Utilidades de seguridad compartidas por las rutas de API.

const ENTIDADES_HTML = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }

// Escapa texto antes de interpolarlo en HTML (emails, etc.) para evitar inyección de markup.
export function escapeHtml(valor) {
  return String(valor ?? '').replace(/[&<>"']/g, (c) => ENTIDADES_HTML[c])
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function esEmailValido(email) {
  return typeof email === 'string' && email.length <= 254 && EMAIL_REGEX.test(email)
}

export function obtenerIp(request) {
  const fwd = request.headers.get('x-forwarded-for')
  if (fwd) return fwd.split(',')[0].trim()
  return request.headers.get('x-real-ip') || 'desconocida'
}

// Limitador de tasa en memoria (ventana deslizante). Es "best effort": en un entorno
// serverless cada instancia tiene su propio estado, así que no es una garantía dura,
// pero frena scripts simples de fuerza bruta / spam que golpean la misma instancia.
const intentos = new Map()

export function rateLimit(clave, { limite, ventanaMs }) {
  const ahora = Date.now()
  const registros = (intentos.get(clave) || []).filter(t => ahora - t < ventanaMs)
  if (registros.length >= limite) {
    intentos.set(clave, registros)
    return false
  }
  registros.push(ahora)
  intentos.set(clave, registros)
  if (intentos.size > 5000) {
    for (const [k, v] of intentos) {
      if (v.every(t => ahora - t >= ventanaMs)) intentos.delete(k)
    }
  }
  return true
}
