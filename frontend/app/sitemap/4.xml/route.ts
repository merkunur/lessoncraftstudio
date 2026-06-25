/**
 * Sitemap shard 4 — tier-3 deck-landing pages, image-namespace enriched.
 *
 * SEO Recovery 2026-06-25 (P1): when the canonical moved deck→landing, the
 * ~32k landing-having decks left shards 0/1 — which is where their og-image +
 * thumbnail <image:image> entries lived (§17.8.19 image-search channel). The
 * landing is now the CANONICAL surface for that worksheet, but the Next.js
 * MetadataRoute shard 4 (in app/sitemap.ts) cannot carry <image:image>, so those
 * worksheets lost their image-sitemap signal. This custom route replaces the
 * MetadataRoute shard 4: same landing URLs + same coordinate-based hreflang, PLUS
 * the og-image + thumbnail image entries (sourced from the landing's
 * canonicalDeckSlug deck dir, the image the landing actually displays).
 *
 * generateSitemaps() in app/sitemap.ts no longer lists id 4 (returns [2,3]) so
 * Next does not also generate /sitemap/4.xml — this route owns it (the exact
 * precedent shards 0/1 follow). Reversible: restore id 4 in generateSitemaps +
 * delete this file to fall back to the MetadataRoute (image-less) shard.
 */

import { NextResponse } from 'next/server';

export const revalidate = 1800;

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

export async function GET() {
  try {
    const { getLandingLocales, getAllLandings, getSiblingLandingsByCoordinate, deckAssets } = await import(
      '@/lib/seo/landing-content'
    );
    const { buildHreflangAlternates } = await import('@/lib/seo/hreflang');

    const landingLocales = getLandingLocales();
    const urls: string[] = [];

    for (const locale of landingLocales) {
      for (const l of getAllLandings(locale)) {
        const landingUrl = `${BASE_URL}/${locale}/worksheets/${l.slug}`;

        // Coordinate-based hreflang — byte-identical to the prior MetadataRoute
        // shard 4 (siblings on (type, mode, theme); pt→pt-BR; x-default→en).
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

        // Image entries: the landing's canonical deck dir (the image it displays).
        const a = deckAssets(locale, l.canonicalDeckSlug);
        const ogImageUrl = `${a.deckDir}og-image.png`;
        const thumbnailUrl = a.thumbnail; // <dir>thumbnail.png
        const title = l.title || l.h1 || '';
        const caption = l.metaDescription || '';

        urls.push(
          [
            '<url>',
            `  <loc>${xmlEscape(landingUrl)}</loc>`,
            ...hreflangLinks,
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
    console.warn('[sitemap shard 4] landings failed; emitting empty:', (err as Error).message);
    return new NextResponse(EMPTY_URLSET, {
      status: 200,
      headers: { 'Content-Type': 'application/xml; charset=UTF-8' },
    });
  }
}
