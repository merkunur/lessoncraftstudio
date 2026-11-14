/**
 * What every /api/classes/* and /api/class/* route shares: the dark-launch switch, who is calling, and the reply.
 *
 * CLASS_RESULTS_ENABLED — anything but '1' makes every route answer 404 and the workspace tab and the class page
 * disappear, so the code can be deployed before the privacy texts are approved (operator ruling 2026-11-11: the
 * launch waits for the lawyer's check). The env var exists only on the server, like METERING_ENABLED.
 */
import { NextRequest, NextResponse } from 'next/server';
import { resolveQuotaIdentity } from '@/lib/quota';
import type { Caller, Reply } from './store';

export function classResultsEnabled(): boolean {
  return process.env.CLASS_RESULTS_ENABLED === '1';
}

const NO_STORE = { 'Cache-Control': 'no-store', 'X-Robots-Tag': 'noindex' } as const;

export const off = () => NextResponse.json({ error: 'not_found' }, { status: 404, headers: NO_STORE });
export const send = (r: Reply) => NextResponse.json(r.body, { status: r.status, headers: NO_STORE });

/**
 * First names need TWO keys (legal decision of 2026-11-14, condition E1): the server switch CLASS_NAMES_ENABLED and
 * the teacher's own permission, which is given only after a person who may sign for her school has accepted the
 * school agreement (or, outside the US, on a private tutor's own declaration). No record of such an acceptance
 * exists yet, so nobody holds the permission and the switch alone opens nothing. When first names are opened
 * (the decision's item 20), this reads that record.
 */
const holdsNamesPermission = (_userId: string): boolean => false;

/** the teacher behind a request: the same two-step identity the meter and the makers use (Bearer, then the refresh cookie) */
export async function callerOf(request: NextRequest): Promise<Caller> {
  const id = await resolveQuotaIdentity(request);
  if (id.kind === 'subscriber') return { userId: id.userId, usable: true, names: process.env.CLASS_NAMES_ENABLED === '1' && holdsNamesPermission(id.userId) };
  if (id.kind === 'free-user') return { userId: id.userId, usable: false };
  return null;
}

/** a request body as JSON, capped: nothing these routes accept is larger than a pasted class list */
export async function bodyOf(request: NextRequest, maxBytes = 8 * 1024): Promise<unknown> {
  try {
    const text = await request.text();
    if (text.length > maxBytes) return null;
    return JSON.parse(text);
  } catch {
    return null;
  }
}

/** one handler body for every route: switch, then the rule, with a 500 that never leaks a stack */
export async function handle(run: () => Promise<Reply>): Promise<NextResponse> {
  if (!classResultsEnabled()) return off();
  try {
    return send(await run());
  } catch (e) {
    console.error('[class-results]', (e as Error).message);
    return NextResponse.json({ error: 'server_error' }, { status: 500, headers: NO_STORE });
  }
}
