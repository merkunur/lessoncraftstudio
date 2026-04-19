import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/admin-auth';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  const auth = await requireAdmin(request);
  if (auth instanceof NextResponse) return auth;

  try {
    const body = await request.json();
    const category = (body.category as string || '').trim();
    const slugs = body.slugs;

    if (!category) return NextResponse.json({ error: 'category required' }, { status: 400 });
    if (!Array.isArray(slugs) || slugs.some(s => typeof s !== 'string')) {
      return NextResponse.json({ error: 'slugs must be an array of strings' }, { status: 400 });
    }

    // Verify all slugs belong to this category (prevent cross-category reorder bugs)
    const rows = await prisma.designElement.findMany({
      where: { slug: { in: slugs } },
      select: { slug: true, category: true }
    });
    const wrong = rows.filter(r => r.category !== category).map(r => r.slug);
    if (wrong.length > 0) {
      return NextResponse.json(
        { error: `slugs not in category "${category}": ${wrong.join(', ')}` },
        { status: 400 }
      );
    }

    await prisma.$transaction(
      slugs.map((slug: string, idx: number) =>
        prisma.designElement.update({
          where: { slug },
          data: { sortOrder: idx }
        })
      )
    );

    return NextResponse.json({ ok: true, updated: slugs.length });
  } catch (err: any) {
    console.error('[design-elements/reorder]', err);
    return NextResponse.json({ error: 'reorder failed', detail: err.message }, { status: 500 });
  }
}
