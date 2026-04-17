export interface WorksheetGenerator {
  id: string;
  name: string;
  description: string;
  category: string;
  url: string;
  icon?: string;
  minTier: 'free' | 'core' | 'full';
  popular?: boolean;
  new?: boolean;
  difficulty?: 'easy' | 'medium' | 'hard';
  ageRange?: string;
  subjects?: string[];
  previewImage?: string;
}

export const worksheetCategories = [
  { id: 'literacy', name: 'Literacy & Language', icon: '📚', color: 'bg-blue-100 text-blue-800' },
  { id: 'math', name: 'Mathematics', icon: '🔢', color: 'bg-green-100 text-green-800' },
  { id: 'puzzles', name: 'Puzzles & Games', icon: '🧩', color: 'bg-purple-100 text-purple-800' },
  { id: 'creative', name: 'Creative & Art', icon: '🎨', color: 'bg-pink-100 text-pink-800' },
  { id: 'cognitive', name: 'Cognitive Skills', icon: '🧠', color: 'bg-yellow-100 text-yellow-800' },
  { id: 'visual', name: 'Visual Learning', icon: '👁️', color: 'bg-indigo-100 text-indigo-800' },
];

export const worksheetGenerators: WorksheetGenerator[] = [
  // Literacy & Language (10 generators)
  {
    id: 'word-search',
    name: 'Word Search',
    description: 'Create custom word search puzzles with your own word lists',
    category: 'literacy',
    url: '/worksheet-generators/wordsearch.html',
    minTier: 'free',
    popular: true,
    difficulty: 'easy',
    ageRange: '6+',
    subjects: ['English', 'Vocabulary'],
  },
  {
    id: 'crossword',
    name: 'Crossword Puzzle',
    description: 'Build engaging crossword puzzles with clues',
    category: 'literacy',
    url: '/worksheet-generators/crossword.html',
    minTier: 'core',
    popular: true,
    difficulty: 'medium',
    ageRange: '10+',
    subjects: ['English', 'Vocabulary'],
  },
  {
    id: 'word-scramble',
    name: 'Word Scramble',
    description: 'Scramble words for unscrambling exercises',
    category: 'literacy',
    url: '/worksheet-generators/word scramble.html',
    minTier: 'core',
    difficulty: 'easy',
    ageRange: '8+',
    subjects: ['English', 'Spelling'],
  },
  {
    id: 'alphabet-train',
    name: 'Alphabet Train',
    description: 'Letter learning activities with train templates',
    category: 'literacy',
    url: '/worksheet-generators/alphabet train.html',
    minTier: 'free',
    difficulty: 'easy',
    ageRange: '3-6',
    subjects: ['Alphabet', 'Pre-K'],
  },
  {
    id: 'writing',
    name: 'Writing Practice',
    description: 'Handwriting and letter formation practice sheets',
    category: 'literacy',
    url: '/worksheet-generators/writing.html',
    minTier: 'free',
    difficulty: 'easy',
    ageRange: '4-8',
    subjects: ['Handwriting', 'Pre-K'],
  },
  {
    id: 'word-guess',
    name: 'Word Guess',
    description: 'Create word guessing games like hangman',
    category: 'literacy',
    url: '/worksheet-generators/word guess.html',
    minTier: 'full',
    difficulty: 'medium',
    ageRange: '8+',
    subjects: ['English', 'Vocabulary'],
  },
  {
    id: 'cryptogram',
    name: 'Cryptogram',
    description: 'Encode messages for decoding practice',
    category: 'literacy',
    url: '/worksheet-generators/cryptogram.html',
    minTier: 'full',
    difficulty: 'hard',
    ageRange: '12+',
    subjects: ['English', 'Logic'],
  },
  {
    id: 'prepositions',
    name: 'Prepositions',
    description: 'Visual exercises for learning prepositions',
    category: 'literacy',
    url: '/worksheet-generators/prepositions.html',
    minTier: 'full',
    difficulty: 'easy',
    ageRange: '6-10',
    subjects: ['English', 'Grammar'],
  },
  {
    id: 'matching',
    name: 'Matching',
    description: 'Create matching exercises for vocabulary',
    category: 'literacy',
    url: '/worksheet-generators/matching.html',
    minTier: 'core',
    difficulty: 'easy',
    ageRange: '5+',
    subjects: ['English', 'Vocabulary'],
  },
  {
    id: 'bingo',
    name: 'Bingo',
    description: 'Generate custom bingo cards for vocabulary games',
    category: 'literacy',
    url: '/worksheet-generators/bingo.html',
    minTier: 'core',
    difficulty: 'easy',
    ageRange: '6+',
    subjects: ['English', 'Vocabulary'],
  },

  // Mathematics (8 generators)
  {
    id: 'addition',
    name: 'Addition',
    description: 'Create addition practice worksheets',
    category: 'math',
    url: '/worksheet-generators/addition.html',
    minTier: 'free',
    popular: true,
    difficulty: 'easy',
    ageRange: '5-10',
    subjects: ['Math', 'Arithmetic'],
  },
  {
    id: 'subtraction',
    name: 'Subtraction',
    description: 'Generate subtraction practice problems',
    category: 'math',
    url: '/worksheet-generators/subtraction.html',
    minTier: 'free',
    popular: true,
    difficulty: 'easy',
    ageRange: '5-10',
    subjects: ['Math', 'Arithmetic'],
  },
  {
    id: 'math-worksheet',
    name: 'Math Worksheet',
    description: 'Mixed math problems and exercises',
    category: 'math',
    url: '/worksheet-generators/math worksheet.html',
    minTier: 'core',
    difficulty: 'medium',
    ageRange: '7-12',
    subjects: ['Math', 'Mixed'],
  },
  {
    id: 'math-puzzle',
    name: 'Math Puzzle',
    description: 'Mathematical puzzles and brain teasers',
    category: 'math',
    url: '/worksheet-generators/math puzzle.html',
    minTier: 'full',
    difficulty: 'hard',
    ageRange: '10+',
    subjects: ['Math', 'Logic'],
  },
  {
    id: 'code-addition',
    name: 'Code Addition',
    description: 'Addition with code-breaking elements',
    category: 'math',
    url: '/worksheet-generators/code addition.html',
    minTier: 'full',
    difficulty: 'medium',
    ageRange: '8-12',
    subjects: ['Math', 'Logic'],
  },
  {
    id: 'chart-count',
    name: 'Chart Count',
    description: 'Counting exercises with charts and graphs',
    category: 'math',
    url: '/worksheet-generators/chart count.html',
    minTier: 'core',
    difficulty: 'easy',
    ageRange: '5-8',
    subjects: ['Math', 'Data'],
  },
  {
    id: 'sudoku',
    name: 'Sudoku',
    description: 'Number puzzle challenges for logical thinking',
    category: 'math',
    url: '/worksheet-generators/sudoku.html',
    minTier: 'full',
    popular: true,
    difficulty: 'hard',
    ageRange: '10+',
    subjects: ['Math', 'Logic'],
  },
  {
    id: 'treasure-hunt',
    name: 'Treasure Hunt',
    description: 'Math-based treasure hunt activities',
    category: 'math',
    url: '/worksheet-generators/treasure hunt.html',
    minTier: 'full',
    difficulty: 'medium',
    ageRange: '7-12',
    subjects: ['Math', 'Problem Solving'],
  },

  // Creative & Art (4 generators)
  {
    id: 'coloring',
    name: 'Coloring Pages',
    description: 'Create custom coloring pages and activities',
    category: 'creative',
    url: '/worksheet-generators/coloring.html',
    minTier: 'free',
    popular: true,
    difficulty: 'easy',
    ageRange: '3-10',
    subjects: ['Art', 'Creativity'],
  },
  {
    id: 'draw-and-color',
    name: 'Draw and Color',
    description: 'Drawing prompts with coloring elements',
    category: 'creative',
    url: '/worksheet-generators/draw and color.html',
    minTier: 'core',
    difficulty: 'easy',
    ageRange: '4-10',
    subjects: ['Art', 'Creativity'],
  },
  {
    id: 'drawing-lines',
    name: 'Drawing Lines',
    description: 'Line drawing and tracing exercises',
    category: 'creative',
    url: '/worksheet-generators/drawing lines.html',
    minTier: 'core',
    difficulty: 'easy',
    ageRange: '3-6',
    subjects: ['Art', 'Fine Motor'],
  },
  {
    id: 'picture-path',
    name: 'Picture Path',
    description: 'Connect pictures to create paths',
    category: 'creative',
    url: '/worksheet-generators/picture path.html',
    minTier: 'full',
    difficulty: 'easy',
    ageRange: '4-8',
    subjects: ['Art', 'Logic'],
  },

  // Visual Learning (6 generators)
  {
    id: 'find-and-count',
    name: 'Find and Count',
    description: 'Visual counting and finding exercises',
    category: 'visual',
    url: '/worksheet-generators/find and count.html',
    minTier: 'core',
    difficulty: 'easy',
    ageRange: '4-7',
    subjects: ['Math', 'Visual'],
  },
  {
    id: 'shadow-match',
    name: 'Shadow Match',
    description: 'Match objects with their shadows',
    category: 'visual',
    url: '/worksheet-generators/shadow match.html',
    minTier: 'full',
    difficulty: 'easy',
    ageRange: '3-6',
    subjects: ['Visual', 'Perception'],
  },
  {
    id: 'picture-sort',
    name: 'Picture Sort',
    description: 'Sort and categorize pictures',
    category: 'visual',
    url: '/worksheet-generators/picture sort.html',
    minTier: 'core',
    difficulty: 'easy',
    ageRange: '4-8',
    subjects: ['Visual', 'Categorization'],
  },
  {
    id: 'find-objects',
    name: 'Find Objects',
    description: 'Hidden object and search activities',
    category: 'visual',
    url: '/worksheet-generators/find objects.html',
    minTier: 'full',
    difficulty: 'medium',
    ageRange: '5-10',
    subjects: ['Visual', 'Attention'],
  },
  {
    id: 'odd-one-out',
    name: 'Odd One Out',
    description: 'Identify the different item in groups',
    category: 'visual',
    url: '/worksheet-generators/odd one out.html',
    minTier: 'core',
    difficulty: 'easy',
    ageRange: '4-8',
    subjects: ['Visual', 'Logic'],
  },
  {
    id: 'grid-match',
    name: 'Grid Match',
    description: 'Match items in grid patterns',
    category: 'visual',
    url: '/worksheet-generators/grid match.html',
    minTier: 'full',
    difficulty: 'medium',
    ageRange: '6-10',
    subjects: ['Visual', 'Pattern'],
  },

  // Cognitive Skills (5 generators)
  {
    id: 'big-small',
    name: 'Big Small',
    description: 'Size comparison and sorting activities',
    category: 'cognitive',
    url: '/worksheet-generators/big small.html',
    minTier: 'core',
    difficulty: 'easy',
    ageRange: '3-6',
    subjects: ['Math', 'Comparison'],
  },
  {
    id: 'more-less',
    name: 'More Less',
    description: 'Quantity comparison exercises',
    category: 'cognitive',
    url: '/worksheet-generators/more less.html',
    minTier: 'core',
    difficulty: 'easy',
    ageRange: '4-7',
    subjects: ['Math', 'Comparison'],
  },
  {
    id: 'same-different',
    name: 'Same Different',
    description: 'Identify similarities and differences',
    category: 'cognitive',
    url: '/worksheet-generators/same different.html',
    minTier: 'full',
    difficulty: 'easy',
    ageRange: '3-6',
    subjects: ['Logic', 'Comparison'],
  },
  {
    id: 'pattern-complete',
    name: 'Pattern Complete',
    description: 'Complete and continue patterns',
    category: 'cognitive',
    url: '/worksheet-generators/pattern complete.html',
    minTier: 'full',
    difficulty: 'medium',
    ageRange: '5-10',
    subjects: ['Math', 'Pattern'],
  },
  {
    id: 'memory-game',
    name: 'Memory Game',
    description: 'Memory and recall exercises',
    category: 'cognitive',
    url: '/worksheet-generators/memory game.html',
    minTier: 'full',
    difficulty: 'medium',
    ageRange: '5+',
    subjects: ['Memory', 'Cognitive'],
  },
];

// Helper functions
export function getGeneratorsByCategory(category: string): WorksheetGenerator[] {
  return worksheetGenerators.filter(g => g.category === category);
}

export function getGeneratorsByTier(tier: 'free' | 'core' | 'full'): WorksheetGenerator[] {
  const tierHierarchy = { free: 0, core: 1, full: 2 };
  const userTierLevel = tierHierarchy[tier];
  
  return worksheetGenerators.filter(g => {
    const requiredLevel = tierHierarchy[g.minTier];
    return userTierLevel >= requiredLevel;
  });
}

export function getPopularGenerators(): WorksheetGenerator[] {
  return worksheetGenerators.filter(g => g.popular);
}

export function searchGenerators(query: string): WorksheetGenerator[] {
  const lowercaseQuery = query.toLowerCase();
  return worksheetGenerators.filter(g => 
    g.name.toLowerCase().includes(lowercaseQuery) ||
    g.description.toLowerCase().includes(lowercaseQuery) ||
    g.subjects?.some(s => s.toLowerCase().includes(lowercaseQuery)) ||
    g.category.toLowerCase().includes(lowercaseQuery)
  );
}

export function getGeneratorById(id: string): WorksheetGenerator | undefined {
  return worksheetGenerators.find(g => g.id === id);
}