/**
 * Shared sample discovery utilities
 * Extracted from product page for reuse in blog pages
 *
 * Scans filesystem for sample images (JPEG) in /var/www/lcs-media/samples/
 * Used for generating ImageObject schemas and displaying sample galleries
 */

import * as fs from 'fs/promises';
import * as path from 'path';
import { localeToLanguageFolder } from '@/lib/schema-generator';

// Base path for samples (filesystem scanning for SEO schemas)
// Production uses isolated /var/www/lcs-media/samples - COMPLETELY SEPARATE from code repository
export const SAMPLES_BASE = process.env.NODE_ENV === 'production'
  ? '/var/www/lcs-media/samples'
  : path.join(process.cwd(), 'public', 'samples');

// Map appId from slug to folder name in /samples/
export const appIdToSamplesFolder: Record<string, string> = {
  // Variant appIds found in content files (fixes 47 broken product pages)
  'wordsearch': 'wordsearch',              // ALL 11 languages use this
  'bingo': 'bingo',                        // ALL 11 languages use this
  'math-worksheet': 'math worksheet',      // ALL 11 languages use this
  'pattern-worksheet': 'pattern worksheet', // ALL 11 languages use this
  'big-small-app': 'big small',            // English uses this variant
  'image-crossword': 'crossword',          // English + French use this variant

  // Standard appIds
  'word-search': 'wordsearch',
  'addition': 'addition',
  'alphabet-train': 'alphabet train',
  'coloring': 'coloring',
  'math': 'math worksheet',
  'word-scramble': 'word scramble',
  'find-and-count': 'find and count',
  'matching': 'matching',
  'drawing-lines': 'drawing lines',
  'picture-bingo': 'bingo',
  'sudoku': 'sudoku',
  'big-small': 'big small',
  'chart-count': 'chart count',
  'code-addition': 'code addition',
  'draw-and-color': 'draw and color',
  'find-objects': 'find objects',
  'grid-match': 'grid match',
  'crossword': 'crossword',
  'cryptogram': 'cryptogram',
  'math-puzzle': 'math puzzle',
  'missing-pieces': 'missing pieces',
  'more-less': 'more less',
  'odd-one-out': 'odd one out',
  'pattern-train': 'pattern train',
  'pattern': 'pattern worksheet',
  'picture-path': 'picture path',
  'picture-sort': 'picture sort',
  'prepositions': 'prepositions',
  'shadow-match': 'shadow match',
  'subtraction': 'subtraction',
  'treasure-hunt': 'treasure hunt',
  'word-guess': 'word guess',
  'writing': 'writing',
  'story-dice': 'story dice',
};

// Normalize internal-linking appIds to sample folder appIds
const APP_ID_NORMALIZATION: Record<string, string> = {
  'image-addition': 'addition',
  'matching-app': 'matching',
  'writing-app': 'writing',
  'chart-count-color': 'chart-count',
  'big-small-app': 'big-small',
  'image-crossword': 'crossword',
  'image-cryptogram': 'cryptogram',
  'picture-bingo': 'bingo',
};

/**
 * Normalize an appId from internal-linking to one recognized by appIdToSamplesFolder
 */
export function normalizeAppIdForSamples(appId: string): string {
  return APP_ID_NORMALIZATION[appId] || appId;
}

// Discovered sample interface for SchemaScripts
export interface DiscoveredSample {
  filename: string;
  worksheetSrc: string;
  answerKeySrc?: string;
}

/**
 * Check if a filename is an answer key (case-insensitive)
 */
export function isAnswerKey(filename: string): boolean {
  return /answer/i.test(filename);
}

/**
 * Get base name without extension
 */
export function getBaseName(filename: string): string {
  const lastDot = filename.lastIndexOf('.');
  return lastDot === -1 ? filename : filename.substring(0, lastDot);
}

/**
 * Find matching answer key for a worksheet
 */
export function findAnswerKeyForWorksheet(worksheetFilename: string, answerKeyFiles: string[]): string | undefined {
  const wsBase = getBaseName(worksheetFilename).toLowerCase();

  // sample-N → sample-N-answer
  const sampleMatch = wsBase.match(/^sample-(\d+)$/);
  if (sampleMatch) {
    const num = sampleMatch[1];
    const exact = answerKeyFiles.find(f => getBaseName(f).toLowerCase() === `sample-${num}-answer`);
    if (exact) return exact;
  }

  // Direct variations
  const variations = [
    `${wsBase} answer key`,
    `${wsBase}_answer_key`,
    `${wsBase}-answer`,
    `${wsBase}_answer`,
  ];

  for (const variation of variations) {
    const match = answerKeyFiles.find(f => getBaseName(f).toLowerCase() === variation);
    if (match) return match;
  }

  return undefined;
}

/**
 * Discover sample files from filesystem for a given app and locale
 * Used for generating ImageObject schemas and sample galleries
 */
export async function discoverSamplesFromFilesystem(
  appId: string,
  locale: string
): Promise<DiscoveredSample[]> {
  const languageFolder = localeToLanguageFolder[locale] || 'english';
  const samplesFolder = appIdToSamplesFolder[appId];

  if (!samplesFolder) {
    return [];
  }

  const dir = path.join(SAMPLES_BASE, languageFolder, samplesFolder);

  let files: string[];
  try {
    files = await fs.readdir(dir);
  } catch {
    // Directory doesn't exist
    return [];
  }

  // Get JPEG files
  const jpegFiles = files.filter(f => /\.(jpeg|jpg)$/i.test(f));
  const worksheetFiles = jpegFiles.filter(f => !isAnswerKey(f));
  const answerKeyFiles = jpegFiles.filter(f => isAnswerKey(f));

  // Sort worksheets alphabetically
  worksheetFiles.sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));

  const basePath = `/samples/${languageFolder}/${samplesFolder}`;

  return worksheetFiles.map(wsFile => {
    const answerFile = findAnswerKeyForWorksheet(wsFile, answerKeyFiles);
    return {
      filename: wsFile,
      worksheetSrc: `${basePath}/${wsFile}`,
      answerKeySrc: answerFile ? `${basePath}/${answerFile}` : undefined,
    };
  });
}
