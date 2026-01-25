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
  updatedAt?: Date | null;
}

// App ID to display name mapping for improved fallbacks
const appIdToDisplayName: Record<string, string> = {
  'addition': 'Addition',
  'subtraction': 'Subtraction',
  'math-worksheet': 'Math',
  'pattern-worksheet': 'Pattern Recognition',
  'wordsearch': 'Word Search',
  'word-scramble': 'Word Scramble',
  'word-guess': 'Word Guess',
  'alphabet-train': 'Alphabet Train',
  'prepositions': 'Prepositions',
  'bingo': 'Bingo',
  'coloring': 'Coloring',
  'sudoku': 'Sudoku',
  'treasure-hunt': 'Treasure Hunt',
  'odd-one-out': 'Odd One Out',
  'picture-path': 'Picture Path',
  'pattern-train': 'Pattern Train',
  'crossword': 'Crossword',
  'cryptogram': 'Cryptogram',
  'draw-and-color': 'Draw and Color',
  'drawing-lines': 'Drawing Lines',
  'find-and-count': 'Find and Count',
  'find-objects': 'Find Objects',
  'grid-match': 'Grid Match',
  'matching': 'Matching',
  'math-puzzle': 'Math Puzzle',
  'missing-pieces': 'Missing Pieces',
  'more-less': 'More or Less',
  'picture-sort': 'Picture Sort',
  'shadow-match': 'Shadow Match',
  'writing': 'Writing',
  'big-small': 'Big and Small',
  'chart-count': 'Chart Count',
  'code-addition': 'Code Addition',
};

// Locale to language name mapping
const localeToLanguageName: Record<string, string> = {
  en: 'English',
  de: 'German',
  fr: 'French',
  es: 'Spanish',
  it: 'Italian',
  pt: 'Portuguese',
  nl: 'Dutch',
  da: 'Danish',
  sv: 'Swedish',
  no: 'Norwegian',
  fi: 'Finnish',
};

/**
 * Generate SEO-friendly title when database/content title is not available
 */
function generateDefaultTitle(appId: string, locale: string, index: number): string {
  const appName = appIdToDisplayName[appId] || appId.replace(/-/g, ' ');
  const languageName = localeToLanguageName[locale] || 'English';
  return `${appName} Worksheet ${index + 1} - ${languageName}`;
}

/**
 * Generate SEO-friendly caption when database/content caption is not available
 */
function generateDefaultCaption(appId: string, locale: string, index: number): string {
  const appName = appIdToDisplayName[appId] || appId.replace(/-/g, ' ');
  const languageName = localeToLanguageName[locale] || 'English';
  return `Free printable ${appName.toLowerCase()} worksheet ${index + 1} for elementary students - ${languageName} educational resource`;
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

  // Fetch SEO metadata from database (including updatedAt for lastmod)
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
        updatedAt: true,
      }
    });

    for (const sample of samples) {
      // Key format: appId:locale:filename
      const key = `${sample.appId}:${sample.locale}:${sample.filename}`;
      seoMetaMap.set(key, {
        altText: sample.altText,
        title: sample.title,
        description: sample.description,
        updatedAt: sample.updatedAt,
      });
    }
  } catch (error) {
    console.warn('[IMAGE-SITEMAP] Could not fetch SEO metadata from database, using defaults');
  }

  // License URL for all images
  const licenseUrl = `${baseUrl}/terms`;

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
          .map((item: any, index: number) => {
            const lines: string[] = [];

            // Worksheet image
            if (item.worksheetSrc) {
              const wsUrl = `${baseUrl}${item.worksheetSrc.replace(/ /g, '%20')}`;

              // Try to get SEO metadata from database first
              // Extract filename from worksheetSrc (e.g., /samples/english/addition/sample-1.jpeg -> sample-1.jpeg)
              const wsFilename = item.worksheetSrc.split('/').pop() || '';
              const seoKey = `${app.appId}:${locale}:${wsFilename}`;
              const seoMeta = seoMetaMap.get(seoKey);

              // Use database metadata if available, then content registry, then context-aware fallback
              const wsTitle = seoMeta?.title || item.imageTitle || item.altText?.split(' - ')[0] || generateDefaultTitle(app.appId, locale, index);
              const wsCaption = seoMeta?.description || seoMeta?.altText || item.altText || generateDefaultCaption(app.appId, locale, index);

              lines.push(`    <image:image>`);
              lines.push(`      <image:loc>${escapeXml(wsUrl)}</image:loc>`);
              lines.push(`      <image:title>${escapeXml(wsTitle)}</image:title>`);
              lines.push(`      <image:caption>${escapeXml(wsCaption)}</image:caption>`);
              lines.push(`      <image:license>${escapeXml(licenseUrl)}</image:license>`);
              lines.push(`    </image:image>`);
            }

            // Answer key image
            if (item.answerKeySrc && item.answerKeySrc !== item.worksheetSrc) {
              const akUrl = `${baseUrl}${item.answerKeySrc.replace(/ /g, '%20')}`;

              // Extract filename for answer key
              const akFilename = item.answerKeySrc.split('/').pop() || '';
              const akSeoKey = `${app.appId}:${locale}:${akFilename}`;
              const akSeoMeta = seoMetaMap.get(akSeoKey);

              const appName = appIdToDisplayName[app.appId] || app.appId.replace(/-/g, ' ');
              const akTitle = akSeoMeta?.title
                ? `${akSeoMeta.title} - Answer Key`
                : item.imageTitle
                ? `${item.imageTitle} - Answer Key`
                : `${appName} Worksheet ${index + 1} - Answer Key`;
              const akCaption = akSeoMeta?.description || akSeoMeta?.altText || (item.altText
                ? `Answer key for ${item.altText.split(' - ')[0] || 'worksheet'}`
                : `Answer key for ${appName.toLowerCase()} worksheet ${index + 1}`);

              lines.push(`    <image:image>`);
              lines.push(`      <image:loc>${escapeXml(akUrl)}</image:loc>`);
              lines.push(`      <image:title>${escapeXml(akTitle)}</image:title>`);
              lines.push(`      <image:caption>${escapeXml(akCaption)}</image:caption>`);
              lines.push(`      <image:license>${escapeXml(licenseUrl)}</image:license>`);
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
