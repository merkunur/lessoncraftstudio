export const dynamic = 'force-dynamic';

// POST /api/admin/storybook-library/characters — add a GLOBAL library
// character. Multipart FormData:
//   image    (required, ≤40MB, png/jpg/webp/gif)
//   atlas    (optional TexturePacker JSON-Hash .json ≤2MB → full sheet
//             re-bake; absent → the image becomes a one-pose_neutral character)
//   name_en  (required)  name_de  tags (comma-separated)
//   neutral_pose (optional; sheet mode) — which frame is the resting pose
//             when none is named "neutral" (aliased as pose_neutral)
// Finishes with a tolerant manifest rebuild; returns the per-asset report.

import { NextRequest, NextResponse } from 'next/server';
import { withAdmin } from '@/lib/auth-middleware';
import {
  addLibraryCharacter,
  rebuildLibraryManifest,
  LibraryAdminError,
} from '@/lib/studio/library-admin';
import { StudioMediaError } from '@/lib/studio/media';

const MAX_SHEET_BYTES = 40 * 1024 * 1024;
const MAX_ATLAS_BYTES = 2 * 1024 * 1024;

async function postHandler(request: NextRequest, _userId: string) {
  try {
    const form = await request.formData();
    const nameEn = String(form.get('name_en') || '').trim();
    const nameDe = String(form.get('name_de') || '').trim() || undefined;
    const tags = String(form.get('tags') || '')
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);
    const imageFile = form.get('image') as File | null;
    const atlasFile = form.get('atlas') as File | null;
    const neutralPose = String(form.get('neutral_pose') || '').trim() || undefined;

    if (!nameEn) return NextResponse.json({ error: 'name_en is required' }, { status: 400 });
    if (!imageFile) return NextResponse.json({ error: 'image file is required' }, { status: 400 });
    if (imageFile.size > MAX_SHEET_BYTES) {
      return NextResponse.json({ error: 'Image too large (max 40MB)' }, { status: 400 });
    }
    let atlas: any;
    if (atlasFile) {
      if (atlasFile.size > MAX_ATLAS_BYTES) {
        return NextResponse.json({ error: 'Atlas .json too large (max 2MB)' }, { status: 400 });
      }
      try {
        atlas = JSON.parse(Buffer.from(await atlasFile.arrayBuffer()).toString('utf8'));
      } catch {
        return NextResponse.json({ error: 'That atlas file is not valid JSON' }, { status: 400 });
      }
    }
    const imageBuf = Buffer.from(await imageFile.arrayBuffer());

    const created = await addLibraryCharacter({ nameEn, nameDe, tags, atlas, imageBuf, neutralPose });
    const report = await rebuildLibraryManifest();
    return NextResponse.json({ ok: true, id: created.id, poses: created.poses, report });
  } catch (e: any) {
    if (e instanceof LibraryAdminError || e instanceof StudioMediaError) {
      return NextResponse.json({ error: e.message }, { status: 400 });
    }
    console.error('[storybook-library] character upload failed:', e);
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
  }
}

export const POST = (request: NextRequest) => withAdmin(request, postHandler);
