import { NextRequest } from 'next/server';
import { updateAssignment, deleteAssignment } from '@/lib/class-results/store';
import { prismaClassDb } from '@/lib/class-results/db';
import { handle, callerOf, bodyOf } from '@/lib/class-results/http';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

type Ctx = { params: { id: string; aid: string } };

/** PATCH { closed } → hidden from the class page, results kept · DELETE → the assignment and its results */
export async function PATCH(request: NextRequest, { params }: Ctx) {
  return handle(async () => updateAssignment(prismaClassDb, await callerOf(request), params.id, params.aid, await bodyOf(request), new Date()));
}

export async function DELETE(request: NextRequest, { params }: Ctx) {
  return handle(async () => deleteAssignment(prismaClassDb, await callerOf(request), params.id, params.aid));
}
