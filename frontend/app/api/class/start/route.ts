import { NextRequest } from 'next/server';
import { startAttempt } from '@/lib/class-results/store';
import { prismaClassDb, newAttemptToken } from '@/lib/class-results/db';
import { handle, bodyOf } from '@/lib/class-results/http';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

/** POST { code, seatId, assignmentId } → { url } (the page to play, its attempt token after '#') or { done } */
export async function POST(request: NextRequest) {
  return handle(async () => startAttempt(prismaClassDb, await bodyOf(request), newAttemptToken, new Date()));
}
