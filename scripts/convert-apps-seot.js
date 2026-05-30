#!/usr/bin/env node
/**
 * convert-apps-seot.js — apply the §A.13.46 content-locale-direct `_seoT`
 * SEO-chrome helper to every REFERENCE APPS/*.html worksheet that still emits its
 * 4 SEO chrome strings via the per-app translator `_t()` (Class 1: returns the
 * key on miss, defeating `|| 'Fallback'`; Class 2: binds to the operator UI
 * locale, not the deck content locale — both ship wrong per-locale SEO).
 *
 * Producer shape (identical across apps; matches the 4 already-converted ones):
 *     var seoMeta = {
 *         ...
 *         worksheetWord:   _t('worksheet')          || 'Worksheet',
 *         freeInteractive: _t('seoFreeInteractive') || 'Free interactive',
 *         forWord:         _t('seoFor')             || 'for',
 *         printOrPlay:     _t('seoPrintOrPlayOnline')|| 'Print or play online'
 *     };
 * (A separate CONSUMER block maps to literal key strings — NO _t() call — untouched.)
 *
 * Transform (idempotent; skips apps already containing `_seoT`):
 *   1. Insert `var _seoT = function(key){...}` immediately BEFORE the producer
 *      `var seoMeta = {` (same scope, before use).
 *   2. Swap the 4 chrome use-sites `_t('<key>')` → `_seoT('<key>')`.
 *
 * Self-verifying per app: after writing, asserts helper present, 4 sites now
 * `_seoT`, ZERO chrome `_t('<key>')` remain, brace balance unchanged.
 *
 * code-addition uses a sibling `_ct(key, fallback)` helper (already content-
 * locale-direct) → reported SKIP-uses-_ct.
 *
 * Run: node scripts/convert-apps-seot.js [--dry-run]
 */
const fs = require('fs');
const path = require('path');

const DIR = path.join(__dirname, '..', 'REFERENCE APPS');
const DRY = process.argv.includes('--dry-run');

const CANON = [
  'addition', 'alphabet-train', 'big-small', 'bingo', 'chart-count', 'code-addition',
  'crossword', 'cryptogram', 'find-and-count', 'find-objects', 'grid-match', 'matching',
  'math-puzzle', 'math-worksheet', 'missing-pieces', 'more-less', 'odd-one-out',
  'pattern-train', 'pattern-worksheet', 'picture-path', 'picture-sort', 'prepositions',
  'shadow-match', 'subtraction', 'sudoku', 'treasure-hunt', 'word-guess', 'word-scramble',
  'wordsearch',
];

// CORRECT chrome keys (verified empirically): worksheet / seoFreeInteractive /
// seoFor / seoPrintOrPlayOnline.
const CHROME = 'worksheet|seoFreeInteractive|seoFor|seoPrintOrPlayOnline';
// chrome use-site: _t('<key>'). Lookbehind prevents matching _seoT( or a.method.
const USE_RE = new RegExp(`(?<![\\w$.])_t\\((['"])(${CHROME})\\1\\)`, 'g');
const SEOT_RE = new RegExp(`_seoT\\((['"])(${CHROME})\\1\\)`, 'g');
const PRODUCER_RE = /^([ \t]*)var seoMeta = \{/m;

function buildHelper(indent, eol) {
  return [
    `${indent}// §A.13.46 content-locale-direct SEO-chrome lookup (NOT per-app _t(),`,
    `${indent}// which returns the key on miss + binds to UI locale). Returns null on`,
    `${indent}// miss so _seoT('x') || 'Fallback' short-circuits correctly.`,
    `${indent}var _seoT = function(key) {`,
    `${indent}    var loc = (window.currentLocale ||`,
    `${indent}        (typeof DECK_BUNDLE !== 'undefined' && DECK_BUNDLE && DECK_BUNDLE.contentLanguage) ||`,
    `${indent}        'en');`,
    `${indent}    var s = (window.translations) || {};`,
    `${indent}    return (s[loc] && s[loc][key]) ||`,
    `${indent}        (s.en && s.en[key]) ||`,
    `${indent}        null;`,
    `${indent}};`,
  ].join(eol) + eol;
}

const rows = [];
let changed = 0, failed = 0, skipped = 0;

for (const app of CANON) {
  const p = path.join(DIR, `${app}.html`);
  if (!fs.existsSync(p)) { rows.push(`${app.padEnd(18)} MISSING FILE`); failed++; continue; }
  let src = fs.readFileSync(p, 'utf8');
  const eol = src.includes('\r\n') ? '\r\n' : '\n';

  if (/_seoT/.test(src)) {
    const have = (src.match(SEOT_RE) || []).length;
    rows.push(`${app.padEnd(18)} skip-converted (_seoT chrome calls=${have})`);
    skipped++; continue;
  }

  // code-addition already uses the sibling content-locale-direct helper
  // `_ct(key, fallback)` for all 4 chrome strings; its only `_t('worksheet')`
  // is inside a comment. Skip any app whose producer relies on `_ct`.
  if (/_ct\((['"])(?:worksheet|seoFreeInteractive|seoFor|seoPrintOrPlayOnline)\1/.test(src)) {
    rows.push(`${app.padEnd(18)} SKIP-uses-_ct (sibling content-locale helper)`);
    skipped++; continue;
  }

  const chromeBefore = (src.match(USE_RE) || []).length;
  if (chromeBefore === 0) {
    rows.push(`${app.padEnd(18)} SKIP-no-chrome-_t`);
    skipped++; continue;
  }

  const m = src.match(PRODUCER_RE);
  if (!m) { rows.push(`${app.padEnd(18)} FAIL: no 'var seoMeta = {' producer`); failed++; continue; }
  const indent = m[1] || '';
  const bracesBefore = (src.match(/{/g) || []).length - (src.match(/}/g) || []).length;

  // 1) insert helper immediately before the producer line (first occurrence)
  const insertAt = src.indexOf(m[0]);
  let out = src.slice(0, insertAt) + buildHelper(indent, eol) + src.slice(insertAt);

  // 2) swap chrome use-sites
  USE_RE.lastIndex = 0;
  out = out.replace(USE_RE, (_full, q, key) => `_seoT(${q}${key}${q})`);

  // verify
  USE_RE.lastIndex = 0;
  const stillChrome = (out.match(USE_RE) || []).length;
  const nowSeoT = (out.match(SEOT_RE) || []).length;
  const helperOk = /var _seoT = function\(key\)/.test(out);
  const bracesAfter = (out.match(/{/g) || []).length - (out.match(/}/g) || []).length;

  if (stillChrome !== 0 || nowSeoT !== chromeBefore || !helperOk || bracesAfter !== bracesBefore) {
    rows.push(`${app.padEnd(18)} FAIL: before=${chromeBefore} swapped=${nowSeoT} stillChrome=${stillChrome} helper=${helperOk} braceΔ=${bracesAfter - bracesBefore}`);
    failed++; continue;
  }

  if (!DRY) fs.writeFileSync(p, out);
  rows.push(`${app.padEnd(18)} ${DRY ? 'WOULD' : 'DONE '} swap ${nowSeoT} → _seoT + helper`);
  changed++;
}

console.log(`${DRY ? 'DRY-RUN ' : ''}§A.13.46 _seoT conversion (${CANON.length} apps)`);
console.log(rows.join('\n'));
console.log(`-- ${changed} ${DRY ? 'would-change' : 'changed'} · ${skipped} skipped · ${failed} failed`);
process.exit(failed ? 1 : 0);
