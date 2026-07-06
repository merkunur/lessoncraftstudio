export const dynamic = 'force-dynamic';

// POST /api/admin/storybook-library/backgrounds — add a GLOBAL library
// background/scene. Multipart FormData:
//   image (required, ≤20MB) — ANY size accepted; auto cover-fit to the
//   1600×1000 design space as WebP q80 (the per-story scene precedent)
//   name_en (required)  name_de  theme
// Finishes with a tolerant manifest rebuild (which also builds the thumb).

import { NextRequest, NextResponse } from 'next/server';
import { withAdmin } from '@/lib/auth-middleware';
import {
  addLibraryBackground,
  rebuildLibraryManifest,
  LibraryAdminError,
} from '@/lib/studio/library-admin';

const MAX_BG_BYTES = 20 * 1024 * 1024;

async function postHandler(request: NextRequest, _userId: string) {
  try {
    const form = await request.formData();
    const nameEn = String(form.get('name_en') || '').trim();
    const nameDe = String(form.get('name_de') || '').trim() || undefined;
    const theme = String(form.get('theme') || '').trim() || null;
    const imageFile = form.get('image') as File | null;
    if (!nameEn) return NextResponse.json({ error: 'name_en is required' }, { status: 400 });
    if (!imageFile) return NextResponse.json({ error: 'image file is required' }, { status: 400 });
    if (imageFile.size > MAX_BG_BYTES) return NextResponse.json({ error: 'Image too large (max 20MB)' }, { status: 400 });
    const buf = Buffer.from(await imageFile.arrayBuffer());
    const created = await addLibraryBackground({ nameEn, nameDe, theme, buf });
    const report = await rebuildLibraryManifest();
    return NextResponse.json({ ok: true, id: created.id, bytes: created.bytes, report });
  } catch (e: any) {
    if (e instanceof LibraryAdminError) return NextResponse.json({ error: e.message }, { status: 400 });
    console.error('[storybook-library] background upload failed:', e);
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
  }
}

export const POST = (request: NextRequest) => withAdmin(request, postHandler);
