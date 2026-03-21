import { NextRequest, NextResponse } from 'next/server';
import { productPageSlugs } from '@/config/product-page-slugs';
import { toolPageSlugs } from '@/config/tool-page-slugs';
import { bundlePageSlugs } from '@/config/bundle-page-slugs';
import { startPageSlugs } from '@/config/start-page-slugs';
import { guidePageSlugs } from '@/config/guide-page-slugs';
import { ideaPageSlugs } from '@/config/idea-page-slugs';
import { SUPPORTED_LOCALES } from '@/config/locales';
import {
  getAppImageEntries,
  getToolImageEntries,
  getBundleImageEntries,
  getStartImageEntries,
  getGuideImageEntries,
  getIdeaImageEntries,
  type ImageSitemapEntry,
} from '@/lib/image-sitemap-data';

const baseUrl = 'https://www.lessoncraftstudio.com';
const allLocales = [...SUPPORTED_LOCALES];

function escapeXml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function buildImageXml(images: ImageSitemapEntry[]): string {
  return images.map(img =>
    `    <image:image>
      <image:loc>${escapeXml(img.loc)}</image:loc>
      <image:title>${escapeXml(img.title)}</image:title>
      <image:caption>${escapeXml(img.caption)}</image:caption>
      <image:license>${escapeXml(img.license)}</image:license>
    </image:image>`
  ).join('\n');
}

export async function GET(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = parseInt(params.id, 10);
  const urlEntries: string[] = [];

  // ID 1: App detail pages (33 apps × 11 locales)
  if (id === 1) {
    for (const app of productPageSlugs) {
      for (const locale of allLocales) {
        const slug = app.slugs[locale as keyof typeof app.slugs];
        if (!slug) continue;
        const images = await getAppImageEntries(app.appId, locale);
        if (images.length === 0) continue;
        urlEntries.push(
          `  <url>\n    <loc>${baseUrl}/${locale}/apps/${slug}</loc>\n${buildImageXml(images)}\n  </url>`
        );
      }
    }
  }

  // ID 3: Tool pages (33 tools × 11 locales)
  if (id === 3) {
    for (const tool of toolPageSlugs) {
      for (const locale of allLocales) {
        const slug = tool.slugs[locale as keyof typeof tool.slugs];
        if (!slug) continue;
        const images = await getToolImageEntries(tool.toolId, locale);
        if (images.length === 0) continue;
        urlEntries.push(
          `  <url>\n    <loc>${baseUrl}/${locale}/tools/${slug}</loc>\n${buildImageXml(images)}\n  </url>`
        );
      }
    }
  }

  // ID 4: Bundle pages (6 bundles × 11 locales)
  if (id === 4) {
    for (const bundle of bundlePageSlugs) {
      for (const locale of allLocales) {
        const slug = bundle.slugs[locale as keyof typeof bundle.slugs];
        if (!slug) continue;
        const images = await getBundleImageEntries(bundle.bundleId, locale);
        if (images.length === 0) continue;
        urlEntries.push(
          `  <url>\n    <loc>${baseUrl}/${locale}/bundles/${slug}</loc>\n${buildImageXml(images)}\n  </url>`
        );
      }
    }
  }

  // ID 5: Start pages (cornerstone guides × 11 locales)
  if (id === 5) {
    for (const start of startPageSlugs) {
      for (const locale of allLocales) {
        const slug = start.slugs[locale as keyof typeof start.slugs];
        if (!slug) continue;
        const images = await getStartImageEntries(start.startId, locale);
        if (images.length === 0) continue;
        urlEntries.push(
          `  <url>\n    <loc>${baseUrl}/${locale}/start/${slug}</loc>\n${buildImageXml(images)}\n  </url>`
        );
      }
    }
  }

  // ID 6: Guide pages (how-to guides × 11 locales)
  if (id === 6) {
    for (const guide of guidePageSlugs) {
      for (const locale of allLocales) {
        const slug = guide.slugs[locale as keyof typeof guide.slugs];
        if (!slug) continue;
        const images = await getGuideImageEntries(guide.guideId, locale);
        if (images.length === 0) continue;
        urlEntries.push(
          `  <url>\n    <loc>${baseUrl}/${locale}/guides/${slug}</loc>\n${buildImageXml(images)}\n  </url>`
        );
      }
    }
  }

  // ID 7: Idea pages (niche ideas × 11 locales)
  if (id === 7) {
    for (const idea of ideaPageSlugs) {
      for (const locale of allLocales) {
        const slug = idea.slugs[locale as keyof typeof idea.slugs];
        if (!slug) continue;
        const images = await getIdeaImageEntries(idea.ideaId, locale);
        if (images.length === 0) continue;
        urlEntries.push(
          `  <url>\n    <loc>${baseUrl}/${locale}/ideas/${slug}</loc>\n${buildImageXml(images)}\n  </url>`
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
