import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

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

// Base path for samples - production uses isolated storage at /var/www/lcs-media/samples
const SAMPLES_BASE = process.env.NODE_ENV === 'production'
  ? '/var/www/lcs-media/samples'
  : path.join(process.cwd(), 'public', 'samples');

interface FileStatus {
  exists: boolean;
  size?: number;
  modified?: string;
}

interface CheckResult {
  locale: string;
  language: string;
  appId: string;
  files: {
    thumbnail: FileStatus;
    thumbWebp: FileStatus;
    previewWebp: FileStatus;
    pdf: FileStatus;
  };
}

interface HeroCheckResult {
  locale: string;
  language: string;
  hero: {
    portrait: {
      original: FileStatus;
      thumb: FileStatus;
      preview: FileStatus;
    };
    landscape: {
      original: FileStatus;
      thumb: FileStatus;
      preview: FileStatus;
    };
  };
}

async function checkFileStatus(filePath: string): Promise<FileStatus> {
  try {
    const stats = await fs.stat(filePath);
    return {
      exists: true,
      size: stats.size,
      modified: stats.mtime.toISOString()
    };
  } catch {
    return { exists: false };
  }
}

export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    const { searchParams } = new URL(request.url);
    const locale = searchParams.get('locale');
    const appId = searchParams.get('appId');

    // Validate parameters
    if (!locale || !localeToFolder[locale]) {
      return NextResponse.json({
        success: false,
        error: `Invalid or missing locale. Must be one of: ${Object.keys(localeToFolder).join(', ')}`
      }, { status: 400 });
    }

    const language = localeToFolder[locale];
    const dir = path.join(SAMPLES_BASE, language, 'homepage');

    // Special case: check hero images when appId is 'hero'
    if (appId === 'hero') {
      const [
        portraitOriginal, portraitThumb, portraitPreview,
        landscapeOriginal, landscapeThumb, landscapePreview
      ] = await Promise.all([
        checkFileStatus(path.join(dir, 'hero-portrait.jpeg')),
        checkFileStatus(path.join(dir, 'hero-portrait_thumb.webp')),
        checkFileStatus(path.join(dir, 'hero-portrait_preview.webp')),
        checkFileStatus(path.join(dir, 'hero-landscape.jpeg')),
        checkFileStatus(path.join(dir, 'hero-landscape_thumb.webp')),
        checkFileStatus(path.join(dir, 'hero-landscape_preview.webp'))
      ]);

      const heroResult: HeroCheckResult = {
        locale,
        language,
        hero: {
          portrait: {
            original: portraitOriginal,
            thumb: portraitThumb,
            preview: portraitPreview
          },
          landscape: {
            original: landscapeOriginal,
            thumb: landscapeThumb,
            preview: landscapePreview
          }
        }
      };

      return NextResponse.json({
        success: true,
        ...heroResult
      });
    }

    // Regular app check
    if (!appId || !validAppIds.includes(appId)) {
      return NextResponse.json({
        success: false,
        error: `Invalid or missing appId. Must be one of: ${validAppIds.join(', ')}, or 'hero' for hero images`
      }, { status: 400 });
    }

    // Check all file types
    const [thumbnail, thumbWebp, previewWebp, pdf] = await Promise.all([
      checkFileStatus(path.join(dir, `${appId}-thumbnail.jpeg`)),
      checkFileStatus(path.join(dir, `${appId}-thumbnail_thumb.webp`)),
      checkFileStatus(path.join(dir, `${appId}-thumbnail_preview.webp`)),
      checkFileStatus(path.join(dir, `${appId}-sample.pdf`))
    ]);

    const result: CheckResult = {
      locale,
      language,
      appId,
      files: {
        thumbnail,
        thumbWebp,
        previewWebp,
        pdf
      }
    };

    return NextResponse.json({
      success: true,
      ...result
    });

  } catch (error) {
    console.error('[HOMEPAGE-SAMPLES] Check error:', error);
    return NextResponse.json({
      success: false,
      error: `Check failed: ${error instanceof Error ? error.message : 'Unknown error'}`
    }, { status: 500 });
  }
}
