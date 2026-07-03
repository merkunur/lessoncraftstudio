import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import { prisma } from '@/lib/prisma';

import { STUDIO_QUOTAS } from '@/lib/studio/config';
import { studioStoryDir } from '@/lib/studio/paths';
import { toClientUrls } from '@/lib/studio/urls';
import { requireStudioSubscriber, generateLinkId } from '@/lib/studio/story-gate';
import { blankStory, cloneTemplate, stampStoryId } from '@/lib/studio/scaffold';

// Story Studio tenancy — list + create (premium class #3).
// Collections-route precedent: requireSubscriber on both verbs.

export const dynamic = 'force-dynamic';

const TITLE_MAX = 120;
const GRADE_BANDS = new Set(['PK', 'K', '1', '2', '3']);
const LOCALES = new Set(['en', 'de', 'fr', 'it', 'es', 'pt', 'nl', 'sv', 'da', 'no', 'fi']);

// GET /api/studio/stories — the teacher's own stories (dashboard payload).
export async function GET(request: NextRequest) {
  const gate = await requireStudioSubscriber(request);
  if (gate instanceof NextResponse) return gate;

  const stories = await prisma.studioStory.findMany({
    where: { teacherId: gate.userId, status: { not: 'deleted' } },
    orderBy: { updatedAt: 'desc' },
    include: {
      shareLinks: { where: { revokedAt: null }, select: { linkId: true, kind: true } },
    },
  });

  return NextResponse.json({
    stories: stories.map(s => {
      const preview = s.shareLinks.find(l => l.kind === 'preview');
      const share = s.shareLinks.find(l => l.kind === 'share');
      const story: any = s.storyJson;
      const firstSceneAsset =
        story && story.pages && story.pages[0] && story.pages[0].scene
          ? (story.assets || {})[story.pages[0].scene.image]
          : null;
      const firstScene =
        firstSceneAsset && preview
          ? (toClientUrls({ src: firstSceneAsset.src }, s.id, preview.linkId) as any).src
          : firstSceneAsset
            ? firstSceneAsset.src
            : null;
      return {
        id: s.id,
        title: s.title,
        pages: (story && story.pages && story.pages.length) || 0,
        gradeBand: s.gradeBand,
        locale: s.locale,
        status: s.status,
        shared: !!share,
        firstScene,
        etag: String(s.rev),
        updatedAt: s.updatedAt.toISOString(),
        createdAt: s.createdAt.toISOString(),
      };
    }),
  });
}

// POST /api/studio/stories — create (blank or clone-from-template).
// Body: { title: string, gradeBand?: 'PK'|'K'|'1'|'2'|'3', locale?: string, template?: string }
export async function POST(request: NextRequest) {
  const gate = await requireStudioSubscriber(request);
  if (gate instanceof NextResponse) return gate;

  let body: { title?: unknown; gradeBand?: unknown; locale?: unknown; template?: unknown };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }

  const title = typeof body.title === 'string' ? body.title.trim() : '';
  if (!title) return NextResponse.json({ error: 'A title is required' }, { status: 400 });
  if (title.length > TITLE_MAX) {
    return NextResponse.json({ error: `Title must be ${TITLE_MAX} characters or fewer` }, { status: 400 });
  }
  const gradeBand =
    typeof body.gradeBand === 'string' && GRADE_BANDS.has(body.gradeBand) ? body.gradeBand : null;
  const locale = typeof body.locale === 'string' && LOCALES.has(body.locale) ? body.locale : 'en';
  const template = typeof body.template === 'string' ? body.template : null;

  const count = await prisma.studioStory.count({
    where: { teacherId: gate.userId, status: { not: 'deleted' } },
  });
  if (count >= STUDIO_QUOTAS.MAX_STORIES_PER_TEACHER) {
    return NextResponse.json(
      {
        error: `You have reached the ${STUDIO_QUOTAS.MAX_STORIES_PER_TEACHER}-story limit. Delete a story you no longer need first.`,
      },
      { status: 409 }
    );
  }

  const scaffold = template ? cloneTemplate(template, title, locale) : blankStory(title, locale);
  if (!scaffold) {
    return NextResponse.json({ error: 'That template is not available' }, { status: 400 });
  }

  const created = await prisma.$transaction(async tx => {
    const row = await tx.studioStory.create({
      data: {
        teacherId: gate.userId,
        title,
        gradeBand,
        locale,
        storyJson: {},
        stringsJson: scaffold.strings,
      },
    });
    stampStoryId(scaffold, row.id);
    const updated = await tx.studioStory.update({
      where: { id: row.id },
      data: { storyJson: scaffold.story },
    });
    const link = await tx.studioShareLink.create({
      data: { linkId: generateLinkId(), storyId: row.id, teacherId: gate.userId, kind: 'preview' },
    });
    return { row: updated, link };
  });

  try {
    fs.mkdirSync(studioStoryDir(created.row.id), { recursive: true });
  } catch {
    // Non-fatal: the dir is (re)created lazily by the first binary write.
  }

  return NextResponse.json(
    {
      id: created.row.id,
      title: created.row.title,
      etag: String(created.row.rev),
      previewLinkId: created.link.linkId,
    },
    { status: 201 }
  );
}
