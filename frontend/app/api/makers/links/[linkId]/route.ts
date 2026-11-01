import { NextRequest, NextResponse } from 'next/server';
import { prismaMakerDb } from '@/lib/makers/db';
import { readLink, revokeLink } from '@/lib/makers/store';
import { callerOf, NO_STORE, PUBLIC_LINK } from '@/lib/makers/auth';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

/**
 * GET    /api/makers/links/<linkId> → { recipe, kind, meter }  PUBLIC — the twelve-character id is the key (32^12).
 *        Edge-cached `public, max-age=0, s-maxage=300` (ARCHITECTURE §8.2: a viral student link costs the origin one
 *        read per 5 minutes; a revoke or an edit propagates within 5 minutes). `meter` is read NOW from the teacher's
 *        subscription (ruling D.4-4). 404 (no-store) when unknown, taken back or the worksheet is deleted.
 * DELETE /api/makers/links/<linkId> → { ok }  the owner takes a link back; 404 from then on.
 */
type Ctx = { params: { linkId: string } };

export async function GET(_request: NextRequest, { params }: Ctx) {
  const r = await readLink(prismaMakerDb, params.linkId);
  return NextResponse.json(r.body, { status: r.status, headers: r.cache === 'public' ? PUBLIC_LINK : NO_STORE });
}

export async function DELETE(request: NextRequest, { params }: Ctx) {
  const r = await revokeLink(prismaMakerDb, await callerOf(request), params.linkId);
  return NextResponse.json(r.body, { status: r.status, headers: NO_STORE });
}
