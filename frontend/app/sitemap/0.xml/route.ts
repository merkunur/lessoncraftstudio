/**
 * Sitemap shard 0 — deck pages partition A, image-namespace enriched.
 *
 * Phase 4 SEO-thumbnail commission (2026-05-19): replaces Next.js's auto-
 * generated `/sitemap/0.xml` (from frontend/app/sitemap.ts shard 0) with a
 * custom route handler that emits per-URL `<image:image>` entries inline.
 * Next.js 14.2.18's MetadataRoute.Sitemap type does NOT support image entries,
 * so we bypass the Next.js sitemap convention for the deck shards.
 *
 * Per Google's image sitemap protocol
 * (https://developers.google.com/search/docs/crawling-indexing/sitemaps/image-sitemaps):
 *   <urlset xmlns="..." xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
 *     <url>
 *       <loc>...</loc>
 *       <image:image>
 *         <image:loc>...</image:loc>
 *         <image:title>...</image:title>
 *         <image:caption>...</image:caption>
 *       </image:image>
 *     </url>
 *   </urlset>
 *
 * Two image entries per deck: og-image.png (1200×630 composite) + thumbnail.png
 * (480×620 raw worksheet preview). Captions sourced from Deck.description JSON.
 *
 * Hash-partition: last-char ASCII parity per CLAUDE.md §17.10.1 / sitemap.ts.
 */

import { NextResponse } from 'next/server';
import { getTranslations } from 'next-intl/server';
import { prisma } from '@/lib/prisma';
import { buildDeckRichAlt } from '@/lib/deck-seo';
import { buildDeckHreflangLinks, type SitemapSibling } from '@/lib/seo/deck-sitemap-hreflang';

export const revalidate = 1800;

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.lessoncraftstudio.com';

function partitionMatches(deckId: string, partition: number): boolean {
  return deckId.charCodeAt(deckId.length - 1) % 2 === partition;
}

function xmlEscape(s: string | null | undefined): string {
  return String(s ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function pickLocale<T = string>(obj: unknown, locale: string): T | null {
  if (!obj || typeof obj !== 'object') return null;
  const j = obj as Record<string, T>;
  return j[locale] ?? j['en'] ?? null;
}

interface DeckRow {
  id: string;
  language: string;
  slug: string;
  updatedAt: Date;
  title: unknown;
  description: unknown;
  exerciseType: string;
  ageRange: string;
  subjectTags: string[];
  contentFamilyId: string | null;
}

async function buildShard(decks: ReadonlyArray<DeckRow>, partition: number): Promise<string> {
  // P1-05: group ALL decks (both partitions) by contentFamilyId so a deck in
  // this shard can emit the full cross-locale sibling set even when a sibling
  // lives in the other shard. Single-locale decks (null cfId) are skipped here
  // and fall back to a self-only alternate.
  const familyMap = new Map<string, SitemapSibling[]>();
  for (const d of decks) {
    if (!d.contentFamilyId) continue;
    const arr = familyMap.get(d.contentFamilyId) ?? [];
    arr.push({ language: d.language, slug: d.slug });
    familyMap.set(d.contentFamilyId, arr);
  }

  // Per-locale alt-text translator cache. Each deck's <image:caption> is
  // composed in the deck's own content language (per pickLocale invariant).
  const tAltByLocale = new Map<string, (key: string, params: Record<string, string>) => string>();
  async function altT(locale: string) {
    let t = tAltByLocale.get(locale);
    if (!t) {
      const translator = await getTranslations({ locale, namespace: 'seo.deckCardAlt' });
      t = (key, params) => translator(key, params);
      tAltByLocale.set(locale, t);
    }
    return t;
  }

  const urls: string[] = [];
  for (const d of decks) {
    if (!partitionMatches(d.id, partition)) continue;
    const deckUrl = `${BASE_URL}/${d.language}/decks/${d.slug}/`;
    const ogImageUrl = `${deckUrl}og-image.png`;
    const thumbnailUrl = `${deckUrl}thumbnail.png`;
    const titleLocalized = pickLocale<string>(d.title, d.language) ?? '';
    const descLocalized = pickLocale<string>(d.description, d.language) ?? '';

    // Compose rich thumbnail caption per alt-text SEO commission 2026-05-27.
    // Per CLAUDE.md §A.13.X Dimension 1: thumbnail.png block must carry
    // <image:caption> matching deck-card alt shape. og-image keeps the
    // existing description-based caption (richer SEO-description shape).
    let thumbnailCaption = '';
    try {
      const t = await altT(d.language);
      thumbnailCaption = buildDeckRichAlt(
        {
          exerciseType: d.exerciseType,
          subjectTags: d.subjectTags,
          ageRange: d.ageRange,
          title: titleLocalized,
        },
        d.language,
        t,
      );
    } catch {
      // Substrate-honesty per §16.6.1: fall back to bare title; never emit
      // a half-composed caption.
      thumbnailCaption = titleLocalized;
    }

    const siblings = d.contentFamilyId ? familyMap.get(d.contentFamilyId) : undefined;
    const hreflangLinks = buildDeckHreflangLinks(
      { language: d.language, slug: d.slug },
      siblings ?? [{ language: d.language, slug: d.slug }],
      BASE_URL,
      xmlEscape,
    );

    urls.push([
      '<url>',
      `  <loc>${xmlEscape(deckUrl)}</loc>`,
      ...hreflangLinks,
      `  <lastmod>${d.updatedAt.toISOString()}</lastmod>`,
      '  <changefreq>weekly</changefreq>',
      '  <priority>0.7</priority>',
      '  <image:image>',
      `    <image:loc>${xmlEscape(ogImageUrl)}</image:loc>`,
      titleLocalized ? `    <image:title>${xmlEscape(titleLocalized)}</image:title>` : '',
      descLocalized ? `    <image:caption>${xmlEscape(descLocalized)}</image:caption>` : '',
      '  </image:image>',
      '  <image:image>',
      `    <image:loc>${xmlEscape(thumbnailUrl)}</image:loc>`,
      titleLocalized ? `    <image:title>${xmlEscape(titleLocalized)}</image:title>` : '',
      thumbnailCaption ? `    <image:caption>${xmlEscape(thumbnailCaption)}</image:caption>` : '',
      '  </image:image>',
      '</url>',
    ].filter(Boolean).join('\n'));
  }
  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"',
    '        xmlns:xhtml="http://www.w3.org/1999/xhtml"',
    '        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">',
    urls.join('\n'),
    '</urlset>',
  ].join('\n');
}

export async function GET() {
  try {
    const decks = await prisma.deck.findMany({
      where: { status: 'published' },
      select: {
        id: true,
        language: true,
        slug: true,
        updatedAt: true,
        title: true,
        description: true,
        exerciseType: true,
        ageRange: true,
        subjectTags: true,
        contentFamilyId: true,
      },
    });
    const xml = await buildShard(decks, 0);
    return new NextResponse(xml, {
      status: 200,
      headers: {
        'Content-Type': 'application/xml; charset=UTF-8',
        'Cache-Control': 'public, max-age=1800, s-maxage=1800',
      },
    });
  } catch (err) {
    const msg = (err as Error).message;
    console.warn(`[sitemap shard 0] DB unreachable; emitting empty:`, msg);
    const xml = [
      '<?xml version="1.0" encoding="UTF-8"?>',
      '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"',
      '        xmlns:xhtml="http://www.w3.org/1999/xhtml"',
      '        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">',
      '</urlset>',
    ].join('\n');
    return new NextResponse(xml, {
      status: 200,
      headers: { 'Content-Type': 'application/xml; charset=UTF-8' },
    });
  }
}

// Internal helper buildShard intentionally not exported — Next.js route files
// only allow specific exports (GET, POST, revalidate, etc.). For testing,
// import the module via require + access the symbol differently.
