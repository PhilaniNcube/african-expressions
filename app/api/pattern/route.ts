import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { db } from '../../../db';
import { patterns } from '../../../db/schema';

export async function POST(request: NextRequest) {
  const body = await request.json();

  try {
    const data = await db.insert(patterns).values({
      name: body.name,
      image: body.image,
      document: body.document,
      product_id: body.productId,
      stitching: body.stitching,
      category: body.category,
    }).returning();

    return NextResponse.json({ status: 200, body: data });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
