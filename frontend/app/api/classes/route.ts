import { NextRequest } from 'next/server';
import { listClasses, createClass } from '@/lib/class-results/store';
import { prismaClassDb, newClassCode } from '@/lib/class-results/db';
import { handle, callerOf, bodyOf } from '@/lib/class-results/http';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

/** GET /api/classes → the teacher's classes · POST { name, namesMode, locale, names? | count? } → 201 { id, code } */
export async function GET(request: NextRequest) {
  return handle(async () => listClasses(prismaClassDb, await callerOf(request)));
}

export async function POST(request: NextRequest) {
  return handle(async () => createClass(prismaClassDb, await callerOf(request), await bodyOf(request), newClassCode));
}
