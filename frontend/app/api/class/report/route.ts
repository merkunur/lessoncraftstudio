import { NextRequest } from 'next/server';
import { report } from '@/lib/class-results/store';
import { prismaClassDb, newAttemptToken } from '@/lib/class-results/db';
import { handle, bodyOf } from '@/lib/class-results/http';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

/**
 * POST { token, right?, total?, items?, finished? } → { next } (the next page of a Level Set) or { done, back }.
 * Sent by the page a child plays (worksheet-generators/js/lcs-class.js) and only when the page was opened through a
 * class link. The first report of a token is the result; later ones count the presses. No cookie is read or set.
 */
export async function POST(request: NextRequest) {
  return handle(async () => report(prismaClassDb, await bodyOf(request, 4 * 1024), newAttemptToken, new Date()));
}
