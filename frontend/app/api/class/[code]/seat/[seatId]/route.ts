import { NextRequest } from 'next/server';
import { seatPage } from '@/lib/class-results/store';
import { prismaClassDb } from '@/lib/class-results/db';
import { handle } from '@/lib/class-results/http';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

/** GET /api/class/<code>/seat/<seatId> → that child's assignments with a state (new, done, rest, mastered); never a score */
export async function GET(_request: NextRequest, { params }: { params: { code: string; seatId: string } }) {
  return handle(async () => seatPage(prismaClassDb, params.code, params.seatId, new Date()));
}
