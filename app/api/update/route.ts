import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import supabaseService from '../../../utils/supabaseService';

export async function POST(request: NextRequest) {
  const body = await request.json();

  const { data, error } = await supabaseService
    .from('products')
    .update([{ main_image: body.image }])
    .eq('id', body.id);

  if (error) {
    return NextResponse.json({ error }, { status: 500 });
  }

  return NextResponse.json({ status: 200, body: data });
}
