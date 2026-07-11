import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireActiveSubscriber } from '@/lib/subscriber-api-gate';

export const dynamic = 'force-dynamic';

/** Ownership lookup — 404 (not 403) on mismatch, per the collections convention. */
async function getOwnedShareOrFail(id: string, teacherId: string) {
  const row = await prisma.activityPlayLink.findFirst({
    where: { id, teacherId, status: 'live' },
  });
  if (!row) {
    return NextResponse.json({ error: 'not_found' }, { status: 404 });
  }
  return row;
}

/**
 * PATCH  /api/activities/share/[id] — rename. Body: { title }.
 * DELETE /api/activities/share/[id] — soft-delete (student link stops resolving).
 * Both subscriber-only.
 */
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const gate = await requireActiveSubscriber(request);
  if (gate instanceof NextResponse) return gate;

  const rowOrError = await getOwnedShareOrFail(params.id, gate.userId);
  if (rowOrError instanceof NextResponse) return rowOrError;
  const row = rowOrError;

  let body: { title?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'invalid_json' }, { status: 400 });
  }

  const title = String(body.title || '').trim().slice(0, 200);
  if (!title) return NextResponse.json({ error: 'title_required' }, { status: 400 });

  const updated = await prisma.activityPlayLink.update({
    where: { id: row.id },
    data: { title },
    select: { id: true, linkId: true, title: true, updatedAt: true },
  });
  return NextResponse.json(updated);
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const gate = await requireActiveSubscriber(request);
  if (gate instanceof NextResponse) return gate;

  const rowOrError = await getOwnedShareOrFail(params.id, gate.userId);
  if (rowOrError instanceof NextResponse) return rowOrError;
  const row = rowOrError;

  await prisma.activityPlayLink.update({
    where: { id: row.id },
    data: { status: 'deleted', deletedAt: new Date() },
  });

  return NextResponse.json({ deleted: true });
}
