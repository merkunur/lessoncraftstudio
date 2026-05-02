import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireSubscriber, getOwnedCollectionOrFail } from '@/lib/subscriber-api-gate';

// Tool 5A — bulk add/remove deck membership in a collection. Mirrors Tool 1A's
// single-add route at /api/collections/[id]/decks (POST) with batch adaptations:
// single max-position lookup, batch createMany with skipDuplicates, single
// Collection.updatedAt bump. Per Q-r: in-page selection only — caller passes
// the already-selected deckIds.

export const dynamic = 'force-dynamic';

const BULK_DECK_ID_LIMIT = 50;

interface BulkBody {
  deckIds?: unknown;
}

function parseDeckIds(body: BulkBody): string[] | NextResponse {
  const raw = Array.isArray(body.deckIds)
    ? Array.from(
        new Set(
          body.deckIds.filter(
            (id): id is string => typeof id === 'string' && id.trim().length > 0
          )
        )
      )
    : [];
  if (raw.length === 0) {
    return NextResponse.json(
      { error: 'deckIds array is required and non-empty' },
      { status: 400 }
    );
  }
  if (raw.length > BULK_DECK_ID_LIMIT) {
    return NextResponse.json(
      { error: `deckIds exceeds ${BULK_DECK_ID_LIMIT}-item limit` },
      { status: 400 }
    );
  }
  return raw;
}

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const gate = await requireSubscriber(request);
  if (gate instanceof NextResponse) return gate;

  const collectionOrError = await getOwnedCollectionOrFail(params.id, gate.userId);
  if (collectionOrError instanceof NextResponse) return collectionOrError;

  let body: BulkBody;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }
  const parsed = parseDeckIds(body);
  if (parsed instanceof NextResponse) return parsed;
  const deckIds = parsed;

  // Filter to published decks. Non-published deckIds count as `skipped`.
  const validDecks = await prisma.deck.findMany({
    where: { id: { in: deckIds }, status: 'published' },
    select: { id: true },
  });
  const validDeckIds = new Set(validDecks.map(d => d.id));

  // Compute starting position once (mirrors Tool 1A: max+1 or 0).
  const lastDeck = await prisma.collectionDeck.findFirst({
    where: { collectionId: params.id },
    orderBy: { position: 'desc' },
    select: { position: true },
  });
  const startPos = lastDeck ? lastDeck.position + 1 : 0;

  // Build createMany payload preserving caller-supplied order.
  const orderedValid = deckIds.filter(id => validDeckIds.has(id));
  const data = orderedValid.map((deckId, idx) => ({
    collectionId: params.id,
    deckId,
    position: startPos + idx,
  }));

  let added = 0;
  if (data.length > 0) {
    // skipDuplicates: composite-PK (collectionId, deckId) collisions silently
    // drop — already-member decks are no-ops.
    const result = await prisma.collectionDeck.createMany({
      data,
      skipDuplicates: true,
    });
    added = result.count;

    await prisma.collection.update({
      where: { id: params.id },
      data: { updatedAt: new Date() },
    });
  }

  const skipped = deckIds.length - added;

  return NextResponse.json(
    {
      added,
      skipped,
      total: deckIds.length,
    },
    { status: 201 }
  );
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const gate = await requireSubscriber(request);
  if (gate instanceof NextResponse) return gate;

  const collectionOrError = await getOwnedCollectionOrFail(params.id, gate.userId);
  if (collectionOrError instanceof NextResponse) return collectionOrError;

  let body: BulkBody;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }
  const parsed = parseDeckIds(body);
  if (parsed instanceof NextResponse) return parsed;
  const deckIds = parsed;

  const result = await prisma.collectionDeck.deleteMany({
    where: { collectionId: params.id, deckId: { in: deckIds } },
  });

  if (result.count > 0) {
    await prisma.collection.update({
      where: { id: params.id },
      data: { updatedAt: new Date() },
    });
  }

  return NextResponse.json({ removed: result.count });
}
