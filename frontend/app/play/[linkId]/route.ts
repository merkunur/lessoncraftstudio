import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

/**
 * GET /play/[linkId] — resolve a teacher's deck share link (PlayLink model).
 *
 * These URLs have been minted by /api/play-links since the workspace shipped,
 * but no resolution route ever existed (the middleware swallowed /play into
 * the locale tree → 404). This 302s to the deck's canonical nginx-served page.
 * Deck content is free (§4.4: links never break for students); the link is
 * pure convenience/identity, so resolution is public and never lapses.
 * noindex: the canonical deck page is the indexable surface, not the alias.
 */
export async function GET(
  _request: NextRequest,
  { params }: { params: { linkId: string } }
) {
  const linkId = params.linkId;
  if (!/^[a-z0-9]{6,20}$/i.test(linkId)) {
    return new NextResponse('Not found', { status: 404, headers: { 'X-Robots-Tag': 'noindex' } });
  }

  const link = await prisma.playLink.findUnique({
    where: { linkId },
    select: { deck: { select: { language: true, slug: true, status: true } } },
  });

  if (!link || !link.deck || link.deck.status !== 'published') {
    return new NextResponse('Not found', { status: 404, headers: { 'X-Robots-Tag': 'noindex' } });
  }

  return NextResponse.redirect(
    `https://www.lessoncraftstudio.com/${link.deck.language}/decks/${link.deck.slug}/`,
    { status: 302, headers: { 'X-Robots-Tag': 'noindex', 'Cache-Control': 'private, max-age=300' } }
  );
}
