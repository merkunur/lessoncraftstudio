#!/usr/bin/env node
// Phase A.2 + A.3 duplicate-FAQ scan against current repo state.
// Emits two markdown tables (apps + tools) per the brief:
//   | URL | Duplicate Question Pairs | Contradictions Found |

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..', 'frontend', 'config');
const APP_DIR = path.join(ROOT, 'app-content', 'en');
const TOOL_DIR = path.join(ROOT, 'tool-content', 'en');
const SHARED_COMMERCIAL = path.join(ROOT, 'app-content', 'shared-commercial-faqs.ts');
const SHARED_USAGE = path.join(ROOT, 'tool-content', 'shared-usage-faqs.ts');

// App slug map: content-filename -> URL slug
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

// Tool slug map
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

// Walk a faq: [ ... ] array and return [{question, answer}] as strings.
function parseFaqArray(text) {
  const m = /\bfaq\s*:\s*\[/.exec(text);
  if (!m) return [];
  let i = m.index + m[0].length;
  const entries = [];
  while (i < text.length) {
    while (i < text.length && /[\s,]/.test(text[i])) i++;
    if (text[i] === ']') break;
    if (text[i] !== '{') break;
    const entryStart = i;
    let depth = 0;
    let inStr = null;
    for (; i < text.length; i++) {
      const ch = text[i];
      if (inStr) {
        if (ch === '\\') { i++; continue; }
        if (ch === inStr) { inStr = null; continue; }
      } else {
        if (ch === "'" || ch === '"' || ch === '`') { inStr = ch; continue; }
        if (ch === '{') depth++;
        else if (ch === '}') { depth--; if (depth === 0) { i++; break; } }
      }
    }
    const entryText = text.slice(entryStart, i);
    const qM = /question\s*:\s*(['"`])((?:\\.|(?!\1).)*)\1/s.exec(entryText);
    const aM = /answer\s*:\s*(?:\s*)(['"`])((?:\\.|(?!\1).)*)\1/s.exec(entryText);
    if (qM) entries.push({ question: unescape(qM[2]), answer: aM ? unescape(aM[2]) : '' });
  }
  return entries;
}

function unescape(s) {
  return s.replace(/\\'/g, "'").replace(/\\"/g, '"').replace(/\\`/g, '`').replace(/\\\\/g, '\\');
}

// Extract shared EN pool from shared-commercial-faqs.ts or shared-usage-faqs.ts
function parseSharedEn(filepath) {
  const text = fs.readFileSync(filepath, 'utf8');
  // Find the `en: [ ... ]` block
  const m = /\ben\s*:\s*\[/.exec(text);
  if (!m) return [];
  // Build a synthetic text that looks like `faq: [ ... ]` so parseFaqArray can reuse
  const start = m.index;
  const end = start + m[0].length;
  // Walk to matching `]`
  let depth = 1;
  let inStr = null;
  let i = end;
  for (; i < text.length; i++) {
    const ch = text[i];
    if (inStr) {
      if (ch === '\\') { i++; continue; }
      if (ch === inStr) { inStr = null; continue; }
    } else {
      if (ch === "'" || ch === '"' || ch === '`') { inStr = ch; continue; }
      if (ch === '[') depth++;
      else if (ch === ']') { depth--; if (depth === 0) { i++; break; } }
    }
  }
  const synthetic = 'faq: [' + text.slice(end, i);
  return parseFaqArray(synthetic);
}

// Heuristic near-dup detector: normalizes question for comparison.
function normalizeQ(q) {
  return q.toLowerCase()
    .replace(/[?!.,;:'"()\-—]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

// Tokens-in-common percentage.
function similarity(a, b) {
  const aw = new Set(normalizeQ(a).split(' ').filter(w => w.length > 2));
  const bw = new Set(normalizeQ(b).split(' ').filter(w => w.length > 2));
  if (aw.size === 0 || bw.size === 0) return 0;
  let common = 0;
  for (const w of aw) if (bw.has(w)) common++;
  return common / Math.min(aw.size, bw.size);
}

// Detect contradictions on refund / pricing / royalties / commercial scope.
function detectContradiction(a, b) {
  const reA = /refund|not offer refund|30.?day|guarantee/i;
  const noRefundA = /(not|no)\s+refund|free trial is the refund/i;
  const yesRefundA = /30.?day|full refund|refund window/i;
  if (reA.test(a.answer) && reA.test(b.answer)) {
    const aNo = noRefundA.test(a.answer);
    const aYes = yesRefundA.test(a.answer);
    const bNo = noRefundA.test(b.answer);
    const bYes = yesRefundA.test(b.answer);
    if ((aNo && bYes) || (aYes && bNo)) {
      return `refund: "${a.answer.slice(0,80).trim()}..." ↔ "${b.answer.slice(0,80).trim()}..."`;
    }
  }
  return null;
}

function scan(pageType, files, urlPrefix, sharedEn, slugMap) {
  const rows = [];
  for (const filename of files) {
    const slug = slugMap[filename];
    const url = slug ? `${urlPrefix}/${slug}` : `${urlPrefix}/${filename.replace('.ts','')}`;
    const filepath = path.join(pageType === 'app' ? APP_DIR : TOOL_DIR, filename);
    if (!fs.existsSync(filepath)) {
      rows.push({ url, duplicates: '(file missing)', contradictions: '' });
      continue;
    }
    const text = fs.readFileSync(filepath, 'utf8');
    const perPage = parseFaqArray(text);
    // Rendered FAQ = shared prepended + per-page
    const rendered = [...sharedEn, ...perPage];

    // Find exact duplicate question pairs
    const exactDups = [];
    for (let i = 0; i < rendered.length; i++) {
      for (let j = i + 1; j < rendered.length; j++) {
        if (rendered[i].question === rendered[j].question) {
          exactDups.push(`EXACT: "${rendered[i].question}"`);
        }
      }
    }
    // Find near-duplicate pairs (same normalized bag-of-tokens ≥ 70% overlap)
    const nearDups = [];
    for (let i = 0; i < rendered.length; i++) {
      for (let j = i + 1; j < rendered.length; j++) {
        if (rendered[i].question === rendered[j].question) continue;
        if (similarity(rendered[i].question, rendered[j].question) >= 0.7) {
          nearDups.push(`NEAR: "${rendered[i].question}" ↔ "${rendered[j].question}"`);
        }
      }
    }
    // Find contradictions
    const contradictions = [];
    for (let i = 0; i < rendered.length; i++) {
      for (let j = i + 1; j < rendered.length; j++) {
        const c = detectContradiction(rendered[i], rendered[j]);
        if (c) contradictions.push(c);
      }
    }

    const dupCell = [...exactDups, ...nearDups];
    rows.push({
      url,
      duplicates: dupCell.length ? dupCell.join(' ; ') : '✓ none',
      contradictions: contradictions.length ? contradictions.join(' ; ') : '✓ none',
    });
  }
  return rows;
}

function renderTable(rows) {
  const lines = [];
  lines.push('| URL | Duplicate Question Pairs | Contradictions Found |');
  lines.push('|---|---|---|');
  for (const r of rows) {
    // Escape pipes
    const dup = r.duplicates.replace(/\|/g, '\\|');
    const contra = r.contradictions.replace(/\|/g, '\\|');
    lines.push(`| ${r.url} | ${dup} | ${contra} |`);
  }
  return lines.join('\n');
}

// Main
const appFiles = Object.keys(APP_URL_SLUGS);
const toolFiles = Object.keys(TOOL_URL_SLUGS);
const sharedCommercialEn = parseSharedEn(SHARED_COMMERCIAL);
const sharedUsageEn = parseSharedEn(SHARED_USAGE);

console.log('## Shared EN pools used in scan');
console.log('\n### Shared commercial FAQs (prepended to every apps page)');
for (const e of sharedCommercialEn) console.log(`- "${e.question}"`);
console.log('\n### Shared usage FAQs (prepended to every tools page)');
for (const e of sharedUsageEn) console.log(`- "${e.question}"`);

const appRows = scan('app', appFiles, '/en/apps', sharedCommercialEn, APP_URL_SLUGS);
const toolRows = scan('tool', toolFiles, '/en/tools', sharedUsageEn, TOOL_URL_SLUGS);

console.log('\n\n## A.2 — `/en/apps/*-worksheets` scan (33 pages)\n');
console.log(renderTable(appRows));

console.log('\n\n## A.3 — `/en/tools/*-worksheet-maker` scan (33 pages)\n');
console.log(renderTable(toolRows));

// Summary counts
const appIssues = appRows.filter(r => r.duplicates !== '✓ none' || r.contradictions !== '✓ none').length;
const toolIssues = toolRows.filter(r => r.duplicates !== '✓ none' || r.contradictions !== '✓ none').length;
console.log(`\n\n## Summary`);
console.log(`- Apps pages flagged: ${appIssues}/33`);
console.log(`- Tools pages flagged: ${toolIssues}/33`);
