import { NextResponse } from 'next/server';

const baseUrl = 'https://www.lessoncraftstudio.com';

/**
 * Video sitemap index — points to sub-sitemaps for all page types with videos.
 * IDs match the main sitemap: 1=apps, 3=tools, 4=bundles, 5=starts, 6=guides, 7=ideas.
 */
export async function GET() {
  const ids = [1, 3, 4, 5, 6, 7];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${ids.map(id => `  <sitemap>
    <loc>${baseUrl}/video-sitemap/${id}</loc>
  </sitemap>`).join('\n')}
</sitemapindex>`;

  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}
