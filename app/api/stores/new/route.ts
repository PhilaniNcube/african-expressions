import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import supabaseService from '../../../../utils/supabaseService';

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { city, contact, lat, long, name, streetAddress, website } = body;

  const { data, error } = await supabaseService
    .from('stores')
    .insert([{ city, contact, lat, long, name, streetAddress, website }])
    .select('*');

  if (error) {
    console.error(error);
    return NextResponse.json({ error }, { status: 500 });
  }

  return NextResponse.json({ status: 200, body: data });
}
