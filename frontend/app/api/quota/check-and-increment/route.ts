import { NextRequest, NextResponse } from 'next/server';
import {
  resolveQuotaIdentity,
  checkAndIncrementQuota,
  anonCookieSetHeader,
  QuotaKind,
} from '@/lib/quota';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/**
 * POST /api/quota/check-and-increment  Body: { kind: 'download' | 'play' }
 * 200 {allowed:true, used, remaining, resetAt}
 * 401 {allowed:false, reason:'signup_required', signupPath}   (anon download)
 * 402 {allowed:false, reason:'quota_exceeded', used, remaining, resetAt, pricingPath}
 * Fail-open on internal errors (metering never takes the site down).
 */
export async function POST(request: NextRequest) {
  try {
    let kind: QuotaKind = 'play';
    try {
      const body = await request.json();
      if (body?.kind === 'download') kind = 'download';
    } catch {
      /* default play */
    }

    const identity = await resolveQuotaIdentity(request);
    const result = await checkAndIncrementQuota(identity, kind);

    const status = result.allowed ? 200 : result.reason === 'signup_required' ? 401 : 402;
    const res = NextResponse.json(
      {
        allowed: result.allowed,
        reason: result.reason,
        used: result.used,
        remaining: result.remaining,
        resetAt: result.resetAt.toISOString(),
        signupPath: '/auth/signup',
        pricingPath: '/pricing',
      },
      { status, headers: { 'Cache-Control': 'no-store' } }
    );
    const cookie = anonCookieSetHeader(identity);
    if (cookie) res.headers.append('Set-Cookie', cookie);
    return res;
  } catch (e) {
    console.error('quota check-and-increment error:', e);
    return NextResponse.json(
      { allowed: true, remaining: 'unlimited' },
      { status: 200, headers: { 'Cache-Control': 'no-store' } }
    );
  }
}
