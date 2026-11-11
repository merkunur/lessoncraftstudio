import { NextRequest } from 'next/server';
import { addSeats } from '@/lib/class-results/store';
import { prismaClassDb } from '@/lib/class-results/db';
import { handle, callerOf, bodyOf } from '@/lib/class-results/http';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

/** POST { names } (a names class) or { count } (a numbers-only class) → 201 { added, refused } */
export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  return handle(async () => addSeats(prismaClassDb, await callerOf(request), params.id, await bodyOf(request), new Date()));
}
