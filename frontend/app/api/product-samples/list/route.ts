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

// Valid app IDs (33 apps) - mapped to their server folder names
const appIdToFolder: Record<string, string> = {
  'addition': 'addition',
  'subtraction': 'subtraction',
  'math-worksheet': 'math',
  'pattern-worksheet': 'pattern',
  'wordsearch': 'wordsearch',
  'word-scramble': 'word-scramble',
  'word-guess': 'word-guess',
  'alphabet-train': 'alphabet-train',
  'prepositions': 'prepositions',
  'bingo': 'bingo',
  'coloring': 'coloring',
  'sudoku': 'sudoku',
  'treasure-hunt': 'treasure-hunt',
  'odd-one-out': 'odd-one-out',
  'picture-path': 'picture-path',
  'pattern-train': 'pattern-train',
  'crossword': 'crossword',
  'cryptogram': 'cryptogram',
  'draw-and-color': 'draw-and-color',
  'drawing-lines': 'drawing-lines',
  'find-and-count': 'find-and-count',
  'find-objects': 'find-objects',
  'grid-match': 'grid-match',
  'matching': 'matching',
  'math-puzzle': 'math-puzzle',
  'missing-pieces': 'missing-pieces',
  'more-less': 'more-less',
  'picture-sort': 'picture-sort',
  'shadow-match': 'shadow-match',
  'writing': 'writing',
  'big-small': 'big-small',
  'chart-count': 'chart-count',
  'code-addition': 'code-addition',
};

// App display names for UI
const appDisplayNames: Record<string, string> = {
  'addition': 'Addition Worksheets',
  'subtraction': 'Subtraction Worksheets',
  'math-worksheet': 'Math Worksheets',
  'pattern-worksheet': 'Pattern Worksheets',
  'wordsearch': 'Word Search Worksheets',
  'word-scramble': 'Word Scramble Worksheets',
  'word-guess': 'Word Guess Worksheets',
  'alphabet-train': 'Alphabet Train Worksheets',
  'prepositions': 'Prepositions Worksheets',
  'bingo': 'Picture Bingo Worksheets',
  'coloring': 'Coloring Pages',
  'sudoku': 'Sudoku Worksheets',
  'treasure-hunt': 'Treasure Hunt Worksheets',
  'odd-one-out': 'Odd One Out Worksheets',
  'picture-path': 'Picture Path Worksheets',
  'pattern-train': 'Pattern Train Worksheets',
  'crossword': 'Crossword Worksheets',
  'cryptogram': 'Cryptogram Worksheets',
  'draw-and-color': 'Draw and Color Worksheets',
  'drawing-lines': 'Drawing Lines Worksheets',
  'find-and-count': 'Find and Count Worksheets',
  'find-objects': 'Find Objects Worksheets',
  'grid-match': 'Grid Match Worksheets',
  'matching': 'Matching Worksheets',
  'math-puzzle': 'Math Puzzle Worksheets',
  'missing-pieces': 'Missing Pieces Worksheets',
  'more-less': 'More or Less Worksheets',
  'picture-sort': 'Picture Sort Worksheets',
  'shadow-match': 'Shadow Match Worksheets',
  'writing': 'Writing Worksheets',
  'big-small': 'Big Small Worksheets',
  'chart-count': 'Chart Count Worksheets',
  'code-addition': 'Code Addition Worksheets',
};

// Base path for samples
const SAMPLES_BASE = process.env.NODE_ENV === 'production'
  ? '/opt/lessoncraftstudio/samples'
  : path.join(process.cwd(), 'public', 'samples');

interface DiscoveredSample {
  filename: string;
  worksheetPath: string;
  answerKeyPath?: string;
  hasThumb: boolean;
  hasPreview: boolean;
  hasPdf: boolean;
  pdfPath?: string;
}

interface AppStatus {
  appId: string;
  folderName: string;
  displayName: string;
  samples: DiscoveredSample[];
  completedSamples: number;
  totalSamples: number;
}

interface LanguageStatus {
  locale: string;
  language: string;
  apps: Record<string, AppStatus>;
  stats: {
    totalApps: number;
    totalSamples: number;
    completedSamples: number;
    worksheets: number;
    answers: number;
    pdfs: number;
  };
}

interface MatrixResult {
  success: boolean;
  matrix: Record<string, LanguageStatus>;
  globalStats: {
    totalLanguages: number;
    totalApps: number;
    totalSamples: number;
    completedSamples: number;
    totalWorksheets: number;
    totalAnswers: number;
    totalPdfs: number;
    percentComplete: number;
  };
  appIds: string[];
  locales: string[];
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
 * Check if a filename is an answer key (case-insensitive).
 * Answer keys contain "answer" in the filename.
 */
function isAnswerKey(filename: string): boolean {
  return /answer/i.test(filename);
}

/**
 * Get the base name of a file without extension.
 * E.g. "sample-1.jpeg" → "sample-1", "addition_worksheet portrait.jpeg" → "addition_worksheet portrait"
 */
function getBaseName(filename: string): string {
  const lastDot = filename.lastIndexOf('.');
  return lastDot === -1 ? filename : filename.substring(0, lastDot);
}

/**
 * Try to find a matching answer key for a given worksheet filename.
 * Matching strategies:
 * 1. sample-N.jpeg → sample-N-answer.jpeg
 * 2. {name}.jpeg → {name} answer key.jpeg, {name}_answer_key.jpeg
 * 3. Fuzzy: any answer key JPEG that shares significant words with the worksheet
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

  // Strategy 3: fuzzy word matching - find answer key that shares the most significant words
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

      // Require at least half the worksheet words to match
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
 * Returns an array of DiscoveredSample sorted alphabetically by filename.
 */
async function scanAppDirectory(dir: string, language: string, folderName: string): Promise<DiscoveredSample[]> {
  let files: string[];
  try {
    files = await fs.readdir(dir);
  } catch {
    // Directory doesn't exist
    return [];
  }

  // Classify files
  const jpegFiles = files.filter(f => /\.(jpeg|jpg)$/i.test(f));
  const webpFiles = new Set(files.filter(f => /\.webp$/i.test(f)).map(f => f.toLowerCase()));
  const pdfFiles = new Set(files.filter(f => /\.pdf$/i.test(f)).map(f => f.toLowerCase()));

  // Separate worksheets from answer keys
  const worksheetFiles = jpegFiles.filter(f => !isAnswerKey(f));
  const answerKeyFiles = jpegFiles.filter(f => isAnswerKey(f));

  // Sort worksheets alphabetically for consistent ordering
  worksheetFiles.sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));

  const basePath = `/samples/${language}/${folderName}`;

  const samples: DiscoveredSample[] = [];

  for (const wsFile of worksheetFiles) {
    const wsBase = getBaseName(wsFile);

    // Find matching answer key
    const answerFile = findAnswerKey(wsFile, answerKeyFiles);

    // Check for WebP variants (thumbnail and preview)
    const hasThumb = webpFiles.has(`${wsBase}_thumb.webp`.toLowerCase());
    const hasPreview = webpFiles.has(`${wsBase}_preview.webp`.toLowerCase());

    // Check for PDF
    const pdfFilename = `${wsBase}.pdf`.toLowerCase();
    const hasPdf = pdfFiles.has(pdfFilename);

    // Find actual PDF filename (preserve original casing)
    let pdfPath: string | undefined;
    if (hasPdf) {
      const actualPdf = files.find(f => f.toLowerCase() === pdfFilename);
      pdfPath = actualPdf ? `${basePath}/${actualPdf}` : `${basePath}/${wsBase}.pdf`;
    }

    samples.push({
      filename: wsFile,
      worksheetPath: `${basePath}/${wsFile}`,
      answerKeyPath: answerFile ? `${basePath}/${answerFile}` : undefined,
      hasThumb,
      hasPreview,
      hasPdf,
      pdfPath,
    });
  }

  return samples;
}

async function checkAppStatus(language: string, appId: string, folderName: string): Promise<AppStatus> {
  const dir = path.join(SAMPLES_BASE, language, folderName);

  const samples = await scanAppDirectory(dir, language, folderName);

  const completedSamples = samples.filter(s =>
    s.hasThumb && s.hasPreview && s.hasPdf
  ).length;

  return {
    appId,
    folderName,
    displayName: appDisplayNames[appId] || appId,
    samples,
    completedSamples,
    totalSamples: samples.length,
  };
}

async function checkLanguageStatus(locale: string, language: string): Promise<LanguageStatus> {
  const apps: Record<string, AppStatus> = {};

  let totalSamples = 0;
  let completedSamples = 0;
  let worksheets = 0;
  let answers = 0;
  let pdfs = 0;

  // Check all apps in parallel
  const appChecks = await Promise.all(
    Object.entries(appIdToFolder).map(async ([appId, folderName]) => {
      const status = await checkAppStatus(language, appId, folderName);
      return { appId, status };
    })
  );

  // Aggregate results
  for (const { appId, status } of appChecks) {
    apps[appId] = status;
    totalSamples += status.totalSamples;
    completedSamples += status.completedSamples;
    worksheets += status.samples.length;
    answers += status.samples.filter(s => s.answerKeyPath).length;
    pdfs += status.samples.filter(s => s.hasPdf).length;
  }

  return {
    locale,
    language,
    apps,
    stats: {
      totalApps: Object.keys(appIdToFolder).length,
      totalSamples,
      completedSamples,
      worksheets,
      answers,
      pdfs
    }
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
    let totalSamples = 0;
    let completedSamples = 0;
    let totalWorksheets = 0;
    let totalAnswers = 0;
    let totalPdfs = 0;

    for (const { locale, status } of languageChecks) {
      matrix[locale] = status;
      totalSamples += status.stats.totalSamples;
      completedSamples += status.stats.completedSamples;
      totalWorksheets += status.stats.worksheets;
      totalAnswers += status.stats.answers;
      totalPdfs += status.stats.pdfs;
    }

    const totalLanguages = Object.keys(localeToFolder).length;
    const totalApps = Object.keys(appIdToFolder).length;

    const result: MatrixResult = {
      success: true,
      matrix,
      globalStats: {
        totalLanguages,
        totalApps,
        totalSamples,
        completedSamples,
        totalWorksheets,
        totalAnswers,
        totalPdfs,
        percentComplete: totalSamples > 0 ? Math.round((completedSamples / totalSamples) * 100) : 0
      },
      appIds: Object.keys(appIdToFolder),
      locales: Object.keys(localeToFolder)
    };

    return NextResponse.json(result);

  } catch (error) {
    console.error('[PRODUCT-SAMPLES] List error:', error);
    return NextResponse.json({
      success: false,
      error: `Failed to list status: ${error instanceof Error ? error.message : 'Unknown error'}`
    }, { status: 500 });
  }
}
