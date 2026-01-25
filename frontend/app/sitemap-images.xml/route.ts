import { productPageSlugs } from '@/config/product-page-slugs';
import { contentRegistry } from '@/config/product-page-content';
import { prisma } from '@/lib/prisma';

export const revalidate = 1800; // 30 minutes ISR
export const dynamic = 'force-dynamic';

// Type for SEO metadata from database
interface SampleSeoMeta {
  altText?: string | null;
  title?: string | null;
  description?: string | null;
}

function escapeXml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://www.lessoncraftstudio.com';

  // Fetch SEO metadata from database
  const seoMetaMap = new Map<string, SampleSeoMeta>();
  try {
    const samples = await prisma.productSample.findMany({
      select: {
        appId: true,
        locale: true,
        filename: true,
        altText: true,
        title: true,
        description: true,
      }
    });

    for (const sample of samples) {
      // Key format: appId:locale:filename
      const key = `${sample.appId}:${sample.locale}:${sample.filename}`;
      seoMetaMap.set(key, {
        altText: sample.altText,
        title: sample.title,
        description: sample.description,
      });
    }
  } catch (error) {
    console.warn('[IMAGE-SITEMAP] Could not fetch SEO metadata from database, using defaults');
  }

  let urls = '';

  for (const app of productPageSlugs) {
    for (const [locale, slug] of Object.entries(app.slugs)) {
      if (!slug) continue;

      const pageUrl = `${baseUrl}/${locale}/apps/${slug}`;

      // Look up content from the registry for real filenames + metadata
      const content = contentRegistry[locale]?.[slug];
      const sampleItems = content?.samples?.items;

      if (sampleItems && sampleItems.length > 0) {
        // Generate image entries from actual content data
        const imageXml = sampleItems
          .map((item: any) => {
            const lines: string[] = [];

            // Worksheet image
            if (item.worksheetSrc) {
              const wsUrl = `${baseUrl}${item.worksheetSrc.replace(/ /g, '%20')}`;

              // Try to get SEO metadata from database first
              // Extract filename from worksheetSrc (e.g., /samples/english/addition/sample-1.jpeg -> sample-1.jpeg)
              const wsFilename = item.worksheetSrc.split('/').pop() || '';
              const seoKey = `${app.appId}:${locale}:${wsFilename}`;
              const seoMeta = seoMetaMap.get(seoKey);

              // Use database metadata if available, otherwise fall back to content registry
              const wsTitle = seoMeta?.title || item.imageTitle || item.altText?.split(' - ')[0] || '';
              const wsCaption = seoMeta?.description || seoMeta?.altText || item.altText || '';

              lines.push(`    <image:image>`);
              lines.push(`      <image:loc>${escapeXml(wsUrl)}</image:loc>`);
              if (wsTitle) lines.push(`      <image:title>${escapeXml(wsTitle)}</image:title>`);
              if (wsCaption) lines.push(`      <image:caption>${escapeXml(wsCaption)}</image:caption>`);
              lines.push(`    </image:image>`);
            }

            // Answer key image
            if (item.answerKeySrc && item.answerKeySrc !== item.worksheetSrc) {
              const akUrl = `${baseUrl}${item.answerKeySrc.replace(/ /g, '%20')}`;

              // Extract filename for answer key
              const akFilename = item.answerKeySrc.split('/').pop() || '';
              const akSeoKey = `${app.appId}:${locale}:${akFilename}`;
              const akSeoMeta = seoMetaMap.get(akSeoKey);

              const akTitle = akSeoMeta?.title
                ? `${akSeoMeta.title} - Answer Key`
                : item.imageTitle
                ? `${item.imageTitle} - Answer Key`
                : 'Answer Key';
              const akCaption = akSeoMeta?.description || akSeoMeta?.altText || (item.altText
                ? `Answer key for ${item.altText.split(' - ')[0] || 'worksheet'}`
                : 'Answer key');

              lines.push(`    <image:image>`);
              lines.push(`      <image:loc>${escapeXml(akUrl)}</image:loc>`);
              if (akTitle) lines.push(`      <image:title>${escapeXml(akTitle)}</image:title>`);
              if (akCaption) lines.push(`      <image:caption>${escapeXml(akCaption)}</image:caption>`);
              lines.push(`    </image:image>`);
            }

            return lines.join('\n');
          })
          .filter((xml: string) => xml.length > 0)
          .join('\n');

        if (imageXml) {
          urls += `  <url>\n    <loc>${escapeXml(pageUrl)}</loc>\n${imageXml}\n  </url>\n`;
        }
      }
      // No fallback: skip pages without content registry entries to avoid broken URLs
    }
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${urls}</urlset>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=UTF-8',
      'Cache-Control': 'public, max-age=1800, s-maxage=1800',
    },
  });
}
