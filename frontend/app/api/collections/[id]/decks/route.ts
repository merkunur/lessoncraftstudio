import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireSubscriber, getOwnedCollectionOrFail } from '@/lib/subscriber-api-gate';

// Tool 1A — POST: add deck to collection. Position auto-assigned (max+1).
// Reorder PATCH /api/collections/[id]/decks/[deckId] deferred to Tool 1B per Q-g.

export const dynamic = 'force-dynamic';

// POST /api/collections/[id]/decks — add a deck to this collection.
// Body: { deckId: string }
// Position = max(existing positions for this collection) + 1, or 0 if first.
// Composite-PK uniqueness on (collectionId, deckId) prevents duplicate adds —
// returns 409 on conflict.
export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const gate = await requireSubscriber(request);
  if (gate instanceof NextResponse) return gate;

  const collectionOrError = await getOwnedCollectionOrFail(params.id, gate.userId);
  if (collectionOrError instanceof NextResponse) return collectionOrError;

  let body: { deckId?: unknown };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }

  const deckId = typeof body.deckId === 'string' ? body.deckId.trim() : '';
  if (!deckId) {
    return NextResponse.json({ error: 'deckId is required' }, { status: 400 });
  }

  // Verify the deck exists + is published before allowing add (avoid stale FKs).
  const deck = await prisma.deck.findUnique({
    where: { id: deckId },
    select: { id: true, status: true },
  });
  if (!deck) {
    return NextResponse.json({ error: 'Deck not found' }, { status: 404 });
  }
  if (deck.status !== 'published') {
    return NextResponse.json({ error: 'Deck is not published' }, { status: 400 });
  }

  // Position = max + 1 within the collection; 0 if empty.
  const lastDeck = await prisma.collectionDeck.findFirst({
    where: { collectionId: params.id },
    orderBy: { position: 'desc' },
    select: { position: true },
  });
  const nextPosition = lastDeck ? lastDeck.position + 1 : 0;

  try {
    const cd = await prisma.collectionDeck.create({
      data: {
        collectionId: params.id,
        deckId,
        position: nextPosition,
      },
    });

    // Bump collection.updatedAt so list-view's recency ordering reflects the add.
    await prisma.collection.update({
      where: { id: params.id },
      data: { updatedAt: new Date() },
    });

    return NextResponse.json(
      {
        collectionDeck: {
          collectionId: cd.collectionId,
          deckId: cd.deckId,
          position: cd.position,
          addedAt: cd.addedAt.toISOString(),
        },
      },
      { status: 201 }
    );
  } catch (err) {
    // P2002: composite-PK uniqueness violation = duplicate add.
    if ((err as { code?: string })?.code === 'P2002') {
      return NextResponse.json(
        { error: 'Deck is already in this collection' },
        { status: 409 }
      );
    }
    throw err;
  }
}
