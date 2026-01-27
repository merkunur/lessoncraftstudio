import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

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

// Base path for samples - production uses isolated storage at /var/www/lcs-media/samples
const SAMPLES_BASE = process.env.NODE_ENV === 'production'
  ? '/var/www/lcs-media/samples'
  : path.join(process.cwd(), 'public', 'samples');

interface FileInfo {
  exists: boolean;
  size: number;
  mtime: string;
}

interface AppDiagnosis {
  appId: string;
  thumbnail: FileInfo;
  thumbWebp: FileInfo;
  previewWebp: FileInfo;
  pdf: FileInfo;
  issues: string[];
}

interface HeroDiagnosis {
  portrait: FileInfo;
  portraitThumb: FileInfo;
  portraitPreview: FileInfo;
  landscape: FileInfo;
  landscapeThumb: FileInfo;
  landscapePreview: FileInfo;
  issues: string[];
}

async function getFileInfo(filePath: string): Promise<FileInfo> {
  try {
    const stats = await fs.stat(filePath);
    return {
      exists: true,
      size: stats.size,
      mtime: stats.mtime.toISOString(),
    };
  } catch {
    return {
      exists: false,
      size: 0,
      mtime: '',
    };
  }
}

export async function GET(request: Request): Promise<NextResponse> {
  try {
    const { searchParams } = new URL(request.url);
    const locale = searchParams.get('locale') || 'en';
    const language = localeToFolder[locale];

    if (!language) {
      return NextResponse.json({
        success: false,
        error: `Invalid locale: ${locale}. Valid options: ${Object.keys(localeToFolder).join(', ')}`,
      }, { status: 400 });
    }

    const homepageDir = path.join(SAMPLES_BASE, language, 'homepage');

    // Check if directory exists
    let dirExists = false;
    try {
      await fs.access(homepageDir);
      dirExists = true;
    } catch {
      // Directory doesn't exist
    }

    if (!dirExists) {
      return NextResponse.json({
        success: true,
        locale,
        language,
        directory: homepageDir,
        directoryExists: false,
        apps: [],
        hero: null,
        summary: {
          totalApps: 0,
          completeApps: 0,
          appsWithMissingWebp: 0,
          appsWithMissingThumbnail: 0,
          heroComplete: false,
        },
      });
    }

    // List all files in directory
    const files = await fs.readdir(homepageDir);

    // Diagnose each app
    const appDiagnoses: AppDiagnosis[] = await Promise.all(
      validAppIds.map(async (appId) => {
        const [thumbnail, thumbWebp, previewWebp, pdf] = await Promise.all([
          getFileInfo(path.join(homepageDir, `${appId}-thumbnail.jpeg`)),
          getFileInfo(path.join(homepageDir, `${appId}-thumbnail_thumb.webp`)),
          getFileInfo(path.join(homepageDir, `${appId}-thumbnail_preview.webp`)),
          getFileInfo(path.join(homepageDir, `${appId}-sample.pdf`)),
        ]);

        const issues: string[] = [];

        if (!thumbnail.exists) {
          issues.push('Missing thumbnail JPEG');
        } else if (thumbnail.size === 0) {
          issues.push('Thumbnail JPEG is empty (0 bytes)');
        }

        if (!thumbWebp.exists) {
          issues.push('Missing thumb WebP');
        } else if (thumbWebp.size === 0) {
          issues.push('Thumb WebP is empty (0 bytes)');
        }

        if (!previewWebp.exists) {
          issues.push('Missing preview WebP - WILL NOT DISPLAY ON HOMEPAGE');
        } else if (previewWebp.size === 0) {
          issues.push('Preview WebP is empty (0 bytes) - WILL NOT DISPLAY');
        }

        if (!pdf.exists) {
          issues.push('Missing sample PDF');
        }

        return {
          appId,
          thumbnail,
          thumbWebp,
          previewWebp,
          pdf,
          issues,
        };
      })
    );

    // Diagnose hero images
    const [
      portrait, portraitThumb, portraitPreview,
      landscape, landscapeThumb, landscapePreview
    ] = await Promise.all([
      getFileInfo(path.join(homepageDir, 'hero-portrait.jpeg')),
      getFileInfo(path.join(homepageDir, 'hero-portrait_thumb.webp')),
      getFileInfo(path.join(homepageDir, 'hero-portrait_preview.webp')),
      getFileInfo(path.join(homepageDir, 'hero-landscape.jpeg')),
      getFileInfo(path.join(homepageDir, 'hero-landscape_thumb.webp')),
      getFileInfo(path.join(homepageDir, 'hero-landscape_preview.webp')),
    ]);

    const heroIssues: string[] = [];
    if (!portrait.exists) heroIssues.push('Missing portrait JPEG');
    if (!portraitPreview.exists) heroIssues.push('Missing portrait preview WebP - WILL NOT DISPLAY');
    if (!landscape.exists) heroIssues.push('Missing landscape JPEG');
    if (!landscapePreview.exists) heroIssues.push('Missing landscape preview WebP - WILL NOT DISPLAY');

    const heroDiagnosis: HeroDiagnosis = {
      portrait,
      portraitThumb,
      portraitPreview,
      landscape,
      landscapeThumb,
      landscapePreview,
      issues: heroIssues,
    };

    // Calculate summary
    const appsWithIssues = appDiagnoses.filter(a => a.issues.length > 0);
    const appsWithMissingWebp = appDiagnoses.filter(a => !a.previewWebp.exists || a.previewWebp.size === 0);
    const appsWithMissingThumbnail = appDiagnoses.filter(a => !a.thumbnail.exists);
    const completeApps = appDiagnoses.filter(a =>
      a.thumbnail.exists && a.thumbnail.size > 0 &&
      a.thumbWebp.exists && a.thumbWebp.size > 0 &&
      a.previewWebp.exists && a.previewWebp.size > 0 &&
      a.pdf.exists && a.pdf.size > 0
    );

    return NextResponse.json({
      success: true,
      locale,
      language,
      directory: homepageDir,
      directoryExists: true,
      totalFilesInDirectory: files.length,
      apps: appDiagnoses,
      appsWithIssues: appsWithIssues.map(a => ({
        appId: a.appId,
        issues: a.issues,
      })),
      hero: heroDiagnosis,
      summary: {
        totalApps: validAppIds.length,
        completeApps: completeApps.length,
        appsWithMissingWebp: appsWithMissingWebp.length,
        appsWithMissingThumbnail: appsWithMissingThumbnail.length,
        heroComplete: heroIssues.length === 0,
        heroIssues: heroIssues,
      },
      recommendation: appsWithMissingWebp.length > 0
        ? `${appsWithMissingWebp.length} apps are missing WebP files and won't display on the homepage. Re-upload these thumbnails: ${appsWithMissingWebp.map(a => a.appId).join(', ')}`
        : heroIssues.length > 0
        ? `Hero images have issues: ${heroIssues.join(', ')}`
        : 'All files present. If images still don\'t display, clear ISR cache with /api/homepage/revalidate',
    });

  } catch (error) {
    console.error('[HOMEPAGE-DIAGNOSE] Error:', error);
    return NextResponse.json({
      success: false,
      error: `Diagnosis failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
    }, { status: 500 });
  }
}
