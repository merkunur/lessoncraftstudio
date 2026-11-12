import { NextRequest, NextResponse } from 'next/server';
import { resolveQuotaIdentity, checkQuota, anonCookieSetHeader, FREE_ACCOUNT_NEEDS_CONFIRMED_EMAIL } from '@/lib/quota';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/** GET /api/quota/status — read-only meter state for every kind. */
export async function GET(request: NextRequest) {
  try {
    const identity = await resolveQuotaIdentity(request);
    const [play, download, make] = await Promise.all([
      checkQuota(identity, 'play'),
      checkQuota(identity, 'download'),
      checkQuota(identity, 'make'),
    ]);
    const res = NextResponse.json(
      {
        kind: identity.kind,
        // what stands between this visitor and a play or a download, for a page that asks BEFORE it sends her on
        // (the numbers below are read by the worksheet makers and stay what they were)
        needs: identity.kind === 'anon' ? 'signup' : identity.kind === 'free-user' && !identity.emailConfirmed && FREE_ACCOUNT_NEEDS_CONFIRMED_EMAIL ? 'verify' : null,
        play: { ...play, resetAt: play.resetAt.toISOString() },
        download: { ...download, resetAt: download.resetAt.toISOString() },
        make: { ...make, resetAt: make.resetAt.toISOString() },
      },
      { headers: { 'Cache-Control': 'no-store' } }
    );
    const cookie = anonCookieSetHeader(identity);
    if (cookie) res.headers.append('Set-Cookie', cookie);
    return res;
  } catch (e) {
    console.error('quota status error:', e);
    return NextResponse.json({ kind: 'unknown' }, { status: 200 });
  }
}
