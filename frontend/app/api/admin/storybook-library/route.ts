export const dynamic = 'force-dynamic';

// GET /api/admin/storybook-library — the manifest as served + a tolerant
// per-asset validation report (the library manager's data source).

import { NextRequest, NextResponse } from 'next/server';
import { withAdmin } from '@/lib/auth-middleware';
import { libraryReport, readLibraryManifest } from '@/lib/studio/library-admin';

async function getHandler(_request: NextRequest, _userId: string) {
  const report = await libraryReport();
  return NextResponse.json({ manifest: readLibraryManifest(), report });
}

export const GET = (request: NextRequest) => withAdmin(request, getHandler);
