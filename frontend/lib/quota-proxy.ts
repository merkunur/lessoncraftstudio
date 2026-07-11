/**
 * Metered PDF/answer-key proxy core (shared by the two /api/quota/* proxy
 * routes — Next route files may only export handlers, so the logic lives here).
 * Allowed (incl. subscribers/bots/metering-off) → 302 to the slug-derived
 * nginx file (§8.1: never read the stored URL columns for live serving).
 * Anonymous → 302 to signup; over quota → 302 to pricing. Bots ALWAYS pass
 * (crawlers never see a wall — the flexible-sampling requirement).
 */
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import {
  resolveQuotaIdentity,
  checkAndIncrementQuota,
  anonCookieSetHeader,
} from '@/lib/quota';
import { canonicalDeckAssets } from '@/lib/seo/landing-content';

export async function servePdfProxy(
  request: NextRequest,
  deckId: string,
  which: 'pdf' | 'answerKey'
): Promise<NextResponse> {
  try {
    const deck = await prisma.deck.findUnique({
      where: { id: deckId },
      select: { slug: true, language: true, status: true, answerKeyUrl: true },
    });
    if (!deck || deck.status !== 'published') {
      return new NextResponse('Not found', { status: 404 });
    }
    const assets = canonicalDeckAssets(deck);
    const target = which === 'pdf' ? assets.pdfUrl : assets.answerKeyUrl;
    if (!target) {
      return new NextResponse('Not found', { status: 404 });
    }

    const identity = await resolveQuotaIdentity(request);
    const result = await checkAndIncrementQuota(identity, 'download');

    const locale = deck.language || 'en';
    let res: NextResponse;
    if (result.allowed) {
      res = NextResponse.redirect(target, { status: 302 });
      res.headers.set('Cache-Control', 'no-store');
    } else if (result.reason === 'signup_required') {
      res = NextResponse.redirect(
        `https://www.lessoncraftstudio.com/${locale}/auth/signup?from=download`,
        { status: 302 }
      );
    } else {
      res = NextResponse.redirect(
        `https://www.lessoncraftstudio.com/${locale}/pricing?from=download-limit`,
        { status: 302 }
      );
    }
    const cookie = anonCookieSetHeader(identity);
    if (cookie) res.headers.append('Set-Cookie', cookie);
    return res;
  } catch (e) {
    console.error('quota pdf proxy error:', e);
    // Fail-open toward the homepage rather than a broken download state.
    return NextResponse.redirect('https://www.lessoncraftstudio.com/', { status: 302 });
  }
}
