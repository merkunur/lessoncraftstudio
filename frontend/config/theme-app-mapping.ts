/**
 * Theme-to-App Curation Mapping
 *
 * Hand-curated 8-15 app selections per theme, replacing the old ALL_APPS
 * approach that made every theme page near-identical (doorway page signal).
 *
 * Part 3 of Landing Page SEO Perfection
 */

import type { ThemeId, AppId, AppCategory, AppCategoryGroup } from '@/content/themes/types';
import { ALL_APP_IDS } from '@/content/themes/types';
import { getGradeFilteredApps } from '@/config/grade-slugs';

// ── Category Lookup ──────────────────────────────────────────────────
// Maps each of the 33 apps to one of the 4 enriched categories.
//
// Consolidation from 8 existing categories:
//   math       = Math (7 apps)
//   literacy   = Language Arts (4) + Word Games (4)
//   visual     = Art & Creativity (2) + Visual Perception (3) + Matching & Sorting (5)
//   puzzles    = Logic Puzzles (4) + Patterns & Motor (4)

const appCategoryMap: Record<AppId, AppCategory> = {
  // Math (7)
  'image-addition': 'math',
  'math-worksheet': 'math',
  'chart-count-color': 'math',
  'code-addition': 'math',
  'math-puzzle': 'math',
  'more-less': 'math',
  'subtraction': 'math',

  // Literacy (8) — Language Arts + Word Games
  'alphabet-train': 'literacy',
  'word-scramble': 'literacy',
  'prepositions': 'literacy',
  'writing-app': 'literacy',
  'word-search': 'literacy',
  'image-crossword': 'literacy',
  'word-guess': 'literacy',
  'image-cryptogram': 'literacy',

  // Visual (10) — Art & Creativity + Visual Perception + Matching & Sorting
  'coloring': 'visual',
  'draw-and-color': 'visual',
  'find-and-count': 'visual',
  'find-objects': 'visual',
  'missing-pieces': 'visual',
  'matching-app': 'visual',
  'grid-match': 'visual',
  'shadow-match': 'visual',
  'picture-sort': 'visual',
  'big-small-app': 'visual',

  // Puzzles (8) — Logic Puzzles + Patterns & Motor
  'sudoku': 'puzzles',
  'odd-one-out': 'puzzles',
  'picture-path': 'puzzles',
  'treasure-hunt': 'puzzles',
  'drawing-lines': 'puzzles',
  'pattern-train': 'puzzles',
  'pattern-worksheet': 'puzzles',
  'picture-bingo': 'puzzles',
};

// ── Per-Theme Curated Apps ───────────────────────────────────────────
// Each theme gets 8-15 hand-picked apps. Every theme has at least one
// app from each of the 4 categories. No two themes share an identical list.

const themeApps: Record<ThemeId, AppId[]> = {
  // ── Animals & Nature ─────────────────────────────────────────────
  animals: [
    'coloring', 'find-and-count', 'matching-app', 'shadow-match',
    'find-objects', 'picture-sort', 'big-small-app',
    'image-addition',
    'word-search', 'image-crossword',
    'odd-one-out', 'pattern-worksheet',
  ],
  farm: [
    'coloring', 'find-and-count', 'matching-app', 'big-small-app', 'picture-sort',
    'image-addition', 'more-less',
    'word-search', 'alphabet-train',
    'odd-one-out', 'drawing-lines',
  ],
  pets: [
    'coloring', 'draw-and-color', 'find-and-count', 'shadow-match', 'big-small-app',
    'image-addition',
    'word-scramble', 'word-search',
    'picture-path', 'pattern-train',
  ],
  birds: [
    'coloring', 'find-and-count', 'shadow-match', 'picture-sort', 'find-objects',
    'image-addition',
    'word-search', 'image-crossword',
    'odd-one-out', 'pattern-worksheet',
  ],
  insects: [
    'coloring', 'find-and-count', 'matching-app', 'find-objects', 'big-small-app',
    'image-addition', 'chart-count-color',
    'word-search', 'word-scramble',
    'odd-one-out', 'pattern-train',
  ],
  ocean: [
    'coloring', 'draw-and-color', 'find-and-count', 'shadow-match',
    'find-objects', 'matching-app',
    'image-addition',
    'word-search', 'image-crossword',
    'odd-one-out', 'picture-path',
  ],
  zoo: [
    'coloring', 'find-and-count', 'matching-app', 'shadow-match',
    'big-small-app', 'picture-sort',
    'image-addition', 'more-less',
    'word-search', 'alphabet-train',
    'odd-one-out', 'pattern-worksheet',
  ],
  dinosaurs: [
    'coloring', 'draw-and-color', 'find-objects', 'shadow-match',
    'big-small-app', 'matching-app', 'missing-pieces',
    'image-addition',
    'word-search', 'word-scramble',
    'odd-one-out', 'treasure-hunt',
  ],
  forest: [
    'coloring', 'find-and-count', 'find-objects', 'shadow-match',
    'matching-app', 'big-small-app',
    'image-addition',
    'word-search',
    'picture-path', 'odd-one-out', 'drawing-lines',
  ],
  garden: [
    'coloring', 'draw-and-color', 'find-and-count', 'matching-app',
    'picture-sort', 'find-objects',
    'image-addition', 'chart-count-color',
    'word-search',
    'pattern-train', 'pattern-worksheet',
  ],

  // ── Academic ─────────────────────────────────────────────────────
  numbers: [
    'coloring', 'find-and-count',
    'image-addition', 'math-worksheet', 'chart-count-color', 'code-addition',
    'math-puzzle', 'more-less', 'subtraction',
    'word-search',
    'sudoku', 'pattern-worksheet',
  ],
  alphabet: [
    'coloring', 'draw-and-color', 'matching-app',
    'image-addition',
    'alphabet-train', 'word-scramble', 'writing-app',
    'word-search', 'image-crossword', 'word-guess',
    'pattern-train', 'picture-bingo',
  ],
  shapes: [
    'coloring', 'draw-and-color', 'matching-app', 'grid-match',
    'shadow-match', 'picture-sort', 'missing-pieces',
    'image-addition', 'math-worksheet',
    'word-search',
    'sudoku', 'pattern-worksheet',
  ],
  colors: [
    'coloring', 'draw-and-color', 'picture-sort', 'matching-app',
    'find-and-count', 'big-small-app',
    'image-addition', 'chart-count-color',
    'word-search',
    'pattern-train', 'pattern-worksheet',
  ],
  school: [
    'coloring', 'matching-app', 'find-and-count', 'grid-match',
    'image-addition', 'math-worksheet', 'subtraction',
    'alphabet-train', 'writing-app', 'word-search',
    'sudoku', 'odd-one-out', 'pattern-worksheet',
  ],

  // ── Seasons & Weather ────────────────────────────────────────────
  seasons: [
    'coloring', 'draw-and-color', 'find-and-count', 'matching-app', 'picture-sort',
    'image-addition',
    'word-search', 'word-scramble',
    'pattern-train', 'pattern-worksheet', 'odd-one-out',
  ],
  winter: [
    'coloring', 'draw-and-color', 'find-and-count', 'shadow-match', 'matching-app',
    'image-addition',
    'word-search', 'image-crossword',
    'sudoku', 'picture-path',
  ],
  spring: [
    'coloring', 'draw-and-color', 'find-and-count', 'matching-app',
    'picture-sort', 'find-objects',
    'image-addition',
    'word-search',
    'pattern-train', 'drawing-lines',
  ],
  summer: [
    'coloring', 'draw-and-color', 'find-and-count', 'picture-sort', 'shadow-match',
    'image-addition',
    'word-search', 'word-scramble',
    'odd-one-out', 'treasure-hunt',
  ],
  weather: [
    'coloring', 'draw-and-color', 'matching-app', 'picture-sort', 'find-and-count',
    'image-addition',
    'word-search', 'word-scramble',
    'pattern-worksheet', 'odd-one-out',
  ],
  flowers: [
    'coloring', 'draw-and-color', 'find-and-count', 'matching-app',
    'shadow-match', 'picture-sort',
    'image-addition',
    'word-search',
    'pattern-train', 'pattern-worksheet',
  ],
  nature: [
    'coloring', 'draw-and-color', 'find-and-count', 'find-objects',
    'shadow-match', 'matching-app',
    'image-addition',
    'word-search', 'image-crossword',
    'odd-one-out', 'drawing-lines',
  ],

  // ── Holidays ─────────────────────────────────────────────────────
  holidays: [
    'coloring', 'draw-and-color', 'find-and-count', 'matching-app',
    'picture-sort', 'grid-match',
    'image-addition',
    'word-search', 'word-scramble',
    'sudoku', 'picture-bingo',
  ],
  easter: [
    'coloring', 'draw-and-color', 'find-and-count', 'matching-app',
    'shadow-match', 'find-objects',
    'image-addition',
    'word-search',
    'treasure-hunt', 'pattern-train',
  ],
  halloween: [
    'coloring', 'draw-and-color', 'find-objects', 'shadow-match',
    'matching-app', 'missing-pieces',
    'image-addition',
    'word-search', 'image-cryptogram',
    'sudoku', 'treasure-hunt', 'picture-path',
  ],
  xmas: [
    'coloring', 'draw-and-color', 'find-and-count', 'matching-app',
    'shadow-match', 'grid-match',
    'image-addition',
    'word-search', 'word-scramble',
    'sudoku', 'picture-bingo', 'pattern-worksheet',
  ],
  birthday: [
    'coloring', 'draw-and-color', 'find-and-count', 'matching-app', 'picture-sort',
    'image-addition',
    'word-search', 'word-scramble',
    'picture-bingo', 'treasure-hunt',
  ],

  // ── Imagination ──────────────────────────────────────────────────
  'fairy-tales': [
    'coloring', 'draw-and-color', 'shadow-match',
    'image-addition',
    'alphabet-train', 'word-scramble', 'word-search', 'word-guess',
    'sudoku', 'picture-path', 'treasure-hunt',
  ],
  pirates: [
    'coloring', 'find-objects', 'shadow-match', 'matching-app',
    'image-addition',
    'word-search', 'image-cryptogram', 'word-scramble',
    'sudoku', 'treasure-hunt', 'picture-path',
  ],
  superheroes: [
    'coloring', 'draw-and-color', 'shadow-match', 'matching-app',
    'image-addition',
    'word-search', 'word-guess',
    'sudoku', 'odd-one-out', 'picture-path',
  ],
  robots: [
    'coloring', 'grid-match', 'shadow-match', 'matching-app',
    'image-addition', 'code-addition',
    'word-search', 'image-cryptogram',
    'sudoku', 'odd-one-out', 'picture-path', 'pattern-worksheet',
  ],
  circus: [
    'coloring', 'draw-and-color', 'find-and-count', 'matching-app', 'shadow-match',
    'image-addition',
    'word-search', 'word-scramble',
    'odd-one-out', 'picture-bingo', 'treasure-hunt',
  ],

  // ── Home & Life ──────────────────────────────────────────────────
  food: [
    'coloring', 'find-and-count', 'matching-app', 'picture-sort', 'big-small-app',
    'image-addition', 'more-less', 'chart-count-color', 'subtraction',
    'word-search',
    'odd-one-out', 'pattern-worksheet',
  ],
  cooking: [
    'coloring', 'matching-app', 'picture-sort', 'find-and-count',
    'image-addition', 'more-less',
    'word-search', 'prepositions',
    'pattern-worksheet', 'odd-one-out',
  ],
  clothing: [
    'coloring', 'draw-and-color', 'matching-app', 'picture-sort',
    'shadow-match', 'big-small-app',
    'image-addition',
    'word-search',
    'pattern-train', 'odd-one-out',
  ],
  household: [
    'coloring', 'find-and-count', 'matching-app', 'picture-sort',
    'shadow-match', 'grid-match',
    'image-addition',
    'word-search', 'prepositions',
    'odd-one-out', 'pattern-worksheet',
  ],
  furniture: [
    'coloring', 'matching-app', 'picture-sort', 'shadow-match', 'grid-match',
    'image-addition',
    'word-search', 'prepositions',
    'pattern-worksheet', 'odd-one-out',
  ],

  // ── Active & Outdoor ─────────────────────────────────────────────
  sports: [
    'coloring', 'find-and-count', 'matching-app', 'shadow-match', 'big-small-app',
    'image-addition', 'math-worksheet', 'math-puzzle',
    'word-search', 'word-scramble',
    'sudoku', 'odd-one-out',
  ],
  camping: [
    'coloring', 'find-objects', 'matching-app', 'shadow-match',
    'image-addition',
    'word-search', 'word-scramble',
    'treasure-hunt', 'picture-path', 'odd-one-out',
  ],
  travel: [
    'coloring', 'find-objects', 'matching-app', 'picture-sort',
    'image-addition',
    'word-search', 'image-crossword',
    'picture-path', 'treasure-hunt', 'odd-one-out',
  ],
  transportation: [
    'coloring', 'find-and-count', 'matching-app', 'shadow-match',
    'picture-sort', 'big-small-app',
    'image-addition', 'math-worksheet', 'subtraction',
    'word-search',
    'odd-one-out', 'pattern-train',
  ],
  construction: [
    'coloring', 'matching-app', 'grid-match', 'shadow-match',
    'image-addition', 'math-worksheet', 'code-addition', 'math-puzzle',
    'word-search',
    'sudoku', 'pattern-worksheet', 'picture-path',
  ],

  // ── People & Creative ────────────────────────────────────────────
  body: [
    'coloring', 'draw-and-color', 'find-and-count', 'matching-app', 'missing-pieces',
    'image-addition',
    'word-search', 'writing-app', 'word-scramble',
    'odd-one-out', 'drawing-lines',
  ],
  emotions: [
    'coloring', 'draw-and-color', 'matching-app', 'picture-sort',
    'image-addition',
    'word-search', 'writing-app', 'word-guess',
    'odd-one-out', 'drawing-lines',
  ],
  jobs: [
    'coloring', 'find-and-count', 'matching-app', 'shadow-match', 'picture-sort',
    'image-addition',
    'word-search', 'word-scramble', 'image-crossword',
    'odd-one-out', 'picture-bingo',
  ],
  music: [
    'coloring', 'draw-and-color', 'matching-app', 'shadow-match',
    'image-addition',
    'word-search', 'word-scramble',
    'pattern-train', 'pattern-worksheet', 'odd-one-out',
  ],
  toys: [
    'coloring', 'draw-and-color', 'find-and-count', 'matching-app',
    'big-small-app', 'shadow-match',
    'image-addition', 'more-less',
    'word-search',
    'odd-one-out', 'picture-bingo',
  ],
  space: [
    'coloring', 'draw-and-color', 'find-objects', 'shadow-match',
    'image-addition', 'code-addition',
    'word-search', 'word-scramble', 'image-cryptogram',
    'sudoku', 'picture-path', 'odd-one-out',
  ],

  // ── Remaining ────────────────────────────────────────────────────
  fruits: [
    'coloring', 'find-and-count', 'matching-app', 'picture-sort', 'big-small-app',
    'image-addition', 'chart-count-color',
    'word-search',
    'odd-one-out', 'pattern-train',
  ],
  vegetables: [
    'coloring', 'find-and-count', 'matching-app', 'picture-sort', 'big-small-app',
    'image-addition', 'more-less',
    'word-search',
    'pattern-worksheet', 'odd-one-out',
  ],
};

// ── Exported Functions ───────────────────────────────────────────────

/**
 * Returns the curated app list for a theme.
 * Falls back to ALL_APP_IDS for unknown themes.
 */
export function getThemeCuratedApps(themeId: string): AppId[] {
  return themeApps[themeId as ThemeId] ?? [...ALL_APP_IDS];
}

/**
 * Returns which enriched category an app belongs to.
 */
export function getAppCategory(appId: string): AppCategory {
  return appCategoryMap[appId as AppId] ?? 'visual';
}

/**
 * Groups a theme's curated apps into the 4 enriched categories.
 * Only includes categories that have at least one app for the theme.
 */
export function getThemeAppCategories(themeId: string): AppCategoryGroup[] {
  const apps = getThemeCuratedApps(themeId);

  const grouped: Record<AppCategory, AppId[]> = {
    math: [],
    literacy: [],
    visual: [],
    puzzles: [],
  };

  for (const appId of apps) {
    const cat = getAppCategory(appId);
    grouped[cat].push(appId);
  }

  const order: AppCategory[] = ['math', 'literacy', 'visual', 'puzzles'];

  return order
    .filter((cat) => grouped[cat].length > 0)
    .map((cat) => ({
      category: cat,
      appIds: grouped[cat],
    }));
}

/**
 * Intersects a theme's curated apps with grade-appropriate apps.
 * Uses the existing getGradeFilteredApps() from grade-slugs.ts.
 */
export function getThemeGradeCuratedApps(themeId: string, gradeId: string): AppId[] {
  const curated = getThemeCuratedApps(themeId);
  return getGradeFilteredApps(gradeId, curated) as AppId[];
}
