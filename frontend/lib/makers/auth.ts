/**
 * Who is calling a /api/makers/* route — the same two-step identity the meter uses (frontend/lib/quota.ts
 * resolveQuotaIdentity: the Bearer access token, then the httpOnly refresh cookie that the maker screen's
 * `credentials:'same-origin'` fetches carry), so a teacher the meter knows is a teacher the store knows.
 * A crawler UA or an anonymous visitor is no caller (401 from the rules in store.ts).
 */
import type { NextRequest } from 'next/server';
import { resolveQuotaIdentity } from '@/lib/quota';
import type { Caller } from './store';

export async function callerOf(request: NextRequest): Promise<Caller> {
  const id = await resolveQuotaIdentity(request);
  return id.kind === 'subscriber' || id.kind === 'free-user' ? { userId: id.userId } : null;
}

export const NO_STORE = { 'Cache-Control': 'no-store' } as const;
export const PUBLIC_LINK = { 'Cache-Control': 'public, max-age=0, s-maxage=300', 'X-Robots-Tag': 'noindex' } as const;
