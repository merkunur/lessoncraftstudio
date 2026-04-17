/**
 * Product Catalog — Payment-processor-agnostic
 *
 * Source of truth for all 33 apps and 6 categories.
 * Extracted from warriorplus-products.ts during Lemon Squeezy migration (April 2027).
 */

// ==========================================
// APP DEFINITIONS
// ==========================================

export const ALL_APPS = {
  // Math apps (6)
  'addition': { name: 'Addition', category: 'math', htmlFile: 'addition.html' },
  'subtraction': { name: 'Subtraction', category: 'math', htmlFile: 'subtraction.html' },
  'code-addition': { name: 'Code Addition', category: 'math', htmlFile: 'code-addition.html' },
  'more-less': { name: 'More or Less', category: 'math', htmlFile: 'more-less.html' },
  'math-puzzle': { name: 'Math Puzzle', category: 'math', htmlFile: 'math-puzzle.html' },
  'math-worksheet': { name: 'Math Worksheet', category: 'math', htmlFile: 'math-worksheet.html' },

  // Literacy apps (7)
  'alphabet-train': { name: 'Alphabet Train', category: 'literacy', htmlFile: 'alphabet-train.html' },
  'prepositions': { name: 'Prepositions', category: 'literacy', htmlFile: 'prepositions.html' },
  'word-guess': { name: 'Word Guess', category: 'literacy', htmlFile: 'word-guess.html' },
  'word-scramble': { name: 'Word Scramble', category: 'literacy', htmlFile: 'word-scramble.html' },
  'wordsearch': { name: 'Word Search', category: 'literacy', htmlFile: 'wordsearch.html' },
  'cryptogram': { name: 'Cryptogram', category: 'literacy', htmlFile: 'cryptogram.html' },
  'writing': { name: 'Writing', category: 'literacy', htmlFile: 'writing.html' },

  // Visual apps (7)
  'big-small': { name: 'Big & Small', category: 'visual', htmlFile: 'big-small.html' },
  'pattern-train': { name: 'Pattern Train', category: 'visual', htmlFile: 'pattern-train.html' },
  'pattern-worksheet': { name: 'Pattern Worksheet', category: 'visual', htmlFile: 'pattern-worksheet.html' },
  'draw-and-color': { name: 'Draw & Color', category: 'visual', htmlFile: 'draw-and-color.html' },
  'drawing-lines': { name: 'Drawing Lines', category: 'visual', htmlFile: 'drawing-lines.html' },
  'coloring': { name: 'Coloring', category: 'visual', htmlFile: 'coloring.html' },
  'chart-count': { name: 'Chart Count', category: 'visual', htmlFile: 'chart-count.html' },

  // Matching apps (5)
  'matching': { name: 'Matching', category: 'matching', htmlFile: 'matching.html' },
  'grid-match': { name: 'Grid Match', category: 'matching', htmlFile: 'grid-match.html' },
  'shadow-match': { name: 'Shadow Match', category: 'matching', htmlFile: 'shadow-match.html' },
  'bingo': { name: 'Bingo', category: 'matching', htmlFile: 'bingo.html' },
  'picture-sort': { name: 'Picture Sort', category: 'matching', htmlFile: 'picture-sort.html' },

  // Puzzle apps (4)
  'missing-pieces': { name: 'Missing Pieces', category: 'puzzle', htmlFile: 'missing-pieces.html' },
  'odd-one-out': { name: 'Odd One Out', category: 'puzzle', htmlFile: 'odd-one-out.html' },
  'sudoku': { name: 'Sudoku', category: 'puzzle', htmlFile: 'sudoku.html' },
  'picture-path': { name: 'Picture Path', category: 'puzzle', htmlFile: 'picture-path.html' },

  // Search apps (4)
  'find-and-count': { name: 'Find & Count', category: 'search', htmlFile: 'find-and-count.html' },
  'find-objects': { name: 'Find Objects', category: 'search', htmlFile: 'find-objects.html' },
  'crossword': { name: 'Crossword', category: 'search', htmlFile: 'crossword.html' },
  'treasure-hunt': { name: 'Treasure Hunt', category: 'search', htmlFile: 'treasure-hunt.html' },
} as const;

export type AppId = keyof typeof ALL_APPS;

// ==========================================
// CATEGORY DEFINITIONS
// ==========================================

export const APP_CATEGORIES = {
  math: {
    name: 'Math Mastery',
    description: 'Professional math worksheet generators for all grade levels',
    apps: ['addition', 'subtraction', 'code-addition', 'more-less', 'math-puzzle', 'math-worksheet'] as AppId[],
    color: '#3B82F6',
    icon: 'calculator',
  },
  literacy: {
    name: 'Literacy & Language',
    description: 'Word games, writing practice, and language learning tools',
    apps: ['alphabet-train', 'prepositions', 'word-guess', 'word-scramble', 'wordsearch', 'cryptogram', 'writing'] as AppId[],
    color: '#10B981',
    icon: 'book-open',
  },
  visual: {
    name: 'Visual Learning',
    description: 'Drawing, coloring, pattern recognition, and visual skills',
    apps: ['big-small', 'pattern-train', 'pattern-worksheet', 'draw-and-color', 'drawing-lines', 'coloring', 'chart-count'] as AppId[],
    color: '#F59E0B',
    icon: 'palette',
  },
  matching: {
    name: 'Matching & Sorting',
    description: 'Matching games, bingo, sorting activities',
    apps: ['matching', 'grid-match', 'shadow-match', 'bingo', 'picture-sort'] as AppId[],
    color: '#8B5CF6',
    icon: 'puzzle',
  },
  puzzle: {
    name: 'Puzzles & Logic',
    description: 'Brain teasers, sudoku, mazes, and logic challenges',
    apps: ['missing-pieces', 'odd-one-out', 'sudoku', 'picture-path'] as AppId[],
    color: '#EF4444',
    icon: 'lightbulb',
  },
  search: {
    name: 'Search & Find',
    description: 'Hidden objects, crosswords, treasure hunts',
    apps: ['find-and-count', 'find-objects', 'crossword', 'treasure-hunt'] as AppId[],
    color: '#06B6D4',
    icon: 'search',
  },
} as const;

export type CategoryId = keyof typeof APP_CATEGORIES;

// ==========================================
// HELPER FUNCTIONS
// ==========================================

export function getAppsByCategory(categoryId: CategoryId): AppId[] {
  return APP_CATEGORIES[categoryId]?.apps ?? [];
}

export function getAllAppIds(): AppId[] {
  return Object.keys(ALL_APPS) as AppId[];
}

export function isValidAppId(appId: string): appId is AppId {
  return appId in ALL_APPS;
}

export function getAppHtmlFile(appId: AppId): string {
  return ALL_APPS[appId].htmlFile;
}

export function getAppCategory(appId: AppId): CategoryId {
  return ALL_APPS[appId].category as CategoryId;
}

// ==========================================
// THEME NAME MAPPING (Display → DB)
// ==========================================

/**
 * Maps display theme names to actual DB theme names.
 * DB names come from image library folder names on disk.
 */
export const THEME_DB_MAP: Record<string, string> = {
  'animals': 'animals',
  'food': 'food_bw',
  'vehicles': 'vehicles',
  'fruits': 'fruits',
  'colors': 'colors',
  'body-parts': 'body_parts',
  'clothing': 'clothing',
  'school': 'classroom',
  'sports': 'sports_bw',
  'nature': 'nature_bw',
  'vegetables': 'vegetables',
  'ocean-life': 'ocean_life',
  'dinosaurs': 'dinosaurs',
  'space': 'space',
  'birds': 'birds',
  'flowers': 'flowers',
  'insects-and-bugs': 'insects_and_bugs',
};

/** Resolve a display theme name to its DB name. Returns the DB name, or the input unchanged if no mapping. */
export function resolveThemeDbName(salesName: string): string {
  return THEME_DB_MAP[salesName] ?? salesName;
}
