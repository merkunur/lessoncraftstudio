#!/usr/bin/env node
/**
 * Fix title tags (≤60 chars) and primary keywords (must appear in title)
 * across all English app-content and tool-content files.
 *
 * Strategy:
 *  - Shorten titles to ≤60 chars while keeping descriptive and seller-focused
 *  - Change primaryKeyword to a short tool-name phrase that appears in the title
 *  - Old long keywords are already covered by secondaryKeywords
 */
const fs = require('fs');
const path = require('path');

const APP_DIR = path.join(__dirname, '..', 'frontend', 'config', 'app-content', 'en');
const TOOL_DIR = path.join(__dirname, '..', 'frontend', 'config', 'tool-content', 'en');

// ── APP-CONTENT FIXES (all 33 files — title + keyword alignment) ──
const APP_FIXES = {
  'addition': {
    titleTag: 'Addition Worksheet Generator | Create & Sell Printables',
    primaryKeyword: 'addition worksheet generator',
  },
  'alphabet-train': {
    titleTag: 'Alphabet Train Generator | Create Literacy Printables',
    primaryKeyword: 'alphabet train generator',
  },
  'big-small': {
    titleTag: 'Big & Small Worksheet Generator | Sell Printables',
    primaryKeyword: 'big & small worksheet generator',
  },
  'bingo': {
    titleTag: 'Bingo Card Generator | Create & Sell Bingo Printables',
    primaryKeyword: 'bingo card generator',
  },
  'chart-count': {
    titleTag: 'Picture Graph Generator | Create Chart Worksheets',
    primaryKeyword: 'picture graph generator',
  },
  'code-addition': {
    titleTag: 'Code Addition Generator | Create Math Cipher Puzzles',
    primaryKeyword: 'code addition generator',
  },
  'coloring': {
    titleTag: 'Coloring Page Generator | Create & Sell Printables',
    primaryKeyword: 'coloring page generator',
  },
  'crossword': {
    titleTag: 'Picture Crossword Generator | Create & Sell Puzzles',
    primaryKeyword: 'picture crossword generator',
  },
  'cryptogram': {
    titleTag: 'Cryptogram Generator | Create & Sell Cipher Puzzles',
    primaryKeyword: 'cryptogram generator',
  },
  'draw-and-color': {
    titleTag: 'Draw & Color Generator | Create Grid Art Worksheets',
    primaryKeyword: 'draw & color generator',
  },
  'drawing-lines': {
    titleTag: 'Drawing Lines Generator | Create Tracing Worksheets',
    primaryKeyword: 'drawing lines generator',
  },
  'find-and-count': {
    titleTag: 'I Spy Worksheet Generator | Create Count Printables',
    primaryKeyword: 'I spy worksheet generator',
  },
  'find-objects': {
    titleTag: 'Hidden Object Generator | Create Search Worksheets',
    primaryKeyword: 'hidden object generator',
  },
  'grid-match': {
    titleTag: 'Grid Match Puzzle Generator | Create & Sell Puzzles',
    primaryKeyword: 'grid match puzzle generator',
  },
  'matching': {
    titleTag: 'Matching Worksheet Generator | Create & Sell Online',
    primaryKeyword: 'matching worksheet generator',
  },
  'math-puzzle': {
    titleTag: 'Math Puzzle Generator | Create & Sell Printables',
    primaryKeyword: 'math puzzle generator',
  },
  'math-worksheet': {
    titleTag: 'Algebra Puzzle Generator | Create Math Worksheets',
    primaryKeyword: 'algebra puzzle generator',
  },
  'missing-pieces': {
    titleTag: 'Missing Pieces Generator | Create Visual Puzzles',
    primaryKeyword: 'missing pieces generator',
  },
  'more-less': {
    titleTag: 'More or Less Generator | Comparison Worksheets',
    primaryKeyword: 'more or less generator',
  },
  'odd-one-out': {
    titleTag: 'Odd One Out Generator | Create & Sell Worksheets',
    primaryKeyword: 'odd one out generator',
  },
  'pattern-train': {
    titleTag: 'Pattern Train Generator | Create Sequence Worksheets',
    primaryKeyword: 'pattern train generator',
  },
  'pattern-worksheet': {
    titleTag: 'Pattern Worksheet Generator | Create & Sell Online',
    primaryKeyword: 'pattern worksheet generator',
  },
  'picture-path': {
    titleTag: 'Maze Worksheet Generator | Create Path Printables',
    primaryKeyword: 'maze worksheet generator',
  },
  'picture-sort': {
    titleTag: 'Picture Sort Generator | Create Sorting Worksheets',
    primaryKeyword: 'picture sort generator',
  },
  'prepositions': {
    titleTag: 'Preposition Worksheet Generator | Sell Printables',
    primaryKeyword: 'preposition worksheet generator',
  },
  'shadow-match': {
    titleTag: 'Shadow Match Generator | Create Silhouette Puzzles',
    primaryKeyword: 'shadow match generator',
  },
  'subtraction': {
    titleTag: 'Subtraction Worksheet Generator | Sell Printables',
    primaryKeyword: 'subtraction worksheet generator',
  },
  'sudoku': {
    titleTag: 'Picture Sudoku Generator | Create & Sell Worksheets',
    primaryKeyword: 'picture sudoku generator',
  },
  'treasure-hunt': {
    titleTag: 'Treasure Hunt Generator | Create Path Worksheets',
    primaryKeyword: 'treasure hunt generator',
  },
  'word-guess': {
    titleTag: 'Word Guess Generator | Create Vocabulary Puzzles',
    primaryKeyword: 'word guess generator',
  },
  'word-scramble': {
    titleTag: 'Word Scramble Generator | Create Spelling Puzzles',
    primaryKeyword: 'word scramble generator',
  },
  'word-search': {
    titleTag: 'Word Search Generator | Create & Sell Worksheets',
    primaryKeyword: 'word search generator',
  },
  'writing': {
    titleTag: 'Handwriting Worksheet Generator | Sell Printables',
    primaryKeyword: 'handwriting worksheet generator',
  },
};

// ── TOOL-CONTENT FIXES (9 files with title > 60 chars) ──
const TOOL_FIXES = {
  'alphabet-train': {
    titleTag: 'Alphabet Train Worksheet Generator | Sell Printables',
    // keyword "alphabet train worksheet generator" already matches
  },
  'code-addition': {
    titleTag: 'Code Breaker Math Worksheet Maker | Sell Puzzles',
    // keyword "code breaker math worksheet" already matches
  },
  'image-addition': {
    titleTag: 'Addition Worksheet Generator | Math Printables',
    // keyword "addition worksheet generator" already matches
  },
  'image-subtraction': {
    titleTag: 'Subtraction Worksheet Generator | Math Printables',
    // keyword "subtraction worksheet generator" already matches
  },
  'math-puzzle': {
    titleTag: 'Math Puzzle Worksheet Generator | Sell Printables',
    // keyword "math puzzle worksheet generator" already matches
  },
  'math-worksheet': {
    titleTag: 'Math Worksheet Generator | Visual Algebra Puzzles',
    // keyword "math worksheet generator" already matches
  },
  'more-less': {
    titleTag: 'Greater Than Less Than Worksheets | Sell Online',
    // keyword "greater than less than worksheets" already matches
  },
  'prepositions': {
    titleTag: 'Prepositions Worksheet Generator | Sell Printables',
    // keyword "prepositions worksheet generator" already matches
  },
  'word-guess': {
    titleTag: 'Word Guess Worksheet Generator | Sell Printables',
    // keyword "word guess worksheet generator" already matches
  },
};

// ── Validate all fixes before applying ──

let hasError = false;
for (const [file, fix] of Object.entries(APP_FIXES)) {
  if (fix.titleTag.length > 60) {
    console.error(`ERROR: app-content/${file} titleTag is ${fix.titleTag.length} chars: "${fix.titleTag}"`);
    hasError = true;
  }
  if (!fix.titleTag.toLowerCase().includes(fix.primaryKeyword.toLowerCase())) {
    console.error(`ERROR: app-content/${file} keyword "${fix.primaryKeyword}" not in title "${fix.titleTag}"`);
    hasError = true;
  }
}
for (const [file, fix] of Object.entries(TOOL_FIXES)) {
  if (fix.titleTag.length > 60) {
    console.error(`ERROR: tool-content/${file} titleTag is ${fix.titleTag.length} chars: "${fix.titleTag}"`);
    hasError = true;
  }
}
if (hasError) {
  console.error('\nFix the errors above before running.');
  process.exit(1);
}

// ── Apply fixes ──

function replaceField(content, fieldName, newValue) {
  // Replace single-quoted field
  const sqRe = new RegExp(`(${fieldName}:\\s*)'[^']*'`);
  if (sqRe.test(content)) {
    return content.replace(sqRe, `$1'${newValue}'`);
  }
  // Replace double-quoted field
  const dqRe = new RegExp(`(${fieldName}:\\s*)"[^"]*"`);
  if (dqRe.test(content)) {
    return content.replace(dqRe, `$1'${newValue}'`);
  }
  return content;
}

let filesModified = 0;

// Fix app-content files
for (const [file, fix] of Object.entries(APP_FIXES)) {
  const filePath = path.join(APP_DIR, `${file}.ts`);
  if (!fs.existsSync(filePath)) {
    console.log(`SKIP: ${filePath} not found`);
    continue;
  }
  let content = fs.readFileSync(filePath, 'utf8');
  const original = content;

  content = replaceField(content, 'titleTag', fix.titleTag);
  content = replaceField(content, 'primaryKeyword', fix.primaryKeyword);

  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf8');
    filesModified++;
    console.log(`FIXED: app-content/en/${file}.ts (title: ${fix.titleTag.length} chars)`);
  } else {
    console.log(`SKIP: app-content/en/${file}.ts (no changes needed)`);
  }
}

// Fix tool-content files
for (const [file, fix] of Object.entries(TOOL_FIXES)) {
  const filePath = path.join(TOOL_DIR, `${file}.ts`);
  if (!fs.existsSync(filePath)) {
    console.log(`SKIP: ${filePath} not found`);
    continue;
  }
  let content = fs.readFileSync(filePath, 'utf8');
  const original = content;

  content = replaceField(content, 'titleTag', fix.titleTag);
  // Only update keyword if provided
  if (fix.primaryKeyword) {
    content = replaceField(content, 'primaryKeyword', fix.primaryKeyword);
  }

  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf8');
    filesModified++;
    console.log(`FIXED: tool-content/en/${file}.ts (title: ${fix.titleTag.length} chars)`);
  } else {
    console.log(`SKIP: tool-content/en/${file}.ts (no changes needed)`);
  }
}

console.log(`\nDone. Modified ${filesModified} files.`);
