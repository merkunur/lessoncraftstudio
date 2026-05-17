/**
 * POST /api/quota/check-and-increment
 *
 * Body: { action?: 'play' | 'pdf' | 'app-gen' }  (informational; same cap applies)
 *
 * Atomically check-and-increment the requester's daily quota.
 * Subscribers + bots: bypass, always returns allowed:true.
 *
 * Response:
 *   200 + { allowed: true,  used, remaining, resetAt } — proceed with action
 *   402 + { allowed: false, used, remaining, resetAt, subscribeUrl } — blocked
 *
 * Cookie side-effect: sets lcs_anon_id cookie if anon-identity was generated
 * fresh this request.
 *
 * Cache: no-store. Quota state must never be cached.
 */
import { NextRequest, NextResponse } from 'next/server';
import {
  resolveQuotaIdentity,
  checkAndIncrementQuota,
  anonCookieSetHeader,
  DAILY_QUOTA_CAP,
} from '@/lib/quota';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
  try {
    const identity = await resolveQuotaIdentity(request);
    const result = await checkAndIncrementQuota(identity);

    const body = {
      allowed: result.allowed,
      used: result.used,
      remaining: result.remaining,
      resetAt: result.resetAt.toISOString(),
      cap: DAILY_QUOTA_CAP,
      ...(result.allowed
        ? {}
        : { subscribeUrl: '/en#subscription', error: 'quota_exceeded' }),
    };

    const status = result.allowed ? 200 : 402;
    const response = NextResponse.json(body, {
      status,
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate',
        Pragma: 'no-cache',
      },
    });

    const cookieHeader = anonCookieSetHeader(identity);
    if (cookieHeader) {
      response.headers.append('Set-Cookie', cookieHeader);
    }

    return response;
  } catch (err) {
    console.error('quota/check-and-increment error:', err);
    // Fail-open on internal error to avoid breaking user flows when quota
    // infrastructure has issues. Surface as 200 + allowed:true; teacher can
    // proceed; ops should monitor 500 rate.
    return NextResponse.json(
      {
        allowed: true,
        used: 0,
        remaining: 'unlimited',
        resetAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
        cap: DAILY_QUOTA_CAP,
        warning: 'quota_check_failed_fail_open',
      },
      {
        status: 200,
        headers: { 'Cache-Control': 'no-store' },
      }
    );
  }
}
