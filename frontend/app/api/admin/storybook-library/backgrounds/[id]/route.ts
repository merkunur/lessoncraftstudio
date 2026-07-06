export const dynamic = 'force-dynamic';

// PATCH  /api/admin/storybook-library/backgrounds/[id] — meta (names, theme)
// DELETE /api/admin/storybook-library/backgrounds/[id] — remove the scene
// Both finish with a tolerant manifest rebuild.

import { NextRequest, NextResponse } from 'next/server';
import { withAdmin } from '@/lib/auth-middleware';
import {
  setLibraryBackgroundMeta,
  deleteLibraryBackground,
  rebuildLibraryManifest,
  LibraryAdminError,
} from '@/lib/studio/library-admin';

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  return withAdmin(request, async () => {
    try {
      const body = await request.json();
      setLibraryBackgroundMeta(params.id, { name: body.name, theme: body.theme });
      const report = await rebuildLibraryManifest();
      return NextResponse.json({ ok: true, report });
    } catch (e: any) {
      if (e instanceof LibraryAdminError) return NextResponse.json({ error: e.message }, { status: 400 });
      console.error('[storybook-library] background meta failed:', e);
      return NextResponse.json({ error: 'Update failed' }, { status: 500 });
    }
  });
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  return withAdmin(request, async () => {
    try {
      deleteLibraryBackground(params.id);
      const report = await rebuildLibraryManifest();
      return NextResponse.json({ ok: true, report });
    } catch (e: any) {
      if (e instanceof LibraryAdminError) return NextResponse.json({ error: e.message }, { status: 400 });
      console.error('[storybook-library] background delete failed:', e);
      return NextResponse.json({ error: 'Delete failed' }, { status: 500 });
    }
  });
}
