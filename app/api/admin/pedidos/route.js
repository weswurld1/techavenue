export const dynamic = 'force-dynamic'
import { createClient } from '@supabase/supabase-js'
import { verificarTokenAdmin } from '@/lib/adminAuth'

export async function GET(request) {
  if (!verificarTokenAdmin(request)) {
    return Response.json({ error: 'No autorizado' }, { status: 401 })
  }
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SECRET_KEY
  )
  const { data } = await supabase
    .from('pedidos')
    .select('*')
    .order('created_at', { ascending: false })
  return Response.json({ pedidos: data || [] })
}
