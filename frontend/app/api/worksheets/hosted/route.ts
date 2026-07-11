import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireActiveSubscriber } from '@/lib/subscriber-api-gate';
import {
  HOSTABLE_APP_IDS,
  HOSTED_LOCALES,
  checkHostedQuota,
  generateHostedLinkId,
  getHostedQuotaUsage,
  looksLikeStandaloneWorksheet,
  removeHostedHtml,
  stripCatalogChrome,
  writeHostedHtml,
} from '@/lib/hosted-worksheets/core';

export const dynamic = 'force-dynamic';

const CANONICAL_HOST = 'https://www.lessoncraftstudio.com';

function hostedUrls(linkId: string) {
  return {
    url: `${CANONICAL_HOST}/play/w/${linkId}`,
    qrUrl: `${CANONICAL_HOST}/play/w/${linkId}/qr.png`,
  };
}

/**
 * GET /api/worksheets/hosted — the teacher's hosted-worksheet list + quota.
 * POST /api/worksheets/hosted — save a generator's standalone interactive HTML.
 *   Body: { appId, title, locale, html }
 * Both subscriber-only (requireActiveSubscriber; 403 subscription_required).
 * Kill switch: HOSTED_WORKSHEETS_DISABLED=1 → 503 (serving stays up).
 */
export async function GET(request: NextRequest) {
  const gate = await requireActiveSubscriber(request);
  if (gate instanceof NextResponse) return gate;

  const [rows, quota] = await Promise.all([
    prisma.hostedWorksheet.findMany({
      where: { teacherId: gate.userId, status: 'live' },
      orderBy: { updatedAt: 'desc' },
      select: {
        id: true, linkId: true, appId: true, title: true, locale: true,
        htmlBytes: true, viewCount: true, createdAt: true, updatedAt: true,
      },
    }),
    getHostedQuotaUsage(gate.userId),
  ]);

  return NextResponse.json({
    worksheets: rows.map((r) => ({ ...r, ...hostedUrls(r.linkId) })),
    quota,
  });
}

export async function POST(request: NextRequest) {
  if (process.env.HOSTED_WORKSHEETS_DISABLED === '1') {
    return NextResponse.json(
      { error: 'temporarily_disabled' },
      { status: 503 }
    );
  }

  const gate = await requireActiveSubscriber(request);
  if (gate instanceof NextResponse) return gate;

  let body: { appId?: string; title?: string; locale?: string; html?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'invalid_json' }, { status: 400 });
  }

  const appId = String(body.appId || '');
  const title = String(body.title || '').trim().slice(0, 200);
  const locale = HOSTED_LOCALES.has(String(body.locale || '')) ? String(body.locale) : 'en';
  let html = typeof body.html === 'string' ? body.html : '';

  if (!HOSTABLE_APP_IDS.has(appId)) {
    return NextResponse.json({ error: 'unknown_app' }, { status: 400 });
  }
  if (!title) {
    return NextResponse.json({ error: 'title_required' }, { status: 400 });
  }
  if (!looksLikeStandaloneWorksheet(html)) {
    return NextResponse.json({ error: 'invalid_worksheet_html' }, { status: 400 });
  }
  // A saved worksheet is a clean single sheet — remove the catalog "more
  // worksheets" showreel (its __SUGGESTION__ placeholders are publish-only).
  html = stripCatalogChrome(html);

  const htmlBytes = Buffer.byteLength(html, 'utf8');
  const quotaError = await checkHostedQuota(gate.userId, htmlBytes, 1);
  if (quotaError) {
    return NextResponse.json({ error: quotaError }, { status: 413 });
  }

  const row = await prisma.hostedWorksheet.create({
    data: {
      linkId: generateHostedLinkId(),
      teacherId: gate.userId,
      appId,
      title,
      locale,
      htmlBytes,
    },
  });

  try {
    writeHostedHtml(row.id, html);
  } catch (e) {
    // FS write failed — roll the row back so no dead link exists.
    await prisma.hostedWorksheet.delete({ where: { id: row.id } }).catch(() => {});
    removeHostedHtml(row.id);
    console.error('hosted-worksheet write failed:', e);
    return NextResponse.json({ error: 'storage_failed' }, { status: 500 });
  }

  return NextResponse.json(
    { id: row.id, linkId: row.linkId, title: row.title, ...hostedUrls(row.linkId) },
    { status: 201 }
  );
}
