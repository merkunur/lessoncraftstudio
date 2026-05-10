#!/usr/bin/env node
/**
 * Emergency fix: relocates `var runtimeStrings = {...}` declaration to the
 * correct scope (immediately before the bundle return, NOT before some inner
 * helper-function return).
 *
 * Bug source: scripts/fanout-runtime-i18n.js inserted runtimeStrings before the
 * FIRST `return {` after extractDeckBundle's declaration. For 24 apps, that
 * first return is inside a nested helper (e.g., wagonWorldRect). The bundle's
 * actual return is later at sibling scope, where runtimeStrings is undefined →
 * ReferenceError → ZIP export fails.
 *
 * This script:
 *   1. Locates the wrong-scope runtimeStrings block via my exact comment anchor
 *      "Runtime UI strings — built from window.translations[contentLanguage]"
 *   2. Captures the full block text (comment + helpers + dict construction)
 *   3. Removes it from the wrong location
 *   4. Locates the bundle return — the `return {` whose body contains
 *      `contentLanguage:` field within first ~10 lines
 *   5. Re-inserts the block immediately before that bundle return
 *
 * Idempotent: skips if runtimeStrings declaration is already within ~30 lines
 * before the bundle return (scoping already correct — addition / prepositions
 * / matching / shadow-match / treasure-hunt by hand-fix or coincidence).
 *
 * Usage: node scripts/fix-runtime-strings-scope.js [--dry-run] [--app=NAME]
 */

'use strict';

var fs = require('fs');
var path = require('path');

var APPS_DIR = path.join(__dirname, '..', 'REFERENCE APPS');

// Anchor that uniquely marks my fanout-script's runtimeStrings block start.
var BLOCK_START_RE = /\n([ \t]*)\/\/ Runtime UI strings — built from window\.translations\[contentLanguage\]/;

function findRuntimeStringsBlock(html) {
  var m = BLOCK_START_RE.exec(html);
  if (!m) return null;
  var blockStart = m.index + 1; // after the leading \n
  var indent = m[1];
  // Block ends at the line `var runtimeStrings = {...};` followed by `};` line.
  // The construction is:
  //   // comment 1
  //   // comment 2
  //   // comment 3
  //   // comment 4
  //   // comment 5
  //   var contentLang = ...;
  //   var trans = ...;
  //   var enTrans = ...;
  //   function _rt(...) { ... }
  //   var runtimeStrings = {
  //     ...,
  //     ...,
  //     lastKey: _rt(...)
  //   };
  // The closing `};` of runtimeStrings dict marks block end.
  // Walk forward from blockStart, find `var runtimeStrings = {` then bracket-balanced close.
  var rsDeclIdx = html.indexOf('var runtimeStrings = {', blockStart);
  if (rsDeclIdx === -1) return null;
  var openBrace = html.indexOf('{', rsDeclIdx);
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
  if (closeIdx === -1) return null;
  // After `}`, expect `;` and newline. Block ends at end-of-line after the `;`.
  var semiIdx = html.indexOf(';', closeIdx);
  if (semiIdx === -1) return null;
  var nlIdx = html.indexOf('\n', semiIdx);
  if (nlIdx === -1) nlIdx = html.length;
  // Block is html[blockStart..nlIdx + 1)
  var blockText = html.slice(blockStart, nlIdx + 1);
  return { start: blockStart, end: nlIdx + 1, text: blockText, indent: indent };
}

function findBundleReturn(html) {
  // Locate the bundle return: a `return {` whose body contains `contentLanguage:`
  // within the first ~10 lines after.
  // Walk all `return {` instances; for each, slice next 600 chars and check.
  var re = /\n([ \t]*)return\s*\{/g;
  var m;
  while ((m = re.exec(html)) !== null) {
    var afterReturn = html.slice(m.index, m.index + 800);
    if (/contentLanguage\s*:/.test(afterReturn) && /runtimeStrings\s*:\s*runtimeStrings/.test(afterReturn)) {
      // This is the bundle return (also confirms prior fanout's bundle field is in place)
      return { index: m.index + 1, indent: m[1] }; // +1 to skip leading \n
    }
  }
  // Also handle prepositions-style `var bundle = {`
  re = /\n([ \t]*)var\s+bundle\s*=\s*\{/g;
  while ((m = re.exec(html)) !== null) {
    var afterDecl = html.slice(m.index, m.index + 800);
    if (/contentLanguage\s*:/.test(afterDecl) && /runtimeStrings\s*:\s*runtimeStrings/.test(afterDecl)) {
      return { index: m.index + 1, indent: m[1] };
    }
  }
  return null;
}

function alreadyCorrectScope(html, blockStart, bundleReturnIdx) {
  // If block declaration is within ~30 lines BEFORE bundle return, scope is correct.
  // Count newlines between them.
  var distance = 0;
  if (blockStart > bundleReturnIdx) return false; // declaration after use → broken
  var slice = html.slice(blockStart, bundleReturnIdx);
  for (var i = 0; i < slice.length; i++) {
    if (slice[i] === '\n') distance++;
  }
  return distance <= 30;
}

function fixApp(appName, dryRun) {
  var filePath = path.join(APPS_DIR, appName + '.html');
  if (!fs.existsSync(filePath)) return { app: appName, action: 'skip-not-found' };
  var html = fs.readFileSync(filePath, 'utf8');

  var block = findRuntimeStringsBlock(html);
  if (!block) {
    return { app: appName, action: 'skip-no-block' };
  }

  var bundle = findBundleReturn(html);
  if (!bundle) {
    return { app: appName, action: 'skip-no-bundle-return' };
  }

  if (alreadyCorrectScope(html, block.start, bundle.index)) {
    return { app: appName, action: 'skip-already-correct-scope' };
  }

  // Re-indent block to match bundle indent. Original block was indented at
  // its old position; we need to replace its leading-whitespace with the new indent.
  var blockTextRaw = block.text;
  // Remove block from its current location
  var htmlAfterRemove = html.slice(0, block.start) + html.slice(block.end);
  // Adjust bundle.index since we removed earlier content
  var newBundleIdx = bundle.index;
  if (block.start < bundle.index) {
    newBundleIdx = bundle.index - (block.end - block.start);
  }

  // Re-indent the block text from block.indent → bundle.indent
  var oldIndentRe = new RegExp('^' + block.indent.replace(/[\\^$*+?.()|[\]{}]/g, '\\$&'), 'gm');
  var reindented = blockTextRaw.replace(oldIndentRe, bundle.indent);

  // Insert before bundle return (which starts at newBundleIdx)
  var newHtml = htmlAfterRemove.slice(0, newBundleIdx) + reindented + htmlAfterRemove.slice(newBundleIdx);

  if (dryRun) {
    return { app: appName, action: 'would-fix', oldBlockLine: block.start, bundleLine: bundle.index };
  }

  fs.writeFileSync(filePath + '.tmp', newHtml, 'utf8');
  fs.renameSync(filePath + '.tmp', filePath);
  return { app: appName, action: 'fixed' };
}

function main() {
  var args = process.argv.slice(2);
  var dryRun = args.includes('--dry-run');
  var appFilter = null;
  args.forEach(function (a) { if (a.indexOf('--app=') === 0) appFilter = a.slice(6); });

  var allApps = ['addition', 'alphabet-train', 'big-small', 'bingo', 'chart-count',
    'code-addition', 'crossword', 'cryptogram', 'find-and-count', 'find-objects',
    'grid-match', 'matching', 'math-puzzle', 'math-worksheet', 'missing-pieces',
    'more-less', 'odd-one-out', 'pattern-train', 'pattern-worksheet', 'picture-path',
    'picture-sort', 'prepositions', 'shadow-match', 'subtraction', 'sudoku',
    'treasure-hunt', 'word-guess', 'word-scramble', 'wordsearch'];
  var apps = appFilter ? [appFilter] : allApps;

  console.log('fix-runtime-strings-scope — ' + (dryRun ? 'DRY-RUN' : 'APPLY'));
  console.log('  apps:', apps.length);
  console.log('');

  var counts = {};
  apps.forEach(function (a) {
    var r = fixApp(a, dryRun);
    counts[r.action] = (counts[r.action] || 0) + 1;
    console.log('  ' + a.padEnd(22) + ' ' + r.action);
  });
  console.log('');
  console.log('=== Summary ===');
  Object.keys(counts).forEach(function (k) { console.log('  ' + k + ': ' + counts[k]); });
}

if (require.main === module) main();
