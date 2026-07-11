import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import {
  resolveQuotaIdentity,
  checkAndIncrementQuota,
  anonCookieSetHeader,
} from '@/lib/quota';
import { canonicalDeckAssets } from '@/lib/seo/landing-content';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/**
 * GET /api/quota/dl?loc=<locale>&slug=<deckSlug>&kind=pdf|answer
 * Slug-keyed metered download proxy for the STATIC landing pages (which know a
 * deck by (locale, canonicalDeckSlug), not its DB id). Same semantics as the
 * /api/quota/pdf/[deckId] proxy: allowed → 302 to the slug-derived nginx file;
 * anon → signup; over-quota → pricing; bots/subscribers/metering-off → pass.
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const loc = (searchParams.get('loc') || '').slice(0, 5);
    const slug = searchParams.get('slug') || '';
    const kind = searchParams.get('kind') === 'answer' ? 'answerKey' : 'pdf';
    if (!loc || !slug) return new NextResponse('Bad request', { status: 400 });

    const deck = await prisma.deck.findFirst({
      where: { language: loc, slug, status: 'published' },
      select: { slug: true, language: true, answerKeyUrl: true },
    });
    if (!deck) return new NextResponse('Not found', { status: 404 });

    const assets = canonicalDeckAssets(deck);
    const target = kind === 'pdf' ? assets.pdfUrl : assets.answerKeyUrl;
    if (!target) return new NextResponse('Not found', { status: 404 });

    const identity = await resolveQuotaIdentity(request);
    const result = await checkAndIncrementQuota(identity, 'download');

    let res: NextResponse;
    if (result.allowed) {
      res = NextResponse.redirect(target, { status: 302 });
      res.headers.set('Cache-Control', 'no-store');
    } else if (result.reason === 'signup_required') {
      res = NextResponse.redirect(
        `https://www.lessoncraftstudio.com/${loc}/auth/signup?from=download`,
        { status: 302 }
      );
    } else {
      res = NextResponse.redirect(
        `https://www.lessoncraftstudio.com/${loc}/pricing?from=download-limit`,
        { status: 302 }
      );
    }
    const cookie = anonCookieSetHeader(identity);
    if (cookie) res.headers.append('Set-Cookie', cookie);
    return res;
  } catch (e) {
    console.error('quota dl proxy error:', e);
    return NextResponse.redirect('https://www.lessoncraftstudio.com/', { status: 302 });
  }
}
