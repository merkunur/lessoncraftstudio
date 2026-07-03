import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

import { requireStudioSubscriber, getOwnedStudioStoryOrFail, ensurePreviewLink } from '@/lib/studio/story-gate';
import { studioStoryDir } from '@/lib/studio/paths';
import { importScene, StudioMediaError } from '@/lib/studio/media';
import { checkAssetQuota, addAssetBytes } from '@/lib/studio/quota';
import { STUDIO_QUOTAS, STUDIO_PLAY_API_PREFIX } from '@/lib/studio/config';

// Story Studio tenancy — per-story scene backgrounds.
// GET lists the story's own scene files; POST uploads one (raw image body,
// cover-fit to 1600×1000 webp). Replaces the local server's OS-folder reveal.

export const dynamic = 'force-dynamic';

interface Params {
  params: { id: string };
}

export async function GET(request: NextRequest, { params }: Params) {
  const gate = await requireStudioSubscriber(request);
  if (gate instanceof NextResponse) return gate;
  const storyOrError = await getOwnedStudioStoryOrFail(params.id, gate.userId);
  if (storyOrError instanceof NextResponse) return storyOrError;

  const preview = await ensurePreviewLink(params.id, gate.userId);
  const dir = path.join(studioStoryDir(params.id), 'scenes');
  const scenes = fs.existsSync(dir)
    ? fs
        .readdirSync(dir)
        .filter(f => /\.webp$/i.test(f))
        .map(f => ({ file: f, src: STUDIO_PLAY_API_PREFIX + preview.linkId + '/m/scenes/' + f }))
    : [];
  return NextResponse.json({ scenes }, { headers: { 'Cache-Control': 'no-store' } });
}

export async function POST(request: NextRequest, { params }: Params) {
  const gate = await requireStudioSubscriber(request);
  if (gate instanceof NextResponse) return gate;
  const storyOrError = await getOwnedStudioStoryOrFail(params.id, gate.userId);
  if (storyOrError instanceof NextResponse) return storyOrError;
  const row = storyOrError;

  const buf = Buffer.from(await request.arrayBuffer());
  if (!buf.length) return NextResponse.json({ error: 'Empty upload' }, { status: 400 });
  if (buf.length > STUDIO_QUOTAS.MAX_IMAGE_BYTES) {
    return NextResponse.json({ error: 'That image is too large (10 MB limit)' }, { status: 413 });
  }
  const quotaError = checkAssetQuota(row.assetBytes, buf.length);
  if (quotaError) return quotaError;

  try {
    const saved = await importScene(row.id, buf);
    await addAssetBytes(row.id, saved.bytes);
    const preview = await ensurePreviewLink(row.id, gate.userId);
    return NextResponse.json({
      ok: true,
      file: saved.file,
      src: STUDIO_PLAY_API_PREFIX + preview.linkId + '/m/' + saved.rel,
    });
  } catch (e: any) {
    if (e instanceof StudioMediaError) {
      return NextResponse.json({ error: e.message }, { status: 400 });
    }
    throw e;
  }
}
