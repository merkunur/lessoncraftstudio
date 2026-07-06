export const dynamic = 'force-dynamic';

// POST /api/admin/storybook-library/characters/[id]/clips — add animation
// clips (TexturePacker pair) to a GLOBAL library character. Multipart:
//   atlas (.json, required) + image (≤40MB, required)
// Frames regroup into clip_<name> animations (multipack stays CLI-only).

import { NextRequest, NextResponse } from 'next/server';
import { withAdmin } from '@/lib/auth-middleware';
import {
  addLibraryCharacterClips,
  rebuildLibraryManifest,
  LibraryAdminError,
} from '@/lib/studio/library-admin';
import { StudioMediaError } from '@/lib/studio/media';

const MAX_SHEET_BYTES = 40 * 1024 * 1024;
const MAX_ATLAS_BYTES = 2 * 1024 * 1024;

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  return withAdmin(request, async () => {
    try {
      const form = await request.formData();
      const imageFile = form.get('image') as File | null;
      const atlasFile = form.get('atlas') as File | null;
      if (!imageFile || !atlasFile) {
        return NextResponse.json({ error: 'Both the atlas .json and the sheet image are required' }, { status: 400 });
      }
      if (imageFile.size > MAX_SHEET_BYTES) return NextResponse.json({ error: 'Sheet too large (max 40MB)' }, { status: 400 });
      if (atlasFile.size > MAX_ATLAS_BYTES) return NextResponse.json({ error: 'Atlas .json too large (max 2MB)' }, { status: 400 });
      let atlas: any;
      try {
        atlas = JSON.parse(Buffer.from(await atlasFile.arrayBuffer()).toString('utf8'));
      } catch {
        return NextResponse.json({ error: 'That atlas file is not valid JSON' }, { status: 400 });
      }
      const imageBuf = Buffer.from(await imageFile.arrayBuffer());
      const added = await addLibraryCharacterClips(params.id, atlas, imageBuf);
      const report = await rebuildLibraryManifest();
      return NextResponse.json({ ok: true, clips: added.clips, report });
    } catch (e: any) {
      if (e instanceof LibraryAdminError || e instanceof StudioMediaError) {
        return NextResponse.json({ error: e.message }, { status: 400 });
      }
      console.error('[storybook-library] clips upload failed:', e);
      return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
    }
  });
}
