/**
 * WarriorPlus Product Configuration
 *
 * Central configuration for all products sold via WarriorPlus.
 * Maps product IDs to app access, pricing, and metadata.
 */

// ==========================================
// APP DEFINITIONS
// ==========================================

export const ALL_APPS = {
  // Math apps (6)
  'addition': { name: 'Addition', category: 'math', tier: 1, htmlFile: 'addition.html' },
  'subtraction': { name: 'Subtraction', category: 'math', tier: 2, htmlFile: 'subtraction.html' },
  'code-addition': { name: 'Code Addition', category: 'math', tier: 4, htmlFile: 'code addition.html' },
  'more-less': { name: 'More or Less', category: 'math', tier: 4, htmlFile: 'more less.html' },
  'math-puzzle': { name: 'Math Puzzle', category: 'math', tier: 3, htmlFile: 'math puzzle.html' },
  'math-worksheet': { name: 'Math Worksheet', category: 'math', tier: 1, htmlFile: 'math worksheet.html' },

  // Literacy apps (7)
  'alphabet-train': { name: 'Alphabet Train', category: 'literacy', tier: 3, htmlFile: 'alphabet train.html' },
  'prepositions': { name: 'Prepositions', category: 'literacy', tier: 4, htmlFile: 'prepositions.html' },
  'word-guess': { name: 'Word Guess', category: 'literacy', tier: 4, htmlFile: 'word guess.html' },
  'word-scramble': { name: 'Word Scramble', category: 'literacy', tier: 2, htmlFile: 'word scramble.html' },
  'wordsearch': { name: 'Word Search', category: 'literacy', tier: 1, htmlFile: 'wordsearch.html' },
  'cryptogram': { name: 'Cryptogram', category: 'literacy', tier: 4, htmlFile: 'cryptogram.html' },
  'writing': { name: 'Writing', category: 'literacy', tier: 2, htmlFile: 'writing.html' },

  // Visual apps (7)
  'big-small': { name: 'Big & Small', category: 'visual', tier: 4, htmlFile: 'big small.html' },
  'pattern-train': { name: 'Pattern Train', category: 'visual', tier: 4, htmlFile: 'pattern train.html' },
  'pattern-worksheet': { name: 'Pattern Worksheet', category: 'visual', tier: 3, htmlFile: 'pattern worksheet.html' },
  'draw-and-color': { name: 'Draw & Color', category: 'visual', tier: 3, htmlFile: 'draw and color.html' },
  'drawing-lines': { name: 'Drawing Lines', category: 'visual', tier: 4, htmlFile: 'drawing lines.html' },
  'coloring': { name: 'Coloring', category: 'visual', tier: 1, htmlFile: 'coloring.html' },
  'chart-count': { name: 'Chart Count', category: 'visual', tier: 4, htmlFile: 'chart count.html' },

  // Matching apps (5)
  'matching': { name: 'Matching', category: 'matching', tier: 3, htmlFile: 'matching.html' },
  'grid-match': { name: 'Grid Match', category: 'matching', tier: 4, htmlFile: 'grid match.html' },
  'shadow-match': { name: 'Shadow Match', category: 'matching', tier: 4, htmlFile: 'shadow match.html' },
  'bingo': { name: 'Bingo', category: 'matching', tier: 1, htmlFile: 'bingo.html' },
  'picture-sort': { name: 'Picture Sort', category: 'matching', tier: 4, htmlFile: 'picture sort.html' },

  // Puzzle apps (4)
  'missing-pieces': { name: 'Missing Pieces', category: 'puzzle', tier: 3, htmlFile: 'missing pieces.html' },
  'odd-one-out': { name: 'Odd One Out', category: 'puzzle', tier: 4, htmlFile: 'odd one out.html' },
  'sudoku': { name: 'Sudoku', category: 'puzzle', tier: 1, htmlFile: 'sudoku.html' },
  'picture-path': { name: 'Picture Path', category: 'puzzle', tier: 2, htmlFile: 'picture path.html' },

  // Search apps (4)
  'find-and-count': { name: 'Find & Count', category: 'search', tier: 2, htmlFile: 'find and count.html' },
  'find-objects': { name: 'Find Objects', category: 'search', tier: 3, htmlFile: 'find objects.html' },
  'crossword': { name: 'Crossword', category: 'search', tier: 1, htmlFile: 'crossword.html' },
  'treasure-hunt': { name: 'Treasure Hunt', category: 'search', tier: 3, htmlFile: 'treasure hunt.html' },
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
// PRODUCT DEFINITIONS (WarriorPlus Listings)
// ==========================================

export interface WPlusProduct {
  id: string;
  name: string;
  description: string;
  price: number;
  comparePrice?: number;
  tier: 'single-app' | 'category-bundle' | 'full-access' | 'commercial' | 'agency' | 'pro-features';
  apps: AppId[];
  features: string[];
  imageCount: number; // How many theme images included
  languages: number; // How many languages
  funnelPosition: 'frontend' | 'oto1' | 'oto2' | 'oto3' | 'downsell';
  wplusProductId?: string; // WarriorPlus product ID (set after listing)
  funnelId?: string; // Groups products into a funnel chain (e.g., 'wordsearch-funnel')
  premiumFeatures?: string[]; // App-specific premium features for pro-tier products
  includesCommercialRights: boolean; // All products include full commercial/POD/resale rights
}

export const WPLUS_PRODUCTS: Record<string, WPlusProduct> = {
  // ==========================================
  // CATEGORY BUNDLES (Front-End Offers)
  // ==========================================
  'math-bundle': {
    id: 'math-bundle',
    name: 'Math Mastery Toolkit',
    description: '6 professional math worksheet generators. Create unlimited addition, subtraction, and math puzzle worksheets.',
    price: 37,
    comparePrice: 97,
    tier: 'category-bundle',
    apps: [...APP_CATEGORIES.math.apps],
    features: [
      '6 math worksheet generators',
      '100+ theme images included',
      'PDF export with custom styling',
      'Full commercial/POD/resale rights',
    ],
    imageCount: 100,
    languages: 1,
    funnelPosition: 'frontend',
    includesCommercialRights: true,
  },

  'literacy-bundle': {
    id: 'literacy-bundle',
    name: 'Literacy & Language Toolkit',
    description: '7 language learning tools. Word search, word scramble, writing practice, and more.',
    price: 37,
    comparePrice: 97,
    tier: 'category-bundle',
    apps: [...APP_CATEGORIES.literacy.apps],
    features: [
      '7 literacy & language generators',
      '100+ theme images included',
      'PDF export with custom styling',
      'Full commercial/POD/resale rights',
    ],
    imageCount: 100,
    languages: 1,
    funnelPosition: 'frontend',
    includesCommercialRights: true,
  },

  'visual-bundle': {
    id: 'visual-bundle',
    name: 'Visual Learning Toolkit',
    description: '7 visual learning tools. Coloring pages, drawing activities, pattern worksheets.',
    price: 27,
    comparePrice: 67,
    tier: 'category-bundle',
    apps: [...APP_CATEGORIES.visual.apps],
    features: [
      '7 visual learning generators',
      '100+ theme images included',
      'PDF export with custom styling',
      'Full commercial/POD/resale rights',
    ],
    imageCount: 100,
    languages: 1,
    funnelPosition: 'frontend',
    includesCommercialRights: true,
  },

  'matching-bundle': {
    id: 'matching-bundle',
    name: 'Matching & Sorting Toolkit',
    description: '5 matching and sorting games. Bingo, grid match, shadow match, and more.',
    price: 27,
    comparePrice: 67,
    tier: 'category-bundle',
    apps: [...APP_CATEGORIES.matching.apps],
    features: [
      '5 matching & sorting generators',
      '100+ theme images included',
      'PDF export with custom styling',
      'Full commercial/POD/resale rights',
    ],
    imageCount: 100,
    languages: 1,
    funnelPosition: 'frontend',
    includesCommercialRights: true,
  },

  'puzzle-bundle': {
    id: 'puzzle-bundle',
    name: 'Puzzles & Logic Toolkit',
    description: '4 puzzle generators. Sudoku, mazes, missing pieces, and odd one out.',
    price: 27,
    comparePrice: 67,
    tier: 'category-bundle',
    apps: [...APP_CATEGORIES.puzzle.apps],
    features: [
      '4 puzzle & logic generators',
      '100+ theme images included',
      'PDF export with custom styling',
      'Full commercial/POD/resale rights',
    ],
    imageCount: 100,
    languages: 1,
    funnelPosition: 'frontend',
    includesCommercialRights: true,
  },

  'search-bundle': {
    id: 'search-bundle',
    name: 'Search & Find Toolkit',
    description: '4 search and find tools. Crosswords, treasure hunts, hidden objects.',
    price: 27,
    comparePrice: 67,
    tier: 'category-bundle',
    apps: [...APP_CATEGORIES.search.apps],
    features: [
      '4 search & find generators',
      '100+ theme images included',
      'PDF export with custom styling',
      'Full commercial/POD/resale rights',
    ],
    imageCount: 100,
    languages: 1,
    funnelPosition: 'frontend',
    includesCommercialRights: true,
  },

  // ==========================================
  // MEGA BUNDLE (OTO #1)
  // ==========================================
  'mega-bundle': {
    id: 'mega-bundle',
    name: 'Printable Worksheet Empire - Full Toolkit',
    description: 'All 33 professional worksheet generators. 3,000+ theme images. 11 languages. Create unlimited educational content.',
    price: 67,
    comparePrice: 297,
    tier: 'full-access',
    apps: Object.keys(ALL_APPS) as AppId[],
    features: [
      'All 33 worksheet generators',
      '3,000+ theme images (100+ themes)',
      '11 languages supported',
      'PDF export with custom styling',
      'Borders, backgrounds, and themes',
      'Full commercial/POD/resale rights',
    ],
    imageCount: 3000,
    languages: 11,
    funnelPosition: 'oto1',
    includesCommercialRights: true,
  },

  // ==========================================
  // COMMERCIAL LICENSE (OTO #2)
  // ==========================================
  'commercial-license': {
    id: 'commercial-license',
    name: 'Commercial License',
    description: 'Sell worksheets you create on Etsy, TPT, Amazon KDP, and more. Full commercial usage rights.',
    price: 97,
    comparePrice: 297,
    tier: 'commercial',
    apps: Object.keys(ALL_APPS) as AppId[],
    features: [
      'Sell generated worksheets anywhere',
      'Etsy, TPT, Amazon KDP, your own site',
      'Unlimited commercial use',
      'Printable Business Blueprint guide',
      'No attribution required',
    ],
    imageCount: 3000,
    languages: 11,
    funnelPosition: 'oto2',
    includesCommercialRights: true,
  },

  // ==========================================
  // AGENCY LICENSE (OTO #3)
  // ==========================================
  'agency-license': {
    id: 'agency-license',
    name: 'Agency / Reseller License',
    description: 'White-label the tools. Resale rights to generated content. Bulk generation features.',
    price: 197,
    comparePrice: 497,
    tier: 'agency',
    apps: Object.keys(ALL_APPS) as AppId[],
    features: [
      'White-label tools for clients',
      'Resale rights to generated content',
      'Bulk generation features',
      'Agency dashboard',
      'Priority support',
    ],
    imageCount: 3000,
    languages: 11,
    funnelPosition: 'oto3',
    includesCommercialRights: true,
  },

  // ==========================================
  // DOWNSELL (Single App)
  // ==========================================
  'single-app-downsell': {
    id: 'single-app-downsell',
    name: 'Starter Kit - Single App',
    description: 'Pick any 1 worksheet generator. 50 theme images. Full commercial rights included.',
    price: 9.95,
    tier: 'single-app',
    apps: [], // Buyer chooses during onboarding
    features: [
      'Any 1 worksheet generator',
      '50 theme images',
      'PDF export',
      'Full commercial/POD/resale rights',
    ],
    imageCount: 50,
    languages: 1,
    funnelPosition: 'downsell',
    includesCommercialRights: true,
  },

  // ==========================================
  // INDIVIDUAL APP FUNNELS (Stage 1)
  // ==========================================

  // --- Word Search Funnel ---
  'wordsearch-fe': {
    id: 'wordsearch-fe',
    name: 'Word Search Generator',
    description: 'Professional word search puzzle generator. All grid sizes, image library, canvas editor, PDF export. Full commercial rights included.',
    price: 27,
    comparePrice: 97,
    tier: 'single-app',
    apps: ['wordsearch'] as AppId[],
    features: [
      'Word Search generator (all grid sizes)',
      '3,000+ theme images (104 themes)',
      'Canvas editor (move, resize, rotate, layers)',
      '4 fonts + solid color backgrounds',
      'PDF + JPEG export with answer keys',
      'Watermark-free output',
      'Full commercial/POD/resale rights',
    ],
    imageCount: 3000,
    languages: 1,
    funnelPosition: 'frontend',
    funnelId: 'wordsearch-funnel',
    includesCommercialRights: true,
  },

  'wordsearch-oto1-literacy': {
    id: 'wordsearch-oto1-literacy',
    name: 'Literacy & Language Expansion Pack',
    description: '6 more literacy & language generators. Word scramble, writing, alphabet train, and more. Full commercial rights included.',
    price: 37,
    comparePrice: 189,
    tier: 'category-bundle',
    apps: APP_CATEGORIES.literacy.apps.filter(app => app !== 'wordsearch') as AppId[],
    features: [
      '6 additional literacy generators',
      'Alphabet Train, Word Scramble, Writing',
      'Word Guess, Cryptogram, Prepositions',
      '3,000+ theme images (104 themes)',
      'PDF + JPEG export',
      'Full commercial/POD/resale rights',
    ],
    imageCount: 3000,
    languages: 1,
    funnelPosition: 'oto1',
    funnelId: 'wordsearch-funnel',
    includesCommercialRights: true,
  },

  'wordsearch-oto2-pro': {
    id: 'wordsearch-oto2-pro',
    name: 'Pro Features Pack',
    description: 'Unlock premium features for all purchased apps. Extra languages, premium fonts, themed backgrounds, grayscale mode, custom content, and more.',
    price: 37,
    comparePrice: 97,
    tier: 'pro-features',
    apps: [], // Applies to all purchased apps
    features: [
      'Reverse word placement (harder puzzles)',
      'All 11 languages (access global markets)',
      '3 premium fonts (Baloo 2, Quicksand, Fredoka)',
      'Themed backgrounds & decorative borders',
      'Grayscale mode (KDP print optimization)',
      'Custom word lists (type any words)',
      'Custom image upload (your own clipart/logos)',
      'Manual image name editing',
      'Text outline/stroke effects',
      'Custom page sizes (any dimension)',
    ],
    imageCount: 3000,
    languages: 11,
    funnelPosition: 'oto2',
    funnelId: 'wordsearch-funnel',
    includesCommercialRights: true,
    premiumFeatures: [
      'reverse-words',
      'all-languages',
      'premium-fonts',
      'themed-backgrounds',
      'decorative-borders',
      'grayscale-mode',
      'custom-word-lists',
      'custom-image-upload',
      'manual-image-names',
      'text-outline-stroke',
      'custom-page-sizes',
    ],
  },
};

// ==========================================
// FUNNEL CONFIGURATION
// ==========================================

// Legacy bundle funnel (Stage 2)
export const WPLUS_FUNNEL = {
  frontend: ['math-bundle', 'literacy-bundle', 'visual-bundle', 'matching-bundle', 'puzzle-bundle', 'search-bundle'],
  oto1: 'mega-bundle',
  oto2: 'commercial-license',
  oto3: 'agency-license',
  downsell: 'single-app-downsell',
};

// Individual app funnels (Stage 1)
export interface WPlusFunnel {
  id: string;
  name: string;
  fe: string;
  oto1: string;
  oto2: string;
}

export const WPLUS_FUNNELS: Record<string, WPlusFunnel> = {
  'wordsearch-funnel': {
    id: 'wordsearch-funnel',
    name: 'Word Search Launch Funnel',
    fe: 'wordsearch-fe',
    oto1: 'wordsearch-oto1-literacy',
    oto2: 'wordsearch-oto2-pro',
  },
};

// ==========================================
// HELPER FUNCTIONS
// ==========================================

export function getAppsForProduct(productId: string): AppId[] {
  const product = WPLUS_PRODUCTS[productId];
  if (!product) return [];
  return product.apps;
}

export function getAppsByCategory(categoryId: CategoryId): AppId[] {
  return APP_CATEGORIES[categoryId]?.apps ?? [];
}

export function getAllAppIds(): AppId[] {
  return Object.keys(ALL_APPS) as AppId[];
}

export function getProductByWPlusId(wplusProductId: string): WPlusProduct | null {
  return Object.values(WPLUS_PRODUCTS).find(p => p.wplusProductId === wplusProductId) ?? null;
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

export function getFunnelForProduct(productId: string): WPlusFunnel | null {
  const product = WPLUS_PRODUCTS[productId];
  if (!product?.funnelId) return null;
  return WPLUS_FUNNELS[product.funnelId] ?? null;
}

export function getProductPremiumFeatures(productId: string): string[] {
  const product = WPLUS_PRODUCTS[productId];
  return product?.premiumFeatures ?? [];
}

export function hasPremiumFeatures(productId: string): boolean {
  return getProductPremiumFeatures(productId).length > 0;
}
