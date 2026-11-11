import { NextRequest } from 'next/server';
import { classPage } from '@/lib/class-results/store';
import { prismaClassDb } from '@/lib/class-results/db';
import { handle } from '@/lib/class-results/http';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

/** GET /api/class/<code> → the class page: the seats and what is assigned. Public: the code is the key. */
export async function GET(_request: NextRequest, { params }: { params: { code: string } }) {
  return handle(async () => classPage(prismaClassDb, params.code));
}
