export const dynamic = 'force-dynamic'
import { createClient } from '@supabase/supabase-js'
import { verificarTokenAdmin as isAdmin } from '@/lib/adminAuth'

function getSupabase() {
  return createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SECRET_KEY)
}

export async function GET() {
  const supabase = getSupabase()
  const { data: lista } = await supabase
    .from('novedades')
    .select('*')
    .order('orden', { ascending: true })

  if (!lista?.length) return Response.json({ productos: [], lista: [] })

  const skus = lista.map(d => d.sku)
  const { data: productos } = await supabase.from('productos').select('*').in('sku', skus)
  const ordenados = skus.map(sku => productos?.find(p => p.sku === sku)).filter(Boolean)
  return Response.json({ productos: ordenados, lista })
}

export async function POST(request) {
  if (!isAdmin(request)) return Response.json({ error: 'No autorizado' }, { status: 401 })
  const supabase = getSupabase()
  try {
    const { sku } = await request.json()
    if (!sku || typeof sku !== 'string') return Response.json({ success: false, error: 'SKU inválido' }, { status: 400 })
    const { error } = await supabase.from('novedades').insert({ sku: sku.trim() })
    if (error) return Response.json({ success: false, error: error.message }, { status: 500 })
    return Response.json({ success: true })
  } catch (error) {
    return Response.json({ success: false, error: error.message }, { status: 500 })
  }
}

export async function DELETE(request) {
  if (!isAdmin(request)) return Response.json({ error: 'No autorizado' }, { status: 401 })
  const supabase = getSupabase()
  try {
    const { id } = await request.json()
    if (!id) return Response.json({ success: false, error: 'ID requerido' }, { status: 400 })
    const { error } = await supabase.from('novedades').delete().eq('id', id)
    if (error) return Response.json({ success: false, error: error.message }, { status: 500 })
    return Response.json({ success: true })
  } catch (error) {
    return Response.json({ success: false, error: error.message }, { status: 500 })
  }
}
