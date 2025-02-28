// app/api/searchBooks/route.js
import { createServerClients } from '@/utils/supabase/server';

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const category = searchParams.get('category');

  const supabase = await createServerClients();
  const { data, error } = await supabase.from('books').select('*').eq('category', category);

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }

  return new Response(JSON.stringify(data), { status: 200 });
}
