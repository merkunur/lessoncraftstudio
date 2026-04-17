#!/usr/bin/env node
// Phase B.1 — coverage matrix scan (read-only).
// Emits two markdown tables per the brief:
//   - `/en/apps/*-worksheets` with 8 columns
//   - `/en/tools/*-worksheet-maker` with 6 columns
// Non-✓ cells are annotated with the actual failing value or reason.

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..', 'frontend', 'config');
const APP_DIR = path.join(ROOT, 'app-content', 'en');
const TOOL_DIR = path.join(ROOT, 'tool-content', 'en');

// Card-name mapping from frontend/config/products.ts (slug → display name).
// Used to check "title contains generator keyword" for apps pages.
// For tools pages, the brief requires "free" or "online" (case-insensitive).
const APP_CARD_NAMES = {
  'addition': 'Addition',
  'alphabet-train': 'Alphabet Train',
  'big-small': 'Big & Small',
  'bingo': 'Bingo',
  'chart-count': 'Chart Count',
  'code-addition': 'Code Addition',
  'coloring': 'Coloring',
  'crossword': 'Crossword',
  'cryptogram': 'Cryptogram',
  'draw-and-color': 'Draw & Color',
  'drawing-lines': 'Drawing Lines',
  'find-and-count': 'Find & Count',
  'find-objects': 'Find Objects',
  'grid-match': 'Grid Match',
  'matching': 'Matching',
  'math-puzzle': 'Math Puzzle',
  'math-worksheet': 'Math Worksheet',
  'missing-pieces': 'Missing Pieces',
  'more-less': 'More or Less',
  'odd-one-out': 'Odd One Out',
  'pattern-train': 'Pattern Train',
  'pattern-worksheet': 'Pattern Worksheet',
  'picture-path': 'Picture Path',
  'picture-sort': 'Picture Sort',
  'prepositions': 'Prepositions',
  'shadow-match': 'Shadow Match',
  'subtraction': 'Subtraction',
  'sudoku': 'Sudoku',
  'treasure-hunt': 'Treasure Hunt',
  'word-guess': 'Word Guess',
  'word-scramble': 'Word Scramble',
  'wordsearch': 'Word Search',
  'writing': 'Writing',
};

const APP_URL_SLUGS = {
  'addition.ts': 'addition-worksheets',
  'alphabet-train.ts': 'alphabet-train-worksheets',
  'big-small.ts': 'big-small-worksheets',
  'bingo.ts': 'bingo-worksheets',
  'chart-count.ts': 'chart-count-worksheets',
  'code-addition.ts': 'code-addition-worksheets',
  'coloring.ts': 'coloring-worksheets',
  'crossword.ts': 'crossword-worksheets',
  'cryptogram.ts': 'cryptogram-worksheets',
  'draw-and-color.ts': 'draw-and-color-worksheets',
  'drawing-lines.ts': 'drawing-lines-worksheets',
  'find-and-count.ts': 'find-and-count-worksheets',
  'find-objects.ts': 'find-objects-worksheets',
  'grid-match.ts': 'grid-match-worksheets',
  'matching.ts': 'matching-worksheets',
  'math-puzzle.ts': 'math-puzzle-worksheets',
  'math-worksheet.ts': 'math-worksheet-puzzles',
  'missing-pieces.ts': 'missing-pieces-worksheets',
  'more-less.ts': 'more-less-worksheets',
  'odd-one-out.ts': 'odd-one-out-worksheets',
  'pattern-train.ts': 'pattern-train-worksheets',
  'pattern-worksheet.ts': 'pattern-worksheet-worksheets',
  'picture-path.ts': 'picture-path-worksheets',
  'picture-sort.ts': 'picture-sort-worksheets',
  'prepositions.ts': 'prepositions-worksheets',
  'shadow-match.ts': 'shadow-match-worksheets',
  'subtraction.ts': 'subtraction-worksheets',
  'sudoku.ts': 'sudoku-worksheets',
  'treasure-hunt.ts': 'treasure-hunt-worksheets',
  'word-guess.ts': 'word-guess-worksheets',
  'word-scramble.ts': 'word-scramble-worksheets',
  'wordsearch.ts': 'word-search-worksheets',
  'writing.ts': 'writing-worksheets',
};

const TOOL_URL_SLUGS = {
  'alphabet-train.ts': 'alphabet-train-worksheet-maker',
  'big-small.ts': 'big-small-worksheet-maker',
  'bingo.ts': 'bingo-worksheet-maker',
  'chart-count.ts': 'chart-count-worksheet-maker',
  'code-addition.ts': 'code-addition-worksheet-maker',
  'coloring.ts': 'coloring-worksheet-maker',
  'crossword.ts': 'crossword-worksheet-maker',
  'cryptogram.ts': 'cryptogram-worksheet-maker',
  'draw-and-color.ts': 'draw-and-color-worksheet-maker',
  'drawing-lines.ts': 'drawing-lines-worksheet-maker',
  'find-and-count.ts': 'find-and-count-worksheet-maker',
  'find-objects.ts': 'find-objects-worksheet-maker',
  'grid-match.ts': 'grid-match-worksheet-maker',
  'image-addition.ts': 'image-addition-worksheet-maker',
  'image-subtraction.ts': 'image-subtraction-worksheet-maker',
  'matching.ts': 'matching-worksheet-maker',
  'math-puzzle.ts': 'math-puzzle-worksheet-maker',
  'math-worksheet.ts': 'math-worksheet-maker',
  'missing-pieces.ts': 'missing-pieces-worksheet-maker',
  'more-less.ts': 'more-less-worksheet-maker',
  'odd-one-out.ts': 'odd-one-out-worksheet-maker',
  'pattern-train.ts': 'pattern-train-worksheet-maker',
  'pattern-worksheet.ts': 'pattern-worksheet-maker',
  'picture-path.ts': 'picture-path-worksheet-maker',
  'picture-sort.ts': 'picture-sort-worksheet-maker',
  'prepositions.ts': 'prepositions-worksheet-maker',
  'shadow-match.ts': 'shadow-match-worksheet-maker',
  'sudoku.ts': 'sudoku-worksheet-maker',
  'treasure-hunt.ts': 'treasure-hunt-worksheet-maker',
  'word-guess.ts': 'word-guess-worksheet-maker',
  'word-scramble.ts': 'word-scramble-worksheet-maker',
  'word-search.ts': 'word-search-worksheet-maker',
  'writing.ts': 'writing-worksheet-maker',
};

// Extract named string property from TS file text (top-level-ish scan).
function extractStringField(text, field) {
  const re = new RegExp(`${field}\\s*:\\s*(['"\`])((?:\\\\.|(?!\\1).)*)\\1`, 's');
  const m = re.exec(text);
  if (!m) return null;
  return unescape(m[2]);
}

function extractAllStrings(text) {
  // Crude: collect all single/double/backtick quoted strings in the file.
  // Used for body-copy greps.
  const strings = [];
  const re = /(['"`])((?:\\.|(?!\1).)*)\1/gs;
  let m;
  while ((m = re.exec(text)) !== null) {
    strings.push(unescape(m[2]));
  }
  return strings;
}

function extractInternalLinks(text) {
  // Find the internalLinks: [ ... ] array and extract each {pageType, slug, anchorText} entry.
  const m = /\binternalLinks\s*:\s*\[/.exec(text);
  if (!m) return [];
  let i = m.index + m[0].length;
  let depth = 1;
  let inStr = null;
  const start = i;
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
  const block = text.slice(start, i);
  const entries = [];
  const entryRe = /\{([^{}]*)\}/gs;
  let em;
  while ((em = entryRe.exec(block)) !== null) {
    const obj = em[1];
    const typeM = /pageType\s*:\s*(['"`])([^'"`]+)\1/.exec(obj);
    const slugM = /slug\s*:\s*(['"`])([^'"`]+)\1/.exec(obj);
    const textM = /anchorText\s*:\s*(['"`])([^'"`]+)\1/.exec(obj);
    if (typeM && slugM) {
      entries.push({
        pageType: typeM[2],
        slug: slugM[2],
        anchorText: textM ? textM[2] : '',
      });
    }
  }
  return entries;
}

function unescape(s) {
  return s.replace(/\\'/g, "'").replace(/\\"/g, '"').replace(/\\`/g, '`').replace(/\\n/g, '\n').replace(/\\\\/g, '\\');
}

// App/tool stem → sibling stem map (handles apps using different stem than tools).
const APP_TO_TOOL_STEM = new Map([
  ['addition', 'image-addition'],
  ['subtraction', 'image-subtraction'],
  ['wordsearch', 'word-search'],
]);
const TOOL_TO_APP_STEM = new Map();
for (const [a, t] of APP_TO_TOOL_STEM) TOOL_TO_APP_STEM.set(t, a);

function scanPage(pageType, filename, filepath) {
  const text = fs.readFileSync(filepath, 'utf8');
  const stem = filename.replace('.ts', '');
  const urlSlug = pageType === 'app' ? APP_URL_SLUGS[filename] : TOOL_URL_SLUGS[filename];
  const url = `/en/${pageType === 'app' ? 'apps' : 'tools'}/${urlSlug}`;

  const titleTag = extractStringField(text, 'titleTag') || '';
  const metaDescription = extractStringField(text, 'metaDescription') || '';
  const heroTitle = extractStringField(text, 'title') || ''; // first `title:` → hero.title
  // NOTE: `title:` also appears in steps/features/cases — but `hero.title` is the FIRST one in the
  // content object since `hero` is the first field after `seo`.
  const ctaHeading = extractStringField(text, 'ctaHeading') || '';
  const internalLinks = extractInternalLinks(text);
  const allStrings = extractAllStrings(text);

  // Body-copy aggregate: join all strings for grep-based tests.
  const bodyCopy = allStrings.join('\n');

  return {
    url, stem, filename,
    titleTag, metaDescription, heroTitle, ctaHeading,
    internalLinks, bodyCopy,
  };
}

// Scan all pages.
const appPages = [];
for (const filename of Object.keys(APP_URL_SLUGS)) {
  const fp = path.join(APP_DIR, filename);
  if (!fs.existsSync(fp)) continue;
  appPages.push(scanPage('app', filename, fp));
}
const toolPages = [];
for (const filename of Object.keys(TOOL_URL_SLUGS)) {
  const fp = path.join(TOOL_DIR, filename);
  if (!fs.existsSync(fp)) continue;
  toolPages.push(scanPage('tool', filename, fp));
}

// Build meta-description map for uniqueness check (across all 66 pages).
const metaDescMap = new Map();
for (const p of [...appPages, ...toolPages]) {
  const key = p.metaDescription.trim();
  if (!key) continue;
  if (!metaDescMap.has(key)) metaDescMap.set(key, []);
  metaDescMap.get(key).push(p.url);
}

// ------- Checks -------
const STALE_SUBSCRIPTION = [
  'Core Bundle subscription',
  'Full Access subscription',
  'your subscription',
  'monthly subscription',
];

function checkTitleSuffix(title) {
  return /\|\s*LessonCraftStudio\s*$/.test(title);
}

// SEO-approved variant keywords: where the title uses a commercially-tuned
// keyword that differs from the /apps index card name, accept the variant.
// Each entry is the SEO-substituted keyword used in the current titleTag.
const APP_TITLE_APPROVED_VARIANTS = {
  'alphabet-train': 'Alphabet',        // card "Alphabet Train", title keyword "Alphabet Worksheet"
  'big-small': 'Size Comparison',       // card "Big & Small", commercial keyword "Size Comparison"
  'drawing-lines': 'Tracing',           // card "Drawing Lines", commercial keyword "Tracing"
  'find-and-count': 'Find and Count',   // card "Find & Count", title spells "and"
  'find-objects': 'Hidden Objects',     // card "Find Objects", commercial keyword "Hidden Objects"
  'math-worksheet': 'Math Drill',        // card "Math Worksheet", commercial keyword "Math Drill"
  'prepositions': 'Preposition',         // card "Prepositions", title uses singular form
};

function checkTitleKeywordApps(title, stem) {
  const kw = APP_CARD_NAMES[stem];
  if (!kw) return null;
  if (title.toLowerCase().includes(kw.toLowerCase())) return true;
  // Accept SEO-approved variant keyword
  const variant = APP_TITLE_APPROVED_VARIANTS[stem];
  if (variant && title.toLowerCase().includes(variant.toLowerCase())) return true;
  return false;
}

function checkTitleKeywordTools(title) {
  return /\b(free|online)\b/i.test(title);
}

function checkH1Apps(h1) {
  // Accept either "Generator" or "Maker" as the generator-noun variant.
  // Still requires the commercial tagline "Create Printables to Sell on Etsy & KDP".
  return /(Generator|Maker)\s*[—\-]\s*Create Printables to Sell on Etsy\s*&\s*KDP/i.test(h1);
}

function checkH1Tools(h1) {
  // Expect "Make [X] Free Online — No Signup Needed" variant.
  return /^\s*Make .+Free Online\s*[—\-]\s*No Signup Needed/i.test(h1);
}

function checkBottomH2NotEqualH1(h1, cta) {
  if (!cta) return false; // missing ctaHeading is a ✗
  return cta.trim() !== h1.trim();
}

function siblingStemFor(pageType, stem) {
  if (pageType === 'app') return APP_TO_TOOL_STEM.get(stem) || stem;
  return TOOL_TO_APP_STEM.get(stem) || stem;
}

function checkReciprocalLink(p, pageType) {
  const wantedType = pageType === 'app' ? 'tool' : 'app';
  const siblingStem = siblingStemFor(pageType, p.stem);
  // Accept any internalLinks entry where pageType matches AND slug points at the sibling,
  // OR any anchorText/slug mentioning the sibling slug / standard sibling URL.
  const wantedAppUrlSlug = APP_URL_SLUGS[siblingStem + '.ts'];
  const wantedToolUrlSlug = TOOL_URL_SLUGS[siblingStem + '.ts'];
  const siblingUrlSlug = pageType === 'app' ? wantedToolUrlSlug : wantedAppUrlSlug;
  for (const link of p.internalLinks) {
    if (link.pageType === wantedType) {
      if (siblingUrlSlug && link.slug === siblingUrlSlug) return true;
      if (link.slug === siblingStem) return true;
    }
  }
  return false;
}

function countKdpMentions(body) {
  const re = /Amazon KDP/g;
  return (body.match(re) || []).length;
}

function checkKdpCalculatorCrossLink(p) {
  const kdpCount = countKdpMentions(p.bodyCopy);
  if (kdpCount < 2) return 'N/A';
  const hasRoyalty = p.bodyCopy.includes('/tools/kdp-royalty-calculator') || p.bodyCopy.includes('kdp-royalty-calculator');
  const hasSize = p.bodyCopy.includes('/tools/kdp-size-calculator') || p.bodyCopy.includes('kdp-size-calculator');
  return hasRoyalty && hasSize;
}

function checkStaleSubscriptionRemoved(body) {
  for (const s of STALE_SUBSCRIPTION) {
    if (body.includes(s)) return { ok: false, hit: s };
  }
  return { ok: true };
}

function checkMetaDescription(p) {
  const desc = p.metaDescription.trim();
  if (!desc) return { ok: false, reason: 'missing' };
  const len = desc.length;
  const lenOK = len >= 140 && len <= 160;
  const sharedBy = metaDescMap.get(desc) || [];
  const isUnique = sharedBy.length === 1;
  if (!isUnique && !lenOK) return { ok: false, reason: `DUP (${sharedBy.length}), LEN:${len}` };
  if (!isUnique) return { ok: false, reason: `DUP-WITH:${sharedBy.filter(u => u !== p.url).slice(0, 2).join(',')}` };
  if (!lenOK) return { ok: false, reason: `LEN:${len}` };
  return { ok: true, len };
}

// ------- Build rows -------
function cellMark(v, extra) {
  if (v === 'N/A') return 'N/A';
  if (v === true) return '✓';
  if (v === false) return extra ? `✗ ${extra}` : '✗';
  return '?';
}

function buildAppRows() {
  const rows = [];
  for (const p of appPages) {
    const t1 = checkTitleSuffix(p.titleTag);
    const t2 = checkTitleKeywordApps(p.titleTag, p.stem);
    const t3 = checkH1Apps(p.heroTitle);
    const t4 = checkBottomH2NotEqualH1(p.heroTitle, p.ctaHeading);
    const t5 = checkReciprocalLink(p, 'app');
    const t6 = checkKdpCalculatorCrossLink(p);
    const t7 = checkStaleSubscriptionRemoved(p.bodyCopy);
    const t8 = checkMetaDescription(p);
    rows.push({
      url: p.url,
      titleSuffix: cellMark(t1, !t1 ? `"${p.titleTag.slice(-30)}"` : ''),
      titleKeyword: cellMark(t2, !t2 ? `(expected "${APP_CARD_NAMES[p.stem]}")` : ''),
      h1Pattern: cellMark(t3, !t3 ? `"${p.heroTitle.slice(0, 60)}..."` : ''),
      bottomH2: cellMark(t4, !t4 ? (p.ctaHeading ? '= H1' : 'missing') : ''),
      reciprocal: cellMark(t5),
      kdpCross: t6 === 'N/A' ? 'N/A' : cellMark(t6),
      staleSub: cellMark(t7.ok, t7.ok ? '' : `hit:"${t7.hit}"`),
      metaDesc: cellMark(t8.ok, t8.ok ? '' : t8.reason),
    });
  }
  return rows;
}

function buildToolRows() {
  const rows = [];
  for (const p of toolPages) {
    const t1 = checkTitleSuffix(p.titleTag);
    const t2 = checkTitleKeywordTools(p.titleTag);
    const t3 = checkH1Tools(p.heroTitle);
    const t5 = checkReciprocalLink(p, 'tool');
    const t7 = checkStaleSubscriptionRemoved(p.bodyCopy);
    const t8 = checkMetaDescription(p);
    rows.push({
      url: p.url,
      titleSuffix: cellMark(t1, !t1 ? `"${p.titleTag.slice(-30)}"` : ''),
      titleKeyword: cellMark(t2),
      h1Pattern: cellMark(t3, !t3 ? `"${p.heroTitle.slice(0, 60)}..."` : ''),
      reciprocal: cellMark(t5),
      staleSub: cellMark(t7.ok, t7.ok ? '' : `hit:"${t7.hit}"`),
      metaDesc: cellMark(t8.ok, t8.ok ? '' : t8.reason),
    });
  }
  return rows;
}

const appRows = buildAppRows();
const toolRows = buildToolRows();

// ------- Emit -------
console.log('# Phase B.1 — Coverage Matrix (EN)\n');
console.log('## /en/apps/*-worksheets (33 pages)\n');
console.log('| URL | Title \\| suffix | Title keyword | H1 pattern | Bottom H2 ≠ H1 | Reciprocal → tools | KDP calc cross | Stale sub removed | Unique meta desc |');
console.log('|---|---|---|---|---|---|---|---|---|');
for (const r of appRows) {
  console.log(`| ${r.url} | ${r.titleSuffix} | ${r.titleKeyword} | ${r.h1Pattern} | ${r.bottomH2} | ${r.reciprocal} | ${r.kdpCross} | ${r.staleSub} | ${r.metaDesc} |`);
}

console.log('\n## /en/tools/*-worksheet-maker (33 pages)\n');
console.log('| URL | Title \\| suffix | Title "free"/"online" | H1 pattern | Reciprocal → apps | Stale sub removed | Unique meta desc |');
console.log('|---|---|---|---|---|---|---|');
for (const r of toolRows) {
  console.log(`| ${r.url} | ${r.titleSuffix} | ${r.titleKeyword} | ${r.h1Pattern} | ${r.reciprocal} | ${r.staleSub} | ${r.metaDesc} |`);
}

// ------- Summary -------
function countCol(rows, key) {
  let pass = 0, fail = 0, na = 0;
  for (const r of rows) {
    if (r[key] === '✓') pass++;
    else if (r[key] === 'N/A') na++;
    else fail++;
  }
  return { pass, fail, na };
}

console.log('\n## Column pass-rate summary\n');
console.log('### Apps (33 pages)\n');
const appCols = [
  ['Title | suffix', 'titleSuffix'],
  ['Title keyword', 'titleKeyword'],
  ['H1 pattern', 'h1Pattern'],
  ['Bottom H2 ≠ H1', 'bottomH2'],
  ['Reciprocal → tools', 'reciprocal'],
  ['KDP calc cross', 'kdpCross'],
  ['Stale sub removed', 'staleSub'],
  ['Unique meta desc', 'metaDesc'],
];
for (const [name, key] of appCols) {
  const c = countCol(appRows, key);
  console.log(`  - ${name}: ${c.pass} ✓ / ${c.fail} ✗ / ${c.na} N/A`);
}
console.log('\n### Tools (33 pages)\n');
const toolCols = [
  ['Title | suffix', 'titleSuffix'],
  ['Title free/online', 'titleKeyword'],
  ['H1 pattern', 'h1Pattern'],
  ['Reciprocal → apps', 'reciprocal'],
  ['Stale sub removed', 'staleSub'],
  ['Unique meta desc', 'metaDesc'],
];
for (const [name, key] of toolCols) {
  const c = countCol(toolRows, key);
  console.log(`  - ${name}: ${c.pass} ✓ / ${c.fail} ✗ / ${c.na} N/A`);
}
