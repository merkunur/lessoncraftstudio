import { NextRequest, NextResponse } from 'next/server';

import { requireStudioSubscriber, getOwnedStudioStoryOrFail } from '@/lib/studio/story-gate';
import { validateTenantStory } from '@/lib/studio/validate';
import { toCanonicalUrls } from '@/lib/studio/urls';

// Story Studio tenancy — server-side story validation.
// POST runs the shared validator core (the same checks as the author-time
// scripts/storybook/validate-story.js CLI) against this teacher's story.
// Body optional {story, strings}: validates the UNSAVED draft (played
// /api/play/<link>/m/ URLs normalized back to canonical first); without a
// body the stored row's storyJson/stringsJson is validated. Responds
// { ok, errors, warns } — the same shape the local studio-server's
// /studio/validate/<id> returns, so the studio client's validate panel
// works unchanged.

export const dynamic = 'force-dynamic';

const VALIDATE_TIMEOUT_MS = 15000;

interface Params {
  params: { id: string };
}

export async function POST(request: NextRequest, { params }: Params) {
  const gate = await requireStudioSubscriber(request);
  if (gate instanceof NextResponse) return gate;
  const storyOrError = await getOwnedStudioStoryOrFail(params.id, gate.userId);
  if (storyOrError instanceof NextResponse) return storyOrError;
  const row = storyOrError;

  let body: any = null;
  try {
    body = await request.json();
  } catch {
    body = null; // empty body -> validate the stored row
  }

  const story =
    body && body.story ? toCanonicalUrls(body.story, row.id) : (row.storyJson as any);
  const strings =
    body && body.strings ? toCanonicalUrls(body.strings, row.id) : (row.stringsJson as any);

  if (!story) {
    return NextResponse.json({ error: 'Story has no content to validate' }, { status: 400 });
  }

  try {
    const result = await Promise.race([
      validateTenantStory(row.id, story, strings || {}),
      new Promise<never>((_, reject) =>
        setTimeout(() => reject(new Error('validation timed out')), VALIDATE_TIMEOUT_MS)
      ),
    ]);
    return NextResponse.json(
      { ok: result.errors.length === 0, errors: result.errors, warns: result.warns },
      { headers: { 'Cache-Control': 'no-store' } }
    );
  } catch (e: any) {
    return NextResponse.json(
      { ok: false, errors: [String((e && e.message) || e)], warns: [] },
      { headers: { 'Cache-Control': 'no-store' } }
    );
  }
}
