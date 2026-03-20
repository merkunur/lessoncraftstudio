import { NextRequest, NextResponse } from 'next/server';
import { productPageSlugs } from '@/config/product-page-slugs';
import { toolPageSlugs } from '@/config/tool-page-slugs';
import { getAppImageEntries } from '@/lib/image-sitemap-data';

const baseUrl = 'https://www.lessoncraftstudio.com';

// Locales that have showcase images
const imageLocales = ['en', 'de', 'fr', 'es', 'pt', 'it'];

function escapeXml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export async function GET(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = parseInt(params.id, 10);

  let urlEntries: string[] = [];

  // ID 1: App detail pages
  if (id === 1) {
    for (const app of productPageSlugs) {
      for (const locale of imageLocales) {
        const slug = app.slugs[locale as keyof typeof app.slugs];
        if (!slug) continue;

        const images = getAppImageEntries(app.appId, locale);
        if (images.length === 0) continue;

        const imageXml = images.map(img =>
          `    <image:image>
      <image:loc>${escapeXml(img.loc)}</image:loc>
      <image:title>${escapeXml(img.title)}</image:title>
      <image:caption>${escapeXml(img.caption)}</image:caption>
      <image:license>${escapeXml(img.license)}</image:license>
    </image:image>`
        ).join('\n');

        urlEntries.push(
          `  <url>
    <loc>${baseUrl}/${locale}/apps/${slug}</loc>
${imageXml}
  </url>`
        );
      }
    }
  }

  // ID 3: Tool pages (same apps, different URL prefix)
  if (id === 3) {
    for (const tool of toolPageSlugs) {
      for (const locale of imageLocales) {
        const slug = tool.slugs[locale as keyof typeof tool.slugs];
        if (!slug) continue;

        // Tool IDs match app IDs for image lookup
        const images = getAppImageEntries(tool.toolId, locale);
        if (images.length === 0) continue;

        const imageXml = images.map(img =>
          `    <image:image>
      <image:loc>${escapeXml(img.loc)}</image:loc>
      <image:title>${escapeXml(img.title)}</image:title>
      <image:caption>${escapeXml(img.caption)}</image:caption>
      <image:license>${escapeXml(img.license)}</image:license>
    </image:image>`
        ).join('\n');

        urlEntries.push(
          `  <url>
    <loc>${baseUrl}/${locale}/tools/${slug}</loc>
${imageXml}
  </url>`
        );
      }
    }
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${urlEntries.join('\n')}
</urlset>`;

  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}
