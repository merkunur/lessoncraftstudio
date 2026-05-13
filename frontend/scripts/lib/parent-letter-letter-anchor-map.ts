/**
 * parent-letter-letter-anchor-map.ts — A-Z letter-sound anchor mapping
 * for literacy-class parent-letter picture-cue resolution (F7).
 *
 * Per-letter ordered candidate vocab keys, all confirmed present in
 * IMAGE_VOCABULARY (1,263 entries). Used as picture-cue source when
 * package's strand resolves to `literacy` — produces an A-Z letter primer
 * shape ("apple, bear, cat, dog, elephant, fox" for pictureCueCount=6).
 *
 * Image-path lookup at render time via findImageByVocabKey: scans the
 * image library for <vocabKey>.png, preferring non-bw theme directories
 * to keep the parent-letter visually consistent with other materials.
 *
 * Verified against: REFERENCE TRANSLATIONS/image-vocabulary.js (vocab membership)
 * + image library/* directory contents (image existence) at F7 Phase 0.
 * K-3-natural anchor choices per common alphabet-primer conventions.
 * Audited 2026-05-13.
 */

import * as fs from 'fs';
import * as path from 'path';

const REPO_ROOT = path.resolve(__dirname, '..', '..', '..');
const IMAGE_LIBRARY_ROOT = path.join(REPO_ROOT, 'image library');

/**
 * Per-letter ordered candidate vocab keys. Renderer picks the first
 * candidate per letter that has a resolvable image. K-3-natural anchors
 * preferred; all entries confirmed in IMAGE_VOCABULARY at F7 ship.
 */
export const LETTER_ANCHORS: Record<string, string[]> = {
  a: ['apple', 'acorn', 'airplane'],
  b: ['bear', 'ball', 'banana'],
  c: ['cat', 'car', 'cake'],
  d: ['dog', 'duck', 'donut'],
  e: ['elephant', 'egg', 'eagle'],
  f: ['fish', 'fox', 'frog'],
  g: ['girl', 'goat', 'grapes'],
  h: ['hat', 'horse', 'hand'],
  i: ['igloo', 'ice-cream', 'ice'],
  j: ['jar', 'jeans', 'jet'],
  k: ['kite', 'key', 'kangaroo'],
  l: ['lion', 'lamp', 'leaf'],
  m: ['monkey', 'moon', 'mouse'],
  n: ['nest', 'nut', 'nose'],
  o: ['octopus', 'owl', 'orange'],
  p: ['pig', 'pizza', 'panda'],
  q: ['quail'],
  r: ['rabbit', 'rainbow', 'ring'],
  s: ['sun', 'snake', 'sock'],
  t: ['tiger', 'tree', 'train'],
  u: ['umbrella', 'unicorn'],
  v: ['van', 'violin', 'vase'],
  w: ['whale', 'water', 'watch'],
  x: ['x-ray', 'xylophone'],
  y: ['yogurt', 'yacht'],
  z: ['zebra'],
};

/**
 * Returns the first N letter-anchor vocab keys in alphabetical order,
 * skipping any letter whose candidates can't resolve to an image.
 * Used as default literacy-class picture-cue source.
 */
export function pickLetterAnchors(count: number): string[] {
  const letters = 'abcdefghijklmnopqrstuvwxyz'.split('');
  const out: string[] = [];
  for (const letter of letters) {
    if (out.length >= count) break;
    const candidates = LETTER_ANCHORS[letter];
    if (!candidates || candidates.length === 0) continue;
    for (const candidate of candidates) {
      if (findImageByVocabKey(candidate)) {
        out.push(candidate);
        break;
      }
    }
  }
  return out;
}

// ---- Image-path resolution ----

let _imageIndexCache: Map<string, string> | null = null;

/**
 * Builds a one-time index of vocab-key → absolute image path. Scans
 * `image library/<theme>/<vocabKey>.png` across all theme directories;
 * prefers non-bw themes (e.g. 'animals' over 'animals bw'). First match
 * per vocab key wins.
 */
function buildImageIndex(): Map<string, string> {
  const index = new Map<string, string>();
  let themeDirs: string[];
  try {
    themeDirs = fs
      .readdirSync(IMAGE_LIBRARY_ROOT)
      .filter((d) => {
        try {
          return fs.statSync(path.join(IMAGE_LIBRARY_ROOT, d)).isDirectory();
        } catch {
          return false;
        }
      });
  } catch {
    return index;
  }
  // Sort theme dirs so non-bw themes scan first
  themeDirs.sort((a, b) => {
    const aIsBw = /\bbw\b/i.test(a);
    const bIsBw = /\bbw\b/i.test(b);
    if (aIsBw && !bIsBw) return 1;
    if (!aIsBw && bIsBw) return -1;
    return a.localeCompare(b);
  });
  for (const theme of themeDirs) {
    const themePath = path.join(IMAGE_LIBRARY_ROOT, theme);
    let files: string[];
    try {
      files = fs.readdirSync(themePath).filter((f) => f.toLowerCase().endsWith('.png'));
    } catch {
      continue;
    }
    for (const file of files) {
      const key = file.replace(/\.png$/i, '').toLowerCase();
      if (!index.has(key)) {
        index.set(key, path.join(themePath, file));
      }
    }
  }
  return index;
}

/**
 * Returns the absolute path to an image for the given vocab key, or null
 * if no image exists. Builds the index lazily on first call.
 */
export function findImageByVocabKey(vocabKey: string): string | null {
  if (!_imageIndexCache) _imageIndexCache = buildImageIndex();
  return _imageIndexCache.get(vocabKey.toLowerCase()) || null;
}
