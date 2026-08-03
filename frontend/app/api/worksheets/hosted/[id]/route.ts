import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireActiveSubscriber } from '@/lib/subscriber-api-gate';
import {
  checkHostedQuota,
  hostedUrls,
  looksLikeStandaloneWorksheet,
  personalizeHostedWorksheet,
  removeHostedHtml,
  stripCatalogChrome,
  writeHostedHtml,
} from '@/lib/hosted-worksheets/core';

export const dynamic = 'force-dynamic';

/** Ownership lookup — 404 (not 403) on mismatch, per the collections convention. */
async function getOwnedWorksheetOrFail(id: string, teacherId: string) {
  const row = await prisma.hostedWorksheet.findFirst({
    where: { id, teacherId, status: 'live' },
  });
  if (!row) {
    return NextResponse.json({ error: 'not_found' }, { status: 404 });
  }
  return row;
}

/**
 * PATCH /api/worksheets/hosted/[id] — rename and/or re-save the HTML.
 *   Body: { title?, html? }
 * DELETE /api/worksheets/hosted/[id] — soft-delete (30d retention) + file removal.
 */
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const gate = await requireActiveSubscriber(request);
  if (gate instanceof NextResponse) return gate;

  const rowOrError = await getOwnedWorksheetOrFail(params.id, gate.userId);
  if (rowOrError instanceof NextResponse) return rowOrError;
  const row = rowOrError;

  let body: { title?: string; html?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'invalid_json' }, { status: 400 });
  }

  const data: { title?: string; htmlBytes?: number } = {};

  if (typeof body.title === 'string') {
    const title = body.title.trim().slice(0, 200);
    if (!title) return NextResponse.json({ error: 'title_required' }, { status: 400 });
    data.title = title;
  }

  if (typeof body.html === 'string') {
    if (!looksLikeStandaloneWorksheet(body.html)) {
      return NextResponse.json({ error: 'invalid_worksheet_html' }, { status: 400 });
    }
    // Same treatment as the POST path — a re-save must not reintroduce the
    // publish-only placeholder tokens. row.linkId is already in scope, and
    // bytes are measured after, so no reordering is needed here.
    const cleaned = personalizeHostedWorksheet(stripCatalogChrome(body.html), {
      playUrl: hostedUrls(row.linkId).url,
      title: data.title || row.title,
      locale: row.locale,
    });
    const htmlBytes = Buffer.byteLength(cleaned, 'utf8');
    // Re-save replaces this worksheet's bytes: quota-check the delta only.
    const quotaError = await checkHostedQuota(gate.userId, htmlBytes - row.htmlBytes, 0);
    if (quotaError) {
      return NextResponse.json({ error: quotaError }, { status: 413 });
    }
    writeHostedHtml(row.id, cleaned);
    data.htmlBytes = htmlBytes;
  }

  if (Object.keys(data).length === 0) {
    return NextResponse.json({ error: 'nothing_to_update' }, { status: 400 });
  }

  const updated = await prisma.hostedWorksheet.update({
    where: { id: row.id },
    data,
    select: { id: true, linkId: true, title: true, htmlBytes: true, updatedAt: true },
  });
  return NextResponse.json(updated);
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const gate = await requireActiveSubscriber(request);
  if (gate instanceof NextResponse) return gate;

  const rowOrError = await getOwnedWorksheetOrFail(params.id, gate.userId);
  if (rowOrError instanceof NextResponse) return rowOrError;
  const row = rowOrError;

  await prisma.hostedWorksheet.update({
    where: { id: row.id },
    data: { status: 'deleted', deletedAt: new Date() },
  });
  removeHostedHtml(row.id);

  return NextResponse.json({ deleted: true });
}
