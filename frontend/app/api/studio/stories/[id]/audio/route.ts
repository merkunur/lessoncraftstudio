import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

import { requireStudioSubscriber, getOwnedStudioStoryOrFail } from '@/lib/studio/story-gate';
import { studioStoryDir } from '@/lib/studio/paths';

// Story Studio tenancy — narration mp3 inventory ({ "<locale>/<lineId>": true }).
// Teacher stories are TTS-first at MVP; recording upload is a fast-follow, so
// this is read-only for now (the local server shape, ported).

export const dynamic = 'force-dynamic';

interface Params {
  params: { id: string };
}

export async function GET(request: NextRequest, { params }: Params) {
  const gate = await requireStudioSubscriber(request);
  if (gate instanceof NextResponse) return gate;
  const storyOrError = await getOwnedStudioStoryOrFail(params.id, gate.userId);
  if (storyOrError instanceof NextResponse) return storyOrError;

  const dir = path.join(studioStoryDir(params.id), 'audio');
  const have: Record<string, boolean> = {};
  if (fs.existsSync(dir)) {
    for (const loc of fs.readdirSync(dir)) {
      const ld = path.join(dir, loc);
      if (!fs.statSync(ld).isDirectory()) continue;
      for (const f of fs.readdirSync(ld)) {
        if (f.endsWith('.mp3')) have[loc + '/' + f.replace(/\.mp3$/, '')] = true;
      }
    }
  }
  return NextResponse.json({ have }, { headers: { 'Cache-Control': 'no-store' } });
}
