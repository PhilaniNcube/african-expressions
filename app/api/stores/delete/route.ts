import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import supabaseService from '../../../../utils/supabaseService';

export async function DELETE(request: NextRequest) {
  const body = await request.json();
  const { id } = body;

  const { data, error } = await supabaseService
    .from('stores')
    .delete()
    .eq('id', id);

  if (error) {
    console.error(error);
    return NextResponse.json({ error }, { status: 500 });
  }

  return NextResponse.json({ status: 200, body: data });
}
