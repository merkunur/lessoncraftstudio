#!/usr/bin/env node
/**
 * Fix meta descriptions across all 194 English content files.
 * Target: 150-160 characters per meta description.
 *
 * Strategy by category:
 *  - app-content: programmatic shortening of common pattern
 *  - tool-content: programmatic shortening of feature-heavy descriptions
 *  - bundle/start/guide/idea: individual mappings where needed
 */
const fs = require('fs');
const path = require('path');

const BASE = path.join(__dirname, '..', 'frontend', 'config');

// ── Individual meta overrides (for files that need hand-crafted metas) ──

const META_OVERRIDES = {
  // === APP-CONTENT (32 files too long, all follow same pattern) ===
  'app-content/addition':
    'Create addition worksheets to sell on Etsy, KDP & TPT. 104 themes, 4 exercise modes, answer keys included, 400+ DPI export. Try free — license available.',
  'app-content/alphabet-train':
    'Create alphabet train worksheets to sell on Etsy, KDP & TPT. Train-car letter-image matching across 11 languages, 104 themes. Try free — license available.',
  'app-content/big-small':
    'Create size comparison worksheets to sell on Etsy, KDP & TPT. Five question types, identical and different modes, 104 themes. Try free — license available.',
  'app-content/bingo':
    'Create picture bingo cards to sell on Etsy, KDP & TPT. Batch-generate unique cards, ZIP export, call-out sheets, 104 themes. Try free — license available.',
  'app-content/chart-count':
    'Create picture graph worksheets to sell on Etsy, KDP & TPT. Auto answer key with highlights, 104 themes, 6 image types per sheet. Try free — license available.',
  'app-content/coloring':
    'Create custom coloring pages to sell on Etsy, KDP & TPT. Free-form canvas, 104 themes, freehand drawing, grayscale export. Try free — license available.',
  'app-content/crossword':
    'Create picture crossword puzzles to sell on Etsy, KDP & TPT. Image clues on a 15x15 grid, 4 input methods, auto answer key. Try free — license available.',
  'app-content/cryptogram':
    'Create cryptogram worksheets to sell on Etsy, KDP & TPT. Picture cipher encoding, Letters to Reveal difficulty, 104 themes. Try free — license available.',
  'app-content/draw-and-color':
    'Create grid drawing worksheets to sell on Etsy, KDP & TPT. Dual grid system, adjustable clue percentage, symmetry modes. Try free — license available.',
  'app-content/drawing-lines':
    'Create line tracing worksheets to sell on Etsy, KDP & TPT. Eight SVG templates, image pair matching, 104 themed collections. Try free — license available.',
  'app-content/find-and-count':
    'Create I Spy counting worksheets to sell on Etsy, KDP & TPT. 4 task types, Letter Spotting mode, auto answer key, 104 themes. Try free — license available.',
  'app-content/find-objects':
    'Create hidden object worksheets to sell on Etsy, KDP & TPT. I Spy and Odd One Out modes, zero-overlap scenes, auto answer key. Try free — license available.',
  'app-content/grid-match':
    'Create grid match puzzles to sell on Etsy, KDP & TPT. Configurable grid size, adjustable clue cells, auto answer key, 104 themes. Try free — license available.',
  'app-content/matching':
    'Create matching worksheets to sell on Etsy, KDP & TPT. 4 matching modes, auto answer key, 104 themes, configurable pairs. Try free — license available.',
  'app-content/math-puzzle':
    'Create math puzzle worksheets to sell on Etsy, KDP & TPT. Picture puzzles with addition and subtraction, configurable grids. Try free — license available.',
  'app-content/math-worksheet':
    'Create algebra puzzle worksheets to sell on Etsy, KDP & TPT. Images as variables, 4 difficulty levels, unique solutions. Try free — license available.',
  'app-content/missing-pieces':
    'Create missing pieces puzzles to sell on Etsy, KDP & TPT. 6 piece shapes, configurable difficulty, auto answer key, 104 themes. Try free — license available.',
  'app-content/more-less':
    'Create number comparison worksheets to sell on Etsy, KDP & TPT. 3 comparison modes, 104 themes, answer keys, 400+ DPI export. Try free — license available.',
  'app-content/odd-one-out':
    'Create odd one out worksheets to sell on Etsy, KDP & TPT. Two puzzle modes, auto answer key with red circles, 104 themes. Try free — license available.',
  'app-content/pattern-train':
    'Create pattern train worksheets to sell on Etsy, KDP & TPT. Five pattern types, 11 themed train wagons, adjustable clue count. Try free — license available.',
  'app-content/pattern-worksheet':
    'Create pattern worksheets to sell on Etsy, KDP & TPT. Nine pattern types, two question modes, per-exercise config, 104 themes. Try free — license available.',
  'app-content/picture-path':
    'Create maze worksheets to sell on Etsy, KDP & TPT. 3 game modes, LPF algorithm, auto answer key, 104 themes, print-ready PDFs. Try free — license available.',
  'app-content/picture-sort':
    'Create picture sorting worksheets to sell on Etsy, KDP & TPT. Two-category sorting, auto answer key, 104 themes, 4-12 images. Try free — license available.',
  'app-content/prepositions':
    'Create preposition worksheets to sell on Etsy, KDP & TPT. 8 spatial prepositions, fill-in-the-blank and multiple choice. Try free — license available.',
  'app-content/shadow-match':
    'Create shadow matching worksheets to sell on Etsy, KDP & TPT. Shadow match and make-it-whole modes, auto silhouettes, 104 themes. Try free — license available.',
  'app-content/subtraction':
    'Create subtraction worksheets to sell on Etsy, KDP & TPT. 5 exercise modes, 104 visual themes, auto answer keys, 400+ DPI export. Try free — license available.',
  'app-content/sudoku':
    'Create picture sudoku worksheets to sell on Etsy, KDP & TPT. 4x4 grid, three difficulty levels, auto answer key, 104 themes. Try free — license available.',
  'app-content/treasure-hunt':
    'Create treasure hunt worksheets to sell on Etsy, KDP & TPT. 5x5 coordinate grid, two direction types, auto answer key, 104 themes. Try free — license available.',
  'app-content/word-guess':
    'Create word guess worksheets to sell on Etsy, KDP & TPT. Image clues, 4 difficulty levels, 3 content sources, 11 languages. Try free — license available.',
  'app-content/word-scramble':
    'Create word scramble worksheets to sell on Etsy, KDP & TPT. Image clues, shuffled letter tiles, vowel color coding, 11 languages. Try free — license available.',
  'app-content/word-search':
    'Create word search worksheets to sell on Etsy, KDP & TPT. Adjustable grid size 5-30, direction controls, locale-aware fillers. Try free — license available.',
  'app-content/writing':
    'Create handwriting worksheets to sell on Etsy, KDP & TPT. Three practice modes, five font styles, arrow stroke guides, fading traces. Try free — license.',

  // === TOOL-CONTENT (28 files too long + 2 slightly over) ===
  'tool-content/big-small':
    'Generate size comparison worksheets with five question types, identical and different image modes, and 104 themes. Export PDFs. Try free — license available.',
  'tool-content/bingo':
    'Create picture bingo cards with grids from 3x3 to 5x5, batch generation of unique cards, ZIP export, call-out sheets, 104 themes. Try free — license available.',
  'tool-content/chart-count':
    'Create picture graph worksheets with scattered 4x5 grids, 6 image types, auto answer keys, 11 languages, and 104 themed images. Try free — license available.',
  'tool-content/coloring':
    'Create coloring pages on a free-form canvas with 3,100+ illustrations across 104 themes, freehand drawing, and grayscale export. Try free — license available.',
  'tool-content/crossword':
    'Create picture crosswords with image clues on a 15x15 grid, four input methods, auto answer keys, and 104 themed image sets. Try free — license available.',
  'tool-content/cryptogram':
    'Generate cryptogram worksheets with picture cipher encoding, difficulty slider, auto-assign mode, answer keys across 11 languages. Try free — license available.',
  'tool-content/draw-and-color':
    'Generate grid drawing worksheets with dual grids, adjustable clue percentage, three symmetry modes, and themed image sets. Try free — license available.',
  'tool-content/drawing-lines':
    'Create line tracing worksheets with eight SVG templates, 3,100+ illustrations across 104 themes, and auto-fill image pairs. Try free — license available.',
  'tool-content/find-and-count':
    'Create I Spy worksheets with Hidden Object and Letter Spotting modes, four task types, locale-specific alphabets, 104 themes. Try free — license available.',
  'tool-content/find-objects':
    'Create hidden object worksheets with I Spy and Odd One Out modes, zero-overlap scenes, auto answer keys, and 104 themed images. Try free — license available.',
  'tool-content/grid-match':
    'Create grid matching worksheets with configurable grid size, adjustable clue cells, Fisher-Yates shuffling, and 104 themed images. Try free — license available.',
  'tool-content/image-addition':
    'Create addition worksheets with themed images in seconds. Choose from 104 themes, set difficulty, and export print-ready PDFs. Try free — license available.',
  'tool-content/image-subtraction':
    'Create subtraction worksheets with cross-out visuals in seconds. 104 themes, adjustable difficulty, print-ready PDF export. Try free — license available.',
  'tool-content/matching':
    'Create matching worksheets with 4 modes, auto answer key with connecting lines, configurable pairs, 11 languages, 104 themes. Try free — license available.',
  'tool-content/math-worksheet':
    'Generate algebra picture puzzles where images represent variables in linked equations. Four difficulty levels, unique solutions. Try free — license available.',
  'tool-content/missing-pieces':
    'Create jigsaw puzzle worksheets with 6 piece shapes, configurable difficulty, smart extraction with distractor pieces, 104 themes. Try free — license available.',
  'tool-content/odd-one-out':
    'Create odd one out worksheets with Identical and Similar modes, per-exercise overrides, auto answer keys with red circles. Try free — license available.',
  'tool-content/pattern-train':
    'Generate pattern train worksheets with five pattern types, 11 themed train wagons, adjustable clue count, and auto answer keys. Try free — license available.',
  'tool-content/pattern-worksheet':
    'Generate pattern worksheets with nine types, two question modes, per-exercise config, auto answer keys, and 104 themed images. Try free — license available.',
  'tool-content/picture-path':
    'Create maze worksheets with Picture Pathway, Classic Maze, and Choose the Right Path modes, collectibles, and auto answer keys. Try free — license available.',
  'tool-content/picture-sort':
    'Create sorting worksheets with two-category theme mode, shuffled cutout grids, auto answer keys, and 104 themed image collections. Try free — license available.',
  'tool-content/prepositions':
    'Generate preposition worksheets with fill-in-the-blank and multiple choice modes, shape replacement, 104 themes, 11 languages. Try free — license available.',
  'tool-content/shadow-match':
    'Create shadow matching worksheets with pixel-level silhouettes and Make It Whole image splitting, auto answer keys, 104 themes. Try free — license available.',
  'tool-content/sudoku':
    'Create picture sudoku for kids with 4x4 image grids, three difficulty levels, auto answer keys, and 104 themed collections. Try free — license available.',
  'tool-content/treasure-hunt':
    'Create treasure hunt worksheets on a 5x5 grid with two direction types, themed landmarks, auto answer keys, and 104 image sets. Try free — license available.',
  'tool-content/word-guess':
    'Generate word guess worksheets with 4 difficulty levels, dual input modes, exclude letters, 11 languages, and 104 themed images. Try free — license available.',
  'tool-content/word-scramble':
    'Generate word scramble worksheets with shuffled letter tiles, image clues, vowel color coding, 4 difficulty levels, 11 languages. Try free — license available.',
  'tool-content/word-search':
    'Generate word search worksheets with adjustable grids from 5x5 to 30x30, direction controls, locale-aware fillers, 11 languages. Try free — license available.',
  'tool-content/writing':
    'Generate handwriting worksheets with three practice modes, five font styles, arrow stroke order, fading guides, 104 themes. Try free — license available.',

  // === BUNDLE-CONTENT (4 too long) ===
  'bundle-content/literacy-bundle':
    'Get 7 literacy worksheet generators in one bundle. Create alphabet, word search, cryptogram, prepositions, and handwriting worksheets in 11 languages.',
  'bundle-content/matching-bundle':
    'Get 5 matching worksheet generators in one bundle. Create matching, grid match, shadow match, bingo, and sorting worksheets to sell on Etsy, KDP & TPT.',
  'bundle-content/math-bundle':
    'Get 6 math worksheet generators in one bundle. Create addition, subtraction, code puzzles, comparison, and algebra worksheets to sell on Etsy, KDP & TPT.',
  'bundle-content/visual-bundle':
    'Get 7 visual learning generators in one bundle. Create coloring, drawing, pattern, size comparison, charts, and line tracing worksheets to sell online.',

  // === START-CONTENT (2 too long, 3 too short) ===
  'start-content/amazon-kdp-activity-books':
    'How to sell activity books on Amazon KDP. Covers interior formatting, cover design, keyword research, pricing strategy, and scaling your KDP book business.',
  'start-content/complete-guide-printable-business':
    'How to start a printable business from scratch. Step-by-step guide for Etsy, Amazon KDP, and TpT sellers using worksheet generators to create and sell products.',
  'start-content/create-multilingual-worksheets':
    'Create and sell worksheets in 11 languages with a multilingual generator. Reach German, French, and Spanish buyers on Etsy, Amazon KDP, and global markets.',
  'start-content/create-worksheets-that-sell':
    'How to create worksheets that sell on Etsy, Amazon KDP, and TpT. Step-by-step guide covering themed images, answer keys, pricing, and listing optimization.',
  'start-content/scaling-printable-business':
    'How to scale your printable business from side hustle to full-time. Covers catalog expansion, multi-platform distribution, bundling, and workflow automation.',

  // === GUIDE-CONTENT (too long) ===
  'guide-content/create-alphabet-worksheets':
    'How to create alphabet train worksheets with train wagons, two creation modes, configurable difficulty, and 104 themed images. Sell on Etsy, KDP & TPT.',
  'guide-content/create-chart-count-worksheets':
    'Create picture graph worksheets with 4x5 scattered grids, auto answer keys, random image distribution, and 104 themes. Step-by-step guide for Etsy & KDP.',
  'guide-content/create-counting-worksheets':
    'How to create counting worksheets with picture graphs, auto answer keys, and 104 themes. Step-by-step guide to selling printables on Etsy, KDP, and TpT.',
  'guide-content/create-cryptogram-puzzles':
    'Create cryptogram puzzles with picture cipher encoding, adjustable difficulty, auto-assign mode, and locale-aware alphabets. Guide for Etsy & KDP sellers.',
  'guide-content/create-missing-pieces-puzzles':
    'Create jigsaw puzzle worksheets with 6 piece shapes, smart extraction, distractor pieces, and auto answer keys. Step-by-step selling guide for Etsy & KDP.',
  'guide-content/create-odd-one-out-puzzles':
    'Create odd one out worksheets with Identical and Similar modes, per-exercise overrides, and auto answer keys. Step-by-step guide for Etsy and KDP sellers.',
  'guide-content/create-sell-tpt-resources':
    'How to create and sell TPT resources. Account setup, resource formatting, listing optimization, pricing, and building momentum on Teachers Pay Teachers.',
  'guide-content/create-shadow-matching-worksheets':
    'Create shadow matching worksheets with two modes: Shadow Match for silhouettes and Make It Whole for split images. Step-by-step guide to sell on Etsy & KDP.',
  'guide-content/create-sorting-worksheets':
    'Create sorting worksheets with two-category theme mode, 4-12 images, shuffled cutout grids, and auto answer keys. Step-by-step guide to sell on Etsy & KDP.',
  'guide-content/create-treasure-hunt-worksheets':
    'Create treasure hunt worksheets on a 5x5 grid with directional moves, themed landmarks, and auto answer keys. Step-by-step guide to sell on Etsy and KDP.',
  'guide-content/kdp-formatting-worksheets':
    'KDP formatting guide covering trim sizes, margins, bleed settings, PDF export at 300 DPI, cover dimensions, and upload troubleshooting for activity books.',
  'guide-content/research-profitable-niches':
    'How to research profitable printable niches using marketplace data, keyword analysis, competitor research, demand signals, and systematic validation methods.',
  'guide-content/scale-printable-business-guide':
    'How to scale your printable business with batch production, multi-platform expansion, catalog growth, multi-language markets, and automation strategies.',

  // === GUIDE-CONTENT (too short) ===
  'guide-content/automate-printable-business':
    'How to automate your printable business with batch production, template systems, and systematic workflows. Save hours weekly and scale output across platforms.',
  'guide-content/create-bingo-cards':
    'How to create bingo cards with themed images. Choose grid sizes, generate unique cards with call-out sheets, and export print-ready PDFs to sell on Etsy & KDP.',
  'guide-content/create-pattern-worksheets':
    'Create pattern worksheets with 9 types, themed images, auto answer keys, and 2 question formats. Export print-ready PDFs to sell on Etsy, Amazon KDP, and TpT.',
  'guide-content/create-subtraction-worksheets':
    'Create subtraction worksheets for kids with crossed-out images, themed visuals, and auto answer keys. Step-by-step guide to selling on Etsy, KDP, and TpT.',
  'guide-content/customer-support-digital-products':
    'Customer support strategies for digital product sellers. Covers issue prevention, response templates, refund handling, review management, and scalable systems.',
  'guide-content/email-marketing-printables':
    'Email marketing strategies for printable sellers. Build your subscriber list, create lead magnets, automate sequences, and drive repeat sales across platforms.',
  'guide-content/get-reviews-printable-products':
    'Proven strategies to get reviews for printable products. Build social proof, earn authentic buyer feedback, and boost your Etsy, KDP, and TpT shop credibility.',
  'guide-content/kdp-vs-etsy-printables':
    'KDP vs Etsy for printable sellers. Compare fee structures, product formats, traffic mechanics, and learn multi-platform strategies for your printable business.',
  'guide-content/make-money-kdp-activity-books':
    'How to make money with KDP activity books. Covers pricing, catalog building, royalty calculations, seasonal publishing, and multi-platform scaling strategies.',
  'guide-content/multilingual-printable-business':
    'Build a multilingual printable business by expanding into international markets. Learn which languages to target, translation workflows, and revenue strategies.',
  'guide-content/publish-puzzle-books-kdp':
    'How to publish puzzle books on KDP with word search, crossword, and sudoku. Covers formatting, variety books, series strategy, and Amazon listing optimization.',
  'guide-content/tpt-store-optimization':
    'TPT store optimization strategies for higher search rankings and more sales. Covers preview conversion, product bundling, review building, and catalog scaling.',
  'guide-content/understanding-commercial-licenses':
    'Understand commercial use licenses for printables before selling. Learn licensing types, common mistakes, and how proper licensing protects your business.',
  'guide-content/worksheets-multiple-languages':
    'How to create worksheets in multiple languages with production workflows, character handling, font selection, quality assurance, and listing adaptation.',

  // === IDEA-CONTENT (too long) ===
  'idea-content/birds-printable-ideas':
    'Explore bird-themed printable ideas to sell on Etsy, Amazon KDP, and TPT. Product concepts, platform strategies, and niche positioning tips for sellers.',
  'idea-content/camping-printable-ideas':
    'Discover camping printable ideas to sell on Etsy, Amazon KDP, and TPT. Outdoor-themed product concepts, platform strategies, and niche tips for sellers.',
  'idea-content/esl-printable-ideas':
    'Discover ESL printable ideas to sell on Etsy, Amazon KDP, and TPT. Niche strategies for sellers targeting teachers, tutors, and language learners worldwide.',
  'idea-content/fairy-tale-printable-ideas':
    'Discover fairy tale printable ideas to sell on Etsy, Amazon KDP, and TPT. Storybook-themed product concepts, platform tips, and strategies for sellers.',
  'idea-content/first-grade-printable-ideas':
    'Discover first grade printable ideas to sell on Etsy, Amazon KDP, and TPT. Product concepts and niche strategies for sellers targeting first grade academics.',
  'idea-content/food-cooking-printable-ideas':
    'Discover food and cooking printable ideas to sell on Etsy, Amazon KDP, and TPT. Recipe-themed product concepts, platform strategies, and tips for sellers.',
  'idea-content/halloween-printable-ideas':
    'Explore Halloween printable ideas to sell on Etsy, Amazon KDP, and TPT. Spooky-themed product concepts, seasonal strategies, and tips for printable sellers.',
  'idea-content/homeschool-printable-ideas':
    'Discover homeschool printable ideas to sell on Etsy, Amazon KDP, and TPT. Niche strategies for sellers targeting parents who build homeschool curricula.',
  'idea-content/insects-printable-ideas':
    'Discover insect-themed printable ideas to sell on Etsy, Amazon KDP, and TPT. Bug and butterfly product concepts, platform strategies, and niche seller tips.',
  'idea-content/kindergarten-printable-ideas':
    'Explore kindergarten printable ideas to sell on Etsy, Amazon KDP, and TPT. K-level product concepts and niche strategies for printable sellers worldwide.',
  'idea-content/math-facts-printable-ideas':
    'Discover math facts printable ideas to sell on Etsy, Amazon KDP, and TPT. Niche strategies for sellers targeting teachers and parents who need practice sheets.',
  'idea-content/ocean-animals-printable-ideas':
    'Explore ocean animals printable ideas to sell on Etsy, Amazon KDP, and TPT. Sea-themed product concepts, platform strategies, and tips for printable sellers.',
  'idea-content/second-grade-printable-ideas':
    'Explore second grade printable ideas to sell on Etsy, Amazon KDP, and TPT. Product concepts and niche strategies for sellers targeting second grade academics.',
  'idea-content/special-education-printable-ideas':
    'Discover special education printable ideas to sell on Etsy, KDP, and TPT. SPED product concepts for teachers, therapists, and parents of diverse learners.',
  'idea-content/summer-learning-printable-ideas':
    'Discover summer learning printable ideas to sell on Etsy, Amazon KDP, and TPT. Seasonal product concepts for parents, teachers, and camp activity coordinators.',
  'idea-content/transportation-printable-ideas':
    'Explore transportation printable ideas to sell on Etsy, Amazon KDP, and TPT. Vehicle-themed product concepts, platform strategies, and tips for sellers.',

  // === IDEA-CONTENT (too short) ===
  'idea-content/custom-worksheet-service-ideas':
    'Custom worksheet service business ideas for Etsy and freelance sellers. Offer made-to-order educational printables with premium per-order pricing strategies.',
  'idea-content/party-supply-printable-ideas':
    'Printable party supply business ideas for Etsy sellers. Create themed party packs, birthday games, celebration worksheets, and seasonal event printables.',
  'idea-content/pirates-printable-ideas':
    'Discover pirate-themed printable ideas to sell on Etsy, Amazon KDP, and TPT. Pirate product concepts, adventure worksheets, and niche strategies for sellers.',
  'idea-content/print-on-demand-printable-ideas':
    'Print-on-demand worksheet ideas for Etsy, KDP, and Shopify sellers. Build a zero-inventory printable business with workbooks, activity packs, and puzzle books.',
  'idea-content/underwater-printable-ideas':
    'Discover underwater printable ideas to sell on Etsy, Amazon KDP, and TPT. Ocean-themed product concepts, deep-sea worksheets, and niche tips for sellers.',
};

// Special cases: files with escaped apostrophes in metaDescription
const APOSTROPHE_FIXES = {
  'idea-content/parents-day-printable-ideas':
    "Discover Mother's Day and Father's Day printable ideas to sell on Etsy, KDP, and TPT. Parent appreciation product concepts and platform tips for sellers.",
  'idea-content/valentines-day-printable-ideas':
    "Explore Valentine's Day printable ideas to sell on Etsy, KDP, and TPT. Love-themed product concepts, seasonal timing strategies, and tips for sellers.",
};

// ── Validation ──

let hasError = false;
for (const [key, meta] of Object.entries(META_OVERRIDES)) {
  if (meta.length < 150 || meta.length > 160) {
    console.error(`ERROR: ${key} meta is ${meta.length} chars (need 150-160): "${meta}"`);
    hasError = true;
  }
}
for (const [key, meta] of Object.entries(APOSTROPHE_FIXES)) {
  if (meta.length < 150 || meta.length > 160) {
    console.error(`ERROR: ${key} meta is ${meta.length} chars (need 150-160): "${meta}"`);
    hasError = true;
  }
}
if (hasError) {
  console.error('\nFix the errors above before running.');
  process.exit(1);
}

// ── Apply fixes ──

let filesModified = 0;

function applyMetaFix(filePath, newMeta, useDoubleQuotes = false) {
  let content = fs.readFileSync(filePath, 'utf8');
  const original = content;

  if (useDoubleQuotes) {
    // For metas with apostrophes — use double quotes
    // Replace the entire metaDescription line (handles escaped apostrophes)
    content = content.replace(
      /metaDescription:\s*'[^']*(?:\\.[^']*)*'/,
      `metaDescription: "${newMeta}"`
    );
  } else {
    // Standard single-quoted replacement
    const sqRe = /metaDescription:\s*'[^']*'/;
    const dqRe = /metaDescription:\s*"[^"]*"/;

    if (sqRe.test(content)) {
      content = content.replace(sqRe, `metaDescription: '${newMeta}'`);
    } else if (dqRe.test(content)) {
      content = content.replace(dqRe, `metaDescription: '${newMeta}'`);
    }
  }

  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf8');
    filesModified++;
    return true;
  }
  return false;
}

// Process standard overrides
for (const [key, meta] of Object.entries(META_OVERRIDES)) {
  const [cat, file] = key.split('/');
  const filePath = path.join(BASE, cat, 'en', `${file}.ts`);

  if (!fs.existsSync(filePath)) {
    console.log(`SKIP: ${filePath} not found`);
    continue;
  }

  if (applyMetaFix(filePath, meta)) {
    console.log(`FIXED: ${key} (${meta.length} chars)`);
  } else {
    console.log(`SKIP: ${key} (no change detected)`);
  }
}

// Process apostrophe fixes
for (const [key, meta] of Object.entries(APOSTROPHE_FIXES)) {
  const [cat, file] = key.split('/');
  const filePath = path.join(BASE, cat, 'en', `${file}.ts`);

  if (!fs.existsSync(filePath)) {
    console.log(`SKIP: ${filePath} not found`);
    continue;
  }

  if (applyMetaFix(filePath, meta, true)) {
    console.log(`FIXED: ${key} (${meta.length} chars) [apostrophe fix]`);
  } else {
    console.log(`SKIP: ${key} (no change detected)`);
  }
}

console.log(`\nDone. Modified ${filesModified} files.`);
