import { NextRequest, NextResponse } from 'next/server';
import { prismaMakerDb } from '@/lib/makers/db';
import { listRecipes, createRecipe } from '@/lib/makers/store';
import { callerOf, NO_STORE } from '@/lib/makers/auth';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

/**
 * The teacher's saved worksheets (ARCHITECTURE §5, §8.2; the rules in frontend/lib/makers/store.ts):
 *   GET  /api/makers/recipes?mine   → { items: [{ id, title, maker, lang, template, updatedAt }] }   401 signed out
 *   POST /api/makers/recipes        { recipe } → 201 { id, rev }   400 malformed · 413 over the cap · 429 recipe cap
 * Never cached: the answer is the caller's own.
 */
export async function GET(request: NextRequest) {
  const r = await listRecipes(prismaMakerDb, await callerOf(request));
  return NextResponse.json(r.body, { status: r.status, headers: NO_STORE });
}

export async function POST(request: NextRequest) {
  let body: unknown = null;
  try { body = await request.json(); } catch { body = null; }
  const r = await createRecipe(prismaMakerDb, await callerOf(request), body);
  return NextResponse.json(r.body, { status: r.status, headers: NO_STORE });
}
