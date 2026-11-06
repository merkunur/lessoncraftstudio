/**
 * Sitemap shard 10 — the new worksheet makers' landing pages, with every language alternate and their images: the share
 * image first, then every template's preview, so Google can find all of them (CLAUDE.md §17.8.19). A custom route like
 * shards 0, 1 and 4-7, because MetadataRoute.Sitemap cannot carry <image:image> entries. Content-file driven; no DB.
 */
import { NextResponse } from 'next/server';
import { CANONICAL_HOST } from '@/lib/seo/url';
import { getTemplateFile, hreflangForLanding, listLandingEntries, ogUrl, previewUrl, templatesIn, getCopyFile } from '@/lib/makers/landings';

export const revalidate = 1800;

const xml = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const LASTMOD = new Date(process.env.BUILD_DATE || '2026-11-06').toISOString();

export async function GET() {
  const entries = await listLandingEntries();
  const parts: string[] = [];
  for (const { id, locale, slug } of entries) {
    const [alternates, copy, titles] = await Promise.all([hreflangForLanding(id, CANONICAL_HOST), getCopyFile(locale), getTemplateFile(locale)]);
    const links = Object.entries(alternates).map(([lang, href]) => `    <xhtml:link rel="alternate" hreflang="${xml(lang)}" href="${xml(href)}"/>`);
    const images = [`    <image:image><image:loc>${CANONICAL_HOST}${ogUrl(id, locale)}</image:loc><image:title>${xml(copy![id].kw)}</image:title></image:image>`];
    for (const t of templatesIn(id, locale)) {
      const title = titles?.[id]?.[t.id]?.[0] ?? '';
      images.push(`    <image:image><image:loc>${xml(`${CANONICAL_HOST}${previewUrl(id, locale, t.id)}`)}</image:loc><image:title>${xml(title)}</image:title></image:image>`);
    }
    parts.push(`  <url>\n    <loc>${CANONICAL_HOST}/${locale}/worksheet-makers/${xml(slug)}</loc>\n    <lastmod>${LASTMOD}</lastmod>\n${links.join('\n')}\n${images.join('\n')}\n  </url>`);
  }
  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${parts.join('\n')}
</urlset>`;
  return new NextResponse(body, { headers: { 'Content-Type': 'application/xml; charset=UTF-8', 'Cache-Control': 'public, max-age=3600, s-maxage=3600' } });
}
