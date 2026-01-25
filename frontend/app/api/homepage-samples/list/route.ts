import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
import { prisma } from '@/lib/prisma';

// Force dynamic to prevent build-time caching
export const dynamic = 'force-dynamic';

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

// Valid app IDs (33 apps)
const validAppIds = [
  'addition', 'alphabet-train', 'big-small', 'bingo', 'chart-count', 'code-addition',
  'coloring', 'crossword', 'cryptogram', 'draw-and-color', 'drawing-lines',
  'find-and-count', 'find-objects', 'grid-match', 'matching', 'math-puzzle',
  'math-worksheet', 'missing-pieces', 'more-less', 'odd-one-out', 'pattern-train',
  'pattern-worksheet', 'picture-path', 'picture-sort', 'prepositions',
  'shadow-match', 'subtraction', 'sudoku', 'treasure-hunt', 'word-guess',
  'word-scramble', 'wordsearch', 'writing'
];

// App display names for UI
const appDisplayNames: Record<string, string> = {
  'addition': 'Addition',
  'alphabet-train': 'Alphabet Train',
  'big-small': 'Big or Small',
  'bingo': 'Picture Bingo',
  'chart-count': 'Chart Count',
  'code-addition': 'Code Addition',
  'coloring': 'Coloring Pages',
  'crossword': 'Crossword',
  'cryptogram': 'Cryptogram',
  'draw-and-color': 'Draw and Color',
  'drawing-lines': 'Drawing Lines',
  'find-and-count': 'Find and Count',
  'find-objects': 'Find Objects',
  'grid-match': 'Grid Match',
  'matching': 'Matching',
  'math-puzzle': 'Math Puzzle',
  'math-worksheet': 'Math Worksheet',
  'missing-pieces': 'Missing Pieces',
  'more-less': 'More or Less',
  'odd-one-out': 'Odd One Out',
  'pattern-train': 'Pattern Train',
  'pattern-worksheet': 'Pattern Worksheet',
  'picture-path': 'Picture Path',
  'picture-sort': 'Picture Sort',
  'prepositions': 'Prepositions',
  'shadow-match': 'Shadow Match',
  'subtraction': 'Subtraction',
  'sudoku': 'Sudoku',
  'treasure-hunt': 'Treasure Hunt',
  'word-guess': 'Word Guess',
  'word-scramble': 'Word Scramble',
  'wordsearch': 'Word Search',
  'writing': 'Writing'
};

// Base path for samples - production uses isolated storage at /var/www/lcs-media/samples
const SAMPLES_BASE = process.env.NODE_ENV === 'production'
  ? '/var/www/lcs-media/samples'
  : path.join(process.cwd(), 'public', 'samples');

interface AppStatus {
  appId: string;
  displayName: string;
  hasThumbnail: boolean;
  hasThumbWebp: boolean;
  hasPreviewWebp: boolean;
  hasPdf: boolean;
  isComplete: boolean;
}

interface HeroStatus {
  hasPortrait: boolean;
  hasPortraitThumb: boolean;
  hasPortraitPreview: boolean;
  hasLandscape: boolean;
  hasLandscapeThumb: boolean;
  hasLandscapePreview: boolean;
  isComplete: boolean;
}

interface SeoData {
  altText?: string | null;
  title?: string | null;
  description?: string | null;
  grade?: string | null;
}

interface LanguageStatus {
  locale: string;
  language: string;
  apps: Record<string, AppStatus>;
  hero: HeroStatus;
  stats: {
    total: number;
    thumbnails: number;
    thumbWebps: number;
    previewWebps: number;
    pdfs: number;
    complete: number;
  };
  seo: Record<string, SeoData>;
}

interface MatrixResult {
  success: boolean;
  matrix: Record<string, LanguageStatus>;
  globalStats: {
    totalSlots: number;
    totalThumbnails: number;
    totalThumbWebps: number;
    totalPreviewWebps: number;
    totalPdfs: number;
    totalComplete: number;
    percentComplete: number;
  };
}

async function fileExists(filePath: string): Promise<boolean> {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

async function checkLanguageStatus(locale: string, language: string): Promise<LanguageStatus> {
  const dir = path.join(SAMPLES_BASE, language, 'homepage');
  const apps: Record<string, AppStatus> = {};

  let thumbnails = 0;
  let thumbWebps = 0;
  let previewWebps = 0;
  let pdfs = 0;
  let complete = 0;

  // Check all apps in parallel
  const appChecks = await Promise.all(
    validAppIds.map(async (appId) => {
      const [hasThumbnail, hasThumbWebp, hasPreviewWebp, hasPdf] = await Promise.all([
        fileExists(path.join(dir, `${appId}-thumbnail.jpeg`)),
        fileExists(path.join(dir, `${appId}-thumbnail_thumb.webp`)),
        fileExists(path.join(dir, `${appId}-thumbnail_preview.webp`)),
        fileExists(path.join(dir, `${appId}-sample.pdf`))
      ]);

      const isComplete = hasThumbnail && hasThumbWebp && hasPreviewWebp && hasPdf;

      return {
        appId,
        displayName: appDisplayNames[appId] || appId,
        hasThumbnail,
        hasThumbWebp,
        hasPreviewWebp,
        hasPdf,
        isComplete
      };
    })
  );

  // Check hero images in parallel
  const [
    hasPortrait, hasPortraitThumb, hasPortraitPreview,
    hasLandscape, hasLandscapeThumb, hasLandscapePreview
  ] = await Promise.all([
    fileExists(path.join(dir, 'hero-portrait.jpeg')),
    fileExists(path.join(dir, 'hero-portrait_thumb.webp')),
    fileExists(path.join(dir, 'hero-portrait_preview.webp')),
    fileExists(path.join(dir, 'hero-landscape.jpeg')),
    fileExists(path.join(dir, 'hero-landscape_thumb.webp')),
    fileExists(path.join(dir, 'hero-landscape_preview.webp'))
  ]);

  const heroComplete = hasPortrait && hasPortraitThumb && hasPortraitPreview &&
                       hasLandscape && hasLandscapeThumb && hasLandscapePreview;

  const hero: HeroStatus = {
    hasPortrait,
    hasPortraitThumb,
    hasPortraitPreview,
    hasLandscape,
    hasLandscapeThumb,
    hasLandscapePreview,
    isComplete: heroComplete
  };

  // Aggregate results
  for (const app of appChecks) {
    apps[app.appId] = app;
    if (app.hasThumbnail) thumbnails++;
    if (app.hasThumbWebp) thumbWebps++;
    if (app.hasPreviewWebp) previewWebps++;
    if (app.hasPdf) pdfs++;
    if (app.isComplete) complete++;
  }

  // Query SEO data from database for homepage thumbnails
  let seo: Record<string, SeoData> = {};
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
        description: true,
        grade: true
      }
    });
    seo = Object.fromEntries(
      seoRecords.map(s => [s.appId, {
        altText: s.altText,
        title: s.title,
        description: s.description,
        grade: s.grade
      }])
    );
  } catch (error) {
    console.warn('[HOMEPAGE-SAMPLES] Could not fetch SEO data:', error);
  }

  return {
    locale,
    language,
    apps,
    hero,
    stats: {
      total: validAppIds.length,
      thumbnails,
      thumbWebps,
      previewWebps,
      pdfs,
      complete
    },
    seo
  };
}

export async function GET(): Promise<NextResponse> {
  try {
    const matrix: Record<string, LanguageStatus> = {};

    // Check all languages in parallel
    const languageChecks = await Promise.all(
      Object.entries(localeToFolder).map(async ([locale, language]) => {
        const status = await checkLanguageStatus(locale, language);
        return { locale, status };
      })
    );

    // Aggregate global stats
    let totalThumbnails = 0;
    let totalThumbWebps = 0;
    let totalPreviewWebps = 0;
    let totalPdfs = 0;
    let totalComplete = 0;

    for (const { locale, status } of languageChecks) {
      matrix[locale] = status;
      totalThumbnails += status.stats.thumbnails;
      totalThumbWebps += status.stats.thumbWebps;
      totalPreviewWebps += status.stats.previewWebps;
      totalPdfs += status.stats.pdfs;
      totalComplete += status.stats.complete;
    }

    const totalSlots = Object.keys(localeToFolder).length * validAppIds.length;

    const result: MatrixResult = {
      success: true,
      matrix,
      globalStats: {
        totalSlots,
        totalThumbnails,
        totalThumbWebps,
        totalPreviewWebps,
        totalPdfs,
        totalComplete,
        percentComplete: Math.round((totalComplete / totalSlots) * 100)
      }
    };

    return NextResponse.json(result);

  } catch (error) {
    console.error('[HOMEPAGE-SAMPLES] List error:', error);
    return NextResponse.json({
      success: false,
      error: `Failed to list status: ${error instanceof Error ? error.message : 'Unknown error'}`
    }, { status: 500 });
  }
}
