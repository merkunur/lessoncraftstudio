import { NextResponse } from 'next/server';

const baseUrl = 'https://www.lessoncraftstudio.com';

/**
 * Image sitemap index — points to sub-sitemaps for app and tool detail pages.
 * Only IDs 1 (apps) and 3 (tools) have showcase images worth indexing.
 */
export async function GET() {
  const ids = [1, 3]; // apps, tools — the page types with sample images

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${ids.map(id => `  <sitemap>
    <loc>${baseUrl}/image-sitemap/${id}</loc>
  </sitemap>`).join('\n')}
</sitemapindex>`;

  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}
