import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/admin-auth';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

const VALID_PLACEMENTS = ['center', 'top', 'bottom', 'full-frame', 'divider'];

export async function PUT(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  const auth = await requireAdmin(request);
  if (auth instanceof NextResponse) return auth;

  const { slug } = params;
  if (!slug) return NextResponse.json({ error: 'slug required' }, { status: 400 });

  try {
    const body = await request.json();

    const existing = await prisma.designElement.findUnique({ where: { slug } });
    if (!existing) return NextResponse.json({ error: 'not found' }, { status: 404 });

    // Category change not supported in v1 (would require moving the file on disk)
    if (body.category != null && body.category !== existing.category) {
      return NextResponse.json(
        { error: 'category changes not supported yet — delete and re-upload under the new category' },
        { status: 501 }
      );
    }

    const data: any = {};

    if (body.translations != null && typeof body.translations === 'object') {
      // Merge: keep existing keys not in body, override the ones provided
      const current = (existing.translations as Record<string, string>) || {};
      data.translations = { ...current, ...body.translations };
    }

    if (body.defaultPlacement !== undefined) {
      if (body.defaultPlacement !== null && !VALID_PLACEMENTS.includes(body.defaultPlacement)) {
        return NextResponse.json({ error: 'invalid defaultPlacement' }, { status: 400 });
      }
      data.defaultPlacement = body.defaultPlacement;
    }

    if (body.defaultScale !== undefined) {
      if (body.defaultScale !== null) {
        const n = Number(body.defaultScale);
        if (isNaN(n) || n < 0 || n > 1) {
          return NextResponse.json({ error: 'defaultScale must be between 0 and 1' }, { status: 400 });
        }
        data.defaultScale = n;
      } else {
        data.defaultScale = null;
      }
    }

    if (body.tintable !== undefined) data.tintable = !!body.tintable;

    if (body.tags !== undefined) {
      if (!Array.isArray(body.tags)) {
        return NextResponse.json({ error: 'tags must be an array' }, { status: 400 });
      }
      data.tags = body.tags.map((t: any) => String(t));
    }

    if (body.sortOrder !== undefined) {
      const n = parseInt(String(body.sortOrder), 10);
      if (isNaN(n)) return NextResponse.json({ error: 'sortOrder must be an integer' }, { status: 400 });
      data.sortOrder = n;
    }

    if (body.isActive !== undefined) data.isActive = !!body.isActive;

    const item = await prisma.designElement.update({
      where: { slug },
      data
    });

    return NextResponse.json({ ok: true, item });
  } catch (err: any) {
    console.error('[design-elements/slug PUT]', err);
    return NextResponse.json({ error: 'update failed', detail: err.message }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  const auth = await requireAdmin(request);
  if (auth instanceof NextResponse) return auth;

  const { slug } = params;
  if (!slug) return NextResponse.json({ error: 'slug required' }, { status: 400 });

  const url = new URL(request.url);
  const hard = url.searchParams.get('hard') === 'true';
  const hardConfirm = request.headers.get('x-hard-delete-confirm') === 'yes';

  try {
    const existing = await prisma.designElement.findUnique({ where: { slug } });
    if (!existing) return NextResponse.json({ error: 'not found' }, { status: 404 });

    if (hard) {
      if (!hardConfirm) {
        return NextResponse.json(
          { error: 'hard delete requires header "x-hard-delete-confirm: yes"' },
          { status: 400 }
        );
      }
      // Remove DB row only. The orphan file remains on disk intentionally —
      // operator must remove it via /var/www/lcs-media/scripts/delete-design-element.sh
      // (requires unlock + rm, not available over HTTP by design).
      await prisma.designElement.delete({ where: { slug } });
      return NextResponse.json({
        ok: true,
        warning: `DB row removed; SVG file ${existing.filePath} remains on disk. Use delete-design-element.sh --confirm ${existing.filePath} on the server to remove it.`
      });
    }

    // Soft delete
    const item = await prisma.designElement.update({
      where: { slug },
      data: { isActive: false }
    });
    return NextResponse.json({ ok: true, item });
  } catch (err: any) {
    console.error('[design-elements/slug DELETE]', err);
    return NextResponse.json({ error: 'delete failed', detail: err.message }, { status: 500 });
  }
}
