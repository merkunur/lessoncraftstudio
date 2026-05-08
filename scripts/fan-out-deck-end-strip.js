#!/usr/bin/env node
/**
 * Per-app fan-out for Commission B Phase 4 deck-end suggestion strip.
 *
 * Modifies each of the 29 §14.10 catalog apps' renderStandaloneHTML() +
 * showCelebration() to integrate the strip:
 *
 * Edit 1 (renderStandaloneHTML — variable declaration):
 *   After `var endDeckLinks = (...) : '';`, add:
 *     var deckEndSuggestions = (window.LCSCatalogExport && LCSCatalogExport.buildDeckEndSuggestionsPlaceholder)
 *         ? LCSCatalogExport.buildDeckEndSuggestionsPlaceholder({ locale: lang, title: bundle.title || '' })
 *         : '';
 *
 * Edit 2 (renderStandaloneHTML — parts.push insertion):
 *   After `parts.push('</aside>');` (closing the lcs-end-deck aside), add:
 *     if (deckEndSuggestions) {
 *         parts.push(deckEndSuggestions);
 *     }
 *
 * Edit 3 (showCelebration — runtime string array):
 *   After `'    celebrationEl.classList.add("lcs-celebration--shown");',`, add:
 *     '    var stripEl=document.querySelector(".lcs-deckend-suggestions");',
 *     '    if(stripEl){var fh=stripEl.querySelector("a[href]");if(fh&&fh.getAttribute("href").indexOf("__SUGGESTION_")===-1){var mi=celebrationEl.querySelector(".lcs-celebration__inner");if(mi){stripEl.hidden=false;mi.appendChild(stripEl);}}}',
 *
 * Idempotent: re-running detects already-applied edits and skips.
 *
 * Run: node scripts/fan-out-deck-end-strip.js
 * Output: per-app status summary; exit 0 = all 29 succeeded; exit 1 = any failed.
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

function applyEdit1(src) {
  // Already applied?
  if (src.indexOf('var deckEndSuggestions = (window.LCSCatalogExport && LCSCatalogExport.buildDeckEndSuggestionsPlaceholder)') !== -1) {
    return { src: src, applied: false, alreadyApplied: true };
  }
  // Anchor: `var endDeckLinks = (window.LCSCatalogExport && LCSCatalogExport.buildEndDeckLinks)\n            ? LCSCatalogExport.buildEndDeckLinks()\n            : '';`
  // The `: '';` line ends with semicolon; we insert AFTER that line.
  var anchor = /var endDeckLinks = \(window\.LCSCatalogExport && LCSCatalogExport\.buildEndDeckLinks\)\s*\n\s*\? LCSCatalogExport\.buildEndDeckLinks\(\)\s*\n\s*: '';/;
  var match = src.match(anchor);
  if (!match) return { src: src, applied: false, alreadyApplied: false, error: 'endDeckLinks anchor not found' };
  // Detect the indentation prefix (whitespace before "var endDeckLinks").
  var indentMatch = match[0].match(/^/);
  var lineStart = src.lastIndexOf('\n', match.index) + 1;
  var indent = src.substring(lineStart, match.index);
  var insertion =
    '\n' + indent + 'var deckEndSuggestions = (window.LCSCatalogExport && LCSCatalogExport.buildDeckEndSuggestionsPlaceholder)\n' +
    indent + '    ? LCSCatalogExport.buildDeckEndSuggestionsPlaceholder({ locale: lang, title: bundle.title || \'\' })\n' +
    indent + '    : \'\';';
  var newSrc = src.substring(0, match.index + match[0].length) + insertion + src.substring(match.index + match[0].length);
  return { src: newSrc, applied: true };
}

function applyEdit2(src) {
  // Already applied?
  if (src.indexOf('if (deckEndSuggestions) {') !== -1 && src.indexOf('parts.push(deckEndSuggestions);') !== -1) {
    return { src: src, applied: false, alreadyApplied: true };
  }
  // Anchor: the closing aside line. Some apps use `parts.push('</aside>');` ending the lcs-end-deck block.
  // The line is preceded by the conditional opening + buildEndDeckLinks parts.push.
  // Pattern to match (uniform across apps verified):
  //   parts.push('<aside class="lcs-end-deck">');
  //   parts.push(endDeckLinks);
  //   parts.push('</aside>');
  // We insert after the `</aside>` line.
  var anchor = /parts\.push\('<aside class="lcs-end-deck">'\);\s*\n\s*parts\.push\(endDeckLinks\);\s*\n(\s*)parts\.push\('<\/aside>'\);/;
  var match = src.match(anchor);
  if (!match) return { src: src, applied: false, alreadyApplied: false, error: 'aside anchor not found' };
  var indent = match[1];
  // Find end of this matched block
  var endOfBlock = match.index + match[0].length;
  // Now find the closing brace of the if(endDeckLinks) block — the line after `parts.push('</aside>');`.
  // Pattern in source:
  //     if (endDeckLinks) {
  //         parts.push('<aside class="lcs-end-deck">');
  //         parts.push(endDeckLinks);
  //         parts.push('</aside>');
  //     }
  // We want to insert AFTER the closing `}` of `if (endDeckLinks)`.
  var afterMatch = src.substring(endOfBlock);
  var braceMatch = afterMatch.match(/^\s*\n(\s*)\}/);
  if (!braceMatch) return { src: src, applied: false, alreadyApplied: false, error: 'closing brace of if(endDeckLinks) not found' };
  var insertPos = endOfBlock + braceMatch[0].length;
  var braceIndent = braceMatch[1];
  var insertion = '\n' + braceIndent + 'if (deckEndSuggestions) {\n' +
                  braceIndent + '    parts.push(deckEndSuggestions);\n' +
                  braceIndent + '}';
  var newSrc = src.substring(0, insertPos) + insertion + src.substring(insertPos);
  return { src: newSrc, applied: true };
}

function applyEdit3(src) {
  // Already applied?
  if (src.indexOf('var stripEl=document.querySelector(".lcs-deckend-suggestions")') !== -1) {
    return { src: src, applied: false, alreadyApplied: true };
  }
  // Anchor: the line containing `celebrationEl.classList.add("lcs-celebration--shown");` inside
  // the runtime string array (delimited by `'    ` prefix and `,` suffix).
  // Pattern: `'    celebrationEl.classList.add("lcs-celebration--shown");',`
  // After this line, insert two new string-array entries.
  var anchor = /(\s+)('\s*celebrationEl\.classList\.add\("lcs-celebration--shown"\);',)/;
  var match = src.match(anchor);
  if (!match) return { src: src, applied: false, alreadyApplied: false, error: 'showCelebration anchor not found' };
  var indent = match[1];
  var insertPos = match.index + match[0].length;
  var insertion = indent +
    "'    var stripEl=document.querySelector(\".lcs-deckend-suggestions\");'," + indent +
    "'    if(stripEl){var fh=stripEl.querySelector(\"a[href]\");if(fh&&fh.getAttribute(\"href\").indexOf(\"__SUGGESTION_\")===-1){var mi=celebrationEl.querySelector(\".lcs-celebration__inner\");if(mi){stripEl.hidden=false;mi.appendChild(stripEl);}}}',";
  var newSrc = src.substring(0, insertPos) + insertion + src.substring(insertPos);
  return { src: newSrc, applied: true };
}

console.log('=== Commission B Phase 4 — per-app fan-out ===');
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
  var originalSrc = src;
  var appliedCount = 0;
  var alreadyAppliedCount = 0;
  var appErrors = [];

  // Edit 1
  var r1 = applyEdit1(src);
  if (r1.error) appErrors.push('edit1: ' + r1.error);
  if (r1.alreadyApplied) alreadyAppliedCount++;
  if (r1.applied) appliedCount++;
  src = r1.src;

  // Edit 2
  var r2 = applyEdit2(src);
  if (r2.error) appErrors.push('edit2: ' + r2.error);
  if (r2.alreadyApplied) alreadyAppliedCount++;
  if (r2.applied) appliedCount++;
  src = r2.src;

  // Edit 3
  var r3 = applyEdit3(src);
  if (r3.error) appErrors.push('edit3: ' + r3.error);
  if (r3.alreadyApplied) alreadyAppliedCount++;
  if (r3.applied) appliedCount++;
  src = r3.src;

  if (appErrors.length > 0) {
    console.log('  ERROR  ' + app + '  — ' + appErrors.join('; '));
    totalErrored++;
    errors.push(app + ': ' + appErrors.join('; '));
  } else if (appliedCount === 3) {
    fs.writeFileSync(filePath, src, 'utf8');
    console.log('  APPLIED  ' + app + '  (3/3 edits)');
    totalApplied++;
  } else if (alreadyAppliedCount === 3) {
    console.log('  SKIP     ' + app + '  (already fully applied)');
    totalAlreadyApplied++;
  } else if (appliedCount > 0 || alreadyAppliedCount > 0) {
    fs.writeFileSync(filePath, src, 'utf8');
    console.log('  PARTIAL  ' + app + '  (applied=' + appliedCount + ', already=' + alreadyAppliedCount + ', missing=' + (3 - appliedCount - alreadyAppliedCount) + ')');
    totalErrored++;
    errors.push(app + ': partial (some edits failed silently)');
  } else {
    console.log('  ERROR    ' + app + '  (no edits applied; no errors raised — pattern mismatch?)');
    totalErrored++;
    errors.push(app + ': no edits applied; pattern mismatch suspected');
  }
}

console.log('');
console.log('=== summary ===');
console.log('  applied (all 3 edits):     ' + totalApplied);
console.log('  already applied:           ' + totalAlreadyApplied);
console.log('  errored / partial:         ' + totalErrored);
console.log('  total apps:                ' + APPS.length);

if (errors.length > 0) {
  console.log('');
  console.log('=== errors ===');
  errors.forEach(function (e) { console.log('  - ' + e); });
  process.exit(1);
}

process.exit(0);
