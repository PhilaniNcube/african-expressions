import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { eq } from 'drizzle-orm';
import { db } from '../../../../db';
import { stores } from '../../../../db/schema';

export async function DELETE(request: NextRequest) {
  const body = await request.json();
  const { id } = body;

  try {
    const data = await db
      .delete(stores)
      .where(eq(stores.id, id))
      .returning();

    return NextResponse.json({ status: 200, body: data });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error }, { status: 500 });
  }
}
