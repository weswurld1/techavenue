export const dynamic = 'force-dynamic'
import { createClient } from '@supabase/supabase-js'

export async function POST(request) {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SECRET_KEY
  )
  try {
    const body = await request.json()
    const { id, ...campos } = body
    const { error } = await supabase
      .from('pedidos')
      .update(campos)
      .eq('id', id)
    if (error) return Response.json({ success: false, error: error.message }, { status: 500 })
    return Response.json({ success: true })
  } catch (error) {
    return Response.json({ success: false, error: error.message }, { status: 500 })
  }
}