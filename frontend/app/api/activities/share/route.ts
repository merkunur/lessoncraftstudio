import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireActiveSubscriber } from '@/lib/subscriber-api-gate';
import { resolveActivityById } from '@/lib/activities';
import {
  ACTIVITY_SHARE_LIMIT,
  ACTIVITY_SHARE_LOCALES,
  activityShareUrls,
  generateActivityLinkId,
} from '@/lib/activity-share/core';

export const dynamic = 'force-dynamic';

/**
 * GET  /api/activities/share — the teacher's shared-activity links + usage.
 * POST /api/activities/share — mint (or return the existing) share link for an
 *   activity. Body: { activityId, locale?, title? }.
 * Both subscriber-only (requireActiveSubscriber; 403 subscription_required).
 * Serving the resulting /play/a/<linkId> link is FREE + never lapses; the
 * subscriber gate is only on creation/management.
 */
export async function GET(request: NextRequest) {
  const gate = await requireActiveSubscriber(request);
  if (gate instanceof NextResponse) return gate;

  const rows = await prisma.activityPlayLink.findMany({
    where: { teacherId: gate.userId, status: 'live' },
    orderBy: { updatedAt: 'desc' },
    select: {
      id: true, linkId: true, activityId: true, title: true, locale: true,
      viewCount: true, createdAt: true, updatedAt: true,
    },
  });

  // Attach each activity's public activity-page slug (if it still exists) so
  // the workspace can offer an "open activity page" link. Resolve once per row.
  const shares = await Promise.all(
    rows.map(async (r) => {
      const row = await resolveActivityById(r.activityId);
      const activitySlug = row?.slug?.[r.locale] ?? null;
      return { ...r, ...activityShareUrls(r.linkId), activitySlug };
    }),
  );

  return NextResponse.json({
    shares,
    limit: { count: rows.length, maxCount: ACTIVITY_SHARE_LIMIT },
  });
}

export async function POST(request: NextRequest) {
  const gate = await requireActiveSubscriber(request);
  if (gate instanceof NextResponse) return gate;

  let body: { activityId?: string; locale?: string; title?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'invalid_json' }, { status: 400 });
  }

  const activityId = String(body.activityId || '').trim();
  const locale = ACTIVITY_SHARE_LOCALES.has(String(body.locale || '')) ? String(body.locale) : 'en';

  const row = await resolveActivityById(activityId);
  if (!row) {
    return NextResponse.json({ error: 'unknown_activity' }, { status: 404 });
  }
  // The activity must actually exist in the requested locale (its slug/title).
  if (!row.slug[locale] || !row.page_title[locale]) {
    return NextResponse.json({ error: 'activity_not_in_locale' }, { status: 400 });
  }

  const title = (String(body.title || '').trim() || row.page_title[locale]).slice(0, 200);

  // App-layer idempotency: one live link per (teacher, activity, locale).
  const existing = await prisma.activityPlayLink.findFirst({
    where: { teacherId: gate.userId, activityId, locale, status: 'live' },
    select: { id: true, linkId: true, title: true, activityId: true, locale: true },
  });
  if (existing) {
    return NextResponse.json(
      { share: { ...existing, ...activityShareUrls(existing.linkId), existing: true } },
      { status: 200 }
    );
  }

  // Cap check.
  const count = await prisma.activityPlayLink.count({
    where: { teacherId: gate.userId, status: 'live' },
  });
  if (count >= ACTIVITY_SHARE_LIMIT) {
    return NextResponse.json({ error: 'limit_reached' }, { status: 413 });
  }

  // Mint with collision-retry on the unique linkId.
  for (let attempt = 0; attempt < 5; attempt++) {
    try {
      const created = await prisma.activityPlayLink.create({
        data: {
          linkId: generateActivityLinkId(),
          teacherId: gate.userId,
          activityId,
          locale,
          title,
        },
        select: { id: true, linkId: true, title: true, activityId: true, locale: true },
      });
      return NextResponse.json(
        { share: { ...created, ...activityShareUrls(created.linkId), existing: false } },
        { status: 201 }
      );
    } catch (e: unknown) {
      // P2002 = unique constraint (linkId collision) → retry with a fresh id.
      if (typeof e === 'object' && e && (e as { code?: string }).code === 'P2002') continue;
      console.error('activity-share create failed:', e);
      return NextResponse.json({ error: 'create_failed' }, { status: 500 });
    }
  }
  return NextResponse.json({ error: 'create_failed' }, { status: 500 });
}
