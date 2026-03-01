import { NextResponse } from 'next/server';
import getStores from '../../../lib/getStores';

export async function GET() {
  try {
    const data = await getStores();
    return NextResponse.json(data);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to fetch stores' }, { status: 500 });
  }
}
