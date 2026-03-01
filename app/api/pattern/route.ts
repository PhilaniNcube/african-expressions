import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import supabaseService from '../../../utils/supabaseService';

export async function POST(request: NextRequest) {
  const body = await request.json();

  const { data, error } = await supabaseService.from('patterns').insert([
    {
      name: body.name,
      image: body.image,
      document: body.document,
      product_id: body.productId,
      stitching: body.stitching,
      category: body.category,
    },
  ]);

  if (error) {
    return NextResponse.json({ error }, { status: 500 });
  }

  return NextResponse.json({ status: 200, body: data });
}
