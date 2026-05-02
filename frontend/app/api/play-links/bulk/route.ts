import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { prisma } from '@/lib/prisma';
import { requireSubscriber } from '@/lib/subscriber-api-gate';

// Tool 5A — POST /api/play-links/bulk: bulk PlayLink generation per HAS-Tool-5-1.
// Pairs with the single-deck companion at /api/play-links. Same app-layer
// idempotency: existing PlayLinks for (teacher, deck) are returned unchanged;
// missing rows get fresh linkIds generated.

export const dynamic = 'force-dynamic';

const BASE_URL = 'https://www.lessoncraftstudio.com';
const BULK_DECK_ID_LIMIT = 50;

function generateLinkId(): string {
  return crypto.randomBytes(8).toString('hex').slice(0, 10);
}

async function createWithUniqueLinkId(
  teacherId: string,
  deckId: string
): Promise<{ id: string; linkId: string; createdAt: Date }> {
  for (let attempt = 0; attempt < 5; attempt++) {
    const linkId = generateLinkId();
    try {
      const created = await prisma.playLink.create({
        data: { linkId, deckId, teacherId },
        select: { id: true, linkId: true, createdAt: true },
      });
      return created;
    } catch (err) {
      if ((err as { code?: string })?.code === 'P2002') continue;
      throw err;
    }
  }
  throw new Error('Failed to generate unique linkId after 5 attempts');
}

interface BulkPlayLinkResult {
  deckId: string;
  linkId: string;
  url: string;
  existing: boolean;
}

export async function POST(request: NextRequest) {
  const gate = await requireSubscriber(request);
  if (gate instanceof NextResponse) return gate;

  let body: { deckIds?: unknown };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }

  const deckIds = Array.isArray(body.deckIds)
    ? Array.from(
        new Set(
          body.deckIds.filter(
            (id): id is string => typeof id === 'string' && id.trim().length > 0
          )
        )
      )
    : [];
  if (deckIds.length === 0) {
    return NextResponse.json(
      { error: 'deckIds array is required and non-empty' },
      { status: 400 }
    );
  }
  if (deckIds.length > BULK_DECK_ID_LIMIT) {
    return NextResponse.json(
      { error: `deckIds exceeds ${BULK_DECK_ID_LIMIT}-item limit` },
      { status: 400 }
    );
  }

  // Filter to published decks; non-published deckIds land in `skipped`.
  const validDecks = await prisma.deck.findMany({
    where: { id: { in: deckIds }, status: 'published' },
    select: { id: true },
  });
  const validDeckIds = new Set(validDecks.map(d => d.id));
  const skipped = deckIds.filter(id => !validDeckIds.has(id));

  if (validDeckIds.size === 0) {
    return NextResponse.json({ playLinks: [], skipped });
  }

  // Bulk idempotency: fetch existing PlayLinks for (teacher, deckId) pairs in one
  // query, then create only the missing ones. Race-condition acceptable v1.
  const existingLinks = await prisma.playLink.findMany({
    where: {
      teacherId: gate.userId,
      deckId: { in: Array.from(validDeckIds) },
    },
    select: { deckId: true, linkId: true },
  });
  const existingByDeckId = new Map(existingLinks.map(l => [l.deckId, l.linkId]));

  const playLinks: BulkPlayLinkResult[] = [];
  for (const deckId of deckIds) {
    if (!validDeckIds.has(deckId)) continue;

    const existingLinkId = existingByDeckId.get(deckId);
    if (existingLinkId) {
      playLinks.push({
        deckId,
        linkId: existingLinkId,
        url: `${BASE_URL}/play/${existingLinkId}`,
        existing: true,
      });
      continue;
    }

    const created = await createWithUniqueLinkId(gate.userId, deckId);
    playLinks.push({
      deckId,
      linkId: created.linkId,
      url: `${BASE_URL}/play/${created.linkId}`,
      existing: false,
    });
  }

  return NextResponse.json({ playLinks, skipped });
}
