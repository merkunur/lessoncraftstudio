/**
 * blog-visual-map.ts — Maps all 112 blog posts to their visual section configs.
 *
 * Locale-independent: images resolve at render time via imgUrl().
 * Factory functions keep the 33 Category 1 (product-guide) entries DRY.
 */

import type { BlogVisualConfig, ImageRef } from './types';

// ─── Helper: shorthand image ref ───
function img(appFolder: string, filename: string): ImageRef {
  return { appFolder, filename };
}

// ─── Factory: Category 1 (product-guide) — one generator per post ───
// Each gets: hero (3 images), product cards (3), difficulty tiers (3), answer key pair, CTA sample
function productGuide(
  folder: string,
  hero: [string, string, string],
  cards: Array<{ name: string; file: string; price: string }>,
  tiers: [string, string, string],
  worksheet: string,
  answerKey: string,
  cta: string,
  color: string,
): BlogVisualConfig {
  return {
    primaryGenerators: [folder],
    heroImages: [img(folder, hero[0]), img(folder, hero[1]), img(folder, hero[2])],
    productCards: {
      items: cards.map((c, i) => ({
        image: img(folder, c.file),
        productName: c.name,
        price: c.price,
        stars: 5,
      })),
    },
    difficultyTiers: {
      beginner: img(folder, tiers[0]),
      intermediate: img(folder, tiers[1]),
      advanced: img(folder, tiers[2]),
    },
    worksheetAnswerPair: {
      worksheet: img(folder, worksheet),
      answerKey: img(folder, answerKey),
    },
    ctaSample: img(folder, cta),
    accentColor: color,
  };
}

// ─── Factory: Category 2 (platform-strategy) — mixed generators ───
function platformStrategy(
  generators: string[],
  heroImgs: [ImageRef, ImageRef, ImageRef],
  extra: Partial<Pick<BlogVisualConfig, 'beforeAfter' | 'bundle' | 'platformMockup'>>,
  ctaSample: ImageRef,
  color: string,
): BlogVisualConfig {
  return {
    primaryGenerators: generators,
    heroImages: heroImgs,
    ...extra,
    ctaSample,
    accentColor: color,
  };
}

// ─── Factory: Category 3 (niche-seasonal) — theme-matched ───
function nicheSeasonal(
  generators: string[],
  heroImgs: [ImageRef, ImageRef, ImageRef],
  gridImages: ImageRef[],
  cards: Array<{ image: ImageRef; name: string; price: string }>,
  ctaSample: ImageRef,
  color: string,
): BlogVisualConfig {
  return {
    primaryGenerators: generators,
    heroImages: heroImgs,
    themedGrid: { images: gridImages },
    productCards: {
      items: cards.map(c => ({ image: c.image, productName: c.name, price: c.price, stars: 5 })),
    },
    ctaSample,
    accentColor: color,
  };
}

// ─── Factory: Category 4 (how-to) — instructional ───
function howTo(
  generators: string[],
  heroImgs: [ImageRef, ImageRef] | [ImageRef, ImageRef, ImageRef],
  tierOrPair: { type: 'tiers'; beginner: ImageRef; intermediate: ImageRef; advanced: ImageRef } | { type: 'pair'; worksheet: ImageRef; answerKey: ImageRef },
  ctaSample: ImageRef,
  color: string,
): BlogVisualConfig {
  const base: BlogVisualConfig = {
    primaryGenerators: generators,
    heroImages: heroImgs,
    ctaSample,
    accentColor: color,
  };
  if (tierOrPair.type === 'tiers') {
    base.difficultyTiers = { beginner: tierOrPair.beginner, intermediate: tierOrPair.intermediate, advanced: tierOrPair.advanced };
  } else {
    base.worksheetAnswerPair = { worksheet: tierOrPair.worksheet, answerKey: tierOrPair.answerKey };
  }
  return base;
}

// ═══════════════════════════════════════════════════════════════
// CATEGORY 1: Product-Specific Seller Guides (33 posts)
// ═══════════════════════════════════════════════════════════════

const cat1: Record<string, BlogVisualConfig> = {
  'sell-addition-worksheets-etsy-guide': productGuide(
    'addition',
    ['addition_worksheet portrait.jpeg', 'image and number.jpeg', 'find addend.jpeg'],
    [
      { name: 'Farm Addition Pack', file: 'addition_worksheet portrait.jpeg', price: '$4.99' },
      { name: 'Picture Addition Bundle', file: 'image and number.jpeg', price: '$6.99' },
      { name: 'Find the Addend Set', file: 'find addend.jpeg', price: '$4.99' },
    ],
    ['addition_worksheet portrait.jpeg', 'image and number.jpeg', 'find addend.jpeg'],
    'mixed mode.jpeg',
    'mixed mode answer_key.jpeg',
    'addition_worksheet portrait.jpeg',
    'orange',
  ),

  'sell-subtraction-worksheets-online': productGuide(
    'subtraction',
    ['cross out.jpeg', 'image number.jpeg', 'find subtrahend.jpeg'],
    [
      { name: 'Cross Out Subtraction', file: 'cross out.jpeg', price: '$4.99' },
      { name: 'Picture Subtraction', file: 'image number.jpeg', price: '$5.99' },
      { name: 'Find the Subtrahend', file: 'find subtrahend.jpeg', price: '$4.99' },
    ],
    ['cross out.jpeg', 'image number.jpeg', 'find subtrahend.jpeg'],
    'mixed.jpeg',
    'mixed answer_key.jpeg',
    'cross out.jpeg',
    'blue',
  ),

  'code-addition-puzzles-sell-etsy': productGuide(
    'code addition',
    ['code addition portrait.jpeg', 'code addition landscape.jpeg', 'code addition portrait.jpeg'],
    [
      { name: 'Code Addition Portrait', file: 'code addition portrait.jpeg', price: '$4.99' },
      { name: 'Code Addition Landscape', file: 'code addition landscape.jpeg', price: '$4.99' },
      { name: 'Code Breaker Bundle', file: 'code addition portrait.jpeg', price: '$8.99' },
    ],
    ['code addition portrait.jpeg', 'code addition landscape.jpeg', 'code addition portrait.jpeg'],
    'code addition portrait.jpeg',
    'code addition portrait answer_key.jpeg',
    'code addition landscape.jpeg',
    'indigo',
  ),

  'math-worksheet-bundles-that-sell': productGuide(
    'math worksheet',
    ['math worksheet portrait.jpeg', 'math worksheet landscape.jpeg', 'math worksheet portrait.jpeg'],
    [
      { name: 'Math Practice Portrait', file: 'math worksheet portrait.jpeg', price: '$4.99' },
      { name: 'Math Practice Landscape', file: 'math worksheet landscape.jpeg', price: '$4.99' },
      { name: 'Math Mega Bundle', file: 'math worksheet portrait.jpeg', price: '$12.99' },
    ],
    ['math worksheet portrait.jpeg', 'math worksheet landscape.jpeg', 'math worksheet portrait.jpeg'],
    'math worksheet portrait.jpeg',
    'math worksheet portrait answer_key.jpeg',
    'math worksheet landscape.jpeg',
    'emerald',
  ),

  'math-puzzle-books-amazon-kdp': productGuide(
    'math puzzle',
    ['worksheet.jpeg', 'worksheet (1).jpeg', 'worksheet.jpeg'],
    [
      { name: 'Math Puzzle Book', file: 'worksheet.jpeg', price: '$6.99' },
      { name: 'Math Challenge Pack', file: 'worksheet (1).jpeg', price: '$8.99' },
      { name: 'KDP Math Bundle', file: 'worksheet.jpeg', price: '$14.99' },
    ],
    ['worksheet.jpeg', 'worksheet (1).jpeg', 'worksheet.jpeg'],
    'worksheet.jpeg',
    'answer_key.jpeg',
    'worksheet (1).jpeg',
    'purple',
  ),

  'chart-count-worksheets-business': productGuide(
    'chart count',
    ['chart count.jpeg', 'chart count.jpeg', 'chart count.jpeg'],
    [
      { name: 'Chart Count Starter', file: 'chart count.jpeg', price: '$3.99' },
      { name: 'Counting Charts Pack', file: 'chart count.jpeg', price: '$5.99' },
      { name: 'Chart Count Bundle', file: 'chart count.jpeg', price: '$9.99' },
    ],
    ['chart count.jpeg', 'chart count.jpeg', 'chart count.jpeg'],
    'chart count.jpeg',
    'chart count answer_key.jpeg',
    'chart count.jpeg',
    'teal',
  ),

  'word-search-printables-profit': productGuide(
    'wordsearch',
    ['wordsearch portrait.jpeg', 'wordsearch landscape.jpeg', 'custom word list.jpeg'],
    [
      { name: 'Word Search Portrait', file: 'wordsearch portrait.jpeg', price: '$4.99' },
      { name: 'Word Search Landscape', file: 'wordsearch landscape.jpeg', price: '$4.99' },
      { name: 'Custom Word Search', file: 'custom word list.jpeg', price: '$6.99' },
    ],
    ['wordsearch portrait.jpeg', 'wordsearch landscape.jpeg', 'custom word list.jpeg'],
    'wordsearch portrait.jpeg',
    'wordsearch portrait answer_key.jpeg',
    'wordsearch landscape.jpeg',
    'sky',
  ),

  'crossword-books-kdp-niche': productGuide(
    'crossword',
    ['crossword_worksheet.jpeg', 'crossword_worksheet (1).jpeg', 'crossword_worksheet.jpeg'],
    [
      { name: 'Crossword Puzzle Book', file: 'crossword_worksheet.jpeg', price: '$5.99' },
      { name: 'Image Crossword Pack', file: 'crossword_worksheet (1).jpeg', price: '$7.99' },
      { name: 'Crossword KDP Bundle', file: 'crossword_worksheet.jpeg', price: '$12.99' },
    ],
    ['crossword_worksheet.jpeg', 'crossword_worksheet (1).jpeg', 'crossword_worksheet.jpeg'],
    'crossword_worksheet.jpeg',
    'crossword_answer_key.jpeg',
    'crossword_worksheet (1).jpeg',
    'violet',
  ),

  'cryptogram-worksheets-sell': productGuide(
    'cryptogram',
    ['cryptogram_worksheet.jpeg', 'cryptogram_worksheet (1).jpeg', 'cryptogram_worksheet.jpeg'],
    [
      { name: 'Cryptogram Puzzle Set', file: 'cryptogram_worksheet.jpeg', price: '$4.99' },
      { name: 'Cryptogram Challenge', file: 'cryptogram_worksheet (1).jpeg', price: '$5.99' },
      { name: 'Code Breaker Bundle', file: 'cryptogram_worksheet.jpeg', price: '$9.99' },
    ],
    ['cryptogram_worksheet.jpeg', 'cryptogram_worksheet (1).jpeg', 'cryptogram_worksheet.jpeg'],
    'cryptogram_worksheet.jpeg',
    'cryptogram_answer_key.jpeg',
    'cryptogram_worksheet (1).jpeg',
    'amber',
  ),

  'word-scramble-printables-business': productGuide(
    'word scramble',
    ['word scramble portrait.jpeg', 'word scramble landscape.jpeg', 'custom word list.jpeg'],
    [
      { name: 'Word Scramble Portrait', file: 'word scramble portrait.jpeg', price: '$3.99' },
      { name: 'Word Scramble Landscape', file: 'word scramble landscape.jpeg', price: '$3.99' },
      { name: 'Custom Scramble Pack', file: 'custom word list.jpeg', price: '$6.99' },
    ],
    ['word scramble portrait.jpeg', 'word scramble landscape.jpeg', 'custom word list.jpeg'],
    'word scramble portrait.jpeg',
    'word scramble portrait answer_key.jpeg',
    'word scramble landscape.jpeg',
    'pink',
  ),

  'word-guess-game-worksheets-sell': productGuide(
    'word guess',
    ['clue-grid_worksheet.jpeg', 'landscape.jpeg', 'custom word list.jpeg'],
    [
      { name: 'Word Guess Clue Grid', file: 'clue-grid_worksheet.jpeg', price: '$4.99' },
      { name: 'Word Guess Landscape', file: 'landscape.jpeg', price: '$4.99' },
      { name: 'Custom Word Guess', file: 'custom word list.jpeg', price: '$6.99' },
    ],
    ['clue-grid_worksheet.jpeg', 'landscape.jpeg', 'custom word list.jpeg'],
    'clue-grid_worksheet.jpeg',
    'clue-grid_answer-key.jpeg',
    'landscape.jpeg',
    'cyan',
  ),

  'handwriting-worksheets-etsy-niche': productGuide(
    'writing',
    ['writing.jpeg', 'writing beginning letter.jpeg', 'writing custom.jpeg'],
    [
      { name: 'Handwriting Practice', file: 'writing.jpeg', price: '$4.99' },
      { name: 'Beginning Letters', file: 'writing beginning letter.jpeg', price: '$4.99' },
      { name: 'Custom Writing Pack', file: 'writing custom.jpeg', price: '$6.99' },
    ],
    ['writing.jpeg', 'writing beginning letter.jpeg', 'writing custom.jpeg'],
    'writing.jpeg',
    'writing.jpeg',
    'writing beginning letter.jpeg',
    'rose',
  ),

  'matching-worksheets-toddler-market': productGuide(
    'matching',
    ['matching portrait.jpeg', 'image and word.jpeg', 'image and custom word.jpeg'],
    [
      { name: 'Image Matching Set', file: 'matching portrait.jpeg', price: '$3.99' },
      { name: 'Image & Word Match', file: 'image and word.jpeg', price: '$4.99' },
      { name: 'Custom Matching Pack', file: 'image and custom word.jpeg', price: '$6.99' },
    ],
    ['matching portrait.jpeg', 'image and word.jpeg', 'image and custom word.jpeg'],
    'matching portrait.jpeg',
    'matching portrait answer_key.jpeg',
    'image and word.jpeg',
    'green',
  ),

  'tracing-worksheets-fine-motor-sell': productGuide(
    'drawing lines',
    ['drawing_lines_horizontal.jpeg', 'drawing_lines_curve 1.jpeg', 'drawing_lines_diagonal 1.jpeg'],
    [
      { name: 'Horizontal Tracing', file: 'drawing_lines_horizontal.jpeg', price: '$3.99' },
      { name: 'Curve Tracing Set', file: 'drawing_lines_curve 1.jpeg', price: '$4.99' },
      { name: 'Diagonal Lines Pack', file: 'drawing_lines_diagonal 1.jpeg', price: '$4.99' },
    ],
    ['drawing_lines_horizontal.jpeg', 'drawing_lines_curve 1.jpeg', 'drawing_lines_diagonal 1.jpeg'],
    'drawing_lines_vertical.jpeg',
    'drawing_lines_vertical.jpeg',
    'drawing_lines_curve 2.jpeg',
    'teal',
  ),

  'hidden-object-worksheets-business': productGuide(
    'find objects',
    ['find objects portrait.jpeg', 'find objects landscape.jpeg', 'find objects portrait.jpeg'],
    [
      { name: 'Hidden Object Portrait', file: 'find objects portrait.jpeg', price: '$4.99' },
      { name: 'Hidden Object Landscape', file: 'find objects landscape.jpeg', price: '$4.99' },
      { name: 'Hidden Object Bundle', file: 'find objects portrait.jpeg', price: '$9.99' },
    ],
    ['find objects portrait.jpeg', 'find objects landscape.jpeg', 'find objects portrait.jpeg'],
    'find objects portrait.jpeg',
    'find objects portrait answer_key.jpeg',
    'find objects landscape.jpeg',
    'purple',
  ),

  'grid-matching-puzzles-sell': productGuide(
    'grid match',
    ['grid match portrait .jpeg', 'grid match landscape.jpeg', 'grid match portrait .jpeg'],
    [
      { name: 'Grid Match Portrait', file: 'grid match portrait .jpeg', price: '$4.99' },
      { name: 'Grid Match Landscape', file: 'grid match landscape.jpeg', price: '$4.99' },
      { name: 'Grid Match Bundle', file: 'grid match portrait .jpeg', price: '$8.99' },
    ],
    ['grid match portrait .jpeg', 'grid match landscape.jpeg', 'grid match portrait .jpeg'],
    'grid match portrait .jpeg',
    'grid match portrait  answer_key.jpeg',
    'grid match landscape.jpeg',
    'indigo',
  ),

  'find-and-count-printables-profit': productGuide(
    'find and count',
    ['find and count portrait.jpeg', 'find and count landscape.jpeg', 'find and count portrait.jpeg'],
    [
      { name: 'Find & Count Portrait', file: 'find and count portrait.jpeg', price: '$3.99' },
      { name: 'Find & Count Landscape', file: 'find and count landscape.jpeg', price: '$3.99' },
      { name: 'Find & Count Bundle', file: 'find and count portrait.jpeg', price: '$7.99' },
    ],
    ['find and count portrait.jpeg', 'find and count landscape.jpeg', 'find and count portrait.jpeg'],
    'find and count portrait.jpeg',
    'find and count portrait answer_key.jpeg',
    'find and count landscape.jpeg',
    'amber',
  ),

  'missing-pieces-puzzles-kdp': productGuide(
    'missing pieces',
    ['worksheet.jpeg', 'worksheet (1).jpeg', 'worksheet.jpeg'],
    [
      { name: 'Missing Pieces Set', file: 'worksheet.jpeg', price: '$4.99' },
      { name: 'Missing Pieces Pack', file: 'worksheet (1).jpeg', price: '$5.99' },
      { name: 'KDP Puzzle Bundle', file: 'worksheet.jpeg', price: '$11.99' },
    ],
    ['worksheet.jpeg', 'worksheet (1).jpeg', 'worksheet.jpeg'],
    'worksheet.jpeg',
    'answer_key.jpeg',
    'worksheet (1).jpeg',
    'red',
  ),

  'shadow-matching-worksheets-sell': productGuide(
    'shadow match',
    ['shadow-match-worksheet.jpeg', 'shadow-match-horizontal.jpeg', 'shadow-match-vertical.jpeg'],
    [
      { name: 'Shadow Match Standard', file: 'shadow-match-worksheet.jpeg', price: '$3.99' },
      { name: 'Shadow Match Horizontal', file: 'shadow-match-horizontal.jpeg', price: '$3.99' },
      { name: 'Shadow Match Vertical', file: 'shadow-match-vertical.jpeg', price: '$3.99' },
    ],
    ['shadow-match-worksheet.jpeg', 'shadow-match-horizontal.jpeg', 'shadow-match-vertical.jpeg'],
    'shadow-match-worksheet.jpeg',
    'shadow-match-answer-key.jpeg',
    'shadow-match-horizontal.jpeg',
    'violet',
  ),

  'picture-maze-worksheets-business': productGuide(
    'picture path',
    ['picture path.jpeg', 'classic maze.jpeg', 'right path.jpeg'],
    [
      { name: 'Picture Path Maze', file: 'picture path.jpeg', price: '$4.99' },
      { name: 'Classic Maze Set', file: 'classic maze.jpeg', price: '$4.99' },
      { name: 'Right Path Pack', file: 'right path.jpeg', price: '$5.99' },
    ],
    ['picture path.jpeg', 'classic maze.jpeg', 'right path.jpeg'],
    'picture path.jpeg',
    'picture path answer_key.jpeg',
    'classic maze.jpeg',
    'emerald',
  ),

  'sorting-worksheets-preschool-sell': productGuide(
    'picture sort',
    ['picture sort portrait.jpeg', 'picture sort landscape.jpeg', 'picture sort portrait.jpeg'],
    [
      { name: 'Sorting Portrait Set', file: 'picture sort portrait.jpeg', price: '$3.99' },
      { name: 'Sorting Landscape Set', file: 'picture sort landscape.jpeg', price: '$3.99' },
      { name: 'Sorting Bundle', file: 'picture sort portrait.jpeg', price: '$7.99' },
    ],
    ['picture sort portrait.jpeg', 'picture sort landscape.jpeg', 'picture sort portrait.jpeg'],
    'picture sort portrait.jpeg',
    'picture sort portrait answer_key.jpeg',
    'picture sort landscape.jpeg',
    'green',
  ),

  'preposition-worksheets-esl-market': productGuide(
    'prepositions',
    ['prepositions_worksheet.jpeg', 'prepositions multiple choice.jpeg', 'prepositions_worksheet.jpeg'],
    [
      { name: 'Preposition Worksheet', file: 'prepositions_worksheet.jpeg', price: '$3.99' },
      { name: 'Multiple Choice Set', file: 'prepositions multiple choice.jpeg', price: '$4.99' },
      { name: 'ESL Preposition Pack', file: 'prepositions_worksheet.jpeg', price: '$7.99' },
    ],
    ['prepositions_worksheet.jpeg', 'prepositions multiple choice.jpeg', 'prepositions_worksheet.jpeg'],
    'prepositions_worksheet.jpeg',
    'prepositions_answer_key.jpeg',
    'prepositions multiple choice.jpeg',
    'sky',
  ),

  'coloring-pages-business-2026': productGuide(
    'coloring',
    ['coloring portrait 1.png', 'coloring portrait 2.png', 'coloring landscape 1.png'],
    [
      { name: 'Coloring Pages Portrait', file: 'coloring portrait 1.png', price: '$3.99' },
      { name: 'Coloring Pages Set', file: 'coloring portrait 2.png', price: '$5.99' },
      { name: 'Coloring Landscape', file: 'coloring landscape 1.png', price: '$4.99' },
    ],
    ['coloring portrait 1.png', 'coloring portrait 2.png', 'coloring landscape 1.png'],
    'coloring portrait 3.png',
    'coloring portrait 3.png',
    'coloring portrait 4.png',
    'pink',
  ),

  'draw-and-color-worksheets-sell': productGuide(
    'draw and color',
    ['grid-drawing_worksheet.jpeg', 'grid-drawing_worksheet (1).jpeg', 'grid-drawing_worksheet (2).jpeg'],
    [
      { name: 'Grid Drawing Set', file: 'grid-drawing_worksheet.jpeg', price: '$4.99' },
      { name: 'Draw & Color Pack', file: 'grid-drawing_worksheet (1).jpeg', price: '$5.99' },
      { name: 'Creative Drawing Bundle', file: 'grid-drawing_worksheet (2).jpeg', price: '$8.99' },
    ],
    ['grid-drawing_worksheet.jpeg', 'grid-drawing_worksheet (1).jpeg', 'grid-drawing_worksheet (2).jpeg'],
    'grid-drawing_worksheet (3).jpeg',
    'grid-drawing_worksheet (3).jpeg',
    'grid-drawing_worksheet (4).jpeg',
    'rose',
  ),

  'alphabet-worksheets-best-sellers': productGuide(
    'alphabet train',
    ['alphabet train portrait.jpeg', 'alphabet train landscape.jpeg', 'alphabet train portrait.jpeg'],
    [
      { name: 'Alphabet Train Portrait', file: 'alphabet train portrait.jpeg', price: '$4.99' },
      { name: 'Alphabet Train Landscape', file: 'alphabet train landscape.jpeg', price: '$4.99' },
      { name: 'ABC Complete Bundle', file: 'alphabet train portrait.jpeg', price: '$9.99' },
    ],
    ['alphabet train portrait.jpeg', 'alphabet train landscape.jpeg', 'alphabet train portrait.jpeg'],
    'alphabet train portrait.jpeg',
    'alphabet train portrait answer_key.jpeg',
    'alphabet train landscape.jpeg',
    'amber',
  ),

  'bingo-cards-printable-business': productGuide(
    'bingo',
    ['image and image.jpeg', 'image and word.jpeg', 'image and image.jpeg'],
    [
      { name: 'Image Bingo Cards', file: 'image and image.jpeg', price: '$4.99' },
      { name: 'Word & Image Bingo', file: 'image and word.jpeg', price: '$4.99' },
      { name: 'Bingo Party Bundle', file: 'image and image.jpeg', price: '$8.99' },
    ],
    ['image and image.jpeg', 'image and word.jpeg', 'image and image.jpeg'],
    'image and image.jpeg',
    'image and image callout.jpeg',
    'image and word.jpeg',
    'purple',
  ),

  'pattern-worksheets-sell-online': productGuide(
    'pattern worksheet',
    ['pattern_worksheet portrait.jpeg', 'pattern_worksheet landscape.jpeg', 'pattern_worksheet portrait.jpeg'],
    [
      { name: 'Pattern Worksheet Portrait', file: 'pattern_worksheet portrait.jpeg', price: '$3.99' },
      { name: 'Pattern Worksheet Landscape', file: 'pattern_worksheet landscape.jpeg', price: '$3.99' },
      { name: 'Pattern Complete Pack', file: 'pattern_worksheet portrait.jpeg', price: '$7.99' },
    ],
    ['pattern_worksheet portrait.jpeg', 'pattern_worksheet landscape.jpeg', 'pattern_worksheet portrait.jpeg'],
    'pattern_worksheet portrait.jpeg',
    'pattern_worksheet portrait answer_key.jpeg',
    'pattern_worksheet landscape.jpeg',
    'teal',
  ),

  'pattern-train-worksheets-niche': productGuide(
    'pattern train',
    ['pattern_train portrait.jpeg', 'pattern_train landscape.jpeg', 'pattern_train portrait.jpeg'],
    [
      { name: 'Pattern Train Portrait', file: 'pattern_train portrait.jpeg', price: '$3.99' },
      { name: 'Pattern Train Landscape', file: 'pattern_train landscape.jpeg', price: '$3.99' },
      { name: 'Pattern Train Bundle', file: 'pattern_train portrait.jpeg', price: '$7.99' },
    ],
    ['pattern_train portrait.jpeg', 'pattern_train landscape.jpeg', 'pattern_train portrait.jpeg'],
    'pattern_train portrait.jpeg',
    'pattern_train portrait answer_key.jpeg',
    'pattern_train landscape.jpeg',
    'cyan',
  ),

  'treasure-hunt-printables-sell': productGuide(
    'treasure hunt',
    ['north south.jpeg', 'up down.jpeg', 'north south.jpeg'],
    [
      { name: 'North South Hunt', file: 'north south.jpeg', price: '$4.99' },
      { name: 'Up Down Adventure', file: 'up down.jpeg', price: '$4.99' },
      { name: 'Treasure Hunt Bundle', file: 'north south.jpeg', price: '$8.99' },
    ],
    ['north south.jpeg', 'up down.jpeg', 'north south.jpeg'],
    'north south.jpeg',
    'north south answer_key.jpeg',
    'up down.jpeg',
    'yellow',
  ),

  'picture-sudoku-books-kdp': productGuide(
    'sudoku',
    ['sudoku_easy.jpeg', 'sudoku medium.jpeg', 'sudoku hard.jpeg'],
    [
      { name: 'Easy Sudoku Book', file: 'sudoku_easy.jpeg', price: '$5.99' },
      { name: 'Medium Sudoku Pack', file: 'sudoku medium.jpeg', price: '$6.99' },
      { name: 'Hard Sudoku Challenge', file: 'sudoku hard.jpeg', price: '$7.99' },
    ],
    ['sudoku_easy.jpeg', 'sudoku medium.jpeg', 'sudoku hard.jpeg'],
    'sudoku_easy.jpeg',
    'sudoku_easy answer_key.jpeg',
    'sudoku medium.jpeg',
    'indigo',
  ),

  'size-comparison-worksheets-sell': productGuide(
    'big small',
    ['big-small identical images.jpeg', 'big-small-different images.jpeg', 'big-small number 1-2-3.jpeg'],
    [
      { name: 'Identical Images Set', file: 'big-small identical images.jpeg', price: '$3.99' },
      { name: 'Different Images Set', file: 'big-small-different images.jpeg', price: '$3.99' },
      { name: 'Number Size Pack', file: 'big-small number 1-2-3.jpeg', price: '$4.99' },
    ],
    ['big-small identical images.jpeg', 'big-small-different images.jpeg', 'big-small number 1-2-3.jpeg'],
    'big-small identical images.jpeg',
    'big-small identical images answer_key.jpeg',
    'big-small-different images.jpeg',
    'orange',
  ),

  'more-less-worksheets-sell': productGuide(
    'more less',
    ['illustration.jpeg', 'image to image.jpeg', 'image to number.jpeg'],
    [
      { name: 'Illustration Compare', file: 'illustration.jpeg', price: '$3.99' },
      { name: 'Image to Image Set', file: 'image to image.jpeg', price: '$3.99' },
      { name: 'Image to Number Pack', file: 'image to number.jpeg', price: '$4.99' },
    ],
    ['illustration.jpeg', 'image to image.jpeg', 'image to number.jpeg'],
    'illustration.jpeg',
    'illustration answer_key.jpeg',
    'image to image.jpeg',
    'blue',
  ),

  'odd-one-out-worksheets-sell': productGuide(
    'odd one out',
    ['identical.jpeg', 'similar.jpeg', 'identical.jpeg'],
    [
      { name: 'Identical Objects Set', file: 'identical.jpeg', price: '$3.99' },
      { name: 'Similar Objects Set', file: 'similar.jpeg', price: '$4.99' },
      { name: 'Odd One Out Bundle', file: 'identical.jpeg', price: '$7.99' },
    ],
    ['identical.jpeg', 'similar.jpeg', 'identical.jpeg'],
    'identical.jpeg',
    'identical answer-key.jpeg',
    'similar.jpeg',
    'red',
  ),
};

// ═══════════════════════════════════════════════════════════════
// CATEGORY 2: Platform & Business Strategy (30 posts)
// ═══════════════════════════════════════════════════════════════

// Common mixed-generator hero images used across strategy posts
const mixHero1: [ImageRef, ImageRef, ImageRef] = [img('addition', 'addition_worksheet portrait.jpeg'), img('wordsearch', 'wordsearch portrait.jpeg'), img('coloring', 'coloring portrait 1.png')];
const mixHero2: [ImageRef, ImageRef, ImageRef] = [img('crossword', 'crossword_worksheet.jpeg'), img('matching', 'matching portrait.jpeg'), img('sudoku', 'sudoku medium.jpeg')];
const mixHero3: [ImageRef, ImageRef, ImageRef] = [img('math puzzle', 'worksheet.jpeg'), img('word scramble', 'word scramble portrait.jpeg'), img('find objects', 'find objects portrait.jpeg')];
const mixHero4: [ImageRef, ImageRef, ImageRef] = [img('pattern worksheet', 'pattern_worksheet portrait.jpeg'), img('alphabet train', 'alphabet train portrait.jpeg'), img('bingo', 'image and image.jpeg')];

const cat2: Record<string, BlogVisualConfig> = {
  'etsy-printable-shop-first-month': platformStrategy(
    ['addition', 'wordsearch', 'coloring'],
    mixHero1,
    { platformMockup: { platform: 'etsy', image: img('addition', 'addition_worksheet portrait.jpeg') } },
    img('wordsearch', 'wordsearch portrait.jpeg'),
    'emerald',
  ),
  'etsy-seo-printable-sellers-2026': platformStrategy(
    ['wordsearch', 'crossword', 'matching'],
    mixHero2,
    { platformMockup: { platform: 'etsy', image: img('wordsearch', 'wordsearch portrait.jpeg') } },
    img('crossword', 'crossword_worksheet.jpeg'),
    'blue',
  ),
  'etsy-listing-optimization-worksheets': platformStrategy(
    ['addition', 'coloring', 'sudoku'],
    [img('addition', 'addition_worksheet portrait.jpeg'), img('coloring', 'coloring portrait 2.png'), img('sudoku', 'sudoku_easy.jpeg')],
    { platformMockup: { platform: 'etsy', image: img('coloring', 'coloring portrait 1.png') } },
    img('addition', 'image and number.jpeg'),
    'orange',
  ),
  'kdp-activity-book-formatting-guide': platformStrategy(
    ['math puzzle', 'wordsearch', 'crossword'],
    mixHero3,
    { platformMockup: { platform: 'kdp', image: img('math puzzle', 'worksheet.jpeg') } },
    img('wordsearch', 'wordsearch landscape.jpeg'),
    'purple',
  ),
  'kdp-vs-etsy-which-earns-more': platformStrategy(
    ['addition', 'crossword', 'sudoku'],
    [img('addition', 'addition_worksheet portrait.jpeg'), img('crossword', 'crossword_worksheet.jpeg'), img('sudoku', 'sudoku medium.jpeg')],
    { beforeAfter: { lcsImage: img('crossword', 'crossword_worksheet.jpeg') } },
    img('sudoku', 'sudoku_easy.jpeg'),
    'indigo',
  ),
  'printable-business-income-realistic': platformStrategy(
    ['addition', 'wordsearch', 'matching'],
    mixHero1,
    { bundle: { images: [img('addition', 'addition_worksheet portrait.jpeg'), img('wordsearch', 'wordsearch portrait.jpeg'), img('matching', 'matching portrait.jpeg'), img('coloring', 'coloring portrait 1.png')], pageCount: 50 } },
    img('addition', 'find addend.jpeg'),
    'emerald',
  ),
  'how-many-listings-etsy-success': platformStrategy(
    ['addition', 'subtraction', 'wordsearch'],
    [img('addition', 'image and number.jpeg'), img('subtraction', 'cross out.jpeg'), img('wordsearch', 'wordsearch landscape.jpeg')],
    { beforeAfter: { lcsImage: img('addition', 'addition_worksheet portrait.jpeg') } },
    img('subtraction', 'image number.jpeg'),
    'sky',
  ),
  'etsy-printable-pricing-strategy': platformStrategy(
    ['addition', 'wordsearch', 'coloring'],
    mixHero1,
    { bundle: { images: [img('addition', 'addition_worksheet portrait.jpeg'), img('addition', 'image and number.jpeg'), img('addition', 'find addend.jpeg'), img('addition', 'mixed mode.jpeg')], pageCount: 50 } },
    img('coloring', 'coloring portrait 2.png'),
    'amber',
  ),
  'pinterest-traffic-printable-shop': platformStrategy(
    ['coloring', 'draw and color', 'matching'],
    [img('coloring', 'coloring portrait 1.png'), img('draw and color', 'grid-drawing_worksheet.jpeg'), img('matching', 'image and word.jpeg')],
    { platformMockup: { platform: 'etsy', image: img('coloring', 'coloring portrait 3.png') } },
    img('draw and color', 'grid-drawing_worksheet (1).jpeg'),
    'pink',
  ),
  'seasonal-printable-calendar-sellers': platformStrategy(
    ['coloring', 'wordsearch', 'addition'],
    [img('coloring', 'coloring portrait 4.png'), img('wordsearch', 'wordsearch portrait.jpeg'), img('addition', 'addition_worksheet portrait.jpeg')],
    { bundle: { images: [img('coloring', 'coloring portrait 1.png'), img('wordsearch', 'wordsearch portrait.jpeg'), img('addition', 'addition_worksheet portrait.jpeg'), img('crossword', 'crossword_worksheet.jpeg')], pageCount: 100 } },
    img('coloring', 'coloring portrait 5.png'),
    'rose',
  ),
  'printable-bundle-strategy-etsy': platformStrategy(
    ['addition', 'subtraction', 'math worksheet'],
    [img('addition', 'addition_worksheet portrait.jpeg'), img('subtraction', 'cross out.jpeg'), img('math worksheet', 'math worksheet portrait.jpeg')],
    { bundle: { images: [img('addition', 'addition_worksheet portrait.jpeg'), img('subtraction', 'cross out.jpeg'), img('math worksheet', 'math worksheet portrait.jpeg'), img('addition', 'find addend.jpeg'), img('subtraction', 'find subtrahend.jpeg')], pageCount: 75 } },
    img('math worksheet', 'math worksheet landscape.jpeg'),
    'indigo',
  ),
  'passive-income-printables-truth': platformStrategy(
    ['wordsearch', 'coloring', 'crossword'],
    [img('wordsearch', 'wordsearch landscape.jpeg'), img('coloring', 'coloring landscape 1.png'), img('crossword', 'crossword_worksheet (1).jpeg')],
    { beforeAfter: { lcsImage: img('wordsearch', 'wordsearch portrait.jpeg') } },
    img('coloring', 'coloring portrait 1.png'),
    'teal',
  ),
  'printable-business-no-design-skills': platformStrategy(
    ['addition', 'matching', 'bingo'],
    [img('addition', 'addition_worksheet portrait.jpeg'), img('matching', 'matching portrait.jpeg'), img('bingo', 'image and image.jpeg')],
    { beforeAfter: { lcsImage: img('matching', 'image and word.jpeg') } },
    img('bingo', 'image and word.jpeg'),
    'green',
  ),
  'worksheet-quality-vs-quantity-etsy': platformStrategy(
    ['addition', 'wordsearch', 'sudoku'],
    [img('addition', 'image and number.jpeg'), img('wordsearch', 'custom word list.jpeg'), img('sudoku', 'sudoku hard.jpeg')],
    { beforeAfter: { lcsImage: img('addition', 'image and number.jpeg') } },
    img('sudoku', 'sudoku medium.jpeg'),
    'violet',
  ),
  'best-printable-niches-low-competition': platformStrategy(
    ['cryptogram', 'missing pieces', 'shadow match'],
    [img('cryptogram', 'cryptogram_worksheet.jpeg'), img('missing pieces', 'worksheet.jpeg'), img('shadow match', 'shadow-match-worksheet.jpeg')],
    { platformMockup: { platform: 'etsy', image: img('cryptogram', 'cryptogram_worksheet.jpeg') } },
    img('missing pieces', 'worksheet (1).jpeg'),
    'amber',
  ),
  'etsy-reviews-printable-products': platformStrategy(
    ['addition', 'wordsearch', 'coloring'],
    mixHero1,
    { platformMockup: { platform: 'etsy', image: img('wordsearch', 'wordsearch portrait.jpeg') } },
    img('addition', 'addition_worksheet portrait.jpeg'),
    'orange',
  ),
  'multilingual-printables-advantage': platformStrategy(
    ['addition', 'alphabet train', 'wordsearch'],
    [img('addition', 'addition_worksheet portrait.jpeg'), img('alphabet train', 'alphabet train portrait.jpeg'), img('wordsearch', 'wordsearch portrait.jpeg')],
    { beforeAfter: { lcsImage: img('alphabet train', 'alphabet train landscape.jpeg') } },
    img('addition', 'image and number.jpeg'),
    'cyan',
  ),
  'commercial-license-printables-explained': platformStrategy(
    ['math puzzle', 'coloring', 'crossword'],
    [img('math puzzle', 'worksheet.jpeg'), img('coloring', 'coloring portrait 1.png'), img('crossword', 'crossword_worksheet.jpeg')],
    { platformMockup: { platform: 'etsy', image: img('coloring', 'coloring portrait 2.png') } },
    img('math puzzle', 'worksheet (1).jpeg'),
    'emerald',
  ),
  'printable-shop-branding-tips': platformStrategy(
    ['coloring', 'draw and color', 'pattern worksheet'],
    [img('coloring', 'coloring portrait 3.png'), img('draw and color', 'grid-drawing_worksheet (2).jpeg'), img('pattern worksheet', 'pattern_worksheet portrait.jpeg')],
    { beforeAfter: { lcsImage: img('coloring', 'coloring portrait 1.png') } },
    img('draw and color', 'grid-drawing_worksheet.jpeg'),
    'pink',
  ),
  'email-list-printable-business': platformStrategy(
    ['addition', 'wordsearch', 'coloring'],
    mixHero1,
    { bundle: { images: [img('addition', 'addition_worksheet portrait.jpeg'), img('wordsearch', 'wordsearch portrait.jpeg'), img('coloring', 'coloring portrait 1.png')], pageCount: 30 } },
    img('wordsearch', 'custom word list.jpeg'),
    'blue',
  ),
  'etsy-ads-printables-worth-it': platformStrategy(
    ['addition', 'crossword', 'matching'],
    [img('addition', 'find addend.jpeg'), img('crossword', 'crossword_worksheet.jpeg'), img('matching', 'image and word.jpeg')],
    { platformMockup: { platform: 'etsy', image: img('addition', 'addition_worksheet portrait.jpeg') } },
    img('crossword', 'crossword_worksheet (1).jpeg'),
    'red',
  ),
  'tpt-vs-etsy-worksheets-comparison': platformStrategy(
    ['addition', 'wordsearch', 'math worksheet'],
    [img('addition', 'addition_worksheet portrait.jpeg'), img('wordsearch', 'wordsearch portrait.jpeg'), img('math worksheet', 'math worksheet portrait.jpeg')],
    { beforeAfter: { lcsImage: img('wordsearch', 'wordsearch landscape.jpeg') } },
    img('math worksheet', 'math worksheet landscape.jpeg'),
    'purple',
  ),
  'printable-business-mistakes-avoid': platformStrategy(
    ['addition', 'coloring', 'sudoku'],
    [img('addition', 'mixed mode.jpeg'), img('coloring', 'coloring portrait 5.png'), img('sudoku', 'sudoku_easy.jpeg')],
    { beforeAfter: { lcsImage: img('addition', 'addition_worksheet portrait.jpeg') } },
    img('coloring', 'coloring portrait 1.png'),
    'yellow',
  ),
  'scale-printable-business-automation': platformStrategy(
    ['addition', 'subtraction', 'wordsearch'],
    [img('addition', 'addition_worksheet portrait.jpeg'), img('subtraction', 'image number.jpeg'), img('wordsearch', 'wordsearch landscape.jpeg')],
    { bundle: { images: [img('addition', 'addition_worksheet portrait.jpeg'), img('subtraction', 'cross out.jpeg'), img('wordsearch', 'wordsearch portrait.jpeg'), img('matching', 'matching portrait.jpeg'), img('coloring', 'coloring portrait 1.png')], pageCount: 100 } },
    img('subtraction', 'cross out.jpeg'),
    'emerald',
  ),
  'printable-mockup-photos-sell-more': platformStrategy(
    ['coloring', 'addition', 'wordsearch'],
    [img('coloring', 'coloring portrait 1.png'), img('addition', 'addition_worksheet portrait.jpeg'), img('wordsearch', 'wordsearch portrait.jpeg')],
    { platformMockup: { platform: 'etsy', image: img('coloring', 'coloring portrait 4.png') } },
    img('addition', 'image and number.jpeg'),
    'rose',
  ),
  'gumroad-vs-etsy-digital-products': platformStrategy(
    ['math puzzle', 'crossword', 'word scramble'],
    [img('math puzzle', 'worksheet.jpeg'), img('crossword', 'crossword_worksheet.jpeg'), img('word scramble', 'word scramble portrait.jpeg')],
    { platformMockup: { platform: 'etsy', image: img('word scramble', 'word scramble landscape.jpeg') } },
    img('crossword', 'crossword_worksheet (1).jpeg'),
    'sky',
  ),
  'print-on-demand-vs-digital-download': platformStrategy(
    ['addition', 'coloring', 'wordsearch'],
    mixHero1,
    { beforeAfter: { lcsImage: img('coloring', 'coloring portrait 2.png') } },
    img('addition', 'find addend.jpeg'),
    'orange',
  ),
  'customer-service-digital-products': platformStrategy(
    ['wordsearch', 'matching', 'bingo'],
    [img('wordsearch', 'wordsearch portrait.jpeg'), img('matching', 'image and word.jpeg'), img('bingo', 'image and image.jpeg')],
    { platformMockup: { platform: 'etsy', image: img('matching', 'matching portrait.jpeg') } },
    img('bingo', 'image and word.jpeg'),
    'teal',
  ),
  'social-media-printable-sellers': platformStrategy(
    ['coloring', 'draw and color', 'addition'],
    [img('coloring', 'coloring portrait 1.png'), img('draw and color', 'grid-drawing_worksheet.jpeg'), img('addition', 'addition_worksheet portrait.jpeg')],
    { platformMockup: { platform: 'etsy', image: img('coloring', 'coloring portrait 3.png') } },
    img('draw and color', 'grid-drawing_worksheet (3).jpeg'),
    'pink',
  ),
  'copyright-printable-sellers-basics': platformStrategy(
    ['addition', 'wordsearch', 'coloring'],
    mixHero1,
    { beforeAfter: { lcsImage: img('wordsearch', 'wordsearch portrait.jpeg') } },
    img('addition', 'addition_worksheet portrait.jpeg'),
    'indigo',
  ),
};

// ═══════════════════════════════════════════════════════════════
// CATEGORY 3: Niche & Seasonal Content (30 posts)
// ═══════════════════════════════════════════════════════════════

const cat3: Record<string, BlogVisualConfig> = {
  'best-printables-sell-christmas': nicheSeasonal(
    ['coloring', 'wordsearch', 'addition', 'crossword'],
    [img('coloring', 'coloring portrait 1.png'), img('wordsearch', 'wordsearch portrait.jpeg'), img('addition', 'addition_worksheet portrait.jpeg')],
    [img('coloring', 'coloring portrait 1.png'), img('coloring', 'coloring portrait 2.png'), img('wordsearch', 'wordsearch portrait.jpeg'), img('wordsearch', 'wordsearch landscape.jpeg'), img('addition', 'addition_worksheet portrait.jpeg'), img('crossword', 'crossword_worksheet.jpeg'), img('matching', 'matching portrait.jpeg'), img('bingo', 'image and image.jpeg')],
    [{ image: img('coloring', 'coloring portrait 3.png'), name: 'Holiday Coloring Bundle', price: '$6.99' }, { image: img('wordsearch', 'custom word list.jpeg'), name: 'Christmas Word Search', price: '$4.99' }, { image: img('addition', 'image and number.jpeg'), name: 'Winter Math Pack', price: '$5.99' }],
    img('coloring', 'coloring portrait 4.png'),
    'red',
  ),
  'halloween-printables-sell-october': nicheSeasonal(
    ['coloring', 'wordsearch', 'crossword'],
    [img('coloring', 'coloring portrait 5.png'), img('wordsearch', 'wordsearch portrait.jpeg'), img('crossword', 'crossword_worksheet.jpeg')],
    [img('coloring', 'coloring portrait 5.png'), img('coloring', 'coloring portrait 6.png'), img('wordsearch', 'wordsearch portrait.jpeg'), img('crossword', 'crossword_worksheet.jpeg'), img('crossword', 'crossword_worksheet (1).jpeg'), img('word scramble', 'word scramble portrait.jpeg'), img('matching', 'image and word.jpeg'), img('cryptogram', 'cryptogram_worksheet.jpeg')],
    [{ image: img('coloring', 'coloring landscape 2.png'), name: 'Halloween Coloring Set', price: '$5.99' }, { image: img('wordsearch', 'wordsearch landscape.jpeg'), name: 'Spooky Word Search', price: '$4.99' }, { image: img('crossword', 'crossword_worksheet (1).jpeg'), name: 'Halloween Puzzle Pack', price: '$7.99' }],
    img('coloring', 'coloring portrait 5.png'),
    'orange',
  ),
  'back-to-school-printable-rush': nicheSeasonal(
    ['addition', 'subtraction', 'writing', 'alphabet train'],
    [img('addition', 'addition_worksheet portrait.jpeg'), img('writing', 'writing.jpeg'), img('alphabet train', 'alphabet train portrait.jpeg')],
    [img('addition', 'addition_worksheet portrait.jpeg'), img('subtraction', 'cross out.jpeg'), img('writing', 'writing.jpeg'), img('writing', 'writing beginning letter.jpeg'), img('alphabet train', 'alphabet train portrait.jpeg'), img('alphabet train', 'alphabet train landscape.jpeg'), img('math worksheet', 'math worksheet portrait.jpeg'), img('pattern worksheet', 'pattern_worksheet portrait.jpeg')],
    [{ image: img('addition', 'image and number.jpeg'), name: 'Back to School Math', price: '$6.99' }, { image: img('writing', 'writing custom.jpeg'), name: 'Writing Practice Pack', price: '$5.99' }, { image: img('alphabet train', 'alphabet train landscape.jpeg'), name: 'ABC Starter Bundle', price: '$7.99' }],
    img('addition', 'find addend.jpeg'),
    'blue',
  ),
  'valentines-day-printables-sell': nicheSeasonal(
    ['coloring', 'matching', 'wordsearch'],
    [img('coloring', 'coloring portrait 1.png'), img('matching', 'image and word.jpeg'), img('wordsearch', 'wordsearch portrait.jpeg')],
    [img('coloring', 'coloring portrait 1.png'), img('coloring', 'coloring portrait 2.png'), img('matching', 'matching portrait.jpeg'), img('matching', 'image and word.jpeg'), img('wordsearch', 'wordsearch portrait.jpeg'), img('wordsearch', 'custom word list.jpeg'), img('bingo', 'image and image.jpeg'), img('draw and color', 'grid-drawing_worksheet.jpeg')],
    [{ image: img('coloring', 'coloring portrait 3.png'), name: 'Valentine Coloring Pages', price: '$4.99' }, { image: img('matching', 'image and custom word.jpeg'), name: 'Love Matching Game', price: '$3.99' }, { image: img('wordsearch', 'wordsearch landscape.jpeg'), name: 'Valentine Word Search', price: '$4.99' }],
    img('matching', 'matching portrait.jpeg'),
    'pink',
  ),
  'easter-printables-business-spring': nicheSeasonal(
    ['coloring', 'find and count', 'matching'],
    [img('coloring', 'coloring portrait 2.png'), img('find and count', 'find and count portrait.jpeg'), img('matching', 'matching portrait.jpeg')],
    [img('coloring', 'coloring portrait 2.png'), img('coloring', 'coloring portrait 4.png'), img('find and count', 'find and count portrait.jpeg'), img('find and count', 'find and count landscape.jpeg'), img('matching', 'matching portrait.jpeg'), img('matching', 'image and word.jpeg'), img('pattern worksheet', 'pattern_worksheet portrait.jpeg'), img('bingo', 'image and image.jpeg')],
    [{ image: img('coloring', 'coloring landscape 3.png'), name: 'Easter Coloring Pack', price: '$5.99' }, { image: img('find and count', 'find and count landscape.jpeg'), name: 'Easter Egg Hunt', price: '$4.99' }, { image: img('matching', 'image and custom word.jpeg'), name: 'Spring Matching Set', price: '$4.99' }],
    img('find and count', 'find and count portrait.jpeg'),
    'green',
  ),
  'summer-activity-printables-sell': nicheSeasonal(
    ['coloring', 'wordsearch', 'addition', 'draw and color'],
    [img('coloring', 'coloring landscape 1.png'), img('wordsearch', 'wordsearch landscape.jpeg'), img('draw and color', 'grid-drawing_worksheet (1).jpeg')],
    [img('coloring', 'coloring landscape 1.png'), img('coloring', 'coloring landscape 2.png'), img('wordsearch', 'wordsearch landscape.jpeg'), img('draw and color', 'grid-drawing_worksheet (1).jpeg'), img('draw and color', 'grid-drawing_worksheet (2).jpeg'), img('addition', 'addition_worksheet portrait.jpeg'), img('picture path', 'classic maze.jpeg'), img('treasure hunt', 'north south.jpeg')],
    [{ image: img('coloring', 'coloring portrait 1.png'), name: 'Summer Coloring Book', price: '$6.99' }, { image: img('wordsearch', 'wordsearch portrait.jpeg'), name: 'Summer Word Search', price: '$4.99' }, { image: img('draw and color', 'grid-drawing_worksheet.jpeg'), name: 'Drawing Activities', price: '$5.99' }],
    img('coloring', 'coloring portrait 3.png'),
    'yellow',
  ),
  'preschool-printables-best-sellers': nicheSeasonal(
    ['matching', 'big small', 'coloring', 'drawing lines'],
    [img('matching', 'matching portrait.jpeg'), img('big small', 'big-small identical images.jpeg'), img('coloring', 'coloring portrait 1.png')],
    [img('matching', 'matching portrait.jpeg'), img('big small', 'big-small identical images.jpeg'), img('big small', 'big-small-different images.jpeg'), img('coloring', 'coloring portrait 1.png'), img('coloring', 'coloring portrait 2.png'), img('drawing lines', 'drawing_lines_horizontal.jpeg'), img('drawing lines', 'drawing_lines_curve 1.jpeg'), img('pattern train', 'pattern_train portrait.jpeg')],
    [{ image: img('matching', 'image and word.jpeg'), name: 'Preschool Matching', price: '$4.99' }, { image: img('big small', 'big-small number 1-2-3.jpeg'), name: 'Size Comparison Set', price: '$3.99' }, { image: img('drawing lines', 'drawing_lines_diagonal 1.jpeg'), name: 'Tracing Bundle', price: '$5.99' }],
    img('matching', 'image and custom word.jpeg'),
    'emerald',
  ),
  'kindergarten-worksheets-market': nicheSeasonal(
    ['addition', 'alphabet train', 'pattern worksheet', 'matching'],
    [img('addition', 'image and number.jpeg'), img('alphabet train', 'alphabet train portrait.jpeg'), img('pattern worksheet', 'pattern_worksheet portrait.jpeg')],
    [img('addition', 'image and number.jpeg'), img('addition', 'addition_worksheet portrait.jpeg'), img('alphabet train', 'alphabet train portrait.jpeg'), img('alphabet train', 'alphabet train landscape.jpeg'), img('pattern worksheet', 'pattern_worksheet portrait.jpeg'), img('pattern worksheet', 'pattern_worksheet landscape.jpeg'), img('matching', 'matching portrait.jpeg'), img('more less', 'illustration.jpeg')],
    [{ image: img('addition', 'find addend.jpeg'), name: 'K Math Starter', price: '$5.99' }, { image: img('alphabet train', 'alphabet train landscape.jpeg'), name: 'ABC Train Set', price: '$4.99' }, { image: img('pattern worksheet', 'pattern_worksheet landscape.jpeg'), name: 'Pattern Practice', price: '$4.99' }],
    img('alphabet train', 'alphabet train portrait.jpeg'),
    'amber',
  ),
  'homeschool-printables-growing-market': nicheSeasonal(
    ['addition', 'subtraction', 'wordsearch', 'writing'],
    [img('addition', 'addition_worksheet portrait.jpeg'), img('subtraction', 'cross out.jpeg'), img('wordsearch', 'wordsearch portrait.jpeg')],
    [img('addition', 'addition_worksheet portrait.jpeg'), img('subtraction', 'cross out.jpeg'), img('wordsearch', 'wordsearch portrait.jpeg'), img('writing', 'writing.jpeg'), img('math worksheet', 'math worksheet portrait.jpeg'), img('alphabet train', 'alphabet train portrait.jpeg'), img('crossword', 'crossword_worksheet.jpeg'), img('sudoku', 'sudoku_easy.jpeg')],
    [{ image: img('addition', 'image and number.jpeg'), name: 'Homeschool Math Set', price: '$8.99' }, { image: img('wordsearch', 'wordsearch landscape.jpeg'), name: 'Word Activities Pack', price: '$6.99' }, { image: img('writing', 'writing beginning letter.jpeg'), name: 'Writing Practice', price: '$5.99' }],
    img('subtraction', 'image number.jpeg'),
    'indigo',
  ),
  'esl-worksheets-global-market': nicheSeasonal(
    ['prepositions', 'word guess', 'matching', 'alphabet train'],
    [img('prepositions', 'prepositions_worksheet.jpeg'), img('word guess', 'clue-grid_worksheet.jpeg'), img('matching', 'image and word.jpeg')],
    [img('prepositions', 'prepositions_worksheet.jpeg'), img('prepositions', 'prepositions multiple choice.jpeg'), img('word guess', 'clue-grid_worksheet.jpeg'), img('word guess', 'landscape.jpeg'), img('matching', 'image and word.jpeg'), img('matching', 'image and custom word.jpeg'), img('alphabet train', 'alphabet train portrait.jpeg'), img('bingo', 'image and word.jpeg')],
    [{ image: img('prepositions', 'prepositions multiple choice.jpeg'), name: 'ESL Prepositions', price: '$4.99' }, { image: img('word guess', 'custom word list.jpeg'), name: 'Vocabulary Builder', price: '$5.99' }, { image: img('matching', 'matching portrait.jpeg'), name: 'Image-Word Match', price: '$4.99' }],
    img('prepositions', 'prepositions_worksheet.jpeg'),
    'cyan',
  ),
  'special-education-printables-sell': nicheSeasonal(
    ['matching', 'big small', 'shadow match', 'drawing lines'],
    [img('matching', 'matching portrait.jpeg'), img('big small', 'big-small identical images.jpeg'), img('shadow match', 'shadow-match-worksheet.jpeg')],
    [img('matching', 'matching portrait.jpeg'), img('big small', 'big-small identical images.jpeg'), img('shadow match', 'shadow-match-worksheet.jpeg'), img('shadow match', 'shadow-match-horizontal.jpeg'), img('drawing lines', 'drawing_lines_horizontal.jpeg'), img('drawing lines', 'drawing_lines_curve 1.jpeg'), img('odd one out', 'identical.jpeg'), img('more less', 'illustration.jpeg')],
    [{ image: img('shadow match', 'shadow-match-vertical.jpeg'), name: 'Shadow Match Set', price: '$3.99' }, { image: img('drawing lines', 'drawing_lines_vertical.jpeg'), name: 'Tracing Skills Pack', price: '$4.99' }, { image: img('big small', 'big-small-different images.jpeg'), name: 'Visual Comparison', price: '$3.99' }],
    img('matching', 'image and word.jpeg'),
    'violet',
  ),
  'printable-games-birthday-parties': nicheSeasonal(
    ['bingo', 'wordsearch', 'crossword', 'treasure hunt'],
    [img('bingo', 'image and image.jpeg'), img('wordsearch', 'wordsearch portrait.jpeg'), img('treasure hunt', 'north south.jpeg')],
    [img('bingo', 'image and image.jpeg'), img('bingo', 'image and word.jpeg'), img('wordsearch', 'wordsearch portrait.jpeg'), img('wordsearch', 'custom word list.jpeg'), img('crossword', 'crossword_worksheet.jpeg'), img('treasure hunt', 'north south.jpeg'), img('treasure hunt', 'up down.jpeg'), img('word scramble', 'word scramble portrait.jpeg')],
    [{ image: img('bingo', 'image and word.jpeg'), name: 'Party Bingo Pack', price: '$4.99' }, { image: img('treasure hunt', 'up down.jpeg'), name: 'Treasure Hunt Game', price: '$5.99' }, { image: img('wordsearch', 'wordsearch landscape.jpeg'), name: 'Party Word Search', price: '$3.99' }],
    img('bingo', 'image and image.jpeg'),
    'purple',
  ),
  'educational-printables-new-parents': nicheSeasonal(
    ['matching', 'coloring', 'drawing lines', 'big small'],
    [img('coloring', 'coloring portrait 1.png'), img('matching', 'matching portrait.jpeg'), img('drawing lines', 'drawing_lines_horizontal.jpeg')],
    [img('coloring', 'coloring portrait 1.png'), img('coloring', 'coloring portrait 2.png'), img('matching', 'matching portrait.jpeg'), img('drawing lines', 'drawing_lines_horizontal.jpeg'), img('drawing lines', 'drawing_lines_curve 1.jpeg'), img('big small', 'big-small identical images.jpeg'), img('pattern train', 'pattern_train portrait.jpeg'), img('shadow match', 'shadow-match-worksheet.jpeg')],
    [{ image: img('coloring', 'coloring portrait 3.png'), name: 'First Coloring Book', price: '$4.99' }, { image: img('matching', 'image and word.jpeg'), name: 'Baby Match Game', price: '$3.99' }, { image: img('drawing lines', 'drawing_lines_vertical.jpeg'), name: 'First Tracing Set', price: '$3.99' }],
    img('coloring', 'coloring portrait 4.png'),
    'rose',
  ),
  'toddler-activity-printables-sell': nicheSeasonal(
    ['coloring', 'matching', 'big small', 'drawing lines'],
    [img('coloring', 'coloring portrait 4.png'), img('matching', 'matching portrait.jpeg'), img('big small', 'big-small identical images.jpeg')],
    [img('coloring', 'coloring portrait 4.png'), img('coloring', 'coloring portrait 5.png'), img('matching', 'matching portrait.jpeg'), img('big small', 'big-small identical images.jpeg'), img('big small', 'big-small-different images.jpeg'), img('drawing lines', 'drawing_lines_horizontal.jpeg'), img('shadow match', 'shadow-match-worksheet.jpeg'), img('pattern train', 'pattern_train portrait.jpeg')],
    [{ image: img('coloring', 'coloring portrait 6.png'), name: 'Toddler Coloring', price: '$3.99' }, { image: img('big small', 'big-small number 1-2-3.jpeg'), name: 'Size Learning Set', price: '$3.99' }, { image: img('drawing lines', 'drawing_lines_curve 2.jpeg'), name: 'Pre-Writing Pack', price: '$4.99' }],
    img('matching', 'image and custom word.jpeg'),
    'green',
  ),
  'math-fact-fluency-printables-sell': nicheSeasonal(
    ['addition', 'subtraction', 'code addition', 'math worksheet'],
    [img('addition', 'addition_worksheet portrait.jpeg'), img('subtraction', 'cross out.jpeg'), img('code addition', 'code addition portrait.jpeg')],
    [img('addition', 'addition_worksheet portrait.jpeg'), img('addition', 'image and number.jpeg'), img('subtraction', 'cross out.jpeg'), img('subtraction', 'image number.jpeg'), img('code addition', 'code addition portrait.jpeg'), img('code addition', 'code addition landscape.jpeg'), img('math worksheet', 'math worksheet portrait.jpeg'), img('math puzzle', 'worksheet.jpeg')],
    [{ image: img('addition', 'find addend.jpeg'), name: 'Addition Fluency', price: '$5.99' }, { image: img('subtraction', 'find subtrahend.jpeg'), name: 'Subtraction Fluency', price: '$5.99' }, { image: img('math worksheet', 'math worksheet landscape.jpeg'), name: 'Math Drills Bundle', price: '$9.99' }],
    img('code addition', 'code addition landscape.jpeg'),
    'orange',
  ),
  'sight-words-worksheets-business': nicheSeasonal(
    ['wordsearch', 'word scramble', 'word guess', 'matching'],
    [img('wordsearch', 'custom word list.jpeg'), img('word scramble', 'custom word list.jpeg'), img('word guess', 'custom word list.jpeg')],
    [img('wordsearch', 'custom word list.jpeg'), img('wordsearch', 'wordsearch portrait.jpeg'), img('word scramble', 'custom word list.jpeg'), img('word scramble', 'word scramble portrait.jpeg'), img('word guess', 'custom word list.jpeg'), img('word guess', 'clue-grid_worksheet.jpeg'), img('matching', 'image and word.jpeg'), img('crossword', 'crossword_worksheet.jpeg')],
    [{ image: img('wordsearch', 'wordsearch landscape.jpeg'), name: 'Sight Word Search', price: '$4.99' }, { image: img('word scramble', 'word scramble landscape.jpeg'), name: 'Word Scramble Set', price: '$4.99' }, { image: img('matching', 'image and custom word.jpeg'), name: 'Word Match Game', price: '$4.99' }],
    img('wordsearch', 'wordsearch portrait.jpeg'),
    'sky',
  ),
  'fine-motor-activities-printables': nicheSeasonal(
    ['drawing lines', 'draw and color', 'coloring', 'pattern train'],
    [img('drawing lines', 'drawing_lines_curve 1.jpeg'), img('draw and color', 'grid-drawing_worksheet.jpeg'), img('coloring', 'coloring portrait 1.png')],
    [img('drawing lines', 'drawing_lines_curve 1.jpeg'), img('drawing lines', 'drawing_lines_horizontal.jpeg'), img('draw and color', 'grid-drawing_worksheet.jpeg'), img('draw and color', 'grid-drawing_worksheet (1).jpeg'), img('coloring', 'coloring portrait 1.png'), img('coloring', 'coloring portrait 2.png'), img('pattern train', 'pattern_train portrait.jpeg'), img('picture path', 'picture path.jpeg')],
    [{ image: img('drawing lines', 'drawing_lines_diagonal 1.jpeg'), name: 'Tracing Practice', price: '$4.99' }, { image: img('draw and color', 'grid-drawing_worksheet (2).jpeg'), name: 'Grid Drawing Set', price: '$5.99' }, { image: img('coloring', 'coloring portrait 3.png'), name: 'Motor Skills Pack', price: '$6.99' }],
    img('drawing lines', 'drawing_lines_curve 2.jpeg'),
    'teal',
  ),
  'brain-break-printables-teachers': nicheSeasonal(
    ['wordsearch', 'crossword', 'sudoku', 'cryptogram'],
    [img('wordsearch', 'wordsearch portrait.jpeg'), img('crossword', 'crossword_worksheet.jpeg'), img('sudoku', 'sudoku medium.jpeg')],
    [img('wordsearch', 'wordsearch portrait.jpeg'), img('crossword', 'crossword_worksheet.jpeg'), img('sudoku', 'sudoku medium.jpeg'), img('sudoku', 'sudoku_easy.jpeg'), img('cryptogram', 'cryptogram_worksheet.jpeg'), img('word scramble', 'word scramble portrait.jpeg'), img('odd one out', 'similar.jpeg'), img('picture path', 'classic maze.jpeg')],
    [{ image: img('sudoku', 'sudoku hard.jpeg'), name: 'Brain Break Puzzles', price: '$5.99' }, { image: img('cryptogram', 'cryptogram_worksheet (1).jpeg'), name: 'Code Crackers', price: '$4.99' }, { image: img('wordsearch', 'wordsearch landscape.jpeg'), name: 'Quick Search Set', price: '$3.99' }],
    img('crossword', 'crossword_worksheet (1).jpeg'),
    'indigo',
  ),
  'travel-activity-printables-sell': nicheSeasonal(
    ['wordsearch', 'crossword', 'sudoku', 'coloring'],
    [img('wordsearch', 'wordsearch portrait.jpeg'), img('coloring', 'coloring portrait 1.png'), img('sudoku', 'sudoku_easy.jpeg')],
    [img('wordsearch', 'wordsearch portrait.jpeg'), img('coloring', 'coloring portrait 1.png'), img('sudoku', 'sudoku_easy.jpeg'), img('crossword', 'crossword_worksheet.jpeg'), img('cryptogram', 'cryptogram_worksheet.jpeg'), img('word scramble', 'word scramble portrait.jpeg'), img('picture path', 'classic maze.jpeg'), img('draw and color', 'grid-drawing_worksheet.jpeg')],
    [{ image: img('wordsearch', 'wordsearch landscape.jpeg'), name: 'Travel Word Search', price: '$4.99' }, { image: img('coloring', 'coloring landscape 1.png'), name: 'Travel Coloring', price: '$4.99' }, { image: img('sudoku', 'sudoku medium.jpeg'), name: 'Travel Puzzles', price: '$5.99' }],
    img('coloring', 'coloring portrait 2.png'),
    'amber',
  ),
  'animal-themed-printables-sell': nicheSeasonal(
    ['coloring', 'matching', 'find and count', 'wordsearch'],
    [img('coloring', 'coloring portrait 1.png'), img('matching', 'matching portrait.jpeg'), img('find and count', 'find and count portrait.jpeg')],
    [img('coloring', 'coloring portrait 1.png'), img('coloring', 'coloring portrait 2.png'), img('matching', 'matching portrait.jpeg'), img('matching', 'image and word.jpeg'), img('find and count', 'find and count portrait.jpeg'), img('find and count', 'find and count landscape.jpeg'), img('wordsearch', 'wordsearch portrait.jpeg'), img('bingo', 'image and image.jpeg')],
    [{ image: img('coloring', 'coloring portrait 3.png'), name: 'Animal Coloring Book', price: '$5.99' }, { image: img('matching', 'image and custom word.jpeg'), name: 'Animal Match Game', price: '$4.99' }, { image: img('find and count', 'find and count landscape.jpeg'), name: 'Animal I Spy Set', price: '$4.99' }],
    img('matching', 'matching portrait.jpeg'),
    'green',
  ),
  'space-themed-worksheets-business': nicheSeasonal(
    ['coloring', 'wordsearch', 'math puzzle', 'crossword'],
    [img('coloring', 'coloring portrait 5.png'), img('wordsearch', 'wordsearch portrait.jpeg'), img('math puzzle', 'worksheet.jpeg')],
    [img('coloring', 'coloring portrait 5.png'), img('coloring', 'coloring portrait 6.png'), img('wordsearch', 'wordsearch portrait.jpeg'), img('math puzzle', 'worksheet.jpeg'), img('crossword', 'crossword_worksheet.jpeg'), img('word scramble', 'word scramble portrait.jpeg'), img('cryptogram', 'cryptogram_worksheet.jpeg'), img('picture path', 'picture path.jpeg')],
    [{ image: img('coloring', 'coloring landscape 3.png'), name: 'Space Coloring Pages', price: '$5.99' }, { image: img('math puzzle', 'worksheet (1).jpeg'), name: 'Space Math Puzzles', price: '$6.99' }, { image: img('wordsearch', 'wordsearch landscape.jpeg'), name: 'Space Word Search', price: '$4.99' }],
    img('crossword', 'crossword_worksheet.jpeg'),
    'violet',
  ),
  'printables-sell-mothers-day-fathers-day': nicheSeasonal(
    ['coloring', 'draw and color', 'wordsearch'],
    [img('coloring', 'coloring portrait 1.png'), img('draw and color', 'grid-drawing_worksheet.jpeg'), img('wordsearch', 'custom word list.jpeg')],
    [img('coloring', 'coloring portrait 1.png'), img('coloring', 'coloring portrait 2.png'), img('draw and color', 'grid-drawing_worksheet.jpeg'), img('draw and color', 'grid-drawing_worksheet (1).jpeg'), img('wordsearch', 'custom word list.jpeg'), img('wordsearch', 'wordsearch portrait.jpeg'), img('word scramble', 'custom word list.jpeg'), img('crossword', 'crossword_worksheet.jpeg')],
    [{ image: img('coloring', 'coloring portrait 3.png'), name: 'Mom/Dad Card Set', price: '$4.99' }, { image: img('draw and color', 'grid-drawing_worksheet (2).jpeg'), name: 'Gift Drawing Pack', price: '$3.99' }, { image: img('wordsearch', 'wordsearch landscape.jpeg'), name: 'Family Word Search', price: '$3.99' }],
    img('coloring', 'coloring portrait 4.png'),
    'pink',
  ),
  'thanksgiving-printables-sell-november': nicheSeasonal(
    ['coloring', 'wordsearch', 'matching', 'addition'],
    [img('coloring', 'coloring portrait 4.png'), img('wordsearch', 'wordsearch portrait.jpeg'), img('matching', 'matching portrait.jpeg')],
    [img('coloring', 'coloring portrait 4.png'), img('coloring', 'coloring portrait 5.png'), img('wordsearch', 'wordsearch portrait.jpeg'), img('matching', 'matching portrait.jpeg'), img('addition', 'addition_worksheet portrait.jpeg'), img('crossword', 'crossword_worksheet.jpeg'), img('bingo', 'image and image.jpeg'), img('word scramble', 'word scramble portrait.jpeg')],
    [{ image: img('coloring', 'coloring landscape 2.png'), name: 'Thanksgiving Coloring', price: '$5.99' }, { image: img('wordsearch', 'wordsearch landscape.jpeg'), name: 'Fall Word Search', price: '$3.99' }, { image: img('bingo', 'image and word.jpeg'), name: 'Turkey Bingo Set', price: '$4.99' }],
    img('matching', 'image and word.jpeg'),
    'amber',
  ),
  'new-year-printables-january': nicheSeasonal(
    ['coloring', 'wordsearch', 'crossword', 'addition'],
    [img('coloring', 'coloring portrait 2.png'), img('wordsearch', 'wordsearch portrait.jpeg'), img('crossword', 'crossword_worksheet.jpeg')],
    [img('coloring', 'coloring portrait 2.png'), img('wordsearch', 'wordsearch portrait.jpeg'), img('crossword', 'crossword_worksheet.jpeg'), img('addition', 'addition_worksheet portrait.jpeg'), img('word scramble', 'word scramble portrait.jpeg'), img('sudoku', 'sudoku_easy.jpeg'), img('cryptogram', 'cryptogram_worksheet.jpeg'), img('math puzzle', 'worksheet.jpeg')],
    [{ image: img('wordsearch', 'wordsearch landscape.jpeg'), name: 'New Year Word Search', price: '$3.99' }, { image: img('coloring', 'coloring portrait 6.png'), name: 'New Year Coloring', price: '$4.99' }, { image: img('crossword', 'crossword_worksheet (1).jpeg'), name: 'Resolution Puzzles', price: '$4.99' }],
    img('coloring', 'coloring portrait 1.png'),
    'blue',
  ),
  'spring-printables-sell-march-april': nicheSeasonal(
    ['coloring', 'find and count', 'matching', 'wordsearch'],
    [img('coloring', 'coloring portrait 3.png'), img('find and count', 'find and count portrait.jpeg'), img('wordsearch', 'wordsearch portrait.jpeg')],
    [img('coloring', 'coloring portrait 3.png'), img('coloring', 'coloring portrait 4.png'), img('find and count', 'find and count portrait.jpeg'), img('find and count', 'find and count landscape.jpeg'), img('matching', 'matching portrait.jpeg'), img('wordsearch', 'wordsearch portrait.jpeg'), img('draw and color', 'grid-drawing_worksheet.jpeg'), img('pattern worksheet', 'pattern_worksheet portrait.jpeg')],
    [{ image: img('coloring', 'coloring landscape 3.png'), name: 'Spring Coloring Pages', price: '$4.99' }, { image: img('find and count', 'find and count landscape.jpeg'), name: 'Spring I Spy Set', price: '$4.99' }, { image: img('matching', 'image and word.jpeg'), name: 'Spring Matching Game', price: '$3.99' }],
    img('coloring', 'coloring portrait 5.png'),
    'green',
  ),
  'winter-printables-sell-december-january': nicheSeasonal(
    ['coloring', 'wordsearch', 'crossword', 'sudoku'],
    [img('coloring', 'coloring portrait 6.png'), img('wordsearch', 'wordsearch portrait.jpeg'), img('sudoku', 'sudoku medium.jpeg')],
    [img('coloring', 'coloring portrait 6.png'), img('coloring', 'coloring portrait 1.png'), img('wordsearch', 'wordsearch portrait.jpeg'), img('wordsearch', 'wordsearch landscape.jpeg'), img('crossword', 'crossword_worksheet.jpeg'), img('sudoku', 'sudoku medium.jpeg'), img('cryptogram', 'cryptogram_worksheet.jpeg'), img('math puzzle', 'worksheet.jpeg')],
    [{ image: img('coloring', 'coloring landscape 1.png'), name: 'Winter Coloring Book', price: '$5.99' }, { image: img('wordsearch', 'custom word list.jpeg'), name: 'Winter Word Search', price: '$4.99' }, { image: img('sudoku', 'sudoku hard.jpeg'), name: 'Winter Puzzle Pack', price: '$6.99' }],
    img('crossword', 'crossword_worksheet (1).jpeg'),
    'sky',
  ),
  'dinosaur-printables-sell-evergreen': nicheSeasonal(
    ['coloring', 'wordsearch', 'matching', 'find and count'],
    [img('coloring', 'coloring portrait 1.png'), img('wordsearch', 'wordsearch portrait.jpeg'), img('matching', 'matching portrait.jpeg')],
    [img('coloring', 'coloring portrait 1.png'), img('coloring', 'coloring portrait 2.png'), img('wordsearch', 'wordsearch portrait.jpeg'), img('matching', 'matching portrait.jpeg'), img('find and count', 'find and count portrait.jpeg'), img('bingo', 'image and image.jpeg'), img('crossword', 'crossword_worksheet.jpeg'), img('shadow match', 'shadow-match-worksheet.jpeg')],
    [{ image: img('coloring', 'coloring portrait 3.png'), name: 'Dino Coloring Pages', price: '$5.99' }, { image: img('wordsearch', 'wordsearch landscape.jpeg'), name: 'Dino Word Search', price: '$4.99' }, { image: img('matching', 'image and word.jpeg'), name: 'Dino Matching Game', price: '$3.99' }],
    img('coloring', 'coloring portrait 4.png'),
    'emerald',
  ),
  'farm-animal-printables-sell': nicheSeasonal(
    ['coloring', 'matching', 'find and count', 'bingo'],
    [img('coloring', 'coloring portrait 2.png'), img('matching', 'image and word.jpeg'), img('bingo', 'image and image.jpeg')],
    [img('coloring', 'coloring portrait 2.png'), img('coloring', 'coloring portrait 3.png'), img('matching', 'image and word.jpeg'), img('matching', 'matching portrait.jpeg'), img('find and count', 'find and count portrait.jpeg'), img('bingo', 'image and image.jpeg'), img('shadow match', 'shadow-match-worksheet.jpeg'), img('picture sort', 'picture sort portrait.jpeg')],
    [{ image: img('coloring', 'coloring portrait 4.png'), name: 'Farm Coloring Book', price: '$4.99' }, { image: img('matching', 'image and custom word.jpeg'), name: 'Farm Match Set', price: '$3.99' }, { image: img('bingo', 'image and word.jpeg'), name: 'Farm Bingo Game', price: '$4.99' }],
    img('find and count', 'find and count portrait.jpeg'),
    'amber',
  ),
  'ocean-themed-printables-sell': nicheSeasonal(
    ['coloring', 'wordsearch', 'matching', 'find objects'],
    [img('coloring', 'coloring portrait 5.png'), img('wordsearch', 'wordsearch portrait.jpeg'), img('find objects', 'find objects portrait.jpeg')],
    [img('coloring', 'coloring portrait 5.png'), img('coloring', 'coloring portrait 6.png'), img('wordsearch', 'wordsearch portrait.jpeg'), img('find objects', 'find objects portrait.jpeg'), img('find objects', 'find objects landscape.jpeg'), img('matching', 'matching portrait.jpeg'), img('bingo', 'image and image.jpeg'), img('crossword', 'crossword_worksheet.jpeg')],
    [{ image: img('coloring', 'coloring landscape 2.png'), name: 'Ocean Coloring Pages', price: '$5.99' }, { image: img('find objects', 'find objects landscape.jpeg'), name: 'Ocean Hidden Objects', price: '$4.99' }, { image: img('wordsearch', 'wordsearch landscape.jpeg'), name: 'Ocean Word Search', price: '$3.99' }],
    img('matching', 'image and word.jpeg'),
    'cyan',
  ),
  'food-themed-worksheets-sell': nicheSeasonal(
    ['coloring', 'matching', 'find and count', 'wordsearch'],
    [img('coloring', 'coloring portrait 3.png'), img('matching', 'matching portrait.jpeg'), img('find and count', 'find and count portrait.jpeg')],
    [img('coloring', 'coloring portrait 3.png'), img('coloring', 'coloring portrait 4.png'), img('matching', 'matching portrait.jpeg'), img('matching', 'image and word.jpeg'), img('find and count', 'find and count portrait.jpeg'), img('wordsearch', 'wordsearch portrait.jpeg'), img('bingo', 'image and image.jpeg'), img('picture sort', 'picture sort portrait.jpeg')],
    [{ image: img('coloring', 'coloring portrait 5.png'), name: 'Food Coloring Pages', price: '$4.99' }, { image: img('matching', 'image and custom word.jpeg'), name: 'Food Matching Game', price: '$3.99' }, { image: img('wordsearch', 'wordsearch landscape.jpeg'), name: 'Food Word Search', price: '$3.99' }],
    img('coloring', 'coloring portrait 6.png'),
    'orange',
  ),
};

// ═══════════════════════════════════════════════════════════════
// CATEGORY 4: How-To Tutorials (19 posts)
// ═══════════════════════════════════════════════════════════════

const cat4: Record<string, BlogVisualConfig> = {
  'create-worksheet-bundle-35-minutes': howTo(
    ['addition', 'subtraction', 'math worksheet'],
    [img('addition', 'addition_worksheet portrait.jpeg'), img('subtraction', 'cross out.jpeg'), img('math worksheet', 'math worksheet portrait.jpeg')],
    { type: 'tiers', beginner: img('addition', 'addition_worksheet portrait.jpeg'), intermediate: img('subtraction', 'image number.jpeg'), advanced: img('math worksheet', 'math worksheet landscape.jpeg') },
    img('addition', 'find addend.jpeg'),
    'emerald',
  ),
  'format-worksheets-etsy-listing': howTo(
    ['addition', 'wordsearch'],
    [img('addition', 'addition_worksheet portrait.jpeg'), img('wordsearch', 'wordsearch portrait.jpeg'), img('wordsearch', 'wordsearch landscape.jpeg')],
    { type: 'pair', worksheet: img('addition', 'addition_worksheet portrait.jpeg'), answerKey: img('addition', 'addition_answer_key portrait.jpeg') },
    img('wordsearch', 'wordsearch portrait.jpeg'),
    'blue',
  ),
  'create-activity-book-kdp-start-finish': howTo(
    ['math puzzle', 'wordsearch', 'crossword'],
    [img('math puzzle', 'worksheet.jpeg'), img('wordsearch', 'wordsearch portrait.jpeg'), img('crossword', 'crossword_worksheet.jpeg')],
    { type: 'tiers', beginner: img('wordsearch', 'wordsearch portrait.jpeg'), intermediate: img('crossword', 'crossword_worksheet.jpeg'), advanced: img('math puzzle', 'worksheet (1).jpeg') },
    img('math puzzle', 'worksheet.jpeg'),
    'purple',
  ),
  'worksheet-design-tips-sell-more': howTo(
    ['addition', 'coloring'],
    [img('addition', 'image and number.jpeg'), img('coloring', 'coloring portrait 1.png'), img('addition', 'addition_worksheet portrait.jpeg')],
    { type: 'pair', worksheet: img('addition', 'addition_worksheet portrait.jpeg'), answerKey: img('addition', 'addition_answer_key portrait.jpeg') },
    img('coloring', 'coloring portrait 2.png'),
    'orange',
  ),
  'answer-key-importance-printable-sales': howTo(
    ['addition', 'wordsearch'],
    [img('addition', 'addition_worksheet portrait.jpeg'), img('addition', 'addition_answer_key portrait.jpeg'), img('wordsearch', 'wordsearch portrait.jpeg')],
    { type: 'pair', worksheet: img('wordsearch', 'wordsearch portrait.jpeg'), answerKey: img('wordsearch', 'wordsearch portrait answer_key.jpeg') },
    img('addition', 'image and number.jpeg'),
    'amber',
  ),
  'use-themed-images-sell-worksheets': howTo(
    ['addition', 'matching', 'coloring'],
    [img('addition', 'image and number.jpeg'), img('matching', 'image and word.jpeg'), img('coloring', 'coloring portrait 1.png')],
    { type: 'tiers', beginner: img('coloring', 'coloring portrait 1.png'), intermediate: img('matching', 'matching portrait.jpeg'), advanced: img('addition', 'image and number.jpeg') },
    img('matching', 'image and custom word.jpeg'),
    'pink',
  ),
  'batch-create-worksheets-efficiently': howTo(
    ['addition', 'subtraction', 'wordsearch'],
    [img('addition', 'addition_worksheet portrait.jpeg'), img('subtraction', 'cross out.jpeg'), img('wordsearch', 'wordsearch portrait.jpeg')],
    { type: 'tiers', beginner: img('addition', 'addition_worksheet portrait.jpeg'), intermediate: img('subtraction', 'cross out.jpeg'), advanced: img('wordsearch', 'custom word list.jpeg') },
    img('subtraction', 'image number.jpeg'),
    'teal',
  ),
  'worksheet-difficulty-levels-product-tiers': howTo(
    ['sudoku', 'addition'],
    [img('sudoku', 'sudoku_easy.jpeg'), img('sudoku', 'sudoku medium.jpeg'), img('sudoku', 'sudoku hard.jpeg')],
    { type: 'tiers', beginner: img('sudoku', 'sudoku_easy.jpeg'), intermediate: img('sudoku', 'sudoku medium.jpeg'), advanced: img('sudoku', 'sudoku hard.jpeg') },
    img('addition', 'addition_worksheet portrait.jpeg'),
    'indigo',
  ),
  'printable-file-formats-pdf-jpeg-guide': howTo(
    ['addition', 'coloring'],
    [img('addition', 'addition_worksheet portrait.jpeg'), img('coloring', 'coloring portrait 1.png')],
    { type: 'pair', worksheet: img('addition', 'addition_worksheet portrait.jpeg'), answerKey: img('addition', 'addition_answer_key portrait.jpeg') },
    img('coloring', 'coloring portrait 3.png'),
    'sky',
  ),
  'create-cohesive-printable-brand': howTo(
    ['coloring', 'draw and color', 'matching'],
    [img('coloring', 'coloring portrait 1.png'), img('draw and color', 'grid-drawing_worksheet.jpeg'), img('matching', 'matching portrait.jpeg')],
    { type: 'tiers', beginner: img('coloring', 'coloring portrait 1.png'), intermediate: img('draw and color', 'grid-drawing_worksheet.jpeg'), advanced: img('matching', 'image and word.jpeg') },
    img('coloring', 'coloring portrait 4.png'),
    'rose',
  ),
  'repurpose-worksheets-multiple-products': howTo(
    ['addition', 'code addition'],
    [img('addition', 'addition_worksheet portrait.jpeg'), img('code addition', 'code addition portrait.jpeg'), img('addition', 'image and number.jpeg')],
    { type: 'tiers', beginner: img('addition', 'addition_worksheet portrait.jpeg'), intermediate: img('addition', 'image and number.jpeg'), advanced: img('code addition', 'code addition portrait.jpeg') },
    img('code addition', 'code addition landscape.jpeg'),
    'violet',
  ),
  'worksheet-generator-vs-canva-comparison': howTo(
    ['addition', 'wordsearch', 'coloring'],
    [img('addition', 'addition_worksheet portrait.jpeg'), img('wordsearch', 'wordsearch portrait.jpeg'), img('coloring', 'coloring portrait 1.png')],
    { type: 'pair', worksheet: img('addition', 'image and number.jpeg'), answerKey: img('addition', 'image and number answer_key.jpeg') },
    img('wordsearch', 'wordsearch landscape.jpeg'),
    'emerald',
  ),
  'free-printable-samples-lead-magnet': howTo(
    ['addition', 'matching'],
    [img('addition', 'addition_worksheet portrait.jpeg'), img('matching', 'matching portrait.jpeg')],
    { type: 'pair', worksheet: img('matching', 'matching portrait.jpeg'), answerKey: img('matching', 'matching portrait answer_key.jpeg') },
    img('addition', 'image and number.jpeg'),
    'green',
  ),
  'best-paper-sizes-printable-products': howTo(
    ['addition', 'wordsearch'],
    [img('addition', 'addition_worksheet portrait.jpeg'), img('addition', 'addition_worksheet landscape.jpeg'), img('wordsearch', 'wordsearch landscape.jpeg')],
    { type: 'tiers', beginner: img('addition', 'addition_worksheet portrait.jpeg'), intermediate: img('addition', 'addition_worksheet landscape.jpeg'), advanced: img('wordsearch', 'wordsearch landscape.jpeg') },
    img('wordsearch', 'wordsearch portrait.jpeg'),
    'cyan',
  ),
  'create-printable-curriculum-packs': howTo(
    ['addition', 'subtraction', 'math worksheet', 'writing'],
    [img('addition', 'addition_worksheet portrait.jpeg'), img('subtraction', 'cross out.jpeg'), img('writing', 'writing.jpeg')],
    { type: 'tiers', beginner: img('writing', 'writing.jpeg'), intermediate: img('addition', 'addition_worksheet portrait.jpeg'), advanced: img('math worksheet', 'math worksheet portrait.jpeg') },
    img('subtraction', 'cross out.jpeg'),
    'blue',
  ),
  '11-languages-sell-globally': howTo(
    ['addition', 'alphabet train', 'wordsearch'],
    [img('addition', 'addition_worksheet portrait.jpeg'), img('alphabet train', 'alphabet train portrait.jpeg'), img('wordsearch', 'wordsearch portrait.jpeg')],
    { type: 'tiers', beginner: img('addition', 'addition_worksheet portrait.jpeg'), intermediate: img('alphabet train', 'alphabet train portrait.jpeg'), advanced: img('wordsearch', 'wordsearch portrait.jpeg') },
    img('alphabet train', 'alphabet train landscape.jpeg'),
    'amber',
  ),
  'etsy-keyword-research-printables': howTo(
    ['wordsearch', 'addition'],
    [img('wordsearch', 'wordsearch portrait.jpeg'), img('addition', 'addition_worksheet portrait.jpeg')],
    { type: 'pair', worksheet: img('wordsearch', 'wordsearch portrait.jpeg'), answerKey: img('wordsearch', 'wordsearch portrait answer_key.jpeg') },
    img('addition', 'image and number.jpeg'),
    'orange',
  ),
  'printable-product-photography-mockups': howTo(
    ['coloring', 'addition', 'wordsearch'],
    [img('coloring', 'coloring portrait 1.png'), img('addition', 'addition_worksheet portrait.jpeg'), img('wordsearch', 'wordsearch portrait.jpeg')],
    { type: 'pair', worksheet: img('coloring', 'coloring portrait 1.png'), answerKey: img('coloring', 'coloring portrait 2.png') },
    img('addition', 'addition_worksheet portrait.jpeg'),
    'pink',
  ),
  'update-old-printable-listings-boost-sales': howTo(
    ['addition', 'wordsearch'],
    [img('addition', 'addition_worksheet portrait.jpeg'), img('wordsearch', 'wordsearch portrait.jpeg'), img('addition', 'image and number.jpeg')],
    { type: 'pair', worksheet: img('addition', 'addition_worksheet portrait.jpeg'), answerKey: img('addition', 'addition_answer_key portrait.jpeg') },
    img('wordsearch', 'wordsearch landscape.jpeg'),
    'teal',
  ),
};

// ═══════════════════════════════════════════════════════════════
// MERGED MAP — all 112 blog posts
// ═══════════════════════════════════════════════════════════════

export const blogVisualMap: Record<string, BlogVisualConfig> = {
  ...cat1,
  ...cat2,
  ...cat3,
  ...cat4,
};

/** Look up the visual config for a blog post. Returns undefined if not mapped. */
export function getBlogVisualConfig(blogId: string): BlogVisualConfig | undefined {
  return blogVisualMap[blogId];
}
