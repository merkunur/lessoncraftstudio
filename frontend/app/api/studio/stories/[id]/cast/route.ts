import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

import { requireStudioSubscriber, getOwnedStudioStoryOrFail, ensurePreviewLink } from '@/lib/studio/story-gate';
import { studioStoryDir } from '@/lib/studio/paths';
import { STUDIO_PLAY_API_PREFIX } from '@/lib/studio/config';

// Story Studio tenancy — THIS story's custom characters (the tenant analog of
// the local server's cross-story /studio/cast pool, scoped to one story: the
// save-time src allowlist forbids cross-story binary references by design).
// Platform library characters come from the static storybook-library
// manifest, merged client-side (Phase B).

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
  const base = STUDIO_PLAY_API_PREFIX + preview.linkId + '/m/cast/';
  const castDir = path.join(studioStoryDir(params.id), 'cast');
  const cast: any[] = [];

  if (fs.existsSync(castDir)) {
    for (const ch of fs.readdirSync(castDir)) {
      const baseJson = path.join(castDir, ch, ch + '.base.json');
      if (!fs.existsSync(baseJson)) continue;
      let poses: string[] = [];
      try {
        const j = JSON.parse(fs.readFileSync(baseJson, 'utf8'));
        poses = Object.keys(j.frames || {})
          .filter(n => n.startsWith('pose_'))
          .map(n => n.slice(5));
      } catch {
        continue;
      }
      const clipsJson = path.join(castDir, ch, ch + '.clips.json');
      let clipNames: string[] = [];
      if (fs.existsSync(clipsJson)) {
        try {
          const cj = JSON.parse(fs.readFileSync(clipsJson, 'utf8'));
          clipNames = Object.keys(cj.animations || {})
            .filter(n => n.startsWith('clip_'))
            .map(n => n.slice(5));
        } catch {
          /* clips optional */
        }
      }
      cast.push({
        characterId: ch,
        fromStory: params.id,
        poses,
        clips: clipNames,
        atlasBase: base + ch + '/' + ch + '.base.json',
        atlasClips: clipNames.length ? base + ch + '/' + ch + '.clips.json' : null,
      });
    }
  }

  return NextResponse.json({ cast }, { headers: { 'Cache-Control': 'no-store' } });
}
