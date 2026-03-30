/**
 * blog-visual-map.ts — Maps all 112 blog posts to their visual section configs.
 *
 * Uses { appKey, idx } references that resolve to locale-correct filenames
 * at render time via image-resolver.ts. idx refers to the position in the
 * imgs[] array from appData (English) or {language}-showcase-images configs.
 */

import type { BlogVisualConfig, ImageRef, AnswerKeyRef } from './types';

// ─── Helpers ───
function r(appKey: string, idx: number): ImageRef { return { appKey, idx }; }
function ak(appKey: string): AnswerKeyRef { return { appKey, answerKey: true }; }

// ─── Factory: Category 1 (product-guide) — one generator per post ───
function productGuide(appKey: string, color: string): BlogVisualConfig {
  return {
    primaryGenerators: [appKey],
    heroImages: [r(appKey, 0), r(appKey, 1), r(appKey, 2)],
    productCards: {
      items: [
        { image: r(appKey, 0), productName: 'Starter Pack', price: '$4.99', stars: 5 },
        { image: r(appKey, 1), productName: 'Theme Bundle', price: '$6.99', stars: 5 },
        { image: r(appKey, 2), productName: 'Complete Set', price: '$9.99', stars: 5 },
      ],
    },
    difficultyTiers: {
      beginner: r(appKey, 0),
      intermediate: r(appKey, 2),
      advanced: r(appKey, 4),
    },
    worksheetAnswerPair: {
      worksheet: r(appKey, 0),
      answerKey: ak(appKey),
    },
    ctaSample: r(appKey, 3),
    accentColor: color,
  };
}

// ─── Factory: Category 2 (platform-strategy) — mixed generators ───
function platformStrategy(
  gens: [string, string, string],
  extra: Partial<Pick<BlogVisualConfig, 'beforeAfter' | 'bundle' | 'platformMockup'>>,
  color: string,
): BlogVisualConfig {
  return {
    primaryGenerators: gens,
    heroImages: [r(gens[0], 0), r(gens[1], 0), r(gens[2], 0)],
    ...extra,
    ctaSample: r(gens[0], 1),
    accentColor: color,
  };
}

// ─── Factory: Category 3 (niche-seasonal) — theme-matched ───
function nicheSeasonal(
  gens: string[],
  color: string,
): BlogVisualConfig {
  const g = gens.length >= 4 ? gens : [...gens, gens[0]];
  return {
    primaryGenerators: gens,
    heroImages: [r(g[0], 0), r(g[1], 0), r(g[2], 0)],
    themedGrid: {
      images: [
        r(g[0], 0), r(g[0], 1), r(g[1], 0), r(g[1], 1),
        r(g[2], 0), r(g[2], 1), r(g[3], 0), r(g[3], 1),
      ],
    },
    productCards: {
      items: [
        { image: r(g[0], 2), productName: 'Theme Pack A', price: '$4.99', stars: 5 },
        { image: r(g[1], 2), productName: 'Theme Pack B', price: '$5.99', stars: 5 },
        { image: r(g[2], 2), productName: 'Theme Bundle', price: '$8.99', stars: 5 },
      ],
    },
    ctaSample: r(g[0], 3),
    accentColor: color,
  };
}

// ─── Factory: Category 4 (how-to) — instructional ───
function howToTiers(gens: string[], color: string): BlogVisualConfig {
  return {
    primaryGenerators: gens,
    heroImages: [r(gens[0], 0), r(gens[0], 1), r(gens.length > 1 ? gens[1] : gens[0], 0)],
    difficultyTiers: { beginner: r(gens[0], 0), intermediate: r(gens[0], 2), advanced: r(gens[0], 4) },
    ctaSample: r(gens[0], 3),
    accentColor: color,
  };
}
function howToPair(gens: string[], color: string): BlogVisualConfig {
  return {
    primaryGenerators: gens,
    heroImages: [r(gens[0], 0), r(gens[0], 1), r(gens.length > 1 ? gens[1] : gens[0], 0)],
    worksheetAnswerPair: { worksheet: r(gens[0], 0), answerKey: ak(gens[0]) },
    ctaSample: r(gens[0], 3),
    accentColor: color,
  };
}

// ═══════════════════════════════════════════════════════════════
// CATEGORY 1: Product-Specific Seller Guides (33 posts)
// ═══════════════════════════════════════════════════════════════

const cat1: Record<string, BlogVisualConfig> = {
  'sell-addition-worksheets-etsy-guide': productGuide('addition', 'orange'),
  'sell-subtraction-worksheets-online': productGuide('subtraction', 'pink'),
  'code-addition-puzzles-sell-etsy': productGuide('code-addition', 'purple'),
  'math-worksheet-bundles-that-sell': productGuide('math-worksheet', 'blue'),
  'math-puzzle-books-amazon-kdp': productGuide('math-puzzle', 'indigo'),
  'chart-count-worksheets-business': productGuide('chart-count', 'emerald'),
  'word-search-printables-profit': productGuide('wordsearch', 'sky'),
  'crossword-books-kdp-niche': productGuide('crossword', 'violet'),
  'cryptogram-worksheets-sell': productGuide('cryptogram', 'amber'),
  'word-scramble-printables-business': productGuide('word-scramble', 'rose'),
  'word-guess-game-worksheets-sell': productGuide('word-guess', 'cyan'),
  'handwriting-worksheets-etsy-niche': productGuide('writing', 'indigo'),
  'matching-worksheets-toddler-market': productGuide('matching', 'emerald'),
  'tracing-worksheets-fine-motor-sell': productGuide('drawing-lines', 'cyan'),
  'hidden-object-worksheets-business': productGuide('find-objects', 'purple'),
  'grid-matching-puzzles-sell': productGuide('grid-match', 'blue'),
  'find-and-count-printables-profit': productGuide('find-and-count', 'sky'),
  'missing-pieces-puzzles-kdp': productGuide('missing-pieces', 'indigo'),
  'shadow-matching-worksheets-sell': productGuide('shadow-match', 'violet'),
  'picture-maze-worksheets-business': productGuide('picture-path', 'green'),
  'sorting-worksheets-preschool-sell': productGuide('picture-sort', 'orange'),
  'preposition-worksheets-esl-market': productGuide('prepositions', 'teal'),
  'coloring-pages-business-2026': productGuide('coloring', 'rose'),
  'draw-and-color-worksheets-sell': productGuide('draw-and-color', 'amber'),
  'alphabet-worksheets-best-sellers': productGuide('alphabet-train', 'green'),
  'bingo-cards-printable-business': productGuide('bingo', 'red'),
  'pattern-worksheets-sell-online': productGuide('pattern-worksheet', 'violet'),
  'pattern-train-worksheets-niche': productGuide('pattern-train', 'orange'),
  'treasure-hunt-printables-sell': productGuide('treasure-hunt', 'amber'),
  'picture-sudoku-books-kdp': productGuide('sudoku', 'teal'),
  'size-comparison-worksheets-sell': productGuide('big-small', 'pink'),
  'more-less-worksheets-sell': productGuide('more-less', 'teal'),
  'odd-one-out-worksheets-sell': productGuide('odd-one-out', 'amber'),
};

// ═══════════════════════════════════════════════════════════════
// CATEGORY 2: Platform & Business Strategy (30 posts)
// ═══════════════════════════════════════════════════════════════

const cat2: Record<string, BlogVisualConfig> = {
  'etsy-printable-shop-first-month': platformStrategy(['addition', 'wordsearch', 'coloring'], { platformMockup: { platform: 'etsy', image: r('addition', 0) } }, 'emerald'),
  'etsy-seo-printable-sellers-2026': platformStrategy(['wordsearch', 'crossword', 'matching'], { platformMockup: { platform: 'etsy', image: r('wordsearch', 0) } }, 'blue'),
  'etsy-listing-optimization-worksheets': platformStrategy(['addition', 'coloring', 'sudoku'], { platformMockup: { platform: 'etsy', image: r('coloring', 0) } }, 'orange'),
  'kdp-activity-book-formatting-guide': platformStrategy(['math-puzzle', 'wordsearch', 'crossword'], { platformMockup: { platform: 'kdp', image: r('math-puzzle', 0) } }, 'purple'),
  'kdp-vs-etsy-which-earns-more': platformStrategy(['addition', 'crossword', 'sudoku'], { beforeAfter: { lcsImage: r('crossword', 0) } }, 'indigo'),
  'printable-business-income-realistic': platformStrategy(['addition', 'wordsearch', 'matching'], { bundle: { images: [r('addition', 0), r('wordsearch', 0), r('matching', 0), r('coloring', 0)], pageCount: 50 } }, 'emerald'),
  'how-many-listings-etsy-success': platformStrategy(['addition', 'subtraction', 'wordsearch'], { beforeAfter: { lcsImage: r('addition', 0) } }, 'sky'),
  'etsy-printable-pricing-strategy': platformStrategy(['addition', 'wordsearch', 'coloring'], { bundle: { images: [r('addition', 0), r('addition', 1), r('addition', 2), r('addition', 3)], pageCount: 50 } }, 'amber'),
  'pinterest-traffic-printable-shop': platformStrategy(['coloring', 'draw-and-color', 'matching'], { platformMockup: { platform: 'etsy', image: r('coloring', 2) } }, 'pink'),
  'seasonal-printable-calendar-sellers': platformStrategy(['coloring', 'wordsearch', 'addition'], { bundle: { images: [r('coloring', 0), r('wordsearch', 0), r('addition', 0), r('crossword', 0)], pageCount: 100 } }, 'rose'),
  'printable-bundle-strategy-etsy': platformStrategy(['addition', 'subtraction', 'math-worksheet'], { bundle: { images: [r('addition', 0), r('subtraction', 0), r('math-worksheet', 0), r('addition', 2), r('subtraction', 2)], pageCount: 75 } }, 'indigo'),
  'passive-income-printables-truth': platformStrategy(['wordsearch', 'coloring', 'crossword'], { beforeAfter: { lcsImage: r('wordsearch', 0) } }, 'teal'),
  'printable-business-no-design-skills': platformStrategy(['addition', 'matching', 'bingo'], { beforeAfter: { lcsImage: r('matching', 0) } }, 'green'),
  'worksheet-quality-vs-quantity-etsy': platformStrategy(['addition', 'wordsearch', 'sudoku'], { beforeAfter: { lcsImage: r('addition', 0) } }, 'violet'),
  'best-printable-niches-low-competition': platformStrategy(['cryptogram', 'missing-pieces', 'shadow-match'], { platformMockup: { platform: 'etsy', image: r('cryptogram', 0) } }, 'amber'),
  'etsy-reviews-printable-products': platformStrategy(['addition', 'wordsearch', 'coloring'], { platformMockup: { platform: 'etsy', image: r('wordsearch', 0) } }, 'orange'),
  'multilingual-printables-advantage': platformStrategy(['addition', 'alphabet-train', 'wordsearch'], { beforeAfter: { lcsImage: r('alphabet-train', 0) } }, 'cyan'),
  'commercial-license-printables-explained': platformStrategy(['math-puzzle', 'coloring', 'crossword'], { platformMockup: { platform: 'etsy', image: r('coloring', 1) } }, 'emerald'),
  'printable-shop-branding-tips': platformStrategy(['coloring', 'draw-and-color', 'pattern-worksheet'], { beforeAfter: { lcsImage: r('coloring', 0) } }, 'pink'),
  'email-list-printable-business': platformStrategy(['addition', 'wordsearch', 'coloring'], { bundle: { images: [r('addition', 0), r('wordsearch', 0), r('coloring', 0)], pageCount: 30 } }, 'blue'),
  'etsy-ads-printables-worth-it': platformStrategy(['addition', 'crossword', 'matching'], { platformMockup: { platform: 'etsy', image: r('addition', 0) } }, 'red'),
  'tpt-vs-etsy-worksheets-comparison': platformStrategy(['addition', 'wordsearch', 'math-worksheet'], { beforeAfter: { lcsImage: r('wordsearch', 0) } }, 'purple'),
  'printable-business-mistakes-avoid': platformStrategy(['addition', 'coloring', 'sudoku'], { beforeAfter: { lcsImage: r('addition', 0) } }, 'yellow'),
  'scale-printable-business-automation': platformStrategy(['addition', 'subtraction', 'wordsearch'], { bundle: { images: [r('addition', 0), r('subtraction', 0), r('wordsearch', 0), r('matching', 0), r('coloring', 0)], pageCount: 100 } }, 'emerald'),
  'printable-mockup-photos-sell-more': platformStrategy(['coloring', 'addition', 'wordsearch'], { platformMockup: { platform: 'etsy', image: r('coloring', 3) } }, 'rose'),
  'gumroad-vs-etsy-digital-products': platformStrategy(['math-puzzle', 'crossword', 'word-scramble'], { platformMockup: { platform: 'etsy', image: r('word-scramble', 0) } }, 'sky'),
  'print-on-demand-vs-digital-download': platformStrategy(['addition', 'coloring', 'wordsearch'], { beforeAfter: { lcsImage: r('coloring', 1) } }, 'orange'),
  'customer-service-digital-products': platformStrategy(['wordsearch', 'matching', 'bingo'], { platformMockup: { platform: 'etsy', image: r('matching', 0) } }, 'teal'),
  'social-media-printable-sellers': platformStrategy(['coloring', 'draw-and-color', 'addition'], { platformMockup: { platform: 'etsy', image: r('coloring', 2) } }, 'pink'),
  'copyright-printable-sellers-basics': platformStrategy(['addition', 'wordsearch', 'coloring'], { beforeAfter: { lcsImage: r('wordsearch', 0) } }, 'indigo'),
};

// ═══════════════════════════════════════════════════════════════
// CATEGORY 3: Niche & Seasonal Content (30 posts)
// ═══════════════════════════════════════════════════════════════

const cat3: Record<string, BlogVisualConfig> = {
  'best-printables-sell-christmas': nicheSeasonal(['coloring', 'wordsearch', 'addition', 'crossword'], 'red'),
  'halloween-printables-sell-october': nicheSeasonal(['coloring', 'wordsearch', 'crossword', 'cryptogram'], 'orange'),
  'back-to-school-printable-rush': nicheSeasonal(['addition', 'writing', 'alphabet-train', 'subtraction'], 'blue'),
  'valentines-day-printables-sell': nicheSeasonal(['coloring', 'matching', 'wordsearch', 'draw-and-color'], 'pink'),
  'easter-printables-business-spring': nicheSeasonal(['coloring', 'find-and-count', 'matching', 'pattern-worksheet'], 'green'),
  'summer-activity-printables-sell': nicheSeasonal(['coloring', 'wordsearch', 'draw-and-color', 'picture-path'], 'yellow'),
  'preschool-printables-best-sellers': nicheSeasonal(['matching', 'big-small', 'coloring', 'drawing-lines'], 'emerald'),
  'kindergarten-worksheets-market': nicheSeasonal(['addition', 'alphabet-train', 'pattern-worksheet', 'matching'], 'amber'),
  'homeschool-printables-growing-market': nicheSeasonal(['addition', 'subtraction', 'wordsearch', 'writing'], 'indigo'),
  'esl-worksheets-global-market': nicheSeasonal(['prepositions', 'word-guess', 'matching', 'alphabet-train'], 'cyan'),
  'special-education-printables-sell': nicheSeasonal(['matching', 'big-small', 'shadow-match', 'drawing-lines'], 'violet'),
  'printable-games-birthday-parties': nicheSeasonal(['bingo', 'wordsearch', 'treasure-hunt', 'crossword'], 'purple'),
  'educational-printables-new-parents': nicheSeasonal(['coloring', 'matching', 'drawing-lines', 'big-small'], 'rose'),
  'toddler-activity-printables-sell': nicheSeasonal(['coloring', 'matching', 'big-small', 'drawing-lines'], 'green'),
  'math-fact-fluency-printables-sell': nicheSeasonal(['addition', 'subtraction', 'code-addition', 'math-worksheet'], 'orange'),
  'sight-words-worksheets-business': nicheSeasonal(['wordsearch', 'word-scramble', 'word-guess', 'matching'], 'sky'),
  'fine-motor-activities-printables': nicheSeasonal(['drawing-lines', 'draw-and-color', 'coloring', 'pattern-train'], 'teal'),
  'brain-break-printables-teachers': nicheSeasonal(['wordsearch', 'crossword', 'sudoku', 'cryptogram'], 'indigo'),
  'travel-activity-printables-sell': nicheSeasonal(['wordsearch', 'coloring', 'sudoku', 'crossword'], 'amber'),
  'animal-themed-printables-sell': nicheSeasonal(['coloring', 'matching', 'find-and-count', 'wordsearch'], 'green'),
  'space-themed-worksheets-business': nicheSeasonal(['coloring', 'wordsearch', 'math-puzzle', 'crossword'], 'violet'),
  'printables-sell-mothers-day-fathers-day': nicheSeasonal(['coloring', 'draw-and-color', 'wordsearch', 'word-scramble'], 'pink'),
  'thanksgiving-printables-sell-november': nicheSeasonal(['coloring', 'wordsearch', 'matching', 'bingo'], 'amber'),
  'new-year-printables-january': nicheSeasonal(['coloring', 'wordsearch', 'crossword', 'sudoku'], 'blue'),
  'spring-printables-sell-march-april': nicheSeasonal(['coloring', 'find-and-count', 'matching', 'wordsearch'], 'green'),
  'winter-printables-sell-december-january': nicheSeasonal(['coloring', 'wordsearch', 'crossword', 'sudoku'], 'sky'),
  'dinosaur-printables-sell-evergreen': nicheSeasonal(['coloring', 'wordsearch', 'matching', 'find-and-count'], 'emerald'),
  'farm-animal-printables-sell': nicheSeasonal(['coloring', 'matching', 'find-and-count', 'bingo'], 'amber'),
  'ocean-themed-printables-sell': nicheSeasonal(['coloring', 'wordsearch', 'find-objects', 'matching'], 'cyan'),
  'food-themed-worksheets-sell': nicheSeasonal(['coloring', 'matching', 'find-and-count', 'wordsearch'], 'orange'),
};

// ═══════════════════════════════════════════════════════════════
// CATEGORY 4: How-To Tutorials (19 posts)
// ═══════════════════════════════════════════════════════════════

const cat4: Record<string, BlogVisualConfig> = {
  'create-worksheet-bundle-35-minutes': howToTiers(['addition', 'subtraction', 'math-worksheet'], 'emerald'),
  'format-worksheets-etsy-listing': howToPair(['addition', 'wordsearch'], 'blue'),
  'create-activity-book-kdp-start-finish': howToTiers(['math-puzzle', 'wordsearch', 'crossword'], 'purple'),
  'worksheet-design-tips-sell-more': howToPair(['addition', 'coloring'], 'orange'),
  'answer-key-importance-printable-sales': howToPair(['addition', 'wordsearch'], 'amber'),
  'use-themed-images-sell-worksheets': howToTiers(['addition', 'matching', 'coloring'], 'pink'),
  'batch-create-worksheets-efficiently': howToTiers(['addition', 'subtraction', 'wordsearch'], 'teal'),
  'worksheet-difficulty-levels-product-tiers': howToTiers(['sudoku'], 'indigo'),
  'printable-file-formats-pdf-jpeg-guide': howToPair(['addition', 'coloring'], 'sky'),
  'create-cohesive-printable-brand': howToTiers(['coloring', 'draw-and-color', 'matching'], 'rose'),
  'repurpose-worksheets-multiple-products': howToTiers(['addition', 'code-addition'], 'violet'),
  'worksheet-generator-vs-canva-comparison': howToPair(['addition', 'wordsearch', 'coloring'], 'emerald'),
  'free-printable-samples-lead-magnet': howToPair(['addition', 'matching'], 'green'),
  'best-paper-sizes-printable-products': howToTiers(['addition', 'wordsearch'], 'cyan'),
  'create-printable-curriculum-packs': howToTiers(['addition', 'subtraction', 'writing'], 'blue'),
  '11-languages-sell-globally': howToTiers(['addition', 'alphabet-train', 'wordsearch'], 'amber'),
  'etsy-keyword-research-printables': howToPair(['wordsearch', 'addition'], 'orange'),
  'printable-product-photography-mockups': howToPair(['coloring', 'addition'], 'pink'),
  'update-old-printable-listings-boost-sales': howToPair(['addition', 'wordsearch'], 'teal'),
};

// ═══════════════════════════════════════════════════════════════
// MERGED MAP — all 112 blog posts
// ═══════════════════════════════════════════════════════════════

export const blogVisualMap: Record<string, BlogVisualConfig> = { ...cat1, ...cat2, ...cat3, ...cat4 };

export function getBlogVisualConfig(blogId: string): BlogVisualConfig | undefined {
  return blogVisualMap[blogId];
}
