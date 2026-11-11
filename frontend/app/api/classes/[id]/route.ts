import { NextRequest } from 'next/server';
import { getClass, updateClass, deleteClass } from '@/lib/class-results/store';
import { prismaClassDb, newClassCode } from '@/lib/class-results/db';
import { handle, callerOf, bodyOf } from '@/lib/class-results/http';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

type Ctx = { params: { id: string } };

/** GET → { class, seats, assignments } · PATCH { name?, namesMode?, locale?, newCode? } · DELETE → the class and every result */
export async function GET(request: NextRequest, { params }: Ctx) {
  return handle(async () => getClass(prismaClassDb, await callerOf(request), params.id));
}

export async function PATCH(request: NextRequest, { params }: Ctx) {
  return handle(async () => updateClass(prismaClassDb, await callerOf(request), params.id, await bodyOf(request), newClassCode, new Date()));
}

export async function DELETE(request: NextRequest, { params }: Ctx) {
  return handle(async () => deleteClass(prismaClassDb, await callerOf(request), params.id));
}
