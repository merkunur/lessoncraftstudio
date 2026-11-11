import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import {
  resolveQuotaIdentity,
  checkAndIncrementQuota,
  anonCookieSetHeader,
} from '@/lib/quota';
import { canonicalDeckAssets } from '@/lib/seo/landing-content';
import { existsSync } from 'fs';
import { readFile } from 'fs/promises';
import { LEVEL_SETS_DIR } from '@/lib/level-sets';
import { teacherFilePath, checkFormPath } from '@/lib/teacher-files';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/**
 * kind=teacher (Daily Teaching System, Part 3): a Teacher-only file (lib/teacher-files.ts). Only an active
 * subscriber gets the file; everybody else, crawlers included, gets the same redirect (a visitor who is not signed
 * in → sign-up; a signed-in account without the plan → pricing). It never touches the monthly counters: the free
 * caps in lib/quota.ts are for single worksheets, and a free account cannot open these files at all. It does not
 * read METERING_ENABLED either: switching metering off must not open paid files.
 * `probe=1` answers { ok, to } as JSON, so that a page script can ask before it starts to build a bundle.
 */
async function teacherFile(request: NextRequest, loc: string, file: string, probe: boolean): Promise<NextResponse> {
  const disk = teacherFilePath(loc, file);
  if (!disk) return new NextResponse('Bad request', { status: 400 });
  if (!existsSync(disk)) return new NextResponse('Not found', { status: 404 });
  const identity = await resolveQuotaIdentity(request);
  const ok = identity.kind === 'subscriber';
  const wall = identity.kind === 'free-user' ? `/${loc}/pricing?from=teacher-file` : `/${loc}/auth/signup?from=teacher-file`;
  const headers = { 'Cache-Control': 'private, no-store', 'X-Robots-Tag': 'noindex' };
  if (probe) return NextResponse.json({ ok, to: ok ? null : wall }, { headers });
  if (!ok) return NextResponse.redirect(`https://www.lessoncraftstudio.com${wall}`, { status: 302, headers });
  const body = await readFile(disk);
  const name = file.split('/').slice(1).join('-');
  return new NextResponse(new Uint8Array(body), { status: 200, headers: { ...headers, 'Content-Type': 'application/pdf', 'Content-Length': String(body.length), 'Content-Disposition': `inline; filename="${name}.pdf"` } });
}

/**
 * kind=form (Daily Teaching System, Part 7): a student form of a unit check. A printable like any worksheet: it is
 * counted as a download, with the same counters and the same answers as a deck PDF (a visitor who is not signed in →
 * sign-up; a free account over its month → pricing; otherwise the file). The file lies outside every folder nginx
 * serves, so it is sent from here. Only check-a and check-b can be asked for (lib/teacher-files.ts: checkFormPath),
 * so an answer key can never be fetched as a form.
 */
async function checkForm(request: NextRequest, loc: string, file: string): Promise<NextResponse> {
  const disk = checkFormPath(loc, file);
  if (!disk) return new NextResponse('Bad request', { status: 400 });
  if (!existsSync(disk)) return new NextResponse('Not found', { status: 404 });
  const identity = await resolveQuotaIdentity(request);
  const result = await checkAndIncrementQuota(identity, 'download');
  let res: NextResponse;
  if (result.allowed) {
    const body = await readFile(disk);
    res = new NextResponse(new Uint8Array(body), { status: 200, headers: { 'Content-Type': 'application/pdf', 'Content-Length': String(body.length), 'Content-Disposition': `inline; filename="${file.split('/').slice(1).join('-')}.pdf"` } });
  } else {
    res = NextResponse.redirect(`https://www.lessoncraftstudio.com/${loc}/${result.reason === 'signup_required' ? 'auth/signup?from=download' : 'pricing?from=download-limit'}`, { status: 302 });
  }
  res.headers.set('Cache-Control', 'private, no-store');
  res.headers.set('X-Robots-Tag', 'noindex');
  const cookie = anonCookieSetHeader(identity);
  if (cookie) res.headers.append('Set-Cookie', cookie);
  return res;
}

/**
 * GET /api/quota/dl?loc=<locale>&slug=<deckSlug>&kind=pdf|answer
 * Slug-keyed metered download proxy for the STATIC landing pages (which know a
 * deck by (locale, canonicalDeckSlug), not its DB id). Same semantics as the
 * /api/quota/pdf/[deckId] proxy: allowed → 302 to the slug-derived nginx file;
 * anon → signup; over-quota → pricing; bots/subscribers/metering-off → pass.
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const loc = (searchParams.get('loc') || '').slice(0, 5);
    const slug = searchParams.get('slug') || '';
    const kindParam = searchParams.get('kind');
    if (kindParam === 'teacher') return await teacherFile(request, loc, searchParams.get('file') || '', searchParams.get('probe') === '1');
    if (kindParam === 'form') return await checkForm(request, loc, searchParams.get('file') || '');
    const kind = kindParam === 'answer' ? 'answerKey' : kindParam === 'record' ? 'record' : 'pdf';
    if (!loc || !slug) return new NextResponse('Bad request', { status: 400 });

    let target: string | null = null;
    if (kind === 'record') {
      // Level Sets v2 phase 2 (2026-10-15): the per-set TEACHER SHEET. `slug` is the
      // ladder code (k243 / g1245); the file is a light PDF outside the deck tree
      // (no DB row), served by nginx from /var/www/lcs-media/level-sets/. Metered
      // exactly like a PDF download below; absent file → 404, never a dead redirect.
      if (!/^(?:k|g\d)\d{3}$/.test(slug) || !/^[a-z]{2}$/.test(loc)) return new NextResponse('Bad request', { status: 400 });
      if (!existsSync(`${LEVEL_SETS_DIR}/${loc}/${slug}-teacher-sheet.pdf`)) return new NextResponse('Not found', { status: 404 });
      target = `https://www.lessoncraftstudio.com/${loc}/level-sets/${slug}-teacher-sheet.pdf`;
    } else {
      const deck = await prisma.deck.findFirst({
        where: { language: loc, slug, status: 'published' },
        select: { slug: true, language: true, answerKeyUrl: true },
      });
      if (!deck) return new NextResponse('Not found', { status: 404 });

      const assets = canonicalDeckAssets(deck);
      target = kind === 'pdf' ? assets.pdfUrl : assets.answerKeyUrl;
    }
    if (!target) return new NextResponse('Not found', { status: 404 });

    const identity = await resolveQuotaIdentity(request);
    const result = await checkAndIncrementQuota(identity, 'download');

    let res: NextResponse;
    if (result.allowed) {
      res = NextResponse.redirect(target, { status: 302 });
      res.headers.set('Cache-Control', 'no-store');
    } else if (result.reason === 'signup_required') {
      res = NextResponse.redirect(
        `https://www.lessoncraftstudio.com/${loc}/auth/signup?from=download`,
        { status: 302 }
      );
    } else {
      res = NextResponse.redirect(
        `https://www.lessoncraftstudio.com/${loc}/pricing?from=download-limit`,
        { status: 302 }
      );
    }
    const cookie = anonCookieSetHeader(identity);
    if (cookie) res.headers.append('Set-Cookie', cookie);
    return res;
  } catch (e) {
    console.error('quota dl proxy error:', e);
    return NextResponse.redirect('https://www.lessoncraftstudio.com/', { status: 302 });
  }
}
