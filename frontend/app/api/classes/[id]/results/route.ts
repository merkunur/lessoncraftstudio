import { NextRequest } from 'next/server';
import { classResults } from '@/lib/class-results/store';
import { prismaClassDb } from '@/lib/class-results/db';
import { handle, callerOf } from '@/lib/class-results/http';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

/** GET → the dashboard: seats, assignments and one cell per child and assignment (first Check; per level for a Level Set) */
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  return handle(async () => classResults(prismaClassDb, await callerOf(request), params.id));
}
