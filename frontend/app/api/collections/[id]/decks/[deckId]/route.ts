import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireSubscriber, getOwnedCollectionOrFail } from '@/lib/subscriber-api-gate';

// Tool 1A — DELETE: remove a deck from a collection.
// Reorder PATCH deferred to Tool 1B per Q-g.

export const dynamic = 'force-dynamic';

// DELETE /api/collections/[id]/decks/[deckId]
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string; deckId: string } }
) {
  const gate = await requireSubscriber(request);
  if (gate instanceof NextResponse) return gate;

  const collectionOrError = await getOwnedCollectionOrFail(params.id, gate.userId);
  if (collectionOrError instanceof NextResponse) return collectionOrError;

  // Best-effort delete; if the row doesn't exist we still 200 (idempotent).
  // Don't reflow positions of remaining decks — Tool 1A treats positions as
  // append-only ordinals; gaps after delete are accepted (renormalization, if
  // ever needed, is a Tool 1B concern).
  try {
    await prisma.collectionDeck.delete({
      where: {
        collectionId_deckId: {
          collectionId: params.id,
          deckId: params.deckId,
        },
      },
    });
  } catch (err) {
    // P2025: row not found. Treat as already-removed; 200 idempotent.
    if ((err as { code?: string })?.code !== 'P2025') {
      throw err;
    }
  }

  // Bump collection.updatedAt so list-view's recency ordering reflects the change.
  await prisma.collection.update({
    where: { id: params.id },
    data: { updatedAt: new Date() },
  });

  return NextResponse.json({ success: true });
}
