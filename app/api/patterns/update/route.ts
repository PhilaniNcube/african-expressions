import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { eq } from 'drizzle-orm';
import { db } from '../../../../db';
import { patterns } from '../../../../db/schema';

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { name, image, document, product, stitching, category, id } = body;

  try {
    const data = await db
      .update(patterns)
      .set({ name, image, document, product_id: product, stitching, category })
      .where(eq(patterns.id, id))
      .returning();

    return NextResponse.json({ status: 200, body: data });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
