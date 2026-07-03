import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

import { requireStudioSubscriber, getOwnedStudioStoryOrFail, ensurePreviewLink } from '@/lib/studio/story-gate';
import { studioStoryDir } from '@/lib/studio/paths';
import {
  importExerciseFromFormData,
  importExerciseFromZip,
} from '@/lib/studio/exercise-import';
import { StudioMediaError } from '@/lib/studio/media';
import { checkAssetQuota, addAssetBytes } from '@/lib/studio/quota';
import { STUDIO_QUOTAS, STUDIO_PLAY_API_PREFIX } from '@/lib/studio/config';

// Story Studio tenancy — SEP worksheet exercises for one story.
// GET  — list placed packages (the tenant analog of /studio/exercises,
//        story-scoped by design).
// POST — dual intake: multipart FormData {descriptor + file parts} from the
//        in-studio generator bridge (NO zip roundtrip), or a sep_*.zip body
//        for the manual path.

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
  const exRoot = path.join(studioStoryDir(params.id), 'exercises');
  const exercises: any[] = [];

  if (fs.existsSync(exRoot)) {
    for (const ex of fs.readdirSync(exRoot)) {
      const dPath = path.join(exRoot, ex, 'descriptor.json');
      if (!fs.existsSync(dPath)) continue;
      try {
        const d = JSON.parse(fs.readFileSync(dPath, 'utf8'));
        exercises.push({
          package: 'exercises/' + ex,
          fromStory: params.id,
          family: d.family,
          appType: d.appType,
          prompt: (d.locales && d.locales.en && d.locales.en.prompt) || '',
          absolute: STUDIO_PLAY_API_PREFIX + preview.linkId + '/m/exercises/' + ex,
        });
      } catch {
        /* skip unreadable */
      }
    }
  }

  return NextResponse.json({ exercises }, { headers: { 'Cache-Control': 'no-store' } });
}

export async function POST(request: NextRequest, { params }: Params) {
  const gate = await requireStudioSubscriber(request);
  if (gate instanceof NextResponse) return gate;
  const storyOrError = await getOwnedStudioStoryOrFail(params.id, gate.userId);
  if (storyOrError instanceof NextResponse) return storyOrError;
  const row = storyOrError;

  const contentType = request.headers.get('content-type') || '';

  try {
    let result;
    if (contentType.includes('multipart/form-data')) {
      const form = await request.formData();
      result = await importExerciseFromFormData(row.id, form);
    } else {
      const buf = Buffer.from(await request.arrayBuffer());
      if (!buf.length) return NextResponse.json({ error: 'Empty upload' }, { status: 400 });
      if (buf.length > STUDIO_QUOTAS.MAX_SEP_PACKAGE_BYTES) {
        return NextResponse.json({ error: 'That exercise package is too large' }, { status: 413 });
      }
      result = importExerciseFromZip(row.id, buf);
    }

    const quotaError = checkAssetQuota(row.assetBytes, result.bytes);
    if (quotaError) {
      // The package landed before the check could see its true size — remove it.
      try {
        fs.rmSync(path.join(studioStoryDir(row.id), result.pkg), { recursive: true, force: true });
      } catch {
        /* best effort */
      }
      return quotaError;
    }
    await addAssetBytes(row.id, result.bytes);

    return NextResponse.json({
      ok: true,
      exId: result.exId,
      package: result.pkg,
      appType: result.appType,
      family: result.family,
    });
  } catch (e: any) {
    if (e instanceof StudioMediaError) {
      return NextResponse.json({ error: e.message }, { status: 400 });
    }
    throw e;
  }
}
