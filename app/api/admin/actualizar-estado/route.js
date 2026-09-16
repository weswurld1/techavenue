export const dynamic = 'force-dynamic'
import { createClient } from '@supabase/supabase-js'
import { verificarTokenAdmin } from '@/lib/adminAuth'

const CAMPOS_PERMITIDOS = ['estado', 'archivado', 'en_garantia']

export async function POST(request) {
  if (!verificarTokenAdmin(request)) {
    return Response.json({ error: 'No autorizado' }, { status: 401 })
  }
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SECRET_KEY
  )
  try {
    const body = await request.json()
    const { id, ...campos } = body
    if (!id) {
      return Response.json({ success: false, error: 'ID requerido' }, { status: 400 })
    }
    const camposPermitidos = Object.fromEntries(
      Object.entries(campos).filter(([k]) => CAMPOS_PERMITIDOS.includes(k))
    )
    if (Object.keys(camposPermitidos).length === 0) {
      return Response.json({ success: false, error: 'Sin campos válidos' }, { status: 400 })
    }
    const { error } = await supabase
      .from('pedidos')
      .update(camposPermitidos)
      .eq('id', id)
    if (error) return Response.json({ success: false, error: error.message }, { status: 500 })
    return Response.json({ success: true })
  } catch (error) {
    return Response.json({ success: false, error: error.message }, { status: 500 })
  }
}
