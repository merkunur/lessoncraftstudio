import { NextRequest, NextResponse } from 'next/server';
import { prismaMakerDb } from '@/lib/makers/db';
import { getRecipe, updateRecipe, deleteRecipe } from '@/lib/makers/store';
import { callerOf, NO_STORE } from '@/lib/makers/auth';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

/**
 * One saved worksheet, the owner only (frontend/lib/makers/store.ts):
 *   GET    /api/makers/recipes/<id>                → { id, rev, recipe }      404 unknown / not yours / deleted
 *   PUT    /api/makers/recipes/<id> { recipe, rev } → { rev }   409 { rev } when it changed elsewhere (the screen keeps
 *                                                     its copy as a new worksheet) · 400 · 413
 *   DELETE /api/makers/recipes/<id>                → { ok }   (soft: kept, invisible, its links are gone)
 */
type Ctx = { params: { id: string } };

export async function GET(request: NextRequest, { params }: Ctx) {
  const r = await getRecipe(prismaMakerDb, await callerOf(request), params.id);
  return NextResponse.json(r.body, { status: r.status, headers: NO_STORE });
}

export async function PUT(request: NextRequest, { params }: Ctx) {
  let body: unknown = null;
  try { body = await request.json(); } catch { body = null; }
  const r = await updateRecipe(prismaMakerDb, await callerOf(request), params.id, body);
  return NextResponse.json(r.body, { status: r.status, headers: NO_STORE });
}

export async function DELETE(request: NextRequest, { params }: Ctx) {
  const r = await deleteRecipe(prismaMakerDb, await callerOf(request), params.id);
  return NextResponse.json(r.body, { status: r.status, headers: NO_STORE });
}
