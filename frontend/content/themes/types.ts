// ============================================================================
// EnrichedThemeContent Type System
// Part 1 of Landing Page SEO Perfection
// ============================================================================

// -- Enums & Literal Types --------------------------------------------------

/** The four worksheet-app categories used for grouping on theme pages */
export type AppCategory = 'math' | 'literacy' | 'visual' | 'puzzles';

/** Teaching tip audience */
export type TipAudience = 'teacher' | 'parent' | 'both';

/** Curriculum skill area for learning objectives and activity badges */
export type CurriculumArea =
  | 'math'
  | 'literacy'
  | 'motor'
  | 'cognitive'
  | 'creative'
  | 'social';

/** All 50 theme IDs */
export type ThemeId =
  | 'animals' | 'food' | 'transportation' | 'nature' | 'school'
  | 'sports' | 'emotions' | 'body' | 'clothing' | 'household'
  | 'toys' | 'music' | 'jobs' | 'space' | 'seasons'
  | 'holidays' | 'weather' | 'colors' | 'shapes' | 'numbers'
  | 'alphabet' | 'furniture' | 'easter' | 'halloween' | 'xmas'
  | 'winter' | 'farm' | 'ocean' | 'dinosaurs' | 'insects'
  | 'fruits' | 'vegetables' | 'flowers' | 'birds' | 'pets'
  | 'zoo' | 'garden' | 'camping' | 'pirates' | 'fairy-tales'
  | 'robots' | 'superheroes' | 'construction' | 'cooking' | 'travel'
  | 'birthday' | 'circus' | 'forest' | 'spring' | 'summer';

/** All 33 worksheet-app IDs */
export type AppId =
  | 'image-addition' | 'math-worksheet' | 'chart-count-color' | 'code-addition'
  | 'math-puzzle' | 'more-less' | 'subtraction' | 'alphabet-train'
  | 'word-scramble' | 'prepositions' | 'writing-app' | 'word-search'
  | 'image-crossword' | 'word-guess' | 'coloring' | 'draw-and-color'
  | 'sudoku' | 'image-cryptogram' | 'odd-one-out' | 'picture-path'
  | 'find-and-count' | 'find-objects' | 'missing-pieces' | 'matching-app'
  | 'grid-match' | 'shadow-match' | 'picture-sort' | 'drawing-lines'
  | 'pattern-train' | 'pattern-worksheet' | 'picture-bingo' | 'big-small-app'
  | 'treasure-hunt';

/** Grade level IDs */
export type GradeId =
  | 'preschool'
  | 'kindergarten'
  | 'first-grade'
  | 'second-grade'
  | 'third-grade';

// -- Sub-Interfaces ---------------------------------------------------------

/** A single teaching tip shown on the theme page */
export interface TeachingTip {
  title: string;
  description: string;
  audience: TipAudience;
  icon?: string;
}

/** A learning objective linking a skill to a curriculum area */
export interface LearningObjective {
  skill: string;
  area: CurriculumArea;
}

/** Grade-specific content block embedded in the theme */
export interface GradeLearningContent {
  /** 200+ word grade-specific intro paragraph */
  intro: string;
  /** Optional SEO title override (50-60 chars) */
  seoTitle?: string;
  /** Optional SEO meta description override (150-160 chars) */
  seoDescription?: string;
  /** Optional SEO keywords override (comma-separated) */
  seoKeywords?: string;
  /** Grade-specific learning objectives */
  objectives: LearningObjective[];
  /** Age-appropriate developmental context */
  developmentalNotes: string;
  /** 2-3 grade-specific teaching tips */
  teachingTips: string[];
  /** 3-5 grade-specific FAQ entries */
  faq: Array<{ question: string; answer: string }>;
}

/** A hands-on activity suggestion for the theme */
export interface Activity {
  title: string;
  description: string;
  materials: string[];
  duration: string;
  skillAreas: CurriculumArea[];
  icon?: string;
}

/** Maps a theme to a formal curriculum standard */
export interface CurriculumAlignment {
  /** e.g. "CCSS.MATH.CONTENT.K.CC.A.1" */
  standard: string;
  /** e.g. "Common Core" */
  framework: string;
  description: string;
  relatedAppIds: AppId[];
}

/** A group of apps under one category on the theme page */
export interface AppCategoryGroup {
  category: AppCategory;
  appIds: AppId[];
  /** Highlighted/featured apps within this category */
  featured?: AppId[];
}

// -- Main Interface ---------------------------------------------------------

/**
 * The enriched content model for a single theme page in a single locale.
 *
 * This replaces the legacy `ThemePageContent` interface with a richer structure
 * that supports curated apps, grade-specific content, educational metadata,
 * and cross-linking.
 */
export interface EnrichedThemeContent {
  // -- SEO fields (compatible with legacy ThemePageContent) -----------------

  /** Localized theme display name */
  name: string;
  /** SEO title tag */
  title: string;
  /** Meta description */
  description: string;
  /** Comma-separated SEO keywords */
  keywords: string;
  /** Page H1 heading */
  heading: string;

  // -- Rich narrative content (NEW) -----------------------------------------

  /** 300+ word educational narrative intro */
  intro: string;
  /** 200+ word educational overview */
  educationalOverview: string;
  /** 150+ word guide aimed at parents */
  parentGuide: string;

  // -- Curated apps (replaces legacy ALL_APPS) ------------------------------

  /** 8-15 hand-picked apps relevant to this theme */
  curatedAppIds: AppId[];
  /** Apps grouped by category with optional featured highlights */
  appCategories: AppCategoryGroup[];

  // -- Educational sections -------------------------------------------------

  /** 3-5 teaching tips */
  teachingTips: TeachingTip[];
  /** 3-4 hands-on activities */
  activities: Activity[];
  /** Formal curriculum standard alignments */
  curriculumAlignment: CurriculumAlignment[];

  // -- Grade-specific content -----------------------------------------------

  /** Content blocks keyed by GradeId */
  gradeContent: Partial<Record<GradeId, GradeLearningContent>>;

  // -- FAQ (enhanced) -------------------------------------------------------

  /** 8-10 unique, theme-specific FAQ entries */
  faq: Array<{ question: string; answer: string }>;

  // -- Cross-linking --------------------------------------------------------

  /** 5-7 genuinely related theme IDs */
  relatedThemes: ThemeId[];
  /** Blog category slugs for cross-linking */
  relatedBlogCategories: string[];
}

// -- Utility Types ----------------------------------------------------------

/** A complete theme content map: themeId -> locale -> content */
export type EnrichedThemeContentMap = Record<ThemeId, Record<string, EnrichedThemeContent>>;

/** Array of all 50 theme IDs for iteration */
export const ALL_THEME_IDS: ThemeId[] = [
  'animals', 'food', 'transportation', 'nature', 'school',
  'sports', 'emotions', 'body', 'clothing', 'household',
  'toys', 'music', 'jobs', 'space', 'seasons',
  'holidays', 'weather', 'colors', 'shapes', 'numbers',
  'alphabet', 'furniture', 'easter', 'halloween', 'xmas',
  'winter', 'farm', 'ocean', 'dinosaurs', 'insects',
  'fruits', 'vegetables', 'flowers', 'birds', 'pets',
  'zoo', 'garden', 'camping', 'pirates', 'fairy-tales',
  'robots', 'superheroes', 'construction', 'cooking', 'travel',
  'birthday', 'circus', 'forest', 'spring', 'summer',
];

/** Array of all 5 grade IDs for iteration */
export const ALL_GRADE_IDS: GradeId[] = [
  'preschool',
  'kindergarten',
  'first-grade',
  'second-grade',
  'third-grade',
];

/** Array of all 33 app IDs for reference */
export const ALL_APP_IDS: AppId[] = [
  'image-addition', 'math-worksheet', 'chart-count-color', 'code-addition',
  'math-puzzle', 'more-less', 'subtraction', 'alphabet-train',
  'word-scramble', 'prepositions', 'writing-app', 'word-search',
  'image-crossword', 'word-guess', 'coloring', 'draw-and-color',
  'sudoku', 'image-cryptogram', 'odd-one-out', 'picture-path',
  'find-and-count', 'find-objects', 'missing-pieces', 'matching-app',
  'grid-match', 'shadow-match', 'picture-sort', 'drawing-lines',
  'pattern-train', 'pattern-worksheet', 'picture-bingo', 'big-small-app',
  'treasure-hunt',
];
