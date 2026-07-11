import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { resolveActivityById } from '@/lib/activities';

export const dynamic = 'force-dynamic';

/**
 * GET /play/a/[linkId] — serve a shared interactive activity to a student.
 *
 * Link-is-the-capability (§4.4): no student auth, ever. The mini-tool wrapper
 * HTML is already a standalone, chrome-free player, so this route serves a
 * minimal full-screen wrapper whose single same-origin <iframe> loads
 * /mini-tools/<tool>.html — keeping the clean /play/a/<linkId> URL in the bar.
 *
 * Activities are FREE public content: the link NEVER lapses (serve regardless
 * of the teacher's subscription status — mirrors the deck /play/<linkId>
 * policy, NOT the hosted-worksheet paused gate). The subscriber gate is only
 * on creation. Links never break for students.
 *
 * Non-negotiable headers: X-Robots-Tag noindex (user content never indexes);
 * Cache-Control private, max-age=300; a CSP that allows only the same-origin
 * mini-tool frame + inline style for the wrapper.
 */

// Keep in step with app/[locale]/activities/[slug]/page.tsx ACTIVITY_WRAPPER_VERSION
// (cache-buster on the mini-tool wrapper; harmless to the wrapper, which reads
// only activity/lang/embed).
const ACTIVITY_WRAPPER_VERSION = '9.231';

const BASE_HEADERS: Record<string, string> = {
  'Content-Type': 'text/html; charset=utf-8',
  'X-Robots-Tag': 'noindex, nofollow',
  'Cache-Control': 'private, max-age=300',
  'X-Content-Type-Options': 'nosniff',
  'Content-Security-Policy':
    "default-src 'self'; frame-src 'self'; img-src 'self' data:; style-src 'unsafe-inline'; base-uri 'none'",
};

function miniPage(title: string, line: string, status: number): NextResponse {
  const body = `<!DOCTYPE html><html><head><meta charset="utf-8"><meta name="robots" content="noindex, nofollow"><meta name="viewport" content="width=device-width, initial-scale=1"><title>${title}</title><style>body{font-family:'Nunito',system-ui,sans-serif;background:#FBF3E4;color:#146B5E;display:flex;align-items:center;justify-content:center;min-height:100vh;margin:0;padding:24px;text-align:center}main{max-width:480px}h1{font-size:1.6rem}p{font-size:1.05rem;line-height:1.5}</style></head><body><main><h1>${title}</h1><p>${line}</p></main></body></html>`;
  return new NextResponse(body, { status, headers: { ...BASE_HEADERS, 'Content-Security-Policy': "default-src 'none'; style-src 'unsafe-inline'" } });
}

export async function GET(
  _request: NextRequest,
  { params }: { params: { linkId: string } }
) {
  const linkId = params.linkId;
  if (!/^[a-z0-9]{6,20}$/i.test(linkId)) {
    return miniPage('Not found', 'This activity link does not exist.', 404);
  }

  const row = await prisma.activityPlayLink.findUnique({
    where: { linkId },
    select: { id: true, status: true, activityId: true, locale: true, title: true },
  });

  if (!row || row.status !== 'live') {
    return miniPage('Not found', 'This activity link does not exist.', 404);
  }

  const activity = await resolveActivityById(row.activityId);
  if (!activity) {
    // The activity was retired from the manifest — no player to serve.
    return miniPage('Not found', 'This activity is no longer available.', 404);
  }

  const src =
    `/mini-tools/${activity.tool}.html?v=${ACTIVITY_WRAPPER_VERSION}` +
    `&activity=${encodeURIComponent(row.activityId)}` +
    `&lang=${encodeURIComponent(row.locale)}` +
    `&embed=1`;

  const safeTitle = (row.title || activity.page_title[row.locale] || 'Activity')
    .replace(/[<>&"]/g, (c) => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '&quot;' }[c] as string));

  // Fire-and-forget view counter.
  prisma.activityPlayLink
    .update({ where: { id: row.id }, data: { viewCount: { increment: 1 } } })
    .catch(() => {});

  const html = `<!DOCTYPE html><html lang="${row.locale}"><head><meta charset="utf-8"><meta name="robots" content="noindex, nofollow"><meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover"><title>${safeTitle}</title><style>html,body{margin:0;padding:0;height:100%;background:#FBF3E4}iframe{display:block;border:0;width:100%;height:100%}</style></head><body><iframe src="${src}" title="${safeTitle}" allow="autoplay; clipboard-write" allowfullscreen></iframe></body></html>`;

  return new NextResponse(html, { status: 200, headers: BASE_HEADERS });
}
