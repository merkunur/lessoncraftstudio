#!/usr/bin/env node
/**
 * One-shot refactor: applies the Phase 3 runtime-i18n pattern to all 29 apps.
 *
 * For each REFERENCE APPS/<app>.html:
 *   1. Inject `runtimeStrings` construction before extractDeckBundle's `return {`
 *   2. Add `runtimeStrings: runtimeStrings,` to the bundle return object
 *   3. Replace the en-only STRINGS object in INTERACTIVE_RUNTIME_LINES with a
 *      bundle.runtimeStrings reader + en fallback
 *   4. Simplify T() function to a flat lookup
 *   5. Replace hardcoded button text in renderStandaloneHTML with template
 *      substitution from bundle.runtimeStrings
 *   6. Bump bundle version
 *
 * Idempotent: detects already-refactored apps via "DECK_BUNDLE.runtimeStrings"
 * presence in INTERACTIVE_RUNTIME_LINES and skips.
 *
 * Usage: node scripts/fanout-runtime-i18n.js [--dry-run] [--app=NAME]
 */

'use strict';

var fs = require('fs');
var path = require('path');

var APPS_DIR = path.join(__dirname, '..', 'REFERENCE APPS');

// Canonical 12 shared runtime keys with English fallbacks. Any per-app key not
// in this set falls through to its existing en-only STRINGS value.
var SHARED_KEYS = {
  checkAnswers: 'Check Answers',
  tryAgain: 'Try Again',
  youDidIt: 'You did it!',
  doAnother: 'Do Another',
  printMyWorksheet: 'Print my worksheet',
  mute: 'Mute sounds',
  unmute: 'Turn sounds on',
  correct: 'correct',
  score: '{n} of {total} correct',
  allCorrect: 'All correct!',
  progressLabel: '{n} / {total}',
  firstTryStars: 'first-try stars'
};

// Apps that use `check` instead of `checkAnswers` in their STRINGS object.
// For these the runtimeStrings dict uses key name `check` but reads from the
// SAME shared `runtimeCheckAnswers` translation.
var CHECK_KEY_APPS = new Set([
  'bingo', 'chart-count', 'crossword', 'find-and-count', 'find-objects',
  'grid-match', 'matching', 'missing-pieces', 'odd-one-out', 'picture-path',
  'picture-sort', 'shadow-match', 'sudoku', 'treasure-hunt'
]);

// Apps with no check button (drag puzzles) — wordsearch only.
var NO_CHECK_BUTTON_APPS = new Set(['wordsearch']);

function parseEnStringsObject(html) {
  // Find the runtime STRINGS object's en block. Pattern in INTERACTIVE_RUNTIME_LINES:
  //   var STRINGS={ en:{...} } OR var STRINGS = { en:{...} }
  // Multiple unrelated `en:` blocks exist throughout each app's source (content
  // configs, vocab maps, etc.); we must scope to the one inside `var STRINGS`.
  var stringsAnchor = html.search(/var\s+STRINGS\s*=\s*\{/);
  if (stringsAnchor === -1) return null;
  var idx = html.indexOf('en', stringsAnchor);
  if (idx === -1) return null;
  // Sanity check: en should be within ~200 chars of STRINGS anchor
  if (idx - stringsAnchor > 300) return null;
  // Advance to the opening `{`
  var openIdx = html.indexOf('{', idx);
  if (openIdx === -1) return null;
  // Walk forward counting braces while tracking string state
  var depth = 0;
  var inStr = false, esc = false;
  var endIdx = -1;
  for (var i = openIdx; i < html.length; i++) {
    var c = html[i];
    if (esc) { esc = false; continue; }
    if (c === '\\') { esc = true; continue; }
    if (c === '"' && !inStr) { inStr = true; continue; }
    if (c === '"' && inStr) { inStr = false; continue; }
    if (inStr) continue;
    if (c === '{') depth++;
    else if (c === '}') {
      depth--;
      if (depth === 0) { endIdx = i; break; }
    }
  }
  if (endIdx === -1) return null;
  var fullMatch = html.slice(idx, endIdx + 1);
  var inner = html.slice(openIdx + 1, endIdx);
  var dict = {};
  // Split on commas not inside quotes (re-uses balanced-walk logic)
  var pairs = [];
  var d2 = 0, s2 = false, e2 = false, start = 0;
  for (var j = 0; j < inner.length; j++) {
    var c2 = inner[j];
    if (e2) { e2 = false; continue; }
    if (c2 === '\\') { e2 = true; continue; }
    if (c2 === '"') { s2 = !s2; continue; }
    if (s2) continue;
    if (c2 === '{') d2++;
    else if (c2 === '}') d2--;
    else if (c2 === ',' && d2 === 0) {
      pairs.push(inner.slice(start, j));
      start = j + 1;
    }
  }
  pairs.push(inner.slice(start));
  pairs.forEach(function (p) {
    var kv = p.match(/^\s*(\w+)\s*:\s*"((?:[^"\\]|\\.)*)"\s*$/);
    if (kv) dict[kv[1]] = kv[2].replace(/\\"/g, '"').replace(/\\\\/g, '\\');
  });
  return { source: fullMatch, dict: dict };
}

function buildRuntimeStringsLines(appName, enDict, indent) {
  // Build the runtimeStrings dict construction inserted before return statement.
  // For each key in enDict, map shared keys to their runtimeXxx translations
  // and per-app keys to en fallback.
  var lines = [];
  lines.push(indent + '// Runtime UI strings — built from window.translations[contentLanguage]');
  lines.push(indent + '// for the embedded interactive runtime in deck.html. Per §14.3a the 12');
  lines.push(indent + '// universal keys live in translations-shared.js (runtimeXxx); per-app');
  lines.push(indent + '// keys (title, slot/cell/problem labels, custom celebrations) fall through');
  lines.push(indent + '// to the en literal until the per-app translations file ships them.');
  lines.push(indent + 'var contentLang = (window.currentLocale || (typeof languageSelect !== "undefined" && languageSelect && languageSelect.value) || "en");');
  lines.push(indent + 'var trans = (window.translations && window.translations[contentLang]) || {};');
  lines.push(indent + 'var enTrans = (window.translations && window.translations.en) || {};');
  lines.push(indent + 'function _rt(key, fallback) { return trans[key] || enTrans[key] || fallback; }');
  lines.push(indent + 'var runtimeStrings = {');
  var keyEntries = Object.keys(enDict);
  keyEntries.forEach(function (k, idx) {
    var enVal = enDict[k];
    var sharedKey = null;
    if (k === 'title') sharedKey = 'runtimeTitle';  // per-app override fallback to en
    else if (k === 'check') sharedKey = 'runtimeCheckAnswers';
    else if (Object.prototype.hasOwnProperty.call(SHARED_KEYS, k)) {
      sharedKey = 'runtime' + k.charAt(0).toUpperCase() + k.slice(1);
    }
    var line = indent + '    ' + k + ': ';
    var isLast = (idx === keyEntries.length - 1);
    if (sharedKey) {
      line += '_rt("' + sharedKey + '", ' + JSON.stringify(enVal) + ')';
    } else {
      // Per-app key: try app-namespaced shared key first (e.g., runtimeProblemNumber), fallback to en literal
      var perAppShared = 'runtime' + k.charAt(0).toUpperCase() + k.slice(1);
      line += '_rt("' + perAppShared + '", ' + JSON.stringify(enVal) + ')';
    }
    line += isLast ? '' : ',';
    lines.push(line);
  });
  lines.push(indent + '};');
  return lines.join('\n');
}

function buildStringsLineForRuntime(enDict) {
  // The replacement for the original en STRINGS object literal in INTERACTIVE_RUNTIME_LINES.
  // Format: (DECK_BUNDLE && DECK_BUNDLE.runtimeStrings) || {<en literal fallback>}
  var pairs = Object.keys(enDict).map(function (k) {
    return k + ':' + JSON.stringify(enDict[k]);
  }).join(',');
  return '(DECK_BUNDLE && DECK_BUNDLE.runtimeStrings) || {' + pairs + '}';
}

function refactorApp(appName, dryRun) {
  var filePath = path.join(APPS_DIR, appName + '.html');
  if (!fs.existsSync(filePath)) {
    return { app: appName, action: 'skip-not-found' };
  }
  var html = fs.readFileSync(filePath, 'utf8');

  // Idempotency check
  if (html.indexOf('DECK_BUNDLE.runtimeStrings') !== -1 && html.indexOf('runtimeStrings: runtimeStrings') !== -1) {
    return { app: appName, action: 'skip-already-refactored' };
  }

  // Find INTERACTIVE_RUNTIME_LINES STRINGS object
  var enParsed = parseEnStringsObject(html);
  if (!enParsed) {
    return { app: appName, action: 'skip-no-strings' };
  }

  var enDict = enParsed.dict;
  var keys = Object.keys(enDict);
  if (keys.length === 0) {
    return { app: appName, action: 'skip-empty-strings' };
  }

  // === Transform 1: Replace en STRINGS object with bundle.runtimeStrings reader + en fallback
  var newStringsExpr = buildStringsLineForRuntime(enDict);
  // Find `var STRINGS = {` then bracket-balanced walk to its matching `};`.
  // Don't use simple regex — values like {n}/{total} contain literal { } chars.
  var stringsAnchor = html.search(/var\s+STRINGS\s*=\s*\{/);
  if (stringsAnchor === -1) return { app: appName, action: 'skip-strings-block-not-matched' };
  // Walk forward to find matching close + trailing `;`
  var openBrace = html.indexOf('{', stringsAnchor);
  var depth = 0, inStr = false, esc = false;
  var closeIdx = -1;
  for (var i = openBrace; i < html.length; i++) {
    var c = html[i];
    if (esc) { esc = false; continue; }
    if (c === '\\') { esc = true; continue; }
    if (c === '"' || c === "'") { inStr = !inStr; continue; }
    if (inStr) continue;
    if (c === '{') depth++;
    else if (c === '}') { depth--; if (depth === 0) { closeIdx = i; break; } }
  }
  if (closeIdx === -1) return { app: appName, action: 'skip-strings-block-bracket-unbalanced' };
  // Look for trailing `;` (allow whitespace + newline)
  var afterClose = html.slice(closeIdx + 1, closeIdx + 5);
  var semiPos = afterClose.indexOf(';');
  if (semiPos === -1) return { app: appName, action: 'skip-strings-block-no-semicolon' };
  var blockEnd = closeIdx + 1 + semiPos + 1;
  var oldBlock = html.slice(stringsAnchor, blockEnd);
  var newStringsBlock = 'var STRINGS = ' + newStringsExpr + ';';
  html = html.slice(0, stringsAnchor) + newStringsBlock + html.slice(blockEnd);

  // === Transform 2: Simplify T() function. Match:
  //   function T(key){var loc=(DECK_BUNDLE.contentLanguage||"en").slice(0,2);var t=STRINGS[loc]||STRINGS.en;return t[key]||STRINGS.en[key]||key}
  // Replace with: function T(k){return STRINGS[k]||k}
  var tFunctionRe = /function\s+T\s*\(\s*\w+\s*\)\s*\{[^}]*\}/;
  html = html.replace(tFunctionRe, 'function T(k){return STRINGS[k]||k}');

  // === Transform 3: Inject runtimeStrings construction + bundle field in extractDeckBundle.
  // Find first `return {` after extractDeckBundle. Strategy: find the function declaration,
  // then look for the next `return {` which is inside it.
  var fnDeclRe = /(async\s+)?function\s+extractDeckBundle(_v\d+)?\s*\(/;
  var fnDeclMatch = html.match(fnDeclRe);
  if (!fnDeclMatch) {
    return { app: appName, action: 'skip-no-extractDeckBundle' };
  }
  var fnStart = fnDeclMatch.index;
  // Find the next `return {` after fnStart
  var returnRe = /\n([ \t]+)return\s*\{/g;
  returnRe.lastIndex = fnStart;
  var returnMatch = returnRe.exec(html);
  if (!returnMatch) {
    return { app: appName, action: 'skip-no-return' };
  }
  var indent = returnMatch[1]; // captured indentation
  var runtimeStringsCode = '\n' + buildRuntimeStringsLines(appName, enDict, indent) + '\n';
  // Insert before the `return {` (i.e., before the leading newline of returnMatch)
  html = html.slice(0, returnMatch.index) + runtimeStringsCode + html.slice(returnMatch.index);

  // Now also add `runtimeStrings: runtimeStrings,` and modify `title:` line in the bundle return.
  // Find the new return block (after our insertion)
  var newReturnRe = new RegExp('\\n' + indent.replace(/[\\^$*+?.()|[\]{}]/g, '\\$&') + 'return\\s*\\{');
  var newReturnMatch = newReturnRe.exec(html);
  if (newReturnMatch) {
    // Find the contentLanguage line (or the first line after `return {`) and inject after it.
    // Pattern: contentLanguage: ...,\n
    var contentLangRe = /(contentLanguage\s*:[^,\n]+,\n)/;
    var contentLangMatch = html.slice(newReturnMatch.index).match(contentLangRe);
    if (contentLangMatch) {
      var insertPos = newReturnMatch.index + contentLangMatch.index + contentLangMatch[0].length;
      var insertion = indent + '    runtimeStrings: runtimeStrings,\n';
      html = html.slice(0, insertPos) + insertion + html.slice(insertPos);
    }
    // Also: replace `title: 'X Practice'` (literal) with `title: runtimeStrings.title` IF such a literal exists.
    // Pattern: title:\s*'[^']+'  (English literal in bundle return)
    var titleLiteralRe = new RegExp("(\\n" + indent.replace(/[\\^$*+?.()|[\]{}]/g, '\\$&') + "    title\\s*:\\s*)'[^']+'(,)", '');
    html = html.replace(titleLiteralRe, '$1runtimeStrings.title$2');
    var titleLiteralReDQ = new RegExp("(\\n" + indent.replace(/[\\^$*+?.()|[\]{}]/g, '\\$&') + "    title\\s*:\\s*)\"[^\"]+\"(,)", '');
    html = html.replace(titleLiteralReDQ, '$1runtimeStrings.title$2');
  }

  // === Transform 4: Replace hardcoded button text in renderStandaloneHTML.
  // Pattern matches:
  //   parts.push('<button ... id="lcs-check" ... >Check Answers</button>');
  //   parts.push('<button ... id="lcs-reset" ... >Try Again</button>');
  // Replace text nodes inside `>...</button>` with bundle.runtimeStrings.X via concat.
  if (!NO_CHECK_BUTTON_APPS.has(appName)) {
    var checkKey = CHECK_KEY_APPS.has(appName) ? 'check' : 'checkAnswers';
    // Regex: parts.push('  <button ... id="lcs-check" ... disabled>Check Answers</button>');
    var checkBtnRe = /(parts\.push\(['"]\s*<button[^>]*id="lcs-check"[^>]*>)Check Answers(<\/button>['"]\);)/;
    html = html.replace(checkBtnRe, '$1\' + escapeHtml(bundle.runtimeStrings.' + checkKey + ') + \'$2');
    var resetBtnRe = /(parts\.push\(['"]\s*<button[^>]*id="lcs-reset"[^>]*>)Try Again(<\/button>['"]\);)/;
    html = html.replace(resetBtnRe, '$1\' + escapeHtml(bundle.runtimeStrings.tryAgain) + \'$2');
  }

  // === Transform 5: Bump bundleVersion (minor) — best-effort, leave if not found.
  // Pattern: bundleVersion: 'X.Y.Z' — bump Y by 1
  html = html.replace(/(bundleVersion:\s*['"])([0-9]+)\.([0-9]+)\.([0-9]+)(['"])/, function (m, a, maj, min, pat, b) {
    return a + maj + '.' + (parseInt(min) + 1) + '.0' + b;
  });

  if (dryRun) {
    return { app: appName, action: 'would-rewrite', keysCount: keys.length, hasCheckBtn: !NO_CHECK_BUTTON_APPS.has(appName) };
  }

  var tmpPath = filePath + '.tmp';
  fs.writeFileSync(tmpPath, html, 'utf8');
  fs.renameSync(tmpPath, filePath);
  return { app: appName, action: 'rewritten', keysCount: keys.length };
}

function main() {
  var args = process.argv.slice(2);
  var dryRun = args.includes('--dry-run');
  var appFilter = null;
  for (var i = 0; i < args.length; i++) {
    if (args[i].indexOf('--app=') === 0) appFilter = args[i].slice(6);
  }

  var allApps = ['addition', 'alphabet-train', 'big-small', 'bingo', 'chart-count',
    'code-addition', 'crossword', 'cryptogram', 'find-and-count', 'find-objects',
    'grid-match', 'matching', 'math-puzzle', 'math-worksheet', 'missing-pieces',
    'more-less', 'odd-one-out', 'pattern-train', 'pattern-worksheet', 'picture-path',
    'picture-sort', 'prepositions', 'shadow-match', 'subtraction', 'sudoku',
    'treasure-hunt', 'word-guess', 'word-scramble', 'wordsearch'];

  var apps = appFilter ? [appFilter] : allApps;

  console.log('fanout-runtime-i18n — ' + (dryRun ? 'DRY-RUN' : 'APPLY'));
  console.log('  apps:', apps.length);
  console.log('');

  var results = apps.map(function (a) { return refactorApp(a, dryRun); });
  results.forEach(function (r) {
    console.log('  ' + r.app.padEnd(22) + ' ' + r.action + (r.keysCount ? ' (' + r.keysCount + ' keys)' : ''));
  });

  var counts = {};
  results.forEach(function (r) { counts[r.action] = (counts[r.action] || 0) + 1; });
  console.log('');
  console.log('=== Summary ===');
  Object.keys(counts).forEach(function (k) { console.log('  ' + k + ': ' + counts[k]); });
}

if (require.main === module) main();
