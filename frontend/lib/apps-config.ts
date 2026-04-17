export interface AppConfig {
  id: string;
  name: string;
  filename: string; // HTML filename in legacy-apps/public/
  description: string;
  category: string;
  tier: 'free' | 'core' | 'full';
  icon: string; // Emoji icon for now
  keywords: string[];
}

export const appsConfig: AppConfig[] = [
  // Free Tier (1 app)
  {
    id: 'word-search',
    name: 'Word Search with Images',
    filename: 'wordsearch.html',
    description: 'Create engaging word search puzzles with themed images',
    category: 'Language Arts',
    tier: 'free',
    icon: '🔍',
    keywords: ['vocabulary', 'words', 'puzzle', 'search']
  },

  // Core Bundle (10 apps)
  {
    id: 'image-addition',
    name: 'Image Addition',
    filename: 'imageaddition.html',
    description: 'Visual math worksheets with image-based addition problems',
    category: 'Math',
    tier: 'core',
    icon: '➕',
    keywords: ['math', 'addition', 'visual', 'counting']
  },
  {
    id: 'alphabet-train',
    name: 'Alphabet Train',
    filename: 'alphabettrain.html',
    description: 'Fun alphabet learning with train-themed letters',
    category: 'Language Arts',
    tier: 'core',
    icon: '🚂',
    keywords: ['alphabet', 'letters', 'abc', 'train']
  },
  {
    id: 'coloring',
    name: 'Coloring Page Designer',
    filename: 'coloring.html',
    description: 'Create custom coloring pages from images',
    category: 'Art & Creativity',
    tier: 'core',
    icon: '🎨',
    keywords: ['coloring', 'art', 'drawing', 'creative']
  },
  {
    id: 'math-worksheet',
    name: 'Math Worksheet Generator',
    filename: 'math-worksheet.html',
    description: 'Generate customizable math practice sheets',
    category: 'Math',
    tier: 'core',
    icon: '🔢',
    keywords: ['math', 'arithmetic', 'practice', 'worksheet']
  },
  {
    id: 'word-scramble',
    name: 'Word Scramble',
    filename: 'wordscramble.html',
    description: 'Scrambled word puzzles with images',
    category: 'Language Arts',
    tier: 'core',
    icon: '🔤',
    keywords: ['words', 'scramble', 'puzzle', 'vocabulary']
  },
  {
    id: 'find-and-count',
    name: 'Find and Count',
    filename: 'find-and-count.html',
    description: 'Visual counting exercises with themed images',
    category: 'Math',
    tier: 'core',
    icon: '🔢',
    keywords: ['counting', 'find', 'numbers', 'visual']
  },
  {
    id: 'matching-app',
    name: 'MatchUp Maker',
    filename: 'matching.html',
    description: 'Create matching exercises with images and words',
    category: 'Memory & Matching',
    tier: 'core',
    icon: '🎯',
    keywords: ['matching', 'memory', 'pairs', 'association']
  },
  {
    id: 'drawing-lines',
    name: 'Drawing Lines',
    filename: 'drawinglines.html',
    description: 'Line drawing and tracing activities',
    category: 'Fine Motor Skills',
    tier: 'core',
    icon: '✏️',
    keywords: ['drawing', 'lines', 'tracing', 'motor skills']
  },
  {
    id: 'picture-bingo',
    name: 'Picture Bingo',
    filename: 'picturebingo.html',
    description: 'Create custom bingo cards with images',
    category: 'Games',
    tier: 'core',
    icon: '🎲',
    keywords: ['bingo', 'game', 'pictures', 'fun']
  },
  {
    id: 'sudoku',
    name: 'Sudoku',
    filename: 'sudoku.html',
    description: 'Number and image-based sudoku puzzles',
    category: 'Logic & Puzzles',
    tier: 'core',
    icon: '🧩',
    keywords: ['sudoku', 'logic', 'puzzle', 'numbers']
  },

  // Full Access Apps (Additional 22 apps)
  {
    id: 'big-small-app',
    name: 'Big Small App',
    filename: 'bigsmall.html',
    description: 'Size comparison exercises',
    category: 'Visual Perception',
    tier: 'full',
    icon: '📏',
    keywords: ['size', 'comparison', 'big', 'small']
  },
  {
    id: 'chart-count-color',
    name: 'Chart Count and Color',
    filename: 'chartcountcolor.html',
    description: 'Counting and coloring charts',
    category: 'Math',
    tier: 'full',
    icon: '📊',
    keywords: ['chart', 'count', 'color', 'graph']
  },
  {
    id: 'code-addition',
    name: 'Code Addition',
    filename: 'codeaddition.html',
    description: 'Addition problems with secret codes',
    category: 'Math',
    tier: 'full',
    icon: '🔐',
    keywords: ['code', 'addition', 'secret', 'math']
  },
  {
    id: 'draw-and-color',
    name: 'Draw and Color',
    filename: 'drawandcolor.html',
    description: 'Drawing and coloring activities',
    category: 'Art & Creativity',
    tier: 'full',
    icon: '🖍️',
    keywords: ['draw', 'color', 'art', 'creative']
  },
  {
    id: 'find-objects',
    name: 'Find Objects',
    filename: 'findobjects.html',
    description: 'Hidden object finding games',
    category: 'Visual Perception',
    tier: 'full',
    icon: '👀',
    keywords: ['find', 'search', 'hidden', 'objects']
  },
  {
    id: 'grid-match',
    name: 'Grid Match',
    filename: 'gridmatch.html',
    description: 'Grid-based matching puzzles',
    category: 'Memory & Matching',
    tier: 'full',
    icon: '⬜',
    keywords: ['grid', 'match', 'pattern', 'puzzle']
  },
  {
    id: 'image-crossword',
    name: 'Image Crossword Generator',
    filename: 'imagecrossword.html',
    description: 'Visual crossword puzzles with images',
    category: 'Language Arts',
    tier: 'full',
    icon: '✖️',
    keywords: ['crossword', 'puzzle', 'words', 'images']
  },
  {
    id: 'image-cryptogram',
    name: 'Image Cryptogram',
    filename: 'imagecryptogram.html',
    description: 'Decode messages using image clues',
    category: 'Logic & Puzzles',
    tier: 'full',
    icon: '🔣',
    keywords: ['cryptogram', 'code', 'decode', 'puzzle']
  },
  {
    id: 'math-puzzle',
    name: 'Math Puzzle',
    filename: 'math-puzzle.html',
    description: 'Mathematical puzzles and brain teasers',
    category: 'Math',
    tier: 'full',
    icon: '🧮',
    keywords: ['math', 'puzzle', 'brain teaser', 'logic']
  },
  {
    id: 'missing-pieces',
    name: 'Missing Pieces',
    filename: 'missingpieces.html',
    description: 'Complete the picture puzzles',
    category: 'Visual Perception',
    tier: 'full',
    icon: '🧩',
    keywords: ['missing', 'pieces', 'complete', 'puzzle']
  },
  {
    id: 'more-less',
    name: 'Compare Numbers (More Less)',
    filename: 'moreless.html',
    description: 'Number comparison exercises',
    category: 'Math',
    tier: 'full',
    icon: '⚖️',
    keywords: ['more', 'less', 'compare', 'numbers']
  },
  {
    id: 'odd-one-out',
    name: 'Odd One Out',
    filename: 'oddoneout.html',
    description: 'Find the different item exercises',
    category: 'Logic & Puzzles',
    tier: 'full',
    icon: '🎯',
    keywords: ['odd', 'different', 'find', 'logic']
  },
  {
    id: 'pattern-train',
    name: 'Pattern Train',
    filename: 'patterntrain.html',
    description: 'Pattern recognition with train theme',
    category: 'Logic & Puzzles',
    tier: 'full',
    icon: '🚃',
    keywords: ['pattern', 'sequence', 'train', 'logic']
  },
  {
    id: 'pattern-worksheet',
    name: 'Pattern Worksheet Generator',
    filename: 'patternworksheet.html',
    description: 'Create pattern recognition worksheets',
    category: 'Logic & Puzzles',
    tier: 'full',
    icon: '🔁',
    keywords: ['pattern', 'worksheet', 'sequence', 'repeat']
  },
  {
    id: 'picture-path',
    name: 'Picture Pathway',
    filename: 'picturepathway.html',
    description: 'Path finding with pictures',
    category: 'Visual Perception',
    tier: 'full',
    icon: '🛤️',
    keywords: ['path', 'maze', 'picture', 'find']
  },
  {
    id: 'picture-sort',
    name: 'Picture Sort',
    filename: 'picturesort.html',
    description: 'Sorting and categorizing images',
    category: 'Logic & Puzzles',
    tier: 'full',
    icon: '📦',
    keywords: ['sort', 'categorize', 'organize', 'pictures']
  },
  {
    id: 'prepositions',
    name: 'Prepositions',
    filename: 'prepositions.html',
    description: 'Learn prepositions with visual examples',
    category: 'Language Arts',
    tier: 'full',
    icon: '📍',
    keywords: ['prepositions', 'position', 'language', 'where']
  },
  {
    id: 'shadow-match',
    name: 'Shadow Match',
    filename: 'shadowmatch.html',
    description: 'Match objects with their shadows',
    category: 'Visual Perception',
    tier: 'full',
    icon: '👤',
    keywords: ['shadow', 'match', 'silhouette', 'shape']
  },
  {
    id: 'story-dice',
    name: 'Story Dice',
    filename: 'storydice.html',
    description: 'Create stories with image dice',
    category: 'Language Arts',
    tier: 'full',
    icon: '🎲',
    keywords: ['story', 'dice', 'creative', 'writing']
  },
  {
    id: 'subtraction',
    name: 'Subtraction',
    filename: 'subtraction.html',
    description: 'Visual subtraction worksheets',
    category: 'Math',
    tier: 'full',
    icon: '➖',
    keywords: ['subtraction', 'math', 'minus', 'take away']
  },
  {
    id: 'treasure-hunt',
    name: 'Treasure Hunt',
    filename: 'treasurehunt.html',
    description: 'Create treasure hunt activities',
    category: 'Games',
    tier: 'full',
    icon: '🗺️',
    keywords: ['treasure', 'hunt', 'search', 'adventure']
  },
  {
    id: 'word-guess',
    name: 'Word Guess',
    filename: 'wordguess.html',
    description: 'Guess the word from image clues',
    category: 'Language Arts',
    tier: 'full',
    icon: '❓',
    keywords: ['guess', 'word', 'clues', 'vocabulary']
  },
  {
    id: 'writing-app',
    name: 'Writing App',
    filename: 'writingapp.html',
    description: 'Handwriting practice worksheets',
    category: 'Language Arts',
    tier: 'full',
    icon: '✍️',
    keywords: ['writing', 'handwriting', 'practice', 'letters']
  }
];

// Helper functions
export function getAppById(id: string): AppConfig | undefined {
  return appsConfig.find(app => app.id === id);
}

export function getAppsByTier(tier: 'free' | 'core' | 'full'): AppConfig[] {
  if (tier === 'free') {
    return appsConfig.filter(app => app.tier === 'free');
  } else if (tier === 'core') {
    return appsConfig.filter(app => app.tier === 'free' || app.tier === 'core');
  } else {
    return appsConfig; // Full access gets all apps
  }
}

export function getAppsByCategory(category: string): AppConfig[] {
  return appsConfig.filter(app => app.category === category);
}

export function getCategories(): string[] {
  const categories = new Set(appsConfig.map(app => app.category));
  return Array.from(categories).sort();
}

export function canAccessApp(appId: string, userTier: 'free' | 'core' | 'full'): boolean {
  const app = getAppById(appId);
  if (!app) return false;
  
  const tierLevel = { free: 0, core: 1, full: 2 };
  return tierLevel[userTier] >= tierLevel[app.tier];
}