import { NextRequest, NextResponse } from 'next/server';
import { prismaMakerDb, newLinkId } from '@/lib/makers/db';
import { mintLink } from '@/lib/makers/store';
import { callerOf, NO_STORE } from '@/lib/makers/auth';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

/**
 * POST /api/makers/links { recipeId, kind: 'student' | 'colleague' } → 201 { linkId } (200 when that link already exists:
 * one link per recipe and kind). 401 signed out · 404 not the caller's recipe · 400 bad kind. The id is 12 chars of the
 * hosted-link alphabet; a student link opens /s/<linkId>, a colleague link opens the maker read-only (?m=<linkId>).
 */
export async function POST(request: NextRequest) {
  let body: unknown = null;
  try { body = await request.json(); } catch { body = null; }
  const r = await mintLink(prismaMakerDb, await callerOf(request), body, newLinkId);
  return NextResponse.json(r.body, { status: r.status, headers: NO_STORE });
}
