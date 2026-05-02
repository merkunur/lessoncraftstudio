import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireSubscriber, getOwnedCollectionOrFail } from '@/lib/subscriber-api-gate';

// Tool 1A — Collection detail / update / delete.
// All three endpoints gated on subscription + ownership per recon.

export const dynamic = 'force-dynamic';

const NAME_MAX = 100;
const DESCRIPTION_MAX = 500;

// GET /api/collections/[id] — single collection with its decks (ordered by position).
// Detail-page consumer. Returns deck cards needed for /[locale]/collections/[id]/.
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const gate = await requireSubscriber(request);
  if (gate instanceof NextResponse) return gate;

  const collectionOrError = await getOwnedCollectionOrFail(params.id, gate.userId);
  if (collectionOrError instanceof NextResponse) return collectionOrError;

  const collectionDecks = await prisma.collectionDeck.findMany({
    where: { collectionId: params.id },
    include: {
      deck: {
        select: {
          id: true,
          slug: true,
          language: true,
          title: true,
          exerciseType: true,
          ageRange: true,
          thumbnailUrl: true,
          pdfUrl: true,
          status: true,
        },
      },
    },
    orderBy: { position: 'asc' },
  });

  return NextResponse.json({
    collection: {
      id: collectionOrError.id,
      name: collectionOrError.name,
      description: collectionOrError.description,
      createdAt: collectionOrError.createdAt.toISOString(),
      updatedAt: collectionOrError.updatedAt.toISOString(),
      decks: collectionDecks.map(cd => ({
        deckId: cd.deck.id,
        slug: cd.deck.slug,
        language: cd.deck.language,
        title: cd.deck.title,
        exerciseType: cd.deck.exerciseType,
        ageRange: cd.deck.ageRange,
        thumbnailUrl: cd.deck.thumbnailUrl,
        pdfUrl: cd.deck.pdfUrl,
        position: cd.position,
        addedAt: cd.addedAt.toISOString(),
      })),
    },
  });
}

// PATCH /api/collections/[id] — rename / update description.
// Body: { name?: string, description?: string|null }
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const gate = await requireSubscriber(request);
  if (gate instanceof NextResponse) return gate;

  const collectionOrError = await getOwnedCollectionOrFail(params.id, gate.userId);
  if (collectionOrError instanceof NextResponse) return collectionOrError;

  let body: { name?: unknown; description?: unknown };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }

  const updateData: { name?: string; description?: string | null } = {};

  if (typeof body.name === 'string') {
    const trimmed = body.name.trim();
    if (!trimmed) {
      return NextResponse.json({ error: 'Name cannot be empty' }, { status: 400 });
    }
    if (trimmed.length > NAME_MAX) {
      return NextResponse.json(
        { error: `Name must be ${NAME_MAX} characters or fewer` },
        { status: 400 }
      );
    }
    updateData.name = trimmed;
  }

  if (body.description === null) {
    updateData.description = null;
  } else if (typeof body.description === 'string') {
    const trimmed = body.description.trim();
    if (trimmed.length > DESCRIPTION_MAX) {
      return NextResponse.json(
        { error: `Description must be ${DESCRIPTION_MAX} characters or fewer` },
        { status: 400 }
      );
    }
    updateData.description = trimmed || null;
  }

  if (Object.keys(updateData).length === 0) {
    return NextResponse.json({ error: 'No valid fields to update' }, { status: 400 });
  }

  const updated = await prisma.collection.update({
    where: { id: params.id },
    data: updateData,
  });

  return NextResponse.json({
    collection: {
      id: updated.id,
      name: updated.name,
      description: updated.description,
      createdAt: updated.createdAt.toISOString(),
      updatedAt: updated.updatedAt.toISOString(),
    },
  });
}

// DELETE /api/collections/[id] — delete collection. CollectionDeck rows cascade
// via schema-level onDelete: Cascade (commit 9ba9fa2d).
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const gate = await requireSubscriber(request);
  if (gate instanceof NextResponse) return gate;

  const collectionOrError = await getOwnedCollectionOrFail(params.id, gate.userId);
  if (collectionOrError instanceof NextResponse) return collectionOrError;

  await prisma.collection.delete({ where: { id: params.id } });

  return NextResponse.json({ success: true });
}
