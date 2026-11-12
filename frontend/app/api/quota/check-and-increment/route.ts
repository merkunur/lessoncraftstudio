import { NextRequest, NextResponse } from 'next/server';
import {
  resolveQuotaIdentity,
  checkAndIncrementQuota,
  anonCookieSetHeader,
  QuotaKind,
  playNeedsAccount,
} from '@/lib/quota';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/**
 * POST /api/quota/check-and-increment  Body: { kind: 'download' | 'play' | 'make', surface?: 'activity' | 'tool' }
 * 200 {allowed:true, used, remaining, resetAt}
 * 401 {allowed:false, reason:'signup_required', signupPath}   (anon download / make, and an anonymous play of an
 *     activity or a classroom tool: lib/quota.ts PLAY_NEEDS_ACCOUNT)
 * 402 {allowed:false, reason:'quota_exceeded', used, remaining, resetAt, pricingPath}
 * Fail-open on internal errors (metering never takes the site down).
 *
 * A play opened through a CLASS LINK (body.classToken = the attempt token the page carries after '#') is not
 * metered while the class is live and its teacher's subscription is usable: the teacher has paid for the class's
 * plays, and thirty children on six shared tablets must not meet the per-device wall. Any other token is ignored and
 * the play is metered as usual (lib/class-results/store.ts tokenSkipsMeter).
 */
export async function POST(request: NextRequest) {
  try {
    let kind: QuotaKind = 'play';
    let classToken: unknown = null;
    let accountRequired = false;
    try {
      const body = await request.json();
      if (body?.kind === 'download') kind = 'download';
      else if (body?.kind === 'make') kind = 'make';
      classToken = body?.classToken ?? null;
      accountRequired = kind === 'play' && playNeedsAccount(body?.surface);
    } catch {
      /* default play */
    }

    // This is the busiest route on the site. The class code is loaded only for a request that carries a token while
    // the feature is switched on (CLASS_RESULTS_ENABLED=1), so an ordinary play runs exactly the code it ran before.
    if (kind === 'play' && typeof classToken === 'string' && process.env.CLASS_RESULTS_ENABLED === '1') {
      const [{ tokenSkipsMeter }, { prismaClassDb }] = await Promise.all([import('@/lib/class-results/store'), import('@/lib/class-results/db')]);
      if (await tokenSkipsMeter(prismaClassDb, classToken)) {
        return NextResponse.json({ allowed: true, remaining: 'unlimited', classPlay: true }, { status: 200, headers: { 'Cache-Control': 'no-store' } });
      }
    }

    const identity = await resolveQuotaIdentity(request);
    const result = await checkAndIncrementQuota(identity, kind, { accountRequired });

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
