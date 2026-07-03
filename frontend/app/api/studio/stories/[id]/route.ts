import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

import { STUDIO_QUOTAS, STUDIO_REVISIONS_KEPT } from '@/lib/studio/config';
import { toClientUrls, toCanonicalUrls, findSrcViolations } from '@/lib/studio/urls';
import { requireStudioSubscriber, getOwnedStudioStoryOrFail, ensurePreviewLink } from '@/lib/studio/story-gate';

// Story Studio tenancy — load / save / soft-delete one story.
//
// The tenant API speaks the local studio-server's etag dialect so the studio
// client's save loop needs zero changes: `etag` carries String(rev), PUT takes
// `baseEtag`, and a stale rev answers 409 {etag} exactly like the local
// server's content-hash conflict.

export const dynamic = 'force-dynamic';

interface Params {
  params: { id: string };
}

// GET /api/studio/stories/[id] — {story, strings, etag, previewLinkId}, srcs
// rewritten to the story's preview-link play URLs so the editor canvas and
// preview iframe can load binaries without Bearer headers.
export async function GET(request: NextRequest, { params }: Params) {
  const gate = await requireStudioSubscriber(request);
  if (gate instanceof NextResponse) return gate;

  const storyOrError = await getOwnedStudioStoryOrFail(params.id, gate.userId);
  if (storyOrError instanceof NextResponse) return storyOrError;
  const row = storyOrError;

  const preview = await ensurePreviewLink(row.id, gate.userId);

  return NextResponse.json(
    {
      story: toClientUrls(row.storyJson, row.id, preview.linkId),
      strings: row.stringsJson,
      etag: String(row.rev),
      previewLinkId: preview.linkId,
      locale: row.locale,
      gradeBand: row.gradeBand,
      title: row.title,
      status: row.status,
    },
    { headers: { 'Cache-Control': 'no-store' } }
  );
}

// PUT /api/studio/stories/[id] — save. Body {story, strings, baseEtag}.
// Normalizes served URLs back to canonical, enforces the src allowlist +
// size caps, bumps rev atomically, snapshots a revision, prunes old ones.
export async function PUT(request: NextRequest, { params }: Params) {
  const gate = await requireStudioSubscriber(request);
  if (gate instanceof NextResponse) return gate;

  const storyOrError = await getOwnedStudioStoryOrFail(params.id, gate.userId);
  if (storyOrError instanceof NextResponse) return storyOrError;
  const row = storyOrError;

  let body: { story?: unknown; strings?: unknown; baseEtag?: unknown };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }
  if (!body.story || !body.strings) {
    return NextResponse.json({ error: 'story + strings required' }, { status: 400 });
  }

  const baseRev = Number(body.baseEtag);
  if (!Number.isInteger(baseRev)) {
    return NextResponse.json({ error: 'baseEtag required' }, { status: 400 });
  }
  if (baseRev !== row.rev) {
    return NextResponse.json({ error: 'conflict', etag: String(row.rev) }, { status: 409 });
  }

  const story = toCanonicalUrls(body.story, row.id) as any;
  const strings = body.strings as any;

  if (story.schemaVersion !== 'sb-1' || !Array.isArray(story.pages)) {
    return NextResponse.json({ error: 'Not an sb-1 story document' }, { status: 400 });
  }
  if (JSON.stringify(story).length > STUDIO_QUOTAS.MAX_STORY_JSON_BYTES) {
    return NextResponse.json({ error: 'This story has grown too large' }, { status: 413 });
  }
  if (JSON.stringify(strings).length > STUDIO_QUOTAS.MAX_STRINGS_JSON_BYTES) {
    return NextResponse.json({ error: 'The story text has grown too large' }, { status: 413 });
  }

  const violations = findSrcViolations(story, row.id);
  if (violations.length) {
    return NextResponse.json(
      {
        error: 'The story references files it is not allowed to use',
        violations: violations.slice(0, 10),
      },
      { status: 400 }
    );
  }

  const titleKey = String(story.title || '').replace(/^@/, '');
  const titleEntry = titleKey && strings[titleKey];
  const newTitle =
    (titleEntry && typeof titleEntry === 'object' && typeof titleEntry[row.locale] === 'string' && titleEntry[row.locale].trim()) ||
    (titleEntry && typeof titleEntry === 'object' && typeof titleEntry.en === 'string' && titleEntry.en.trim()) ||
    row.title;

  const saved = await prisma.$transaction(async tx => {
    // updateMany carries the rev guard into the write itself (double-submit safe).
    const bumped = await tx.studioStory.updateMany({
      where: { id: row.id, rev: baseRev },
      data: {
        storyJson: story,
        stringsJson: strings,
        rev: baseRev + 1,
        title: newTitle.slice(0, 120),
      },
    });
    if (bumped.count !== 1) return null;
    await tx.studioStoryRevision.create({
      data: { storyId: row.id, rev: baseRev + 1, storyJson: story, stringsJson: strings },
    });
    const old = await tx.studioStoryRevision.findMany({
      where: { storyId: row.id },
      orderBy: { rev: 'desc' },
      skip: STUDIO_REVISIONS_KEPT,
      select: { id: true },
    });
    if (old.length) {
      await tx.studioStoryRevision.deleteMany({ where: { id: { in: old.map(o => o.id) } } });
    }
    return baseRev + 1;
  });

  if (saved === null) {
    const fresh = await prisma.studioStory.findUnique({ where: { id: row.id }, select: { rev: true } });
    return NextResponse.json({ error: 'conflict', etag: String(fresh?.rev ?? '') }, { status: 409 });
  }

  return NextResponse.json({ ok: true, etag: String(saved) });
}

// DELETE /api/studio/stories/[id] — soft delete + revoke every live link.
// Files stay on disk for STUDIO_DELETED_RETENTION_DAYS (cleanup script).
export async function DELETE(request: NextRequest, { params }: Params) {
  const gate = await requireStudioSubscriber(request);
  if (gate instanceof NextResponse) return gate;

  const storyOrError = await getOwnedStudioStoryOrFail(params.id, gate.userId);
  if (storyOrError instanceof NextResponse) return storyOrError;
  const row = storyOrError;

  await prisma.$transaction([
    prisma.studioStory.update({
      where: { id: row.id },
      data: { status: 'deleted', deletedAt: new Date() },
    }),
    prisma.studioShareLink.updateMany({
      where: { storyId: row.id, revokedAt: null },
      data: { revokedAt: new Date() },
    }),
  ]);

  return NextResponse.json({ ok: true });
}
