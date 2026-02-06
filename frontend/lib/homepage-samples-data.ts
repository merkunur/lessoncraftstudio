import fs from 'fs/promises';
import path from 'path';
import { prisma } from '@/lib/prisma';

// Base path for samples (filesystem scanning)
// Production uses isolated /var/www/lcs-media/samples - COMPLETELY SEPARATE from code repository
const SAMPLES_BASE = process.env.NODE_ENV === 'production'
  ? '/var/www/lcs-media/samples'
  : path.join(process.cwd(), 'public', 'samples');

// Locale to language folder mapping
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

// Valid app IDs (33 apps) - same as in the API route
const validAppIds = [
  'addition', 'alphabet-train', 'big-small', 'bingo', 'chart-count', 'code-addition',
  'coloring', 'crossword', 'cryptogram', 'draw-and-color', 'drawing-lines',
  'find-and-count', 'find-objects', 'grid-match', 'matching', 'math-puzzle',
  'math-worksheet', 'missing-pieces', 'more-less', 'odd-one-out', 'pattern-train',
  'pattern-worksheet', 'picture-path', 'picture-sort', 'prepositions',
  'shadow-match', 'subtraction', 'sudoku', 'treasure-hunt', 'word-guess',
  'word-scramble', 'wordsearch', 'writing'
];

export interface HomepageSamplesData {
  dynamicImages: Record<string, string>;
  seoData: Record<string, { altText?: string; title?: string }>;
  heroImages: { portrait: string; landscape: string };
}

async function fileExists(filePath: string): Promise<boolean> {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

/**
 * Get homepage samples data directly from filesystem + database.
 * This replaces the self-referential HTTP fetch that caused request deadlock under load.
 */
export async function getHomepageSamplesData(locale: string): Promise<HomepageSamplesData> {
  const result: HomepageSamplesData = {
    dynamicImages: {},
    seoData: {},
    heroImages: { portrait: '', landscape: '' }
  };

  try {
    const language = localeToFolder[locale];
    if (!language) return result;

    const dir = path.join(SAMPLES_BASE, language, 'homepage');

    // Check all app thumbnails in parallel
    const appChecks = await Promise.all(
      validAppIds.map(async (appId) => {
        const [hasPreviewWebp] = await Promise.all([
          fileExists(path.join(dir, `${appId}-thumbnail_preview.webp`)),
        ]);
        // We need hasThumbnail AND hasPreviewWebp for the gallery
        // But we only use _thumb.webp in the actual URL
        const hasThumbWebp = hasPreviewWebp
          ? await fileExists(path.join(dir, `${appId}-thumbnail_thumb.webp`))
          : false;
        return { appId, hasThumbWebp, hasPreviewWebp };
      })
    );

    // Build dynamicImages map
    for (const { appId, hasThumbWebp, hasPreviewWebp } of appChecks) {
      if (hasThumbWebp && hasPreviewWebp) {
        result.dynamicImages[appId] = `/samples/${language}/homepage/${appId}-thumbnail_thumb.webp`;
      }
    }

    // Check hero images in parallel
    const [hasPortraitPreview, hasLandscapePreview] = await Promise.all([
      fileExists(path.join(dir, 'hero-portrait_preview.webp')),
      fileExists(path.join(dir, 'hero-landscape_preview.webp')),
    ]);

    if (hasPortraitPreview) {
      result.heroImages.portrait = `/samples/${language}/homepage/hero-portrait_preview.webp`;
    }
    if (hasLandscapePreview) {
      result.heroImages.landscape = `/samples/${language}/homepage/hero-landscape_preview.webp`;
    }

    // Query SEO data from database for homepage thumbnails
    try {
      const seoRecords = await prisma.productSample.findMany({
        where: {
          locale,
          filename: { endsWith: '-thumbnail.jpeg' }
        },
        select: {
          appId: true,
          altText: true,
          title: true,
        }
      });
      for (const s of seoRecords) {
        result.seoData[s.appId] = {
          altText: s.altText ?? undefined,
          title: s.title ?? undefined,
        };
      }
    } catch {
      // SEO data is optional - continue without it
    }
  } catch {
    // Silent fallback to empty data - same behavior as the HTTP fetch version
  }

  return result;
}
