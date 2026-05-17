/**
 * GET /api/quota/status
 *
 * Returns the requester's current quota state without incrementing.
 * Useful for client components that display "X downloads remaining today"
 * before the user clicks an action.
 *
 * Same identity resolution as check-and-increment. Sets lcs_anon_id cookie
 * if anon-identity was generated fresh.
 *
 * Cache: no-store.
 */
import { NextRequest, NextResponse } from 'next/server';
import {
  resolveQuotaIdentity,
  checkQuota,
  anonCookieSetHeader,
  DAILY_QUOTA_CAP,
} from '@/lib/quota';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function GET(request: NextRequest) {
  try {
    const identity = await resolveQuotaIdentity(request);
    const result = await checkQuota(identity);

    const response = NextResponse.json(
      {
        kind: identity.kind,
        allowed: result.allowed,
        used: result.used,
        remaining: result.remaining,
        resetAt: result.resetAt.toISOString(),
        cap: DAILY_QUOTA_CAP,
      },
      {
        status: 200,
        headers: {
          'Cache-Control': 'no-store, no-cache, must-revalidate',
          Pragma: 'no-cache',
        },
      }
    );

    const cookieHeader = anonCookieSetHeader(identity);
    if (cookieHeader) {
      response.headers.append('Set-Cookie', cookieHeader);
    }

    return response;
  } catch (err) {
    console.error('quota/status error:', err);
    return NextResponse.json(
      {
        kind: 'unknown',
        allowed: true,
        used: 0,
        remaining: 'unlimited',
        cap: DAILY_QUOTA_CAP,
        warning: 'quota_status_failed_fail_open',
      },
      { status: 200, headers: { 'Cache-Control': 'no-store' } }
    );
  }
}
