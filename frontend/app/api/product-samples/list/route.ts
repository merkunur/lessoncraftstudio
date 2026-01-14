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
  'multiplication': 'multiplication',
  'division': 'division',
  'math-worksheet': 'math',
  'pattern-worksheet': 'pattern',
  'wordsearch': 'wordsearch',
  'word-scramble': 'word-scramble',
  'word-guess': 'word-guess',
  'alphabet-train': 'alphabet-train',
  'alphabet-tracing': 'alphabet-tracing',
  'tracing-worksheet': 'tracing',
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
};

// App display names for UI
const appDisplayNames: Record<string, string> = {
  'addition': 'Addition Worksheets',
  'subtraction': 'Subtraction Worksheets',
  'multiplication': 'Multiplication Worksheets',
  'division': 'Division Worksheets',
  'math-worksheet': 'Math Worksheets',
  'pattern-worksheet': 'Pattern Worksheets',
  'wordsearch': 'Word Search Worksheets',
  'word-scramble': 'Word Scramble Worksheets',
  'word-guess': 'Word Guess Worksheets',
  'alphabet-train': 'Alphabet Train Worksheets',
  'alphabet-tracing': 'Alphabet Tracing Worksheets',
  'tracing-worksheet': 'Tracing Worksheets',
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
};

// Number of sample slots per app
const SLOTS_PER_APP = 5;

// Base path for samples
const SAMPLES_BASE = process.env.NODE_ENV === 'production'
  ? '/opt/lessoncraftstudio/samples'
  : path.join(process.cwd(), 'public', 'samples');

interface SlotStatus {
  slot: number;
  hasWorksheet: boolean;
  hasWorksheetThumb: boolean;
  hasWorksheetPreview: boolean;
  hasAnswer: boolean;
  hasAnswerThumb: boolean;
  hasAnswerPreview: boolean;
  hasPdf: boolean;
  isComplete: boolean;
}

interface AppStatus {
  appId: string;
  folderName: string;
  displayName: string;
  slots: SlotStatus[];
  completedSlots: number;
  totalSlots: number;
}

interface LanguageStatus {
  locale: string;
  language: string;
  apps: Record<string, AppStatus>;
  stats: {
    totalApps: number;
    totalSlots: number;
    completedSlots: number;
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
    totalSlots: number;
    completedSlots: number;
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

async function checkSlotStatus(dir: string, slot: number): Promise<SlotStatus> {
  const [
    hasWorksheet,
    hasWorksheetThumb,
    hasWorksheetPreview,
    hasAnswer,
    hasAnswerThumb,
    hasAnswerPreview,
    hasPdf
  ] = await Promise.all([
    fileExists(path.join(dir, `sample-${slot}.jpeg`)),
    fileExists(path.join(dir, `sample-${slot}_thumb.webp`)),
    fileExists(path.join(dir, `sample-${slot}_preview.webp`)),
    fileExists(path.join(dir, `sample-${slot}-answer.jpeg`)),
    fileExists(path.join(dir, `sample-${slot}-answer_thumb.webp`)),
    fileExists(path.join(dir, `sample-${slot}-answer_preview.webp`)),
    fileExists(path.join(dir, `sample-${slot}.pdf`))
  ]);

  // A slot is complete if it has worksheet with WebP variants and PDF
  // Answer key is optional but nice to have
  const isComplete = hasWorksheet && hasWorksheetThumb && hasWorksheetPreview && hasPdf;

  return {
    slot,
    hasWorksheet,
    hasWorksheetThumb,
    hasWorksheetPreview,
    hasAnswer,
    hasAnswerThumb,
    hasAnswerPreview,
    hasPdf,
    isComplete
  };
}

async function checkAppStatus(language: string, appId: string, folderName: string): Promise<AppStatus> {
  const dir = path.join(SAMPLES_BASE, language, folderName);

  // Check all slots in parallel
  const slotChecks = await Promise.all(
    Array.from({ length: SLOTS_PER_APP }, (_, i) => checkSlotStatus(dir, i + 1))
  );

  const completedSlots = slotChecks.filter(s => s.isComplete).length;

  return {
    appId,
    folderName,
    displayName: appDisplayNames[appId] || appId,
    slots: slotChecks,
    completedSlots,
    totalSlots: SLOTS_PER_APP
  };
}

async function checkLanguageStatus(locale: string, language: string): Promise<LanguageStatus> {
  const apps: Record<string, AppStatus> = {};

  let totalSlots = 0;
  let completedSlots = 0;
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
    totalSlots += status.totalSlots;
    completedSlots += status.completedSlots;

    for (const slot of status.slots) {
      if (slot.hasWorksheet) worksheets++;
      if (slot.hasAnswer) answers++;
      if (slot.hasPdf) pdfs++;
    }
  }

  return {
    locale,
    language,
    apps,
    stats: {
      totalApps: Object.keys(appIdToFolder).length,
      totalSlots,
      completedSlots,
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
    let totalSlots = 0;
    let completedSlots = 0;
    let totalWorksheets = 0;
    let totalAnswers = 0;
    let totalPdfs = 0;

    for (const { locale, status } of languageChecks) {
      matrix[locale] = status;
      totalSlots += status.stats.totalSlots;
      completedSlots += status.stats.completedSlots;
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
        totalSlots,
        completedSlots,
        totalWorksheets,
        totalAnswers,
        totalPdfs,
        percentComplete: totalSlots > 0 ? Math.round((completedSlots / totalSlots) * 100) : 0
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
