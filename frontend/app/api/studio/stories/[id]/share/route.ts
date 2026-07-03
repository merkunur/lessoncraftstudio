import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import {
  requireStudioSubscriber,
  getOwnedStudioStoryOrFail,
  generateLinkId,
} from '@/lib/studio/story-gate';
import { validateTenantStory } from '@/lib/studio/validate';

// Story Studio tenancy — class share links (private-by-default; NO public
// gallery). GET = current live share link; POST = create/rotate (revokes any
// prior share link first) — GATED on the story validating clean, so sharing
// a broken story is impossible; DELETE = stop sharing. The preview link
// (kind 'preview') is untouched by all three.

export const dynamic = 'force-dynamic';

interface Params {
  params: { id: string };
}

function shareShape(linkId: string, locale: string) {
  return {
    linkId,
    path: `/${locale}/play/story/${linkId}`,
  };
}

export async function GET(request: NextRequest, { params }: Params) {
  const gate = await requireStudioSubscriber(request);
  if (gate instanceof NextResponse) return gate;
  const storyOrError = await getOwnedStudioStoryOrFail(params.id, gate.userId);
  if (storyOrError instanceof NextResponse) return storyOrError;
  const row = storyOrError;

  const link = await prisma.studioShareLink.findFirst({
    where: { storyId: row.id, kind: 'share', revokedAt: null },
  });
  return NextResponse.json(
    { share: link ? shareShape(link.linkId, row.locale) : null },
    { headers: { 'Cache-Control': 'no-store' } }
  );
}

// POST — create (or rotate) the class link. 409 {errors} when the story
// doesn't validate: the share modal shows the teacher-language fix list.
export async function POST(request: NextRequest, { params }: Params) {
  const gate = await requireStudioSubscriber(request);
  if (gate instanceof NextResponse) return gate;
  const storyOrError = await getOwnedStudioStoryOrFail(params.id, gate.userId);
  if (storyOrError instanceof NextResponse) return storyOrError;
  const row = storyOrError;

  let validation: { errors: string[]; warns: string[] };
  try {
    validation = await validateTenantStory(row.id, row.storyJson, row.stringsJson);
  } catch (e: any) {
    validation = { errors: ['validation failed: ' + (e?.message || 'unknown')], warns: [] };
  }
  if (validation.errors.length) {
    return NextResponse.json(
      { error: 'story_not_ready', errors: validation.errors.slice(0, 20) },
      { status: 409 }
    );
  }

  const link = await prisma.$transaction(async tx => {
    await tx.studioShareLink.updateMany({
      where: { storyId: row.id, kind: 'share', revokedAt: null },
      data: { revokedAt: new Date() },
    });
    const created = await tx.studioShareLink.create({
      data: { linkId: generateLinkId(), storyId: row.id, teacherId: gate.userId, kind: 'share' },
    });
    await tx.studioStory.update({ where: { id: row.id }, data: { status: 'ready' } });
    return created;
  });

  return NextResponse.json({ share: shareShape(link.linkId, row.locale) });
}

export async function DELETE(request: NextRequest, { params }: Params) {
  const gate = await requireStudioSubscriber(request);
  if (gate instanceof NextResponse) return gate;
  const storyOrError = await getOwnedStudioStoryOrFail(params.id, gate.userId);
  if (storyOrError instanceof NextResponse) return storyOrError;

  await prisma.$transaction([
    prisma.studioShareLink.updateMany({
      where: { storyId: params.id, kind: 'share', revokedAt: null },
      data: { revokedAt: new Date() },
    }),
    prisma.studioStory.update({ where: { id: params.id }, data: { status: 'draft' } }),
  ]);
  return NextResponse.json({ ok: true });
}
