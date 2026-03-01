import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { db } from '../../../../db';
import { stores } from '../../../../db/schema';

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { city, contact, lat, long, name, streetAddress, website } = body;

  try {
    const data = await db
      .insert(stores)
      .values({ city, contact, lat, long, name, streetAddress, website })
      .returning();

    return NextResponse.json({ status: 200, body: data });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error }, { status: 500 });
  }
}
