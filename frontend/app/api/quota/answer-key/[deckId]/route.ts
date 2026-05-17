/**
 * GET /api/quota/answer-key/[deckId]
 *
 * Mirror of /api/quota/pdf/[deckId] but for the deck's answer-key PDF.
 * Quota-gated proxy: free users count against 2/day cap; subscribers +
 * bots bypass; on allowed 302-redirects to nginx Deck.answerKeyUrl;
 * on blocked 402.
 *
 * Same identity resolution + same quota counter as the printable PDF
 * route. A click on either link consumes one quota slot.
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
    const deck = await prisma.deck.findUnique({
      where: { id: deckId },
      select: { answerKeyUrl: true, status: true },
    });

    if (!deck || !deck.answerKeyUrl) {
      return NextResponse.json(
        { error: 'answer_key_not_found' },
        { status: 404, headers: { 'Cache-Control': 'no-store' } }
      );
    }

    if (deck.status !== 'published') {
      return NextResponse.json(
        { error: 'deck_not_published' },
        { status: 404, headers: { 'Cache-Control': 'no-store' } }
      );
    }

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

    const response = NextResponse.redirect(deck.answerKeyUrl, {
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
    console.error('quota/answer-key/[deckId] error:', err);
    return NextResponse.json(
      { error: 'internal' },
      { status: 500, headers: { 'Cache-Control': 'no-store' } }
    );
  }
}
