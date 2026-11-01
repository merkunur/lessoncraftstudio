import { NextRequest, NextResponse } from 'next/server';
import { presetForDeck } from '@/lib/makers/link-store';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

/**
 * GET /api/makers/preset/[deckId] — a published deck's maker preset ("Make your own", ARCHITECTURE §13 step 3).
 * { maker, lang, template, level, theme, unit, variant, deckId, title } — the maker screen (?preset=<deckId>) opens
 * its first page on exactly those settings. Public (the deck is); edge-cached 1 h. 404 until task 3 backs the store.
 */
export async function GET(_request: NextRequest, { params }: { params: { deckId: string } }) {
  const deckId = params.deckId;
  if (!/^[A-Za-z0-9_-]{1,80}$/.test(deckId)) return NextResponse.json({ error: 'not_found' }, { status: 404, headers: { 'Cache-Control': 'no-store' } });
  const p = await presetForDeck(deckId);
  if (!p) return NextResponse.json({ error: 'not_found' }, { status: 404, headers: { 'Cache-Control': 'no-store' } });
  return NextResponse.json(p, { status: 200, headers: { 'Cache-Control': 'public, max-age=0, s-maxage=3600', 'X-Robots-Tag': 'noindex' } });
}
