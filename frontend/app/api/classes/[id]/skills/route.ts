import { NextRequest } from 'next/server';
import { classSkills } from '@/lib/class-results/store';
import { prismaClassDb } from '@/lib/class-results/db';
import { pickSkillIndex } from '@/lib/class-results/skill-index';
import { handle, callerOf } from '@/lib/class-results/http';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

/**
 * GET → the dashboard by curriculum: the class's work under the headings of the country's own curriculum, each
 * child's most recent result under a heading, and the next step where a child had some or many wrong.
 * ?curriculum=<registry> reads the class against another registry of its language (Texas, a German Land).
 */
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  return handle(async () => classSkills(prismaClassDb, await callerOf(request), params.id, request.nextUrl.searchParams.get('curriculum'), pickSkillIndex));
}
