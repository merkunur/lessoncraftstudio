#!/usr/bin/env node
/**
 * Patch each app's INTERACTIVE_RUNTIME_LINES init() so it force-sets:
 *   - titleEl.textContent from STRINGS (drop the DECK_BUNDLE.title short-circuit)
 *   - checkBtn.textContent from STRINGS (sudoku-style — most apps don't do this)
 *   - resetBtn.textContent from STRINGS (sudoku-style)
 *
 * Element IDs are canonical across all 29 apps (per Explore verification):
 *   #lcs-title, #lcs-check, #lcs-reset
 * Variable names canonical: titleEl, checkBtn, resetBtn (wordsearch has no checkBtn).
 *
 * Anchor pattern: a runtime-array entry like
 *   '    titleEl.textContent=DECK_BUNDLE.title||T("title");',
 * Replace with 3 entries (typeof-guarded for wordsearch's missing checkBtn).
 *
 * Idempotent: skip if the title line already lacks DECK_BUNDLE.title OR if
 * the checkBtn/resetBtn textContent lines are already present.
 *
 * Usage: node scripts/fix-runtime-element-textcontent.js [--dry-run]
 */

'use strict';

var fs = require('fs');
var path = require('path');

var APPS_DIR = path.join(__dirname, '..', 'REFERENCE APPS');
var APPS = ['addition', 'alphabet-train', 'big-small', 'bingo', 'chart-count',
  'code-addition', 'crossword', 'cryptogram', 'find-and-count', 'find-objects',
  'grid-match', 'matching', 'math-puzzle', 'math-worksheet', 'missing-pieces',
  'more-less', 'odd-one-out', 'pattern-train', 'pattern-worksheet', 'picture-path',
  'picture-sort', 'prepositions', 'shadow-match', 'subtraction', 'sudoku',
  'treasure-hunt', 'word-guess', 'word-scramble', 'wordsearch'];

// Anchor regex: match a line inside INTERACTIVE_RUNTIME_LINES that looks like
//   '   titleEl.textContent=DECK_BUNDLE.title||T("title");',
// (any indent, any quotes pattern around 'title')
// Captures the outer-array-line indent + leading-inner spaces inside the string.
var TITLE_LINE_RE = /\n([ \t]*)'(\s*)(?:if\s*\(\s*titleEl\s*\)\s*)?titleEl\.textContent\s*=\s*DECK_BUNDLE\.title\s*\|\|\s*T\(['"]title['"]\)\s*;?'\s*,?/;

function fixApp(appName, dryRun) {
  var filePath = path.join(APPS_DIR, appName + '.html');
  if (!fs.existsSync(filePath)) return { app: appName, action: 'skip-not-found' };
  var html = fs.readFileSync(filePath, 'utf8');

  // Idempotent: skip if patched marker already present
  if (html.indexOf("STRINGS.checkAnswers||STRINGS.check") >= 0) {
    return { app: appName, action: 'skip-already-patched' };
  }

  var m = TITLE_LINE_RE.exec(html);
  if (!m) {
    // Some apps may have a different title-set pattern (e.g. already uses T("title")
    // without the short-circuit). Detect those and patch buttons separately.
    return { app: appName, action: 'skip-no-anchor' };
  }

  var matchStart = m.index + 1; // skip leading \n
  var matchEnd = matchStart + m[0].length - 1; // exclude trailing newline-or-not from match
  // Actually the regex consumed up to and including the trailing comma (or not). Recompute.
  var fullMatch = m[0]; // starts with \n
  var afterNewline = fullMatch.slice(1); // the line itself
  matchEnd = m.index + 1 + afterNewline.length;

  var outerIndent = m[1];
  var innerIndent = m[2];

  // Build 3 new array entries
  function entry(content) {
    // escape single-quotes (none expected here but defensive) + backslashes
    var esc = content.replace(/\\/g, '\\\\').replace(/'/g, "\\'");
    return outerIndent + "'" + esc + "',";
  }
  var newLines = [
    entry(innerIndent + 'titleEl.textContent=T("title");'),
    entry(innerIndent + 'if(typeof checkBtn!=="undefined"&&checkBtn){var _ck=STRINGS.checkAnswers||STRINGS.check;if(_ck)checkBtn.textContent=_ck;}'),
    entry(innerIndent + 'if(typeof resetBtn!=="undefined"&&resetBtn)resetBtn.textContent=T("tryAgain");'),
  ].join('\n');

  var newHtml = html.slice(0, matchStart) + newLines + html.slice(matchEnd);

  if (dryRun) {
    return {
      app: appName,
      action: 'would-fix',
      anchorIndent: outerIndent.length,
      anchorInner: innerIndent.length,
    };
  }
  fs.writeFileSync(filePath + '.tmp', newHtml, 'utf8');
  fs.renameSync(filePath + '.tmp', filePath);
  return { app: appName, action: 'fixed' };
}

function main() {
  var args = process.argv.slice(2);
  var dryRun = args.indexOf('--dry-run') >= 0;

  console.log('fix-runtime-element-textcontent — ' + (dryRun ? 'DRY-RUN' : 'APPLY'));
  console.log('  apps: ' + APPS.length);
  console.log('');

  var counts = {};
  APPS.forEach(function (a) {
    var r = fixApp(a, dryRun);
    counts[r.action] = (counts[r.action] || 0) + 1;
    console.log('  ' + a.padEnd(22) + ' ' + r.action);
  });

  console.log('');
  console.log('=== Summary ===');
  Object.keys(counts).forEach(function (k) { console.log('  ' + k + ': ' + counts[k]); });
}

if (require.main === module) main();
