import { NextRequest, NextResponse } from 'next/server';
import {
  requireStudioAdmin,
  getOwnedStudioStoryOrFail,
  ensurePreviewLink,
} from '@/lib/studio/story-gate';
import { importCharacterClips, StudioMediaError } from '@/lib/studio/media';
import { checkAssetQuota, addAssetBytes } from '@/lib/studio/quota';
import { STUDIO_PLAY_API_PREFIX } from '@/lib/studio/config';

// Story Studio — ADMIN: animation-clips import for an existing character
// (TexturePacker pass-through; frames regrouped into clip_<name>).
// Body: { atlas, imageBase64, imageExt }.

export const dynamic = 'force-dynamic';

interface Params {
  params: { id: string; slug: string };
}

export async function POST(request: NextRequest, { params }: Params) {
  const gate = await requireStudioAdmin(request);
  if (gate instanceof NextResponse) return gate;
  const storyOrError = await getOwnedStudioStoryOrFail(params.id, gate.userId);
  if (storyOrError instanceof NextResponse) return storyOrError;
  const row = storyOrError;

  let body: any;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'The request body is not valid JSON' }, { status: 400 });
  }

  const approxBytes = Math.ceil(String(body?.imageBase64 || '').length * 0.75);
  const quotaError = checkAssetQuota(row.assetBytes, approxBytes);
  if (quotaError) return quotaError;

  try {
    const saved = await importCharacterClips(row.id, params.slug, body);
    await addAssetBytes(row.id, saved.bytes);
    const preview = await ensurePreviewLink(row.id, gate.userId);
    return NextResponse.json({
      ok: true,
      characterId: saved.characterId,
      atlasClips: STUDIO_PLAY_API_PREFIX + preview.linkId + '/m/' + saved.relClips,
      clips: saved.clips,
    });
  } catch (e: any) {
    if (e instanceof StudioMediaError) {
      return NextResponse.json({ error: e.message }, { status: 400 });
    }
    throw e;
  }
}
