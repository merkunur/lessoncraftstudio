import { productPageSlugs } from '@/config/product-page-slugs';
import type { SupportedLocale } from '@/config/product-page-slugs';
import { prisma } from '@/lib/prisma';
import { generateLocalizedTitle, generateLocalizedCaption, generateLocalizedAnswerKeyTitle, generateLocalizedAnswerKeyCaption } from '@/lib/localized-seo-templates';
import { getBlogSampleApps } from '@/lib/blog-topic-clusters';
import { discoverSamplesFromFilesystem, normalizeAppIdForSamples } from '@/lib/sample-utils';
import { generateSchemaDescription } from '@/lib/blog-schema-utils';
import fs from 'fs/promises';
import path from 'path';

export const revalidate = 1800; // 30 minutes ISR

// Base path for samples (filesystem scanning)
// Production uses isolated /var/www/lcs-media/samples - COMPLETELY SEPARATE from code repository
const SAMPLES_BASE = process.env.NODE_ENV === 'production'
  ? '/var/www/lcs-media/samples'
  : path.join(process.cwd(), 'public', 'samples');

// Type for SEO metadata from database
interface SampleSeoMeta {
  altText?: string | null;
  title?: string | null;
  description?: string | null;
  updatedAt?: Date | null;
}

// Locale to language folder mapping (for filesystem paths)
const localeToFolder: Record<string, string> = {
  en: 'english',
  de: 'german',
  fr: 'french',
  es: 'spanish',
  it: 'italian',
  pt: 'portuguese',
  nl: 'dutch',
  da: 'danish',
  sv: 'swedish',
  no: 'norwegian',
  fi: 'finnish',
};

// Map productPageSlugs appId → folder name in /samples/
const appIdToFolderName: Record<string, string> = {
  'word-search': 'wordsearch',
  'image-addition': 'addition',
  'alphabet-train': 'alphabet train',
  'coloring': 'coloring',
  'math-worksheet': 'math worksheet',
  'word-scramble': 'word scramble',
  'find-and-count': 'find and count',
  'matching-app': 'matching',
  'drawing-lines': 'drawing lines',
  'picture-bingo': 'bingo',
  'sudoku': 'sudoku',
  'big-small-app': 'big small',
  'chart-count-color': 'chart count',
  'code-addition': 'code addition',
  'draw-and-color': 'draw and color',
  'find-objects': 'find objects',
  'grid-match': 'grid match',
  'image-crossword': 'crossword',
  'image-cryptogram': 'cryptogram',
  'math-puzzle': 'math puzzle',
  'missing-pieces': 'missing pieces',
  'more-less': 'more less',
  'odd-one-out': 'odd one out',
  'pattern-train': 'pattern train',
  'pattern-worksheet': 'pattern worksheet',
  'picture-path': 'picture path',
  'picture-sort': 'picture sort',
  'prepositions': 'prepositions',
  'shadow-match': 'shadow match',
  'subtraction': 'subtraction',
  'treasure-hunt': 'treasure hunt',
  'word-guess': 'word guess',
  'writing-app': 'writing',
};

// App ID to display name mapping for improved fallbacks
const appIdToDisplayName: Record<string, string> = {
  'word-search': 'Word Search',
  'image-addition': 'Addition',
  'alphabet-train': 'Alphabet Train',
  'coloring': 'Coloring',
  'math-worksheet': 'Math',
  'word-scramble': 'Word Scramble',
  'find-and-count': 'Find and Count',
  'matching-app': 'Matching',
  'drawing-lines': 'Drawing Lines',
  'picture-bingo': 'Bingo',
  'sudoku': 'Sudoku',
  'big-small-app': 'Big and Small',
  'chart-count-color': 'Chart Count',
  'code-addition': 'Code Addition',
  'draw-and-color': 'Draw and Color',
  'find-objects': 'Find Objects',
  'grid-match': 'Grid Match',
  'image-crossword': 'Crossword',
  'image-cryptogram': 'Cryptogram',
  'math-puzzle': 'Math Puzzle',
  'missing-pieces': 'Missing Pieces',
  'more-less': 'More or Less',
  'odd-one-out': 'Odd One Out',
  'pattern-train': 'Pattern Train',
  'pattern-worksheet': 'Pattern Recognition',
  'picture-path': 'Picture Path',
  'picture-sort': 'Picture Sort',
  'prepositions': 'Prepositions',
  'shadow-match': 'Shadow Match',
  'subtraction': 'Subtraction',
  'treasure-hunt': 'Treasure Hunt',
  'word-guess': 'Word Guess',
  'writing-app': 'Writing',
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
 * Uses shared localized templates for proper per-locale titles
 */
function generateDefaultTitle(appId: string, locale: string, index: number): string {
  const appName = appIdToDisplayName[appId] || appId.replace(/-/g, ' ');
  return generateLocalizedTitle(appName, locale, index + 1);
}

/**
 * Generate SEO-friendly caption when database/content caption is not available
 * Uses shared localized templates for proper per-locale captions
 */
function generateDefaultCaption(appId: string, locale: string, index: number): string {
  const appName = appIdToDisplayName[appId] || appId.replace(/-/g, ' ');
  return generateLocalizedCaption(appName, locale, index + 1);
}

// Interface for discovered sample
interface DiscoveredSample {
  filename: string;
  worksheetPath: string;
  answerKeyPath?: string;
}

/**
 * Check if a filename is an answer key (case-insensitive).
 */
function isAnswerKey(filename: string): boolean {
  return /answer/i.test(filename);
}

/**
 * Get the base name of a file without extension.
 */
function getBaseName(filename: string): string {
  const lastDot = filename.lastIndexOf('.');
  return lastDot === -1 ? filename : filename.substring(0, lastDot);
}

/**
 * Try to find a matching answer key for a given worksheet filename.
 */
function findAnswerKey(worksheetFilename: string, answerKeyFiles: string[]): string | undefined {
  const wsBase = getBaseName(worksheetFilename);

  // Strategy 1: sample-N → sample-N-answer
  const sampleMatch = wsBase.match(/^sample-(\d+)$/);
  if (sampleMatch) {
    const num = sampleMatch[1];
    const exact = answerKeyFiles.find(f =>
      getBaseName(f).toLowerCase() === `sample-${num}-answer`
    );
    if (exact) return exact;
  }

  // Strategy 2: direct name variations
  const wsBaseLower = wsBase.toLowerCase();
  const variations = [
    `${wsBaseLower} answer key`,
    `${wsBaseLower}_answer_key`,
    `${wsBaseLower}-answer`,
    `${wsBaseLower}_answer`,
    wsBaseLower.replace('worksheet', 'answer_key'),
    wsBaseLower.replace('worksheet', 'answer key'),
  ];

  for (const variation of variations) {
    const match = answerKeyFiles.find(f =>
      getBaseName(f).toLowerCase() === variation
    );
    if (match) return match;
  }

  // Strategy 3: fuzzy word matching
  const wsWords = wsBaseLower
    .replace(/[_\-]/g, ' ')
    .split(/\s+/)
    .filter(w => w.length > 2 && !['the', 'and', 'for', 'with'].includes(w));

  if (wsWords.length > 0) {
    let bestMatch: string | undefined;
    let bestScore = 0;

    for (const akFile of answerKeyFiles) {
      const akBase = getBaseName(akFile).toLowerCase().replace(/[_\-]/g, ' ');
      const akWords = akBase.split(/\s+/).filter(w => w.length > 2);

      let score = 0;
      for (const word of wsWords) {
        if (akWords.includes(word)) score++;
      }

      if (score > bestScore && score >= Math.ceil(wsWords.length / 2)) {
        bestScore = score;
        bestMatch = akFile;
      }
    }

    if (bestMatch) return bestMatch;
  }

  return undefined;
}

/**
 * Scan an app directory and discover all sample files.
 * Returns an array of DiscoveredSample sorted alphabetically.
 */
async function scanAppDirectory(language: string, folderName: string): Promise<DiscoveredSample[]> {
  const dir = path.join(SAMPLES_BASE, language, folderName);

  let files: string[];
  try {
    files = await fs.readdir(dir);
  } catch {
    // Directory doesn't exist
    return [];
  }

  // Get all JPEG files
  const jpegFiles = files.filter(f => /\.(jpeg|jpg)$/i.test(f));

  // Separate worksheets from answer keys
  const worksheetFiles = jpegFiles.filter(f => !isAnswerKey(f));
  const answerKeyFiles = jpegFiles.filter(f => isAnswerKey(f));

  // Sort worksheets alphabetically for consistent ordering
  worksheetFiles.sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));

  const basePath = `/samples/${language}/${folderName}`;

  const samples: DiscoveredSample[] = [];

  for (const wsFile of worksheetFiles) {
    const answerFile = findAnswerKey(wsFile, answerKeyFiles);

    samples.push({
      filename: wsFile,
      worksheetPath: `${basePath}/${wsFile}`,
      answerKeyPath: answerFile ? `${basePath}/${answerFile}` : undefined,
    });
  }

  return samples;
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
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.lessoncraftstudio.com';

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

  let urls = '';

  // Process all apps and locales
  for (const app of productPageSlugs) {
    const folderName = appIdToFolderName[app.appId];
    if (!folderName) {
      console.warn(`[IMAGE-SITEMAP] No folder mapping for appId: ${app.appId}`);
      continue;
    }

    for (const [locale, slug] of Object.entries(app.slugs)) {
      if (!slug) continue;

      const language = localeToFolder[locale];
      if (!language) continue;

      const pageUrl = `${baseUrl}/${locale}/apps/${slug}`;

      // Scan filesystem to discover actual sample files
      const samples = await scanAppDirectory(language, folderName);

      if (samples.length > 0) {
        // Locale-specific license URL
        const licenseUrl = `${baseUrl}/${locale}/terms`;

        // Track max updatedAt across all samples for this page's <lastmod>
        let maxUpdatedAt: Date | null = null;

        // Generate image entries from discovered files
        const imageXml = samples
          .map((sample, index) => {
            const lines: string[] = [];

            // Worksheet image
            if (sample.worksheetPath) {
              const wsUrl = `${baseUrl}${sample.worksheetPath.replace(/ /g, '%20')}`;

              // Try to get SEO metadata from database first
              const seoKey = `${app.appId}:${locale}:${sample.filename}`;
              const seoMeta = seoMetaMap.get(seoKey);

              // Track max updatedAt for lastmod
              if (seoMeta?.updatedAt && (!maxUpdatedAt || seoMeta.updatedAt > maxUpdatedAt)) {
                maxUpdatedAt = seoMeta.updatedAt;
              }

              // Use database metadata if available, otherwise generate defaults
              const wsTitle = seoMeta?.title || generateDefaultTitle(app.appId, locale, index);
              const wsCaption = seoMeta?.description || seoMeta?.altText || generateDefaultCaption(app.appId, locale, index);

              lines.push(`    <image:image>`);
              lines.push(`      <image:loc>${escapeXml(wsUrl)}</image:loc>`);
              lines.push(`      <image:title>${escapeXml(wsTitle)}</image:title>`);
              lines.push(`      <image:caption>${escapeXml(wsCaption)}</image:caption>`);
              lines.push(`      <image:license>${escapeXml(licenseUrl)}</image:license>`);
              lines.push(`    </image:image>`);
            }

            // Answer key image
            if (sample.answerKeyPath) {
              const akUrl = `${baseUrl}${sample.answerKeyPath.replace(/ /g, '%20')}`;

              // Extract answer key filename for SEO lookup
              const akFilename = sample.answerKeyPath.split('/').pop() || '';
              const akSeoKey = `${app.appId}:${locale}:${akFilename}`;
              const akSeoMeta = seoMetaMap.get(akSeoKey);

              // Track max updatedAt for lastmod
              if (akSeoMeta?.updatedAt && (!maxUpdatedAt || akSeoMeta.updatedAt > maxUpdatedAt)) {
                maxUpdatedAt = akSeoMeta.updatedAt;
              }

              const appName = appIdToDisplayName[app.appId] || app.appId.replace(/-/g, ' ');
              const akTitle = akSeoMeta?.title
                ? `${akSeoMeta.title} - Answer Key`
                : generateLocalizedAnswerKeyTitle(appName, locale, index + 1);
              const akCaption = akSeoMeta?.description || akSeoMeta?.altText
                || generateLocalizedAnswerKeyCaption(appName, locale, index + 1);

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
          const lastmodXml = maxUpdatedAt
            ? `\n    <lastmod>${(maxUpdatedAt as Date).toISOString().split('T')[0]}</lastmod>`
            : '';
          urls += `  <url>\n    <loc>${escapeXml(pageUrl)}</loc>${lastmodXml}\n${imageXml}\n  </url>\n`;
        }
      }
    }
  }

  // ── Homepage sample thumbnails ──
  // Homepage displays 33 worksheet thumbnails per locale from /samples/{language}/homepage/
  const homepageAppIdToDisplayName: Record<string, string> = {
    'addition': 'Addition', 'alphabet-train': 'Alphabet Train', 'big-small': 'Big and Small',
    'bingo': 'Bingo', 'chart-count': 'Chart Count', 'code-addition': 'Code Addition',
    'coloring': 'Coloring', 'crossword': 'Crossword', 'cryptogram': 'Cryptogram',
    'draw-and-color': 'Draw and Color', 'drawing-lines': 'Drawing Lines',
    'find-and-count': 'Find and Count', 'find-objects': 'Find Objects', 'grid-match': 'Grid Match',
    'matching': 'Matching', 'math-puzzle': 'Math Puzzle', 'math-worksheet': 'Math',
    'missing-pieces': 'Missing Pieces', 'more-less': 'More or Less', 'odd-one-out': 'Odd One Out',
    'pattern-train': 'Pattern Train', 'pattern-worksheet': 'Pattern Recognition',
    'picture-path': 'Picture Path', 'picture-sort': 'Picture Sort', 'prepositions': 'Prepositions',
    'shadow-match': 'Shadow Match', 'subtraction': 'Subtraction', 'sudoku': 'Sudoku',
    'treasure-hunt': 'Treasure Hunt', 'word-guess': 'Word Guess', 'word-scramble': 'Word Scramble',
    'wordsearch': 'Word Search', 'writing': 'Writing',
  };

  for (const [locale, language] of Object.entries(localeToFolder)) {
    const homepageDir = path.join(SAMPLES_BASE, language, 'homepage');
    let homepageFiles: string[];
    try {
      homepageFiles = await fs.readdir(homepageDir);
    } catch { continue; }

    const thumbFiles = homepageFiles.filter(f => f.endsWith('_thumb.webp'));
    if (thumbFiles.length === 0) continue;

    const pageUrl = `${baseUrl}/${locale}`;
    const licenseUrl = `${baseUrl}/${locale}/terms`;
    const imageLines: string[] = [];

    for (const thumbFile of thumbFiles) {
      const appId = thumbFile.replace('-thumbnail_thumb.webp', '');
      const displayName = homepageAppIdToDisplayName[appId] || appId.replace(/-/g, ' ');
      const imgUrl = `${baseUrl}/samples/${language}/homepage/${thumbFile.replace(/ /g, '%20')}`;

      // Try DB metadata first, then localized template fallback
      const seoKey = `${appId}:${locale}:${appId}-thumbnail.jpeg`;
      const seoMeta = seoMetaMap.get(seoKey);
      const title = seoMeta?.title || generateLocalizedTitle(displayName, locale, 1);
      const caption = seoMeta?.description || seoMeta?.altText || generateLocalizedCaption(displayName, locale, 1);

      imageLines.push(`    <image:image>`);
      imageLines.push(`      <image:loc>${escapeXml(imgUrl)}</image:loc>`);
      imageLines.push(`      <image:title>${escapeXml(title)}</image:title>`);
      imageLines.push(`      <image:caption>${escapeXml(caption)}</image:caption>`);
      imageLines.push(`      <image:license>${escapeXml(licenseUrl)}</image:license>`);
      imageLines.push(`    </image:image>`);
    }

    if (imageLines.length > 0) {
      urls += `  <url>\n    <loc>${escapeXml(pageUrl)}</loc>\n${imageLines.join('\n')}\n  </url>\n`;
    }
  }

  // ── Blog post sample images ──
  // Add sample images shown on blog posts to the image sitemap
  try {
    const blogPosts = await prisma.blogPost.findMany({
      where: { status: 'published' },
      select: {
        slug: true,
        translations: true,
        keywords: true,
        category: true,
        updatedAt: true,
      }
    });

    const supportedLocales = Object.keys(localeToFolder);

    for (const post of blogPosts) {
      const translations = post.translations as Record<string, any>;

      for (const locale of supportedLocales) {
        const translation = translations[locale];
        if (!translation?.slug && !translation?.title) continue;

        const localeSlug = translation.slug || post.slug;
        const blogPageUrl = `${baseUrl}/${locale}/blog/${localeSlug}`;
        const licenseUrl = `${baseUrl}/${locale}/terms`;

        // Match blog post to sample apps (same logic as page.tsx)
        const enTitle = (translations['en']?.title as string) || translation.title || '';
        const sampleApps = getBlogSampleApps(
          enTitle,
          post.slug,
          translation.focusKeyword,
          locale as SupportedLocale,
          3
        );

        const blogImageLines: string[] = [];

        for (const app of sampleApps) {
          const normalizedId = normalizeAppIdForSamples(app.appId);
          const discovered = await discoverSamplesFromFilesystem(normalizedId, locale);
          if (discovered.length === 0) continue;

          // Deterministic sample selection (same hash as page.tsx)
          let hash = 0;
          const key = localeSlug + app.appId;
          for (let i = 0; i < key.length; i++) {
            hash = ((hash << 5) - hash + key.charCodeAt(i)) | 0;
          }
          const idx = Math.abs(hash) % discovered.length;
          const sample = discovered[idx];
          const sampleUrl = `${baseUrl}${sample.worksheetSrc.replace(/ /g, '%20')}`;
          const imgTitle = generateSchemaDescription(app.productName, locale, translation.focusKeyword);
          const imgCaption = `${app.productName} - worksheet sample`;

          blogImageLines.push(`    <image:image>`);
          blogImageLines.push(`      <image:loc>${escapeXml(sampleUrl)}</image:loc>`);
          blogImageLines.push(`      <image:title>${escapeXml(imgTitle)}</image:title>`);
          blogImageLines.push(`      <image:caption>${escapeXml(imgCaption)}</image:caption>`);
          blogImageLines.push(`      <image:license>${escapeXml(licenseUrl)}</image:license>`);
          blogImageLines.push(`    </image:image>`);
        }

        if (blogImageLines.length > 0) {
          const lastmod = post.updatedAt
            ? `\n    <lastmod>${post.updatedAt.toISOString().split('T')[0]}</lastmod>`
            : '';
          urls += `  <url>\n    <loc>${escapeXml(blogPageUrl)}</loc>${lastmod}\n${blogImageLines.join('\n')}\n  </url>\n`;
        }
      }
    }
  } catch (error) {
    console.warn('[IMAGE-SITEMAP] Could not generate blog sample image entries:', error);
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
