import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

// Force dynamic to prevent build-time caching
export const dynamic = 'force-dynamic';

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

// Base path for samples - persistent storage that survives deployments
const SAMPLES_BASE = process.env.NODE_ENV === 'production'
  ? '/opt/lessoncraftstudio/samples'
  : path.join(process.cwd(), 'public', 'samples');

interface HeroImageStatus {
  hasPortrait: boolean;
  hasLandscape: boolean;
  portraitUrl: string;
  landscapeUrl: string;
  language: string;
}

async function fileExists(filePath: string): Promise<boolean> {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    const { searchParams } = new URL(request.url);
    const locale = searchParams.get('locale') || 'en';
    const language = localeToFolder[locale] || 'english';

    const homepageDir = path.join(SAMPLES_BASE, language, 'homepage');

    // Check if hero images exist (server-side, reliable check)
    const [hasPortrait, hasLandscape] = await Promise.all([
      fileExists(path.join(homepageDir, 'hero-portrait_preview.webp')),
      fileExists(path.join(homepageDir, 'hero-landscape_preview.webp')),
    ]);

    const result: HeroImageStatus = {
      hasPortrait,
      hasLandscape,
      portraitUrl: hasPortrait
        ? `/samples/${language}/homepage/hero-portrait_preview.webp`
        : '',
      landscapeUrl: hasLandscape
        ? `/samples/${language}/homepage/hero-landscape_preview.webp`
        : '',
      language,
    };

    return NextResponse.json(result, {
      headers: {
        // Cache for 60 seconds, allow stale content while revalidating
        'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300',
      },
    });

  } catch (error) {
    console.error('[HERO-IMAGES] Error:', error);
    return NextResponse.json({
      hasPortrait: false,
      hasLandscape: false,
      portraitUrl: '',
      landscapeUrl: '',
      language: 'english',
      error: 'Failed to check hero images',
    }, { status: 500 });
  }
}
