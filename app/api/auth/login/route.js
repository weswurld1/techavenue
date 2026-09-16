import { compararSeguro, generarTokenAdmin } from '@/lib/adminAuth'
import { obtenerIp, rateLimit } from '@/lib/security'

export async function POST(request) {
  const ip = obtenerIp(request)
  if (!rateLimit(`login:${ip}`, { limite: 5, ventanaMs: 10 * 60 * 1000 })) {
    return Response.json({ error: 'Demasiados intentos. Intenta de nuevo más tarde.' }, { status: 429 })
  }

  try {
    const { password } = await request.json()
    if (!password || !process.env.ADMIN_PASSWORD || !compararSeguro(password, process.env.ADMIN_PASSWORD)) {
      return Response.json({ error: 'Contraseña incorrecta' }, { status: 401 })
    }
    return Response.json({ token: generarTokenAdmin() })
  } catch {
    return Response.json({ error: 'Error al autenticar' }, { status: 500 })
  }
}
