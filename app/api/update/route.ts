import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { eq } from 'drizzle-orm';
import { db } from '../../../db';
import { products } from '../../../db/schema';

export async function POST(request: NextRequest) {
  const body = await request.json();

  try {
    const data = await db
      .update(products)
      .set({ main_image: body.image })
      .where(eq(products.id, body.id))
      .returning();

    return NextResponse.json({ status: 200, body: data });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
