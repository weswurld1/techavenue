import { createHmac, createHash, timingSafeEqual } from 'crypto'

const DURACION_TOKEN_MS = 12 * 60 * 60 * 1000 // 12 horas

function firmar(payload) {
  return createHmac('sha256', process.env.ADMIN_SECRET).update(payload).digest('hex')
}

// Compara dos strings en tiempo constante (evita timing attacks), sin importar su longitud.
export function compararSeguro(a, b) {
  const hashA = createHash('sha256').update(String(a ?? '')).digest()
  const hashB = createHash('sha256').update(String(b ?? '')).digest()
  return timingSafeEqual(hashA, hashB)
}

// Genera un token firmado con expiración, en vez de exponer ADMIN_SECRET directamente.
// Si ADMIN_SECRET cambia, todos los tokens emitidos quedan invalidados.
export function generarTokenAdmin() {
  const expira = Date.now() + DURACION_TOKEN_MS
  const firma = firmar(String(expira))
  return `${expira}.${firma}`
}

export function verificarTokenAdmin(request) {
  const auth = request.headers.get('authorization') || ''
  if (!auth.startsWith('Bearer ')) return false
  const token = auth.slice(7)
  const [expiraStr, firma] = token.split('.')
  if (!expiraStr || !firma) return false
  const expira = Number(expiraStr)
  if (!Number.isFinite(expira) || Date.now() > expira) return false
  return compararSeguro(firmar(expiraStr), firma)
}
