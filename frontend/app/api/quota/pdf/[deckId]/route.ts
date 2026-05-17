/**
 * GET /api/quota/pdf/[deckId]
 *
 * Quota-gated PDF download proxy. Free users: counts against daily cap;
 * subscribers + bots: bypass. On allowed, 302-redirects to the actual
 * nginx-served PDF URL stored on Deck.pdfUrl. On blocked, returns 402 JSON.
 *
 * Why a proxy: the PDF asset is served by nginx directly (per CLAUDE.md
 * §15.7); we can't gate the static asset itself. This proxy is the only
 * point at which we can attribute a download intention to a teacher and
 * decrement their daily quota.
 *
 * Note: this counts each click, not each PDF byte transferred. If a teacher
 * clicks the same PDF link twice in 5 seconds (double-click, etc.), that's
 * 2 quota uses. Acceptable for v1.
 */
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import {
  resolveQuotaIdentity,
  checkAndIncrementQuota,
  anonCookieSetHeader,
  DAILY_QUOTA_CAP,
} from '@/lib/quota';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function GET(
  request: NextRequest,
  { params }: { params: { deckId: string } }
) {
  const deckId = params.deckId;
  if (!deckId) {
    return NextResponse.json(
      { error: 'missing_deck_id' },
      { status: 400, headers: { 'Cache-Control': 'no-store' } }
    );
  }

  try {
    // Fetch deck to get pdfUrl
    const deck = await prisma.deck.findUnique({
      where: { id: deckId },
      select: { pdfUrl: true, status: true },
    });

    if (!deck || !deck.pdfUrl) {
      return NextResponse.json(
        { error: 'deck_not_found' },
        { status: 404, headers: { 'Cache-Control': 'no-store' } }
      );
    }

    if (deck.status !== 'published') {
      return NextResponse.json(
        { error: 'deck_not_published' },
        { status: 404, headers: { 'Cache-Control': 'no-store' } }
      );
    }

    // Resolve identity + quota check
    const identity = await resolveQuotaIdentity(request);
    const result = await checkAndIncrementQuota(identity);

    if (!result.allowed) {
      const response = NextResponse.json(
        {
          allowed: false,
          used: result.used,
          remaining: result.remaining,
          resetAt: result.resetAt.toISOString(),
          cap: DAILY_QUOTA_CAP,
          error: 'quota_exceeded',
          subscribeUrl: '/en#subscription',
        },
        {
          status: 402,
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
    }

    // Allowed — 302 redirect to actual nginx PDF
    const response = NextResponse.redirect(deck.pdfUrl, {
      status: 302,
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate',
      },
    });

    const cookieHeader = anonCookieSetHeader(identity);
    if (cookieHeader) {
      response.headers.append('Set-Cookie', cookieHeader);
    }

    return response;
  } catch (err) {
    console.error('quota/pdf/[deckId] error:', err);
    return NextResponse.json(
      { error: 'internal' },
      { status: 500, headers: { 'Cache-Control': 'no-store' } }
    );
  }
}
