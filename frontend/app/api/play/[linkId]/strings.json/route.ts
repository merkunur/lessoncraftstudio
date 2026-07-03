import { NextRequest, NextResponse } from 'next/server';
import { resolvePlayLink } from '@/lib/studio/story-gate';

// Accountless story play — strings.json (see story.json/route.ts for the
// capability + caching semantics).

export const dynamic = 'force-dynamic';

interface Params {
  params: { linkId: string };
}

export async function GET(request: NextRequest, { params }: Params) {
  const link = await resolvePlayLink(params.linkId);
  if (!link) {
    return NextResponse.json({ error: 'This story is not available' }, { status: 404 });
  }
  return NextResponse.json(link.story.stringsJson, {
    headers: { 'Cache-Control': 'private, max-age=300' },
  });
}
