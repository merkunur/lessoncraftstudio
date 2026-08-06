#!/usr/bin/env node
/**
 * Part 165 — Fix A + B: Deduplicate product page feature titles + expand short descriptions
 *
 * Fix A: 10 clusters of duplicate feature titles across product pages → 0 FAILs
 * Fix B: 7 feature descriptions under 30 words → 0 WARNs
 *
 * Approach: simple string replacement on each file
 */

const fs = require('fs');
const path = require('path');

const CONTENT_DIR = path.join(__dirname, '..', 'frontend', 'content', 'product-pages', 'en');

// ── Fix A: Title deduplication ──────────────────────────────────────────────
// Each entry: { old: exact old title, new: product-specific new title, files: [filenames] }
const titleFixes = [
  // Cluster 1: "Auto-Generated Answer Keys" (5 files)
  {
    old: "Auto-Generated Answer Keys",
    replacements: {
      'alphabet-train-worksheets.ts': 'Auto-Generated Alphabet Train Solution Keys',
      'crossword-worksheets.ts': 'Auto-Generated Crossword Puzzle Solutions',
      'cryptogram-worksheets.ts': 'Auto-Generated Cryptogram Decoder Keys',
      'prepositions-worksheets.ts': 'Auto-Generated Preposition Activity Solutions',
      'word-search-worksheets.ts': 'Auto-Generated Word Search Solution Grids',
    },
  },
  // Cluster 2: "Full Canvas Editing Tools" (6 files)
  {
    old: "Full Canvas Editing Tools",
    replacements: {
      'alphabet-train-worksheets.ts': 'Canvas Editor for Custom Train Layouts',
      'crossword-worksheets.ts': 'Canvas Editor for Crossword Grid Design',
      'cryptogram-worksheets.ts': 'Canvas Editor for Cryptogram Layout Design',
      'draw-and-color-worksheets.ts': 'Canvas Editor for Grid Drawing Layouts',
      'word-search-worksheets.ts': 'Canvas Editor for Word Grid Customization',
      'writing-worksheets.ts': 'Canvas Editor for Handwriting Page Design',
    },
  },
  // Cluster 3: "Commercial License Included" (11 files)
  {
    old: "Commercial License Included",
    replacements: {
      'alphabet-train-worksheets.ts': 'Commercial License for Selling Alphabet Train Packs',
      'coloring-worksheets.ts': 'Commercial License for Selling Coloring Page Packs',
      'crossword-worksheets.ts': 'Commercial License for Selling Crossword Packs',
      'cryptogram-worksheets.ts': 'Commercial License for Selling Cryptogram Packs',
      'draw-and-color-worksheets.ts': 'Commercial License for Selling Grid Drawing Packs',
      'drawing-lines-worksheets.ts': 'Commercial License for Selling Line Tracing Packs',
      'prepositions-worksheets.ts': 'Commercial License for Selling Preposition Packs',
      'word-guess-worksheets.ts': 'Commercial License for Selling Word Guess Packs',
      'word-scramble-worksheets.ts': 'Commercial License for Selling Word Scramble Packs',
      'word-search-worksheets.ts': 'Commercial License for Selling Word Search Packs',
      'writing-worksheets.ts': 'Commercial License for Selling Writing Practice Packs',
    },
  },
  // Cluster 4: "3000+ Themed Images" (4 files)
  {
    old: "3000+ Themed Images",
    replacements: {
      'coloring-worksheets.ts': '3000+ Images for Coloring Outline Generation',
      'prepositions-worksheets.ts': '3000+ Images for Preposition Scene Building',
      'word-guess-worksheets.ts': '3000+ Images for Word Guess Visual Clues',
      'word-scramble-worksheets.ts': '3000+ Images for Word Scramble Illustrations',
    },
  },
  // Cluster 5: "Full Canvas Editing" (3 files)
  {
    old: "Full Canvas Editing",
    replacements: {
      'coloring-worksheets.ts': 'Full Canvas Editing for Coloring Page Layouts',
      'word-guess-worksheets.ts': 'Full Canvas Editing for Word Guess Card Design',
      'word-scramble-worksheets.ts': 'Full Canvas Editing for Scramble Puzzle Design',
    },
  },
  // Cluster 6: "Adjustable Grid Sizes" (2 files)
  {
    old: "Adjustable Grid Sizes",
    replacements: {
      'draw-and-color-worksheets.ts': 'Adjustable Grid Sizes for Drawing Complexity',
      'word-search-worksheets.ts': 'Adjustable Grid Sizes for Word Puzzle Difficulty',
    },
  },
  // Cluster 7: "Completed Reference Keys" (2 files)
  {
    old: "Completed Reference Keys",
    replacements: {
      'draw-and-color-worksheets.ts': 'Completed Grid Drawing Reference Keys',
      'drawing-lines-worksheets.ts': 'Completed Line Connection Reference Keys',
    },
  },
  // Cluster 8: "Eleven Language Support for International Classroom Use" (2 files)
  {
    old: "Eleven Language Support for International Classroom Use",
    replacements: {
      'find-objects-worksheets.ts': 'Eleven Languages for Find-the-Object Activities',
      'shadow-match-worksheets.ts': 'Eleven Languages for Shadow Matching Activities',
    },
  },
  // Cluster 9: "Full Canvas Editing Tools for Professional Worksheet Design" (2 files)
  {
    old: "Full Canvas Editing Tools for Professional Worksheet Design",
    replacements: {
      'grid-match-worksheets.ts': 'Canvas Editing Tools for Grid Match Worksheet Design',
      'pattern-worksheets.ts': 'Canvas Editing Tools for Pattern Worksheet Design',
    },
  },
  // Cluster 10: "Commercial License Included for Marketplace Sales" (2 files)
  {
    old: "Commercial License Included for Marketplace Sales",
    replacements: {
      'pattern-worksheets.ts': 'Commercial License for Selling Pattern Activity Packs',
      'sudoku-worksheets.ts': 'Commercial License for Selling Sudoku Puzzle Packs',
    },
  },
];

// ── Fix B: Short description expansion ──────────────────────────────────────
// Each: { file, oldDesc (unique substring), newDesc (30+ words) }
const descFixes = [
  // coloring-worksheets.ts — "3000+ Themed Images" (29w → 32w)
  {
    file: 'coloring-worksheets.ts',
    oldDesc: "Browse over 3000 child-friendly images organized by educational category including animals, food, vehicles, holidays, and nature. Every image is curated for age-appropriate coloring activities from preschool through second grade.",
    newDesc: "Browse over 3000 child-friendly images organized by educational category including animals, food, vehicles, holidays, and nature. Every image is curated for age-appropriate coloring activities from preschool through second grade. Filter by theme for quick lesson planning.",
  },
  // coloring-worksheets.ts — "Colored Reference Keys" (26w → 31w)
  {
    file: 'coloring-worksheets.ts',
    oldDesc: "Auto-generate completed colored reference images so teachers can verify student work and display finished examples. Reference keys help students understand expected outcomes before they begin coloring.",
    newDesc: "Auto-generate completed colored reference images so teachers can verify student work and display finished examples. Reference keys help students understand expected outcomes before they begin coloring. Print reference keys on separate pages for self-checking learning stations.",
  },
  // coloring-worksheets.ts — "Commercial License Included" (27w → 31w)
  // NOTE: This title is also being renamed in Fix A above, but the description fix still works
  {
    file: 'coloring-worksheets.ts',
    oldDesc: "Sell coloring worksheets on Teachers Pay Teachers, Etsy, or Amazon KDP with the commercial license included in your subscription. No attribution fees or additional licensing costs required.",
    newDesc: "Sell coloring worksheets on Teachers Pay Teachers, Etsy, or Amazon KDP with the commercial license included in your subscription. No attribution fees or additional licensing costs required. Create unlimited commercial coloring page bundles for passive income.",
  },
  // draw-and-color-worksheets.ts — "Full Canvas Editing Tools" (27w → 32w)
  {
    file: 'draw-and-color-worksheets.ts',
    oldDesc: "Drag, resize, and reposition grids, text, and decorative elements anywhere on the canvas. Add custom titles, instructions, and borders. Layer objects and adjust opacity for professional-looking worksheets.",
    newDesc: "Drag, resize, and reposition grids, text, and decorative elements anywhere on the canvas. Add custom titles, instructions, and borders. Layer objects and adjust opacity for professional-looking grid drawing worksheets. Align elements to edges or center with one click.",
  },
  // draw-and-color-worksheets.ts — "Completed Reference Keys" (23w → 31w)
  {
    file: 'draw-and-color-worksheets.ts',
    oldDesc: "Auto-generate fully completed reference images so teachers can verify student accuracy and display finished examples. Reference keys support self-assessment and peer comparison activities.",
    newDesc: "Auto-generate fully completed reference images so teachers can verify student accuracy and display finished examples. Reference keys support self-assessment and peer comparison activities. Print completed grid drawings alongside blank grids for visual comparison during independent work.",
  },
  // drawing-lines-worksheets.ts — "3000+ Themed Endpoint Images" (29w → 31w)
  {
    file: 'drawing-lines-worksheets.ts',
    oldDesc: "Browse over 3000 child-friendly images organized by theme for connection endpoints. Auto-fill instantly assigns themed image pairs, or manually select specific images matching your current vocabulary or curriculum unit.",
    newDesc: "Browse over 3000 child-friendly images organized by theme for connection endpoints. Auto-fill instantly assigns themed image pairs, or manually select specific images matching your current vocabulary or curriculum unit. Supports all 11 languages.",
  },
  // drawing-lines-worksheets.ts — "Completed Reference Keys" (29w → 33w)
  {
    file: 'drawing-lines-worksheets.ts',
    oldDesc: "Auto-generate answer keys showing correct connections between all matched pairs. Teachers verify student work quickly, and students self-check their line paths against the reference for independent learning center use.",
    newDesc: "Auto-generate answer keys showing correct connections between all matched pairs. Teachers verify student work quickly, and students self-check their line paths against the reference for independent learning center use. Print answer keys on separate pages for self-correction stations.",
  },
];

// ═══════════════════════════════════════════════════════════════════════════════
// Execute Fixes
// ═══════════════════════════════════════════════════════════════════════════════

let titleReplacements = 0;
let descReplacements = 0;
const filesModified = new Set();

console.log('\nPart 165 — Fix A: Deduplicating feature titles...\n');

for (const cluster of titleFixes) {
  for (const [fileName, newTitle] of Object.entries(cluster.replacements)) {
    const filePath = path.join(CONTENT_DIR, fileName);
    if (!fs.existsSync(filePath)) {
      console.log(`  SKIP ${fileName} (not found)`);
      continue;
    }
    let src = fs.readFileSync(filePath, 'utf8');
    const searchStr = `title: '${cluster.old}'`;
    const replaceStr = `title: '${newTitle}'`;

    if (src.includes(searchStr)) {
      src = src.replace(searchStr, replaceStr);
      fs.writeFileSync(filePath, src, 'utf8');
      titleReplacements++;
      filesModified.add(fileName);
      console.log(`  ✓ ${fileName}: "${cluster.old}" → "${newTitle}"`);
    } else {
      console.log(`  ⚠ ${fileName}: title "${cluster.old}" not found`);
    }
  }
}

console.log(`\nFix A complete: ${titleReplacements} title replacements across ${filesModified.size} files\n`);

console.log('Part 165 — Fix B: Expanding short feature descriptions...\n');

for (const fix of descFixes) {
  const filePath = path.join(CONTENT_DIR, fix.file);
  if (!fs.existsSync(filePath)) {
    console.log(`  SKIP ${fix.file} (not found)`);
    continue;
  }
  let src = fs.readFileSync(filePath, 'utf8');

  if (src.includes(fix.oldDesc)) {
    src = src.replace(fix.oldDesc, fix.newDesc);
    fs.writeFileSync(filePath, src, 'utf8');
    descReplacements++;
    filesModified.add(fix.file);
    const oldWords = fix.oldDesc.trim().split(/\s+/).filter(Boolean).length;
    const newWords = fix.newDesc.trim().split(/\s+/).filter(Boolean).length;
    console.log(`  ✓ ${fix.file}: ${oldWords}w → ${newWords}w`);
  } else {
    console.log(`  ⚠ ${fix.file}: description not found`);
  }
}

console.log(`\nFix B complete: ${descReplacements} description expansions`);
console.log(`\nTotal: ${filesModified.size} files modified`);
