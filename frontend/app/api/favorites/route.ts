import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAuthenticatedUser } from '@/lib/subscriber-api-gate';

export const dynamic = 'force-dynamic';

/**
 * Favorites — the FREE-account layer (2026-07 subscription launch §2).
 * Deliberately auth-only (requireAuthenticatedUser, NOT the tier gate):
 * favorites are the email-capture affordance; collections/workspace are paid.
 *
 * GET    /api/favorites            → the teacher's favorites (deck summaries)
 * POST   /api/favorites {deckId}   → add
 * DELETE /api/favorites {deckId}   → remove
 */
export async function GET(request: NextRequest) {
  const gate = await requireAuthenticatedUser(request);
  if (gate instanceof NextResponse) return gate;

  const rows = await prisma.deckFavorite.findMany({
    where: { teacherId: gate.userId },
    orderBy: { favoritedAt: 'desc' },
    take: 500,
    select: {
      favoritedAt: true,
      deck: {
        select: { id: true, slug: true, language: true, title: true, status: true },
      },
    },
  });

  return NextResponse.json({
    favorites: rows
      .filter((r) => r.deck && r.deck.status === 'published')
      .map((r) => ({
        deckId: r.deck.id,
        slug: r.deck.slug,
        language: r.deck.language,
        title: r.deck.title,
        favoritedAt: r.favoritedAt,
        url: `https://www.lessoncraftstudio.com/${r.deck.language}/decks/${r.deck.slug}/`,
      })),
  });
}

export async function POST(request: NextRequest) {
  const gate = await requireAuthenticatedUser(request);
  if (gate instanceof NextResponse) return gate;

  let body: { deckId?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'invalid_json' }, { status: 400 });
  }
  const deckId = String(body.deckId || '');
  if (!deckId) return NextResponse.json({ error: 'deckId_required' }, { status: 400 });

  const deck = await prisma.deck.findUnique({ where: { id: deckId }, select: { id: true } });
  if (!deck) return NextResponse.json({ error: 'deck_not_found' }, { status: 404 });

  await prisma.deckFavorite.upsert({
    where: { teacherId_deckId: { teacherId: gate.userId, deckId } },
    create: { teacherId: gate.userId, deckId },
    update: {},
  });
  return NextResponse.json({ favorited: true }, { status: 201 });
}

export async function DELETE(request: NextRequest) {
  const gate = await requireAuthenticatedUser(request);
  if (gate instanceof NextResponse) return gate;

  let body: { deckId?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'invalid_json' }, { status: 400 });
  }
  const deckId = String(body.deckId || '');
  if (!deckId) return NextResponse.json({ error: 'deckId_required' }, { status: 400 });

  await prisma.deckFavorite
    .delete({ where: { teacherId_deckId: { teacherId: gate.userId, deckId } } })
    .catch(() => {});
  return NextResponse.json({ favorited: false });
}
