import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireSubscriber } from '@/lib/subscriber-api-gate';

// Tool 2A — Workspace home single-endpoint payload.
// Returns { collections, totalCollections, recentActivity } in one round-trip.
//
// Recent-activity feed pulls from THREE sources per Q-k Option I:
//   - CollectionDeck.addedAt (type "collected")
//   - Collection.updatedAt (type "modified")
//   - PlayLink.createdAt (type "shared" — link generation, NOT student-play
//     events; per HAS-Tool-2-2 the framing avoids implying student-play data)
//
// DeckFavorite source deferred to Tool 2B per Q-j Option II.

export const dynamic = 'force-dynamic';

const COLLECTIONS_DISPLAY_LIMIT = 5;
const RECENT_LIMIT = 10;
const SOURCE_LIMIT = 10;

export async function GET(request: NextRequest) {
  const gate = await requireSubscriber(request);
  if (gate instanceof NextResponse) return gate;
  const { userId } = gate;

  // Top-N collections by recency + total count for "View all (N)" link.
  const [collections, totalCollections, collectedRows, modifiedRows, sharedRows] =
    await Promise.all([
      prisma.collection.findMany({
        where: { teacherId: userId },
        include: { _count: { select: { decks: true } } },
        orderBy: { updatedAt: 'desc' },
        take: COLLECTIONS_DISPLAY_LIMIT,
      }),
      prisma.collection.count({ where: { teacherId: userId } }),
      prisma.collectionDeck.findMany({
        where: { collection: { teacherId: userId } },
        include: {
          deck: { select: { title: true, language: true, slug: true } },
          collection: { select: { id: true, name: true } },
        },
        orderBy: { addedAt: 'desc' },
        take: SOURCE_LIMIT,
      }),
      prisma.collection.findMany({
        where: { teacherId: userId },
        select: { id: true, name: true, updatedAt: true },
        orderBy: { updatedAt: 'desc' },
        take: SOURCE_LIMIT,
      }),
      prisma.playLink.findMany({
        where: { teacherId: userId },
        include: {
          deck: { select: { title: true, language: true, slug: true } },
        },
        orderBy: { createdAt: 'desc' },
        take: SOURCE_LIMIT,
      }),
    ]);

  type Activity =
    | {
        type: 'collected';
        when: Date;
        deckTitle: unknown;
        deckLanguage: string;
        deckSlug: string;
        collectionId: string;
        collectionName: string;
      }
    | {
        type: 'modified';
        when: Date;
        collectionId: string;
        collectionName: string;
      }
    | {
        type: 'shared';
        when: Date;
        deckTitle: unknown;
        deckLanguage: string;
        deckSlug: string;
      };

  const activities: Activity[] = [
    ...collectedRows.map(
      (r): Activity => ({
        type: 'collected',
        when: r.addedAt,
        deckTitle: r.deck.title,
        deckLanguage: r.deck.language,
        deckSlug: r.deck.slug,
        collectionId: r.collection.id,
        collectionName: r.collection.name,
      })
    ),
    ...modifiedRows.map(
      (r): Activity => ({
        type: 'modified',
        when: r.updatedAt,
        collectionId: r.id,
        collectionName: r.name,
      })
    ),
    ...sharedRows.map(
      (r): Activity => ({
        type: 'shared',
        when: r.createdAt,
        deckTitle: r.deck.title,
        deckLanguage: r.deck.language,
        deckSlug: r.deck.slug,
      })
    ),
  ]
    .sort((a, b) => b.when.getTime() - a.when.getTime())
    .slice(0, RECENT_LIMIT);

  return NextResponse.json({
    collections: collections.map(c => ({
      id: c.id,
      name: c.name,
      description: c.description,
      deckCount: c._count.decks,
      createdAt: c.createdAt.toISOString(),
      updatedAt: c.updatedAt.toISOString(),
    })),
    totalCollections,
    recentActivity: activities.map(a => ({
      ...a,
      when: a.when.toISOString(),
    })),
  });
}
