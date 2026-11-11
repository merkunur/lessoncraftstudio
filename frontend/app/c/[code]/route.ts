import { NextRequest, NextResponse } from 'next/server';
import { classResultsEnabled } from '@/lib/class-results/http';
import { CODE_RE } from '@/lib/class-results/store';
import { childPageHtml, CHILD_PAGE_HEADERS } from '@/lib/class-results/child-page';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

/**
 * GET /c/<code> — a teacher's class link: the page the children open (Daily Teaching System, Part 9.3).
 *
 * The same static document for every class (lib/class-results/child-page.ts); it reads its code from its own
 * address and asks /api/class/* for the class. No database read here, no cookie, no analytics.
 *
 * Headers (child-page.ts CHILD_PAGE_HEADERS): noindex + nofollow, no-store, Referrer-Policy no-referrer — the
 * class code must not travel on as a referrer. The middleware matcher carves `c/` out (frontend/middleware.ts),
 * so the intl middleware never rewrites this address into the locale tree.
 *
 * With the switch off (CLASS_RESULTS_ENABLED ≠ 1), or for an address that is not a class code, a plain 404.
 */
const NOT_FOUND = '<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="robots" content="noindex, nofollow"><title>Not found</title></head><body></body></html>';

export async function GET(_request: NextRequest, { params }: { params: { code: string } }) {
  if (!classResultsEnabled() || !CODE_RE.test(params.code)) {
    return new NextResponse(NOT_FOUND, { status: 404, headers: CHILD_PAGE_HEADERS });
  }
  return new NextResponse(childPageHtml(), { status: 200, headers: CHILD_PAGE_HEADERS });
}
