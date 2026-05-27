/**
 * Sitemap shard 1 — deck pages partition B, image-namespace enriched.
 *
 * Phase 4 SEO-thumbnail commission (2026-05-19): mirrors shard 0 with partition=1.
 * See app/sitemap/0.xml/route.ts for full documentation.
 */

import { NextResponse } from 'next/server';
import { getTranslations } from 'next-intl/server';
import { prisma } from '@/lib/prisma';
import { getHreflangCode } from '@/lib/schema-generator';
import { buildDeckRichAlt } from '@/lib/deck-seo';

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
}

async function buildShard(decks: ReadonlyArray<DeckRow>, partition: number): Promise<string> {
  // Per-locale alt-text translator cache. See app/sitemap/0.xml/route.ts
  // for full rationale (alt-text SEO commission 2026-05-27 Dimension 1).
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
    const hreflangCode = getHreflangCode(d.language);

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
      thumbnailCaption = titleLocalized;
    }

    urls.push([
      '<url>',
      `  <loc>${xmlEscape(deckUrl)}</loc>`,
      `  <xhtml:link rel="alternate" hreflang="${xmlEscape(hreflangCode)}" href="${xmlEscape(deckUrl)}" />`,
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
      },
    });
    const xml = await buildShard(decks, 1);
    return new NextResponse(xml, {
      status: 200,
      headers: {
        'Content-Type': 'application/xml; charset=UTF-8',
        'Cache-Control': 'public, max-age=1800, s-maxage=1800',
      },
    });
  } catch (err) {
    const msg = (err as Error).message;
    console.warn(`[sitemap shard 1] DB unreachable; emitting empty:`, msg);
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

// Internal helper buildShard intentionally not exported per Next.js route
// export constraints. See app/sitemap/0.xml/route.ts for the rationale.
