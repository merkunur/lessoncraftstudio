/**
 * Activity Book Planner — Catalog
 *
 * Defines the 33 activity types, the structural page types, and the 6
 * quick-start templates. English-only (this tool is English-only for v1).
 *
 * Activity `appSlug` values match the canonical English slugs in
 * frontend/config/product-page-slugs.ts — deep links are built as
 * `/en/apps/{appSlug}` per the prompt spec.
 */

export type ActivityCategory = 'math' | 'word' | 'creative' | 'visual' | 'logic';

export type AgeGroup =
  | 'toddlers'
  | 'preschool'
  | 'early-elementary'
  | 'elementary'
  | 'tweens'
  | 'adults'
  | 'seniors'
  | 'all';

export interface ActivityType {
  id: string;
  name: string;
  category: ActivityCategory;
  icon: string;
  hasAnswerKey: boolean;
  defaultPages: number;
  appSlug: string;
  ageFit: AgeGroup[];
}

export const AGE_GROUPS: Array<{ id: AgeGroup; label: string }> = [
  { id: 'toddlers', label: 'Toddlers (Ages 2-4)' },
  { id: 'preschool', label: 'Preschool (Ages 3-6)' },
  { id: 'early-elementary', label: 'Early Elementary (Ages 5-8)' },
  { id: 'elementary', label: 'Elementary (Ages 7-10)' },
  { id: 'tweens', label: 'Tweens (Ages 10-14)' },
  { id: 'adults', label: 'Adults' },
  { id: 'seniors', label: 'Seniors' },
  { id: 'all', label: 'All Ages' },
];

export const CATEGORY_META: Record<
  ActivityCategory,
  { label: string; color: string; borderClass: string; badgeClass: string; barClass: string }
> = {
  math: {
    label: 'Math',
    color: 'blue',
    borderClass: 'border-l-blue-500',
    badgeClass: 'bg-blue-50 text-blue-700 ring-blue-200',
    barClass: 'bg-blue-500',
  },
  word: {
    label: 'Word Puzzles',
    color: 'emerald',
    borderClass: 'border-l-emerald-500',
    badgeClass: 'bg-emerald-50 text-emerald-700 ring-emerald-200',
    barClass: 'bg-emerald-500',
  },
  creative: {
    label: 'Creative',
    color: 'orange',
    borderClass: 'border-l-orange-500',
    badgeClass: 'bg-orange-50 text-orange-700 ring-orange-200',
    barClass: 'bg-orange-500',
  },
  visual: {
    label: 'Visual',
    color: 'purple',
    borderClass: 'border-l-purple-500',
    badgeClass: 'bg-purple-50 text-purple-700 ring-purple-200',
    barClass: 'bg-purple-500',
  },
  logic: {
    label: 'Logic',
    color: 'rose',
    borderClass: 'border-l-rose-500',
    badgeClass: 'bg-rose-50 text-rose-700 ring-rose-200',
    barClass: 'bg-rose-500',
  },
};

const ALL_AGES: AgeGroup[] = [
  'toddlers',
  'preschool',
  'early-elementary',
  'elementary',
  'tweens',
  'adults',
  'seniors',
  'all',
];
const KIDS: AgeGroup[] = ['preschool', 'early-elementary', 'elementary', 'tweens', 'all'];
const YOUNG_KIDS: AgeGroup[] = ['toddlers', 'preschool', 'early-elementary', 'all'];
const OLDER: AgeGroup[] = ['elementary', 'tweens', 'adults', 'seniors', 'all'];
const GROWN: AgeGroup[] = ['adults', 'seniors', 'all'];

export const ACTIVITY_CATALOG: ActivityType[] = [
  // Math (7)
  { id: 'addition', name: 'Addition Worksheets', category: 'math', icon: '\u2795', hasAnswerKey: true, defaultPages: 10, appSlug: 'addition-worksheets', ageFit: KIDS },
  { id: 'subtraction', name: 'Subtraction Worksheets', category: 'math', icon: '\u2796', hasAnswerKey: true, defaultPages: 10, appSlug: 'subtraction-worksheets', ageFit: KIDS },
  { id: 'math-worksheets', name: 'Math Worksheets (Mixed)', category: 'math', icon: '\u{1F9EE}', hasAnswerKey: true, defaultPages: 10, appSlug: 'math-worksheets', ageFit: KIDS },
  { id: 'math-puzzle', name: 'Math Puzzles', category: 'math', icon: '\u{1F9E9}', hasAnswerKey: true, defaultPages: 8, appSlug: 'math-puzzle-worksheets', ageFit: KIDS },
  { id: 'code-addition', name: 'Code Addition', category: 'math', icon: '\u{1F510}', hasAnswerKey: true, defaultPages: 8, appSlug: 'code-addition-worksheets', ageFit: KIDS },
  { id: 'chart-count', name: 'Chart Count Worksheets', category: 'math', icon: '\u{1F4CA}', hasAnswerKey: true, defaultPages: 8, appSlug: 'chart-count-worksheets', ageFit: YOUNG_KIDS },
  { id: 'more-less', name: 'More or Less', category: 'math', icon: '\u2696\uFE0F', hasAnswerKey: true, defaultPages: 8, appSlug: 'more-less-worksheets', ageFit: YOUNG_KIDS },

  // Word Puzzles (6)
  { id: 'word-search', name: 'Word Search Puzzles', category: 'word', icon: '\u{1F50D}', hasAnswerKey: true, defaultPages: 10, appSlug: 'word-search-worksheets', ageFit: OLDER },
  { id: 'crossword', name: 'Crossword Puzzles', category: 'word', icon: '\u{1F4DD}', hasAnswerKey: true, defaultPages: 10, appSlug: 'crossword-worksheets', ageFit: OLDER },
  { id: 'cryptogram', name: 'Cryptogram Puzzles', category: 'word', icon: '\u{1F511}', hasAnswerKey: true, defaultPages: 8, appSlug: 'cryptogram-worksheets', ageFit: ['tweens', 'adults', 'seniors', 'all'] },
  { id: 'word-scramble', name: 'Word Scramble', category: 'word', icon: '\u{1F500}', hasAnswerKey: true, defaultPages: 8, appSlug: 'word-scramble-worksheets', ageFit: OLDER },
  { id: 'word-guess', name: 'Word Guess', category: 'word', icon: '\u{1F914}', hasAnswerKey: true, defaultPages: 8, appSlug: 'word-guess-worksheets', ageFit: OLDER },
  { id: 'writing', name: 'Handwriting Practice', category: 'word', icon: '\u270D\uFE0F', hasAnswerKey: false, defaultPages: 10, appSlug: 'writing-worksheets', ageFit: ['preschool', 'early-elementary', 'elementary', 'all'] },

  // Creative (3)
  { id: 'coloring', name: 'Coloring Pages', category: 'creative', icon: '\u{1F3A8}', hasAnswerKey: false, defaultPages: 10, appSlug: 'coloring-worksheets', ageFit: ALL_AGES },
  { id: 'draw-and-color', name: 'Draw & Color Activities', category: 'creative', icon: '\u{1F58C}\uFE0F', hasAnswerKey: false, defaultPages: 8, appSlug: 'draw-and-color-worksheets', ageFit: YOUNG_KIDS },
  { id: 'picture-bingo', name: 'Picture Bingo Cards', category: 'creative', icon: '\u{1F3B2}', hasAnswerKey: false, defaultPages: 6, appSlug: 'picture-bingo-worksheets', ageFit: YOUNG_KIDS },

  // Visual (9)
  { id: 'matching', name: 'Matching Worksheets', category: 'visual', icon: '\u{1F517}', hasAnswerKey: true, defaultPages: 8, appSlug: 'matching-worksheets', ageFit: YOUNG_KIDS },
  { id: 'find-objects', name: 'Find Objects (Hidden Objects)', category: 'visual', icon: '\u{1F440}', hasAnswerKey: true, defaultPages: 8, appSlug: 'find-objects-worksheets', ageFit: KIDS },
  { id: 'find-and-count', name: 'Find & Count', category: 'visual', icon: '\u{1F522}', hasAnswerKey: true, defaultPages: 8, appSlug: 'find-and-count-worksheets', ageFit: YOUNG_KIDS },
  { id: 'shadow-match', name: 'Shadow Match', category: 'visual', icon: '\u{1F315}', hasAnswerKey: true, defaultPages: 6, appSlug: 'shadow-match-worksheets', ageFit: YOUNG_KIDS },
  { id: 'missing-pieces', name: 'Missing Pieces', category: 'visual', icon: '\u{1F9E9}', hasAnswerKey: true, defaultPages: 6, appSlug: 'missing-pieces-worksheets', ageFit: KIDS },
  { id: 'odd-one-out', name: 'Odd One Out', category: 'visual', icon: '\u2753', hasAnswerKey: true, defaultPages: 6, appSlug: 'odd-one-out-worksheets', ageFit: KIDS },
  { id: 'grid-match', name: 'Grid Match', category: 'visual', icon: '\u{1F4D0}', hasAnswerKey: true, defaultPages: 6, appSlug: 'grid-match-worksheets', ageFit: KIDS },
  { id: 'drawing-lines', name: 'Drawing Lines (Tracing)', category: 'visual', icon: '\u270F\uFE0F', hasAnswerKey: false, defaultPages: 8, appSlug: 'drawing-lines-worksheets', ageFit: YOUNG_KIDS },
  { id: 'picture-path', name: 'Picture Path (Mazes)', category: 'visual', icon: '\u{1F9ED}', hasAnswerKey: true, defaultPages: 8, appSlug: 'picture-path-worksheets', ageFit: KIDS },

  // Logic (8)
  { id: 'sudoku', name: 'Sudoku Puzzles', category: 'logic', icon: '\u{1F522}', hasAnswerKey: true, defaultPages: 10, appSlug: 'sudoku-worksheets', ageFit: ['tweens', 'adults', 'seniors', 'all'] },
  { id: 'pattern', name: 'Pattern Recognition', category: 'logic', icon: '\u{1F300}', hasAnswerKey: true, defaultPages: 8, appSlug: 'pattern-worksheets', ageFit: KIDS },
  { id: 'pattern-train', name: 'Pattern Train', category: 'logic', icon: '\u{1F682}', hasAnswerKey: true, defaultPages: 6, appSlug: 'pattern-train-worksheets', ageFit: YOUNG_KIDS },
  { id: 'picture-sort', name: 'Picture Sort', category: 'logic', icon: '\u{1F5C2}\uFE0F', hasAnswerKey: true, defaultPages: 6, appSlug: 'picture-sort-worksheets', ageFit: YOUNG_KIDS },
  { id: 'big-small', name: 'Big & Small (Size Comparison)', category: 'logic', icon: '\u{1F50D}', hasAnswerKey: true, defaultPages: 6, appSlug: 'big-small-worksheets', ageFit: YOUNG_KIDS },
  { id: 'prepositions', name: 'Prepositions Worksheets', category: 'logic', icon: '\u{1F4CD}', hasAnswerKey: true, defaultPages: 6, appSlug: 'prepositions-worksheets', ageFit: YOUNG_KIDS },
  { id: 'treasure-hunt', name: 'Treasure Hunt', category: 'logic', icon: '\u{1F3F4}\u200D\u2620\uFE0F', hasAnswerKey: true, defaultPages: 6, appSlug: 'treasure-hunt-worksheets', ageFit: KIDS },
  { id: 'alphabet-train', name: 'Alphabet Train', category: 'logic', icon: '\u{1F170}\uFE0F', hasAnswerKey: false, defaultPages: 8, appSlug: 'alphabet-train-worksheets', ageFit: YOUNG_KIDS },
];

export const ACTIVITIES_BY_CATEGORY: Record<ActivityCategory, ActivityType[]> = {
  math: ACTIVITY_CATALOG.filter((a) => a.category === 'math'),
  word: ACTIVITY_CATALOG.filter((a) => a.category === 'word'),
  creative: ACTIVITY_CATALOG.filter((a) => a.category === 'creative'),
  visual: ACTIVITY_CATALOG.filter((a) => a.category === 'visual'),
  logic: ACTIVITY_CATALOG.filter((a) => a.category === 'logic'),
};

export function getActivityById(id: string): ActivityType | undefined {
  return ACTIVITY_CATALOG.find((a) => a.id === id);
}

/* ----------------------------------------------------------------------------
 * Structural page types (front matter, back matter, dividers)
 * -------------------------------------------------------------------------- */

export type StructuralId =
  | 'title-page'
  | 'copyright'
  | 'toc'
  | 'how-to'
  | 'divider'
  | 'blank'
  | 'notes'
  | 'certificate'
  | 'answer-key';

export interface StructuralType {
  id: StructuralId;
  name: string;
  icon: string;
  description: string;
  defaultPages: number;
  fixed?: boolean;
  recommended?: boolean;
  category: 'front' | 'back' | 'filler';
}

export const STRUCTURAL_TYPES: StructuralType[] = [
  { id: 'title-page', name: 'Title Page', icon: '\u{1F4D6}', description: 'Book title, subtitle, author', defaultPages: 1, fixed: true, category: 'front' },
  { id: 'copyright', name: 'Copyright Page', icon: '\u00A9\uFE0F', description: 'Copyright, ISBN, publisher', defaultPages: 1, recommended: true, category: 'front' },
  { id: 'toc', name: 'Table of Contents', icon: '\u{1F5C3}\uFE0F', description: 'Lists each section with page numbers', defaultPages: 1, recommended: true, category: 'front' },
  { id: 'how-to', name: 'How to Use This Book', icon: '\u{1F4A1}', description: 'Intro page explaining the book', defaultPages: 1, category: 'front' },
  { id: 'divider', name: 'Section Divider', icon: '\u{1F4D1}', description: 'Chapter title page (e.g. "Math Activities")', defaultPages: 1, category: 'filler' },
  { id: 'blank', name: 'Blank Page', icon: '\u{1F4C4}', description: 'Intentionally blank page', defaultPages: 1, category: 'filler' },
  { id: 'notes', name: 'Notes Page', icon: '\u{1F5D2}\uFE0F', description: 'Lined or blank page for notes', defaultPages: 1, category: 'filler' },
  { id: 'certificate', name: 'Certificate / Reward', icon: '\u{1F3C6}', description: '"Great job!" completion page', defaultPages: 1, category: 'back' },
  { id: 'answer-key', name: 'Answer Key Section', icon: '\u{1F511}', description: 'Auto-calculated from activity pages', defaultPages: 0, category: 'back' },
];

export function getStructuralById(id: StructuralId): StructuralType | undefined {
  return STRUCTURAL_TYPES.find((s) => s.id === id);
}

/* ----------------------------------------------------------------------------
 * Book Plan Templates (6 quick-start presets)
 * Each entry: { typeKind, typeId, pages }. Front matter + answer key are
 * added automatically by the reducer's LOAD_TEMPLATE handler; templates
 * only specify content sections in order.
 * -------------------------------------------------------------------------- */

export interface TemplateSectionSpec {
  kind: 'activity' | 'structural';
  typeId: string;
  pages: number;
}

export interface BookTemplate {
  id: string;
  name: string;
  tagline: string;
  icon: string;
  ageGroup: AgeGroup;
  targetPages: number;
  includeFrontMatter: boolean;
  includeTOC: boolean;
  includeHowTo: boolean;
  includeCertificate: boolean;
  sections: TemplateSectionSpec[];
}

export const BOOK_TEMPLATES: BookTemplate[] = [
  {
    id: 'kids-math',
    name: 'Kids Math Activity Book',
    tagline: 'Ages 5-8, 100 pages',
    icon: '\u{1F9EE}',
    ageGroup: 'early-elementary',
    targetPages: 100,
    includeFrontMatter: true,
    includeTOC: true,
    includeHowTo: true,
    includeCertificate: true,
    sections: [
      { kind: 'structural', typeId: 'divider', pages: 1 },
      { kind: 'activity', typeId: 'addition', pages: 20 },
      { kind: 'activity', typeId: 'coloring', pages: 4 },
      { kind: 'activity', typeId: 'subtraction', pages: 15 },
      { kind: 'activity', typeId: 'math-puzzle', pages: 10 },
      { kind: 'activity', typeId: 'coloring', pages: 4 },
      { kind: 'activity', typeId: 'chart-count', pages: 10 },
      { kind: 'activity', typeId: 'code-addition', pages: 10 },
      { kind: 'activity', typeId: 'pattern', pages: 5 },
    ],
  },
  {
    id: 'word-puzzle-adults',
    name: 'Word Puzzle Book for Adults',
    tagline: '120 pages',
    icon: '\u{1F50D}',
    ageGroup: 'adults',
    targetPages: 120,
    includeFrontMatter: true,
    includeTOC: true,
    includeHowTo: false,
    includeCertificate: false,
    sections: [
      { kind: 'activity', typeId: 'word-search', pages: 25 },
      { kind: 'activity', typeId: 'crossword', pages: 20 },
      { kind: 'activity', typeId: 'cryptogram', pages: 15 },
      { kind: 'activity', typeId: 'word-scramble', pages: 15 },
      { kind: 'activity', typeId: 'sudoku', pages: 10 },
    ],
  },
  {
    id: 'preschool',
    name: 'Preschool Activity Book',
    tagline: 'Ages 3-5, 80 pages',
    icon: '\u{1F9F8}',
    ageGroup: 'preschool',
    targetPages: 80,
    includeFrontMatter: true,
    includeTOC: true,
    includeHowTo: true,
    includeCertificate: true,
    sections: [
      { kind: 'activity', typeId: 'coloring', pages: 10 },
      { kind: 'activity', typeId: 'matching', pages: 10 },
      { kind: 'activity', typeId: 'drawing-lines', pages: 10 },
      { kind: 'activity', typeId: 'big-small', pages: 8 },
      { kind: 'activity', typeId: 'shadow-match', pages: 8 },
      { kind: 'activity', typeId: 'find-objects', pages: 8 },
      { kind: 'activity', typeId: 'pattern-train', pages: 8 },
    ],
  },
  {
    id: 'mixed-kids',
    name: 'Mixed Activity Book for Kids',
    tagline: 'Ages 6-10, 100 pages',
    icon: '\u{1F308}',
    ageGroup: 'elementary',
    targetPages: 100,
    includeFrontMatter: true,
    includeTOC: true,
    includeHowTo: true,
    includeCertificate: true,
    sections: [
      { kind: 'activity', typeId: 'addition', pages: 10 },
      { kind: 'activity', typeId: 'word-search', pages: 10 },
      { kind: 'activity', typeId: 'coloring', pages: 6 },
      { kind: 'activity', typeId: 'matching', pages: 8 },
      { kind: 'activity', typeId: 'subtraction', pages: 10 },
      { kind: 'activity', typeId: 'crossword', pages: 6 },
      { kind: 'activity', typeId: 'find-and-count', pages: 6 },
      { kind: 'activity', typeId: 'sudoku', pages: 6 },
      { kind: 'activity', typeId: 'draw-and-color', pages: 6 },
      { kind: 'activity', typeId: 'pattern', pages: 6 },
      { kind: 'activity', typeId: 'picture-path', pages: 8 },
    ],
  },
  {
    id: 'coloring-drawing',
    name: 'Coloring & Drawing Book',
    tagline: '60 pages',
    icon: '\u{1F3A8}',
    ageGroup: 'all',
    targetPages: 60,
    includeFrontMatter: true,
    includeTOC: false,
    includeHowTo: false,
    includeCertificate: true,
    sections: [
      { kind: 'activity', typeId: 'coloring', pages: 30 },
      { kind: 'activity', typeId: 'draw-and-color', pages: 15 },
      { kind: 'activity', typeId: 'drawing-lines', pages: 10 },
    ],
  },
  {
    id: 'educational-bundle',
    name: 'Educational Worksheet Bundle',
    tagline: '120 pages, math + language',
    icon: '\u{1F393}',
    ageGroup: 'elementary',
    targetPages: 120,
    includeFrontMatter: true,
    includeTOC: true,
    includeHowTo: true,
    includeCertificate: true,
    sections: [
      { kind: 'activity', typeId: 'math-worksheets', pages: 20 },
      { kind: 'activity', typeId: 'writing', pages: 15 },
      { kind: 'activity', typeId: 'word-search', pages: 12 },
      { kind: 'activity', typeId: 'matching', pages: 10 },
      { kind: 'activity', typeId: 'addition', pages: 12 },
      { kind: 'activity', typeId: 'crossword', pages: 10 },
      { kind: 'activity', typeId: 'find-objects', pages: 8 },
      { kind: 'activity', typeId: 'picture-path', pages: 8 },
      { kind: 'activity', typeId: 'coloring', pages: 8 },
    ],
  },
];
