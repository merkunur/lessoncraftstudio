export const dynamic = 'force-dynamic';

// POST /api/admin/storybook-library/rebuild — regenerate manifest.json +
// cards/thumbs tolerantly (broken assets excluded + reported per-asset).

import { NextRequest, NextResponse } from 'next/server';
import { withAdmin } from '@/lib/auth-middleware';
import { rebuildLibraryManifest, readLibraryManifest } from '@/lib/studio/library-admin';

async function postHandler(_request: NextRequest, _userId: string) {
  const report = await rebuildLibraryManifest();
  return NextResponse.json({ ok: true, manifest: readLibraryManifest(), report });
}

export const POST = (request: NextRequest) => withAdmin(request, postHandler);
