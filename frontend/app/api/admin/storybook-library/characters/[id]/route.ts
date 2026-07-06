export const dynamic = 'force-dynamic';

// PATCH  /api/admin/storybook-library/characters/[id] — meta (names, tags)
// DELETE /api/admin/storybook-library/characters/[id] — remove the character
// Both finish with a tolerant manifest rebuild.

import { NextRequest, NextResponse } from 'next/server';
import { withAdmin } from '@/lib/auth-middleware';
import {
  setLibraryCharacterMeta,
  deleteLibraryCharacter,
  rebuildLibraryManifest,
  LibraryAdminError,
} from '@/lib/studio/library-admin';

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  return withAdmin(request, async () => {
    try {
      const body = await request.json();
      setLibraryCharacterMeta(params.id, { name: body.name, tags: body.tags });
      const report = await rebuildLibraryManifest();
      return NextResponse.json({ ok: true, report });
    } catch (e: any) {
      if (e instanceof LibraryAdminError) return NextResponse.json({ error: e.message }, { status: 400 });
      console.error('[storybook-library] character meta failed:', e);
      return NextResponse.json({ error: 'Update failed' }, { status: 500 });
    }
  });
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  return withAdmin(request, async () => {
    try {
      deleteLibraryCharacter(params.id);
      const report = await rebuildLibraryManifest();
      return NextResponse.json({ ok: true, report });
    } catch (e: any) {
      if (e instanceof LibraryAdminError) return NextResponse.json({ error: e.message }, { status: 400 });
      console.error('[storybook-library] character delete failed:', e);
      return NextResponse.json({ error: 'Delete failed' }, { status: 500 });
    }
  });
}
