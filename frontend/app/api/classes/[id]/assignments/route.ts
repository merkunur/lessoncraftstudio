import { NextRequest } from 'next/server';
import { addAssignment } from '@/lib/class-results/store';
import { prismaClassDb } from '@/lib/class-results/db';
import { handle, callerOf, bodyOf } from '@/lib/class-results/http';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

/**
 * POST { link } → 201 { id, kind, title } (200 { existing } when the class already has it). The link is the address
 * of an interactive worksheet, a Level Set, a worksheet page or the teacher's own maker worksheet on this site.
 * 422 { error: 'print_only' } when the page has no screen version.
 */
export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  return handle(async () => addAssignment(prismaClassDb, await callerOf(request), params.id, await bodyOf(request), new Date()));
}
