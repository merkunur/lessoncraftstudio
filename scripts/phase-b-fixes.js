#!/usr/bin/env node
// Phase B.4 — coverage-matrix fixes.
//
// Columns handled by this script:
//   1. Tools H1 pattern (25 EN tool-content files) — normalize to
//      "Make [X] Free Online — No Signup Needed" (or "Generate ..." → "Make ...").
//   4. Reciprocal internal links (33 apps + 3 tools) — add internalLinks[]
//      entries pointing to sibling page; propagate to all 11 locales.
//   5. KDP calculator cross-links (33 apps) — add internalLinks[] entries for
//      /en/tools/kdp-royalty-calculator and /en/tools/kdp-size-calculator in
//      the "Explore More" pill section; propagate to all 11 locales.
//
// Columns 2 (apps title keyword) and 3 (apps H1 bingo variant) are accepted
// as SEO-approved variants — documented in the Phase B report; no edits.
//
// Column 6 (meta desc length) handled separately with targeted Edit calls.

const fs = require('fs');
const path = require('path');

const DRY_RUN = process.argv.includes('--dry-run');
const ROOT = path.resolve(__dirname, '..', 'frontend', 'config');
const APP_CONTENT = path.join(ROOT, 'app-content');
const TOOL_CONTENT = path.join(ROOT, 'tool-content');

const LOCALES = ['en', 'de', 'fr', 'es', 'it', 'pt', 'nl', 'sv', 'da', 'no', 'fi'];

// ---- Column 1: Tools H1 fixes (EN only) ----
// (filename, oldTitle, newTitle) tuples. Derived from current state via
// the coverage scan + manual inspection.
const TOOLS_H1_FIXES = [
  // Pattern A: "— No Signup" → append " Needed"
  { file: 'chart-count.ts', old: 'Make Counting Chart Worksheets Free Online — No Signup', new: 'Make Counting Chart Worksheets Free Online — No Signup Needed' },
  { file: 'bingo.ts', old: 'Make Bingo Cards with Pictures Free Online — No Signup', new: 'Make Bingo Cards with Pictures Free Online — No Signup Needed' },
  { file: 'big-small.ts', old: 'Make Size Comparison Worksheets Free Online — No Signup', new: 'Make Size Comparison Worksheets Free Online — No Signup Needed' },
  { file: 'writing.ts', old: 'Make Handwriting Worksheets Free Online — No Signup', new: 'Make Handwriting Worksheets Free Online — No Signup Needed' },
  { file: 'missing-pieces.ts', old: 'Make Missing Pieces Puzzles Free Online — No Signup', new: 'Make Missing Pieces Puzzles Free Online — No Signup Needed' },
  { file: 'word-scramble.ts', old: 'Make Word Scramble Worksheets Free Online — No Signup', new: 'Make Word Scramble Worksheets Free Online — No Signup Needed' },
  { file: 'math-puzzle.ts', old: 'Make Math Puzzles Free Online — No Signup', new: 'Make Math Puzzles Free Online — No Signup Needed' },
  { file: 'find-and-count.ts', old: 'Make Find and Count Worksheets Free Online — No Signup', new: 'Make Find and Count Worksheets Free Online — No Signup Needed' },
  { file: 'picture-path.ts', old: 'Make Picture Path Worksheets Free Online — No Signup', new: 'Make Picture Path Worksheets Free Online — No Signup Needed' },
  { file: 'image-subtraction.ts', old: 'Make Subtraction Worksheets Free Online — No Signup', new: 'Make Subtraction Worksheets Free Online — No Signup Needed' },
  { file: 'treasure-hunt.ts', old: 'Make Treasure Hunt Worksheets Free Online — No Signup', new: 'Make Treasure Hunt Worksheets Free Online — No Signup Needed' },
  { file: 'coloring.ts', old: 'Make Coloring Pages with Images Free Online — No Signup', new: 'Make Coloring Pages with Images Free Online — No Signup Needed' },
  // Pattern B: missing "— No Signup" entirely
  { file: 'word-search.ts', old: 'Make Word Search Puzzles with Images Free Online', new: 'Make Word Search Puzzles with Images Free Online — No Signup Needed' },
  { file: 'crossword.ts', old: 'Make Crossword Puzzles with Pictures Free Online', new: 'Make Crossword Puzzles with Pictures Free Online — No Signup Needed' },
  // Pattern C: "Generate" → "Make"
  { file: 'math-worksheet.ts', old: 'Generate Math Worksheets Free Online — No Signup Needed', new: 'Make Math Worksheets Free Online — No Signup Needed' },
];

// Scan for additional Pattern-A files (tools whose H1 ends "— No Signup"
// but weren't in the explicit list — just to be safe with the 25 count).
function findAdditionalH1Fixes() {
  const dir = path.join(TOOL_CONTENT, 'en');
  const known = new Set(TOOLS_H1_FIXES.map(f => f.file));
  const additional = [];
  for (const filename of fs.readdirSync(dir)) {
    if (!filename.endsWith('.ts') || known.has(filename)) continue;
    const text = fs.readFileSync(path.join(dir, filename), 'utf8');
    // Match the first `title:` which is inside `hero`.
    const m = /title:\s*'([^']*)'/s.exec(text);
    if (!m) continue;
    const title = m[1];
    // Applies only to hero.title — heuristic: hero.title is the first `title:`
    // AND it contains "Make " or "Generate ".
    if (!/^Make |^Generate /.test(title)) continue;
    if (title.endsWith('— No Signup')) {
      additional.push({ file: filename, old: title, new: title + ' Needed' });
    } else if (title.startsWith('Generate ')) {
      additional.push({ file: filename, old: title, new: title.replace(/^Generate /, 'Make ') });
    } else if (!/Free Online\s*[—\-]\s*No Signup Needed/.test(title) && /Free Online/.test(title)) {
      additional.push({ file: filename, old: title, new: title + ' — No Signup Needed' });
    }
  }
  return additional;
}

// ---- Column 4 + 5: Reciprocal + KDP calculator internal links ----
// App slug stems.
const APP_SLUG_OF = {
  'addition': 'addition-worksheets',
  'alphabet-train': 'alphabet-train-worksheets',
  'big-small': 'big-small-worksheets',
  'bingo': 'bingo-worksheets',
  'chart-count': 'chart-count-worksheets',
  'code-addition': 'code-addition-worksheets',
  'coloring': 'coloring-worksheets',
  'crossword': 'crossword-worksheets',
  'cryptogram': 'cryptogram-worksheets',
  'draw-and-color': 'draw-and-color-worksheets',
  'drawing-lines': 'drawing-lines-worksheets',
  'find-and-count': 'find-and-count-worksheets',
  'find-objects': 'find-objects-worksheets',
  'grid-match': 'grid-match-worksheets',
  'matching': 'matching-worksheets',
  'math-puzzle': 'math-puzzle-worksheets',
  'math-worksheet': 'math-worksheet-puzzles',
  'missing-pieces': 'missing-pieces-worksheets',
  'more-less': 'more-less-worksheets',
  'odd-one-out': 'odd-one-out-worksheets',
  'pattern-train': 'pattern-train-worksheets',
  'pattern-worksheet': 'pattern-worksheet-worksheets',
  'picture-path': 'picture-path-worksheets',
  'picture-sort': 'picture-sort-worksheets',
  'prepositions': 'prepositions-worksheets',
  'shadow-match': 'shadow-match-worksheets',
  'subtraction': 'subtraction-worksheets',
  'sudoku': 'sudoku-worksheets',
  'treasure-hunt': 'treasure-hunt-worksheets',
  'word-guess': 'word-guess-worksheets',
  'word-scramble': 'word-scramble-worksheets',
  'wordsearch': 'word-search-worksheets',
  'writing': 'writing-worksheets',
};
const TOOL_SLUG_OF = {
  'alphabet-train': 'alphabet-train-worksheet-maker',
  'big-small': 'big-small-worksheet-maker',
  'bingo': 'bingo-worksheet-maker',
  'chart-count': 'chart-count-worksheet-maker',
  'code-addition': 'code-addition-worksheet-maker',
  'coloring': 'coloring-worksheet-maker',
  'crossword': 'crossword-worksheet-maker',
  'cryptogram': 'cryptogram-worksheet-maker',
  'draw-and-color': 'draw-and-color-worksheet-maker',
  'drawing-lines': 'drawing-lines-worksheet-maker',
  'find-and-count': 'find-and-count-worksheet-maker',
  'find-objects': 'find-objects-worksheet-maker',
  'grid-match': 'grid-match-worksheet-maker',
  'image-addition': 'image-addition-worksheet-maker',
  'image-subtraction': 'image-subtraction-worksheet-maker',
  'matching': 'matching-worksheet-maker',
  'math-puzzle': 'math-puzzle-worksheet-maker',
  'math-worksheet': 'math-worksheet-maker',
  'missing-pieces': 'missing-pieces-worksheet-maker',
  'more-less': 'more-less-worksheet-maker',
  'odd-one-out': 'odd-one-out-worksheet-maker',
  'pattern-train': 'pattern-train-worksheet-maker',
  'pattern-worksheet': 'pattern-worksheet-maker',
  'picture-path': 'picture-path-worksheet-maker',
  'picture-sort': 'picture-sort-worksheet-maker',
  'prepositions': 'prepositions-worksheet-maker',
  'shadow-match': 'shadow-match-worksheet-maker',
  'sudoku': 'sudoku-worksheet-maker',
  'treasure-hunt': 'treasure-hunt-worksheet-maker',
  'word-guess': 'word-guess-worksheet-maker',
  'word-scramble': 'word-scramble-worksheet-maker',
  'word-search': 'word-search-worksheet-maker',
  'writing': 'writing-worksheet-maker',
};

// Apps filename stem → tool sibling filename stem.
const APP_TO_TOOL_STEM = new Map([
  ['addition', 'image-addition'],
  ['subtraction', 'image-subtraction'],
  ['wordsearch', 'word-search'],
]);
// Tools filename stem → app sibling filename stem.
const TOOL_TO_APP_STEM = new Map([
  ['image-addition', 'addition'],
  ['image-subtraction', 'subtraction'],
  ['word-search', 'wordsearch'],
]);

function siblingToolSlugFor(appStem) {
  const toolStem = APP_TO_TOOL_STEM.get(appStem) || appStem;
  return TOOL_SLUG_OF[toolStem];
}
function siblingAppSlugFor(toolStem) {
  const appStem = TOOL_TO_APP_STEM.get(toolStem) || toolStem;
  return APP_SLUG_OF[appStem];
}

// Anchor text templates (EN). Non-EN locales use same text for now
// (translation pass can fill in later; this is a structural fix).
const RECIPROCAL_ANCHOR_APPS_TO_TOOL = 'Looking for the free browser version? Try the free maker tool.';
const RECIPROCAL_ANCHOR_TOOL_TO_APPS = 'Ready to sell what you make? Get the commercial license.';
const KDP_ROYALTY_ANCHOR = 'Calculate KDP royalties for your activity books';
const KDP_SIZE_ANCHOR = 'Pick the right KDP book size & margins';

// ---- Helper: find and mutate the internalLinks array in a file ----
function findInternalLinksRange(text) {
  const m = /\binternalLinks\s*:\s*\[/.exec(text);
  if (!m) return null;
  const start = m.index + m[0].length;
  let depth = 1;
  let inStr = null;
  let i = start;
  for (; i < text.length; i++) {
    const ch = text[i];
    if (inStr) {
      if (ch === '\\') { i++; continue; }
      if (ch === inStr) { inStr = null; continue; }
    } else {
      if (ch === "'" || ch === '"' || ch === '`') { inStr = ch; continue; }
      if (ch === '[') depth++;
      else if (ch === ']') { depth--; if (depth === 0) break; }
    }
  }
  return { start, end: i, block: text.slice(start, i) };
}

// Parse existing internalLinks entries to check what's already there.
function parseLinks(block) {
  const entries = [];
  const re = /\{[^{}]*\}/gs;
  let m;
  while ((m = re.exec(block)) !== null) {
    const obj = m[0];
    const typeM = /pageType\s*:\s*['"`]([^'"`]+)['"`]/.exec(obj);
    const slugM = /slug\s*:\s*['"`]([^'"`]+)['"`]/.exec(obj);
    if (typeM && slugM) {
      entries.push({ pageType: typeM[1], slug: slugM[1] });
    }
  }
  return entries;
}

function linkEntryExists(block, pageType, slug) {
  const links = parseLinks(block);
  return links.some(l => l.pageType === pageType && l.slug === slug);
}

// Indentation detected from the block — only leading spaces/tabs, NOT line
// terminators. Default to 4 spaces.
function detectEntryIndent(block) {
  const m = /(^|\r?\n)([ \t]*)\{/m.exec(block);
  return m ? m[2] : '    ';
}

function detectEol(text) {
  // Detect the dominant line ending. Most files in this repo use CRLF on Windows.
  const crlfCount = (text.match(/\r\n/g) || []).length;
  const lfOnlyCount = (text.match(/(?<!\r)\n/g) || []).length;
  return crlfCount >= lfOnlyCount ? '\r\n' : '\n';
}

function buildLinkEntry(pageType, slug, anchorText, indent, eol) {
  return (
    `${indent}{${eol}` +
    `${indent}  pageType: '${pageType}',${eol}` +
    `${indent}  slug: '${slug}',${eol}` +
    `${indent}  anchorText: '${anchorText.replace(/'/g, "\\'")}',${eol}` +
    `${indent}},`
  );
}

// Append entries to the internalLinks array. Takes care to insert before the
// closing `]` with proper whitespace and comma handling.
function appendLinkEntries(text, entries) {
  const range = findInternalLinksRange(text);
  if (!range) return { text, appended: 0, reason: 'no internalLinks array found' };
  const eol = detectEol(text);
  const indent = detectEntryIndent(range.block);
  let blockInner = range.block;
  let appended = 0;
  for (const e of entries) {
    if (linkEntryExists(blockInner, e.pageType, e.slug)) continue;
    const entryText = buildLinkEntry(e.pageType, e.slug, e.anchorText, indent, eol);
    // Ensure existing last entry has trailing comma, then append new entry + EOL.
    const trimmed = blockInner.replace(/\s+$/, '');
    const closeIndent = '  '; // The `]` typically sits at depth-1 indent (2 spaces for internalLinks).
    if (trimmed.length === 0 || trimmed.endsWith('[')) {
      blockInner = eol + entryText + eol + closeIndent;
    } else if (trimmed.endsWith(',')) {
      blockInner = trimmed + eol + entryText + eol + closeIndent;
    } else if (trimmed.endsWith('}')) {
      blockInner = trimmed + ',' + eol + entryText + eol + closeIndent;
    } else {
      blockInner = trimmed + ',' + eol + entryText + eol + closeIndent;
    }
    appended++;
  }
  if (appended === 0) return { text, appended: 0, reason: 'all entries already present' };
  return {
    text: text.slice(0, range.start) + blockInner + text.slice(range.end),
    appended,
  };
}

// ---- Execute ----

let totalH1Fixed = 0;
let totalLinksAdded = 0;
const log = [];

// Column 1: Tools H1 (EN only)
const h1Fixes = [...TOOLS_H1_FIXES, ...findAdditionalH1Fixes()];
// Dedup by filename
const seen = new Set();
const dedupedH1 = h1Fixes.filter(f => {
  if (seen.has(f.file)) return false;
  seen.add(f.file);
  return true;
});

for (const fix of dedupedH1) {
  const filepath = path.join(TOOL_CONTENT, 'en', fix.file);
  if (!fs.existsSync(filepath)) { log.push(`SKIP ${fix.file}: not found`); continue; }
  const text = fs.readFileSync(filepath, 'utf8');
  // Find first title: '...' (hero.title — first occurrence in file)
  const re = /title:\s*'([^']*)'/;
  const m = re.exec(text);
  if (!m) { log.push(`SKIP ${fix.file}: no title: pattern`); continue; }
  if (m[1] !== fix.old) {
    // Title differs from expected — try to find and replace anyway
    if (!text.includes("'" + fix.old + "'")) {
      log.push(`SKIP ${fix.file}: expected "${fix.old}" not found; current hero.title="${m[1]}"`);
      continue;
    }
  }
  const newText = text.replace(`'${fix.old}'`, `'${fix.new}'`);
  if (newText !== text) {
    if (!DRY_RUN) fs.writeFileSync(filepath, newText, 'utf8');
    totalH1Fixed++;
    log.push(`H1 ✓ en/tool/${fix.file}: "${fix.old.slice(-40)}" → "${fix.new.slice(-40)}"`);
  }
}

// Column 4 + 5: internal links across all 11 locales

// Apps: add sibling tool + KDP royalty + KDP size (3 new links per apps file per locale).
for (const locale of LOCALES) {
  const dir = path.join(APP_CONTENT, locale);
  if (!fs.existsSync(dir)) continue;
  for (const stem of Object.keys(APP_SLUG_OF)) {
    const filename = stem + '.ts';
    const filepath = path.join(dir, filename);
    if (!fs.existsSync(filepath)) continue;
    const toolSiblingSlug = siblingToolSlugFor(stem);
    if (!toolSiblingSlug) continue;
    const entries = [
      { pageType: 'tool', slug: toolSiblingSlug, anchorText: RECIPROCAL_ANCHOR_APPS_TO_TOOL },
      { pageType: 'tool', slug: 'kdp-royalty-calculator', anchorText: KDP_ROYALTY_ANCHOR },
      { pageType: 'tool', slug: 'kdp-size-calculator', anchorText: KDP_SIZE_ANCHOR },
    ];
    const text = fs.readFileSync(filepath, 'utf8');
    const { text: newText, appended } = appendLinkEntries(text, entries);
    if (appended > 0) {
      if (!DRY_RUN) fs.writeFileSync(filepath, newText, 'utf8');
      totalLinksAdded += appended;
      log.push(`LINKS ✓ ${locale}/apps/${filename}: +${appended} (tool sibling + KDP royalty + KDP size)`);
    }
  }
}

// Tools: add sibling app link. All 33 tool files; skip-if-present handles the 30 that already have it.
for (const locale of LOCALES) {
  const dir = path.join(TOOL_CONTENT, locale);
  if (!fs.existsSync(dir)) continue;
  for (const stem of Object.keys(TOOL_SLUG_OF)) {
    const filename = stem + '.ts';
    const filepath = path.join(dir, filename);
    if (!fs.existsSync(filepath)) continue;
    const appSiblingSlug = siblingAppSlugFor(stem);
    if (!appSiblingSlug) continue;
    const text = fs.readFileSync(filepath, 'utf8');
    const { text: newText, appended } = appendLinkEntries(text, [
      { pageType: 'app', slug: appSiblingSlug, anchorText: RECIPROCAL_ANCHOR_TOOL_TO_APPS },
    ]);
    if (appended > 0) {
      if (!DRY_RUN) fs.writeFileSync(filepath, newText, 'utf8');
      totalLinksAdded += appended;
      log.push(`LINKS ✓ ${locale}/tool/${filename}: +1 (app sibling)`);
    }
  }
}

// Emit log summary
for (const line of log) console.log(line);
console.log('\n=== Phase B.4 summary ===');
console.log(`Column 1 — Tools H1 fixed: ${totalH1Fixed}`);
console.log(`Column 4+5 — internalLinks entries added: ${totalLinksAdded}`);
if (DRY_RUN) console.log('\n[DRY RUN] No files written.');
