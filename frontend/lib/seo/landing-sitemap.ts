/**
 * Shared landing-page sitemap-shard builder (image + hreflang enriched).
 *
 * SITEMAP FIX 2026-06-26: the single shard 4 emitted ALL ~30k landing URLs ×
 * 11 locales in one file = 66.7 MB, over Google's 50 MB/file cap → Google
 * rejected it. This helper carries the EXACT prior shard-4 logic but adds a
 * deterministic partition so the landings split across N shards (4..7), each
 * ~16 MB. Each landing maps to exactly one shard via a stable hash of
 * `locale/slug` (so a URL never jumps shards between crawls); each URL keeps
 * its full hreflang block (Google reads alternates per-URL, shard-independent)
 * + its 2 <image:image> entries. Routes app/sitemap/{4,5,6,7}.xml call this
 * with (0,4)..(3,4). Reversible: point 4.xml back to (0,1) and drop 5-7 +
 * restore SITEMAP_SHARD_IDS.
 */
import { NextResponse } from 'next/server';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.lessoncraftstudio.com';

const EMPTY_URLSET = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"',
  '        xmlns:xhtml="http://www.w3.org/1999/xhtml"',
  '        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">',
  '</urlset>',
].join('\n');

function xmlEscape(s: string | null | undefined): string {
  return String(s ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

/** Stable djb2 hash → non-negative int. Same input always → same shard. */
function shardOf(key: string, partCount: number): number {
  let h = 5381;
  for (let i = 0; i < key.length; i++) h = ((h << 5) + h + key.charCodeAt(i)) | 0;
  return ((h % partCount) + partCount) % partCount;
}

/**
 * Build one landing-sitemap shard (partIndex of partCount). Byte-for-byte the
 * same per-URL output as the original single shard 4 — only the membership
 * filter is new. Returns a 200 XML NextResponse (or an empty urlset on error,
 * matching the original fail-soft behaviour).
 */
export async function landingShardXml(partIndex: number, partCount: number): Promise<NextResponse> {
  try {
    const { getLandingLocales, getAllLandings, getSiblingLandingsByCoordinate, deckAssets, getLandingAugment } = await import(
      '@/lib/seo/landing-content'
    );
    const { buildHreflangAlternates } = await import('@/lib/seo/hreflang');

    const landingLocales = getLandingLocales();
    const urls: string[] = [];

    for (const locale of landingLocales) {
      const augment = getLandingAugment(locale);
      for (const l of getAllLandings(locale)) {
        // Partition: each landing lands in exactly one shard (stable hash).
        if (shardOf(`${locale}/${l.slug}`, partCount) !== partIndex) continue;

        const landingUrl = `${BASE_URL}/${locale}/worksheets/${l.slug}`;

        const slugByLocale: Record<string, string> = { [locale]: l.slug };
        for (const s of getSiblingLandingsByCoordinate(l.coordinate, locale)) slugByLocale[s.locale] = s.slug;
        const languages = buildHreflangAlternates(
          landingLocales,
          (loc) => (slugByLocale[loc] ? `${BASE_URL}/${loc}/worksheets/${slugByLocale[loc]}` : null),
          BASE_URL,
        );
        const hreflangLinks = Object.entries(languages).map(
          ([code, href]) => `  <xhtml:link rel="alternate" hreflang="${xmlEscape(code)}" href="${xmlEscape(href)}"/>`,
        );

        const a = deckAssets(locale, l.canonicalDeckSlug);
        const ogImageUrl = `${a.deckDir}og-image.png`;
        const thumbnailUrl = a.thumbnail;
        const title = l.title || l.h1 || '';
        const caption = l.metaDescription || '';

        urls.push(
          [
            '<url>',
            `  <loc>${xmlEscape(landingUrl)}</loc>`,
            ...hreflangLinks,
            // Honest lastmod from the deck's real generation date (matches the
            // on-page updated line + JSON-LD dateModified); omitted when the
            // augment file is absent.
            (() => {
              const cd = augment?.[l.slug]?.contentDate;
              return cd && /^\d{4}-\d{2}-\d{2}$/.test(cd) ? `  <lastmod>${cd}</lastmod>` : '';
            })(),
            '  <changefreq>monthly</changefreq>',
            '  <priority>0.6</priority>',
            '  <image:image>',
            `    <image:loc>${xmlEscape(ogImageUrl)}</image:loc>`,
            title ? `    <image:title>${xmlEscape(title)}</image:title>` : '',
            caption ? `    <image:caption>${xmlEscape(caption)}</image:caption>` : '',
            '  </image:image>',
            '  <image:image>',
            `    <image:loc>${xmlEscape(thumbnailUrl)}</image:loc>`,
            title ? `    <image:title>${xmlEscape(title)}</image:title>` : '',
            caption ? `    <image:caption>${xmlEscape(caption)}</image:caption>` : '',
            '  </image:image>',
            '</url>',
          ]
            .filter(Boolean)
            .join('\n'),
        );
      }
    }

    const xml = [
      '<?xml version="1.0" encoding="UTF-8"?>',
      '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"',
      '        xmlns:xhtml="http://www.w3.org/1999/xhtml"',
      '        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">',
      urls.join('\n'),
      '</urlset>',
    ].join('\n');

    return new NextResponse(xml, {
      status: 200,
      headers: {
        'Content-Type': 'application/xml; charset=UTF-8',
        'Cache-Control': 'public, max-age=1800, s-maxage=1800',
      },
    });
  } catch (err) {
    console.warn(`[sitemap landing shard ${partIndex}/${partCount}] failed; emitting empty:`, (err as Error).message);
    return new NextResponse(EMPTY_URLSET, {
      status: 200,
      headers: { 'Content-Type': 'application/xml; charset=UTF-8' },
    });
  }
}
