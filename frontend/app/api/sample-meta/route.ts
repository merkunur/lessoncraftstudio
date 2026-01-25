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

// App ID to keywords for SEO validation
const appToKeywords: Record<string, string[]> = {
  'addition': ['addition', 'math', 'add', 'sum', 'plus'],
  'subtraction': ['subtraction', 'math', 'subtract', 'minus', 'difference'],
  'math-worksheet': ['math', 'mathematics', 'arithmetic', 'numbers'],
  'pattern-worksheet': ['pattern', 'sequence', 'recognition', 'math'],
  'wordsearch': ['word search', 'wordsearch', 'puzzle', 'vocabulary'],
  'word-scramble': ['word scramble', 'unscramble', 'spelling', 'vocabulary'],
  'word-guess': ['word guess', 'vocabulary', 'spelling', 'language'],
  'alphabet-train': ['alphabet', 'abc', 'letters', 'train'],
  'prepositions': ['preposition', 'grammar', 'language', 'english'],
  'bingo': ['bingo', 'game', 'vocabulary', 'matching'],
  'coloring': ['coloring', 'color', 'art', 'creative'],
  'sudoku': ['sudoku', 'puzzle', 'logic', 'numbers'],
  'treasure-hunt': ['treasure', 'hunt', 'puzzle', 'activity'],
  'odd-one-out': ['odd one out', 'different', 'logic', 'comparison'],
  'picture-path': ['picture', 'path', 'maze', 'visual'],
  'pattern-train': ['pattern', 'train', 'sequence', 'recognition'],
  'crossword': ['crossword', 'puzzle', 'vocabulary', 'spelling'],
  'cryptogram': ['cryptogram', 'code', 'cipher', 'puzzle'],
  'draw-and-color': ['draw', 'color', 'art', 'creative'],
  'drawing-lines': ['drawing', 'lines', 'tracing', 'motor'],
  'find-and-count': ['find', 'count', 'counting', 'math'],
  'find-objects': ['find', 'objects', 'visual', 'observation'],
  'grid-match': ['grid', 'match', 'matching', 'logic'],
  'matching': ['matching', 'pairs', 'memory', 'logic'],
  'math-puzzle': ['math', 'puzzle', 'problem', 'arithmetic'],
  'missing-pieces': ['missing', 'pieces', 'puzzle', 'visual'],
  'more-less': ['more', 'less', 'comparison', 'math'],
  'picture-sort': ['picture', 'sort', 'sorting', 'categorize'],
  'shadow-match': ['shadow', 'match', 'matching', 'visual'],
  'writing': ['writing', 'handwriting', 'letters', 'practice'],
  'big-small': ['big', 'small', 'size', 'comparison'],
  'chart-count': ['chart', 'count', 'counting', 'graph'],
  'code-addition': ['code', 'addition', 'math', 'puzzle'],
};

/**
 * SEO Quality Scoring System
 * Scores are calculated based on:
 * - Alt text present: +20
 * - Alt text 50-150 chars: +15
 * - Contains app keyword: +20
 * - Title present: +15
 * - Description present: +15
 * - Grade level set: +10
 * - Keywords populated: +5
 * Total: 100 points
 */
interface SeoValidation {
  score: number;
  issues: string[];
  suggestions: string[];
}

function calculateSeoScore(
  appId: string,
  altText?: string | null,
  title?: string | null,
  description?: string | null,
  grade?: string | null,
  keywords?: string[] | null
): SeoValidation {
  let score = 0;
  const issues: string[] = [];
  const suggestions: string[] = [];
  const appKeywords = appToKeywords[appId] || [];

  // Alt text present: +20
  if (altText && altText.trim().length > 0) {
    score += 20;

    // Alt text 50-150 chars: +15
    const altLen = altText.trim().length;
    if (altLen >= 50 && altLen <= 150) {
      score += 15;
    } else if (altLen < 50) {
      issues.push('Alt text is too short (under 50 characters)');
      suggestions.push('Add more descriptive context to alt text');
    } else {
      issues.push('Alt text is too long (over 150 characters)');
      suggestions.push('Shorten alt text to improve readability');
    }

    // Contains app keyword: +20
    const altLower = altText.toLowerCase();
    const hasKeyword = appKeywords.some(kw => altLower.includes(kw.toLowerCase()));
    if (hasKeyword) {
      score += 20;
    } else {
      issues.push('Alt text missing app-related keyword');
      suggestions.push(`Include one of: ${appKeywords.slice(0, 3).join(', ')}`);
    }
  } else {
    issues.push('Alt text is missing');
    suggestions.push('Add descriptive alt text for SEO and accessibility');
  }

  // Title present: +15
  if (title && title.trim().length > 0) {
    score += 15;
  } else {
    suggestions.push('Add an image title for Google Images');
  }

  // Description present: +15
  if (description && description.trim().length > 0) {
    score += 15;
  } else {
    suggestions.push('Add a description for better search visibility');
  }

  // Grade level set: +10
  if (grade && grade.trim().length > 0) {
    score += 10;
  } else {
    suggestions.push('Set grade level for educational targeting');
  }

  // Keywords populated: +5
  if (keywords && keywords.length > 0) {
    score += 5;
  }

  return { score, issues, suggestions };
}

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
// Includes SEO quality score for each sample
export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    const { searchParams } = new URL(request.url);
    const appId = searchParams.get('appId');
    const locale = searchParams.get('locale');
    const includeSeoScore = searchParams.get('seoScore') === 'true';

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

    // Optionally calculate SEO scores for each sample
    const samplesWithScores = includeSeoScore
      ? samples.map(sample => {
          const seoValidation = calculateSeoScore(
            sample.appId,
            sample.altText,
            sample.title,
            sample.description,
            sample.grade,
            sample.keywords
          );
          return {
            ...sample,
            seoScore: seoValidation.score,
            seoIssues: seoValidation.issues,
            seoSuggestions: seoValidation.suggestions,
          };
        })
      : samples;

    return NextResponse.json({
      success: true,
      samples: samplesWithScores,
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
// Returns SEO validation score and recommendations
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

    // Calculate SEO score before saving
    const seoValidation = calculateSeoScore(appId, altText, title, description, grade, keywords);

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
      seoScore: seoValidation.score,
      seoIssues: seoValidation.issues,
      seoSuggestions: seoValidation.suggestions,
      message: seoValidation.score >= 80
        ? 'Sample metadata saved with excellent SEO'
        : seoValidation.score >= 50
        ? 'Sample metadata saved - SEO could be improved'
        : 'Sample metadata saved - SEO needs attention'
    });
  } catch (error) {
    console.error('[SAMPLES] Create/Update error:', error);
    return NextResponse.json({
      success: false,
      error: `Failed to save sample: ${error instanceof Error ? error.message : 'Unknown error'}`
    }, { status: 500 });
  }
}
