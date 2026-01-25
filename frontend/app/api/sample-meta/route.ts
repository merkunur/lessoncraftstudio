import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// Force dynamic to prevent build-time caching
export const dynamic = 'force-dynamic';

// Valid locales
const VALID_LOCALES = ['en', 'de', 'fr', 'es', 'it', 'pt', 'nl', 'da', 'sv', 'no', 'fi'];

// Valid app IDs
const VALID_APP_IDS = [
  'addition', 'subtraction', 'math-worksheet', 'pattern-worksheet', 'wordsearch',
  'word-scramble', 'word-guess', 'alphabet-train', 'prepositions', 'bingo',
  'coloring', 'sudoku', 'treasure-hunt', 'odd-one-out', 'picture-path',
  'pattern-train', 'crossword', 'cryptogram', 'draw-and-color', 'drawing-lines',
  'find-and-count', 'find-objects', 'grid-match', 'matching', 'math-puzzle',
  'missing-pieces', 'more-less', 'picture-sort', 'shadow-match', 'writing',
  'big-small', 'chart-count', 'code-addition'
];

// App to subject mapping
const appToSubject: Record<string, string> = {
  'addition': 'Math',
  'subtraction': 'Math',
  'math-worksheet': 'Math',
  'pattern-worksheet': 'Math',
  'math-puzzle': 'Math',
  'code-addition': 'Math',
  'chart-count': 'Math',
  'more-less': 'Math',
  'wordsearch': 'Language',
  'word-scramble': 'Language',
  'word-guess': 'Language',
  'crossword': 'Language',
  'cryptogram': 'Language',
  'alphabet-train': 'Language',
  'prepositions': 'Language',
  'writing': 'Language',
  'coloring': 'Art',
  'draw-and-color': 'Art',
  'drawing-lines': 'Fine Motor',
  'bingo': 'Games',
  'sudoku': 'Logic',
  'treasure-hunt': 'Logic',
  'odd-one-out': 'Logic',
  'picture-path': 'Logic',
  'pattern-train': 'Logic',
  'find-and-count': 'Math',
  'find-objects': 'Visual',
  'grid-match': 'Logic',
  'matching': 'Logic',
  'missing-pieces': 'Logic',
  'picture-sort': 'Logic',
  'shadow-match': 'Visual',
  'big-small': 'Math',
};

// GET: List all sample metadata with optional filters
export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    const { searchParams } = new URL(request.url);
    const appId = searchParams.get('appId');
    const locale = searchParams.get('locale');

    const where: Record<string, string> = {};
    if (appId && VALID_APP_IDS.includes(appId)) {
      where.appId = appId;
    }
    if (locale && VALID_LOCALES.includes(locale)) {
      where.locale = locale;
    }

    const samples = await prisma.productSample.findMany({
      where,
      orderBy: [
        { appId: 'asc' },
        { locale: 'asc' },
        { sortOrder: 'asc' },
        { filename: 'asc' }
      ]
    });

    return NextResponse.json({
      success: true,
      samples,
      count: samples.length
    });
  } catch (error) {
    console.error('[SAMPLES] List error:', error);
    return NextResponse.json({
      success: false,
      error: `Failed to list samples: ${error instanceof Error ? error.message : 'Unknown error'}`
    }, { status: 500 });
  }
}

// POST: Create or update sample metadata
export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const body = await request.json();
    const { appId, locale, filename, altText, title, description, keywords, grade, fileSize, dimensions, sortOrder } = body;

    // Validate required fields
    if (!appId || !VALID_APP_IDS.includes(appId)) {
      return NextResponse.json({
        success: false,
        error: `Invalid appId. Must be one of: ${VALID_APP_IDS.slice(0, 5).join(', ')}...`
      }, { status: 400 });
    }

    if (!locale || !VALID_LOCALES.includes(locale)) {
      return NextResponse.json({
        success: false,
        error: `Invalid locale. Must be one of: ${VALID_LOCALES.join(', ')}`
      }, { status: 400 });
    }

    if (!filename || typeof filename !== 'string') {
      return NextResponse.json({
        success: false,
        error: 'Filename is required'
      }, { status: 400 });
    }

    // Auto-populate subject from app
    const subject = appToSubject[appId] || 'General';

    // Upsert the sample metadata
    const sample = await prisma.productSample.upsert({
      where: {
        appId_locale_filename: {
          appId,
          locale,
          filename
        }
      },
      update: {
        altText: altText || undefined,
        title: title || undefined,
        description: description || undefined,
        keywords: keywords || [],
        grade: grade || undefined,
        subject,
        fileSize: fileSize || undefined,
        dimensions: dimensions || undefined,
        sortOrder: sortOrder ?? 0
      },
      create: {
        appId,
        locale,
        filename,
        altText: altText || null,
        title: title || null,
        description: description || null,
        keywords: keywords || [],
        grade: grade || null,
        subject,
        fileSize: fileSize || null,
        dimensions: dimensions || null,
        sortOrder: sortOrder ?? 0
      }
    });

    return NextResponse.json({
      success: true,
      sample,
      message: 'Sample metadata saved successfully'
    });
  } catch (error) {
    console.error('[SAMPLES] Create/Update error:', error);
    return NextResponse.json({
      success: false,
      error: `Failed to save sample: ${error instanceof Error ? error.message : 'Unknown error'}`
    }, { status: 500 });
  }
}
