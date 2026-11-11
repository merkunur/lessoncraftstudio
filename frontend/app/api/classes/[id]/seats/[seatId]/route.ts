import { NextRequest } from 'next/server';
import { updateSeat, deleteSeat } from '@/lib/class-results/store';
import { prismaClassDb } from '@/lib/class-results/db';
import { handle, callerOf, bodyOf } from '@/lib/class-results/http';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

type Ctx = { params: { id: string; seatId: string } };

/** PATCH { displayName?, icon? } · DELETE → the child and their results; DELETE ?results=1 → the results only */
export async function PATCH(request: NextRequest, { params }: Ctx) {
  return handle(async () => updateSeat(prismaClassDb, await callerOf(request), params.id, params.seatId, await bodyOf(request)));
}

export async function DELETE(request: NextRequest, { params }: Ctx) {
  const resultsOnly = request.nextUrl.searchParams.get('results') === '1';
  return handle(async () => deleteSeat(prismaClassDb, await callerOf(request), params.id, params.seatId, resultsOnly));
}
