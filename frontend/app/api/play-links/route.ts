import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { prisma } from '@/lib/prisma';
import { requireSubscriber } from '@/lib/subscriber-api-gate';

// Tool 5A — POST /api/play-links: single-deck PlayLink generation per HAS-Tool-5-1.
// Tool 5A owns the entire PlayLink surface (single + bulk) — no prior single-deck
// route existed. Idempotency is APPLICATION-LAYER ONLY (return-existing-for
// (teacher, deck) lookup); no DB constraint added per Q-t adjudication. Schema
// constraint @@unique([teacherId, deckId]) is filed as doctrine-hygiene
// deferred entry; race-condition-induced duplicates are acceptable v1 behavior.

export const dynamic = 'force-dynamic';

const BASE_URL = 'https://www.lessoncraftstudio.com';

// 10-char alphanumeric per CLAUDE.md §4.4. crypto.randomBytes(8) → 16 hex chars
// → slice(0, 10) gives a 10-char [0-9a-f] string. Aligns with the linkId
// VarChar(10) column constraint at prisma/schema.prisma:1307. Mirrors the
// admin api-keys precedent at app/api/admin/profile/api-keys/route.ts:115.
function generateLinkId(): string {
  return crypto.randomBytes(8).toString('hex').slice(0, 10);
}

// Retry-on-collision loop: linkId @unique can in theory clash; the namespace
// is ~3.6 quadrillion so collisions are vanishingly rare, but the loop costs
// nothing.
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

export async function POST(request: NextRequest) {
  const gate = await requireSubscriber(request);
  if (gate instanceof NextResponse) return gate;

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

  // Idempotency check at application layer per Q-t Option B adjudication.
  // Race-condition acceptable: concurrent first-share could create two rows for
  // the same (teacher, deck). Filed as doctrine-hygiene deferred entry.
  const existing = await prisma.playLink.findFirst({
    where: { teacherId: gate.userId, deckId },
    select: { id: true, linkId: true, createdAt: true },
  });
  if (existing) {
    return NextResponse.json({
      playLink: {
        id: existing.id,
        linkId: existing.linkId,
        deckId,
        url: `${BASE_URL}/play/${existing.linkId}`,
        createdAt: existing.createdAt.toISOString(),
        existing: true,
      },
    });
  }

  const created = await createWithUniqueLinkId(gate.userId, deckId);
  return NextResponse.json(
    {
      playLink: {
        id: created.id,
        linkId: created.linkId,
        deckId,
        url: `${BASE_URL}/play/${created.linkId}`,
        createdAt: created.createdAt.toISOString(),
        existing: false,
      },
    },
    { status: 201 }
  );
}
