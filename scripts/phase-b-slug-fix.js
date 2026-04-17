#!/usr/bin/env node
// Phase B post-deploy fix: my Phase B fix script used incorrect slug maps.
// The real slugs come from frontend/config/product-page-slugs.ts and
// tool-page-slugs.ts. This script reads those files, extracts the real EN
// slugs, and corrects the `slug` values in every internalLinks entry I added
// in the Phase B commit (fd95480e).
//
// Strategy: map old-wrong-slug → new-correct-slug, then replace verbatim.

const fs = require('fs');
const path = require('path');

const DRY_RUN = process.argv.includes('--dry-run');
const ROOT = path.resolve(__dirname, '..', 'frontend', 'config');
const APP_CONTENT = path.join(ROOT, 'app-content');
const TOOL_CONTENT = path.join(ROOT, 'tool-content');

const LOCALES = ['en', 'de', 'fr', 'es', 'it', 'pt', 'nl', 'sv', 'da', 'no', 'fi'];

// Parse slug config file and extract `toolId` / `appId` → { locale: slug } map.
function parseSlugConfig(filepath, idKey) {
  const text = fs.readFileSync(filepath, 'utf8');
  const configs = {};
  // Each entry is `{ <idKey>: '...', slugs: { en: '...', de: '...', ... } }`.
  const entryRe = new RegExp('\\{\\s*' + idKey + '\\s*:\\s*\'([^\']+)\'\\s*,\\s*slugs\\s*:\\s*\\{([^}]+)\\}', 'g');
  let m;
  while ((m = entryRe.exec(text)) !== null) {
    const id = m[1];
    const slugsBlock = m[2];
    const slugs = {};
    const slugRe = /(\w+)\s*:\s*'([^']+)'/g;
    let sm;
    while ((sm = slugRe.exec(slugsBlock)) !== null) slugs[sm[1]] = sm[2];
    configs[id] = slugs;
  }
  return configs;
}

const toolConfigs = parseSlugConfig(path.join(ROOT, 'tool-page-slugs.ts'), 'toolId');
const productConfigs = parseSlugConfig(path.join(ROOT, 'product-page-slugs.ts'), 'appId');

console.log(`Parsed ${Object.keys(toolConfigs).length} tool slug configs`);
console.log(`Parsed ${Object.keys(productConfigs).length} product slug configs`);

// My Phase B "wrong" slug map — what was inserted — mapped by tool filename stem.
// Tool filename stem → toolId from toolPageSlugs. These are mostly the same,
// except the tool filename is sometimes different from the toolId:
// - tool-content/en/image-addition.ts has toolId 'image-addition'
// - etc.
const TOOL_STEM_TO_ID = {
  'alphabet-train': 'alphabet-train',
  'big-small': 'big-small',
  'bingo': 'bingo',
  'chart-count': 'chart-count',
  'code-addition': 'code-addition',
  'coloring': 'coloring',
  'crossword': 'crossword',
  'cryptogram': 'cryptogram',
  'draw-and-color': 'draw-and-color',
  'drawing-lines': 'drawing-lines',
  'find-and-count': 'find-and-count',
  'find-objects': 'find-objects',
  'grid-match': 'grid-match',
  'image-addition': 'image-addition',
  'image-subtraction': 'image-subtraction',
  'matching': 'matching',
  'math-puzzle': 'math-puzzle',
  'math-worksheet': 'math-worksheet',
  'missing-pieces': 'missing-pieces',
  'more-less': 'more-less',
  'odd-one-out': 'odd-one-out',
  'pattern-train': 'pattern-train',
  'pattern-worksheet': 'pattern-worksheet',
  'picture-path': 'picture-path',
  'picture-sort': 'picture-sort',
  'prepositions': 'prepositions',
  'shadow-match': 'shadow-match',
  'sudoku': 'sudoku',
  'treasure-hunt': 'treasure-hunt',
  'word-guess': 'word-guess',
  'word-scramble': 'word-scramble',
  'word-search': 'word-search',
  'writing': 'writing',
};
const APP_STEM_TO_ID = {
  'addition': 'image-addition',        // apps/addition.ts → appId image-addition
  'subtraction': 'image-subtraction',
  'wordsearch': 'word-search',
  'alphabet-train': 'alphabet-train',
  'big-small': 'big-small',
  'bingo': 'bingo',
  'chart-count': 'chart-count',
  'code-addition': 'code-addition',
  'coloring': 'coloring',
  'crossword': 'crossword',
  'cryptogram': 'cryptogram',
  'draw-and-color': 'draw-and-color',
  'drawing-lines': 'drawing-lines',
  'find-and-count': 'find-and-count',
  'find-objects': 'find-objects',
  'grid-match': 'grid-match',
  'matching': 'matching',
  'math-puzzle': 'math-puzzle',
  'math-worksheet': 'math-worksheet',
  'missing-pieces': 'missing-pieces',
  'more-less': 'more-less',
  'odd-one-out': 'odd-one-out',
  'pattern-train': 'pattern-train',
  'pattern-worksheet': 'pattern-worksheet',
  'picture-path': 'picture-path',
  'picture-sort': 'picture-sort',
  'prepositions': 'prepositions',
  'shadow-match': 'shadow-match',
  'treasure-hunt': 'treasure-hunt',
  'sudoku': 'sudoku',
  'word-guess': 'word-guess',
  'word-scramble': 'word-scramble',
  'writing': 'writing',
};

// Old (wrong) slugs I inserted in Phase B:
const OLD_TOOL_SLUGS = {
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
const OLD_APP_SLUGS = {
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

// ---- Per-locale mapping: for each file, replace old slug with real slug ----
let totalReplaced = 0;
let filesChanged = 0;

function replaceSlugInFile(filepath, oldSlug, newSlug) {
  if (oldSlug === newSlug) return 0;
  const text = fs.readFileSync(filepath, 'utf8');
  const needle = `slug: '${oldSlug}'`;
  if (!text.includes(needle)) return 0;
  const replacement = `slug: '${newSlug}'`;
  const newText = text.split(needle).join(replacement);
  const replaced = text.split(needle).length - 1;
  if (replaced > 0 && !DRY_RUN) fs.writeFileSync(filepath, newText, 'utf8');
  return replaced;
}

// Apps files: replace old tool-sibling slug + old kdp-calc slugs with real ones (EN locale).
// In non-EN locales, use the locale-specific slug from the config (fall back to EN if missing).
for (const locale of LOCALES) {
  const dir = path.join(APP_CONTENT, locale);
  if (!fs.existsSync(dir)) continue;
  for (const filename of fs.readdirSync(dir)) {
    if (!filename.endsWith('.ts')) continue;
    const stem = filename.replace('.ts', '');
    const appId = APP_STEM_TO_ID[stem];
    if (!appId) continue;
    const filepath = path.join(dir, filename);

    // Tool sibling slug (correct for current locale)
    const toolSibling = toolConfigs[appId];
    if (toolSibling) {
      const wrongSlug = OLD_TOOL_SLUGS[appId] || OLD_TOOL_SLUGS[stem];
      const realSlug = toolSibling[locale] || toolSibling.en;
      if (wrongSlug && realSlug) {
        const n = replaceSlugInFile(filepath, wrongSlug, realSlug);
        if (n > 0) {
          totalReplaced += n;
          console.log(`${locale}/apps/${filename}: tool-sibling ${wrongSlug} → ${realSlug} (${n})`);
        }
      }
    }

    // KDP calculator slugs — these were inserted by Phase B with slugs
    // 'kdp-royalty-calculator' and 'kdp-size-calculator'. These are likely
    // NOT valid keys in the tool slug map since calculators are different.
    // Skip correction here; will check validity separately.
  }
}

// Tools files: replace old apps-sibling slug with real one.
for (const locale of LOCALES) {
  const dir = path.join(TOOL_CONTENT, locale);
  if (!fs.existsSync(dir)) continue;
  for (const filename of fs.readdirSync(dir)) {
    if (!filename.endsWith('.ts')) continue;
    const stem = filename.replace('.ts', '');
    const appId = TOOL_STEM_TO_ID[stem];
    if (!appId) continue;
    const filepath = path.join(dir, filename);

    const appSibling = productConfigs[appId];
    if (!appSibling) continue;
    // Find the wrong slug used in Phase B — compute from my OLD_APP_SLUGS map
    // (keyed by apps filename stem, which differs from toolId for 3 cases).
    const appsStem = (appId === 'image-addition') ? 'addition'
                   : (appId === 'image-subtraction') ? 'subtraction'
                   : (appId === 'word-search') ? 'wordsearch'
                   : appId;
    const wrongSlug = OLD_APP_SLUGS[appsStem];
    const realSlug = appSibling[locale] || appSibling.en;
    if (!wrongSlug || !realSlug) continue;
    const n = replaceSlugInFile(filepath, wrongSlug, realSlug);
    if (n > 0) {
      totalReplaced += n;
      console.log(`${locale}/tools/${filename}: app-sibling ${wrongSlug} → ${realSlug} (${n})`);
    }
  }
}

console.log(`\nTotal slug replacements: ${totalReplaced}`);
if (DRY_RUN) console.log('[DRY RUN] No files written.');
