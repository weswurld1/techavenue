export const dynamic = 'force-dynamic'
import { createClient } from '@supabase/supabase-js'

export async function POST(request) {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SECRET_KEY
  )
  try {
    const { id, estado } = await request.json()
    const { error } = await supabase
      .from('pedidos')
      .update({ estado })
      .eq('id', id)
    if (error) return Response.json({ success: false, error: error.message }, { status: 500 })
    return Response.json({ success: true })
  } catch (error) {
    return Response.json({ success: false, error: error.message }, { status: 500 })
  }
}