import { NextRequest, NextResponse } from 'next/server';
import { resolvePlayLink } from '@/lib/studio/story-gate';
import { toClientUrls } from '@/lib/studio/urls';

// Accountless story play — the link IS the capability (PlayLink precedent,
// CLAUDE.md §4.4). No auth; unknown/revoked links and deleted stories 404.
// Cache-Control: private keeps Cloudflare's shared cache out (origin headers
// are honored per §15.8) while letting the student's browser cache briefly.

export const dynamic = 'force-dynamic';

interface Params {
  params: { linkId: string };
}

export async function GET(request: NextRequest, { params }: Params) {
  const link = await resolvePlayLink(params.linkId);
  if (!link) {
    return NextResponse.json({ error: 'This story is not available' }, { status: 404 });
  }
  const story = toClientUrls(link.story.storyJson, link.story.id, params.linkId);
  return NextResponse.json(story, {
    headers: { 'Cache-Control': 'private, max-age=300' },
  });
}
