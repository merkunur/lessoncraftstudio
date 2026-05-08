#!/usr/bin/env node
/**
 * One-shot fan-out: widen celebration modal max-width 520px → 800px in all
 * 29 §14.10 catalog apps' renderStandaloneHTML CSS string array.
 *
 * Operator directive 2026-05-08: "Consider also increasing the size of the
 * complete card. It can be equal to the size of the worksheet." Worksheet
 * iframe aspect-ratio per CLAUDE.md is 800/1400; 800px modal max-width
 * matches the worksheet width. The previous 520px cap left the celebration
 * modal feeling cramped on desktop and exacerbated the deck-end strip
 * thumbnail-overflow issue.
 *
 * Per CLAUDE.md §14.6 TWO-STEP deploy: after this fan-out lands in REFERENCE
 * APPS/, run deploy.sh + update-worksheet.sh × 29 to refresh the served
 * /var/www/lcs-media/worksheet-generators/ copies.
 *
 * Idempotent: re-runs report skip-already-800px.
 *
 * Run: node scripts/fan-out-celebration-modal-width.js
 */

'use strict';

var fs = require('fs');
var path = require('path');

var APPS = [
  'addition', 'alphabet-train', 'big-small', 'bingo', 'chart-count',
  'code-addition', 'crossword', 'cryptogram', 'find-and-count', 'find-objects',
  'grid-match', 'matching', 'math-puzzle', 'math-worksheet', 'missing-pieces',
  'more-less', 'odd-one-out', 'pattern-train', 'pattern-worksheet', 'picture-path',
  'picture-sort', 'prepositions', 'shadow-match', 'subtraction', 'sudoku',
  'treasure-hunt', 'word-guess', 'word-scramble', 'wordsearch'
];

var APPS_DIR = path.join(__dirname, '..', 'REFERENCE APPS');

// The full canonical CSS-rule line baked into each app's renderStandaloneHTML
// runtime CSS string array. Match the entire rule for safety; replace only
// the max-width segment.
var OLD = '.lcs-celebration__inner{position:relative;background:#FFFFFF;border-radius:24px;padding:32px 28px 24px;max-width:520px;width:100%;box-shadow:0 20px 60px rgba(28,28,30,.35);text-align:center;z-index:2}';
var NEW = '.lcs-celebration__inner{position:relative;background:#FFFFFF;border-radius:24px;padding:32px 28px 24px;max-width:800px;width:100%;box-shadow:0 20px 60px rgba(28,28,30,.35);text-align:center;z-index:2}';

console.log('=== fan-out-celebration-modal-width — 520px → 800px ===');
var totalApplied = 0;
var totalAlreadyApplied = 0;
var totalErrored = 0;
var errors = [];

for (var i = 0; i < APPS.length; i++) {
  var app = APPS[i];
  var filePath = path.join(APPS_DIR, app + '.html');
  if (!fs.existsSync(filePath)) {
    console.log('  ERROR  ' + app + '  — file not found at ' + filePath);
    totalErrored++;
    errors.push(app + ': file not found');
    continue;
  }
  var src = fs.readFileSync(filePath, 'utf8');
  if (src.indexOf(NEW) !== -1 && src.indexOf(OLD) === -1) {
    console.log('  SKIP    ' + app + '  (already 800px)');
    totalAlreadyApplied++;
    continue;
  }
  if (src.indexOf(OLD) === -1) {
    console.log('  ERROR   ' + app + '  — celebration__inner anchor not found (CSS shape differs?)');
    totalErrored++;
    errors.push(app + ': anchor not found');
    continue;
  }
  var newSrc = src.split(OLD).join(NEW);
  fs.writeFileSync(filePath, newSrc, 'utf8');
  console.log('  APPLIED ' + app + '  (520px → 800px)');
  totalApplied++;
}

console.log('');
console.log('=== summary ===');
console.log('  applied:           ' + totalApplied);
console.log('  already-applied:   ' + totalAlreadyApplied);
console.log('  errored:           ' + totalErrored);

if (errors.length > 0) {
  console.log('');
  console.log('=== errors ===');
  errors.forEach(function (e) { console.log('  - ' + e); });
  process.exit(1);
}
process.exit(0);
