import { NextRequest, NextResponse } from 'next/server';

import { requireStudioSubscriber, getOwnedStudioStoryOrFail, ensurePreviewLink } from '@/lib/studio/story-gate';
import { importSingleImageCharacter, StudioMediaError } from '@/lib/studio/media';
import { checkAssetQuota, addAssetBytes } from '@/lib/studio/quota';
import { STUDIO_QUOTAS, STUDIO_PLAY_API_PREFIX } from '@/lib/studio/config';

// Story Studio tenancy — single-image custom character upload (the ruled
// "simple uploads": one picture → a one-frame pose_neutral atlas).
// Spritesheet/clips uploads stay operator-only on the local server.

export const dynamic = 'force-dynamic';

interface Params {
  params: { id: string };
}

export async function POST(request: NextRequest, { params }: Params) {
  const gate = await requireStudioSubscriber(request);
  if (gate instanceof NextResponse) return gate;
  const storyOrError = await getOwnedStudioStoryOrFail(params.id, gate.userId);
  if (storyOrError instanceof NextResponse) return storyOrError;
  const row = storyOrError;

  const name = new URL(request.url).searchParams.get('name') || '';
  const buf = Buffer.from(await request.arrayBuffer());
  if (!buf.length) return NextResponse.json({ error: 'Empty upload' }, { status: 400 });
  if (buf.length > STUDIO_QUOTAS.MAX_IMAGE_BYTES) {
    return NextResponse.json({ error: 'That image is too large (10 MB limit)' }, { status: 413 });
  }
  const quotaError = checkAssetQuota(row.assetBytes, buf.length);
  if (quotaError) return quotaError;

  try {
    const saved = await importSingleImageCharacter(row.id, buf, name);
    await addAssetBytes(row.id, saved.bytes);
    const preview = await ensurePreviewLink(row.id, gate.userId);
    return NextResponse.json({
      ok: true,
      characterId: saved.characterId,
      atlasBase: STUDIO_PLAY_API_PREFIX + preview.linkId + '/m/' + saved.relAtlas,
      poses: saved.poses,
    });
  } catch (e: any) {
    if (e instanceof StudioMediaError) {
      return NextResponse.json({ error: e.message }, { status: 400 });
    }
    throw e;
  }
}
