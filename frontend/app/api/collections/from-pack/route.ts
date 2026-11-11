import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireActiveSubscriber } from '@/lib/subscriber-api-gate';
import { getUnit } from '@/lib/units';
import { getSubPack } from '@/lib/sub-plans';

// "Save this unit to my workspace" (Daily Teaching System, Part 3): the worksheets of a unit or a sub pack become ONE
// collection of the teacher's, in the order of the lessons. It uses the existing collections model as it is (a
// collection of published pages with a position): no new table.
//
// POST /api/collections/from-pack   body: { kind: 'unit' | 'sub-plan', locale: string, slug: string }
// The pack is read on the server from the committed content, never from the request: the body only names it.
// Saving the same pack twice adds nothing twice (the collection is found by its name; pages already in it are skipped).

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  const gate = await requireActiveSubscriber(request);
  if (gate instanceof NextResponse) return gate;

  let body: { kind?: unknown; locale?: unknown; slug?: unknown };
  try { body = await request.json(); } catch { return NextResponse.json({ error: 'Invalid request body' }, { status: 400 }); }
  const kind = body.kind === 'unit' || body.kind === 'sub-plan' ? body.kind : null;
  const locale = typeof body.locale === 'string' && /^[a-z]{2}$/.test(body.locale) ? body.locale : null;
  const slug = typeof body.slug === 'string' && /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(body.slug) ? body.slug : null;
  if (!kind || !locale || !slug) return NextResponse.json({ error: 'kind, locale and slug are required' }, { status: 400 });

  let name: string, slugs: string[];
  if (kind === 'unit') {
    const unit = await getUnit(locale, slug);
    if (!unit) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    name = unit.title;
    slugs = unit.lessons.flatMap((l) => [...l.paper.flatMap((p) => [p.core, p.easy, p.hard]), l.exit?.slug]).filter((s): s is string => !!s);
  } else {
    const pack = await getSubPack(locale, slug);
    if (!pack) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    name = pack.title;
    slugs = pack.blocks.flatMap((b) => [b.core, b.easy, b.hard]).filter((s): s is string => !!s);
  }
  slugs = [...new Set(slugs)];
  name = name.slice(0, 100);

  const decks = await prisma.deck.findMany({ where: { language: locale, slug: { in: slugs }, status: 'published' }, select: { id: true, slug: true } });
  const idOf = new Map(decks.map((d) => [d.slug, d.id]));
  const ordered = slugs.map((s) => idOf.get(s)).filter((id): id is string => !!id);
  if (!ordered.length) return NextResponse.json({ error: 'No page of this pack is published' }, { status: 404 });

  const existing = await prisma.collection.findFirst({ where: { teacherId: gate.userId, name }, select: { id: true } });
  const collection = existing ?? (await prisma.collection.create({ data: { teacherId: gate.userId, name }, select: { id: true } }));
  const last = await prisma.collectionDeck.findFirst({ where: { collectionId: collection.id }, orderBy: { position: 'desc' }, select: { position: true } });
  const start = last ? last.position + 1 : 0;
  const result = await prisma.collectionDeck.createMany({
    data: ordered.map((deckId, i) => ({ collectionId: collection.id, deckId, position: start + i })),
    skipDuplicates: true,
  });
  await prisma.collection.update({ where: { id: collection.id }, data: { updatedAt: new Date() } });
  return NextResponse.json({ id: collection.id, name, added: result.count, total: ordered.length, created: !existing });
}
