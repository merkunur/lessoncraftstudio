import { NextRequest, NextResponse } from 'next/server';
import { resolveQuotaIdentity, checkQuota, anonCookieSetHeader } from '@/lib/quota';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/** GET /api/quota/status — read-only meter state for both kinds. */
export async function GET(request: NextRequest) {
  try {
    const identity = await resolveQuotaIdentity(request);
    const [play, download] = await Promise.all([
      checkQuota(identity, 'play'),
      checkQuota(identity, 'download'),
    ]);
    const res = NextResponse.json(
      {
        kind: identity.kind,
        play: { ...play, resetAt: play.resetAt.toISOString() },
        download: { ...download, resetAt: download.resetAt.toISOString() },
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
