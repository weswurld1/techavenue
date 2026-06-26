export async function POST(request) {
  try {
    const { password } = await request.json()
    if (!password || password !== process.env.ADMIN_PASSWORD) {
      return Response.json({ error: 'Contraseña incorrecta' }, { status: 401 })
    }
    return Response.json({ token: process.env.ADMIN_SECRET })
  } catch {
    return Response.json({ error: 'Error al autenticar' }, { status: 500 })
  }
}
