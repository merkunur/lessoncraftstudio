import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import { resolveLinkStoryIdCached } from '@/lib/studio/play-cache';
import { resolveTenantPath, studioMimeFor } from '@/lib/studio/paths';

// Accountless story play — tenant binary streamer.
// /api/play/<linkId>/m/<relpath> serves files from the linked story's media
// dir. The 60s link cache keeps per-asset requests off Postgres; the
// traversal guard in resolveTenantPath plus the save-time src allowlist make
// cross-tenant reads structurally impossible. Cache-Control: private —
// browsers may cache for the session, Cloudflare's shared cache may not
// (origin headers honored per CLAUDE.md §15.8).

export const dynamic = 'force-dynamic';

interface Params {
  params: { linkId: string; path: string[] };
}

export async function GET(request: NextRequest, { params }: Params) {
  const storyId = await resolveLinkStoryIdCached(params.linkId);
  if (!storyId) return new NextResponse('Not found', { status: 404 });

  const rel = (params.path || []).join('/');
  const abs = resolveTenantPath(storyId, rel);
  if (!abs || !fs.existsSync(abs) || !fs.statSync(abs).isFile()) {
    return new NextResponse('Not found', { status: 404 });
  }

  const data = fs.readFileSync(abs);
  return new NextResponse(new Uint8Array(data), {
    status: 200,
    headers: {
      'Content-Type': studioMimeFor(abs),
      'Content-Length': String(data.length),
      'Cache-Control': 'private, max-age=3600',
      'X-Content-Type-Options': 'nosniff',
    },
  });
}
