import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import supabaseService from '../../../../utils/supabaseService';

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { name, image, document, product, stitching, category, id } = body;

  const { data, error } = await supabaseService
    .from('patterns')
    .update({ name, image, document, product_id: product, stitching, category })
    .eq('id', id);

  if (error) {
    return NextResponse.json({ error }, { status: 500 });
  }

  return NextResponse.json({ status: 200, body: data });
}
