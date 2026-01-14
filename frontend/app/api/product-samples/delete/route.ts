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

// Base path for samples - production uses /opt/lessoncraftstudio/samples
const SAMPLES_BASE = process.env.NODE_ENV === 'production'
  ? '/opt/lessoncraftstudio/samples'
  : path.join(process.cwd(), 'public', 'samples');

// Valid slot numbers
const VALID_SLOTS = [1, 2, 3, 4, 5];

// Valid delete types
const VALID_DELETE_TYPES = ['worksheet', 'answer', 'pdf', 'all'];

interface DeleteResult {
  success: boolean;
  message?: string;
  deletedFiles?: string[];
  error?: string;
}

async function fileExists(filePath: string): Promise<boolean> {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

async function createBackup(filePath: string): Promise<string | null> {
  try {
    await fs.access(filePath);
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const backupPath = `${filePath}.deleted.${timestamp}`;
    await fs.rename(filePath, backupPath);
    console.log(`[PRODUCT-SAMPLES] Moved to backup: ${backupPath}`);
    return backupPath;
  } catch {
    return null;
  }
}

async function deleteWorksheetFiles(
  dir: string,
  slot: number,
  createBackups: boolean
): Promise<string[]> {
  const deletedFiles: string[] = [];
  const files = [
    `sample-${slot}.jpeg`,
    `sample-${slot}_thumb.webp`,
    `sample-${slot}_preview.webp`
  ];

  for (const file of files) {
    const filePath = path.join(dir, file);
    if (await fileExists(filePath)) {
      if (createBackups) {
        await createBackup(filePath);
      } else {
        await fs.unlink(filePath);
      }
      deletedFiles.push(file);
    }
  }

  return deletedFiles;
}

async function deleteAnswerFiles(
  dir: string,
  slot: number,
  createBackups: boolean
): Promise<string[]> {
  const deletedFiles: string[] = [];
  const files = [
    `sample-${slot}-answer.jpeg`,
    `sample-${slot}-answer_thumb.webp`,
    `sample-${slot}-answer_preview.webp`
  ];

  for (const file of files) {
    const filePath = path.join(dir, file);
    if (await fileExists(filePath)) {
      if (createBackups) {
        await createBackup(filePath);
      } else {
        await fs.unlink(filePath);
      }
      deletedFiles.push(file);
    }
  }

  return deletedFiles;
}

async function deletePdfFile(
  dir: string,
  slot: number,
  createBackups: boolean
): Promise<string[]> {
  const deletedFiles: string[] = [];
  const file = `sample-${slot}.pdf`;
  const filePath = path.join(dir, file);

  if (await fileExists(filePath)) {
    if (createBackups) {
      await createBackup(filePath);
    } else {
      await fs.unlink(filePath);
    }
    deletedFiles.push(file);
  }

  return deletedFiles;
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const body = await request.json();

    const { locale, appId, slot, deleteType, createBackups = true } = body;

    // Validate required fields
    if (!locale || !localeToFolder[locale]) {
      return NextResponse.json({
        success: false,
        error: `Invalid locale. Must be one of: ${Object.keys(localeToFolder).join(', ')}`
      }, { status: 400 });
    }

    if (!appId || !appIdToFolder[appId]) {
      return NextResponse.json({
        success: false,
        error: `Invalid appId. Must be one of: ${Object.keys(appIdToFolder).join(', ')}`
      }, { status: 400 });
    }

    const slotNum = parseInt(slot, 10);
    if (isNaN(slotNum) || !VALID_SLOTS.includes(slotNum)) {
      return NextResponse.json({
        success: false,
        error: `Invalid slot. Must be one of: ${VALID_SLOTS.join(', ')}`
      }, { status: 400 });
    }

    if (!deleteType || !VALID_DELETE_TYPES.includes(deleteType)) {
      return NextResponse.json({
        success: false,
        error: `Invalid deleteType. Must be one of: ${VALID_DELETE_TYPES.join(', ')}`
      }, { status: 400 });
    }

    const language = localeToFolder[locale];
    const folderName = appIdToFolder[appId];
    const dir = path.join(SAMPLES_BASE, language, folderName);

    let deletedFiles: string[] = [];

    switch (deleteType) {
      case 'worksheet':
        deletedFiles = await deleteWorksheetFiles(dir, slotNum, createBackups);
        break;
      case 'answer':
        deletedFiles = await deleteAnswerFiles(dir, slotNum, createBackups);
        break;
      case 'pdf':
        deletedFiles = await deletePdfFile(dir, slotNum, createBackups);
        break;
      case 'all':
        const worksheetFiles = await deleteWorksheetFiles(dir, slotNum, createBackups);
        const answerFiles = await deleteAnswerFiles(dir, slotNum, createBackups);
        const pdfFiles = await deletePdfFile(dir, slotNum, createBackups);
        deletedFiles = [...worksheetFiles, ...answerFiles, ...pdfFiles];
        break;
    }

    if (deletedFiles.length === 0) {
      return NextResponse.json({
        success: true,
        message: 'No files found to delete',
        deletedFiles: []
      });
    }

    const result: DeleteResult = {
      success: true,
      message: createBackups
        ? `${deletedFiles.length} file(s) moved to backup`
        : `${deletedFiles.length} file(s) deleted permanently`,
      deletedFiles
    };

    console.log(`[PRODUCT-SAMPLES] Delete completed:`, result);
    return NextResponse.json(result);

  } catch (error) {
    console.error('[PRODUCT-SAMPLES] Delete error:', error);
    return NextResponse.json({
      success: false,
      error: `Delete failed: ${error instanceof Error ? error.message : 'Unknown error'}`
    }, { status: 500 });
  }
}

// GET endpoint to retrieve info about the API
export async function GET(): Promise<NextResponse> {
  return NextResponse.json({
    name: 'Product Page Samples Delete API',
    description: 'Delete sample files for a specific slot',
    endpoints: {
      POST: {
        description: 'Delete files for a slot',
        bodyFields: {
          locale: `Locale code: ${Object.keys(localeToFolder).join(', ')}`,
          appId: `App identifier: ${Object.keys(appIdToFolder).slice(0, 5).join(', ')}... (${Object.keys(appIdToFolder).length} total)`,
          slot: `Slot number: ${VALID_SLOTS.join(', ')}`,
          deleteType: `${VALID_DELETE_TYPES.join(', ')}`,
          createBackups: 'Set to false to permanently delete (default: true - moves to .deleted.timestamp)'
        }
      }
    },
    validLocales: Object.keys(localeToFolder),
    validAppIds: Object.keys(appIdToFolder),
    validSlots: VALID_SLOTS,
    validDeleteTypes: VALID_DELETE_TYPES
  });
}
