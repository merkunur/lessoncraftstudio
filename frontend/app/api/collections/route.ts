import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireSubscriber } from '@/lib/subscriber-api-gate';

// Tool 1A — Collections list + create.
// Both endpoints gated on active LCS subscription per Pillar 3 docs/SUBSCRIPTION-SCOPE.md.

export const dynamic = 'force-dynamic';

const NAME_MAX = 100;
const DESCRIPTION_MAX = 500;

// GET /api/collections — list current user's collections, with deck counts.
// Detail-view payload for a single collection lives at GET /api/collections/[id].
export async function GET(request: NextRequest) {
  const gate = await requireSubscriber(request);
  if (gate instanceof NextResponse) return gate;

  const collections = await prisma.collection.findMany({
    where: { teacherId: gate.userId },
    include: {
      _count: {
        select: { decks: true },
      },
    },
    orderBy: { updatedAt: 'desc' },
  });

  return NextResponse.json({
    collections: collections.map(c => ({
      id: c.id,
      name: c.name,
      description: c.description,
      deckCount: c._count.decks,
      createdAt: c.createdAt.toISOString(),
      updatedAt: c.updatedAt.toISOString(),
    })),
  });
}

// POST /api/collections — create a new collection.
// Body: { name: string, description?: string }
export async function POST(request: NextRequest) {
  const gate = await requireSubscriber(request);
  if (gate instanceof NextResponse) return gate;

  let body: { name?: unknown; description?: unknown };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }

  const name = typeof body.name === 'string' ? body.name.trim() : '';
  const description =
    typeof body.description === 'string' ? body.description.trim() : null;

  if (!name) {
    return NextResponse.json({ error: 'Name is required' }, { status: 400 });
  }
  if (name.length > NAME_MAX) {
    return NextResponse.json(
      { error: `Name must be ${NAME_MAX} characters or fewer` },
      { status: 400 }
    );
  }
  if (description && description.length > DESCRIPTION_MAX) {
    return NextResponse.json(
      { error: `Description must be ${DESCRIPTION_MAX} characters or fewer` },
      { status: 400 }
    );
  }

  const collection = await prisma.collection.create({
    data: {
      teacherId: gate.userId,
      name,
      description: description || null,
    },
  });

  return NextResponse.json(
    {
      collection: {
        id: collection.id,
        name: collection.name,
        description: collection.description,
        deckCount: 0,
        createdAt: collection.createdAt.toISOString(),
        updatedAt: collection.updatedAt.toISOString(),
      },
    },
    { status: 201 }
  );
}
